import { useNavigate } from "react-router-dom";
import { productCTA } from "@/data/mock-product";

export function ProductCTA() {
  const navigate = useNavigate();

  return (
    <section
      className="relative flex items-center justify-between py-20 px-30 overflow-clip gap-15 min-h-70"
      style={{
        backgroundImage:
          "linear-gradient(in oklab 135deg, oklab(26% -0.019 -0.057) 0%, oklab(32.5% -0.023 -0.085) 60%, oklab(25.5% 0.012 -0.092) 100%)",
      }}
    >
      <div
        className="absolute -top-20 right-45 rounded-[50%] size-80"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 10%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
        }}
      />
      <div className="relative">
        <h2 className="text-[40px] tracking-[-1px] leading-[120%] mb-3.5 text-white font-['Inter',system-ui,sans-serif] font-bold whitespace-pre-line">
          {productCTA.headline}
        </h2>
        <p className="text-[16px] max-w-115 leading-[165%] text-[#FFFFFF8C] font-sans">
          {productCTA.subtext}
        </p>
      </div>
      <div className="flex shrink-0 relative gap-3.5">
        <button
          className="rounded-[10px] py-3.5 px-7 bg-[#4ECDC4] border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/signup")}
        >
          <span className="text-[#0A2540] font-sans text-[15px]/4.5">
            {productCTA.primaryCTA} →
          </span>
        </button>
        <button
          className="rounded-[10px] py-3.5 px-7 bg-[#FFFFFF14] border border-solid border-[#FFFFFF26] cursor-pointer hover:bg-[#FFFFFF1F] transition-colors"
          onClick={() => navigate("/schedule")}
        >
          <span className="text-white font-sans text-[15px]/4.5">
            {productCTA.secondaryCTA}
          </span>
        </button>
      </div>
    </section>
  );
}
