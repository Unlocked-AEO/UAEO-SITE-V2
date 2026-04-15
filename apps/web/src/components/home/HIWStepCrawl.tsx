import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stepCrawl, crawlCard } from "@/data/mock-how-it-works";
import { ChecklistItem } from "@/components/home/HIWChecklist";

gsap.registerPlugin(ScrollTrigger);

export function HIWStepCrawl() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text slides in from left
      gsap.from(textRef.current, {
        x: -60, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      // Card slides in from right
      gsap.from(cardRef.current, {
        x: 60, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      // Checklist items stagger in
      const checkItems = textRef.current?.querySelectorAll(".checklist-item");
      if (checkItems) {
        gsap.from(checkItems, {
          x: -20, opacity: 0, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        });
      }

      // Progress bar fills
      if (progressRef.current) {
        gsap.from(progressRef.current, {
          scaleX: 0, transformOrigin: "left center", duration: 1.5, ease: "power2.out", delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        });
      }

      // Crawl items cascade in
      const crawlItems = cardRef.current?.querySelectorAll(".crawl-item");
      if (crawlItems) {
        gsap.from(crawlItems, {
          y: 15, opacity: 0, duration: 0.4, ease: "power2.out", stagger: 0.08, delay: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full shrink-0 py-24 min-h-120 bg-white border-b border-border-light">
      <div className="max-w-7xl flex items-center px-20 gap-20 mx-auto">
        {/* Text */}
        <div ref={textRef} className="grow-0 shrink-0 basis-[460px]">
          <div className="tracking-widest uppercase mb-4 text-teal font-bold text-[11px]/3.5">
            {stepCrawl.label}
          </div>
          <h2 className="text-[46px] tracking-[-1.2px] leading-[1.06] mb-4 text-navy font-extrabold m-0">
            {stepCrawl.title}
          </h2>
          <p className="text-base leading-[1.75] mb-9 text-[#64748B] m-0">
            {stepCrawl.description}
          </p>
          <div className="flex flex-col gap-3.5">
            {stepCrawl.checklist.map((item) => (
              <div key={item} className="checklist-item">
                <ChecklistItem label={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Card — Browser mockup */}
        <div ref={cardRef} className="grow shrink basis-0 rounded-[20px] overflow-clip bg-surface border border-border-light shadow-[0_12px_48px_#0A254014]">
          <div className="flex items-center py-3.5 px-4.5 gap-1.75 bg-white border-b border-border-light">
            <div className="rounded-full bg-[#FF6B6B] shrink-0 size-2.5" />
            <div className="rounded-full bg-[#FFD93D] shrink-0 size-2.5" />
            <div className="rounded-full bg-[#6BCB77] shrink-0 size-2.5" />
            <div className="grow shrink basis-0 ml-2 rounded-[10px] py-1.25 px-3 bg-[#F0F4F8]">
              <span className="text-slate-muted text-[11px]/3.5">{crawlCard.url}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="uppercase tracking-[0.06em] text-slate-muted font-semibold text-[11px]/3.5">
                Crawl Progress
              </span>
              <span className="text-success font-semibold text-[11px]/3.5">{crawlCard.status}</span>
            </div>

            <div className="h-1.5 mb-5.5 rounded-[3px] bg-border-light">
              <div
                ref={progressRef}
                className="rounded-[3px] size-full"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 90deg, oklab(77.6% -0.110 -0.017) 0%, oklab(74.6% -0.121 -0.016) 100%)",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              {crawlCard.items.map((item) => (
                <div
                  key={item.name}
                  className="crawl-item flex items-center rounded-lg py-2.25 px-3 gap-2.5 bg-white border border-border-light"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                    <circle cx="7" cy="7" r="6.5" stroke="#27AE60" />
                    <path d="M4 7L6.5 9.5L10 4.5" stroke="#27AE60" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="grow shrink basis-0 text-slate-body text-xs/4">{item.name}</span>
                  <span className="text-slate-muted shrink-0 text-[11px]/3.5">{item.detail}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg py-2.5 px-3.5 bg-[#F0FDFA]">
              <span className="text-navy font-semibold text-xs/4">{crawlCard.summary}</span>
              <span className="text-success font-semibold text-xs/4">{crawlCard.timing}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
