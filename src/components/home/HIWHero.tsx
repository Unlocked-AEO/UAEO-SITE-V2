import { hiwHero, processSteps } from "@/data/mock-how-it-works";

export function HIWHero() {
  return (
    <section className="relative w-full shrink-0 pt-22 pb-18 overflow-clip min-h-110 bg-white border-b border-border-light px-20">
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 w-[800px] h-[400px]"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 20% in oklab, oklab(77.6% -0.110 -0.017 / 10%) 0%, oklab(0% -.0001 0 / 0%) 65%)",
          translate: "-50%",
        }}
      />

      <div className="relative max-w-[720px] flex flex-col items-center mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center mb-7 rounded-[20px] py-1.25 px-4 gap-1.5 bg-[#F0FDFA] border border-teal/50">
          <span className="tracking-[0.08em] uppercase text-center text-teal font-bold text-[11px]/3.5">
            {hiwHero.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[54px] tracking-[-1.5px] leading-[1.08] mb-5 text-center text-navy font-extrabold whitespace-pre-wrap m-0">
          {hiwHero.headline}
        </h1>

        {/* Subtext */}
        <p className="text-[18px] leading-[1.7] max-w-[520px] mt-0 mb-14 text-center text-slate-body mx-auto">
          {hiwHero.subtext}
        </p>

        {/* Process steps indicator */}
        <div className="inline-flex items-center rounded-[40px] py-3.5 px-7 bg-surface border border-border-light">
          {processSteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              {i > 0 && (
                <div className="w-12 h-px mb-4.5 bg-[#CBD5E1] shrink-0" />
              )}
              <div className="flex flex-col items-center px-6 gap-1.5">
                <div
                  className={`w-7.5 h-7.5 flex items-center justify-center rounded-full shrink-0 ${
                    step.variant === "teal" ? "bg-teal" : "bg-navy"
                  }`}
                >
                  <span className="text-center text-white font-bold text-[13px]/4">
                    {step.number}
                  </span>
                </div>
                <span className="text-center text-navy font-semibold text-[11px]/3.5">
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
