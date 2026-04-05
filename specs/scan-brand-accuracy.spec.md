# Scan Brand Accuracy

**File**: `src/pages/dashboard/ScanBrandAccuracy.tsx`
**Route**: `/dashboard/scans/:scanId/brand-accuracy`
**Date**: 2026-04-05

## What's on the Page

### Top Bar (persistent shell)
- **Back button** — returns to previous page
- **Export button** — exports the scan report
- **Centered title** — "Scan Summary" with domain and scan date
- **User avatar** — gradient circle with user initials, links to profile

### Score Hero (persistent shell)
- **Circular gauge** — Brand Accuracy Score (81/100), orange stroke. Score and "/100" label are absolutely positioned over the SVG circle.
- **"Brand Accuracy Score" heading** — centered next to the gauge
- **Summary paragraph** — describes hallucination issues across engines and estimated improvement timeline

### Category Tabs (persistent shell, shared `ScanTabs` component)
- **7 tabs**: Summary, AI Visibility (68), Brand Accuracy (active), Sentiment (74), Schema Coverage (45), Content Freshness (77), EEAT (61)
- Active tab (Brand Accuracy) has teal bottom border and **no score badge**
- Inactive tabs with scores show color-coded badges

### Stat Cards (3 across)
- **Hallucinations detected** — 7, with red warning triangle icon and "Needs attention" badge on red background
- **AI engines affected** — 3/5, with orange clock icon and "Moderate" badge on orange background
- **Engines fully accurate** — 2/5, with green checkmark icon and "Good" badge on green background

### Hallucination Log
- **Header** — "Hallucination Log" with issue count ("7 issues found")
- **Column headers** — AI Engine, Hallucination, Category, Severity
- **7 rows** — each showing the engine name, the specific hallucination text, the category (Pricing, Features, Company info), and a color-coded severity badge:
  - **High** (red) — 2 issues (both Grok)
  - **Medium** (orange) — 4 issues (Perplexity ×2, Gemini ×2)
  - **Low** (grey) — 1 issue (ChatGPT)

### Brand Accuracy per AI Engine
- **5 engine rows**: ChatGPT (92%, Accurate), Claude (88%, Accurate), Perplexity (74%, Partial), Gemini (71%, Partial), Grok (52%, Poor)
- Each row has a letter icon with brand color, engine name, accuracy progress bar, percentage, and status badge
- Progress bar colors: green (Accurate), orange (Partial), red (Poor)

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Back button (top bar) | Navigate back to the Scans list |
| Export button (top bar) | Download/export the scan report |
| User avatar (top bar) | Navigate to user profile |
| Category tabs | Switch to that category's scan view |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Stat card numbers (7, 3/5, 2/5) | Count up from 0 on page load |
| Category tabs | Active tab gets teal bottom border, navigates to different scan sub-page |

## Different Page States

- **Loading**: Centered spinner with "Loading scan results..." text
- **With data**: Full layout with score hero, tabs, stat cards, hallucination log, and engine accuracy table
- **Empty / No data yet**: "No accuracy data" message with "Back to Scans" button
- **Error**: "Something went wrong" message with "Retry" button

## New Components Created

- **`ScanTabs`** (`src/components/dashboard/ScanTabs.tsx`) — Shared tab component for all scan sub-pages. Accepts `activeTab` prop. Active tab hides its score badge and shows teal bottom border. Used by ScanOverview, ScanAIVisibility, and ScanBrandAccuracy.
- **`BrandAccuracyStats`** (`src/components/dashboard/BrandAccuracyStats.tsx`) — 3 stat cards with severity-coded icons (danger/warning/success), large numbers, labels, and status badges.
- **`HallucinationLog`** (`src/components/dashboard/HallucinationLog.tsx`) — Table listing AI hallucinations with engine name, description, category, and severity badge (High/Medium/Low).
- **`EngineAccuracyTable`** (`src/components/dashboard/EngineAccuracyTable.tsx`) — 5 engine rows with letter icons, accuracy progress bars, percentage values, and status badges (Accurate/Partial/Poor).

## Navigation

- **How to get here**: Click the "Brand Accuracy" tab from any scan detail page
- **Where to go from here**:
  - Back to Scans list (Back button)
  - User profile (avatar)
  - Other scan sub-tabs via category tabs

## Notes

- The score hero and tabs are the **persistent shell** shared across all scan sub-tabs. The `ScanTabs` component is now shared by ScanOverview, ScanAIVisibility, and ScanBrandAccuracy.
- Hallucination log rows and engine accuracy rows are **not clickable** — display only.
- Stat card count-up animations are not yet implemented.
- The hero uses absolute positioning for the score text over the SVG circle (different technique from the ScanOverview hero which uses SVG `<text>` elements).
- All mock data is in `src/data/mock-scan-brand-accuracy.ts` with TypeScript interfaces.
