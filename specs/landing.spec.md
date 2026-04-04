# Landing Page

**File**: `src/pages/landing/Landing.tsx`
**Route**: `/home`
**Date**: 2026-04-04

## What's on the Page

This is the public-facing marketing homepage for Unlocked AEO. It's a long-scroll page with the following sections (top to bottom):

- **Header** — Logo ("Unlocked AEO"), main navigation (Solutions, How It Works, Pricing, Case Studies, Blog), and two CTAs (Dashboard, Contact Sales). Solutions and How It Works have dropdown indicators but dropdowns are not built yet.
- **HeroSection** — Large headline ("AI visibility infrastructure to grow your reach."), subtext describing the product, and two CTAs: "Get started" (primary) and "Sign up with Google" (outline with Google-style gradient circle). Decorative gradient blobs on the right side.
- **LogoBar** — Row of AI engine icons (ChatGPT, Perplexity, Gemini, Grok, Claude, Copilot) with the tagline "Trusted by teams already winning on AI."
- **SolutionCards** — Section intro with "Explore all solutions" link, followed by two side-by-side cards:
  - *AI Visibility Score* (light bg) — Per-engine score bars with color coding (green ≥70, yellow ≥50, red <50) and change indicators (▲/▼).
  - *Content Intelligence* (dark/navy bg) — Checklist of optimization results and a projected citation increase.
- **FeatureCards** — Three equal-width cards:
  - *Competitive Intelligence* — Description + two stats (3.2× avg cite gap, 14 rivals tracked).
  - *Schema & Structured Data* — Description + colored tag pills (FAQ, HowTo, Organization, Product, Review).
  - *Reputation Accuracy* (dark/navy bg) — Description + bullet list of features.
- **AnalyticsBanner** — Dark gradient banner with left-side text about full-funnel attribution and a right-side funnel chart showing Citation → Click-through → Engaged sessions → Conversions with horizontal bars.
- **StatsSection** — Left column with headline/description/CTA, right column with 2×2 grid of stat cards: 89%, 6.2×, 12K+, $2.4B.
- **EnterpriseSection** — Two columns:
  - *Features list* — Three features with icons (Dedicated success team, Custom reporting & SLAs, Multi-brand management).
  - *Case study card* (dark bg) — Quote from HorizonTech VP Marketing, with stats (7× citations, +218% organic).
- **TestimonialsSection** — Pill-style tab bar to switch between AI engines (ChatGPT, Perplexity, Gemini, Grok, Claude). Each tab shows a quote, author avatar (initials), name, role, and company. Dot navigation at the bottom. **This is the only interactive/stateful section** — tabs switch using React state.
- **AgencySection** — Left column with headline, description, feature list with icons, and two CTAs. Right column shows a mock code editor window (macOS-style traffic light dots, `aeo-api.js` filename) with syntax-highlighted API usage example. Below: three agency feature cards (Client onboarding, White-label reporting, Dedicated agency support).
- **ResourcesSection** — Header with "See all articles" link. Left side: featured blog post with gradient placeholder image. Right side: three article entries with category, title, and "Read more" links.
- **CTASection** — Centered final CTA with headline, description, "Get started free" + "Contact sales" buttons, and "No credit card required · Cancel anytime" disclaimer.
- **Footer** — Brand name, tagline, social icons (Threads, X, LinkedIn), four link columns (Solutions, Resources, Company), divider, copyright, and legal links (Privacy, Terms, Cookies, Sitemap).

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Logo (header) | Navigate to home (`ACTION: navigate_home`) |
| Nav items (Solutions, How It Works, etc.) | Navigate to respective pages (`ACTION: navigate`) — dropdowns on Solutions & How It Works not yet built |
| "Dashboard" button (header) | Navigate to dashboard (`ACTION: navigate_dashboard`) |
| "Contact sales" button (header) | Open contact sales flow (`ACTION: contact_sales`) |
| "Get started" (hero) | Start signup/onboarding (`ACTION: get_started`) |
| "Sign up with Google" (hero) | Google OAuth signup (`ACTION: signup_google`) |
| "Explore all solutions" link | Navigate to solutions page (`ACTION: explore_solutions`) |
| "Learn about Analytics" link | Navigate to analytics info (`ACTION: learn_analytics`) |
| "Read customer stories" link | Navigate to customer stories (`ACTION: read_customer_stories`) |
| "Contact sales" (enterprise) | Open contact sales flow (`ACTION: contact_sales`) |
| Testimonial engine tabs | Switch displayed testimonial (functional — uses `useState`) |
| Testimonial dot indicators | Switch displayed testimonial (functional) |
| "Explore agency plan" button | Navigate to agency plan page (`ACTION: explore_agency_plan`) |
| "Contact sales" (agency) | Open contact sales flow (`ACTION: agency_contact_sales`) |
| Agency card CTAs | Navigate to respective agency feature pages (`ACTION: agency_card_cta`) |
| "See all articles" link | Navigate to blog/resources listing (`ACTION: see_all_articles`) |
| Blog post / article links | Navigate to individual article (`ACTION: read_article`) |
| "Get started free" (bottom CTA) | Start signup/onboarding (`ACTION: get_started_free`) |
| "Contact sales" (bottom CTA) | Open contact sales flow (`ACTION: contact_sales`) |
| Social icons (footer) | Open social media profiles (`ACTION: open_social`) |
| Footer links | Navigate to respective pages (`ACTION: navigate_footer`) |
| Legal links (footer) | Navigate to legal pages (`ACTION: navigate_legal`) |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Testimonial tabs | Clicking an engine name or dot switches the displayed quote, author, and attribution. Uses React `useState`. |

Everything else on the page is static. No animations, count-ups, or auto-refreshing content.

## Different Page States

- **Loading**: Centered spinner with "Loading..." text, header and footer still visible.
- **With data**: The full marketing page (default `DEMO_STATE = "success"`).
- **Empty / No data yet**: Not applicable — this is a marketing page with no user-specific data.
- **Error**: Not applicable — same reason as above.

## New Components Created

- **`Button`** (`src/components/ui/Button.tsx`) — Reusable button with `primary`, `outline`, and `dark` variants and `sm`, `md`, `lg` sizes.
- **`Header`** (`src/components/layout/Header.tsx`) — Site-wide header with logo, nav, and CTAs.
- **`Footer`** (`src/components/layout/Footer.tsx`) — Site-wide footer with brand, social icons, link columns, and legal links.
- **`EngineIcon`** (`src/components/home/EngineIcon.tsx`) — Renders AI engine brand icons by slug. Has a `badge` variant for compact display.

## Navigation

- **How to get here**: This is the homepage — `/home` route. Entry point for the site.
- **Where to go from here**: Solutions, How It Works, Pricing, Case Studies, Blog (via nav); Dashboard (via header button); Contact Sales; individual blog articles; social media profiles; signup/onboarding flow.

## Notes

- All mock data lives in `src/data/mock-landing.ts` with TypeScript interfaces for every data shape.
- Nav dropdowns for "Solutions" and "How It Works" show a ▾ indicator but the dropdown menus themselves are not built yet.
- The code block in the Agency section is purely decorative — it shows a mock API usage example to appeal to technical buyers.
- All gradients use `oklab` color space for smooth, perceptually uniform blending.
