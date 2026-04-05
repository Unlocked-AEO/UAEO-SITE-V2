# Run Scan

**File**: `src/pages/dashboard/RunScan.tsx`
**Route**: `/dashboard/scans/new`
**Date**: 2026-04-05

## What's on the Page

Modal overlay on top of the Scans page.

- **Backdrop** — blurred semi-transparent overlay dimming the user's actual scan list behind it (dynamic, shows their real scans)
- **Modal card** containing:
  - **Back button** — chevron icon + "Back" text to close the modal
  - **Title** — "Run a New Scan" with description about analyzing AEO performance
  - **Domain input** — globe icon, pre-filled with user's domain, hint text "Enter without https:// or trailing slash". Input should be validated before submission.
  - **Advanced Settings row** — settings icon, "Advanced Settings" title with "Prompt templates, run config & variables" subtitle, chevron to expand
  - **Start Scan button** — teal, full width

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Back button | Close modal, return to Scans page |
| Backdrop click | Close modal, return to Scans page |
| Domain input | Editable text field — validate the domain before allowing scan |
| Advanced Settings | Expand to show prompt templates, run config & variables |
| Start Scan | Validate domain input, then kick off a new scan and close modal |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Domain input validation | Shows error state if domain is invalid |
| After Start Scan | Modal closes, new scan appears in the scan list with an in-progress/loading state (separate view to be provided) |
| Blurred background | Dynamically reflects the user's actual scan list |

## Different Page States

This is a modal — no separate loading/empty/error states. The only error state is domain validation feedback on invalid input.

## New Components Created

- `src/components/dashboard/RunScanModal.tsx` — modal with backdrop blur, back button, domain input with globe icon, advanced settings expandable row, and Start Scan button

## Navigation

- **How to get here**: Click "Run Scan" button on the Scans page
- **Where to go from here**: Back button or backdrop click returns to Scans page; Start Scan closes modal and returns to Scans with the new scan in-progress

## Notes

- The blurred background must show the user's actual scan list, not a static placeholder
- Domain input should be pre-filled with the user's domain from their account
- After clicking Start Scan, the new scan appears in the scan list with a loading/in-progress row state (design for this view will be provided separately) — users cannot click "View Scan" until the scan completes
- Domain validation should check for valid domain format (no https://, no trailing slash)
