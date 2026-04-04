# Pricing

**File**: `src/pages/landing/Pricing.tsx`
**Route**: `/pricing`
**Date**: 2026-04-04

## What's on the Page

A pricing page with 4 plan tiers, a billing toggle, feature comparison table, and bottom CTA. All pricing content is static marketing copy with a functional monthly/annual toggle.

- **Hero section** — badge, headline ("Simple, transparent pricing."), subtext, and a monthly/annual billing toggle. Starts on monthly by default.
- **Plan cards** — 4 side-by-side cards:
  - **Starter** ($89.99/mo, $72.00/mo annual) — 7 features, dark CTA button
  - **Pro** ($299.99/mo, $240.00/mo annual) — 8 features, teal CTA button, "MOST POPULAR" badge, highlighted with navy background and teal border
  - **Agency** (Custom pricing) �� 7 features, outline CTA "Talk to sales"
  - **Enterprise** (Custom pricing) — 7 features, outline CTA "Contact us"
- **Feature comparison table** — 10-row table comparing all 4 plans. Pro column has a subtle blue highlight. Boolean features show teal checkmarks or dashes. Text features show specific values (e.g., "1", "5", "20", "Unlimited").
- **CTA section** — dark navy background with "Start with a scan." headline, two action buttons, and three trust signals (Setup in minutes, No credit card needed, Cancel anytime).

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Monthly/Annual toggle (hero) | Switches displayed prices — annual applies 20% discount to Starter and Pro. Agency/Enterprise stay "Custom". |
| "Get started" (Starter card) | Start signup flow for Starter plan at selected billing interval |
| "Get started" (Pro card) | Start signup flow for Pro plan at selected billing interval |
| "Talk to sales" (Agency card) | Open contact/sales flow for Agency pricing |
| "Contact us" (Enterprise card) | Open contact/sales flow for Enterprise pricing |
| "Get your free AEO score" (bottom CTA) | Navigate to the scan/score tool |
| "Talk to sales" (bottom CTA) | Open contact/sales flow |
| Header nav items | Standard navigation (shared Header component) |
| Footer links | Standard navigation (shared Footer component) |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Billing toggle | Switches between monthly and annual — toggle knob animates left/right, label colors swap |
| Plan card prices | Starter and Pro prices update to reflect 20% discount when annual is selected |
| Plan card billing notes | Switch between "Billed monthly" and "Billed annually" |

## Different Page States

- **Loading**: Spinner centered on page with "Loading..." text
- **With data**: The normal full-content view (default)
- **Empty / No data yet**: Not applicable — static marketing page
- **Error**: Not designed — static page, no data fetching needed

## New Components Created

- `PricingHero` — hero with badge, headline, subtext, and billing toggle (accepts `isAnnual` and `onToggle` props)
- `PricingCards` — 4 plan cards with features checklists (accepts `isAnnual` prop to compute prices)
- `PricingComparison` — feature comparison table with Pro column highlight
- `PricingCTA` — dark CTA section with trust signals

## Navigation

- **How to get here**: "Pricing" link in the header navigation
- **Where to go from here**: CTA buttons lead to signup, scan tool, or contact sales; header/footer provide standard site navigation

## Notes

- All pricing data is in `src/data/mock-pricing.ts` with TypeScript interfaces (`PricingPlan`, `PricingFeature`, `ComparisonRow`, `CellValue`).
- Billing state is lifted to the page component and passed down to `PricingHero` and `PricingCards` as props.
- The `ANNUAL_DISCOUNT` constant (0.8) in the data file controls the discount multiplier — integration dev can swap this for a backend value.
- Plans with `monthlyPrice: null` (Agency, Enterprise) always display "Custom" regardless of toggle state.
- The page reuses the shared `Header` and `Footer` layout components.
- `DEMO_STATE` toggle at top of page file switches between "loading" and "success" views.
