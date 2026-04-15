import { cancelSection } from "@/data/mock-billing";

export function CancelSubscriptionRow() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-[14px] py-5 px-7 gap-4 bg-white border border-[#FEE2E2]">
      <div>
        <div className="text-navy font-sans text-[13px]/4">
          {cancelSection.title}
        </div>
        <div className="mt-0.5 text-[#94A3B8] font-sans text-xs/4">
          {cancelSection.subtitle}
        </div>
      </div>
      <button
        className="rounded-[10px] py-2 px-4.5 border-[1.5px] border-[#FCA5A5] bg-white cursor-pointer hover:bg-[#FFF5F5] transition-colors shrink-0"
        onClick={() => console.log("ACTION: cancel_subscription")}
      >
        <span className="text-[#DC2626] font-sans text-[13px]/4 font-medium">
          Cancel Plan
        </span>
      </button>
    </div>
  );
}
