import { pricingPlans, ANNUAL_DISCOUNT } from "@/data/mock-pricing";
import type { PricingPlan } from "@/data/mock-pricing";

function formatPrice(monthlyPrice: number, isAnnual: boolean): string {
  const price = isAnnual ? monthlyPrice * ANNUAL_DISCOUNT : monthlyPrice;
  return `$${price.toFixed(2)}`;
}

function PlanCard({
  plan,
  isAnnual,
}: {
  plan: PricingPlan;
  isAnnual: boolean;
}) {
  const isHighlighted = plan.highlighted;
  const hasPrice = plan.monthlyPrice !== null;

  const cardClasses = isHighlighted
    ? "flex flex-col grow shrink basis-0 relative rounded-[20px] py-9 px-8 self-stretch bg-navy border-2 border-teal"
    : "flex flex-col grow shrink basis-0 rounded-[20px] px-8 py-9 self-stretch bg-[#FAFAFA] border-[1.5px] border-[#E2E8F0]";

  const nameColor = isHighlighted ? "text-teal" : "text-[#64748B]";
  const priceColor = isHighlighted ? "text-white" : "text-navy";
  const periodColor = isHighlighted ? "text-white/50" : "text-[#94A3B8]";
  const billingColor = isHighlighted ? "text-white/40" : "text-[#94A3B8]";
  const featureColor = isHighlighted ? "text-white/85" : "text-[#475569]";
  const checkBg = "bg-teal";
  const checkColor = isHighlighted ? "text-navy" : "text-white";

  const ctaClasses =
    plan.variant === "dark"
      ? "rounded-[10px] py-[13px] px-5 bg-teal text-navy"
      : plan.variant === "outline"
        ? "rounded-[10px] py-[13px] px-5 bg-white border-[1.5px] border-navy text-navy"
        : "rounded-[10px] py-[13px] px-5 bg-navy text-white";

  const billingNote = isAnnual
    ? plan.billingNoteAnnual
    : plan.billingNoteMonthly;

  return (
    <div className={cardClasses}>
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-[100px] py-1 px-4 bg-teal">
          <span className="tracking-[1px] whitespace-nowrap text-navy text-[11px]/3.5">
            {plan.badge}
          </span>
        </div>
      )}

      <span
        className={`tracking-[1.5px] uppercase mb-3 ${nameColor} text-[13px]/4`}
      >
        {plan.name}
      </span>

      <div className="flex items-end mb-2 gap-1">
        <span
          className={`text-[42px] tracking-[-2px] leading-none ${priceColor} font-bold`}
        >
          {hasPrice
            ? formatPrice(plan.monthlyPrice!, isAnnual)
            : "Custom"}
        </span>
        {hasPrice && (
          <span className={`pb-1.5 ${periodColor} text-[15px]/[18px]`}>
            /month
          </span>
        )}
      </div>

      <span className={`mb-8 ${billingColor} text-[13px]/4`}>
        {billingNote}
      </span>

      <button
        className={`mb-8 text-center text-sm/[18px] cursor-pointer border-none ${ctaClasses} hover:opacity-90 transition-opacity`}
        onClick={() =>
          console.log(`ACTION: ${plan.ctaAction}`, {
            billing: isAnnual ? "annual" : "monthly",
          })
        }
      >
        {plan.ctaLabel}
      </button>

      <div className="flex flex-col gap-3.5">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div
              className={`w-[18px] h-[18px] flex items-center justify-center shrink-0 rounded-full ${checkBg}`}
            >
              <span className={`${checkColor} text-[10px]/3`}>✓</span>
            </div>
            <span className={`${featureColor} text-sm/[18px]`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PricingCardsProps {
  isAnnual: boolean;
}

export function PricingCards({ isAnnual }: PricingCardsProps) {
  return (
    <section className="flex justify-center pt-18 pb-20 gap-5 bg-white px-10 lg:px-[60px]">
      {pricingPlans.map((plan) => (
        <PlanCard key={plan.name} plan={plan} isAnnual={isAnnual} />
      ))}
    </section>
  );
}
