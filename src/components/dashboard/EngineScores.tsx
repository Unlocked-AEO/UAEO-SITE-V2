import { engineScores } from "@/data/mock-dashboard";
import geminiLogo from "@/assets/gemini-logo.svg";
import claudeLogo from "@/assets/claude-logo.svg";
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
        <svg width="12" height="12" viewBox="0 0 41 41" fill="#FFFFFF">
          <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.239-3.507 10.079 10.079 0 0 0-10.63 4.908 9.962 9.962 0 0 0-6.675 3.305 10.079 10.079 0 0 0-2.489 11.032 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.239 3.507 10.079 10.079 0 0 0 10.63-4.908 9.966 9.966 0 0 0 6.675-3.305 10.079 10.079 0 0 0 2.489-11.032z" />
        </svg>
      );
    case "perplexity":
      return (
        <svg width="10" height="10" viewBox="0 0 14 14" fill="#FFFFFF">
          <path d="M7 0L9.5 5H14L10.5 8.5L12 14L7 11L2 14L3.5 8.5L0 5H4.5L7 0Z" />
        </svg>
      );
    case "gemini":
      return (
        <img src={geminiLogo} alt="Gemini" width="12" height="12" className="shrink-0" style={{ flexShrink: '0' }} />
      );
    case "grok":
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFFFFF">
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
