import { definitionSection, howAEOSteps } from "@/data/mock-what-is-aeo";
import type { HowAEOStep } from "@/data/mock-what-is-aeo";
import { useInView } from "@/hooks/useInView";

function StepCircle({ step }: { step: HowAEOStep }) {
  const baseClasses =
    "flex items-center justify-center shrink-0 mt-0.5 rounded-full size-8";

  if (step.variant === "navy") {
    return (
      <div className={`${baseClasses} bg-navy`}>
        <span className="text-white text-xs/4">{step.number}</span>
      </div>
    );
  }
  if (step.variant === "teal") {
    return (
      <div className={`${baseClasses} bg-teal`}>
        <span className="text-white text-xs/4">{step.number}</span>
      </div>
    );
  }
  return (
    <div
      className={baseClasses}
      style={{
        backgroundImage:
          "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(71.6% -0.102 -0.015) 100%)",
      }}
    >
      <span className="text-white text-xs/4">{step.number}</span>
    </div>
  );
}

export function AEODefinition() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className={`flex items-center py-20 px-10 lg:px-[120px] gap-20 bg-surface transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Left — text */}
      <div className="grow shrink basis-0 min-w-0">
        <span className="uppercase tracking-[0.8px] mb-4 block text-teal text-[13px]/4">
          {definitionSection.label}
        </span>
        <h2 className="text-[36px] leading-[1.15] tracking-[-1px] mb-6 text-navy font-bold">
          {definitionSection.quote}
        </h2>
        {definitionSection.paragraphs.map((p, i) => (
          <p
            key={i}
            className={`text-base leading-[1.7] text-[#64748B] ${i < definitionSection.paragraphs.length - 1 ? "mb-5" : ""}`}
          >
            {p}
          </p>
        ))}
      </div>

      {/* Right — card */}
      <div className="shrink-0 w-[420px] flex flex-col rounded-[20px] overflow-clip bg-white border border-border-light shadow-[0px_4px_24px_#0A25400F]">
        {/* Card header */}
        <div className="flex items-center py-5 px-6 gap-3 border-b border-[#F1F5F9]">
          <div className="flex items-center justify-center rounded-lg bg-teal/6 shrink-0 size-8">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0"
            >
              <circle cx="8" cy="8" r="6" stroke="#4ECDC4" strokeWidth="1.5" />
              <path
                d="M8 5v3l2 1.5"
                stroke="#4ECDC4"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-navy text-[13px]/4">How AEO works</span>
        </div>

        {/* Steps */}
        <div className="flex flex-col py-5 px-6">
          {howAEOSteps.map((step, i) => (
            <div
              key={step.number}
              className={`flex items-start gap-3.5 ${
                i < howAEOSteps.length - 1
                  ? "pb-5 border-b border-[#F1F5F9]"
                  : ""
              } ${i > 0 ? "pt-5" : ""}`}
            >
              <StepCircle step={step} />
              <div>
                <div className="mb-1 text-navy text-[13px]/4">{step.title}</div>
                <div className="text-[12px] leading-[1.5] text-[#94A3B8]">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
