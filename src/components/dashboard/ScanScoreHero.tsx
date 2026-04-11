interface ScanScoreHeroProps {
  score: number;
  max: number;
  title: string;
  summary: string;
  dasharray?: string;
  color?: string;
}

export function ScanScoreHero({
  score,
  max,
  title,
  summary,
  dasharray = "235 327",
  color = "#FF9F43",
}: ScanScoreHeroProps) {
  return (
    <div className="flex justify-center rounded-xl py-8 px-7 bg-white border border-border-light shadow-sm">
      <div className="flex items-center gap-6">
        <svg width="124" height="124" viewBox="0 0 124 124" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <circle cx="62" cy="62" r="52" fill="none" stroke="#F0F4F8" strokeWidth="11" />
          <circle cx="62" cy="62" r="52" fill="none" stroke={color} strokeWidth="11" strokeDasharray={dasharray} strokeLinecap="round" transform="rotate(-90 62 62)" />
          <text x="62" y="58" textAnchor="middle" dominantBaseline="central" fontFamily="Manrope" fontSize="28" fontWeight="800" fill="#0A2540">
            {score}
          </text>
          <text x="62" y="80" textAnchor="middle" dominantBaseline="central" fontFamily="Manrope" fontSize="10" fontWeight="500" fill="#8792A2">
            /{max}
          </text>
        </svg>
        <div className="flex flex-col gap-2">
          <h2 className="text-navy font-semibold text-lg/6 m-0">
            {title}
          </h2>
          <p className="text-[13px]/[170%] text-slate-body m-0 max-w-[440px]">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}
