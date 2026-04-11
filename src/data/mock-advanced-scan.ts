// ─── Page Header ───────────────────────────────────────────

export const advancedScanHeader = {
  title: "Advanced Settings",
  subtitle: "Configure scan context, prompts and variables",
};

// ─── Scan Variables ───────────────────────────────────────

export const scanVariablesSection = {
  sectionTitle: "Scan Variables",
  sectionSubtitle:
    "Some prompts from the prompt bank contain placeholder values like [location] or [brand]. The values you set here will replace those placeholders in the actual prompts.",
  industry: "SaaS / B2B Software",
};

export interface ScanVariable {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  hasIcon: boolean;
}

export const scanVariables: ScanVariable[] = [
  {
    label: "Primary Location",
    name: "primaryLocation",
    value: "United States",
    placeholder: "",
    hasIcon: true,
  },
  {
    label: "City / Region",
    name: "cityRegion",
    value: "",
    placeholder: "e.g. San Francisco, CA",
    hasIcon: false,
  },
];

// ─── Custom Prompts ────────────────────────────────────────

export const customPromptsSection = {
  title: "Custom Prompts",
  subtitle: "Write your own prompts to include in the scan",
  inputPlaceholder:
    "e.g. Does [brand] appear when someone asks for the best tool to improve AI search visibility?",
  variableHint:
    "Use [brand], [competitor], [location], [industry] and [primary audience] as dynamic variables",
};

export interface CustomPrompt {
  id: string;
  text: string;
}

export const customPrompts: CustomPrompt[] = [
  {
    id: "cp-1",
    text: "Is [brand] mentioned when someone searches for the top AEO tools recommended by AI assistants in [location]?",
  },
  {
    id: "cp-2",
    text: "What does [brand] do differently compared to [competitor 1] when it comes to content scoring for AI engines?",
  },
];

// ─── Prompt Bank ───────────────────────────────────────────

export const promptBankSection = {
  title: "Prompt Bank",
  subtitle:
    "Select prompts for your scan. Curated + custom must equal exactly 25.",
  totalSelected: 18,
  totalRequired: 25,
};

// ─── Prompt Focus Areas ────────────────────────────────────

export interface PromptFocus {
  id: string;
  title: string;
  description: string;
  icon: "discovery" | "employer" | "buyer" | "thought";
  selected: boolean;
}

export const promptFocusAreas: PromptFocus[] = [
  {
    id: "discovery",
    title: "Customer Discovery & Visibility",
    description:
      "How potential customers find and evaluate your brand through AI search",
    icon: "discovery",
    selected: true,
  },
  {
    id: "employer",
    title: "Employer Brand & Recruiting",
    description:
      "How job seekers and talent discover your company as an employer",
    icon: "employer",
    selected: false,
  },
  {
    id: "buyer",
    title: "B2B Buyer / Vendor Evaluation",
    description:
      "How business buyers compare and shortlist vendors in your category",
    icon: "buyer",
    selected: false,
  },
  {
    id: "thought",
    title: "Thought Leadership & Expert Authority",
    description:
      "How AI positions your brand's expertise and industry authority",
    icon: "thought",
    selected: false,
  },
];

// ─── Prompt Categories ─────────────────────────────────────

export interface PromptItem {
  id: string;
  text: string;
  selected: boolean;
}

export interface PromptCategory {
  id: string;
  name: string;
  selected: number;
  total: number;
  expanded: boolean;
  prompts: PromptItem[];
}

export const promptCategories: PromptCategory[] = [
  {
    id: "comparison",
    name: "Comparison & Alternatives",
    selected: 4,
    total: 5,
    expanded: true,
    prompts: [
      {
        id: "p1",
        text: "What are the best alternatives to [brand] for [primary audience]?",
        selected: true,
      },
      {
        id: "p2",
        text: "How does [brand] compare to [competitor 1] for [industry] teams?",
        selected: true,
      },
      {
        id: "p3",
        text: "Which [industry] platforms are most recommended by AI assistants?",
        selected: true,
      },
      {
        id: "p4",
        text: "What do users prefer between [brand] and [competitor 2]?",
        selected: true,
      },
      {
        id: "p5",
        text: "How does [brand] stack up against free alternatives in [location]?",
        selected: false,
      },
    ],
  },
  {
    id: "credentials",
    name: "Credentials & Authority",
    selected: 4,
    total: 4,
    expanded: false,
    prompts: [],
  },
  {
    id: "discovery-rec",
    name: "Discovery & Recommendation",
    selected: 5,
    total: 6,
    expanded: false,
    prompts: [],
  },
  {
    id: "hallucination",
    name: "Hallucination Risk",
    selected: 0,
    total: 3,
    expanded: false,
    prompts: [],
  },
  {
    id: "market",
    name: "Market Intelligence",
    selected: 0,
    total: 4,
    expanded: false,
    prompts: [],
  },
  {
    id: "pricing",
    name: "Pricing & Cost",
    selected: 3,
    total: 3,
    expanded: false,
    prompts: [],
  },
  {
    id: "problem-solution",
    name: "Problem / Solution",
    selected: 4,
    total: 5,
    expanded: false,
    prompts: [],
  },
  {
    id: "specific-info",
    name: "Specific Information",
    selected: 0,
    total: 4,
    expanded: false,
    prompts: [],
  },
  {
    id: "trust",
    name: "Trust & Reputation",
    selected: 3,
    total: 3,
    expanded: false,
    prompts: [],
  },
];
