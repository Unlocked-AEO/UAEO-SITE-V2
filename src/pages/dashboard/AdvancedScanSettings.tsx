import { dashboardUser } from "@/data/mock-dashboard";
import { advancedScanHeader } from "@/data/mock-advanced-scan";
import { IndustryContextCard } from "@/components/dashboard/IndustryContextCard";
import { CustomPromptsCard } from "@/components/dashboard/CustomPromptsCard";
import { PromptBankSection } from "@/components/dashboard/PromptBankSection";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {/* Industry card skeleton */}
      <div className="rounded-[14px] bg-white border border-border-light animate-pulse">
        <div className="pt-5 pb-4 px-6 border-b border-[#F0F4F8]">
          <div className="h-[18px] w-36 bg-[#E6EBF1] rounded" />
          <div className="mt-2 h-4 w-64 bg-[#F0F4F8] rounded" />
        </div>
        <div className="flex py-5 px-6 gap-6">
          <div className="w-70 flex flex-col gap-2.5">
            <div className="h-3 w-16 bg-[#F0F4F8] rounded" />
            <div className="h-10 bg-[#F0F4F8] rounded-[10px]" />
          </div>
          <div className="grow flex gap-3">
            <div className="grow flex flex-col gap-1.5">
              <div className="h-4 w-24 bg-[#F0F4F8] rounded" />
              <div className="h-10 bg-[#F0F4F8] rounded-[10px]" />
            </div>
            <div className="grow flex flex-col gap-1.5">
              <div className="h-4 w-20 bg-[#F0F4F8] rounded" />
              <div className="h-10 bg-[#F0F4F8] rounded-[10px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Prompts skeleton */}
      <div className="rounded-[14px] bg-white border border-border-light animate-pulse">
        <div className="pt-5 pb-4 px-6 border-b border-[#F0F4F8]">
          <div className="h-[18px] w-32 bg-[#E6EBF1] rounded" />
          <div className="mt-2 h-4 w-56 bg-[#F0F4F8] rounded" />
        </div>
        <div className="p-6">
          <div className="h-[52px] bg-[#F0F4F8] rounded-[10px]" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[14px] bg-white border border-border-light p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        No scan configuration yet
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm mx-auto">
        Set up your industry and prompts to customize your scans.
      </p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="rounded-[14px] bg-white border border-[#FEE2E2] p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        Unable to load settings
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm mx-auto">
        Something went wrong. Please try again.
      </p>
      <button
        className="mt-6 inline-flex items-center rounded-[10px] py-2.5 px-5.5 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: retry_load_settings")}
      >
        <span className="text-white font-sans text-[13px]/4">Retry</span>
      </button>
    </div>
  );
}

export default function AdvancedScanSettings() {
  return (
    <div className="font-sans antialiased flex flex-col min-h-screen bg-surface">
      {/* Header bar */}
      <header className="flex items-center h-14 shrink-0 px-7 bg-white border-b border-border-light">
        <button
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
          onClick={() => console.log("ACTION: navigate_home")}
        >
          <div className="flex items-center justify-center shrink-0 rounded-md bg-teal size-7">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <circle cx="8" cy="8" r="5.5" stroke="#FFFFFF" strokeWidth="1.5" />
              <path d="M5.5 8h5M8 5.5v5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-navy font-sans text-sm/[18px]">
            Unlocked AEO
          </span>
        </button>
        <div className="grow" />
        <div className="flex items-center gap-2">
          <span className="text-slate-body font-sans text-sm/[18px]">
            {dashboardUser.company}
          </span>
          <div className="flex items-center justify-center shrink-0 rounded-full bg-teal size-9">
            <span className="text-white font-sans text-[13px]/4">
              {dashboardUser.initials}
            </span>
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="flex items-center pt-7 pb-5 gap-3.5 px-10">
        <button
          className="flex items-center justify-center shrink-0 rounded-lg bg-white border-[1.5px] border-border-light size-8 cursor-pointer hover:bg-surface transition-colors"
          onClick={() => console.log("ACTION: navigate_back_to_run_scan")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M9 11L5 7L9 3" stroke="#425466" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <h1 className="tracking-[-0.3px] text-navy font-sans text-xl/6 m-0">
            {advancedScanHeader.title}
          </h1>
          <p className="mt-0.5 text-[#94A3B8] font-sans text-[13px]/4 m-0">
            {advancedScanHeader.subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col pb-10 gap-5 px-10">
        {DEMO_STATE === "loading" && <LoadingSkeleton />}
        {DEMO_STATE === "success" && (
          <>
            <IndustryContextCard />
            <CustomPromptsCard />
            <PromptBankSection />
          </>
        )}
        {DEMO_STATE === "empty" && <EmptyState />}
        {DEMO_STATE === "error" && <ErrorState />}
      </div>

      {/* Sticky footer */}
      <div className="sticky bottom-0 flex items-center justify-end py-4 px-10 gap-3 bg-white border-t border-border-light">
        <button
          className="rounded-[9px] py-2.75 px-5.5 bg-white border-[1.5px] border-border-light cursor-pointer hover:bg-surface transition-colors"
          onClick={() => console.log("ACTION: cancel_advanced_settings")}
        >
          <span className="text-navy font-sans text-[13px]/4">Cancel</span>
        </button>
        <button
          className="rounded-[9px] py-2.75 px-7 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: save_advanced_settings")}
        >
          <span className="text-white font-sans text-[13px]/4">
            Save & Apply
          </span>
        </button>
      </div>
    </div>
  );
}
