import { engineScores } from "@/data/mock-dashboard";
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
        <svg width="12" height="12" viewBox="0 0 192 192" fill="none">
          <defs>
            <linearGradient id="gemini-grad" x1="0" y1="0" x2="192" y2="192" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4285F4" />
              <stop offset="0.5" stopColor="#9B72CB" />
              <stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
          <path
            d="M96 20c-4.4 13.4-14.2 24.8-28 31.2C54.2 57.6 40 58.4 27 54c4.4 13.4 3.4 28.4-3.2 41.2C17.2 108 7.8 117.4 0 122c13.4 4.4 24.8 14.2 31.2 28C37.6 163.8 38.4 178 34 191c13.4-4.4 28.4-3.4 41.2 3.2 12.8 6.6 22.2 16 26.8 23.8 4.6-7.8 14-17.2 26.8-23.8C141.6 187.6 156.6 186.6 170 191c-4.4-13.4-3.4-28.4 3.2-41.2C179.8 136.8 192 127.4 192 122c-13.4-4.4-24.8-14.2-31.2-28C154.4 80.2 155.4 65.2 158 52c-13.4 4.4-28.4 3.4-41.2-3.2C103.8 42.2 100.6 27.8 96 20z"
            fill="url(#gemini-grad)"
          />
        </svg>
      );
    case "grok":
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFFFFF">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "claude":
      return (
        <svg width="11" height="11" viewBox="0 0 32 32" fill="#FFFFFF">
          <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4c2.21 0 4.26.65 5.98 1.76L7.76 21.98A9.96 9.96 0 0 1 6 16c0-5.514 4.486-10 10-10zm0 20c-2.21 0-4.26-.65-5.98-1.76l14.22-14.22A9.96 9.96 0 0 1 26 16c0 5.514-4.486 10-10 10z" />
        </svg>
      );
    default:
      return null;
  }
}
