import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { RiskInsightsProvider } from "@/components/dashboard/risk-insights/LensContext";
import { MethodologyProvider } from "@/components/ui/MethodologyContext";
import { HeaderBar } from "@/components/dashboard/risk-insights/HeaderBar";
import { SectionNav } from "@/components/dashboard/risk-insights/SectionNav";
import type { SectionNavItem } from "@/components/dashboard/risk-insights/SectionNav";
import { ExecutiveSummary } from "@/components/dashboard/risk-insights/ExecutiveSummary";
import { RiskRegistryTable } from "@/components/dashboard/risk-insights/RiskRegistryTable";
import { RemediationKanban } from "@/components/dashboard/risk-insights/RemediationKanban";
import { HistoricalTrends } from "@/components/dashboard/risk-insights/HistoricalTrends";
import { DownstreamImpact } from "@/components/dashboard/risk-insights/DownstreamImpact";
import { ResourcesStrip } from "@/components/dashboard/risk-insights/ResourcesStrip";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE: "loading" | "success" | "empty" | "error" = "success";

const NAV_ITEMS: SectionNavItem[] = [
  { id: "summary", label: "Summary" },
  { id: "registry", label: "Risks" },
  { id: "remediation", label: "Remediation" },
  { id: "trends", label: "Trends" },
  { id: "downstream", label: "Downstream" },
  { id: "resources", label: "Resources" },
];

export default function RiskInsights() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (DEMO_STATE !== "success") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  if (DEMO_STATE === "loading") {
    return (
      <DashboardShell activeTab="risk-insights">
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-surface border-t-teal rounded-full animate-spin" />
            <span className="text-slate-muted text-sm">Loading risk insights...</span>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (DEMO_STATE === "empty") {
    return (
      <DashboardShell activeTab="risk-insights">
        <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
          <span className="text-navy font-bold text-xl">Monitoring not yet active</span>
          <p className="text-slate-muted text-sm max-w-[460px] text-center">
            Risk Insights appear once we've tracked your account's AEO posture for at
            least one quarter. Start monitoring to begin building your risk registry.
          </p>
          <button
            className="rounded-lg py-3.5 px-7 bg-teal text-navy font-semibold text-[15px]/5 border-none cursor-pointer hover:bg-[#3DBDB5] transition-colors duration-150"
            onClick={() => console.log("ACTION: start_risk_monitoring")}
          >
            Start monitoring
          </button>
        </div>
      </DashboardShell>
    );
  }

  if (DEMO_STATE === "error") {
    return (
      <DashboardShell activeTab="risk-insights">
        <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
          <span className="text-navy font-bold text-xl">Couldn't load risk data</span>
          <p className="text-slate-muted text-sm max-w-[400px] text-center">
            We ran into a problem pulling your risk registry. Try again in a moment.
          </p>
          <button
            className="rounded-lg py-3.5 px-7 bg-teal text-navy font-semibold text-[15px]/5 border-none cursor-pointer hover:bg-[#3DBDB5] transition-colors duration-150"
            onClick={() => console.log("ACTION: retry_load_risk_insights")}
          >
            Retry
          </button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell activeTab="risk-insights">
      <RiskInsightsProvider>
        <MethodologyProvider>
          <div className="flex flex-col">
            <div ref={headerRef} className="pb-6">
              <HeaderBar />
            </div>

            <SectionNav items={NAV_ITEMS} />

            <div className="flex flex-col gap-14 pt-8">
              <ExecutiveSummary />
              <RiskRegistryTable />
              <RemediationKanban />
              <HistoricalTrends />
              <DownstreamImpact />
              <ResourcesStrip />
            </div>
          </div>
        </MethodologyProvider>
      </RiskInsightsProvider>
    </DashboardShell>
  );
}
