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
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="6" cy="6" r="5" stroke="#8792A2" strokeWidth="1.2" />
      <path
        d="M6 3.5V6l1.5 1.5"
        stroke="#8792A2"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M2 10V12h10V10M7 2v7M4.5 6.5L7 9l2.5-2.5"
        stroke="#425466"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
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
        d="M2 3h10M5 3V2h4v1M4 3v8a1 1 0 001 1h4a1 1 0 001-1V3M6 6v4M8 6v4"
        stroke="#E74C3C"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M2.5 6.5h8M7 3l3.5 3.5L7 10"
        stroke="#4ECDC4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScanRow({ scan }: { scan: Scan }) {
  return (
    <div className="flex items-center rounded-[10px] py-4 px-5 gap-5 bg-[#FAFBFC] border border-border-light">
      {/* Logo */}
      <ScanLogo />

      {/* Domain + date */}
      <div className="flex flex-col grow shrink basis-0 min-w-0 gap-1">
        <span className="text-navy font-sans font-bold text-sm/[18px]">
          {scan.domain}
        </span>
        <div className="flex items-center gap-1.25">
          <ClockIcon />
          <span className="text-slate-muted font-sans text-[11px]/3.5">
            {scan.date}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="flex items-center rounded-[7px] py-1.5 px-3 gap-1.5 bg-white border border-border-light cursor-pointer hover:bg-[#F0F4F8] transition-colors"
          onClick={() =>
            console.log("ACTION: export_scan", { id: scan.id })
          }
        >
          <ExportIcon />
          <span className="text-slate-body font-sans font-medium text-xs/4">
            Export
          </span>
        </button>

        <button
          className="flex items-center justify-center rounded-[7px] py-1.5 px-2.5 bg-[#FFF5F5] border border-[#FFCDD2] cursor-pointer hover:bg-[#FFEBEE] transition-colors"
          onClick={() =>
            console.log("ACTION: delete_scan", { id: scan.id })
          }
        >
          <TrashIcon />
        </button>

        <button
          className="flex items-center rounded-lg py-2.25 px-4.5 gap-1.5 shrink-0 min-w-[130px] bg-white border-[1.5px] border-teal cursor-pointer hover:bg-[#F7FEFE] transition-colors"
          onClick={() =>
            console.log("ACTION: view_scan", { id: scan.id })
          }
        >
          <span className="text-teal font-sans font-semibold text-[13px]/4">
            View Scan
          </span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
