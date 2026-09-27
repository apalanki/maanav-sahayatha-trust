import { existsSync, readFileSync } from "node:fs";
import type { Page } from "@playwright/test";

/** Custom domain from client/public/CNAME ("" when deploying to the GitHub Pages subpath) */
const CNAME = existsSync("client/public/CNAME")
  ? readFileSync("client/public/CNAME", "utf8").trim()
  : "";

/** Public URL the build writes into canonical tags, sitemap, and social previews */
export const SITE_URL = CNAME
  ? `https://${CNAME}`
  : "https://apalanki.github.io/maanav-sahayatha-trust";

export const PORT = 4321;
const BASE_PATH = CNAME ? "" : "/maanav-sahayatha-trust";

/** Local URL of a route on the test server (scripts/serve-dist.mjs) */
export const url = (route: string) =>
  `http://localhost:${PORT}${BASE_PATH}${route}`;

type PageMeta = { title: string; description: string; image: string };
export const PAGES: Record<string, PageMeta> = JSON.parse(
  readFileSync("client/src/lib/seo-pages.json", "utf8")
).pages;
export const PROGRAM_ROUTES = Object.keys(PAGES).filter(route => route !== "/");

/** Collect page errors, console errors, and failed requests for later assertion */
export function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => {
    // Failed requests are reported below with their URL
    if (m.type() === "error" && !m.text().startsWith("Failed to load resource"))
      errors.push(m.text());
  });
  page.on("response", r => {
    if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`);
  });
  return errors;
}

/** Header link by name; opens the mobile menu first on phone-sized viewports */
export async function headerLink(page: Page, isMobile: boolean, name: string) {
  if (isMobile) {
    await page.getByLabel("Toggle menu").click();
    return page.locator("header nav.lg\\:hidden").getByRole("link", { name });
  }
  return page.locator("header nav").first().getByRole("link", { name });
}

export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
