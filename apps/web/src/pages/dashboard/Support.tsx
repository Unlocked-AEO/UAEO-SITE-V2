import { SettingsShell } from "@/components/layout/SettingsShell";
import { ContactSupportCard } from "@/components/dashboard/ContactSupportCard";
import { SupportFAQCard } from "@/components/dashboard/SupportFAQCard";
import { SupportSidebar } from "@/components/dashboard/SupportSidebar";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

function LoadingSkeleton() {
  return (
    <div className="flex items-start gap-6">
      {/* Main column */}
      <div className="grow-[1.4] shrink basis-0 flex flex-col gap-4">
        {/* Contact form skeleton */}
        <div className="rounded-[14px] overflow-clip bg-white border border-border-light animate-pulse">
          <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
            <div className="h-[18px] w-32 bg-[#E6EBF1] rounded" />
            <div className="mt-2 h-4 w-64 bg-[#F0F4F8] rounded" />
          </div>
          <div className="flex flex-col py-6 px-7 gap-4">
            <div className="flex flex-col gap-1.75">
              <div className="h-4 w-16 bg-[#F0F4F8] rounded" />
              <div className="h-10 bg-[#F0F4F8] rounded-[10px]" />
            </div>
            <div className="flex flex-col gap-1.75">
              <div className="h-4 w-16 bg-[#F0F4F8] rounded" />
              <div className="h-[90px] bg-[#F0F4F8] rounded-[10px]" />
            </div>
          </div>
          <div className="flex justify-end py-4 px-7 bg-[#FAFBFC] border-t border-[#F0F4F8]">
            <div className="h-9 w-32 bg-[#E6EBF1] rounded-[10px]" />
          </div>
        </div>

        {/* FAQ skeleton */}
        <div className="rounded-[14px] overflow-clip bg-white border border-border-light animate-pulse">
          <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
            <div className="h-[18px] w-48 bg-[#E6EBF1] rounded" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 px-7 border-b border-[#F8FAFC] last:border-b-0"
            >
              <div className="h-4 w-64 bg-[#F0F4F8] rounded" />
              <div className="h-3.5 w-3.5 bg-[#F0F4F8] rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar skeleton */}
      <div className="w-80 shrink-0 flex flex-col gap-3">
        <div className="h-3.5 w-20 bg-[#F0F4F8] rounded px-1" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center rounded-xl py-4.5 px-5 gap-3.5 bg-white border border-border-light animate-pulse"
          >
            <div className="shrink-0 rounded-[10px] bg-[#F0F4F8] size-10" />
            <div className="grow">
              <div className="h-4 w-28 bg-[#E6EBF1] rounded" />
              <div className="mt-1.5 h-3.5 w-36 bg-[#F0F4F8] rounded" />
            </div>
          </div>
        ))}
        <div className="h-16 bg-[#E6EBF1] rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        Support not available yet
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm mx-auto">
        Complete your account setup to access support resources.
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
        Unable to load support
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm mx-auto">
        Something went wrong while loading support resources. Please try again.
      </p>
      <button
        className="mt-6 inline-flex items-center rounded-[10px] py-2.5 px-5.5 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: retry_load_support")}
      >
        <span className="text-white font-sans text-[13px]/4">Retry</span>
      </button>
    </div>
  );
}

export default function Support() {
  return (
    <SettingsShell activeTab="support">
      {DEMO_STATE === "loading" && <LoadingSkeleton />}
      {DEMO_STATE === "success" && (
        <div className="flex items-start gap-6 flex-col lg:flex-row">
          {/* Main column */}
          <div className="grow-[1.4] shrink basis-0 flex flex-col gap-4 min-w-0">
            <ContactSupportCard />
            <SupportFAQCard />
          </div>

          {/* Sidebar */}
          <SupportSidebar />
        </div>
      )}
      {DEMO_STATE === "empty" && <EmptyState />}
      {DEMO_STATE === "error" && <ErrorState />}
    </SettingsShell>
  );
}
