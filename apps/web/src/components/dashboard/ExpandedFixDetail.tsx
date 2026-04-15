import { expandedFixData } from "@/data/mock-fix-detail";
import type { FixStep, ContentFix, ImpactMetric } from "@/data/mock-fix-detail";

// ─── Section Icons ─────────────────────────────────────────

function InfoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <circle cx="7" cy="7" r="5.5" stroke="#4ECDC4" strokeWidth="1.4" />
      <path d="M7 6v4M7 4.5v.5" stroke="#4ECDC4" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function StepsIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M2 4h10M2 7h7M2 10h5" stroke="#4ECDC4" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ContentIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <rect x="2" y="2" width="10" height="10" rx="2" stroke="#4ECDC4" strokeWidth="1.4" />
      <path d="M5 5h4M5 7.5h2.5" stroke="#4ECDC4" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M2 11L5 7l3 2 4-5" stroke="#4ECDC4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Section Header ────────────────────────────────────────

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center mb-3 gap-2">
      <div className="flex items-center justify-center shrink-0 rounded-md bg-[#F0F4F8] size-6">
        {icon}
      </div>
      <div className="uppercase tracking-[0.5px] text-[#0A2540] font-sans font-bold text-xs/4">
        {title}
      </div>
    </div>
  );
}

// ─── Step Row ──────────────────────────────────────────────

function StepRow({ step }: { step: FixStep }) {
  return (
    <div className="flex items-start gap-3">
      <div className="size-5.5 flex items-center justify-center shrink-0 mt-px rounded-full bg-teal">
        <span className="text-white font-sans font-bold text-[11px]/3.5">
          {step.number}
        </span>
      </div>
      <div className="text-[13px]/[160%] pt-0.5 text-[#425466] font-sans">
        {step.text}
      </div>
    </div>
  );
}

// ─── Content Fix Card ──────────────────────────────────────

function ContentFixCard({ fix }: { fix: ContentFix }) {
  return (
    <div className="flex flex-col rounded-lg py-3 px-3.5 gap-1.5 bg-[#F7F9FB] border border-border-light">
      <div className="flex items-center justify-between">
        <span className="text-[#0A2540] font-sans font-semibold text-xs/4">
          {fix.url}
        </span>
        <span className="rounded-sm py-0.5 px-1.75 bg-[#FFF5F5]">
          <span className="text-danger font-sans font-semibold text-[11px]/3.5">
            Needs Fix
          </span>
        </span>
      </div>
      <div className="text-[11px]/[150%] text-slate-muted font-sans italic">
        Current: "{fix.current}"
      </div>
      <div className="text-[11px]/[150%] text-success font-sans">
        Suggested: "{fix.suggested}"
      </div>
    </div>
  );
}

// ─── Impact Card ───────────────────────────────────────────

function ImpactCard({ metric }: { metric: ImpactMetric }) {
  const bgClass = metric.progressColor === "teal" ? "bg-[#F7FEFE] border-[#C8F0EE]" : "bg-[#F7FBF8] border-[#BDECD3]";

  return (
    <div className={`grow shrink basis-0 rounded-[10px] py-3.5 px-4 border ${bgClass}`}>
      <div className="uppercase tracking-[0.5px] mb-2 text-slate-muted font-sans font-bold text-[11px]/3.5">
        {metric.label}
      </div>
      <div className="flex items-center h-7 gap-2.5">
        <span className="text-[#94A3B8] font-sans text-[22px]/7">
          {metric.from}
        </span>
        <span className="tracking-[1px] text-[#CBD5E1] font-sans text-[15px]/[18px]">
          →
        </span>
        <span className="font-sans text-[26px]/8" style={{ color: metric.toColor }}>
          {metric.to}
        </span>
      </div>
      <div className="h-1.5 rounded-[3px] overflow-clip bg-[#E6EBF1] mt-2">
        <div
          className="h-full rounded-[3px] bg-success"
          style={{ width: `${metric.progressPercent}%` }}
        />
      </div>
      <div className="mt-1.5 text-success font-sans font-semibold text-[11px]/3.5">
        {metric.projectedLabel}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────

export function ExpandedFixDetail() {
  return (
    <div className="flex flex-col border-t border-border-light">
      {/* Why This Matters */}
      <div className="pt-5 pb-4.5 border-b border-[#F0F4F8] px-5">
        <SectionHeader icon={<InfoIcon />} title="Why This Matters" />
        <div className="text-[13px]/[165%] text-[#425466] font-sans">
          {expandedFixData.whyItMatters}
        </div>
      </div>

      {/* Steps to Fix */}
      <div className="pt-5 pb-4.5 border-b border-[#F0F4F8] px-5">
        <SectionHeader icon={<StepsIcon />} title="Steps to Fix" />
        <div className="flex flex-col gap-2.5">
          {expandedFixData.steps.map((step) => (
            <StepRow key={step.number} step={step} />
          ))}
        </div>
      </div>

      {/* Specific Content to Fix */}
      <div className="pt-5 pb-4.5 border-b border-[#F0F4F8] px-5">
        <SectionHeader icon={<ContentIcon />} title="Specific Content to Fix" />
        <div className="flex flex-col gap-2">
          {expandedFixData.contentFixes.map((fix) => (
            <ContentFixCard key={fix.id} fix={fix} />
          ))}
        </div>
      </div>

      {/* Estimated Impact */}
      <div className="p-5">
        <SectionHeader icon={<ChartIcon />} title="Estimated Impact" />
        <div className="flex gap-3">
          {expandedFixData.impactMetrics.map((metric) => (
            <ImpactCard key={metric.label} metric={metric} />
          ))}
          <div className="w-[180px] shrink-0 flex flex-col justify-between rounded-[10px] py-3.5 px-4 bg-[#F9F7FF] border border-[#D9CFE8]">
            <div className="uppercase tracking-[0.5px] text-slate-muted font-sans font-bold text-[11px]/3.5">
              Effort
            </div>
            <div className="tracking-[-0.5px] text-navy font-sans font-extrabold text-[22px]/7 my-1.5">
              {expandedFixData.effort.level}
            </div>
            <span className="w-fit rounded-sm py-0.75 px-2 bg-[#EDE8F7]">
              <span className="text-[#7B61B8] font-sans font-semibold text-[11px]/3.5">
                {expandedFixData.effort.hours}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
