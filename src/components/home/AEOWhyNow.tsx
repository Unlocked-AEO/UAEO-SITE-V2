import { whyNowSection, whyNowStats } from "@/data/mock-what-is-aeo";
import { useInView } from "@/hooks/useInView";

export function AEOWhyNow() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className={`relative py-20 px-10 lg:px-[120px] overflow-clip bg-navy transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Radial glow */}
      <div
        className="absolute -top-20 right-[120px] w-[360px] h-[360px] rounded-[50%]"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 10%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
        }}
      />

      {/* Section header */}
      <div className="flex flex-col items-center mb-14 relative">
        <div className="inline-flex items-center mb-4 rounded-[20px] py-[5px] px-3.5 bg-teal/12 border border-teal/30">
          <span className="uppercase tracking-[0.8px] text-center text-teal text-[11px]/3.5">
            {whyNowSection.badge}
          </span>
        </div>
        <h2 className="text-[38px] tracking-[-1px] leading-[1.15] text-center text-white font-bold">
          {whyNowSection.headline}
        </h2>
      </div>

      {/* Stats */}
      <div className="flex items-start justify-around relative gap-10">
        {whyNowStats.map((stat, i) => (
          <div key={i} className="contents">
            <div className="grow shrink basis-0">
              <div
                className={`text-[52px] tracking-[-2px] leading-none mb-2.5 text-center ${stat.highlight ? "text-teal" : "text-white"}`}
              >
                {stat.value}
              </div>
              <p className="text-sm leading-[1.5] text-center text-white/60 whitespace-pre-line">
                {stat.description}
              </p>
            </div>
            {i < whyNowStats.length - 1 && (
              <div className="w-px h-20 mt-2 bg-white/10 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
