import { SettingsShell } from "@/components/layout/SettingsShell";
import { CurrentPlanBanner } from "@/components/dashboard/CurrentPlanBanner";
import { ChoosePlanCard } from "@/components/dashboard/ChoosePlanCard";
import { PaymentMethodRow } from "@/components/dashboard/PaymentMethodRow";
import { CancelSubscriptionRow } from "@/components/dashboard/CancelSubscriptionRow";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

function LoadingSkeleton() {
  return (
    <>
      {/* Plan banner skeleton */}
      <div className="rounded-[14px] py-7 px-8 bg-[#0F2440] animate-pulse">
        <div className="h-4 w-24 bg-white/10 rounded mb-3" />
        <div className="h-7 w-32 bg-white/10 rounded mb-2" />
        <div className="h-4 w-64 bg-white/10 rounded" />
      </div>
      {/* Plans card skeleton */}
      <div className="rounded-[14px] overflow-clip bg-white border border-border-light animate-pulse">
        <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
          <div className="h-[18px] w-36 bg-[#E6EBF1] rounded" />
          <div className="mt-2 h-4 w-56 bg-[#F0F4F8] rounded" />
        </div>
        <div className="flex gap-4 p-7">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex-1 flex flex-col gap-3 rounded-xl border border-[#F0F4F8] p-5">
              <div className="h-4 w-16 bg-[#F0F4F8] rounded" />
              <div className="h-7 w-12 bg-[#E6EBF1] rounded" />
              <div className="h-3 w-full bg-[#F0F4F8] rounded" />
              <div className="h-9 w-full bg-[#F0F4F8] rounded-[9px] mt-auto" />
            </div>
          ))}
        </div>
      </div>
      {/* Payment skeleton */}
      <div className="flex items-center rounded-[14px] py-5.5 px-7 gap-5 bg-white border border-border-light animate-pulse">
        <div className="w-11 h-7.5 bg-[#E6EBF1] rounded-md" />
        <div className="grow">
          <div className="h-4 w-36 bg-[#E6EBF1] rounded" />
          <div className="mt-1.5 h-3.5 w-56 bg-[#F0F4F8] rounded" />
        </div>
        <div className="h-9 w-32 bg-[#E6EBF1] rounded-[10px]" />
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        No active subscription
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm mx-auto">
        Choose a plan to start monitoring your AI visibility and unlock powerful AEO insights.
      </p>
      <button
        className="mt-6 inline-flex items-center rounded-[10px] py-2.5 px-5.5 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: choose_plan")}
      >
        <span className="text-white font-sans text-[13px]/4">
          View Plans
        </span>
      </button>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-[#FEE2E2] p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        Unable to load billing
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm mx-auto">
        Something went wrong while loading your billing information. Please try again.
      </p>
      <button
        className="mt-6 inline-flex items-center rounded-[10px] py-2.5 px-5.5 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: retry_load_billing")}
      >
        <span className="text-white font-sans text-[13px]/4">Retry</span>
      </button>
    </div>
  );
}

export default function Billing() {
  return (
    <SettingsShell activeTab="billing">
      {DEMO_STATE === "loading" && <LoadingSkeleton />}
      {DEMO_STATE === "success" && (
        <>
          <CurrentPlanBanner />
          <ChoosePlanCard />
          <PaymentMethodRow />
          <CancelSubscriptionRow />
        </>
      )}
      {DEMO_STATE === "empty" && <EmptyState />}
      {DEMO_STATE === "error" && <ErrorState />}
    </SettingsShell>
  );
}
