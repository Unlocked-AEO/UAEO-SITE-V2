// ─── Brand Accuracy Score Hero ─────────────────────────────

export interface BrandAccuracyScore {
  score: number;
  max: number;
  title: string;
  summary: string;
}

export const brandAccuracyScore: BrandAccuracyScore = {
  score: 81,
  max: 100,
  title: "Brand Accuracy Score",
  summary:
    "Your brand is described accurately across most AI engines, but hallucinations were detected in 3 out of 5 platforms. ChatGPT and Claude represent your brand well, but Grok introduces factual errors about your pricing and features. Correcting these with targeted content updates could push your score above 90 within 45 days.",
};

// ─── Summary Stat Cards ────────────────────────────────────

export interface AccuracyStat {
  value: string;
  label: string;
  badge: string;
  level: "danger" | "warning" | "success";
}

export const accuracyStats: AccuracyStat[] = [
  { value: "7", label: "Hallucinations detected", badge: "Needs attention", level: "danger" },
  { value: "3 / 5", label: "AI engines affected", badge: "Moderate", level: "warning" },
  { value: "2 / 5", label: "Engines fully accurate", badge: "Good", level: "success" },
];

// ─── Hallucination Log ─────────────────────────────────────

export interface Hallucination {
  engine: string;
  text: string;
  category: string;
  severity: "High" | "Medium" | "Low";
}

export const hallucinations: Hallucination[] = [
  {
    engine: "Grok",
    text: "States Unlocked AEO pricing starts at $29/mo — actual starter price is $49/mo",
    category: "Pricing",
    severity: "High",
  },
  {
    engine: "Grok",
    text: "Claims the platform integrates natively with HubSpot — no such integration exists",
    category: "Features",
    severity: "High",
  },
  {
    engine: "Perplexity",
    text: 'Describes Unlocked AEO as "founded in 2019" — company was founded in 2022',
    category: "Company info",
    severity: "Medium",
  },
  {
    engine: "Perplexity",
    text: "Lists a competitor's feature as belonging to Unlocked AEO's Agency plan",
    category: "Features",
    severity: "Medium",
  },
  {
    engine: "Gemini",
    text: "Incorrectly states the platform supports real-time crawling — scans run on a schedule",
    category: "Features",
    severity: "Medium",
  },
  {
    engine: "Gemini",
    text: 'Mentions a "free forever" plan that does not exist on the current pricing page',
    category: "Pricing",
    severity: "Medium",
  },
  {
    engine: "ChatGPT",
    text: "Slightly misstates the number of AI engines tracked — says 4, actual count is 5",
    category: "Features",
    severity: "Low",
  },
];

// ─── Engine Accuracy Table ─────────────────────────────────

export interface EngineAccuracy {
  name: string;
  initial: string;
  iconBg: string;
  accuracy: number;
  barColor: string;
  status: "Accurate" | "Partial" | "Poor";
  statusColor: string;
  statusBg: string;
}

export const engineAccuracies: EngineAccuracy[] = [
  { name: "ChatGPT", initial: "G", iconBg: "#10A37F", accuracy: 92, barColor: "#22C55E", status: "Accurate", statusColor: "#22C55E", statusBg: "#F0FDF4" },
  { name: "Claude", initial: "C", iconBg: "#D97706", accuracy: 88, barColor: "#22C55E", status: "Accurate", statusColor: "#22C55E", statusBg: "#F0FDF4" },
  { name: "Perplexity", initial: "P", iconBg: "#6366F1", accuracy: 74, barColor: "#F97316", status: "Partial", statusColor: "#F97316", statusBg: "#FFF7ED" },
  { name: "Gemini", initial: "G", iconBg: "#8B5CF6", accuracy: 71, barColor: "#F97316", status: "Partial", statusColor: "#F97316", statusBg: "#FFF7ED" },
  { name: "Grok", initial: "X", iconBg: "#0A2540", accuracy: 52, barColor: "#EF4444", status: "Poor", statusColor: "#EF4444", statusBg: "#FEF2F2" },
];
