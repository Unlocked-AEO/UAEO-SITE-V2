// ─── Navigation ─────────────────────────────────────────────

export interface NavDropdownItem {
  label: string;
  href: string | null;
}

export interface NavItem {
  label: string;
  href: string | null;
  hasDropdown?: boolean;
  dropdownItems?: NavDropdownItem[];
}

export const navItems: NavItem[] = [
  { label: "Product", href: "/product", hasDropdown: true },
  { label: "How It Works", href: "/how-it-works" },
  {
    label: "Solutions",
    href: null,
    hasDropdown: true,
    dropdownItems: [
      { label: "For Brands", href: null },    // NOTE: No page exists
      { label: "For Agencies", href: null },   // NOTE: No page exists
      { label: "For Enterprise", href: null }, // NOTE: No page exists
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    href: null,
    hasDropdown: true,
    dropdownItems: [
      { label: "What is AEO", href: "/what-is-aeo" },
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: null },   // NOTE: No page exists
      { label: "About Us", href: "/about" },
    ],
  },
];

// ─── Hero ───────────────────────────────────────────────────

export const heroContent = {
  headline: "AI visibility infrastructure\nto grow your reach.",
  subtext:
    "Get found, cited, and recommended by ChatGPT, Perplexity, Gemini, Grok, Claude, and Copilot – from your first query to your millionth.",
  primaryCTA: "Get started ›",
  secondaryCTA: "Sign up with Google",
};

// ─── AI Engines (shared across logo bar + score card) ───────

export interface AIEngine {
  name: string;
  slug: string;
}

export const aiEngines: AIEngine[] = [
  { name: "ChatGPT", slug: "chatgpt" },
  { name: "Perplexity", slug: "perplexity" },
  { name: "Gemini", slug: "gemini" },
  { name: "Grok", slug: "grok" },
  { name: "Claude", slug: "claude" },
  { name: "Copilot", slug: "copilot" },
];

export const logoBarHeadline = "Trusted by teams already winning on AI";

// ─── AI Engine Scores (Visibility Score card) ───────────────

export interface EngineScore {
  name: string;
  score: number;
  change: number;
  slug: string;
}

export const engineScores: EngineScore[] = [
  { name: "ChatGPT", score: 78, change: 5, slug: "chatgpt" },
  { name: "Perplexity", score: 71, change: 3, slug: "perplexity" },
  { name: "Gemini", score: 65, change: 2, slug: "gemini" },
  { name: "Grok", score: 38, change: -8, slug: "grok" },
  { name: "Claude", score: 82, change: 6, slug: "claude" },
  { name: "Copilot", score: 59, change: 4, slug: "copilot" },
];

// ─── Solutions Section ──────────────────────────────────────

export const solutionsIntro = {
  label: "Solutions",
  headline: "Flexible solutions for\nevery visibility need.",
  description:
    "Whether you're a growing brand or an enterprise scaling AI search presence — Unlocked AEO has the tools and intelligence to get you cited.",
  cta: "Explore all solutions",
};

export const visibilityScoreCard = {
  label: "AI Visibility Score",
  headline: "Know exactly where you stand across every AI engine",
  description:
    "Real-time scoring across ChatGPT, Perplexity, Gemini, Grok, Claude, and Copilot. Track citation frequency, sentiment, and share-of-voice in one dashboard.",
  chartTitle: "Score by AI Engine",
};

export const contentIntelCard = {
  label: "Content Intelligence",
  headline: "AI-optimized content that gets cited, not ignored",
  description:
    "Our AI analyzes what answer engines cite and rewrites your content to match. Schema markup, entity signals, and factual density — automatically.",
  checklist: [
    "Entity clarity: Excellent",
    "Citation signals: 12 optimized",
    "Schema markup: FAQ + HowTo added",
  ],
  projection: "Projected citations: +340%",
};

// ─── Feature Cards ──────────────────────────────────────────

export const competitiveIntelCard = {
  title: "Competitive Intelligence",
  description:
    "See exactly which competitors AI engines recommend over you — and the gap analysis to close that distance fast.",
  stats: [
    { value: "3.2×", label: "avg cite gap" },
    { value: "14", label: "rivals tracked", highlight: true },
  ],
};

export const schemaCard = {
  title: "Schema & Structured Data",
  description:
    "Auto-generate and deploy Schema.org markup that signals authority to AI crawlers. No dev work required — one-click publish.",
  tags: [
    { label: "FAQ", variant: "purple" as const },
    { label: "HowTo", variant: "teal" as const },
    { label: "Organization", variant: "gray" as const },
    { label: "Product", variant: "gray" as const },
    { label: "Review", variant: "gray" as const },
  ],
};

export const reputationCard = {
  title: "Reputation Accuracy",
  description:
    "Correct misinformation, outdated facts, and hallucinations about your brand before they spread across millions of AI responses.",
  features: [
    "Real-time hallucination alerts",
    "Correction injection pipeline",
    "Brand truth verification layer",
  ],
};

// ─── Analytics Banner ───────────────────────────────────────

export interface FunnelStep {
  label: string;
  value: string;
  widthPercent: number;
}

export const analyticsBanner = {
  label: "Analytics & Reporting",
  headline: "Full-funnel AI attribution — from citation to conversion",
  description:
    "Track exactly which AI engine cited you, what they said, how many users clicked through, and what converted. The first platform built for AEO ROI.",
  cta: "Learn about Analytics ›",
  chartTitle: "Citation → Conversion funnel",
  chartPeriod: "Last 30 days",
  funnel: [
    { label: "AI Citations", value: "24,847", widthPercent: 100 },
    { label: "Click-throughs", value: "16,895", widthPercent: 68 },
    { label: "Engaged sessions", value: "7,183", widthPercent: 42 },
    { label: "Conversions", value: "3,022", widthPercent: 18 },
  ] as FunnelStep[],
};

// ─── Stats Section ──────────────────────────────────────────

export interface StatItem {
  value: string;
  description: string;
  color: string;
}

export const statsSection = {
  label: "By the numbers",
  headline: "The backbone of\nAI search visibility.",
  description:
    "Thousands of brands rely on Unlocked AEO to stay visible, accurate, and competitive as AI answer engines reshape how buyers find solutions.",
  cta: "Read customer stories",
  stats: [
    {
      value: "89%",
      description: "of customers see measurable citation growth within 30 days",
      color: "text-navy",
    },
    {
      value: "6.2×",
      description:
        "average increase in AI-referred organic traffic after 90 days",
      color: "text-teal",
    },
    {
      value: "12K+",
      description:
        "brands actively monitored across all major AI engine platforms",
      color: "text-navy",
    },
    {
      value: "$2.4B",
      description:
        "in AI-attributed revenue tracked through our analytics platform",
      color: "text-iris",
    },
  ] as StatItem[],
};

// ─── Enterprise Section ─────────────────────────────────────

export interface EnterpriseFeature {
  title: string;
  description: string;
}

export const enterpriseSection = {
  label: "Enterprise",
  headline: "Built for teams that take AI search seriously.",
  cta: "Contact sales",
  features: [
    {
      title: "Dedicated success team",
      description:
        "A named AEO strategist works alongside your team to accelerate results and guide strategy.",
    },
    {
      title: "Custom reporting & SLAs",
      description:
        "Board-ready dashboards, executive reporting, and guaranteed uptime SLAs for mission-critical visibility.",
    },
    {
      title: "Multi-brand management",
      description:
        "Manage dozens of brand entities, product lines, and regions from one unified workspace with granular permissions.",
    },
  ] as EnterpriseFeature[],
};

export const caseStudy = {
  label: "Case study",
  quote:
    '"We went from invisible to the #1 cited brand on Perplexity in our category — in 60 days."',
  description:
    "HorizonTech used Unlocked AEO's Content Intelligence and Reputation Accuracy tools to dominate AI search results across their B2B software vertical.",
  author: "Jordan L., VP Marketing",
  company: "HorizonTech",
  stats: [
    { value: "7×", label: "citations" },
    { value: "+218%", label: "organic" },
  ],
};

// ─── Testimonials ───────────────────────────────────────────

export interface Testimonial {
  engine: string;
  quote: string;
  authorName: string;
  authorInitials: string;
  authorRole: string;
  authorCompany: string;
}

export const testimonials: Testimonial[] = [
  {
    engine: "ChatGPT",
    quote:
      '"Unlocked AEO completely changed how we think about discoverability. ChatGPT now recommends us by name in every relevant query — it\'s the new SEO."',
    authorName: "Sarah R.",
    authorInitials: "SR",
    authorRole: "Head of Digital",
    authorCompany: "Meridian Health",
  },
  {
    engine: "Perplexity",
    quote:
      '"After 3 months with Unlocked AEO, Perplexity cites us in 4 out of 5 relevant queries. Our inbound leads from AI search are up 320%."',
    authorName: "Mike T.",
    authorInitials: "MT",
    authorRole: "CMO",
    authorCompany: "NovaBridge Analytics",
  },
  {
    engine: "Gemini",
    quote:
      '"Google\'s AI Overview and Gemini now feature our product comparisons prominently. Unlocked AEO made it happen in weeks, not months."',
    authorName: "Lisa K.",
    authorInitials: "LK",
    authorRole: "VP Growth",
    authorCompany: "CloudScale Systems",
  },
  {
    engine: "Grok",
    quote:
      '"Even on newer engines like Grok, we\'re already showing up. Unlocked AEO keeps us ahead of the curve across every AI platform."',
    authorName: "David P.",
    authorInitials: "DP",
    authorRole: "Director of SEO",
    authorCompany: "TrueNorth Media",
  },
  {
    engine: "Claude",
    quote:
      '"Claude\'s responses now consistently reference our research and guides. The content intelligence tools are a game-changer for thought leadership."',
    authorName: "Anna W.",
    authorInitials: "AW",
    authorRole: "Content Strategy Lead",
    authorCompany: "Vertex Partners",
  },
];

export const testimonialEngines = [
  "ChatGPT",
  "Perplexity",
  "Gemini",
  "Grok",
  "Claude",
];

// ─── Agency Section ─────────────────────────────────────────

export const agencySection = {
  label: "Agencies",
  headline: "A platform\nbuilt for Agencies.",
  description:
    "Manage AEO visibility across every client from one dashboard. White-label reports, multi-seat access, and agency-level analytics to demonstrate ROI at every account.",
  features: [
    "White-label client reports",
    "Multi-client dashboard management",
    "Branded PDF exports & scheduled delivery",
    "Agency-wide analytics & benchmarks",
  ],
  primaryCTA: "Explore agency plan ›",
  secondaryCTA: "Contact sales",
  codeFile: "aeo-api.js",
  codeLines: [
    { text: "// Initialize the Unlocked AEO client", isComment: true },
    { text: "import { UnlockedAEO } from '@unlocked/aeo-sdk';", isComment: false },
    { text: "", isComment: false },
    { text: "const aeo = new UnlockedAEO({", isComment: false },
    { text: "  apiKey: process.env.AEO_API_KEY,", isComment: false, indent: true },
    { text: "  brand: 'your-brand-slug'", isComment: false, indent: true },
    { text: "});", isComment: false, dim: true },
    { text: "", isComment: false },
    { text: "// Track citation events in real-time", isComment: true },
    { text: "const citations = await aeo.citations.list({", isComment: false },
    { text: "  engines: ['chatgpt', 'perplexity', 'gemini'],", isComment: false, indent: true },
    { text: "  from: '2024-01-01'", isComment: false, indent: true },
    { text: "});", isComment: false, dim: true },
    { text: "", isComment: false },
    {
      text: "// Response: 247 citations this week ↑ 34%",
      isComment: false,
      highlighted: true,
    },
  ],
};

export interface AgencyCard {
  title: string;
  description: string;
  cta: string;
  ctaColor: string;
  iconColor: string;
}

export const agencyCards: AgencyCard[] = [
  {
    title: "Client onboarding",
    description:
      "Get new clients live in minutes. Add a domain, run a baseline scan, and have a full AEO visibility report ready to present — no engineering needed.",
    cta: "See how onboarding works ›",
    ctaColor: "text-teal",
    iconColor: "bg-teal/15",
  },
  {
    title: "White-label reporting",
    description:
      "Deliver branded reports your clients trust. Customise colours, logo, and domain — every dashboard and PDF export looks like it came from your agency.",
    cta: "Explore white-label ›",
    ctaColor: "text-[#7C8CF8]",
    iconColor: "bg-iris/20",
  },
  {
    title: "Dedicated agency support",
    description:
      "Priority access to AEO specialists, guaranteed SLAs, and a dedicated account manager who knows your client roster inside out.",
    cta: "Talk to our team ›",
    ctaColor: "text-teal",
    iconColor: "bg-teal/10",
  },
];

// ─── Resources / Blog ───────────────────────────────────────

export interface BlogPost {
  category: string;
  title: string;
  description?: string;
  cta: string;
  featured?: boolean;
}

export const resourcesSection = {
  label: "Resources",
  headline: "What's happening in AEO",
  cta: "See all articles ›",
};

export const blogPosts: BlogPost[] = [
  {
    category: "Guide",
    title: "The Complete Guide to Answer Engine Optimization in 2025",
    description:
      "Everything you need to know about getting your brand cited by ChatGPT, Perplexity, Gemini, and every major AI answer engine this year.",
    cta: "Read the guide ›",
    featured: true,
  },
  {
    category: "Research",
    title: "How AI Engines Choose What to Cite: A Technical Deep-Dive",
    cta: "Read more ›",
  },
  {
    category: "Case Study",
    title: "How Meridian Health 7x'd Their AI Citations in 90 Days",
    cta: "Read more ›",
  },
  {
    category: "Product",
    title: "Introducing Live Citation Monitoring: Know When AI Mentions You",
    cta: "Read more ›",
  },
];

// ─── CTA Section ────────────────────────────────────────────

export const ctaSection = {
  label: "Get started today",
  headline: "Ready to become the brand AI recommends?",
  description:
    "Join thousands of businesses already winning citations across ChatGPT, Perplexity, Gemini, and more.",
  primaryCTA: "Get started free ›",
  secondaryCTA: "Contact sales",
  disclaimer: "No credit card required · Cancel anytime",
};

// ─── Footer ─────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string | null;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "For Brands", href: null },    // NOTE: No page exists
      { label: "For Agencies", href: null },   // NOTE: No page exists
      { label: "For Enterprise", href: null }, // NOTE: No page exists
      { label: "For Startups", href: null },   // NOTE: No page exists
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: null },   // NOTE: No page exists
      { label: "AEO Glossary", href: null },   // NOTE: No page exists
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerTagline =
  "AI visibility infrastructure for businesses that want to be found, cited, and recommended.";

export interface FooterLegalLink {
  label: string;
  href: string | null;
}

export const footerLegalLinks: FooterLegalLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: null },   // NOTE: No Cookies page exists
  { label: "Sitemap", href: null },   // NOTE: No Sitemap page exists
];
export const footerCopyright = "© 2025 Unlocked AEO Inc. All rights reserved.";
