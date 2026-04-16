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
  SourceRef,
  SseDoneEvent,
  StageKey,
} from "@unlocked/types";
import type { ContentRepository } from "../repository/ContentRepository.ts";
import type { Providers } from "../providers/index.ts";
import { publish } from "../lib/jobs.ts";
import { buildCorpus, type CorpusSource } from "./corpus.ts";
import {
  buildDraftSystemCached,
  buildDraftSystemUncached,
  buildDraftUser,
  buildRefineUser,
} from "./prompts.ts";
import { postProcessCitations } from "./citations.ts";
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
      onWarning: (code, message, detail) =>
        publish(jobId, "warning", { code, message, ...(detail ?? {}) }),
    });
    stage("entity", "complete");

    // ─── Stages 2-5 wrapped for auto-iteration ────────────────────
    const hasCorpus = sources.some(s => s.loaded);
    const systemUncached = buildDraftSystemUncached(config, hasCorpus);
    const systemCached = buildDraftSystemCached(corpus);

    let bestDraft: {
      markdown: string;
      score: number;
      signals: any;
      notes: any;
      usedSourceIds: Set<string>;
    } | null = null;
    const isUserIteration = !!input.iterateOn;

    // For user-driven `refine`, we start from the prior draft and skip auto-iteration.
    // For `new-base` and fresh jobs, we run up to maxAutoPasses (from rules YAML).
    let priorDraft: string | null = null;
    if (input.iterateOn?.mode === "refine") {
      const prev = await repo.getDraft(workspaceId, input.iterateOn.draftId);
      priorDraft = prev?.markdown ?? null;
    }

    const passes = isUserIteration && input.iterateOn?.mode === "refine" ? 1 : maxAutoPasses;

    const webCitationsByUrl = new Map<string, { url: string; title?: string; citedText?: string }>();
    const collectWeb = (cites: { url: string; title?: string; citedText?: string }[]) => {
      for (const c of cites) if (!webCitationsByUrl.has(c.url)) webCitationsByUrl.set(c.url, c);
    };

    for (let pass = 0; pass < passes; pass++) {
      // Stage 2: draft (or refine if we already have one)
      stage("citation", "active");
      let markdown: string;
      const streamDelta = (text: string) => publish(jobId, "draftDelta", { text });
      if (priorDraft) {
        const res = await providers.draft.refine({
          systemUncached,
          systemCached,
          user: buildRefineUser(priorDraft, input.iterateOn?.feedback ?? null, hasCorpus),
          signal,
          onDelta: streamDelta,
        });
        markdown = res.markdown;
        collectWeb(res.webCitations);
      } else {
        // On a user-initiated "new-base" iteration, pipe the feedback
        // into the fresh draft prompt so the rewrite actually reflects
        // what the user asked for (not just the original config).
        const newBaseFeedback =
          input.iterateOn?.mode === "new-base" ? input.iterateOn.feedback : null;
        const res = await providers.draft.streamDraft({
          systemUncached,
          systemCached,
          user: buildDraftUser(config, newBaseFeedback),
          signal,
          onDelta: streamDelta,
        });
        markdown = res.markdown;
        collectWeb(res.webCitations);
      }
      stage("citation", "complete");

      // Stage 3: structure pass (refine for AEO)
      stage("structure", "active");
      const structRes = await providers.draft.refine({
        systemUncached,
        systemCached,
        user: buildRefineUser(markdown, null, hasCorpus),
        signal,
        onDelta: streamDelta,
      });
      markdown = structRes.markdown;
      collectWeb(structRes.webCitations);
      stage("structure", "complete");

      // Post-process citations: strip hallucinated [s#] markers,
      // convert valid ones into hyperlinks, append a Sources section.
      const post = postProcessCitations(markdown, sources);
      markdown = post.markdown;

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
      const { signals, totalScore, notes } = aggregateScores({ markdown, judge, hasSources: hasCorpus });
      stage("score", "complete");

      const version = pass + 1;
      publish(jobId, "iteration", { version, score: totalScore, auto: !isUserIteration });

      if (!bestDraft || totalScore > bestDraft.score) {
        bestDraft = { markdown, score: totalScore, signals, notes, usedSourceIds: post.usedSourceIds };
      }

      // Stop early if we cleared the bar.
      if (totalScore >= passScore) break;
      priorDraft = markdown; // next pass refines this
    }

    if (!bestDraft) throw new Error("Pipeline produced no draft");

    const sourceRefs: SourceRef[] = sources.map(s => toSourceRef(s, bestDraft!.usedSourceIds));

    // Append web_search citations (Claude-discovered). These are always
    // `cited: true` — Anthropic only attaches citation metadata to blocks
    // the model actually used. IDs continue the s# sequence.
    let nextIdx = sourceRefs.length + 1;
    for (const wc of webCitationsByUrl.values()) {
      sourceRefs.push({
        id: `s${nextIdx++}`,
        type: "web",
        origin: wc.url,
        title: wc.title,
        loaded: true,
        cited: true,
      });
    }

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
        sources: sourceRefs,
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
        sources: sourceRefs,
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
      sources: draft.sources,
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

function toSourceRef(s: CorpusSource, usedIds: Set<string>): SourceRef {
  return {
    id: s.id,
    type: s.type,
    origin: s.origin,
    title: s.title,
    loaded: s.loaded,
    error: s.error,
    cited: usedIds.has(s.id),
  };
}
