// Help Centre page mock data

export interface HelpTopic {
  id: string;
  emoji: string;
  iconGradient: string;
  title: string;
  description: string;
  articleCount: number;
}

export interface PopularArticle {
  id: string;
  title: string;
  categoryLabel: string;
}

export interface SupportStat {
  value: string;
  label: string;
}

// ── Hero ────────────────────────────────────────────────────────────────

export const helpHero = {
  badge: "Help Centre",
  headline: "How can we help you?",
  subheadline:
    "Search our guides, FAQs, and documentation — answers in seconds.",
  searchPlaceholder:
    'Search for anything — "AEO score", "billing", "integrations"…',
};

// ── Topics ──────────────────────────────────────────────────────────────

export const topicsSection = {
  eyebrow: "Browse by Topic",
  headline: "Everything you need to know.",
};

export const helpTopics: HelpTopic[] = [
  {
    id: "getting-started",
    emoji: "🚀",
    iconGradient:
      "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(70.1% -0.112 -0.016) 100%)",
    title: "Getting Started",
    description:
      "Set up your account, run your first scan, and understand your dashboard in minutes.",
    articleCount: 8,
  },
  {
    id: "aeo-score",
    emoji: "📊",
    iconGradient:
      "linear-gradient(in oklab 135deg, oklab(59.7% 0.038 -0.220) 0%, oklab(51.1% 0.028 -0.228) 100%)",
    title: "Your AEO Score",
    description:
      "Understand how your score is calculated, what affects it, and how to track changes over time.",
    articleCount: 12,
  },
  {
    id: "citation-signals",
    emoji: "🔗",
    iconGradient:
      "linear-gradient(in oklab 135deg, oklab(76.9% 0.056 0.155) 0%, oklab(66.6% 0.083 0.134) 100%)",
    title: "Citation Signals",
    description:
      "Learn what authority, structure, entity clarity, and coverage signals mean for your brand.",
    articleCount: 10,
  },
  {
    id: "account-billing",
    emoji: "💳",
    iconGradient:
      "linear-gradient(in oklab 135deg, oklab(69.6% -0.142 0.045) 0%, oklab(59.6% -0.122 0.037) 100%)",
    title: "Account & Billing",
    description:
      "Manage your plan, update payment details, view invoices, and add or remove team members.",
    articleCount: 9,
  },
  {
    id: "integrations-api",
    emoji: "🔌",
    iconGradient:
      "linear-gradient(in oklab 135deg, oklab(65.6% 0.211 -0.021) 0%, oklab(52.5% 0.198 0.014) 100%)",
    title: "Integrations & API",
    description:
      "Connect your stack, set up webhooks, and automate with our REST API and native integrations.",
    articleCount: 14,
  },
  {
    id: "troubleshooting",
    emoji: "🛠️",
    iconGradient:
      "linear-gradient(in oklab 135deg, oklab(55.4% -0.009 -0.040) 0%, oklab(44.6% -0.008 -0.037) 100%)",
    title: "Troubleshooting",
    description:
      "Fix common issues, resolve scan errors, and get unstuck with step-by-step solutions.",
    articleCount: 6,
  },
];

// ── Popular articles ────────────────────────────────────────────────────

export const popularSection = {
  eyebrow: "Popular Articles",
  headline: "Most read this week.",
};

export const popularArticles: PopularArticle[] = [
  {
    id: "pa-1",
    title: "How to run your first AEO scan",
    categoryLabel: "Getting Started",
  },
  {
    id: "pa-2",
    title: "What does my AEO score actually measure?",
    categoryLabel: "AEO Score",
  },
  {
    id: "pa-3",
    title: "Understanding the citation signals breakdown",
    categoryLabel: "Citation Signals",
  },
  {
    id: "pa-4",
    title: "How to invite and manage team members",
    categoryLabel: "Account & Billing",
  },
  {
    id: "pa-5",
    title: "Why isn't my brand appearing in AI answers?",
    categoryLabel: "Troubleshooting",
  },
  {
    id: "pa-6",
    title: "How often do scans refresh automatically?",
    categoryLabel: "Getting Started",
  },
  {
    id: "pa-7",
    title: "Setting up the REST API and webhooks",
    categoryLabel: "Integrations & API",
  },
  {
    id: "pa-8",
    title: "Exporting your AEO report as a PDF",
    categoryLabel: "AEO Score",
  },
];

// ── CTA ─────────────────────────────────────────────────────────────────

export const helpCTA = {
  badge: "Still Need Help?",
  headline: "Can't find what you're looking for?",
  subheadline:
    "Our team responds in under 2 hours. We're here to help you get found, cited, and recommended.",
};

export const helpCTAButtons = [
  { label: "Chat with us", variant: "primary" as const, action: "open_chat" },
  {
    label: "Email support",
    variant: "ghost" as const,
    action: "email_support",
  },
  { label: "Book a call", variant: "ghost" as const, action: "book_call" },
];

export const helpStats: SupportStat[] = [
  { value: "<2h", label: "Avg. response time" },
  { value: "97%", label: "Satisfaction rate" },
  { value: "24/7", label: "Docs always available" },
];
