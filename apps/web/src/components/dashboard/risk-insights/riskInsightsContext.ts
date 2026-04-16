import { createContext } from "react";
import type {
  Lens,
  Risk,
  RiskAccount,
  CompositeSummary,
  FinancialIntake,
} from "@/data/mock-risk-insights";

export interface RiskInsightsState {
  lens: Lens;
  setLens: (l: Lens) => void;
  selectedRiskId: string | null;
  setSelectedRiskId: (id: string | null) => void;
  risks: Risk[];
  account: RiskAccount;
  composite: CompositeSummary;
  intake: FinancialIntake;
  setIntake: (i: FinancialIntake) => void;
}

export const RiskInsightsContext = createContext<RiskInsightsState | null>(null);
