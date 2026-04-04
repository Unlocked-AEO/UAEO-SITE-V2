import { aboutHero, heroStats } from "@/data/mock-about";

export function AboutHero() {
  return (
    <section className="w-full relative flex items-center justify-between shrink-0 pt-24 pb-20 overflow-clip gap-15 min-h-120 bg-white px-30">
      {/* Decorative blobs */}
      <div
        className="absolute -top-25 -right-15 w-[540px] h-[540px] rounded-full"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 15%) 0%, oklab(77.6% -0.110 -0.017 / 4%) 60%, oklab(0% -.0001 0 / 0%) 80%)",
        }}
      />
      <div
        className="absolute top-15 right-25 w-[260px] h-[260px] rounded-full"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(87.1% -0.123 0.059 / 12%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
        }}
      />

      {/* Text */}
      <div className="max-w-[580px] shrink-0 relative flex flex-col items-start">
        <div className="inline-flex items-center mb-6 rounded-[20px] py-1.25 px-3.5 bg-[#F0FDFA] border border-teal/35">
          <span className="uppercase tracking-[0.8px] text-teal font-sans text-[11px]/3.5">
            {aboutHero.badge}
          </span>
        </div>
        <h1 className="text-[54px] leading-[1.08] tracking-[-2px] mb-5 text-navy font-bold m-0">
          {aboutHero.headline}
        </h1>
        <p className="text-[18px] leading-[1.65] max-w-[500px] text-[#64748B] m-0">
          {aboutHero.subtext}
        </p>
      </div>

      {/* Stat cards */}
      <div className="flex flex-col shrink-0 relative gap-4">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className={`min-w-45 rounded-2xl py-6 px-9 ${
              stat.variant === "teal" ? "" : "bg-surface border border-border-light"
            }`}
            style={
              stat.variant === "teal"
                ? {
                    backgroundImage:
                      "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(71.6% -0.102 -0.015) 100%)",
                  }
                : undefined
            }
          >
            <div
              className={`text-[40px] tracking-[-1px] leading-none text-center font-sans ${
                stat.variant === "teal" ? "text-white" : "text-navy"
              }`}
            >
              {stat.value}
            </div>
            <div
              className={`mt-1.5 uppercase tracking-[0.5px] text-center font-sans text-xs/4 ${
                stat.variant === "teal" ? "text-white/75" : "text-slate-muted"
              }`}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
