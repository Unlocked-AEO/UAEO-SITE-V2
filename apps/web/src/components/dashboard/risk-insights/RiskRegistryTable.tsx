import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useRiskInsights } from "./useRiskInsights";
import { RatingChip } from "@/components/ui/RatingChip";
import { TrendArrow } from "@/components/ui/TrendArrow";
import { Markdown } from "@/components/ui/Markdown";
import { MethodologyPanel } from "@/components/ui/MethodologyPanel";
import { RowTabs } from "./RowTabs";
import type { RowTab } from "./RowTabs";
import { EngineBreakdownPanel } from "./EngineBreakdownPanel";
import { SentimentTab } from "./SentimentTab";
import { RecommendationTab } from "./RecommendationTab";
import { PersonaFilter } from "./PersonaFilter";
import type { PersonaFilterValue } from "./PersonaFilter";
import { DeepLinkButton } from "./DeepLinkButton";
import { metricsTimeseries } from "@/data/mock-risk-insights";
import type {
  EvidencePrompt,
  HallucinationEvent,
  Milestone,
  MilestoneStatus,
  Rating,
  Risk,
} from "@/data/mock-risk-insights";

type SortKey = "rating" | "severity" | "likelihood" | "review";
type FilterKey = "all" | Rating;

const RATING_RANK: Record<Rating, number> = { red: 0, amber: 1, green: 2 };

const ENGINE_LABEL: Record<string, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
};

const STATUS_LABEL: Record<MilestoneStatus, string> = {
  plan: "Plan",
  execute: "Execute",
  measure: "Measure",
  review: "Review",
};

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${n}`;
}

function formatSeverity(n: number): string {
  if (n === 0) return "Qualitative";
  return formatCurrency(n);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatQuarter(iso: string): string {
  const d = new Date(iso);
  const q = Math.floor(d.getMonth() / 3) + 1;
  const y = d.getFullYear().toString().slice(-2);
  return `Q${q} '${y}`;
}

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "red", label: "Red" },
  { key: "amber", label: "Amber" },
  { key: "green", label: "Green" },
];

const GRID_TEMPLATE_COLUMNS = "110px 1.6fr 90px 110px 150px 1.1fr 110px 32px";

export function RiskRegistryTable() {
  const { risks, lens } = useRiskInsights();
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [filter, setFilter] = useState<FilterKey>("all");
  // Persona filter defaults from lens and updates when lens changes.
  const [personaFilter, setPersonaFilter] = useState<PersonaFilterValue>(lens);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const tbodyRef = useRef<HTMLDivElement>(null);

  // When the lens changes, default persona filter tracks it. User can override.
  useEffect(() => {
    setPersonaFilter(lens);
  }, [lens]);

  const visible = useMemo(() => {
    const ratingFiltered =
      filter === "all" ? risks : risks.filter((r) => r.rating === filter);
    const personaFiltered =
      personaFilter === "all"
        ? ratingFiltered
        : ratingFiltered.filter(
            (r) => r.primaryPersona === personaFilter || r.primaryPersona === "both"
          );
    const sorted = [...personaFiltered].sort((a, b) => {
      if (sortKey === "rating") return RATING_RANK[a.rating] - RATING_RANK[b.rating];
      if (sortKey === "severity") return b.severityUsd - a.severityUsd;
      if (sortKey === "likelihood") return b.likelihoodPct - a.likelihoodPct;
      return new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime();
    });
    return sorted;
  }, [risks, sortKey, filter, personaFilter]);

  useEffect(() => {
    const container = tbodyRef.current;
    if (!container) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const rows = container.querySelectorAll(".risk-row");
    gsap.fromTo(
      rows,
      { y: 6, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.03 }
    );
  }, [visible]);

  return (
    <section id="registry" className="flex flex-col gap-5 scroll-mt-24">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div className="flex flex-col gap-1.5">
          <h2 className="tracking-[-0.3px] text-navy font-bold text-2xl/[30px] m-0">Risk Registry</h2>
          <span className="text-[13px]/5 text-[#64748B]">
            {visible.length} of {risks.length} risks. Click any row to expand diagnosis, engine split, sentiment, and recommendations.
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <PersonaFilter value={personaFilter} onChange={setPersonaFilter} />
          <div className="flex items-center gap-1.5">
            <span className="text-[11px]/4 uppercase tracking-[0.08em] text-navy font-bold">
              Rating
            </span>
            {FILTERS.map((f) => {
              const active = f.key === filter;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full py-1 px-2.5 border text-[11px]/4 font-semibold cursor-pointer transition-colors ${
                    active
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#64748B]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-clip bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(10,37,64,0.04)]">
        <div
          className="grid items-center py-4 px-7 gap-4 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px]/4 uppercase tracking-[0.08em] text-navy font-bold"
          style={{ gridTemplateColumns: GRID_TEMPLATE_COLUMNS }}
        >
          <HeaderCell label="Rating" onClick={() => setSortKey("rating")} active={sortKey === "rating"} />
          <div>Category</div>
          <div>Trend</div>
          <HeaderCell label="Severity" onClick={() => setSortKey("severity")} active={sortKey === "severity"} />
          <HeaderCell label="Likelihood" onClick={() => setSortKey("likelihood")} active={sortKey === "likelihood"} />
          <div>Owner</div>
          <HeaderCell label="Next review" onClick={() => setSortKey("review")} active={sortKey === "review"} />
          <div aria-hidden="true" />
        </div>

        <div ref={tbodyRef}>
          {visible.length === 0 && (
            <div className="py-14 px-7 text-center">
              <span className="text-[#64748B] text-[14px]/6">
                All clear. No risks match the current filter.
              </span>
            </div>
          )}
          {visible.map((risk, i) => (
            <RiskRow
              key={risk.id}
              risk={risk}
              isLast={i === visible.length - 1}
              expanded={expandedId === risk.id}
              onToggle={() =>
                setExpandedId((cur) => (cur === risk.id ? null : risk.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeaderCell({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 text-left bg-transparent border-none cursor-pointer p-0 font-bold uppercase tracking-[0.08em] text-[11px]/4 ${
        active ? "text-navy" : "text-[#64748B] hover:text-[#475569]"
      }`}
    >
      {label}
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path
          d="M2 3.5L4.5 1L7 3.5M2 5.5L4.5 8L7 5.5"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function RiskRow({
  risk,
  isLast,
  expanded,
  onToggle,
}: {
  risk: Risk;
  isLast: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const panel = panelRef.current;
    if (!panel) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    gsap.fromTo(
      panel,
      { opacity: 0, y: -4 },
      { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" }
    );
  }, [expanded]);

  return (
    <div
      className={`risk-row flex flex-col ${
        isLast ? "" : "border-b border-[#E2E8F0]"
      }`}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className={`grid items-center py-5 px-7 gap-4 cursor-pointer transition-colors hover:bg-[#F8FAFC] focus:bg-[#F8FAFC] outline-none ${
          expanded ? "bg-[#F8FAFC]" : ""
        }`}
        style={{ gridTemplateColumns: GRID_TEMPLATE_COLUMNS }}
        aria-label={`${expanded ? "Collapse" : "Expand"} ${risk.category} detail`}
      >
        <div>
          <RatingChip rating={risk.rating} size="sm" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-navy font-semibold text-[14px]/5 truncate">
            {risk.category}
            {risk.subCategory && (
              <span className="text-[#64748B] font-medium"> · {risk.subCategory}</span>
            )}
          </span>
          <div className="flex items-center gap-2 text-[11px]/4 text-[#64748B] min-w-0">
            <span className="truncate">
              {risk.evidencePrompts.length} prompts · {risk.milestones.length} milestones · {risk.progressPct}% progress
            </span>
            <span aria-hidden="true" className="shrink-0">·</span>
            <span className="shrink-0">
              <DeepLinkButton target={risk.deepLink} riskId={risk.id} variant="pill" />
            </span>
          </div>
        </div>
        <div>
          <TrendArrow trend={risk.trend} invert size={12} />
        </div>
        <div className="text-navy font-bold text-[14px]/5 tracking-[-0.2px]">
          {formatSeverity(risk.severityUsd)}
        </div>
        <div className="flex items-center gap-2">
          <div className="grow h-1.5 rounded-full bg-[#F8FAFC] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${risk.likelihoodPct}%`,
                backgroundColor:
                  risk.rating === "red"
                    ? "#E74C3C"
                    : risk.rating === "amber"
                      ? "#FF9F43"
                      : "#27AE60",
              }}
            />
          </div>
          <span className="text-navy text-[13px]/4 font-semibold w-8 text-right">
            {risk.likelihoodPct}%
          </span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[#475569] text-[13px]/4 truncate font-medium">
            {risk.owner.name}
          </span>
          <span className="text-[#64748B] text-[11px]/4 truncate">
            {risk.owner.role}
          </span>
        </div>
        <div className="text-[#475569] text-[13px]/4 font-medium">
          {formatDate(risk.nextReview)}
        </div>
        <ChevronIcon open={expanded} />
      </div>

      {expanded && (
        <div
          ref={panelRef}
          className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-7 py-7"
        >
          <ExpandPanel risk={risk} />
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <div className="flex items-center justify-center size-6 shrink-0">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        style={{
          transition: "transform 240ms ease",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function ExpandPanel({ risk }: { risk: Risk }) {
  // Default tab per risk type. Brand-Safety Misrecommendation defaults to
  // the recommendations tab since that's where the story lives.
  const defaultTab = risk.id === "risk-brand-safety-misrec" ? "recommendations" : "overview";
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const hasSentiment = (risk.sentimentSamples?.length ?? 0) > 0;
  const hasRecommendations = (risk.recommendationContexts?.length ?? 0) > 0;
  const hasHallucinations = (risk.hallucinationEvents?.length ?? 0) > 0;

  const tabs: RowTab[] = [
    { key: "overview", label: "Overview" },
    {
      key: "by-engine",
      label: "By engine",
      count: risk.engineBreakdown.length,
    },
    ...(hasSentiment
      ? [
          {
            key: "sentiment",
            label: "How AI talks about us",
            count: risk.sentimentSamples?.length,
          },
        ]
      : []),
    ...(hasRecommendations
      ? [
          {
            key: "recommendations",
            label: "What we're recommended for",
            count: risk.recommendationContexts?.length,
          },
        ]
      : []),
    ...(hasHallucinations
      ? [
          {
            key: "hallucinations",
            label: "Hallucination events",
            count: risk.hallucinationEvents?.length,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col gap-6">
      <RowTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && <OverviewTab risk={risk} />}
      {activeTab === "by-engine" && <EngineBreakdownPanel risk={risk} />}
      {activeTab === "sentiment" && <SentimentTab risk={risk} />}
      {activeTab === "recommendations" && <RecommendationTab risk={risk} />}
      {activeTab === "hallucinations" && <HallucinationsTab risk={risk} />}
    </div>
  );
}

function OverviewTab({ risk }: { risk: Risk }) {
  const chartData = useMemo(() => {
    const byTs: Record<string, { ts: string; total: number; n: number }> = {};
    for (const p of metricsTimeseries) {
      if (p.cluster !== risk.cluster) continue;
      const k = p.ts;
      if (!byTs[k]) byTs[k] = { ts: k, total: 0, n: 0 };
      byTs[k].total += p.citationSharePct;
      byTs[k].n += 1;
    }
    return Object.values(byTs)
      .sort((a, b) => a.ts.localeCompare(b.ts))
      .map((row) => ({
        quarter: formatQuarter(row.ts),
        share: Math.round(row.total / row.n),
      }));
  }, [risk.cluster]);

  const ratingStroke =
    risk.rating === "red"
      ? "#E74C3C"
      : risk.rating === "amber"
        ? "#FF9F43"
        : "#27AE60";

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between gap-3 rounded-xl bg-white border border-[#E2E8F0] p-4 flex-wrap">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="uppercase tracking-[0.08em] text-navy font-bold text-[10px]/4">
            Owned by {risk.deepLink.label}
          </span>
          <span className="text-[#475569] text-[12px]/[1.5]">{risk.deepLink.reason}</span>
        </div>
        <DeepLinkButton target={risk.deepLink} riskId={risk.id} variant="cta" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <SectionLabel>Diagnosis</SectionLabel>
            <MethodologyPanel spec={risk.methodology} title={risk.category} />
          </div>
          <Markdown className="text-[14px]/[1.7]">{risk.narrative}</Markdown>
        </div>
        <div className="flex flex-col gap-2">
          <SectionLabel>Citation share on this cluster</SectionLabel>
          <div className="rounded-xl bg-white border border-[#E2E8F0] p-4 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="quarter"
                  tick={{ fontSize: 10, fill: "#8792A2" }}
                  axisLine={{ stroke: "#E6EBF1" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#8792A2" }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E6EBF1",
                    fontSize: 11,
                  }}
                  formatter={(v) => [`${v}%`, "Share"]}
                />
                <Line
                  type="monotone"
                  dataKey="share"
                  stroke={ratingStroke}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <SectionLabel>Evidence from AI engines</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {risk.evidencePrompts.map((e) => (
            <EvidencePromptCard key={e.id} prompt={e} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <SectionLabel>Milestones ({risk.milestones.length})</SectionLabel>
        <div className="flex flex-col gap-2">
          {risk.milestones.map((m) => (
            <MilestoneRow key={m.id} milestone={m} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HallucinationsTab({ risk }: { risk: Risk }) {
  const events = risk.hallucinationEvents ?? [];
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Open and recent hallucination events ({events.length})</SectionLabel>
      <div className="flex flex-col gap-2">
        {events.map((e) => (
          <HallucinationEventRow key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}

function HallucinationEventRow({ event }: { event: HallucinationEvent }) {
  const sevConfig = {
    cosmetic: { bg: "#F0FDF4", text: "#166534" },
    moderate: { bg: "#FEF3C7", text: "#92400E" },
    material: { bg: "#FFF1F2", text: "#9F1239" },
  }[event.severity];

  const statusConfig = {
    open: { label: "Open", color: "#E74C3C" },
    mitigated: { label: "Mitigated", color: "#FF9F43" },
    resolved: { label: "Resolved", color: "#27AE60" },
  }[event.status];

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px]/4 font-bold uppercase tracking-[0.08em]"
            style={{ backgroundColor: sevConfig.bg, color: sevConfig.text }}
          >
            {event.severity}
          </span>
          <span className="rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 text-[10px]/4 text-[#475569] font-bold uppercase tracking-[0.08em]">
            {ENGINE_LABEL[event.engine] ?? event.engine}
          </span>
          <span
            className="inline-flex items-center gap-1 text-[11px]/4 font-semibold"
            style={{ color: statusConfig.color }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: statusConfig.color }}
            />
            {statusConfig.label}
          </span>
        </div>
        <span className="text-[11px]/4 text-[#64748B]">
          {formatDate(event.detectedAt)}
        </span>
      </div>
      <span className="text-[11px]/4 text-[#64748B]">
        Prompt: &ldquo;{event.prompt}&rdquo;
      </span>
      <span className="text-navy font-medium text-[13px]/5">
        {event.invention}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
      {children}
    </span>
  );
}

function EvidencePromptCard({ prompt }: { prompt: EvidencePrompt }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-navy font-semibold text-[13px]/4 truncate">
          &ldquo;{prompt.prompt}&rdquo;
        </span>
        <span className="rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 text-[10px]/4 text-[#475569] font-bold uppercase tracking-[0.08em] shrink-0">
          {ENGINE_LABEL[prompt.engine] ?? prompt.engine}
        </span>
      </div>
      <div className="flex items-center gap-2 text-[11px]/4 text-[#64748B]">
        <span>
          Your rank:{" "}
          <span
            className={
              prompt.yourCitationRank === null
                ? "text-danger font-semibold"
                : "text-navy font-semibold"
            }
          >
            {prompt.yourCitationRank ?? "Not cited"}
          </span>
        </span>
        {prompt.topCompetitor && (
          <>
            <span>·</span>
            <span>
              Top: <span className="text-navy font-semibold">{prompt.topCompetitor}</span>
            </span>
          </>
        )}
      </div>
      <p className="m-0 text-[13px]/[1.6] text-[#475569] italic">
        &ldquo;{prompt.snippet}&rdquo;
      </p>
    </div>
  );
}

function MilestoneRow({ milestone }: { milestone: Milestone }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 flex items-center gap-3">
      <div className="grow flex flex-col gap-1 min-w-0">
        <span className="text-navy font-semibold text-[13px]/4 truncate">
          {milestone.title}
        </span>
        <div className="flex items-center gap-2 text-[11px]/4 text-[#64748B]">
          <span>{milestone.owner.name}</span>
          <span>·</span>
          <span>Due {formatDate(milestone.dueDate)}</span>
        </div>
      </div>
      <select
        className="rounded-md border border-[#E2E8F0] bg-white py-1 px-2 text-[11px]/4 text-[#475569] font-semibold cursor-pointer hover:border-[#64748B]"
        defaultValue={milestone.status}
        onChange={(e) =>
          console.log("ACTION: update_milestone_status", {
            milestoneId: milestone.id,
            status: e.target.value,
          })
        }
        aria-label={`Status for ${milestone.title}`}
      >
        {(Object.keys(STATUS_LABEL) as MilestoneStatus[]).map((k) => (
          <option key={k} value={k}>
            {STATUS_LABEL[k]}
          </option>
        ))}
      </select>
    </div>
  );
}
