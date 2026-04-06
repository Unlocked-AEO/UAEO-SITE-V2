import { engineScoreDetails } from "@/data/mock-scan-overview";
import geminiLogo from "@/assets/gemini-logo.svg";
import claudeLogo from "@/assets/claude-logo.svg";
import openaiLogo from "@/assets/openai-logo.svg";
import perplexityLogo from "@/assets/perplexity-logo.svg";
import grokLogo from "@/assets/grok-logo.svg";

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
        <img src={openaiLogo} alt="ChatGPT" width="16" height="16" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    case "perplexity":
      return (
        <img src={perplexityLogo} alt="Perplexity" width="14" height="14" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    case "gemini":
      return (
        <img src={geminiLogo} alt="Gemini" width="16" height="16" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    case "grok":
      return (
        <img src={grokLogo} alt="Grok" width="14" height="14" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    case "claude":
      return (
        <img src={claudeLogo} alt="Claude" width="14" height="14" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    default:
      return null;
  }
}
