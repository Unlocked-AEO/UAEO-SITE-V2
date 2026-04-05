interface ScanTabsProps {
  activeTab: string;
}

const tabs = [
  { slug: "summary", label: "Summary", score: null, scoreColor: null, scoreBg: null },
  { slug: "ai-visibility", label: "AI Visibility", score: 68, scoreColor: "#FF9F43", scoreBg: "#FFF4E6" },
  { slug: "brand-accuracy", label: "Brand Accuracy", score: 81, scoreColor: "#0D9B93", scoreBg: "#E6F9F8" },
  { slug: "sentiment", label: "Sentiment", score: 74, scoreColor: "#0D9B93", scoreBg: "#E6F9F8" },
  { slug: "schema-coverage", label: "Schema Coverage", score: 45, scoreColor: "#FF4D4D", scoreBg: "#FFF0F0" },
  { slug: "content-freshness", label: "Content Freshness", score: 77, scoreColor: "#0D9B93", scoreBg: "#E6F9F8" },
  { slug: "eeat", label: "EEAT", score: 61, scoreColor: "#FF9F43", scoreBg: "#FFF4E6" },
];

export function ScanTabs({ activeTab }: ScanTabsProps) {
  return (
    <div className="flex items-center rounded-[10px] overflow-clip bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px]">
      {tabs.map((tab) => {
        const isActive = tab.slug === activeTab;
        const showBadge = !isActive && tab.score !== null;

        return (
          <button
            key={tab.slug}
            className={`grow shrink basis-[0%] flex items-center justify-center py-3.5 px-2.5 gap-1.5 flex-nowrap border-b-2 border-b-solid bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer ${
              isActive ? "border-b-[#4ECDC4]" : "border-b-[#00000000]"
            }`}
            onClick={() =>
              console.log("ACTION: switch_scan_tab", { tab: tab.slug })
            }
          >
            <div
              className={`[white-space-collapse:collapse] inline-block w-max font-['Inter',system-ui,sans-serif] shrink-0 text-[13px]/4 ${
                isActive
                  ? "text-[#0A2540] font-semibold"
                  : "text-[#8792A2] font-medium"
              }`}
            >
              {tab.label}
            </div>
            {showBadge && (
              <div
                className="inline-block rounded-[99px] py-0.5 px-1.75 shrink-0 [white-space-collapse:collapse]"
                style={{ backgroundColor: tab.scoreBg! }}
              >
                <div
                  className="inline-block font-['Inter',system-ui,sans-serif] font-bold text-[10px]/3"
                  style={{ color: tab.scoreColor! }}
                >
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
