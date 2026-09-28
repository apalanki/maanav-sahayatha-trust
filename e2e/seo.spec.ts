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

test("titles and descriptions fit in search results and are unique", () => {
  const titles = Object.values(PAGES).map(p => p.title);
  const descriptions = Object.values(PAGES).map(p => p.description);
  for (const [route, { title, description }] of Object.entries(PAGES)) {
    expect(title.length, `${route} title length`).toBeLessThanOrEqual(65);
    expect(
      description.length,
      `${route} description length`
    ).toBeGreaterThanOrEqual(70);
    expect(
      description.length,
      `${route} description length`
    ).toBeLessThanOrEqual(160);
  }
  expect(new Set(titles).size, "unique titles").toBe(titles.length);
  expect(new Set(descriptions).size, "unique descriptions").toBe(
    descriptions.length
  );
});

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

test("official favicons and the web manifest are linked and served", async ({
  request,
}) => {
  const html = await (await request.get(url("/"))).text();
  const links = [
    ...html.matchAll(
      /<link rel="(icon|shortcut icon|apple-touch-icon|manifest)"[^>]*href="([^"]+)"/g
    ),
  ];
  expect(new Set(links.map(m => m[1]))).toEqual(
    new Set(["icon", "shortcut icon", "apple-touch-icon", "manifest"])
  );
  for (const [, rel, href] of links) {
    expect(href, rel).toContain("/favicons/");
    const response = await request.get(new URL(href, url("/")).toString());
    expect(response.status(), `${rel} ${href}`).toBe(200);
  }

  // The manifest names the trust and its icons resolve
  const manifestHref = links.find(m => m[1] === "manifest")![2];
  const manifestUrl = new URL(manifestHref, url("/"));
  const manifest = await (await request.get(manifestUrl.toString())).json();
  expect(manifest.name).toBe("Maanav Sahayata Trust");
  for (const icon of manifest.icons) {
    const response = await request.get(
      new URL(icon.src, manifestUrl).toString()
    );
    expect(response.status(), icon.src).toBe(200);
  }
});
