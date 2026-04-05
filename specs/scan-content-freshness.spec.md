# Scan Content Freshness

**File**: `src/pages/dashboard/ScanContentFreshness.tsx`
**Route**: `/dashboard/scans/:scanId/content-freshness`
**Date**: 2026-04-05

## What's on the Page

### Top Bar (persistent shell)
- **Back button** — returns to previous page
- **Export button** — exports the scan report
- **Centered title** — "Scan Summary" with domain and scan date
- **User avatar** — gradient circle with user initials, links to profile

### Score Hero (persistent shell)
- **Circular gauge** — Content Freshness Score (77/100), orange stroke. Score and "/100" are absolutely positioned over the SVG circle.
- **"Content Freshness Score" heading** — centered next to the gauge
- **Summary paragraph** — explains freshness status, stale page count, and improvement timeline

### Category Tabs (persistent shell, shared `ScanTabs` component)
- **7 tabs**: Summary, AI Visibility (68), Brand Accuracy (81), Sentiment (74), Schema Coverage (45), Content Freshness (active), EEAT (61)
- Active tab (Content Freshness) has teal bottom border and **no score badge**

### Stat Cards (2 across)
- **Evergreen pages** — 34, with teal refresh icon and "No expiry" badge on teal background. Pages that don't need regular updating.
- **Time-sensitive pages** — 28, with amber clock icon and "Need monitoring" badge on amber background. Pages that require periodic review.

### Page Freshness Table
Split-panel layout with a left status sidebar and right page list for each category:

- **Stale** (red, 8 pages) — Not updated in 180+ days. All 8 pages shown with title and URL.
- **Aging** (amber, 12 pages) — Not updated in 90–180 days. 5 pages shown + "+ 7 more pages" with "View all →" link.
- **Fresh** (green, 42 pages) — Updated within 90 days. 4 pages shown + "+ 38 more pages" with "View all →" link.

Each page row shows the page title and its URL in monospace font.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Back button (top bar) | Navigate back to the Scans list |
| Export button (top bar) | Download/export the scan report |
| User avatar (top bar) | Navigate to user profile |
| Category tabs | Switch to that category's scan view |
| Page URL in table rows | Open that page URL |
| "View all →" (Aging section) | Expand the list inline to show all 12 aging pages |
| "View all →" (Fresh section) | Expand the list inline to show all 42 fresh pages |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Stat card numbers (34, 28) | Count up from 0 on page load |
| Category count numbers (8, 12, 42) | Count up from 0 on page load |
| "View all →" links | Expand the truncated page list inline when clicked |

## Different Page States

- **Loading**: Centered spinner with "Loading scan results..." text
- **With data**: Full layout with score hero, tabs, stat cards, and page freshness table
- **Empty / No data yet**: "No freshness data" message with "Back to Scans" button
- **Error**: "Something went wrong" message with "Retry" button

## New Components Created

- **`FreshnessStats`** (`src/components/dashboard/FreshnessStats.tsx`) — 2 stat cards with SVG icons (evergreen refresh, time-sensitive clock), large numbers, labels, and status badges.
- **`FreshnessPageTable`** (`src/components/dashboard/FreshnessPageTable.tsx`) — Split-panel table with 3 freshness categories (Stale/Aging/Fresh). Left panel shows status dot, count, and description with colored background. Right panel lists page titles and monospace URLs. Truncated categories show "+ N more pages" with "View all →".

## Navigation

- **How to get here**: Click the "Content Freshness" tab from any scan detail page
- **Where to go from here**:
  - Back to Scans list (Back button)
  - User profile (avatar)
  - Other scan sub-tabs via category tabs
  - Individual page URLs (click to open)

## Notes

- Uses the shared `ScanTabs` component with `content-freshness` as the active tab.
- The "View all →" expand behavior is not yet implemented — currently logs a console action. Integration developer needs to implement inline expansion.
- Number count-up animations are not yet implemented.
- Page URLs use monospace font (`ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono`) to visually distinguish them from page titles.
- All mock data is in `src/data/mock-scan-content-freshness.ts` with TypeScript interfaces.
