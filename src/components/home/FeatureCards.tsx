import {
  competitiveIntelCard,
  schemaCard,
  reputationCard,
} from "@/data/mock-landing";

export function FeatureCards() {
  return (
    <section className="flex pb-6 gap-5 bg-white px-20">
      {/* Competitive Intelligence */}
      <div className="grow shrink basis-0 flex flex-col rounded-2xl bg-surface p-8">
        <div
          className="flex items-center justify-center mb-5 rounded-[10px] shrink-0 size-10"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(62.2% -0.105 -0.015) 100%)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 14l4-4 3 3 5-6 4 3"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mb-2.5 tracking-[-0.02em] text-navy font-bold text-lg/[22px] m-0">
          {competitiveIntelCard.title}
        </h3>
        <p className="text-[13px] leading-[1.65] mb-6 text-slate-body m-0">
          {competitiveIntelCard.description}
        </p>
        <div className="mt-auto pt-5 border-t border-border-light">
          <div className="flex gap-3">
            {competitiveIntelCard.stats.map((stat) => (
              <div
                key={stat.label}
                className="grow shrink basis-0 rounded-lg py-2.5 px-3.5 bg-white shadow-[0_1px_4px_#0A254014]"
              >
                <div
                  className={`text-center font-bold text-xl/6 ${stat.highlight ? "text-teal" : "text-navy"}`}
                >
                  {stat.value}
                </div>
                <div className="mt-0.5 text-center text-slate-muted text-[10px]/3">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schema & Structured Data */}
      <div className="grow shrink basis-0 flex flex-col rounded-2xl bg-surface p-8">
        <div
          className="flex items-center justify-center mb-5 rounded-[10px] shrink-0 size-10"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 135deg, oklab(57.8% 0.034 -0.232) 0%, oklab(77.6% -0.110 -0.017) 100%)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#FFFFFF" strokeWidth="1.8" />
            <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="#FFFFFF" strokeWidth="1.8" />
            <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="#FFFFFF" strokeWidth="1.8" />
            <rect x="11" y="11" width="6" height="6" rx="1.5" fill="#FFFFFF" />
          </svg>
        </div>
        <h3 className="mb-2.5 tracking-[-0.02em] text-navy font-bold text-lg/[22px] m-0">
          {schemaCard.title}
        </h3>
        <p className="text-[13px] leading-[1.65] mb-6 text-slate-body m-0">
          {schemaCard.description}
        </p>
        <div className="mt-auto flex flex-wrap pt-5 gap-2 border-t border-border-light">
          {schemaCard.tags.map((tag) => {
            const tagStyles = {
              purple: "bg-[#F0EFFF] text-iris",
              teal: "bg-[#E6F9F8] text-[#0D9B93]",
              gray: "bg-border-light text-navy",
            };
            return (
              <span
                key={tag.label}
                className={`inline-block rounded-full py-1 px-2.5 font-semibold text-[10px]/3 ${tagStyles[tag.variant]}`}
              >
                {tag.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Reputation Accuracy */}
      <div className="grow shrink basis-0 flex flex-col rounded-2xl bg-navy p-8">
        <div className="flex items-center justify-center mb-5 rounded-[10px] bg-teal/20 shrink-0 size-10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2l1.8 5.4H17l-4.4 3.2 1.7 5.2L10 13l-4.3 2.8 1.7-5.2L3 7.4h5.2L10 2z"
              stroke="#4ECDC4"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mb-2.5 tracking-[-0.02em] text-white font-bold text-lg/[22px] m-0">
          {reputationCard.title}
        </h3>
        <p className="text-[13px] leading-[1.65] mb-6 text-white/60 m-0">
          {reputationCard.description}
        </p>
        <div className="mt-auto pt-5 border-t border-white/10">
          {reputationCard.features.map((feature) => (
            <div key={feature} className="flex items-center mb-2 last:mb-0 gap-2">
              <div className="rounded-full bg-teal shrink-0 size-1.5" />
              <span className="text-white/70 text-xs/4">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
