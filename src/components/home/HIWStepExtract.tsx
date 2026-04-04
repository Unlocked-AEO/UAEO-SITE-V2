import { stepExtract, extractCard } from "@/data/mock-how-it-works";
import { ChecklistItem } from "@/components/home/HIWChecklist";

export function HIWStepExtract() {
  return (
    <section className="w-full shrink-0 py-24 min-h-120 bg-surface border-b border-border-light">
      <div className="max-w-7xl flex items-center px-20 gap-20 mx-auto">
        {/* Card — E-E-A-T Analysis */}
        <div className="grow shrink basis-0 rounded-[20px] bg-white border border-border-light shadow-[0_12px_48px_#0A254014] p-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="uppercase tracking-[0.06em] text-slate-muted font-bold text-[11px]/3.5">
              Signals Detected
            </span>
            <div className="flex items-center rounded-xl py-1 px-2.5 gap-1.25 bg-[#F0FDFA] border border-teal/30">
              <span className="text-teal font-bold text-sm/4.5">
                {extractCard.signalsDetected}
              </span>
              <span className="text-teal text-xs/4">✓</span>
            </div>
          </div>

          {/* E-E-A-T title */}
          <div className="mb-3.5 uppercase tracking-[0.05em] text-navy font-bold text-[11px]/3.5">
            {extractCard.title}
          </div>

          {/* Score bars */}
          <div className="flex flex-col mb-6 gap-3">
            {extractCard.scores.map((item, i) => (
              <div key={item.name}>
                <div className="flex justify-between mb-1.25">
                  <span className="text-slate-body text-xs/4">{item.name}</span>
                  <span
                    className={`${extractCard.scoreTextColors[i]} font-semibold text-xs/4`}
                  >
                    {item.score}
                  </span>
                </div>
                <div className="h-1.25 rounded-[3px] bg-[#F0F4F8]">
                  <div
                    className={`h-full rounded-[3px] ${item.color}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {extractCard.tags.map((tag) => (
              <div
                key={tag.label}
                className={`rounded-md py-1.25 px-2.5 border ${
                  tag.highlighted
                    ? "bg-[#F0FDFA] border-teal/35"
                    : "bg-surface border-border-light"
                }`}
              >
                <span
                  className={`font-medium text-[11px]/3.5 ${
                    tag.highlighted
                      ? "text-teal font-semibold"
                      : "text-slate-body"
                  }`}
                >
                  {tag.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="grow-0 shrink-0 basis-[460px]">
          <div className="tracking-widest uppercase mb-4 text-teal font-bold text-[11px]/3.5">
            {stepExtract.label}
          </div>
          <h2 className="text-[46px] tracking-[-1.2px] leading-[1.06] mb-4 text-navy font-extrabold m-0">
            {stepExtract.title}
          </h2>
          <p className="text-base leading-[1.75] mb-9 text-[#64748B] m-0">
            {stepExtract.description}
          </p>
          <div className="flex flex-col gap-3.5">
            {stepExtract.checklist.map((item) => (
              <ChecklistItem key={item} label={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
