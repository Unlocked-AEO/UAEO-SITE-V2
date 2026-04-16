// Shared types between @unlocked/web and @unlocked/api.
// These mirror the shapes the UI was already built against in
// apps/web/src/data/mock-content-optimisation.ts. The mock file is the
// design source of truth; this package is what the API contract is
// validated against.

export type ContentMode = "generate" | "optimize";

export type ContentFormat =
  | "blog-post"
  | "faq"
  | "comparison"
  | "pillar-page"
  | "how-to";

export type ContentTone = "technical" | "accessible" | "authoritative";

export interface ContentConfig {
  mode: ContentMode;
  brief: string;
  audience: string;
  sources: string;
  keywords: string;
  format: ContentFormat;
  tone: ContentTone;
  existingContent?: string;
  optimizationGoal?: string;
}

export interface AEOSignal {
  key: "entity" | "citation" | "structure" | "depth" | "freshness";
  label: string;
  description: string;
  score: number;
  maxScore: number;
}

export interface OptimisationNote {
  category: AEOSignal["key"];
  change: string;
  impact: string;
}

export interface IterationEntry {
  version: number;
  timestamp: string;
  score: number;
  feedback?: string;
}

export type LibraryStatus = "approved" | "draft" | "in-review" | "archived";

export interface LibraryItem {
  id: string;
  title: string;
  format: ContentFormat;
  mode: ContentMode;
  status: LibraryStatus;
  score: number;
  wordCount: number;
  updatedAt: string;
  createdAt: string;
  author: string;
  tags: string[];
  excerpt: string;
}

// ─── API request / response shapes ────────────────────────────────

export interface CreateJobRequest {
  config: ContentConfig;
  uploadIds?: string[];
}

export interface CreateJobResponse {
  jobId: string;
  draftId: string;
}

/**
 * One resolved source (URL or upload) attached to a draft. `loaded`
 * reflects whether the content was actually fetched; `cited` reflects
 * whether the draft ended up using the source via a `[s#]` marker.
 */
export interface SourceRef {
  id: string;                       // "s1", "s2", ...
  type: "url" | "upload";
  origin: string;                   // URL or filename
  title?: string;
  loaded: boolean;                  // false when fetch failed
  error?: string;                   // populated when loaded === false
  cited: boolean;                   // true when the draft referenced this id
}

export interface DraftRecord {
  id: string;
  workspaceId: string;
  config: ContentConfig;
  version: number;
  iterations: IterationEntry[];
  markdown: string;
  signals: AEOSignal[];
  totalScore: number;
  notes: OptimisationNote[];
  sources: SourceRef[];
  status: "generating" | "ready" | "approved" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface UploadRecord {
  id: string;
  workspaceId: string;
  filename: string;
  mime: string;
  sizeBytes: number;
  contentHash: string;
  parsedText: string;
  tokenCount: number;
  createdAt: string;
}

// ─── SSE event payloads (client must mirror these) ────────────────

export type StageKey =
  | "entity"
  | "citation"
  | "structure"
  | "authority"
  | "score";

export type StageStatus = "active" | "complete" | "failed";

export interface SseStageEvent {
  key: StageKey;
  status: StageStatus;
}

export interface SseDraftDeltaEvent {
  text: string;
}

export interface SseIterationEvent {
  version: number;
  score: number;
  auto: boolean;
}

export interface SseWarningEvent {
  code: string;
  message: string;
  detail?: unknown;
}

export interface SseDoneEvent {
  draftId: string;
  version: number;
  totalScore: number;
  signals: AEOSignal[];
  notes: OptimisationNote[];
  sources: SourceRef[];
  markdown: string;
}

export interface SseErrorEvent {
  code: string;
  message: string;
  retryAfter?: number;
}
