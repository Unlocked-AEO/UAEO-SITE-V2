import { visibilityStats, engineMiniScores } from "@/data/mock-scan-ai-visibility";
import geminiLogo from "@/assets/gemini-logo.svg";
import claudeLogo from "@/assets/claude-logo.svg";
import openaiLogo from "@/assets/openai-logo.svg";
import perplexityLogo from "@/assets/perplexity-logo.svg";

function EngineIcon({ slug }: { slug: string }) {
  switch (slug) {
    case "chatgpt":
      return (
        <img src={openaiLogo} alt="ChatGPT" width="12" height="12" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    case "perplexity":
      return (
        <img src={perplexityLogo} alt="Perplexity" width="10" height="10" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    case "gemini":
      return (
        <img src={geminiLogo} alt="Gemini" width="12" height="12" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    case "grok":
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFFFFF" style={{ flexShrink: '0' }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "claude":
      return (
        <img src={claudeLogo} alt="Claude" width="11" height="11" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    default:
      return null;
  }
}

export function ScanVisibilityStats() {
  return (
    <div className="flex items-center rounded-xl py-5 px-6 bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px]">
      {visibilityStats.map((stat, i) => (
        <div key={stat.label} className="grow shrink basis-[0%] flex flex-col items-center px-4 border-r border-r-solid border-r-[#F0F4F8]">
          <div className="text-[28px] leading-[round(up,100%,1px)] [white-space-collapse:preserve] [letter-spacing:-1px] text-[#0A2540] font-sans font-black">
            {stat.value}
          </div>
          <div className={`mt-1 uppercase tracking-[0.5px] ${i === 2 ? "[white-space-collapse:collapse] w-max text-[#8792A2] font-sans text-[10px]/3" : "text-[#8792A2] font-sans text-[11px]/3.5"}`}>
            {stat.label}
          </div>
        </div>
      ))}

      <div className="w-px h-10 bg-[#F0F4F8] shrink-0 my-0 mx-1" />

      {engineMiniScores.map((engine, i) => (
        <div
          key={engine.name}
          className={`grow shrink basis-[0%] flex flex-col items-center px-3 ${i < engineMiniScores.length - 1 ? "border-r border-r-solid border-r-[#F0F4F8]" : ""}`}
        >
          <div
            className="flex items-center justify-center mb-1 rounded-[5px] shrink-0 size-6"
            style={{
              backgroundColor: engine.iconBg,
              border: engine.hasBorder ? "1px solid #E8EAED" : "none",
            }}
          >
            <EngineIcon slug={engine.iconSlug} />
          </div>
          <div className="[white-space-collapse:preserve] font-sans font-black text-[15px]/4.5" style={{ color: engine.scoreColor }}>
            {engine.score}
          </div>
          <div className="text-[#8792A2] font-sans text-[10px]/3">
            {engine.name}
          </div>
        </div>
      ))}
    </div>
  );
}
