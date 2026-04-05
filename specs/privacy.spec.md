# Privacy Policy

**File**: `src/pages/landing/Privacy.tsx`
**Route**: `/privacy`
**Date**: 2026-04-04

## What's on the Page

- **Hero section** — "Legal" badge, "Privacy Policy" headline, and "Last updated / Effective" date line on a light gray (`#F8FAFC`) background with a bottom border.
- **Sticky table of contents sidebar** — 11 numbered section links on the left side. The active section is highlighted with a teal background (`#F0FDFA`); inactive sections are gray. The sidebar sticks to the top of the viewport on scroll.
- **Intro callout** — teal-bordered rounded box at the top of the content area summarizing the purpose of the policy: "Your privacy matters to us..."
- **11 policy sections** — each section has a teal section number (01–11), a bold title, and one or more body paragraphs. Sections are separated by light dividers (`#F1F5F9`). The sections are:
  1. Information We Collect
  2. How We Use It
  3. Sharing Your Information
  4. Cookies & Tracking
  5. Data Retention
  6. Security
  7. Your Rights
  8. Children
  9. International Transfers
  10. Changes to This Policy
  11. Contact Us
- **Contact card** — at the end of section 11, a light card showing "Unlocked AEO, Inc.", the privacy email address, and the company location (Toronto, Ontario, Canada).
- **Shared Header & Footer** — reused from layout components.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Each TOC sidebar link (11 total) | Smooth-scroll to the corresponding section and highlight as active |
| Privacy email (privacy@unlockedaeo.com) | Open mailto link or email client |
| Header nav items | Navigate to respective pages (shared component) |
| Footer links | Navigate to respective pages (shared component) |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| TOC sidebar active state | Highlights the currently selected section in teal; others stay gray |
| Smooth scroll | Page scrolls to the target section when a TOC link is clicked |

## Different Page States

- **Loading**: Centered spinner with "Loading..." text, shared Header and Footer still visible.
- **With data**: The normal view described above with all 11 sections.
- **Empty / No data yet**: N/A — this is a static legal page with no user-specific data.
- **Error**: N/A — content is static, not fetched from an API.

## New Components Created

| Component | File | Description |
|-----------|------|-------------|
| PrivacyHero | `src/components/home/PrivacyHero.tsx` | Hero with "Legal" badge, headline, and last-updated date |
| PrivacyContent | `src/components/home/PrivacyContent.tsx` | Sticky TOC sidebar + 11 policy sections with intro callout and contact card |

## Data File

`src/data/mock-privacy.ts` — contains all policy data with TypeScript interfaces:
- `PolicySection`, `ContactInfo` interfaces
- `privacyHero` — badge, headline, last updated text
- `privacyIntro` — intro callout paragraph
- `policySections` — 11 sections with id, number, TOC label, title, and paragraphs array
- `privacyContact` — company name, email, location

## Navigation

- **How to get here**: Click "Privacy Policy" in the footer legal links
- **Where to go from here**: Use TOC to jump between sections, use header nav to go to other pages

## Notes

- This is a static legal content page — the integration developer should replace the mock policy text with the real legal copy when available.
- The TOC sidebar is sticky (`sticky top-8`) so it follows the user as they scroll through the long policy content.
- The TOC currently updates active state on click only. The integration developer may want to add intersection observer–based tracking to highlight the active section as the user scrolls past it.
- The "Last updated" and "Effective" dates are hardcoded in mock data — these should be dynamic if the policy is versioned.
