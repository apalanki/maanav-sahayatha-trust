/**
 * Post-build SEO step (runs after `vite build`).
 *
 * For every page in client/src/lib/seo-pages.json this writes a real HTML file
 * (e.g. dist/public/programs/medical.html) so that static hosts like
 * GitHub Pages serve each URL with a 200 status and page-specific <title>,
 * description, canonical URL, Open Graph/Twitter tags, and structured data.
 * It also generates robots.txt, sitemap.xml, and a noindex 404.html.
 *
 * Site URL: if client/public/CNAME exists (custom domain), the site is served
 * from https://<domain>/. Otherwise it falls back to the GitHub Pages URL.
 * Override with the SITE_URL env var if needed.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist", "public");
const cnamePath = path.join(root, "client", "public", "CNAME");

const customDomain = existsSync(cnamePath) ? readFileSync(cnamePath, "utf8").trim() : "";
const siteUrl = (
  process.env.SITE_URL ||
  (customDomain ? `https://${customDomain}` : "https://apalanki.github.io/maanav-sahayatha-trust")
).replace(/\/$/, "");

const { siteName, pages, updatesPage } = JSON.parse(
  readFileSync(path.join(root, "client", "src", "lib", "seo-pages.json"), "utf8"),
);
const template = readFileSync(path.join(outDir, "index.html"), "utf8");

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pageUrl = (route) => `${siteUrl}${route}`;
const assetUrl = (p) => `${siteUrl}${encodeURI(p)}`;

const organization = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: siteName,
  alternateName: ["MST", "Manav Sahayata Trust"],
  url: `${siteUrl}/`,
  logo: assetUrl("/logo.png"),
  image: assetUrl(pages["/"].image),
  description: pages["/"].description,
  slogan: "Service to others is the purpose of life",
  foundingDate: "2004",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Trust deed registration (Book IV, Sub-Registrar Office, Madhurawada)",
    value: "4-32/2023",
  },
  founder: { "@type": "Person", name: "Sujata Palanki" },
  telephone: "+91-9533843636",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1416, MK Gold Coast, Yendada",
    addressLocality: "Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    postalCode: "530045",
    addressCountry: "IN",
  },
  areaServed: { "@type": "State", name: "Andhra Pradesh" },
};

function render(route, { title, description, image }, { noindex = false, type = "website", jsonLd = [] } = {}) {
  const tags = [
    `<meta name="description" content="${escape(description)}" />`,
    noindex
      ? `<meta name="robots" content="noindex" />`
      : `<link rel="canonical" href="${pageUrl(route)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${escape(siteName)}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${pageUrl(route)}" />`,
    `<meta property="og:image" content="${assetUrl(image)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
    `<meta name="twitter:image" content="${assetUrl(image)}" />`,
    ...[organization, ...jsonLd].map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`),
  ].join("\n    ");

  return template
    .replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`)
    .replace(/\s*<meta name="description"[^>]*\/>/s, "")
    .replace("</head>", `    ${tags}\n  </head>`);
}

for (const [route, meta] of Object.entries(pages)) {
  // GitHub Pages serves /programs/medical from programs/medical.html without a redirect
  const file = route === "/" ? path.join(outDir, "index.html") : path.join(outDir, `${route}.html`);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, render(route, meta));
}

// ---------------------------------------------------------------------------------------------
// Activity updates: validate every post (an incomplete post fails the build, so it never goes
// live), then write a page per post plus the Updates list. Sample posts are included only when
// VITE_INCLUDE_TEST_UPDATES is set (e2e test builds).
// ---------------------------------------------------------------------------------------------
const PROGRAM_KEYS = ["education", "bala-vikas", "medical", "tribal", "religious-cultural"];
const contentDirs = [path.join(root, "client", "src", "content", "updates")];
if (process.env.VITE_INCLUDE_TEST_UPDATES) contentDirs.push(path.join(root, "client", "src", "content", "update-fixtures"));

const problems = [];
const posts = contentDirs
  .flatMap((dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => path.join(dir, f)) : []))
  .map((file) => {
    const slug = path.basename(file, ".json");
    const where = path.relative(root, file);
    let post;
    try {
      post = { ...JSON.parse(readFileSync(file, "utf8")), slug };
    } catch (e) {
      problems.push(`${where}: invalid JSON (${e.message})`);
      return null;
    }
    const bad = (msg) => problems.push(`${where}: ${msg}`);
    const publicFile = (src) => existsSync(path.join(root, "client", "public", src));
    if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) bad("file name must be YYYY-MM-DD-short-title.json (lowercase, hyphens)");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date || "") || Number.isNaN(Date.parse(post.date))) bad(`"date" must be YYYY-MM-DD`);
    else if (!slug.startsWith(post.date)) bad(`file name must start with the post date (${post.date})`);
    if (!post.title?.trim()) bad(`missing "title"`);
    else if (post.title.length > 70) bad(`"title" is ${post.title.length} characters (max 70)`);
    if (!PROGRAM_KEYS.includes(post.program)) bad(`"program" must be one of: ${PROGRAM_KEYS.join(", ")}`);
    if (!post.description?.trim() || /^todo\b/i.test(post.description.trim())) bad(`needs a real "description"`);
    if (!Array.isArray(post.photos) || post.photos.length < 1 || post.photos.length > 4) bad(`needs 1-4 "photos"`);
    for (const [i, photo] of (post.photos || []).entries()) {
      if (!photo?.src || !publicFile(photo.src)) bad(`photo ${i + 1}: file not found in client/public: ${photo?.src}`);
      if (!photo?.alt?.trim() || /^todo\b/i.test(photo.alt)) bad(`photo ${i + 1}: needs a real "alt" description`);
    }
    if (post.shareImage && !publicFile(post.shareImage)) bad(`"shareImage" not found: ${post.shareImage}`);
    return post;
  })
  .filter(Boolean)
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
if (problems.length) {
  console.error(`\nActivity updates have problems (fix before deploying):\n  - ${problems.join("\n  - ")}\n`);
  process.exit(1);
}

// Same rule as summary() in client/src/lib/updates.ts: first paragraph, ~155 characters
const summary = (post, max = 155) => {
  const first = post.description.split(/\n\s*\n/)[0].replace(/\s+/g, " ");
  return first.length <= max ? first : first.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
};
const shareImageOf = (post) => post.shareImage || post.photos[0].src;

const updateRoutes = [];
if (posts.length) {
  // The list lives at /updates/ (a folder index) so it can't clash with the /updates/<post> pages
  mkdirSync(path.join(outDir, "updates"), { recursive: true });
  writeFileSync(
    path.join(outDir, "updates", "index.html"),
    render("/updates/", { ...updatesPage, image: shareImageOf(posts[0]) }),
  );
  updateRoutes.push({ route: "/updates/", lastmod: posts[0].date });
  for (const post of posts) {
    const route = `/updates/${post.slug}`;
    writeFileSync(
      path.join(outDir, "updates", `${post.slug}.html`),
      render(
        route,
        { title: `${post.title} | ${siteName}`, description: summary(post), image: shareImageOf(post) },
        {
          type: "article",
          jsonLd: [
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: post.date,
              description: summary(post),
              image: post.photos.map((p) => assetUrl(p.src)),
              author: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
              publisher: { "@type": "Organization", name: siteName, logo: { "@type": "ImageObject", url: assetUrl("/logo.png") } },
              mainEntityOfPage: pageUrl(route),
              ...(post.location ? { contentLocation: { "@type": "Place", name: post.location } } : {}),
            },
          ],
        },
      ),
    );
    updateRoutes.push({ route, lastmod: post.date });
  }
}

// GitHub Pages serves 404.html for unknown paths; the app renders its Not Found page
writeFileSync(
  path.join(outDir, "404.html"),
  render("/404", { ...pages["/"], title: `Page Not Found | ${siteName}` }, { noindex: true }),
);

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...Object.keys(pages).map((route) => ({ route, lastmod: today })), ...updateRoutes]
  .map(({ route, lastmod }) => `  <url><loc>${pageUrl(route)}</loc><lastmod>${lastmod}</lastmod></url>`)
  .join("\n")}
</urlset>
`,
);

writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`SEO: ${Object.keys(pages).length} pages + ${posts.length} updates, sitemap, robots.txt, 404.html -> ${siteUrl}`);
