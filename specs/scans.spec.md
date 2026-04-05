# Scans

**File**: `src/pages/dashboard/Scans.tsx`
**Route**: `/dashboard/scans`
**Date**: 2026-04-05

## What's on the Page

- **DashboardShell** — shared dashboard layout with top header bar and tab navigation, **Scans** tab active
- **"My Scans" card** — full-height card with header containing title, Run Scan button (teal), Sort button, and Refresh icon button
- **Scan rows** — list of completed scans, each showing:
  - Unlocked AEO logo icon (teal)
  - Domain name (e.g. acme-corp.com)
  - Timestamp of when the scan was run
  - Export button — download scan results
  - Delete button (red trash icon) — remove the scan
  - "View Scan" button (teal outlined with arrow) — navigate to scan detail page

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Dashboard tabs | Navigate between Overview, Scans, Improvement Plan, Competitors, Risk Insights |
| Run Scan | Kick off a new scan |
| Sort | Sort/filter the scan list |
| Refresh | Reload the scan list |
| Export (per row) | Download that scan's results |
| Delete (per row) | Delete that scan |
| View Scan (per row) | Navigate to the scan detail page for that scan |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Scan list | Auto-refreshes to pick up new or completed scans |

## Different Page States

- **Loading**: Skeleton shimmer for the card header buttons and 5 scan row placeholders
- **With data**: Normal view with "My Scans" header and list of scan rows
- **Empty / No data yet**: "No scans yet" message with logo icon and "Run Your First Scan" CTA button
- **Error**: "Unable to load scans" message with Retry button

## New Components Created

- `src/components/dashboard/ScansCard.tsx` — full card with header (Run Scan, Sort, Refresh buttons) and scrollable scan list
- `src/components/dashboard/ScanRow.tsx` — individual scan row with logo, domain, timestamp, and action buttons (Export, Delete, View Scan)

## Navigation

- **How to get here**: Click "Scans" tab in the dashboard tab bar
- **Where to go from here**: "View Scan" navigates to a scan detail page; dashboard tabs navigate to other dashboard sections

## Notes

- The scan list should auto-refresh to pick up new or recently completed scans
- All scans in the mock data use the same domain (acme-corp.com) — in production, the domain comes from the user's account
