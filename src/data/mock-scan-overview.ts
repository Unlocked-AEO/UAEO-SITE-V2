// ─── Scan Overview ─────────────────────────────────────────

export interface ScanMeta {
  domain: string;
  scanDate: string;
  userInitials: string;
}

export const scanMeta: ScanMeta = {
  domain: "acme-corp.com",
  scanDate: "Apr 2, 2025",
  userInitials: "GA",
};

// ─── Overall Score ─────────────────────────────────────────

export interface OverallScore {
  score: number;
  max: number;
  summary: string;
}

export const overallScore: OverallScore = {
  score: 72,
  max: 100,
  summary:
    "Your brand is partially visible across AI answer engines but has significant room to grow. ChatGPT and Claude cite you occasionally, but Grok and Copilot rarely mention your brand in relevant queries. Schema coverage and content freshness are dragging your overall score down. With targeted fixes, a score above 85 is achievable within 60 days.",
};

// ─── Category Tabs ─────────────────────────────────────────

export interface CategoryTab {
  label: string;
  slug: string;
  score: number | null;
  scoreColor: "green" | "warning" | "danger" | null;
}

export const categoryTabs: CategoryTab[] = [
  { label: "Summary", slug: "summary", score: null, scoreColor: null },
  { label: "AI Visibility", slug: "ai-visibility", score: 68, scoreColor: "warning" },
  { label: "Brand Accuracy", slug: "brand-accuracy", score: 81, scoreColor: "green" },
  { label: "Sentiment", slug: "sentiment", score: 74, scoreColor: "green" },
  { label: "Schema Coverage", slug: "schema-coverage", score: 45, scoreColor: "danger" },
  { label: "Content Freshness", slug: "content-freshness", score: 77, scoreColor: "green" },
  { label: "EEAT", slug: "eeat", score: 61, scoreColor: "warning" },
];

// ─── Score Gauges ──────────────────────────────────────────

export interface ScoreGauge {
  label: string;
  score: number;
  color: "green" | "warning" | "danger";
}

export const scoreGauges: ScoreGauge[] = [
  { label: "AI Visibility", score: 68, color: "warning" },
  { label: "Brand Accuracy", score: 81, color: "green" },
  { label: "Sentiment", score: 74, color: "green" },
  { label: "Schema Coverage", score: 45, color: "danger" },
  { label: "Content Freshness", score: 77, color: "green" },
  { label: "EEAT", score: 61, color: "warning" },
];

// ─── Strengths & Weaknesses ────────────────────────────────

export interface Finding {
  text: string;
  severity: "green" | "red" | "warning";
}

export const strengths: Finding[] = [
  {
    text: "Strong brand accuracy — AI engines describe your product correctly 81% of the time",
    severity: "green",
  },
  {
    text: "Content freshness score of 77 — recent blog and product updates are being indexed",
    severity: "green",
  },
  {
    text: "Positive sentiment across Claude and ChatGPT — brand tone is landing well",
    severity: "green",
  },
];

export const weaknesses: Finding[] = [
  {
    text: "Schema coverage critically low at 45 — missing FAQ, HowTo, and Product markup sitewide",
    severity: "red",
  },
  {
    text: "EEAT signals weak — limited author bios, credentials, and third-party citations detected",
    severity: "red",
  },
  {
    text: "Near-zero visibility on Grok and Copilot — no citations found in last 30 days",
    severity: "warning",
  },
  {
    text: "AI Visibility score of 68 indicates inconsistent citation — not yet a default recommendation",
    severity: "warning",
  },
];

// ─── Engine Scores (detailed) ──────────────────────────────

export interface EngineScoreDetail {
  name: string;
  model: string;
  score: number;
  iconBg: string;
  iconSlug: string;
  hasBorder?: boolean;
}

export const engineScoreDetails: EngineScoreDetail[] = [
  { name: "ChatGPT", model: "GPT-4o", score: 78, iconBg: "#EAF5F0", iconSlug: "chatgpt" },
  { name: "Perplexity", model: "Perplexity Pro", score: 71, iconBg: "#E8F4F5", iconSlug: "perplexity" },
  { name: "Gemini", model: "Gemini 1.5 Pro", score: 65, iconBg: "#FFFFFF", iconSlug: "gemini", hasBorder: true },
  { name: "Grok", model: "Grok 2", score: 38, iconBg: "#000000", iconSlug: "grok" },
  { name: "Claude", model: "Claude 3.5 Sonnet", score: 82, iconBg: "#FDF0EB", iconSlug: "claude" },
];
