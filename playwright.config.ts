import { defineConfig } from "@playwright/test";
import { PORT, url } from "./e2e/helpers";

/**
 * End-to-end tests run against the production build, served the way GitHub Pages serves it.
 *
 *   pnpm test:e2e                      # uses Playwright's Chromium (first run: pnpm exec playwright install chromium)
 *   PW_CHANNEL=chrome pnpm test:e2e    # uses your installed Google Chrome instead
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // In CI: annotations on the workflow run + an HTML report uploaded when tests fail
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : "list",
  use: {
    channel: process.env.PW_CHANNEL || undefined,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm run build && node scripts/serve-dist.mjs",
    url: url("/robots.txt"),
    // Fake Web3Forms key so the contact form renders; e2e/contact.spec.ts intercepts the API call
    env: { PORT: String(PORT), VITE_WEB3FORMS_ACCESS_KEY: "e2e-test-key",
      // Sample activity updates (client/src/content/update-fixtures), never in production
      VITE_INCLUDE_TEST_UPDATES: "1",
    },
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [
    {
      name: "desktop",
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      testIgnore: /seo\.spec\.ts/, // raw-HTML checks don't depend on the viewport
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    },
  ],
});
