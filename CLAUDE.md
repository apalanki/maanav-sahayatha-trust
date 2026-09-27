# CLAUDE.md

Static React site for **Manav Sahayata Trust**, a charity serving tribal communities near
Visakhapatnam. Live at **https://manavsahayata.org** (GitHub Pages; domain/DNS on Cloudflare).
Read **README.md** for architecture and file layout; this file holds the working rules.

## Commands

```bash
pnpm install
pnpm dev                          # http://localhost:3000
pnpm test                         # tsc + Playwright e2e (desktop + mobile) against the production build
PW_CHANNEL=chrome pnpm test       # same, using installed Chrome (no Playwright browser download)
pnpm build                        # vite build → scripts/generate-seo.mjs → server bundle
```

Pushing to `main` runs the tests, then deploys to production (~2–3 minutes). There is no staging environment.

## Workflow

- Run `pnpm test` before every commit. The deploy workflow also runs it and blocks the deploy on failure.
- Any visual or layout change must be checked at **desktop (1440px) and mobile (390px)** widths.
- After verifying, commit and push to `main` (the owner's standing preference). Use a descriptive
  commit message explaining *why*.
- New behavior (a page, nav link, SEO rule) gets a test in `e2e/`.

## Content rules

- Audience is donors and supporters: warm, respectful, dignified, specific. Invite support; never guilt.
- **Never invent facts, numbers, names, or partnerships.** Unconfirmed claims go in
  `CONTENT_TO_VERIFY.md` as questions.
- Donate buttons open WhatsApp (`wa.me/919533843636`), so label them honestly
  ("Donate", "Chat With Us to Donate"). There is no payment page.
- Indian English context: "₹", "sarees", "dhotis", place names in Andhra Pradesh.

## Where to change things

- Page copy → `client/src/pages/*.tsx`
- Page title/description/share image → `client/src/lib/seo-pages.json` (also drives the sitemap)
- Program list/order (header, footer, program nav) → `client/src/lib/programs.ts`
- New page → route in `client/src/App.tsx` + `seo-pages.json` (+ `programs.ts` for a program)
- Photos → resize first (`sips -Z 1280 -s formatOptions 75 <file>`), put in `client/public/images/`,
  reference via `getAssetPath()`, `loading="lazy"` below the first screen

## Decisions already made (don't revisit without a reason)

- **Hosting:** GitHub Pages + Cloudflare Registrar/DNS. All DNS records stay **DNS only (grey
  cloud)**; the proxy breaks GitHub's domain check and HTTPS renewal.
- **Base path is driven by `client/public/CNAME`** (present → `/`). Don't hardcode base paths;
  use `getAssetPath()`, wouter `<Link>`, or `homeSectionHref()`.
- **Per-page HTML is generated at build time** (`scripts/generate-seo.mjs`) so every URL returns
  HTTP 200 with its own meta tags. Don't reintroduce a `404.html` SPA-redirect hack.
- **TypeScript is held at 6.x**; 7.x is the native rewrite and hasn't been evaluated here.
- **Lean deployment:** everything in `client/public/` ships, and Tailwind scans all of `client/src`.
  Don't commit unused components, packages, or photos (unused photos live in `media/unused-photos/`).
  Add shadcn components only when used: `npx shadcn add <name>`.
- **Manus template code was removed deliberately.** Don't re-add its plugins or `__manus__` files.
- **Colors:** site UI uses brand navy `#003D7A` / saffron `#FF9900` (`lib/branding.ts`); the logo and
  favicon use blue `#2D65AF` / orange `#F17D00`.

## Gotchas

- wouter v3 `<Link>` renders its own `<a>`: pass `className`/`onClick` to it; never nest an `<a>`.
- The mobile menu closes via `setTimeout` so in-page anchors (`#about`, `#contact`) still scroll.
- Express 5 wildcard route is `"/{*splat}"` (not `"*"`).
- `pnpm install --frozen-lockfile` runs in CI: commit `pnpm-lock.yaml` with dependency changes.
- If `manavsahayata.org` doesn't resolve locally but works elsewhere, it's a stale local DNS cache.
