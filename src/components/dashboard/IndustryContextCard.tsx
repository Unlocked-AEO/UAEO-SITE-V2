import { industryContext, scanVariables } from "@/data/mock-advanced-scan";
import type { ScanVariable } from "@/data/mock-advanced-scan";

function LocationIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#94A3B8"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4ECDC4"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function VariableField({ variable }: { variable: ScanVariable }) {
  return (
    <div className="grow shrink basis-0 flex flex-col gap-1.5">
      <label className="text-[#64748B] font-sans text-xs/4">
        {variable.label}
      </label>
      <div className="flex items-center rounded-[10px] py-2.5 px-3.5 gap-2 min-h-10 bg-white border border-border-light">
        {variable.hasIcon && <LocationIcon />}
        <span
          className={`font-sans text-[13px]/4 ${
            variable.value ? "text-navy" : "text-[#CBD5E1]"
          }`}
        >
          {variable.value || variable.placeholder}
        </span>
      </div>
    </div>
  );
}

export function IndustryContextCard() {
  return (
    <div className="flex flex-col rounded-[14px] overflow-clip bg-white border border-border-light">
      {/* Header */}
      <div className="pt-5 pb-4 border-b border-[#F0F4F8] px-6">
        <h2 className="text-navy font-sans text-sm/[18px] m-0">
          {industryContext.sectionTitle}
        </h2>
        <p className="mt-0.5 text-[#94A3B8] font-sans text-xs/4 m-0">
          {industryContext.sectionSubtitle}
        </p>
      </div>

      {/* Content */}
      <div className="flex py-5 px-6 flex-col lg:flex-row">
        {/* Industry */}
        <div className="flex flex-col w-full lg:w-70 lg:pr-6 gap-2.5 shrink-0 pb-5 lg:pb-0">
          <span className="tracking-[0.08em] uppercase text-[#94A3B8] font-sans text-[10px]/3">
            INDUSTRY
          </span>
          <button
            className="flex items-center rounded-[10px] py-2.75 px-3.5 gap-2.5 min-h-10 bg-[#F7FEFE] border-[1.5px] border-teal cursor-pointer w-full text-left"
            onClick={() => console.log("ACTION: change_industry")}
          >
            <span className="grow text-navy font-sans text-[13px]/4">
              {industryContext.industry}
            </span>
            <ChevronDownIcon />
          </button>
          <span className="text-[11px]/[140%] text-[#94A3B8] font-sans">
            {industryContext.industryNote}
          </span>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px shrink-0 bg-border-light" />

        {/* Scan Variables */}
        <div className="grow flex flex-col lg:pl-6 gap-3">
          <span className="tracking-[0.08em] uppercase text-[#94A3B8] font-sans text-[10px]/3">
            SCAN VARIABLES
          </span>
          <div className="flex gap-3 flex-col sm:flex-row">
            {scanVariables.map((variable) => (
              <VariableField key={variable.name} variable={variable} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
