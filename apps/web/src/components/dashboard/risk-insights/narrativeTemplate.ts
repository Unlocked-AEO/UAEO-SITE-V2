import type {
  CompositeSummary,
  Lens,
  RiskAccount,
} from "@/data/mock-risk-insights";

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${n}`;
}

function formatThousands(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

export function buildNarrative(
  account: RiskAccount,
  composite: CompositeSummary,
  lens: Lens
): string {
  const trendVerb =
    composite.trend === "up"
      ? "increasing"
      : composite.trend === "down"
        ? "improving"
        : "holding steady";

  if (lens === "cro") {
    const hallucinationClause =
      composite.openMaterialHallucinations > 0
        ? ` Open material hallucinations: ${composite.openMaterialHallucinations}.`
        : "";
    return `${account.name} has ${formatCurrency(composite.pipelineExposedUsd)} of pipeline exposed to AI displacement this quarter, with ${formatCurrency(composite.revenueAtRisk12moUsd)} of revenue at risk over the next 12 months absent action. Exposure is ${trendVerb}. Top-query coverage sits at ${composite.topQueryCoveragePct}%.${hallucinationClause}`;
  }

  const trafficClause =
    composite.llmSourcedTraffic.monthlySessions > 0
      ? ` LLM-sourced traffic is running ${formatThousands(composite.llmSourcedTraffic.monthlySessions)} sessions per month.`
      : "";
  return `${account.name}'s citation share of voice is ${composite.citationShareOfVoicePct}%, with ${composite.promptsAtRisk} priority prompts at risk. Freshness decay has reached ${composite.freshnessDecayDays} days on cited pages, and exposure is ${trendVerb}.${trafficClause}`;
}
