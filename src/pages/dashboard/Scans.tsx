import { useNavigate } from "react-router-dom";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ScansCard } from "@/components/dashboard/ScansCard";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

function LoadingSkeleton() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-clip bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      {/* Header skeleton */}
      <div className="flex items-center justify-between shrink-0 py-5 px-7 border-b border-[#F0F4F8]">
        <div className="h-[18px] w-24 bg-[#E6EBF1] rounded animate-pulse" />
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-24 bg-[#E6EBF1] rounded-lg animate-pulse" />
          <div className="h-8 w-16 bg-[#F0F4F8] rounded-lg animate-pulse" />
          <div className="h-8 w-8 bg-[#F0F4F8] rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Row skeletons */}
      <div className="grow flex flex-col py-4 px-7 gap-2.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center rounded-[10px] py-4 px-5 gap-5 bg-[#FAFBFC] border border-border-light animate-pulse"
          >
            <div className="shrink-0 rounded-lg bg-[#E6EBF1] size-10" />
            <div className="grow flex flex-col gap-1.5">
              <div className="h-[18px] w-36 bg-[#E6EBF1] rounded" />
              <div className="h-3.5 w-44 bg-[#F0F4F8] rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-20 bg-[#F0F4F8] rounded-[7px]" />
              <div className="h-7 w-8 bg-[#F0F4F8] rounded-[7px]" />
              <div className="h-9 w-[130px] bg-[#F0F4F8] rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-clip bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="flex items-center justify-between shrink-0 py-5 px-7 border-b border-[#F0F4F8]">
        <h2 className="text-navy font-sans font-bold text-[15px]/[18px] m-0">
          My Scans
        </h2>
      </div>
      <div className="grow flex flex-col items-center justify-center p-12 text-center">
        <div className="flex items-center justify-center rounded-xl bg-[#F0F4F8] size-14 mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13S23.2 3 16 3zm0 4c1.9 0 3.7.5 5.2 1.4L7.4 22.2A8.9 8.9 0 0 1 6 17c0-3.9 2.3-7.2 5.6-8.9zm0 18c-1.9 0-3.7-.5-5.2-1.4l13.8-13.8A8.9 8.9 0 0 1 26 16c0 4.9-4.1 9-9 9z"
              fill="#CBD5E1"
            />
          </svg>
        </div>
        <h3 className="text-navy font-sans text-lg/6 m-0">No scans yet</h3>
        <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm">
          Run your first scan to see how your website performs across AI engines.
        </p>
        <button
          className="mt-6 flex items-center rounded-lg py-2.5 px-5 gap-2 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/dashboard/scans/new")}
        >
          <span className="text-white font-sans font-semibold text-[13px]/4">
            Run Your First Scan
          </span>
        </button>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-clip bg-white border border-[#FEE2E2] shadow-[0px_1px_4px_#0A25400F]">
      <div className="flex items-center justify-between shrink-0 py-5 px-7 border-b border-[#F0F4F8]">
        <h2 className="text-navy font-sans font-bold text-[15px]/[18px] m-0">
          My Scans
        </h2>
      </div>
      <div className="grow flex flex-col items-center justify-center p-12 text-center">
        <h3 className="text-navy font-sans text-lg/6 m-0">
          Unable to load scans
        </h3>
        <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm">
          Something went wrong while loading your scan history. Please try
          again.
        </p>
        <button
          className="mt-6 flex items-center rounded-lg py-2.5 px-5 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: retry_load_scans")}
        >
          <span className="text-white font-sans font-semibold text-[13px]/4">
            Retry
          </span>
        </button>
      </div>
    </div>
  );
}

export default function Scans() {
  const navigate = useNavigate();
  return (
    <DashboardShell activeTab="scans">
      {DEMO_STATE === "loading" && <LoadingSkeleton />}
      {DEMO_STATE === "success" && <ScansCard />}
      {DEMO_STATE === "empty" && <EmptyState />}
      {DEMO_STATE === "error" && <ErrorState />}
    </DashboardShell>
  );
}
