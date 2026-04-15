// /content/uploads — multipart upload of .md / .pdf source materials.
// Files are parsed at upload time so the orchestrator can use the
// cleaned text directly (and so we never re-parse the same PDF twice).

import { createHash, randomUUID } from "node:crypto";
import type { FastifyInstance } from "fastify";
import type { UploadRecord } from "@unlocked/types";
import { ApiError, ErrorCodes } from "../lib/errors.ts";
import { parseUpload } from "../providers/parsers.ts";
import type { ContentRepository } from "../repository/ContentRepository.ts";

// Permissive — the parser dispatches on MIME + filename extension.
// Unknown text/* types fall through to plain-text decoding.
const ALLOWED_EXT = [".pdf", ".md", ".markdown", ".txt", ".html", ".htm", ".docx"];
const ALLOWED_MIME_PREFIX = ["text/", "application/pdf", "application/vnd.openxmlformats"];

const MAX_BYTES = 10 * 1024 * 1024;

export function registerUploadRoutes(
  app: FastifyInstance,
  deps: { repo: ContentRepository },
) {
  // Maps to ACTION: content_upload_sources
  app.post("/content/uploads", async (req, reply) => {
    const file = await req.file();
    if (!file) throw new ApiError(ErrorCodes.UPLOAD_BAD_TYPE, "No file in request", 400);

    const buffer = await file.toBuffer();
    if (buffer.byteLength > MAX_BYTES) {
      throw new ApiError(ErrorCodes.UPLOAD_TOO_LARGE, "File exceeds 10MB", 413);
    }
    const nameLower = file.filename.toLowerCase();
    const extOk = ALLOWED_EXT.some((e) => nameLower.endsWith(e));
    const mimeOk = ALLOWED_MIME_PREFIX.some((p) => file.mimetype.startsWith(p));
    if (!extOk && !mimeOk) {
      throw new ApiError(
        ErrorCodes.UPLOAD_BAD_TYPE,
        `Unsupported file type: ${file.mimetype || nameLower}`,
        415,
      );
    }

    const parsedText = await parseUpload(new Uint8Array(buffer), file.mimetype, file.filename);

    const contentHash = createHash("sha256").update(buffer).digest("hex");
    const record: UploadRecord = {
      id: randomUUID(),
      workspaceId: req.workspaceId,
      filename: file.filename,
      mime: file.mimetype,
      sizeBytes: buffer.byteLength,
      contentHash,
      parsedText,
      tokenCount: estimateTokens(parsedText),
      createdAt: new Date().toISOString(),
    };
    await deps.repo.saveUpload(record);

    reply.code(201).send({
      uploadId: record.id,
      filename: record.filename,
      sizeBytes: record.sizeBytes,
      tokenCount: record.tokenCount,
      preview: parsedText.slice(0, 400),
    });
  });
}

function estimateTokens(text: string) {
  // Quick heuristic: ~4 chars per token. Replace with tiktoken/anthropic
  // counter when accuracy matters for billing.
  return Math.ceil(text.length / 4);
}
