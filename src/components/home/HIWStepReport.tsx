import { stepReport, reportCard } from "@/data/mock-how-it-works";
import { ChecklistItem } from "@/components/home/HIWChecklist";

const severityStyles = {
  HIGH: {
    row: "bg-[#FFF5F5] border-[#FED7D7]",
    dot: "bg-danger",
    badge: "bg-[#FED7D7]",
    text: "text-danger",
  },
  MED: {
    row: "bg-[#FFFBEB] border-[#FDE68A]",
    dot: "bg-warning",
    badge: "bg-[#FDE68A]",
    text: "text-[#D97706]",
  },
  LOW: {
    row: "bg-[#F0FFF4] border-[#BBF7D0]",
    dot: "bg-success",
    badge: "bg-[#BBF7D0]",
    text: "text-success",
  },
};

export function HIWStepReport() {
  return (
    <section className="w-full shrink-0 py-24 min-h-140 bg-surface border-b border-border-light">
      <div className="max-w-7xl flex items-center px-20 gap-20 mx-auto">
        {/* Card — Report */}
        <div className="grow shrink basis-0 rounded-[20px] overflow-clip bg-white border border-border-light shadow-[0_12px_48px_#0A254014]">
          {/* Score header */}
          <div className="relative flex items-center py-6 px-7 overflow-clip gap-6 bg-white border-b border-border-light">
            {/* Decorative circle */}
            <div className="absolute -top-7.5 -right-7.5 w-35 h-35 rounded-full bg-teal/5" />

            {/* Score */}
            <div className="relative shrink-0 flex flex-col items-center justify-center min-w-[130px] pr-6 border-r border-border-light">
              <div className="uppercase tracking-widest mb-1.5 text-center text-slate-muted font-bold text-[10px]/3">
                Visibility Score
              </div>
              <div className="text-[60px] tracking-[-2px] leading-none text-center text-navy font-black">
                {reportCard.visibilityScore}
              </div>
              <div className="inline-flex items-center mt-2 rounded-[20px] py-1 px-2.5 gap-1 bg-[#F0FDFA] border border-teal/35">
                <span className="text-center text-teal font-semibold text-[11px]/3.5">
                  ▲ {reportCard.scoreChange}
                </span>
              </div>
            </div>

            {/* Trend chart */}
            <div className="grow shrink basis-0 relative min-w-0">
              <div className="uppercase tracking-[0.06em] mb-2 text-slate-muted font-semibold text-[10px]/3">
                {reportCard.trendLabel}
              </div>
              <svg
                width="100%"
                height="72"
                viewBox="0 0 220 72"
                fill="none"
                preserveAspectRatio="none"
              >
                <line x1="0" y1="18" x2="220" y2="18" stroke="#F0F4F8" />
                <line x1="0" y1="36" x2="220" y2="36" stroke="#F0F4F8" />
                <line x1="0" y1="54" x2="220" y2="54" stroke="#F0F4F8" />
                <path
                  d="M0 60 L37 54 L74 48 L111 44 L148 34 L185 22 L220 10 L220 72 L0 72 Z"
                  fill="#4ECDC414"
                />
                <path
                  d="M0 60 L37 54 L74 48 L111 44 L148 34 L185 22 L220 10"
                  stroke="#4ECDC4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {[
                  [0, 60],
                  [37, 54],
                  [74, 48],
                  [111, 44],
                  [148, 34],
                  [185, 22],
                ].map(([cx, cy]) => (
                  <circle
                    key={cx}
                    cx={cx}
                    cy={cy}
                    r="2.5"
                    fill="#4ECDC4"
                    opacity="0.6"
                  />
                ))}
                <circle cx="220" cy="10" r="3.5" fill="#4ECDC4" />
              </svg>
              <div className="flex justify-between mt-1.25">
                {reportCard.trendMonths.map((m) => (
                  <span
                    key={m}
                    className="text-[#CBD5E1] text-[10px]/3"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Action Roadmap */}
            <div className="uppercase tracking-[0.06em] mb-3.5 text-slate-muted font-bold text-[11px]/3.5">
              Action Roadmap
            </div>
            <div className="flex flex-col mb-5 gap-2">
              {reportCard.actions.map((action) => {
                const style = severityStyles[action.severity];
                return (
                  <div
                    key={action.text}
                    className={`flex items-center rounded-lg py-2.25 px-3 gap-2.5 border ${style.row}`}
                  >
                    <div
                      className={`shrink-0 rounded-full size-2 ${style.dot}`}
                    />
                    <span className="grow shrink basis-0 text-navy font-medium text-xs/4">
                      {action.text}
                    </span>
                    <div className={`rounded-sm py-0.5 px-1.75 ${style.badge}`}>
                      <span className={`${style.text} font-semibold text-[10px]/3`}>
                        {action.severity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Leaderboard */}
            <div className="rounded-[10px] bg-surface border border-border-light p-3.5">
              <div className="uppercase tracking-[0.05em] mb-2.5 text-slate-muted font-semibold text-[11px]/3.5">
                Industry Leaderboard
              </div>
              {reportCard.leaderboard.map((entry, i) => (
                <div
                  key={entry.name}
                  className={`flex items-center gap-2 ${
                    i < reportCard.leaderboard.length - 1 ? "mb-1.75" : ""
                  }`}
                >
                  <span
                    className={`w-[90px] shrink-0 text-[11px]/3.5 ${
                      entry.isYou
                        ? "text-teal font-bold"
                        : "text-slate-body"
                    }`}
                  >
                    {entry.name}
                  </span>
                  <div className="grow shrink basis-0 h-1.25 rounded-[3px] bg-[#F0F4F8]">
                    <div
                      className={`h-full rounded-[3px] ${
                        entry.isYou ? "bg-teal" : "bg-[#CBD5E1]"
                      }`}
                      style={{ width: `${entry.score}%` }}
                    />
                  </div>
                  <span
                    className={`shrink-0 text-[11px]/3.5 font-semibold ${
                      entry.isYou ? "text-teal font-bold" : "text-slate-body"
                    }`}
                  >
                    {entry.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="grow-0 shrink-0 basis-[460px]">
          <div className="tracking-widest uppercase mb-4 text-teal font-bold text-[11px]/3.5">
            {stepReport.label}
          </div>
          <h2 className="text-[46px] tracking-[-1.2px] leading-[1.06] mb-4 text-navy font-extrabold m-0">
            {stepReport.title}
          </h2>
          <p className="text-base leading-[1.75] mb-9 text-[#64748B] m-0">
            {stepReport.description}
          </p>
          <div className="flex flex-col gap-3.5">
            {stepReport.checklist.map((item) => (
              <ChecklistItem key={item} label={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
