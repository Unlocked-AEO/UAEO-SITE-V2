# Navigation Map

**Date**: 2026-04-05

This document maps every navigable route, which buttons/links lead to it, and flags pages that don't exist yet or have no incoming links.

---

## All Routes

| Route | Page File | Status |
|-------|-----------|--------|
| `/` | `src/pages/landing/Landing.tsx` | Live |
| `/how-it-works` | `src/pages/landing/HowItWorks.tsx` | Live |
| `/about` | `src/pages/landing/About.tsx` | Live |
| `/what-is-aeo` | `src/pages/landing/WhatIsAEO.tsx` | Live |
| `/blog` | `src/pages/landing/Blog.tsx` | Live |
| `/teams` | `src/pages/landing/Teams.tsx` | Live |
| `/pricing` | `src/pages/landing/Pricing.tsx` | Live |
| `/faq` | `src/pages/landing/FAQ.tsx` | Live |
| `/help` | `src/pages/landing/Help.tsx` | Live |
| `/terms` | `src/pages/landing/Terms.tsx` | Live |
| `/privacy` | `src/pages/landing/Privacy.tsx` | Live |
| `/brand-guidelines` | `src/pages/landing/BrandGuidelines.tsx` | Live |
| `/dashboard` | `src/pages/dashboard/Overview.tsx` | Live |
| `/dashboard/scans` | `src/pages/dashboard/Scans.tsx` | Live |
| `/dashboard/scans/new` | `src/pages/dashboard/RunScan.tsx` | Live |
| `/dashboard/scans/settings` | `src/pages/dashboard/AdvancedScanSettings.tsx` | Live |
| `/dashboard/scans/:scanId` | `src/pages/dashboard/ScanOverview.tsx` | Live |
| `/dashboard/scans/:scanId/ai-visibility` | `src/pages/dashboard/ScanAIVisibility.tsx` | Live |
| `/dashboard/scans/:scanId/brand-accuracy` | `src/pages/dashboard/ScanBrandAccuracy.tsx` | Live |
| `/dashboard/scans/:scanId/content-freshness` | `src/pages/dashboard/ScanContentFreshness.tsx` | Live |
| `/dashboard/improvement-plan` | `src/pages/dashboard/ImprovementPlan.tsx` | Live |
| `/dashboard/improvement-plan/fix` | `src/pages/dashboard/ImprovementPlanExpanded.tsx` | Live |
| `/dashboard/profile` | `src/pages/dashboard/Profile.tsx` | Live |
| `/dashboard/security` | `src/pages/dashboard/Security.tsx` | Live |
| `/dashboard/preferences` | `src/pages/dashboard/Preferences.tsx` | Live |
| `/dashboard/billing` | `src/pages/dashboard/Billing.tsx` | Live |
| `/dashboard/support` | `src/pages/dashboard/Support.tsx` | Live |
| `/signup` | `src/pages/authenticated/Signup.tsx` | Live |
| `/signin` | `src/pages/authenticated/Signin.tsx` | Live |
| `/contact` | `src/pages/landing/Contact.tsx` | Live |
| `/schedule` | `src/pages/landing/ScheduleCall.tsx` | Live |
| `/product` | `src/pages/landing/Product.tsx` | Live |

---

## Wired Navigation Links

### Landing Header (`src/components/layout/Header.tsx`)
| Button/Link | Navigates to |
|-------------|-------------|
| Logo "Unlocked AEO" | `/` |
| "Product" | `/product` |
| "How It Works" | `/how-it-works` |
| "Pricing" | `/pricing` |
| Solutions dropdown → For Brands/Agencies/Enterprise | **No pages** — logs ACTION |
| Resources dropdown → "What is AEO" | `/what-is-aeo` |
| Resources dropdown → "Blog" | `/blog` |
| Resources dropdown → "Case Studies" | **No page** — logs ACTION |
| Resources dropdown → "About Us" | `/about` |
| "Dashboard" button | `/signup` (logged out) or `/dashboard` (logged in) |
| "Contact sales" | `/contact` |
| Active nav indicator | Teal bottom border + dark text on current route |

### Landing Footer (`src/components/layout/Footer.tsx`)
| Button/Link | Navigates to |
|-------------|-------------|
| "Blog" | `/blog` |
| "About" | `/about` |
| "Pricing" | `/pricing` |
| "Privacy" | `/privacy` |
| "Terms" | `/terms` |
| "For Brands/Agencies/Enterprise/Startups" | **No pages** — logs ACTION |
| "Case Studies" | **No page** — logs ACTION |
| "AEO Glossary" | **No page** — logs ACTION |
| "Contact" | `/contact` |
| "Cookies" | **No page** — logs ACTION |
| "Sitemap" | **No page** — logs ACTION |
| Social icons (Threads, X, LinkedIn) | **External** — logs ACTION |

### Dashboard Shell (`src/components/layout/DashboardShell.tsx`)
| Button/Link | Navigates to |
|-------------|-------------|
| Logo "Unlocked AEO" | `/` |
| User avatar / company name | `/dashboard/profile` |
| "Overview" tab | `/dashboard` |
| "Scans" tab | `/dashboard/scans` |
| "Improvement Plan" tab | `/dashboard/improvement-plan` |
| "Competitors" tab | **No page** — logs ACTION |
| "Risk Insights" tab | **No page** — logs ACTION |

### Settings Shell (`src/components/layout/SettingsShell.tsx`)
| Button/Link | Navigates to |
|-------------|-------------|
| Logo "Unlocked AEO" | `/` |
| User avatar / company name | `/dashboard/profile` |
| Back arrow | `/dashboard` |
| "Profile" tab | `/dashboard/profile` |
| "Security" tab | `/dashboard/security` |
| "Preferences" tab | `/dashboard/preferences` |
| "Billing" tab | `/dashboard/billing` |
| "Support" tab | `/dashboard/support` |

### Scan Tabs (`src/components/dashboard/ScanTabs.tsx`)
| Tab | Navigates to |
|-----|-------------|
| "Summary" | `/dashboard/scans/:scanId` |
| "AI Visibility" | `/dashboard/scans/:scanId/ai-visibility` |
| "Brand Accuracy" | `/dashboard/scans/:scanId/brand-accuracy` |
| "Content Freshness" | `/dashboard/scans/:scanId/content-freshness` |
| "Sentiment" | `/dashboard/scans/:scanId/sentiment` — **No page exists yet** |
| "Schema Coverage" | `/dashboard/scans/:scanId/schema-coverage` — **No page exists yet** |
| "EEAT" | `/dashboard/scans/:scanId/eeat` — **No page exists yet** |

### Scan Detail Pages (all 4 share the same shell)
| Button/Link | Navigates to |
|-------------|-------------|
| "Back" button | `/dashboard/scans` |
| "Export" button | **Not navigation** — logs ACTION |
| User avatar | `/dashboard/profile` |

### Scan Row (`src/components/dashboard/ScanRow.tsx`)
| Button/Link | Navigates to |
|-------------|-------------|
| "View Scan" button | `/dashboard/scans/:scanId` |
| "Export" button | **Not navigation** — logs ACTION |
| Delete button | **Not navigation** — logs ACTION |

### Cross-Page CTAs
| Button | On Page | Navigates to |
|--------|---------|-------------|
| "Run your first scan" | Dashboard Overview (empty state) | `/dashboard/scans/new` |
| "Run Scan" button | Scans page (ScansCard header) | `/dashboard/scans/new` |
| "Run Your First Scan" | Scans page (empty state) | `/dashboard/scans/new` |
| "Run a scan" | Improvement Plan (empty state) | `/dashboard/scans/new` |
| "Advanced Settings" card | Run Scan modal | `/dashboard/scans/settings` |
| Back arrow | Advanced Scan Settings | `/dashboard/scans/new` |
| Cancel button | Advanced Scan Settings | `/dashboard/scans/new` |
| Logo | Advanced Scan Settings | `/` |

---

## Pages That Don't Exist Yet

These are referenced in navigation but have no route or page file:

| Referenced As | Where Referenced | Notes |
|---------------|-----------------|-------|
| Solutions | Header nav, Footer | Dropdown or landing page needed |
| Case Studies | Header nav, Footer | Landing page needed |
| Contact | Footer, "Contact sales" CTA | Landing page or modal needed |
| AEO Glossary | Footer | Landing page needed |
| Cookies | Footer legal links | Cookie settings page/modal needed |
| Sitemap | Footer legal links | Sitemap page needed |
| Competitors | Dashboard tab | Dashboard tab page needed |
| Risk Insights | Dashboard tab | Dashboard tab page needed |
| Sentiment | Scan tab | `/dashboard/scans/:scanId/sentiment` needed |
| Schema Coverage | Scan tab | `/dashboard/scans/:scanId/schema-coverage` needed |
| EEAT | Scan tab | `/dashboard/scans/:scanId/eeat` needed |

## Pages With No Incoming Links (Dead Ends / Orphans)

These pages exist but have **no button or link that navigates to them**:

| Route | Page | How to reach it |
|-------|------|----------------|
| `/what-is-aeo` | WhatIsAEO.tsx | No link in header/footer — only reachable by direct URL |
| `/faq` | FAQ.tsx | No link in header/footer — only reachable by direct URL |
| `/help` | Help.tsx | No link in header/footer — only reachable by direct URL |
| `/teams` | Teams.tsx | No link in header/footer — only reachable by direct URL |
| `/brand-guidelines` | BrandGuidelines.tsx | No link in header/footer — only reachable by direct URL |
| `/dashboard/improvement-plan/fix` | ImprovementPlanExpanded.tsx | Linked via expand_fix_details ACTION in ImprovementPlanCard, but not yet wired to navigate |
