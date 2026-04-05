import { overallScore } from "@/data/mock-scan-overview";

export function ScanScoreHero() {
  return (
    <div className="flex items-center rounded-xl py-6 px-7 gap-7 bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px]">
      <svg width="124" height="124" viewBox="0 0 124 124" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
        <circle cx="62" cy="62" r="52" fill="none" stroke="#F0F4F8" strokeWidth="11" />
        <circle cx="62" cy="62" r="52" fill="none" stroke="#FF9F43" strokeWidth="11" strokeDasharray="235 327" strokeLinecap="round" transform="rotate(-90 62 62)" />
        <text x="62" y="58" textAnchor="middle" dominantBaseline="central" fontFamily="Inter" fontSize="28" fontWeight="800" fill="#0A2540">
          {overallScore.score}
        </text>
        <text x="62" y="80" textAnchor="middle" dominantBaseline="central" fontFamily="Inter" fontSize="10" fontWeight="500" fill="#8792A2">
          /{overallScore.max}
        </text>
      </svg>
      <div className="grow shrink basis-[0%] min-w-0 flex flex-col [justify-content:unset] h-29.75 items-center">
        <div className="flex items-center mb-2 gap-2 justify-center w-full">
          <div className="tracking-[-0.02em] inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold shrink-0 text-lg/5.5">
            Unlocked AEO Score
          </div>
        </div>
        <div className="text-[13px] leading-[round(up,170%,1px)] mb-0 max-w-none w-full h-24.75 [white-space-collapse:preserve] text-center text-[#425466] font-['Inter',system-ui,sans-serif] shrink-0">
          {overallScore.summary}
        </div>
      </div>
    </div>
  );
}
