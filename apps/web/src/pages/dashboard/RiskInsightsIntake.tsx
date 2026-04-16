import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { RiskInsightsProvider } from "@/components/dashboard/risk-insights/LensContext";
import { useRiskInsights } from "@/components/dashboard/risk-insights/useRiskInsights";
import {
  computeDisplacementRate,
  computePipelineExposed,
  computeRevenueAtRisk12mo,
  PIPELINE_TIER_LABELS,
  ORGANIC_SHARE_LABELS,
  ORGANIC_SHARE_HINTS,
  AI_EXPOSURE_LABELS,
  scanSignals,
} from "@/data/mock-risk-insights";
import type {
  FinancialIntake,
  FinancialIntakeInputs,
  OrganicShareTier,
  PipelineTier,
} from "@/data/mock-risk-insights";

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n).toLocaleString()}`;
}

export default function RiskInsightsIntake() {
  return (
    <DashboardShell activeTab="risk-insights">
      <RiskInsightsProvider>
        <IntakeInner />
      </RiskInsightsProvider>
    </DashboardShell>
  );
}

function IntakeInner() {
  const navigate = useNavigate();
  const { intake, setIntake } = useRiskInsights();

  const [draft, setDraft] = useState<FinancialIntakeInputs>(intake.inputs);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    gsap.from(headerRef.current, {
      y: 16,
      opacity: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  }, []);

  const update = (patch: Partial<FinancialIntakeInputs>) =>
    setDraft((d) => ({ ...d, ...patch }));

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(intake.inputs),
    [draft, intake.inputs]
  );

  const computedDisplacement = computeDisplacementRate(draft);
  const computedPipelineExposed = computePipelineExposed(draft);
  const computedRevenueAtRisk = computeRevenueAtRisk12mo(draft);

  function persist() {
    const next: FinancialIntake = {
      ...intake,
      status: "complete",
      inputs: draft,
      lastEditedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      completedBy: "Gabe Astor",
    };
    setIntake(next);
    console.log("ACTION: save_financial_intake", { inputs: draft });
    navigate("/dashboard/risk-insights");
  }

  function cancel() {
    setDraft(intake.inputs);
    navigate("/dashboard/risk-insights");
  }

  return (
    <div className="flex flex-col pb-24">
      {/* Header */}
      <div ref={headerRef} className="flex flex-col gap-4 pb-6">
        <button
          type="button"
          onClick={cancel}
          className="inline-flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0 text-[12px]/4 text-[#64748B] font-semibold hover:text-[#475569] w-fit"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M9 5.5H2m0 0L5 2.5M2 5.5L5 8.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Risk Insights
        </button>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-2 max-w-[680px]">
            <span className="uppercase tracking-[0.08em] text-teal font-bold text-[11px]/4">
              Financial Intake
            </span>
            <h1 className="tracking-[-0.8px] text-navy font-bold text-[32px]/10 m-0">
              Two questions, no exact dollars
            </h1>
            <p className="text-[14px]/[1.6] text-[#475569] m-0">
              Pick the tier that best describes your business. We use the tier midpoint
              internally to drive the dollar figures on Risk Insights, so you never have
              to share exact pipeline or deal size numbers. AI query exposure is measured
              automatically from your latest scan, so you don't answer that either.
            </p>
          </div>
          <IntakeStatusPill status={intake.status} />
        </div>
      </div>

      {/* Section 1: Pipeline tier */}
      <RadioSection
        eyebrow="Question 1"
        title="Pipeline magnitude"
        why="Which bracket best describes your annual marketing-sourced pipeline? The page uses the midpoint of your bracket internally; we do not store your exact figure."
      >
        <PipelineTierSelect
          value={draft.pipelineTier}
          onChange={(v) => update({ pipelineTier: v })}
        />
      </RadioSection>

      {/* Section 2: Organic share */}
      <RadioSection
        eyebrow="Question 2"
        title="Organic share of pipeline"
        why="How much of that pipeline comes from organic, SEO, referral, or direct channels — the channels AI engines can influence."
      >
        {(Object.keys(ORGANIC_SHARE_LABELS) as OrganicShareTier[]).map((k) => (
          <RadioOption
            key={k}
            name="organicShare"
            value={k}
            checked={draft.organicShare === k}
            label={ORGANIC_SHARE_LABELS[k]}
            hint={ORGANIC_SHARE_HINTS[k]}
            onChange={() => update({ organicShare: k })}
          />
        ))}
      </RadioSection>

      {/* Scan-derived: AI exposure (read-only) */}
      <ScanDerivedSection />

      {/* Review */}
      <section className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 py-8 border-t border-[#E2E8F0]">
        <div className="flex flex-col gap-3">
          <span className="uppercase tracking-[0.08em] text-teal font-bold text-[11px]/4">
            Review
          </span>
          <h2 className="tracking-[-0.3px] text-navy font-bold text-2xl/[30px] m-0">
            What Risk Insights will read
          </h2>
          <p className="text-[13px]/[1.7] text-[#475569] m-0">
            Summary header, KPI tiles, and methodology panels all route back to these
            computed numbers. Change a tier to see the values shift before you save.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ReviewTile
              label="Pipeline exposed"
              value={formatCurrency(computedPipelineExposed)}
            />
            <ReviewTile
              label="Revenue at risk (12mo)"
              value={formatCurrency(computedRevenueAtRisk)}
            />
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 flex flex-col gap-1.5">
            <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
              Computed displacement rate
            </span>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-navy font-extrabold text-[24px]/none tracking-[-0.8px]">
                {(computedDisplacement * 100).toFixed(1)}%
              </span>
              <span className="text-[12px]/[1.5] text-[#64748B]">
                = {ORGANIC_SHARE_LABELS[draft.organicShare]} organic × {AI_EXPOSURE_LABELS[scanSignals.aiExposureTier]} (from scan)
              </span>
            </div>
            <span className="text-[11px]/[1.5] text-[#475569]">
              Gartner's Dec 2024 forecast put traditional search displacement between 15% and 25% by 2026. Your computed rate sits{" "}
              {computedDisplacement < 0.15
                ? "below"
                : computedDisplacement > 0.25
                  ? "above"
                  : "inside"}{" "}
              that range.
            </span>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 flex flex-col gap-2">
            <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
              Not stored
            </span>
            <ul className="list-disc pl-5 m-0 text-[12px]/[1.7] text-[#475569]">
              <li>Exact pipeline dollar figures</li>
              <li>Deal size, growth rate, or named prompts</li>
              <li>Free-text methodology notes</li>
              <li>Customer overrides of loss or restoration factors</li>
            </ul>
            <span className="text-[11px]/[1.5] text-[#64748B]">
              These stay in your CRM and analytics stack. Scenario factors remain at the Gartner and McKinsey industry defaults cited in the methodology sheets.
            </span>
          </div>
        </div>
      </section>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between gap-3 max-w-full">
          <div className="flex items-center gap-3 min-w-0">
            <IntakeStatusPill status={intake.status} />
            {dirty && (
              <span className="text-[12px]/4 text-[#64748B] truncate">
                Unsaved changes. Risk Insights keeps its current values until you save.
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={cancel}
              className="rounded-lg py-3 px-5 bg-white border-[1.5px] border-[#E2E8F0] cursor-pointer hover:bg-[#F8FAFC] transition-colors text-[13px]/4 text-navy font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={persist}
              className="inline-flex items-center gap-2 rounded-lg py-3 px-5 bg-navy border-none cursor-pointer hover:opacity-90 transition-opacity text-[13px]/4 text-white font-semibold"
            >
              Save and return
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RadioSection({
  eyebrow,
  title,
  why,
  children,
}: {
  eyebrow: string;
  title: string;
  why: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 py-8 border-t border-[#E2E8F0]">
      <div className="flex flex-col gap-3">
        <span className="uppercase tracking-[0.08em] text-teal font-bold text-[11px]/4">
          {eyebrow}
        </span>
        <h2 className="tracking-[-0.3px] text-navy font-bold text-2xl/[30px] m-0">
          {title}
        </h2>
        <p className="text-[13px]/[1.7] text-[#475569] m-0">{why}</p>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

function PipelineTierSelect({
  value,
  onChange,
}: {
  value: PipelineTier;
  onChange: (v: PipelineTier) => void;
}) {
  // Ordered tiers so the option list goes from smallest to largest.
  const tiers: PipelineTier[] = [
    "100k_to_250k",
    "250k_to_500k",
    "500k_to_750k",
    "750k_to_1m",
    "1_to_5m",
    "5_to_10m",
    "10_to_50m",
    "50_to_250m",
    "over_250m",
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as PipelineTier)}
          className="w-full appearance-none rounded-xl border-[1.5px] border-[#E2E8F0] bg-white pl-5 pr-11 py-4 text-navy font-semibold text-[14px]/5 cursor-pointer focus:border-navy focus:outline-none"
        >
          <optgroup label="Under $1M">
            {tiers.slice(0, 4).map((k) => (
              <option key={k} value={k}>
                {PIPELINE_TIER_LABELS[k]}
              </option>
            ))}
          </optgroup>
          <optgroup label="$1M and above">
            {tiers.slice(4).map((k) => (
              <option key={k} value={k}>
                {PIPELINE_TIER_LABELS[k]}
              </option>
            ))}
          </optgroup>
        </select>
        <svg
          aria-hidden="true"
          className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3.5 5L7 8.5L10.5 5"
            stroke="#64748B"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-[11px]/[1.5] text-[#64748B]">
        Tier midpoint used internally; exact figure not stored.
      </span>
    </div>
  );
}

function ScanDerivedSection() {
  const scanDate = new Date(scanSignals.lastScanDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 py-8 border-t border-[#E2E8F0]">
      <div className="flex flex-col gap-3">
        <span className="uppercase tracking-[0.08em] text-teal font-bold text-[11px]/4">
          From scan
        </span>
        <h2 className="tracking-[-0.3px] text-navy font-bold text-2xl/[30px] m-0">
          AI query exposure
        </h2>
        <p className="text-[13px]/[1.7] text-[#475569] m-0">
          Measured from your latest AEO scan, not captured here. If the measurement is
          off, run a new scan rather than editing the tier manually. The band below
          feeds the displacement rate used on the Summary page.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4 rounded-xl border border-[#E2E8F0] bg-white p-5 flex-wrap">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
              Current tier
            </span>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-navy font-extrabold text-[22px]/none tracking-[-0.5px]">
                {AI_EXPOSURE_LABELS[scanSignals.aiExposureTier]}
              </span>
              <span className="text-[12px]/4 text-[#64748B]">
                · measured at{" "}
                <span className="text-navy font-semibold">
                  {scanSignals.aiExposurePct}%
                </span>
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0FDF4] text-[#166534] px-2.5 py-1 text-[10px]/4 font-bold uppercase tracking-[0.08em] shrink-0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 5l2 2 4-4"
                stroke="#166534"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Auto-filled
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 flex-wrap">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[11px]/4 text-[#64748B]">
              Last scan · {scanDate} ·{" "}
              <span className="text-[#475569] font-mono">{scanSignals.scanId}</span>
            </span>
            <span className="text-[11px]/[1.5] text-[#475569]">
              AEO composite score:{" "}
              <span className="text-navy font-bold">
                {scanSignals.aeoCompositeScore}/100
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => console.log("ACTION: rerun_aeo_scan")}
            className="inline-flex items-center gap-1.5 rounded-lg py-2 px-3.5 bg-white border-[1.5px] border-[#E2E8F0] cursor-pointer hover:border-[#64748B] transition-colors text-[12px]/4 text-navy font-semibold shrink-0"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M1.5 5.5a4 4 0 0 1 7-2.6l.5.6m.5 2a4 4 0 0 1-7 2.6L2 7.5m7-2V3m0 2.5H6.5M2 5.5V8m0-2.5h2.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Run new scan
          </button>
        </div>
      </div>
    </section>
  );
}

function RadioOption({
  name,
  value,
  checked,
  label,
  hint,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  label: string;
  hint: string;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-xl border-[1.5px] bg-white px-5 py-4 cursor-pointer transition-colors ${
        checked
          ? "border-navy shadow-[0_1px_3px_rgba(10,37,64,0.06)]"
          : "border-[#E2E8F0] hover:border-[#64748B]"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`shrink-0 mt-0.5 flex items-center justify-center rounded-full size-[18px] border-[1.5px] ${
          checked ? "border-navy" : "border-[#E2E8F0]"
        }`}
        aria-hidden="true"
      >
        {checked && <span className="size-[10px] rounded-full bg-navy" />}
      </span>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-navy font-semibold text-[14px]/5">{label}</span>
        <span className="text-[#64748B] text-[12px]/[1.5]">{hint}</span>
      </div>
    </label>
  );
}

function ReviewTile({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col gap-2 rounded-xl border border-[#E2E8F0] p-5"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-accent-active) 10%, white)",
      }}
    >
      <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
        {label}
      </span>
      <span className="text-navy font-extrabold text-[36px]/none tracking-[-1.5px]">
        {value}
      </span>
    </div>
  );
}

function IntakeStatusPill({ status }: { status: "incomplete" | "draft" | "complete" }) {
  const cfg = {
    incomplete: { bg: "#FFF1F2", text: "#9F1239", label: "Incomplete" },
    draft: { bg: "#FEF3C7", text: "#92400E", label: "Draft" },
    complete: { bg: "#F0FDF4", text: "#166534", label: "Complete" },
  }[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[10px]/4 font-bold uppercase tracking-[0.08em]"
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
    >
      {cfg.label}
    </span>
  );
}
