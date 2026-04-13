# Content Optimisation (AEO Content Engine)

**File**: `src/pages/dashboard/ContentOptimisation.tsx`
**Route**: `/dashboard/content-optimisation`
**Date**: 2026-04-13

## What's on the Page

The Content Optimisation page is the client-facing entry point to the AEO Content Engine — a multi-stage flow for generating brand-new, AI-engine-optimised content or restructuring existing content into AEO-ready assets. The page has **two top-level views** toggled by a prominent switcher in the hero: **Engine** (the active generation flow) and **Library** (previously created pieces). Every asset produced is auto-scored against the Unlocked AEO proprietary scoring framework (5 signals, 100 points total) before the client sees it.

### Hero (always visible)

- **AEO Content Engine** badge — small teal pill label, identifies the feature
- **Page title** — "Content Optimisation"
- **Subtitle** — one-line explainer of what the engine does
- **Start over back button** — appears only when the user has progressed past the first stage of the Engine view; resets the flow to stage 1
- **View toggle** — large pill switcher (Engine | Library) with icons, sliding teal indicator, and a count chip on Library showing total saved pieces

### Engine view — 5-stage linear flow

The Engine runs left-to-right through 5 stages, tracked by a persistent **Stage Stepper** card at the top. Stepper circles: grey = upcoming, teal-filled = active, teal-tinted with check = completed. Completed stages are clickable to jump back.

#### Stage 1 — Input (Mode Select)

Two equal-weight cards side-by-side, each its own top-level white card:
- **Generate New Content** — for creating fresh assets (pillar pages, FAQs, comparison articles, thought leadership). Uses "Create" badge.
- **Optimize Existing Content** — for reworking live content (underperforming blog posts, uncited product pages, docs). Uses "Transform" badge.

Each card shows: badge, title, subtitle, description, and a row of example-use-case chips anchored at the bottom. Cards have aligned min-heights so titles/descriptions line up regardless of length.

#### Stage 2 — Configure

Form for briefing the engine. Fields vary slightly by mode:
- **Existing content** (Optimize only) — textarea for pasting/uploading original content, with hint about supported formats
- **Optimization goal** (Optimize only) — target AI query or citation goal
- **Content brief / topic goal** (Generate only) — textarea, the topical intent
- **Target audience** — who the content is written for
- **Target keywords & entities** — comma-separated, full width
- **Source materials** — full-width block combining a URL text input AND a drag-and-drop file upload zone; accepts `.md` and `.pdf` files up to 10MB each. Uploaded files list below with format badge (MD/PDF), filename, size, and a remove button.
- **Content format** — vertical list of radio-style cards: Blog Post, FAQ Page, Comparison, Pillar Page, How-To Guide
- **Tone** — vertical list of radio-style cards: Technical, Accessible, Authoritative

Footer has a **Back** button (left) and **Generate Draft →** primary CTA (right).

#### Stage 3 — Processing

Animated simulation of the AEO pipeline. Shows five sequential steps with animated dot indicators:
1. Entity Recognition
2. Citation Signal Injection
3. Q&A and Header Formatting
4. Authority Layering
5. AEO Score Calculation

Each step highlights teal when active, fills with a check when complete. Auto-advances every ~0.9s then proceeds to Review.

#### Stage 4 — Review & Approve

Two-column layout:
- **Left (main)**: Draft card with version label, iteration count, and score. Draft rendered with lightweight markdown (headers, lists, bold). Scrollable. A small inline **AI disclaimer** sits just under the draft reminding the user to review for factual accuracy, brand alignment and compliance. Below that: free-form feedback textarea, quick-suggestion chips ("Make it more technical", "Shorten by 30%", etc.) that append to the textarea, and two CTAs — `Regenerate` (dark) and `Approve →` (primary teal).
- **Right (sidebar)**: `AEOScoreCard` showing total score out of 100 with a progress bar and a breakdown of all 5 signals (label, score/max, coloured bar per signal, description). Below it, an `Iteration history` card listing each version with score and associated feedback.

Regenerate loops back to Stage 3 with feedback appended.

#### Stage 5 — Output

Approval success state, shown in three sections:
- **AI disclaimer banner** (top of view) — amber warning-style card stating the content is AI-generated and must be reviewed for factual accuracy, brand alignment and legal/compliance requirements before publishing; clarifies that the AEO score reflects structural optimisation, not claim verification
- **Success banner** — green-tint gradient card with checkmark, final score, and three action buttons: Copy, Download .md, Download .docx
- **Final content card** — the approved markdown rendered in a readable scroll container
- **What the engine changed** — list of optimisation notes. Each note has a category badge (Entity / Citation / Structure / Depth / Freshness), what changed, and the impact mapped to an AEO signal.
- **CMS Publish (future)** — dashed-border card with four disabled CMS buttons (WordPress, HubSpot, Webflow, Custom API) and a "Coming soon — V3 release" label
- **Score sidebar** — same `AEOScoreCard` plus a Next steps card with "Generate another piece" and "Save to library" buttons

### Library view

An alternative view showing all previously generated/optimised pieces. Accessible any time via the toggle.

- **Stats row (4 KPI cards)**: Total pieces, Approved, Avg AEO score, Total words
- **Toolbar**: search input (by title/tag/content), status filter pills (All · Approved · In Review · Drafts · Archived), sort dropdown (Most recent / Score high-to-low / Score low-to-high), and `+ New content` CTA
- **Content grid**: 2-column grid of library cards. Each card shows:
  - Status badge (colour-coded) + mode badge (Generated / Optimized)
  - Score out of 100 (colour-coded: teal ≥85, warning 75–84, danger <75)
  - Title, 2-line excerpt, tag chips
  - Footer row with format, word count, updated timestamp, and icon buttons (Copy, Download, More)

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| View toggle — Engine | Switches the page body to the Engine flow (state variable `view = "engine"`) |
| View toggle — Library | Switches to the Library grid (`view = "library"`). Count chip reflects total library items. |
| Start over (hero back) | Resets stage to `input`, clears `mode` and `config` state. Logs no explicit action — just internal reset. |
| Stage Stepper step (completed only) | Jumps the flow back to that stage. Upcoming stages are disabled. |
| Mode card — Generate New | `ACTION: content_select_mode` with `mode: "generate"`; advances to Configure stage |
| Mode card — Optimize Existing | `ACTION: content_select_mode` with `mode: "optimize"`; advances to Configure stage |
| Change mode button | Returns from Configure to Input |
| Configure Back button | Same as Change mode |
| Generate Draft → button | `ACTION: content_configure_submit` with the full `ContentConfig` payload (mode, brief, audience, sources, keywords, format, tone, and mode-specific fields); advances to Processing |
| Source materials file drop / browse | `ACTION: content_upload_sources` with filenames. Should upload and parse .md / .pdf files to be used as engine reference material. |
| Remove uploaded file (×) | Removes the file from the pending source list (local state only) |
| Review — Feedback textarea | Free-form string used by the backend to prompt a regeneration |
| Review — Suggestion chip | Appends that suggestion text to the feedback textarea |
| Review — Regenerate | `ACTION: content_regenerate` with `{ feedback }`; loops back to Processing stage, then returns to Review with a new version |
| Review — Approve | `ACTION: content_approve`; advances to Output stage |
| Review — View iterations | `ACTION: content_view_history`; should open iteration history detail (not implemented) |
| Output — Copy | `ACTION: content_copy_to_clipboard`; copies the final markdown to clipboard |
| Output — Download .md | `ACTION: content_download` with `{ format: "md" }`; generates and downloads a markdown file |
| Output — Download .docx | `ACTION: content_download` with `{ format: "docx" }`; generates and downloads a Word file |
| Output — CMS publish buttons | Disabled (future feature). No action. |
| Output — Generate another piece | Resets flow back to stage 1 |
| Output — Save to library | `ACTION: content_save_draft`; should persist the approved piece to the user's content library |
| Library — Search input | Client-side filter over title, tags, and excerpt |
| Library — Status filter pills | Client-side filter by status |
| Library — Sort dropdown | Client-side sort (recent / high-score / low-score) |
| Library — + New content | Resets flow and switches to Engine view at stage 1 |
| Library card click | `ACTION: library_open_item` with `{ id }`; opens that item in the Engine Review stage for further iteration |
| Library card Copy icon | `ACTION: library_copy` with `{ id }` |
| Library card Download icon | `ACTION: library_download` with `{ id }` |
| Library card More icon | `ACTION: library_more` with `{ id }`; should open a context menu (archive, delete, duplicate, rename) |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Stage Stepper circles | Grey → teal-filled (active) → teal with checkmark (completed) as the flow advances. Connector bars between stages turn teal once crossed. |
| View toggle indicator | Teal pill slides between Engine and Library positions via CSS transform transition |
| Processing steps | Sequential — each step becomes active with pulsing dot animation for ~0.9s, then fills with a checkmark and the next step activates |
| AEO score bar (sidebar) | Fills proportionally to total score. Individual signal bars colour-code: teal ≥85%, warning 70–84%, danger <70% |
| Iteration history | Grows each time the user regenerates; latest iteration shown at the bottom with its feedback quoted |
| Source-material drop zone | Highlights teal while a file is being dragged over it |
| File list | Grows/shrinks as files are added or removed |
| Library filter + sort | Grid re-renders instantly on every filter/sort change |
| Mode cards (hover) | Border turns teal, card lifts 2px, softer larger shadow |
| Back buttons (hover) | Arrow icon slides left, border and text turn teal |

## Different Page States

- **Loading**: Not implemented as a distinct state. The flow is entirely client-driven (no data fetch before first render), so initial load is instant. If the integration dev wires real AI generation, the Processing stage already doubles as the loading indicator; they may also want to add a library-fetch skeleton for the Library grid.
- **With data**: The default happy path. Library populated from `libraryItems` mock data; full flow works end-to-end with mock content.
- **Empty / No data yet**: Controlled via a `DEMO_STATE` constant at the top of the page file (`"success"` | `"empty"`). When set to `"empty"`, the page renders an empty-state card prompting the user to "Start your first piece". Library empty state is handled separately inside `ContentLibrary` — if filters produce no matches, a "No matches" card is shown instead of the grid.
- **Error**: Not designed. Integration dev should add error toasts/banners for generation failures, upload failures, library fetch failures, and download failures.

## New Components Created

All under `src/components/dashboard/content-optimisation/`:

- **StageStepper.tsx** — Top-of-page progress indicator with clickable completed stages. Takes `activeStage`, `completedStages`, `onJump`.
- **ModeSelect.tsx** — Stage 1 UI. Two standalone mode cards (Generate / Optimize) side-by-side with equal styling and aligned content rows.
- **ConfigureForm.tsx** — Stage 2 form. Includes the drag-and-drop source-material uploader supporting `.md` and `.pdf`.
- **ProcessingStage.tsx** — Stage 3 animated pipeline simulation. Auto-advances and fires `onComplete` when all steps are done.
- **ReviewStage.tsx** — Stage 4 split view (draft + score sidebar). Includes an inline lightweight markdown renderer (`DraftRenderer`) sufficient for the mock draft.
- **AEOScoreCard.tsx** — Reusable score breakdown card used in both Review and Output stages. Renders total score + 5 signal bars.
- **OutputStage.tsx** — Stage 5 view with success banner, final content, optimisation notes, and CMS-publish placeholder.
- **ContentLibrary.tsx** — Library view with stats, toolbar, and 2-col card grid.
- **BackButton.tsx** — Reusable back-button component. Pill shape, animated arrow icon that slides left on hover, used in three places. Accepts `label`, `onClick`, and optional `variant` ("default" | "subtle").
- **AIDisclaimer.tsx** — Reusable AI-content disclaimer. Two variants: `"inline"` (compact single-line note, used in Review under the draft) and `"banner"` (amber warning card with title + body, used at the top of Output). Reminds the user to verify AI-generated content before publishing and clarifies the AEO score is structural, not factual.

## Navigation

- **How to get here**: Click **Content Optimisation** in the top dashboard nav (sits between Competitors and Risk Insights). Also accessible from anywhere the integration dev surfaces a CTA — e.g., improvement-plan tasks that say "Generate content" should deep-link here.
- **Where to go from here**:
  - Library card → opens the piece in Review stage of the Engine
  - "Generate another piece" (Output) → resets the flow
  - Approved output → in the real product, should be downloadable and/or pushable to a CMS (V3)
  - Back-nav in the header returns users to any other dashboard tab

## Notes

### Data layer

All mock data + types live in `src/data/mock-content-optimisation.ts`:

- `ContentMode` — `"generate" | "optimize"`
- `ContentFormat` — `"blog-post" | "faq" | "comparison" | "pillar-page" | "how-to"`
- `ContentTone` — `"technical" | "accessible" | "authoritative"`
- `ContentConfig` — full configure-stage payload shape
- `ProcessingStep` — step definition for the pipeline animation
- `AEOSignal` — one row of the scoring breakdown
- `OptimisationNote` — one "what changed" entry
- `IterationEntry` — one version in the iteration history
- `LibraryItem` — one row in the Library; includes `id`, `title`, `format`, `mode`, `status`, `score`, `wordCount`, `updatedAt`, `createdAt`, `author`, `tags`, `excerpt`
- `LibraryStatus` — `"approved" | "draft" | "in-review" | "archived"`

Integration: swap the imports from `mock-content-optimisation.ts` for live API calls. The `ContentConfig` interface is the request shape the generation endpoint should accept. `LibraryItem[]` is the list-endpoint response shape.

### AEO scoring framework

Fixed weights, out of 100:
- Entity Clarity — 25
- Citation Signals — 25
- Answer Structure — 20
- Topical Depth — 20
- Freshness Signals — 10

Per the product spec, content scoring **below 80 should auto-iterate up to 2 passes internally before surfacing to the client**. That's a backend concern — the UI assumes the draft shown in Review has already cleared the threshold (or is explicitly flagged to the client if it hasn't).

### Iteration feedback

Feedback is a free-form string passed back to the generation backend. The integration dev should concatenate it with any prior-iteration metadata so the model has context. The UI treats each regenerate as starting a new version (v1, v2, v3...).

### File uploads

Source-material uploads are held in local React state only — they are **not** yet wired to any parent handler. When hooking this up, the integration dev should:
1. Upload files on drop (not on submit) so they can be parsed/previewed
2. Expose the parsed file content to the generation request alongside `sources` (URLs)
3. Handle upload errors (file too large, wrong type, parse failure)

### Future features (from the PDF spec, explicitly out of scope for MVP)

- Side-by-side diff view (original vs optimised) — V2
- Content version history with revert — V2 (stub visible in Review sidebar)
- Team collaboration (comment / approve flow) — V2
- WordPress / HubSpot / Webflow CMS publish integrations — V3 (ghost buttons rendered in Output stage)

### Styling conventions

Matches existing dashboard conventions: Tailwind utility classes only, `@/` alias, tokens (`text-navy`, `text-teal`, `text-slate-muted`, `border-border-light`, `bg-surface`), standard card pattern `rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]`, Manrope font inherited from `DashboardShell`.

### Animations

Intentionally restrained — the mode-select stage has no GSAP entrance (fixed per designer feedback — the page should not move on open). Library cards use a light GSAP stagger on filter change. Processing stage uses CSS animations for pulsing dots. Everything else is static or CSS-transition only.
