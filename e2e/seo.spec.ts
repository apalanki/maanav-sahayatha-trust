/**
 * SEO checks on the raw HTML, i.e. what search engines and link-preview bots see
 * before any JavaScript runs. Produced by scripts/generate-seo.mjs at build time.
 */
import { expect, test } from "@playwright/test";
import { PAGES, SITE_URL, escapeHtml, url } from "./helpers";

for (const [route, meta] of Object.entries(PAGES)) {
  test(`${route} serves page-specific SEO tags with HTTP 200`, async ({
    request,
  }) => {
    const response = await request.get(url(route));
    expect(response.status()).toBe(200);

    const html = await response.text();
    expect(html).toContain(`<title>${escapeHtml(meta.title)}</title>`);
    expect(html).toContain(
      `<meta name="description" content="${escapeHtml(meta.description)}" />`
    );
    expect(html).toContain(
      `<link rel="canonical" href="${SITE_URL}${route}" />`
    );
    expect(html).toContain(
      `<meta property="og:image" content="${SITE_URL}${encodeURI(meta.image)}" />`
    );
    expect(html).toContain('"@type":"NGO"');
    expect(html).toContain('"value":"4-32/2023"');
    expect(html).not.toContain('content="noindex"');
  });
}

test("sitemap.xml lists every page", async ({ request }) => {
  const response = await request.get(url("/sitemap.xml"));
  expect(response.status()).toBe(200);
  const xml = await response.text();
  for (const route of Object.keys(PAGES)) {
    expect(xml).toContain(`<loc>${SITE_URL}${route}</loc>`);
  }
});

test("robots.txt allows crawling and points to the sitemap", async ({
  request,
}) => {
  const response = await request.get(url("/robots.txt"));
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("Allow: /");
  expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
});

test("unknown URLs return 404 and are not indexed", async ({ request }) => {
  const response = await request.get(url("/no-such-page"));
  expect(response.status()).toBe(404);
  expect(await response.text()).toContain(
    '<meta name="robots" content="noindex" />'
  );
});

test("favicon and home-screen icon are linked and served", async ({
  request,
}) => {
  const html = await (await request.get(url("/"))).text();
  const icons = [
    ...html.matchAll(/<link rel="(icon|apple-touch-icon)"[^>]*href="([^"]+)"/g),
  ];
  expect(icons.map(m => m[1]).sort()).toEqual(["apple-touch-icon", "icon"]);
  for (const [, rel, href] of icons) {
    const response = await request.get(new URL(href, url("/")).toString());
    expect(response.status(), `${rel} ${href}`).toBe(200);
  }
});
