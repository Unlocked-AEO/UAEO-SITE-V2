// Typed error class so route handlers can map known failures to HTTP
// status codes and SSE `error` events without leaking stack traces.

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status = 400,
    public readonly retryAfter?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const ErrorCodes = {
  PDF_NO_TEXT_LAYER: "PDF_NO_TEXT_LAYER",
  PDF_ENCRYPTED: "PDF_ENCRYPTED",
  UPLOAD_TOO_LARGE: "UPLOAD_TOO_LARGE",
  UPLOAD_BAD_TYPE: "UPLOAD_BAD_TYPE",
  JOB_NOT_FOUND: "JOB_NOT_FOUND",
  DRAFT_NOT_FOUND: "DRAFT_NOT_FOUND",
  PROVIDER_RATE_LIMIT: "PROVIDER_RATE_LIMIT",
  PROVIDER_FAILURE: "PROVIDER_FAILURE",
  QUOTA_EXCEEDED: "QUOTA_EXCEEDED",
} as const;
