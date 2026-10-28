// Dedicated production preview for QA; avoids sharing a running dev server.
import { startServer } from "next/dist/server/lib/start-server.js";
await startServer({
  dir: process.cwd(),
  isDev: false,
  hostname: "127.0.0.1",
  port: Number(process.env.PREVIEW_PORT || 3017),
});
