// ─── AI Visibility Score Hero ──────────────────────────────

export interface AIVisibilityScore {
  score: number;
  max: number;
  title: string;
  summary: string;
}

export const aiVisibilityScore: AIVisibilityScore = {
  score: 68,
  max: 100,
  title: "AI Visibility Score",
  summary:
    "Your brand appears in AI responses inconsistently across engines. ChatGPT and Claude mention you in relevant contexts, but Perplexity rarely surfaces your brand organically. Grok shows near-zero mentions over the past 30 days. Improving topical authority and structured content will significantly boost your AI citation rate.",
};

// ─── Stats Bar ─────────────────────────────────────────────

export interface VisibilityStat {
  value: string;
  label: string;
}

export const visibilityStats: VisibilityStat[] = [
  { value: "247", label: "Total Mentions" },
  { value: "89", label: "Total Citations" },
  { value: "34", label: "Recommendations" },
];

// ─── Engine Mini Scores ────────────────────────────────────

export interface EngineMinScore {
  name: string;
  score: number;
  scoreColor: string;
  iconBg: string;
  iconSlug: string;
  hasBorder?: boolean;
}

export const engineMiniScores: EngineMinScore[] = [
  { name: "ChatGPT", score: 78, scoreColor: "#0A2540", iconBg: "#10A37F", iconSlug: "chatgpt" },
  { name: "Perplexity", score: 71, scoreColor: "#0A2540", iconBg: "#1C1C1C", iconSlug: "perplexity" },
  { name: "Gemini", score: 65, scoreColor: "#FF9F43", iconBg: "#FFFFFF", iconSlug: "gemini", hasBorder: true },
  { name: "Grok", score: 38, scoreColor: "#FF4D4D", iconBg: "#000000", iconSlug: "grok" },
  { name: "Claude", score: 82, scoreColor: "#4ECDC4", iconBg: "#FDF0EB", iconSlug: "claude" },
];

// ─── Prompt Results Table ──────────────────────────────────

export type EngineSlug = "chatgpt" | "perplexity" | "gemini" | "grok" | "claude";

export interface PromptEngineResult {
  engine: EngineSlug;
  active: boolean;
}

export interface PromptResult {
  prompt: string;
  mentioned: PromptEngineResult[];
  cited: PromptEngineResult[];
  recommended: PromptEngineResult[];
  score: number;
  scoreColor: string;
}

export const promptResults: PromptResult[] = [
  {
    prompt: "What is the best tool for AI answer engine optimization?",
    mentioned: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: true },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: true },
    ],
    cited: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    recommended: [
      { engine: "chatgpt", active: false },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: true },
    ],
    score: 72,
    scoreColor: "#4ECDC4",
  },
  {
    prompt: "Which SEO platforms support AI answer engine tracking in 2025?",
    mentioned: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: true },
      { engine: "gemini", active: true },
      { engine: "grok", active: false },
      { engine: "claude", active: true },
    ],
    cited: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: true },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    recommended: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    score: 81,
    scoreColor: "#4ECDC4",
  },
  {
    prompt: "Best tools for monitoring brand mentions in AI-generated answers",
    mentioned: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    cited: [
      { engine: "chatgpt", active: false },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    recommended: [
      { engine: "chatgpt", active: false },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    score: 34,
    scoreColor: "#FF4D4D",
  },
  {
    prompt: "Top AEO software platforms for enterprise brands in 2025",
    mentioned: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: true },
      { engine: "gemini", active: true },
      { engine: "grok", active: false },
      { engine: "claude", active: true },
    ],
    cited: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: true },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: true },
    ],
    recommended: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: true },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    score: 88,
    scoreColor: "#4ECDC4",
  },
  {
    prompt: "How do I improve my website's visibility in AI chatbot responses?",
    mentioned: [
      { engine: "chatgpt", active: false },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    cited: [
      { engine: "chatgpt", active: false },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    recommended: [
      { engine: "chatgpt", active: false },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    score: 12,
    scoreColor: "#FF4D4D",
  },
  {
    prompt: "Which brands are leaders in AI answer engine optimization?",
    mentioned: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: true },
      { engine: "gemini", active: true },
      { engine: "grok", active: true },
      { engine: "claude", active: true },
    ],
    cited: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: true },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    recommended: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: true },
    ],
    score: 91,
    scoreColor: "#4ECDC4",
  },
  {
    prompt: "What tools help track citations in Perplexity and ChatGPT responses?",
    mentioned: [
      { engine: "chatgpt", active: true },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: true },
    ],
    cited: [
      { engine: "chatgpt", active: false },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    recommended: [
      { engine: "chatgpt", active: false },
      { engine: "perplexity", active: false },
      { engine: "gemini", active: false },
      { engine: "grok", active: false },
      { engine: "claude", active: false },
    ],
    score: 55,
    scoreColor: "#FF9F43",
  },
];
