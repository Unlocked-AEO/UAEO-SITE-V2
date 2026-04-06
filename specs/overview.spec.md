# Dashboard Overview

**File**: `src/pages/dashboard/Overview.tsx`
**Route**: `/dashboard` (default after login)
**Date**: 2026-04-05

## What's on the Page

Wrapped in `DashboardShell` which provides a top bar (logo, company name, last scan date, user avatar) and a tab navigation bar (Overview, Scans, Implementation Plan, Competitors, Risk Insights).

### Row 1 — KPI Cards
- **Scans This Month** — number of scans run this billing period, with change vs last month
- **Total Visits** — total site visits tracked, with percentage change vs last month
- **Share of Voice** — donut chart showing the user's brand share vs competitors (Acme Corp 34%, Competitor A 28%, Competitor B 22%, Others 16%). Center displays the user's percentage.
- **Mentions** — total AI mentions this month, with change vs last month. Has pagination dots indicating it should carousel through metrics (see Dynamic section).

### Row 2 — Scores & Leaderboard
- **Monthly Score Averages** — 6 circular gauge charts for: AI Visibility, Brand Accuracy, Sentiment, Schema Coverage, Content Freshness, EEAT. Each shows a score out of 100, color-coded (green ≥70, warning/orange ≥50, red <50), and a change indicator (up/down arrow with point difference).
- **Score by AI Engine** — 5 AI engines (ChatGPT, Perplexity, Gemini, Grok, Claude) each with an icon, score, change indicator, and horizontal progress bar. Bar color matches score threshold (green/orange/red).
- **Industry Leaderboard** — ranked list of 6 companies by AEO score. The user's company (Acme Corp) is highlighted with a teal background and border. Each entry has a rank number, name, mini progress bar, and score.

### Row 3 — Trends & Recommendations
- **Score Trends** — line chart showing score trends over 7 months (Oct–Apr). Three active trend lines: AI Visibility (orange), Brand Accuracy (green), Sentiment (teal). Three inactive lines (Schema, Freshness, EEAT) can be toggled on. Filter pills at the top toggle each line.
- **Top Recommendations** — numbered list of 5 action items. Each has a priority level (high = orange left border + orange background, normal = teal left border + teal background), a numbered circle, title, and description. Clickable to view details.

### Row 4 — Risk Insights
- **Risk Insights** — 4 cards showing risks at different severity levels (high = red, medium = orange, low = teal). Each card has a severity dot, severity label, title, and description. Clickable to view details.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Logo / "Unlocked AEO" in top bar | Navigate to the home/landing page |
| Dashboard tab buttons (Overview, Scans, etc.) | Navigate to the corresponding dashboard tab |
| User avatar / company info (top right) | Navigate to user profile |
| Score Trends filter pills | Toggle the corresponding trend line on/off in the chart |
| Recommendation cards | Open the recommendation detail / implementation guide |
| Risk Insight cards | Open the risk insight detail view |
| "Run your first scan" button (empty state) | Navigate to start a new scan |
| "Retry" button (error state) | Reload the dashboard data |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| 4 dashboard rows | GSAP stagger slide up 40px, 120ms apart on page load |
| Score gauge circles | Animate fill from 0 to final score on page load |
| KPI numbers (14, 8,420) | Count up from 0 on page load |
| Share of Voice donut | GSAP ring segments animate from 0 arc to target arc, staggered |
| Mentions carousel | Auto-cycles every 8s through: Monthly Mentions (247), Monthly Citations (89), Monthly Recommendations (34), Hallucinations Detected (7) |
| Engine score bars + numbers | Count up from 0, bars grow from 0% |
| Leaderboard bars + scores | Count up from 0, bars grow from 0% |
| Score Trends chart | Recharts with interactive tooltip, filter pills toggle lines on/off |
| Recommendation items | GSAP slide in from left, stagger 80ms |
| Risk insight cards | GSAP scale from 96% + fade, severity dots pop in with bounce |

## Different Page States

- **Loading**: Centered spinner with "Loading..." text on the grey background
- **With data**: Full dashboard with all 4 rows of data cards and charts
- **Empty / No data yet**: Centered message — "No scan data yet" with description text and a "Run your first scan" CTA button
- **Error**: Centered message — "Something went wrong" with description text and a "Retry" button

## New Components Created

- **`DashboardShell`** (`src/components/layout/DashboardShell.tsx`) — Layout wrapper for all dashboard pages. Provides the top bar with logo, company info, and user avatar, plus the tab navigation. Accepts `activeTab` prop to highlight the current tab.
- **`KPICards`** (`src/components/dashboard/KPICards.tsx`) — Row of KPI stat cards including Share of Voice donut chart and Mentions carousel card.
- **`ScoreAverages`** (`src/components/dashboard/ScoreAverages.tsx`) — Grid of 6 circular score gauges with labels and change indicators.
- **`EngineScores`** (`src/components/dashboard/EngineScores.tsx`) — List of AI engine scores with icons, progress bars, and change indicators.
- **`IndustryLeaderboard`** (`src/components/dashboard/IndustryLeaderboard.tsx`) — Ranked list of companies with the user's company highlighted.
- **`ScoreTrends`** (`src/components/dashboard/ScoreTrends.tsx`) — SVG line chart with toggleable trend lines and month labels.
- **`TopRecommendations`** (`src/components/dashboard/TopRecommendations.tsx`) — Priority-coded list of actionable recommendations.
- **`RiskInsightsCards`** (`src/components/dashboard/RiskInsights.tsx`) — Severity-coded risk insight cards.

## Navigation

- **How to get here**: Default page after logging in. Also accessible via the "Overview" tab in the dashboard navigation.
- **Where to go from here**:
  - Other dashboard tabs: Scans, Implementation Plan, Competitors, Risk Insights
  - User profile (click avatar/company info in top right)
  - Home/landing page (click logo)
  - Recommendation details (click any recommendation card)
  - Risk insight details (click any risk card)

## Notes

- The Mentions card currently shows a single metric with pagination dots. Integration developer needs to implement the carousel to cycle through: Monthly Mentions, Monthly Citations, Monthly Recommendations, Hallucinations Detected. Mock data only includes the first metric — additional metrics need to be added to `src/data/mock-dashboard.ts`.
- Score gauge animations, number count-up animations, and chart line animations are not yet implemented — noted as planned dynamic behaviors for the integration developer.
- The Score Trends chart uses hardcoded SVG paths for the trend lines. Integration developer will need to generate these dynamically from real data (likely with a charting library like Recharts or D3).
- All mock data is in `src/data/mock-dashboard.ts` with TypeScript interfaces defined for each data shape.
