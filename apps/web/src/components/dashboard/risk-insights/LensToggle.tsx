import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRiskInsights } from "./useRiskInsights";
import type { Lens } from "@/data/mock-risk-insights";

const OPTIONS: { key: Lens; label: string; description: string }[] = [
  { key: "cmo", label: "CMO", description: "Tactical, counts" },
  { key: "cro", label: "CRO", description: "Strategic, dollars" },
];

export function LensToggle() {
  const { lens, setLens } = useRiskInsights();
  const knobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const knob = knobRef.current;
    if (!knob) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const duration = mq.matches ? 0 : 0.28;
    const xPercent = lens === "cmo" ? 0 : 100;
    const bg = lens === "cmo" ? "#4ECDC4" : "#635BFF";
    gsap.to(knob, {
      xPercent,
      backgroundColor: bg,
      duration,
      ease: "power3.inOut",
    });
  }, [lens]);

  return (
    <div
      className="relative inline-flex items-center rounded-full bg-[#F8FAFC] border border-[#E2E8F0] p-0.5"
      role="tablist"
      aria-label="Lens"
    >
      {/* Animated knob */}
      <div
        ref={knobRef}
        className="absolute top-0.5 left-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full bg-teal shadow-[0_1px_3px_rgba(10,37,64,0.08)]"
        aria-hidden="true"
      />
      {OPTIONS.map((opt) => {
        const active = opt.key === lens;
        // Brand rule: teal CTA uses navy text; iris uses white for contrast.
        const activeTextColor = lens === "cmo" ? "text-navy" : "text-white";
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={active}
            className={`relative z-10 px-5 py-1.5 rounded-full border-none bg-transparent cursor-pointer text-xs font-bold tracking-[0.08em] uppercase transition-colors duration-200 ${
              active ? activeTextColor : "text-[#64748B] hover:text-[#475569]"
            }`}
            onClick={() => setLens(opt.key)}
            title={opt.description}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
