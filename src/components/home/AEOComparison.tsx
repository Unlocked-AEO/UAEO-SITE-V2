import {
  comparisonSection,
  seoItems,
  aeoItems,
} from "@/data/mock-what-is-aeo";
import { useInView } from "@/hooks/useInView";

export function AEOComparison() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className={`py-20 px-10 lg:px-[120px] bg-white transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Section header */}
      <div className="flex flex-col items-center mb-13">
        <div className="inline-flex items-center mb-4 rounded-[20px] py-[5px] px-3.5 bg-teal/6 border border-teal/35">
          <span className="uppercase tracking-[0.8px] text-center text-teal text-[11px]/3.5">
            {comparisonSection.badge}
          </span>
        </div>
        <h2 className="text-[38px] tracking-[-1px] leading-[1.15] text-center text-navy font-bold">
          {comparisonSection.headline}
        </h2>
      </div>

      {/* Comparison columns */}
      <div className="flex gap-6">
        {/* SEO column */}
        <div className="grow shrink basis-0 rounded-2xl overflow-clip bg-surface border border-border-light">
          <div className="flex items-center py-5 px-7 gap-2.5 bg-[#F1F5F9] border-b border-border-light">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="shrink-0"
            >
              <rect
                x="2"
                y="2"
                width="14"
                height="14"
                rx="3"
                stroke="#64748B"
                strokeWidth="1.5"
              />
              <path
                d="M5 9h8M5 6h8M5 12h5"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[#64748B] text-sm/[18px]">
              Traditional SEO
            </span>
          </div>
          <div className="py-2">
            {seoItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-center py-3.5 px-7 gap-2.5 ${i < seoItems.length - 1 ? "border-b border-[#F1F5F9]" : ""}`}
              >
                <span className="grow text-[#64748B] text-[13px]/4">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AEO column */}
        <div className="grow shrink basis-0 rounded-2xl overflow-clip bg-white border-2 border-teal shadow-[0px_4px_24px_#4ECDC41F]">
          <div className="flex items-center py-5 px-7 gap-2.5 bg-teal/6 border-b border-teal/20">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="shrink-0"
            >
              <circle cx="9" cy="9" r="7" stroke="#4ECDC4" strokeWidth="1.5" />
              <path
                d="M6 9l2.5 2.5L12 6"
                stroke="#4ECDC4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-teal text-sm/[18px]">
              Answer Engine Optimization
            </span>
          </div>
          <div className="py-2">
            {aeoItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-center py-3.5 px-7 gap-2.5 ${i < aeoItems.length - 1 ? "border-b border-teal/6" : ""}`}
              >
                <span className="grow text-navy text-[13px]/4">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
