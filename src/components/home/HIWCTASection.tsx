import { useNavigate } from "react-router-dom";
import { hiwCTA } from "@/data/mock-how-it-works";

export function HIWCTASection() {
  const navigate = useNavigate();
  return (
    <section className="relative w-full shrink-0 py-24 px-20 overflow-clip min-h-90 bg-navy">
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 w-[700px] h-[500px]"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 9%) 0%, oklab(0% -.0001 0 / 0%) 65%)",
          translate: "-50% -50%",
        }}
      />

      <div className="relative max-w-[600px] mx-auto">
        <div className="tracking-widest uppercase mb-5 text-center text-teal font-bold text-[11px]/3.5">
          {hiwCTA.label}
        </div>
        <h2 className="text-[48px] tracking-[-1.5px] leading-[1.08] mb-5 text-center text-white font-extrabold m-0">
          {hiwCTA.headline}
        </h2>
        <p className="text-[17px] leading-[1.65] mb-11 text-center text-white/55 m-0">
          {hiwCTA.description}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            className="rounded-lg py-3.75 px-9 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate("/signup")}
          >
            <span className="text-center text-black font-sans font-semibold text-base/5">
              {hiwCTA.primaryCTA}
            </span>
          </button>
          <button
            className="rounded-lg py-3.75 px-8 bg-white/8 border-[1.5px] border-white/18 cursor-pointer hover:bg-white/12 transition-colors"
            onClick={() => console.log("ACTION: contact_sales")}
          >
            <span className="text-center text-teal font-sans font-semibold text-base/5">
              {hiwCTA.secondaryCTA}
            </span>
          </button>
        </div>
        <p className="mt-5 text-center text-white/30 text-[13px]/4 m-0">
          {hiwCTA.disclaimer}
        </p>
      </div>
    </section>
  );
}
