// REST client for the @unlocked/api backend. Every call goes through
// /api/* which the Vite dev proxy forwards to localhost:3001.
//
// Types are imported from the local mock-content-optimisation file
// because they are kept identical to @unlocked/types. When this app
// gets wired into the real product, swap to `@unlocked/types`.

import type {
  ContentConfig,
  LibraryItem,
  AEOSignal,
  OptimisationNote,
  IterationEntry,
} from "@/data/mock-content-optimisation";

const BASE = "/api";

// Single-tenant for now — replace with auth-derived workspace once
// JWT middleware is wired into apps/api/src/middleware/workspace.ts.
const WORKSPACE_ID = "ws-default";

function defaultHeaders(extra: Record<string, string> = {}) {
  return {
    "x-workspace-id": WORKSPACE_ID,
    ...extra,
  };
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let body: any = null;
    try { body = await res.json(); } catch {}
    throw new ApiError(body?.code ?? "HTTP_ERROR", body?.message ?? res.statusText, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export class ApiError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

// ─── Drafts / Jobs ────────────────────────────────────────────────

export interface DraftResponse {
  id: string;
  workspaceId: string;
  config: ContentConfig;
  version: number;
  iterations: IterationEntry[];
  markdown: string;
  signals: AEOSignal[];
  totalScore: number;
  notes: OptimisationNote[];
  status: "generating" | "ready" | "approved" | "failed";
  createdAt: string;
  updatedAt: string;
}

export async function createJob(config: ContentConfig, uploadIds: string[] = []): Promise<{ jobId: string }> {
  const res = await fetch(`${BASE}/content/jobs`, {
    method: "POST",
    headers: defaultHeaders({ "content-type": "application/json" }),
    body: JSON.stringify({ config, uploadIds }),
  });
  return handle(res);
}

export async function iterateDraft(
  draftId: string,
  feedback: string,
  mode: "refine" | "new-base" = "refine",
): Promise<{ jobId: string; draftId: string }> {
  const res = await fetch(`${BASE}/content/drafts/${draftId}/iterate`, {
    method: "POST",
    headers: defaultHeaders({ "content-type": "application/json" }),
    body: JSON.stringify({ feedback, mode }),
  });
  return handle(res);
}

export async function approveDraft(draftId: string): Promise<DraftResponse> {
  const res = await fetch(`${BASE}/content/drafts/${draftId}/approve`, {
    method: "POST",
    headers: defaultHeaders(),
  });
  return handle(res);
}

export async function getDraft(draftId: string): Promise<DraftResponse> {
  const res = await fetch(`${BASE}/content/drafts/${draftId}`, {
    headers: defaultHeaders(),
  });
  return handle(res);
}

export function downloadUrl(draftId: string, format: "md" | "docx") {
  return `${BASE}/content/drafts/${draftId}/export?format=${format}`;
}

// ─── Uploads ──────────────────────────────────────────────────────

export interface UploadResponse {
  uploadId: string;
  filename: string;
  sizeBytes: number;
  tokenCount: number;
  preview: string;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${BASE}/content/uploads`, {
    method: "POST",
    headers: defaultHeaders(), // do NOT set content-type — browser sets multipart boundary
    body: fd,
  });
  return handle(res);
}

// ─── Library ──────────────────────────────────────────────────────

export async function listLibrary(): Promise<LibraryItem[]> {
  const res = await fetch(`${BASE}/library`, { headers: defaultHeaders() });
  return handle(res);
}

export async function saveToLibrary(draftId: string, opts: { title?: string; tags?: string[] } = {}): Promise<LibraryItem> {
  const res = await fetch(`${BASE}/library`, {
    method: "POST",
    headers: defaultHeaders({ "content-type": "application/json" }),
    body: JSON.stringify({ draftId, ...opts }),
  });
  return handle(res);
}

export async function deleteLibraryItem(id: string): Promise<void> {
  const res = await fetch(`${BASE}/library/${id}`, {
    method: "DELETE",
    headers: defaultHeaders(),
  });
  return handle(res);
}
