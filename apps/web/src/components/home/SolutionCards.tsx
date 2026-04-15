import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  solutionsIntro,
  visibilityScoreCard,
  contentIntelCard,
  engineScores,
} from "@/data/mock-landing";
import { EngineIcon } from "@/components/home/EngineIcon";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(ScrollTrigger);

export function SolutionCards() {
  const [introRef, introInView] = useInView(0.2);
  return (
    <>
      {/* Section intro */}
      <section ref={introRef} className={`flex flex-col items-center text-center max-w-[680px] mx-auto pt-20 pb-12 bg-white px-20 transition-all duration-700 ${introInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <span className="tracking-[0.06em] uppercase mb-4 text-teal font-semibold text-[13px]/4">
          {solutionsIntro.label}
        </span>
        <h2 className="text-[42px] leading-[1.15] tracking-[-0.03em] mb-5 text-navy font-bold whitespace-pre-wrap m-0">
          {solutionsIntro.headline}
        </h2>
        <p className="text-[17px] leading-[1.65] mb-8 text-slate-body m-0">
          {solutionsIntro.description}
        </p>
        <button
          className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0 hover:opacity-80"
          onClick={() => console.log("ACTION: explore_solutions")}
        >
          <span className="text-iris font-semibold text-[15px]/[18px]">
            {solutionsIntro.cta}
          </span>
          <span className="text-iris font-semibold text-lg/[22px]">›</span>
        </button>
      </section>

      {/* Two main cards */}
      <section className="flex pb-6 gap-5 bg-white px-20">
        {/* AI Visibility Score */}
        <CardWithScores />

        {/* Content Intelligence */}
        <ContentIntelCard />
      </section>
    </>
  );
}

function ContentIntelCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Checklist items stagger in
      if (checklistRef.current) {
        const items = checklistRef.current.querySelectorAll(".checklist-item");
        gsap.from(items, {
          x: -20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: checklistRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="grow shrink basis-0 flex flex-col justify-between min-h-[400px] relative rounded-2xl overflow-clip bg-navy p-10"
    >
      <div>
        <span className="tracking-[0.08em] uppercase mb-4 block text-teal font-semibold text-xs/4">
          {contentIntelCard.label}
        </span>
        <h3 className="text-[24px] leading-[1.3] tracking-[-0.02em] mb-3 text-white font-bold m-0">
          {contentIntelCard.headline}
        </h3>
        <p className="text-[14px] leading-[1.6] mb-0 text-white/65 m-0">
          {contentIntelCard.description}
        </p>
      </div>

      <div ref={checklistRef} className="flex flex-col gap-2 mt-8">
        {contentIntelCard.checklist.map((item) => (
          <div
            key={item}
            className="checklist-item flex items-center gap-3 rounded-lg py-3 px-4 bg-white/7 border border-white/10"
          >
            <div className="flex items-center justify-center shrink-0 rounded-full bg-teal/20 size-6">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                <path d="M2 6l3 3 5-5" stroke="#4ECDC4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[13px] leading-[1.5] text-teal font-medium">
              {item}
            </span>
          </div>
        ))}
        <div className="checklist-item flex items-center gap-3 rounded-lg py-3 px-4 bg-teal/10 border border-teal/20">
          <div className="flex items-center justify-center shrink-0 rounded-full bg-teal/20 size-6">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path d="M3 6h6M6 3l3 3-3 3" stroke="#4ECDC4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[13px] leading-[1.5] text-white font-semibold">
            Projected citations: {contentIntelCard.projection}
          </span>
        </div>
      </div>

      {/* Decorative glow */}
      <div
        className="absolute -bottom-16 -right-16 w-[280px] h-[280px] rounded-full"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 20%) 0%, oklab(0% -.0001 0 / 0%) 65%)",
        }}
      />
    </div>
  );
}

function CardWithScores() {
  const cardRef = useRef<HTMLDivElement>(null);
  const scoreCardRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const changeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Score card slides up
      gsap.from(scoreCardRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scoreCardRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            // Stagger rows sliding in from left
            gsap.from(rowRefs.current.filter(Boolean), {
              x: -40,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1,
            });

            // Bars fill with elastic ease
            barRefs.current.forEach((bar, i) => {
              if (!bar) return;
              const score = engineScores[i].score;
              gsap.fromTo(
                bar,
                { width: "0%" },
                {
                  width: `${score}%`,
                  duration: 1.2,
                  ease: "elastic.out(1, 0.6)",
                  delay: i * 0.12 + 0.3,
                }
              );
            });

            // Numbers count up with GSAP
            numberRefs.current.forEach((el, i) => {
              if (!el) return;
              const target = engineScores[i].score;
              gsap.fromTo(
                { val: 0 },
                { val: target },
                {
                  duration: 1.0,
                  delay: i * 0.12 + 0.3,
                  ease: "power2.out",
                  onUpdate: function () {
                    if (el) el.textContent = String(Math.round(this.targets()[0].val));
                  },
                }
              );
            });

            // Change indicators pop in
            gsap.from(changeRefs.current.filter(Boolean), {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              ease: "back.out(2)",
              stagger: 0.1,
              delay: 0.8,
            });
          },
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="grow shrink basis-0 flex flex-col min-h-[400px] relative rounded-2xl overflow-clip bg-surface p-10">
      <span className="tracking-[0.08em] uppercase mb-4 text-teal font-semibold text-xs/4">
        {visibilityScoreCard.label}
      </span>
      <h3 className="text-[24px] leading-[1.3] tracking-[-0.02em] mb-3 text-navy font-bold m-0">
        {visibilityScoreCard.headline}
      </h3>
      <p className="text-[14px] leading-[1.6] mb-8 max-w-[340px] text-slate-body m-0">
        {visibilityScoreCard.description}
      </p>

      {/* Score card */}
      <div ref={scoreCardRef} className="flex flex-col w-full rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0_1px_4px_#0A25400F]">
        <span className="mb-4 tracking-[-0.1px] text-navy font-medium text-[13px]/4">
          {visibilityScoreCard.chartTitle}
        </span>
        {engineScores.map((engine, i) => {
          const isPositive = engine.change >= 0;
          const scoreColor =
            engine.score >= 70 ? "text-success" : engine.score >= 50 ? "text-warning" : "text-danger";
          const barColorHex =
            engine.score >= 70 ? "#27AE60" : engine.score >= 50 ? "#FF9F43" : "#E74C3C";
          const changeColor = isPositive ? "text-success" : "text-danger";
          const isLast = i === engineScores.length - 1;

          return (
            <div
              key={engine.slug}
              ref={(el) => { rowRefs.current[i] = el; }}
              className={`flex flex-col ${isLast ? "" : "mb-4"} gap-[5px]`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[7px]">
                  <EngineIcon slug={engine.slug} variant="badge" />
                  <span className="text-slate-body text-xs/4">{engine.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    ref={(el) => { changeRefs.current[i] = el; }}
                    className={`${changeColor} font-semibold text-[10px]/3`}
                  >
                    {isPositive ? "▲" : "▼"} {isPositive ? "+" : ""}
                    {engine.change}
                  </span>
                  <span
                    ref={(el) => { numberRefs.current[i] = el; }}
                    className={`${scoreColor} font-semibold text-[13px]/4`}
                  >
                    0
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-[3px] bg-[#F0F4F8] shrink-0">
                <div
                  ref={(el) => { barRefs.current[i] = el; }}
                  className="h-full rounded-[3px]"
                  style={{ width: "0%", backgroundColor: barColorHex }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative gradient */}
      <div
        className="absolute top-0 right-0 w-[300px] h-[200px] rounded-tr-2xl rounded-bl-[60px]"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017 / 15%) 0%, oklab(57.8% 0.034 -0.232 / 10%) 100%)",
        }}
      />
    </div>
  );
}
