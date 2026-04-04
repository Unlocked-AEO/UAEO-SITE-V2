import { aeoHero } from "@/data/mock-what-is-aeo";
import { Button } from "@/components/ui/Button";

export function AEOHero() {
  return (
    <section className="flex flex-col items-center relative pt-24 pb-20 overflow-clip bg-white px-10">
      {/* Radial glow */}
      <div
        className="absolute -top-[120px] left-1/2 w-[700px] h-[500px] rounded-[50%] -translate-x-1/2"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 10%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
        }}
      />

      {/* Badge */}
      <div className="inline-flex items-center mb-5 rounded-[20px] py-[5px] px-3.5 relative bg-teal/6 border border-teal/35">
        <span className="uppercase tracking-[0.8px] text-center text-teal text-[11px]/3.5">
          {aeoHero.badge}
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-[58px] leading-[1.06] tracking-[-2.5px] mb-6 max-w-[820px] relative text-center text-navy font-bold">
        {aeoHero.headline}
      </h1>

      {/* Subtext */}
      <p className="text-[20px] leading-[1.6] max-w-[600px] mb-12 relative text-center text-[#64748B]">
        {aeoHero.subtext}
      </p>

      {/* CTAs */}
      <div className="flex items-center relative gap-4">
        <Button
          variant="dark"
          size="lg"
          onClick={() => console.log("ACTION: navigate_aeo_score")}
        >
          {aeoHero.primaryCTA}
        </Button>
        <button
          className="text-teal text-[15px]/[18px] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => console.log("ACTION: scroll_to_how_it_works")}
        >
          {aeoHero.secondaryCTA}
        </button>
      </div>
    </section>
  );
}
