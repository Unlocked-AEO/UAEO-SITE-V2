import { planOptions, choosePlanSection } from "@/data/mock-billing";
import type { PlanOption } from "@/data/mock-billing";

function PlanTile({ plan }: { plan: PlanOption }) {
  const isActive = plan.variant === "active";
  const isEnterprise = plan.variant === "enterprise";

  const borderClass = isActive
    ? "border-2 border-teal bg-[#F7FEFE]"
    : isEnterprise
      ? "border-[1.5px] border-[#DDD6FE] bg-[#FAFAFF]"
      : "border-[1.5px] border-border-light bg-white";

  const ctaClass = isActive
    ? "bg-teal text-navy"
    : isEnterprise
      ? "border-[1.5px] border-[#DDD6FE] bg-transparent text-navy"
      : plan.id === "agency"
        ? "bg-teal text-navy"
        : "border-[1.5px] border-border-light bg-transparent text-navy";

  return (
    <div className={`flex-1 flex flex-col relative rounded-xl gap-3 p-5 ${borderClass}`}>
      <div className="flex items-center gap-1.5">
        <span
          className={`font-sans text-[13px]/4 ${
            isActive ? "text-[#0D9488]" : "text-navy"
          }`}
        >
          {plan.name}
        </span>
        {isEnterprise && (
          <span className="inline-block rounded-sm py-0.5 px-1.5 bg-[#F5F3FF]">
            <span className="text-[#7C3AED] font-sans text-[9px]/3">
              CUSTOM
            </span>
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`font-sans shrink-0 ${
            plan.price === null
              ? "text-lg/[22px] text-navy"
              : "text-[22px]/7 text-navy"
          }`}
        >
          {plan.priceLabel}
        </span>
        {plan.interval && (
          <span className="text-[#94A3B8] font-sans text-xs/4">
            {plan.interval}
          </span>
        )}
      </div>
      <div className="text-[11px] leading-[1.6] text-[#64748B] font-sans">
        {plan.features}
      </div>
      <button
        className={`mt-auto rounded-[9px] py-2 px-2 text-center font-sans text-[13px]/4 font-medium cursor-pointer transition-opacity hover:opacity-90 ${ctaClass}`}
        onClick={() =>
          console.log("ACTION: select_plan", { plan: plan.id })
        }
        disabled={isActive}
      >
        {plan.ctaLabel}
      </button>
      {isActive && (
        <div className="absolute -top-px right-4 py-0.5 px-2.5 bg-teal rounded-b-lg">
          <span className="text-navy font-sans text-[10px]/3 font-bold">
            CURRENT
          </span>
        </div>
      )}
    </div>
  );
}

export function ChoosePlanCard() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light">
      <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
        <div className="text-navy font-sans text-sm/[18px]">
          {choosePlanSection.title}
        </div>
        <div className="mt-0.5 text-[#94A3B8] font-sans text-xs/4">
          {choosePlanSection.subtitle}
        </div>
      </div>
      <div className="flex flex-col md:flex-row py-6 px-7 gap-4">
        {planOptions.map((plan) => (
          <PlanTile key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
