// Post-processes a raw draft from Claude so every [s#] marker either
// becomes a real hyperlink or gets stripped (no dead `[s7]` text ever
// reaches the user). Also appends a Sources section at the end listing
// every source the engine had access to, so readers see the full
// provenance even for sources that weren't cited in the prose.
//
// Called from orchestrator.ts between the refine pass and scoring so
// the heuristic scorer and the Gemini judge both evaluate the final
// rendered form.

import type { CorpusSource } from "./corpus.ts";

export interface PostProcessResult {
  markdown: string;
  usedSourceIds: Set<string>;
}

const MARKER_RE = /\[s(\d+)\]/g;
const EXISTING_SOURCES_SECTION_RE = /\n+#{1,6}\s+sources?\s*\n[\s\S]*$/i;

export function postProcessCitations(
  markdown: string,
  sources: CorpusSource[],
): PostProcessResult {
  const sourceById = new Map(sources.map(s => [s.id, s]));
  const used = new Set<string>();

  // Defensive: strip any leaked tool_call / tool_response blocks and
  // first-person research narration that Claude sometimes emits when
  // using the web_search tool. These should never reach the user.
  let body = stripToolArtifacts(markdown);

  // Strip any pre-existing Sources section Claude may have invented —
  // we own that section now and will rebuild it from structured data.
  body = body.replace(EXISTING_SOURCES_SECTION_RE, "").trimEnd();

  body = body.replace(MARKER_RE, (match, digits) => {
    const id = `s${digits}`;
    const source = sourceById.get(id);
    // Hallucinated id or pointing at a failed source → strip the marker.
    // We'd rather the prose read cleanly than show a dead reference.
    if (!source || !source.loaded) return "";
    used.add(id);
    const href = hrefFor(source);
    const n = indexOf(sources, id) + 1;
    // Use plain markdown `[[N]](url)` so react-markdown renders it
    // without needing rehype-raw. The result is a clickable "[N]" chip.
    return `[[${n}]](${href})`;
  });

  // Clean up double spaces / orphan punctuation left behind by stripped markers.
  body = body
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+([.,;:!?)])/g, "$1")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")");

  if (sources.length === 0) {
    return { markdown: body, usedSourceIds: used };
  }

  // Append a single authoritative Sources section. Shows every source
  // the engine had access to — loaded-and-cited, loaded-but-uncited,
  // and failed — so the user can see what happened.
  const lines: string[] = ["", "## Sources", ""];
  sources.forEach((s, i) => {
    const n = i + 1;
    if (s.type === "url") {
      const label = s.title ?? prettyDomain(s.origin) ?? s.origin;
      if (s.loaded) {
        lines.push(`${n}. [${label}](${s.origin})`);
      } else {
        lines.push(`${n}. ${label} — *not loaded (${s.error ?? "unknown reason"})*`);
      }
    } else {
      lines.push(`${n}. ${s.origin} *(uploaded file)*`);
    }
  });

  return {
    markdown: body + "\n" + lines.join("\n") + "\n",
    usedSourceIds: used,
  };
}

function hrefFor(source: CorpusSource): string {
  if (source.type === "url") return source.origin;
  // Uploads don't have a public URL — link to the Sources section anchor.
  return `#sources`;
}

function indexOf(sources: CorpusSource[], id: string): number {
  return sources.findIndex(s => s.id === id);
}

// Strip tool_call/tool_response blocks, JSON-ish API artefacts, and
// first-person research narration ("Let me search…", "I'll verify…",
// "Good — the stats check out", "Based on my searches…") that Claude
// sometimes leaks when using web_search. Also trims any lead-in chatter
// before the first heading so the article opens with its title.
function stripToolArtifacts(md: string): string {
  let out = md;

  // 1. XML-style tool_call / tool_response blocks (any casing).
  out = out.replace(/<tool_call[\s\S]*?<\/tool_call>/gi, "");
  out = out.replace(/<tool_response[\s\S]*?<\/tool_response>/gi, "");
  // Self-closing or orphan variants.
  out = out.replace(/<\/?tool_(call|response|use|result)[^>]*>/gi, "");

  // 2. Fenced blocks whose info-string is tool_call / tool_response / json-ish API dump.
  out = out.replace(/```(?:tool_call|tool_response|tool_use|json)[\s\S]*?```/gi, "");

  // 3. First-person research narration lines. Conservative list — only
  //    phrasings we've actually seen leak. Matches a whole line.
  const narrationPatterns: RegExp[] = [
    /^.*\b(?:i'?ll|let me|i will|i'?m going to)\s+(?:search|verify|check|look up|confirm|find|pull)\b.*$/gim,
    /^.*\bbased on (?:my|the) (?:search(?:es)?|research|findings)\b.*$/gim,
    /^.*\b(?:the (?:core )?stats? check out|i have verified|i'?ve verified|now i'?ll (?:refine|produce|write)|let me (?:produce|refine|write))\b.*$/gim,
    /^\s*(?:good|great|okay|alright)\s*[—-].*$/gim,
  ];
  for (const re of narrationPatterns) out = out.replace(re, "");

  // 4. Collapse the blank lines left behind and trim any preamble
  //    before the first markdown heading.
  out = out.replace(/\n{3,}/g, "\n\n");
  const firstHeading = out.search(/^#{1,6}\s/m);
  if (firstHeading > 0) {
    const preamble = out.slice(0, firstHeading).trim();
    // Only drop the preamble if it's obviously chatter (short + no paragraph break).
    if (preamble.length < 400 && !/\n\n/.test(preamble)) {
      out = out.slice(firstHeading);
    }
  }

  return out.trim();
}

function prettyDomain(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}
