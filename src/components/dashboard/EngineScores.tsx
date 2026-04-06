import { engineScores } from "@/data/mock-dashboard";
import geminiLogo from "@/assets/gemini-logo.svg";
import claudeLogo from "@/assets/claude-logo.svg";
import openaiLogo from "@/assets/openai-logo.svg";
import perplexityLogo from "@/assets/perplexity-logo.svg";
import grokLogo from "@/assets/grok-logo.svg";
import { useCountUp } from "@/hooks/useCountUp";

function scoreColor(score: number): string {
  if (score >= 70) return "#27AE60";
  if (score >= 50) return "#FF9F43";
  return "#E74C3C";
}

function EngineRow({ engine }: { engine: typeof engineScores[number] }) {
  const animatedScore = useCountUp(engine.score, 1400);
  const color = scoreColor(engine.score);
  const isPositive = engine.change >= 0;

  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[7px]">
          <div
            className="flex items-center justify-center shrink-0 rounded-[5px] size-5"
            style={{
              backgroundColor: engine.iconBg,
              border:
                engine.iconSlug === "gemini"
                  ? "1px solid #E8EAED"
                  : "none",
            }}
          >
            <EngineIcon slug={engine.iconSlug} />
          </div>
          <span className="text-slate-body text-xs/4">
            {engine.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px]/3 ${isPositive ? "text-success" : "text-danger"}`}
          >
            {isPositive ? "▲" : "▼"} {isPositive ? "+" : ""}
            {engine.change}
          </span>
          <span className="text-[13px]/4" style={{ color }}>
            {animatedScore}
          </span>
        </div>
      </div>
      <div className="h-1.5 rounded-[3px] bg-[#F0F4F8]">
        <div
          className="h-full rounded-[3px] transition-[width] duration-1000 ease-out"
          style={{
            width: `${animatedScore}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

export function EngineScores() {
  return (
    <div className="grow shrink basis-0 rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="mb-4 text-navy text-[13px]/4">Score by AI Engine</div>
      <div className="flex flex-col gap-4">
        {engineScores.map((engine) => (
          <EngineRow key={engine.name} engine={engine} />
        ))}
      </div>
    </div>
  );
}

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
        <img src={grokLogo} alt="Grok" width="11" height="11" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    case "claude":
      return (
        <img src={claudeLogo} alt="Claude" width="11" height="11" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    default:
      return null;
  }
}
