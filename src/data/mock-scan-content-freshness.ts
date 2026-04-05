// ─── Content Freshness Score Hero ──────────────────────────

export interface ContentFreshnessScore {
  score: number;
  max: number;
  title: string;
  summary: string;
}

export const contentFreshnessScore: ContentFreshnessScore = {
  score: 77,
  max: 100,
  title: "Content Freshness Score",
  summary:
    "Your content freshness is moderate. Most of your core product pages are current, but 8 pages haven't been updated in over 6 months — AI engines deprioritise stale content when generating answers. Refreshing your aging and stale pages could meaningfully improve citation rates within 30 days.",
};

// ─── Freshness Stat Cards ──────────────────────────────────

export interface FreshnessStat {
  value: string;
  label: string;
  badge: string;
  iconBg: string;
  badgeBg: string;
  icon: "evergreen" | "time-sensitive";
}

export const freshnessStats: FreshnessStat[] = [
  { value: "34", label: "Evergreen pages", badge: "No expiry", iconBg: "#F0FDFA", badgeBg: "#F0FDFA", icon: "evergreen" },
  { value: "28", label: "Time-sensitive pages", badge: "Need monitoring", iconBg: "#FFF8F0", badgeBg: "#FFF8F0", icon: "time-sensitive" },
];

// ─── Page Freshness Table ──────────────────────────────────

export interface FreshnessPage {
  title: string;
  url: string;
}

export interface FreshnessCategory {
  status: string;
  count: number;
  description: string;
  dotColor: string;
  countColor: string;
  bg: string;
  pages: FreshnessPage[];
  moreCount: number | null;
}

export const freshnessCategories: FreshnessCategory[] = [
  {
    status: "Stale",
    count: 8,
    description: "Not updated in 180+ days",
    dotColor: "#EF4444",
    countColor: "#EF4444",
    bg: "#FFF5F5",
    pages: [
      { title: "What is Answer Engine Optimisation?", url: "acme-corp.com/blog/what-is-aeo" },
      { title: "2024 Industry Report: AI Search Trends", url: "acme-corp.com/reports/ai-search-2024" },
      { title: "How to Rank in ChatGPT Responses", url: "acme-corp.com/guides/chatgpt-ranking" },
      { title: "Brand Visibility in AI: A Complete Guide", url: "acme-corp.com/guides/ai-brand-visibility" },
      { title: "Perplexity vs ChatGPT: Which Drives More Traffic?", url: "acme-corp.com/blog/perplexity-vs-chatgpt" },
      { title: "Case Study: How Acme Grew AI Citations by 3x", url: "acme-corp.com/case-studies/citation-growth" },
      { title: "Schema Markup for AI Crawlers: Best Practices", url: "acme-corp.com/guides/schema-markup" },
      { title: "Understanding Gemini's Grounding Sources", url: "acme-corp.com/blog/gemini-grounding" },
    ],
    moreCount: null,
  },
  {
    status: "Aging",
    count: 12,
    description: "Not updated in 90–180 days",
    dotColor: "#F59E0B",
    countColor: "#F59E0B",
    bg: "#FFFBF0",
    pages: [
      { title: "AEO Glossary: 40 Terms Every Marketer Should Know", url: "acme-corp.com/glossary" },
      { title: "Competitive Intelligence in AI Search", url: "acme-corp.com/blog/competitive-intelligence" },
      { title: "How Claude Sources Information for Answers", url: "acme-corp.com/blog/claude-sourcing" },
      { title: "Why AI Engines Ignore Your Brand (And How to Fix It)", url: "acme-corp.com/blog/ai-brand-ignore" },
      { title: "The Role of E-E-A-T in AI Citation Decisions", url: "acme-corp.com/guides/eeat-ai-citations" },
    ],
    moreCount: 7,
  },
  {
    status: "Fresh",
    count: 42,
    description: "Updated within 90 days",
    dotColor: "#22C55E",
    countColor: "#22C55E",
    bg: "#F0FDF4",
    pages: [
      { title: "Unlocked AEO Platform Overview", url: "acme-corp.com/platform" },
      { title: "Pricing", url: "acme-corp.com/pricing" },
      { title: "AI Visibility Tracker — Feature Deep Dive", url: "acme-corp.com/features/ai-tracker" },
      { title: "March 2026 Product Changelog", url: "acme-corp.com/changelog/march-2026" },
    ],
    moreCount: 38,
  },
];
