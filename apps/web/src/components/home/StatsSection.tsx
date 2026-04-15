import { statsSection } from "@/data/mock-landing";
import { useInView } from "@/hooks/useInView";
import { useScrollCountUp } from "@/hooks/useScrollCountUp";

function AnimatedStatValue({ value, color }: { value: string; color: string }) {
  // Parse numeric part: "89%" → 89, "6.2×" → 6.2, "12K+" → 12, "$2.4B" → 2.4
  const numMatch = value.match(/([\d.]+)/);
  const num = numMatch ? parseFloat(numMatch[1]) : 0;
  const prefix = value.match(/^[^\d]*/)?.[0] || "";
  const suffix = value.match(/[^\d.]*$/)?.[0] || "";
  const isDecimal = value.includes(".");

  const [ref, animatedValue] = useScrollCountUp(Math.round(num * (isDecimal ? 10 : 1)), 1400);
  const displayValue = isDecimal
    ? (animatedValue / 10).toFixed(1)
    : String(animatedValue);

  return (
    <div ref={ref} className={`text-[42px] tracking-[-0.03em] leading-none ${color} font-extrabold`}>
      {prefix}{displayValue}{suffix}
    </div>
  );
}

export function StatsSection() {
  const [sectionRef, inView] = useInView(0.15);

  return (
    <section
      ref={sectionRef}
      className={`flex items-center gap-20 bg-surface p-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Left text */}
      <div className="grow-0 shrink-0 basis-[420px] flex flex-col">
        <span className="tracking-[0.06em] uppercase mb-4 text-teal font-semibold text-[13px]/4">
          {statsSection.label}
        </span>
        <h2 className="text-[38px] leading-[1.15] tracking-[-0.03em] mb-5 text-navy font-bold whitespace-pre-wrap m-0">
          {statsSection.headline}
        </h2>
        <p className="text-[16px] leading-[1.65] mb-8 text-slate-body m-0">
          {statsSection.description}
        </p>
        <button
          className="inline-flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 hover:opacity-80"
          onClick={() => console.log("ACTION: read_customer_stories")}
        >
          <span className="text-iris font-semibold text-sm/[18px]">
            {statsSection.cta}
          </span>
          <span className="text-iris font-semibold text-sm/[18px]">›</span>
        </button>
      </div>

      {/* Stats grid */}
      <div className="grow shrink basis-0 flex flex-col gap-8">
        <div className="flex gap-8">
          {statsSection.stats.slice(0, 2).map((stat, i) => (
            <div
              key={stat.value}
              className={`grow shrink basis-0 rounded-xl py-7 px-6 bg-white shadow-[0_1px_6px_#0A25400F] transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
            >
              <AnimatedStatValue value={stat.value} color={stat.color} />
              <p className="text-[14px] leading-[1.5] mt-2 text-slate-body m-0">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-8">
          {statsSection.stats.slice(2).map((stat, i) => (
            <div
              key={stat.value}
              className={`grow shrink basis-0 rounded-xl py-7 px-6 bg-white shadow-[0_1px_6px_#0A25400F] transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${(i + 3) * 150}ms` }}
            >
              <AnimatedStatValue value={stat.value} color={stat.color} />
              <p className="text-[14px] leading-[1.5] mt-2 text-slate-body m-0">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
