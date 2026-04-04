# Teams We Work With

**File**: `src/pages/landing/Teams.tsx`
**Route**: `/teams`
**Date**: 2026-04-04

## What's on the Page

Simple marketing page showcasing the teams/companies using Unlocked AEO.

- **Header** — Shared site-wide header. Reuses `Header` component.
- **Hero** — "Teams We Work With" teal badge pill, large headline ("Real teams. Real AI visibility results."), and subtext describing the range of organizations served. Decorative teal radial glow behind.
- **Team Showcase** — "Trusted by teams building with us" uppercase label, followed by 3 featured teams displayed side by side, separated by vertical dividers. Each team has:
  - A large rounded-square gradient logo with initials and colored box shadow
  - Team name (bold)
  - Category label (uppercase, muted)
  - Teams shown:
    - **Tshala Knowledge** (TK) — Knowledge Platform — blue gradient
    - **FutureFit Academy** (FA) — Training Academy — green-to-teal gradient
    - **TeamZold** (TZ) — B2B Platform — purple gradient
- **CTA Section** — Dark gradient background (navy to indigo). "Join them" teal badge, headline ("Your team could be next."), description about the first scan experience, and two buttons: "Get your free scan" (teal) and "Talk to sales" (outline). Decorative teal glow.
- **Footer** — Shared site-wide footer. Reuses `Footer` component.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Header buttons | Same as landing page — see landing.spec.md |
| "Get your free scan" (CTA) | Start a free scan flow (`ACTION: get_free_scan`) |
| "Talk to sales" (CTA) | Open sales contact flow (`ACTION: talk_to_sales`) |
| Footer links | Same as landing page — see landing.spec.md |

## Things That Change Dynamically

Nothing. The entire page is static.

## Different Page States

- **Loading**: Centered spinner with "Loading..." text, header and footer still visible.
- **With data**: The full marketing page (default `DEMO_STATE = "success"`).
- **Empty / No data yet**: Not applicable — marketing page with no user-specific data.
- **Error**: Not applicable — same reason.

## New Components Created

- **`TeamsHero`** (`src/components/home/TeamsHero.tsx`) — Hero with badge, headline, and subtext.
- **`TeamsShowcase`** (`src/components/home/TeamsShowcase.tsx`) — 3 featured team cards with gradient logos, divided by vertical borders.
- **`TeamsCTA`** (`src/components/home/TeamsCTA.tsx`) — Dark gradient CTA section with scan and sales buttons.

## Navigation

- **How to get here**: Direct link to `/teams`, or from Case Studies / footer navigation.
- **Where to go from here**: Free scan flow via CTA, sales contact, or any page via header/footer nav.

## Notes

- All mock data lives in `src/data/mock-teams.ts` with TypeScript interfaces.
- Each team has a unique CSS gradient and box-shadow color stored in the mock data — the integration developer can replace these with real brand logos/colors.
- This is currently a small page with only 3 teams. The integration developer may want to make the team list dynamic and add more teams over time. The `TeamsShowcase` component maps over the array so adding more teams just requires adding entries to the data file.
- The team logos use initials on gradient backgrounds as placeholders — these should be replaced with real company logos when available.
