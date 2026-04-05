import { kpiCards, mentionsCard, shareOfVoice } from "@/data/mock-dashboard";
import type { KPICard as KPICardType } from "@/data/mock-dashboard";

function ChangeIndicator({
  change,
  direction,
}: {
  change: string;
  direction: "up" | "down";
}) {
  const color = direction === "up" ? "text-success" : "text-danger";
  return (
    <div className="flex items-center gap-1">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
        {direction === "up" ? (
          <path d="M6.5 1.5L11 7H2L6.5 1.5Z" fill="#27AE60" />
        ) : (
          <path d="M6.5 11.5L2 6H11L6.5 11.5Z" fill="#E74C3C" />
        )}
      </svg>
      <span className={`${color} text-[13px]/4`}>{change}</span>
    </div>
  );
}

function StatCard({ card }: { card: KPICardType }) {
  return (
    <div className="grow shrink basis-0 flex flex-col justify-between rounded-xl py-6 px-7 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <span className="uppercase tracking-[0.6px] text-slate-muted font-bold text-[11px]/3.5">
        {card.label}
      </span>
      <div className="flex flex-col gap-1.5 mt-4">
        <span className="text-[52px] tracking-[-2px] leading-none text-navy">
          {card.value}
        </span>
        <div className="flex items-center gap-1">
          <ChangeIndicator change={card.change} direction={card.changeDirection} />
          <span className="text-slate-muted text-xs/4">{card.comparison}</span>
        </div>
      </div>
    </div>
  );
}

function ShareOfVoiceCard() {
  // SVG donut params
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const segments = shareOfVoice.map((item) => {
    const dashArray = (item.percent / 100) * circumference;
    const rotation = (cumulativePercent / 100) * 360 - 90;
    cumulativePercent += item.percent;
    return { ...item, dashArray, gapArray: circumference - dashArray, rotation };
  });

  return (
    <div className="grow-[1.5] shrink basis-0 flex items-center rounded-xl py-6 px-7 gap-7 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <svg width="120" height="120" viewBox="0 0 120 120" className="shrink-0">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#F0F4F8" strokeWidth="16" />
        {segments.map((seg) => (
          <circle
            key={seg.name}
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth="16"
            strokeDasharray={`${seg.dashArray} ${seg.gapArray}`}
            transform={`rotate(${seg.rotation} 60 60)`}
          />
        ))}
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fontFamily="Inter"
          fontSize="16"
          fontWeight="800"
          fill="#0A2540"
        >
          {shareOfVoice[0].percent}%
        </text>
      </svg>
      <div className="grow shrink basis-0 flex flex-col gap-2.5">
        <span className="uppercase tracking-[0.6px] text-slate-muted font-bold text-[11px]/3.5">
          Share of Voice
        </span>
        {shareOfVoice.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="shrink-0 rounded-xs size-2.5"
              style={{ backgroundColor: item.color }}
            />
            <span className="grow shrink basis-0 text-[13px]/4" style={{ color: item.name === shareOfVoice[0].name ? "#0A2540" : "#425466" }}>
              {item.name}
            </span>
            <span className="text-slate-body text-[13px]/4">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MentionsCard() {
  return (
    <div className="grow-[1.2] shrink basis-0 flex flex-col justify-between rounded-xl py-6 px-7 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <span className="uppercase tracking-[0.6px] text-slate-muted text-[11px]/3.5">
        {mentionsCard.label}
      </span>
      <div className="flex flex-col gap-1.5 mt-4">
        <span className="text-[52px] tracking-[-2px] leading-none text-navy">
          {mentionsCard.value}
        </span>
        <div className="flex items-center gap-1">
          <ChangeIndicator
            change={mentionsCard.change}
            direction={mentionsCard.changeDirection}
          />
          <span className="text-slate-muted text-xs/4">
            {mentionsCard.comparison}
          </span>
        </div>
      </div>
      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        <div className="w-5 h-1.5 rounded-[3px] bg-teal shrink-0" />
        <div className="rounded-[3px] bg-border-light shrink-0 size-1.5" />
        <div className="rounded-[3px] bg-border-light shrink-0 size-1.5" />
      </div>
    </div>
  );
}

export function KPICards() {
  return (
    <div className="flex gap-4">
      {kpiCards.map((card) => (
        <StatCard key={card.label} card={card} />
      ))}
      <ShareOfVoiceCard />
      <MentionsCard />
    </div>
  );
}
