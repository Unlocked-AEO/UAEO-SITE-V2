import { useNavigate } from "react-router-dom";
import { runScanModal } from "@/data/mock-run-scan";

function GlobeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="7.5" cy="7.5" r="6" stroke="#94A3B8" strokeWidth="1.3" />
      <path
        d="M7.5 1.5C7.5 1.5 5.5 4.2 5.5 7.5s2 6 2 6M7.5 1.5C7.5 1.5 9.5 4.2 9.5 7.5s-2 6-2 6M1.5 7.5h12"
        stroke="#94A3B8"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AdvancedSettingsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M3 5h12M3 9h8M3 13h5"
        stroke="#425466"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="13" r="2.5" stroke="#4ECDC4" strokeWidth="1.5" />
      <path
        d="M14 11V9"
        stroke="#4ECDC4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M9 11L5 7L9 3"
        stroke="#425466"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="#CBD5E1"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RunScanModal() {
  const navigate = useNavigate();
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A254073] backdrop-blur-[4px] z-40"
        onClick={() => navigate("/dashboard/scans")}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] flex flex-col rounded-2xl gap-8 bg-white shadow-[0px_24px_64px_#0A25402E] p-9 z-50">
        {/* Back button */}
        <button
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 w-fit"
          onClick={() => navigate("/dashboard/scans")}
        >
          <div className="flex items-center justify-center size-[30px] shrink-0 rounded-[7px] bg-white border-[1.5px] border-border-light">
            <ChevronLeftIcon />
          </div>
          <span className="text-slate-body font-sans text-[13px]/4">
            {runScanModal.backLabel}
          </span>
        </button>

        {/* Title + description */}
        <div className="flex flex-col gap-2">
          <h2 className="tracking-[-0.3px] text-navy font-sans text-[22px]/7 m-0">
            {runScanModal.title}
          </h2>
          <p className="text-[14px]/[160%] text-[#64748B] font-sans m-0">
            {runScanModal.description}
          </p>
        </div>

        {/* Domain input */}
        <div className="flex flex-col gap-2">
          <label className="text-navy font-sans text-[13px]/4">
            {runScanModal.domainLabel}
          </label>
          <div className="flex items-center rounded-[10px] py-3 px-3.5 gap-2.5 bg-white border-[1.5px] border-teal">
            <GlobeIcon />
            <span className="grow text-navy font-sans text-sm/[18px]">
              {runScanModal.domainPlaceholder}
            </span>
          </div>
          <span className="text-[#94A3B8] font-sans text-xs/4">
            {runScanModal.domainHint}
          </span>
        </div>

        {/* Advanced Settings */}
        <button
          className="flex items-center rounded-xl py-4.5 px-4.5 gap-3.5 bg-[#FAFBFC] border border-border-light cursor-pointer text-left hover:bg-[#F0F4F8] transition-colors"
          onClick={() => navigate("/dashboard/scans/settings")}
        >
          <div className="flex items-center justify-center shrink-0 rounded-[10px] bg-[#F0F4F8] size-10">
            <AdvancedSettingsIcon />
          </div>
          <div className="grow flex flex-col gap-1">
            <span className="text-navy font-sans text-[13px]/4">
              {runScanModal.advancedSettingsTitle}
            </span>
            <span className="text-[12px]/[150%] text-[#94A3B8] font-sans">
              {runScanModal.advancedSettingsSubtitle}
            </span>
          </div>
          <ChevronRightIcon />
        </button>

        {/* Start Scan button */}
        <button
          className="flex items-center justify-center rounded-[10px] py-3.75 px-6 gap-2 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() =>
            console.log("ACTION: start_scan", {
              domain: runScanModal.domainPlaceholder,
            })
          }
        >
          <span className="tracking-[0.1px] text-white font-sans text-sm/[18px]">
            {runScanModal.submitLabel}
          </span>
        </button>
      </div>
    </>
  );
}
