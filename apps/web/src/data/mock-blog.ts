// Blog / AEO Insights page mock data

export interface BlogCategory {
  label: string;
  slug: string;
}

export interface BlogAuthor {
  name: string;
  initials: string;
  gradient: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: BlogAuthor;
  date: string;
  readTime: string;
  accentGradient: string;
  categoryBg: string;
  categoryColor: string;
  badge?: { label: string; bg: string; border: string; color: string };
}

export interface CitationBarItem {
  engine: string;
  iconColor: string;
  iconBorder?: string;
  percentage: number;
  barColor: string;
}

export interface FeaturedArticle {
  title: string;
  excerpt: string;
  category: BlogCategory;
  categoryBg: string;
  categoryColor: string;
  author: BlogAuthor;
  date: string;
  readTime: string;
  citationBars: CitationBarItem[];
  citationFooter: string;
}

// ── Hero ────────────────────────────────────────────────────────────────

export const blogHero = {
  badge: "AEO Insights",
  headline: "The blog for AI search visibility",
  subheadline:
    "Guides, research, and updates to help your brand get found, cited, and recommended by AI.",
};

export const blogCategories: BlogCategory[] = [
  { label: "All", slug: "all" },
  { label: "AEO Guide", slug: "aeo-guide" },
  { label: "Research", slug: "research" },
  { label: "Strategy", slug: "strategy" },
  { label: "Technical", slug: "technical" },
  { label: "Product", slug: "product" },
  { label: "Case Study", slug: "case-study" },
];

// ── Featured article ────────────────────────────────────────────────────

export const featuredArticle: FeaturedArticle = {
  title: "How AI Engines Decide What to Cite: A Technical Deep Dive",
  excerpt:
    "We analyzed 50,000 AI-generated responses across six engines to understand exactly what signals drive citation decisions — and what brands can do to influence them.",
  category: { label: "Research", slug: "research" },
  categoryBg: "bg-[#EEF2FF]",
  categoryColor: "text-[#6366F1]",
  author: {
    name: "Sarah Chen",
    initials: "SC",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(26% -0.019 -0.057) 100%)",
  },
  date: "Jan 15, 2025",
  readTime: "12 min read",
  citationBars: [
    {
      engine: "ChatGPT",
      iconColor: "#10A37F",
      percentage: 84,
      barColor: "#4ECDC4",
    },
    {
      engine: "Perplexity",
      iconColor: "#1C1C1C",
      iconBorder: "rgba(255,255,255,0.2)",
      percentage: 71,
      barColor: "#4ECDC4",
    },
    {
      engine: "Claude",
      iconColor: "#D97757",
      percentage: 67,
      barColor: "#4ECDC4",
    },
    {
      engine: "Grok",
      iconColor: "#000000",
      percentage: 38,
      barColor: "#FF9F43",
    },
  ],
  citationFooter: "Based on 50,000 analyzed responses",
};

// ── Article grid ────────────────────────────────────────────────────────

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    title: "The Complete Guide to Answer Engine Optimization in 2025",
    excerpt:
      "Everything you need to know about being found, cited, and recommended by ChatGPT, Perplexity, and every major AI answer engine.",
    category: { label: "AEO GUIDE", slug: "aeo-guide" },
    categoryBg: "bg-[#F0FDFA]",
    categoryColor: "text-teal",
    author: {
      name: "Marcus Reid",
      initials: "MR",
      gradient:
        "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(26% -0.019 -0.057) 100%)",
    },
    date: "Feb 3",
    readTime: "8 min",
    accentGradient:
      "linear-gradient(in oklab 90deg, oklab(77.6% -0.110 -0.017) 0%, oklab(74.6% -0.121 -0.016) 100%)",
  },
  {
    id: "2",
    title: "Why Your Brand Might Be Completely Invisible to ChatGPT",
    excerpt:
      "Most brands assume AI knows who they are. The data tells a different story — and fixing it is simpler than you think.",
    category: { label: "STRATEGY", slug: "strategy" },
    categoryBg: "bg-[#EFF6FF]",
    categoryColor: "text-[#3B82F6]",
    author: {
      name: "James Park",
      initials: "JP",
      gradient:
        "linear-gradient(in oklab 135deg, oklab(62.3% -0.033 -0.185) 0%, oklab(58.5% 0.025 -0.202) 100%)",
    },
    date: "Jan 28",
    readTime: "5 min",
    accentGradient:
      "linear-gradient(in oklab 90deg, oklab(62.3% -0.033 -0.185) 0%, oklab(58.5% 0.025 -0.202) 100%)",
  },
  {
    id: "3",
    title: "Introducing Live Citation Monitoring: Know When AI Mentions You",
    excerpt:
      "Real-time alerts every time ChatGPT, Perplexity, or Gemini cites your brand — accurate sentiment and context included.",
    category: { label: "PRODUCT", slug: "product" },
    categoryBg: "bg-[#ECFDF5]",
    categoryColor: "text-[#10B981]",
    author: {
      name: "Aisha Lawson",
      initials: "AL",
      gradient:
        "linear-gradient(in oklab 135deg, oklab(69.6% -0.142 0.045) 0%, oklab(26% -0.019 -0.057) 100%)",
    },
    date: "Jan 22",
    readTime: "3 min",
    accentGradient:
      "linear-gradient(in oklab 90deg, oklab(69.6% -0.142 0.045) 0%, oklab(59.6% -0.122 0.037) 100%)",
    badge: {
      label: "NEW",
      bg: "bg-[#ECFDF5]",
      border: "border-[#BBF7D0]",
      color: "text-[#10B981]",
    },
  },
  {
    id: "4",
    title:
      "How Perplexity Chooses Sources — and What It Means for Your Brand",
    excerpt:
      "Perplexity's source weighting model is fundamentally different from Google's. Here's what our research found.",
    category: { label: "RESEARCH", slug: "research" },
    categoryBg: "bg-[#F5F3FF]",
    categoryColor: "text-[#8B5CF6]",
    author: {
      name: "Sarah Chen",
      initials: "SC",
      gradient:
        "linear-gradient(in oklab 135deg, oklab(60.6% 0.085 -0.202) 0%, oklab(26% -0.019 -0.057) 100%)",
    },
    date: "Jan 18",
    readTime: "6 min",
    accentGradient:
      "linear-gradient(in oklab 90deg, oklab(60.6% 0.085 -0.202) 0%, oklab(70.9% 0.064 -0.146) 100%)",
  },
  {
    id: "5",
    title:
      "E-E-A-T Signals That Actually Move the Needle for AI Visibility",
    excerpt:
      "Not all E-E-A-T signals are equal. We ranked 24 signals by their actual impact on AI citation rates across 6 engines.",
    category: { label: "TECHNICAL", slug: "technical" },
    categoryBg: "bg-[#FFFBEB]",
    categoryColor: "text-[#D97706]",
    author: {
      name: "Dev Kumar",
      initials: "DK",
      gradient:
        "linear-gradient(in oklab 135deg, oklab(76.9% 0.056 0.155) 0%, oklab(26% -0.019 -0.057) 100%)",
    },
    date: "Jan 10",
    readTime: "7 min",
    accentGradient:
      "linear-gradient(in oklab 90deg, oklab(76.9% 0.056 0.155) 0%, oklab(83.7% 0.016 0.164) 100%)",
  },
  {
    id: "6",
    title:
      "From Zero to #1: How Acme Corp Became the Brand AI Recommends",
    excerpt:
      "In 60 days, Acme went from invisible to the most-cited brand in their category on Perplexity. Here's exactly what they did.",
    category: { label: "CASE STUDY", slug: "case-study" },
    categoryBg: "bg-[#FDF2F8]",
    categoryColor: "text-[#EC4899]",
    author: {
      name: "James Park",
      initials: "JP",
      gradient:
        "linear-gradient(in oklab 135deg, oklab(65.6% 0.211 -0.021) 0%, oklab(26% -0.019 -0.057) 100%)",
    },
    date: "Jan 6",
    readTime: "9 min",
    accentGradient:
      "linear-gradient(in oklab 90deg, oklab(65.6% 0.211 -0.021) 0%, oklab(64.5% 0.207 0.061) 100%)",
  },
];

// ── Newsletter ──────────────────────────────────────────────────────────

export const blogNewsletter = {
  badge: "Newsletter",
  headline: "Stay ahead of AI search",
  subheadline:
    "Weekly insights on AEO, AI engine updates, and citation strategies. No fluff — just what moves the needle.",
  placeholder: "your@email.com",
  buttonLabel: "Subscribe",
  footnote: "4,200+ subscribers · Unsubscribe anytime",
};
