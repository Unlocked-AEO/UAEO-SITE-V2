// The pipeline. Runs the 5 stages, emits SSE events at every transition,
// drives the auto-iterate loop (≤2 internal passes if score <80, best
// wins). Designed so that each stage is replaceable in isolation.
//
// Event timeline matches the UI's existing 5-step Processing animation
// (entity → citation → structure → authority → score), so the frontend
// component can swap setTimeout for EventSource with no other changes.

import { randomUUID } from "node:crypto";
import type {
  ContentConfig,
  DraftRecord,
  IterationEntry,
  SseDoneEvent,
  StageKey,
} from "@unlocked/types";
import type { ContentRepository } from "../repository/ContentRepository.ts";
import type { Providers } from "../providers/index.ts";
import { publish } from "../lib/jobs.ts";
import { buildCorpus } from "./corpus.ts";
import {
  buildDraftSystemCached,
  buildDraftSystemUncached,
  buildDraftUser,
  buildRefineUser,
} from "./prompts.ts";
import { aggregateScores } from "./scoring/aggregate.ts";
import { getRules } from "../rules/loader.ts";

export interface RunJobInput {
  jobId: string;
  workspaceId: string;
  config: ContentConfig;
  uploadIds: string[];
  repo: ContentRepository;
  providers: Providers;
  abort: AbortController;
  /** When set, this is a user-initiated iteration on an existing draft. */
  iterateOn?: { draftId: string; mode: "refine" | "new-base"; feedback: string };
}

export async function runJob(input: RunJobInput): Promise<DraftRecord> {
  const { jobId, workspaceId, config, repo, providers, abort } = input;
  const signal = abort.signal;
  const { passScore, maxAutoPasses } = getRules().thresholds;

  const stage = (key: StageKey, status: "active" | "complete" | "failed") =>
    publish(jobId, "stage", { key, status });

  try {
    // ─── Stage 1: ingest / corpus ────────────────────────────────
    stage("entity", "active");
    const { corpus, sources } = await buildCorpus({
      workspaceId,
      sourcesCsv: config.sources,
      uploadIds: input.uploadIds,
      repo,
      scrape: providers.scrape,
      signal,
      onWarning: (code, message) => publish(jobId, "warning", { code, message }),
    });
    stage("entity", "complete");

    // ─── Stages 2-5 wrapped for auto-iteration ────────────────────
    const systemUncached = buildDraftSystemUncached(config);
    const systemCached = buildDraftSystemCached(corpus);

    let bestDraft: { markdown: string; score: number; signals: any; notes: any } | null = null;
    const isUserIteration = !!input.iterateOn;

    // For user-driven `refine`, we start from the prior draft and skip auto-iteration.
    // For `new-base` and fresh jobs, we run up to maxAutoPasses (from rules YAML).
    let priorDraft: string | null = null;
    if (input.iterateOn?.mode === "refine") {
      const prev = await repo.getDraft(workspaceId, input.iterateOn.draftId);
      priorDraft = prev?.markdown ?? null;
    }

    const passes = isUserIteration && input.iterateOn?.mode === "refine" ? 1 : maxAutoPasses;

    for (let pass = 0; pass < passes; pass++) {
      // Stage 2: draft (or refine if we already have one)
      stage("citation", "active");
      let markdown: string;
      const streamDelta = (text: string) => publish(jobId, "draftDelta", { text });
      if (priorDraft) {
        markdown = await providers.draft.refine({
          systemUncached,
          systemCached,
          user: buildRefineUser(priorDraft, input.iterateOn?.feedback ?? null),
          signal,
          onDelta: streamDelta,
        });
      } else {
        markdown = await providers.draft.streamDraft({
          systemUncached,
          systemCached,
          user: buildDraftUser(config),
          signal,
          onDelta: streamDelta,
        });
      }
      stage("citation", "complete");

      // Stage 3: structure pass (refine for AEO)
      stage("structure", "active");
      markdown = await providers.draft.refine({
        systemUncached,
        systemCached,
        user: buildRefineUser(markdown, null),
        signal,
        onDelta: streamDelta,
      });
      stage("structure", "complete");

      // Stage 4: authority layering — placeholder; merged into refine for now.
      stage("authority", "active");
      stage("authority", "complete");

      // Stage 5: score
      stage("score", "active");
      const sourcesSummary = sources
        .map(s => `[${s.id}] ${s.origin}: ${s.text.slice(0, 200).replace(/\n/g, " ")}`)
        .join("\n");
      const judge = await providers.judge.scoreSemantic({
        draft: markdown,
        sourcesSummary,
        keywords: config.keywords,
        format: config.format,
        signal,
      });
      const { signals, totalScore, notes } = aggregateScores({ markdown, judge });
      stage("score", "complete");

      const version = pass + 1;
      publish(jobId, "iteration", { version, score: totalScore, auto: !isUserIteration });

      if (!bestDraft || totalScore > bestDraft.score) {
        bestDraft = { markdown, score: totalScore, signals, notes };
      }

      // Stop early if we cleared the bar.
      if (totalScore >= passScore) break;
      priorDraft = markdown; // next pass refines this
    }

    if (!bestDraft) throw new Error("Pipeline produced no draft");

    // ─── Persist ──────────────────────────────────────────────────
    const now = new Date().toISOString();
    let draft: DraftRecord;
    if (input.iterateOn) {
      const existing = await repo.getDraft(workspaceId, input.iterateOn.draftId);
      if (!existing) throw new Error("Iterate target missing");
      const nextVersion = existing.version + 1;
      const entry: IterationEntry = {
        version: nextVersion,
        timestamp: now,
        score: bestDraft.score,
        feedback: input.iterateOn.feedback,
      };
      draft = await repo.appendIteration(workspaceId, existing.id, entry, bestDraft.markdown);
      draft = await repo.updateDraft(workspaceId, existing.id, {
        signals: bestDraft.signals,
        notes: bestDraft.notes,
        status: "ready",
      });
    } else {
      draft = await repo.createDraft({
        id: randomUUID(),
        workspaceId,
        config,
        version: 1,
        iterations: [{ version: 1, timestamp: now, score: bestDraft.score }],
        markdown: bestDraft.markdown,
        signals: bestDraft.signals,
        totalScore: bestDraft.score,
        notes: bestDraft.notes,
        status: "ready",
        createdAt: now,
        updatedAt: now,
      });
    }

    const done: SseDoneEvent = {
      draftId: draft.id,
      version: draft.version,
      totalScore: draft.totalScore,
      signals: draft.signals,
      notes: draft.notes,
      markdown: draft.markdown,
    };
    publish(jobId, "done", done);
    return draft;
  } catch (e: any) {
    publish(jobId, "error", {
      code: e?.code ?? "ORCHESTRATOR_FAILED",
      message: e?.message ?? "Job failed",
    });
    throw e;
  }
}
