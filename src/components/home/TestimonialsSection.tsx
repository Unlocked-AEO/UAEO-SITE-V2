import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials, testimonialEngines } from "@/data/mock-landing";

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tabsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(quoteRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Quote transition on tab change
  const switchQuote = useCallback((i: number) => {
    if (i === activeIndex || !quoteRef.current) return;

    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(i);
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      },
    });
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="flex flex-col items-center bg-white p-20">
      {/* Engine tabs */}
      <div ref={tabsRef} className="flex mb-12 rounded-full gap-2 bg-surface p-1.5">
        {testimonialEngines.map((engine, i) => (
          <button
            key={engine}
            className={`rounded-full py-2 px-5 border-none cursor-pointer text-base/5 font-sans transition-all ${
              i === activeIndex
                ? "bg-white shadow-[0_1px_4px_#0A25401A] text-black"
                : "bg-transparent text-black hover:bg-white/60"
            }`}
            onClick={() => switchQuote(i)}
          >
            {engine}
          </button>
        ))}
      </div>

      {/* Quote */}
      <div ref={quoteRef} className="max-w-[720px] mb-10">
        <blockquote className="text-[32px] leading-[1.3] tracking-[-0.025em] mb-6 text-center text-navy font-bold m-0">
          {active.quote}
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          <div
            className="flex items-center justify-center rounded-full shrink-0 size-10"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(57.8% 0.034 -0.232) 100%)",
            }}
          >
            <span className="text-center text-white font-bold text-sm/[18px]">
              {active.authorInitials}
            </span>
          </div>
          <div>
            <div className="text-navy font-bold text-sm/[18px]">
              {active.authorName}
            </div>
            <div className="text-slate-muted text-[13px]/4">
              {active.authorRole}, {active.authorCompany}
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`border-none cursor-pointer p-0 transition-all duration-300 ${
              i === activeIndex
                ? "w-6 h-1.5 rounded-full bg-navy"
                : "size-1.5 rounded-full bg-[#D6DCE3]"
            }`}
            onClick={() => switchQuote(i)}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
