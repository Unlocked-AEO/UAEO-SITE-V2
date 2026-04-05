# Profile (Account Settings)

**File**: `src/pages/dashboard/Profile.tsx`
**Route**: `/dashboard/profile`
**Date**: 2026-04-05

## What's on the Page

### Top Header Bar
- Unlocked AEO logo and company name/avatar (shared dashboard header)

### Page Title Area
- "Account Settings" heading with a back button (chevron) and subtitle "Manage your profile, security and billing"

### Tab Bar
- Settings navigation tabs: Profile (active), Security, Preferences, Billing, Support

### Company Profile Card
- Form card with the following fields:
  - **Company Name** — editable text input, pre-populated from user signup data
  - **Domain** — locked/fixed field, cannot be changed
  - **Industry** — dropdown selector, user can pick a different industry
  - **Account Email** — locked/fixed field, cannot be changed
- "Save Changes" button at the bottom of the form

### Delete Account Card
- Danger zone card with a red-bordered "Delete Account" button

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Back button (chevron) | Navigate back to dashboard |
| Settings tabs (Profile, Security, Preferences, Billing, Support) | Navigate between settings pages |
| Industry dropdown | Open dropdown to pick a different industry |
| Save Changes button | Save the company profile form |
| Delete Account button | Open a confirmation modal before deletion |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Form fields | Pre-populated from user signup data on load |
| Domain field | Locked — cannot be edited by the user |
| Account Email field | Locked — cannot be edited by the user |

## Different Page States

- **Loading**: Skeleton shimmer for the form card
- **With data**: Normal view with populated fields
- **Empty / No data yet**: "No profile data yet" message with a "Set Up Profile" CTA button
- **Error**: "Unable to load profile" message with a "Retry" button

## New Components Created

- **`SettingsShell`** (`src/components/layout/SettingsShell.tsx`) — Layout shell for all settings pages. Provides the header with back button, page title, subtitle, and the settings tab bar.
- **`CompanyProfileCard`** (`src/components/dashboard/CompanyProfileCard.tsx`) — Form card with editable and locked fields for company profile data.
- **`DeleteAccountCard`** (`src/components/dashboard/DeleteAccountCard.tsx`) — Danger zone card with a red-bordered delete button.

## Navigation

- **How to get here**: Click avatar/profile area in the dashboard header
- **Where to go from here**:
  - Other settings tabs: Security, Preferences, Billing, Support
  - Back to dashboard (click back button)

## Notes

None.
