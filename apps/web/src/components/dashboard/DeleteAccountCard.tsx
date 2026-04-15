import { deleteAccountSection } from "@/data/mock-profile";

function TrashIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#EF4444"
      strokeWidth="2"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

export function DeleteAccountCard() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-[#FEE2E2]">
      <div className="flex items-center justify-between py-5.5 px-7 flex-col sm:flex-row gap-4 sm:gap-0">
        <div>
          <h2 className="text-navy font-sans text-sm/[18px] m-0">
            {deleteAccountSection.title}
          </h2>
          <p className="mt-0.75 text-[#94A3B8] font-sans text-xs/4 m-0">
            {deleteAccountSection.subtitle}
          </p>
        </div>
        <button
          className="flex items-center shrink-0 rounded-[10px] py-2.5 px-4.5 gap-2 bg-white border-[1.5px] border-[#FCA5A5] cursor-pointer hover:bg-red-50 transition-colors"
          onClick={() => console.log("ACTION: delete_account")}
        >
          <TrashIcon />
          <span className="text-[#EF4444] font-sans text-[13px]/4">
            Delete Account
          </span>
        </button>
      </div>
    </div>
  );
}
