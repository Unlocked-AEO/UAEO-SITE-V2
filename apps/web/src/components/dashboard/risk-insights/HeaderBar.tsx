import { useNavigate } from "react-router-dom";
import { useRiskInsights } from "./useRiskInsights";
import { LensToggle } from "./LensToggle";

function relativeTime(iso: string): string {
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.round(days / 7)} weeks ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function HeaderBar() {
  const navigate = useNavigate();
  const { account, intake } = useRiskInsights();

  const intakeStatusCfg = {
    incomplete: { dot: "#E74C3C", label: "Intake incomplete" },
    draft: { dot: "#FF9F43", label: "Intake draft" },
    complete: { dot: "#27AE60", label: "Intake complete" },
  }[intake.status];

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex flex-col gap-1.5">
        <span className="uppercase tracking-[0.08em] text-teal font-bold text-[11px]/4">
          {account.quarter} · Risk Registry
        </span>
        <h1 className="tracking-[-0.8px] text-navy font-bold text-2xl/[30px] m-0">
          Risk Insights · {account.name}
        </h1>
        <div className="flex items-center gap-3 text-[12px]/4 text-[#64748B]">
          <span>Refreshed {relativeTime(account.lastRefreshed)}</span>
          {account.monitoringActive && (
            <>
              <span className="size-1 rounded-full bg-[#E2E8F0]" />
              <span className="inline-flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-teal animate-pulse" />
                Monitoring active
              </span>
            </>
          )}
          <span className="size-1 rounded-full bg-[#E2E8F0]" />
          <span className="inline-flex items-center gap-1.5">
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: intakeStatusCfg.dot }}
            />
            {intakeStatusCfg.label}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LensToggle />
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg py-3 px-5 bg-white border-[1.5px] border-[#E2E8F0] cursor-pointer hover:bg-[#F8FAFC] transition-colors text-[13px]/4 text-navy font-semibold"
          onClick={() => navigate("/dashboard/risk-insights/intake")}
          title="Edit the financial intake that grounds every dollar on this page"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M3 10h7M3 6.5h7M3 3h7M1.5 10h0.01M1.5 6.5h0.01M1.5 3h0.01"
              stroke="#0A2540"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Financial intake
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg py-3 px-5 bg-white border-[1.5px] border-[#E2E8F0] cursor-pointer hover:bg-[#F8FAFC] transition-colors text-[13px]/4 text-navy font-semibold"
          onClick={() => console.log("ACTION: export_risk_insights")}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M6.5 1.5v7m0 0L3.5 5.5M6.5 8.5l3-3M2 10.5h9"
              stroke="#0A2540"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg py-3 px-5 bg-navy border-none cursor-pointer hover:opacity-90 transition-opacity text-[13px]/4 text-white font-semibold"
          onClick={() => console.log("ACTION: open_executive_briefing")}
        >
          Schedule review
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
}
