import { fixItems, planTabs } from "@/data/mock-improvement-plan";
import type { FixItem, FixStatus } from "@/data/mock-improvement-plan";
import { ExpandedFixDetail } from "@/components/dashboard/ExpandedFixDetail";

// ─── Status Icon ───────────────────────────────────────────

function StatusIcon({ status }: { status: FixStatus }) {
  if (status === "completed") {
    return (
      <div className="flex items-center justify-center shrink-0 rounded-full bg-[#E8F8F2] size-5">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <path d="M2 6l3 3 5-5" stroke="#27AE60" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (status === "in-progress") {
    return (
      <div className="flex items-center justify-center shrink-0 rounded-full bg-[#FFF4E6] size-5">
        <div className="rounded-full bg-[#FF9F43] size-1.75" />
      </div>
    );
  }
  if (status === "dismissed") {
    return (
      <div className="flex items-center justify-center shrink-0 rounded-full bg-[#F0F4F8] size-5">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <path d="M3 3l6 6M9 3l-6 6" stroke="#8792A2" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center shrink-0 rounded-full bg-[#F0F4F8] size-5">
      <div className="rounded-full bg-[#C4CAD4] size-1.75" />
    </div>
  );
}

// ─── Status Badge Config ───────────────────────────────────

const statusBadge: Record<FixStatus, { label: string; bg: string; border: string; text: string }> = {
  completed: { label: "Completed", bg: "bg-[#E8F8F2]", border: "border-[#BDECD3]", text: "text-[#27AE60]" },
  "in-progress": { label: "In Progress", bg: "bg-[#FFF8EE]", border: "border-[#FFD699]", text: "text-[#FF9F43]" },
  "not-started": { label: "Not Started", bg: "bg-[#F0F4F8]", border: "border-[#D6DCE3]", text: "text-[#8792A2]" },
  dismissed: { label: "Dismissed", bg: "bg-[#F0F4F8]", border: "border-[#D6DCE3]", text: "text-[#8792A2]" },
};

// ─── Collapsed Fix Row ─────────────────────────────────────

function FixRow({ fix }: { fix: FixItem }) {
  const badge = statusBadge[fix.status];
  const isDismissed = fix.status === "dismissed";

  return (
    <div
      className={`flex items-center rounded-[10px] py-3.5 px-4 gap-4 bg-[#FAFBFC] border border-border-light ${
        isDismissed ? "opacity-50" : ""
      }`}
    >
      <StatusIcon status={fix.status} />
      <div className="grow shrink basis-0 min-w-0">
        <div className={`text-[13px]/[140%] font-sans font-bold ${isDismissed ? "text-[#8792A2] line-through decoration-1" : "text-[#0A2540]"}`}>
          {fix.title}
        </div>
        <div className={`mt-0.75 text-xs/4 font-sans ${isDismissed ? "text-[#8792A2]" : "text-[#425466]"}`}>
          {fix.description}
        </div>
      </div>
      <div className="flex items-center shrink-0 gap-2">
        {fix.impact && (
          <div className="flex items-center rounded-md py-0.75 px-2 gap-1 bg-[#EEF9F4] border border-[#BDECD3]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M5 8V2M2 5l3-3 3 3" stroke="#27AE60" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-[#27AE60] font-sans font-semibold text-[11px]/3.5 whitespace-nowrap">
              {fix.impact.label}
            </div>
          </div>
        )}
        <div className={`rounded-md py-1 px-2.5 ${badge.bg} border ${badge.border}`}>
          <div className={`${badge.text} font-sans font-semibold text-[11px]/3.5 whitespace-nowrap`}>
            {badge.label}
          </div>
        </div>
        <button
          className="flex items-center justify-center shrink-0 rounded-md bg-[#F0F4F8] size-7 border-none cursor-pointer hover:bg-[#E6EBF1] transition-colors"
          onClick={() => console.log("ACTION: expand_fix_details", { id: fix.id })}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#8792A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Expanded Fix Row ──────────────────────────────────────

function ExpandedFixRow({ fix }: { fix: FixItem }) {
  const badge = statusBadge[fix.status];

  return (
    <div className="rounded-[10px] overflow-clip bg-white border-[1.5px] border-teal">
      {/* Header — teal bg */}
      <div className="flex items-center py-3.5 px-4 gap-4 bg-[#F7FEFE]">
        <StatusIcon status={fix.status} />
        <div className="grow shrink basis-0 min-w-0">
          <div className="text-[13px]/[140%] font-sans font-bold text-[#0A2540]">
            {fix.title}
          </div>
          <div className="mt-0.75 text-xs/4 font-sans text-[#425466]">
            {fix.description}
          </div>
        </div>
        <div className="flex items-center shrink-0 gap-2">
          {fix.impact && (
            <div className="flex items-center rounded-md py-0.75 px-2 gap-1 bg-[#EEF9F4] border border-[#BDECD3]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M5 8V2M2 5l3-3 3 3" stroke="#27AE60" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-[#27AE60] font-sans font-semibold text-[11px]/3.5 whitespace-nowrap">
                {fix.impact.label}
              </div>
            </div>
          )}
          <div className={`rounded-md py-1 px-2.5 ${badge.bg} border ${badge.border}`}>
            <div className={`${badge.text} font-sans font-semibold text-[11px]/3.5 whitespace-nowrap`}>
              {badge.label}
            </div>
          </div>
          <button
            className="flex items-center justify-center shrink-0 rounded-md bg-[#E8F7F7] size-7 border-none cursor-pointer hover:bg-[#D0F0EF] transition-colors"
            onClick={() => console.log("ACTION: collapse_fix_details", { id: fix.id })}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M10.5 8.75L7 5.25L3.5 8.75" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      <ExpandedFixDetail />
    </div>
  );
}

// ─── Main Card ─────────────────────────────────────────────

interface ImprovementPlanCardProps {
  expandedFixId?: string;
}

export function ImprovementPlanCard({ expandedFixId }: ImprovementPlanCardProps) {
  return (
    <div className="flex flex-col rounded-xl overflow-clip bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      {/* Title */}
      <div className="pt-5 shrink-0 font-sans font-bold px-6 text-[15px]/[18px] text-navy">
        Improvement Plan
      </div>

      {/* Tabs */}
      <div className="flex mt-3 shrink-0 px-6 border-b border-border-light">
        {planTabs.map((tab) => (
          <button
            key={tab.slug}
            className={`-mb-px py-2.5 px-5 first:pl-0 first:pr-5 border-b-2 bg-transparent border-x-0 border-t-0 cursor-pointer transition-colors ${
              tab.slug === "fixes" ? "border-b-teal" : "border-b-transparent"
            }`}
            onClick={() => console.log("ACTION: switch_plan_tab", { tab: tab.slug })}
          >
            <div className={`font-sans text-[13px]/4 ${tab.slug === "fixes" ? "text-navy font-semibold" : "text-slate-muted"}`}>
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      {/* Fix items */}
      <div className="flex flex-col py-4 px-6 gap-2.5 overflow-auto">
        {fixItems.map((fix) =>
          fix.id === expandedFixId ? (
            <ExpandedFixRow key={fix.id} fix={fix} />
          ) : (
            <FixRow key={fix.id} fix={fix} />
          )
        )}
      </div>
    </div>
  );
}
