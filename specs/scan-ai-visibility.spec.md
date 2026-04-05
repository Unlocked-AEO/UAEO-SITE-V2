# Scan AI Visibility

**File**: `src/pages/dashboard/ScanAIVisibility.tsx`
**Route**: `/dashboard/scans/:scanId/ai-visibility`
**Date**: 2026-04-05

## What's on the Page

### Top Bar
- **Back button** — returns to the previous page
- **Export button** — exports the scan report
- **Centered title** — "Scan Summary" with domain and scan date (e.g. "acme-corp.com · Scanned Apr 2, 2025")
- **User avatar** — teal circle with user initials, links to profile

### Score Hero (full width, persistent shell)
- **Large circular gauge** — AI Visibility Score (68/100), orange stroke for the current score range
- **"AI Visibility Score" heading** — centered next to the gauge
- **Summary paragraph** — plain-language explanation of AI visibility performance across engines

### Category Tabs (full width, persistent shell)
- **7 tabs**: Summary, AI Visibility (active), Brand Accuracy (81), Sentiment (74), Schema Coverage (45), Content Freshness (77), EEAT (61)
- Active tab (AI Visibility) has teal bottom border, no score badge
- Inactive tabs with scores show color-coded badges: green (`#27AE60` on `#E8F5E9`) for ≥70, orange (`#E67E22` on `#FFF3E0`) for <70

### Stats Bar
- **Total Mentions** — 247, the number of times the brand appeared in AI responses
- **Total Citations** — 89, the number of times the brand was cited as a source
- **Recommendations** — 34, the number of AI-generated recommendations mentioning the brand
- **Divider** — visual separator between aggregate stats and per-engine scores
- **5 Engine Mini Scores** — ChatGPT (78), Perplexity (71), Gemini (65, orange), Grok (38, red), Claude (82, teal). Each shows an engine icon, score, and engine name. Score color indicates performance level.

### Prompt Results Table
- **Header row** — columns: Prompt, Mentioned, Cited, Recommended, Score
- **7 prompt rows** — each row shows:
  - The search prompt text (e.g. "What is the best tool for AI answer engine optimization?")
  - **Mentioned column** — 5 engine icon chips showing which AI engines mentioned the brand (colored icon = mentioned, grey chip = not mentioned)
  - **Cited column** — same chip pattern showing which engines cited the brand as a source
  - **Recommended column** — same chip pattern showing which engines recommended the brand
  - **Score** — color-coded score: teal (≥70), orange (50–69), red (<50)

### Bottom Bar
- Empty footer bar with white background and top border

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Back button (top bar) | Navigate back to the Scans list |
| Export button (top bar) | Download/export the scan report |
| User avatar (top bar) | Navigate to user profile |
| Category tabs | Switch to that category's scan view (navigates to different route) |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Stats bar numbers (247, 89, 34) | Count up from 0 on page load |
| Engine mini-score numbers | Count up from 0 on page load |
| Category tabs | Active tab gets teal bottom border; navigates to different scan sub-page |

## Different Page States

- **Loading**: Centered spinner with "Loading scan results..." text
- **With data**: Full layout with score hero, tabs, stats bar, and prompt results table
- **Empty / No data yet**: "No visibility data" message with "Back to Scans" button
- **Error**: "Something went wrong" message with "Retry" button

## New Components Created

- **`ScanVisibilityStats`** (`src/components/dashboard/ScanVisibilityStats.tsx`) — Stats bar showing aggregate metrics (Total Mentions, Citations, Recommendations) separated by a divider from 5 engine mini-score cards with icons and color-coded scores.
- **`ScanPromptTable`** (`src/components/dashboard/ScanPromptTable.tsx`) — Table of prompt results with engine icon chips indicating Mentioned/Cited/Recommended status per engine. Each chip is either an active colored engine icon or an inactive grey placeholder.

## Navigation

- **How to get here**: Click the "AI Visibility" tab from any scan detail page (e.g. `/dashboard/scans/:scanId`)
- **Where to go from here**:
  - Back to Scans list (Back button)
  - User profile (avatar)
  - Other scan sub-tabs via category tabs (Summary, Brand Accuracy, Sentiment, etc.)

## Notes

- The score hero and category tabs are a **persistent shell** shared across all scan sub-tabs. The hero score/title/description updates per tab, and the content below the tabs swaps out.
- The prompt results table rows are **not clickable** — they are display-only.
- Engine icon chips in the table use simplified circle icons (not the full engine logos used elsewhere). Active chips show the engine's brand color; inactive chips are grey with 40% opacity.
- The tab badge colors on this page differ slightly from the Summary tab export (`#27AE60`/`#E8F5E9` and `#E67E22`/`#FFF3E0` vs the Summary tab's `#0D9B93`/`#E6F9F8` and `#FF9F43`/`#FFF4E6`). The integration developer should standardize these.
- Number count-up animations are not yet implemented — noted as planned dynamic behavior.
- All mock data is in `src/data/mock-scan-ai-visibility.ts` with TypeScript interfaces.
