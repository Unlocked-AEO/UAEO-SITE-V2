import { useNavigate } from "react-router-dom";
import { ScanShell } from "@/components/layout/ScanShell";
import { ScanScoreHero } from "@/components/dashboard/ScanScoreHero";
import { brandAccuracyScore } from "@/data/mock-scan-brand-accuracy";
import { ScanTabs } from "@/components/dashboard/ScanTabs";
import { BrandAccuracyStats } from "@/components/dashboard/BrandAccuracyStats";
import { HallucinationLog } from "@/components/dashboard/HallucinationLog";
import { EngineAccuracyTable } from "@/components/dashboard/EngineAccuracyTable";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function ScanBrandAccuracy() {
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
            No accuracy data
          </span>
          <p className="text-[#8792A2] font-sans text-sm max-w-[400px] text-center">
            Brand accuracy data is not available for this scan yet.
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
            We couldn't load the brand accuracy data. Please try again.
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
      <div className="grow shrink basis-[0%] flex flex-col py-6 px-7 gap-3">
        {/* Tabs — above score */}
        <ScanTabs activeTab="brand-accuracy" />

        <ScanScoreHero
          score={brandAccuracyScore.score}
          max={brandAccuracyScore.max}
          title={brandAccuracyScore.title}
          summary={brandAccuracyScore.summary}
          dasharray="266 62"
        />

        {/* Stat Cards */}
        <BrandAccuracyStats />

        {/* Hallucination Log */}
        <HallucinationLog />

        {/* Engine Accuracy Table */}
        <EngineAccuracyTable />
      </div>
    </ScanShell>
  );
}
