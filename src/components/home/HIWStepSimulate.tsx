import { stepSimulate, simulateCard } from "@/data/mock-how-it-works";
import { ChecklistItem } from "@/components/home/HIWChecklist";
import { EngineIcon } from "@/components/home/EngineIcon";

export function HIWStepSimulate() {
  return (
    <section className="w-full shrink-0 py-24 min-h-125 bg-white border-b border-border-light">
      <div className="max-w-7xl flex items-center px-20 gap-20 mx-auto">
        {/* Text */}
        <div className="grow-0 shrink-0 basis-[460px]">
          <div className="tracking-widest uppercase mb-4 text-teal font-bold text-[11px]/3.5">
            {stepSimulate.label}
          </div>
          <h2 className="text-[46px] tracking-[-1.2px] leading-[1.06] mb-4 text-navy font-extrabold m-0">
            {stepSimulate.title}
          </h2>
          <p className="text-base leading-[1.75] mb-9 text-[#64748B] m-0">
            {stepSimulate.description}
          </p>
          <div className="flex flex-col gap-3.5">
            {stepSimulate.checklist.map((item) => (
              <ChecklistItem key={item} label={item} />
            ))}
          </div>
        </div>

        {/* Card — Score by AI Engine */}
        <div className="grow shrink basis-0 rounded-[20px] bg-white border border-border-light shadow-[0_12px_48px_#0A254014] p-7">
          <div className="flex items-center justify-between mb-1">
            <span className="tracking-[-0.1px] text-navy font-semibold text-[13px]/4">
              {simulateCard.title}
            </span>
            <div className="rounded-lg py-0.75 px-2.5 bg-[#F0FDFA] border border-teal/30">
              <span className="text-teal font-semibold text-[11px]/3.5">
                {simulateCard.badge}
              </span>
            </div>
          </div>
          <div className="mb-5 text-slate-muted text-[11px]/3.5">
            {simulateCard.subtitle}
          </div>

          <div className="flex flex-col gap-3.5">
            {simulateCard.scores.map((engine) => {
              const isPositive = engine.change >= 0;
              const scoreColor =
                engine.score >= 70
                  ? "text-success"
                  : engine.score >= 50
                    ? "text-warning"
                    : "text-danger";
              const barColor =
                engine.score >= 70
                  ? "bg-success"
                  : engine.score >= 50
                    ? "bg-warning"
                    : "bg-danger";
              const changeColor = isPositive ? "text-success" : "text-danger";

              return (
                <div key={engine.slug}>
                  <div className="flex items-center justify-between mb-1.25">
                    <div className="flex items-center gap-1.75">
                      <EngineIcon slug={engine.slug} variant="badge" />
                      <span className="text-slate-body text-xs/4">
                        {engine.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`${changeColor} font-semibold text-[10px]/3`}
                      >
                        {isPositive ? "▲" : "▼"} {isPositive ? "+" : ""}
                        {engine.change}
                      </span>
                      <span className={`${scoreColor} font-bold text-[13px]/4`}>
                        {engine.score}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.25 rounded-[3px] bg-[#F0F4F8]">
                    <div
                      className={`h-full rounded-[3px] ${barColor}`}
                      style={{ width: `${engine.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
