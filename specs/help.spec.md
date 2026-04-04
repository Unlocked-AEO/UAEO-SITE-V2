# Help Centre

**File**: `src/pages/landing/Help.tsx`
**Route**: `/help`
**Date**: 2026-04-04

## What's on the Page

- **Hero section** — "Help Centre" badge, "How can we help you?" headline, subheadline, and a large search bar with placeholder text ("Search for anything — 'AEO score', 'billing', 'integrations'…"). Light gradient background with a decorative teal radial circle in the top-right area.
- **Browse by Topic** — "Browse by Topic" eyebrow and "Everything you need to know." headline, followed by 6 topic cards in a 3×2 grid:
  - Getting Started (🚀, 8 articles) — account setup, first scan, dashboard basics
  - Your AEO Score (📊, 12 articles) — score calculation, tracking changes
  - Citation Signals (🔗, 10 articles) — authority, structure, entity clarity, coverage
  - Account & Billing (💳, 9 articles) — plan management, payments, invoices, team members
  - Integrations & API (🔌, 14 articles) — webhooks, REST API, native integrations
  - Troubleshooting (🛠️, 6 articles) — common issues, scan errors, step-by-step fixes
- **Popular Articles** — "Most read this week." section with 8 articles split into two columns. Each article row shows the title, a category badge pill, and an arrow. Articles cover topics across all 6 categories.
- **Still Need Help? CTA** — dark navy section with badge, "Can't find what you're looking for?" headline, subheadline about <2h response time, 3 action buttons (Chat with us, Email support, Book a call), and 3 support stats (<2h avg response, 97% satisfaction, 24/7 docs available).
- **Shared Header & Footer** — reused from layout components.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Search bar (typing) | Show live search results as the user types |
| Search bar (Enter key) | Submit search query |
| Each topic card (6 total) | Navigate to that topic's article listing page |
| Each popular article row (8 total) | Navigate to that article's detail page |
| "Chat with us" button | Open live chat widget or navigate to chat |
| "Email support" button | Open email support form or mailto link |
| "Book a call" button | Open call booking page (e.g. Calendly) |
| Header nav items | Navigate to respective pages (shared component) |
| Footer links | Navigate to respective pages (shared component) |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Search bar | Live search results appear as the user types |
| Topic card hover | Border color shifts to teal, subtle shadow appears |
| Popular article row hover | Opacity reduces on hover for click affordance |

## Different Page States

- **Loading**: Centered spinner with "Loading..." text, shared Header and Footer still visible.
- **With data**: The normal view described above with all sections.
- **Empty / No data yet**: Not yet designed.
- **Error**: Not yet designed.

## New Components Created

| Component | File | Description |
|-----------|------|-------------|
| HelpHero | `src/components/home/HelpHero.tsx` | Hero with search bar, badge, headline, and decorative gradient circle |
| HelpTopics | `src/components/home/HelpTopics.tsx` | 6 topic cards in a flex-wrap grid with emoji icons on gradient backgrounds |
| HelpPopularArticles | `src/components/home/HelpPopularArticles.tsx` | Two-column list of 8 popular articles with category badge pills |
| HelpCTA | `src/components/home/HelpCTA.tsx` | Dark CTA section with 3 action buttons and 3 support stats |

## Data File

`src/data/mock-help.ts` — contains all mock data with TypeScript interfaces:
- `HelpTopic`, `PopularArticle`, `SupportStat` interfaces
- `helpHero` — hero section content and search placeholder
- `topicsSection` — eyebrow and headline for topics area
- `helpTopics` — 6 topic cards with emoji, gradient, title, description, article count
- `popularSection` — eyebrow and headline for popular articles
- `popularArticles` — 8 articles with title and category label
- `helpCTA` — CTA badge, headline, subheadline
- `helpCTAButtons` — 3 action buttons with variant and action name
- `helpStats` — 3 support stats (response time, satisfaction, availability)

## Navigation

- **How to get here**: Click a "Help" or "Support" link in the footer or header
- **Where to go from here**: Click a topic card to browse articles in that category, click a popular article to read it, or use the CTA buttons to contact support (chat, email, or book a call)

## Notes

- The search bar currently accepts input and logs on Enter — the integration developer will need to wire up live search-as-you-type with actual results dropdown.
- Topic detail pages and individual help article pages are not yet built.
- Each topic card shows an article count — this should reflect real counts from the help content system.
- The 3 support stats (<2h, 97%, 24/7) are placeholder values to be updated with real metrics.
