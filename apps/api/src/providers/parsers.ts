// File parsers for uploaded source material. Each parser takes a
// buffer + mime and returns cleaned plain text (or markdown where the
// original is already structured). Errors are thrown as typed ApiErrors
// so the upload route can return a sensible response.

import mammoth from "mammoth";
import { extractText, getDocumentProxy } from "unpdf";
import { ApiError, ErrorCodes } from "../lib/errors.ts";

export async function parseUpload(buffer: Uint8Array, mime: string, filename: string): Promise<string> {
  const lower = filename.toLowerCase();

  if (mime === "application/pdf" || lower.endsWith(".pdf")) {
    return parsePdf(buffer);
  }
  if (
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lower.endsWith(".docx")
  ) {
    return parseDocx(buffer);
  }
  if (mime === "text/html" || lower.endsWith(".html") || lower.endsWith(".htm")) {
    return parseHtml(Buffer.from(buffer).toString("utf-8"));
  }
  // .md, .markdown, .txt, anything else text/*
  return cleanPlain(Buffer.from(buffer).toString("utf-8"));
}

async function parsePdf(buffer: Uint8Array): Promise<string> {
  let pdf;
  try {
    pdf = await getDocumentProxy(buffer);
  } catch (e: any) {
    if (/password/i.test(e?.message ?? "")) {
      throw new ApiError(ErrorCodes.PDF_ENCRYPTED, "PDF is password-protected", 400);
    }
    throw new ApiError(ErrorCodes.PDF_NO_TEXT_LAYER, "Could not parse PDF", 400);
  }
  const { text } = await extractText(pdf, { mergePages: true });
  const merged = Array.isArray(text) ? text.join("\n\n") : text;
  const cleaned = cleanPlain(merged);
  const alpha = cleaned.replace(/[^a-zA-Z0-9]/g, "").length;
  if (cleaned.length === 0 || alpha / Math.max(cleaned.length, 1) < 0.3) {
    throw new ApiError(
      ErrorCodes.PDF_NO_TEXT_LAYER,
      "PDF has no extractable text layer (likely scanned image). OCR is not yet supported.",
      400,
    );
  }
  return cleaned;
}

async function parseDocx(buffer: Uint8Array): Promise<string> {
  try {
    const { value } = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
    return cleanPlain(value);
  } catch (e: any) {
    throw new ApiError("DOCX_PARSE_FAILED", `Could not parse .docx: ${e?.message ?? "unknown"}`, 400);
  }
}

function parseHtml(html: string): string {
  // Lightweight tag strip + entity decode. Good enough for source
  // material — we're feeding this to Claude, not rendering it.
  const noScripts = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  const noTags = noScripts.replace(/<[^>]+>/g, " ");
  const decoded = noTags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return cleanPlain(decoded);
}

function cleanPlain(s: string): string {
  return s
    .replace(/\f/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
