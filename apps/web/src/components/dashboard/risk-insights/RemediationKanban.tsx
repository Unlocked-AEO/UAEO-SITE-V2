import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useRiskInsights } from "./useRiskInsights";
import type {
  Milestone,
  MilestoneStatus,
  Rating,
} from "@/data/mock-risk-insights";

const COLUMNS: { key: MilestoneStatus; label: string; description: string }[] = [
  { key: "plan", label: "Plan", description: "Scoped, not yet started" },
  { key: "execute", label: "Execute", description: "In-flight work" },
  { key: "measure", label: "Measure", description: "Shipping, watching impact" },
  { key: "review", label: "Review", description: "Wrap-up and learnings" },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function initials(name: string): string {
  const parts = name.split(" ");
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

// Brand-softer pill backgrounds (matches RatingChip pill tones).
function ratingBg(rating: Rating): string {
  return rating === "red" ? "#FFF1F2" : rating === "amber" ? "#FEF3C7" : "#F0FDF4";
}

function ratingPillText(rating: Rating): string {
  return rating === "red" ? "#9F1239" : rating === "amber" ? "#92400E" : "#166534";
}

export function RemediationKanban() {
  const { risks } = useRiskInsights();

  // Flatten milestones across risks and hold local state so status changes move cards.
  const seeded = useMemo<Milestone[]>(
    () => risks.flatMap((r) => r.milestones),
    [risks]
  );
  const [items, setItems] = useState<Milestone[]>(seeded);

  function updateStatus(id: string, next: MilestoneStatus) {
    setItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: next } : m))
    );
    console.log("ACTION: update_milestone_status", { milestoneId: id, status: next });
  }

  return (
    <section id="remediation" className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex flex-col gap-1.5">
        <h2 className="tracking-[-0.3px] text-navy font-bold text-2xl/[30px] m-0">Remediation</h2>
        <span className="text-[13px]/5 text-[#64748B]">
          {items.length} milestones across all risks · move cards between columns as work progresses
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {COLUMNS.map((col) => {
          const columnItems = items.filter((m) => m.status === col.key);
          return (
            <KanbanColumn
              key={col.key}
              column={col}
              items={columnItems}
              onChangeStatus={updateStatus}
            />
          );
        })}
      </div>
    </section>
  );
}

function KanbanColumn({
  column,
  items,
  onChangeStatus,
}: {
  column: (typeof COLUMNS)[number];
  items: Milestone[];
  onChangeStatus: (id: string, next: MilestoneStatus) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 min-h-[220px]">
      <div className="flex items-center justify-between px-1 pb-1">
        <div className="flex flex-col gap-0.5">
          <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">{column.label}</span>
          <span className="text-[11px]/4 text-[#64748B]">{column.description}</span>
        </div>
        <span className="rounded-full bg-white border border-[#E2E8F0] px-2 py-0.5 text-[11px]/4 text-[#475569] font-semibold">
          {items.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#CBD5E1] py-8 text-center">
            <span className="text-[#64748B] text-[12px]/4">
              No items in {column.label}
            </span>
          </div>
        )}
        {items.map((m) => (
          <KanbanCard
            key={m.id}
            milestone={m}
            onChangeStatus={onChangeStatus}
          />
        ))}
      </div>
    </div>
  );
}

function KanbanCard({
  milestone,
  onChangeStatus,
}: {
  milestone: Milestone;
  onChangeStatus: (id: string, next: MilestoneStatus) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prevStatus = useRef(milestone.status);

  useEffect(() => {
    if (prevStatus.current === milestone.status) return;
    prevStatus.current = milestone.status;
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    gsap.fromTo(
      el,
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, ease: "back.out(1.4)" }
    );
  }, [milestone.status]);

  return (
    <div
      ref={ref}
      className="rounded-xl bg-white border border-[#E2E8F0] p-3.5 flex flex-col gap-2.5 shadow-[0_1px_3px_rgba(10,37,64,0.04)]"
    >
      <span
        className="self-start inline-flex items-center rounded-full py-1 px-2.5 text-[10px]/3.5 font-bold uppercase tracking-[0.08em]"
        style={{
          color: ratingPillText(milestone.riskRating),
          backgroundColor: ratingBg(milestone.riskRating),
        }}
      >
        {milestone.riskCategory}
      </span>
      <span className="text-navy font-semibold text-[13px]/5">
        {milestone.title}
      </span>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="flex items-center justify-center shrink-0 size-6 rounded-full text-white text-[10px]/3 font-semibold uppercase"
            style={{ backgroundColor: "var(--color-accent-active)" }}
          >
            {initials(milestone.owner.name)}
          </div>
          <span className="text-[#64748B] text-[11px]/4 truncate">
            {formatDate(milestone.dueDate)}
          </span>
        </div>
        <select
          className="rounded-md border border-[#E2E8F0] bg-white py-0.5 px-1.5 text-[10px]/3.5 text-[#475569] font-semibold cursor-pointer hover:border-[#64748B]"
          value={milestone.status}
          onChange={(e) =>
            onChangeStatus(milestone.id, e.target.value as MilestoneStatus)
          }
          aria-label={`Status for ${milestone.title}`}
        >
          {COLUMNS.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
