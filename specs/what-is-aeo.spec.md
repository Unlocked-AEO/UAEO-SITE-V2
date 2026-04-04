# What Is AEO

**File**: `src/pages/landing/WhatIsAEO.tsx`
**Route**: `/what-is-aeo`
**Date**: 2026-04-04

## What's on the Page

A marketing explainer page that teaches visitors what Answer Engine Optimization is and why it matters. All content is static — no dynamic data or real-time updates.

- **Hero section** — introduces "What is AEO?" with a badge, headline, subtext, and two CTAs. Has a subtle radial glow background effect.
- **Definition section** — left side has a pull quote defining AEO plus two explanatory paragraphs. Right side has a card showing the 3-step "How AEO works" flow (user asks → AI scans → brand gets cited or doesn't).
- **AEO vs SEO comparison** — side-by-side columns. Left column (muted) lists 6 traits of traditional SEO. Right column (highlighted with teal border) lists 6 corresponding AEO traits.
- **Citation Signals** — four cards explaining what makes AI cite a brand: Authority & Trust, Content Structure, Entity Clarity, Coverage & Depth. Each has a gradient icon.
- **Why Now stats** — dark navy section with 4 stats: 40% (AI-assisted searches), 73% (B2B buyers using AI), 6 (major AI engines), 1 (brand gets cited). Teal highlighting on 40% and 1.
- **How We Help** — three cards: Measure, Understand, Improve — describing what Unlocked AEO does.
- **CTA section** — gradient background with "Ready to own your AI visibility?" headline and two action buttons.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| "See your AEO score ›" (hero) | Navigate to the scan/score tool |
| "Learn how it works ↓" (hero) | Smooth-scroll down the page |
| "Get your free AEO score ›" (bottom CTA) | Navigate to the scan/score tool |
| "Talk to our team" (bottom CTA) | Open contact/sales flow |
| Header nav items | Standard navigation (shared Header component) |
| Footer links | Standard navigation (shared Footer component) |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Nothing | All content is static marketing copy |

## Different Page States

- **Loading**: Spinner centered on page with "Loading..." text
- **With data**: The normal full-content view (default)
- **Empty / No data yet**: Not applicable — this is a static marketing page with no user data
- **Error**: Not designed — static page, no data fetching needed

## New Components Created

- `AEOHero` — hero section with radial glow, badge, headline, dual CTAs
- `AEODefinition` — split layout with quote text + "How AEO works" step card
- `AEOComparison` — side-by-side SEO vs AEO comparison table
- `AEOCitationSignals` — four signal cards with gradient icon boxes
- `AEOWhyNow` — dark stats section with dividers
- `AEOHowWeHelp` — three help cards (Measure/Understand/Improve)
- `AEOCTASection` — gradient CTA section with dual buttons

## Navigation

- **How to get here**: "AEO Glossary" link in the footer Learn column
- **Where to go from here**: CTA buttons lead to the scan tool or contact sales; header/footer provide standard site navigation

## Notes

- All hardcoded text and data is extracted into `src/data/mock-what-is-aeo.ts` with TypeScript interfaces (`HowAEOStep`, `CitationSignal`, `WhyNowStat`, `HelpCard`).
- The page reuses the shared `Header` and `Footer` layout components.
- `DEMO_STATE` toggle at top of page file switches between "loading" and "success" views.
- OKLab gradient styles are used inline (via `style={{}}`) for background glows and icon boxes — these can't be expressed as Tailwind classes.
