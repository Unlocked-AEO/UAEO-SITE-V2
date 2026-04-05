import { engineScoreDetails } from "@/data/mock-scan-overview";

// Engine bar colors from the design
function barColor(score: number): string {
  if (score >= 70) return "bg-[#4ECDC4]";
  if (score >= 50) return "bg-[#FF9F43]";
  return "bg-[#FF4D4D]";
}

function scoreTextColor(score: number): string {
  if (score >= 50) return "text-[#0A2540]";
  return "text-[#FF4D4D]";
}

export function ScanEngineScores() {
  return (
    <div className="rounded-xl pt-5 bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px] px-5 h-full flex flex-col">
      <div className="mb-4 tracking-[-0.01em] text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold text-[13px]/4">
        Score by AI Engine
      </div>
      <div className="flex flex-col grow justify-around">
        {engineScoreDetails.map((engine) => (
          <button
            key={engine.name}
            className="flex items-center py-3 gap-3 border-b border-b-solid border-b-[#F0F4F8] bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer text-left px-0 hover:bg-[#F8FAFC] transition-colors"
            onClick={() =>
              console.log("ACTION: view_engine_detail", { engine: engine.name })
            }
          >
            <div
              className="flex items-center justify-center shrink-0 rounded-md size-7"
              style={{
                backgroundColor: engine.iconBg,
                border: engine.hasBorder ? "1px solid #E8EAED" : "none",
              }}
            >
              <EngineIcon slug={engine.iconSlug} />
            </div>
            <div className="grow shrink basis-[0%] min-w-0">
              <div className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-xs/4">
                {engine.name}
              </div>
              <div className="text-[#8792A2] font-['Inter',system-ui,sans-serif] text-[10px]/3">
                {engine.model}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className={`tracking-[-0.02em] inline-block font-['Inter',system-ui,sans-serif] font-extrabold text-[15px]/4.5 ${scoreTextColor(engine.score)}`}>
                {engine.score}
              </div>
              <div className="w-15 h-1 rounded-[99px] overflow-clip bg-[#F0F4F8] shrink-0">
                <div
                  className={`h-full rounded-[99px] ${barColor(engine.score)}`}
                  style={{ width: `${engine.score}%` }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function EngineIcon({ slug }: { slug: string }) {
  switch (slug) {
    case "chatgpt":
      return (
        <svg width="16" height="16" viewBox="0 0 41 41" fill="none" style={{ flexShrink: '0' }}>
          <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.239-3.507 10.079 10.079 0 0 0-10.63 4.908 9.962 9.962 0 0 0-6.675 3.305 10.079 10.079 0 0 0-2.489 11.032 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.239 3.507 10.079 10.079 0 0 0 10.63-4.908 9.966 9.966 0 0 0 6.675-3.305 10.079 10.079 0 0 0 2.489-11.032zm-15.081 21.217a7.474 7.474 0 0 1-4.801-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.487 7.698zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103L16.05 33.96a7.504 7.504 0 0 1-9.658-2.954zm-2.301-17.558a7.47 7.47 0 0 1 3.907-3.292c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.91a7.504 7.504 0 0 1-2.953-10.462zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l7.857 4.532a7.504 7.504 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.456-1.014zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l7.833-4.527a7.504 7.504 0 0 1 11.351 7.645zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.504 7.504 0 0 1 12.293-5.756c-.061.032-.168.09-.236.133l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.226zm1.829-3.943 4.33-2.501 4.332 2.5v4.998l-4.331 2.5-4.331-2.5V17.828z" fill="#FFFFFF" />
        </svg>
      );
    case "perplexity":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: '0' }}>
          <path d="M7 0L9.5 5H14L10.5 8.5L12 14L7 11L2 14L3.5 8.5L0 5H4.5L7 0Z" fill="#FFFFFF" />
        </svg>
      );
    case "gemini":
      return (
        <svg width="16" height="16" viewBox="0 0 192 192" fill="none" style={{ flexShrink: '0' }}>
          <defs>
            <linearGradient id="gemini-grad-scan" x1="0" y1="0" x2="192" y2="192" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4285F4" />
              <stop offset="0.5" stopColor="#9B72CB" />
              <stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
          <path d="M96 20c-4.4 13.4-14.2 24.8-28 31.2C54.2 57.6 40 58.4 27 54c4.4 13.4 3.4 28.4-3.2 41.2C17.2 108 7.8 117.4 0 122c13.4 4.4 24.8 14.2 31.2 28C37.6 163.8 38.4 178 34 191c13.4-4.4 28.4-3.4 41.2 3.2 12.8 6.6 22.2 16 26.8 23.8 4.6-7.8 14-17.2 26.8-23.8C141.6 187.6 156.6 186.6 170 191c-4.4-13.4-3.4-28.4 3.2-41.2C179.8 136.8 192 127.4 192 122c-13.4-4.4-24.8-14.2-31.2-28C154.4 80.2 155.4 65.2 158 52c-13.4 4.4-28.4 3.4-41.2-3.2C103.8 42.2 100.6 27.8 96 20z" fill="url(#gemini-grad-scan)" />
        </svg>
      );
    case "grok":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF" style={{ flexShrink: '0' }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "claude":
      return (
        <svg width="14" height="14" viewBox="0 0 32 32" fill="#FFFFFF" style={{ flexShrink: '0' }}>
          <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4c2.21 0 4.26.65 5.98 1.76L7.76 21.98A9.96 9.96 0 0 1 6 16c0-5.514 4.486-10 10-10zm0 20c-2.21 0-4.26-.65-5.98-1.76l14.22-14.22A9.96 9.96 0 0 1 26 16c0 5.514-4.486 10-10 10z" />
        </svg>
      );
    default:
      return null;
  }
}
