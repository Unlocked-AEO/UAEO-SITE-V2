import { scoreGauges } from "@/data/mock-scan-overview";

// Hardcoded strokeDasharray values from the design to match exactly
const gaugeStroke: Record<string, { dasharray: string; color: string }> = {
  "AI Visibility":    { dasharray: "128 188", color: "#FF9F43" },
  "Brand Accuracy":   { dasharray: "152 188", color: "#4ECDC4" },
  "Sentiment":        { dasharray: "139 188", color: "#4ECDC4" },
  "Schema Coverage":  { dasharray: "85 188",  color: "#FF4D4D" },
  "Content Freshness":{ dasharray: "145 188", color: "#4ECDC4" },
  "EEAT":             { dasharray: "115 188", color: "#FF9F43" },
};

export function ScanScoreGauges() {
  const topRow = scoreGauges.slice(0, 3);
  const bottomRow = scoreGauges.slice(3, 6);

  return (
    <div className="rounded-xl pt-2 pb-1 bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px]">
      <div className="flex items-center">
        {topRow.map((gauge, i) => {
          const stroke = gaugeStroke[gauge.label];
          return (
            <div
              key={gauge.label}
              className={`grow shrink basis-[0%] flex flex-col items-center pt-4 pb-3 border-b border-b-solid border-b-[#F0F4F8] ${
                i < topRow.length - 1 ? "border-r border-r-solid border-r-[#F0F4F8]" : ""
              }`}
            >
              <svg width="76" height="76" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                <circle cx="38" cy="38" r="30" fill="none" stroke="#F0F4F8" strokeWidth="7" />
                <circle cx="38" cy="38" r="30" fill="none" stroke={stroke.color} strokeWidth="7" strokeDasharray={stroke.dasharray} strokeLinecap="round" transform="rotate(-90 38 38)" />
                <text x="38" y="38" textAnchor="middle" dominantBaseline="central" fontFamily="Inter" fontSize="18" fontWeight="800" fill="#0A2540">
                  {gauge.score}
                </text>
              </svg>
              <div className="mt-1.5 inline-block text-[#425466] font-['Inter',system-ui,sans-serif] font-semibold text-[11px]/3.5">
                {gauge.label}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center">
        {bottomRow.map((gauge, i) => {
          const stroke = gaugeStroke[gauge.label];
          return (
            <div
              key={gauge.label}
              className={`grow shrink basis-[0%] flex flex-col items-center pt-3 pb-4 ${
                i < bottomRow.length - 1 ? "border-r border-r-solid border-r-[#F0F4F8]" : ""
              }`}
            >
              <svg width="76" height="76" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                <circle cx="38" cy="38" r="30" fill="none" stroke="#F0F4F8" strokeWidth="7" />
                <circle cx="38" cy="38" r="30" fill="none" stroke={stroke.color} strokeWidth="7" strokeDasharray={stroke.dasharray} strokeLinecap="round" transform="rotate(-90 38 38)" />
                <text x="38" y="38" textAnchor="middle" dominantBaseline="central" fontFamily="Inter" fontSize="18" fontWeight="800" fill="#0A2540">
                  {gauge.score}
                </text>
              </svg>
              <div className="mt-1.5 inline-block text-[#425466] font-['Inter',system-ui,sans-serif] font-semibold text-[11px]/3.5">
                {gauge.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
