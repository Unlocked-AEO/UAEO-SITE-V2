# Improvement Plan

**File**: `src/pages/dashboard/ImprovementPlan.tsx`
**Route**: `/dashboard/improvement-plan`
**Date**: 2026-04-05

## What's on the Page

Dashboard page with **Improvement Plan** tab active. Two-row layout.

**Top row (side by side):**
- **Tasks In Progress card** — shows active tasks with orange "In Progress" badges and a count header (e.g. "4 active"). Each task is a clickable row.
- **Score Improvement chart** — left side shows current score (74) with a "+8 mo" change badge. Right side is a Recharts line graph tracking three metrics over 6 months (Oct–Mar):
  - AEO Score (teal) — overall AEO performance
  - Citations (green) — how often the site is cited by AI
  - Structure (orange) — content structure quality
  - Tooltip on hover shows exact values

**Bottom section:**
- **Improvement Plan card** — tabbed card with Fixes and Strategic tabs. Lists fix items, each with:
  - Status icon: green checkmark (completed), orange dot (in progress), grey dot (not started), grey X (dismissed)
  - Title + description explaining why the fix matters for AEO
  - Impact badge (e.g. "+12% AEO", "+9% Sentiment") — estimated improvement
  - Status badge (Completed / In Progress / Not Started / Dismissed)
  - Expand chevron button for more details
  - Dismissed items show at 50% opacity with strikethrough title

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Dashboard tabs | Navigate between Overview, Scans, Improvement Plan, Competitors, Risk Insights |
| Task rows (in Tasks In Progress) | View that task's details |
| Fixes / Strategic tabs | Switch between fix items and strategic recommendations |
| Expand chevron (per fix row) | Expand to show more detail about that fix |
| Chart hover | Tooltip shows exact AEO, Citations, and Structure values for that month |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Entire page | Constantly updates as scans are run and fixes are tracked |
| Tasks In Progress | Tasks move between statuses, new tasks appear, completed ones leave |
| Score Improvement chart | Updates with new data points as scores change over time |
| Fix items | Status changes (not started → in progress → completed), new fixes appear from scans |
| Impact badges | Reflect estimated or actual improvement percentages |

## Different Page States

- **Loading**: Skeleton shimmer for tasks card, chart card, and plan card
- **With data**: Full layout with tasks, chart, and fix items
- **Empty / No data yet**: "No improvement plan yet" with "Run a Scan" CTA
- **Error**: "Unable to load improvement plan" with Retry button

## New Components Created

- `src/components/dashboard/TasksInProgressCard.tsx` — compact card listing active tasks with orange status badges
- `src/components/dashboard/ScoreImprovementChart.tsx` — current score display + Recharts responsive line chart with 3 trend lines and tooltip
- `src/components/dashboard/ImprovementPlanCard.tsx` — tabbed card (Fixes/Strategic) with fix rows showing status icons, descriptions, impact badges, and expand buttons

## Navigation

- **How to get here**: Click "Improvement Plan" tab in the dashboard tab bar
- **Where to go from here**: Other dashboard tabs, or click into individual tasks/fixes for detail

## Notes

- This page constantly updates as scans run and fixes are tracked — it's not a static snapshot
- Chart uses Recharts library (already installed) with `ResponsiveContainer` for proper sizing
- Chart data is in `src/data/mock-improvement-plan.ts` as `scoreChartData`
- Fix statuses: completed, in-progress, not-started, dismissed
- Dismissed items render at 50% opacity with strikethrough title text
