// ─── Dashboard Header ───────────────────────────────────────

export const dashboardUser = {
  company: "Acme Corp",
  initials: "GA",
  lastScan: "Last scan: Apr 2, 2025",
};

export interface DashboardTab {
  label: string;
  slug: string;
  href: string | null;
}

export const dashboardTabs: DashboardTab[] = [
  { label: "Overview", slug: "overview", href: "/dashboard" },
  { label: "Scans", slug: "scans", href: "/dashboard/scans" },
  { label: "Improvement Plan", slug: "implementation-plan", href: "/dashboard/improvement-plan" },
  { label: "Competitors", slug: "competitors", href: null },       // NOTE: No Competitors page exists
  { label: "Risk Insights", slug: "risk-insights", href: null },   // NOTE: No Risk Insights page exists
];

// ─── KPI Cards ──────────────────────────────────────────────

export interface KPICard {
  label: string;
  value: string;
  change: string;
  changeDirection: "up" | "down";
  comparison: string;
  sparkline: number[];
}

export const kpiCards: KPICard[] = [
  {
    label: "Scans This Month",
    value: "14",
    change: "+3",
    changeDirection: "up",
    comparison: "vs last month",
    sparkline: [4, 6, 5, 8, 7, 9, 11, 10, 12, 14],
  },
  {
    label: "Total Visits",
    value: "8,420",
    change: "+12%",
    changeDirection: "up",
    comparison: "vs last month",
    sparkline: [3200, 3800, 4100, 4600, 5200, 5800, 6400, 7100, 7600, 8420],
  },
];

export const mentionsCard: KPICard = {
  label: "Mentions",
  value: "247",
  change: "+18%",
  changeDirection: "up",
  comparison: "vs last month",
  sparkline: [80, 95, 110, 130, 145, 160, 180, 200, 220, 247],
};

export const carouselCards: KPICard[] = [
  { label: "Monthly Mentions", value: "247", change: "+18%", changeDirection: "up", comparison: "vs last month", sparkline: [80, 95, 110, 130, 145, 160, 180, 200, 220, 247] },
  { label: "Monthly Citations", value: "89", change: "+12%", changeDirection: "up", comparison: "vs last month", sparkline: [30, 35, 40, 48, 52, 58, 65, 72, 80, 89] },
  { label: "Monthly Recommendations", value: "34", change: "+8%", changeDirection: "up", comparison: "vs last month", sparkline: [12, 14, 16, 18, 20, 22, 25, 28, 30, 34] },
  { label: "Hallucinations Detected", value: "7", change: "-3", changeDirection: "down", comparison: "vs last month", sparkline: [18, 16, 15, 14, 12, 11, 10, 9, 8, 7] },
];

// ─── Share of Voice ─────────────────────────────────────────

export interface ShareOfVoiceItem {
  name: string;
  percent: number;
  color: string;
}

export const shareOfVoice: ShareOfVoiceItem[] = [
  { name: "Acme Corp", percent: 34, color: "#4ECDC4" },
  { name: "Competitor A", percent: 28, color: "#0A2540" },
  { name: "Competitor B", percent: 22, color: "#FF9F43" },
  { name: "Others", percent: 16, color: "#E6EBF1" },
];

// ─── Monthly Score Averages ─────────────────────────────────

export interface ScoreAverage {
  label: string;
  score: number;
  change: number;
  color: "green" | "warning" | "danger";
}

export const scoreAverages: ScoreAverage[] = [
  { label: "AI Visibility", score: 68, change: 4, color: "warning" },
  { label: "Brand Accuracy", score: 81, change: 2, color: "green" },
  { label: "Sentiment", score: 74, change: -1, color: "green" },
  { label: "Schema Coverage", score: 45, change: 6, color: "warning" },
  { label: "Content Freshness", score: 77, change: 3, color: "green" },
  { label: "EEAT", score: 61, change: -3, color: "warning" },
];

// ─── Score by AI Engine ─────────────────────────────────────

export interface EngineScore {
  name: string;
  score: number;
  change: number;
  iconBg: string;
  iconSlug: string;
}

export const engineScores: EngineScore[] = [
  { name: "ChatGPT", score: 78, change: 5, iconBg: "#EAF5F0", iconSlug: "chatgpt" },
  { name: "Perplexity", score: 71, change: 3, iconBg: "#E8F4F5", iconSlug: "perplexity" },
  { name: "Gemini", score: 65, change: 2, iconBg: "#FFFFFF", iconSlug: "gemini" },
  { name: "Grok", score: 38, change: -8, iconBg: "#F5F5F5", iconSlug: "grok" },
  { name: "Claude", score: 82, change: 6, iconBg: "#FDF0EB", iconSlug: "claude" },
];

// ─── Industry Leaderboard ───────────────────────────────────

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isUser: boolean;
}

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "SearchPilot", score: 91, isUser: false },
  { rank: 2, name: "BrandRank AI", score: 84, isUser: false },
  { rank: 3, name: "Acme Corp", score: 74, isUser: true },
  { rank: 4, name: "ContentAI Pro", score: 68, isUser: false },
  { rank: 5, name: "VoiceIndex", score: 61, isUser: false },
  { rank: 6, name: "RankAI", score: 53, isUser: false },
];

// ─── Score Trends ───────────────────────────────────────────

export interface TrendLine {
  label: string;
  dataKey: string;
  color: string;
  active: boolean;
}

export const trendLines: TrendLine[] = [
  { label: "AI Visibility", dataKey: "aiVisibility", color: "#FF9F43", active: true },
  { label: "Brand Accuracy", dataKey: "brandAccuracy", color: "#27AE60", active: true },
  { label: "Sentiment", dataKey: "sentiment", color: "#4ECDC4", active: true },
  { label: "Schema", dataKey: "schema", color: "#635BFF", active: true },
  { label: "Freshness", dataKey: "freshness", color: "#E74C3C", active: true },
  { label: "EEAT", dataKey: "eeat", color: "#3B82F6", active: true },
];

export const trendMonths = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

export interface TrendDataPoint {
  month: string;
  aiVisibility: number;
  brandAccuracy: number;
  sentiment: number;
  schema: number;
  freshness: number;
  eeat: number;
}

export const trendData: TrendDataPoint[] = [
  { month: "Oct", aiVisibility: 52, brandAccuracy: 72, sentiment: 68, schema: 30, freshness: 60, eeat: 45 },
  { month: "Nov", aiVisibility: 55, brandAccuracy: 74, sentiment: 65, schema: 33, freshness: 62, eeat: 48 },
  { month: "Dec", aiVisibility: 58, brandAccuracy: 75, sentiment: 70, schema: 35, freshness: 65, eeat: 50 },
  { month: "Jan", aiVisibility: 60, brandAccuracy: 76, sentiment: 69, schema: 38, freshness: 68, eeat: 53 },
  { month: "Feb", aiVisibility: 63, brandAccuracy: 78, sentiment: 66, schema: 40, freshness: 72, eeat: 56 },
  { month: "Mar", aiVisibility: 65, brandAccuracy: 80, sentiment: 72, schema: 42, freshness: 75, eeat: 58 },
  { month: "Apr", aiVisibility: 68, brandAccuracy: 81, sentiment: 74, schema: 45, freshness: 77, eeat: 61 },
];

// ─── Top Recommendations ────────────────────────────────────

export interface Recommendation {
  number: number;
  title: string;
  description: string;
  priority: "high" | "normal";
}

export const recommendations: Recommendation[] = [
  {
    number: 1,
    title: "Add FAQ schema markup",
    description: "Improve schema coverage by 15+ pts",
    priority: "high",
  },
  {
    number: 2,
    title: "Update Grok entity data",
    description: "Score is 38 — well below benchmark",
    priority: "high",
  },
  {
    number: 3,
    title: "Publish 3 fresh articles",
    description: "Boost content freshness signal",
    priority: "normal",
  },
  {
    number: 4,
    title: "Add author bylines & bios",
    description: "Strengthens EEAT signals",
    priority: "normal",
  },
  {
    number: 5,
    title: "Add next recommendation",
    description: "Unlocked AEO will be huge",
    priority: "normal",
  },
];

// ─── Risk Insights ──────────────────────────────────────────

export interface RiskInsight {
  level: "high" | "medium" | "low";
  title: string;
  description: string;
}

export const riskInsights: RiskInsight[] = [
  {
    level: "high",
    title: "Grok brand gap widening",
    description:
      "Score dropped 12pts in 60 days. Competitor A ranks 2x higher. Immediate entity update recommended.",
  },
  {
    level: "medium",
    title: "Schema below industry avg",
    description:
      "Industry avg is 67. Score of 45 leaves structured data opportunities unmapped across 8 page types.",
  },
  {
    level: "medium",
    title: "EEAT declining 2 months",
    description:
      "No new author-attributed content in 45 days. Risks citation drops in Claude and Perplexity.",
  },
  {
    level: "low",
    title: "Sentiment slightly softened",
    description:
      "Dropped 1pt this month. ChatGPT and Claude remain positive. Gemini is neutral. Watch for negative coverage.",
  },
];
