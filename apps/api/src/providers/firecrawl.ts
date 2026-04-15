// Firecrawl scrape provider — converts a URL into clean markdown.
// Wired as a thin REST call (no SDK dep) so we can swap to Jina Reader
// or a self-hosted equivalent without changing the interface.

import { config } from "../config.ts";
import type { ScrapeProvider } from "./types.ts";

export const firecrawlScrapeProvider: ScrapeProvider = {
  async fetchUrl(url, signal) {
    const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.firecrawl.apiKey}`,
      },
      body: JSON.stringify({ url, formats: ["markdown"] }),
      signal,
    });
    if (!res.ok) {
      return { url, markdown: "", title: undefined };
    }
    const json = (await res.json()) as {
      data?: { markdown?: string; metadata?: { title?: string } };
    };
    return {
      url,
      markdown: json.data?.markdown ?? "",
      title: json.data?.metadata?.title,
    };
  },
};
