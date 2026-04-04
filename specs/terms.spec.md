# Terms of Service

**File**: `src/pages/landing/Terms.tsx`
**Route**: `/terms`
**Date**: 2026-04-04

## What's on the Page

A legal page displaying the full Terms of Service with a sticky sidebar table of contents for navigation. All content is static legal copy.

- **Hero section** — light gray background with "Legal" badge, "Terms of Service" headline, and last updated/effective dates.
- **Intro callout** — teal-bordered box at the top of the content area summarizing what the terms cover and that using the service means agreement.
- **Sidebar table of contents** — sticky left sidebar listing all 12 sections. The active section highlights in teal. Clicking a section should scroll to it.
- **12 numbered sections** — each with a teal section number, bold title, and body paragraphs:
  1. Agreement to Terms
  2. Services
  3. Your Account
  4. Acceptable Use
  5. Intellectual Property
  6. Payment & Billing
  7. Termination
  8. Disclaimers
  9. Limitation of Liability
  10. Governing Law
  11. Changes to Terms
  12. Contact Us
- **Contact card** — at the bottom of section 12, a gray card with company name, email, and location.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| TOC sidebar links (12 items) | Scroll to the corresponding section on the page and highlight as active |
| Email link (legal@unlockedaeo.com) | Open mailto link or contact flow |
| Header nav items | Standard navigation (shared Header component) |
| Footer links | Standard navigation (shared Footer component) |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| TOC active state | Highlights the currently selected section in teal background. Integration dev should wire up scroll-spy so it tracks scroll position. |

## Different Page States

- **Loading**: Spinner centered on page with "Loading..." text
- **With data**: The normal full-content view (default)
- **Empty / No data yet**: Not applicable — static legal page
- **Error**: Not designed — static page, no data fetching needed

## New Components Created

- `TermsHero` — hero with "Legal" badge, headline, and date line on gray background
- `TermsContent` — sticky TOC sidebar + main content with numbered sections, intro callout, and contact card

## Navigation

- **How to get here**: "Terms of Service" link in the footer legal links
- **Where to go from here**: Header/footer provide standard site navigation

## Notes

- All section content is in `src/data/mock-terms.ts` with TypeScript interfaces (`TermsSection`).
- The TOC sidebar currently tracks clicks but does **not** scroll to sections — the integration dev needs to add anchor scrolling and ideally scroll-spy to update the active TOC item on scroll.
- The contact email in the card should be wired to a `mailto:` link.
- The page reuses the shared `Header` and `Footer` layout components.
- `DEMO_STATE` toggle at top of page file switches between "loading" and "success" views.
