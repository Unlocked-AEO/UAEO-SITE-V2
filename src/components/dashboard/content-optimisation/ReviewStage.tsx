import { useState } from "react";
import { mockDraft, iterationHistory, totalAEOScore } from "@/data/mock-content-optimisation";
import { AEOScoreCard } from "./AEOScoreCard";
import { AIDisclaimer } from "./AIDisclaimer";
import { Button } from "@/components/ui/Button";

interface ReviewStageProps {
  onApprove: () => void;
  onRegenerate: (feedback: string) => void;
}

export function ReviewStage({ onApprove, onRegenerate }: ReviewStageProps) {
  const [feedback, setFeedback] = useState("");

  const handleRegenerate = () => {
    if (!feedback.trim()) return;
    console.log("ACTION: content_regenerate", { feedback });
    onRegenerate(feedback);
    setFeedback("");
  };

  return (
    <div className="grid grid-cols-[1fr_360px] gap-5">
      {/* Draft */}
      <div className="rounded-xl bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
          <div>
            <div className="text-navy font-semibold text-[15px]/5">Draft v{iterationHistory.length}</div>
            <div className="mt-0.5 text-slate-muted text-[11px]/4">
              Generated · iteration {iterationHistory.length} of unlimited · scored {totalAEOScore}/100
            </div>
          </div>
          <button
            onClick={() => console.log("ACTION: content_view_history")}
            className="text-teal text-[12px]/4 font-semibold bg-transparent border-none cursor-pointer hover:opacity-80"
          >
            View iterations →
          </button>
        </div>

        <div className="p-7 max-h-[640px] overflow-y-auto">
          <DraftRenderer markdown={mockDraft} />
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
              <Button variant="primary" size="sm" onClick={() => {
                console.log("ACTION: content_approve");
                onApprove();
              }}>
                Approve →
              </Button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
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

      {/* Score Sidebar */}
      <div className="flex flex-col gap-5">
        <AEOScoreCard />

        <div className="rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
          <div className="mb-3 text-navy text-[13px]/4 font-semibold">Iteration history</div>
          <div className="flex flex-col gap-2.5">
            {iterationHistory.map((it) => (
              <div key={it.version} className="flex items-start gap-3 rounded-lg bg-[#FAFBFC] p-2.5">
                <div className="flex items-center justify-center shrink-0 rounded-full size-6 bg-white border border-border-light text-navy text-[11px] font-semibold">
                  v{it.version}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-navy text-[12px]/4 font-semibold">Score {it.score}</span>
                    <span className="text-slate-muted text-[10px]/4">{it.timestamp}</span>
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

// Lightweight markdown renderer — enough for the demo draft
function DraftRenderer({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const elements: JSX.Element[] = [];
  let listBuffer: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = (key: number) => {
    if (!listBuffer.length || !listType) return;
    const items = listBuffer.map((line, i) => (
      <li key={i} className="text-slate-body text-[14px]/6">{renderInline(line)}</li>
    ));
    elements.push(
      listType === "ul" ? (
        <ul key={`list-${key}`} className="my-3 pl-5 list-disc flex flex-col gap-1.5">{items}</ul>
      ) : (
        <ol key={`list-${key}`} className="my-3 pl-5 list-decimal flex flex-col gap-1.5">{items}</ol>
      ),
    );
    listBuffer = [];
    listType = null;
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    if (line.startsWith("# ")) {
      flushList(i);
      elements.push(<h1 key={i} className="mt-2 mb-3 text-navy font-semibold text-[22px]/7 tracking-[-0.3px]">{line.slice(2)}</h1>);
    } else if (line.startsWith("## ")) {
      flushList(i);
      elements.push(<h2 key={i} className="mt-6 mb-2 text-navy font-semibold text-[17px]/6">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      flushList(i);
      elements.push(<h3 key={i} className="mt-4 mb-1.5 text-navy font-semibold text-[14px]/5">{line.slice(4)}</h3>);
    } else if (/^\d+\.\s/.test(line)) {
      if (listType !== "ol") flushList(i);
      listType = "ol";
      listBuffer.push(line.replace(/^\d+\.\s/, ""));
    } else if (line.startsWith("- ")) {
      if (listType !== "ul") flushList(i);
      listType = "ul";
      listBuffer.push(line.slice(2));
    } else if (line === "") {
      flushList(i);
    } else {
      flushList(i);
      elements.push(<p key={i} className="my-2 text-slate-body text-[14px]/6">{renderInline(line)}</p>);
    }
  });
  flushList(lines.length);

  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-navy font-semibold">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}
