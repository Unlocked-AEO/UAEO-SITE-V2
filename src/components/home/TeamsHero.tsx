import { teamsHero } from "@/data/mock-teams";

export function TeamsHero() {
  return (
    <section className="w-full flex flex-col items-center shrink-0 relative pt-24 pb-18 overflow-clip min-h-105 bg-white px-30">
      {/* Decorative glow */}
      <div
        className="absolute -top-20 left-1/2 w-[600px] h-[400px] rounded-full"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 10%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
          translate: "-50%",
        }}
      />

      <div className="inline-flex items-center mb-5 rounded-[20px] py-1.25 px-3.5 bg-[#F0FDFA] border border-teal/35">
        <span className="uppercase tracking-[0.8px] text-center text-teal font-sans text-[11px]/3.5">
          {teamsHero.badge}
        </span>
      </div>

      <h1 className="text-[54px] leading-[1.08] tracking-[-2px] mb-5 max-w-[780px] text-center text-navy font-bold whitespace-pre-wrap m-0">
        {teamsHero.headline}
      </h1>

      <p className="text-[18px] leading-[1.65] max-w-[540px] text-center text-[#64748B] m-0">
        {teamsHero.subtext}
      </p>
    </section>
  );
}
