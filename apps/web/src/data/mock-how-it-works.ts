// ─── Hero ───────────────────────────────────────────────────

export const hiwHero = {
  badge: "How It Works",
  headline: "From crawl to actionable\ninsights in minutes.",
  subtext:
    "Our platform does the heavy lifting so you can focus on fixing what matters.",
};

export interface ProcessStep {
  number: number;
  label: string;
  variant: "teal" | "navy";
}

export const processSteps: ProcessStep[] = [
  { number: 1, label: "Crawl", variant: "teal" },
  { number: 2, label: "Extract", variant: "teal" },
  { number: 3, label: "Simulate", variant: "teal" },
  { number: 4, label: "Report", variant: "navy" },
];

// ─── Step 01: Crawl ────────────────────────────────────────

export const stepCrawl = {
  label: "Step 01",
  title: "Crawl",
  description:
    "We analyze your online presence to understand how your brand appears across the web.",
  checklist: [
    "Website structure",
    "Content discovery",
    "Digital footprint mapping",
  ],
};

export interface CrawlItem {
  name: string;
  detail: string;
}

export const crawlCard = {
  url: "https://yourwebsite.com",
  status: "✓ Complete",
  items: [
    { name: "Homepage", detail: "1,240 words" },
    { name: "Blog — 47 articles indexed", detail: "82,400 words" },
    { name: "Social profiles × 4", detail: "Mapped" },
    { name: "Backlink profile", detail: "2,847 links" },
  ] as CrawlItem[],
  summary: "324 pages analyzed",
  timing: "4.2s · Done",
};

// ─── Step 02: Extract ──────────────────────────────────────

export const stepExtract = {
  label: "Step 02",
  title: "Extract & Understand",
  description:
    "We identify everything AI models care about when describing your business.",
  checklist: [
    "E-E-A-T signals",
    "Trust indicators",
    "Topic clusters",
    "Schema markup",
  ],
};

export interface EEATScore {
  name: string;
  score: number;
  color: string;
}

export const extractCard = {
  signalsDetected: 87,
  title: "E-E-A-T Analysis",
  scores: [
    { name: "Experience", score: 82, color: "bg-teal" },
    { name: "Expertise", score: 91, color: "bg-success" },
    { name: "Authority", score: 67, color: "bg-warning" },
    { name: "Trust", score: 84, color: "bg-teal" },
  ] as EEATScore[],
  scoreTextColors: ["text-navy", "text-success", "text-warning", "text-navy"],
  tags: [
    { label: "12 schema types", highlighted: false },
    { label: "4 topic clusters", highlighted: false },
    { label: "7 trust indicators", highlighted: false },
    { label: "✓ Entity verified", highlighted: true },
  ],
};

// ─── Step 03: Simulate ─────────────────────────────────────

export const stepSimulate = {
  label: "Step 03",
  title: "AI Simulation",
  description:
    "We query multiple AI engines to see exactly how they describe your brand.",
  checklist: [
    "ChatGPT, Claude, Gemini",
    "Perplexity, DeepSeek, Grok",
    "Accuracy & sentiment analysis",
  ],
};

export interface SimulationScore {
  name: string;
  slug: string;
  score: number;
  change: number;
}

export const simulateCard = {
  title: "Score by AI Engine",
  badge: "6 engines queried",
  subtitle: "Simulation complete · 2 min 14s",
  scores: [
    { name: "ChatGPT", slug: "chatgpt", score: 78, change: 5 },
    { name: "Perplexity", slug: "perplexity", score: 71, change: 3 },
    { name: "Gemini", slug: "gemini", score: 65, change: 2 },
    { name: "Grok", slug: "grok", score: 38, change: -8 },
    { name: "Claude", slug: "claude", score: 82, change: 6 },
    { name: "Copilot", slug: "copilot", score: 59, change: 4 },
  ] as SimulationScore[],
};

// ─── Step 04: Report ───────────────────────────────────────

export const stepReport = {
  label: "Step 04",
  title: "Visibility Report",
  description:
    "Get a unified score with actionable fixes, opportunities, and competitive insights.",
  checklist: [
    "Hallucination detection",
    "Competitor comparison",
    "Action roadmap",
  ],
};

export interface ActionItem {
  text: string;
  severity: "HIGH" | "MED" | "LOW";
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  isYou?: boolean;
}

export const reportCard = {
  visibilityScore: 74,
  scoreChange: "+8 this month",
  trendLabel: "6-Month Trend",
  trendMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
  actions: [
    { text: "Hallucination detected: 2 claims", severity: "HIGH" },
    { text: "Competitor gap: −17pts vs leader", severity: "MED" },
    { text: "Add author bio schema markup", severity: "LOW" },
  ] as ActionItem[],
  leaderboard: [
    { name: "Competitor A", score: 91 },
    { name: "You", score: 74, isYou: true },
    { name: "Competitor B", score: 52 },
  ] as LeaderboardEntry[],
};

// ─── CTA Section ───────────────────────────────────────────

export const hiwCTA = {
  label: "Get started today",
  headline: "Ready to see how AI describes your brand?",
  description:
    "Join thousands of businesses already winning citations across ChatGPT, Perplexity, Gemini, and more.",
  primaryCTA: "Get started free ›",
  secondaryCTA: "Contact sales",
  disclaimer: "No credit card required · Cancel anytime",
};
