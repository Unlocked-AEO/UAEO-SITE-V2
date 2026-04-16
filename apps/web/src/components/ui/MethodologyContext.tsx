import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { MethodologyContext } from "./methodologyContext";
import type { MethodologySheetState } from "./methodologyContext";
import type { MethodologySpec } from "@/data/mock-risk-insights";
import { MethodologySheet } from "./MethodologySheet";

export function MethodologyProvider({ children }: { children: ReactNode }) {
  const [spec, setSpec] = useState<MethodologySpec | null>(null);
  const [title, setTitle] = useState("");

  const open = useCallback((s: MethodologySpec, t: string) => {
    setSpec(s);
    setTitle(t);
  }, []);

  const close = useCallback(() => setSpec(null), []);

  const value: MethodologySheetState = { spec, title, open, close };

  return (
    <MethodologyContext.Provider value={value}>
      {children}
      <MethodologySheet />
    </MethodologyContext.Provider>
  );
}
