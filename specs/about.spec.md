# About

**File**: `src/pages/landing/About.tsx`
**Route**: `/about`
**Date**: 2026-04-04

## What's on the Page

Public marketing page introducing the company, team, and advisors behind Unlocked AEO.

- **Header** — Shared site-wide header. Reuses `Header` component.
- **Hero** — "About Us" teal badge pill, large headline ("We're building the infrastructure for AI search visibility."), subtext about the company's founding belief. Right side has 3 stacked stat cards: "2023" (Founded), "SF" (San Francisco), and "12K+" (Brands tracked — this one has a teal gradient background). Decorative teal and green gradient blobs in the background.
- **Our Story** — Two-column layout. Left side is a "The Problem We Saw" card showing 3 red problem items ("Brand invisible to ChatGPT — 0%", "Competitor cited instead — 84%", "No tools to diagnose it — ∅") separated by a divider from a teal solution item ("Unlocked AEO changes this — ✓"). Right side has the narrative: label, headline ("Built because AI search had no visibility layer."), and two paragraphs explaining the company's origin story. Gray background.
- **What We Believe** — Centered badge + headline ("Principles that guide everything we build."), followed by 3 equal-width value cards, each with a teal gradient icon, title, and description:
  - *Transparency first* (clock icon) — no black boxes
  - *Action over insight* (arrow icon) — reports come with steps
  - *Speed is a feature* (star icon) — continuous scanning
- **Stats Banner** — Dark navy strip with 4 large stats separated by vertical dividers: "12K+" (Brands Tracked), "89%" (See score lift in 60 days, teal colored), "6" (AI Engines Monitored), "$2.4B" (Revenue influenced).
- **The Team** — Left-aligned badge + headline ("The people behind the platform."), then 3 team member cards. Each has a unique dark-to-teal gradient header with a white circle avatar showing initials, plus name, role (teal), and short bio below:
  - Gabriel Lockstone — Co-founder & CEO
  - Lucas Coulson — Co-founder & CTO
  - Zach Gould — Head of Product
- **Advisors** — Left-aligned badge + headline ("Backed by people who've done it."), then a 3-column wrapping grid of 7 advisor cards. Each card has a dark gradient circle avatar with initials, name, title (teal), and a bio paragraph. Gray background. Advisors:
  - Adrian Krebs — Entrepreneur & Engineer
  - Hussain Phalasiya — Founder & AI Operator
  - Nancy Campbell — B2B Marketing Strategist
  - Ran Feldesh — AI Researcher & Operator
  - Michael Brown — Security Executive
  - Serge Valente — Strategic Advisor
  - Jason Whalen — Entrepreneur & Program Builder
- **Hiring CTA** — Dark gradient banner (navy to indigo) with "We're hiring. Come build with us." headline, description, and two buttons: "View open roles" (teal) and "Contact us" (outline). Decorative teal glow in background.
- **Footer** — Shared site-wide footer. Reuses `Footer` component.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Header buttons | Same as landing page — see landing.spec.md |
| "View open roles" (hiring CTA) | Navigate to careers/jobs page (`ACTION: view_open_roles`) |
| "Contact us" (hiring CTA) | Open contact flow (`ACTION: contact_us`) |
| Footer links | Same as landing page — see landing.spec.md |

## Things That Change Dynamically

Nothing. The entire page is static.

## Different Page States

- **Loading**: Centered spinner with "Loading..." text, header and footer still visible.
- **With data**: The full marketing page (default `DEMO_STATE = "success"`).
- **Empty / No data yet**: Not applicable — marketing page with no user-specific data.
- **Error**: Not applicable — same reason.

## New Components Created

- **`AboutHero`** (`src/components/home/AboutHero.tsx`) — Hero with headline and stacked stat cards.
- **`AboutStory`** (`src/components/home/AboutStory.tsx`) — Problem card + narrative text layout.
- **`AboutValues`** (`src/components/home/AboutValues.tsx`) — 3 principle cards with gradient icons.
- **`AboutStats`** (`src/components/home/AboutStats.tsx`) — Dark navy stats banner.
- **`AboutTeam`** (`src/components/home/AboutTeam.tsx`) — Team member cards with gradient headers.
- **`AboutAdvisors`** (`src/components/home/AboutAdvisors.tsx`) — 3-column advisor grid.
- **`AboutHiring`** (`src/components/home/AboutHiring.tsx`) — Dark gradient hiring CTA banner.

## Navigation

- **How to get here**: "About" link in the footer, or direct link to `/about`.
- **Where to go from here**: Careers page via "View open roles", contact flow via "Contact us", or any page via header/footer nav.

## Notes

- All mock data lives in `src/data/mock-about.ts` with TypeScript interfaces for every data shape.
- Each team member and advisor has a unique gradient for their avatar/header — these are stored as CSS gradient strings in the mock data. The integration developer can keep these as-is or replace with real photos.
- The advisor grid uses `w-[calc(33.33%-14px)]` for 3-column layout with gaps — 7 advisors means the last row has 1 card on the left.
- The "problem card" in the Our Story section uses red styling for problems and teal for the solution — the integration developer may want to make these items dynamic if the company adds more problems/solutions over time.
- The stats in the hero cards (2023, SF, 12K+) and the stats banner (12K+, 89%, 6, $2.4B) overlap with landing page stats but are specific to the About page context.
