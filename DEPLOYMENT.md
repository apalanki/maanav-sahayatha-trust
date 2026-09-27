# Deployment Guide

**Live site:** https://manavsahayata.org

## How the site is hosted

| Piece | Provider | Cost | Notes |
|---|---|---|---|
| Domain (`manavsahayata.org`) | Cloudflare Registrar | ~$10–11/year | Renews at cost; DNS managed in the Cloudflare dashboard |
| Hosting | GitHub Pages (via GitHub Actions) | Free | Global CDN, free HTTPS |
| HTTPS certificate | Let's Encrypt, issued by GitHub Pages | Free | Renews automatically |

## Updating the site

```bash
git push origin main
```

That's it. `.github/workflows/deploy.yml` installs dependencies, runs the tests (`pnpm test`), runs
`pnpm run build`, and publishes `dist/public` to GitHub Pages. The change is live in about 2–3 minutes;
progress is visible in the repo's **Actions** tab. **If any test fails, nothing is deployed** and the
live site stays as it was.

## Local development

```bash
pnpm install          # install dependencies
pnpm dev              # dev server at http://localhost:3000 (or the port Vite prints)
pnpm check            # TypeScript type-check
pnpm build            # production build into dist/public
pnpm start            # serve the production build with the Node server (dist/index.js)
```

CI installs with `pnpm install --frozen-lockfile`, so always commit `pnpm-lock.yaml` along with any
`package.json` change.

## What the build does

`pnpm run build` runs three steps:

1. **`vite build`** – bundles the React app into `dist/public`.
2. **`node scripts/generate-seo.mjs`** – for every page listed in `client/src/lib/seo-pages.json`:
   - writes a real HTML file (e.g. `dist/public/programs/medical.html`) with that page's title,
     description, canonical URL, Open Graph/Twitter tags, and NGO structured data (JSON-LD), so each
     URL returns HTTP 200 and shows a proper preview when shared on WhatsApp/social media
   - generates `sitemap.xml`, `robots.txt`, and a `noindex` `404.html`
3. **`esbuild server/index.ts`** – bundles the optional Node/Express server used by `pnpm start`.

### Base path and site URL

These are derived automatically from `client/public/CNAME`:

| `client/public/CNAME` | Base path | Site URL used for canonical/sitemap |
|---|---|---|
| Present (currently `manavsahayata.org`) | `/` | `https://<domain in CNAME>` |
| Absent | `/maanav-sahayatha-trust/` | `https://apalanki.github.io/maanav-sahayatha-trust` |

Overrides, if ever needed: `VITE_BASE_PATH=/ pnpm run build` and `SITE_URL=https://example.org pnpm run build`.

## Adding or renaming a page

1. Add the route in `client/src/App.tsx`.
2. Add its title, description, and share image in `client/src/lib/seo-pages.json`
   (keep titles under ~60 characters and descriptions under ~160).
3. For a program page, also add it to `PROGRAMS` in `client/src/lib/programs.ts` so it appears in the
   header, footer, and "Explore Our Other Programs" links.

## Adding photos

Photos straight from a phone are 3–7 MB, which makes pages slow on mobile data. Resize before
committing (macOS):

```bash
sips -Z 1280 -s formatOptions 75 client/public/images/<folder>/<photo>.jpg
```

Then reference it with `getAssetPath("/images/<folder>/<photo>.jpg")`. Add `loading="lazy"` to any
image that isn't in the first screen of the page.

## Domain and DNS (Cloudflare)

All records must be **DNS only (grey cloud)**. The Cloudflare proxy (orange cloud) stops GitHub from
verifying the domain and renewing the HTTPS certificate.

| Type | Name | Content |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `apalanki.github.io` |
| TXT | `_github-pages-challenge-apalanki` | GitHub domain-verification code |

GitHub repo settings (**Settings → Pages**): custom domain `manavsahayata.org`, **Enforce HTTPS** on.
The domain is also verified at the account level (**Profile → Settings → Pages**), which prevents
anyone else from using it for a GitHub Pages site.

`www.manavsahayata.org`, `http://`, and old `apalanki.github.io/maanav-sahayatha-trust/...` links all
redirect to `https://manavsahayata.org`.

## Search engines

- **Google Search Console:** `manavsahayata.org` is verified as a Domain property and
  `https://manavsahayata.org/sitemap.xml` is submitted. Check the **Pages** and **Performance**
  reports periodically; use **URL Inspection → Request indexing** after adding a new page.
- The sitemap is regenerated on every build, so no manual updates are needed.

## Moving to another host (if ever needed)

Any static host works (Cloudflare Pages, Netlify, S3 + CloudFront). Use:

- Build command: `pnpm run build`
- Output directory: `dist/public`
- Keep `client/public/CNAME` so the build uses the root base path and correct site URL.

Then point the DNS records above at the new host instead of GitHub.

## Troubleshooting

**"DNS check unsuccessful" / HTTPS unavailable in GitHub Pages settings**
- Make sure every DNS record is grey (DNS only), then click **Check again**.
- DNS caches can take up to ~30 minutes to update. If it's still failing after an hour, click
  **Remove** and re-save the custom domain to restart the check and certificate request.

**Site works for others but not on your machine**
- Your computer may have an old DNS answer cached. On macOS:
  `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`

**Deploy failed in the Actions tab**
- Failed at **Test**: the run's summary lists the failing tests. Download the `playwright-report`
  artifact, unzip it, and open `playwright-report/index.html` (or run
  `pnpm exec playwright show-report playwright-report`) for screenshots and traces.
  Reproduce locally with `pnpm test`.
- `ERR_PNPM_OUTDATED_LOCKFILE`: run `pnpm install` locally and commit `pnpm-lock.yaml`.
- Type or build errors: run `pnpm check` and `pnpm build` locally to reproduce.

**Page shows "404" or the wrong title**
- Check the route exists in `client/src/App.tsx` and the page is listed in `seo-pages.json`.
