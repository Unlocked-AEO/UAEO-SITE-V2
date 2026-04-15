// Real Claude (Anthropic) provider. Used for both drafting (streamed)
// and refinement. Wraps @anthropic-ai/sdk with:
//   - prompt caching on the corpus block (`cache_control: ephemeral`)
//   - exponential backoff on 429 / 529 (overloaded)
//   - AbortSignal propagation so client disconnects actually stop billing
//
// NOTE: this file is the wiring stub. Full streaming SDK call is left
// as TODO since PROVIDER_MODE=mock covers the vertical slice.

import Anthropic from "@anthropic-ai/sdk";
import { config } from "../config.ts";
import type { DraftProvider } from "./types.ts";
import { ApiError, ErrorCodes } from "../lib/errors.ts";

let client: Anthropic | null = null;
function getClient() {
  if (!client) client = new Anthropic({ apiKey: config.anthropic.apiKey });
  return client;
}

async function withBackoff<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e: any) {
      lastErr = e;
      const status = e?.status ?? e?.response?.status;
      if (status !== 429 && status !== 529) throw e;
      const delayMs = 500 * 2 ** i;
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new ApiError(
    ErrorCodes.PROVIDER_RATE_LIMIT,
    "Anthropic rate-limited after retries",
    503,
    5,
  );
}

export const claudeDraftProvider: DraftProvider = {
  async streamDraft({ systemUncached, systemCached, user, signal, onDelta }) {
    return withBackoff(async () => {
      const stream = await getClient().messages.stream(
        {
          model: config.anthropic.model,
          max_tokens: 4096,
          system: [
            { type: "text", text: systemUncached },
            { type: "text", text: systemCached, cache_control: { type: "ephemeral" } },
          ],
          messages: [{ role: "user", content: user }],
        },
        { signal },
      );

      let full = "";
      for await (const evt of stream) {
        if (evt.type === "content_block_delta" && evt.delta.type === "text_delta") {
          full += evt.delta.text;
          onDelta(evt.delta.text);
        }
      }
      return full;
    });
  },

  async refine({ systemUncached, systemCached, user, signal, onDelta }) {
    return withBackoff(async () => {
      const stream = await getClient().messages.stream(
        {
          model: config.anthropic.model,
          max_tokens: 4096,
          system: [
            { type: "text", text: systemUncached },
            { type: "text", text: systemCached, cache_control: { type: "ephemeral" } },
          ],
          messages: [{ role: "user", content: user }],
        },
        { signal },
      );

      let full = "";
      for await (const evt of stream) {
        if (evt.type === "content_block_delta" && evt.delta.type === "text_delta") {
          full += evt.delta.text;
          onDelta?.(evt.delta.text);
        }
      }
      return full;
    });
  },
};
