import { useState } from "react";
import type { AEOSignal, IterationEntry } from "@/data/mock-content-optimisation";
import type { SourceRef } from "@/lib/api/sse";
import { AEOScoreCard } from "./AEOScoreCard";
import { AIDisclaimer } from "./AIDisclaimer";
import { SourcesCard } from "./SourcesCard";
import { Button } from "@/components/ui/Button";
import { Markdown } from "@/components/ui/Markdown";

interface ReviewStageProps {
  draftId: string;
  markdown: string;
  signals: AEOSignal[];
  totalScore: number;
  iterations: IterationEntry[];
  sources: SourceRef[];
  onApprove: () => void;
  onRegenerate: (feedback: string, mode: "refine" | "new-base") => void;
}

export function ReviewStage({
  markdown,
  signals,
  totalScore,
  iterations,
  sources,
  onApprove,
  onRegenerate,
}: ReviewStageProps) {
  const [feedback, setFeedback] = useState("");
  const [mode, setMode] = useState<"refine" | "new-base">("refine");

  const handleRegenerate = () => {
    if (!feedback.trim()) return;
    onRegenerate(feedback, mode);
    setFeedback("");
  };

  return (
    <div className="grid grid-cols-[1fr_360px] gap-5">
      {/* Draft */}
      <div className="rounded-xl bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
          <div>
            <div className="text-navy font-semibold text-[15px]/5">Draft v{iterations.length || 1}</div>
            <div className="mt-0.5 text-slate-muted text-[11px]/4">
              Generated · iteration {iterations.length || 1} of unlimited · scored {totalScore}/100
            </div>
          </div>
        </div>

        <div className="p-7 max-h-[640px] overflow-y-auto">
          <Markdown>{markdown}</Markdown>
        </div>

        <div className="px-6 py-3 border-t border-border-light">
          <AIDisclaimer />
        </div>

        <div className="px-5 py-4 border-t border-border-light bg-gradient-to-b from-[#FAFBFC] to-white">
          {/* Section heading */}
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <h3 className="text-navy font-semibold text-[14px]/5 m-0">Iterate on this draft</h3>
              <p className="mt-0.5 text-slate-muted text-[11px]/4">
                Pick a mode, then tell the engine what to change.
              </p>
            </div>
            <span className="text-slate-muted text-[10px]/4 uppercase tracking-[0.4px] font-semibold">
              v{iterations.length || 1} → v{(iterations.length || 1) + 1}
            </span>
          </div>
          {/* Prominent mode switch — Refine vs Start fresh */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => setMode("refine")}
              className={`flex items-start gap-2.5 rounded-xl px-3.5 py-2.5 border text-left cursor-pointer transition-all ${
                mode === "refine"
                  ? "border-teal bg-teal/5 shadow-[0_0_0_3px_rgba(22,184,185,0.1)]"
                  : "border-border-light bg-white hover:border-slate-muted/40"
              }`}
            >
              <span
                className={`mt-0.5 inline-flex items-center justify-center size-4 rounded-full border-2 shrink-0 ${
                  mode === "refine" ? "border-teal bg-teal" : "border-border-input bg-white"
                }`}
              >
                {mode === "refine" && <span className="size-1.5 rounded-full bg-white" />}
              </span>
              <span className="min-w-0">
                <span className="block text-navy font-semibold text-[13px]/4">Refine</span>
                <span className="mt-0.5 block text-slate-muted text-[11px]/4">
                  Keep this draft, apply your notes
                </span>
              </span>
            </button>
            <button
              onClick={() => setMode("new-base")}
              className={`flex items-start gap-2.5 rounded-xl px-3.5 py-2.5 border text-left cursor-pointer transition-all ${
                mode === "new-base"
                  ? "border-teal bg-teal/5 shadow-[0_0_0_3px_rgba(22,184,185,0.1)]"
                  : "border-border-light bg-white hover:border-slate-muted/40"
              }`}
            >
              <span
                className={`mt-0.5 inline-flex items-center justify-center size-4 rounded-full border-2 shrink-0 ${
                  mode === "new-base" ? "border-teal bg-teal" : "border-border-input bg-white"
                }`}
              >
                {mode === "new-base" && <span className="size-1.5 rounded-full bg-white" />}
              </span>
              <span className="min-w-0">
                <span className="block text-navy font-semibold text-[13px]/4">Start fresh</span>
                <span className="mt-0.5 block text-slate-muted text-[11px]/4">
                  Rewrite from scratch with your notes
                </span>
              </span>
            </button>
          </div>

          {/* Composer shell — textarea with action bar */}
          <div className="rounded-xl border border-border-light bg-white shadow-[0_1px_2px_rgba(10,37,64,0.04)] focus-within:border-teal focus-within:shadow-[0_0_0_3px_rgba(22,184,185,0.12)] transition-all">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleRegenerate();
                }
              }}
              placeholder="What should change? e.g. Tighten the intro, add a pricing comparison, swap the tone…"
              className="block w-full bg-transparent px-3.5 py-2.5 text-[13px]/5 text-slate-text placeholder:text-slate-muted focus:outline-none min-h-[64px] resize-none"
            />

            <div className="flex items-center justify-between gap-2 px-2.5 pb-2 pt-0.5">
              <div className="flex flex-wrap gap-1 min-w-0">
                {[
                  { label: "More technical", icon: "⚙" },
                  { label: "Shorten 30%", icon: "✂" },
                  { label: "Add pricing", icon: "$" },
                  { label: "More citations", icon: "❝" },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setFeedback((f) => (f ? f + " · " : "") + s.label)}
                    className="group inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-[#F3F5F8] text-slate-body text-[10px]/3 hover:bg-teal/10 hover:text-teal cursor-pointer transition-colors"
                  >
                    <span className="text-slate-muted group-hover:text-teal">{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden md:block text-slate-muted text-[10px]/3 tabular-nums">⌘+↵</span>
                <Button variant="dark" size="sm" onClick={handleRegenerate}>
                  Regenerate
                </Button>
              </div>
            </div>
          </div>

          {/* Approve CTA */}
          <div className="mt-2.5 flex items-center justify-between">
            <p className="text-slate-muted text-[11px]/4">
              Happy with this draft? Approve it to move to Output.
            </p>
            <Button variant="primary" size="sm" onClick={onApprove}>
              Approve draft →
            </Button>
          </div>
        </div>
      </div>

      {/* Score Sidebar */}
      <div className="flex flex-col gap-5">
        <AEOScoreCard signals={signals} totalScore={totalScore} />

        <SourcesCard sources={sources} />

        <div className="rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
          <div className="mb-3 text-navy text-[13px]/4 font-semibold">Iteration history</div>
          <div className="flex flex-col gap-2.5">
            {iterations.length === 0 ? (
              <div className="text-slate-muted text-[12px]/4">No iterations yet.</div>
            ) : iterations.map((it) => (
              <div key={it.version} className="flex items-start gap-3 rounded-lg bg-[#FAFBFC] p-2.5">
                <div className="flex items-center justify-center shrink-0 rounded-full size-6 bg-white border border-border-light text-navy text-[11px] font-semibold">
                  v{it.version}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-navy text-[12px]/4 font-semibold">Score {it.score}</span>
                    <span className="text-slate-muted text-[10px]/4">{relTime(it.timestamp)}</span>
                  </div>
                  {it.feedback && (
                    <p className="mt-0.5 text-slate-muted text-[11px]/4 truncate">
                      "{it.feedback}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function relTime(ts: string) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return ts;
  const mins = Math.floor((Date.now() - d.getTime()) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return d.toLocaleDateString();
}

