import { useNavigate } from "react-router-dom";
import { ScanShell } from "@/components/layout/ScanShell";
import { overallScore } from "@/data/mock-scan-overview";
import { ScanScoreHero } from "@/components/dashboard/ScanScoreHero";
import { ScanTabs } from "@/components/dashboard/ScanTabs";
import { ScanScoreGauges } from "@/components/dashboard/ScanScoreGauges";
import { ScanStrengthsWeaknesses } from "@/components/dashboard/ScanStrengthsWeaknesses";
import { ScanEngineScores } from "@/components/dashboard/ScanEngineScores";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function ScanOverview() {
  const navigate = useNavigate();

  if (DEMO_STATE === "loading") {
    return (
      <ScanShell>
        <div className="grow shrink basis-[0%] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-[#F0F4F8] border-t-[#4ECDC4] rounded-full animate-spin" />
            <span className="text-[#8792A2] font-sans text-sm">
              Loading scan results...
            </span>
          </div>
        </div>
      </ScanShell>
    );
  }

  if (DEMO_STATE === "empty") {
    return (
      <ScanShell>
        <div className="grow shrink basis-[0%] flex flex-col items-center justify-center gap-4">
          <span className="text-[#0A2540] font-sans font-bold text-xl">
            Scan not found
          </span>
          <p className="text-[#8792A2] font-sans text-sm max-w-[400px] text-center">
            This scan may have been deleted or the URL is incorrect.
          </p>
          <button
            className="rounded-[10px] py-3 px-6 bg-[#4ECDC4] text-[#0A2540] font-sans font-semibold text-sm border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate("/dashboard/scans")}
          >
            Back to Scans
          </button>
        </div>
      </ScanShell>
    );
  }

  if (DEMO_STATE === "error") {
    return (
      <ScanShell>
        <div className="grow shrink basis-[0%] flex flex-col items-center justify-center gap-4">
          <span className="text-[#0A2540] font-sans font-bold text-xl">
            Something went wrong
          </span>
          <p className="text-[#8792A2] font-sans text-sm max-w-[400px] text-center">
            We couldn't load this scan's results. Please try again.
          </p>
          <button
            className="rounded-[10px] py-3 px-6 bg-[#0A2540] text-white font-sans font-semibold text-sm border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => console.log("ACTION: retry_load_scan")}
          >
            Retry
          </button>
        </div>
      </ScanShell>
    );
  }

  return (
    <ScanShell>
      <div className="grow shrink basis-[0%] flex flex-col py-6 px-7 gap-4">
        {/* Tabs — above score */}
        <ScanTabs activeTab="summary" />

        {/* Score hero */}
        <ScanScoreHero
          score={overallScore.score}
          max={overallScore.max}
          title="Unlocked AEO Score"
          summary={overallScore.summary}
          dasharray="235 327"
        />

        {/* Two-column content below tabs */}
        <div className="flex gap-5">
          <div className="grow shrink basis-[0%] flex flex-col min-w-0 gap-4">
            <ScanScoreGauges />
            <ScanStrengthsWeaknesses />
          </div>
          <div className="grow-0 shrink-0 basis-68 flex flex-col gap-4">
            <ScanEngineScores />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center shrink-0 py-4 px-7 gap-3 bg-white border-t border-t-solid border-t-[#E6EBF1]">
        <div className="grow shrink basis-[0%]" />
      </div>
    </ScanShell>
  );
}
