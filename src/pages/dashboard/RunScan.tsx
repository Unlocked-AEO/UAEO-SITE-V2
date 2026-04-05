import { DashboardShell } from "@/components/layout/DashboardShell";
import { ScansCard } from "@/components/dashboard/ScansCard";
import { RunScanModal } from "@/components/dashboard/RunScanModal";

export default function RunScan() {
  return (
    <DashboardShell activeTab="scans">
      <ScansCard />
      <RunScanModal />
    </DashboardShell>
  );
}
