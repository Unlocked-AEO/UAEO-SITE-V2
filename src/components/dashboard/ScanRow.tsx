import { useNavigate } from "react-router-dom";
import type { Scan } from "@/data/mock-scans";

function ScanLogo() {
  return (
    <div className="flex items-center justify-center shrink-0 rounded-lg bg-teal size-10">
      <svg
        width="22"
        height="22"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13S23.2 3 16 3zm0 4c1.9 0 3.7.5 5.2 1.4L7.4 22.2A8.9 8.9 0 0 1 6 17c0-3.9 2.3-7.2 5.6-8.9zm0 18c-1.9 0-3.7-.5-5.2-1.4l13.8-13.8A8.9 8.9 0 0 1 26 16c0 4.9-4.1 9-9 9z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <circle cx="6" cy="6" r="5" stroke="#94A3B8" strokeWidth="1.2" />
      <path d="M6 3.5V6l1.5 1.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M2 10V12h10V10M7 2v7M4.5 6.5L7 9l2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M2 3h10M5 3V2h4v1M4 3v8a1 1 0 001 1h4a1 1 0 001-1V3M6 6v4M8 6v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ScanRow({ scan }: { scan: Scan }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center rounded-xl py-4 px-5 gap-5 bg-white border border-border-light hover:border-border-input transition-colors duration-150">
      <ScanLogo />

      <div className="flex flex-col grow shrink basis-0 min-w-0 gap-1">
        <span className="text-navy font-semibold text-sm/5">
          {scan.domain}
        </span>
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <span className="text-[#94A3B8] text-[11px]/3.5">
            {scan.date}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          className="flex items-center rounded-lg py-1.5 px-3 gap-1.5 text-slate-body bg-white border border-border-light cursor-pointer hover:bg-surface hover:border-border-input transition-all duration-150"
          onClick={() =>
            console.log("ACTION: export_scan", { id: scan.id })
          }
        >
          <ExportIcon />
          <span className="font-medium text-xs/4">Export</span>
        </button>

        <button
          className="flex items-center justify-center rounded-lg py-1.5 px-2.5 text-danger bg-[#FFF5F5] border border-[#FECACA] cursor-pointer hover:bg-[#FEE2E2] transition-all duration-150"
          onClick={() =>
            console.log("ACTION: delete_scan", { id: scan.id })
          }
        >
          <TrashIcon />
        </button>

        <button
          className="flex items-center rounded-lg py-2 px-4 gap-1.5 shrink-0 text-teal bg-white border-[1.5px] border-teal cursor-pointer hover:bg-[#F0FDFA] transition-all duration-150"
          onClick={() => navigate(`/dashboard/scans/${scan.id}`)}
        >
          <span className="font-semibold text-[13px]/4">View Scan</span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
