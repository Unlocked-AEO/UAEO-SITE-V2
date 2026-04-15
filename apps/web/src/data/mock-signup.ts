// ─── Sidebar Content ───────────────────────────────────────

export const signupSidebar = {
  headline: "Make your brand the answer AI gives.",
  subtext:
    "See exactly how ChatGPT, Perplexity, Gemini and Grok describe your brand — and fix what's wrong.",
  features: [
    "Full AEO score across 5 AI engines",
    "Hallucination detection & correction",
    "Schema markup & content freshness insights",
    "Actionable fix recommendations, ranked by impact",
  ],
  trustedBy: "Trusted by 500+ marketing teams",
  logos: ["Acme Corp", "Veritas", "Horizon AI"],
};

// ─── Form Fields ───────────────────────────────────────────

export interface SignupField {
  label: string;
  placeholder: string;
  type: "text" | "email" | "password" | "select";
  required: boolean;
  hint?: string;
}

export const signupFieldsRow1: SignupField[] = [
  { label: "Company Name", placeholder: "Acme Corp", type: "text", required: true },
  { label: "Company Website", placeholder: "acme-corp.com", type: "text", required: true },
];

export const signupFieldsRow2: SignupField[] = [
  { label: "Work Email", placeholder: "you@company.com", type: "email", required: true },
  { label: "Industry", placeholder: "Select industry", type: "select", required: true },
];

export const signupFieldsRow3: SignupField[] = [
  { label: "Password", placeholder: "••••••••", type: "password", required: true, hint: "Min. 8 characters" },
  { label: "Team Size", placeholder: "Select team size", type: "select", required: true },
];

export const signupOptionalField: SignupField = {
  label: "How did you hear about us? (optional)",
  placeholder: "Select an option",
  type: "select",
  required: false,
};
