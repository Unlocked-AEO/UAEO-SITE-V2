import { pricingCTA } from "@/data/mock-pricing";

export function PricingCTA() {
  return (
    <section className="flex flex-col items-center py-25 px-10 lg:px-[120px] gap-8 bg-navy">
      <div className="flex flex-col items-center max-w-[640px] gap-4">
        <div className="inline-block rounded-[20px] py-1.5 px-3.5 bg-teal/15">
          <span className="tracking-[0.08em] uppercase text-teal font-bold text-[13px]/4">
            {pricingCTA.badge}
          </span>
        </div>
        <h2 className="text-[42px] text-center leading-[1.2] text-white font-bold">
          {pricingCTA.headline}
        </h2>
        <p className="text-[18px] text-center leading-[1.6] text-[#94A3B8]">
          {pricingCTA.subtext}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="rounded-lg py-4 px-8 bg-teal text-navy font-bold text-base/5 border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: get_free_aeo_score")}
        >
          {pricingCTA.primaryCTA}
        </button>
        <button
          className="rounded-lg py-4 px-8 border-[1.5px] border-white/25 bg-transparent text-white font-semibold text-base/5 cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => console.log("ACTION: talk_to_sales")}
        >
          {pricingCTA.secondaryCTA}
        </button>
      </div>

      <div className="flex mt-4 gap-12">
        {pricingCTA.trustSignals.map((signal) => (
          <div key={signal} className="flex items-center gap-2">
            <span className="text-teal text-base/5">✓</span>
            <span className="text-[#94A3B8] text-sm/[18px]">{signal}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
