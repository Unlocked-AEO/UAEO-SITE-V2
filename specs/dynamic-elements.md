# Dynamic Elements & Animations

**Date**: 2026-04-06

A complete reference of every dynamic/animated element across the site for the integration developer.

---

## Animation Hooks

| Hook | File | Description |
|------|------|-------------|
| `useCountUp` | `src/hooks/useCountUp.tsx` | Animates a number from 0 to target on mount. Ease-out cubic, configurable duration (default 1200ms). |
| `useInView` | `src/hooks/useInView.tsx` | One-shot intersection observer. Returns `[ref, boolean]`. Once true, stays true. |
| `useScrollCountUp` | `src/hooks/useScrollCountUp.tsx` | Count-up that only starts when scrolled into view. Returns `[ref, animatedValue]`. |

---

## Dashboard (`/dashboard`)

### KPI Cards (`KPICards.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| "Scans This Month" (14) | Count up from 0 | Page load |
| "Total Visits" (8,420) | Count up from 0 (with comma formatting) | Page load |
| Mentions carousel value | Count up from 0 (all 4 values animate once on mount) | Page load |
| Mentions carousel tab | Auto-cycles every 8 seconds through: Monthly Mentions (247), Monthly Citations (89), Monthly Recommendations (34), Hallucinations Detected (7) | Auto |
| Carousel pagination dots | Active dot = wide teal pill, inactive = small grey circle. Clickable. | Click / auto-cycle |

### Score Averages (`ScoreAverages.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| 6 circular gauges (AI Visibility 68, Brand Accuracy 81, Sentiment 74, Schema 45, Freshness 77, EEAT 61) | SVG circle stroke fills from 0 to score %, number counts up | Page load |

### Engine Scores (`EngineScores.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| 5 engine score numbers (78, 71, 65, 38, 82) | Count up from 0 | Page load |
| 5 engine progress bars | Width grows from 0% to score % | Page load |

### Industry Leaderboard (`IndustryLeaderboard.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| 6 leaderboard scores (91, 84, 74, 68, 61, 53) | Count up from 0 | Page load |
| 6 leaderboard bars | Width grows from 0% to score % | Page load |

### Score Trends (`ScoreTrends.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Line chart (Recharts) | Renders with data, interactive tooltip on hover | Page load |
| Trend line filter pills | Toggle lines on/off (React state, not just console.log) | Click |

---

## Landing Page (`/`)

### Hero (`HeroSection.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Headline | Fade in + slide up | Page load |
| Subtext | Fade in + slide up (200ms delay) | Page load |
| CTA buttons | Fade in + slide up (400ms delay) | Page load |

### Solution Cards — AI Visibility (`SolutionCards.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Section intro | Fade in + slide up | Scroll into view |
| 6 engine score numbers (78, 71, 65, 38, 82, 59) | Count up from 0 | Scroll into view |
| 6 engine progress bars | Width grows from 0% to score % (staggered 150ms each) | Scroll into view |

### Stats Section (`StatsSection.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Entire section | Fade in + slide up | Scroll into view |
| 4 stat cards | Stagger fade in (150ms delay each) | Scroll into view |
| Stat values (89%, 6.2×, 12K+, $2.4B) | Count up from 0 (handles decimals, prefixes, suffixes) | Scroll into view |

### Analytics Banner (`AnalyticsBanner.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Left text block | Fade in + slide from left | Scroll into view |
| Funnel chart | Fade in + slide from right (300ms delay) | Scroll into view |
| 4 funnel bars | Width grows from 0% to target % (staggered 150ms each, starting at 400ms) | Scroll into view |
| Funnel bar values (24,847 / 16,895 / 7,183 / 3,022) | Fade in after bar fills (600ms after bar starts) | Scroll into view |

---

## Product Page (`/product`)

### Hero (`ProductHero.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Badge | Fade in + slide up | Page load |
| Headline | Fade in + slide up (150ms delay) | Page load |
| Subtext | Fade in + slide up (300ms delay) | Page load |
| CTA buttons | Fade in + slide up (450ms delay) | Page load |
| Stats banner numbers (5, 72+, <60s, 24hr) | Count up from 0 | Scroll into view |

### Feature Sections (`ProductFeatureSection.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Text side (badge, headline, description, checklist) | Fade in + slide up | Scroll into view |
| Mock UI preview | Fade in + slide up (200ms delay) | Scroll into view |

---

## Pricing Page (`/pricing`)

### Pricing Cards (`PricingCards.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Price values ($89.99, $299.99) | Animate from old value to new value (600ms ease-out cubic) | Monthly/Annual toggle |

---

## About Page (`/about`)

### All sections
| Component | Animation | Trigger |
|-----------|-----------|---------|
| `AboutStory` | Fade in + slide up | Scroll into view |
| `AboutValues` | Fade in + slide up | Scroll into view |
| `AboutStats` — section | Fade in + slide up | Scroll into view |
| `AboutStats` — numbers (12K+, 89%, 6, $2.4B) | Count up from 0 | Scroll into view |
| `AboutTeam` | Fade in + slide up | Scroll into view |
| `AboutAdvisors` | Fade in + slide up | Scroll into view |
| `AboutHiring` | Fade in + slide up | Scroll into view |

---

## Blog Page (`/blog`)

| Component | Animation | Trigger |
|-----------|-----------|---------|
| `BlogFeaturedArticle` | Fade in + slide up | Scroll into view |
| `BlogArticleGrid` | Fade in + slide up | Scroll into view |
| `BlogNewsletter` | Fade in + slide up | Scroll into view |

---

## What is AEO Page (`/what-is-aeo`)

| Component | Animation | Trigger |
|-----------|-----------|---------|
| `AEODefinition` | Fade in + slide up | Scroll into view |
| `AEOComparison` | Fade in + slide up | Scroll into view |
| `AEOCitationSignals` | Fade in + slide up | Scroll into view |
| `AEOWhyNow` | Fade in + slide up | Scroll into view |
| `AEOHowWeHelp` | Fade in + slide up | Scroll into view |

---

## Scan Detail Pages

### Noted as planned (not yet implemented)
| Page | Element | Planned Animation |
|------|---------|-------------------|
| Scan Overview (`/dashboard/scans/:scanId`) | 6 score gauge circles | Fill from 0 on load |
| Scan AI Visibility | Stats bar numbers (247, 89, 34) | Count up on load |
| Scan Brand Accuracy | Stat card numbers (7, 3/5, 2/5) | Count up on load |
| Scan Content Freshness | Stat card numbers (34, 28) + category counts (8, 12, 42) | Count up on load |

---

## Animation Patterns Reference

**Fade in + slide up:**
```
transition-all duration-700
${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
```

**Fade in from left/right:**
```
transition-all duration-700
${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
```

**Staggered delay:**
```
style={{ transitionDelay: `${index * 150}ms` }}
```

**Count-up (on mount):**
```tsx
const animatedValue = useCountUp(targetNumber, 1200);
```

**Count-up (on scroll):**
```tsx
const [ref, animatedValue] = useScrollCountUp(targetNumber, 1400);
```
