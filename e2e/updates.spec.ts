/**
 * Activity updates timeline. Test builds include the sample posts in
 * client/src/content/update-fixtures/ (VITE_INCLUDE_TEST_UPDATES); production has only real posts.
 */
import { readFileSync, readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { SITE_URL, trackErrors, url } from "./helpers";

const DIR = "client/src/content/update-fixtures";
const POSTS = readdirSync(DIR)
  .filter(f => f.endsWith(".json"))
  .map(f => ({
    slug: f.replace(/\.json$/, ""),
    ...JSON.parse(readFileSync(`${DIR}/${f}`, "utf8")),
  }))
  .sort((a, b) => b.date.localeCompare(a.date)) as {
  slug: string;
  date: string;
  title: string;
  program: string;
  photos: { src: string; alt: string }[];
}[];
const NEWEST = POSTS[0];
const MANY_PHOTOS = POSTS.find(p => p.photos.length >= 3)!;

test("the Updates page lists posts newest first on a timeline", async ({
  page,
}) => {
  const errors = trackErrors(page);
  await page.goto(url("/updates"));
  await expect(page.locator("h1")).toHaveText("Latest Updates");
  const cards = page.locator("main ol [data-testid=update-card]");
  await expect(cards).toHaveCount(POSTS.length);
  const dates = await cards
    .locator("time")
    .evaluateAll(els => els.map(el => el.getAttribute("datetime")));
  expect(dates).toEqual(POSTS.map(p => p.date));
  await expect(cards.first().getByRole("heading")).toHaveText(NEWEST.title);
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth
  );
  expect(overflow, "horizontal scroll (px)").toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test("program filters show only that program's posts", async ({ page }) => {
  await page.goto(url("/updates"));
  const filters = page.getByRole("navigation", {
    name: "Filter updates by program",
  });
  await filters.getByRole("link", { name: "Bala Vikas" }).click();
  await expect(page).toHaveURL(url("/updates?program=bala-vikas"));
  const cards = page.locator("main ol [data-testid=update-card]");
  await expect(cards).toHaveCount(
    POSTS.filter(p => p.program === "bala-vikas").length
  );
  await filters.getByRole("link", { name: "All" }).click();
  await expect(cards).toHaveCount(POSTS.length);
});

test("photos open in a full-screen viewer with next/previous and Esc", async ({
  page,
}) => {
  await page.goto(url("/updates"));
  const card = page
    .locator("main ol [data-testid=update-card]")
    .filter({ hasText: MANY_PHOTOS.title });
  await card.getByRole("button", { name: /View photo 1 of/ }).click();
  const viewer = page.getByRole("dialog");
  await expect(viewer).toBeVisible();
  await expect(viewer).toContainText(`1 / ${MANY_PHOTOS.photos.length}`);
  await viewer.getByRole("button", { name: "Next photo" }).click();
  await expect(viewer).toContainText(`2 / ${MANY_PHOTOS.photos.length}`);
  await expect(viewer.locator("img")).toHaveAttribute(
    "alt",
    MANY_PHOTOS.photos[1].alt
  );
  await page.keyboard.press("ArrowLeft");
  await expect(viewer).toContainText(`1 / ${MANY_PHOTOS.photos.length}`);
  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
});

test("each post has its own page with search and share tags", async ({
  page,
  request,
}) => {
  const html = await (await request.get(url(`/updates/${NEWEST.slug}`))).text();
  expect(html).toContain(
    `<link rel="canonical" href="${SITE_URL}/updates/${NEWEST.slug}" />`
  );
  expect(html).toContain('<meta property="og:type" content="article" />');
  expect(html).toContain('"@type":"BlogPosting"');
  expect(html).toContain(`"datePublished":"${NEWEST.date}"`);

  await page.goto(url(`/updates/${NEWEST.slug}`));
  await expect(page.locator("h1")).toHaveText(NEWEST.title);
  await expect(page).toHaveTitle(`${NEWEST.title} | Maanav Sahayata Trust`);
  await expect(
    page.getByRole("link", { name: "Share on WhatsApp" })
  ).toHaveAttribute("href", /^https:\/\/wa\.me\/\?text=/);
  await expect(
    page.getByRole("heading", { name: "More Updates" })
  ).toBeVisible();
});

test("an unknown post shows the Not Found page", async ({ page }) => {
  await page.goto(url("/updates/2020-01-01-does-not-exist"));
  await expect(page.locator("h1")).toHaveText("404");
});

test("the home page shows the latest three posts", async ({ page }) => {
  await page.goto(url("/"));
  const section = page.locator("#updates");
  await expect(
    section.getByRole("heading", { name: "Latest from the Field" })
  ).toBeVisible();
  await expect(section.locator("[data-testid=update-card]")).toHaveCount(
    Math.min(3, POSTS.length)
  );
  await section.getByRole("link", { name: "See all updates" }).click();
  await expect(page).toHaveURL(url("/updates"));
});

test("program pages show only their own recent updates", async ({ page }) => {
  await page.goto(url("/programs/bala-vikas"));
  const recent = page.getByTestId("latest-updates");
  await expect(
    recent.getByRole("heading", { name: "Recent Updates" })
  ).toBeVisible();
  await expect(recent.locator("[data-testid=update-card]")).toHaveCount(
    POSTS.filter(p => p.program === "bala-vikas").length
  );
  // A program with no posts shows no section at all
  await page.goto(url("/programs/medical"));
  await expect(page.getByTestId("latest-updates")).toHaveCount(0);
});

test("the header links to Updates once posts exist", async ({
  page,
  isMobile,
}) => {
  await page.goto(url("/"));
  if (isMobile) await page.getByLabel("Toggle menu").click();
  const nav = page
    .locator(isMobile ? "header nav.lg\\:hidden" : "header nav")
    .first();
  await nav.getByRole("link", { name: "Updates" }).click();
  await expect(page).toHaveURL(url("/updates"));
});

test("the sitemap lists the Updates page and every post", async ({
  request,
}) => {
  const xml = await (await request.get(url("/sitemap.xml"))).text();
  expect(xml).toContain(`<loc>${SITE_URL}/updates/</loc>`);
  for (const post of POSTS) {
    expect(xml).toContain(
      `<loc>${SITE_URL}/updates/${post.slug}</loc><lastmod>${post.date}</lastmod>`
    );
  }
});
