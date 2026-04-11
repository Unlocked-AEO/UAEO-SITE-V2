import { freshnessCategories } from "@/data/mock-scan-content-freshness";

export function FreshnessPageTable() {
  return (
    <div className="rounded-xl overflow-clip bg-white border border-solid border-[#E6EBF1]">
      {/* Header */}
      <div className="flex px-5 bg-[#F8FAFC] border-b border-b-solid border-b-[#E6EBF1]">
        <div className="w-55 pt-2.75 pb-2.75 shrink-0 text-black font-sans text-base/5">
          Status
        </div>
        <div className="w-px bg-[#E6EBF1] shrink-0 my-2 mx-0" />
        <div className="grow shrink basis-[0%] pt-2.75 pb-2.75 text-black font-sans px-5 text-base/5">
          Pages
        </div>
      </div>

      {/* Category rows */}
      {freshnessCategories.map((cat, catIdx) => (
        <div
          key={cat.status}
          className={`flex ${catIdx < freshnessCategories.length - 1 ? "border-b border-b-solid border-b-[#E6EBF1]" : ""}`}
        >
          {/* Left status panel */}
          <div
            className="w-55 shrink-0 flex flex-col gap-2 border-r border-r-solid border-r-[#E6EBF1] p-5"
            style={{ backgroundColor: cat.bg }}
          >
            <div className="flex items-center gap-2">
              <div
                className="shrink-0 rounded-[50%] size-2"
                style={{ backgroundColor: cat.dotColor }}
              />
              <div className="inline-block text-[#0A2540] font-sans font-bold shrink-0 text-[13px]/4">
                {cat.status}
              </div>
            </div>
            <div
              className="text-[24px] leading-[round(up,100%,1px)] inline-block font-sans font-extrabold"
              style={{ color: cat.countColor }}
            >
              {cat.count}
            </div>
            <div className="text-[11px] leading-[round(up,140%,1px)] inline-block text-[#94A3B8] font-sans">
              {cat.description}
            </div>
          </div>

          {/* Right page list */}
          <div className="grow shrink basis-[0%] flex flex-col py-3.5 px-5">
            {cat.pages.map((page, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-2.25 ${
                  i < cat.pages.length - 1 || cat.moreCount
                    ? "border-b border-b-solid border-b-[#F1F5F9]"
                    : ""
                }`}
              >
                <div className="inline-block text-[#0A2540] font-sans font-medium shrink-0 text-[13px]/4">
                  {page.title}
                </div>
                <div className="inline-block text-[#94A3B8] font-[ui-monospace,'SFMono-Regular','SF_Mono','Menlo','Consolas','Liberation_Mono',monospace] shrink-0 text-xs/4">
                  {page.url}
                </div>
              </div>
            ))}
            {cat.moreCount && (
              <div className="flex items-center justify-between py-2.25">
                <div className="inline-block text-[#94A3B8] font-sans shrink-0 text-xs/4">
                  + {cat.moreCount} more pages
                </div>
                <button
                  className="inline-block text-[#4ECDC4] font-sans font-semibold shrink-0 text-xs/4 bg-transparent border-none cursor-pointer p-0"
                  onClick={() =>
                    console.log("ACTION: view_all_pages", { status: cat.status })
                  }
                >
                  View all →
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
