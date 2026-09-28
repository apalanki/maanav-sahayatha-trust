/**
 * Rendering, layout, and navigation checks. Runs on both the desktop and mobile projects
 * (see playwright.config.ts) against the production build.
 */
import { expect, test } from "@playwright/test";
import { PAGES, PROGRAM_ROUTES, headerLink, trackErrors, url } from "./helpers";

for (const route of Object.keys(PAGES)) {
  test(`${route} renders without errors or layout overflow`, async ({
    page,
  }) => {
    const errors = trackErrors(page);
    await page.goto(url(route), { waitUntil: "networkidle" });

    await expect(page).toHaveTitle(PAGES[route].title);
    await expect(page.locator("h1")).toHaveCount(1);

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    );
    expect(overflow, "horizontal scroll (px)").toBeLessThanOrEqual(0);

    // Load lazy images too, then make sure none are broken
    await page.evaluate(() =>
      document.querySelectorAll("img").forEach(img => (img.loading = "eager"))
    );
    await page.waitForLoadState("networkidle");
    const broken = await page.evaluate(() =>
      [...document.images]
        .filter(img => img.complete && img.naturalWidth === 0)
        .map(img => img.src)
    );
    expect(broken, "broken images").toEqual([]);
    expect(errors, "console errors / failed requests").toEqual([]);
  });
}

test("home page sections appear in the intended order", async ({ page }) => {
  await page.goto(url("/"));
  const sectionIds = await page
    .locator("section[id]")
    .evaluateAll(els => els.map(el => el.id));
  expect(sectionIds).toEqual(["about", "programs", "story", "donate"]);
});

for (const route of PROGRAM_ROUTES) {
  test(`${route} has a breadcrumb and links to the other programs`, async ({
    page,
  }) => {
    await page.goto(url(route));
    await expect(
      page.getByRole("navigation", { name: "Breadcrumb" })
    ).toContainText("Home");
    const otherPrograms = page
      .getByRole("navigation", { name: "Other programs" })
      .getByRole("link");
    await expect(otherPrograms).toHaveCount(PROGRAM_ROUTES.length - 1);
  });
}

test.describe("navigation", () => {
  test("program link navigates, updates the title, and survives a reload", async ({
    page,
  }) => {
    await page.goto(url("/"));
    await page.getByRole("link", { name: "Learn More" }).first().click();
    await expect(page).toHaveURL(url("/programs/education"));
    await expect(page).toHaveTitle(PAGES["/programs/education"].title);

    await page.reload();
    await expect(page).toHaveTitle(PAGES["/programs/education"].title);
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("About Us from a program page lands on Our Story", async ({
    page,
    isMobile,
  }) => {
    await page.goto(url("/programs/medical"));
    await (await headerLink(page, isMobile, "About Us")).click();
    await expect(page).toHaveURL(url("/#about"));
    await expect
      .poll(() =>
        page.evaluate(
          () => document.getElementById("about")!.getBoundingClientRect().top
        )
      )
      .toBeLessThan(300);
  });

  test("Contact opens the contact page", async ({ page, isMobile }) => {
    await page.goto(url("/programs/tribal"));
    await (await headerLink(page, isMobile, "Contact")).click();
    await expect(page).toHaveURL(url("/contact"));
    await expect(page.locator("h1")).toHaveText("We'd Love to Hear From You");
  });

  test("logo returns to the top of the home page", async ({ page }) => {
    const logo = page.getByRole("link", { name: "Manav Sahayata Trust home" });
    const scrollY = () => page.evaluate(() => window.scrollY);

    await page.goto(url("/programs/medical"));
    await page.evaluate(() => window.scrollTo(0, 2000));
    await logo.click();
    await expect(page).toHaveURL(url("/"));
    await expect.poll(scrollY).toBeLessThan(5);

    // Already on the home page: must still scroll back up
    await page.evaluate(() => window.scrollTo(0, 2000));
    await logo.click();
    await expect.poll(scrollY).toBeLessThan(5);
  });

  test("Programs dropdown opens with the keyboard", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "desktop navigation only");
    await page.goto(url("/"));
    await page.locator("header button", { hasText: "Programs" }).focus();
    await expect(
      page
        .locator("header nav")
        .first()
        .getByRole("link", { name: "Bala Vikas" })
    ).toBeVisible();
  });

  test("mobile menu lists every destination", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile navigation only");
    await page.goto(url("/"));
    await page.getByLabel("Toggle menu").click();
    const menu = page.locator("header nav.lg\\:hidden");
    for (const name of [
      "About Us",
      "Education",
      "Bala Vikas",
      "Medical Services",
      "Contact",
      "Donate",
    ]) {
      await expect(menu.getByRole("link", { name })).toBeVisible();
    }
  });

  test("unknown URL shows the Not Found page with a 404 status", async ({
    page,
  }) => {
    const response = await page.goto(url("/no-such-page"));
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("404");
  });
});
