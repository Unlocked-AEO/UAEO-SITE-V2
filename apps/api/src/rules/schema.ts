// Zod schema for externally authored content rules.
// The file at apps/api/rules/content-rules.yaml must match this shape;
// the loader validates at boot and refuses to start the server if not.
//
// When you add a field to the YAML, add it here too. When you bump the
// schema in a backwards-incompatible way, bump `version`.

import { z } from "zod";

const signalSchema = z.object({
  label: z.string().min(1),
  description: z.string().min(1),
  maxScore: z.number().int().positive(),
});

const voiceSchema = z.object({
  description: z.string().min(1),
  target: z.string().min(1),
  avoid: z.string().min(1),
  litmusTest: z.string().min(1),
});

const snippetsSchema = z.object({
  intro: z.string().min(1),
  idealParagraph: z.array(z.string().min(1)).min(1),
  test: z.string().min(1),
  avoid: z.string().min(1),
});

const listsSchema = z.object({
  intro: z.string().min(1),
  when: z.array(z.string().min(1)).min(1),
  formatting: z.array(z.string().min(1)).min(1),
  numbered: z.string().min(1),
  bulleted: z.string().min(1),
});

const tablesSchema = z.object({
  intro: z.string().min(1),
  when: z.array(z.string().min(1)).min(1),
  formatting: z.array(z.string().min(1)).min(1),
});

const paragraphsSchema = z.object({
  splitWhen: z.array(z.string().min(1)).min(1),
  length: z.object({
    snippet: z.string().min(1),
    context: z.string().min(1),
    max: z.string().min(1),
  }),
  spacing: z.array(z.string().min(1)).min(1),
});

const avoidSchema = z.object({
  fillerOpeners: z.array(z.string().min(1)).min(1),
  weakHedges: z.array(z.string().min(1)).min(1),
  structuralLaziness: z.array(z.string().min(1)).min(1),
  finalChecks: z.array(z.string().min(1)).min(1),
});

const refinementSchema = z.object({
  intro: z.string().min(1),
  rules: z.array(z.string().min(1)).min(1),
});

const judgeSchema = z.object({
  rubric: z.string().min(1),
});

export const contentRulesSchema = z.object({
  version: z.literal(1),
  name: z.string().min(1),
  updatedAt: z.string().min(1),

  // Per-signal metadata. Keys must exactly match AEOSignal["key"] in @unlocked/types.
  signals: z.object({
    entity: signalSchema,
    citation: signalSchema,
    structure: signalSchema,
    depth: signalSchema,
    freshness: signalSchema,
  }).refine(
    (sigs) => {
      const total = sigs.entity.maxScore + sigs.citation.maxScore + sigs.structure.maxScore + sigs.depth.maxScore + sigs.freshness.maxScore;
      return total === 100;
    },
    { message: "signal maxScores must sum to 100" },
  ),

  // Drafting rules — composed into the Claude system prompt.
  persona: z.string().min(1),
  voice: voiceSchema,
  structure: z.object({
    rules: z.array(z.string().min(1)).min(1),
  }),
  snippets: snippetsSchema,
  lists: listsSchema,
  tables: tablesSchema,
  paragraphs: paragraphsSchema,
  avoid: avoidSchema,

  // Format + tone guidance. Keys must cover every ContentFormat / ContentTone.
  formats: z.object({
    "blog-post": z.string().min(1),
    faq: z.string().min(1),
    comparison: z.string().min(1),
    "pillar-page": z.string().min(1),
    "how-to": z.string().min(1),
  }),
  tones: z.object({
    technical: z.string().min(1),
    accessible: z.string().min(1),
    authoritative: z.string().min(1),
  }),

  refinement: refinementSchema,
  judge: judgeSchema,

  notes: z.object({
    impactCopy: z.object({
      entity: z.string().min(1),
      citation: z.string().min(1),
      structure: z.string().min(1),
      depth: z.string().min(1),
      freshness: z.string().min(1),
    }),
  }),

  thresholds: z.object({
    passScore: z.number().int().min(0).max(100),
    maxAutoPasses: z.number().int().min(1).max(10),
  }),
});

export type ContentRules = z.infer<typeof contentRulesSchema>;
