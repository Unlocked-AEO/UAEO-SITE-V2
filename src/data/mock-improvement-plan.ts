// ─── Tasks In Progress ─────────────────────────────────────

export interface ActiveTask {
  id: string;
  title: string;
}

export const activeTasks: ActiveTask[] = [
  { id: "t1", title: "Add structured FAQ schema markup" },
  { id: "t2", title: "Improve meta description relevance" },
  { id: "t3", title: "Add authoritative citations to blog posts" },
  { id: "t4", title: "Expand topical coverage on pricing page" },
];

// ─── Score Improvement Chart ───────────────────────────────

export const scoreImprovement = {
  currentScore: 74,
  changeLabel: "▲ +8 mo",
  legends: [
    { label: "AEO Score", color: "#4ECDC4" },
    { label: "Citations", color: "#27AE60" },
    { label: "Structure", color: "#FF9F43" },
  ] as const,
  months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
};

export interface ScoreDataPoint {
  month: string;
  aeo: number;
  citations: number;
  structure: number;
}

export const scoreChartData: ScoreDataPoint[] = [
  { month: "Oct", aeo: 56, citations: 48, structure: 50 },
  { month: "Nov", aeo: 59, citations: 52, structure: 52 },
  { month: "Dec", aeo: 63, citations: 57, structure: 55 },
  { month: "Jan", aeo: 67, citations: 62, structure: 57 },
  { month: "Feb", aeo: 71, citations: 67, structure: 60 },
  { month: "Mar", aeo: 74, citations: 70, structure: 62 },
];

// ─── Improvement Plan Items ────────────────────────────────

export type FixStatus =
  | "completed"
  | "in-progress"
  | "not-started"
  | "dismissed";

export interface ImpactBadge {
  label: string;
}

export interface FixItem {
  id: string;
  title: string;
  description: string;
  status: FixStatus;
  impact: ImpactBadge | null;
}

export const fixItems: FixItem[] = [
  {
    id: "f1",
    title: "Add structured FAQ schema markup to support pages",
    description:
      "Adding FAQ schema helps AI systems extract and surface your answers directly in responses. This significantly increases the chance of your content being cited as a source.",
    status: "completed",
    impact: { label: "+12% AEO" },
  },
  {
    id: "f2",
    title: "Improve meta description relevance for AI snippet matching",
    description:
      "Meta descriptions serve as a signal for LLMs deciding whether your page answers a query. Rewriting them to directly address user intent improves your match rate in AI-generated results.",
    status: "in-progress",
    impact: { label: "+18% AEO" },
  },
  {
    id: "f3",
    title: "Add authoritative citations and sources to key blog posts",
    description:
      "AI models weight content more heavily when it references credible external sources. Linking to research, statistics, and authoritative publications increases your trustworthiness score.",
    status: "in-progress",
    impact: { label: "+9% Sentiment" },
  },
  {
    id: "f4",
    title: "Fix heading hierarchy — ensure single H1 per page",
    description:
      "Multiple H1 tags confuse both search engines and AI parsers when determining a page's primary topic. Correcting heading structure ensures your content is properly categorized and indexed.",
    status: "not-started",
    impact: { label: "+6% AEO" },
  },
  {
    id: "f5",
    title: "Remove duplicate canonical tags from product pages",
    description:
      "Duplicate canonicals signal conflicting authority to crawlers and reduce indexing efficiency. Consolidating to a single canonical per page ensures the correct version is prioritized.",
    status: "dismissed",
    impact: null,
  },
];

// ─── Plan Tabs ─────────────────────────────────────────────

export interface PlanTab {
  label: string;
  slug: string;
}

export const planTabs: PlanTab[] = [
  { label: "Fixes", slug: "fixes" },
  { label: "Strategic", slug: "strategic" },
];
