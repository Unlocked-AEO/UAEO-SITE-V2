import { promptResults } from "@/data/mock-scan-ai-visibility";
import type { PromptEngineResult, EngineSlug } from "@/data/mock-scan-ai-visibility";

function EngineChip({ result }: { result: PromptEngineResult }) {
  if (!result.active) {
    return <div className="opacity-[0.4] rounded-sm bg-[#E0E0E0] shrink-0 size-5" />;
  }

  const config: Record<EngineSlug, { bg: string; border?: string; icon: React.ReactNode }> = {
    chatgpt: {
      bg: "#10A37F",
      icon: (
        <svg width="10" height="10" viewBox="0 0 41 41" fill="#FFFFFF" style={{ flexShrink: '0' }}>
          <path d="M20.5 2C10.3 2 2 10.3 2 20.5S10.3 39 20.5 39 39 30.7 39 20.5 30.7 2 20.5 2z" />
        </svg>
      ),
    },
    perplexity: {
      bg: "#1C1C1C",
      icon: (
        <svg width="8" height="8" viewBox="0 0 14 14" fill="#FFFFFF" style={{ flexShrink: '0' }}>
          <path d="M7 0L9.5 5H14L10.5 8.5L12 14L7 11L2 14L3.5 8.5L0 5H4.5L7 0Z" />
        </svg>
      ),
    },
    gemini: {
      bg: "#FFFFFF",
      border: "1px solid #E0E0E0",
      icon: (
        <svg width="10" height="10" viewBox="0 0 192 192" fill="none" style={{ flexShrink: '0' }}>
          <path d="M96 20c-4.4 13.4-14.2 24.8-28 31.2C54.2 57.6 40 58.4 27 54c4.4 13.4 3.4 28.4-3.2 41.2C17.2 108 7.8 117.4 0 122c13.4 4.4 24.8 14.2 31.2 28C37.6 163.8 38.4 178 34 191c13.4-4.4 28.4-3.4 41.2 3.2 12.8 6.6 22.2 16 26.8 23.8 4.6-7.8 14-17.2 26.8-23.8C141.6 187.6 156.6 186.6 170 191c-4.4-13.4-3.4-28.4 3.2-41.2C179.8 136.8 192 127.4 192 122c-13.4-4.4-24.8-14.2-31.2-28C154.4 80.2 155.4 65.2 158 52c-13.4 4.4-28.4 3.4-41.2-3.2C103.8 42.2 100.6 27.8 96 20z" fill="#9B72CB" />
        </svg>
      ),
    },
    grok: {
      bg: "#000000",
      icon: (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="#FFFFFF" style={{ flexShrink: '0' }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    claude: {
      bg: "#D97757",
      icon: (
        <svg width="9" height="9" viewBox="0 0 32 32" fill="#FFFFFF" style={{ flexShrink: '0' }}>
          <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2z" />
        </svg>
      ),
    },
  };

  const c = config[result.engine];

  return (
    <div
      className="flex items-center justify-center rounded-sm shrink-0 size-5"
      style={{ backgroundColor: c.bg, border: c.border || "none" }}
    >
      {c.icon}
    </div>
  );
}

export function ScanPromptTable() {
  return (
    <div className="rounded-xl overflow-clip grow shrink basis-[0%] bg-white border border-solid border-[#E6EBF1] [box-shadow:#0A25400F_0px_1px_4px]">
      {/* Header */}
      <div className="flex items-center py-3 px-5 bg-[#FAFBFC] border-b border-b-solid border-b-[#F0F4F8]">
        <div className="grow-2 shrink basis-[0%] uppercase tracking-[0.5px] text-[#8792A2] font-sans text-[11px]/3.5">
          Prompt
        </div>
        <div className="grow shrink basis-[0%] text-center uppercase tracking-[0.5px] text-[#8792A2] font-sans text-[11px]/3.5">
          Mentioned
        </div>
        <div className="grow shrink basis-[0%] text-center uppercase tracking-[0.5px] text-[#8792A2] font-sans text-[11px]/3.5">
          Cited
        </div>
        <div className="grow shrink basis-[0%] text-center uppercase tracking-[0.5px] text-[#8792A2] font-sans text-[11px]/3.5">
          Recommended
        </div>
        <div className="w-16 text-center uppercase tracking-[0.5px] text-[#8792A2] font-sans shrink-0 text-[11px]/3.5">
          Score
        </div>
      </div>

      {/* Rows */}
      <div className="max-h-none flex flex-col overflow-clip grow shrink basis-[0%]">
        {promptResults.map((row, i) => (
          <div
            key={i}
            className={`flex items-center py-3.5 px-5 gap-2 ${
              i < promptResults.length - 1 ? "border-b border-b-solid border-b-[#F0F4F8]" : ""
            }`}
          >
            <div className="grow-2 shrink basis-[0%] text-[12px] leading-[round(up,140%,1px)] pr-4 text-[#0A2540] font-sans">
              {row.prompt}
            </div>
            <div className="grow shrink basis-[0%] flex justify-center gap-1.25">
              {row.mentioned.map((r, j) => (
                <EngineChip key={j} result={r} />
              ))}
            </div>
            <div className="grow shrink basis-[0%] flex justify-center gap-1.25">
              {row.cited.map((r, j) => (
                <EngineChip key={j} result={r} />
              ))}
            </div>
            <div className="grow shrink basis-[0%] flex justify-center gap-1.25">
              {row.recommended.map((r, j) => (
                <EngineChip key={j} result={r} />
              ))}
            </div>
            <div className="w-16 flex justify-center shrink-0">
              <div
                className="inline-block [white-space-collapse:preserve] w-max font-sans font-extrabold shrink-0 text-[13px]/4"
                style={{ color: row.scoreColor }}
              >
                {row.score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
