# FAQ

**File**: `src/pages/landing/FAQ.tsx`
**Route**: `/faq`
**Date**: 2026-04-04

## What's on the Page

Public marketing FAQ page with categorized questions and expandable answers.

- **Header** — Shared site-wide header. Reuses `Header` component.
- **Hero** — Subtle green-tinted gradient background. "FAQ" pill badge with teal border, large headline ("Frequently asked questions."), and subtext about what the FAQ covers.
- **FAQ Accordion** — Two-column layout:
  - *Left sidebar* — "Jump to" label with 5 category buttons: General, Your AEO Score, Getting Started, Billing & Plans, Integrations & API. Active category is highlighted with teal text on a light teal background. Currently highlights on click but does not scroll to the section.
  - *Right content* — All 5 categories displayed vertically, each with a teal uppercase label and a list of questions. Each question row has:
    - Question text (bold when open, semibold when closed)
    - A toggle circle button: teal "−" when open, gray "+" when closed
    - Answer text (visible only when open)
  - **16 total questions** across 5 categories. 4 questions have pre-written answers and are open by default:
    - "What is AEO and why does it matter?" (General)
    - "How is AEO different from SEO?" (General)
    - "How is my AEO score calculated?" (Your AEO Score)
    - "Do you offer a free trial?" (Billing & Plans)
  - The remaining 12 questions are collapsed with no answer text — the integration developer will need to provide answers.
- **Support CTA** — Dark navy section with "Still Have Questions?" teal badge, headline ("We're here to help."), description about 2-hour response time, and two buttons: "Chat with support" (teal) and "Browse Help Centre" (outline).
- **Footer** — Shared site-wide footer. Reuses `Footer` component.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Header buttons | Same as landing page — see landing.spec.md |
| Sidebar category buttons | Highlight active category and scroll to that section (`ACTION: jump_to_category`) — scrolling not yet implemented, just highlights |
| FAQ question rows | Toggle answer open/closed (`ACTION: toggle_faq`) — uses React `useState` |
| "Chat with support" (CTA) | Open live chat / support widget (`ACTION: chat_with_support`) |
| "Browse Help Centre" (CTA) | Navigate to help centre (`ACTION: browse_help_centre`) |
| Footer links | Same as landing page — see landing.spec.md |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| FAQ accordion items | Clicking a question toggles the answer open/closed. Toggle circle changes from gray "+" to teal "−". Question text weight changes from semibold to bold. |
| Sidebar active state | Clicking a category highlights it with teal text and light teal background. |

## Different Page States

- **Loading**: Centered spinner with "Loading..." text, header and footer still visible.
- **With data**: The full FAQ page (default `DEMO_STATE = "success"`).
- **Empty / No data yet**: Not applicable — marketing page with static content.
- **Error**: Not applicable — same reason.

## New Components Created

- **`FAQHero`** (`src/components/home/FAQHero.tsx`) — Hero with subtle gradient background and pill badge.
- **`FAQAccordion`** (`src/components/home/FAQAccordion.tsx`) — Sidebar nav + categorized accordion with open/close toggle. Contains `FAQSection` and `FAQItemRow` sub-components.
- **`FAQSupportCTA`** (`src/components/home/FAQSupportCTA.tsx`) — Dark navy support CTA with two action buttons.

## Navigation

- **How to get here**: Footer links, help centre, or direct link to `/faq`.
- **Where to go from here**: Chat with support, Help Centre, or any page via header/footer nav.

## Notes

- All mock data lives in `src/data/mock-faq.ts` with TypeScript interfaces.
- 12 of the 16 questions have no answer text — they render as collapsed rows with a "+" icon. The integration developer needs to provide answer content for these. They can be added to the `answer` field in `mock-faq.ts`.
- The `defaultOpen` field on each FAQ item controls whether it starts expanded. The integration developer may want to change this to all-collapsed for the production version.
- The sidebar "Jump to" navigation currently only highlights the active category — it does not scroll to the category. The integration developer should wire up smooth scrolling (e.g., using `scrollIntoView` or anchor refs).
- The accordion state is local to each `FAQItemRow` component — opening one question does not close others (they're independent toggles, not a traditional single-open accordion).
