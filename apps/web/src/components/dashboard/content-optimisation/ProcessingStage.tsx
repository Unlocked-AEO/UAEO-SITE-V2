import { useEffect, useMemo, useRef, useState } from "react";
import { streamJob, type DoneEvent, type StageKey } from "@/lib/api/sse";

interface ProcessingStageProps {
  jobId: string | null;
  onComplete: (done: DoneEvent) => void;
  onError?: (message: string) => void;
}

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

// Show a generous tail so the preview feels like a real live draft,
// not a skinny ticker. Auto-scrolls to the bottom as tokens arrive.
const PREVIEW_TAIL_CHARS = 4000;

export function ProcessingStage({ jobId, onComplete, onError }: ProcessingStageProps) {
  const [stages, setStages] = useState<Record<StageKey, StageState>>(() => initialStages());
  const [pass, setPass] = useState(1);
  const [iterations, setIterations] = useState<IterationLog[]>([]);
  const [previewText, setPreviewText] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const draftBufferRef = useRef("");
  const previewScrollRef = useRef<HTMLDivElement>(null);

  // Tick clock once a second so the elapsed counter updates.
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
          // Re-entry detection: if a stage goes active again after being
          // complete, we're starting the next auto-iterate pass.
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
        draftBufferRef.current = "";
        setPreviewText("");
      },
      onWarning: ({ message }) => setWarnings(w => [...w, message]),
      onDone: (done) => onComplete(done),
      onError: (err) => onError?.(err.message),
    });
    return close;
  }, [jobId, onComplete, onError]);

  // Auto-scroll the preview to the bottom whenever new tokens arrive.
  useEffect(() => {
    const el = previewScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [previewText]);

  const elapsedSec = Math.max(0, Math.floor((now - startedAt) / 1000));
  const activeKey = useMemo(
    () => stageOrder.find(k => stages[k].status === "active"),
    [stages],
  );
  const activeMeta = activeKey ? stageMeta[activeKey] : null;

  return (
    <div className="grid grid-cols-[minmax(340px,400px)_1fr] gap-5 items-start">
      {/* ─── Left: status rail ──────────────────────────────────── */}
      <div className="rounded-xl py-6 px-5 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="relative size-2.5">
              <div className="absolute inset-0 rounded-full bg-teal animate-ping opacity-75" />
              <div className="absolute inset-0 rounded-full bg-teal" />
            </div>
            <span className="text-teal font-semibold text-[11px] uppercase tracking-[0.4px]">
              Pass {pass} of 2
            </span>
          </div>
          <div className="text-navy font-semibold text-[17px]/6">
            {activeMeta ? activeMeta.label : "Preparing pipeline"}
          </div>
          <p className="mt-0.5 text-slate-muted text-[12px]/4">
            {activeMeta ? activeMeta.live : "Initialising orchestrator…"}
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-navy font-semibold text-[20px]/6 tracking-[-0.2px] tabular-nums">
              {formatElapsed(elapsedSec)}
            </span>
            <span className="text-slate-muted text-[10px]/4 uppercase tracking-[0.4px]">
              elapsed
            </span>
          </div>
        </div>

        {/* Pipeline steps */}
        <div className="flex flex-col gap-1.5">
          {stageOrder.map((key, i) => {
            const meta = stageMeta[key];
            const state = stages[key];
            const isActive = state.status === "active";
            const isDone = state.status === "complete";
            const ms = state.completedAt && state.startedAt ? state.completedAt - state.startedAt : null;
            return (
              <div
                key={key}
                className={`flex items-center gap-3 rounded-lg p-2.5 border transition-colors ${
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
                  <div className={`text-[12.5px]/4 font-semibold ${isActive || isDone ? "text-navy" : "text-slate-muted"}`}>
                    {meta.label}
                  </div>
                  <div className="text-slate-muted text-[10.5px]/4 truncate">
                    {isActive ? meta.live : isDone ? meta.done : "Queued"}
                  </div>
                </div>
                {isDone && ms !== null && (
                  <div className="text-slate-muted text-[10.5px]/4 tabular-nums shrink-0">
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

        {/* Iteration chips */}
        {iterations.length > 0 && (
          <div className="mt-5">
            <div className="text-slate-muted text-[10px]/4 uppercase tracking-[0.4px] font-semibold mb-1.5">
              Auto passes
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
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
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="mt-5 rounded-lg border border-warning/30 bg-warning/5 px-3 py-2.5">
            <div className="text-warning text-[10px]/4 font-semibold uppercase tracking-[0.4px] mb-1">
              Warnings
            </div>
            <ul className="text-slate-body text-[11.5px]/5 list-disc pl-4">
              {warnings.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* ─── Right: big live preview ──────────────────────────── */}
      <div className="rounded-xl bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F] overflow-hidden flex flex-col h-[640px]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
          <div>
            <div className="text-navy font-semibold text-[14px]/5">Live draft preview</div>
            <div className="text-slate-muted text-[11px]/4 mt-0.5">
              {previewText ? "Streaming from the engine…" : "Waiting for tokens…"}
            </div>
          </div>
          {previewText && (
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-teal animate-pulse" />
              <span className="text-teal text-[11px]/4 font-semibold uppercase tracking-[0.4px]">live</span>
            </div>
          )}
        </div>

        <div
          ref={previewScrollRef}
          className="flex-1 overflow-y-auto bg-[#FAFBFC] px-6 py-5 font-mono text-[12.5px]/[1.7] text-slate-body whitespace-pre-wrap break-words"
        >
          {previewText ? (
            <>
              {previewText}
              <span className="inline-block w-[7px] h-[14px] align-middle ml-0.5 bg-teal animate-pulse" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-muted text-[13px]/5 text-center">
              <div className="size-8 rounded-full border-2 border-teal/30 border-t-teal animate-spin mb-3" />
              <div>Preparing the pipeline…</div>
              <div className="mt-1 text-[11px]/4">Tokens will appear here as the engine drafts.</div>
            </div>
          )}
        </div>
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
