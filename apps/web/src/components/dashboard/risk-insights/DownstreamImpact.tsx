import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRiskInsights } from "./useRiskInsights";
import { MethodologyPanel } from "@/components/ui/MethodologyPanel";
import { tileMethodologies } from "@/data/mock-risk-insights";
import type { AIEngine } from "@/data/mock-risk-insights";

const ENGINE_COLOR: Record<AIEngine, string> = {
  chatgpt: "#10A37F",
  perplexity: "#635BFF",
  claude: "#D97757",
  gemini: "#4285F4",
  grok: "#0A2540",
};

const ENGINE_LABEL: Record<AIEngine, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
};

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${n.toLocaleString()}`;
}

function formatSessions(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

export function DownstreamImpact() {
  const { composite, lens } = useRiskInsights();
  const barRef = useRef<HTMLDivElement>(null);

  const traffic = composite.llmSourcedTraffic;
  const engines: AIEngine[] = ["chatgpt", "perplexity", "claude", "gemini"];
  const total = traffic.monthlySessions;

  const segments = engines
    .map((e) => ({
      engine: e,
      value: traffic.sessionsByEngine[e] ?? 0,
      color: ENGINE_COLOR[e],
    }))
    .filter((s) => s.value > 0);

  useEffect(() => {
    const c = barRef.current;
    if (!c) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const bars = c.querySelectorAll(".sessions-seg");
    gsap.fromTo(
      bars,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.6, ease: "power3.out", stagger: 0.08 }
    );
  }, []);

  const primaryTileSpec = tileMethodologies[
    lens === "cmo" ? "llm-sourced-traffic" : "assisted-pipeline"
  ];

  return (
    <section id="downstream" className="flex flex-col gap-5 scroll-mt-24">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <h2 className="tracking-[-0.3px] text-navy font-bold text-2xl/[30px] m-0">
            Downstream Impact
          </h2>
          <MethodologyPanel
            spec={primaryTileSpec}
            title="Downstream Attribution"
          />
        </div>
        <span className="text-[13px]/5 text-[#64748B]">
          Does AEO drive pipeline? The CFO-skeptic view on whether all of this produces revenue.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
        {/* Sessions by engine */}
        <div className="flex flex-col gap-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(10,37,64,0.04)] p-7">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex flex-col gap-0.5">
              <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
                LLM-sourced sessions (monthly)
              </span>
              <span className="text-navy font-extrabold text-[32px]/10 tracking-[-1.2px]">
                {formatSessions(total)}
              </span>
            </div>
            <span className="rounded-full bg-[#F0FDFA] text-teal px-2.5 py-0.5 text-[10px]/4 font-bold uppercase tracking-[0.08em]">
              +14% vs last quarter
            </span>
          </div>

          <div
            ref={barRef}
            className="flex rounded-xl overflow-hidden h-12"
          >
            {segments.map((s) => {
              const pct = (s.value / total) * 100;
              return (
                <div
                  key={s.engine}
                  className="sessions-seg flex items-center justify-center text-[11px]/4 font-bold text-white"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: s.color,
                  }}
                  title={`${ENGINE_LABEL[s.engine]}: ${formatSessions(s.value)} (${pct.toFixed(1)}%)`}
                >
                  {pct >= 10 && formatSessions(s.value)}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-1.5">
            {segments.map((s) => (
              <div key={s.engine} className="flex items-center gap-2.5 text-[13px]/5">
                <span
                  className="shrink-0 rounded-sm size-2.5"
                  style={{ backgroundColor: s.color }}
                />
                <span className="grow text-[#475569]">{ENGINE_LABEL[s.engine]}</span>
                <span className="text-navy font-semibold">{formatSessions(s.value)}</span>
                <span className="text-[#64748B] w-12 text-right">
                  {((s.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
              <circle cx="7" cy="7" r="5.5" stroke="#64748B" strokeWidth="1.2" />
              <path
                d="M7 4.5V7.5M7 9V9.01"
                stroke="#64748B"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[11px]/[1.6] text-[#475569]">
              <span className="text-navy font-semibold">Confidence: </span>
              {traffic.confidenceLabel}
            </span>
          </div>
        </div>

        {/* Assisted pipeline tile */}
        <div className="flex flex-col gap-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_4px_24px_rgba(10,37,64,0.06),0_1px_4px_rgba(10,37,64,0.04)] p-7">
          <div className="flex items-center gap-1.5">
            <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
              Assisted pipeline (90d)
            </span>
            <MethodologyPanel
              spec={tileMethodologies["assisted-pipeline"]}
              title="Assisted Pipeline"
            />
          </div>
          <div
            className="flex flex-col gap-2 rounded-xl p-5"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-accent-active) 10%, white)",
            }}
          >
            <span className="text-navy font-extrabold text-[40px]/none tracking-[-1.8px]">
              {formatCurrency(traffic.assistedPipelineUsd)}
            </span>
            <span className="text-[12px]/4 text-[#475569]">
              Closed pipeline where an LLM-origin session appears in the multi-touch attribution path.
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="uppercase tracking-[0.08em] text-navy font-bold text-[10px]/4">
              Answer for the CFO
            </span>
            <p className="m-0 text-[13px]/[1.6] text-[#475569]">
              AEO contributes to <span className="text-navy font-semibold">{formatCurrency(traffic.assistedPipelineUsd)}</span> of closed pipeline in the last 90 days across <span className="text-navy font-semibold">{formatSessions(total)}</span> monthly LLM-sourced sessions. Attribution is directional; confidence grows with deterministic tracking on post-click events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
