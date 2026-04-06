# Product

**File**: `src/pages/landing/Product.tsx`
**Route**: `/product`
**Date**: 2026-04-06

## What's on the Page

### Hero
- **Badge** — "Product" teal pill
- **Headline** — "Everything you need to own your AI presence."
- **Subtext** — One platform to scan, analyze, fix, and monitor
- **CTAs** — "Start a free scan →" (teal, → `/signup`) and "Book a demo" (outline, → `/schedule`)
- **Decorative elements** — Teal radial gradient glows

### Stats Banner (navy background)
- **5** — AI Engines Monitored (white)
- **72+** — Scoring Signals (teal)
- **< 60s** — Average Scan Time (white)
- **24hr** — Monitoring Cycle (white)
- Numbers should count up on scroll

### Feature Sections (5 alternating sections)
Each feature section has a text side and a mock UI preview side, alternating left/right layout:

1. **Scan** (white bg, text left) — "See exactly how AI describes your brand." Mock preview: AEO Score card with 6 category progress bars. 4 highlight checkmarks.
2. **Improvement Plan** (grey bg, text right) — "Know exactly what to fix — and in what order." Mock preview: Task list with checkmarks, impact scores, completion states.
3. **Competitive Analysis** (white bg, text left) — "See who AI recommends instead of you." Mock preview: Share of voice bars comparing your brand vs 3 competitors.
4. **Risk Insights** (grey bg, text right) — "Catch threats before they cost you citations." Mock preview: Active risks list with High/Medium/Low severity badges.
5. **Agentic Implementations** (white bg, text left, **Coming Soon** yellow badge) — "Let AI fix your AI visibility." Mock preview: Agent activity feed with status badges (Awaiting approval, Approved, Deployed, In progress).

Each section includes:
- Teal badge pill with feature icon and label
- Large headline (36px, bold)
- Description paragraph
- 4 highlight checkmarks with teal icons

### Bottom CTA
- **Dark gradient background** with decorative teal glow
- **Headline** — "Ready to take control of your AI visibility?"
- **Subtext** — Start with a free scan
- **CTAs** — "Get started free →" (teal, → `/signup`) and "Schedule a demo" (ghost, → `/schedule`)

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| "Start a free scan →" (hero) | Navigate to `/signup` |
| "Book a demo" (hero) | Navigate to `/schedule` |
| "Get started free →" (bottom CTA) | Navigate to `/signup` |
| "Schedule a demo" (bottom CTA) | Navigate to `/schedule` |
| Mock UI previews | Purely visual — no interactivity |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Stats banner numbers (5, 72+, <60s, 24hr) | Count up from 0 when scrolled into view |

## Different Page States

- **Loading**: Not applicable — static marketing page
- **With data**: Default view with all sections
- **Empty / No data yet**: Not applicable
- **Error**: Not applicable

## New Components Created

- **`ProductHero`** (`src/components/home/ProductHero.tsx`) — Hero with badge, headline, CTAs, and navy stats banner with 4 metrics.
- **`ProductFeatureSection`** (`src/components/home/ProductFeatureSection.tsx`) — Reusable alternating feature section with text side (badge, headline, description, checkmarks) and mock UI preview side. Includes `MockPreview` sub-component that renders different mock UIs based on the feature type.
- **`ProductCTA`** (`src/components/home/ProductCTA.tsx`) — Dark gradient CTA banner with headline, subtext, and two buttons.

## Navigation

- **How to get here**: Header "Product" nav item, or direct URL `/product`
- **Where to go from here**:
  - Signup (`/signup` via hero and bottom CTAs)
  - Schedule a call (`/schedule` via hero and bottom CTAs)
  - All standard header/footer navigation

## Notes

- The mock UI previews in each feature section are **hardcoded visual mockups** — they show what the actual dashboard feature looks like but are not interactive. Integration developer does not need to wire these up.
- The **stats banner count-up** animation is not yet implemented — needs an intersection observer to trigger when scrolled into view.
- The **Agentic Implementations** section has a "Coming Soon" yellow badge to indicate it's an upcoming feature.
- All mock data is in `src/data/mock-product.ts` with TypeScript interfaces.
- The `ProductFeatureSection` component is reusable — it renders different content based on the `feature.icon` prop, making it easy to add more features later.
