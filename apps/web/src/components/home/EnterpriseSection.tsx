import { enterpriseSection, caseStudy } from "@/data/mock-landing";

const featureIcons = [
  <svg key="star" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2L11 7H16L12 10.5L13.5 16L9 13L4.5 16L6 10.5L2 7H7L9 2Z" fill="#4ECDC4" />
  </svg>,
  <svg key="report" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="4" width="14" height="10" rx="2" stroke="#4ECDC4" strokeWidth="1.6" />
    <path d="M5 8h8M5 11h5" stroke="#4ECDC4" strokeWidth="1.4" strokeLinecap="round" />
  </svg>,
  <svg key="clock" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="#4ECDC4" strokeWidth="1.6" />
    <path d="M9 6v3l2 2" stroke="#4ECDC4" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
];

export function EnterpriseSection() {
  return (
    <section className="flex flex-col pt-20 gap-6 bg-white px-20">
      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="tracking-[0.06em] uppercase mb-3 block text-teal font-semibold text-[13px]/4">
            {enterpriseSection.label}
          </span>
          <h2 className="text-[38px] leading-[1.15] tracking-[-0.03em] max-w-[520px] text-navy font-bold m-0">
            {enterpriseSection.headline}
          </h2>
        </div>
        <button
          className="flex items-center pb-1 gap-1.5 bg-transparent border-none cursor-pointer p-0 hover:opacity-80"
          onClick={() => console.log("ACTION: contact_sales")}
        >
          <span className="text-iris font-semibold text-sm/[18px]">
            {enterpriseSection.cta}
          </span>
          <span className="text-iris font-semibold text-sm/[18px]">›</span>
        </button>
      </div>

      {/* Cards */}
      <div className="flex gap-5">
        {/* Features list */}
        <div className="grow shrink basis-0 flex flex-col rounded-2xl gap-7 bg-surface p-9">
          {enterpriseSection.features.map((feature, i) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex items-center justify-center shrink-0 mt-0.5 rounded-lg bg-[#E6F9F8] size-9">
                {featureIcons[i]}
              </div>
              <div>
                <h4 className="mb-1.5 text-navy font-bold text-base/5 m-0">
                  {feature.title}
                </h4>
                <p className="text-[13px] leading-[1.6] text-slate-body m-0">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Case study */}
        <div
          className="grow shrink basis-0 flex flex-col justify-between relative rounded-2xl overflow-clip p-9"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 160deg, oklab(26% -0.019 -0.057) 0%, oklab(39.4% -0.042 -0.072) 100%)",
          }}
        >
          <div>
            <span className="tracking-[0.08em] uppercase mb-5 block text-teal font-semibold text-[11px]/[14px]">
              {caseStudy.label}
            </span>
            <h3 className="text-[22px] leading-[1.35] tracking-[-0.02em] mb-4 text-white font-bold m-0">
              {caseStudy.quote}
            </h3>
            <p className="text-[13px] leading-[1.6] mb-7 text-white/60 m-0">
              {caseStudy.description}
            </p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-white font-bold text-[13px]/4">
                {caseStudy.author}
              </div>
              <div className="text-white/45 text-xs/4">
                {caseStudy.company}
              </div>
            </div>
            <div className="flex gap-6">
              {caseStudy.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-center text-teal font-extrabold text-2xl/[30px]">
                    {stat.value}
                  </div>
                  <div className="text-center text-white/50 text-[10px]/3">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute -top-[30px] -right-[30px] w-[180px] h-[180px]"
            style={{
              backgroundImage:
                "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 18%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
