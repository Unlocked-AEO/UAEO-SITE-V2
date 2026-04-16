# Unlocked AEO — Architecture

> Living document. Update whenever a piece of the system moves or a contract changes. Keep it scannable; link to deeper docs ([apps/api/README.md](../apps/api/README.md), [specs/*.spec.md](../specs/)) instead of duplicating.

## Repository layout

```
unlocked-aeo/                 ← npm workspaces root
├── apps/
│   ├── web/                  ← Vite + React frontend (fully wired to the API)
│   └── api/                  ← Fastify + TypeScript backend (AEO Content Engine)
│       └── rules/            ← Externally authored content rules (YAML)
├── packages/
│   └── types/                ← Shared TS interfaces. Single source of truth
│                               for ContentConfig / DraftRecord / SSE events.
├── specs/                    ← Per-page UX/behaviour specs (via /page-complete)
├── docs/                     ← System-level docs (this file)
├── CLAUDE.md                 ← Frontend-design instructions (applies to apps/web)
├── README.md                 ← Top-level intro + quickstart
└── package.json              ← Workspaces config + cross-workspace npm scripts
```

Workspaces are wired via `"workspaces": ["apps/*", "packages/*"]` in the root `package.json`. One `npm install` at the root installs every workspace with hoisted `node_modules` and symlinks for `@unlocked/*` packages.

## What links to what

```
            ┌──────────────────────────────────────────────┐
            │   apps/web  (Vite + React + Tailwind)        │
            │   ContentOptimisation.tsx + stages           │
            │                                              │
            │   fetch /api/*        ← REST (JSON)          │
            │   EventSource /api/…  ← SSE (job stream)     │
            └───────────────────────┬──────────────────────┘
                                    │ Vite dev proxy: /api → :3001
                                    ▼
            ┌──────────────────────────────────────────────┐
            │   apps/api  (Fastify 5 + TypeScript)         │
            │   /content /library /content/uploads         │
            │                                              │
            │   Orchestrator  → Providers triple           │
            │   Repository    → storage-agnostic port      │
            │   Rules loader  → YAML-authored content rules│
            └───┬───────────────────────────┬──────────────┘
                │                           │
                ▼                           ▼
        MemoryAdapter           Anthropic Claude  (streaming draft + refine)
        (in-process, dev)       Google Gemini     (entity + depth judge)
                                Firecrawl         (URL → markdown)
                                unpdf / mammoth   (file parsers)
```

Both `apps/web` and `apps/api` import shapes from `@unlocked/types`. **Do not redefine these shapes locally** — the package is the contract.

## Backend pipeline (the AEO Content Engine)

Source-of-truth UX doc: [specs/content-optimisation.spec.md](../specs/content-optimisation.spec.md).

### Request lifecycle

1. **Upload** — `POST /content/uploads` (multipart) parses the file synchronously and returns `{ uploadId, filename, sizeBytes, tokenCount, preview }`. See [parsers](#file-parsers) below for supported types.
2. **Configure submit** — `POST /content/jobs` with `{ config: ContentConfig, uploadIds: string[] }`. Returns `{ jobId }` immediately; the orchestrator runs in the background.
3. **SSE stream** — `GET /content/jobs/:jobId/stream` emits, in order:
   - `stage` — `{ key: StageKey, status: "active"|"complete"|"failed" }`
   - `draftDelta` — `{ text }` token chunks (fires during **every pass**, both initial streamDraft and subsequent refine calls)
   - `warning` — `{ code, message }` non-fatal (e.g. one source URL failed)
   - `iteration` — `{ version, score, auto }` at the end of each pass
   - `done` — final `SseDoneEvent` with `{ draftId, version, totalScore, signals, notes, sources, markdown }`
   - `error` — terminal failure with optional `retryAfter`
4. **Iterate** — `POST /content/drafts/:draftId/iterate` with `{ feedback, mode: "refine"|"new-base" }` → new `jobId` → new SSE stream.
5. **Approve / save** — `POST /content/drafts/:draftId/approve`, then `POST /library` to persist as a `LibraryItem`.

### Orchestrator stages ([orchestrator.ts](../apps/api/src/engine/orchestrator.ts))

| Stage | Module | Streams tokens? | Notes |
|---|---|---|---|
| 1 · Entity (ingest) | `engine/corpus.ts` | — | Firecrawl for URLs + cached parsed text for uploads. Caps at ~24k tokens, drops URLs first on overflow. |
| 2 · Citation (draft / refine) | `providers/claude.streamDraft` or `.refine` | ✅ | First pass = streamDraft. Pass 2+ = refine with the prior draft. Both stream `draftDelta`. |
| 3 · Structure (refine) | `providers/claude.refine` | ✅ | AEO structural pass — question headers, tightened leads, freshness markers. Streams too. |
| 3.5 · Citation post-process | `engine/citations.ts` | — | Between refine and scoring. Strips hallucinated `[s#]` markers, converts valid ones to `[[N]](url)` inline links, appends the `## Sources` section. The heuristic scorer and Gemini judge both see the final form. |
| 4 · Authority | *(merged into refine for v1)* | — | Reserved for a separate prompt when we have measurable lift. |
| 5 · Score | `engine/scoring/` + `providers/gemini` | — | Hybrid scoring (heuristics + Gemini judge). |

Auto-iterate loop: up to `thresholds.maxAutoPasses` (YAML-authored, default 2) if the combined score is below `thresholds.passScore` (default 80). `argmax(score)` wins — the best-scoring pass is surfaced as v1, not the last.

### Scoring (out of 100)

| Signal | Max | Method | Where |
|---|---|---|---|
| Entity Clarity | 25 | Gemini judge | [providers/gemini.ts](../apps/api/src/providers/gemini.ts) |
| Citation Signals | 25 | Heuristic (see below) | [engine/scoring/heuristics.ts](../apps/api/src/engine/scoring/heuristics.ts) |
| Answer Structure | 20 | Heuristic (Q-form ratio, scannability, header depth) | same |
| Topical Depth | 20 | Gemini judge | `providers/gemini.ts` |
| Freshness | 10 | Heuristic (Last updated, recent year, "as of") | `engine/scoring/heuristics.ts` |

Heuristic weights live in code — they're numerical tuning. The **signal labels, descriptions, max scores, and note copy** come from the YAML rules and aggregate in [engine/scoring/aggregate.ts](../apps/api/src/engine/scoring/aggregate.ts). Signal `maxScore`s must sum to 100 — enforced at boot by the Zod schema.

#### Citation Signals rubric (25 pts)

`scoreCitation(markdown, hasSources)` has six buckets, each independently verifiable by regex — no judgement calls:

| Bucket | Max | What it rewards |
|---|---|---|
| Inline source links | 6 | `[text](http…)` links in the **body** (Sources section excluded). 1.5/link. Gated by `hasSources`. |
| Sources section well-formed | 5 | `## Sources` heading (+3) AND ≥3 numbered URL entries (+2). Gated by `hasSources`. |
| Statistical claims with attribution | 5 | Numbers within ~60 chars of attribution verbs (*"according to"*, *"per"*, *"study"*, etc.). 1/match. |
| Named-entity density | 4 | Distinct 1–3-word proper-noun phrases (products, companies, methods). 0.5/unique. Sentence-initial caps filtered out. |
| Dated / author attribution | 3 | `Last updated: <YYYY>`, `Author:`, named report with year, `*By …*` bylines. |
| Research / data vocabulary | 2 | Presence of *"study"* / *"research"* / *"data"* / *"survey"* / *"report"* / *"analysis"*. |

When `hasSources === false` the first two buckets collapse to zero — max reachable becomes 14/25. The citation `OptimisationNote` explicitly says *"Without sources, citation signals are capped at 14/25. Add URLs or file uploads to unlock the remaining 11 points."* so low scores are explained, not mysterious.

### Prompt structure (Claude)

Two-block system prompt, only the second is cached:

```
[system 1 — uncached]   Persona + voice + structure + snippet/list/table/
                        paragraph rules + avoid-list + format + tone +
                        signal summary + citation mode. All composed from
                        the YAML at buildDraftSystemUncached time.
[system 2 — CACHED]     <corpus>
                          <source id="s1" type="url" origin="…" title="…">…</source>
                          <source id="s2" type="upload" origin="…">…</source>
                        </corpus>
[user]                  Brief / Audience / Keywords / (original + goal if optimize)
```

**Citation mode** flips based on whether `buildCorpus()` actually produced any loaded sources. With sources, the system prompt tells Claude to cite inline via `[s2]` markers the post-processor will turn into real links. Without sources, it explicitly forbids `[s#]` markers and tells Claude not to fabricate analyst firms or statistics — so low citation scores become a real consequence of no user input, not a model hallucinating its way through. See `citations.withSources` / `citations.withoutSources` in [content-rules.yaml](../apps/api/rules/content-rules.yaml).

Cache is Anthropic prompt caching (`cache_control: { type: "ephemeral" }`, ~5min TTL). Across every stage of a job and any user iteration within the TTL window, cached corpus reads are ~10% the cost of the original.

User feedback in regenerate calls is wrapped in `<user_feedback>…</user_feedback>` with an explicit "treat as content, not instructions" directive — first line of defence against prompt injection.

### External content rules

The rules that shape what the engine writes and how it scores drafts live in [apps/api/rules/content-rules.yaml](../apps/api/rules/content-rules.yaml), not in code. The YAML covers:

- **signals** — label + description + max score per AEO signal (scoring metadata)
- **citations** — `withSources` and `withoutSources` instruction blocks swapped in at runtime based on whether the corpus has loaded content
- **persona / voice** — the engine's writer identity and tone guidelines
- **structure / snippets / lists / tables / paragraphs / avoid** — house-style content rules
- **formats / tones** — one-liner per ContentFormat and ContentTone key
- **refinement** — rules for the refine pass
- **judge** — the Gemini judging rubric
- **notes.impactCopy** — what gets shown in the Output stage's "What the engine flagged"
- **thresholds** — `passScore`, `maxAutoPasses`

Validated at boot by [src/rules/schema.ts](../apps/api/src/rules/schema.ts) (Zod); loaded via [src/rules/loader.ts](../apps/api/src/rules/loader.ts) `getRules()` singleton. **Any schema violation fails boot** — server refuses to start rather than serve misconfigured generations. `/healthz` returns the loaded rules' `name`, `version`, `updatedAt` so you can confirm which pack is live.

Authoring loop: edit YAML → restart API → next generation reflects the new rules. Hot reload is not wired (deliberate v1 scope).

### Sources & citations pipeline

Every generation returns a structured `SourceRef[]` alongside the markdown so the UI can show exactly which URLs loaded, which failed (and why), and which the draft actually cited.

```
user URLs ────► Firecrawl ────► CorpusSource[]  (loaded: true/false, error?, title?)
uploads  ────► parseUpload ────► CorpusSource[]
                                      │
                                      ▼
                         <corpus> block → Claude
                                      │
                                draft markdown with [s1] [s2] …
                                      │
                                      ▼
                           postProcessCitations()
                           ├── valid [s#] → [[N]](url) inline links
                           ├── hallucinated [s#] → stripped
                           └── appends `## Sources` section
                                      │
                                      ▼
                    SseDoneEvent.sources: SourceRef[]
                     (id, type, origin, title, loaded, error, cited)
```

[SourceRef](../packages/types/src/index.ts) is the shared type. [citations.ts](../apps/api/src/engine/citations.ts) owns the post-processor: invalid / unloaded markers are never rendered to users, and the Sources section always lists **every** source the engine had access to (cited, loaded-but-uncited, and failed) so the reader sees the full provenance.

Firecrawl failures are surfaced with specific reasons — paywall, JS-only page, 4xx status, network error — rather than a generic "could not fetch" string. See [firecrawl.ts](../apps/api/src/providers/firecrawl.ts) and [corpus.ts](../apps/api/src/engine/corpus.ts).

### File parsers ([providers/parsers.ts](../apps/api/src/providers/parsers.ts))

`parseUpload()` dispatches on MIME type and filename extension, returning cleaned plain text:

| Type | Engine | Notes |
|---|---|---|
| `.pdf` | `unpdf` | Typed errors for `PDF_ENCRYPTED` / `PDF_NO_TEXT_LAYER` (OCR is v1.1). |
| `.docx` | `mammoth` | Raw text extraction. |
| `.html` / `.htm` | built-in tag strip + entity decode | Good enough for source material. |
| `.md` / `.markdown` / `.txt` / `text/*` | direct UTF-8 | No transformation. |

The route [routes/uploads.routes.ts](../apps/api/src/routes/uploads.routes.ts) accepts any `text/*`, `application/pdf`, or `application/vnd.openxmlformats-*` MIME, plus the listed extensions as a fallback. Parsed text is cached on the `UploadRecord`; we never re-parse the same file for a later job.

## Endpoint ↔ UI map

Each API endpoint is called from a specific component. The old `console.log("ACTION: …")` sites have all been replaced by real fetch / EventSource calls via [apps/web/src/lib/api/](../apps/web/src/lib/api/).

| UI surface | API endpoint |
|---|---|
| `ConfigureForm` file drop + Upload button | `POST /api/content/uploads` (multipart, per file) |
| `ConfigureForm` submit (`onSubmit`) | `POST /api/content/jobs` |
| `ProcessingStage` | `GET /api/content/jobs/:jobId/stream` (SSE) |
| `ReviewStage` Regenerate (refine or new-base) | `POST /api/content/drafts/:draftId/iterate` |
| `ReviewStage` Approve → | `POST /api/content/drafts/:draftId/approve` then `GET /api/content/drafts/:draftId` |
| `OutputStage` Download .md / .docx | `GET /api/content/drafts/:draftId/export?format=md\|docx` (anchor `href`) |
| `OutputStage` Save to library | `POST /api/library` |
| `ContentLibrary` grid | `GET /api/library` (refetches on `refreshKey` bump) |
| Library card delete | `DELETE /api/library/:id` |

### Shared frontend infra

- [apps/web/src/lib/api/client.ts](../apps/web/src/lib/api/client.ts) — typed `fetch` wrappers. Every call sends `x-workspace-id` header.
- [apps/web/src/lib/api/sse.ts](../apps/web/src/lib/api/sse.ts) — `streamJob(jobId, handlers)` typed EventSource wrapper. Exposes `SourceRef` for draft/done payloads.
- [apps/web/src/components/ui/Markdown.tsx](../apps/web/src/components/ui/Markdown.tsx) — shared `react-markdown` + `remark-gfm` renderer. Used by Review and Output. Renders tables (bordered card, tinted header, striped rows), lists (teal markers), code blocks, links (styled teal), blockquotes, task lists, HRs. Citation chips rendered as plain-markdown `[[N]](url)` links so no `rehype-raw` is needed.
- [apps/web/src/components/dashboard/content-optimisation/SourcesCard.tsx](../apps/web/src/components/dashboard/content-optimisation/SourcesCard.tsx) — sidebar panel in Review and Output. Groups each source as cited (teal), loaded-but-uncited (amber), or failed (red) with the Firecrawl error reason shown.

Vite dev proxy in [apps/web/vite.config.ts](../apps/web/vite.config.ts) rewrites `/api/*` to `http://localhost:3001`, so the frontend uses same-origin URLs and avoids CORS in dev.

### ProcessingStage layout

Two-column: fixed-width **status rail** on the left (~380px) and a fixed-height **live draft preview** card on the right (~640px). The status rail shows the current pass, current stage label, elapsed time, the 5-step pipeline with per-stage duration, iteration score chips, and any source-fetch warnings. The preview card streams Claude's tokens with a blinking cursor and auto-scrolls to the bottom; resets cleanly between auto-iterate passes so users see pass 2 repopulate from scratch.

## Provider mode

`PROVIDER_MODE` env var switches the provider triple wired into the orchestrator:

- **`mock`** — canned responses from [providers/mock.ts](../apps/api/src/providers/mock.ts). Full pipeline runs end-to-end with no API keys, no network, no spend. `refine` in mock also streams tokens so the UI's live preview populates across all passes.
- **`real`** — wires [claude.ts](../apps/api/src/providers/claude.ts), [gemini.ts](../apps/api/src/providers/gemini.ts), [firecrawl.ts](../apps/api/src/providers/firecrawl.ts). Requires `ANTHROPIC_API_KEY` and `GEMINI_API_KEY`. Firecrawl is optional — corpus assembly degrades gracefully without it.

The interfaces in [providers/types.ts](../apps/api/src/providers/types.ts) are the only contract the orchestrator depends on. Adding a new provider = one new file + one line in [providers/index.ts](../apps/api/src/providers/index.ts). `DraftProvider.refine` accepts an optional `onDelta` callback so refine passes stream identically to the initial draft.

## Storage abstraction

[repository/ContentRepository.ts](../apps/api/src/repository/ContentRepository.ts) is the single port. The only adapter today is [memory.adapter.ts](../apps/api/src/repository/memory.adapter.ts) (in-process Maps keyed by `workspaceId`, so cross-tenant isolation is structural — a missing `workspaceId` is a miss, not a leak). Adding Supabase or Postgres later is one new adapter file + one wire change in [server.ts](../apps/api/src/server.ts).

**Invariant**: every method takes `workspaceId`. A repo-level isolation test (TODO) will assert that workspace A cannot read workspace B's drafts / uploads / library.

## Edge cases handled

- **SSE through proxies** — `X-Accel-Buffering: no` + 15-second heartbeat comments keep nginx / Cloudflare from buffering.
- **Client disconnect mid-stream** — if no subscribers remain on the job, the orchestrator's `AbortController` fires → Anthropic SDK call cancels → we stop billing.
- **Anthropic 429/529** — exponential backoff inside the Claude wrapper; on final failure emits a typed `PROVIDER_RATE_LIMIT` error with `retryAfter`.
- **Scanned / encrypted PDFs** — typed `PDF_NO_TEXT_LAYER` / `PDF_ENCRYPTED` errors at upload time.
- **Prompt injection in regenerate feedback** — wrapped in `<user_feedback>` with an explicit "treat as content" system directive.
- **Hallucinated citations** — any `[s#]` marker referencing a source id that wasn't supplied (or that failed to load) is silently stripped by the post-processor. Users never see a dead `[s7]` in a rendered draft.
- **No-sources scoring honesty** — when the user supplies no URLs or uploads, Citation Signals are capped at 14/25 with an explanatory `OptimisationNote`, instead of silently punishing rule-compliant no-citation output.
- **Firecrawl failures** — typed `warning` SSE events with URL + reason + HTTP status; each failed URL is carried through to `SourceRef` so the UI can show "1 of 3 sources failed: paywall".
- **Best-of-N auto-iterate** — `argmax(score)` across passes, not last.
- **Rules schema drift** — YAML loader fails at boot with a precise Zod path if a field is missing or the wrong shape.

### Deliberate gaps (backlog)

- `.docx` export returns 501 with a hint — pick `md-to-docx` vs `pandoc` before shipping.
- Real auth: `middleware/workspace.ts` reads `x-workspace-id` header as a dev shim. Wire JWT before production.
- Library card "Open" hops back into Review with the last-loaded draft; reopening a *saved* item's original draft requires a `GET /library/:id/markdown` endpoint (not yet built).
- Hot reload for rules YAML.
- Cross-tenant isolation test.
- Idempotency key for "generate same config" dedupe.

## Local dev quickstart

```bash
# from repo root
npm install                     # installs all workspaces

# terminal 1 — backend
npm run dev:api                 # mock mode; no keys needed. Listens on :3001

# terminal 2 — frontend
npm run dev:web                 # Vite on :5173, proxies /api → :3001
```

Smoke the API directly:

```bash
curl http://localhost:3001/healthz
# → { "ok": true, "providerMode": "mock", "uptime": …, "rules": { "name": "AEO Content Rules v1", "version": 1, "updatedAt": "…" } }

JOB=$(curl -s -X POST http://localhost:3001/content/jobs \
  -H 'content-type: application/json' \
  -H 'x-workspace-id: ws-demo' \
  -d '{"config":{"mode":"generate","brief":"Best CRM for mid-market SaaS","audience":"RevOps leaders","sources":"","keywords":"CRM,mid-market","format":"pillar-page","tone":"authoritative"}}' \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['jobId'])")

curl -N -H 'x-workspace-id: ws-demo' http://localhost:3001/content/jobs/$JOB/stream
# → stage events + draftDelta tokens + iteration + done
```

To use real LLMs: copy [apps/api/.env.example](../apps/api/.env.example) → `apps/api/.env`, fill `ANTHROPIC_API_KEY` / `GEMINI_API_KEY` / `FIRECRAWL_API_KEY`, set `PROVIDER_MODE=real`, restart.

## Iterating on content rules

Rules live at [apps/api/rules/content-rules.yaml](../apps/api/rules/content-rules.yaml). To change the engine's voice, structure rules, format guidance, thresholds, or judge rubric:

1. Edit the YAML.
2. Restart the API (`npm run dev:api`). Boot validates; fails loudly with the bad path if something's off.
3. Run a generation. `/healthz` confirms which pack is loaded.

No code changes needed.
