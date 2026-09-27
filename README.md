# Manav Sahayata Trust – Website

Website for **Manav Sahayata Trust (MST)**, a charity serving rural and tribal communities near
Visakhapatnam, Andhra Pradesh since 2004 (education, healthcare, Bala Vikas after-school centers,
tribal outreach, and religious & cultural programs).

**Live:** https://manavsahayata.org

## Quick start

Requirements: **Node 22** (Vite 8 needs ≥ 20.19 / 22.12) and **pnpm 10** (`corepack enable` or `npm i -g pnpm`).

```bash
pnpm install                              # install dependencies
pnpm dev                                  # dev server → http://localhost:3000
pnpm test                                 # type-check + end-to-end tests (see Testing)
pnpm build                                # production build → dist/public
git push origin main                      # deploy (GitHub Actions → GitHub Pages)
```

## How it works

A static, client-rendered **React** site. There is no backend or database; every page is built to
static files and hosted on **GitHub Pages** with the custom domain `manavsahayata.org`
(domain registered at Cloudflare). Donations are handled by opening a **WhatsApp** chat.

| Area | Tech |
|---|---|
| UI | React 19, TypeScript 6, Tailwind CSS 4, shadcn/ui `Button` and `Card`, lucide-react icons |
| Routing | [wouter](https://github.com/molefrog/wouter) with a base path from `import.meta.env.BASE_URL` |
| Build | Vite 8 + a post-build SEO script (`scripts/generate-seo.mjs`) |
| Tests | Playwright end-to-end tests against the production build |
| Hosting | GitHub Pages via `.github/workflows/deploy.yml`; HTTPS by Let's Encrypt (auto-renewed) |

### Pages and routes

| Route | File |
|---|---|
| `/` | `client/src/pages/Home.tsx` (hero → Our Story → programs → success story → donate) |
| `/programs/education` | `client/src/pages/EducationProgram.tsx` |
| `/programs/bala-vikas` | `client/src/pages/BalaVikas.tsx` |
| `/programs/medical` | `client/src/pages/MedicalServices.tsx` |
| `/programs/tribal` | `client/src/pages/TribalDistribution.tsx` |
| `/programs/religious-cultural` | `client/src/pages/ReligiousCultural.tsx` |
| anything else | `client/src/pages/NotFound.tsx` |

Routes are declared in `client/src/App.tsx`, which also updates the page title/description on
client-side navigation.

### Build pipeline (`pnpm build`)

1. **`vite build`** bundles the app into `dist/public`.
2. **`scripts/generate-seo.mjs`** reads `client/src/lib/seo-pages.json` and, for every page, writes a
   real HTML file (e.g. `dist/public/programs/medical.html`) with its own `<title>`, description,
   canonical URL, Open Graph/Twitter tags, and NGO structured data (JSON-LD). This lets GitHub Pages
   serve every URL with **HTTP 200** and correct link previews (e.g. on WhatsApp) without JavaScript.
   It also writes `sitemap.xml`, `robots.txt`, and a `noindex` `404.html`.
3. **esbuild** bundles `server/index.ts`, an optional Express server (`pnpm start`) for hosting outside
   GitHub Pages.

### Base path and domain

`client/public/CNAME` controls where the site lives:

- **Present** (currently `manavsahayata.org`): base path `/`, canonical URLs on that domain.
- **Absent**: base path `/maanav-sahayatha-trust/` for `https://apalanki.github.io/maanav-sahayatha-trust`.

`vite.config.ts`, `scripts/generate-seo.mjs`, `scripts/serve-dist.mjs`, and the tests all read it, so
there is nothing else to change. Overrides: `VITE_BASE_PATH`, `SITE_URL`.

## Design

"Humanitarian editorial": documentary, dignified, and warm rather than flashy.

- **Type:** Cormorant Garamond for headings, Manrope for body text (Google Fonts, `client/index.html`).
- **Color:** navy `#003D7A` and saffron `#FF9900` in the UI (`lib/branding.ts`, CSS variables in
  `index.css`); the logo and favicon use blue `#2D65AF` and orange `#F17D00`.
- **Patterns:** small uppercase "eyebrow" labels with a vertical rule, alternating photo/text rows,
  textured backgrounds (`.section-textured`) alternating with white sections, restrained hover effects.
- **Copy:** donor-focused and specific, never guilt-driven; every page ends with a donate call to action.

## Project structure

```
client/
  index.html                 HTML shell (fonts, favicon links, default title/description)
  public/                    Static files copied as-is: CNAME, favicon.svg, apple-touch-icon.png,
                             logo.png, images/<program>/*.jpg
  src/
    App.tsx                  Routes, router base path, per-route title/description
    pages/                   One component per page (all visible copy lives here)
    components/              Header, Footer, ProgramNav (breadcrumb + "other programs")
    components/ui/           shadcn/ui Button and Card (add more with `npx shadcn add <name>`)
    lib/programs.ts          Program names/paths/order → header, footer, program navigation
    lib/seo-pages.json       Page titles, descriptions, share images → SEO build step + App.tsx
    lib/branding.ts          Brand colors (MST_COLORS) and program card styles
media/unused-photos/         Trust photos not used on any page yet (kept out of the deployment)
e2e/                         Playwright tests (site.spec.ts, seo.spec.ts, helpers.ts)
scripts/
  generate-seo.mjs           Post-build SEO step (see above)
  serve-dist.mjs             Serves dist/public like GitHub Pages (used by the tests)
server/index.ts              Optional Express server for non-GitHub hosting
.github/workflows/deploy.yml Build and deploy on every push to main
```

## Common changes

| Task | Where |
|---|---|
| Edit page text | The page component in `client/src/pages/` |
| Change a page's Google title/description or share image | `client/src/lib/seo-pages.json` |
| Add a page | Route in `App.tsx` + entry in `seo-pages.json` (+ `PROGRAMS` in `lib/programs.ts` for a program page) |
| Contact details / WhatsApp number | `components/Footer.tsx`, and the `wa.me` links in `Header.tsx` and the pages |
| Organization details for search engines | `organization` object in `scripts/generate-seo.mjs` |
| Brand colors | `client/src/lib/branding.ts` (logo colors: blue `#2D65AF`, orange `#F17D00`) |
| Add photos | `client/public/images/<program>/`, resized first (below), referenced with `getAssetPath()`. Unused photos live in `media/unused-photos/` |

**Photos:** phone photos are 3–7 MB. Resize before committing (macOS):
`sips -Z 1280 -s formatOptions 75 client/public/images/<folder>/<photo>.jpg`.
Add `loading="lazy"` to images below the first screen.

## Testing

```bash
pnpm test                          # tsc type-check, then all Playwright tests
pnpm test:e2e                      # Playwright tests only
PW_CHANNEL=chrome pnpm test:e2e    # use installed Google Chrome instead of Playwright's Chromium
pnpm exec playwright test --ui     # interactive runner
```

First run on a new machine (unless using `PW_CHANNEL=chrome`): `pnpm exec playwright install chromium`.

Playwright builds the site (`pnpm build`) and serves `dist/public` with `scripts/serve-dist.mjs`,
which mimics GitHub Pages (extensionless URLs, 404.html with a 404 status). Tests run in two
projects, **desktop** (1440×900) and **mobile** (390×844):

- **`e2e/site.spec.ts`** – every page renders with one `<h1>`, the right title, no console errors or
  failed requests, no broken images, and no horizontal scrolling; home sections are in order;
  program pages have a breadcrumb and "other programs" links; navigation works (program links,
  reload, About Us, Contact, logo back to top, keyboard-accessible Programs menu, mobile menu, 404 page).
- **`e2e/seo.spec.ts`** – raw HTML (no JavaScript) of every page has HTTP 200 and its own title,
  description, canonical URL, share image, and structured data; sitemap, robots.txt, 404 handling,
  and icons are correct.

There are no unit tests. The deploy workflow runs `pnpm test` before publishing: if any test fails,
nothing is deployed and the HTML report is attached to the workflow run. Run it locally before pushing
to catch problems sooner.

## Deployment

Pushing to `main` tests and then deploys automatically in about 2–3 minutes (see the repo's
**Actions** tab). A failing test blocks the deploy. CI installs
with `pnpm install --frozen-lockfile`, so commit `pnpm-lock.yaml` with any dependency change.

Domain, DNS records, HTTPS, Search Console, and troubleshooting: **[DEPLOYMENT.md](DEPLOYMENT.md)**.

## Gotchas

- **wouter `<Link>` renders its own `<a>`.** Pass `className`/`onClick` to `<Link>` directly; wrapping
  an `<a>` inside it produces invalid nested links.
- **In-page anchors** (`#about`, `#contact`) are plain `<a>` tags; cross-page ones use
  `homeSectionHref()` from `lib/programs.ts` so they respect the base path. The mobile menu closes
  on a `setTimeout` so the link is still in the DOM when the browser follows it.
- **Express 5** needs named wildcards: the SPA fallback is `app.get("/{*splat}", ...)`, not `"*"`.
- **Cloudflare DNS records must stay "DNS only" (grey cloud)**, or GitHub can't verify the domain or
  renew HTTPS.
- **Keep the deployment lean:** everything in `client/public/` is published, so only put files there
  that a page uses (resize photos first). Tailwind generates CSS from every file under `client/src`,
  so delete unused components rather than leaving them around. Add shadcn components on demand with
  `npx shadcn add <component>`.
- **Origin:** the project started from a Manus template; its plugins, debug scripts, login/maps code,
  and unused components and packages have been removed.

## Project docs

- **[CLAUDE.md](CLAUDE.md)** – working rules, content rules, and settled decisions for coding agents
- **[DEPLOYMENT.md](DEPLOYMENT.md)** – hosting, DNS, HTTPS, updating, troubleshooting
- **[TODO.md](TODO.md)** – roadmap and open questions for the trust
- **[CONTENT_TO_VERIFY.md](CONTENT_TO_VERIFY.md)** – facts on the site awaiting confirmation from the trust
