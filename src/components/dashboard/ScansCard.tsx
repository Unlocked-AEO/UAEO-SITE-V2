import { useNavigate } from "react-router-dom";
import { mockScans, scansPageHeader } from "@/data/mock-scans";
import { ScanRow } from "@/components/dashboard/ScanRow";

function FilterIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M1 3h12M3 7h8M5 11h4"
        stroke="#425466"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M13 1v4h-4"
        stroke="#425466"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 8.5A5 5 0 1 1 10.5 4L13 1"
        stroke="#425466"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScansCard() {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col rounded-xl overflow-clip bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 py-5 px-7 border-b border-[#F0F4F8]">
        <h2 className="text-navy font-sans font-bold text-[15px]/[18px] m-0">
          {scansPageHeader.title}
        </h2>
        <div className="flex items-center gap-2.5">
          <button
            className="flex items-center rounded-lg py-2 px-4 gap-2 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate("/dashboard/scans/new")}
          >
            <span className="text-white font-sans font-semibold text-[13px]/4">
              Run Scan
            </span>
          </button>
          <button
            className="flex items-center rounded-lg py-2 px-3.5 gap-1.5 bg-white border border-border-light cursor-pointer hover:bg-[#F0F4F8] transition-colors"
            onClick={() => console.log("ACTION: sort_scans")}
          >
            <FilterIcon />
            <span className="text-slate-body font-sans font-medium text-[13px]/4">
              Sort
            </span>
          </button>
          <button
            className="flex items-center justify-center rounded-lg py-2 px-2.5 bg-white border border-border-light cursor-pointer hover:bg-[#F0F4F8] transition-colors"
            onClick={() => console.log("ACTION: refresh_scans")}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>

      {/* Scan list */}
      <div className="grow flex flex-col py-4 px-7 overflow-auto gap-2.5">
        {mockScans.map((scan) => (
          <ScanRow key={scan.id} scan={scan} />
        ))}
      </div>
    </div>
  );
}
