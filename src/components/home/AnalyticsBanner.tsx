import { analyticsBanner } from "@/data/mock-landing";

export function AnalyticsBanner() {
  return (
    <section className="pb-20 bg-white px-20">
      <div
        className="flex items-center relative rounded-2xl py-12 px-14 overflow-clip gap-[60px]"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 135deg, oklab(62.2% -0.105 -0.015) 0%, oklab(26% -0.019 -0.057) 60%)",
        }}
      >
        {/* Left side — text */}
        <div className="grow shrink basis-0 min-w-0">
          <span className="tracking-[0.08em] uppercase mb-4 block text-teal font-semibold text-xs/4">
            {analyticsBanner.label}
          </span>
          <h3 className="text-[24px] leading-[1.3] tracking-[-0.02em] mb-3 text-white font-bold m-0">
            {analyticsBanner.headline}
          </h3>
          <p className="text-[14px] leading-[1.6] mb-6 text-white/65 m-0">
            {analyticsBanner.description}
          </p>
          <button
            className="text-teal font-semibold text-[15px]/[18px] bg-transparent border-none cursor-pointer p-0 hover:opacity-80"
            onClick={() => console.log("ACTION: learn_analytics")}
          >
            {analyticsBanner.cta}
          </button>
        </div>

        {/* Right side — funnel chart */}
        <div className="grow-0 shrink-0 basis-[420px] rounded-xl bg-white/7 border border-white/12 p-6">
          <div className="flex justify-between items-center mb-5">
            <span className="text-white font-semibold text-xs/4">
              {analyticsBanner.chartTitle}
            </span>
            <span className="text-white/40 text-[11px]/[14px]">
              {analyticsBanner.chartPeriod}
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {analyticsBanner.funnel.map((step, i) => (
              <FunnelRow key={step.label} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Decorative */}
        <div
          className="absolute -top-[60px] right-[200px] w-[300px] h-[300px] rounded-full"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 20%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
          }}
        />
      </div>
    </section>
  );
}

function FunnelRow({
  step,
  index,
}: {
  step: { label: string; value: string; widthPercent: number };
  index: number;
}) {
  const barStyles = [
    "linear-gradient(in oklab 90deg, oklab(77.6% -0.110 -0.017) 0%, oklab(62.2% -0.105 -0.015) 100%)",
    "linear-gradient(in oklab 90deg, oklab(57.8% 0.034 -0.232) 0%, oklab(77.6% -0.110 -0.017) 100%)",
    undefined,
    undefined,
  ];
  const barClasses = [
    "",
    "",
    "bg-white/25",
    "bg-teal",
  ];
  const textColor = index === 3 ? "text-navy" : "text-white";

  return (
    <div className="flex items-center gap-3">
      <span className="w-[100px] shrink-0 text-white/60 text-[11px]/[14px]">
        {step.label}
      </span>
      <div className="grow shrink basis-0 h-5 rounded-sm overflow-clip bg-white/10">
        <div
          className={`h-full flex items-center justify-end rounded-sm pr-2 ${barClasses[index]}`}
          style={{
            width: `${step.widthPercent}%`,
            ...(barStyles[index]
              ? { backgroundImage: barStyles[index] }
              : {}),
          }}
        >
          <span className={`${textColor} font-bold text-[10px]/3`}>
            {step.value}
          </span>
        </div>
      </div>
    </div>
  );
}
