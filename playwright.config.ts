import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:3017",
    channel: "msedge",
    headless: true,
    screenshot: "only-on-failure",
  },
  webServer: {
    command:
      "node --preserve-symlinks --preserve-symlinks-main scripts/serve-production.mjs",
    url: "http://127.0.0.1:3017",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
