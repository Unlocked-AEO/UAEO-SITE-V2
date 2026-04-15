import { advisorsSection, advisors } from "@/data/mock-about";
import { useInView } from "@/hooks/useInView";

export function AboutAdvisors() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className={`w-full shrink-0 py-20 px-30 min-h-150 bg-surface transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center mb-4 rounded-[20px] py-1.25 px-3.5 bg-[#F0FDFA] border border-teal/35">
          <span className="uppercase tracking-[0.8px] text-teal font-sans text-[11px]/3.5">
            {advisorsSection.badge}
          </span>
        </div>
        <h2 className="text-[38px] tracking-[-1px] leading-[1.15] text-navy font-bold m-0">
          {advisorsSection.headline}
        </h2>
      </div>

      {/* Grid */}
      <div className="flex flex-wrap gap-5">
        {advisors.map((advisor) => (
          <div
            key={advisor.name}
            className="w-[calc(33.33%-14px)] flex flex-col rounded-2xl gap-3.5 min-h-40 bg-white border border-border-light p-7"
          >
            <div className="flex items-center gap-3.5">
              <div
                className="w-13 h-13 flex items-center justify-center shrink-0 rounded-full"
                style={{ backgroundImage: advisor.gradient }}
              >
                <span className="text-white font-sans text-base/5">
                  {advisor.initials}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-navy font-sans text-[15px]/4.5">
                  {advisor.name}
                </div>
                <div className="text-teal font-sans text-xs/4">
                  {advisor.title}
                </div>
              </div>
            </div>
            <p className="text-[13px] leading-[1.6] text-[#64748B] m-0">
              {advisor.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
