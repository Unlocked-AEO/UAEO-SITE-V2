// ─── Current Plan ─────────────────────────────────────────

export interface CurrentPlan {
  name: string;
  price: number;
  interval: string;
  renewsDate: string;
  seatsUsed: number;
}

export const currentPlan: CurrentPlan = {
  name: "Pro Plan",
  price: 99,
  interval: "month",
  renewsDate: "Jan 3, 2027",
  seatsUsed: 3,
};

// ─── Plan Options ─────────────────────────────────────────

export interface PlanOption {
  id: string;
  name: string;
  price: number | null;
  priceLabel: string;
  interval: string;
  features: string;
  isCurrent: boolean;
  ctaLabel: string;
  variant: "default" | "active" | "enterprise";
}

export const planOptions: PlanOption[] = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    priceLabel: "$29",
    interval: "/mo",
    features: "1 seat · 10 scans/mo · Core prompts",
    isCurrent: false,
    ctaLabel: "Downgrade",
    variant: "default",
  },
  {
    id: "pro",
    name: "Pro",
    price: 99,
    priceLabel: "$99",
    interval: "/mo",
    features: "3 seats · 50 scans/mo · Full prompt bank",
    isCurrent: true,
    ctaLabel: "Active Plan",
    variant: "active",
  },
  {
    id: "agency",
    name: "Agency",
    price: 249,
    priceLabel: "$249",
    interval: "/mo",
    features: "10 seats · Unlimited scans · White-label",
    isCurrent: false,
    ctaLabel: "Upgrade",
    variant: "default",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    priceLabel: "Custom",
    interval: "",
    features: "Unlimited seats · SAML/SSO · Dedicated CSM",
    isCurrent: false,
    ctaLabel: "Contact Sales",
    variant: "enterprise",
  },
];

// ─── Payment Method ───────────────────────────────────────

export interface PaymentMethod {
  brand: string;
  last4: string;
  expiry: string;
  billingEmail: string;
}

export const paymentMethod: PaymentMethod = {
  brand: "VISA",
  last4: "4242",
  expiry: "09/2027",
  billingEmail: "gabe@acmecorp.com",
};

// ─── Section Headers ──────────────────────────────────────

export const choosePlanSection = {
  title: "Choose Your Plan",
  subtitle: "Upgrade or downgrade at any time",
};

export const cancelSection = {
  title: "Cancel Subscription",
  subtitle: "Your plan stays active until Jan 3, 2027. No refunds for unused time.",
};
