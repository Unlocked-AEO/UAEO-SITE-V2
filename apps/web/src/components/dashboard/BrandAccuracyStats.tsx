import { accuracyStats } from "@/data/mock-scan-brand-accuracy";

const levelConfig = {
  danger: {
    iconBg: "bg-[#FEF2F2]",
    badgeBg: "bg-[#FEF2F2]",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: '0' }}>
        <path d="M10 2L2 17h16L10 2z" stroke="#EF4444" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 8v4M10 14.5v.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  warning: {
    iconBg: "bg-[#FFF7ED]",
    badgeBg: "bg-[#FFF7ED]",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: '0' }}>
        <circle cx="10" cy="10" r="8" stroke="#F97316" strokeWidth="1.5" />
        <path d="M10 6v4l3 2" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  success: {
    iconBg: "bg-[#F0FDF4]",
    badgeBg: "bg-[#F0FDF4]",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: '0' }}>
        <circle cx="10" cy="10" r="8" stroke="#22C55E" strokeWidth="1.5" />
        <path d="M7 10l2 2 4-4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export function BrandAccuracyStats() {
  return (
    <div className="flex gap-3">
      {accuracyStats.map((stat) => {
        const config = levelConfig[stat.level];
        return (
          <div
            key={stat.label}
            className="grow shrink basis-[0%] flex items-center rounded-xl py-5 px-6 gap-4 bg-white border border-solid border-[#E6EBF1]"
          >
            <div className={`flex items-center justify-center shrink-0 rounded-[10px] ${config.iconBg} size-10`}>
              {config.icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[28px] leading-[round(up,110%,1px)] inline-block text-[#0A2540] font-sans font-extrabold">
                {stat.value}
              </div>
              <div className="inline-block text-[#64748B] font-sans text-[13px]/4">
                {stat.label}
              </div>
            </div>
            <div className={`ml-auto rounded-lg py-1.5 px-3 ${config.badgeBg}`}>
              <div className="text-black font-sans text-base/5">
                {stat.badge}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
