// Centralised env loading. Read once at boot so the rest of the code
// imports `config` instead of touching process.env directly — this makes
// it trivial to swap to a typed config provider later.

import "node:process";

function required(name: string, fallback?: string): string {
  const v = process.env[name] ?? fallback;
  if (v === undefined) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export const config = {
  port: Number(process.env.PORT ?? 3001),
  logLevel: process.env.LOG_LEVEL ?? "info",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",

  providerMode: (process.env.PROVIDER_MODE ?? "mock") as "mock" | "real",

  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY ?? "",
    model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6",
    modelFast: process.env.ANTHROPIC_MODEL_FAST ?? "claude-haiku-4-5-20251001",
    // Server-side web search. 0 disables. Each search costs $10/1000.
    webSearchMaxUses: Number(process.env.ANTHROPIC_WEB_SEARCH_MAX ?? 5),
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY ?? "",
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
  },
  firecrawl: {
    apiKey: process.env.FIRECRAWL_API_KEY ?? "",
  },

  quotas: {
    dailyTokenBudget: Number(process.env.DAILY_TOKEN_BUDGET ?? 2_000_000),
    dailyJobBudget: Number(process.env.DAILY_JOB_BUDGET ?? 50),
  },
} as const;

export function assertRealProvidersConfigured() {
  if (config.providerMode !== "real") return;
  required("ANTHROPIC_API_KEY");
  required("GEMINI_API_KEY");
  // Firecrawl is optional — corpus assembly degrades gracefully without it.
}
