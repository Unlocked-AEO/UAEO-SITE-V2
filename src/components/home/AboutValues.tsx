import { valuesSection, values } from "@/data/mock-about";
import { useInView } from "@/hooks/useInView";

const icons = {
  clock: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
      <circle cx="11" cy="11" r="8" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M11 7v4l3 2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  arrow: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
      <path d="M4 11h14M11 4l7 7-7 7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  star: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
      <path d="M11 2L13 8H19L14 12L16 18L11 14.5L6 18L8 12L3 8H9L11 2Z" stroke="#FFFFFF" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
};

export function AboutValues() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className={`w-full shrink-0 py-20 px-30 min-h-95 bg-white transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Header */}
      <div className="flex flex-col items-center mb-13">
        <div className="inline-flex items-center mb-4 rounded-[20px] py-1.25 px-3.5 bg-[#F0FDFA] border border-teal/35">
          <span className="uppercase tracking-[0.8px] text-teal font-sans text-[11px]/3.5">
            {valuesSection.badge}
          </span>
        </div>
        <h2 className="text-[38px] tracking-[-1px] leading-[1.15] text-center text-navy font-bold m-0">
          {valuesSection.headline}
        </h2>
      </div>

      {/* Cards */}
      <div className="flex gap-6">
        {values.map((value) => (
          <div
            key={value.title}
            className="grow shrink basis-0 rounded-2xl bg-surface border border-border-light p-8"
          >
            <div
              className="flex items-center justify-center mb-5 rounded-xl size-11"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(71.6% -0.102 -0.015) 100%)",
              }}
            >
              {icons[value.icon]}
            </div>
            <h3 className="mb-2.5 text-navy font-sans text-lg/5.5 m-0">
              {value.title}
            </h3>
            <p className="text-[14px] leading-[1.6] text-[#64748B] m-0">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
