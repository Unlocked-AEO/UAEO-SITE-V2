import { useNavigate } from "react-router-dom";
import { mockScans, scansPageHeader } from "@/data/mock-scans";
import { ScanRow } from "@/components/dashboard/ScanRow";

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M13 1v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 8.5A5 5 0 1 1 10.5 4L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ScansCard() {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col rounded-xl overflow-clip bg-white border border-border-light shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 py-5 px-6 border-b border-border-light">
        <h2 className="text-navy font-semibold text-[15px]/5 m-0">
          {scansPageHeader.title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center rounded-lg py-2 px-4 gap-2 bg-teal text-white border-none cursor-pointer hover:bg-[#3DBDB5] transition-colors duration-150"
            onClick={() => navigate("/dashboard/scans/new")}
          >
            <span className="font-semibold text-[13px]/4">Run Scan</span>
          </button>
          <button
            className="flex items-center rounded-lg py-2 px-3.5 gap-1.5 text-slate-body bg-white border border-border-light cursor-pointer hover:bg-surface hover:border-border-input transition-all duration-150"
            onClick={() => console.log("ACTION: sort_scans")}
          >
            <FilterIcon />
            <span className="font-medium text-[13px]/4">Sort</span>
          </button>
          <button
            className="flex items-center justify-center rounded-lg py-2 px-2.5 text-slate-body bg-white border border-border-light cursor-pointer hover:bg-surface hover:border-border-input transition-all duration-150"
            onClick={() => console.log("ACTION: refresh_scans")}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>

      {/* Scan list */}
      <div className="grow flex flex-col py-4 px-6 overflow-auto gap-2.5">
        {mockScans.map((scan) => (
          <ScanRow key={scan.id} scan={scan} />
        ))}
      </div>
    </div>
  );
}
