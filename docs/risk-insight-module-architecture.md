# Risk Insight Module — Architecture & Outcomes

**Owner:** Gabriel
**Surface:** `/dashboard/risk-insights`
**Last updated:** 2026-04-16
**Companion docs:** `risk-insight-module-PRD.md`, `risk-insight-module-build-spec.md`

This document describes the *as-built* architecture of the Risk Insights page in `apps/web/`, the reasoning behind the architecture, and the outcomes it must deliver for each stakeholder. It supersedes the original build-spec's sub-tabbed structure.

---

## 1. Purpose

Risk Insights is the executive-facing view of a client's AEO posture. It answers four questions, in order, on one scrolling page:

1. **How exposed are we?** — a single composite rating + a dollar figure the CRO can cite in a board meeting.
2. **What specifically is at risk?** — a dense registry of 6 risk categories with severity, likelihood, owner, and progress.
3. **What happens if we do / don't act?** — a scenario model that converts assumptions into dollars recovered.
4. **What are we doing about it, and is it working?** — a remediation board + historical trends that show progress against each risk.

The page must read like a briefing, not a dashboard. Executives scroll; they do not click to drill in. Drill-in happens **inline within the registry row**, never in a separate view.

---

## 2. Desired outcomes per persona

### CRO (primary — default lens)
- Can state *"we have X of pipeline exposed and Y of revenue at risk over the next 12 months"* after 10 seconds on the page.
- Can justify the Risk Insights investment with a scenario: *"Executing the plan recovers $Z vs do-nothing."*
- Trusts every number on the page because they tie. No reconciliation questions in the meeting.

### CMO (secondary — lens toggle)
- Sees the same page reframed in tactical terms: citation share of voice, prompts at risk, freshness decay days.
- Can identify the one or two risks where content execution is the lever, and hand them to an owner.

### Head of Content / SEO Lead (tertiary)
- Clicks a registry row and sees the full diagnosis, 2–3 evidence prompts showing the actual AI-engine response, the milestones assigned to this risk, and the citation-share trend for the risk's prompt cluster.
- Never has to leave the page to answer *"what do I need to do next?"*.

---

## 3. Architectural decisions (and why)

### 3.1 Single-scroll, not tabs
The page reads as one narrative: expose → enumerate → model → act → history → further reading. Sub-tabs fragmented the story and hid comprehensiveness behind clicks. A sticky section-anchor nav (not tabs) gives quick navigation without swapping content.

### 3.2 Inline row expand, not a side drawer
The Registry is the hero. Drill-in happens inside the row. A side drawer created a context shift, dropped evidence out of the table's visual frame, and imposed 600px of fixed width that fought the registry's horizontal density. Inline expand keeps the reader anchored.

### 3.3 One source of truth for money
Every dollar on the page derives from `scenarioInputs` and a pure `calculateScenario()` function. The summary header, the scenario bar, the "do-nothing" baseline, and individual risk severities all reconcile to the same `pipelineBase × displacementRate` anchor. See §5.

### 3.4 CMO/CRO lens is a toggle, not a page split
Same data, two framings. The lens swaps narrative copy, KPI tile definitions, and the `--color-accent-active` CSS variable (teal for CMO, iris for CRO). The lens does **not** filter risks or change scenario math.

### 3.5 React context, not a state library
State is local to this route. A single `RiskInsightsContext` holds lens, selected-risk-id (for potential future use — the v1 page uses inline expand), scenario inputs, and scenario mode. No Redux, Zustand, or TanStack Query.

### 3.6 Design tokens match brand
Cards use `rounded-2xl`, `border-[#E2E8F0]`, and the brand elevated shadow `0_1px_3px_rgba(10,37,64,0.04)`. Buttons follow brand CTA rules: navy primary, teal-on-navy secondary, never teal-on-white. All overlines use `uppercase tracking-[0.08em] font-bold text-navy text-[11px]/4`.

---

## 4. Information architecture (final)

The page is one scrolling document. Sections render in this order and get matching `id` attributes for anchor navigation:

| Order | Section | id | Purpose |
|---|---|---|---|
| 1 | Header Bar | (implicit) | Account, quarter, refresh timestamp, lens toggle, Export, Schedule review |
| 2 | Section Nav | (implicit, sticky) | Jump-to links: Summary · Risks · Scenario · Remediation · Trends · Resources |
| 3 | Executive Summary | `summary` | Composite rating chip, trend, pipeline-at-stake, narrative, 3 lens-aware KPI tiles |
| 4 | Risk Registry | `registry` | 6 risk rows with inline expand. **This is the hero.** |
| 5 | Scenario & Exposure | `scenario` | Dollar-exposure bar + editable scenario model |
| 6 | Remediation Board | `remediation` | 4-column kanban (Plan / Execute / Measure / Review) |
| 7 | Historical Trends | `trends` | Multi-engine citation-share line chart + rating heatmap |
| 8 | Resources | `resources` | 3 thought-leadership cards |

Gap between sections: **56px (`gap-14`)**.

### 4.1 Sticky section nav

- Implementation: [`SectionNav.tsx`](apps/web/src/components/dashboard/risk-insights/SectionNav.tsx)
- Pins to viewport top once scrolled past the header.
- IntersectionObserver with `rootMargin: -120px 0px -60% 0px` picks the section closest to the viewport top as "active."
- Click scrolls smoothly to the section with `scroll-mt-24` on the section matching the nav's 120px offset.
- Underline indicator animates between active chips via GSAP.
- Reduced-motion: instant jump, no animation.

---

## 5. Number reconciliation model

This is the single hardest thing to get right. One formula, one set of inputs, derived outputs everywhere.

### 5.1 Canonical inputs (mock source: [`mock-risk-insights.ts`](apps/web/src/data/mock-risk-insights.ts))

```ts
scenarioInputs = {
  pipelineBaseUsd:   15_000_000, // annual pipeline
  displacementRate:        0.18, // share of pipeline exposed to AI displacement
  ctrAssumption:          0.022, // sensitivity input (reserved)
  avgDealSizeUsd:        42_000, // translates counts to dollars (reserved)
}
```

### 5.2 Derived outputs (from [`scenarioCalc.ts`](apps/web/src/components/dashboard/risk-insights/scenarioCalc.ts))

```ts
aiExposedUsd         = pipelineBaseUsd × displacementRate            = $2,700,000
aiLostUsd(mode)      = aiExposedUsd × lossFactor[mode]
                       // do_nothing: 0.32 → $864,000
                       // execute:    0.12 → $324,000
                       // accelerate: 0.04 → $108,000
revenueRecoveredUsd  = aiLostUsd(do_nothing) - aiLostUsd(mode)
                       // execute:    $540,000
                       // accelerate: $756,000
pipelineRestoredUsd  = aiExposedUsd × restorationFactor[mode]
                       // execute:    0.40 → $1,080,000
                       // accelerate: 0.70 → $1,890,000
```

`pipelineRestoredUsd` is intentionally **larger** than `revenueRecoveredUsd`. Pipeline restored represents the forward-looking shift of exposed pipeline back to "safe"; revenue recovered is the single-quarter loss avoided. Mixing those up was the bug flagged in the previous pass.

### 5.3 Canonical references — where each number appears

| Value | Summary header | Scenario bar | Scenario tiles | Registry | Source |
|---|---|---|---|---|---|
| `pipelineExposedUsd` `$2.7M` | "Pipeline Exposed" CRO tile, "Pipeline at stake" eyebrow | Exposed anchor label | — | Sum of 6 risk severities | `pipelineBaseUsd × displacementRate` |
| `revenueAtRisk12moUsd` `$864k` | "Revenue at Risk (12mo)" CRO tile | "AI-lost under do-nothing" segment | — | — | `aiExposedUsd × 0.32` |
| `aiLostUsd(mode)` | — | — | — | — | computed live |
| `revenueRecoveredUsd` | — | — | "Revenue recovered" output | — | baseline − scenario |
| `pipelineRestoredUsd` | — | — | "Pipeline restored" output | — | `aiExposedUsd × restoration` |
| individual `severityUsd` | — | — | — | Row 4 cell | hand-authored, sum `= $2.7M` |

Sum of the 6 risk severities in the mock (**820k + 540k + 420k + 410k + 310k + 200k = $2.7M**) is exactly equal to `pipelineExposedUsd`. This is a hard invariant. If a risk is added, another must decrease by the same amount, or the composite shifts.

### 5.4 Reconciliation invariants (acceptance criteria)

- Header "Pipeline Exposed" = Scenario bar exposed segment label = Sum(risks[*].severityUsd).
- Header "Revenue at Risk (12mo)" = Scenario bar "AI-lost under do-nothing" segment.
- Scenario "Pipeline restored" > Scenario "Revenue recovered" for both `execute` and `accelerate`.
- Dollar Exposure bar segments sum to exactly `pipelineBaseUsd`, and each width percentage equals `value / pipelineBaseUsd × 100` with no visual over-draw.

---

## 6. Section inventory

### 6.1 Header Bar — [`HeaderBar.tsx`](apps/web/src/components/dashboard/risk-insights/HeaderBar.tsx)

**Purpose:** Identify the account, show data freshness, expose the two universal controls (lens, export) and the single primary CTA.

**Content:**
- Eyebrow: `{quarter} · Risk Registry` in teal caption style
- H1: `Risk Insights · {account.name}`
- Metadata row: relative refresh time + monitoring-active pulse dot
- Right cluster: `<LensToggle />`, Export (outline button), Schedule review (primary navy button with `›`)

**Interactions:**
- Lens toggle: updates `RiskInsightsContext.lens`, triggers KPI tile swap + narrative rewrite + accent color change
- Export: logs `ACTION: export_risk_insights`
- Schedule review: logs `ACTION: open_executive_briefing`

### 6.2 Executive Summary — [`ExecutiveSummary.tsx`](apps/web/src/components/dashboard/risk-insights/ExecutiveSummary.tsx)

**Purpose:** One-glance posture. Composite state + trajectory + the two or three numbers the CRO cares about.

**Content (section id `summary`):**
- Composite `<RatingChip size="lg">` with semantic label ("High/Moderate/Low Exposure")
- `<TrendArrow invert>` + verb ("Worsening / Flat / Improving")
- "Pipeline at stake" eyebrow + currency value (ties to §5.3)
- Narrative paragraph from [`narrativeTemplate.ts`](apps/web/src/components/dashboard/risk-insights/narrativeTemplate.ts)
- Three lens-aware `<KPITile>` cards in a flex-wrap row with 260px min-width each

**Lens swap details:**
- CRO tiles: Pipeline Exposed ($2.7M), Revenue at Risk 12mo ($864k), Top-Query Coverage (42%)
- CMO tiles: Citation Share of Voice (27%), Prompts at Risk (18), Freshness Decay (142 days)
- On change: fade tiles out 0.2s → swap → fade back in, `useCountUp` re-runs on value transition

### 6.3 Risk Registry — [`RiskRegistryTable.tsx`](apps/web/src/components/dashboard/risk-insights/RiskRegistryTable.tsx)

**Purpose:** The hero. Enumerates every risk the account faces and houses the full drill-in.

**Shell (section id `registry`):**
- Title + subtitle ("N of N risks. Click any row to expand...")
- Filter chips (All / Red / Amber / Green) — **only rendered when `risks.length >= 6`**
- Sortable headers: Rating, Severity, Likelihood, Next review
- Table rows with 7 data cells + chevron disclosure column

**Rows (collapsed):**
- Rating chip (sm)
- Category + meta line ("N prompts · N milestones · N% progress")
- Trend arrow (invert: up = bad)
- Severity (bold, tracking-tight)
- Likelihood bar (color matches rating) + % value
- Owner name + role
- Next review date
- Chevron, rotates 180° on expand

**Rows (expanded):**
Inline panel in an `F8FAFC` tinted band below the row, `px-7 py-7`. Contents in this order:
1. **Diagnosis** — 2-paragraph markdown narrative, left column (60%)
2. **Citation-share sparkline** — right column (40%), Recharts `LineChart` 180px tall, line colored by rating, data = quarters of `metricsTimeseries` filtered by `risk.cluster`
3. **Evidence from AI engines** — 3 `<EvidencePromptCard>` in a responsive grid. Each card: the prompt in quotes, engine pill, "Your rank: N / Not cited", "Top: {competitor}", and the actual snippet italicized
4. **Milestones (N)** — list of `<MilestoneRow>` with title, owner, due date, and a status `<select>` (Plan / Execute / Measure / Review)

**Interactions:**
- Row click or Enter/Space: toggles expanded state; only one row expanded at a time
- Only one row open (`expandedId` state holds a single id); clicking another row closes the previous
- Milestone status change: logs `ACTION: update_milestone_status` (drawer is no longer source-of-truth for milestone status — the Remediation kanban holds that)
- Sort/filter: local state, re-renders visible list
- GSAP: row stagger fade on mount; expanded panel fades down 4px on open

### 6.4 Scenario & Exposure — [`ScenarioExposure.tsx`](apps/web/src/components/dashboard/risk-insights/ScenarioExposure.tsx)

**Purpose:** Translate exposure into an executable plan the CRO can pressure-test.

**Layout (section id `scenario`):** Two cards side-by-side on `lg:` breakpoint, stacked below.

#### Card A — Dollar Exposure
- Title + methodology tooltip explaining `aiExposed = pipelineBase × displacementRate`
- Meta: `Pipeline base $15.0M · Exposed $2.7M`
- Three-segment horizontal bar:
  - Unexposed pipeline ($12.3M, grey)
  - AI-exposed at risk, not lost ($1.84M, warning)
  - AI-lost under do-nothing ($864k, danger)
- Segment widths are exact percentages of `pipelineBaseUsd`
- Legend with color dot + label + value + % for each segment
- GSAP: segments scale-x from 0 → 1 with 0.1s stagger on mount

#### Card B — Scenario Model
- Title + methodology tooltip explaining recovered vs restored
- Three-option segmented toggle: Do nothing / Execute plan / Accelerate
  - Active state uses `var(--color-accent-active)` with **navy text** (brand CTA rule)
- Three editable number inputs: CTR (%), Displacement (%), Avg deal size ($)
  - Each input label has a `<MethodologyTooltip>`
- Two output tiles: Revenue recovered (accent-tinted) + Pipeline restored
  - `useCountUp` on value change
  - Under `do_nothing`, both outputs are 0
  - Under `execute`, Pipeline restored > Revenue recovered by design

### 6.5 Remediation Board — [`RemediationKanban.tsx`](apps/web/src/components/dashboard/risk-insights/RemediationKanban.tsx)

**Purpose:** Single pane of all milestones across all risks, grouped by execution phase.

**Shell (section id `remediation`):**
- Title + subtitle
- 4-column grid on `lg:`; 2-col on `md:`; 1-col on mobile

**Columns:**
1. Plan — scoped, not yet started
2. Execute — in-flight work
3. Measure — shipping, watching impact
4. Review — wrap-up and learnings

**Cards:**
- Rating-colored category tag (softer brand pill palette)
- Milestone title
- Owner avatar (initials, accent-colored)
- Due date
- Status `<select>` (moves card to target column)

**Interactions:**
- Status dropdown change: local state update + `gsap.fromTo(newCard, { y: 8, opacity: 0 }, { y: 0, opacity: 1 })` settle animation
- Empty columns: dashed placeholder "No items in {status}"
- No drag-drop in v1 (deferred)

**Source:** `risks.flatMap(r => r.milestones)` — 12 milestones in the current mock, with each risk's rating denormalized onto the milestone for pill coloring.

### 6.6 Historical Trends — [`HistoricalTrends.tsx`](apps/web/src/components/dashboard/risk-insights/HistoricalTrends.tsx)

**Purpose:** Show whether we've been worse before, and when the interventions landed.

**Layout (section id `trends`):** Two stacked cards.

#### Top card — Multi-engine line chart
- Recharts `LineChart`, 320px tall
- One `<Line>` per engine (ChatGPT / Perplexity / Claude / Gemini), colored per engine brand
- Legend chips above the chart toggle individual lines on/off
- `<ReferenceDot>` markers for annotations (pillar ship dates, competitor launches)
- Annotations legend below the chart lists each annotation with its quarter

#### Bottom card — Rating heatmap
- CSS grid, rows = 6 risks, columns = 8 quarters
- Each cell = that risk's rating that quarter (R/A/G) with brand data-viz hex
- 32px tall cells with rounded-lg corners
- Quarter labels at the bottom with tracking-[0.08em] overline style

### 6.7 Resources — [`ResourcesStrip.tsx`](apps/web/src/components/dashboard/risk-insights/ResourcesStrip.tsx)

**Purpose:** Close the page with thought-leadership that maps to the risks above.

**Content (section id `resources`):** 3-column grid (1-col on mobile). Each card:
- H3 title (brand H3 bold, text-base/5)
- Body summary (brand body, line-height 1.6, `#475569`)
- Teal text CTA link with arrow icon
- Uses brand *elevated* shadow (`0_4px_24px_rgba(10,37,64,0.06)`)
- 220px min-height for visual rhythm

---

## 7. State architecture

### 7.1 Context — [`LensContext.tsx`](apps/web/src/components/dashboard/risk-insights/LensContext.tsx)

A single provider wraps the whole page. Value shape (declared in [`riskInsightsContext.ts`](apps/web/src/components/dashboard/risk-insights/riskInsightsContext.ts)):

```ts
interface RiskInsightsState {
  lens: "cmo" | "cro";
  setLens: (l: Lens) => void;
  selectedRiskId: string | null;     // reserved; v1 uses local expandedId
  setSelectedRiskId: (id: string | null) => void;
  scenarioInputs: ScenarioInputs;
  setScenarioInputs: (i: ScenarioInputs) => void;
  scenarioMode: ScenarioMode;
  setScenarioMode: (m: ScenarioMode) => void;
  risks: Risk[];
  account: RiskAccount;
  composite: CompositeSummary;
}
```

The provider root `<div>` also writes `style={{ "--color-accent-active": lens === "cmo" ? var(--color-teal) : var(--color-iris) }}` so the accent cascades to every child.

Consumers import the hook from [`useRiskInsights.ts`](apps/web/src/components/dashboard/risk-insights/useRiskInsights.ts) (split out from the context file for Fast Refresh compatibility).

### 7.2 Local state that does not live in context

| Component | State | Reason |
|---|---|---|
| `RiskRegistryTable` | `expandedId`, `sortKey`, `filter` | Only this section cares |
| `RemediationKanban` | `items[]` (mutable milestones) | Kanban drag-replacement — status changes are local to this section |
| `SectionNav` | `active` anchor | Derived from IntersectionObserver |
| `LensToggle` | animated knob `x` + bg | Derived from lens, not state |

Lifting any of these to context would create cross-section coupling without benefit.

---

## 8. Data contract

Everything on the page is driven by a single mock file today and will be driven by a single API envelope later. The envelope shape is the exported types from [`mock-risk-insights.ts`](apps/web/src/data/mock-risk-insights.ts):

```ts
{
  account:           RiskAccount
  composite:         CompositeSummary
  risks:             Risk[]          // length = 6 today
  metricsTimeseries: MetricPoint[]   // 192 points (8 qs × 4 engines × 6 clusters)
  annotations:       Annotation[]
  ratingHistory:     RatingHistoryRow[]
  scenarioInputs:    ScenarioInputs
  resourceCards:     ResourceCard[]
  cmoTiles:          TileSpec[]      // 3
  croTiles:          TileSpec[]      // 3
}
```

Two tile spec arrays (`cmoTiles`, `croTiles`) let the mock control which columns of `composite` surface per lens without the component hard-coding either list.

`Risk.cluster` is new in this iteration: it names the prompt cluster whose citation-share trend the registry expand panel plots. One string per risk, matching a `cluster` value in `metricsTimeseries`.

---

## 9. File inventory

All paths under `apps/web/src/`.

### Feature files (`components/dashboard/risk-insights/`)

| File | Role |
|---|---|
| `LensContext.tsx` | Context provider, writes `--color-accent-active` |
| `riskInsightsContext.ts` | Context definition + state type |
| `useRiskInsights.ts` | Hook accessor |
| `scenarioCalc.ts` | Pure `calculateScenario()` function |
| `narrativeTemplate.ts` | Pure `buildNarrative()` function |
| `HeaderBar.tsx` | Title, eyebrow, lens toggle, CTAs |
| `LensToggle.tsx` | Segmented CMO/CRO toggle with animated knob |
| `KPITile.tsx` | Lens-aware stat card with count-up |
| `SectionNav.tsx` | Sticky anchor nav with IntersectionObserver |
| `ExecutiveSummary.tsx` | Composite + 3 KPI tiles + narrative |
| `RiskRegistryTable.tsx` | Hero table with inline row expand, evidence cards, milestones, mini sparkline |
| `ScenarioExposure.tsx` | Dollar exposure bar + editable scenario model |
| `RemediationKanban.tsx` | 4-column board, status dropdowns |
| `HistoricalTrends.tsx` | Multi-engine line chart + rating heatmap |
| `ResourcesStrip.tsx` | 3 resource cards |

### Shared primitives (`components/ui/`)

| File | Role |
|---|---|
| `RatingChip.tsx` | Green/Amber/Red pill, brand softer tones |
| `TrendArrow.tsx` | Up/flat/down caret with optional invert semantics |
| `MethodologyTooltip.tsx` | Info-icon tooltip for methodology notes |
| `Drawer.tsx` | Generic right-side drawer (kept for other uses; not mounted in Risk Insights) |
| `ratingColor.ts` | `ratingColor(rating)` helper for data-viz hex |

### Data / mock

| File | Role |
|---|---|
| `data/mock-risk-insights.ts` | Types + mock values for the whole page |

### Route + nav

| File | Change |
|---|---|
| `App.tsx` | Adds `/dashboard/risk-insights` → `RiskInsights` |
| `data/mock-dashboard.ts` | Sets the existing `risk-insights` tab's `href` |
| `pages/dashboard/RiskInsights.tsx` | Page component |
| `index.css` | Adds `--color-accent-active: #4ECDC4` default |

---

## 10. Interaction spec (complete)

| Element | Interaction | Outcome |
|---|---|---|
| Lens toggle (CMO/CRO) | Click | Updates context, swaps KPI tile contents + narrative, animates accent var, changes active button bg (teal↔iris) |
| Header Export | Click | `console.log("ACTION: export_risk_insights")` |
| Header Schedule review | Click | `console.log("ACTION: open_executive_briefing")` |
| Section nav chip | Click | Smooth-scrolls to section, accounting for 120px sticky offset |
| Section nav (scroll) | Page scroll | Active chip tracks whichever section is in viewport |
| Registry header cell | Click | Sorts by that column (rating default) |
| Registry filter chip | Click | Filters rows; only rendered at ≥6 risks |
| Registry row | Click / Enter / Space | Expands row inline; collapses any other open row |
| Row chevron | (not directly clickable; whole row is the trigger) | Rotates 180° visual indicator |
| Expanded panel — milestone status dropdown | Change | Logs action; does not mutate kanban state (that's independent) |
| Scenario mode toggle | Click | Updates `scenarioMode`, recomputes outputs, count-up to new values |
| Scenario input | Change | Updates `scenarioInputs`, recomputes outputs, recomputes exposure bar |
| Methodology tooltip `(i)` | Hover / focus | Shows tooltip |
| Kanban status select | Change | Moves card to target column, GSAP settle animation |
| Trend legend chip | Click | Toggles that engine's line on/off |
| Resource card CTA | Click | `console.log("ACTION: open_resource", { id })` |

---

## 11. Motion spec

All animations are wrapped in a `prefers-reduced-motion: reduce` guard that either skips the animation or sets the final state instantly.

| Event | Target | Motion | Duration | Ease |
|---|---|---|---|---|
| Page load | Header | Fade-up 16px | 0.5s | power3.out |
| Section reveal | (via GSAP entrance in each section on mount) | Fade-up 6–20px | 0.3–0.5s | power2–3.out |
| Lens change | KPI tiles | Fade + 4–6px slide | 0.28s | power3.inOut |
| Lens change | Accent variable | CSS transition via `LensToggle` GSAP tween | 0.28s | linear |
| Registry row click | Row surface | hover/focus bg | 150ms | ease |
| Registry row expand | Panel | Fade + 4px slide-down | 0.28s | power3.out |
| Chevron | SVG | Rotate 180° | 240ms | ease |
| Exposure bar | Segments | ScaleX 0→1, left-origin | 0.6s each, 0.1s stagger | power3.out |
| Scenario outputs | Value | `useCountUp` tween | 1.2s | ease-out cubic |
| Kanban card status change | Card | Fade + y-offset settle | 0.25s | back.out(1.4) |
| Section nav underline | Bar position/width | Tween to active chip bounds | 0.3s | power3.inOut |
| Section nav scroll | Page | `scrollTo` smooth behavior | browser default | — |
| Methodology tooltip | Body | Instant show/hide | — | — |
| Drawer primitive (unused on page) | Slide x:100%→0 | 0.3s | power3.out | — |

---

## 12. Accessibility

- **Keyboard traversal:** All interactive elements reachable via Tab. Row opens on Enter/Space (role="button"). Filter chips, sort headers, KPI tooltips, nav chips, status selects all native-focusable.
- **ARIA:**
  - Rating chips carry `aria-label="Rating: {Green|Amber|Red}"`.
  - Trend arrows carry `role="img"` with descriptive label.
  - Tooltips expose `aria-describedby` linking the trigger to the tooltip id when open.
  - Nav chips carry `aria-current="true"` when active.
  - Row disclosure uses `aria-expanded` on the row.
- **Focus outline:** Row uses `focus:bg-[#F8FAFC]` as the visible focus indicator.
- **Reduced motion:** Detected once per component at effect time. Non-essential animations become instant state changes; row expand still appears, just without the fade.
- **Color contrast:** Primary text uses navy (#0A2540) on white (AAA). Muted text uses #64748B on white (AA large). Rating pills use brand softer palette with text meeting WCAG AA.
- **Tooltip accessibility:** Hover + focus both open tooltips so keyboard users can reach methodology notes.

---

## 13. Responsive behavior

| Breakpoint | Behavior |
|---|---|
| `sm` (≤640px) | Header buttons wrap; section nav scrolls horizontally; registry header and rows become horizontally scrollable (minimum width preserved); expand panel stacks diagnosis + sparkline; evidence prompts collapse to 1 col; kanban stacks to 1 column; scenario cards stack; resource cards stack |
| `md` (640–1024px) | Kanban → 2 columns; evidence prompts → 2 columns; resources → 3 columns; scenario → 1 column |
| `lg` (≥1024px) | Full canonical layout: kanban 4 cols, evidence prompts 3 cols, resources 3 cols, scenario 2 cols, expand panel side-by-side diagnosis + sparkline |

Section nav is always sticky. Tables never truncate data — they scroll.

---

## 14. Demo states

Top-of-file constant in `pages/dashboard/RiskInsights.tsx`:

```ts
const DEMO_STATE: "loading" | "success" | "empty" | "error" = "success";
```

| State | Renders |
|---|---|
| loading | DashboardShell + centered spinner + "Loading risk insights..." |
| empty | Navy heading "Monitoring not yet active" + explanatory copy + teal "Start monitoring" CTA |
| error | Navy heading "Couldn't load risk data" + "Retry" CTA |
| success | Full page |

**Sub-states inside `success`** (render automatically based on data):
- Registry with 0 rows → "All clear. No risks match the current filter."
- Kanban column with 0 cards → dashed "No items in {status}" placeholder
- Trends with <2 quarters → "Waiting for 2+ quarters of data"

---

## 15. Acceptance criteria

A build of Risk Insights is **ready to ship** when all of the following are true:

### Numbers reconcile
- [ ] Header "Pipeline Exposed" == Scenario bar "Exposed" annotation == Sum of `risks[*].severityUsd`.
- [ ] Header "Revenue at Risk (12mo)" == Scenario bar "AI-lost under do-nothing" value.
- [ ] Under Scenario "Execute" and "Accelerate", Pipeline restored > Revenue recovered.
- [ ] Dollar exposure bar segment widths match their percentages within ±0.5%.

### Content rules
- [ ] No em dashes anywhere in mock data, narrative template, or UI strings.
- [ ] All 6 risk categories render with at least 1 evidence prompt and at least 1 milestone.
- [ ] Narrative copy reads differently for CMO vs CRO lens.

### Interaction
- [ ] Clicking a registry row expands it inline; only one row open at a time.
- [ ] Keyboard Enter/Space on a focused row expands it identically.
- [ ] Sticky section nav highlights the correct section as you scroll past it.
- [ ] Anchor click scrolls smoothly, and the section lands below the sticky nav (not behind it).
- [ ] Lens toggle changes: accent color, KPI tile set, narrative copy — all with no layout flash.
- [ ] Scenario inputs edit live; outputs count-up to new values within 1.2s.

### Brand
- [ ] Cards use `rounded-2xl`, `border-[#E2E8F0]`, elevated shadow tokens.
- [ ] Overlines use `uppercase tracking-[0.08em] font-bold text-navy text-[11px]/4`.
- [ ] Teal CTAs use navy text; navy CTAs use white text. No `bg-teal text-white` anywhere.
- [ ] Rating pills use softer brand palette (#166534/#92400E/#9F1239), not the stronger data-viz tones.

### Accessibility
- [ ] Tab traversal reaches every interactive element.
- [ ] `prefers-reduced-motion: reduce` disables non-essential animation.
- [ ] Screen-reader announces rating and trend on every risk row.

### State coverage
- [ ] All four DEMO_STATE branches render without error.

### Build hygiene
- [ ] `npx tsc -b` succeeds with zero new errors in `risk-insights/` or `mock-risk-insights.ts`.
- [ ] `npx eslint` on the risk-insights file set passes with zero errors.
- [ ] `npx vite build` succeeds.

---

## 16. Deferred / future

Not in v1, but designed to drop in without refactor:

- **Real evidence screenshots.** Today each `EvidencePrompt` carries a text snippet. A future field `screenshotUrl` can render as an image above the snippet.
- **Drag-drop kanban.** Status dropdown stays as fallback. Use `@dnd-kit` when introduced — the kanban already holds milestones in local state so the drop target handler plugs in cleanly.
- **Multi-risk drawer.** The `Drawer` primitive in `components/ui/` is kept for future cross-section use cases (e.g., a "show all overdue milestones" drawer triggered from the header).
- **URL state.** `expandedId`, `lens`, and `activeAnchor` could sync to the URL for shareable links. Context already holds `selectedRiskId` as a hook point.
- **Export format.** Export button currently logs an action. Future: POST to an API that returns a signed PDF.
- **Competitor overlay on the line chart.** Today each engine is one line; future could overlay the top competitor's line per cluster.
- **Custom prompt clusters.** Registry's `risk.cluster` is a string today. Future: `cluster` becomes a first-class entity with its own prompts + metrics.

---

## 17. Open questions

- **Sticky nav on mobile.** Small viewports show the nav horizontally scrolling. Consider collapsing to a select dropdown or hiding entirely below `sm`.
- **Row expand with filter change.** If a user expands a row then filters it out, we silently close. Should we preserve the expanded id and re-open if the filter changes back? v1 closes silently; may revisit.
- **Scenario inputs validation.** Inputs accept any number. Bounds (e.g., 0–10% CTR) are visual hints only. Do we enforce or just clamp?
- **Trend annotation density.** 3 annotations is comfortable. At 8+ the chart would get noisy. Decide cap + overflow UX.

---

## 18. Interlinking contract (hub-and-spoke)

Risk Insights is the **executive hub**. Every risk is owned at the analyst-depth layer by a sibling module: **Competitors**, **Content Optimisation**, or **Scans**. A risk row is load-bearing only if the CRO can get from glance → analyst view in one click. Navigating manually from the top nav is a seam the user will feel.

### 18.1 Per-risk deep-link mapping (as of v4)

| Risk | Module | Route (integration dev wires filter state) |
|---|---|---|
| Competitor Citation Dominance | Competitors | `/dashboard/competitors?risk=risk-competitor-dominance&cluster=enterprise%20AEO%20vendors` |
| Brand Displacement (Share drop) | Competitors | `/dashboard/competitors?risk=risk-brand-displacement-share-drop&cluster=brand%20and%20product%20questions` |
| Brand Displacement (Narrative) | Competitors | `/dashboard/competitors?risk=risk-brand-displacement-narrative&variant=narrative` |
| Brand-Safety Misrecommendation | Competitors | `/dashboard/competitors?risk=risk-brand-safety-misrec&view=adjacent-recommendations` |
| Factual Misrepresentation | Content Optimisation | `/dashboard/content-optimisation?risk=risk-factual-misrepresentation` |
| Content Freshness Decay | Content Optimisation | `/dashboard/content-optimisation?risk=risk-freshness-decay&sortBy=age` |
| Category Erosion | Content Optimisation | `/dashboard/content-optimisation?risk=risk-category-erosion&cluster=AEO%20for%20vertical%20SaaS` |
| Hallucination Frequency | Content Optimisation | `/dashboard/content-optimisation?risk=risk-hallucination` |
| Regulatory Context Misstatement | Content Optimisation | `/dashboard/content-optimisation?risk=risk-regulatory-misstatement` |
| Authority Signal Decay | Scans | `/dashboard/scans?risk=risk-authority-decay` |

Each risk carries its target as a `DeepLinkTarget { module, label, route, reason }` on `Risk` in [`mock-risk-insights.ts`](apps/web/src/data/mock-risk-insights.ts). The shape is stable across modules so the integration developer wires filter state in each target module without changing Risk Insights.

### 18.2 Surfaces

Two UI affordances per risk:

1. **Row meta pill** — `↗ {Module}` in the row meta line (next to "N prompts · M milestones · P% progress"). Click = navigate, stopPropagation so the row doesn't also expand. One-click path for scanning executives.
2. **Overview-tab CTA** — a prominent navy "Open this risk in {Module} →" button at the top of the expand panel's Overview tab, paired with an overline ("Owned by {Module}") + a short `reason` line from the `DeepLinkTarget`. The CTA answers "who owns remediation for this" before the reader scrolls into diagnosis + evidence.

Both surfaces share the same implementation: [`DeepLinkButton`](apps/web/src/components/dashboard/risk-insights/DeepLinkButton.tsx) with a `variant: "pill" | "cta"` prop.

### 18.3 Module-side contract (integration dev owns)

When the target module receives one of these query params, it should:

- Filter to the named risk (`risk=<id>`).
- Pre-apply any additional scoping implied by the query (`cluster=…`, `variant=…`, `sortBy=…`, `view=…`).
- Render a breadcrumb back to `/dashboard/risk-insights#registry` so the CRO can return to the hub.

Each module's own mock data should include a matching entry for each `riskId` it serves. When a module does not yet exist (e.g. Competitors today), the deep-link still fires `console.log("ACTION: deep_link_risk", {...})` plus `navigate(route)`; a 404 in that scenario is a known design-only gap that resolves when the module ships.

### 18.4 Why it matters

Without the contract, Risk Insights is ornamental. The CRO sees "Competitor Citation Dominance · RED · $820k · Worsening", reads the diagnosis, and… has to navigate manually from the top nav and re-find context. With the contract, the two modules feel like one product. The hub routes attention; the spoke delivers depth.

---

## 19. Financial Intake

The Financial Intake is a second route inside Risk Insights at `/dashboard/risk-insights/intake`. **Two tier-based questions, plus one scan-derived tier the user doesn't answer**, no exact-dollar inputs, no free text. The page keeps a CFO-defensible story ("$2.7M is your pipeline tier × our model, both transparent") without creating a compliance surface around financial data.

### 19.1 Compliance posture

This intake does not store exact pipeline dollars, exact deal sizes, free-text prompt clusters, or free-text methodology notes. Tier selection gives directionally correct numbers — adequate for the executive story — while keeping storage within a light compliance posture appropriate to the product's maturity. Loss and restoration factors stay pinned to industry defaults (Gartner / McKinsey citations in the methodology sheets); customer overrides of those factors are not supported yet. Integration developer can reintroduce any of these with an explicit consent workflow once the compliance program is ready.

### 19.2 Why it exists

A sophisticated CRO will ask "how did you compute $2.7M?" and the answer must be:

> "$2.7M is your pipeline tier midpoint ($22.5M for the $10M–$50M tier) multiplied by our displacement model. The displacement model is moderate organic share (40%) times established AI exposure (30%) = 12% of pipeline. That product sits inside Gartner's projected 15–25% displacement range for 2026. Change any of the three tiers and the number recomputes live."

Every dollar on Risk Insights routes back to these three tier selections.

### 19.3 Data model

In [`mock-risk-insights.ts`](apps/web/src/data/mock-risk-insights.ts):

```ts
type PipelineTier      = "100k_to_250k" | "250k_to_500k" | "500k_to_750k" | "750k_to_1m"
                       | "1_to_10m" | "10_to_50m" | "50_to_250m" | "over_250m";
type OrganicShareTier  = "low" | "moderate" | "high";
type AIExposureTier    = "emerging" | "established" | "dominant";

FinancialIntakeInputs {
  pipelineTier: PipelineTier;
  organicShare: OrganicShareTier;
  // aiExposure is NOT captured here. It's scan-derived; see §19.7.
}

ScanSignals {
  aiExposurePct:     number;   // 0-100, measured from scan
  aiExposureTier:    AIExposureTier;   // bucketed from aiExposurePct
  aeoCompositeScore: number;   // 0-100, running AEO score
  lastScanDate:      string;
  scanId:            string;
}

FinancialIntake {
  status: "incomplete" | "draft" | "complete";
  inputs: FinancialIntakeInputs;
  sourceBenchmarks: { lossFactor, restorationFactor, displacementRate };  // reference only
  completedAt:  string | null;
  completedBy:  string | null;
  lastEditedAt: string | null;
}
```

Module-level constants (not captured from the client):

```ts
PIPELINE_MIDPOINTS           = { under_1m: 500k, "1_to_10m": 5M, "10_to_50m": 22.5M, "50_to_250m": 125M, over_250m: 500M }
ORGANIC_SHARE_VALUES         = { low: 0.15, moderate: 0.40, high: 0.70 }
AI_EXPOSURE_VALUES           = { emerging: 0.10, established: 0.30, dominant: 0.60 }
DEFAULT_LOSS_FACTOR_BY_MODE        = { do_nothing: 0.32, execute: 0.12, accelerate: 0.04 }  // Gartner 2025
DEFAULT_RESTORATION_FACTOR_BY_MODE = { do_nothing: 0,    execute: 0.40, accelerate: 0.70 }  // McKinsey 2025
```

Pure compute helpers (aiExposure defaults to the scan-derived tier):

```ts
computeDisplacementRate(i, aiExposure = scanSignals.aiExposureTier)
  = ORGANIC_SHARE_VALUES[i.organicShare] × AI_EXPOSURE_VALUES[aiExposure]

computePipelineExposed(i, aiExposure?)
  = PIPELINE_MIDPOINTS[i.pipelineTier] × computeDisplacementRate(i, aiExposure)

computeRevenueAtRisk12mo(i, aiExposure?)
  = computePipelineExposed(i, aiExposure) × DEFAULT_LOSS_FACTOR_BY_MODE.do_nothing
```

`CompositeSummary.pipelineExposedUsd` and `revenueAtRisk12moUsd` are computed from `intake.inputs` inside `RiskInsightsProvider` via `useMemo`, so saving the intake updates the Summary in-place without a page reload.

Default state: intake inputs `{ pipelineTier: "10_to_50m", organicShare: "moderate" }` + scan signals `aiExposureTier: "established"` → **$2.7M pipeline exposed, $864k revenue at risk**. The canonical invariant "sum of pipeline-exposure risk severities = $2.7M" still holds.

### 19.4 Form layout

Single-scroll page, two radio-button sections + a scan-derived read-only section + a Review section. Left column per section has the "why this question" framing; right column has the radio options (or read-only tile for the scan-derived band).

| Section | Question | Source |
|---|---|---|
| **1. Pipeline magnitude** | Which bracket best describes your annual marketing-sourced pipeline? | User `<select>` dropdown — 9 tiers, grouped: "Under $1M" ($100K–$250K / $250K–$500K / $500K–$750K / $750K–$1M) + "$1M and above" ($1M–$5M / $5M–$10M / $10M–$50M / $50M–$250M / Over $250M) |
| **2. Organic share of pipeline** | How much comes from organic, SEO, referral, or direct? | User radio: Low (<25%) / Moderate (25–60%) / High (>60%) |
| **AI query exposure** | Share of tracked queries surfacing AI answers today. | **Read-only, from scan.** Shows current tier, raw %, last scan date + ID, AEO composite score, `Run new scan` button. |
| **Review** | — | Computed Pipeline Exposed + Revenue at Risk tiles; "Not stored" reminder list |

Sticky bottom bar: `[Cancel] [Save and return →]`. Save-draft button removed; the intake is either incomplete or complete. `Save and return` flips status to `complete`, writes `completedAt` + `completedBy`, navigates back.

### 19.5 Cross-route state

Provider is per-route (two instances across Risk Insights + Intake). A module-level singleton (`let moduleIntake` in [`LensContext.tsx`](apps/web/src/components/dashboard/risk-insights/LensContext.tsx)) holds the current intake so both routes hydrate from the same value. Integration dev replaces the singleton with an API call + persisted store.

### 19.6 Surfaces on Risk Insights

Three affordances alert the exec that the intake exists and whether it's grounded:

- **[`IntakeBanner`](apps/web/src/components/dashboard/risk-insights/IntakeBanner.tsx)** at the top of the Summary section. Renders only when `intake.status !== "complete"`. Teal-background for incomplete ("Confirm your pipeline tier. Three questions, no exact dollars."), amber for draft. Primary CTA: `Complete intake →` or `Resume intake →`.
- **Intake status pill** in the HeaderBar meta row. Red dot "Intake incomplete" / amber "Intake draft" / green "Intake complete".
- **`Financial intake` button** in the HeaderBar action cluster. Always visible so a complete intake can still be edited.

### 19.7 Scan-derived inputs

AI query exposure is the first scan-derived input on the intake page. The contract:

1. **Source of truth is the scan.** `scanSignals.aiExposurePct` holds the raw measurement (0–100). `scanSignals.aiExposureTier` is the bucketed tier derived via `aiExposureTierForPct()`: `<20% → emerging`, `20–50% → established`, `>50% → dominant`.
2. **Intake page shows it read-only.** A dedicated "From scan" section renders current tier, raw percentage, last scan date + ID, and the AEO composite score. A `Run new scan` button logs the intended action — integration dev wires it to the real scan trigger.
3. **User cannot edit the tier directly.** To change the value the user must run a new scan. This keeps the intake's audit trail clean (no "user guessed X, then we measured Y").
4. **Compute helpers default to the scan tier.** `computeDisplacementRate(i, aiExposure = scanSignals.aiExposureTier)` takes the tier as an optional second arg so a future "what if we re-scanned" preview can override without breaking existing callers.

Future scan-derived inputs slot into `ScanSignals` the same way. Candidates: `organicShare` (once pipeline attribution can be pulled from connected CRM telemetry), `competitorPresence` (once competitor tracking feeds the module), `sentimentIndex`.

### 19.8 Methodology panels

`tileMethodologies["pipeline-exposed"].shortBlurb` reads: *"Annual pipeline at risk of AI displacement. Set via three tier selections in the Financial Intake; no exact dollars stored."* Other methodology panels may continue to reference industry defaults until the integration dev wires in-situ reads of the live intake.

### 19.9 Acceptance criteria

- [ ] Saving the intake with a different `pipelineTier` updates the Summary "Pipeline Exposed" and "Revenue at Risk (12mo)" tiles without reload.
- [ ] Selecting a different `organicShare` option recomputes the displayed displacement rate in the Review section live; the scan-derived AI exposure tier is used as the second factor.
- [ ] The banner disappears on Summary after `status === "complete"`; the header status pill turns green.
- [ ] The "From scan" section is visible, non-editable, and shows the scan tier + raw % + last scan date.
- [ ] Cancel discards draft edits and returns to Risk Insights with original numbers intact.
- [ ] Every dollar on Risk Insights traces to an intake input through at most two hops.

---

## 20. Changelog

| Date | Change |
|---|---|
| 2026-04-16 | **v8 — Granular pipeline tiers + dropdown UI.** `PipelineTier` expanded from 5 to 9 buckets. The old `under_1m` bucket is replaced by four sub-$1M tiers: `100k_to_250k` (midpoint $175K), `250k_to_500k` ($375K), `500k_to_750k` ($625K), `750k_to_1m` ($875K). The old `1_to_10m` bucket is split into `1_to_5m` (midpoint $3M) and `5_to_10m` ($7.5M); the five tiers $10M+ are unchanged. Default intake tier remains `"10_to_50m"` → canonical $2.7M exposed / $864k at risk invariant preserved. Intake page Question 1 switches from a 5-option radio-card list to a native `<select>` dropdown with two `<optgroup>` dividers — "Under $1M" (4 options) and "$1M and above" (5 options) — to keep the now-9-option list scannable. Option labels show revenue range only (`PIPELINE_TIER_LABELS`); hint text (`PIPELINE_TIER_HINTS`) removed from option text to reduce cognitive load in the dropdown. Helper text below the select ("Tier midpoint used internally; exact figure not stored.") surfaces the compliance note without cluttering each option. All other form layout unchanged: two-column 340px/1fr sections, two radio sections + read-only scan section + Review section. `PIPELINE_TIER_HINTS` export retained in `mock-risk-insights.ts` for possible future tooltip use; not imported by the intake page. Section 19.4 form-layout table updated to reflect 9-tier select. |
| 2026-04-16 | **v7 — Scan-derived AI exposure.** `aiExposure` removed from `FinancialIntakeInputs`; intake inputs drop to two fields (`pipelineTier`, `organicShare`). New `ScanSignals` type + `scanSignals` mock export carries `aiExposurePct`, `aiExposureTier`, `aeoCompositeScore`, `lastScanDate`, `scanId`. New `aiExposureTierForPct()` helper buckets raw percentages into tiers. Compute helpers (`computeDisplacementRate`, `computePipelineExposed`, `computeRevenueAtRisk12mo`) take `aiExposure` as an optional second arg defaulting to `scanSignals.aiExposureTier` — existing callers keep working without change. Intake page's Question 3 radio section replaced by a read-only "From scan" section showing current tier + raw % + last scan date + AEO composite score + `Run new scan` CTA. Intake title switches from "Three questions" to "Two questions". Banner + page copy updated accordingly. Default state unchanged: `{ pipelineTier: "10_to_50m", organicShare: "moderate" }` + scan tier `"established"` → $2.7M exposed / $864k at risk. New §19.7 "Scan-derived inputs" documents the contract. Acceptance criteria §19.9 gains a "From scan" visibility check. Internal renumber: §19.7 → 19.8 (Methodology panels), §19.8 → 19.9 (Acceptance criteria). |
| 2026-04-16 | **v6 — Compliance-lite intake.** `FinancialIntakeInputs` reworked from six exact-dollar / exact-percent / free-text fields to three ordinal tier selections: `pipelineTier` (5 buckets from "Under $1M" to "Over $250M"), `organicShare` (low / moderate / high), `aiExposure` (emerging / established / dominant). Exact fields removed: `annualPipelineUsd`, `avgDealSizeUsd`, `pipelineGrowthRate`, `organicPipelineSharePct`, `aiExposedQuerySharePct`, `confidenceCoefficient`, `topPromptClusters`. `lossFactorByMode` + `restorationFactorByMode` pulled off `inputs` and promoted to module-level constants (`DEFAULT_LOSS_FACTOR_BY_MODE`, `DEFAULT_RESTORATION_FACTOR_BY_MODE`); customer overrides no longer captured. `FinancialIntake.notes` free-text field dropped. Tier→value lookup tables (`PIPELINE_MIDPOINTS`, `ORGANIC_SHARE_VALUES`, `AI_EXPOSURE_VALUES`) plus human-readable `*_LABELS` + `*_HINTS` exports for the UI. Default `{ pipelineTier: "10_to_50m", organicShare: "moderate", aiExposure: "established" }` computes to $2.7M exposed / $864k at risk, preserving the "sum of pipeline-exposure risk severities = $2.7M" invariant. Intake page rewritten as three radio-button sections + Review; `NumberField` + `FactorTable` + notes textarea + Save-draft button all removed. `IntakeBanner` copy refreshed ("Confirm your pipeline tier. Three questions, no exact dollars."). Methodology panel `shortBlurb` for `pipeline-exposed` references tier-based derivation. New §19.1 "Compliance posture" explicitly records what is and is not stored. |
| 2026-04-16 | **v5 — Financial Intake.** New route `/dashboard/risk-insights/intake` with a single-scroll 4-section form (Pipeline baseline / Organic & AI exposure / Scenario defaults / Review). Intake becomes the CFO-audited source of truth: `pipelineExposedUsd` and `revenueAtRisk12moUsd` compute live from intake inputs via `computePipelineExposed` + `computeRevenueAtRisk12mo` pure helpers. Displacement rate = organic share × AI-exposed query share × confidence coefficient (three measured inputs, not a single unsourced multiplier). Loss / restoration factors surface as editable industry defaults with Gartner / McKinsey / Forrester citations per row. Section 2 shows the computed displacement rate live as the user types, annotated whether it sits inside Gartner's projected 15–25% range. The `ScenarioInputs` type is retired; all fields migrate into `FinancialIntakeInputs`. Module-level intake singleton in `LensContext.tsx` persists across route changes. Three surfaces on Risk Insights: dismissable `IntakeBanner` at top of Summary (only when status≠complete), intake status pill in HeaderBar meta row, `Financial intake` button in HeaderBar action cluster. Every owner on the page is `Gabe Astor · AEO Program Lead` — single-user mode for v1. |
| 2026-04-16 | **v4 — hub-and-spoke interlinking.** Scenario section (Dollar Exposure + Scenario Model) removed; the `scenario` nav item and `calculateScenario`/`scenarioCalc.ts`/`ScenarioExposure.tsx`/`BenchmarkAssumptionRow.tsx` deleted. `scenarioInputs`/`scenarioMode` state dropped from `RiskInsightsContext`. The `pipelineBaseUsd × displacementRate = $2.7M` derivation remains in the mock as an arithmetic constant (feeds the Summary header). Head-to-Head section removed; `HeadToHeadMatchup` type + all `headToHead[]` data + `HeadToHeadSection.tsx`/`HeadToHeadCard.tsx`/`HeadToHeadDetailSheet.tsx` deleted — head-to-head is the Competitors module's job. **New interlinking contract** (Section 18): every risk carries a `DeepLinkTarget { module, label, route, reason }` routing to Competitors / Content Optimisation / Scans. Two surfaces: a compact `↗ {Module}` pill in each registry row's meta line (one-click from scan), and a prominent navy "Open this risk in {Module} →" CTA at the top of the expand panel's Overview tab paired with an "Owned by {Module}" overline. Shared `DeepLinkButton` component with `variant: "pill" \| "cta"`. Nav items reduce to 7 (Summary / Risks / Remediation / Trends / Downstream / Resources + Summary header). |
| 2026-04-16 | **v3 — measurement depth.** Registry expanded to 10 risks (6 pipeline-exposure + Brand Displacement split into share_drop + narrative + 3 new CRO quality risks: Hallucination, Regulatory Misstatement, Brand-Safety Misrecommendation). Quality risks carry `severityUsd: 0`; reconciliation invariant reframed as "pipeline-exposure risks sum to $2.7M". Every metric gains a full `MethodologySpec` (denominator, prompt universe, sample size, confidence interval, detection method, sources). `MethodologyTooltip` replaced by click-to-open `MethodologyPanel` + right-docked `MethodologySheet`. Scenario loss / restoration / displacement factors read from user-editable inputs pre-filled from Gartner / McKinsey / Forrester 2025 citations; `BenchmarkAssumptionRow` lets users override each default with custom-override badge + revert. Every risk gains `engineBreakdown` (4-engine split). KPI tiles show engine chips. Registry row expand gains tabs (Overview / By engine / Sentiment / Recommendations, plus Hallucination events on the hallucination risk). Sentiment tab shows polarity bar + positioning samples; Recommendation tab surfaces off-strategy positioning leaks. New **Head to Head** section (competitor cards with per-engine win rate + snippets + detail sheet) between Risks and Scenario. New **Downstream Impact** section (LLM-sourced sessions bar by engine + assisted pipeline tile + cookieless-attribution confidence label) between Trends and Resources. 4th lens-aware KPI tile: LLM-Sourced Traffic (CMO) or Assisted Pipeline 90d (CRO). `PersonaFilter` chips in registry default from lens. Nav items grow to 8. |
| 2026-04-16 | v2 architecture: single-scroll, inline row expand, 6 risks, reconciled dollar model, brand alignment |
| 2026-04-15 | v1 (superseded): 5 sub-tabs, side drawer, 3 risks, unreconciled dollar values |
