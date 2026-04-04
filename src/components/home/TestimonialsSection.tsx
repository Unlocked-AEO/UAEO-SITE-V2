import { useState } from "react";
import { testimonials, testimonialEngines } from "@/data/mock-landing";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  return (
    <section className="flex flex-col items-center bg-white p-20">
      {/* Engine tabs */}
      <div className="flex mb-12 rounded-full gap-2 bg-surface p-1.5">
        {testimonialEngines.map((engine, i) => (
          <button
            key={engine}
            className={`rounded-full py-2 px-5 border-none cursor-pointer text-base/5 font-sans transition-all ${
              i === activeIndex
                ? "bg-white shadow-[0_1px_4px_#0A25401A] text-black"
                : "bg-transparent text-black hover:bg-white/60"
            }`}
            onClick={() => {
              setActiveIndex(i);
              console.log("ACTION: switch_testimonial", { engine });
            }}
          >
            {engine}
          </button>
        ))}
      </div>

      {/* Quote */}
      <div className="max-w-[720px] mb-10">
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
            className={`border-none cursor-pointer p-0 ${
              i === activeIndex
                ? "w-6 h-1.5 rounded-full bg-navy"
                : "size-1.5 rounded-full bg-[#D6DCE3]"
            }`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
