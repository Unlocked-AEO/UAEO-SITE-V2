import { useState } from "react";
import { scanMeta } from "@/data/mock-scan-overview";
import { ScanScoreHero } from "@/components/dashboard/ScanScoreHero";
import { ScanCategoryTabs } from "@/components/dashboard/ScanCategoryTabs";
import { ScanScoreGauges } from "@/components/dashboard/ScanScoreGauges";
import { ScanStrengthsWeaknesses } from "@/components/dashboard/ScanStrengthsWeaknesses";
import { ScanEngineScores } from "@/components/dashboard/ScanEngineScores";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function ScanOverview() {
  const [activeTab, setActiveTab] = useState("summary");

  if (DEMO_STATE === "loading") {
    return (
      <Shell>
        <div className="grow shrink basis-[0%] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-[#F0F4F8] border-t-[#4ECDC4] rounded-full animate-spin" />
            <span className="text-[#8792A2] font-['Inter',system-ui,sans-serif] text-sm">
              Loading scan results...
            </span>
          </div>
        </div>
      </Shell>
    );
  }

  if (DEMO_STATE === "empty") {
    return (
      <Shell>
        <div className="grow shrink basis-[0%] flex flex-col items-center justify-center gap-4">
          <span className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold text-xl">
            Scan not found
          </span>
          <p className="text-[#8792A2] font-['Inter',system-ui,sans-serif] text-sm max-w-[400px] text-center">
            This scan may have been deleted or the URL is incorrect.
          </p>
          <button
            className="rounded-[10px] py-3 px-6 bg-[#4ECDC4] text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-sm border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => console.log("ACTION: navigate_to_scans")}
          >
            Back to Scans
          </button>
        </div>
      </Shell>
    );
  }

  if (DEMO_STATE === "error") {
    return (
      <Shell>
        <div className="grow shrink basis-[0%] flex flex-col items-center justify-center gap-4">
          <span className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold text-xl">
            Something went wrong
          </span>
          <p className="text-[#8792A2] font-['Inter',system-ui,sans-serif] text-sm max-w-[400px] text-center">
            We couldn't load this scan's results. Please try again.
          </p>
          <button
            className="rounded-[10px] py-3 px-6 bg-[#0A2540] text-white font-['Inter',system-ui,sans-serif] font-semibold text-sm border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => console.log("ACTION: retry_load_scan")}
          >
            Retry
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="grow shrink basis-[0%] flex flex-col py-6 px-7 gap-4">
        {/* Score hero — full width across both columns */}
        <ScanScoreHero />

        {/* Tabs — full width across both columns */}
        <ScanCategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
    </Shell>
  );
}

// ─── Shell layout for this page ────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-['Inter',system-ui,sans-serif] antialiased flex overflow-clip flex-col min-h-screen bg-[#F0F4F8] text-xs/4">
      {/* Top bar */}
      <header className="h-15 flex items-center shrink-0 px-7 gap-2 bg-white border-b border-b-solid border-b-[#E6EBF1]">
        <button
          className="flex items-center rounded-md py-1.75 px-3.5 gap-1.5 bg-white [border-width:1.5px] border-solid border-[#D6DCE3] cursor-pointer hover:bg-[#F8FAFC] transition-colors"
          onClick={() => console.log("ACTION: navigate_back")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: '0' }}>
            <path d="M9 11L5 7L9 3" stroke="#425466" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="inline-block text-[#425466] font-['Inter',system-ui,sans-serif] font-medium shrink-0 text-[13px]/4">
            Back
          </div>
        </button>

        <button
          className="flex items-center rounded-md py-1.75 px-3.5 gap-1.5 bg-white [border-width:1.5px] border-solid border-[#D6DCE3] cursor-pointer hover:bg-[#F8FAFC] transition-colors"
          onClick={() => console.log("ACTION: export_scan_report")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: '0' }}>
            <path d="M7 2v7M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="#425466" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="inline-block text-[#425466] font-['Inter',system-ui,sans-serif] font-medium shrink-0 text-[13px]/4">
            Export
          </div>
        </button>

        <div className="grow shrink basis-[0%] flex flex-col items-center">
          <div className="tracking-[-0.01em] inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold text-sm/4.5">
            Scan Summary
          </div>
          <div className="mt-px inline-block text-[#8792A2] font-['Inter',system-ui,sans-serif] text-[11px]/3.5">
            {scanMeta.domain} · Scanned {scanMeta.scanDate}
          </div>
        </div>

        <button
          className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0"
          onClick={() => console.log("ACTION: navigate_profile")}
        >
          <div
            className="w-8.5 h-8.5 flex items-center justify-center rounded-[50%] shrink-0"
            style={{ backgroundImage: 'linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(57.8% 0.034 -0.232) 100%)' }}
          >
            <div className="inline-block text-white font-['Inter',system-ui,sans-serif] font-bold shrink-0 text-xs/4">
              {scanMeta.userInitials}
            </div>
          </div>
        </button>
      </header>

      {children}
    </div>
  );
}
