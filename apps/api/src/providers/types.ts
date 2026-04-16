// Provider abstractions. The orchestrator only ever talks to these
// interfaces — concrete implementations (Anthropic, Gemini, Firecrawl)
// or mocks are wired in server.ts at boot time. This is what lets us
// run the entire engine end-to-end without API keys.

export interface DraftProvider {
  /** Stream a draft. `onDelta` is called with token chunks. Returns final markdown. */
  streamDraft(input: {
    systemUncached: string;
    systemCached: string;       // wrapped in cache_control on real Claude
    user: string;
    signal: AbortSignal;
    onDelta: (text: string) => void;
  }): Promise<string>;

  /** Streaming refinement pass. `onDelta` receives token chunks as they arrive. */
  refine(input: {
    systemUncached: string;
    systemCached: string;
    user: string;
    signal: AbortSignal;
    onDelta?: (text: string) => void;
  }): Promise<string>;
}

export interface JudgeProvider {
  /** Returns scores for entity (out of 25) and depth (out of 20). */
  scoreSemantic(input: {
    draft: string;
    sourcesSummary: string;
    keywords: string;
    format: string;
    signal: AbortSignal;
  }): Promise<{ entity: number; depth: number; rationale: string }>;
}

export interface ScrapeProvider {
  /**
   * `markdown` is empty when the page couldn't be usefully scraped.
   * When that happens, populate `error` with a human-readable reason
   * (e.g. "403 blocked by paywall", "timed out") and optionally
   * `status` with the upstream HTTP status so the UI can surface it.
   */
  fetchUrl(url: string, signal: AbortSignal): Promise<{
    url: string;
    markdown: string;
    title?: string;
    error?: string;
    status?: number;
  }>;
}
