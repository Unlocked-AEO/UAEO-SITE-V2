import { currentPlan } from "@/data/mock-billing";

export function CurrentPlanBanner() {
  return (
    <div
      className="flex flex-col md:flex-row items-start md:items-center rounded-[14px] py-7 px-8 gap-6"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #0A1628 0%, #0F2440 100%)",
      }}
    >
      <div className="grow">
        <div className="flex items-center mb-1.5 gap-2.5">
          <span className="inline-block rounded-md py-0.5 px-2.5 bg-[#4ECDC426]">
            <span className="tracking-[0.06em] text-teal font-sans text-[11px]/[14px]">
              CURRENT PLAN
            </span>
          </span>
        </div>
        <div className="tracking-[-0.3px] text-white font-sans text-2xl/[30px]">
          {currentPlan.name}
        </div>
        <div className="mt-1 text-white/60 font-sans text-[13px]/4">
          ${currentPlan.price} / {currentPlan.interval} · Renews{" "}
          {currentPlan.renewsDate} · {currentPlan.seatsUsed} seats used
        </div>
      </div>
      <div className="flex gap-2.5">
        <button
          className="rounded-[10px] py-2.5 px-5 bg-white/15 border-[1.5px] border-white/60 cursor-pointer hover:bg-white/20 transition-colors"
          onClick={() => console.log("ACTION: manage_plan")}
        >
          <span className="text-teal font-sans text-[13px]/4 font-medium">
            Manage Plan
          </span>
        </button>
        <button
          className="rounded-[10px] py-2.5 px-5 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: upgrade_plan")}
        >
          <span className="text-navy font-sans text-[13px]/4 font-medium">
            Upgrade
          </span>
        </button>
      </div>
    </div>
  );
}
