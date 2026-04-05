import { useNavigate } from "react-router-dom";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { KPICards } from "@/components/dashboard/KPICards";
import { ScoreAverages } from "@/components/dashboard/ScoreAverages";
import { EngineScores } from "@/components/dashboard/EngineScores";
import { IndustryLeaderboard } from "@/components/dashboard/IndustryLeaderboard";
import { ScoreTrends } from "@/components/dashboard/ScoreTrends";
import { TopRecommendations } from "@/components/dashboard/TopRecommendations";
import { RiskInsightsCards } from "@/components/dashboard/RiskInsights";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function Overview() {
  const navigate = useNavigate();
  if (DEMO_STATE === "loading") {
    return (
      <DashboardShell activeTab="overview">
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-[#F0F4F8] border-t-teal rounded-full animate-spin" />
            <span className="text-slate-muted text-sm">Loading...</span>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (DEMO_STATE === "empty") {
    return (
      <DashboardShell activeTab="overview">
        <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
          <span className="text-navy font-bold text-xl">
            No scan data yet
          </span>
          <p className="text-slate-muted text-sm max-w-[400px] text-center">
            Run your first AEO scan to see your dashboard overview with scores,
            trends, and recommendations.
          </p>
          <button
            className="rounded-[10px] py-3 px-6 bg-teal text-navy font-semibold text-sm border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate("/dashboard/scans/new")}
          >
            Run your first scan
          </button>
        </div>
      </DashboardShell>
    );
  }

  if (DEMO_STATE === "error") {
    return (
      <DashboardShell activeTab="overview">
        <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
          <span className="text-navy font-bold text-xl">
            Something went wrong
          </span>
          <p className="text-slate-muted text-sm max-w-[400px] text-center">
            We couldn't load your dashboard data. Please try again.
          </p>
          <button
            className="rounded-[10px] py-3 px-6 bg-navy text-white font-semibold text-sm border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => console.log("ACTION: retry_load_dashboard")}
          >
            Retry
          </button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell activeTab="overview">
      {/* Row 1: KPI cards */}
      <KPICards />

      {/* Row 2: Score averages + Engine scores + Leaderboard */}
      <div className="flex gap-4">
        <ScoreAverages />
        <EngineScores />
        <IndustryLeaderboard />
      </div>

      {/* Row 3: Score trends + Recommendations */}
      <div className="flex gap-4">
        <ScoreTrends />
        <TopRecommendations />
      </div>

      {/* Row 4: Risk insights */}
      <RiskInsightsCards />
    </DashboardShell>
  );
}
