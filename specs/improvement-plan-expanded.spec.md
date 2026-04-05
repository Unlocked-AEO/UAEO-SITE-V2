# Improvement Plan — Expanded Fix Detail

**File**: `src/pages/dashboard/ImprovementPlanExpanded.tsx`
**Route**: `/dashboard/improvement-plan/fix` (demo only — in production this is an inline toggle on the Improvement Plan page)
**Date**: 2026-04-05

## What's on the Page

Same Improvement Plan page, but with one fix row expanded inline to show full detail. The expanded row replaces the collapsed summary with a teal-bordered card containing 4 sections:

- **Expanded row header** — same info as collapsed (status icon, title, description, impact badge, status badge) but with teal border, light teal background (`#F7FEFE`), and chevron flipped up in teal
- **Why This Matters** — info icon + detailed paragraph explaining why this fix impacts AEO performance
- **Steps to Fix** — numbered steps (1–4) with teal circle badges, each a specific actionable instruction
- **Specific Content to Fix** — cards per URL showing:
  - URL path (e.g. `acme-corp.com/pricing`)
  - "Needs Fix" red badge
  - Current meta description (grey italic text)
  - Suggested replacement (green text)
- **Estimated Impact** — three cards side by side:
  - AEO Score: from → to values with progress bar and projected improvement
  - AI Snippet Match Rate: from → to percentage with progress bar and projected improvement
  - Effort: level (Medium), hours estimate (~4 hrs), purple badge

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Collapse chevron (teal, flipped up) | Collapse the expanded detail back to summary row |
| Other fix row chevrons | Expand that fix (collapsing the currently expanded one) |
| All other Improvement Plan interactions | Same as parent page (tabs, task rows, dashboard tabs) |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| All fix detail data | Updates as scans run — why it matters text, steps, content fixes, and impact metrics are all live |
| Impact metrics (AEO Score, Match Rate) | Scores and projections update based on latest scan data |
| Content fix cards | URLs and suggestions update; cards show "Fixed" state once addressed |
| Progress bars | Fill based on current score values |

## Different Page States

This is an inline expanded state of the Improvement Plan — no additional loading/empty/error states. Uses the parent page's states.

## New Components Created

- `src/components/dashboard/ExpandedFixDetail.tsx` — 4-section detail panel (Why This Matters, Steps to Fix, Specific Content to Fix, Estimated Impact) with all data from mock
- Updated `src/components/dashboard/ImprovementPlanCard.tsx` — now accepts `expandedFixId` prop to render one row in expanded state with teal styling

## Navigation

- **How to get here**: Click the expand chevron on any fix row in the Improvement Plan
- **Where to go from here**: Click collapse chevron to return to summary, or click another fix row to expand that one instead

## Notes

- In production, this is NOT a separate route — it's an inline toggle on the Improvement Plan page. The demo route (`/dashboard/improvement-plan/fix`) exists only to show the expanded state.
- The integration dev should implement this as React state (`expandedFixId`) toggled on chevron click, not as route navigation
- Each fix would have its own expanded detail data — the current mock shows data for fix f2 ("Improve meta description relevance")
- Content fix cards show current vs suggested text — once a fix is applied and verified by a re-scan, the card should update to show a "Fixed" state
