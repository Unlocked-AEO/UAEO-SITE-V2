import { scanVariablesSection, scanVariables } from "@/data/mock-advanced-scan";
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
          {scanVariablesSection.sectionTitle}
        </h2>
        <p className="mt-1 text-[#94A3B8] font-sans text-xs/4 m-0">
          {scanVariablesSection.sectionSubtitle}
        </p>
      </div>

      {/* Content */}
      <div className="flex py-5 px-6 flex-col gap-3">
        {/* Industry (read-only) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[#64748B] font-sans text-xs/4">
            Industry
          </label>
          <div className="flex items-center rounded-[10px] py-2.5 px-3.5 min-h-10 bg-[#F8FAFC] border border-border-light">
            <span className="text-navy font-sans text-[13px]/4">
              {scanVariablesSection.industry}
            </span>
          </div>
        </div>

        {/* Variable fields */}
        <div className="flex gap-3 flex-col sm:flex-row">
          {scanVariables.map((variable) => (
            <VariableField key={variable.name} variable={variable} />
          ))}
        </div>
      </div>
    </div>
  );
}
