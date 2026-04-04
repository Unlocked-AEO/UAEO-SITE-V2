# How It Works

**File**: `src/pages/landing/HowItWorks.tsx`
**Route**: `/how-it-works`
**Date**: 2026-04-04

## What's on the Page

This is a public marketing page that explains the Unlocked AEO platform's 4-step process: Crawl, Extract, Simulate, Report. It's a long-scroll page with alternating left/right layouts for each step.

- **Header** — Shared site-wide header (logo, nav, Dashboard + Contact Sales buttons). Reuses `Header` component from landing page.
- **Hero** — Teal "How It Works" badge pill, large headline ("From crawl to actionable insights in minutes."), subtext, and a horizontal step indicator showing the 4 steps as numbered circles connected by lines: Crawl → Extract → Simulate → Report. Steps 1–3 are teal, step 4 is navy.
- **Step 01: Crawl** (white bg, text left / card right) — Explains that the platform crawls the user's web presence. Checklist: Website structure, Content discovery, Digital footprint mapping. The illustration card is a browser mockup showing crawl progress with a completed progress bar, four crawled items (Homepage, Blog, Social profiles, Backlink profile) each with a green checkmark and detail (word count or status), and a summary footer ("324 pages analyzed · 4.2s · Done").
- **Step 02: Extract & Understand** (gray bg, card left / text right) — Explains signal extraction. Checklist: E-E-A-T signals, Trust indicators, Topic clusters, Schema markup. The illustration card shows "Signals Detected: 87" with an E-E-A-T analysis panel — four score bars (Experience 82, Expertise 91, Authority 67, Trust 84) with color-coded progress bars, plus tag pills (12 schema types, 4 topic clusters, 7 trust indicators, Entity verified).
- **Step 03: AI Simulation** (white bg, text left / card right) — Explains querying AI engines. Checklist: ChatGPT/Claude/Gemini, Perplexity/DeepSeek/Grok, Accuracy & sentiment analysis. The illustration card shows "Score by AI Engine" with per-engine score bars for 6 engines (ChatGPT 78, Perplexity 71, Gemini 65, Grok 38, Claude 82, Copilot 59), each with change indicators and color-coded bars (green ≥70, orange ≥50, red <50). Reuses `EngineIcon` badge component.
- **Step 04: Visibility Report** (gray bg, card left / text right) — Explains the final report. Checklist: Hallucination detection, Competitor comparison, Action roadmap. The illustration card has three sections:
  - *Score header*: Large "74" visibility score with "▲ +8 this month" badge, plus a 6-month SVG trend line chart (Oct–Apr) showing upward growth.
  - *Action Roadmap*: Three prioritized items — "Hallucination detected: 2 claims" (HIGH/red), "Competitor gap: −17pts vs leader" (MED/yellow), "Add author bio schema markup" (LOW/green).
  - *Industry Leaderboard*: Three horizontal bars comparing "Competitor A" (91), "You" (74, highlighted teal), "Competitor B" (52).
- **CTA Section** (navy bg) — "Ready to see how AI describes your brand?" headline, description, "Get started free" (teal button) + "Contact sales" (outline button), and "No credit card required · Cancel anytime" disclaimer.
- **Footer** — Shared site-wide footer. Reuses `Footer` component from landing page.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Header buttons | Same as landing page — see landing.spec.md |
| "Get started free" (CTA) | Start signup/onboarding (`ACTION: get_started_free`) |
| "Contact sales" (CTA) | Open contact sales flow (`ACTION: contact_sales`) |
| Footer links | Same as landing page — see landing.spec.md |

## Things That Change Dynamically

Nothing. The entire page is static with no interactive state.

## Different Page States

- **Loading**: Centered spinner with "Loading..." text, header and footer still visible.
- **With data**: The full marketing page (default `DEMO_STATE = "success"`).
- **Empty / No data yet**: Not applicable — marketing page with no user-specific data.
- **Error**: Not applicable — same reason.

## New Components Created

- **`HIWHero`** (`src/components/home/HIWHero.tsx`) — Hero section with badge pill and step indicator.
- **`HIWChecklist`** (`src/components/home/HIWChecklist.tsx`) — Reusable teal checkmark + label item, shared across all four step sections.
- **`HIWStepCrawl`** (`src/components/home/HIWStepCrawl.tsx`) — Step 1 section with browser mockup card.
- **`HIWStepExtract`** (`src/components/home/HIWStepExtract.tsx`) — Step 2 section with E-E-A-T analysis card.
- **`HIWStepSimulate`** (`src/components/home/HIWStepSimulate.tsx`) — Step 3 section with engine score card.
- **`HIWStepReport`** (`src/components/home/HIWStepReport.tsx`) — Step 4 section with visibility report card.
- **`HIWCTASection`** (`src/components/home/HIWCTASection.tsx`) — Dark navy CTA with teal primary button style.

## Navigation

- **How to get here**: "How It Works" nav item in the header, or direct link to `/how-it-works`.
- **Where to go from here**: Signup via CTA buttons, Contact Sales, or any page via the header nav.

## Notes

- All mock data lives in `src/data/mock-how-it-works.ts` with TypeScript interfaces for every data shape.
- The step sections alternate layout: odd steps have text-left/card-right on white bg, even steps have card-left/text-right on gray bg.
- The trend chart in Step 04 is a hand-drawn SVG (not a charting library) — the integration developer may want to replace it with a real chart component if the data becomes dynamic.
- The score bars in Step 03 reuse the same `EngineIcon` badge variant from the landing page, keeping engine branding consistent.
- The CTA section uses a teal primary button (different from the landing page's iris/purple CTA), matching the How It Works page's teal color theme.
