# Security

**File**: `src/pages/dashboard/Security.tsx`
**Route**: `/dashboard/security`
**Date**: 2026-04-05

## What's on the Page

- **SettingsShell** — shared layout with top header bar (logo, company name, avatar), back button, "Account Settings" title/subtitle, and settings tab bar with **Security** tab active
- **Change Password card** — form with three fields in a row: Current Password (shows masked dots), New Password (placeholder text), Confirm Password (placeholder text). Footer with "Update Password" button
- **Two-Factor Authentication row** — lock icon, title with "COMING SOON" badge (grey), description text, and "Enable 2FA" button
- **SAML / SSO row** — shield icon, title with "ENTERPRISE" badge (purple), description text, and "Upgrade to Enterprise" button (purple styled)
- **API Keys row** — key icon, title with "COMING SOON" badge (grey), description text, and "Manage Keys" button

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Back button (chevron) | Navigate back to the dashboard |
| Settings tabs | Navigate between Profile, Security, Preferences, Billing, Support pages |
| Update Password | Submit the password change form (current + new + confirm) |
| Enable 2FA | No-op for now — feature is "coming soon" |
| Upgrade to Enterprise | Navigate to upgrade/pricing flow |
| Manage Keys | No-op for now — feature is "coming soon" |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Password strength meter | **TODO: Needs to be built** — should show strength indicator as user types new password |

## Different Page States

- **Loading**: Skeleton shimmer for password card and three feature rows
- **With data**: Normal view with password form and feature rows
- **Empty / No data yet**: "Security settings not available" message with "Complete Setup" CTA
- **Error**: "Unable to load security settings" message with Retry button

## New Components Created

- `src/components/dashboard/ChangePasswordCard.tsx` — password change form with three fields and submit button
- `src/components/dashboard/SecurityFeatureRow.tsx` — reusable row component for security features with icon, badge (muted/purple variants), description, and action button (default/purple variants)

## Navigation

- **How to get here**: Click avatar/profile area in dashboard header, then click "Security" tab
- **Where to go from here**: Other settings tabs (Profile, Preferences, Billing, Support), or back to dashboard

## Notes

- 2FA and API Keys are marked "COMING SOON" — buttons are present but non-functional
- SAML/SSO is gated behind an "ENTERPRISE" badge — button leads to upgrade flow
- Password strength meter still needs to be built as a follow-up
