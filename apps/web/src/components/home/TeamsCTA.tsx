import { useNavigate } from "react-router-dom";
import { teamsCTA } from "@/data/mock-teams";

export function TeamsCTA() {
  const navigate = useNavigate();
  return (
    <section
      className="w-full flex flex-col items-center shrink-0 relative py-20 px-30 overflow-clip min-h-80"
      style={{
        backgroundImage:
          "linear-gradient(in oklab 135deg, oklab(26% -0.019 -0.057) 0%, oklab(32.5% -0.023 -0.085) 60%, oklab(25.5% 0.012 -0.092) 100%)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute -top-15 left-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 10%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
          translate: "-50%",
        }}
      />

      <div className="inline-flex items-center mb-5 rounded-[20px] py-1.25 px-3.5 relative bg-teal/12 border border-teal/30">
        <span className="uppercase tracking-[0.8px] text-center text-teal font-sans text-[11px]/3.5">
          {teamsCTA.badge}
        </span>
      </div>

      <h2 className="text-[42px] tracking-[-1.5px] leading-[1.1] mb-4 relative text-center text-white font-bold m-0">
        {teamsCTA.headline}
      </h2>

      <p className="text-[17px] leading-[1.65] max-w-[480px] mb-9 relative text-center text-white/55 m-0">
        {teamsCTA.description}
      </p>

      <div className="flex relative gap-3.5">
        <button
          className="rounded-[10px] py-3.5 px-8 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/signup")}
        >
          <span className="text-center text-navy font-sans text-[15px]/4.5">
            {teamsCTA.primaryCTA}
          </span>
        </button>
        <button
          className="rounded-[10px] py-3.5 px-7 bg-white/8 border border-white/15 cursor-pointer hover:bg-white/12 transition-colors"
          onClick={() => console.log("ACTION: talk_to_sales")}
        >
          <span className="text-center text-white font-sans text-[15px]/4.5">
            {teamsCTA.secondaryCTA}
          </span>
        </button>
      </div>
    </section>
  );
}
