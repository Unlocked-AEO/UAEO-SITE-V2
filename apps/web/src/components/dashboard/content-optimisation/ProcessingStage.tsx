import { useEffect, useMemo, useRef, useState } from "react";
import { streamJob, type DoneEvent, type StageKey } from "@/lib/api/sse";

interface ProcessingStageProps {
  jobId: string | null;
  onComplete: (done: DoneEvent) => void;
  onError?: (message: string) => void;
}

// Stage labels + dynamic substatus copy. The orchestrator emits these
// keys in order; we re-enter the loop on auto-iterate, which we detect
// by seeing the same key go `active` again after it had completed.
const stageMeta: Record<StageKey, { label: string; live: string; done: string }> = {
  entity: {
    label: "Ingesting sources",
    live: "Fetching URLs and parsing uploads…",
    done: "Sources ingested",
  },
  citation: {
    label: "Drafting",
    live: "Streaming response token by token…",
    done: "Initial draft complete",
  },
  structure: {
    label: "Restructuring for AEO",
    live: "Layering citations, reshaping headers…",
    done: "Structure pass complete",
  },
  authority: {
    label: "Authority pass",
    live: "Strengthening trust signals…",
    done: "Authority pass complete",
  },
  score: {
    label: "Scoring",
    live: "Judging entity clarity and topical depth…",
    done: "Scored",
  },
};
const stageOrder: StageKey[] = ["entity", "citation", "structure", "authority", "score"];

interface StageState {
  status: "pending" | "active" | "complete";
  startedAt?: number;
  completedAt?: number;
}

interface IterationLog {
  version: number;
  score: number;
  auto: boolean;
}

const PREVIEW_TAIL_CHARS = 240;

export function ProcessingStage({ jobId, onComplete, onError }: ProcessingStageProps) {
  const [stages, setStages] = useState<Record<StageKey, StageState>>(() => initialStages());
  const [pass, setPass] = useState(1);
  const [iterations, setIterations] = useState<IterationLog[]>([]);
  const [previewText, setPreviewText] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const draftBufferRef = useRef("");

  // Tick clock once a second so the elapsed counter updates. Stops on unmount.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!jobId) return;
    setStages(initialStages());
    setPass(1);
    setIterations([]);
    setPreviewText("");
    setWarnings([]);
    draftBufferRef.current = "";

    const close = streamJob(jobId, {
      onStage: ({ key, status }) => {
        setStages(prev => {
          // Detect re-entry to the same stage in a later pass: if `entity`
          // or `citation` go `active` again after `score` completed,
          // we're starting auto-iterate pass 2 — reset all stages.
          if (status === "active" && prev[key].status === "complete") {
            const fresh = initialStages();
            fresh[key] = { status: "active", startedAt: Date.now() };
            return fresh;
          }
          const next = { ...prev };
          if (status === "active") {
            next[key] = { ...next[key], status: "active", startedAt: Date.now() };
          } else if (status === "complete") {
            next[key] = { ...next[key], status: "complete", completedAt: Date.now() };
          }
          return next;
        });
      },
      onDraftDelta: ({ text }) => {
        draftBufferRef.current += text;
        setPreviewText(draftBufferRef.current.slice(-PREVIEW_TAIL_CHARS));
      },
      onIteration: (e) => {
        setIterations(prev => [...prev, e]);
        if (e.auto) setPass(e.version + 1);
        // Reset the streaming buffer for the next pass.
        draftBufferRef.current = "";
        setPreviewText("");
      },
      onWarning: ({ message }) => setWarnings(w => [...w, message]),
      onDone: (done) => onComplete(done),
      onError: (err) => onError?.(err.message),
    });
    return close;
  }, [jobId, onComplete, onError]);

  const elapsedSec = Math.max(0, Math.floor((now - startedAt) / 1000));
  const activeKey = useMemo(
    () => stageOrder.find(k => stages[k].status === "active"),
    [stages],
  );
  const activeMeta = activeKey ? stageMeta[activeKey] : null;

  return (
    <div className="rounded-xl py-8 px-8 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="relative size-2.5">
                <div className="absolute inset-0 rounded-full bg-teal animate-ping opacity-75" />
                <div className="absolute inset-0 rounded-full bg-teal" />
              </div>
              <span className="text-teal font-semibold text-[11px] uppercase tracking-[0.4px]">
                Processing · pass {pass} of 2
              </span>
            </div>
            <div className="text-navy font-semibold text-lg/6">
              {activeMeta ? activeMeta.label : "Preparing pipeline"}
            </div>
            <p className="mt-0.5 text-slate-muted text-[13px]/5">
              {activeMeta ? activeMeta.live : "Initialising orchestrator…"}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-navy font-semibold text-2xl/7 tracking-[-0.3px] tabular-nums">
              {formatElapsed(elapsedSec)}
            </div>
            <div className="text-slate-muted text-[11px]/4 uppercase tracking-[0.4px]">
              elapsed
            </div>
          </div>
        </div>

        {/* Pipeline steps */}
        <div className="flex flex-col gap-2">
          {stageOrder.map((key, i) => {
            const meta = stageMeta[key];
            const state = stages[key];
            const isActive = state.status === "active";
            const isDone = state.status === "complete";
            const ms = state.completedAt && state.startedAt ? state.completedAt - state.startedAt : null;
            return (
              <div
                key={key}
                className={`flex items-center gap-3 rounded-lg p-3 border transition-colors ${
                  isActive
                    ? "border-teal bg-teal/5"
                    : isDone
                    ? "border-border-light bg-white"
                    : "border-border-light bg-[#FAFBFC]"
                }`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 rounded-full size-6 text-[11px] font-semibold ${
                    isDone
                      ? "bg-teal text-white"
                      : isActive
                      ? "bg-white border-2 border-teal text-teal"
                      : "bg-[#F0F4F8] text-slate-muted"
                  }`}
                >
                  {isDone ? "✓" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[13px]/4 font-semibold ${isActive || isDone ? "text-navy" : "text-slate-muted"}`}>
                    {meta.label}
                  </div>
                  <div className="text-slate-muted text-[11px]/4 truncate">
                    {isActive ? meta.live : isDone ? meta.done : "Queued"}
                  </div>
                </div>
                {isDone && ms !== null && (
                  <div className="text-slate-muted text-[11px]/4 tabular-nums shrink-0">
                    {(ms / 1000).toFixed(1)}s
                  </div>
                )}
                {isActive && (
                  <div className="flex items-center gap-1 shrink-0">
                    <div className="size-1 rounded-full bg-teal animate-bounce [animation-delay:-0.3s]" />
                    <div className="size-1 rounded-full bg-teal animate-bounce [animation-delay:-0.15s]" />
                    <div className="size-1 rounded-full bg-teal animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live preview tail — only meaningful while Claude is streaming */}
        {previewText && (
          <div className="mt-5 rounded-lg border border-border-light bg-[#FAFBFC] p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-slate-muted text-[10px] uppercase tracking-[0.4px] font-semibold">
                Live preview
              </div>
              <div className="text-slate-muted text-[10px]">tail · streaming</div>
            </div>
            <div className="relative max-h-24 overflow-hidden text-slate-body text-[12px]/5 font-mono whitespace-pre-wrap break-words">
              {previewText}
              <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#FAFBFC] to-transparent pointer-events-none" />
            </div>
          </div>
        )}

        {/* Iteration history (auto passes shown as chips) */}
        {iterations.length > 0 && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-slate-muted text-[11px]/4 uppercase tracking-[0.4px] font-semibold">
              Auto passes:
            </span>
            {iterations.map(it => (
              <span
                key={it.version}
                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px]/4 font-semibold ${
                  it.score >= 80 ? "bg-teal/10 text-teal" : "bg-warning/10 text-warning"
                }`}
              >
                v{it.version} · {it.score}
              </span>
            ))}
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="mt-4 rounded-lg border border-warning/30 bg-warning/5 px-3 py-2.5">
            <div className="text-warning text-[11px]/4 font-semibold uppercase tracking-[0.4px] mb-1">
              Warnings
            </div>
            <ul className="text-slate-body text-[12px]/5 list-disc pl-4">
              {warnings.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function initialStages(): Record<StageKey, StageState> {
  return {
    entity: { status: "pending" },
    citation: { status: "pending" },
    structure: { status: "pending" },
    authority: { status: "pending" },
    score: { status: "pending" },
  };
}

function formatElapsed(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${s}s`;
}

