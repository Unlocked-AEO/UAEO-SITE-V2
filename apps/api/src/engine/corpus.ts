// Builds the <corpus> block from URLs (scraped) + uploads (already
// parsed). This is the single string fed to Claude inside the cached
// system block. Also returns the structured source list the orchestrator
// exposes in the SSE `done` event so the UI can show which URLs loaded
// vs failed vs got cited.

import type { ContentRepository } from "../repository/ContentRepository.ts";
import type { ScrapeProvider } from "../providers/types.ts";

const PER_SOURCE_CHAR_CAP = 12_000; // ~3k tokens
const TOTAL_CHAR_CAP = 96_000;      // ~24k tokens

export interface CorpusSource {
  id: string;
  type: "url" | "upload";
  origin: string;
  title?: string;
  text: string;
  loaded: boolean;        // false when fetch failed; still included so the UI can show the failure
  error?: string;
}

export interface BuildCorpusInput {
  workspaceId: string;
  sourcesCsv: string;
  uploadIds: string[];
  repo: ContentRepository;
  scrape: ScrapeProvider;
  signal: AbortSignal;
  onWarning: (code: string, message: string, detail?: Record<string, unknown>) => void;
}

export interface BuildCorpusOutput {
  corpus: string;
  sources: CorpusSource[];
  truncatedSourceIds: string[];
}

export async function buildCorpus(input: BuildCorpusInput): Promise<BuildCorpusOutput> {
  const sources: CorpusSource[] = [];

  // 1. URLs in parallel.
  const urls = input.sourcesCsv
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  const scrapeResults = await Promise.allSettled(
    urls.map(u => input.scrape.fetchUrl(u, input.signal)),
  );
  scrapeResults.forEach((r, i) => {
    const url = urls[i];
    const id = `s${sources.length + 1}`;
    if (r.status === "fulfilled" && r.value.markdown) {
      sources.push({
        id,
        type: "url",
        origin: r.value.url,
        title: r.value.title,
        text: r.value.markdown.slice(0, PER_SOURCE_CHAR_CAP),
        loaded: true,
      });
    } else {
      // Either the promise rejected outright, or Firecrawl returned
      // no usable content. Record it so the UI can show which URLs
      // failed and why.
      const errMsg =
        r.status === "rejected"
          ? (r.reason?.message ?? String(r.reason))
          : (r.value.error ?? "Empty response from scraper");
      sources.push({
        id,
        type: "url",
        origin: url,
        title: r.status === "fulfilled" ? r.value.title : undefined,
        text: "",
        loaded: false,
        error: errMsg,
      });
      input.onWarning("SOURCE_FETCH_FAILED", `Could not read ${url}: ${errMsg}`, {
        url,
        reason: errMsg,
        status: r.status === "fulfilled" ? r.value.status : undefined,
      });
    }
  });

  // 2. Uploads (already parsed at upload time).
  for (const uploadId of input.uploadIds) {
    const u = await input.repo.getUpload(input.workspaceId, uploadId);
    if (!u) {
      input.onWarning("UPLOAD_MISSING", `Upload ${uploadId} not found`);
      continue;
    }
    sources.push({
      id: `s${sources.length + 1}`,
      type: "upload",
      origin: u.filename,
      text: u.parsedText.slice(0, PER_SOURCE_CHAR_CAP),
      loaded: true,
    });
  }

  // 3. Total cap — drop URLs first if over (failed URLs cost 0 chars
  // so they never trigger truncation).
  const loaded = () => sources.filter(s => s.loaded);
  let total = loaded().reduce((sum, x) => sum + x.text.length, 0);
  const truncatedSourceIds: string[] = [];
  while (total > TOTAL_CHAR_CAP && loaded().length > 0) {
    const dropIdx = sources.findIndex(s => s.loaded && s.type === "url");
    const idx = dropIdx === -1 ? sources.findIndex(s => s.loaded) : dropIdx;
    if (idx === -1) break;
    const dropped = sources[idx];
    truncatedSourceIds.push(dropped.id);
    total -= dropped.text.length;
    // Mark as dropped rather than remove so the UI can still show what
    // the user supplied and why it wasn't used.
    sources[idx] = { ...dropped, loaded: false, text: "", error: "Dropped to fit context budget" };
    input.onWarning("CORPUS_TRUNCATED", `Dropped ${dropped.origin} to fit context budget`, {
      id: dropped.id,
    });
  }

  // 4. Render with provenance fences — only loaded sources go into the
  // corpus block the model sees.
  const usable = sources.filter(s => s.loaded);
  const corpus = usable.length === 0
    ? ""
    : "<corpus>\n" + usable.map(s =>
        `<source id="${s.id}" type="${s.type}" origin="${escapeAttr(s.origin)}"${
          s.title ? ` title="${escapeAttr(s.title)}"` : ""
        }>\n${s.text}\n</source>`,
      ).join("\n\n") + "\n</corpus>";

  return { corpus, sources, truncatedSourceIds };
}

function escapeAttr(s: string) {
  return s.replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
