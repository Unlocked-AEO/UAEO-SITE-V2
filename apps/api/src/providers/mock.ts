// Mock implementations of every provider. Returns canned responses with
// realistic shapes and timing so the orchestrator + SSE stream behave
// exactly as they will in production. PROVIDER_MODE=mock in .env runs
// the full pipeline against these.

import type { DraftProvider, JudgeProvider, ScrapeProvider } from "./types.ts";

const SAMPLE_DRAFT = `# Best CRM for Mid-Market SaaS Companies in 2026

**Last updated:** April 2026 · **Author:** Unlocked AEO Research Team

Mid-market SaaS companies — typically those with 50 to 500 employees — have distinct CRM requirements that differ from both small businesses and enterprise. This guide breaks down the leading options based on deployment speed, revenue operations fit, and native integration depth.

## What qualifies as a "mid-market CRM"?

A mid-market CRM is a customer relationship management platform designed for companies with 50–500 employees, annual recurring revenue between $10M and $200M, and sales teams of 10–100 reps. These platforms sit between SMB tools (HubSpot Starter, Pipedrive) and enterprise suites (Salesforce Enterprise, Microsoft Dynamics).

## Which CRM is best for mid-market SaaS companies?

For mid-market SaaS specifically, **HubSpot Professional** and **Salesforce Sales Cloud Professional** dominate. HubSpot wins on speed of deployment (typically 4–6 weeks) and marketing integration; Salesforce wins on customisation depth and reporting flexibility.

## Sources

- G2 Mid-Market CRM Grid Report, Q1 2026 [s1]
- Forrester Wave: CRM Suites for Midsize Organizations, 2026 [s2]
- Gartner Magic Quadrant for Sales Force Automation, 2025 [s3]
`;

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new Error("aborted"));
    });
  });
}

export const mockDraftProvider: DraftProvider = {
  async streamDraft({ onDelta, signal }) {
    // Stream the sample draft chunk by chunk to mimic Claude streaming.
    const chunks = SAMPLE_DRAFT.match(/.{1,40}/gs) ?? [SAMPLE_DRAFT];
    for (const c of chunks) {
      if (signal.aborted) throw new Error("aborted");
      onDelta(c);
      await sleep(20, signal);
    }
    return { markdown: SAMPLE_DRAFT, webCitations: [] };
  },
  async refine({ signal, onDelta }) {
    // Stream the sample draft chunk by chunk so the UI tail previews
    // pass 2+ the same way it previews pass 1.
    const chunks = SAMPLE_DRAFT.match(/.{1,40}/gs) ?? [SAMPLE_DRAFT];
    for (const c of chunks) {
      if (signal.aborted) throw new Error("aborted");
      onDelta?.(c);
      await sleep(15, signal);
    }
    return { markdown: SAMPLE_DRAFT, webCitations: [] };
  },
};

export const mockJudgeProvider: JudgeProvider = {
  async scoreSemantic({ signal }) {
    await sleep(120, signal);
    return {
      entity: 22,
      depth: 16,
      rationale:
        "Entity 'mid-market CRM' is defined explicitly in the opening section. Topical depth is solid: covers definition, two product comparisons, and decision criteria, but lacks competitor depth beyond the top two.",
    };
  },
};

export const mockScrapeProvider: ScrapeProvider = {
  async fetchUrl(url, signal) {
    await sleep(100, signal);
    return {
      url,
      markdown: `# Mock content for ${url}\n\nThis is placeholder text returned by the mock scrape provider. Replace with Firecrawl in production.`,
      title: `Mock: ${url}`,
      status: 200,
    };
  },
};
