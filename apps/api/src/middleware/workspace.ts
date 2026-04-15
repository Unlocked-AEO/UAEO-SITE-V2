// Workspace extraction middleware. **TODO**: replace this dev shim with
// real JWT verification + workspace lookup once auth is wired into the
// rest of the product. For now we accept an `x-workspace-id` header or
// fall back to a single-tenant default so the API is usable end-to-end.

import type { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    workspaceId: string;
  }
}

export async function workspaceMiddleware(req: FastifyRequest, _reply: FastifyReply) {
  const header = req.headers["x-workspace-id"];
  req.workspaceId = (Array.isArray(header) ? header[0] : header) ?? "ws-default";
}
