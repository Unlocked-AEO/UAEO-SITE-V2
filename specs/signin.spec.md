# Sign In

**File**: `src/pages/authenticated/Signin.tsx`
**Route**: `/signin`
**Date**: 2026-04-05

## What's on the Page

### Left Panel — Marketing Sidebar (reused from Signup)
- **Logo** — "Unlocked AEO" with teal icon, links back to homepage
- **Headline** — "Make your brand the answer AI gives."
- **Subtext** — Description of what the platform does
- **Feature checklist** — 4 items with teal checkmark icons
- **Trusted by** — "Trusted by 500+ marketing teams" with 3 logo pills
- **Decorative circles** — Two teal gradient circles with low opacity

### Right Panel — Sign In Form
- **Heading** — "Welcome back"
- **Sign up link** — "Don't have an account? Sign up" linking to signup page
- **Email field** — "Work Email" with pre-filled example (gabe@unlockedaeo.com), teal active border and light teal background showing focused state
- **Password field** — Password dots with eye icon toggle
- **Forgot password link** — Right-aligned teal text "Forgot password?"
- **Sign in button** — Teal "Sign in" button
- **Divider** — "or continue with" text between horizontal lines
- **Google sign-in button** — Outlined button with Google logo and "Continue with Google" text

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Logo "Unlocked AEO" (sidebar) | Navigate to `/` (homepage) |
| "Sign up" link | Navigate to `/signup` |
| Password eye icon | Toggle password visibility |
| "Forgot password?" link | Open an inline modal/flow for password reset (NOTE: not yet designed) |
| "Sign in" button | Validate credentials, show loading spinner, then navigate to `/dashboard` |
| "Continue with Google" button | Trigger Google OAuth flow |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Password eye icon | Toggles between showing/hiding password text |
| "Sign in" button | Shows a loading spinner while authenticating |
| "Forgot password?" | Opens an inline modal flow for password reset |
| Email field | Shows teal active border when focused (currently shown as default state in the design) |

## Different Page States

- **Loading**: Not applicable — static form page
- **With data**: The default form view with email pre-filled and password empty
- **Empty / No data yet**: Same as default
- **Error**: Not designed yet — integration developer should add inline error messages for invalid credentials and a general error banner for failed authentication

## New Components Created

- **`SigninForm`** (`src/components/home/SigninForm.tsx`) — Sign-in form with email, password, forgot password link, sign-in button, divider, and Google OAuth button.

## Navigation

- **How to get here**: "Sign in" link from the Signup page, or direct URL `/signin`
- **Where to go from here**:
  - Homepage (logo)
  - Signup page ("Don't have an account? Sign up")
  - Dashboard (after successful sign-in)
  - Forgot password flow (inline modal)

## Notes

- Reuses the **`SignupSidebar`** component from the Signup page — same marketing sidebar with identical content.
- The **forgot password inline modal** is not yet designed or implemented — integration developer needs a design for this.
- The **loading spinner** on the sign-in button is not yet implemented.
- The email field is shown in a **focused/active state** by default in the design (teal border, light teal background) — this is the active input style the integration developer should apply on focus.
- Form fields are currently display-only divs — integration developer needs to replace with actual `<input>` elements.
- The "Continue with Google" button has **no loading state** — it should immediately redirect to Google OAuth.
- All mock data is in `src/data/mock-signin.ts`.
- This page does **not** use the shared Header/Footer — same standalone two-panel layout as Signup.
