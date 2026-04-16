// Deterministic scoring for the 3 objective AEO signals:
//   - Citation Signals (25)
//   - Answer Structure (20)
//   - Freshness Signals (10)
//
// Pure functions over markdown — easy to unit-test, easy to reason about,
// reproducible across runs (unlike LLM judging).

// ─── Citation Signals ──────────────────────────────────────────────
// New rubric (6 buckets, totals 25). Every bucket is independently
// verifiable from the rendered markdown. `hasSources` gates buckets 1+2
// so drafts with no user-supplied sources are honestly capped at ~14/25
// instead of silently zeroed for following the no-fabrication rule.

// Attribution verbs that signal a statistic or claim has a source.
const ATTR_VERBS = [
  "according to",
  "per ",
  "from ",
  "study",
  "studies",
  "report",
  "survey",
  "surveys",
  "dataset",
  "research",
  "analysis",
  "published by",
  "findings",
];

// Research vocabulary — tiny nudge for proper framing.
const RESEARCH_VOCAB = [
  "study",
  "research",
  "data",
  "survey",
  "report",
  "analysis",
];

// Pattern for a standalone `[n. some label](https://…)` inside the
// Sources section — used to identify and exclude those links from the
// inline-citation bucket.
const SOURCES_SECTION_RE = /(^|\n)#{1,6}\s*sources?\b[\s\S]*$/i;

export interface CitationBreakdown {
  inlineLinks: number;         // bucket 1 (max 6)
  sourcesSection: number;      // bucket 2 (max 5)
  attributedStats: number;     // bucket 3 (max 5)
  namedEntities: number;       // bucket 4 (max 4)
  datedAuthor: number;         // bucket 5 (max 3)
  researchVocab: number;       // bucket 6 (max 2)
  total: number;               // sum, capped at 25
}

export function scoreCitation(markdown: string, hasSources: boolean): number {
  return scoreCitationBreakdown(markdown, hasSources).total;
}

export function scoreCitationBreakdown(markdown: string, hasSources: boolean): CitationBreakdown {
  // Split body vs Sources section so inline-link counting doesn't
  // double-count the provenance list at the bottom.
  const sourcesMatch = markdown.match(SOURCES_SECTION_RE);
  const bodyEnd = sourcesMatch?.index ?? markdown.length;
  const body = markdown.slice(0, bodyEnd);
  const tail = sourcesMatch ? markdown.slice(bodyEnd) : "";

  // 1. Inline source links (max 6) — only count when user provided sources.
  const inlineLinkMatches = body.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) ?? [];
  const inlineLinks = hasSources ? Math.min(inlineLinkMatches.length * 1.5, 6) : 0;

  // 2. Sources section well-formed (max 5) — heading + ≥3 URL entries.
  let sourcesSection = 0;
  if (hasSources && sourcesMatch) {
    sourcesSection += 3;
    const urlEntries = (tail.match(/^\s*\d+\.\s*\[[^\]]+\]\(https?:\/\/[^)]+\)/gm) ?? []).length;
    if (urlEntries >= 3) sourcesSection += 2;
    else if (urlEntries >= 1) sourcesSection += 1;
  }

  // 3. Statistical claims with attribution (max 5).
  // A number near an attribution verb within ~60 chars. Iterate
  // number matches once and check neighbourhood to avoid N² work.
  const lcBody = body.toLowerCase();
  const numberRe = /\b\d+(?:[.,]\d+)?%?\b/g;
  let attributedStatsCount = 0;
  let m: RegExpExecArray | null;
  while ((m = numberRe.exec(lcBody)) !== null) {
    const start = Math.max(0, m.index - 60);
    const end = Math.min(lcBody.length, m.index + m[0].length + 60);
    const window = lcBody.slice(start, end);
    if (ATTR_VERBS.some(v => window.includes(v))) {
      attributedStatsCount++;
    }
  }
  const attributedStats = Math.min(attributedStatsCount, 5);

  // 4. Named-entity density (max 4).
  // Rough but defensible heuristic: sequences of 1-3 capitalised words
  // that look like proper nouns — products, companies, methods,
  // standards. Strip common sentence-initial capitalisations by
  // requiring the match to NOT be at the start of a sentence.
  const namedEntities = scoreNamedEntities(body);

  // 5. Dated / author attribution (max 3).
  let datedAuthor = 0;
  if (/last updated\s*:\s*[\w\d ,/-]+\d{4}/i.test(markdown)) datedAuthor += 1;
  if (/\*by\s+[a-z].*?\*/i.test(markdown) || /author\s*:/i.test(markdown)) datedAuthor += 1;
  if (/\b[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*\s+(?:Report|Study|Survey|Research|Index|Wave|Quadrant)\s*(?:,|\s)+(?:Q[1-4]\s+)?20\d{2}\b/.test(markdown)) datedAuthor += 1;
  datedAuthor = Math.min(datedAuthor, 3);

  // 6. Research / data vocabulary (max 2).
  const vocabHits = RESEARCH_VOCAB.filter(w => lcBody.includes(w)).length;
  const researchVocab = Math.min(vocabHits >= 1 ? 1 : 0, 2) + (vocabHits >= 3 ? 1 : 0);

  const total = Math.min(
    Math.round(inlineLinks + sourcesSection + attributedStats + namedEntities + datedAuthor + researchVocab),
    25,
  );

  return {
    inlineLinks,
    sourcesSection,
    attributedStats,
    namedEntities,
    datedAuthor,
    researchVocab,
    total,
  };
}

function scoreNamedEntities(text: string): number {
  // Match 1-3-word capitalised phrases NOT at sentence start. Dedup.
  // "[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2}" — 1-3 capitalised words.
  // Lookbehind requires the preceding char to NOT be start-of-line,
  // period, question, exclamation, or colon.
  const re = /(?<![.!?:]\s|^|\n)\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/g;
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const phrase = m[1];
    // Skip single capitalised words that are obviously common nouns at
    // the start of markdown lists or headers (already filtered by
    // lookbehind) and common non-entity words.
    if (COMMON_CAPS.has(phrase.toLowerCase())) continue;
    seen.add(phrase);
  }
  return Math.min(seen.size * 0.5, 4);
}

// Words that sometimes get capitalised mid-sentence but aren't entities.
const COMMON_CAPS = new Set([
  "i", "the", "a", "an",
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
]);

// ─── Answer Structure ──────────────────────────────────────────────

export function scoreStructure(markdown: string): number {
  const headers = markdown.match(/^#{1,6}\s+.+$/gm) ?? [];
  if (headers.length === 0) return 0;
  const questionHeaders = headers.filter(h => /\?\s*$/.test(h)).length;
  const questionRatio = questionHeaders / headers.length;
  const paragraphs = markdown.split(/\n{2,}/).filter(p => !p.startsWith("#"));
  const avgParaWords = paragraphs.length
    ? paragraphs.reduce((s, p) => s + p.split(/\s+/).length, 0) / paragraphs.length
    : 0;
  const headerDepths = new Set(headers.map(h => (h.match(/^#+/) ?? [""])[0].length));

  let score = 0;
  score += Math.min(questionRatio * 12, 12);
  score += avgParaWords > 0 && avgParaWords < 80 ? 4 : 2;
  score += Math.min(headerDepths.size * 1.5, 4);
  return Math.min(Math.round(score), 20);
}

// ─── Freshness ─────────────────────────────────────────────────────

export function scoreFreshness(markdown: string, now = new Date()): number {
  const currentYear = now.getUTCFullYear();
  let score = 0;
  if (/last updated/i.test(markdown)) score += 4;
  if (/as of\s+\w+/i.test(markdown)) score += 2;
  const yearMatch = markdown.match(/\b(20\d{2})\b/g) ?? [];
  const recentYear = yearMatch.some(y => Number(y) >= currentYear - 1);
  if (recentYear) score += 4;
  return Math.min(score, 10);
}
