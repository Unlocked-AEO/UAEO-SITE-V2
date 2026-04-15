// Server-Sent Events helper. The orchestrator pushes structured events
// here; clients consume them via EventSource. We always set the proxy-
// busting headers because nginx and Cloudflare buffer SSE responses by
// default — symptom is the Processing UI looking frozen.

import type { FastifyReply } from "fastify";

export type SseEventName =
  | "stage"
  | "draftDelta"
  | "iteration"
  | "warning"
  | "done"
  | "error";

export interface SseChannel {
  send(event: SseEventName, data: unknown, id?: string): void;
  heartbeat(): void;
  close(): void;
  closed: boolean;
}

export function openSse(reply: FastifyReply): SseChannel {
  reply.raw.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no", // disables nginx buffering
  });

  let closed = false;
  reply.raw.on("close", () => {
    closed = true;
  });

  function write(chunk: string) {
    if (closed) return;
    try {
      reply.raw.write(chunk);
    } catch {
      closed = true;
    }
  }

  return {
    get closed() {
      return closed;
    },
    send(event, data, id) {
      const lines: string[] = [];
      if (id) lines.push(`id: ${id}`);
      lines.push(`event: ${event}`);
      lines.push(`data: ${JSON.stringify(data)}`);
      write(lines.join("\n") + "\n\n");
    },
    heartbeat() {
      write(`: heartbeat ${Date.now()}\n\n`);
    },
    close() {
      if (!closed) {
        closed = true;
        reply.raw.end();
      }
    },
  };
}
