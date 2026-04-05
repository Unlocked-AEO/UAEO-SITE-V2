import { useNavigate } from "react-router-dom";
import { scanMeta } from "@/data/mock-scan-overview";
import { contentFreshnessScore } from "@/data/mock-scan-content-freshness";
import { ScanTabs } from "@/components/dashboard/ScanTabs";
import { FreshnessStats } from "@/components/dashboard/FreshnessStats";
import { FreshnessPageTable } from "@/components/dashboard/FreshnessPageTable";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function ScanContentFreshness() {
  const navigate = useNavigate();

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
            No freshness data
          </span>
          <p className="text-[#8792A2] font-['Inter',system-ui,sans-serif] text-sm max-w-[400px] text-center">
            Content freshness data is not available for this scan yet.
          </p>
          <button
            className="rounded-[10px] py-3 px-6 bg-[#4ECDC4] text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-sm border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate("/dashboard/scans")}
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
            We couldn't load the content freshness data. Please try again.
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
      <div className="grow shrink basis-[0%] flex flex-col py-6 px-7 gap-3">
        {/* Score Hero — Content Freshness */}
        <div className="flex items-center rounded-xl py-7 px-10 gap-7 bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px]">
          <div className="relative w-31 h-31 shrink-0">
            <svg width="124" height="124" viewBox="0 0 124 124" xmlns="http://www.w3.org/2000/svg">
              <circle cx="62" cy="62" r="52" fill="none" stroke="#F0F4F8" strokeWidth="11" />
              <circle cx="62" cy="62" r="52" fill="none" stroke="#FF9F43" strokeWidth="11" strokeDasharray="222 104" strokeLinecap="round" transform="rotate(-90 62 62)" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center inset-0">
              <div className="text-[28px] leading-[round(up,100%,1px)] inline-block [white-space-collapse:preserve] text-[#0A2540] font-['Inter',system-ui,sans-serif] font-extrabold">
                {contentFreshnessScore.score}
              </div>
              <div className="inline-block [white-space-collapse:preserve] text-[#8792A2] font-['Inter',system-ui,sans-serif] font-medium text-[10px]/3">
                /{contentFreshnessScore.max}
              </div>
            </div>
          </div>
          <div className="flex flex-col grow shrink basis-[0%] gap-2 items-center">
            <div className="inline-block [white-space-collapse:preserve] text-center text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold text-[17px]/5.5">
              {contentFreshnessScore.title}
            </div>
            <div className="text-[14px] leading-[round(up,165%,1px)] max-w-215 [white-space-collapse:preserve] text-center text-[#64748B] font-['Inter',system-ui,sans-serif] m-0">
              {contentFreshnessScore.summary}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <ScanTabs activeTab="content-freshness" />

        {/* Stat Cards */}
        <FreshnessStats />

        {/* Page Freshness Table */}
        <FreshnessPageTable />
      </div>
    </Shell>
  );
}

// ─── Shell layout ──────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="font-['Inter',system-ui,sans-serif] antialiased flex overflow-clip flex-col min-h-screen bg-[#F0F4F8] text-xs/4">
      <header className="h-15 flex items-center shrink-0 px-7 gap-2 bg-white border-b border-b-solid border-b-[#E6EBF1]">
        <button
          className="flex items-center rounded-md py-1.75 px-3.5 gap-1.5 bg-white [border-width:1.5px] border-solid border-[#D6DCE3] cursor-pointer hover:bg-[#F8FAFC] transition-colors"
          onClick={() => navigate("/dashboard/scans")}
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
          onClick={() => navigate("/dashboard/profile")}
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
