# @unlocked/api

Fastify + TypeScript backend for Unlocked AEO. Powers the **AEO Content Engine**: corpus-aware content generation, Claude drafting, hybrid scoring (heuristics + Gemini judge), and a content library.

> System-level architecture lives in [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md). This README is the operator's view.

## Run it

```bash
# from repo root
npm install
npm run dev:api          # mock providers, no keys needed; listens on :3001
```

Mock mode runs the full pipeline (SSE events, scoring, persistence) using canned LLM responses. Switch to real LLMs:

```bash
cp apps/api/.env.example apps/api/.env
# fill in ANTHROPIC_API_KEY, GEMINI_API_KEY, FIRECRAWL_API_KEY
# set PROVIDER_MODE=real
npm run dev:api
```

## File map

```
src/
├── server.ts                       ← Fastify boot, plugin registration, route mounting
├── config.ts                       ← Single env loader (PORT, keys, quotas, providerMode)
├── middleware/
│   └── workspace.ts                ← TODO: real JWT → workspaceId. Currently reads x-workspace-id header.
├── lib/
│   ├── sse.ts                      ← Server-sent-events helper (proxy-busting headers, heartbeat)
│   ├── jobs.ts                     ← In-process job registry + event buffer for SSE replay
│   └── errors.ts                   ← ApiError + ErrorCodes (mapped to HTTP statuses)
├── repository/
│   ├── ContentRepository.ts        ← Storage-agnostic interface (uploads, drafts, library)
│   └── memory.adapter.ts           ← Default adapter — Maps keyed by workspaceId
├── providers/
│   ├── types.ts                    ← DraftProvider / JudgeProvider / ScrapeProvider interfaces
│   ├── index.ts                    ← buildProviders() — picks real vs mock based on PROVIDER_MODE
│   ├── mock.ts                     ← Canned responses for dev/CI
│   ├── claude.ts                   ← Anthropic streaming + prompt caching + backoff
│   ├── gemini.ts                   ← Gemini judge (entity + topical depth scoring)
│   ├── firecrawl.ts                ← URL → markdown
│   └── pdf.ts                      ← unpdf wrapper with typed errors for encrypted/scanned PDFs
├── engine/
│   ├── orchestrator.ts             ← Runs the 5 stages, emits SSE events, drives auto-iterate loop
│   ├── corpus.ts                   ← Builds the <corpus> block from URLs + uploads, with provenance
│   ├── prompts.ts                  ← System + user prompt templates (cached vs uncached split)
│   └── scoring/
│       ├── heuristics.ts           ← Citation / Structure / Freshness — pure functions over markdown
│       └── aggregate.ts            ← Combines heuristic + judge into AEOSignal[] + OptimisationNote[]
└── routes/
    ├── content.routes.ts           ← /content/jobs, /content/jobs/:id/stream, /content/drafts/:id/*
    ├── library.routes.ts           ← /library CRUD
    └── uploads.routes.ts           ← /content/uploads (multipart)
```

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/healthz` | Liveness + provider mode |
| POST | `/content/uploads` | Upload .md/.pdf source material (multipart) |
| POST | `/content/jobs` | Start a generation job → `{ jobId }` |
| GET | `/content/jobs/:jobId/stream` | **SSE** stream of pipeline events |
| POST | `/content/drafts/:draftId/iterate` | Regenerate (refine or new-base) |
| POST | `/content/drafts/:draftId/approve` | Mark approved |
| GET | `/content/drafts/:draftId` | Fetch full draft record |
| GET | `/content/drafts/:draftId/iterations` | Iteration history |
| GET | `/content/drafts/:draftId/export?format=md\|docx` | Download |
| GET | `/library` | List (with status / q / sort filters) |
| POST | `/library` | Save approved draft to library |
| GET | `/library/:id` | Fetch one |
| PATCH | `/library/:id` | Rename / retag / change status |
| DELETE | `/library/:id` | Delete |

## SSE event protocol

Every event has `id:` for `Last-Event-ID` reconnect, `event:` (one of the names below), and JSON `data:`.

| event | data |
|---|---|
| `stage` | `{ key: "entity"\|"citation"\|"structure"\|"authority"\|"score", status: "active"\|"complete"\|"failed" }` |
| `draftDelta` | `{ text: string }` (token chunks while streaming) |
| `iteration` | `{ version: number, score: number, auto: boolean }` |
| `warning` | `{ code: string, message: string }` (non-fatal) |
| `done` | `{ draftId, version, totalScore, signals, notes, markdown }` (terminal) |
| `error` | `{ code, message, retryAfter? }` (terminal) |

## Smoke test

```bash
curl -X POST http://localhost:3001/content/jobs \
  -H 'content-type: application/json' \
  -H 'x-workspace-id: ws-demo' \
  -d '{
    "config": {
      "mode": "generate",
      "brief": "Best CRM for mid-market SaaS",
      "audience": "RevOps leaders",
      "sources": "https://example.com/forrester",
      "keywords": "CRM, mid-market, RevOps",
      "format": "pillar-page",
      "tone": "authoritative"
    }
  }'

# Take the jobId from the response and:
curl -N -H 'x-workspace-id: ws-demo' http://localhost:3001/content/jobs/<jobId>/stream
```

You should see (in mock mode): five `stage` events, a stream of `draftDelta` events, one `iteration` event with `auto: true`, and a final `done` event with a real-looking draft markdown and 5 AEO signals adding up to the total score.

## Adding a new LLM provider

1. Implement `DraftProvider` (or `JudgeProvider`) in `src/providers/yourProvider.ts`.
2. Add it to `buildProviders()` in `src/providers/index.ts` behind a config flag.
3. Done — the orchestrator uses it.

## Adding a new persistence backend

1. Implement `ContentRepository` in `src/repository/yourAdapter.ts`.
2. Swap the `new MemoryAdapter()` line in `src/server.ts`.
3. Done — every route uses it.
