// SSE consumer for /content/jobs/:jobId/stream. Wraps EventSource so
// callers get typed handlers per event name and a single cleanup fn.
//
// EventSource doesn't let us set custom headers, which is why the API
// accepts workspace via header OR query param fallback (TODO once auth
// is real). For now the API has a default workspace so this works.

import type { AEOSignal, OptimisationNote } from "@/data/mock-content-optimisation";

export type StageKey = "entity" | "citation" | "structure" | "authority" | "score";
export type StageStatus = "active" | "complete" | "failed";

export interface StageEvent { key: StageKey; status: StageStatus }
export interface DraftDeltaEvent { text: string }
export interface IterationEvent { version: number; score: number; auto: boolean }
export interface WarningEvent { code: string; message: string }
export interface DoneEvent {
  draftId: string;
  version: number;
  totalScore: number;
  signals: AEOSignal[];
  notes: OptimisationNote[];
  markdown: string;
}
export interface ErrorEvent { code: string; message: string; retryAfter?: number }

export interface JobStreamHandlers {
  onStage?: (e: StageEvent) => void;
  onDraftDelta?: (e: DraftDeltaEvent) => void;
  onIteration?: (e: IterationEvent) => void;
  onWarning?: (e: WarningEvent) => void;
  onDone: (e: DoneEvent) => void;
  onError?: (e: ErrorEvent | { code: "TRANSPORT"; message: string }) => void;
}

export function streamJob(jobId: string, handlers: JobStreamHandlers): () => void {
  const es = new EventSource(`/api/content/jobs/${jobId}/stream`);
  let closed = false;

  const close = () => {
    if (closed) return;
    closed = true;
    es.close();
  };

  es.addEventListener("stage", e => handlers.onStage?.(JSON.parse((e as MessageEvent).data)));
  es.addEventListener("draftDelta", e => handlers.onDraftDelta?.(JSON.parse((e as MessageEvent).data)));
  es.addEventListener("iteration", e => handlers.onIteration?.(JSON.parse((e as MessageEvent).data)));
  es.addEventListener("warning", e => handlers.onWarning?.(JSON.parse((e as MessageEvent).data)));
  es.addEventListener("done", e => {
    handlers.onDone(JSON.parse((e as MessageEvent).data));
    close();
  });
  es.addEventListener("error", e => {
    // EventSource fires "error" both for transport-level failures (no
    // payload) and for the typed `event: error` we send on terminal
    // pipeline failure. Distinguish by presence of data.
    const data = (e as MessageEvent).data;
    if (data) {
      try {
        handlers.onError?.(JSON.parse(data));
      } catch {
        handlers.onError?.({ code: "TRANSPORT", message: "Stream error" });
      }
    } else if (es.readyState === EventSource.CLOSED) {
      handlers.onError?.({ code: "TRANSPORT", message: "Connection closed" });
    }
    // Don't auto-close on transport errors — EventSource auto-reconnects.
  });

  return close;
}
