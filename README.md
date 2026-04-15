# Unlocked AEO

Monorepo for the Unlocked AEO product.

```
apps/web      ← Vite + React frontend (design-driven; see CLAUDE.md)
apps/api      ← Fastify + TypeScript backend (AEO Content Engine)
packages/types ← Shared TS interfaces — single source of truth for API contracts
specs/        ← Per-page UX/behaviour specs (created by the /page-complete skill)
docs/         ← System-level docs — start with docs/ARCHITECTURE.md
```

## Quickstart

```bash
npm install                  # installs all workspaces (web + api + types)

# Backend — mock providers, no API keys needed
npm run dev:api              # → http://localhost:3001

# Frontend — Vite dev server
npm run dev:web              # → http://localhost:5173
```

Health check: `curl http://localhost:3001/healthz`.

## Where to read next

- **Building or wiring UI** — read [CLAUDE.md](CLAUDE.md) (frontend rules) and [specs/](specs/) (per-page behaviour).
- **Building or running the backend** — read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the system view, then [apps/api/README.md](apps/api/README.md) for the operator view.
- **API contracts** — types live in [packages/types/src/index.ts](packages/types/src/index.ts). Both frontend and backend import from `@unlocked/types`. Don't duplicate shapes.

## Provider mode (backend)

The backend defaults to `PROVIDER_MODE=mock`, which runs the full Content Engine pipeline against canned LLM responses — no keys, no spend. To use real Claude / Gemini / Firecrawl, copy `apps/api/.env.example` → `apps/api/.env`, fill in keys, set `PROVIDER_MODE=real`, restart.
