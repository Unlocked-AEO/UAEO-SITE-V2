import { categoryTabs } from "@/data/mock-scan-overview";

const scoreColorMap: Record<string, { bg: string; text: string }> = {
  green: { bg: "bg-[#E6F9F8]", text: "text-[#0D9B93]" },
  warning: { bg: "bg-[#FFF4E6]", text: "text-[#FF9F43]" },
  danger: { bg: "bg-[#FFF0F0]", text: "text-[#FF4D4D]" },
};

interface ScanCategoryTabsProps {
  activeTab: string;
  onTabChange: (slug: string) => void;
}

export function ScanCategoryTabs({
  activeTab,
  onTabChange,
}: ScanCategoryTabsProps) {
  return (
    <div className="flex items-center rounded-[10px] px-5 overflow-clip bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px]">
      {categoryTabs.map((tab) => {
        const isActive = tab.slug === activeTab;
        const colors = tab.scoreColor ? scoreColorMap[tab.scoreColor] : null;

        return (
          <button
            key={tab.slug}
            className={`flex items-center py-3.5 px-4.5 gap-1.5 grow shrink basis-[0%] justify-center flex-nowrap bg-transparent border-0 cursor-pointer border-b-2 border-b-solid ${
              isActive ? "border-b-[#4ECDC4]" : "border-b-[#00000000]"
            }`}
            onClick={() => {
              onTabChange(tab.slug);
              console.log("ACTION: switch_scan_tab", { tab: tab.slug });
            }}
          >
            <div
              className={`inline-block [white-space-collapse:collapse] shrink-0 w-max font-['Inter',system-ui,sans-serif] text-[13px]/4 ${
                isActive
                  ? "text-[#0A2540] font-semibold"
                  : "text-[#8792A2] font-medium"
              }`}
            >
              {tab.label}
            </div>
            {tab.score !== null && colors && (
              <div className={`inline-block rounded-[99px] py-0.5 px-1.75 shrink-0 [white-space-collapse:collapse] ${colors.bg}`}>
                <div className={`inline-block ${colors.text} font-['Inter',system-ui,sans-serif] font-bold text-[10px]/3`}>
                  {tab.score}
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
