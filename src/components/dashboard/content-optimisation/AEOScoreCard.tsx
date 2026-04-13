import { aeoSignals, totalAEOScore, maxAEOScore } from "@/data/mock-content-optimisation";

export function AEOScoreCard() {
  const pct = Math.round((totalAEOScore / maxAEOScore) * 100);

  return (
    <div className="rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-navy text-[13px]/4 font-semibold">AEO Score</span>
        <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-teal/10 text-teal text-[10px] uppercase tracking-[0.4px] font-semibold">
          Above threshold
        </span>
      </div>

      <div className="flex items-end gap-2 mb-1">
        <span className="text-navy font-semibold text-[44px]/10 tracking-[-1px]">
          {totalAEOScore}
        </span>
        <span className="pb-2 text-slate-muted text-sm/5">/ {maxAEOScore}</span>
      </div>
      <div className="mb-5 h-1.5 w-full rounded-full bg-[#F0F4F8] overflow-hidden">
        <div className="h-full bg-teal rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex flex-col gap-3.5">
        {aeoSignals.map((signal) => {
          const signalPct = Math.round((signal.score / signal.maxScore) * 100);
          return (
            <div key={signal.key}>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-navy text-[13px]/4 font-semibold">{signal.label}</span>
                <span className="text-slate-muted text-[11px]/4">
                  <span className="text-navy font-semibold">{signal.score}</span> / {signal.maxScore}
                </span>
              </div>
              <div className="mb-1 h-1 w-full rounded-full bg-[#F0F4F8] overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    signalPct >= 85 ? "bg-teal" : signalPct >= 70 ? "bg-warning" : "bg-danger"
                  }`}
                  style={{ width: `${signalPct}%` }}
                />
              </div>
              <p className="text-slate-muted text-[11px]/4">{signal.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
