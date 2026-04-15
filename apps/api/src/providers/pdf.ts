// PDF parser. Uses unpdf (modern, ESM, no native deps).
// Returns a typed error if the PDF is encrypted or has no extractable
// text layer (image-only / scanned). OCR fallback is v1.1.

import { extractText, getDocumentProxy } from "unpdf";
import { ApiError, ErrorCodes } from "../lib/errors.ts";

export async function parsePdf(buffer: Uint8Array): Promise<string> {
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
  const cleaned = merged
    .replace(/\f/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Heuristic: if the result is mostly non-alphanumeric, treat as OCR-needed.
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
