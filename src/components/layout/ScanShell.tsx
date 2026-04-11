import { useNavigate } from "react-router-dom";
import { scanMeta } from "@/data/mock-scan-overview";

interface ScanShellProps {
  children: React.ReactNode;
}

export function ScanShell({ children }: ScanShellProps) {
  const navigate = useNavigate();

  return (
    <div className="font-sans antialiased flex flex-col min-h-screen bg-surface">
      {/* Header */}
      <header className="flex items-center shrink-0 h-14 px-8 gap-3 bg-white border-b border-border-light">
        <button
          className="flex items-center rounded-lg py-1.5 px-3 gap-1.5 text-slate-body bg-white border border-border-light cursor-pointer hover:bg-surface hover:border-border-input transition-all duration-150"
          onClick={() => navigate("/dashboard/scans")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium text-[13px]/4">Back</span>
        </button>

        <button
          className="flex items-center rounded-lg py-1.5 px-3 gap-1.5 text-slate-body bg-white border border-border-light cursor-pointer hover:bg-surface hover:border-border-input transition-all duration-150"
          onClick={() => console.log("ACTION: export_scan_report")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M7 2v7M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium text-[13px]/4">Export</span>
        </button>

        <div className="grow flex flex-col items-center">
          <span className="tracking-[-0.01em] text-navy font-semibold text-sm/5">
            Scan Summary
          </span>
          <span className="text-slate-muted text-[11px]/3.5">
            {scanMeta.domain} · Scanned {scanMeta.scanDate}
          </span>
        </div>

        <button
          className="flex items-center bg-transparent border-none cursor-pointer p-0 hover:opacity-80 transition-opacity duration-150"
          onClick={() => navigate("/dashboard/profile")}
        >
          <div className="flex items-center justify-center rounded-full bg-teal shrink-0 size-8">
            <span className="text-white font-semibold text-xs/4">
              {scanMeta.userInitials}
            </span>
          </div>
        </button>
      </header>

      {children}
    </div>
  );
}
