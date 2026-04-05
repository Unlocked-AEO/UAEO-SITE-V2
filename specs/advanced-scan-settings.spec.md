# Advanced Scan Settings

**File**: `src/pages/dashboard/AdvancedScanSettings.tsx`
**Route**: `/dashboard/scans/settings`
**Date**: 2026-04-05

## What's on the Page

Standalone full page (no dashboard tabs) for configuring scan prompts and context.

- **Header bar** — logo and company info
- **Back button + title** — "Advanced Settings" with subtitle "Configure scan context, prompts and variables"
- **Industry & Context card** — left side: Industry dropdown (pre-filled from profile, e.g. "SaaS / B2B Software"). Right side: Scan Variables — Primary Location (with pin icon, e.g. "United States") and City/Region (placeholder input)
- **Custom Prompts card** — green "2 custom" badge showing count of user-created prompts. New prompt text input with "Add" button. Hint text showing available dynamic variables ([brand], [competitor], [location], [industry], [primary audience]). List of existing custom prompts each with green checkmark and red X remove button
- **Prompt Bank section** — "18/25 selected" warning badge (orange). 4 Prompt Focus cards (single-select): Customer Discovery & Visibility, Employer Brand & Recruiting, B2B Buyer / Vendor Evaluation, Thought Leadership & Expert Authority. Selecting a focus area changes which prompt categories are shown below. Accordion with 9 prompt categories (e.g. Comparison & Alternatives, Credentials & Authority, etc.) each with individual prompt checkboxes
- **Sticky footer** — Cancel and "Save & Apply" buttons

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Back button (chevron) | Return to Run Scan modal |
| Industry dropdown | Open dropdown to change industry (pre-filled from profile) |
| Primary Location field | Editable input for scan location |
| City / Region field | Editable input for city/region |
| Add button | Add the typed custom prompt to the list |
| Red X (per custom prompt) | Remove that custom prompt |
| Prompt Focus cards | Single-select — toggle which focus area is active, changes prompt categories shown below |
| Category accordion headers | Expand/collapse to show individual prompts |
| Individual prompt checkboxes | Toggle prompts on/off (curated + custom must total exactly 25) |
| Cancel | Discard changes, return to Run Scan modal |
| Save & Apply | Save settings, return to Run Scan modal |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| "18/25 selected" counter | Updates as prompts are toggled on/off |
| "2 custom" badge | Updates as custom prompts are added/removed |
| Category badges (e.g. "4/5 selected") | Update per category as individual prompts are toggled |
| Prompt categories section | Changes based on which Prompt Focus card is selected (single-select) |

## Different Page States

- **Loading**: Skeleton shimmer for industry card and prompts card
- **With data**: Full page with all sections populated
- **Empty / No data yet**: "No scan configuration yet" message
- **Error**: "Unable to load settings" with Retry button

## New Components Created

- `src/components/dashboard/IndustryContextCard.tsx` — industry dropdown with scan variables (location, city/region)
- `src/components/dashboard/CustomPromptsCard.tsx` — custom prompt input, existing prompts list with add/remove, count badge
- `src/components/dashboard/PromptBankSection.tsx` — prompt focus cards (single-select), prompt counter, category accordion with individual prompt checkboxes

## Navigation

- **How to get here**: Click "Advanced Settings" on the Run Scan modal
- **Where to go from here**: Back button, Cancel, or Save & Apply all return to the Run Scan modal

## Notes

- Settings persist across scans — they are not per-scan configuration
- Industry is pre-filled from the user's profile settings
- Curated + custom prompts must total exactly 25
- Prompt Focus is single-select — only one focus area active at a time
- Dynamic variables available in custom prompts: [brand], [competitor], [location], [industry], [primary audience]
