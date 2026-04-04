// ─── Hero ───────────────────────────────────────────────────

export const faqHero = {
  badge: "FAQ",
  headline: "Frequently asked questions.",
  subtext:
    "Everything you want to know about Unlocked AEO, your score, and how AI search works.",
};

// ─── FAQ Categories & Items ────────────────────────────────

export interface FAQItem {
  question: string;
  answer?: string;
  defaultOpen?: boolean;
}

export interface FAQCategory {
  label: string;
  slug: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    label: "General",
    slug: "general",
    items: [
      {
        question: "What is AEO and why does it matter?",
        answer:
          "Answer Engine Optimization (AEO) is the discipline of making sure your brand gets found, cited, and recommended by AI engines like ChatGPT, Perplexity, Gemini, and Claude. As more users get answers directly from AI rather than clicking search results, being cited by AI is the new first-page ranking. Unlocked AEO gives you the tools to measure, understand, and improve that presence.",
        defaultOpen: true,
      },
      {
        question: "How is AEO different from SEO?",
        answer:
          "SEO optimizes for search engine rankings — you win by appearing high in a list of blue links. AEO optimizes for AI citations — you win when an AI engine picks your brand as the single definitive answer to a question. The signals are different: AEO cares about authority, entity clarity, structured content, and topical depth rather than backlinks and keyword density.",
        defaultOpen: true,
      },
      {
        question: "Which AI engines does Unlocked AEO track?",
      },
      {
        question: "How quickly can I see results after making changes?",
      },
    ],
  },
  {
    label: "Your AEO Score",
    slug: "your-aeo-score",
    items: [
      {
        question: "How is my AEO score calculated?",
        answer:
          "Your score is a composite of four citation signals: Authority & Trust (how consistently AI engines mention you), Content Structure (how well your content is formatted for AI comprehension), Entity Clarity (how distinctly your brand identity is defined), and Coverage & Depth (how thoroughly your expertise is represented). Each signal is weighted and combined into a single 0–100 score.",
        defaultOpen: true,
      },
      {
        question: "What's considered a good AEO score?",
      },
      {
        question: "How often is my score updated?",
      },
    ],
  },
  {
    label: "Getting Started",
    slug: "getting-started",
    items: [
      {
        question: "What do I need to get started?",
      },
      {
        question: "Can I track multiple brands or domains?",
      },
      {
        question: "How long does a scan take?",
      },
    ],
  },
  {
    label: "Billing & Plans",
    slug: "billing-plans",
    items: [
      {
        question: "Do you offer a free trial?",
        answer:
          "Yes — your first AEO scan is completely free, no credit card required. You'll see your full baseline score and a sample of your citation breakdown before choosing a plan.",
        defaultOpen: true,
      },
      {
        question: "Can I cancel anytime?",
      },
      {
        question: "What happens to my data if I cancel?",
      },
    ],
  },
  {
    label: "Integrations & API",
    slug: "integrations-api",
    items: [
      {
        question: "Is there a public API?",
      },
      {
        question: "Can I export my scan data?",
      },
    ],
  },
];

// ─── Support CTA ───────────────────────────────────────────

export const faqCTA = {
  badge: "Still Have Questions?",
  headline: "We're here to help.",
  description:
    "Can't find the answer you're looking for? Our team responds in under 2 hours.",
  primaryCTA: "Chat with support",
  secondaryCTA: "Browse Help Centre",
};
