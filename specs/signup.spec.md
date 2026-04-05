# Signup

**File**: `src/pages/authenticated/Signup.tsx`
**Route**: `/signup`
**Date**: 2026-04-05

## What's on the Page

### Left Panel — Marketing Sidebar
- **Logo** — "Unlocked AEO" with teal icon, links back to homepage
- **Headline** — "Make your brand the answer AI gives."
- **Subtext** — Description of what the platform does
- **Feature checklist** — 4 items with teal checkmark icons:
  - Full AEO score across 5 AI engines
  - Hallucination detection & correction
  - Schema markup & content freshness insights
  - Actionable fix recommendations, ranked by impact
- **Trusted by** — "Trusted by 500+ marketing teams" with 3 logo pills (Acme Corp, Veritas, Horizon AI)
- **Decorative circles** — Two teal gradient circles with low opacity for visual interest

### Right Panel — Signup Form
- **Heading** — "Create your account"
- **Sign in link** — "Already have an account? Sign in" linking to sign-in page
- **Form fields** (3 rows of 2 fields each):
  - Row 1: Company Name (text), Company Website (text)
  - Row 2: Work Email (email), Industry (select dropdown)
  - Row 3: Password (password with eye toggle), Team Size (select dropdown)
- **Optional field** — "How did you hear about us?" (select dropdown, full width)
- **Submit button** — "Create account" in teal
- **Legal text** — "By creating an account you agree to our Terms of Service and Privacy Policy" with links

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Logo "Unlocked AEO" (sidebar) | Navigate to `/` (homepage) |
| "Sign in" link | Navigate to sign-in page (NOTE: `/signin` page does not exist yet) |
| Industry dropdown | Open dropdown with industry options |
| Password eye icon | Toggle password visibility |
| Team Size dropdown | Open dropdown with team size options |
| "How did you hear about us?" dropdown | Open dropdown with referral source options |
| "Create account" button | Validate form, show loading spinner, then navigate to email verification step |
| "Terms of Service" link | Navigate to `/terms` |
| "Privacy Policy" link | Navigate to `/privacy` |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Password field | Should include a strength meter that updates as the user types (weak/medium/strong) |
| Password eye icon | Toggles between showing/hiding the password text |
| "Create account" button | Shows a loading spinner while the account is being created |
| Form validation | Password must be validated (min 8 characters + strength meter), email format checked before submission |
| Post-submit | After successful account creation, navigate to an email verification step (NOTE: verification page does not exist yet) |

## Different Page States

- **Loading**: Not applicable — this is a static form page
- **With data**: The default form view with empty fields
- **Empty / No data yet**: Same as default — form fields show placeholders
- **Error**: Not designed yet — integration developer should add inline field validation errors and a general error banner for failed submissions

## New Components Created

- **`SignupSidebar`** (`src/components/home/SignupSidebar.tsx`) — Dark navy marketing panel with logo, headline, feature checklist, and trusted-by logos.
- **`SignupForm`** (`src/components/home/SignupForm.tsx`) — White panel with the full signup form, field rows, dropdowns, submit button, and legal links.

## Navigation

- **How to get here**: "Get started" CTAs on the landing page, or direct URL `/signup`
- **Where to go from here**:
  - Homepage (logo)
  - Sign-in page ("Already have an account? Sign in")
  - Email verification step (after successful account creation)
  - Terms of Service page
  - Privacy Policy page

## Notes

- The password field needs a **strength meter** — not yet implemented. Integration developer should add a visual indicator (e.g., colored bar) that shows weak/medium/strong as the user types.
- The **loading state** on the submit button is not yet implemented — should show a spinner and disable the button during submission.
- The **email verification page** does not exist yet — needs to be designed and built as the post-signup step.
- The **sign-in page** (`/signin`) does not exist yet — needs to be designed and built.
- Form fields are currently display-only (placeholders in divs). Integration developer needs to replace with actual `<input>` and `<select>` elements.
- All mock data is in `src/data/mock-signup.ts` with TypeScript interfaces.
- This page does **not** use the shared Header/Footer — it has its own full-bleed two-panel layout.
