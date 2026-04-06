import { useEffect, useRef } from "react";
import gsap from "gsap";
import { riskInsights } from "@/data/mock-dashboard";
import type { RiskInsight } from "@/data/mock-dashboard";

const riskConfig: Record<
  RiskInsight["level"],
  { bg: string; border: string; dotColor: string; labelColor: string; label: string }
> = {
  high: {
    bg: "bg-[#FFF0F0]",
    border: "border-[#FFCDD2]",
    dotColor: "bg-danger",
    labelColor: "text-danger",
    label: "High Risk",
  },
  medium: {
    bg: "bg-[#FFF8F0]",
    border: "border-[#FFE0B2]",
    dotColor: "bg-warning",
    labelColor: "text-warning",
    label: "Medium Risk",
  },
  low: {
    bg: "bg-[#F0FAF8]",
    border: "border-[#B2DFDB]",
    dotColor: "bg-teal",
    labelColor: "text-teal",
    label: "Low Risk",
  },
};

export function RiskInsightsCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".risk-card");
      if (cards) {
        gsap.from(cards, {
          y: 20,
          opacity: 0,
          scale: 0.96,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.6,
        });
      }

      // Pulse the severity dots
      const dots = containerRef.current?.querySelectorAll(".risk-dot");
      if (dots) {
        dots.forEach((dot, i) => {
          gsap.from(dot, {
            scale: 0,
            duration: 0.3,
            ease: "back.out(3)",
            delay: 0.9 + i * 0.1,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="mb-3.5 text-navy text-[13px]/4">Risk Insights</div>
      <div className="flex gap-3.5">
        {riskInsights.map((insight, i) => {
          const config = riskConfig[insight.level];
          return (
            <button
              key={i}
              className={`risk-card grow shrink basis-0 rounded-lg ${config.bg} border ${config.border} p-3.5 text-left cursor-pointer hover:opacity-90 transition-opacity`}
              onClick={() =>
                console.log("ACTION: view_risk_insight", {
                  title: insight.title,
                  level: insight.level,
                })
              }
            >
              <div className="flex items-center mb-1.5 gap-[7px]">
                <div className={`risk-dot rounded-full ${config.dotColor} shrink-0 size-2`} />
                <span
                  className={`uppercase tracking-[0.4px] ${config.labelColor} text-[10px]/3`}
                >
                  {config.label}
                </span>
              </div>
              <div className="mb-1 text-navy text-xs/4">{insight.title}</div>
              <p className="text-[11px] leading-[1.5] text-slate-muted">
                {insight.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
