// Firecrawl scrape provider — converts a URL into clean markdown.
// Wired as a thin REST call (no SDK dep) so we can swap to Jina Reader
// or a self-hosted equivalent without changing the interface.

import { config } from "../config.ts";
import type { ScrapeProvider } from "./types.ts";

export const firecrawlScrapeProvider: ScrapeProvider = {
  async fetchUrl(url, signal) {
    if (!config.firecrawl.apiKey) {
      return { url, markdown: "", error: "Firecrawl API key not configured" };
    }
    // One retry on transient failures (network error, 429, 5xx) with 1s backoff.
    let res: Response | null = null;
    let lastErr: string | null = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        res = await fetch("https://api.firecrawl.dev/v1/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.firecrawl.apiKey}`,
          },
          body: JSON.stringify({ url, formats: ["markdown"], onlyMainContent: true }),
          signal,
        });
        if (res.ok) break;
        if (res.status !== 429 && res.status < 500) break; // non-transient
        lastErr = res.statusText || `HTTP ${res.status}`;
      } catch (e: any) {
        if (signal?.aborted) return { url, markdown: "", error: "aborted" };
        lastErr = `network error: ${e?.message ?? "unknown"}`;
      }
      if (attempt === 0) await new Promise(r => setTimeout(r, 1000));
    }
    if (!res) return { url, markdown: "", error: lastErr ?? "unknown" };

    if (!res.ok) {
      let msg = res.statusText || `HTTP ${res.status}`;
      try {
        const body = await res.json();
        if (body?.error || body?.message) msg = body.error ?? body.message;
      } catch {}
      return { url, markdown: "", error: msg, status: res.status };
    }
    const json = (await res.json()) as {
      data?: { markdown?: string; metadata?: { title?: string } };
    };
    const md = json.data?.markdown ?? "";
    if (!md.trim()) {
      return {
        url,
        markdown: "",
        title: json.data?.metadata?.title,
        error: "Firecrawl returned no extractable content (paywall, JS-only page, or blocked)",
        status: res.status,
      };
    }
    return {
      url,
      markdown: md,
      title: json.data?.metadata?.title,
    };
  },
};
