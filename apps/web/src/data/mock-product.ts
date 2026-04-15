// ─── Hero ──────────────────────────────────────────────────

export const productHero = {
  badge: "Product",
  headline: "Everything you need to\nown your AI presence.",
  subtext:
    "One platform to scan, analyze, fix, and monitor how AI engines see your brand — across every major model.",
};

// ─── Stats Banner ──────────────────────────────────────────

export interface ProductStat {
  value: string;
  label: string;
  color: string;
}

export const productStats: ProductStat[] = [
  { value: "5", label: "AI Engines Monitored", color: "#FFFFFF" },
  { value: "72+", label: "Scoring Signals", color: "#4ECDC4" },
  { value: "< 60s", label: "Average Scan Time", color: "#FFFFFF" },
  { value: "24hr", label: "Monitoring Cycle", color: "#FFFFFF" },
];

// ─── Features ──────────────────────────────────────────────

export interface ProductFeature {
  badge: string;
  headline: string;
  description: string;
  highlights: string[];
  comingSoon?: boolean;
  icon: "scan" | "plan" | "competitive" | "risk" | "agentic";
  layout: "left" | "right";
}

export const productFeatures: ProductFeature[] = [
  {
    badge: "Scan",
    headline: "See exactly how AI\ndescribes your brand.",
    description:
      "Run a comprehensive scan across ChatGPT, Perplexity, Gemini, Grok, and Claude. Get a full breakdown of your AI Visibility, Brand Accuracy, Sentiment, Schema Coverage, Content Freshness, and EEAT scores — all in under 60 seconds.",
    highlights: [
      "6 scoring dimensions per scan",
      "Real prompt-level citation tracking",
      "Hallucination detection across every engine",
      "Historical scan comparison and trend lines",
    ],
    icon: "scan",
    layout: "left",
  },
  {
    badge: "Improvement Plan",
    headline: "Know exactly what to\nfix — and in what order.",
    description:
      "Every scan generates a prioritized action plan ranked by impact on your AI visibility score. No guessing, no generic advice — just specific fixes tied to real scoring signals.",
    highlights: [
      "Auto-prioritized by score impact",
      "Step-by-step implementation guides",
      "Track progress as you complete fixes",
      "Score projections for each action",
    ],
    icon: "plan",
    layout: "right",
  },
  {
    badge: "Competitive Analysis",
    headline: "See who AI recommends\ninstead of you.",
    description:
      "Compare your AI visibility against direct competitors. Understand why certain brands get cited more often, where you're losing share of voice, and what content gaps to close.",
    highlights: [
      "Side-by-side competitor scoring",
      "Share of voice tracking across engines",
      "Industry leaderboard positioning",
      "Gap analysis with actionable takeaways",
    ],
    icon: "competitive",
    layout: "left",
  },
  {
    badge: "Risk Insights",
    headline: "Catch threats before\nthey cost you citations.",
    description:
      "Continuous monitoring surfaces risks like score drops, new hallucinations, competitor gains, and schema degradation — so you can act before visibility erodes.",
    highlights: [
      "Real-time risk severity scoring",
      "Hallucination trend tracking",
      "Competitor movement alerts",
      "Schema and freshness decay warnings",
    ],
    icon: "risk",
    layout: "right",
  },
  {
    badge: "Agentic Implementations",
    headline: "Let AI fix your\nAI visibility.",
    description:
      "Our upcoming agentic system doesn't just tell you what to fix — it implements changes for you. From schema markup injection to content rewrites, the agent handles execution while you stay in control.",
    highlights: [
      "Automated schema markup generation",
      "AI-drafted content improvements",
      "One-click implementation approval",
      "Human-in-the-loop guardrails",
    ],
    icon: "agentic",
    layout: "left",
    comingSoon: true,
  },
];

// ─── Bottom CTA ────────────────────────────────────────────

export const productCTA = {
  headline: "Ready to take control of\nyour AI visibility?",
  subtext:
    "Start with a free scan and see exactly where your brand stands across every major AI engine.",
  primaryCTA: "Get started free",
  secondaryCTA: "Schedule a demo",
};
