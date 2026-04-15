// /content/* — the heart of the engine. Every route here corresponds
// 1:1 to an `ACTION:` log call in the frontend (see specs/content-
// optimisation.spec.md). When the integration dev wires the UI, they
// replace each console.log with the matching fetch / EventSource call.

import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { createJob, subscribe, getJob } from "../lib/jobs.ts";
import { openSse } from "../lib/sse.ts";
import { ApiError, ErrorCodes } from "../lib/errors.ts";
import { runJob } from "../engine/orchestrator.ts";
import type { ContentRepository } from "../repository/ContentRepository.ts";
import type { Providers } from "../providers/index.ts";

const contentConfigSchema = z.object({
  mode: z.enum(["generate", "optimize"]),
  brief: z.string().default(""),
  audience: z.string().default(""),
  sources: z.string().default(""),
  keywords: z.string().default(""),
  format: z.enum(["blog-post", "faq", "comparison", "pillar-page", "how-to"]),
  tone: z.enum(["technical", "accessible", "authoritative"]),
  existingContent: z.string().optional(),
  optimizationGoal: z.string().optional(),
});

const createJobBodySchema = z.object({
  config: contentConfigSchema,
  uploadIds: z.array(z.string()).default([]),
});

const iterateBodySchema = z.object({
  feedback: z.string().default(""),
  mode: z.enum(["refine", "new-base"]).default("refine"),
});

export function registerContentRoutes(
  app: FastifyInstance,
  deps: { repo: ContentRepository; providers: Providers },
) {
  // ─── POST /content/jobs ──────────────────────────────────────────
  // Maps to ACTION: content_configure_submit
  app.post("/content/jobs", async (req, reply) => {
    const parsed = createJobBodySchema.parse(req.body);
    const job = createJob();

    // Fire-and-forget orchestrator; SSE consumers stream the events.
    runJob({
      jobId: job.id,
      workspaceId: req.workspaceId,
      config: parsed.config,
      uploadIds: parsed.uploadIds,
      repo: deps.repo,
      providers: deps.providers,
      abort: job.abort,
    }).catch(err => req.log.error({ err }, "runJob failed"));

    reply.code(202).send({ jobId: job.id });
  });

  // ─── GET /content/jobs/:jobId/stream ─────────────────────────────
  // SSE channel powering the Processing UI animation.
  app.get<{ Params: { jobId: string } }>(
    "/content/jobs/:jobId/stream",
    async (req, reply) => {
      const job = getJob(req.params.jobId);
      if (!job) throw new ApiError(ErrorCodes.JOB_NOT_FOUND, "Job not found", 404);

      const channel = openSse(reply);
      const lastEventId = req.headers["last-event-id"] as string | undefined;
      const heartbeat = setInterval(() => channel.heartbeat(), 15_000);

      const unsubscribe = subscribe(req.params.jobId, lastEventId, e => {
        channel.send(e.event, e.data, e.id);
        if (e.event === "done" || e.event === "error") {
          clearInterval(heartbeat);
          channel.close();
        }
      });

      reply.raw.on("close", () => {
        clearInterval(heartbeat);
        unsubscribe();
        // If client disconnects mid-stream and no other subscribers, abort
        // the LLM call so we stop billing.
        if (job.subscribers.size === 0 && !job.done) {
          job.abort.abort();
        }
      });
    },
  );

  // ─── POST /content/drafts/:draftId/iterate ───────────────────────
  // Maps to ACTION: content_regenerate
  app.post<{ Params: { draftId: string } }>(
    "/content/drafts/:draftId/iterate",
    async (req, reply) => {
      const { feedback, mode } = iterateBodySchema.parse(req.body);
      const draft = await deps.repo.getDraft(req.workspaceId, req.params.draftId);
      if (!draft) throw new ApiError(ErrorCodes.DRAFT_NOT_FOUND, "Draft not found", 404);

      const job = createJob();
      runJob({
        jobId: job.id,
        workspaceId: req.workspaceId,
        config: draft.config,
        uploadIds: [],
        repo: deps.repo,
        providers: deps.providers,
        abort: job.abort,
        iterateOn: { draftId: draft.id, mode, feedback },
      }).catch(err => req.log.error({ err }, "iterate runJob failed"));

      reply.code(202).send({ jobId: job.id, draftId: draft.id });
    },
  );

  // ─── POST /content/drafts/:draftId/approve ───────────────────────
  // Maps to ACTION: content_approve
  app.post<{ Params: { draftId: string } }>(
    "/content/drafts/:draftId/approve",
    async (req, reply) => {
      const draft = await deps.repo.approveDraft(req.workspaceId, req.params.draftId);
      reply.send(draft);
    },
  );

  // ─── GET /content/drafts/:draftId ────────────────────────────────
  // Used by the UI to re-hydrate the Review/Output stages on refresh.
  app.get<{ Params: { draftId: string } }>(
    "/content/drafts/:draftId",
    async (req, reply) => {
      const draft = await deps.repo.getDraft(req.workspaceId, req.params.draftId);
      if (!draft) throw new ApiError(ErrorCodes.DRAFT_NOT_FOUND, "Draft not found", 404);
      reply.send(draft);
    },
  );

  // ─── GET /content/drafts/:draftId/iterations ─────────────────────
  // Maps to ACTION: content_view_history
  app.get<{ Params: { draftId: string } }>(
    "/content/drafts/:draftId/iterations",
    async (req, reply) => {
      const draft = await deps.repo.getDraft(req.workspaceId, req.params.draftId);
      if (!draft) throw new ApiError(ErrorCodes.DRAFT_NOT_FOUND, "Draft not found", 404);
      reply.send(draft.iterations);
    },
  );

  // ─── GET /content/drafts/:draftId/export?format=md|docx ──────────
  // Maps to ACTION: content_download
  // .docx export is stubbed — see backlog.
  app.get<{ Params: { draftId: string }; Querystring: { format?: "md" | "docx" } }>(
    "/content/drafts/:draftId/export",
    async (req, reply) => {
      const draft = await deps.repo.getDraft(req.workspaceId, req.params.draftId);
      if (!draft) throw new ApiError(ErrorCodes.DRAFT_NOT_FOUND, "Draft not found", 404);
      const format = req.query.format ?? "md";
      const filename = sanitiseFilename(extractTitle(draft.markdown) ?? draft.id);
      if (format === "md") {
        reply
          .header("Content-Type", "text/markdown")
          .header("Content-Disposition", `attachment; filename="${filename}.md"`)
          .send(draft.markdown);
        return;
      }
      // TODO: pandoc / md-to-docx integration. For now return JSON stub.
      reply.code(501).send({
        error: "DOCX export not yet implemented",
        hint: "Choose md-to-docx or pandoc; see plan backlog",
      });
    },
  );
}

function extractTitle(md: string) {
  return md.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? null;
}
function sanitiseFilename(s: string) {
  return s.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 80);
}
