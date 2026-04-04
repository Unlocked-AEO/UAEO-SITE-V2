import { hiringCTA } from "@/data/mock-about";

export function AboutHiring() {
  return (
    <section
      className="w-full flex items-center justify-between shrink-0 relative py-20 px-30 overflow-clip gap-15 min-h-70"
      style={{
        backgroundImage:
          "linear-gradient(in oklab 135deg, oklab(26% -0.019 -0.057) 0%, oklab(32.5% -0.023 -0.085) 60%, oklab(25.5% 0.012 -0.092) 100%)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute -top-20 right-45 rounded-full size-80"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 10%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
        }}
      />

      {/* Text */}
      <div className="relative">
        <h2 className="text-[40px] tracking-[-1px] leading-[1.2] mb-3.5 text-white font-bold whitespace-pre-wrap m-0">
          {hiringCTA.headline}
        </h2>
        <p className="text-base max-w-[460px] leading-[1.65] text-white/55 m-0">
          {hiringCTA.description}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex shrink-0 relative gap-3.5">
        <button
          className="rounded-[10px] py-3.5 px-7 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: view_open_roles")}
        >
          <span className="text-navy font-sans text-[15px]/4.5">
            {hiringCTA.primaryCTA}
          </span>
        </button>
        <button
          className="rounded-[10px] py-3.5 px-7 bg-white/8 border border-white/15 cursor-pointer hover:bg-white/12 transition-colors"
          onClick={() => console.log("ACTION: contact_us")}
        >
          <span className="text-white font-sans text-[15px]/4.5">
            {hiringCTA.secondaryCTA}
          </span>
        </button>
      </div>
    </section>
  );
}
