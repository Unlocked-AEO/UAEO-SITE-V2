import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  libraryItems,
  libraryStatusConfig,
  formatOptions,
  type LibraryItem,
  type LibraryStatus,
} from "@/data/mock-content-optimisation";
import { Button } from "@/components/ui/Button";

type StatusFilter = "all" | LibraryStatus;
type SortMode = "recent" | "score-high" | "score-low";

interface ContentLibraryProps {
  onNewContent: () => void;
  onOpenItem: (item: LibraryItem) => void;
}

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "approved", label: "Approved" },
  { value: "in-review", label: "In Review" },
  { value: "draft", label: "Drafts" },
  { value: "archived", label: "Archived" },
];

export function ContentLibrary({ onNewContent, onOpenItem }: ContentLibraryProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortMode>("recent");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let items = libraryItems.filter((it) => {
      if (status !== "all" && it.status !== status) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = `${it.title} ${it.tags.join(" ")} ${it.excerpt}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "score-high") items = [...items].sort((a, b) => b.score - a.score);
    if (sort === "score-low") items = [...items].sort((a, b) => a.score - b.score);
    return items;
  }, [search, status, sort]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".lib-card", {
        y: 16,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05,
      });
    }, gridRef);
    return () => ctx.revert();
  }, [filtered.length]);

  const stats = useMemo(() => {
    const approved = libraryItems.filter((i) => i.status === "approved");
    const avgScore =
      approved.length > 0
        ? Math.round(approved.reduce((s, i) => s + i.score, 0) / approved.length)
        : 0;
    return {
      total: libraryItems.length,
      approved: approved.length,
      avgScore,
      totalWords: libraryItems.reduce((s, i) => s + i.wordCount, 0),
    };
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total pieces" value={String(stats.total)} />
        <StatCard label="Approved" value={String(stats.approved)} accent="teal" />
        <StatCard label="Avg AEO score" value={`${stats.avgScore}/100`} accent="teal" />
        <StatCard label="Total words" value={stats.totalWords.toLocaleString()} />
      </div>

      {/* Toolbar */}
      <div className="rounded-xl py-4 px-5 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-60">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, tag or content..."
              className="w-full rounded-lg border border-border-input bg-white px-3.5 py-2 text-[13px]/5 text-slate-text placeholder:text-slate-muted focus:outline-none focus:border-teal"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-[#F5F8FB] p-1">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatus(f.value)}
                className={`rounded-md px-3 py-1.5 text-[12px]/4 font-semibold cursor-pointer transition-colors ${
                  status === f.value
                    ? "bg-white text-navy shadow-sm"
                    : "bg-transparent text-slate-muted hover:text-slate-body"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="rounded-lg border border-border-input bg-white px-3 py-2 text-[12px]/4 text-slate-text cursor-pointer focus:outline-none focus:border-teal"
          >
            <option value="recent">Most recent</option>
            <option value="score-high">Score: high to low</option>
            <option value="score-low">Score: low to high</option>
          </select>

          <Button variant="primary" size="sm" onClick={onNewContent}>
            + New content
          </Button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl py-16 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F] text-center">
          <div className="text-navy font-semibold text-base/6">No matches</div>
          <p className="mt-1 text-slate-muted text-[13px]/5">
            Try a different search or clear the filter.
          </p>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-2 gap-4">
          {filtered.map((item) => (
            <LibraryCard key={item.id} item={item} onOpen={() => onOpenItem(item)} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "teal";
}) {
  return (
    <div className="rounded-xl py-4 px-5 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="text-slate-muted text-[11px]/4 uppercase tracking-[0.4px] font-semibold">
        {label}
      </div>
      <div className={`mt-1.5 font-semibold text-2xl/8 tracking-[-0.3px] ${accent === "teal" ? "text-teal" : "text-navy"}`}>
        {value}
      </div>
    </div>
  );
}

function LibraryCard({ item, onOpen }: { item: LibraryItem; onOpen: () => void }) {
  const statusCfg = libraryStatusConfig[item.status];
  const formatLabel = formatOptions.find((f) => f.value === item.format)?.label ?? item.format;
  const scoreColor =
    item.score >= 85 ? "text-teal" : item.score >= 75 ? "text-warning" : "text-danger";

  return (
    <div className="lib-card flex flex-col rounded-xl bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F] hover:border-teal/40 hover:shadow-[0px_4px_12px_#0A254014] transition-all">
      <div className="flex items-center justify-between px-5 pt-4 pb-2.5">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${statusCfg.bg} ${statusCfg.text} text-[10px] uppercase tracking-[0.4px] font-semibold`}>
            <span className={`size-1.5 rounded-full ${statusCfg.dot}`} />
            {statusCfg.label}
          </span>
          <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-[#F0F4F8] text-slate-body text-[10px] uppercase tracking-[0.4px] font-semibold">
            {item.mode === "generate" ? "Generated" : "Optimized"}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`font-semibold text-[15px]/4 ${scoreColor}`}>{item.score}</span>
          <span className="text-slate-muted text-[10px]/3">/100</span>
        </div>
      </div>

      <button
        onClick={onOpen}
        className="flex flex-col items-start flex-1 text-left px-5 pb-3 bg-transparent border-none cursor-pointer"
      >
        <div className="text-navy font-semibold text-[15px]/5 mb-1.5">{item.title}</div>
        <p className="text-slate-muted text-[12px]/5 line-clamp-2">{item.excerpt}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-md px-2 py-0.5 bg-[#F5F8FB] text-slate-body text-[10px]/3"
            >
              {t}
            </span>
          ))}
        </div>
      </button>

      <div className="flex items-center justify-between px-5 py-3 border-t border-border-light">
        <div className="flex items-center gap-3 text-slate-muted text-[11px]/4">
          <span>{formatLabel}</span>
          <span className="size-0.5 rounded-full bg-slate-muted" />
          <span>{item.wordCount.toLocaleString()} words</span>
          <span className="size-0.5 rounded-full bg-slate-muted" />
          <span>{item.updatedAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <IconButton
            label="Copy"
            onClick={(e) => {
              e.stopPropagation();
              console.log("ACTION: library_copy", { id: item.id });
            }}
          >
            ⧉
          </IconButton>
          <IconButton
            label="Download"
            onClick={(e) => {
              e.stopPropagation();
              console.log("ACTION: library_download", { id: item.id });
            }}
          >
            ↓
          </IconButton>
          <IconButton
            label="More"
            onClick={(e) => {
              e.stopPropagation();
              console.log("ACTION: library_more", { id: item.id });
            }}
          >
            ⋯
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="flex items-center justify-center size-7 rounded-md bg-transparent border-none cursor-pointer text-slate-muted hover:bg-[#F5F8FB] hover:text-navy transition-colors text-base/4"
    >
      {children}
    </button>
  );
}
