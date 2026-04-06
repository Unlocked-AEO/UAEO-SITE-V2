import { useNavigate } from "react-router-dom";
import { productHero, productStats } from "@/data/mock-product";

export function ProductHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-clip">
      {/* Hero area */}
      <div className="relative flex flex-col items-center pt-24 pb-20 px-10 bg-white">
        {/* Decorative glows */}
        <div
          className="absolute -top-25 -right-15 w-135 h-135 rounded-[50%]"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 15%) 0%, oklab(77.6% -0.110 -0.017 / 4%) 60%, oklab(0% -.0001 0 / 0%) 80%)",
          }}
        />
        <div
          className="absolute top-20 left-20 w-65 h-65 rounded-[50%]"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(87.1% -0.123 0.059 / 12%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
          }}
        />

        {/* Badge */}
        <div className="relative inline-flex items-center mb-6 rounded-[20px] py-1.25 px-3.5 bg-[#F0FDFA] border border-solid border-[#4ECDC459]">
          <div className="uppercase tracking-[0.8px] text-[#4ECDC4] font-sans text-[11px]/3.5">
            {productHero.badge}
          </div>
        </div>

        {/* Headline */}
        <h1 className="relative text-[56px] leading-[108%] tracking-[-2.5px] mb-5 text-center text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold whitespace-pre-line">
          {productHero.headline}
        </h1>

        {/* Subtext */}
        <p className="relative text-[18px] leading-[165%] max-w-[560px] mb-10 text-center text-[#64748B] font-sans">
          {productHero.subtext}
        </p>

        {/* CTAs */}
        <div className="relative flex items-center gap-3.5">
          <button
            className="rounded-[10px] py-3.5 px-7 bg-[#4ECDC4] border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate("/signup")}
          >
            <span className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[15px]/4.5">
              Start a free scan →
            </span>
          </button>
          <button
            className="rounded-[10px] py-3.5 px-7 bg-transparent border-[1.5px] border-solid border-[#E2E8F0] cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            onClick={() => navigate("/schedule")}
          >
            <span className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[15px]/4.5">
              Book a demo
            </span>
          </button>
        </div>
      </div>

      {/* Stats banner */}
      <div className="flex items-center justify-around py-16 px-30 bg-[#0A2540]">
        {productStats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-0">
            {i > 0 && <div className="w-px h-14 bg-[#FFFFFF1A] shrink-0 -ml-10 mr-10" />}
            <div>
              <div
                className="text-[48px] tracking-[-2px] leading-[100%] text-center font-sans"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="mt-2 uppercase tracking-[0.6px] text-center text-[#FFFFFF73] font-sans text-xs/4">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
