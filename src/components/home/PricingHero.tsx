import { pricingHero } from "@/data/mock-pricing";

interface PricingHeroProps {
  isAnnual: boolean;
  onToggle: () => void;
}

export function PricingHero({ isAnnual, onToggle }: PricingHeroProps) {
  return (
    <section
      className="flex flex-col items-center pt-24 pb-20 px-10"
      style={{
        backgroundImage:
          "linear-gradient(in oklab 160deg, oklab(98.4% -0.014 -.0002) 0%, oklab(97.1% -0.019 -0.002) 100%)",
      }}
    >
      {/* Badge */}
      <div className="mb-7 rounded-[100px] py-[5px] px-4 bg-white border-[1.5px] border-teal">
        <span className="tracking-[1.8px] text-center uppercase text-teal text-[11px]/3.5">
          {pricingHero.badge}
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-[56px] tracking-[-2.5px] leading-[1.08] mb-5 text-center text-navy font-bold">
        {pricingHero.headline}
      </h1>

      {/* Subtext */}
      <p className="text-[18px] leading-[1.6] max-w-[520px] mb-12 text-center text-[#64748B]">
        {pricingHero.subtext}
      </p>

      {/* Billing toggle */}
      <div className="flex items-center gap-3.5">
        <span
          className={`text-center text-sm/[18px] ${!isAnnual ? "text-navy" : "text-[#64748B]"}`}
        >
          {pricingHero.toggleLabels.monthly}
        </span>
        <button
          className="w-12 h-[26px] relative rounded-[100px] bg-teal shrink-0 border-none cursor-pointer p-0"
          onClick={() => {
            onToggle();
            console.log("ACTION: toggle_billing", {
              billing: isAnnual ? "monthly" : "annual",
            });
          }}
        >
          <div
            className={`absolute top-[3px] rounded-full bg-white size-5 transition-all ${isAnnual ? "right-[3px]" : "left-[3px]"}`}
          />
        </button>
        <div className="flex items-center gap-2">
          <span
            className={`text-center text-sm/[18px] ${isAnnual ? "text-navy" : "text-[#64748B]"}`}
          >
            {pricingHero.toggleLabels.annual}
          </span>
          <span className="rounded-[100px] py-0.5 px-2.5 bg-teal/6 border border-teal text-center text-teal text-[11px]/3.5">
            {pricingHero.annualDiscount}
          </span>
        </div>
      </div>
    </section>
  );
}
