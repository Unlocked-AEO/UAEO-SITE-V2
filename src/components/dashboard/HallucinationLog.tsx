import { hallucinations } from "@/data/mock-scan-brand-accuracy";

const severityConfig: Record<string, { bg: string; text: string }> = {
  High: { bg: "bg-[#FEF2F2]", text: "text-[#EF4444]" },
  Medium: { bg: "bg-[#FFF7ED]", text: "text-[#F97316]" },
  Low: { bg: "bg-[#F1F5F9]", text: "text-[#64748B]" },
};

export function HallucinationLog() {
  return (
    <div className="rounded-xl overflow-clip bg-white border border-solid border-[#E6EBF1]">
      {/* Header */}
      <div className="flex items-center py-4 px-5 gap-2 border-b border-b-solid border-b-[#F1F5F9]">
        <div className="grow shrink basis-[0%] inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-sm/4.5">
          Hallucination Log
        </div>
        <div className="inline-block text-[#64748B] font-['Inter',system-ui,sans-serif] font-medium shrink-0 text-xs/4">
          {hallucinations.length} issues found
        </div>
      </div>

      {/* Column headers */}
      <div className="flex items-center py-2.5 px-5 gap-3 bg-[#F8FAFC] border-b border-b-solid border-b-[#F1F5F9]">
        <div className="uppercase [letter-spacing:0.05em] w-27.5 inline-block text-[#94A3B8] font-['Inter',system-ui,sans-serif] font-semibold shrink-0 text-[11px]/3.5">
          AI Engine
        </div>
        <div className="uppercase [letter-spacing:0.05em] grow shrink basis-[0%] inline-block text-[#94A3B8] font-['Inter',system-ui,sans-serif] font-semibold text-[11px]/3.5">
          Hallucination
        </div>
        <div className="uppercase [letter-spacing:0.05em] w-22.5 inline-block text-[#94A3B8] font-['Inter',system-ui,sans-serif] font-semibold shrink-0 text-[11px]/3.5">
          Category
        </div>
        <div className="uppercase [letter-spacing:0.05em] w-20 inline-block text-[#94A3B8] font-['Inter',system-ui,sans-serif] font-semibold shrink-0 text-[11px]/3.5">
          Severity
        </div>
      </div>

      {/* Rows */}
      {hallucinations.map((h, i) => {
        const sev = severityConfig[h.severity];
        return (
          <div
            key={i}
            className={`flex items-center py-3.5 px-5 gap-3 ${i < hallucinations.length - 1 ? "border-b border-b-solid border-b-[#F1F5F9]" : ""}`}
          >
            <div className="w-27.5 inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold shrink-0 text-[13px]/4">
              {h.engine}
            </div>
            <div className="grow shrink basis-[0%] inline-block text-[#475569] font-['Inter',system-ui,sans-serif] text-[13px]/4">
              {h.text}
            </div>
            <div className="w-22.5 inline-block text-[#64748B] font-['Inter',system-ui,sans-serif] shrink-0 text-xs/4">
              {h.category}
            </div>
            <div className="w-20 shrink-0">
              <div className={`inline-block rounded-md py-0.75 px-2 ${sev.bg}`}>
                <div className={`inline-block ${sev.text} font-['Inter',system-ui,sans-serif] font-semibold text-[11px]/3.5`}>
                  {h.severity}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
