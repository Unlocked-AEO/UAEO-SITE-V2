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

        <div className="px-6 py-4 border-t border-border-light bg-[#FAFBFC]">
          <label className="block mb-2 text-navy font-semibold text-[13px]/4">
            Feedback for the next iteration
          </label>
          <div className="flex items-start gap-3">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g. make it more technical, add a section on pricing, the tone is too casual..."
              className="flex-1 rounded-lg border border-border-input bg-white px-3.5 py-2.5 text-[13px]/5 text-slate-text placeholder:text-slate-muted focus:outline-none focus:border-teal min-h-20 resize-y"
            />
            <div className="flex flex-col gap-2">
              <Button variant="dark" size="sm" onClick={handleRegenerate}>
                Regenerate
              </Button>
              <Button variant="primary" size="sm" onClick={onApprove}>
                Approve →
              </Button>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 rounded-md bg-white border border-border-light p-0.5">
              <button
                onClick={() => setMode("refine")}
                className={`rounded-sm px-2 py-1 text-[11px]/3 font-semibold cursor-pointer ${
                  mode === "refine" ? "bg-teal text-white" : "bg-transparent text-slate-muted"
                }`}
              >
                Refine
              </button>
              <button
                onClick={() => setMode("new-base")}
                className={`rounded-sm px-2 py-1 text-[11px]/3 font-semibold cursor-pointer ${
                  mode === "new-base" ? "bg-teal text-white" : "bg-transparent text-slate-muted"
                }`}
              >
                New base
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Make it more technical",
                "Shorten by 30%",
                "Add a pricing section",
                "More citations",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setFeedback((f) => (f ? f + " · " : "") + suggestion)}
                  className="rounded-md px-2 py-1 bg-white border border-border-light text-slate-body text-[11px]/3 hover:border-teal hover:text-teal cursor-pointer transition-colors"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
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

