// ─── Types ──────────────────────────────────────────────────

export type Rating = "green" | "amber" | "red";
export type Trend = "up" | "flat" | "down";
export type Lens = "cmo" | "cro";
export type MilestoneStatus = "plan" | "execute" | "measure" | "review";
export type ScenarioMode = "do_nothing" | "execute" | "accelerate";
export type AIEngine = "chatgpt" | "perplexity" | "gemini" | "claude" | "grok";
export type Persona = "cmo" | "cro" | "both";
export type SentimentPolarity = "positive" | "neutral" | "mixed" | "negative";
export type HallucinationSeverity = "cosmetic" | "moderate" | "material";
export type HallucinationStatus = "open" | "mitigated" | "resolved";
export type Alignment = "on_strategy" | "adjacent" | "off_strategy";
export type DetectionMethod =
  | "human_review"
  | "llm_judge"
  | "automated_scrape"
  | "hybrid";

// ─── Methodology primitives ─────────────────────────────────

export interface BenchmarkCitation {
  label: string;
  publisher: string;
  year: number;
  url: string;
  accessedAt?: string;
}

export interface MethodologySpec {
  denominator: string;
  promptUniverse: string;
  engines: AIEngine[];
  samplingWindow: string;
  sampleSize: number;
  confidenceInterval?: {
    level: "80" | "90" | "95";
    lowPct: number;
    highPct: number;
  };
  detectionMethod: DetectionMethod;
  sources?: BenchmarkCitation[];
  shortBlurb: string;
}

// ─── Per-engine metrics ─────────────────────────────────────

export interface EngineMetric {
  engine: AIEngine;
  value: number;
  delta: number;
  sparkline: number[];
  /** Direction where "up" is good. Controls delta arrow color. */
  goodDirection: "up" | "down";
}

// ─── Sentiment + recommendation ─────────────────────────────

export interface SentimentSample {
  id: string;
  engine: AIEngine;
  prompt: string;
  polarity: SentimentPolarity;
  positioningPhrase: string;
  snippet: string;
  detectedAt: string;
}

export interface RecommendationContext {
  id: string;
  useCase: string;
  sharePct: number;
  alignment: Alignment;
  exampleEngine: AIEngine;
  exampleSnippet: string;
}

// ─── Contextual deep-links (hub-and-spoke interlinking) ─────
// Risk Insights is the executive hub. Each risk row routes to the
// analyst module that owns its remediation surface.

export type DeepLinkModule = "competitors" | "content-optimisation" | "scans";

export interface DeepLinkTarget {
  module: DeepLinkModule;
  /** Friendly label for the button, e.g. "Competitors". */
  label: string;
  /** Route with query params conveying filter intent. Integration dev wires filter state. */
  route: string;
  /** One-line rationale for why this module owns this risk's analyst depth. */
  reason: string;
}

// ─── Hallucination tracking ─────────────────────────────────

export interface HallucinationEvent {
  id: string;
  engine: AIEngine;
  prompt: string;
  invention: string;
  severity: HallucinationSeverity;
  status: HallucinationStatus;
  detectedAt: string;
}

// ─── Downstream conversion ──────────────────────────────────

export interface LLMSourcedTraffic {
  monthlySessions: number;
  sessionsByEngine: Partial<Record<AIEngine, number>>;
  assistedPipelineUsd: number;
  confidenceLabel: string;
  sparkline: number[];
}

// ─── Core page entities ─────────────────────────────────────

export interface RiskAccount {
  id: string;
  name: string;
  quarter: string;
  lastRefreshed: string;
  monitoringActive: boolean;
  defaultLens: Lens;
}

export interface CompositeSummary {
  rating: Rating;
  trend: Trend;
  pipelineExposedUsd: number;
  revenueAtRisk12moUsd: number;
  topQueryCoveragePct: number;
  citationShareOfVoicePct: number;
  promptsAtRisk: number;
  freshnessDecayDays: number;
  llmSourcedTraffic: LLMSourcedTraffic;
  brandSentimentScore: number;
  openMaterialHallucinations: number;
  comparisonWinRatePct: number;
}

export interface EvidencePrompt {
  id: string;
  prompt: string;
  engine: AIEngine;
  yourCitationRank: number | null;
  topCompetitor: string;
  snippet: string;
}

export interface Milestone {
  id: string;
  riskId: string;
  riskCategory: string;
  riskRating: Rating;
  title: string;
  status: MilestoneStatus;
  owner: { name: string; role: string };
  dueDate: string;
}

export interface Risk {
  id: string;
  category: string;
  subCategory?: string;
  primaryPersona: Persona;
  rating: Rating;
  trend: Trend;
  severityUsd: number;
  likelihoodPct: number;
  owner: { name: string; role: string };
  nextReview: string;
  cluster: string;
  narrative: string;
  progressPct: number;
  methodology: MethodologySpec;
  engineBreakdown: EngineMetric[];
  sentimentSamples?: SentimentSample[];
  recommendationContexts?: RecommendationContext[];
  hallucinationEvents?: HallucinationEvent[];
  evidencePrompts: EvidencePrompt[];
  milestones: Milestone[];
  /** Contextual deep-link to the analyst module that owns this risk's remediation. */
  deepLink: DeepLinkTarget;
}

export interface MetricPoint {
  ts: string;
  engine: AIEngine;
  cluster: string;
  citationSharePct: number;
}

export interface Annotation {
  ts: string;
  label: string;
  riskId: string;
}

// ─── Financial Intake (tier-based, compliance-lite) ─────────
// The CFO-audited source of truth for every dollar figure on the page.
// Inputs are ordinal tiers, not exact dollars. Three questions total.
// This keeps the page defensible ("pipeline exposed = your tier × our model")
// without creating a compliance surface around exact-dollar financial data.

export type IntakeStatus = "incomplete" | "draft" | "complete";

// Sub-$1M tiers cover the early-stage ICP (our launch target is ≥$100k).
// $1M–$10M is split into two finer tiers for Series A / early B buyers.
// $10M+ keeps the original coarser ranges for more mature customers.
export type PipelineTier =
  | "100k_to_250k"
  | "250k_to_500k"
  | "500k_to_750k"
  | "750k_to_1m"
  | "1_to_5m"
  | "5_to_10m"
  | "10_to_50m"
  | "50_to_250m"
  | "over_250m";

export type OrganicShareTier = "low" | "moderate" | "high";
export type AIExposureTier = "emerging" | "established" | "dominant";

export interface FinancialIntakeInputs {
  pipelineTier: PipelineTier;
  organicShare: OrganicShareTier;
  // aiExposure is NOT captured here — it's measured from the latest scan
  // and surfaced via `scanSignals.aiExposureTier`. See §19.7 of the
  // architecture doc for the scan-derived input contract.
}

// ─── Scan-derived signals ───────────────────────────────────
// Auto-measured from the client's latest AEO scan. Not user-editable on
// the intake form — if the number is wrong, the user runs a new scan.

export interface ScanSignals {
  /** Share of tracked queries surfacing AI answers, from the latest scan (0-100). */
  aiExposurePct: number;
  /** Bucketed tier derived from aiExposurePct. Used by the scenario math. */
  aiExposureTier: AIExposureTier;
  /** Latest AEO composite score (0-100). Shown in the intake as a grounding reference. */
  aeoCompositeScore: number;
  lastScanDate: string;
  scanId: string;
}

/** Bucket an exact AI exposure percentage into its tier. */
export function aiExposureTierForPct(pct: number): AIExposureTier {
  if (pct < 20) return "emerging";
  if (pct <= 50) return "established";
  return "dominant";
}

export const scanSignals: ScanSignals = {
  aiExposurePct: 38,
  aiExposureTier: "established",
  aeoCompositeScore: 62,
  lastScanDate: "2026-04-14T06:00:00Z",
  scanId: "scan_2026_q2_001",
};

export interface FinancialIntake {
  status: IntakeStatus;
  inputs: FinancialIntakeInputs;
  /** Citations backing the industry-default scenario factors. Reference only. */
  sourceBenchmarks: {
    lossFactor: BenchmarkCitation;
    restorationFactor: BenchmarkCitation;
    displacementRate: BenchmarkCitation;
  };
  completedAt: string | null;
  completedBy: string | null;
  lastEditedAt: string | null;
}

// ─── Tier → value mappings (internal) ───────────────────────

const PIPELINE_MIDPOINTS: Record<PipelineTier, number> = {
  "100k_to_250k": 175_000,
  "250k_to_500k": 375_000,
  "500k_to_750k": 625_000,
  "750k_to_1m": 875_000,
  "1_to_5m": 3_000_000,
  "5_to_10m": 7_500_000,
  "10_to_50m": 22_500_000,
  "50_to_250m": 125_000_000,
  over_250m: 500_000_000,
};

const ORGANIC_SHARE_VALUES: Record<OrganicShareTier, number> = {
  low: 0.15,
  moderate: 0.4,
  high: 0.7,
};

const AI_EXPOSURE_VALUES: Record<AIExposureTier, number> = {
  emerging: 0.1,
  established: 0.3,
  dominant: 0.6,
};

// ─── Human-readable labels (for UI) ─────────────────────────

export const PIPELINE_TIER_LABELS: Record<PipelineTier, string> = {
  "100k_to_250k": "$100K – $250K",
  "250k_to_500k": "$250K – $500K",
  "500k_to_750k": "$500K – $750K",
  "750k_to_1m": "$750K – $1M",
  "1_to_5m": "$1M – $5M",
  "5_to_10m": "$5M – $10M",
  "10_to_50m": "$10M – $50M",
  "50_to_250m": "$50M – $250M",
  over_250m: "Over $250M",
};

export const PIPELINE_TIER_HINTS: Record<PipelineTier, string> = {
  "100k_to_250k": "Very early stage",
  "250k_to_500k": "Seed",
  "500k_to_750k": "Post-seed",
  "750k_to_1m": "Approaching $1M",
  "1_to_5m": "Series A",
  "5_to_10m": "Early Series B",
  "10_to_50m": "Growth stage",
  "50_to_250m": "Later-stage private / early public",
  over_250m: "Enterprise scale",
};

export const ORGANIC_SHARE_LABELS: Record<OrganicShareTier, string> = {
  low: "Low (under 25%)",
  moderate: "Moderate (25 – 60%)",
  high: "High (over 60%)",
};

export const ORGANIC_SHARE_HINTS: Record<OrganicShareTier, string> = {
  low: "Most pipeline is paid or outbound-sourced.",
  moderate: "Balanced mix of paid and organic.",
  high: "Organic + SEO + direct drive most of pipeline.",
};

export const AI_EXPOSURE_LABELS: Record<AIExposureTier, string> = {
  emerging: "Emerging (under 20% of queries)",
  established: "Established (20 – 50%)",
  dominant: "Dominant (over 50%)",
};

export const AI_EXPOSURE_HINTS: Record<AIExposureTier, string> = {
  emerging: "AI surfaces are visible but still a minority of your tracked queries.",
  established: "AI answers appear across a meaningful share of your query universe.",
  dominant: "AI answers are the default response on most of your tracked queries.",
};

// ─── Module-level scenario defaults (no longer captured from the client) ─

export const DEFAULT_LOSS_FACTOR_BY_MODE: Record<ScenarioMode, number> = {
  do_nothing: 0.32,
  execute: 0.12,
  accelerate: 0.04,
};

export const DEFAULT_RESTORATION_FACTOR_BY_MODE: Record<ScenarioMode, number> = {
  do_nothing: 0,
  execute: 0.4,
  accelerate: 0.7,
};

// ─── Compute helpers ────────────────────────────────────────
// aiExposure defaults to the scan-derived tier. Callers can override for
// "what if" previews (e.g. if we re-scanned, what would we measure?).

/** Displacement rate = organic-share midpoint × AI-exposure midpoint. */
export function computeDisplacementRate(
  i: FinancialIntakeInputs,
  aiExposure: AIExposureTier = scanSignals.aiExposureTier
): number {
  return ORGANIC_SHARE_VALUES[i.organicShare] * AI_EXPOSURE_VALUES[aiExposure];
}

export function computePipelineExposed(
  i: FinancialIntakeInputs,
  aiExposure: AIExposureTier = scanSignals.aiExposureTier
): number {
  return PIPELINE_MIDPOINTS[i.pipelineTier] * computeDisplacementRate(i, aiExposure);
}

export function computeRevenueAtRisk12mo(
  i: FinancialIntakeInputs,
  aiExposure: AIExposureTier = scanSignals.aiExposureTier
): number {
  return computePipelineExposed(i, aiExposure) * DEFAULT_LOSS_FACTOR_BY_MODE.do_nothing;
}

export interface ResourceCard {
  id: string;
  title: string;
  summary: string;
  ctaLabel: string;
  href: string;
}

export interface TileSpec {
  key: string;
  label: string;
  source: keyof CompositeSummary;
  format: "currency" | "percent" | "number" | "days";
  deltaLabel: string;
  direction: "up" | "down";
  methodologyKey?: string;
}

export interface RatingHistoryCell {
  quarter: string;
  rating: Rating;
}

export interface RatingHistoryRow {
  riskId: string;
  category: string;
  cells: RatingHistoryCell[];
}

// ─── Account ────────────────────────────────────────────────

export const riskAccount: RiskAccount = {
  id: "acct_001",
  name: "Acme Software",
  quarter: "Q2 2026",
  lastRefreshed: "2026-04-14T06:00:00Z",
  monitoringActive: true,
  defaultLens: "cro",
};

// ─── Default intake (source of truth for every dollar on the page) ──

// Intake starts "incomplete" so the Summary banner prompts the user to
// complete it. The pre-loaded values compute to the same $2.7M anchor
// the page reads today, so the UX is "open the form, tweak, confirm" not
// "fill from blank". The CFO audit memo (2026-04) calls this out: the
// demo user should see the page working, not an empty state.
export const defaultIntake: FinancialIntake = {
  status: "incomplete",
  inputs: {
    pipelineTier: "10_to_50m",    // midpoint $22.5M
    organicShare: "moderate",      // 0.40
  },
  // AI exposure comes from scanSignals.aiExposureTier = "established" (0.30).
  // Math check: 22.5M × 0.40 × 0.30 = $2.7M exposed. × 0.32 loss = $864k at risk.
  // Preserves the canonical page numbers + the "sum of risk severities = $2.7M" invariant.
  sourceBenchmarks: {
    lossFactor: {
      label: "Gartner 2025 AI-Search Displacement Benchmark",
      publisher: "Gartner",
      year: 2025,
      url: "https://www.gartner.com/en/research/ai-search-displacement-2025",
      accessedAt: "2026-04-01",
    },
    restorationFactor: {
      label: "McKinsey 2025 AI Commerce Recovery Study",
      publisher: "McKinsey & Co.",
      year: 2025,
      url: "https://www.mckinsey.com/industries/technology/our-insights/ai-commerce-recovery-2025",
      accessedAt: "2026-04-01",
    },
    displacementRate: {
      label: "Forrester 2025 AEO Industry Index",
      publisher: "Forrester",
      year: 2025,
      url: "https://www.forrester.com/report/aeo-industry-index-2025/",
      accessedAt: "2026-04-01",
    },
  },
  completedAt: null,
  completedBy: null,
  lastEditedAt: "2026-04-10T00:00:00Z",
};

const PIPELINE_EXPOSED_USD = computePipelineExposed(defaultIntake.inputs); // $2.7M
const REVENUE_AT_RISK_12MO_USD = computeRevenueAtRisk12mo(defaultIntake.inputs); // $864k

// ─── Composite Summary ──────────────────────────────────────

export const compositeSummary: CompositeSummary = {
  rating: "amber",
  trend: "up",
  pipelineExposedUsd: PIPELINE_EXPOSED_USD,
  revenueAtRisk12moUsd: REVENUE_AT_RISK_12MO_USD,
  topQueryCoveragePct: 42,
  citationShareOfVoicePct: 27,
  promptsAtRisk: 18,
  freshnessDecayDays: 142,
  llmSourcedTraffic: {
    monthlySessions: 2_840,
    sessionsByEngine: {
      chatgpt: 1_520,
      perplexity: 640,
      gemini: 410,
      claude: 270,
    },
    assistedPipelineUsd: 380_000,
    confidenceLabel: "Directional estimate. Cookieless UTM + referrer heuristic.",
    sparkline: [900, 1100, 1350, 1780, 2100, 2420, 2700, 2840],
  },
  brandSentimentScore: 42,
  openMaterialHallucinations: 2,
  comparisonWinRatePct: 38,
};

// ─── Lens-specific tile specs ───────────────────────────────

export const cmoTiles: TileSpec[] = [
  {
    key: "citation-sov",
    label: "Citation Share of Voice",
    source: "citationShareOfVoicePct",
    format: "percent",
    deltaLabel: "-4 pts vs last quarter",
    direction: "down",
    methodologyKey: "citation-sov",
  },
  {
    key: "prompts-at-risk",
    label: "Prompts at Risk",
    source: "promptsAtRisk",
    format: "number",
    deltaLabel: "+3 new this quarter",
    direction: "down",
    methodologyKey: "prompts-at-risk",
  },
  {
    key: "freshness-decay",
    label: "Freshness Decay",
    source: "freshnessDecayDays",
    format: "days",
    deltaLabel: "+12 days since refresh",
    direction: "down",
    methodologyKey: "freshness-decay",
  },
];

export const cmoDownstreamTile: TileSpec = {
  key: "llm-sourced-traffic",
  label: "LLM-Sourced Traffic",
  source: "llmSourcedTraffic",
  format: "number",
  deltaLabel: "+14% vs last quarter",
  direction: "up",
  methodologyKey: "llm-sourced-traffic",
};

export const croTiles: TileSpec[] = [
  {
    key: "pipeline-exposed",
    label: "Pipeline Exposed",
    source: "pipelineExposedUsd",
    format: "currency",
    deltaLabel: "+$420k this quarter",
    direction: "down",
    methodologyKey: "pipeline-exposed",
  },
  {
    key: "revenue-at-risk",
    label: "Revenue at Risk (12mo)",
    source: "revenueAtRisk12moUsd",
    format: "currency",
    deltaLabel: "+$110k vs last quarter",
    direction: "down",
    methodologyKey: "revenue-at-risk",
  },
  {
    key: "top-query-coverage",
    label: "Top-Query Coverage",
    source: "topQueryCoveragePct",
    format: "percent",
    deltaLabel: "+6 pts vs last quarter",
    direction: "up",
    methodologyKey: "top-query-coverage",
  },
];

export const croDownstreamTile: TileSpec = {
  key: "assisted-pipeline",
  label: "Assisted Pipeline (90d)",
  source: "llmSourcedTraffic",
  format: "currency",
  deltaLabel: "+$92k vs prior 90d",
  direction: "up",
  methodologyKey: "assisted-pipeline",
};

// ─── Tile-scoped methodology specs ──────────────────────────

export const tileMethodologies: Record<string, MethodologySpec> = {
  "citation-sov": {
    denominator: "Your citations ÷ (your + top-3 competitor citations) on all tracked prompts across the 4 priority clusters.",
    promptUniverse: "Seeded from GA4 organic search terms (trailing 90d, ≥10 impressions) intersected with sales-call transcripts and analyst-report mentions.",
    engines: ["chatgpt", "perplexity", "claude", "gemini"],
    samplingWindow: "Trailing 28 days, refreshed weekly",
    sampleSize: 3_810,
    confidenceInterval: { level: "90", lowPct: 25.2, highPct: 28.8 },
    detectionMethod: "automated_scrape",
    shortBlurb: "Your share of citations vs top-3 competitors across the tracked prompt universe.",
  },
  "prompts-at-risk": {
    denominator: "Tracked prompts where you dropped rank, lost citation, or fell out of top-3 in the trailing quarter.",
    promptUniverse: "All 304 tracked prompts across the 4 priority clusters.",
    engines: ["chatgpt", "perplexity", "claude", "gemini"],
    samplingWindow: "Trailing 90 days, refreshed weekly",
    sampleSize: 304,
    detectionMethod: "automated_scrape",
    shortBlurb: "Count of tracked prompts where citation position worsened quarter-over-quarter.",
  },
  "freshness-decay": {
    denominator: "Median age (days) of your pages currently cited by tracked AI engines.",
    promptUniverse: "All pages cited at least once across tracked prompts in trailing 28 days.",
    engines: ["chatgpt", "perplexity", "claude", "gemini"],
    samplingWindow: "Trailing 28 days, refreshed weekly",
    sampleSize: 212,
    detectionMethod: "automated_scrape",
    shortBlurb: "Lower is better. Pages >180 days old correlate with citation drop within 2 quarters.",
  },
  "pipeline-exposed": {
    denominator: "Pipeline-tier midpoint × (organic-share midpoint × AI-exposure midpoint). Equivalently, sum of severityUsd across all pipeline-exposure risks.",
    promptUniverse: "Pipeline-exposure risks only (7 rows). Quality risks (hallucination, regulatory, brand-safety) carry qualitative severity and are excluded from the sum.",
    engines: ["chatgpt", "perplexity", "claude", "gemini"],
    samplingWindow: "Quarterly, backfilled from telemetry",
    sampleSize: 7,
    detectionMethod: "hybrid",
    sources: [
      {
        label: "Forrester 2025 AEO Industry Index",
        publisher: "Forrester",
        year: 2025,
        url: "https://www.forrester.com/report/aeo-industry-index-2025/",
      },
    ],
    shortBlurb: "Annual pipeline at risk of AI displacement. Set via three tier selections in the Financial Intake; no exact dollars stored.",
  },
  "revenue-at-risk": {
    denominator: "Pipeline Exposed × 0.32 (Gartner do-nothing loss factor). Represents expected 12-month revenue loss under no action.",
    promptUniverse: "All pipeline-exposure risks.",
    engines: ["chatgpt", "perplexity", "claude", "gemini"],
    samplingWindow: "12-month forward projection, refreshed quarterly",
    sampleSize: 7,
    detectionMethod: "hybrid",
    sources: [
      {
        label: "Gartner 2025 AI-Search Displacement Benchmark",
        publisher: "Gartner",
        year: 2025,
        url: "https://www.gartner.com/en/research/ai-search-displacement-2025",
      },
    ],
    shortBlurb: "12-month expected revenue loss absent action. Matches Scenario bar AI-lost (do-nothing) segment.",
  },
  "top-query-coverage": {
    denominator: "Your top-100 prompt clusters where you appear in the top-3 citations on ≥2 AI engines.",
    promptUniverse: "Top-100 prompt clusters by pipeline-attribution score.",
    engines: ["chatgpt", "perplexity", "claude", "gemini"],
    samplingWindow: "Trailing 28 days, refreshed weekly",
    sampleSize: 100,
    confidenceInterval: { level: "90", lowPct: 38, highPct: 46 },
    detectionMethod: "automated_scrape",
    shortBlurb: "Percent of your top-100 prompt clusters where you are in the top-3 on ≥2 engines.",
  },
  "llm-sourced-traffic": {
    denominator: "Monthly sessions attributed to LLM-origin referrers (Perplexity direct referral, ChatGPT search-gpt UTM, etc.).",
    promptUniverse: "Acme.com organic traffic, trailing 28 days.",
    engines: ["chatgpt", "perplexity", "gemini", "claude"],
    samplingWindow: "Trailing 28 days, refreshed nightly",
    sampleSize: 2_840,
    detectionMethod: "hybrid",
    shortBlurb: "Directional attribution. Cookieless UTM + referrer heuristic, no deterministic match.",
  },
  "assisted-pipeline": {
    denominator: "Closed pipeline in trailing 90 days where an LLM-origin session appears in the multi-touch attribution path.",
    promptUniverse: "All closed opportunities in HubSpot, trailing 90 days.",
    engines: ["chatgpt", "perplexity", "gemini", "claude"],
    samplingWindow: "Trailing 90 days, refreshed weekly",
    sampleSize: 142,
    detectionMethod: "hybrid",
    shortBlurb: "Pipeline dollars assisted by an LLM-origin touchpoint. Multi-touch U-shaped attribution.",
  },
};

// ─── Engine breakdown builder ───────────────────────────────

function engineBreakdown(
  chatgpt: { value: number; delta: number; sparkline: number[] },
  perplexity: { value: number; delta: number; sparkline: number[] },
  claude: { value: number; delta: number; sparkline: number[] },
  gemini: { value: number; delta: number; sparkline: number[] },
  goodDirection: "up" | "down" = "up"
): EngineMetric[] {
  return [
    { engine: "chatgpt", ...chatgpt, goodDirection },
    { engine: "perplexity", ...perplexity, goodDirection },
    { engine: "claude", ...claude, goodDirection },
    { engine: "gemini", ...gemini, goodDirection },
  ];
}

// ─── Risks ──────────────────────────────────────────────────
// Pipeline-exposure severities sum to $2.7M (pipelineExposedUsd invariant):
// 820 + 320 + 220 + 420 + 410 + 310 + 200 = 2,700
// Quality risks (hallucination/regulatory/brand-safety) carry $0 severity.

export const risks: Risk[] = [
  {
    id: "risk-competitor-dominance",
    category: "Competitor Citation Dominance",
    primaryPersona: "both",
    rating: "red",
    trend: "up",
    severityUsd: 820_000,
    likelihoodPct: 78,
    owner: { name: "Gabe Astor", role: "AEO Program Lead" },
    nextReview: "2026-06-30",
    cluster: "enterprise AEO vendors",
    narrative:
      "Three competitors hold **over 60% share of answer** across our five priority prompt clusters. The gap widened after a competitor published an entity-anchored pillar hub in March. Our citations on ChatGPT and Perplexity dropped in the same week.\n\nIf nothing ships this quarter, we model continued attrition of roughly 4 citation points per quarter on the *enterprise AEO vendors* cluster. Execution of the committed milestones below is estimated to recover 2-3 points inside 60 days.",
    progressPct: 25,
    methodology: {
      denominator: "94 tracked prompts in the enterprise AEO vendors cluster.",
      promptUniverse: "Seeded from GA4 organic search terms (trailing 90d, ≥10 impressions) intersected with sales-call transcript mentions.",
      engines: ["chatgpt", "perplexity", "claude", "gemini"],
      samplingWindow: "Trailing 28 days, refreshed weekly",
      sampleSize: 1_128,
      confidenceInterval: { level: "90", lowPct: 24.8, highPct: 29.2 },
      detectionMethod: "automated_scrape",
      shortBlurb: "Your citations ÷ total citations (yours + top-3 competitors) across the tracked enterprise-AEO cluster.",
    },
    engineBreakdown: engineBreakdown(
      { value: 18, delta: -5, sparkline: [32, 30, 28, 27, 24, 22, 20, 18] },
      { value: 29, delta: -2, sparkline: [34, 33, 32, 31, 30, 31, 29, 29] },
      { value: 22, delta: -1, sparkline: [27, 26, 25, 25, 24, 23, 23, 22] },
      { value: 31, delta: 1, sparkline: [28, 28, 29, 30, 29, 30, 30, 31] }
    ),
    sentimentSamples: [
      {
        id: "ss-cd-1",
        engine: "chatgpt",
        prompt: "enterprise AEO vendors",
        polarity: "mixed",
        positioningPhrase: "mid-market alternative",
        snippet: "For enterprise deployments, BrandRank AI and SearchPilot lead. Acme Software is positioned as a mid-market alternative.",
        detectedAt: "2026-04-05",
      },
      {
        id: "ss-cd-2",
        engine: "perplexity",
        prompt: "best AEO platform for B2B SaaS",
        polarity: "neutral",
        positioningPhrase: "functional but less mature",
        snippet: "Acme Software is functional but less mature than the category leaders.",
        detectedAt: "2026-04-02",
      },
      {
        id: "ss-cd-3",
        engine: "claude",
        prompt: "AEO tools comparison",
        polarity: "negative",
        positioningPhrase: "limited enterprise schema coverage",
        snippet: "Acme's enterprise schema coverage is limited compared to BrandRank AI's 200+ markup templates.",
        detectedAt: "2026-03-28",
      },
    ],
    recommendationContexts: [
      {
        id: "rc-cd-1",
        useCase: "mid-market AEO tracking",
        sharePct: 48,
        alignment: "on_strategy",
        exampleEngine: "claude",
        exampleSnippet: "Acme Software is a good fit for mid-market teams tracking AEO across 2-3 AI engines.",
      },
      {
        id: "rc-cd-2",
        useCase: "enterprise AEO",
        sharePct: 12,
        alignment: "adjacent",
        exampleEngine: "chatgpt",
        exampleSnippet: "For enterprise scale, Acme is workable but BrandRank AI and SearchPilot are more common picks.",
      },
    ],
    deepLink: {
      module: "competitors",
      label: "Competitors",
      route: "/dashboard/competitors?risk=risk-competitor-dominance&cluster=enterprise%20AEO%20vendors",
      reason: "Compare citation share and head-to-head win rates against BrandRank AI, SearchPilot, and ContentAI Pro on priority clusters.",
    },
    evidencePrompts: [
      {
        id: "ep-1",
        prompt: "enterprise AEO vendors",
        engine: "chatgpt",
        yourCitationRank: null,
        topCompetitor: "BrandRank AI",
        snippet: "For enterprise-grade answer engine optimization, BrandRank AI and SearchPilot lead the category with extensive schema coverage and entity graphs.",
      },
      {
        id: "ep-2",
        prompt: "best answer engine optimization companies",
        engine: "perplexity",
        yourCitationRank: 7,
        topCompetitor: "SearchPilot",
        snippet: "SearchPilot is widely cited as the gold standard, with BrandRank AI and ContentAI Pro as common alternatives.",
      },
      {
        id: "ep-3",
        prompt: "AEO platform comparison",
        engine: "claude",
        yourCitationRank: null,
        topCompetitor: "ContentAI Pro",
        snippet: "ContentAI Pro offers the most comprehensive competitive citation tracking across multiple AI engines.",
      },
    ],
    milestones: [
      {
        id: "m-1",
        riskId: "risk-competitor-dominance",
        riskCategory: "Competitor Citation Dominance",
        riskRating: "red",
        title: "Draft 4 entity-anchored pillar pages",
        status: "plan",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-15",
      },
      {
        id: "m-2",
        riskId: "risk-competitor-dominance",
        riskCategory: "Competitor Citation Dominance",
        riskRating: "red",
        title: "Ship schema + author bios on top 20 pages",
        status: "execute",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-22",
      },
      {
        id: "m-3",
        riskId: "risk-competitor-dominance",
        riskCategory: "Competitor Citation Dominance",
        riskRating: "red",
        title: "Secure 2 authority backlinks (G2, Gartner)",
        status: "measure",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-06-05",
      },
    ],
  },
  {
    id: "risk-brand-displacement-share-drop",
    category: "Brand Displacement",
    subCategory: "Share drop",
    primaryPersona: "cmo",
    rating: "red",
    trend: "up",
    severityUsd: 320_000,
    likelihoodPct: 78,
    owner: { name: "Gabe Astor", role: "AEO Program Lead" },
    nextReview: "2026-06-15",
    cluster: "brand and product questions",
    narrative:
      "On branded prompts, our citation rank is falling. ChatGPT now places a competitor above us on 34% of branded prompts, up from 18% in Q4 2025.\n\nThis is the **share-drop variant** of Brand Displacement. Measured quantitatively via rank tracking. See sibling row for the narrative-loss variant (how AI describes us when we are mentioned).",
    progressPct: 15,
    methodology: {
      denominator: "127 branded prompts matching /acme.*?/i or containing product-line names.",
      promptUniverse: "Seeded from GA4 brand-search terms + sales-call transcripts.",
      engines: ["chatgpt", "perplexity", "claude", "gemini"],
      samplingWindow: "Trailing 28 days, refreshed weekly",
      sampleSize: 3_810,
      confidenceInterval: { level: "90", lowPct: 31, highPct: 37 },
      detectionMethod: "automated_scrape",
      shortBlurb: "Percent of branded prompts where a competitor ranks above Acme in the AI answer.",
    },
    engineBreakdown: engineBreakdown(
      { value: 34, delta: 16, sparkline: [18, 19, 22, 25, 28, 30, 32, 34] },
      { value: 22, delta: 4, sparkline: [14, 15, 17, 18, 20, 21, 21, 22] },
      { value: 19, delta: 2, sparkline: [13, 14, 15, 16, 17, 18, 18, 19] },
      { value: 27, delta: 7, sparkline: [16, 18, 19, 21, 23, 25, 26, 27] },
      "down"
    ),
    sentimentSamples: [
      {
        id: "ss-bd-1",
        engine: "chatgpt",
        prompt: "is Acme Software worth it",
        polarity: "mixed",
        positioningPhrase: "solid mid-market, not enterprise-grade",
        snippet: "Acme Software is solid for mid-market. For enterprise use cases, BrandRank AI offers deeper schema coverage.",
        detectedAt: "2026-04-08",
      },
    ],
    recommendationContexts: [
      {
        id: "rc-bd-1",
        useCase: "mid-market brand tracking",
        sharePct: 52,
        alignment: "on_strategy",
        exampleEngine: "claude",
        exampleSnippet: "Acme is widely chosen by mid-market teams needing brand-tracking in AI answers.",
      },
    ],
    deepLink: {
      module: "competitors",
      label: "Competitors",
      route: "/dashboard/competitors?risk=risk-brand-displacement-share-drop&cluster=brand%20and%20product%20questions",
      reason: "See which competitors are being placed above Acme on branded prompts and on which engines the gap is widest.",
    },
    evidencePrompts: [
      {
        id: "ep-bd-1",
        prompt: "Acme Software alternatives",
        engine: "gemini",
        yourCitationRank: 2,
        topCompetitor: "ContentAI Pro",
        snippet: "Popular alternatives include ContentAI Pro, SearchPilot, and BrandRank AI. Each offers distinct strengths in AEO.",
      },
      {
        id: "ep-bd-2",
        prompt: "Acme Software vs BrandRank AI",
        engine: "perplexity",
        yourCitationRank: 2,
        topCompetitor: "BrandRank AI",
        snippet: "Both platforms measure AI citation share, but BrandRank AI has stronger integrations with enterprise SSO and Salesforce.",
      },
    ],
    milestones: [
      {
        id: "m-bd-1",
        riskId: "risk-brand-displacement-share-drop",
        riskCategory: "Brand Displacement",
        riskRating: "red",
        title: "Publish comparison pages vs top 3 competitors",
        status: "plan",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-20",
      },
      {
        id: "m-bd-2",
        riskId: "risk-brand-displacement-share-drop",
        riskCategory: "Brand Displacement",
        riskRating: "red",
        title: "Submit Acme schema to Wikidata + Crunchbase",
        status: "execute",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-10",
      },
    ],
  },
  {
    id: "risk-brand-displacement-narrative",
    category: "Brand Displacement",
    subCategory: "Narrative loss",
    primaryPersona: "cmo",
    rating: "amber",
    trend: "up",
    severityUsd: 220_000,
    likelihoodPct: 58,
    owner: { name: "Gabe Astor", role: "AEO Program Lead" },
    nextReview: "2026-06-15",
    cluster: "brand and product questions",
    narrative:
      "When AI engines *do* cite us, they increasingly frame us with competitor-favorable adjectives. *'Mid-market'*, *'less mature than the category leaders'*, *'limited enterprise schema coverage'*.\n\nThis is the **narrative-loss variant** of Brand Displacement. Measured qualitatively via LLM-as-judge on mention context, with 20% human QA. Different problem from share drop and requires different remediation (PR + analyst briefings, not schema shipping).",
    progressPct: 10,
    methodology: {
      denominator: "Branded prompts where Acme is cited. Of those, what fraction carry competitor-favorable framing.",
      promptUniverse: "127 branded prompts, filtered to responses where Acme is mentioned.",
      engines: ["chatgpt", "perplexity", "claude", "gemini"],
      samplingWindow: "Trailing 28 days, refreshed weekly",
      sampleSize: 2_412,
      confidenceInterval: { level: "90", lowPct: 26, highPct: 32 },
      detectionMethod: "hybrid",
      shortBlurb: "LLM-as-judge (GPT-4o) flags responses with competitor-favorable framing. 20% of flags get human review for QA.",
    },
    engineBreakdown: engineBreakdown(
      { value: 42, delta: 8, sparkline: [30, 32, 34, 35, 38, 40, 41, 42] },
      { value: 28, delta: 3, sparkline: [22, 23, 24, 25, 26, 27, 27, 28] },
      { value: 24, delta: 2, sparkline: [20, 20, 21, 22, 23, 24, 24, 24] },
      { value: 33, delta: 6, sparkline: [24, 25, 27, 28, 30, 32, 33, 33] },
      "down"
    ),
    sentimentSamples: [
      {
        id: "ss-bdn-1",
        engine: "chatgpt",
        prompt: "is Acme enterprise ready",
        polarity: "negative",
        positioningPhrase: "not enterprise-grade",
        snippet: "Acme Software is commonly chosen by mid-market teams but is not generally considered enterprise-grade.",
        detectedAt: "2026-04-10",
      },
      {
        id: "ss-bdn-2",
        engine: "perplexity",
        prompt: "Acme Software review",
        polarity: "mixed",
        positioningPhrase: "capable but niche",
        snippet: "Acme is capable within its niche but lacks the breadth of SearchPilot for complex deployments.",
        detectedAt: "2026-04-06",
      },
    ],
    recommendationContexts: [
      {
        id: "rc-bdn-1",
        useCase: "mid-market sweet spot",
        sharePct: 64,
        alignment: "on_strategy",
        exampleEngine: "claude",
        exampleSnippet: "Acme is a strong fit for mid-market SaaS brands needing quick-start AEO tracking.",
      },
      {
        id: "rc-bdn-2",
        useCase: "enterprise deployments",
        sharePct: 8,
        alignment: "off_strategy",
        exampleEngine: "chatgpt",
        exampleSnippet: "For enterprise-scale AEO, look at BrandRank AI or SearchPilot. Acme is typically mid-market.",
      },
    ],
    evidencePrompts: [
      {
        id: "ep-bdn-1",
        prompt: "Acme Software positioning",
        engine: "claude",
        yourCitationRank: 1,
        topCompetitor: "BrandRank AI",
        snippet: "Acme Software is positioned as a mid-market AEO tool, typically described as approachable but less deep than the enterprise category leaders.",
      },
    ],
    milestones: [
      {
        id: "m-bdn-1",
        riskId: "risk-brand-displacement-narrative",
        riskCategory: "Brand Displacement",
        riskRating: "amber",
        title: "Brief 2 analysts on enterprise roadmap",
        status: "execute",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-30",
      },
      {
        id: "m-bdn-2",
        riskId: "risk-brand-displacement-narrative",
        riskCategory: "Brand Displacement",
        riskRating: "amber",
        title: "Publish 3 enterprise case studies",
        status: "plan",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-06-10",
      },
    ],
    deepLink: {
      module: "competitors",
      label: "Competitors",
      route: "/dashboard/competitors?risk=risk-brand-displacement-narrative&variant=narrative",
      reason: "Inspect the LLM-judge-flagged mention context and the competitor-favorable framing driving the narrative loss.",
    },
  },
  {
    id: "risk-factual-misrepresentation",
    category: "Factual Misrepresentation",
    primaryPersona: "cro",
    rating: "amber",
    trend: "flat",
    severityUsd: 420_000,
    likelihoodPct: 52,
    owner: { name: "Gabe Astor", role: "AEO Program Lead" },
    nextReview: "2026-07-01",
    cluster: "pricing and feature questions",
    narrative:
      "AI engines cite stale pricing, outdated plan names, or the wrong launch year on 8 of our top-20 prompts. ChatGPT and Gemini are the worst offenders, both pulling from a 2024 snapshot of our pricing page.\n\nImpact is moderate today but grows if buyers reach us with false expectations. One already-lost deal in Q1 cited our old Starter-tier price as a reason to disqualify. Detection is hybrid: LLM-as-judge flags potential misstatements, and 20% are human-reviewed for QA.",
    progressPct: 30,
    methodology: {
      denominator: "Top-20 prompts about pricing, features, plans, or dates.",
      promptUniverse: "Seeded from GA4 commercial-intent queries + sales-call transcripts. Cross-referenced against the current fact sheet.",
      engines: ["chatgpt", "perplexity", "claude", "gemini"],
      samplingWindow: "Trailing 28 days, refreshed weekly",
      sampleSize: 560,
      confidenceInterval: { level: "90", lowPct: 34, highPct: 44 },
      detectionMethod: "hybrid",
      shortBlurb: "LLM-as-judge (GPT-4o) flags responses containing claims that contradict the current fact sheet. 20% of flags get human verification for QA.",
    },
    engineBreakdown: engineBreakdown(
      { value: 58, delta: 4, sparkline: [48, 50, 52, 54, 54, 56, 57, 58] },
      { value: 32, delta: 0, sparkline: [30, 31, 32, 32, 33, 32, 32, 32] },
      { value: 26, delta: -2, sparkline: [30, 30, 29, 28, 28, 27, 27, 26] },
      { value: 44, delta: 3, sparkline: [38, 39, 40, 41, 42, 43, 43, 44] },
      "down"
    ),
    sentimentSamples: [
      {
        id: "ss-fm-1",
        engine: "chatgpt",
        prompt: "Acme Software pricing",
        polarity: "neutral",
        positioningPhrase: "$299/mo Starter (outdated)",
        snippet: "Acme Software offers tiered plans starting at $299/mo (Starter), with Pro at $799/mo.",
        detectedAt: "2026-04-02",
      },
    ],
    evidencePrompts: [
      {
        id: "ep-fm-1",
        prompt: "Acme Software pricing",
        engine: "chatgpt",
        yourCitationRank: 2,
        topCompetitor: "SearchPilot",
        snippet: "Acme Software offers tiered plans starting at $299/mo (Starter), with Pro at $799/mo and Enterprise custom-quoted.",
      },
      {
        id: "ep-fm-2",
        prompt: "when was Acme Software founded",
        engine: "gemini",
        yourCitationRank: 1,
        topCompetitor: "",
        snippet: "Acme Software was founded in 2019 and is headquartered in San Francisco.",
      },
      {
        id: "ep-fm-3",
        prompt: "does Acme Software integrate with Salesforce",
        engine: "perplexity",
        yourCitationRank: 4,
        topCompetitor: "BrandRank AI",
        snippet: "Acme Software does not currently offer a native Salesforce integration, though some customers use Zapier as a workaround.",
      },
    ],
    milestones: [
      {
        id: "m-fm-1",
        riskId: "risk-factual-misrepresentation",
        riskCategory: "Factual Misrepresentation",
        riskRating: "amber",
        title: "Refresh pricing page + methodology guide",
        status: "plan",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-10",
      },
      {
        id: "m-fm-2",
        riskId: "risk-factual-misrepresentation",
        riskCategory: "Factual Misrepresentation",
        riskRating: "amber",
        title: "Ship Salesforce integration announcement post",
        status: "execute",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-24",
      },
    ],
    deepLink: {
      module: "content-optimisation",
      label: "Content Optimisation",
      route: "/dashboard/content-optimisation?risk=risk-factual-misrepresentation",
      reason: "Refresh the pages cited with stale pricing and plan names. Content Optimisation owns the fact-sheet source of truth.",
    },
  },
  {
    id: "risk-authority-decay",
    category: "Authority Signal Decay",
    primaryPersona: "both",
    rating: "amber",
    trend: "up",
    severityUsd: 410_000,
    likelihoodPct: 58,
    owner: { name: "Gabe Astor", role: "AEO Program Lead" },
    nextReview: "2026-06-20",
    cluster: "analyst and methodology prompts",
    narrative:
      "Our authority signals are weakening. Backlink velocity is down 28% quarter-over-quarter. Schema hygiene on 14 of our 20 cited pages is missing Organization or Product markup. Analyst coverage has not refreshed in 9 months.\n\nAI engines reference these sources when evaluating credibility. Competitors with newer analyst coverage and complete schema are climbing faster on analyst-phrased prompts. The fix is execution-heavy but well understood.",
    progressPct: 40,
    methodology: {
      denominator: "Composite index of three inputs: (1) backlink velocity (new referring domains, trailing 90d, Ahrefs); (2) schema-markup coverage (Schema.org Organization + Product, across top-20 cited pages); (3) analyst-report recency (G2 + Gartner + Forrester mentions, trailing 180d).",
      promptUniverse: "Analyst-phrased and methodology-phrased prompts. 46 tracked prompts.",
      engines: ["chatgpt", "perplexity", "claude", "gemini"],
      samplingWindow: "Trailing 180 days for analyst recency, trailing 90 days for backlinks",
      sampleSize: 46,
      detectionMethod: "automated_scrape",
      shortBlurb: "Index of backlink velocity, schema hygiene, and analyst-coverage recency. Weighted 40/30/30.",
    },
    engineBreakdown: engineBreakdown(
      { value: 28, delta: -4, sparkline: [38, 36, 34, 32, 32, 30, 29, 28] },
      { value: 34, delta: -2, sparkline: [40, 39, 38, 37, 36, 35, 34, 34] },
      { value: 30, delta: -3, sparkline: [38, 37, 36, 34, 33, 32, 31, 30] },
      { value: 36, delta: -1, sparkline: [40, 39, 38, 38, 37, 37, 36, 36] }
    ),
    sentimentSamples: [
      {
        id: "ss-ad-1",
        engine: "chatgpt",
        prompt: "top-rated AEO platforms on G2",
        polarity: "negative",
        positioningPhrase: "less prominent on G2",
        snippet: "SearchPilot leads G2's AEO category with a 4.8-star average across 220+ reviews. Acme Software has a smaller review base.",
        detectedAt: "2026-04-04",
      },
    ],
    evidencePrompts: [
      {
        id: "ep-ad-1",
        prompt: "top-rated AEO platforms on G2",
        engine: "chatgpt",
        yourCitationRank: 5,
        topCompetitor: "SearchPilot",
        snippet: "SearchPilot leads G2's AEO category with a 4.8-star average across 220+ reviews.",
      },
      {
        id: "ep-ad-2",
        prompt: "Gartner on answer engine optimization",
        engine: "perplexity",
        yourCitationRank: null,
        topCompetitor: "ContentAI Pro",
        snippet: "Gartner's 2025 AEO landscape report highlights ContentAI Pro and SearchPilot as mature players.",
      },
    ],
    milestones: [
      {
        id: "m-ad-1",
        riskId: "risk-authority-decay",
        riskCategory: "Authority Signal Decay",
        riskRating: "amber",
        title: "Run Q2 G2 review drive (target: +40 reviews)",
        status: "execute",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-06-15",
      },
      {
        id: "m-ad-2",
        riskId: "risk-authority-decay",
        riskCategory: "Authority Signal Decay",
        riskRating: "amber",
        title: "Brief 2 analysts on FY roadmap",
        status: "measure",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-06-05",
      },
      {
        id: "m-ad-3",
        riskId: "risk-authority-decay",
        riskCategory: "Authority Signal Decay",
        riskRating: "amber",
        title: "Ship Organization + Product schema on top 20 pages",
        status: "plan",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-25",
      },
    ],
    deepLink: {
      module: "scans",
      label: "Scans",
      route: "/dashboard/scans?risk=risk-authority-decay",
      reason: "Scans surfaces backlink velocity, schema-markup coverage, and analyst-mention recency, the three inputs driving this index.",
    },
  },
  {
    id: "risk-freshness-decay",
    category: "Content Freshness Decay",
    primaryPersona: "cmo",
    rating: "amber",
    trend: "flat",
    severityUsd: 310_000,
    likelihoodPct: 48,
    owner: { name: "Gabe Astor", role: "AEO Program Lead" },
    nextReview: "2026-07-14",
    cluster: "evergreen how-to prompts",
    narrative:
      "Cited pages are aging. **32 pages cited across AI engines are over 180 days old**, and two are still cited with outdated pricing. Freshness is not yet affecting citations materially, but the trajectory points to attrition within two quarters if unchecked.\n\nAuto-freshness tagging on the CMS is the force multiplier. Once it ships, the editorial team can prioritize refreshes by cited-volume rather than by age alone.",
    progressPct: 48,
    methodology: {
      denominator: "Median age (days) of your pages currently cited by tracked AI engines.",
      promptUniverse: "All pages cited at least once on evergreen how-to prompts, trailing 28 days.",
      engines: ["chatgpt", "perplexity", "claude", "gemini"],
      samplingWindow: "Trailing 28 days, refreshed weekly",
      sampleSize: 212,
      detectionMethod: "automated_scrape",
      shortBlurb: "Age distribution of cited pages. Threshold 180 days; pages older than that have 2.4x higher citation-drop risk within 2 quarters.",
    },
    engineBreakdown: engineBreakdown(
      { value: 158, delta: 12, sparkline: [140, 142, 145, 148, 150, 152, 155, 158] },
      { value: 132, delta: 4, sparkline: [124, 126, 128, 128, 130, 131, 132, 132] },
      { value: 144, delta: 6, sparkline: [132, 134, 136, 138, 140, 142, 143, 144] },
      { value: 150, delta: 8, sparkline: [138, 140, 142, 144, 146, 148, 149, 150] },
      "down"
    ),
    evidencePrompts: [
      {
        id: "ep-fd-1",
        prompt: "how to measure AI citation share",
        engine: "perplexity",
        yourCitationRank: 3,
        topCompetitor: "VoiceIndex",
        snippet: "Acme's methodology guide (published 2024) outlines a 3-step approach. Newer entrants like VoiceIndex publish quarterly benchmarks.",
      },
      {
        id: "ep-fd-2",
        prompt: "best AEO tools 2026",
        engine: "chatgpt",
        yourCitationRank: 6,
        topCompetitor: "SearchPilot",
        snippet: "The 2026 AEO landscape is led by SearchPilot, BrandRank AI, and ContentAI Pro. Acme Software is a mid-market alternative.",
      },
    ],
    milestones: [
      {
        id: "m-fd-1",
        riskId: "risk-freshness-decay",
        riskCategory: "Content Freshness Decay",
        riskRating: "amber",
        title: "Refresh 12 highest-cited pages with 2026 data",
        status: "plan",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-30",
      },
      {
        id: "m-fd-2",
        riskId: "risk-freshness-decay",
        riskCategory: "Content Freshness Decay",
        riskRating: "amber",
        title: "Implement auto-freshness tagging on CMS",
        status: "review",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-06-15",
      },
    ],
    deepLink: {
      module: "content-optimisation",
      label: "Content Optimisation",
      route: "/dashboard/content-optimisation?risk=risk-freshness-decay&sortBy=age",
      reason: "Queue the 32 pages aged over 180 days for refresh. Content Optimisation owns the editorial refresh workflow.",
    },
  },
  {
    id: "risk-category-erosion",
    category: "Category Erosion",
    primaryPersona: "cmo",
    rating: "green",
    trend: "down",
    severityUsd: 200_000,
    likelihoodPct: 22,
    owner: { name: "Gabe Astor", role: "AEO Program Lead" },
    nextReview: "2026-08-01",
    cluster: "AEO for vertical SaaS",
    narrative:
      "Coverage on emerging prompt clusters (e.g. *AEO for vertical SaaS*) has improved quarter-over-quarter. Citation rank on these prompts rose from 6.2 to 3.4 average after the March content refresh.\n\nThis risk is trending green and the work is mostly done. Entity-association strength (LLM-judge scored) also lifted from 0.58 to 0.74. Review status is about protecting the gains.",
    progressPct: 82,
    methodology: {
      denominator: "Share of answer on generic category prompts (e.g. 'best AEO tools', 'AEO for X') AND entity-association strength between Acme and the category noun.",
      promptUniverse: "Generic category prompts, 58 tracked.",
      engines: ["chatgpt", "perplexity", "claude", "gemini"],
      samplingWindow: "Trailing 28 days, refreshed weekly",
      sampleSize: 58,
      confidenceInterval: { level: "90", lowPct: 18, highPct: 26 },
      detectionMethod: "hybrid",
      shortBlurb: "Two inputs: (1) citation share on generic category prompts; (2) entity-association strength, scored 0–1 by LLM-as-judge.",
    },
    engineBreakdown: engineBreakdown(
      { value: 38, delta: 10, sparkline: [18, 22, 24, 28, 30, 34, 36, 38] },
      { value: 44, delta: 12, sparkline: [24, 28, 30, 34, 36, 40, 42, 44] },
      { value: 52, delta: 8, sparkline: [36, 38, 42, 44, 46, 48, 50, 52] },
      { value: 40, delta: 9, sparkline: [22, 26, 28, 32, 34, 36, 38, 40] }
    ),
    evidencePrompts: [
      {
        id: "ep-ce-1",
        prompt: "AEO for vertical SaaS",
        engine: "claude",
        yourCitationRank: 2,
        topCompetitor: "BrandRank AI",
        snippet: "Acme Software is commonly recommended for vertical SaaS AEO use cases alongside BrandRank AI.",
      },
    ],
    milestones: [
      {
        id: "m-ce-1",
        riskId: "risk-category-erosion",
        riskCategory: "Category Erosion",
        riskRating: "green",
        title: "Measure citation lift on refreshed clusters",
        status: "measure",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-20",
      },
      {
        id: "m-ce-2",
        riskId: "risk-category-erosion",
        riskCategory: "Category Erosion",
        riskRating: "green",
        title: "Quarterly review: coverage trajectory",
        status: "review",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-08-01",
      },
    ],
    deepLink: {
      module: "content-optimisation",
      label: "Content Optimisation",
      route: "/dashboard/content-optimisation?risk=risk-category-erosion&cluster=AEO%20for%20vertical%20SaaS",
      reason: "Protect the vertical-SaaS gains by scheduling continued coverage on the refreshed category cluster.",
    },
  },
  {
    id: "risk-hallucination",
    category: "Hallucination Frequency",
    primaryPersona: "cro",
    rating: "amber",
    trend: "up",
    severityUsd: 0,
    likelihoodPct: 38,
    owner: { name: "Gabe Astor", role: "AEO Program Lead" },
    nextReview: "2026-06-10",
    cluster: "brand and product questions",
    narrative:
      "AI engines invent claims about Acme on **~3.2% of branded prompts**. Two material inventions open this quarter: a fabricated 'free tier' cited on ChatGPT, and a wrong HQ city on Gemini.\n\nSeverity is qualitative (no direct pipeline-$ yet), but material hallucinations on regulated claims (SLA, compliance scope) could create legal exposure. This is the CRO-facing watch surface.",
    progressPct: 10,
    methodology: {
      denominator: "Percent of branded prompts where the engine stated something factually false about Acme.",
      promptUniverse: "127 branded prompts (trailing 28 days) cross-referenced against the current fact sheet.",
      engines: ["chatgpt", "perplexity", "claude", "gemini"],
      samplingWindow: "Trailing 28 days, refreshed weekly",
      sampleSize: 3_810,
      confidenceInterval: { level: "90", lowPct: 2.8, highPct: 3.6 },
      detectionMethod: "hybrid",
      shortBlurb: "LLM-as-judge (GPT-4o) flags factual claims contradicting the Acme fact sheet. 100% of material flags get human review.",
    },
    engineBreakdown: engineBreakdown(
      { value: 4.2, delta: 0.8, sparkline: [2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.2] },
      { value: 2.1, delta: 0.2, sparkline: [1.8, 1.8, 1.9, 2.0, 2.0, 2.1, 2.1, 2.1] },
      { value: 1.8, delta: 0.1, sparkline: [1.6, 1.6, 1.7, 1.7, 1.7, 1.8, 1.8, 1.8] },
      { value: 3.6, delta: 0.6, sparkline: [2.6, 2.8, 3.0, 3.1, 3.3, 3.4, 3.5, 3.6] },
      "down"
    ),
    hallucinationEvents: [
      {
        id: "he-1",
        engine: "chatgpt",
        prompt: "does Acme have a free tier",
        invention: "Claimed $0 Starter tier (we don't have one).",
        severity: "material",
        status: "open",
        detectedAt: "2026-03-22",
      },
      {
        id: "he-2",
        engine: "gemini",
        prompt: "where is Acme based",
        invention: "Listed Seattle; actual HQ is San Francisco.",
        severity: "moderate",
        status: "mitigated",
        detectedAt: "2026-02-18",
      },
      {
        id: "he-3",
        engine: "chatgpt",
        prompt: "who founded Acme Software",
        invention: "Invented a co-founder name (actual founder is solo).",
        severity: "moderate",
        status: "open",
        detectedAt: "2026-03-10",
      },
      {
        id: "he-4",
        engine: "claude",
        prompt: "Acme Software pricing tiers",
        invention: "Stated 4 tiers; actual count is 3.",
        severity: "cosmetic",
        status: "resolved",
        detectedAt: "2026-01-28",
      },
      {
        id: "he-5",
        engine: "perplexity",
        prompt: "Acme customer count",
        invention: "Claimed 10,000 customers; actual is ~2,400.",
        severity: "material",
        status: "open",
        detectedAt: "2026-03-30",
      },
    ],
    evidencePrompts: [
      {
        id: "ep-h-1",
        prompt: "does Acme have a free tier",
        engine: "chatgpt",
        yourCitationRank: 1,
        topCompetitor: "",
        snippet: "Acme Software offers a free Starter tier for up to 100 prompts per month.",
      },
      {
        id: "ep-h-2",
        prompt: "where is Acme based",
        engine: "gemini",
        yourCitationRank: 1,
        topCompetitor: "",
        snippet: "Acme Software is headquartered in Seattle, Washington.",
      },
    ],
    milestones: [
      {
        id: "m-h-1",
        riskId: "risk-hallucination",
        riskCategory: "Hallucination Frequency",
        riskRating: "amber",
        title: "File correction requests with OpenAI + Google",
        status: "execute",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-05",
      },
      {
        id: "m-h-2",
        riskId: "risk-hallucination",
        riskCategory: "Hallucination Frequency",
        riskRating: "amber",
        title: "Publish canonical fact sheet + schema",
        status: "plan",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-20",
      },
    ],
    deepLink: {
      module: "content-optimisation",
      label: "Content Optimisation",
      route: "/dashboard/content-optimisation?risk=risk-hallucination",
      reason: "Publish the canonical fact sheet that engines can ingest, and file correction requests on open material inventions.",
    },
  },
  {
    id: "risk-regulatory-misstatement",
    category: "Regulatory Context Misstatement",
    primaryPersona: "cro",
    rating: "red",
    trend: "up",
    severityUsd: 0,
    likelihoodPct: 44,
    owner: { name: "Gabe Astor", role: "AEO Program Lead" },
    nextReview: "2026-05-20",
    cluster: "pricing and feature questions",
    narrative:
      "On pricing and compliance-phrased prompts, engines cite **outdated SOC 2 scope** and an incorrect SLA. The highest-severity variant: ChatGPT claims 'SLA guarantees 99.99%' when our public commitment is 99.9%.\n\nThis is the risk category a CRO genuinely fears. Misstated compliance claims can create legal exposure and buyer-trust damage. All material flags go through legal review before mitigation.",
    progressPct: 8,
    methodology: {
      denominator: "Regulatory-context prompts where an engine cited a compliance, SLA, or certification claim about Acme.",
      promptUniverse: "38 prompts flagged as regulatory-context (SLA, SOC 2, GDPR, HIPAA, etc.).",
      engines: ["chatgpt", "perplexity", "claude", "gemini"],
      samplingWindow: "Trailing 28 days, refreshed weekly. Material flags reviewed within 48h.",
      sampleSize: 1_140,
      confidenceInterval: { level: "90", lowPct: 40, highPct: 48 },
      detectionMethod: "hybrid",
      shortBlurb: "LLM-as-judge flags regulatory claims; 100% of flags get human review, with legal sign-off on material misstatements.",
    },
    engineBreakdown: engineBreakdown(
      { value: 6.8, delta: 1.2, sparkline: [3.8, 4.2, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8] },
      { value: 3.2, delta: 0.4, sparkline: [2.4, 2.6, 2.8, 2.8, 3.0, 3.0, 3.1, 3.2] },
      { value: 2.4, delta: 0.2, sparkline: [2.0, 2.1, 2.2, 2.2, 2.3, 2.3, 2.4, 2.4] },
      { value: 4.6, delta: 0.8, sparkline: [3.2, 3.4, 3.8, 4.0, 4.2, 4.4, 4.5, 4.6] },
      "down"
    ),
    sentimentSamples: [
      {
        id: "ss-rm-1",
        engine: "chatgpt",
        prompt: "does Acme have SOC 2",
        polarity: "neutral",
        positioningPhrase: "outdated SOC 2 scope cited",
        snippet: "Acme Software maintains SOC 2 Type I compliance (actual: Type II since Q4 2025).",
        detectedAt: "2026-03-18",
      },
    ],
    evidencePrompts: [
      {
        id: "ep-rm-1",
        prompt: "what is Acme SLA",
        engine: "chatgpt",
        yourCitationRank: 1,
        topCompetitor: "",
        snippet: "Acme's SLA guarantees 99.99% uptime (actual commitment: 99.9%).",
      },
      {
        id: "ep-rm-2",
        prompt: "is Acme HIPAA compliant",
        engine: "perplexity",
        yourCitationRank: 1,
        topCompetitor: "",
        snippet: "Acme Software supports HIPAA compliance on the Enterprise plan (actual: BAAs available only on request).",
      },
    ],
    milestones: [
      {
        id: "m-rm-1",
        riskId: "risk-regulatory-misstatement",
        riskCategory: "Regulatory Context Misstatement",
        riskRating: "red",
        title: "Publish canonical compliance page with schema",
        status: "execute",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-05",
      },
      {
        id: "m-rm-2",
        riskId: "risk-regulatory-misstatement",
        riskCategory: "Regulatory Context Misstatement",
        riskRating: "red",
        title: "File correction requests on SLA + SOC 2 claims",
        status: "measure",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-05-15",
      },
    ],
    deepLink: {
      module: "content-optimisation",
      label: "Content Optimisation",
      route: "/dashboard/content-optimisation?risk=risk-regulatory-misstatement",
      reason: "Legal-reviewed compliance page + schema ships here. Route high-severity regulatory flags through editorial with legal sign-off.",
    },
  },
  {
    id: "risk-brand-safety-misrec",
    category: "Brand-Safety Misrecommendation",
    primaryPersona: "cro",
    rating: "amber",
    trend: "flat",
    severityUsd: 0,
    likelihoodPct: 29,
    owner: { name: "Gabe Astor", role: "AEO Program Lead" },
    nextReview: "2026-07-05",
    cluster: "adjacent-category prompts",
    narrative:
      "Acme is recommended on prompts about **adult-content moderation tooling** (3 instances on Perplexity) and **crypto brand defense** (2 on Claude). Neither is a target audience.\n\nPlacements on off-strategy use cases dilute brand positioning and draw unqualified leads. The ideal outcome is to systematically disassociate Acme from these categories via schema + content signals.",
    progressPct: 5,
    methodology: {
      denominator: "Prompts from off-strategy adjacent categories where Acme was recommended.",
      promptUniverse: "84 prompts in adjacent categories (adult-content moderation, crypto, gambling, others).",
      engines: ["chatgpt", "perplexity", "claude", "gemini"],
      samplingWindow: "Trailing 28 days, refreshed weekly",
      sampleSize: 2_520,
      detectionMethod: "hybrid",
      shortBlurb: "LLM-as-judge flags Acme recommendations in adjacent-category prompts. Human QA classifies as on_strategy / adjacent / off_strategy.",
    },
    engineBreakdown: engineBreakdown(
      { value: 1.2, delta: 0, sparkline: [1.0, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2] },
      { value: 3.4, delta: 0.2, sparkline: [2.8, 3.0, 3.1, 3.2, 3.3, 3.3, 3.4, 3.4] },
      { value: 2.2, delta: 0.1, sparkline: [2.0, 2.0, 2.1, 2.1, 2.2, 2.2, 2.2, 2.2] },
      { value: 1.8, delta: 0, sparkline: [1.6, 1.7, 1.7, 1.8, 1.8, 1.8, 1.8, 1.8] },
      "down"
    ),
    recommendationContexts: [
      {
        id: "rc-bs-1",
        useCase: "adult-content moderation tooling",
        sharePct: 3.4,
        alignment: "off_strategy",
        exampleEngine: "perplexity",
        exampleSnippet: "For content-moderation AEO visibility, Acme Software can track mentions across AI engines.",
      },
      {
        id: "rc-bs-2",
        useCase: "crypto brand defense",
        sharePct: 2.2,
        alignment: "off_strategy",
        exampleEngine: "claude",
        exampleSnippet: "Acme Software offers brand monitoring that some crypto projects use for reputation defense.",
      },
      {
        id: "rc-bs-3",
        useCase: "legal services brand tracking",
        sharePct: 4.8,
        alignment: "adjacent",
        exampleEngine: "chatgpt",
        exampleSnippet: "Law firms sometimes use Acme Software to monitor how AI engines describe them.",
      },
    ],
    evidencePrompts: [
      {
        id: "ep-bs-1",
        prompt: "AEO tools for content moderation",
        engine: "perplexity",
        yourCitationRank: 3,
        topCompetitor: "BrandRank AI",
        snippet: "For content-moderation AEO, Acme Software and BrandRank AI both support mention tracking across engines.",
      },
    ],
    milestones: [
      {
        id: "m-bs-1",
        riskId: "risk-brand-safety-misrec",
        riskCategory: "Brand-Safety Misrecommendation",
        riskRating: "amber",
        title: "Publish target-audience schema (sameAs + audience)",
        status: "plan",
        owner: { name: "Gabe Astor", role: "AEO Program Lead" },
        dueDate: "2026-06-01",
      },
    ],
    deepLink: {
      module: "competitors",
      label: "Competitors",
      route: "/dashboard/competitors?risk=risk-brand-safety-misrec&view=adjacent-recommendations",
      reason: "Competitive-positioning problem. Disassociate Acme from off-strategy adjacent categories via Competitors' positioning tools.",
    },
  },
];

// ─── Metrics timeseries ─────────────────────────────────────

const quarters = [
  "2024-07-01",
  "2024-10-01",
  "2025-01-01",
  "2025-04-01",
  "2025-07-01",
  "2025-10-01",
  "2026-01-01",
  "2026-04-01",
];

const engines: AIEngine[] = ["chatgpt", "perplexity", "claude", "gemini"];

function seriesFor(
  cluster: string,
  start: number,
  step: number,
  jitter = 2
): MetricPoint[] {
  return quarters.flatMap((ts, qi) =>
    engines.map((engine, ei) => ({
      ts,
      engine,
      cluster,
      citationSharePct: Math.max(
        0,
        Math.round(start + step * qi + (ei - 1.5) * jitter)
      ),
    }))
  );
}

export const metricsTimeseries: MetricPoint[] = [
  ...seriesFor("enterprise AEO vendors", 32, -2.2, 3),
  ...seriesFor("brand and product questions", 58, -1.8, 2),
  ...seriesFor("pricing and feature questions", 44, 0.2, 2),
  ...seriesFor("analyst and methodology prompts", 28, -1.2, 2.5),
  ...seriesFor("evergreen how-to prompts", 36, 0.1, 2),
  ...seriesFor("AEO for vertical SaaS", 8, 2.5, 1.5),
  ...seriesFor("adjacent-category prompts", 3, 0.1, 1),
];

// ─── Annotations ────────────────────────────────────────────

export const annotations: Annotation[] = [
  {
    ts: "2025-11-15",
    label: "Published pillar: AEO Measurement Guide",
    riskId: "risk-competitor-dominance",
  },
  {
    ts: "2026-01-10",
    label: "Competitor launched entity hub",
    riskId: "risk-competitor-dominance",
  },
  {
    ts: "2026-03-05",
    label: "Refreshed vertical-SaaS cluster",
    riskId: "risk-category-erosion",
  },
];

// ─── Rating history (for heatmap) ───────────────────────────

export const ratingHistory: RatingHistoryRow[] = [
  {
    riskId: "risk-competitor-dominance",
    category: "Competitor Citation Dominance",
    cells: [
      { quarter: "Q3 '24", rating: "amber" },
      { quarter: "Q4 '24", rating: "amber" },
      { quarter: "Q1 '25", rating: "amber" },
      { quarter: "Q2 '25", rating: "amber" },
      { quarter: "Q3 '25", rating: "red" },
      { quarter: "Q4 '25", rating: "red" },
      { quarter: "Q1 '26", rating: "red" },
      { quarter: "Q2 '26", rating: "red" },
    ],
  },
  {
    riskId: "risk-brand-displacement-share-drop",
    category: "Brand Displacement (Share drop)",
    cells: [
      { quarter: "Q3 '24", rating: "green" },
      { quarter: "Q4 '24", rating: "amber" },
      { quarter: "Q1 '25", rating: "amber" },
      { quarter: "Q2 '25", rating: "amber" },
      { quarter: "Q3 '25", rating: "amber" },
      { quarter: "Q4 '25", rating: "red" },
      { quarter: "Q1 '26", rating: "red" },
      { quarter: "Q2 '26", rating: "red" },
    ],
  },
  {
    riskId: "risk-brand-displacement-narrative",
    category: "Brand Displacement (Narrative)",
    cells: [
      { quarter: "Q3 '24", rating: "green" },
      { quarter: "Q4 '24", rating: "green" },
      { quarter: "Q1 '25", rating: "green" },
      { quarter: "Q2 '25", rating: "amber" },
      { quarter: "Q3 '25", rating: "amber" },
      { quarter: "Q4 '25", rating: "amber" },
      { quarter: "Q1 '26", rating: "amber" },
      { quarter: "Q2 '26", rating: "amber" },
    ],
  },
  {
    riskId: "risk-factual-misrepresentation",
    category: "Factual Misrepresentation",
    cells: [
      { quarter: "Q3 '24", rating: "green" },
      { quarter: "Q4 '24", rating: "green" },
      { quarter: "Q1 '25", rating: "amber" },
      { quarter: "Q2 '25", rating: "amber" },
      { quarter: "Q3 '25", rating: "amber" },
      { quarter: "Q4 '25", rating: "amber" },
      { quarter: "Q1 '26", rating: "amber" },
      { quarter: "Q2 '26", rating: "amber" },
    ],
  },
  {
    riskId: "risk-authority-decay",
    category: "Authority Signal Decay",
    cells: [
      { quarter: "Q3 '24", rating: "green" },
      { quarter: "Q4 '24", rating: "green" },
      { quarter: "Q1 '25", rating: "green" },
      { quarter: "Q2 '25", rating: "amber" },
      { quarter: "Q3 '25", rating: "amber" },
      { quarter: "Q4 '25", rating: "amber" },
      { quarter: "Q1 '26", rating: "amber" },
      { quarter: "Q2 '26", rating: "amber" },
    ],
  },
  {
    riskId: "risk-freshness-decay",
    category: "Content Freshness Decay",
    cells: [
      { quarter: "Q3 '24", rating: "green" },
      { quarter: "Q4 '24", rating: "green" },
      { quarter: "Q1 '25", rating: "green" },
      { quarter: "Q2 '25", rating: "green" },
      { quarter: "Q3 '25", rating: "amber" },
      { quarter: "Q4 '25", rating: "amber" },
      { quarter: "Q1 '26", rating: "amber" },
      { quarter: "Q2 '26", rating: "amber" },
    ],
  },
  {
    riskId: "risk-category-erosion",
    category: "Category Erosion",
    cells: [
      { quarter: "Q3 '24", rating: "red" },
      { quarter: "Q4 '24", rating: "red" },
      { quarter: "Q1 '25", rating: "amber" },
      { quarter: "Q2 '25", rating: "amber" },
      { quarter: "Q3 '25", rating: "amber" },
      { quarter: "Q4 '25", rating: "amber" },
      { quarter: "Q1 '26", rating: "green" },
      { quarter: "Q2 '26", rating: "green" },
    ],
  },
  {
    riskId: "risk-hallucination",
    category: "Hallucination Frequency",
    cells: [
      { quarter: "Q3 '24", rating: "green" },
      { quarter: "Q4 '24", rating: "green" },
      { quarter: "Q1 '25", rating: "green" },
      { quarter: "Q2 '25", rating: "green" },
      { quarter: "Q3 '25", rating: "amber" },
      { quarter: "Q4 '25", rating: "amber" },
      { quarter: "Q1 '26", rating: "amber" },
      { quarter: "Q2 '26", rating: "amber" },
    ],
  },
  {
    riskId: "risk-regulatory-misstatement",
    category: "Regulatory Context Misstatement",
    cells: [
      { quarter: "Q3 '24", rating: "amber" },
      { quarter: "Q4 '24", rating: "amber" },
      { quarter: "Q1 '25", rating: "amber" },
      { quarter: "Q2 '25", rating: "amber" },
      { quarter: "Q3 '25", rating: "amber" },
      { quarter: "Q4 '25", rating: "red" },
      { quarter: "Q1 '26", rating: "red" },
      { quarter: "Q2 '26", rating: "red" },
    ],
  },
  {
    riskId: "risk-brand-safety-misrec",
    category: "Brand-Safety Misrecommendation",
    cells: [
      { quarter: "Q3 '24", rating: "green" },
      { quarter: "Q4 '24", rating: "green" },
      { quarter: "Q1 '25", rating: "amber" },
      { quarter: "Q2 '25", rating: "amber" },
      { quarter: "Q3 '25", rating: "amber" },
      { quarter: "Q4 '25", rating: "amber" },
      { quarter: "Q1 '26", rating: "amber" },
      { quarter: "Q2 '26", rating: "amber" },
    ],
  },
];

// ─── Resources ──────────────────────────────────────────────

export const resourceCards: ResourceCard[] = [
  {
    id: "res-1",
    title: "The CRO's Guide to AEO Exposure",
    summary:
      "How to size AI-driven revenue risk in dollars. A 4-step framework with worked examples for B2B SaaS.",
    ctaLabel: "Read the guide",
    href: "#",
  },
  {
    id: "res-2",
    title: "Entity-Anchored Pillar Playbook",
    summary:
      "The exact content structure that lifts citation share on ChatGPT and Perplexity. Includes a template.",
    ctaLabel: "Download playbook",
    href: "#",
  },
  {
    id: "res-3",
    title: "Freshness Decay: Early-Warning Signals",
    summary:
      "Three telemetry cuts that predict citation loss 60 to 90 days before it hits, with alert thresholds.",
    ctaLabel: "Watch briefing",
    href: "#",
  },
];
