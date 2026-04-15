// Fastify entrypoint. Boots the server, registers plugins, wires the
// repository and provider triple, and mounts every route module.
//
// To run real LLMs:  PROVIDER_MODE=real npm run dev:api
// To run mock-only:  npm run dev:api  (default)

// Env vars are loaded via Node's `--env-file=.env` flag (see package.json
// scripts) — no dotenv dependency needed.
import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { config, assertRealProvidersConfigured } from "./config.ts";
import { loadRules } from "./rules/loader.ts";
import { workspaceMiddleware } from "./middleware/workspace.ts";
import { MemoryAdapter } from "./repository/memory.adapter.ts";
import { buildProviders } from "./providers/index.ts";
import { registerContentRoutes } from "./routes/content.routes.ts";
import { registerLibraryRoutes } from "./routes/library.routes.ts";
import { registerUploadRoutes } from "./routes/uploads.routes.ts";
import { ApiError } from "./lib/errors.ts";

assertRealProvidersConfigured();

// Validate + freeze content rules at boot. Any schema error here
// prevents the server from starting — we'd rather fail loudly now than
// serve misconfigured generations.
const rules = loadRules();

const app = Fastify({
  logger: {
    level: config.logLevel,
    transport: { target: "pino-pretty", options: { translateTime: "HH:MM:ss" } },
  },
});

await app.register(cors, { origin: config.corsOrigin, credentials: true });
await app.register(multipart, { limits: { fileSize: 10 * 1024 * 1024 } });

app.addHook("preHandler", workspaceMiddleware);

app.setErrorHandler((err, _req, reply) => {
  if (err instanceof ApiError) {
    reply.code(err.status).send({ code: err.code, message: err.message, retryAfter: err.retryAfter });
    return;
  }
  app.log.error(err);
  reply.code(500).send({ code: "INTERNAL", message: "Internal server error" });
});

const repo = new MemoryAdapter();
const providers = buildProviders();

app.get("/healthz", async () => ({
  ok: true,
  providerMode: config.providerMode,
  uptime: process.uptime(),
  rules: { name: rules.name, updatedAt: rules.updatedAt, version: rules.version },
}));

registerContentRoutes(app, { repo, providers });
registerLibraryRoutes(app, { repo });
registerUploadRoutes(app, { repo });

const port = config.port;
app
  .listen({ port, host: "0.0.0.0" })
  .then(addr => app.log.info(`API listening on ${addr} (mode=${config.providerMode})`))
  .catch(err => {
    app.log.error(err);
    process.exit(1);
  });
