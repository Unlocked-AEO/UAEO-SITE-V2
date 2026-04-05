import { DashboardShell } from "@/components/layout/DashboardShell";
import { TasksInProgressCard } from "@/components/dashboard/TasksInProgressCard";
import { ScoreImprovementChart } from "@/components/dashboard/ScoreImprovementChart";
import { ImprovementPlanCard } from "@/components/dashboard/ImprovementPlanCard";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

function LoadingSkeleton() {
  return (
    <>
      <div className="flex h-52.5 shrink-0 gap-4">
        <div className="w-95 shrink-0 rounded-xl bg-white border border-border-light animate-pulse p-6">
          <div className="h-3.5 w-28 bg-[#E6EBF1] rounded mb-4" />
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="rounded-full bg-[#F0F4F8] size-1.5" />
                <div className="grow h-4 bg-[#F0F4F8] rounded" />
                <div className="h-5 w-16 bg-[#F0F4F8] rounded-sm" />
              </div>
            ))}
          </div>
        </div>
        <div className="grow rounded-xl bg-white border border-border-light animate-pulse p-6">
          <div className="h-3.5 w-32 bg-[#E6EBF1] rounded mb-4" />
          <div className="h-[120px] bg-[#F0F4F8] rounded" />
        </div>
      </div>
      <div className="grow rounded-xl bg-white border border-border-light animate-pulse p-6">
        <div className="h-5 w-36 bg-[#E6EBF1] rounded mb-4" />
        <div className="flex flex-col gap-2.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-[#F0F4F8] rounded-[10px]" />
          ))}
        </div>
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="grow flex flex-col items-center justify-center rounded-xl bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F] p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        No improvement plan yet
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm">
        Run your first scan to generate actionable recommendations for improving
        your AEO performance.
      </p>
      <button
        className="mt-6 flex items-center rounded-lg py-2.5 px-5 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: run_scan")}
      >
        <span className="text-white font-sans font-semibold text-[13px]/4">
          Run a Scan
        </span>
      </button>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="grow flex flex-col items-center justify-center rounded-xl bg-white border border-[#FEE2E2] shadow-[0px_1px_4px_#0A25400F] p-12 text-center">
      <h2 className="text-navy font-sans text-lg/6 m-0">
        Unable to load improvement plan
      </h2>
      <p className="mt-2 text-[#94A3B8] font-sans text-[13px]/5 m-0 max-w-sm">
        Something went wrong. Please try again.
      </p>
      <button
        className="mt-6 flex items-center rounded-lg py-2.5 px-5 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: retry_load_improvement_plan")}
      >
        <span className="text-white font-sans font-semibold text-[13px]/4">
          Retry
        </span>
      </button>
    </div>
  );
}

export default function ImprovementPlan() {
  return (
    <DashboardShell activeTab="implementation-plan">
      {/* Wrapper to override shell gap — export uses gap-4 */}
      <div className="grow flex flex-col gap-4 -mt-1 min-h-0">
        {DEMO_STATE === "loading" && <LoadingSkeleton />}
        {DEMO_STATE === "success" && (
          <>
            {/* Top row: fixed height */}
            <div className="flex h-52.5 shrink-0 gap-4">
              <TasksInProgressCard />
              <ScoreImprovementChart />
            </div>

            {/* Plan card: fills remaining */}
            <ImprovementPlanCard />
          </>
        )}
        {DEMO_STATE === "empty" && <EmptyState />}
        {DEMO_STATE === "error" && <ErrorState />}
      </div>
    </DashboardShell>
  );
}
