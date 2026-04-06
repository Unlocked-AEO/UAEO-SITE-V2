import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hiwCTA } from "@/data/mock-how-it-works";

gsap.registerPlugin(ScrollTrigger);

export function HIWCTASection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      tl.from(labelRef.current, { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" })
        .from(headlineRef.current, { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
        .from(descRef.current, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .from(ctaRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.6, ease: "power2.out" }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full shrink-0 py-24 px-20 overflow-clip min-h-90 bg-navy">
      <div
        className="absolute top-1/2 left-1/2 w-[700px] h-[500px]"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 9%) 0%, oklab(0% -.0001 0 / 0%) 65%)",
          translate: "-50% -50%",
        }}
      />

      <div className="relative max-w-[600px] mx-auto">
        <div ref={labelRef} className="tracking-widest uppercase mb-5 text-center text-teal font-bold text-[11px]/3.5">
          {hiwCTA.label}
        </div>
        <h2 ref={headlineRef} className="text-[48px] tracking-[-1.5px] leading-[1.08] mb-5 text-center text-white font-extrabold m-0">
          {hiwCTA.headline}
        </h2>
        <p ref={descRef} className="text-[17px] leading-[1.65] mb-11 text-center text-white/55 m-0">
          {hiwCTA.description}
        </p>
        <div ref={ctaRef} className="flex items-center justify-center gap-3">
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
            onClick={() => navigate("/contact")}
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
