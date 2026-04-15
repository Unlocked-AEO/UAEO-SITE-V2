// Deterministic scoring for the 3 objective AEO signals:
//   - Citation Signals (25)
//   - Answer Structure (20)
//   - Freshness Signals (10)
//
// Pure functions over markdown. Easy to unit-test, easy to reason about,
// and reproducible across runs (unlike LLM judging).

const AUTHORITY_SOURCES = [
  "g2", "forrester", "gartner", "idc", "mckinsey", "deloitte",
  "harvard", "mit", "stanford", "nielsen", "pew",
];

export function scoreCitation(markdown: string): number {
  const linkCount = (markdown.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) ?? []).length;
  const inlineCiteCount = (markdown.match(/\[s\d+\]/g) ?? []).length;
  const hasSourcesSection = /^#+\s*sources?/im.test(markdown);
  const lc = markdown.toLowerCase();
  const authorityHits = AUTHORITY_SOURCES.filter(s => lc.includes(s)).length;

  let score = 0;
  score += Math.min(linkCount * 2, 8);
  score += Math.min(inlineCiteCount * 1.5, 6);
  if (hasSourcesSection) score += 5;
  score += Math.min(authorityHits * 2, 6);
  return Math.min(Math.round(score), 25);
}

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
  score += Math.min(questionRatio * 12, 12);                           // Q-form headers
  score += avgParaWords > 0 && avgParaWords < 80 ? 4 : 2;               // scannability
  score += Math.min(headerDepths.size * 1.5, 4);                       // depth balance
  return Math.min(Math.round(score), 20);
}

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
