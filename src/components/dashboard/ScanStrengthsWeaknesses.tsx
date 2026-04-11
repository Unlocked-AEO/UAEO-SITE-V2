import { strengths, weaknesses } from "@/data/mock-scan-overview";

export function ScanStrengthsWeaknesses() {
  return (
    <div className="flex gap-4">
      {/* Strengths */}
      <div className="rounded-xl py-3.5 px-4.5 basis-[0%] shrink grow bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px]">
        <div className="flex items-center mb-3.5 gap-2">
          <div className="flex items-center justify-center rounded-md mb-2.5 bg-[#E6F9F8] shrink-0 size-6">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: '0' }}>
              <path d="M2 6.5L5 9.5L11 3.5" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="inline-block text-[#0A2540] font-sans font-bold shrink-0 text-sm/4.5">
            Strengths
          </div>
        </div>
        <div className="flex flex-col gap-1.75">
          {strengths.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-1.25 h-1.25 mt-1.25 shrink-0 rounded-[50%] bg-[#4ECDC4]" />
              <div className="text-[11px] leading-[round(up,150%,1px)] inline-block [white-space-collapse:preserve] w-max text-[#425466] font-sans shrink-0">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weaknesses */}
      <div className="rounded-xl py-3.5 px-4.5 w-140 h-fit bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px] shrink-0">
        <div className="flex items-center mb-2.5 gap-2">
          <div className="flex items-center justify-center rounded-md bg-[#FFF0F0] shrink-0 size-6">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: '0' }}>
              <path d="M6.5 4v3.5M6.5 9.5v.5" stroke="#FF4D4D" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#FF4D4D" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="inline-block text-[#0A2540] font-sans font-bold shrink-0 text-sm/4.5">
            Weaknesses
          </div>
        </div>
        <div className="flex flex-col gap-1.75">
          {weaknesses.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className={`w-1.25 h-1.25 mt-1.25 shrink-0 rounded-[50%] ${item.severity === "red" ? "bg-[#FF4D4D]" : "bg-[#FF9F43]"}`} />
              <div className="text-[11px] leading-[round(up,150%,1px)] inline-block [white-space-collapse:preserve] w-max text-[#425466] font-sans shrink-0">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
