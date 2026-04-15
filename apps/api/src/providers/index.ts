// Wires concrete providers based on PROVIDER_MODE. Imported once by
// server.ts and passed into the orchestrator. Tests construct their own
// in-memory provider triples and skip this file.

import { config } from "../config.ts";
import type { DraftProvider, JudgeProvider, ScrapeProvider } from "./types.ts";
import { mockDraftProvider, mockJudgeProvider, mockScrapeProvider } from "./mock.ts";
import { claudeDraftProvider } from "./claude.ts";
import { geminiJudgeProvider } from "./gemini.ts";
import { firecrawlScrapeProvider } from "./firecrawl.ts";

export interface Providers {
  draft: DraftProvider;
  judge: JudgeProvider;
  scrape: ScrapeProvider;
}

export function buildProviders(): Providers {
  if (config.providerMode === "real") {
    return {
      draft: claudeDraftProvider,
      judge: geminiJudgeProvider,
      scrape: firecrawlScrapeProvider,
    };
  }
  return {
    draft: mockDraftProvider,
    judge: mockJudgeProvider,
    scrape: mockScrapeProvider,
  };
}
