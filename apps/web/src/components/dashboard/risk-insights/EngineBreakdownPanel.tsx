import { useMemo } from "react";
import { EngineSparkline } from "./EngineSparkline";
import { MethodologyPanel } from "@/components/ui/MethodologyPanel";
import { metricsTimeseries } from "@/data/mock-risk-insights";
import type { AIEngine, Risk } from "@/data/mock-risk-insights";

const ENGINE_LABEL: Record<AIEngine, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
};

function formatQuarter(iso: string): string {
  const d = new Date(iso);
  const q = Math.floor(d.getMonth() / 3) + 1;
  const y = d.getFullYear().toString().slice(-2);
  return `Q${q} '${y}`;
}

export function EngineBreakdownPanel({ risk }: { risk: Risk }) {
  const engines: AIEngine[] = ["chatgpt", "perplexity", "claude", "gemini"];

  // Build per-engine time series from metricsTimeseries filtered by the risk's cluster
  const seriesByEngine = useMemo(() => {
    const by: Record<string, Array<{ quarter: string; share: number; ts: string }>> = {};
    for (const p of metricsTimeseries) {
      if (p.cluster !== risk.cluster) continue;
      if (!by[p.engine]) by[p.engine] = [];
      by[p.engine].push({
        quarter: formatQuarter(p.ts),
        share: p.citationSharePct,
        ts: p.ts,
      });
    }
    for (const k of Object.keys(by)) {
      by[k].sort((a, b) => a.ts.localeCompare(b.ts));
    }
    return by;
  }, [risk.cluster]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {engines.map((eng) => {
          const bucket = risk.engineBreakdown.find((b) => b.engine === eng);
          const points = seriesByEngine[eng] ?? [];
          if (!bucket) return null;
          return (
            <EngineSparkline
              key={eng}
              engine={eng}
              points={points}
              currentValue={bucket.value}
              delta={bucket.delta}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
            Engine summary
          </span>
          <MethodologyPanel spec={risk.methodology} title={risk.category} />
        </div>
        <div className="rounded-xl overflow-clip bg-white border border-[#E2E8F0]">
          <div
            className="grid items-center py-2.5 px-4 gap-3 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px]/4 uppercase tracking-[0.08em] text-navy font-bold"
            style={{ gridTemplateColumns: "1fr 90px 90px 120px" }}
          >
            <span>Engine</span>
            <span className="text-right">Current</span>
            <span className="text-right">Δ vs Q</span>
            <span className="text-right">Samples</span>
          </div>
          {engines.map((eng) => {
            const bucket = risk.engineBreakdown.find((b) => b.engine === eng);
            if (!bucket) return null;
            const isBadDirection =
              bucket.goodDirection === "up" ? bucket.delta < 0 : bucket.delta > 0;
            const sampleSize = Math.round(risk.methodology.sampleSize / engines.length);
            return (
              <div
                key={eng}
                className="grid items-center py-3 px-4 gap-3 border-b last:border-b-0 border-[#F1F5F9]"
                style={{ gridTemplateColumns: "1fr 90px 90px 120px" }}
              >
                <span className="text-navy font-medium text-[13px]/4">
                  {ENGINE_LABEL[eng]}
                </span>
                <span className="text-navy font-bold text-[13px]/4 text-right tracking-[-0.1px]">
                  {bucket.value}%
                </span>
                <span
                  className={`text-[12px]/4 font-semibold text-right ${
                    isBadDirection ? "text-danger" : "text-success"
                  }`}
                >
                  {bucket.delta >= 0 ? "+" : ""}
                  {bucket.delta}
                </span>
                <span className="text-[#64748B] text-[12px]/4 text-right">
                  {sampleSize.toLocaleString()} prompts
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
