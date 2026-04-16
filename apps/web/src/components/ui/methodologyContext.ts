import { createContext } from "react";
import type { MethodologySpec } from "@/data/mock-risk-insights";

export interface MethodologySheetState {
  spec: MethodologySpec | null;
  title: string;
  open: (spec: MethodologySpec, title: string) => void;
  close: () => void;
}

export const MethodologyContext = createContext<MethodologySheetState | null>(null);
