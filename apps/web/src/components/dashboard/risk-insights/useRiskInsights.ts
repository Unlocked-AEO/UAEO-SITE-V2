import { useContext } from "react";
import { RiskInsightsContext } from "./riskInsightsContext";
import type { RiskInsightsState } from "./riskInsightsContext";

export function useRiskInsights(): RiskInsightsState {
  const ctx = useContext(RiskInsightsContext);
  if (!ctx) {
    throw new Error(
      "useRiskInsights must be used inside <RiskInsightsProvider>"
    );
  }
  return ctx;
}
