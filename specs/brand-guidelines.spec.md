# Brand Guidelines

**File**: `src/pages/landing/BrandGuidelines.tsx`
**Route**: `/brand-guidelines`
**Date**: 2026-04-05

## What's on the Page

A static reference page documenting the Unlocked AEO visual brand system. Designed to be shared via direct URL with designers, partners, or developers. Contains six sections:

- **Hero** — Dark navy banner with the logo lockup (teal gradient icon + "Unlocked AEO" wordmark), the page title "Brand Guidelines", and a subtitle with version/date info. A subtle radial teal glow decorates the top-right corner.
- **01 — Logo** — Three logo variant cards side by side:
  - *Primary (light background)* — icon + wordmark on light grey
  - *Reversed (dark background)* — icon + wordmark on navy
  - *Icon mark only* — larger icon on teal mist background
  - A yellow warning callout explains the clearspace rule (minimum clearspace = height of the "U")
- **02 — Colour Palette** — Two groups of colour swatches:
  - *Primary*: Midnight Navy (#0A2540), Signal Teal (#4ECDC4), Pure White (#FFFFFF) — each with hex, RGB, and HSL values
  - *Secondary & Utility*: Teal Mist (#F0FDFA), Slate (#475569), Muted (#64748B), Border (#E2E8F0), Surface (#F8FAFC)
- **03 — Typography** — Manrope typeface specimen showing the full alphabet, numbers, and special characters. Below it, a table showing the type scale: Display, Heading 1, Heading 2, Body, Label/UI, and Caption/Overline — each with size, weight, line height, and usage guidance.
- **04 — Spacing & Grid** — A visual spacing scale (4px–120px) using teal squares, plus three grid spec cards for Desktop (12 col, 120px gutters), Tablet (8 col, 48px gutters), and Mobile (4 col, 24px gutters).
- **05 — UI Components** — Showcases three component types:
  - *Buttons*: Primary (navy), Teal CTA, Outline, and Ghost variants with size/padding/radius specs
  - *Badges & Pills*: Six variants — teal bordered, teal filled, navy, yellow, green, red
  - *Cards*: Default (bordered), Elevated (shadow), and Dark (navy bg + teal border)

## Buttons & Interactions

This is a read-only reference page. No buttons trigger actions.

| What | What it should do |
|------|------------------|
| N/A — no interactive elements | This page is purely informational |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| N/A | Nothing changes — all content is static |

## Different Page States

- **Loading**: Centered spinner with "Loading..." text, Header and Footer remain visible
- **With data**: The normal view — all six sections rendered
- **Empty / No data yet**: Not applicable — this page uses no dynamic data
- **Error**: Not applicable — this page uses no dynamic data

## New Components Created

| Component | File | Description |
|-----------|------|-------------|
| BrandGuidelinesHero | `src/components/home/BrandGuidelinesHero.tsx` | Dark navy hero with logo lockup, title, subtitle, and decorative radial glow |
| BrandGuidelinesLogo | `src/components/home/BrandGuidelinesLogo.tsx` | Three logo variant cards + clearspace warning callout |
| BrandGuidelinesColour | `src/components/home/BrandGuidelinesColour.tsx` | Primary and secondary colour swatch grids with hex/RGB/HSL values |
| BrandGuidelinesTypography | `src/components/home/BrandGuidelinesTypography.tsx` | Manrope specimen block + type scale table |
| BrandGuidelinesSpacing | `src/components/home/BrandGuidelinesSpacing.tsx` | Visual spacing scale + desktop/tablet/mobile grid spec cards |
| BrandGuidelinesComponents | `src/components/home/BrandGuidelinesComponents.tsx` | Button, badge, and card variant showcases |
| BrandSectionHeader | `src/components/home/BrandGuidelinesSectionHeader.tsx` | Reusable section header with number, label, title, and description |
| LogoIcon | `src/components/home/BrandGuidelinesHero.tsx` | SVG star icon used in logo lockups (exported for reuse) |

## Navigation

- **How to get here**: Direct URL only (`/brand-guidelines`) — not linked from site navigation
- **Where to go from here**: Standard Header and Footer links to other site pages

## Notes

- This is a static design reference page — it will never need real/dynamic data. All content is hardcoded via `src/data/mock-brand-guidelines.ts`.
- The page may be extended with additional sections (e.g., Iconography, Do's & Don'ts) in future updates.
- The teal gradient on logo icons uses `linear-gradient(135deg, #4ECDC4, #3DBDB5)` — this is the canonical brand gradient.
- All sections alternate between white and `#F8FAFC` surface backgrounds for visual rhythm.
