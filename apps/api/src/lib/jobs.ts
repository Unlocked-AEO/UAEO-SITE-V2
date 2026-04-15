// In-process job registry. Each job is an EventEmitter-ish channel that
// the orchestrator pushes events into and one or more SSE consumers pull
// from. Events are buffered for the job's lifetime + 5 min after `done`
// so a client can reconnect with `Last-Event-ID` and replay.
//
// For multi-instance deploys this needs to move to Redis pub/sub or a
// queue (BullMQ etc.). The interface is intentionally minimal so the
// swap is mechanical.

import { randomUUID } from "node:crypto";
import type { SseEventName } from "./sse.ts";

export interface BufferedEvent {
  id: string;
  event: SseEventName;
  data: unknown;
  ts: number;
}

interface Job {
  id: string;
  buffer: BufferedEvent[];
  done: boolean;
  failed: boolean;
  abort: AbortController;
  subscribers: Set<(e: BufferedEvent) => void>;
  expiresAt: number;
}

const RETENTION_AFTER_DONE_MS = 5 * 60 * 1000;
const jobs = new Map<string, Job>();

export function createJob(): Job {
  const job: Job = {
    id: randomUUID(),
    buffer: [],
    done: false,
    failed: false,
    abort: new AbortController(),
    subscribers: new Set(),
    expiresAt: Number.POSITIVE_INFINITY,
  };
  jobs.set(job.id, job);
  return job;
}

export function getJob(id: string): Job | undefined {
  return jobs.get(id);
}

export function publish(jobId: string, event: SseEventName, data: unknown) {
  const job = jobs.get(jobId);
  if (!job) return;
  const e: BufferedEvent = {
    id: `${job.buffer.length + 1}`,
    event,
    data,
    ts: Date.now(),
  };
  job.buffer.push(e);
  for (const sub of job.subscribers) sub(e);
  if (event === "done" || event === "error") {
    job.done = true;
    job.failed = event === "error";
    job.expiresAt = Date.now() + RETENTION_AFTER_DONE_MS;
    scheduleSweep();
  }
}

let sweepTimer: NodeJS.Timeout | null = null;
function scheduleSweep() {
  if (sweepTimer) return;
  sweepTimer = setTimeout(() => {
    sweepTimer = null;
    const now = Date.now();
    for (const [id, job] of jobs) {
      if (job.done && job.expiresAt < now) jobs.delete(id);
    }
    if (jobs.size > 0) scheduleSweep();
  }, 60_000).unref();
}

export function subscribe(
  jobId: string,
  fromEventId: string | undefined,
  onEvent: (e: BufferedEvent) => void,
): () => void {
  const job = jobs.get(jobId);
  if (!job) return () => {};

  // Replay buffered events past the last seen id.
  const lastId = fromEventId ? Number(fromEventId) : 0;
  for (const e of job.buffer) {
    if (Number(e.id) > lastId) onEvent(e);
  }
  if (job.done) return () => {};

  job.subscribers.add(onEvent);
  return () => {
    job.subscribers.delete(onEvent);
  };
}
