import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  riskAccount,
  compositeSummary,
  risks as mockRisks,
  defaultIntake,
  computePipelineExposed,
  computeRevenueAtRisk12mo,
} from "@/data/mock-risk-insights";
import type {
  Lens,
  FinancialIntake,
  CompositeSummary,
} from "@/data/mock-risk-insights";
import { RiskInsightsContext } from "./riskInsightsContext";
import type { RiskInsightsState } from "./riskInsightsContext";

// Module-level intake store so provider instances on different routes
// (Risk Insights and the Intake form) share state across navigation.
// Integration dev swaps this for an API call + persisted store.
let moduleIntake: FinancialIntake = defaultIntake;

export function RiskInsightsProvider({ children }: { children: ReactNode }) {
  const [lens, setLens] = useState<Lens>(riskAccount.defaultLens);
  const [selectedRiskId, setSelectedRiskId] = useState<string | null>(null);
  const [intake, setIntakeState] = useState<FinancialIntake>(moduleIntake);

  const setIntake = (next: FinancialIntake) => {
    moduleIntake = next;
    setIntakeState(next);
  };

  // Composite dollar figures derive from the live intake so that saving
  // the intake form updates the Summary header without a page reload.
  const composite: CompositeSummary = useMemo(
    () => ({
      ...compositeSummary,
      pipelineExposedUsd: computePipelineExposed(intake.inputs),
      revenueAtRisk12moUsd: computeRevenueAtRisk12mo(intake.inputs),
    }),
    [intake.inputs]
  );

  const value = useMemo<RiskInsightsState>(
    () => ({
      lens,
      setLens,
      selectedRiskId,
      setSelectedRiskId,
      intake,
      setIntake,
      risks: mockRisks,
      account: riskAccount,
      composite,
    }),
    [lens, selectedRiskId, intake, composite]
  );

  const accentColor =
    lens === "cmo" ? "var(--color-teal)" : "var(--color-iris)";

  return (
    <RiskInsightsContext.Provider value={value}>
      <div style={{ ["--color-accent-active" as string]: accentColor }}>
        {children}
      </div>
    </RiskInsightsContext.Provider>
  );
}
