// Builds the <corpus> block from URLs (scraped) + uploads (already
// parsed). This is the single string fed to Claude inside the cached
// system block. See docs/ARCHITECTURE.md for the prompt structure.

import type { ContentRepository } from "../repository/ContentRepository.ts";
import type { ScrapeProvider } from "../providers/types.ts";

const PER_SOURCE_CHAR_CAP = 12_000; // ~3k tokens
const TOTAL_CHAR_CAP = 96_000;      // ~24k tokens

export interface CorpusSource {
  id: string;
  type: "url" | "upload";
  origin: string;
  text: string;
}

export interface BuildCorpusInput {
  workspaceId: string;
  sourcesCsv: string;
  uploadIds: string[];
  repo: ContentRepository;
  scrape: ScrapeProvider;
  signal: AbortSignal;
  onWarning: (code: string, message: string) => void;
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
    if (r.status === "fulfilled" && r.value.markdown) {
      sources.push({
        id: `s${sources.length + 1}`,
        type: "url",
        origin: r.value.url,
        text: r.value.markdown.slice(0, PER_SOURCE_CHAR_CAP),
      });
    } else {
      input.onWarning("SOURCE_FETCH_FAILED", `Could not fetch ${urls[i]}`);
    }
  });

  // 2. Uploads (already parsed at upload time).
  for (const id of input.uploadIds) {
    const u = await input.repo.getUpload(input.workspaceId, id);
    if (!u) {
      input.onWarning("UPLOAD_MISSING", `Upload ${id} not found`);
      continue;
    }
    sources.push({
      id: `s${sources.length + 1}`,
      type: "upload",
      origin: u.filename,
      text: u.parsedText.slice(0, PER_SOURCE_CHAR_CAP),
    });
  }

  // 3. Total cap — drop URLs first if over.
  let total = sources.reduce((s, x) => s + x.text.length, 0);
  const truncatedSourceIds: string[] = [];
  while (total > TOTAL_CHAR_CAP && sources.length > 0) {
    const dropIdx = sources.findIndex(s => s.type === "url");
    const idx = dropIdx === -1 ? sources.length - 1 : dropIdx;
    const dropped = sources.splice(idx, 1)[0];
    truncatedSourceIds.push(dropped.id);
    total -= dropped.text.length;
    input.onWarning(
      "CORPUS_TRUNCATED",
      `Dropped source ${dropped.origin} to fit context budget`,
    );
  }

  // 4. Render with provenance fences.
  const corpus = sources.length === 0
    ? ""
    : "<corpus>\n" + sources.map(s =>
        `<source id="${s.id}" type="${s.type}" origin="${escapeAttr(s.origin)}">\n${s.text}\n</source>`,
      ).join("\n\n") + "\n</corpus>";

  return { corpus, sources, truncatedSourceIds };
}

function escapeAttr(s: string) {
  return s.replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
