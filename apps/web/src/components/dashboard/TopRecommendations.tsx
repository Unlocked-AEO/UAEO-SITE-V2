import { useEffect, useRef } from "react";
import gsap from "gsap";
import { recommendations } from "@/data/mock-dashboard";

export function TopRecommendations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".rec-item");
      if (items) {
        gsap.from(items, {
          x: -25,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.5,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grow shrink basis-0 flex flex-col rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="mb-3.5 text-navy text-[13px]/4">
        Top Recommendations
      </div>
      <div className="flex flex-col gap-2.5">
        {recommendations.map((rec) => {
          const isHigh = rec.priority === "high";
          const bgColor = isHigh ? "bg-[#FFF8F0]" : "bg-[#F0FAF8]";
          const borderColor = isHigh
            ? "border-l-warning"
            : "border-l-teal";
          const circleBg = isHigh ? "bg-warning" : "bg-teal";

          return (
            <button
              key={rec.number}
              className={`rec-item flex rounded-lg gap-2.5 ${bgColor} border-l-[3px] ${borderColor} p-2.5 bg-transparent border-t-0 border-r-0 border-b-0 cursor-pointer text-left hover:opacity-90 transition-opacity`}
              onClick={() =>
                console.log("ACTION: view_recommendation", {
                  id: rec.number,
                  title: rec.title,
                })
              }
            >
              <div
                className={`flex items-center justify-center shrink-0 rounded-full ${circleBg} size-5`}
              >
                <span
                  className={`text-white text-[10px]/3 ${rec.number === 5 ? "opacity-50" : ""}`}
                >
                  {rec.number}
                </span>
              </div>
              <div>
                <div className="mb-0.5 text-navy text-xs/4">{rec.title}</div>
                <div className="text-[11px] leading-[1.4] text-slate-muted">
                  {rec.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
