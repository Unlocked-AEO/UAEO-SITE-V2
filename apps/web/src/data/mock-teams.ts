// ─── Hero ───────────────────────────────────────────────────

export const teamsHero = {
  badge: "Teams We Work With",
  headline: "Real teams.\nReal AI visibility results.",
  subtext:
    "From fast-growing academies to knowledge platforms and B2B teams — Unlocked AEO helps every kind of organization get found, cited, and recommended by AI.",
};

// ─── Featured Teams ────────────────────────────────────────

export interface FeaturedTeam {
  name: string;
  initials: string;
  category: string;
  gradient: string;
  shadow: string;
}

export const trustedLabel = "Trusted by teams building with us";

export const featuredTeams: FeaturedTeam[] = [
  {
    name: "Tshala Knowledge",
    initials: "TK",
    category: "Knowledge Platform",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(42.4% -0.014 -0.180) 0%, oklab(62.3% -0.033 -0.185) 100%)",
    shadow: "#3B82F640 0px 8px 24px",
  },
  {
    name: "FutureFit Academy",
    initials: "FA",
    category: "Training Academy",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(59.6% -0.122 0.037) 0%, oklab(77.6% -0.110 -0.017) 100%)",
    shadow: "#05966940 0px 8px 24px",
  },
  {
    name: "TeamZold",
    initials: "TZ",
    category: "B2B Platform",
    gradient:
      "linear-gradient(in oklab 135deg, oklab(54.1% 0.096 -0.227) 0%, oklab(62.7% 0.130 -0.193) 100%)",
    shadow: "#7C3AED40 0px 8px 24px",
  },
];

// ─── CTA ───────────────────────────────────────────────────

export const teamsCTA = {
  badge: "Join them",
  headline: "Your team could be next.",
  description:
    "See exactly where AI mentions you, where it doesn't, and what to do about it — in your first scan.",
  primaryCTA: "Get your free scan ›",
  secondaryCTA: "Talk to sales",
};
