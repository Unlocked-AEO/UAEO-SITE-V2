import {
  companyProfileFields,
  companyProfileSection,
} from "@/data/mock-profile";
import type { FormField } from "@/data/mock-profile";

function LockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#CBD5E1"
      strokeWidth="2"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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

function FormFieldInput({ field }: { field: FormField }) {
  if (field.locked) {
    return (
      <div className="flex items-center rounded-[10px] py-2.75 px-3.5 gap-2 bg-[#FAFBFC] border-[1.5px] border-[#F0F4F8]">
        <LockIcon />
        <span className="text-[#94A3B8] font-sans text-[13px]/4">
          {field.value}
        </span>
        <span className="ml-auto rounded-sm py-0.5 px-1.75 bg-[#F0F4F8]">
          <span className="tracking-[0.04em] text-[#94A3B8] font-sans text-[10px]/3">
            FIXED
          </span>
        </span>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <button
        className="flex items-center rounded-[10px] py-2.75 px-3.5 gap-2.5 bg-[#F7FEFE] border-[1.5px] border-teal cursor-pointer w-full text-left"
        onClick={() =>
          console.log("ACTION: open_dropdown", { field: field.name })
        }
      >
        <span className="grow text-navy font-sans text-[13px]/4">
          {field.value}
        </span>
        <ChevronDownIcon />
      </button>
    );
  }

  return (
    <div className="flex items-center rounded-[10px] py-2.75 px-3.5 bg-white border-[1.5px] border-border-light">
      <span className="text-navy font-sans text-[13px]/4">{field.value}</span>
    </div>
  );
}

export function CompanyProfileCard() {
  // Pair fields into rows of 2
  const rows: FormField[][] = [];
  for (let i = 0; i < companyProfileFields.length; i += 2) {
    rows.push(companyProfileFields.slice(i, i + 2));
  }

  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light">
      {/* Section header */}
      <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
        <h2 className="text-navy font-sans text-[15px]/[18px] m-0">
          {companyProfileSection.title}
        </h2>
        <p className="mt-0.75 text-[#94A3B8] font-sans text-xs/4 m-0">
          {companyProfileSection.subtitle}
        </p>
      </div>

      {/* Form fields */}
      <div className="flex flex-col gap-6 p-7">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex flex-col sm:flex-row gap-6">
            {row.map((field) => (
              <div
                key={field.name}
                className="grow shrink basis-0 flex flex-col gap-1.75"
              >
                <label className="text-[#475569] font-sans text-xs/4">
                  {field.label}
                </label>
                <FormFieldInput field={field} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end py-4 px-7 bg-[#FAFBFC] border-t border-[#F0F4F8]">
        <button
          className="flex items-center rounded-[10px] py-2.5 px-5.5 gap-2.5 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: save_company_profile")}
        >
          <span className="text-white font-sans text-[13px]/4">
            Save Changes
          </span>
        </button>
      </div>
    </div>
  );
}
