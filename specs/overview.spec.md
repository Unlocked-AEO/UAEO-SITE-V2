# Dashboard Overview

**File**: `src/pages/dashboard/Overview.tsx`
**Route**: `/dashboard` (default after login)
**Date**: 2026-04-05

## What's on the Page

Wrapped in `DashboardShell` which provides a header bar with logo (left), centered tab navigation (Overview, Scans, Implementation Plan, Competitors, Risk Insights), and user info (right) — all in one row.

### Row 1 — KPI Cards
- **Scans This Month** — number of scans run this billing period, with change vs last month. Includes animated sparkline trend chart (teal for uptrend, red for downtrend).
- **Total Visits** — total site visits tracked, with percentage change vs last month. Includes animated sparkline trend chart.
- **Share of Voice** — donut chart showing the user's brand share vs competitors (Acme Corp 34%, Competitor A 28%, Competitor B 22%, Others 16%). Center displays the user's percentage.
- **Mentions carousel** — auto-cycles every 8s through: Monthly Mentions (247), Monthly Citations (89), Monthly Recommendations (34), Hallucinations Detected (7). Each has its own sparkline trend chart that swaps with the active metric. Pagination dots at bottom.

### Row 2 — Score Overview (combined averages + trends)
Single card with two panels:
- **Left panel (280px)** — 6 score gauges stacked vertically: AI Visibility (68, orange), Brand Accuracy (81, green), Sentiment (74, green), Schema Coverage (45, orange), Content Freshness (77, green), EEAT (61, orange). Each has animated ring fill, change indicator, and hover state. Clickable to view score detail.
- **Right panel** — Recharts line chart showing score trends over 7 months (Oct–Apr). 6 trend lines, each with a distinct color and toggleable filter pill:
  - AI Visibility — orange `#FF9F43`
  - Brand Accuracy — green `#27AE60`
  - Sentiment — teal `#4ECDC4`
  - Schema — iris/purple `#635BFF`
  - Freshness — red `#E74C3C`
  - EEAT — blue `#3B82F6`
  All 6 lines are active by default. Dark tooltip on hover.

### Row 3 — Engine Scores + Leaderboard + Recommendations
Three columns side by side:
- **Score by AI Engine** — 5 AI engines (ChatGPT, Perplexity, Gemini, Grok, Claude) each with an icon, score, change indicator, and horizontal progress bar. Bar color matches score threshold (green/orange/red).
- **Industry Leaderboard** — ranked list of 6 companies by AEO score. The user's company (Acme Corp) is highlighted with a teal background and border. Each entry has a rank number, name, mini progress bar, and score.
- **Top Recommendations** — numbered list of 5 action items. Each has a priority level (high = orange left border + orange background, normal = teal left border + teal background), a numbered circle, title, and description. Clickable to view details.

### Row 4 — Risk Insights
- **Risk Insights** — 4 cards showing risks at different severity levels (high = red, medium = orange, low = teal). Each card has a severity dot, severity label, title, and description. Clickable to view details.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Logo / "Unlocked AEO" in header | Navigate to the home/landing page |
| Dashboard tab buttons (Overview, Scans, etc.) | Navigate to the corresponding dashboard tab. Inactive tabs have hover border hint. |
| User avatar / company info (top right) | Navigate to user profile |
| Score gauge rows (left panel) | Open the score detail / breakdown for that metric |
| Score Trends filter pills | Toggle the corresponding trend line on/off in the chart |
| Recommendation cards | Open the recommendation detail / implementation guide |
| Risk Insight cards | Open the risk insight detail view |
| Carousel pagination dots | Jump to the corresponding metric |
| "Run your first scan" button (empty state) | Navigate to start a new scan |
| "Retry" button (error state) | Reload the dashboard data |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| 4 dashboard rows | GSAP stagger slide up 40px, 120ms apart on page load |
| ScoreOverview card | GSAP slide up 30px + fade in on page load |
| Score gauge rings | GSAP animate from 0 arc to target arc, staggered 100ms apart |
| KPI numbers (14, 8,420) | Count up from 0 on page load |
| KPI sparkline charts | GSAP draw-in animation: line traces left to right (1.2s), gradient fill fades in after (0.6s). Teal for uptrends, red for downtrends. |
| Share of Voice donut | GSAP ring segments animate from 0 arc to target arc, staggered |
| Mentions carousel | Auto-cycles every 8s through 4 metrics, each with its own sparkline |
| Engine score bars + numbers | Count up from 0, bars grow from 0% |
| Leaderboard bars + scores | Count up from 0, bars grow from 0% |
| Score Trends chart | Recharts with animated line draw-in (1.2s), interactive tooltip, filter pills toggle lines on/off |
| Recommendation items | GSAP slide in from left, stagger 80ms |
| Risk insight cards | GSAP scale from 96% + fade, severity dots pop in with bounce |

## Different Page States

- **Loading**: Centered spinner with "Loading dashboard..." text
- **With data**: Full dashboard with all 4 rows of data cards and charts
- **Empty / No data yet**: Centered message — "No scan data yet" with description text and a "Run your first scan" CTA button (teal)
- **Error**: Centered message — "Something went wrong" with description text and a "Retry" button (teal)

## New Components Created

- **`DashboardShell`** (`src/components/layout/DashboardShell.tsx`) — Layout wrapper for all dashboard pages. Single-row header with logo left, centered tabs, user info right. Tabs have hover states with border hint and text color change. Accepts `activeTab` prop.
- **`KPICards`** (`src/components/dashboard/KPICards.tsx`) — Row of KPI stat cards with animated sparkline trend charts, Share of Voice donut chart, and Mentions carousel card.
- **`ScoreOverview`** (`src/components/dashboard/ScoreOverview.tsx`) — Combined score averages + trend chart in one card. Left panel: 6 animated gauge rows. Right panel: Recharts line chart with 6 toggleable color-coded trend lines.
- **`EngineScores`** (`src/components/dashboard/EngineScores.tsx`) — List of AI engine scores with icons, progress bars, and change indicators.
- **`IndustryLeaderboard`** (`src/components/dashboard/IndustryLeaderboard.tsx`) — Ranked list of companies with the user's company highlighted.
- **`TopRecommendations`** (`src/components/dashboard/TopRecommendations.tsx`) — Priority-coded list of actionable recommendations.
- **`RiskInsightsCards`** (`src/components/dashboard/RiskInsights.tsx`) — Severity-coded risk insight cards.

## Navigation

- **How to get here**: Default page after logging in. Also accessible via the "Overview" tab in the dashboard navigation.
- **Where to go from here**:
  - Other dashboard tabs: Scans, Implementation Plan, Competitors, Risk Insights
  - User profile (click avatar/company info in top right)
  - Home/landing page (click logo)
  - Score detail (click any gauge row in ScoreOverview)
  - Recommendation details (click any recommendation card)
  - Risk insight details (click any risk card)

## Notes

- **IMPORTANT — Sparkline data must be real**: Each KPI card has a `sparkline` array in mock data representing month-by-month historical values. The mock arrays are placeholders. The integration dev **must** replace these with the user's actual historical data so the graphs accurately reflect their real trends — not random/fake data. The sparkline color (teal vs red) is determined automatically by `changeDirection`.
- The Mentions carousel auto-cycles every 8s through 4 metrics. Each metric has its own sparkline data that swaps with the active card.
- ScoreOverview replaces the previous separate ScoreAverages and ScoreTrends components — they are combined into one unified card.
- All 6 trend lines have distinct colors and are active by default. Users can toggle each on/off via filter pills.
- Score gauge animations, number count-up, sparkline draw-in, donut ring, and chart line animations all use GSAP and/or Recharts animation and trigger on page load.
- Site font is Manrope (variable, 200–800 weights), loaded from Google Fonts.
- All mock data is in `src/data/mock-dashboard.ts` with TypeScript interfaces defined for each data shape.

## Changelog

### 2026-04-11
- **Added**: Sparkline trend charts on all KPI cards and carousel cards (GSAP draw-in animation, teal/red based on trend)
- **Added**: `ScoreOverview` component — combined score averages + trend chart in one unified card with left/right panel layout
- **Added**: Distinct colors for all 6 trend lines (Schema = iris, Freshness = red, EEAT = blue), all active by default
- **Added**: `ScanShell` shared layout component for all scan detail pages
- **Changed**: Dashboard header — tabs moved into header bar (logo left, tabs center, user right in one row)
- **Changed**: Dashboard layout — Row 2 is now ScoreOverview (was separate ScoreAverages + EngineScores + Leaderboard); Row 3 is now EngineScores + Leaderboard + Recommendations (was ScoreTrends + Recommendations)
- **Changed**: Site font switched from Inter to Manrope across all pages
- **Changed**: Hero section restored to gradient blobs (removed logo network visualization)
- **Changed**: Solutions intro section centered horizontally
- **Changed**: Scan detail pages — tabs moved above score hero, score hero centered with gauge + text side by side, all pages use shared ScanScoreHero component with props
- **Changed**: All hardcoded `font-['Inter']` classes replaced with `font-sans` (206 occurrences across 31 files)
- **Changed**: Dashboard polish — consistent hover states, transitions, shadow-sm, theme tokens throughout
- **Removed**: Separate `ScoreAverages` component (merged into ScoreOverview)
- **Removed**: Separate `ScoreTrends` component (merged into ScoreOverview)
- **Removed**: `HeroOrbs` logo network from hero section
- **Removed**: Duplicate Shell functions from scan pages (replaced by shared ScanShell)
- **Why**: Consolidate redundant score displays, polish dashboard UI, standardize font and scan page layouts
