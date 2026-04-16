import { useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { MethodologyPanel } from "@/components/ui/MethodologyPanel";
import type { EngineMetric, MethodologySpec } from "@/data/mock-risk-insights";

export type TileFormat = "currency" | "percent" | "number" | "days";

export interface KPITileProps {
  label: string;
  value: number;
  format: TileFormat;
  deltaLabel: string;
  direction: "up" | "down";
  /** If provided, clicking the (i) opens the sheet with this spec. */
  methodologySpec?: MethodologySpec;
  /** If provided, renders a per-engine chip row beneath the big value. */
  engineBreakdown?: EngineMetric[];
}

function formatValue(raw: number, format: TileFormat): string {
  if (format === "currency") {
    if (raw >= 1_000_000) return `$${(raw / 1_000_000).toFixed(1)}M`;
    if (raw >= 1_000) return `$${Math.round(raw / 1_000)}k`;
    return `$${raw.toLocaleString()}`;
  }
  if (format === "percent") return `${raw}%`;
  if (format === "days") return `${raw}d`;
  return raw.toLocaleString();
}

const ENGINE_INITIAL: Record<string, string> = {
  chatgpt: "G",
  perplexity: "P",
  claude: "C",
  gemini: "M",
  grok: "X",
};

const ENGINE_LABEL: Record<string, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
};

export function KPITile({
  label,
  value,
  format,
  deltaLabel,
  direction,
  methodologySpec,
  engineBreakdown,
}: KPITileProps) {
  const animated = useCountUp(value);
  const display = formatValue(animated, format);
  const [expanded, setExpanded] = useState(false);

  const deltaColor = direction === "up" ? "text-success" : "text-danger";

  return (
    <div className="grow shrink basis-0 flex flex-col gap-4 rounded-2xl py-7 px-7 bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(10,37,64,0.04)] min-h-[148px]">
      <div className="flex items-center gap-1.5">
        <span className="uppercase tracking-[0.08em] text-navy font-sans font-bold text-[11px]/4">
          {label}
        </span>
        {methodologySpec && <MethodologyPanel spec={methodologySpec} title={label} />}
      </div>

      <div className="flex flex-col gap-2 grow justify-end">
        <span className="text-[40px] tracking-[-1.8px] leading-none text-navy font-extrabold">
          {display}
        </span>
        <div className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
            {direction === "up" ? (
              <path d="M6.5 1.5L11 7H2L6.5 1.5Z" fill="#27AE60" />
            ) : (
              <path d="M6.5 11.5L2 6H11L6.5 11.5Z" fill="#E74C3C" />
            )}
          </svg>
          <span className={`${deltaColor} text-[12px]/4 font-medium`}>{deltaLabel}</span>
        </div>
      </div>

      {engineBreakdown && engineBreakdown.length > 0 && (
        <div className="flex flex-col gap-2 pt-3 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-1.5">
            {engineBreakdown.map((e) => {
              // For a tile metric where "up" is good, rising delta = success.
              // Engine metric's own goodDirection applies.
              const isGood =
                e.goodDirection === "up" ? e.delta >= 0 : e.delta <= 0;
              return (
                <button
                  key={e.engine}
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  title={`${ENGINE_LABEL[e.engine]}: ${e.value}${format === "percent" ? "%" : ""} (${e.delta >= 0 ? "+" : ""}${e.delta})`}
                  className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-white px-1.5 py-0.5 cursor-pointer hover:border-[#64748B] text-[10px]/3.5 font-bold"
                >
                  <span className="text-navy">{ENGINE_INITIAL[e.engine] ?? e.engine[0]?.toUpperCase()}</span>
                  <span className={isGood ? "text-success" : "text-danger"}>
                    {e.delta >= 0 ? "↑" : "↓"}
                  </span>
                </button>
              );
            })}
            <span className="text-[10px]/3.5 text-[#64748B]">click for engine split</span>
          </div>
          {expanded && (
            <div className="flex flex-col gap-1 pt-1">
              {engineBreakdown.map((e) => {
                const isGood =
                  e.goodDirection === "up" ? e.delta >= 0 : e.delta <= 0;
                return (
                  <div key={e.engine} className="flex items-center gap-2 text-[11px]/4">
                    <span className="w-16 text-[#475569] font-medium">
                      {ENGINE_LABEL[e.engine]}
                    </span>
                    <MiniSpark points={e.sparkline} goodDirection={e.goodDirection} />
                    <span className="text-navy font-semibold w-10 text-right">
                      {format === "percent" ? `${e.value}%` : e.value}
                    </span>
                    <span className={`w-10 text-right ${isGood ? "text-success" : "text-danger"}`}>
                      {e.delta >= 0 ? "+" : ""}
                      {e.delta}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MiniSpark({
  points,
  goodDirection,
}: {
  points: number[];
  goodDirection: "up" | "down";
}) {
  if (points.length < 2) return <div className="grow" />;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const w = 60;
  const h = 18;
  const pts = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  const trendingUp = points[points.length - 1] >= points[0];
  const good = goodDirection === "up" ? trendingUp : !trendingUp;
  const stroke = good ? "#27AE60" : "#E74C3C";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline
        points={pts}
        fill="none"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
