import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ReferenceDot,
} from "recharts";
import {
  annotations,
  metricsTimeseries,
  ratingHistory,
} from "@/data/mock-risk-insights";
import type { AIEngine, Rating } from "@/data/mock-risk-insights";
import { MethodologyPanel } from "@/components/ui/MethodologyPanel";
import type { MethodologySpec } from "@/data/mock-risk-insights";

const TRENDS_SPEC: MethodologySpec = {
  denominator: "Per-engine citation share on tracked prompt clusters, averaged across clusters per engine per quarter.",
  promptUniverse: "All tracked prompts across the 7 priority clusters.",
  engines: ["chatgpt", "perplexity", "claude", "gemini"],
  samplingWindow: "Trailing 8 quarters",
  sampleSize: 8,
  detectionMethod: "automated_scrape",
  shortBlurb: "Citation share per engine over 8 quarters. Annotations mark key events that shifted the trajectory.",
};

const HEATMAP_SPEC: MethodologySpec = {
  denominator: "Composite rating assigned to each risk at quarter close, based on severity, trend, and likelihood.",
  promptUniverse: "All active risks in the registry at the snapshot date.",
  engines: ["chatgpt", "perplexity", "claude", "gemini"],
  samplingWindow: "Quarterly",
  sampleSize: 8,
  detectionMethod: "hybrid",
  shortBlurb: "Rating history per risk per quarter. Red shows material exposure, amber moderate, green low.",
};

const ENGINE_META: Record<AIEngine, { label: string; color: string }> = {
  chatgpt: { label: "ChatGPT", color: "#10A37F" },
  perplexity: { label: "Perplexity", color: "#635BFF" },
  claude: { label: "Claude", color: "#D97757" },
  gemini: { label: "Gemini", color: "#4285F4" },
  grok: { label: "Grok", color: "#0A2540" },
};

const RATING_BG: Record<Rating, string> = {
  red: "#E74C3C",
  amber: "#FF9F43",
  green: "#27AE60",
};

const ALL_ENGINES: AIEngine[] = ["chatgpt", "perplexity", "claude", "gemini"];

function formatQuarter(iso: string): string {
  const d = new Date(iso);
  const q = Math.floor(d.getMonth() / 3) + 1;
  const y = d.getFullYear().toString().slice(-2);
  return `Q${q}'${y}`;
}

export function HistoricalTrends() {
  const [active, setActive] = useState<Set<AIEngine>>(new Set(ALL_ENGINES));

  // Pivot timeseries: one row per quarter with a column per engine (averaged across clusters)
  const chartData = useMemo(() => {
    const byTs: Record<string, Record<string, number | string>> = {};
    for (const p of metricsTimeseries) {
      const key = p.ts;
      if (!byTs[key]) byTs[key] = { ts: p.ts, quarter: formatQuarter(p.ts) };
      const current = byTs[key][`${p.engine}_sum`];
      const count = byTs[key][`${p.engine}_n`];
      byTs[key][`${p.engine}_sum`] = (typeof current === "number" ? current : 0) + p.citationSharePct;
      byTs[key][`${p.engine}_n`] = (typeof count === "number" ? count : 0) + 1;
    }
    return Object.values(byTs)
      .sort((a, b) => String(a.ts).localeCompare(String(b.ts)))
      .map((row) => {
        const out: Record<string, number | string> = { quarter: row.quarter as string, ts: row.ts as string };
        for (const eng of ALL_ENGINES) {
          const sum = row[`${eng}_sum`];
          const n = row[`${eng}_n`];
          if (typeof sum === "number" && typeof n === "number" && n > 0) {
            out[eng] = Math.round(sum / n);
          }
        }
        return out;
      });
  }, []);

  // Annotation markers. Snap to quarter key and attach to the highest active line for visibility.
  const annotationMarkers = useMemo(() => {
    return annotations.map((a) => {
      const snapTs = chartData.find((row) => row.ts === a.ts) ?? chartData[Math.floor(chartData.length / 2)];
      return {
        quarter: snapTs?.quarter as string,
        label: a.label,
        riskId: a.riskId,
      };
    });
  }, [chartData]);

  function toggle(engine: AIEngine) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(engine)) next.delete(engine);
      else next.add(engine);
      return next;
    });
  }

  return (
    <section id="trends" className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <h2 className="tracking-[-0.3px] text-navy font-bold text-2xl/[30px] m-0">Historical Trends</h2>
          <MethodologyPanel spec={TRENDS_SPEC} title="Historical Trends" />
        </div>
        <span className="text-[13px]/5 text-[#64748B]">
          Citation share % per engine · {chartData.length} quarters
        </span>
      </div>

      <div className="rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(10,37,64,0.04)] p-8 flex flex-col gap-6">
        {/* Legend toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          {ALL_ENGINES.map((eng) => {
            const meta = ENGINE_META[eng];
            const isOn = active.has(eng);
            return (
              <button
                key={eng}
                type="button"
                onClick={() => toggle(eng)}
                className={`inline-flex items-center gap-1.5 rounded-full py-1.5 px-3 border-[1.5px] text-xs font-semibold cursor-pointer transition-all ${
                  isOn
                    ? "bg-white border-[#E2E8F0]"
                    : "bg-[#F8FAFC] border-[#E2E8F0] opacity-50"
                }`}
              >
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="text-[#475569]">{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Line chart */}
        <div className="h-[320px] -ml-2">
          {chartData.length < 2 ? (
            <div className="h-full flex items-center justify-center text-slate-muted text-[13px]/5">
              Waiting for 2+ quarters of data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 12, right: 24, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="quarter"
                  tick={{ fontSize: 11, fill: "#8792A2" }}
                  axisLine={{ stroke: "#E6EBF1" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#8792A2" }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E6EBF1",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ display: "none" }} />
                {ALL_ENGINES.map((eng) =>
                  active.has(eng) ? (
                    <Line
                      key={eng}
                      type="monotone"
                      dataKey={eng}
                      name={ENGINE_META[eng].label}
                      stroke={ENGINE_META[eng].color}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  ) : null
                )}
                {annotationMarkers.map((a, i) => (
                  <ReferenceDot
                    key={i}
                    x={a.quarter}
                    y={55}
                    r={4}
                    fill="#0A2540"
                    stroke="#fff"
                    strokeWidth={1.5}
                    ifOverflow="visible"
                    label={{
                      value: "●",
                      position: "top",
                      fill: "#0A2540",
                      fontSize: 10,
                    }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Annotations legend */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px]/4 uppercase tracking-[0.08em] text-navy font-bold">
            Annotations
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {annotationMarkers.map((a, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-[11px]/4 text-[#475569]">
                <span className="size-1.5 rounded-full bg-navy" />
                <span className="text-navy font-semibold">{a.quarter}</span>
                <span>·</span>
                <span>{a.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Rating heatmap */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(10,37,64,0.04)] p-7 flex flex-col gap-4">
        <div className="flex items-center gap-1.5">
          <h3 className="tracking-[-0.2px] text-navy font-bold text-base/5 m-0">Rating History</h3>
          <MethodologyPanel spec={HEATMAP_SPEC} title="Rating History" />
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            {ratingHistory.map((row) => (
              <div
                key={row.riskId}
                className="grid items-center py-2.5 gap-3"
                style={{
                  gridTemplateColumns: `240px repeat(${row.cells.length}, 1fr)`,
                }}
              >
                <span className="text-slate-body text-[12px]/4 font-medium truncate">
                  {row.category}
                </span>
                {row.cells.map((cell) => (
                  <div
                    key={cell.quarter}
                    className="flex items-center justify-center h-8 rounded-lg text-white text-[11px]/4 font-bold uppercase tracking-[0.08em]"
                    style={{ backgroundColor: RATING_BG[cell.rating] }}
                    title={`${row.category} · ${cell.quarter} · ${cell.rating}`}
                  >
                    {cell.rating[0].toUpperCase()}
                  </div>
                ))}
              </div>
            ))}
            {/* Column labels */}
            <div
              className="grid items-center pt-3 mt-2 border-t border-[#E2E8F0] gap-3"
              style={{
                gridTemplateColumns: `240px repeat(${ratingHistory[0]?.cells.length ?? 0}, 1fr)`,
              }}
            >
              <span />
              {ratingHistory[0]?.cells.map((c) => (
                <span
                  key={c.quarter}
                  className="text-center text-[#64748B] text-[10px]/4 uppercase tracking-[0.08em] font-bold"
                >
                  {c.quarter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
