import { engineAccuracies } from "@/data/mock-scan-brand-accuracy";

export function EngineAccuracyTable() {
  return (
    <div className="rounded-xl overflow-clip bg-white border border-solid border-[#E6EBF1]">
      <div className="py-4 px-5 border-b border-b-solid border-b-[#F1F5F9]">
        <div className="text-black font-sans text-base/5">
          Brand Accuracy per AI Engine
        </div>
      </div>

      {engineAccuracies.map((engine, i) => (
        <div
          key={engine.name}
          className={`flex items-center py-4 px-5 gap-4 ${i < engineAccuracies.length - 1 ? "border-b border-b-solid border-b-[#F1F5F9]" : ""}`}
        >
          <div
            className="flex items-center justify-center shrink-0 rounded-lg size-7"
            style={{ backgroundColor: engine.iconBg }}
          >
            <div className="inline-block text-white font-['Inter',system-ui,sans-serif] font-bold shrink-0 text-[11px]/3.5">
              {engine.initial}
            </div>
          </div>
          <div className="w-25 shrink-0 inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] font-medium text-[13px]/4">
            {engine.name}
          </div>
          <div className="grow shrink basis-[0%] h-2 rounded-[999px] overflow-clip bg-[#F1F5F9]">
            <div
              className="h-full rounded-[999px]"
              style={{ width: `${engine.accuracy}%`, backgroundColor: engine.barColor }}
            />
          </div>
          <div className="w-10.5 text-right inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold shrink-0 text-sm/4.5">
            {engine.accuracy}%
          </div>
          <div
            className="w-18 inline-block rounded-md py-0.75 px-2 [white-space-collapse:collapse] shrink-0"
            style={{ backgroundColor: engine.statusBg }}
          >
            <div
              className="inline-block text-center font-['Inter',system-ui,sans-serif] font-semibold text-[11px]/3.5"
              style={{ color: engine.statusColor }}
            >
              {engine.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
