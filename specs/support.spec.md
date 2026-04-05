# Support

**File**: `src/pages/dashboard/Support.tsx`
**Route**: `/dashboard/support`
**Date**: 2026-04-05

## What's on the Page

Two-column layout inside the shared SettingsShell with the **Support** tab active.

**Left column:**
- **Contact Support card** — form with a Subject dropdown (topic picker) and a Message textarea. Header notes "We typically respond within 2 business hours". Footer has a "Send Message" button. After sending, the form is replaced with an inline success state (checkmark, "Message sent!" heading, response time note, and "Send another message" link).
- **Frequently Asked Questions card** — 4 expandable FAQ rows: AEO score calculation, scan frequency, team members, AI models tested

**Right sidebar:**
- **Resources** section label
- **Video Tutorials** — orange play icon, links to video how-to guides
- **Get to Know AEO** — teal book icon, links to beginner's guide
- **Documentation** — blue docs icon, links to full API and platform docs
- **Live chat banner** — teal background with "Chat with us live" and availability hours (Mon–Fri, 9am–6pm EST)

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Back button (chevron) | Navigate back to the dashboard |
| Settings tabs | Navigate between Profile, Security, Preferences, Billing, Support pages |
| Subject dropdown | Open topic picker (Billing & Payments, Account Issues, Scan Problems, Feature Request, Bug Report, Other) |
| Send Message | Submit the support form, then show inline success confirmation |
| Send another message | Reset the form back to empty state after a successful send |
| FAQ rows | Expand/collapse to show the answer |
| Video Tutorials link | Open video tutorials resource |
| Get to Know AEO link | Open beginner's guide to AEO |
| Documentation link | Open API and platform docs |
| Live chat banner | Open live chat widget |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Contact form → success state | After sending, form content is replaced with inline success confirmation (checkmark, "Message sent!", response time note, "Send another message" link) |
| FAQ rows | Expand/collapse on click to reveal answer content |

## Different Page States

- **Loading**: Skeleton shimmer for contact form, FAQ card, and sidebar resource links
- **With data**: Two-column layout with contact form, FAQ list, and resource sidebar
- **Empty / No data yet**: "Support not available yet" message with "Complete Setup" CTA
- **Error**: "Unable to load support" message with Retry button

## New Components Created

- `src/components/dashboard/ContactSupportCard.tsx` — contact support form with subject dropdown, message textarea, and send button; includes inline success confirmation state
- `src/components/dashboard/SupportFAQCard.tsx` — FAQ accordion list with expandable rows
- `src/components/dashboard/SupportSidebar.tsx` — resource links (Video Tutorials, Get to Know AEO, Documentation) with colored icons, plus teal live chat banner

## Navigation

- **How to get here**: Click avatar/profile area in dashboard header, then click "Support" tab
- **Where to go from here**: Other settings tabs (Profile, Security, Preferences, Billing), or back to dashboard

## Notes

- Subject dropdown topics are defined in mock data: Billing & Payments, Account Issues, Scan Problems, Feature Request, Bug Report, Other
- Live chat availability is Mon–Fri, 9am–6pm EST
- FAQ answers are not yet populated — only questions are shown with expand/collapse chevrons
