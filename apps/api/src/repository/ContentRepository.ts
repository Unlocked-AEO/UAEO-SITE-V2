// Storage-agnostic interface. Every persistence call goes through this.
// Concrete adapters: MemoryAdapter (default, dev/tests) and a future
// SupabaseAdapter / PostgresAdapter. Swapping is a one-line change in
// server.ts where the adapter is injected.
//
// CRITICAL: every method takes workspaceId. The lint rule and the
// isolation test in repository/isolation.test.ts enforce this — losing
// it leaks data across tenants.

import type {
  DraftRecord,
  IterationEntry,
  LibraryItem,
  UploadRecord,
} from "@unlocked/types";

export interface LibraryQuery {
  status?: LibraryItem["status"];
  q?: string;
  sort?: "recent" | "score-desc" | "score-asc";
}

export interface LibrarySaveMeta {
  title?: string;
  tags?: string[];
}

export interface ContentRepository {
  // Uploads
  saveUpload(record: UploadRecord): Promise<UploadRecord>;
  getUpload(workspaceId: string, id: string): Promise<UploadRecord | null>;
  deleteOrphanUploadsOlderThan(cutoff: Date): Promise<number>;

  // Drafts
  createDraft(record: DraftRecord): Promise<DraftRecord>;
  getDraft(workspaceId: string, id: string): Promise<DraftRecord | null>;
  updateDraft(
    workspaceId: string,
    id: string,
    patch: Partial<DraftRecord>,
  ): Promise<DraftRecord>;
  appendIteration(
    workspaceId: string,
    draftId: string,
    entry: IterationEntry,
    markdown: string,
  ): Promise<DraftRecord>;
  approveDraft(workspaceId: string, id: string): Promise<DraftRecord>;

  // Library
  listLibrary(workspaceId: string, query: LibraryQuery): Promise<LibraryItem[]>;
  getLibraryItem(workspaceId: string, id: string): Promise<LibraryItem | null>;
  saveToLibrary(
    workspaceId: string,
    draftId: string,
    meta: LibrarySaveMeta,
  ): Promise<LibraryItem>;
  updateLibrary(
    workspaceId: string,
    id: string,
    patch: Partial<LibraryItem>,
  ): Promise<LibraryItem>;
  deleteLibrary(workspaceId: string, id: string): Promise<void>;
}
