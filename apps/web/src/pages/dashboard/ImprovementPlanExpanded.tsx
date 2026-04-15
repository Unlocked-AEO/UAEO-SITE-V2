import { DashboardShell } from "@/components/layout/DashboardShell";
import { TasksInProgressCard } from "@/components/dashboard/TasksInProgressCard";
import { ScoreImprovementChart } from "@/components/dashboard/ScoreImprovementChart";
import { ImprovementPlanCard } from "@/components/dashboard/ImprovementPlanCard";

// This page shows the Improvement Plan with the second fix (f2) expanded
// to demonstrate the expanded fix detail view.

export default function ImprovementPlanExpanded() {
  return (
    <DashboardShell activeTab="implementation-plan">
      <div className="grow flex flex-col gap-4 -mt-1 min-h-0">
        {/* Top row */}
        <div className="flex h-52.5 shrink-0 gap-4">
          <TasksInProgressCard />
          <ScoreImprovementChart />
        </div>

        {/* Plan card with f2 expanded */}
        <ImprovementPlanCard expandedFixId="f2" />
      </div>
    </DashboardShell>
  );
}
