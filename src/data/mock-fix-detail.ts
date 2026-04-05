// ─── Expanded Fix Detail ───────────────────────────────────

export interface FixStep {
  number: number;
  text: string;
}

export interface ContentFix {
  id: string;
  url: string;
  current: string;
  suggested: string;
}

export interface ImpactMetric {
  label: string;
  from: string;
  to: string;
  toColor: string;
  progressPercent: number;
  progressColor: string;
  projectedLabel: string;
}

export interface EffortEstimate {
  level: string;
  hours: string;
}

export interface ExpandedFixData {
  whyItMatters: string;
  steps: FixStep[];
  contentFixes: ContentFix[];
  impactMetrics: ImpactMetric[];
  effort: EffortEstimate;
}

export const expandedFixData: ExpandedFixData = {
  whyItMatters:
    "Meta descriptions are one of the first signals LLMs use when deciding if a page is relevant to a query. Vague or keyword-stuffed descriptions cause AI engines to skip your content entirely — even when your page has the right answer. Rewriting them to directly address user intent can increase your match rate by up to 18% in AI-generated results.",
  steps: [
    {
      number: 1,
      text: "Audit your top 20 pages using a crawl tool — identify all meta descriptions under 120 characters or containing keyword stuffing.",
    },
    {
      number: 2,
      text: "Rewrite each description as a direct answer to the primary query that page targets — lead with the most specific, useful detail.",
    },
    {
      number: 3,
      text: "Keep descriptions between 140–160 characters. Include the core entity (product, topic, or service) in the first 60 characters.",
    },
    {
      number: 4,
      text: "Deploy changes and re-run your AEO scan after 7 days to measure the improvement in AI snippet match rate.",
    },
  ],
  contentFixes: [
    {
      id: "cf1",
      url: "acme-corp.com/pricing",
      current:
        'Best pricing plans for businesses. Affordable. Flexible. Try now.',
      suggested:
        'Compare Acme Corp pricing plans — from $29/mo for startups to enterprise contracts with SLA. No setup fees.',
    },
    {
      id: "cf2",
      url: "acme-corp.com/features",
      current:
        'Powerful features for teams. Collaboration tools, analytics, integrations and more.',
      suggested:
        'Acme Corp features: real-time collaboration, 50+ integrations, AI-powered analytics, and role-based access — built for teams of 5–500.',
    },
  ],
  impactMetrics: [
    {
      label: "AEO Score",
      from: "62",
      to: "80",
      toColor: "#0D9488",
      progressPercent: 62,
      progressColor: "teal",
      projectedLabel: "+18 points projected",
    },
    {
      label: "AI Snippet Match Rate",
      from: "34%",
      to: "52%",
      toColor: "#059669",
      progressPercent: 34,
      progressColor: "green",
      projectedLabel: "+18% match rate projected",
    },
  ],
  effort: {
    level: "Medium",
    hours: "~4 hrs of work",
  },
};
