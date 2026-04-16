import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRiskInsights } from "./useRiskInsights";
import { KPITile } from "./KPITile";
import { RatingChip } from "@/components/ui/RatingChip";
import { TrendArrow } from "@/components/ui/TrendArrow";
import { buildNarrative } from "./narrativeTemplate";
import { IntakeBanner } from "./IntakeBanner";
import {
  cmoTiles,
  croTiles,
  cmoDownstreamTile,
  croDownstreamTile,
  tileMethodologies,
} from "@/data/mock-risk-insights";
import type { TileSpec, EngineMetric, AIEngine, CompositeSummary } from "@/data/mock-risk-insights";

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${n.toLocaleString()}`;
}

// Derive a simple "engine breakdown" for LLM-sourced-traffic from sessionsByEngine.
function trafficBreakdown(composite: CompositeSummary): EngineMetric[] {
  const engines: AIEngine[] = ["chatgpt", "perplexity", "claude", "gemini"];
  return engines.map((e) => {
    const val = composite.llmSourcedTraffic.sessionsByEngine[e] ?? 0;
    return {
      engine: e,
      value: val,
      delta: Math.round(val * 0.08),
      sparkline: [Math.round(val * 0.45), Math.round(val * 0.55), Math.round(val * 0.65), Math.round(val * 0.72), Math.round(val * 0.8), Math.round(val * 0.88), Math.round(val * 0.95), val],
      goodDirection: "up",
    };
  });
}

export function ExecutiveSummary() {
  const { account, composite, lens } = useRiskInsights();
  const tilesRef = useRef<HTMLDivElement>(null);

  const primaryTiles: TileSpec[] = lens === "cro" ? croTiles : cmoTiles;
  const downstreamTile: TileSpec = lens === "cro" ? croDownstreamTile : cmoDownstreamTile;
  const tiles = [...primaryTiles, downstreamTile];
  const narrative = buildNarrative(account, composite, lens);

  useEffect(() => {
    const container = tilesRef.current;
    if (!container) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const tileEls = container.querySelectorAll(".kpi-tile");
    gsap.fromTo(
      tileEls,
      { y: 6, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.28, ease: "power3.inOut", stagger: 0.04 }
    );
  }, [lens]);

  const chipLabel =
    composite.rating === "red"
      ? "High Exposure"
      : composite.rating === "amber"
        ? "Moderate Exposure"
        : "Low Exposure";

  const trendLabel =
    composite.trend === "up"
      ? "Worsening"
      : composite.trend === "down"
        ? "Improving"
        : "Flat";

  function tileValueFor(spec: TileSpec): number {
    // llmSourcedTraffic sources resolve differently per lens.
    if (spec.source === "llmSourcedTraffic") {
      return lens === "cmo"
        ? composite.llmSourcedTraffic.monthlySessions
        : composite.llmSourcedTraffic.assistedPipelineUsd;
    }
    const raw = composite[spec.source];
    return typeof raw === "number" ? raw : 0;
  }

  return (
    <section
      id="summary"
      className="flex flex-col gap-7 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(10,37,64,0.04)] p-8 scroll-mt-24"
    >
      <IntakeBanner />

      <div className="flex items-center gap-4 flex-wrap">
        <RatingChip rating={composite.rating} size="lg" label={chipLabel} />
        <TrendArrow trend={composite.trend} invert label={trendLabel} size={14} />
        <div className="grow" />
        <div className="flex items-center gap-2">
          <span className="text-[11px]/4 uppercase tracking-[0.08em] text-navy font-bold">
            Pipeline at stake
          </span>
          <span className="text-navy font-bold text-base/5">
            {formatCurrency(composite.pipelineExposedUsd)}
          </span>
        </div>
      </div>

      <p className="text-base/[160%] text-[#475569] m-0 max-w-[68ch]">
        {narrative}
      </p>

      <div ref={tilesRef} className="flex gap-5 flex-wrap">
        {tiles.map((t) => {
          const raw = tileValueFor(t);
          const spec = t.methodologyKey
            ? tileMethodologies[t.methodologyKey]
            : undefined;
          // Traffic tile gets a computed engine breakdown
          const engineBreakdown =
            t.source === "llmSourcedTraffic" && lens === "cmo"
              ? trafficBreakdown(composite)
              : undefined;
          return (
            <div key={`${lens}-${t.key}`} className="kpi-tile grow shrink basis-[260px]">
              <KPITile
                label={t.label}
                value={raw}
                format={t.format}
                deltaLabel={t.deltaLabel}
                direction={t.direction}
                methodologySpec={spec}
                engineBreakdown={engineBreakdown}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
