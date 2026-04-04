# Blog (AEO Insights)

**File**: `src/pages/landing/Blog.tsx`
**Route**: `/blog`
**Date**: 2026-04-04

## What's on the Page

- **Hero section** — "AEO Insights" badge, headline ("The blog for AI search visibility"), subheadline, and a row of category filter pills (All, AEO Guide, Research, Strategy, Technical, Product, Case Study). "All" is active by default.
- **Featured article card** — a large two-panel card. Left side has the article category badge ("Research"), "Featured" label, title, excerpt, author avatar (initials on gradient circle), author name, date, read time, and a "Read article ›" link. Right side has a dark gradient background with decorative circles and a frosted-glass "Citation Probability" visualization showing horizontal bars for ChatGPT (84%), Perplexity (71%), Claude (67%), and Grok (38%), with a footer note ("Based on 50,000 analyzed responses").
- **Latest articles grid** — section header ("Latest articles" + "See all →" link), then a 3-column grid of 6 article cards. Each card has a colored accent gradient bar at top, category badge, title, excerpt, and a footer with author avatar/name/date/read time. One card (Live Citation Monitoring) has a green "NEW" badge.
- **Newsletter signup** — "Newsletter" badge, headline ("Stay ahead of AI search"), subheadline, email input field + "Subscribe" button, and footnote ("4,200+ subscribers · Unsubscribe anytime"). Background is light gray.
- **Shared Header & Footer** — reused from layout components.

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Category filter pills (All, AEO Guide, Research, etc.) | Filter the displayed articles by category |
| "Read article ›" on featured card | Navigate to the featured article's detail page |
| Each article card in the grid | Navigate to that article's detail page |
| "See all →" link | Navigate to a full article listing / archive |
| "Load more articles" button | Load the next batch of articles below the grid |
| "Subscribe" button | Submit the entered email address for newsletter signup |
| Header nav items | Navigate to respective pages (shared component) |
| Footer links | Navigate to respective pages (shared component) |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Category filter pills | Active pill gets dark background (`bg-navy`, white text); inactive pills have light background |
| Email input field | Accepts typed text; border highlights on focus |

## Different Page States

- **Loading**: Centered spinner with "Loading..." text, shared Header and Footer still visible.
- **With data**: The normal view described above with featured article, article grid, and newsletter signup.
- **Empty / No data yet**: Not yet designed.
- **Error**: Not yet designed.

## New Components Created

| Component | File | Description |
|-----------|------|-------------|
| BlogHero | `src/components/home/BlogHero.tsx` | Hero with badge, headline, subheadline, and interactive category filter pills |
| BlogFeaturedArticle | `src/components/home/BlogFeaturedArticle.tsx` | Large featured article card with citation probability visualization |
| BlogArticleGrid | `src/components/home/BlogArticleGrid.tsx` | 3-column grid of article cards with accent bars, badges, and author info |
| BlogNewsletter | `src/components/home/BlogNewsletter.tsx` | Newsletter signup section with email input and subscribe button |

## Data File

`src/data/mock-blog.ts` — contains all mock data with TypeScript interfaces:
- `BlogCategory`, `BlogAuthor`, `BlogArticle`, `FeaturedArticle`, `CitationBarItem` interfaces
- `blogHero` — hero section content
- `blogCategories` — 7 category filter options
- `featuredArticle` — featured article with citation bar data
- `blogArticles` — 6 article cards with category/author/gradient data
- `blogNewsletter` — newsletter section content

## Navigation

- **How to get here**: Click "Blog" in the header navigation bar
- **Where to go from here**: Click an article card to go to an article detail page (not yet built), or use the header nav to go to other pages

## Notes

- The category filters are interactive (toggle state) but don't actually filter the article list yet — the integration developer will need to wire up real filtering logic.
- Article detail pages are not yet built — all "read article" actions currently just log to console.
- The citation probability visualization in the featured card uses hardcoded bar widths matching the percentage values.
- Author avatars use initials on gradient circles (no actual images).
