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
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
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

const { siteName, pages } = JSON.parse(
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

function render(route, { title, description, image }, { noindex = false } = {}) {
  const tags = [
    `<meta name="description" content="${escape(description)}" />`,
    noindex
      ? `<meta name="robots" content="noindex" />`
      : `<link rel="canonical" href="${pageUrl(route)}" />`,
    `<meta property="og:type" content="website" />`,
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
    `<script type="application/ld+json">${JSON.stringify(organization)}</script>`,
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
${Object.keys(pages)
  .map((r) => `  <url><loc>${pageUrl(r)}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n")}
</urlset>
`,
);

writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`SEO: ${Object.keys(pages).length} pages, sitemap, robots.txt, 404.html -> ${siteUrl}`);
