import { useContext } from "react";
import { MethodologyContext } from "./methodologyContext";
import type { MethodologySheetState } from "./methodologyContext";

export function useMethodology(): MethodologySheetState {
  const ctx = useContext(MethodologyContext);
  if (!ctx) {
    throw new Error(
      "useMethodology must be used inside <MethodologyProvider>"
    );
  }
  return ctx;
}
