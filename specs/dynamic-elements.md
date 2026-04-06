# Dynamic Elements & Animations

**Date**: 2026-04-06

A complete reference of every dynamic/animated element across the site for the integration developer.

---

## Animation Libraries & Hooks

### GSAP (GreenSock)
Used for complex, choreographed animations on landing pages. Installed via `npm install gsap`.

| Feature | Usage |
|---------|-------|
| `gsap.from()` / `gsap.to()` | Entrance animations, floating, parallax |
| `gsap.timeline()` | Sequenced multi-element animations |
| `ScrollTrigger` | Scroll-triggered section reveals |
| Mouse events | Interactive parallax and hover effects |

### Custom React Hooks

| Hook | File | Description |
|------|------|-------------|
| `useCountUp` | `src/hooks/useCountUp.tsx` | Animates a number from 0 to target on mount. Ease-out cubic, configurable duration (default 1200ms). |
| `useInView` | `src/hooks/useInView.tsx` | One-shot intersection observer. Returns `[ref, boolean]`. Once true, stays true. |
| `useScrollCountUp` | `src/hooks/useScrollCountUp.tsx` | Count-up that only starts when scrolled into view. Returns `[ref, animatedValue]`. |

---

## Dashboard (`/dashboard`) — GSAP powered

### Page-Level (`Overview.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| 4 dashboard rows (KPI, scores, trends, risk) | GSAP stagger slide up 40px, 120ms apart (`power3.out`) | Page load |

### KPI Cards (`KPICards.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| "Scans This Month" (14) | Count up from 0 | Page load |
| "Total Visits" (8,420) | Count up from 0 (with comma formatting) | Page load |
| Share of Voice donut segments | GSAP strokeDasharray animate from 0 arc to target arc, staggered per segment | Page load |
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

### Top Recommendations (`TopRecommendations.tsx`) — GSAP powered
| Element | Animation | Trigger |
|---------|-----------|---------|
| 5 recommendation items | GSAP slide in from left 25px, stagger 80ms | Page load |

### Risk Insights (`RiskInsights.tsx`) — GSAP powered
| Element | Animation | Trigger |
|---------|-----------|---------|
| 4 risk cards | GSAP scale from 96% + fade in, stagger 100ms | Page load |
| Severity dots | GSAP pop in from scale 0 with `back.out(3)` bounce | Page load (delayed 0.9s) |

### Score Trends (`ScoreTrends.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Line chart (Recharts) | Renders with data, interactive tooltip on hover | Page load |
| Trend line filter pills | Toggle lines on/off (React state, not just console.log) | Click |

---

## Landing Page (`/`)

### Hero (`HeroSection.tsx`) — GSAP powered
| Element | Animation | Trigger |
|---------|-----------|---------|
| Headline | GSAP word-by-word split: each word slides up 60px with 0.06s stagger (`power3.out`) | Page load |
| Subtext | GSAP slide up 30px + fade in (0.7s delay) | Page load |
| CTA buttons | GSAP slide up 30px + fade in (0.9s delay) | Page load |

### Hero Network Visualization (`HeroOrbs.tsx`) — GSAP powered
7 nodes total: center Unlocked AEO + 6 AI engines in hexagonal layout. Each node shows its actual brand logo SVG clipped inside a circle. All connections run directly between logos.

| Element | Animation | Trigger |
|---------|-----------|---------|
| 7 logo nodes (Unlocked AEO center + ChatGPT, Perplexity, Gemini, Grok, Claude, Copilot) | Scale in from 0 with `back.out(2)` bounce, staggered from center | Page load |
| 21 connection lines (6 hub spokes, 6 hexagon ring, 3 cross-diagonals, 6 skip connections) | Draw in from 0 length with random stagger delays | Page load |
| 6 AI engine pulse rings | Continuous expanding/fading rings (`repeat: -1`) | Continuous |
| All 7 nodes | Float on independent sine-wave paths (5–7.5s cycles) | Continuous |
| Connection lines | Opacity breathes independently per line | Continuous |
| Random connections | Flash bright (opacity 0.7, width 2.5px) every 1.5s, 1–2 at once | Continuous |
| All engine nodes | Attract toward mouse cursor on hover | Mouse move |
| Nearby connections | Brighten + thicken when mouse is within 150px | Mouse move |
| All nodes on mouse leave | Spring back to float position with `elastic.out` | Mouse leave |
| Labels | Fade in + slide up after network forms | Page load |

**Logo assets used**: `logo.svg` (center), `openai-logo.svg`, `perplexity-logo.svg`, `gemini-logo.svg`, `grok-logo.svg`, `claude-logo.svg`, `copilot-logo.svg`

### Solution Cards — AI Visibility (`SolutionCards.tsx`) — GSAP powered
| Element | Animation | Trigger |
|---------|-----------|---------|
| Section intro | Fade in + slide up (useInView) | Scroll into view |
| Card container | GSAP slide up 50px (`power3.out`) via ScrollTrigger | Scroll into view |
| Score card inner | GSAP slide up 30px | Scroll into view |
| 6 engine rows | GSAP slide in from left 40px, stagger 0.1s (`power3.out`) | Scroll into view |
| 6 engine progress bars | GSAP fill 0% → target% with `elastic.out(1, 0.6)` bounce, stagger 0.12s | Scroll into view |
| 6 engine score numbers | GSAP count-up 0 → target, synced with bar fill | Scroll into view |
| 6 change indicators (▲/▼) | GSAP pop in from scale 0 with `back.out(2)`, delayed 0.8s | Scroll into view |

### Feature Cards (`FeatureCards.tsx`) — GSAP powered
| Element | Animation | Trigger |
|---------|-----------|---------|
| 3 feature cards | GSAP slide up 60px with 0.15s stagger (`power3.out`) via ScrollTrigger | Scroll into view |

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

### Testimonials (`TestimonialsSection.tsx`) — GSAP powered
| Element | Animation | Trigger |
|---------|-----------|---------|
| Engine tabs | GSAP slide up 30px + fade in via ScrollTrigger | Scroll into view |
| Quote block | GSAP slide up 40px + fade in (0.2s delay) | Scroll into view |
| Quote switch | GSAP fade out + slide up → fade in + slide down (0.25s out, 0.35s in) | Tab click |
| Pagination dots | Smooth width transition on active state | Tab click |

### CTA Section (`CTASection.tsx`) — GSAP powered
| Element | Animation | Trigger |
|---------|-----------|---------|
| Label, headline, description, buttons | GSAP timeline cascade with overlapping timing (-0.3s offsets) | Scroll into view |

---

## How It Works Page (`/how-it-works`) — GSAP powered

### Hero (`HIWHero.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Badge, headline, subtext | GSAP timeline cascade with overlapping timing | Page load |
| Step indicator bar | GSAP scale in from 95% | Page load |
| 4 step circles (1, 2, 3, 4) | GSAP pop in from scale 0 with `back.out(2.5)` bounce, staggered | Page load |
| Connecting lines between steps | GSAP scaleX from 0 (draw in left to right), sequential | Page load |
| Step labels | GSAP fade in + slide up after circles | Page load |

### Step 1: Crawl (`HIWStepCrawl.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Text block | GSAP slide in from left 60px | Scroll into view |
| Browser mockup card | GSAP slide in from right 60px (0.2s delay) | Scroll into view |
| Checklist items | GSAP slide in from left 20px, stagger 100ms | Scroll into view |
| Progress bar | GSAP scaleX from 0, left origin, 1.5s duration | Scroll into view |
| Crawl result items | GSAP cascade down, stagger 80ms | Scroll into view |

### Step 2: Extract (`HIWStepExtract.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| E-E-A-T card (left) | GSAP slide in from left 60px | Scroll into view |
| Text block (right) | GSAP slide in from right 60px | Scroll into view |
| Score bars | GSAP scaleX from 0 with `elastic.out(1, 0.6)` bounce, stagger | Scroll into view |
| Tags/pills | GSAP scale from 0 with `back.out(2)` pop, stagger 50ms | Scroll into view |

### Step 3: Simulate (`HIWStepSimulate.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Text block (left) | GSAP slide in from left 60px | Scroll into view |
| Engine scores card (right) | GSAP slide in from right 60px | Scroll into view |
| Engine rows | GSAP slide in from right, stagger | Scroll into view |
| Score bars | GSAP scaleX from 0 with elastic bounce | Scroll into view |
| Change indicators (▲/▼) | GSAP scale from 0 with `back.out` pop | Scroll into view |

### Step 4: Report (`HIWStepReport.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Report card (left) | GSAP slide in from left 60px | Scroll into view |
| Text block (right) | GSAP slide in from right 60px | Scroll into view |
| Visibility score number | GSAP count up from 0 via textContent tween | Scroll into view |
| Leaderboard bars | GSAP scaleX from 0 with elastic ease, stagger | Scroll into view |
| Action roadmap items | GSAP fade up, stagger | Scroll into view |

### CTA (`HIWCTASection.tsx`)
| Element | Animation | Trigger |
|---------|-----------|---------|
| Label, headline, description, buttons | GSAP timeline cascade with overlapping timing | Scroll into view |

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

### GSAP Patterns

**GSAP entrance (slide up + fade in):**
```tsx
gsap.from(element, {
  y: 40, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.2,
});
```

**GSAP ScrollTrigger (one-shot):**
```tsx
gsap.from(element, {
  y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
  scrollTrigger: { trigger: element, start: "top 80%", once: true },
});
```

**GSAP stagger:**
```tsx
gsap.from(elements, {
  y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
  stagger: 0.15,
});
```

**GSAP elastic bar fill:**
```tsx
gsap.fromTo(bar, { width: "0%" }, {
  width: `${target}%`, duration: 1.2, ease: "elastic.out(1, 0.6)",
});
```

**GSAP timeline cascade:**
```tsx
const tl = gsap.timeline({ scrollTrigger: { ... } });
tl.from(el1, { ... })
  .from(el2, { ... }, "-=0.3")
  .from(el3, { ... }, "-=0.3");
```

**GSAP continuous float:**
```tsx
gsap.to(element, {
  y: 15, x: -10, duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1,
});
```

**GSAP mouse parallax:**
```tsx
gsap.to(element, {
  x: mouseX * factor, y: mouseY * factor, duration: 1.2, ease: "power2.out",
});
```

---

## Global Behaviors

### Scroll to Top (`App.tsx`)
Every route change scrolls the page to the top via the `ScrollToTop` component using `useLocation` and `window.scrollTo(0, 0)`.

### Mock Auth (`src/lib/mock-auth.ts`)
Toggle `IS_LOGGED_IN` to switch between authenticated and unauthenticated flows. When `true`, signup/signin pages redirect to `/dashboard`. When `false`, dashboard CTAs redirect to `/signup`.
