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
  { label: "Implementation Plan", slug: "implementation-plan", href: "/dashboard/improvement-plan" },
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
}

export const kpiCards: KPICard[] = [
  {
    label: "Scans This Month",
    value: "14",
    change: "+3",
    changeDirection: "up",
    comparison: "vs last month",
  },
  {
    label: "Total Visits",
    value: "8,420",
    change: "+12%",
    changeDirection: "up",
    comparison: "vs last month",
  },
];

export const mentionsCard: KPICard = {
  label: "Mentions",
  value: "247",
  change: "+18%",
  changeDirection: "up",
  comparison: "vs last month",
};

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
  { name: "ChatGPT", score: 78, change: 5, iconBg: "#10A37F", iconSlug: "chatgpt" },
  { name: "Perplexity", score: 71, change: 3, iconBg: "#1C1C1C", iconSlug: "perplexity" },
  { name: "Gemini", score: 65, change: 2, iconBg: "#FFFFFF", iconSlug: "gemini" },
  { name: "Grok", score: 38, change: -8, iconBg: "#000000", iconSlug: "grok" },
  { name: "Claude", score: 82, change: 6, iconBg: "#D97757", iconSlug: "claude" },
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
  color: string;
  active: boolean;
}

export const trendLines: TrendLine[] = [
  { label: "AI Visibility", color: "#FF9F43", active: true },
  { label: "Brand Accuracy", color: "#27AE60", active: true },
  { label: "Sentiment", color: "#4ECDC4", active: true },
  { label: "Schema", color: "#E6EBF1", active: false },
  { label: "Freshness", color: "#E6EBF1", active: false },
  { label: "EEAT", color: "#E6EBF1", active: false },
];

export const trendMonths = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

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
