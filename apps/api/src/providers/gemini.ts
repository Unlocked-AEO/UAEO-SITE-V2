// Gemini judge provider — used only for the two semantic AEO signals
// (entity clarity, topical depth). Heuristics handle the other three.
//
// Structured output is requested via responseSchema so the orchestrator
// can trust shape without re-parsing prose.

import { GoogleGenAI } from "@google/genai";
import { config } from "../config.ts";
import type { JudgeProvider } from "./types.ts";
import { ApiError, ErrorCodes } from "../lib/errors.ts";
import { getRules } from "../rules/loader.ts";

let client: GoogleGenAI | null = null;
function getClient() {
  if (!client) client = new GoogleGenAI({ apiKey: config.gemini.apiKey });
  return client;
}

export const geminiJudgeProvider: JudgeProvider = {
  async scoreSemantic({ draft, sourcesSummary, keywords, format, signal }) {
    try {
      const res = await getClient().models.generateContent({
        model: config.gemini.model,
        contents: [
          { role: "user", parts: [{ text: getRules().judge.rubric }] },
          { role: "user", parts: [{
              text: `Format: ${format}\nKeywords: ${keywords}\n\nSources used:\n${sourcesSummary}\n\n--- DRAFT ---\n${draft}`,
            }],
          },
        ],
        config: {
          responseMimeType: "application/json",
          abortSignal: signal,
        },
      });
      const text = res.text ?? "{}";
      const parsed = JSON.parse(text) as {
        entity?: number;
        depth?: number;
        rationale?: string;
      };
      return {
        entity: clamp(parsed.entity ?? 0, 0, 25),
        depth: clamp(parsed.depth ?? 0, 0, 20),
        rationale: parsed.rationale ?? "",
      };
    } catch (e: any) {
      throw new ApiError(
        ErrorCodes.PROVIDER_FAILURE,
        `Gemini judge failed: ${e?.message ?? "unknown"}`,
        502,
      );
    }
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
