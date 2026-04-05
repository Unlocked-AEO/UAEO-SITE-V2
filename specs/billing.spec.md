# Billing

**File**: `src/pages/dashboard/Billing.tsx`
**Route**: `/dashboard/billing`
**Date**: 2026-04-05

## What's on the Page

This is the Billing tab within the Account Settings shell. It contains four sections:

- **Current Plan banner** — A dark gradient banner showing the user's active plan (e.g. "Pro Plan"), monthly price ($99), renewal date (Jan 3, 2027), and seats used (3). Two buttons: "Manage Plan" and "Upgrade".
- **Choose Your Plan card** — Four plan tiles side by side:
  - *Starter* ($29/mo) — 1 seat, 10 scans/mo, core prompts. "Downgrade" button.
  - *Pro* ($99/mo, current) — 3 seats, 50 scans/mo, full prompt bank. Teal border + "CURRENT" badge. "Active Plan" button (disabled).
  - *Agency* ($249/mo) — 10 seats, unlimited scans, white-label. "Upgrade" button.
  - *Enterprise* (Custom pricing) — Unlimited seats, SAML/SSO, dedicated CSM. Purple accent with "CUSTOM" badge. "Contact Sales" button.
- **Payment method row** — Shows the card on file (Visa ending 4242), expiry date (09/2027), billing email (gabe@acmecorp.com), and an "Update Payment" button.
- **Cancel subscription row** — Red-bordered warning row showing that the plan stays active until the renewal date with no refunds. "Cancel Plan" button.

## Buttons & Interactions

All billing actions (except Enterprise "Contact Sales") should integrate with Stripe — Stripe Checkout, Stripe Customer Portal, or Stripe Billing APIs.

| What | What it should do |
|------|------------------|
| "Manage Plan" button (banner) | Open Stripe Customer Portal to manage the current subscription |
| "Upgrade" button (banner) | Open Stripe Checkout or portal to upgrade the plan |
| "Downgrade" button (Starter tile) | Redirect to Stripe to downgrade — should show confirmation before proceeding |
| "Active Plan" button (Pro tile) | Disabled — indicates current plan, no action |
| "Upgrade" button (Agency tile) | Redirect to Stripe Checkout to upgrade to Agency plan |
| "Contact Sales" button (Enterprise tile) | Open a sales contact form (not Stripe) |
| "Update Payment" button | Open Stripe Customer Portal to update payment method |
| "Cancel Plan" button | Redirect to Stripe to cancel subscription — should show confirmation before proceeding |
| Back arrow button (shell) | Navigate back to the dashboard |
| Settings tab buttons (shell) | Navigate to Profile, Security, Preferences, Billing, or Support |
| Logo / "Unlocked AEO" (shell) | Navigate to homepage |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Current plan banner | Updates to reflect whichever plan is active (name, price, renewal date, seats) |
| Plan tiles | The "CURRENT" badge and teal border move to whichever plan is active |
| Payment method row | Updates to show the card on file from Stripe (brand, last4, expiry, billing email) |
| Cancel row subtitle | Updates the renewal date to match the current billing period end |

## Different Page States

- **Loading**: Skeleton cards with pulsing placeholders matching the shape of the banner, plan tiles, and payment row
- **With data**: All four sections rendered with current billing data from Stripe
- **Empty / No data yet**: Centered message "No active subscription" with a "View Plans" CTA — for users who haven't subscribed yet
- **Error**: Centered error message "Unable to load billing" with red-tinted border and a "Retry" button

## New Components Created

| Component | File | Description |
|-----------|------|-------------|
| CurrentPlanBanner | `src/components/dashboard/CurrentPlanBanner.tsx` | Dark gradient banner showing active plan details with Manage/Upgrade buttons |
| ChoosePlanCard | `src/components/dashboard/ChoosePlanCard.tsx` | Four plan tiles with pricing, features, and CTA buttons; highlights the active plan |
| PaymentMethodRow | `src/components/dashboard/PaymentMethodRow.tsx` | Card-on-file display with brand icon, details, and Update Payment button |
| CancelSubscriptionRow | `src/components/dashboard/CancelSubscriptionRow.tsx` | Red-bordered warning row with cancel details and Cancel Plan button |

## Navigation

- **How to get here**: Click the "Billing" tab from any Account Settings page (Profile, Security, Preferences, etc.)
- **Where to go from here**: Other settings tabs, back to dashboard, or homepage via logo. Billing actions redirect to Stripe.

## Notes

- **Stripe integration is required.** All plan changes, payment updates, and cancellations should go through Stripe (Checkout, Customer Portal, or Billing APIs). The integration dev should set up Stripe products/prices for Starter, Pro, and Agency plans.
- The Enterprise "Contact Sales" button is the only action that does NOT go through Stripe — it should open a sales contact form instead.
- Plan data (name, price, seats, features) should come from Stripe products/prices so it stays in sync. The mock data in `src/data/mock-billing.ts` shows the expected shape.
- The cancel row should show a confirmation dialog before proceeding to Stripe cancellation.
- Downgrade should also confirm before proceeding, as it may reduce available seats/scans.
- This page reuses the `SettingsShell` layout shared with Profile, Security, Preferences, and Support pages.
