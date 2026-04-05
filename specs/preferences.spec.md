# Preferences

**File**: `src/pages/dashboard/Preferences.tsx`
**Route**: `/dashboard/preferences`
**Date**: 2026-04-05

## What's on the Page

This is the Preferences tab within the Account Settings shell. It contains two cards:

- **Display & Region card** — Two fields side by side:
  - *Timezone dropdown* — Shows the user's selected timezone (e.g. "America/New_York (UTC-5)"). Opens a picker when clicked. Timezone list should be fetched from a timezone API (key provided separately — store in env var, not in code).
  - *Theme picker* — Three options: Light, Dark, System. The active option has a teal border and teal-tinted background. Selecting a theme applies the change immediately as a live preview.
  - A "Save Preferences" button in the card footer persists the timezone and theme selections.
- **Notification Preferences card** — Three toggle rows, all enabled by default:
  - *Weekly Report* — "A summary of your AEO performance every Monday"
  - *Scan Complete* — "Notify me when a scan finishes and results are ready"
  - *Product & Company Updates* — "New features, announcements and tips from the team"
  - Each toggle saves immediately when flipped (no save button needed).

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Timezone dropdown | Open a timezone picker populated from a timezone API |
| Light / Dark / System theme buttons | Select theme and apply it immediately as a live preview |
| "Save Preferences" button | Persist the timezone and theme selections to the backend |
| Weekly Report toggle | Toggle on/off and save immediately |
| Scan Complete toggle | Toggle on/off and save immediately |
| Product & Company Updates toggle | Toggle on/off and save immediately |
| Back arrow button (shell) | Navigate back to the dashboard |
| Settings tab buttons (shell) | Navigate to Profile, Security, Preferences, Billing, or Support |
| Logo / "Unlocked AEO" (shell) | Navigate to homepage |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Theme picker | Selected option gets teal border + tinted bg; deselected options revert to grey. Theme change previews immediately. |
| Notification toggles | Smooth transition animation between on (teal, knob slides right) and off (grey, knob slides left). Saves on toggle. |
| Active settings tab | Teal underline moves to the active tab |

## Different Page States

- **Loading**: Two skeleton cards with pulsing placeholders matching the shape of inputs, toggles, and buttons
- **With data**: Both cards rendered with current preference values — all 3 notification toggles on by default
- **Empty / No data yet**: Centered message "No preferences configured" with a "Configure Preferences" CTA
- **Error**: Centered error message "Unable to load preferences" with red-tinted border and a "Retry" button

## New Components Created

| Component | File | Description |
|-----------|------|-------------|
| DisplayRegionCard | `src/components/dashboard/DisplayRegionCard.tsx` | Timezone dropdown + theme picker with save button |
| NotificationPrefsCard | `src/components/dashboard/NotificationPrefsCard.tsx` | Toggle rows for email notification preferences |

## Navigation

- **How to get here**: Click the "Preferences" tab from any Account Settings page (Profile, Security, etc.)
- **Where to go from here**: Other settings tabs (Profile, Security, Billing, Support), back to dashboard, or homepage via logo

## Notes

- Timezone list should be populated from an external timezone API. The API key has been provided to the team separately — store it in an environment variable (e.g. `VITE_TIMEZONE_API_KEY`), not in source code.
- Notification toggles save immediately on interaction — no submit button. The Display & Region card uses an explicit "Save Preferences" button.
- All three notification toggles should default to **on** for new users.
- The theme picker gives a live preview on selection but only persists when the user clicks "Save Preferences".
- This page reuses the `SettingsShell` layout shared with Profile, Security, Billing, and Support pages.
