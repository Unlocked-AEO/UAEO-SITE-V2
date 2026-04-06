import { useEffect, useRef } from "react";
import gsap from "gsap";
import { hiwHero, processSteps } from "@/data/mock-how-it-works";

export function HIWHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(badgeRef.current, {
        y: 20, opacity: 0, duration: 0.5, ease: "power2.out",
      })
      .from(headlineRef.current, {
        y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
      }, "-=0.3")
      .from(subtextRef.current, {
        y: 30, opacity: 0, duration: 0.6, ease: "power2.out",
      }, "-=0.4")
      .from(stepsRef.current, {
        y: 30, opacity: 0, scale: 0.95, duration: 0.6, ease: "power2.out",
      }, "-=0.3");

      // Animate step circles sequentially
      const stepCircles = stepsRef.current?.querySelectorAll(".step-circle");
      const stepLines = stepsRef.current?.querySelectorAll(".step-line");
      const stepLabels = stepsRef.current?.querySelectorAll(".step-label");

      if (stepCircles) {
        tl.from(stepCircles, {
          scale: 0, duration: 0.4, ease: "back.out(2.5)", stagger: 0.12,
        }, "-=0.2");
      }
      if (stepLines) {
        stepLines.forEach((line) => {
          const el = line as HTMLElement;
          gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
          tl.to(el, { scaleX: 1, duration: 0.3, ease: "power2.out" }, "-=0.3");
        });
      }
      if (stepLabels) {
        tl.from(stepLabels, {
          y: 8, opacity: 0, duration: 0.3, ease: "power2.out", stagger: 0.1,
        }, "-=0.3");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full shrink-0 pt-22 pb-18 overflow-clip min-h-110 bg-white border-b border-border-light px-20">
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 w-[800px] h-[400px]"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 20% in oklab, oklab(77.6% -0.110 -0.017 / 10%) 0%, oklab(0% -.0001 0 / 0%) 65%)",
          translate: "-50%",
        }}
      />

      <div className="relative max-w-[720px] flex flex-col items-center mx-auto">
        <div ref={badgeRef} className="inline-flex items-center mb-7 rounded-[20px] py-1.25 px-4 gap-1.5 bg-[#F0FDFA] border border-teal/50">
          <span className="tracking-[0.08em] uppercase text-center text-teal font-bold text-[11px]/3.5">
            {hiwHero.badge}
          </span>
        </div>

        <h1 ref={headlineRef} className="text-[54px] tracking-[-1.5px] leading-[1.08] mb-5 text-center text-navy font-extrabold whitespace-pre-wrap m-0">
          {hiwHero.headline}
        </h1>

        <p ref={subtextRef} className="text-[18px] leading-[1.7] max-w-[520px] mt-0 mb-14 text-center text-slate-body mx-auto">
          {hiwHero.subtext}
        </p>

        <div ref={stepsRef} className="inline-flex items-center rounded-[40px] py-3.5 px-7 bg-surface border border-border-light">
          {processSteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              {i > 0 && (
                <div className="step-line w-12 h-px mb-4.5 bg-[#CBD5E1] shrink-0" />
              )}
              <div className="flex flex-col items-center px-6 gap-1.5">
                <div
                  className={`step-circle w-7.5 h-7.5 flex items-center justify-center rounded-full shrink-0 ${
                    step.variant === "teal" ? "bg-teal" : "bg-navy"
                  }`}
                >
                  <span className="text-center text-white font-bold text-[13px]/4">
                    {step.number}
                  </span>
                </div>
                <span className="step-label text-center text-navy font-semibold text-[11px]/3.5">
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
