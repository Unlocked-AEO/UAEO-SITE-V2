// ─── Hero ───────────────────────────────────────────────────

export const aboutHero = {
  badge: "About Us",
  headline:
    "We're building the infrastructure for AI search visibility.",
  subtext:
    "Unlocked AEO was founded on a simple belief: every brand deserves to be found, cited, and recommended by AI — not just the ones that got lucky.",
};

export interface HeroStat {
  value: string;
  label: string;
  variant: "light" | "teal";
}

export const heroStats: HeroStat[] = [
  { value: "2025", label: "Founded", variant: "light" },
  { value: "TO", label: "TORONTO", variant: "light" },
  { value: "12K+", label: "Brands tracked", variant: "teal" },
];

// ─── Our Story ─────────────────────────────────────────────

export const storySection = {
  label: "Our Story",
  headline: "Built because AI search had no visibility layer.",
  paragraphs: [
    "When ChatGPT went mainstream, we noticed something alarming: brands that had spent years perfecting their Google SEO were suddenly invisible in AI-generated answers — and had no idea.",
    "We built Unlocked AEO to be the first platform that lets you measure, understand, and improve your presence across every major AI engine — so you're never caught off guard again.",
  ],
};

export interface ProblemItem {
  text: string;
  stat: string;
  variant: "problem" | "solution";
}

export const problemCard = {
  title: "The Problem We Saw",
  items: [
    { text: "Brand invisible to ChatGPT", stat: "0%", variant: "problem" },
    { text: "Competitor cited instead", stat: "84%", variant: "problem" },
    { text: "No tools to diagnose it", stat: "∅", variant: "problem" },
    { text: "Unlocked AEO changes this", stat: "✓", variant: "solution" },
  ] as ProblemItem[],
};

// ─── Values ────────────────────────────────────────────────

export interface Value {
  title: string;
  description: string;
  icon: "clock" | "arrow" | "star";
}

export const valuesSection = {
  badge: "What We Believe",
  headline: "Principles that guide everything we build.",
};

export const values: Value[] = [
  {
    title: "Transparency first",
    description:
      "No black boxes. You should always understand exactly why AI recommends your competitors — and exactly what to do about it.",
    icon: "clock",
  },
  {
    title: "Action over insight",
    description:
      "Data is worthless without direction. Every report we generate comes with specific, prioritized steps to actually move the needle.",
    icon: "arrow",
  },
  {
    title: "Speed is a feature",
    description:
      "AI search evolves weekly. We scan continuously so your brand is never more than 24 hours behind the latest model behavior.",
    icon: "star",
  },
];

// ─── Stats Banner ──────────────────────────────────────────

export interface AboutStat {
  value: string;
  label: string;
  color: "white" | "teal";
}

export const aboutStats: AboutStat[] = [
  { value: "12K+", label: "Brands Tracked", color: "white" },
  { value: "89%", label: "See score lift in 60 days", color: "teal" },
  { value: "6", label: "AI Engines Monitored", color: "white" },
  { value: "$2.4B", label: "Revenue influenced", color: "white" },
];

// ─── Team ──────────────────────────────────────────────────

export interface TeamMember {
  name: string;
  initials: string;
  role: string;
  bio: string;
  gradient: string;
}

export const teamSection = {
  badge: "The Team",
  headline: "The people behind the platform.",
};

export const teamMembers: TeamMember[] = [
  {
    name: "Gabriel Lockstone",
    initials: "GL",
    role: "Co-founder & CEO",
    bio: "Founder with a track record of building from 0 to 1 across B2B and consumer ventures.",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(26% -0.019 -0.057) 0%, oklab(32.5% -0.023 -0.085) 60%, oklab(77.6% -0.110 -0.017) 100%)",
  },
  {
    name: "Lucas Coulson",
    initials: "LC",
    role: "Co-founder & CTO",
    bio: "Full-stack engineer and systems architect. Turns complex AI infrastructure into fast, reliable product.",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(25.5% 0.012 -0.092) 0%, oklab(32.5% -0.023 -0.085) 60%, oklab(77.6% -0.110 -0.017) 100%)",
  },
  {
    name: "Zach Gould",
    initials: "ZG",
    role: "Head of Product & Innovation",
    bio: "Product leader obsessed with turning user insights into elegant, high-impact experiences.",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(26% -0.019 -0.057) 0%, oklab(38.6% -0.058 -0.009) 60%, oklab(77.6% -0.110 -0.017) 100%)",
  },
];

// ─── Advisors ──────────────────────────────────────────────

export interface Advisor {
  name: string;
  initials: string;
  title: string;
  bio: string;
  gradient: string;
}

export const advisorsSection = {
  badge: "Advisors",
  headline: "Backed by people who've done it.",
};

export const advisors: Advisor[] = [
  {
    name: "Adrian Krebs",
    initials: "AK",
    title: "Entrepreneur & Engineer",
    bio: "Serial entrepreneur with 10+ years building web platforms and startup ecosystems. Co-founded Coachable Technologies, former BlackBerry software developer, and current Program Lead at Wilfrid Laurier's StartUp Lab.",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(26% -0.019 -0.057) 0%, oklab(32.5% -0.023 -0.085) 100%)",
  },
  {
    name: "Hussain Phalasiya",
    initials: "HP",
    title: "Founder & AI Operator",
    bio: "Founder & CEO of Visora AI with enterprise experience from TD Lab, American Express, and Ericsson. Deep roots in the Waterloo tech ecosystem and a track record of turning AI ideas into real products.",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(25.5% 0.012 -0.092) 0%, oklab(32.5% -0.023 -0.085) 100%)",
  },
  {
    name: "Nancy Campbell",
    initials: "NC",
    title: "B2B Marketing Strategist",
    bio: "Founder of 10Marketing Consulting. Drives revenue growth through brand development, strategic marketing, and product launches. Brings deep B2B expertise to help scaling companies expand market share.",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(38.6% -0.058 -0.009) 0%, oklab(77.6% -0.110 -0.017) 100%)",
  },
  {
    name: "Ran Feldesh",
    initials: "RF",
    title: "AI Researcher & Operator",
    bio: "Teaches AI at the graduate level and has shipped production systems at Shopify, Intel, MIT, and CERN. Currently building Cogitat to apply AI to capital allocation in ways not previously possible.",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(35.9% 0.020 -0.134) 0%, oklab(32.5% -0.023 -0.085) 100%)",
  },
  {
    name: "Michael Brown",
    initials: "MB",
    title: "Security Executive",
    bio: "Principal of Polar Analysis and former CTO & Co-Founder of ISARA Corporation, a global leader in quantum-safe cryptography. Founding member of BlackBerry's product security practice with 20+ years in security leadership.",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(26% -0.019 -0.057) 0%, oklab(34.6% -0.018 -0.071) 100%)",
  },
  {
    name: "Serge Valente",
    initials: "SV",
    title: "Strategic Advisor",
    bio: "Industry-recognized AVP and Director with 20+ years of global experience in strategic management and client transformation across asset management, pensions, and investment institutions.",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(37.8% 0.068 -0.166) 0%, oklab(35.9% 0.020 -0.134) 100%)",
  },
  {
    name: "Jason Whalen",
    initials: "JW",
    title: "Entrepreneur & Program Builder",
    bio: "Manager of Laurier's StartUp Lab for 6+ years and founder of two businesses — including Breakaway English Academy, which grew 40–60% YoY before its sale. Brings an MBA and deep expertise in entrepreneurship programming, operations, and business growth.",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(52% -0.068 -0.064) 0%, oklab(77.6% -0.110 -0.017) 100%)",
  },
];

// ─── Hiring CTA ────────────────────────────────────────────

export const hiringCTA = {
  headline: "We're hiring.\nCome build with us.",
  description:
    "We're a small team with a huge mission. If you care about the future of AI search and want to make a real impact, we'd love to talk.",
  primaryCTA: "View open roles ›",
  secondaryCTA: "Contact us",
};
