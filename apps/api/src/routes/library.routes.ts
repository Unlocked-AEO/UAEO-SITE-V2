// /library/* — persistence and retrieval of approved content pieces.
// Maps to the Library view's ACTIONs and to "Save to library" on Output.

import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { ApiError } from "../lib/errors.ts";
import type { ContentRepository } from "../repository/ContentRepository.ts";

const saveSchema = z.object({
  draftId: z.string(),
  title: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const listQuerySchema = z.object({
  status: z.enum(["approved", "draft", "in-review", "archived"]).optional(),
  q: z.string().optional(),
  sort: z.enum(["recent", "score-desc", "score-asc"]).optional(),
});

const patchSchema = z.object({
  title: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["approved", "draft", "in-review", "archived"]).optional(),
});

export function registerLibraryRoutes(
  app: FastifyInstance,
  deps: { repo: ContentRepository },
) {
  app.get("/library", async (req, reply) => {
    const query = listQuerySchema.parse(req.query);
    const items = await deps.repo.listLibrary(req.workspaceId, query);
    reply.send(items);
  });

  app.post("/library", async (req, reply) => {
    const body = saveSchema.parse(req.body);
    const item = await deps.repo.saveToLibrary(req.workspaceId, body.draftId, {
      title: body.title,
      tags: body.tags,
    });
    reply.code(201).send(item);
  });

  app.get<{ Params: { id: string } }>("/library/:id", async (req, reply) => {
    const item = await deps.repo.getLibraryItem(req.workspaceId, req.params.id);
    if (!item) throw new ApiError("LIBRARY_NOT_FOUND", "Library item not found", 404);
    reply.send(item);
  });

  app.patch<{ Params: { id: string } }>("/library/:id", async (req, reply) => {
    const patch = patchSchema.parse(req.body);
    const item = await deps.repo.updateLibrary(req.workspaceId, req.params.id, patch);
    reply.send(item);
  });

  app.delete<{ Params: { id: string } }>("/library/:id", async (req, reply) => {
    await deps.repo.deleteLibrary(req.workspaceId, req.params.id);
    reply.code(204).send();
  });
}
