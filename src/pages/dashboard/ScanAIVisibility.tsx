import { scanMeta } from "@/data/mock-scan-overview";
import { aiVisibilityScore } from "@/data/mock-scan-ai-visibility";
import { ScanVisibilityStats } from "@/components/dashboard/ScanVisibilityStats";
import { ScanPromptTable } from "@/components/dashboard/ScanPromptTable";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function ScanAIVisibility() {
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
            No visibility data
          </span>
          <p className="text-[#8792A2] font-['Inter',system-ui,sans-serif] text-sm max-w-[400px] text-center">
            AI visibility data is not available for this scan yet.
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
            We couldn't load the AI visibility data. Please try again.
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
        {/* Score Hero — AI Visibility */}
        <div className="flex items-center rounded-xl py-6 px-7 gap-7 bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px]">
          <svg width="124" height="124" viewBox="0 0 124 124" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <circle cx="62" cy="62" r="52" fill="none" stroke="#F0F4F8" strokeWidth="11" />
            <circle cx="62" cy="62" r="52" fill="none" stroke="#FF9F43" strokeWidth="11" strokeDasharray="214 327" strokeLinecap="round" transform="rotate(-90 62 62)" />
            <text x="62" y="58" textAnchor="middle" dominantBaseline="central" fontFamily="Inter" fontSize="28" fontWeight="800" fill="#0A2540">
              {aiVisibilityScore.score}
            </text>
            <text x="62" y="80" textAnchor="middle" dominantBaseline="central" fontFamily="Inter" fontSize="10" fontWeight="500" fill="#8792A2">
              /{aiVisibilityScore.max}
            </text>
          </svg>
          <div className="grow shrink basis-[0%] min-w-0">
            <div className="flex items-center justify-center mb-2 gap-2.5">
              <div className="inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold shrink-0 text-lg/5.5">
                {aiVisibilityScore.title}
              </div>
            </div>
            <div className="text-[13px] leading-[round(up,170%,1px)] text-center text-[#425466] font-sans">
              {aiVisibilityScore.summary}
            </div>
          </div>
        </div>

        {/* Category Tabs — AI Visibility active */}
        <div className="flex items-center rounded-[10px] overflow-clip bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px]">
          <button className="grow shrink basis-[0%] flex items-center justify-center py-3.5 px-2.5 gap-1.5 border-b-2 border-b-solid border-b-[#00000000] bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer" onClick={() => console.log("ACTION: switch_scan_tab", { tab: "summary" })}>
            <div className="[white-space-collapse:collapse] inline-block w-max text-[#8792A2] font-sans shrink-0 text-[13px]/4">Summary</div>
          </button>
          <button className="grow shrink basis-[0%] flex items-center justify-center py-3.5 px-2.5 gap-1.5 border-b-2 border-b-solid border-b-[#4ECDC4] bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer" onClick={() => console.log("ACTION: switch_scan_tab", { tab: "ai-visibility" })}>
            <div className="[white-space-collapse:collapse] inline-block w-max text-[#0A2540] font-sans shrink-0 text-[13px]/4">AI Visibility</div>
          </button>
          <button className="grow shrink basis-[0%] flex items-center justify-center py-3.5 px-2.5 gap-1.5 border-b-2 border-b-solid border-b-[#00000000] bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer" onClick={() => console.log("ACTION: switch_scan_tab", { tab: "brand-accuracy" })}>
            <div className="[white-space-collapse:collapse] inline-block w-max text-[#8792A2] font-sans shrink-0 text-[13px]/4">Brand Accuracy</div>
            <div className="[white-space-collapse:collapse] inline-block rounded-[99px] py-0.5 px-1.75 bg-[#E8F5E9]">
              <div className="inline-block w-max text-[#27AE60] font-sans text-[11px]/3.5">81</div>
            </div>
          </button>
          <button className="grow shrink basis-[0%] flex items-center justify-center py-3.5 px-2.5 gap-1.5 border-b-2 border-b-solid border-b-[#00000000] bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer" onClick={() => console.log("ACTION: switch_scan_tab", { tab: "sentiment" })}>
            <div className="[white-space-collapse:collapse] inline-block w-max text-[#8792A2] font-sans shrink-0 text-[13px]/4">Sentiment</div>
            <div className="[white-space-collapse:collapse] inline-block rounded-[99px] py-0.5 px-1.75 bg-[#E8F5E9]">
              <div className="inline-block w-max text-[#27AE60] font-sans text-[11px]/3.5">74</div>
            </div>
          </button>
          <button className="grow shrink basis-[0%] flex items-center justify-center py-3.5 px-2.5 gap-1.5 border-b-2 border-b-solid border-b-[#00000000] bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer" onClick={() => console.log("ACTION: switch_scan_tab", { tab: "schema-coverage" })}>
            <div className="[white-space-collapse:collapse] inline-block w-max text-[#8792A2] font-sans shrink-0 text-[13px]/4">Schema Coverage</div>
            <div className="[white-space-collapse:collapse] inline-block rounded-[99px] py-0.5 px-1.75 bg-[#FFF3E0]">
              <div className="inline-block w-max text-[#E67E22] font-sans text-[11px]/3.5">45</div>
            </div>
          </button>
          <button className="grow shrink basis-[0%] flex items-center justify-center py-3.5 px-2.5 gap-1.5 border-b-2 border-b-solid border-b-[#00000000] bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer" onClick={() => console.log("ACTION: switch_scan_tab", { tab: "content-freshness" })}>
            <div className="[white-space-collapse:collapse] inline-block w-max text-[#8792A2] font-sans shrink-0 text-[13px]/4">Content Freshness</div>
            <div className="[white-space-collapse:collapse] inline-block rounded-[99px] py-0.5 px-1.75 bg-[#E8F5E9]">
              <div className="inline-block w-max text-[#27AE60] font-sans text-[11px]/3.5">77</div>
            </div>
          </button>
          <button className="grow shrink basis-[0%] flex items-center justify-center py-3.5 px-2.5 gap-1.5 border-b-2 border-b-solid border-b-[#00000000] bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer" onClick={() => console.log("ACTION: switch_scan_tab", { tab: "eeat" })}>
            <div className="[white-space-collapse:collapse] inline-block w-max text-[#8792A2] font-sans shrink-0 text-[13px]/4">EEAT</div>
            <div className="[white-space-collapse:collapse] inline-block rounded-[99px] py-0.5 px-1.75 bg-[#FFF3E0]">
              <div className="inline-block w-max text-[#E67E22] font-sans text-[11px]/3.5">61</div>
            </div>
          </button>
        </div>

        {/* Stats Bar — Mentions, Citations, Recommendations + Engine Mini Scores */}
        <ScanVisibilityStats />

        {/* Prompt Results Table */}
        <ScanPromptTable />
      </div>

      {/* Bottom bar */}
      <div className="flex items-center py-4 px-7 gap-3 bg-white border-t border-t-solid border-t-[#E6EBF1] shrink-0">
        <div className="grow shrink basis-[0%]" />
      </div>
    </Shell>
  );
}

// ─── Shell layout ──────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-['Inter',system-ui,sans-serif] antialiased flex overflow-clip flex-col min-h-screen bg-[#F0F4F8] text-xs/4">
      <header className="h-14 flex items-center shrink-0 px-7 gap-3 bg-white border-b border-b-solid border-b-[#E6EBF1]">
        <button
          className="flex items-center rounded-lg py-1.5 px-3.5 gap-1.5 bg-[#F7F9FC] border border-solid border-[#E6EBF1] cursor-pointer hover:bg-[#EEF1F5] transition-colors"
          onClick={() => console.log("ACTION: navigate_back")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: '0' }}>
            <path d="M9 2L4 7l5 5" stroke="#425466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="inline-block text-[#425466] font-['Inter',system-ui,sans-serif] font-medium shrink-0 text-[13px]/4">
            Back
          </div>
        </button>

        <button
          className="flex items-center rounded-lg py-1.5 px-3.5 gap-1.5 bg-[#F7F9FC] border border-solid border-[#E6EBF1] cursor-pointer hover:bg-[#EEF1F5] transition-colors"
          onClick={() => console.log("ACTION: export_scan_report")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: '0' }}>
            <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="#425466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="inline-block text-[#425466] font-['Inter',system-ui,sans-serif] font-medium shrink-0 text-[13px]/4">
            Export
          </div>
        </button>

        <div className="grow shrink basis-[0%] flex flex-col items-center justify-center">
          <div className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold text-sm/4.5">
            Scan Summary
          </div>
          <div className="text-[#8792A2] font-['Inter',system-ui,sans-serif] text-[11px]/3.5">
            {scanMeta.domain} · Scanned {scanMeta.scanDate}
          </div>
        </div>

        <button
          className="flex items-center justify-center rounded-[50%] bg-[#4ECDC4] shrink-0 size-9 border-none cursor-pointer"
          onClick={() => console.log("ACTION: navigate_profile")}
        >
          <div className="flex text-white font-['Inter',system-ui,sans-serif] font-bold shrink-0 text-[13px]/4">
            {scanMeta.userInitials}
          </div>
        </button>
      </header>

      {children}
    </div>
  );
}
