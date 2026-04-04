// ─── Hero ───────────────────────────────────────────────────

export const pricingHero = {
  badge: "Pricing",
  headline: "Simple, transparent pricing.",
  subtext: "No contracts. No surprises. Scale when you're ready.",
  toggleLabels: { monthly: "Monthly", annual: "Annual" },
  annualDiscount: "Save 20%",
};

// ─── Pricing Plans ──────────────────────────────────────────

export interface PricingFeature {
  text: string;
}

export interface PricingPlan {
  name: string;
  monthlyPrice: number | null;
  billingNoteMonthly: string;
  billingNoteAnnual: string;
  ctaLabel: string;
  ctaAction: string;
  features: PricingFeature[];
  highlighted: boolean;
  badge?: string;
  variant: "light" | "dark" | "outline";
}

/** Annual discount multiplier */
export const ANNUAL_DISCOUNT = 0.8;

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: 89.99,
    billingNoteMonthly: "Billed monthly",
    billingNoteAnnual: "Billed annually",
    ctaLabel: "Get started",
    ctaAction: "start_starter_plan",
    highlighted: false,
    variant: "light",
    features: [
      { text: "1 brand tracked" },
      { text: "6 AI engines monitored" },
      { text: "Weekly scans" },
      { text: "AEO Score dashboard" },
      { text: "Citation signals breakdown" },
      { text: "PDF report export" },
      { text: "Email support" },
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 299.99,
    billingNoteMonthly: "Billed monthly",
    billingNoteAnnual: "Billed annually",
    ctaLabel: "Get started",
    ctaAction: "start_pro_plan",
    highlighted: true,
    badge: "MOST POPULAR",
    variant: "dark",
    features: [
      { text: "5 brands tracked" },
      { text: "6 AI engines monitored" },
      { text: "Daily scans" },
      { text: "Everything in Starter" },
      { text: "Competitive intelligence" },
      { text: "Improvement action plan" },
      { text: "API access (10k calls/mo)" },
      { text: "Priority support" },
    ],
  },
  {
    name: "Agency",
    monthlyPrice: null,
    billingNoteMonthly: "Pricing based on number of brands",
    billingNoteAnnual: "Pricing based on number of brands",
    ctaLabel: "Talk to sales",
    ctaAction: "contact_sales_agency",
    highlighted: false,
    variant: "outline",
    features: [
      { text: "20+ brands tracked" },
      { text: "Real-time monitoring" },
      { text: "Everything in Pro" },
      { text: "White-label reports" },
      { text: "10 team seats" },
      { text: "Dedicated success manager" },
      { text: "Custom SLAs" },
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    billingNoteMonthly: "Volume pricing · MSA available",
    billingNoteAnnual: "Volume pricing · MSA available",
    ctaLabel: "Contact us",
    ctaAction: "contact_sales_enterprise",
    highlighted: false,
    variant: "outline",
    features: [
      { text: "Unlimited brands" },
      { text: "Custom AI engine tracking" },
      { text: "Everything in Agency" },
      { text: "Unlimited team seats" },
      { text: "SSO / SAML" },
      { text: "Custom integrations" },
      { text: "Security review & on-prem option" },
    ],
  },
];

// ─── Comparison Table ───────────────────────────────────────

export const comparisonSection = {
  badge: "Compare Plans",
  headline: "Everything you need, nothing you don't",
};

export const comparisonPlanNames = ["Starter", "Pro", "Agency", "Enterprise"];

export type CellValue = string | boolean;

export interface ComparisonRow {
  feature: string;
  values: CellValue[];
  striped: boolean;
}

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Brands tracked",
    values: ["1", "5", "20", "Unlimited"],
    striped: false,
  },
  {
    feature: "Scan frequency",
    values: ["Weekly", "Daily", "Daily", "Real-time"],
    striped: true,
  },
  {
    feature: "AI engines monitored",
    values: ["3", "7", "All", "All"],
    striped: false,
  },
  {
    feature: "Competitive intelligence",
    values: [false, true, true, true],
    striped: true,
  },
  {
    feature: "Improvement action plan",
    values: [true, true, true, true],
    striped: false,
  },
  {
    feature: "API access",
    values: [false, false, true, true],
    striped: true,
  },
  {
    feature: "White-label reports",
    values: [false, false, true, true],
    striped: false,
  },
  {
    feature: "Team seats",
    values: ["1", "3", "Unlimited", "Unlimited"],
    striped: true,
  },
  {
    feature: "SSO / SAML",
    values: [false, false, false, true],
    striped: false,
  },
  {
    feature: "Dedicated success manager",
    values: [false, false, false, true],
    striped: false,
  },
];

// ─── CTA Section ────────────────────────────────────────────

export const pricingCTA = {
  badge: "Get started today",
  headline: "Start with a scan.",
  subtext:
    "No credit card required. See exactly where you stand in AI search results in under 60 seconds.",
  primaryCTA: "Get your free AEO score",
  secondaryCTA: "Talk to sales",
  trustSignals: [
    "Setup in minutes",
    "No credit card needed",
    "Cancel anytime",
  ],
};
