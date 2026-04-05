import { freshnessStats } from "@/data/mock-scan-content-freshness";

function StatIcon({ type }: { type: string }) {
  if (type === "evergreen") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}>
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6v6l3 3" />
        <path d="M16 2l4 4-4 4" />
        <path d="M20 2v4h-4" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function FreshnessStats() {
  return (
    <div className="flex gap-3">
      {freshnessStats.map((stat) => (
        <div
          key={stat.label}
          className="grow shrink basis-[0%] flex items-center rounded-xl py-5 px-6 gap-4 bg-white border border-solid border-[#E6EBF1]"
        >
          <div
            className="flex items-center justify-center shrink-0 rounded-[10px] size-11"
            style={{ backgroundColor: stat.iconBg }}
          >
            <StatIcon type={stat.icon} />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[26px] leading-[round(up,110%,1px)] inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] font-extrabold">
              {stat.value}
            </div>
            <div className="inline-block text-[#64748B] font-['Inter',system-ui,sans-serif] text-[13px]/4">
              {stat.label}
            </div>
          </div>
          <div
            className="ml-auto rounded-[20px] py-1 px-3"
            style={{ backgroundColor: stat.badgeBg }}
          >
            <div className="text-black font-sans text-base/5">
              {stat.badge}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
