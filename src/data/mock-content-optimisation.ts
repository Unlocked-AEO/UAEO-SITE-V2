// ─── Content Optimisation (AEO Content Engine) mock data ───────────

export type ContentMode = "generate" | "optimize";

export type ContentFormat =
  | "blog-post"
  | "faq"
  | "comparison"
  | "pillar-page"
  | "how-to";

export type ContentTone = "technical" | "accessible" | "authoritative";

export interface ContentConfig {
  mode: ContentMode;
  brief: string;
  audience: string;
  sources: string;
  keywords: string;
  format: ContentFormat;
  tone: ContentTone;
  existingContent?: string;
  optimizationGoal?: string;
}

export const formatOptions: { value: ContentFormat; label: string; description: string }[] = [
  { value: "blog-post", label: "Blog Post", description: "Standard article, 800–1500 words" },
  { value: "faq", label: "FAQ Page", description: "Q&A blocks optimised for extraction" },
  { value: "comparison", label: "Comparison", description: "Vs. page, side-by-side structure" },
  { value: "pillar-page", label: "Pillar Page", description: "Long-form topical authority" },
  { value: "how-to", label: "How-To Guide", description: "Stepwise instructional content" },
];

export const toneOptions: { value: ContentTone; label: string }[] = [
  { value: "technical", label: "Technical" },
  { value: "accessible", label: "Accessible" },
  { value: "authoritative", label: "Authoritative" },
];

// ─── Processing Stage ─────────────────────────────────────────────

export interface ProcessingStep {
  key: string;
  label: string;
  description: string;
}

export const processingSteps: ProcessingStep[] = [
  { key: "entity", label: "Entity Recognition", description: "Identifying named entities and topic anchors" },
  { key: "citation", label: "Citation Signal Injection", description: "Layering statistics, sources and authority markers" },
  { key: "structure", label: "Q&A and Header Formatting", description: "Restructuring content for AI answer extraction" },
  { key: "authority", label: "Authority Layering", description: "Weaving in expertise and trust signals" },
  { key: "score", label: "AEO Score Calculation", description: "Scoring draft against proprietary framework" },
];

// ─── AEO Scoring ──────────────────────────────────────────────────

export interface AEOSignal {
  key: "entity" | "citation" | "structure" | "depth" | "freshness";
  label: string;
  description: string;
  score: number;
  maxScore: number;
}

export const aeoSignals: AEOSignal[] = [
  {
    key: "entity",
    label: "Entity Clarity",
    description: "Named entities, definitions and topic specificity — how clearly the content describes a subject AI can recognise.",
    score: 22,
    maxScore: 25,
  },
  {
    key: "citation",
    label: "Citation Signals",
    description: "Statistics, sources, author authority markers and structured data AI engines use to validate claims.",
    score: 21,
    maxScore: 25,
  },
  {
    key: "structure",
    label: "Answer Structure",
    description: "Q&A formatting, descriptive headers, scannable sections that match how AI extracts answers.",
    score: 18,
    maxScore: 20,
  },
  {
    key: "depth",
    label: "Topical Depth",
    description: "Coverage completeness relative to what AI engines expect for the topic.",
    score: 16,
    maxScore: 20,
  },
  {
    key: "freshness",
    label: "Freshness Signals",
    description: "Recency markers, publication dates and updated-content cues.",
    score: 9,
    maxScore: 10,
  },
];

export const totalAEOScore = aeoSignals.reduce((sum, s) => sum + s.score, 0);
export const maxAEOScore = aeoSignals.reduce((sum, s) => sum + s.maxScore, 0);

// ─── Mock Draft Output ────────────────────────────────────────────

export const mockDraft = `# Best CRM for Mid-Market SaaS Companies in 2026

**Last updated:** April 2026 · **Author:** Unlocked AEO Research Team

Mid-market SaaS companies — typically those with 50 to 500 employees — have distinct CRM requirements that differ from both small businesses and enterprise. This guide breaks down the leading options based on deployment speed, revenue operations fit, and native integration depth.

## What qualifies as a "mid-market CRM"?

A mid-market CRM is a customer relationship management platform designed for companies with 50–500 employees, annual recurring revenue between $10M and $200M, and sales teams of 10–100 reps. These platforms sit between SMB tools (HubSpot Starter, Pipedrive) and enterprise suites (Salesforce Enterprise, Microsoft Dynamics).

## Which CRM is best for mid-market SaaS companies?

For mid-market SaaS specifically, **HubSpot Professional** and **Salesforce Sales Cloud Professional** dominate. HubSpot wins on speed of deployment (typically 4–6 weeks) and marketing integration; Salesforce wins on customisation depth and reporting flexibility.

### HubSpot Professional

- Deployment time: 4–6 weeks average
- Pricing: $1,600/month for 5 seats
- Best for: Marketing-led SaaS with < 150 employees

### Salesforce Sales Cloud Professional

- Deployment time: 8–14 weeks average
- Pricing: $100/user/month
- Best for: Sales-led SaaS with complex pipelines

## How to choose between HubSpot and Salesforce

Choose HubSpot if your growth is marketing-led, your team is under 150, and you value time-to-value over deep customisation. Choose Salesforce if you have dedicated RevOps capacity, your pipeline has more than three stages of qualification, and you expect to scale past 300 employees within 24 months.

## Key decision criteria

1. **Revenue operations maturity** — do you have a dedicated RevOps function?
2. **Integration requirements** — which systems of record must the CRM talk to?
3. **Time-to-value constraint** — how quickly must the CRM be producing pipeline data?
4. **Customisation ceiling** — will standard objects meet your needs in 18 months?

## Sources

- G2 Mid-Market CRM Grid Report, Q1 2026
- Forrester Wave: CRM Suites for Midsize Organizations, 2026
- Gartner Magic Quadrant for Sales Force Automation, 2025`;

// ─── Optimisation Notes (what changed) ────────────────────────────

export interface OptimisationNote {
  category: "entity" | "citation" | "structure" | "depth" | "freshness";
  change: string;
  impact: string;
}

export const optimisationNotes: OptimisationNote[] = [
  {
    category: "structure",
    change: "Converted 3 declarative headers into question-form headers",
    impact: "Increases probability of being surfaced as a direct answer by +22%",
  },
  {
    category: "citation",
    change: "Added 3 authoritative sources (G2, Forrester, Gartner)",
    impact: "Improves trust signals that AI engines weight heavily",
  },
  {
    category: "entity",
    change: "Defined 'mid-market CRM' explicitly in the opening section",
    impact: "Gives AI a clear entity anchor for retrieval",
  },
  {
    category: "freshness",
    change: "Added 'Last updated: April 2026' recency marker",
    impact: "Signals currency — AI engines favour recent content",
  },
];

// ─── Iteration History ────────────────────────────────────────────

export interface IterationEntry {
  version: number;
  timestamp: string;
  score: number;
  feedback?: string;
}

// ─── Content Library ──────────────────────────────────────────────

export type LibraryStatus = "approved" | "draft" | "in-review" | "archived";

export interface LibraryItem {
  id: string;
  title: string;
  format: ContentFormat;
  mode: ContentMode;
  status: LibraryStatus;
  score: number;
  wordCount: number;
  updatedAt: string;
  createdAt: string;
  author: string;
  tags: string[];
  excerpt: string;
}

export const libraryItems: LibraryItem[] = [
  {
    id: "lib-01",
    title: "Best CRM for Mid-Market SaaS Companies in 2026",
    format: "pillar-page",
    mode: "generate",
    status: "approved",
    score: 86,
    wordCount: 1240,
    updatedAt: "2 hours ago",
    createdAt: "Apr 12, 2026",
    author: "Gabriel A.",
    tags: ["CRM", "Mid-Market", "B2B SaaS"],
    excerpt: "Mid-market SaaS companies have distinct CRM requirements that differ from both small businesses and enterprise...",
  },
  {
    id: "lib-02",
    title: "Marketing Attribution: A Practical FAQ for RevOps Leaders",
    format: "faq",
    mode: "generate",
    status: "approved",
    score: 91,
    wordCount: 880,
    updatedAt: "Yesterday",
    createdAt: "Apr 11, 2026",
    author: "Gabriel A.",
    tags: ["Attribution", "RevOps", "Marketing"],
    excerpt: "Attribution models answer the question: which marketing touchpoints deserve credit for a conversion?",
  },
  {
    id: "lib-03",
    title: "HubSpot vs Salesforce: An Honest Side-by-Side for 2026",
    format: "comparison",
    mode: "optimize",
    status: "in-review",
    score: 78,
    wordCount: 1620,
    updatedAt: "Yesterday",
    createdAt: "Apr 10, 2026",
    author: "Gabriel A.",
    tags: ["HubSpot", "Salesforce", "Comparison"],
    excerpt: "We rewrote our existing comparison page to strengthen entity clarity and inject third-party citation signals...",
  },
  {
    id: "lib-04",
    title: "What is Answer Engine Optimisation? A Definitive Guide",
    format: "pillar-page",
    mode: "generate",
    status: "approved",
    score: 94,
    wordCount: 2140,
    updatedAt: "3 days ago",
    createdAt: "Apr 9, 2026",
    author: "Gabriel A.",
    tags: ["AEO", "Guide", "Definition"],
    excerpt: "Answer Engine Optimisation (AEO) is the practice of structuring content to maximise citation probability in AI answer engines...",
  },
  {
    id: "lib-05",
    title: "How to Set Up a Lead Scoring Model (Step-by-Step)",
    format: "how-to",
    mode: "generate",
    status: "draft",
    score: 72,
    wordCount: 740,
    updatedAt: "4 days ago",
    createdAt: "Apr 8, 2026",
    author: "Gabriel A.",
    tags: ["Lead Scoring", "How-To"],
    excerpt: "Draft paused — needs stronger citation signals and a freshness marker before it clears the 80 threshold.",
  },
  {
    id: "lib-06",
    title: "Pricing Page Rewrite — Optimised for AI Citation",
    format: "blog-post",
    mode: "optimize",
    status: "approved",
    score: 88,
    wordCount: 540,
    updatedAt: "1 week ago",
    createdAt: "Apr 5, 2026",
    author: "Gabriel A.",
    tags: ["Pricing", "Optimize"],
    excerpt: "Restructured the live pricing page to answer 'how much does X cost' queries directly in the opening paragraph...",
  },
  {
    id: "lib-07",
    title: "Sales Enablement: What Works in 2026",
    format: "blog-post",
    mode: "generate",
    status: "archived",
    score: 81,
    wordCount: 1080,
    updatedAt: "2 weeks ago",
    createdAt: "Mar 28, 2026",
    author: "Gabriel A.",
    tags: ["Sales Enablement"],
    excerpt: "Archived after client shifted focus away from this topic. Score was solid — reusable in future campaigns.",
  },
  {
    id: "lib-08",
    title: "FAQ: Multi-Touch Attribution for B2B Marketers",
    format: "faq",
    mode: "optimize",
    status: "in-review",
    score: 83,
    wordCount: 690,
    updatedAt: "2 weeks ago",
    createdAt: "Mar 27, 2026",
    author: "Gabriel A.",
    tags: ["Attribution", "FAQ"],
    excerpt: "Converted existing marketing blog into Q&A format with explicit entity definitions for each attribution model...",
  },
];

export const libraryStatusConfig: Record<
  LibraryStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  approved: { label: "Approved", bg: "bg-teal/10", text: "text-teal", dot: "bg-teal" },
  "in-review": { label: "In Review", bg: "bg-[#FFF8E1]", text: "text-[#B28500]", dot: "bg-[#E8B923]" },
  draft: { label: "Draft", bg: "bg-[#F0F4F8]", text: "text-slate-muted", dot: "bg-slate-muted" },
  archived: { label: "Archived", bg: "bg-[#F5F5F5]", text: "text-[#8B95A5]", dot: "bg-[#8B95A5]" },
};

export const iterationHistory: IterationEntry[] = [
  { version: 1, timestamp: "2 min ago", score: 74 },
  { version: 2, timestamp: "1 min ago", score: 86, feedback: "Make it more technical and add comparison section" },
];
