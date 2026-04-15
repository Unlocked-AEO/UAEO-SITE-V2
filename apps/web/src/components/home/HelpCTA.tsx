import { helpCTA, helpCTAButtons, helpStats } from "@/data/mock-help";

export function HelpCTA() {
  return (
    <section className="flex flex-col items-center relative py-22 px-20 overflow-clip bg-navy">
      {/* Badge */}
      <span className="mb-7 rounded-[100px] py-[5px] px-4 bg-teal/15 border-[1.5px] border-teal/40">
        <span className="tracking-[1.8px] text-center uppercase text-teal text-[11px]/3.5">
          {helpCTA.badge}
        </span>
      </span>

      {/* Headline */}
      <h2 className="text-[42px] tracking-[-1.5px] leading-[1.1] mb-4 max-w-[600px] text-center text-white font-bold">
        {helpCTA.headline}
      </h2>

      {/* Subheadline */}
      <p className="text-[17px] leading-[1.6] mb-13 max-w-[480px] text-center text-white/60">
        {helpCTA.subheadline}
      </p>

      {/* Action buttons */}
      <div className="flex items-center gap-4">
        {helpCTAButtons.map((btn) => (
          <button
            key={btn.action}
            className={`flex items-center rounded-[10px] py-3.5 px-7 gap-2.5 border cursor-pointer transition-opacity hover:opacity-90 ${
              btn.variant === "primary"
                ? "bg-teal border-teal text-navy"
                : "bg-white/8 border-white/15 text-white"
            }`}
            onClick={() => console.log(`ACTION: ${btn.action}`)}
          >
            <span className="text-center text-[15px]/[18px]">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex mt-14 pt-12 gap-10 border-t border-white/10">
        {helpStats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <span className="text-center text-teal font-bold text-[28px]/[34px]">
              {stat.value}
            </span>
            <span className="text-center text-white/50 text-[13px]/4">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Decorative circle */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 8%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
        }}
      />
    </section>
  );
}
