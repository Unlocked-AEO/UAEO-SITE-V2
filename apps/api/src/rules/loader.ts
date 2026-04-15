// Boot-time loader for apps/api/rules/content-rules.yaml.
// Reads + parses + validates once; every subsequent getRules() call
// returns the same frozen object. A parse or schema error at boot is
// fatal — we'd rather fail here than ship a misconfigured engine.
//
// Hot reload is deliberately out of scope for v1. If we want it later,
// add a chokidar watcher here that re-runs load() and swaps the
// module-local `cached` atomically.

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { contentRulesSchema, type ContentRules } from "./schema.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// src/rules/loader.ts → ../../rules/content-rules.yaml
const RULES_PATH = resolve(__dirname, "../../rules/content-rules.yaml");

let cached: ContentRules | null = null;

export function loadRules(): ContentRules {
  if (cached) return cached;
  let raw: string;
  try {
    raw = readFileSync(RULES_PATH, "utf-8");
  } catch (e: any) {
    throw new Error(`[rules] could not read ${RULES_PATH}: ${e?.message ?? e}`);
  }
  let parsed: unknown;
  try {
    parsed = yaml.load(raw);
  } catch (e: any) {
    throw new Error(`[rules] YAML parse error in ${RULES_PATH}: ${e?.message ?? e}`);
  }
  const result = contentRulesSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".") || "<root>"}: ${i.message}`)
      .join("\n");
    throw new Error(`[rules] schema validation failed for ${RULES_PATH}:\n${issues}`);
  }
  cached = Object.freeze(result.data);
  return cached;
}

export function getRules(): ContentRules {
  if (!cached) return loadRules();
  return cached;
}
