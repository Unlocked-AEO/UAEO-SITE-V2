// In-memory adapter. Holds everything in Maps keyed by workspaceId so
// the cross-tenant isolation invariant is structurally enforced — a
// missing workspaceId = miss, not a leak. Good enough for dev, tests,
// and the first end-to-end demo.

import { randomUUID } from "node:crypto";
import type {
  DraftRecord,
  IterationEntry,
  LibraryItem,
  UploadRecord,
} from "@unlocked/types";
import type {
  ContentRepository,
  LibraryQuery,
  LibrarySaveMeta,
} from "./ContentRepository.ts";
import { ApiError, ErrorCodes } from "../lib/errors.ts";

type ByWorkspace<T> = Map<string, Map<string, T>>;

function bucket<T>(map: ByWorkspace<T>, ws: string) {
  let inner = map.get(ws);
  if (!inner) {
    inner = new Map();
    map.set(ws, inner);
  }
  return inner;
}

export class MemoryAdapter implements ContentRepository {
  private uploads: ByWorkspace<UploadRecord> = new Map();
  private drafts: ByWorkspace<DraftRecord> = new Map();
  private library: ByWorkspace<LibraryItem> = new Map();
  private libraryDraftBodies: Map<string, string> = new Map(); // libraryId -> markdown

  async saveUpload(record: UploadRecord) {
    bucket(this.uploads, record.workspaceId).set(record.id, record);
    return record;
  }
  async getUpload(workspaceId: string, id: string) {
    return bucket(this.uploads, workspaceId).get(id) ?? null;
  }
  async deleteOrphanUploadsOlderThan(cutoff: Date) {
    let n = 0;
    for (const inner of this.uploads.values()) {
      for (const [id, u] of inner) {
        if (new Date(u.createdAt) < cutoff) {
          inner.delete(id);
          n++;
        }
      }
    }
    return n;
  }

  async createDraft(record: DraftRecord) {
    bucket(this.drafts, record.workspaceId).set(record.id, record);
    return record;
  }
  async getDraft(workspaceId: string, id: string) {
    return bucket(this.drafts, workspaceId).get(id) ?? null;
  }
  async updateDraft(workspaceId: string, id: string, patch: Partial<DraftRecord>) {
    const existing = await this.getDraft(workspaceId, id);
    if (!existing) throw new ApiError(ErrorCodes.DRAFT_NOT_FOUND, "Draft not found", 404);
    const next: DraftRecord = { ...existing, ...patch, updatedAt: new Date().toISOString() };
    bucket(this.drafts, workspaceId).set(id, next);
    return next;
  }
  async appendIteration(
    workspaceId: string,
    draftId: string,
    entry: IterationEntry,
    markdown: string,
  ) {
    const existing = await this.getDraft(workspaceId, draftId);
    if (!existing) throw new ApiError(ErrorCodes.DRAFT_NOT_FOUND, "Draft not found", 404);
    return this.updateDraft(workspaceId, draftId, {
      iterations: [...existing.iterations, entry],
      markdown,
      version: entry.version,
      totalScore: entry.score,
    });
  }
  async approveDraft(workspaceId: string, id: string) {
    return this.updateDraft(workspaceId, id, { status: "approved" });
  }

  async listLibrary(workspaceId: string, query: LibraryQuery) {
    let items = Array.from(bucket(this.library, workspaceId).values());
    if (query.status) items = items.filter(i => i.status === query.status);
    if (query.q) {
      const q = query.q.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q)) ||
        i.excerpt.toLowerCase().includes(q),
      );
    }
    if (query.sort === "score-desc") items.sort((a, b) => b.score - a.score);
    else if (query.sort === "score-asc") items.sort((a, b) => a.score - b.score);
    else items.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
    return items;
  }
  async getLibraryItem(workspaceId: string, id: string) {
    return bucket(this.library, workspaceId).get(id) ?? null;
  }
  async saveToLibrary(workspaceId: string, draftId: string, meta: LibrarySaveMeta) {
    const draft = await this.getDraft(workspaceId, draftId);
    if (!draft) throw new ApiError(ErrorCodes.DRAFT_NOT_FOUND, "Draft not found", 404);
    const id = randomUUID();
    const now = new Date().toISOString();
    const item: LibraryItem = {
      id,
      title: meta.title ?? extractTitle(draft.markdown) ?? "Untitled draft",
      format: draft.config.format,
      mode: draft.config.mode,
      status: draft.status === "approved" ? "approved" : "draft",
      score: draft.totalScore,
      wordCount: draft.markdown.split(/\s+/).filter(Boolean).length,
      updatedAt: now,
      createdAt: now,
      author: "You",
      tags: meta.tags ?? [],
      excerpt: draft.markdown.replace(/^#.*$/m, "").trim().slice(0, 220),
    };
    bucket(this.library, workspaceId).set(id, item);
    this.libraryDraftBodies.set(id, draft.markdown);
    return item;
  }
  async updateLibrary(workspaceId: string, id: string, patch: Partial<LibraryItem>) {
    const existing = await this.getLibraryItem(workspaceId, id);
    if (!existing) throw new ApiError("LIBRARY_NOT_FOUND", "Library item not found", 404);
    const next = { ...existing, ...patch, updatedAt: new Date().toISOString() };
    bucket(this.library, workspaceId).set(id, next);
    return next;
  }
  async deleteLibrary(workspaceId: string, id: string) {
    bucket(this.library, workspaceId).delete(id);
    this.libraryDraftBodies.delete(id);
  }

  // Test helper — not on the interface, used by isolation test.
  __internal_libraryBody(id: string) {
    return this.libraryDraftBodies.get(id);
  }
}

function extractTitle(markdown: string): string | null {
  const m = markdown.match(/^#\s+(.+)$/m);
  return m?.[1]?.trim() ?? null;
}
