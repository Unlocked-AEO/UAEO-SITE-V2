import { SettingsShell } from "@/components/layout/SettingsShell";
import { DisplayRegionCard } from "@/components/dashboard/DisplayRegionCard";
import { NotificationPrefsCard } from "@/components/dashboard/NotificationPrefsCard";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

function LoadingSkeleton() {
  return (
    <>
      <div className="rounded-[14px] overflow-clip bg-white border border-border-light animate-pulse">
        <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
          <div className="h-[18px] w-36 bg-[#E6EBF1] rounded" />
          <div className="mt-2 h-4 w-64 bg-[#F0F4F8] rounded" />
        </div>
        <div className="flex gap-6 p-7">
          <div className="grow flex flex-col gap-1.75">
            <div className="h-4 w-20 bg-[#F0F4F8] rounded" />
            <div className="h-10 bg-[#F0F4F8] rounded-[10px]" />
          </div>
          <div className="grow flex flex-col gap-1.75">
            <div className="h-4 w-16 bg-[#F0F4F8] rounded" />
            <div className="flex gap-2">
              <div className="grow h-10 bg-[#F0F4F8] rounded-[10px]" />
              <div className="grow h-10 bg-[#F0F4F8] rounded-[10px]" />
              <div className="grow h-10 bg-[#F0F4F8] rounded-[10px]" />
            </div>
          </div>
        </div>
        <div className="flex justify-end py-4 px-7 bg-[#FAFBFC] border-t border-[#F0F4F8]">
          <div className="h-9 w-36 bg-[#E6EBF1] rounded-[10px]" />
        </div>
      </div>
      <div className="rounded-[14px] overflow-clip bg-white border border-border-light animate-pulse">
        <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
          <div className="h-[18px] w-44 bg-[#E6EBF1] rounded" />
          <div className="mt-2 h-4 w-56 bg-[#F0F4F8] rounded" />
        </div>
        <div className="py-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center py-4.5 px-7 gap-4 border-b border-[#F8FAFC] last:border-b-0">
              <div className="grow">
                <div className="h-4 w-28 bg-[#F0F4F8] rounded" />
                <div className="mt-1.5 h-3.5 w-64 bg-[#F8FAFC] rounded" />
              </div>
              <div className="w-10 h-5.5 bg-[#E6EBF1] rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        No preferences configured
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm mx-auto">
        Set up your display, timezone, and notification preferences to customize your experience.
      </p>
      <button
        className="mt-6 inline-flex items-center rounded-[10px] py-2.5 px-5.5 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: setup_preferences")}
      >
        <span className="text-white font-sans text-[13px]/4">
          Configure Preferences
        </span>
      </button>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-[#FEE2E2] p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        Unable to load preferences
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm mx-auto">
        Something went wrong while loading your preferences. Please try again.
      </p>
      <button
        className="mt-6 inline-flex items-center rounded-[10px] py-2.5 px-5.5 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: retry_load_preferences")}
      >
        <span className="text-white font-sans text-[13px]/4">Retry</span>
      </button>
    </div>
  );
}

export default function Preferences() {
  return (
    <SettingsShell activeTab="preferences">
      {DEMO_STATE === "loading" && <LoadingSkeleton />}
      {DEMO_STATE === "success" && (
        <>
          <DisplayRegionCard />
          <NotificationPrefsCard />
        </>
      )}
      {DEMO_STATE === "empty" && <EmptyState />}
      {DEMO_STATE === "error" && <ErrorState />}
    </SettingsShell>
  );
}
