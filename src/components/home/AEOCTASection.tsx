import { aeoCTA } from "@/data/mock-what-is-aeo";
import { Button } from "@/components/ui/Button";

export function AEOCTASection() {
  return (
    <section
      className="flex flex-col items-center relative py-20 px-10 lg:px-[120px] overflow-clip"
      style={{
        backgroundImage:
          "linear-gradient(in oklab 135deg, oklab(26% -0.019 -0.057) 0%, oklab(32.5% -0.023 -0.085) 60%, oklab(25.5% 0.012 -0.092) 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute -top-[60px] left-1/2 w-[400px] h-[400px] rounded-[50%] -translate-x-1/2"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 10%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
        }}
      />

      {/* Badge */}
      <div className="inline-flex items-center mb-5 relative rounded-[20px] py-[5px] px-3.5 bg-teal/12 border border-teal/30">
        <span className="uppercase tracking-[0.8px] text-center text-teal text-[11px]/3.5">
          {aeoCTA.badge}
        </span>
      </div>

      {/* Headline */}
      <h2 className="text-[42px] tracking-[-1.5px] leading-[1.1] mb-4 relative text-center text-white font-bold whitespace-pre-line">
        {aeoCTA.headline}
      </h2>

      {/* Subtext */}
      <p className="text-[17px] max-w-[460px] mb-9 leading-[1.65] relative text-center text-white/55">
        {aeoCTA.subtext}
      </p>

      {/* CTAs */}
      <div className="flex relative gap-3.5">
        <Button
          variant="primary"
          size="lg"
          onClick={() => console.log("ACTION: get_free_aeo_score")}
        >
          {aeoCTA.primaryCTA}
        </Button>
        <button
          className="rounded-[10px] py-3.5 px-7 bg-white/8 border border-white/15 text-white text-[15px]/[18px] cursor-pointer hover:bg-white/12 transition-colors"
          onClick={() => console.log("ACTION: talk_to_team")}
        >
          {aeoCTA.secondaryCTA}
        </button>
      </div>
    </section>
  );
}
