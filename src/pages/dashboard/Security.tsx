import { SettingsShell } from "@/components/layout/SettingsShell";
import { ChangePasswordCard } from "@/components/dashboard/ChangePasswordCard";
import { SecurityFeatureRow } from "@/components/dashboard/SecurityFeatureRow";
import { securityFeatures } from "@/data/mock-security";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

function LoadingSkeleton() {
  return (
    <>
      {/* Password card skeleton */}
      <div className="rounded-[14px] overflow-clip bg-white border border-border-light animate-pulse">
        <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
          <div className="h-[18px] w-36 bg-[#E6EBF1] rounded" />
          <div className="mt-2 h-4 w-52 bg-[#F0F4F8] rounded" />
        </div>
        <div className="flex gap-6 py-6 px-7">
          {[1, 2, 3].map((i) => (
            <div key={i} className="grow flex flex-col gap-1.75">
              <div className="h-4 w-28 bg-[#F0F4F8] rounded" />
              <div className="h-10 bg-[#F0F4F8] rounded-[10px]" />
            </div>
          ))}
        </div>
        <div className="flex justify-end py-4 px-7 bg-[#FAFBFC] border-t border-[#F0F4F8]">
          <div className="h-9 w-36 bg-[#E6EBF1] rounded-[10px]" />
        </div>
      </div>

      {/* Feature row skeletons */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center rounded-[14px] py-5.5 px-7 gap-5 bg-white border border-border-light animate-pulse"
        >
          <div className="shrink-0 rounded-xl bg-[#F0F4F8] size-11" />
          <div className="grow">
            <div className="h-[18px] w-48 bg-[#E6EBF1] rounded" />
            <div className="mt-2 h-4 w-72 bg-[#F0F4F8] rounded" />
          </div>
          <div className="h-9 w-32 bg-[#F0F4F8] rounded-[10px]" />
        </div>
      ))}
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        Security settings not available
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm mx-auto">
        Complete your account setup to access security settings.
      </p>
      <button
        className="mt-6 inline-flex items-center rounded-[10px] py-2.5 px-5.5 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: setup_account")}
      >
        <span className="text-white font-sans text-[13px]/4">
          Complete Setup
        </span>
      </button>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-[#FEE2E2] p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        Unable to load security settings
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm mx-auto">
        Something went wrong while loading your security settings. Please try
        again.
      </p>
      <button
        className="mt-6 inline-flex items-center rounded-[10px] py-2.5 px-5.5 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: retry_load_security")}
      >
        <span className="text-white font-sans text-[13px]/4">Retry</span>
      </button>
    </div>
  );
}

export default function Security() {
  return (
    <SettingsShell activeTab="security">
      {DEMO_STATE === "loading" && <LoadingSkeleton />}
      {DEMO_STATE === "success" && (
        <>
          <ChangePasswordCard />
          {securityFeatures.map((feature) => (
            <SecurityFeatureRow key={feature.id} feature={feature} />
          ))}
        </>
      )}
      {DEMO_STATE === "empty" && <EmptyState />}
      {DEMO_STATE === "error" && <ErrorState />}
    </SettingsShell>
  );
}
