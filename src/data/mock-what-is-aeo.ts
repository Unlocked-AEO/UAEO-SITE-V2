// ─── Hero ───────────────────────────────────────────────────

export const aeoHero = {
  badge: "Answer Engine Optimization",
  headline: "What is AEO?",
  subtext:
    "AEO is the practice of optimizing your brand to be found, cited, and recommended by AI answer engines — the new front door to discovery.",
  primaryCTA: "See your AEO score ›",
  secondaryCTA: "Learn how it works ↓",
};

// ─── Definition Section ─────────────────────────────────────

export const definitionSection = {
  label: "The Definition",
  quote:
    '"AEO is to AI search what SEO was to Google — except the stakes are higher and the window to act is now."',
  paragraphs: [
    "When someone asks ChatGPT, Perplexity, or Gemini a question, the AI doesn't return ten blue links. It returns one answer — and it cites specific brands, products, and sources. AEO is the discipline of making sure your brand is the one that gets cited.",
    "Unlike traditional SEO, AEO isn't about ranking — it's about being the authoritative, trusted, clearly-structured source that AI engines pull from when constructing their responses.",
  ],
};

export interface HowAEOStep {
  number: number;
  title: string;
  description: string;
  variant: "navy" | "teal" | "gradient";
}

export const howAEOSteps: HowAEOStep[] = [
  {
    number: 1,
    title: "User asks AI a question",
    description: '"What\'s the best platform for AI search visibility?"',
    variant: "navy",
  },
  {
    number: 2,
    title: "AI scans its training data & live sources",
    description:
      "It evaluates authority, clarity, and relevance of content about your brand.",
    variant: "teal",
  },
  {
    number: 3,
    title: "Your brand gets cited — or doesn't",
    description:
      "AEO is how you make sure you're the answer, not your competitor.",
    variant: "gradient",
  },
];

// ─── AEO vs SEO Comparison ─────────────────────────────────

export const comparisonSection = {
  badge: "AEO vs SEO",
  headline: "The rules of search have changed.",
};

export const seoItems: string[] = [
  "Ranks in Google search results",
  "Optimized for keywords & crawlers",
  "Returns 10 blue links",
  "Users click through to find answers",
  "Measured by rank position & traffic",
  "Competitor wins = lower rank",
];

export const aeoItems: string[] = [
  "Gets cited in AI-generated answers",
  "Optimized for AI comprehension & trust",
  "Returns one definitive recommended answer",
  "AI surfaces the answer directly — your brand wins",
  "Measured by citation rate & visibility score",
  "Competitor wins = your brand disappears entirely",
];

// ─── Citation Signals ───────────────────────────────────────

export const citationSignalsSection = {
  badge: "Citation Signals",
  headline: "What makes AI cite your brand?",
};

export interface CitationSignal {
  title: string;
  description: string;
  icon: "star" | "structure" | "entity" | "depth";
}

export const citationSignals: CitationSignal[] = [
  {
    title: "Authority & Trust",
    description:
      "AI engines favor brands with established credibility — consistent mentions across reputable sources, expert citations, and verifiable claims about who you are and what you do.",
    icon: "star",
  },
  {
    title: "Content Structure",
    description:
      "Well-structured content with clear headings, FAQ schema, and direct answers to questions is dramatically more likely to be cited. AI needs to parse your content — make it easy.",
    icon: "structure",
  },
  {
    title: "Entity Clarity",
    description:
      "AI engines build a model of who you are as an entity. Clear, consistent brand identity — what you do, who you serve, your differentiators — directly determines how confidently AI can reference you.",
    icon: "entity",
  },
  {
    title: "Coverage & Depth",
    description:
      "AI prioritizes sources that cover a topic thoroughly. Thin content gets ignored. Brands that go deep on their area of expertise — with data, examples, and clear POV — get cited far more often.",
    icon: "depth",
  },
];

// ─── Why Now Stats ──────────────────────────────────────────

export const whyNowSection = {
  badge: "Why Now",
  headline: "AI search isn't coming. It's here.",
};

export interface WhyNowStat {
  value: string;
  description: string;
  highlight: boolean;
}

export const whyNowStats: WhyNowStat[] = [
  {
    value: "40%",
    description: "of all searches now\nuse AI-assisted results",
    highlight: true,
  },
  {
    value: "73%",
    description: "of B2B buyers use AI\nbefore making a purchase",
    highlight: false,
  },
  {
    value: "6",
    description: "major AI engines are\ncompeting to answer your audience",
    highlight: false,
  },
  {
    value: "1",
    description: "brand gets cited.\nIs it yours?",
    highlight: true,
  },
];

// ─── How We Help ────────────────────────────────────────────

export const howWeHelpSection = {
  badge: "How We Help",
  headline: "Unlocked AEO is your AEO command center.",
};

export interface HelpCard {
  title: string;
  description: string;
}

export const helpCards: HelpCard[] = [
  {
    title: "Measure",
    description:
      "See exactly how visible your brand is across ChatGPT, Perplexity, Gemini, Grok, Claude, and Copilot — with a single unified score and per-engine breakdown.",
  },
  {
    title: "Understand",
    description:
      "Diagnose exactly why you're being cited — or not. See which content signals are working, which gaps are hurting you, and where your competitors are beating you.",
  },
  {
    title: "Improve",
    description:
      "Get a prioritized action plan — specific, ranked changes you can make to your content, structure, and entity signals to lift your score and get cited more often.",
  },
];

// ─── CTA Section ────────────────────────────────────────────

export const aeoCTA = {
  badge: "Get Started",
  headline: "Ready to own your\nAI visibility?",
  subtext:
    "Run your first AEO scan in 60 seconds and see exactly where you stand across every major AI engine.",
  primaryCTA: "Get your free AEO score ›",
  secondaryCTA: "Talk to our team",
};
