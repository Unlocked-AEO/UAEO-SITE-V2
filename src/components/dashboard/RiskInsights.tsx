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
  return (
    <div className="rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="mb-3.5 text-navy text-[13px]/4">Risk Insights</div>
      <div className="flex gap-3.5">
        {riskInsights.map((insight, i) => {
          const config = riskConfig[insight.level];
          return (
            <button
              key={i}
              className={`grow shrink basis-0 rounded-lg ${config.bg} border ${config.border} p-3.5 text-left cursor-pointer hover:opacity-90 transition-opacity`}
              onClick={() =>
                console.log("ACTION: view_risk_insight", {
                  title: insight.title,
                  level: insight.level,
                })
              }
            >
              <div className="flex items-center mb-1.5 gap-[7px]">
                <div className={`rounded-full ${config.dotColor} shrink-0 size-2`} />
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
