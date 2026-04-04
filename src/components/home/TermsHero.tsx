import { termsHero } from "@/data/mock-terms";

export function TermsHero() {
  return (
    <section className="flex flex-col pt-18 pb-16 bg-surface border-b border-[#E2E8F0] px-10 lg:px-20">
      {/* Badge */}
      <div className="mb-6 w-fit rounded-[100px] py-[5px] px-4 bg-white border-[1.5px] border-teal">
        <span className="tracking-[1.8px] uppercase text-teal text-[11px]/3.5">
          {termsHero.badge}
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-[48px] tracking-[-2px] leading-[1.08] mb-4 text-navy font-bold">
        {termsHero.headline}
      </h1>

      {/* Last updated */}
      <p className="text-[15px] leading-[1.6] text-[#94A3B8]">
        {termsHero.lastUpdated}
      </p>
    </section>
  );
}
