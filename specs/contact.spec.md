# Contact

**File**: `src/pages/landing/Contact.tsx`
**Route**: `/contact`
**Date**: 2026-04-06

## What's on the Page

### Hero
- **Badge** — "Contact Us" teal pill
- **Headline** — "Let's talk about your AI visibility."
- **Subtext** — Invitation to reach out whether exploring or ready to scale
- **Decorative elements** — Teal radial gradient glows (matching About page pattern)

### Info Cards (3 across)
- **Email us** — Mail icon, description about 24-hour response time, CTA "hello@unlockedaeo.com →"
- **Live chat** — Chat icon, Mon–Fri 9am–6pm ET hours, CTA "Start a conversation →"
- **Book a demo** — Calendar icon, personalized walkthrough, CTA "Schedule a call →" (navigates to `/schedule`)

### Contact Form (centered, max-width 680px)
- **Header** — "Send us a message" with subtitle about one business day response
- **Form fields** (2-column rows):
  - Row 1: First Name, Last Name
  - Row 2: Work Email, Company
- **Full-width fields**: Topic (select dropdown), Message (textarea)
- **Submit button** — "Send message" in teal
- **Privacy note** — Links to Privacy Policy

### FAQ Preview (accordion)
- **Header** — "Common questions" with "Browse all FAQs →" link to `/faq`
- **4 expandable questions**:
  - How quickly can I see results?
  - Do you offer a free trial?
  - What AI engines do you monitor?
  - Can I use Unlocked AEO for multiple brands?

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| "hello@unlockedaeo.com →" | Open email client / copy email |
| "Start a conversation →" | Open live chat widget |
| "Schedule a call →" | Navigate to `/schedule` |
| "Send message" button | Show loading spinner, submit form, then show success confirmation |
| "Browse all FAQs →" | Navigate to `/faq` |
| FAQ accordion rows | Toggle expand/collapse for each question |
| "Privacy Policy" link | Navigate to `/privacy` |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| FAQ accordion | Click toggles open/close with chevron rotation |
| "Send message" button | Shows loading spinner during submission, then success confirmation |

## Different Page States

- **Loading**: Not applicable — static page
- **With data**: Default view with form and info cards
- **Empty / No data yet**: Same as default
- **Error**: Not designed — integration developer should add inline form validation and error states

## New Components Created

- **`ContactHero`** (`src/components/home/ContactHero.tsx`) — Hero section with badge, headline, subtext, and decorative gradient glows.
- **`ContactInfoCards`** (`src/components/home/ContactInfoCards.tsx`) — 3 info cards with teal gradient icons, descriptions, and CTA links. Cards use flex-col with grow on description to align CTAs at bottom.
- **`ContactForm`** (`src/components/home/ContactForm.tsx`) — Contact form with 2-column field rows, topic dropdown, message textarea, submit button, and privacy note.
- **`ContactFAQ`** (`src/components/home/ContactFAQ.tsx`) — Accordion FAQ with 4 questions, expand/collapse toggle, and link to full FAQ page.

## Navigation

- **How to get here**: Header "Contact sales" button, Footer "Contact" link, or direct URL `/contact`
- **Where to go from here**:
  - Schedule a call page (`/schedule` via "Book a demo" card)
  - FAQ page (`/faq` via "Browse all FAQs")
  - Privacy Policy (`/privacy`)
  - All standard header/footer navigation

## Notes

- Form fields are currently display-only divs — integration developer needs real `<input>`, `<select>`, and `<textarea>` elements.
- Loading spinner and success confirmation on form submit are not yet implemented.
- All mock data is in `src/data/mock-contact.ts` with TypeScript interfaces.
