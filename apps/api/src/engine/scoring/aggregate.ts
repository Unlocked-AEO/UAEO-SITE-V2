// Combines deterministic heuristics + Gemini judge into the AEOSignal[]
// shape the UI already renders. Signal labels, descriptions, max scores,
// and note-impact copy all come from the externally authored rules
// (apps/api/rules/content-rules.yaml) — see getRules().signals and
// getRules().notes.impactCopy.

import type { AEOSignal, OptimisationNote } from "@unlocked/types";
import {
  scoreCitation,
  scoreFreshness,
  scoreStructure,
} from "./heuristics.ts";
import { getRules } from "../../rules/loader.ts";

export interface AggregateInput {
  markdown: string;
  judge: { entity: number; depth: number; rationale: string };
  hasSources: boolean;
}

export interface AggregateOutput {
  signals: AEOSignal[];
  totalScore: number;
  notes: OptimisationNote[];
}

export function aggregateScores({ markdown, judge, hasSources }: AggregateInput): AggregateOutput {
  const rules = getRules();
  const s = rules.signals;

  const signals: AEOSignal[] = [
    {
      key: "entity",
      label: s.entity.label,
      description: s.entity.description,
      score: judge.entity,
      maxScore: s.entity.maxScore,
    },
    {
      key: "citation",
      label: s.citation.label,
      description: s.citation.description,
      score: scoreCitation(markdown, hasSources),
      maxScore: s.citation.maxScore,
    },
    {
      key: "structure",
      label: s.structure.label,
      description: s.structure.description,
      score: scoreStructure(markdown),
      maxScore: s.structure.maxScore,
    },
    {
      key: "depth",
      label: s.depth.label,
      description: s.depth.description,
      score: judge.depth,
      maxScore: s.depth.maxScore,
    },
    {
      key: "freshness",
      label: s.freshness.label,
      description: s.freshness.description,
      score: scoreFreshness(markdown),
      maxScore: s.freshness.maxScore,
    },
  ];

  const totalScore = signals.reduce((sum, x) => sum + x.score, 0);

  // Derive notes from anything scoring <80% of max. Copy comes from rules.
  const notes: OptimisationNote[] = signals
    .filter((sig) => sig.score / sig.maxScore < 0.8)
    .map<OptimisationNote>((sig) => {
      let impact = rules.notes.impactCopy[sig.key];
      // When the citation signal is low because no sources were supplied,
      // explain the ceiling — otherwise users see "Citation Signals 7/25"
      // and assume the engine is broken.
      if (sig.key === "citation" && !hasSources) {
        impact = `Without sources, citation signals are capped at 14/25. Add URLs or file uploads to unlock the remaining 11 points. ${impact}`;
      }
      return {
        category: sig.key,
        change: `${sig.label} flagged at ${sig.score}/${sig.maxScore}`,
        impact,
      };
    });

  return { signals, totalScore, notes };
}
