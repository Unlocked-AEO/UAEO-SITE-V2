# Scan Overview

**File**: `src/pages/dashboard/ScanOverview.tsx`
**Route**: `/dashboard/scans/:scanId`
**Date**: 2026-04-05

## What's on the Page

### Top Bar
- **Back button** — returns to the previous page (Scans list)
- **Export button** — exports the scan report
- **Centered title** — "Scan Summary" with the domain and scan date below (e.g. "acme-corp.com · Scanned Apr 2, 2025")
- **User avatar** — gradient circle with user initials, links to profile

### Score Hero (full width)
- **Large circular gauge** — overall Unlocked AEO Score (72/100), color-coded orange for the current score range. Displayed with a `/100` label beneath the number.
- **"Unlocked AEO Score" heading** — centered next to the gauge
- **Summary paragraph** — plain-language explanation of what the score means and what to improve

### Category Tabs (full width)
- **7 tabs**: Summary, AI Visibility (68), Brand Accuracy (81), Sentiment (74), Schema Coverage (45), Content Freshness (77), EEAT (61)
- Each non-summary tab shows a color-coded score badge: green (≥70), orange (50–69), red (<50)
- Active tab has a teal bottom border
- The hero score/explanation and content below the tabs change when switching tabs — the tabs and hero persist as a shell

### Left Column — Score Gauges (below tabs)
- **3×2 grid of circular gauges** — one for each category (AI Visibility, Brand Accuracy, Sentiment, Schema Coverage, Content Freshness, EEAT)
- Each gauge is color-coded: teal (green), orange (warning), red (danger)
- Grid cells are separated by light borders

### Left Column — Strengths & Weaknesses
- **Strengths card** — 3 bullet points with teal dots describing what's working well
- **Weaknesses card** — 4 bullet points with red/orange dots describing issues. Fixed width (w-140), sits to the right of the strengths card.

### Right Column — Score by AI Engine
- **5 engine rows**: ChatGPT (GPT-4o, 78), Perplexity (Perplexity Pro, 71), Gemini (Gemini 1.5 Pro, 65), Grok (Grok 2, 38), Claude (Claude 3.5 Sonnet, 82)
- Each row has an engine icon, name, model version, score, and a small progress bar
- Progress bar and score text are color-coded: teal (≥70), orange (50–69), red (<50)
- Card stretches to match the height of the left column content

### Bottom Bar
- Empty footer bar with white background and top border

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Back button (top bar) | Navigate back to the Scans list |
| Export button (top bar) | Download/export the scan report |
| User avatar (top bar) | Navigate to user profile |
| Category tabs | Switch the active tab — updates hero score/explanation and content below |
| Score gauge circles | Navigate to that category's detailed scan section |
| Engine rows | Navigate to that engine's detailed breakdown |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Score gauge circles | Animate in on page load (fill from 0 to final score) |
| Category tabs | Active tab gets teal bottom border; hero score/explanation updates per tab |
| Content below tabs | Swaps out when switching tabs (only Summary view is currently built) |

## Different Page States

- **Loading**: Centered spinner with "Loading scan results..." text
- **With data**: Full layout with score hero, tabs, gauges, strengths/weaknesses, and engine scores
- **Empty / No data yet**: "Scan not found" message with description and "Back to Scans" button
- **Error**: "Something went wrong" message with description and "Retry" button

## New Components Created

- **`ScanScoreHero`** (`src/components/dashboard/ScanScoreHero.tsx`) — Large circular score gauge with overall score, "/100" label, title, and summary paragraph.
- **`ScanCategoryTabs`** (`src/components/dashboard/ScanCategoryTabs.tsx`) — Tab bar with 7 category tabs, each showing a color-coded score badge. Accepts `activeTab` and `onTabChange` props.
- **`ScanScoreGauges`** (`src/components/dashboard/ScanScoreGauges.tsx`) — 3×2 grid of circular score gauges with labels and grid borders.
- **`ScanStrengthsWeaknesses`** (`src/components/dashboard/ScanStrengthsWeaknesses.tsx`) — Side-by-side strengths (3 items) and weaknesses (4 items) cards with colored bullet dots.
- **`ScanEngineScores`** (`src/components/dashboard/ScanEngineScores.tsx`) — Vertical list of 5 AI engine scores with icons, model names, scores, and progress bars. Stretches to fill available height.

## Navigation

- **How to get here**: Click a scan row from the Scans dashboard (`/dashboard/scans`)
- **Where to go from here**:
  - Back to Scans list (Back button)
  - User profile (avatar)
  - Individual category detail (click a gauge or tab)
  - Individual engine detail (click an engine row)

## Notes

- The score hero and category tabs are a **persistent shell** across all scan sub-tabs. When switching tabs, only the content below changes and the hero score/explanation updates to reflect the selected category.
- Only the Summary tab view is currently built. Other tab views (AI Visibility, Brand Accuracy, etc.) need to be designed and implemented.
- All mock data is in `src/data/mock-scan-overview.ts` with TypeScript interfaces. The gauge `strokeDasharray` values are hardcoded from the design — the integration developer will need to calculate these dynamically from real scores.
- The page has its own top bar (Back, Export, title, avatar) instead of using the `DashboardShell` — this is intentional as the scan detail view has a different navigation pattern.
