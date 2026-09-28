# Manav Sahayata Trust Website - Roadmap

**Live site:** https://manavsahayata.org · **Deployment guide:** [DEPLOYMENT.md](DEPLOYMENT.md) ·
**Facts to confirm:** [CONTENT_TO_VERIFY.md](CONTENT_TO_VERIFY.md)

## Completed ✅

- [x] Home page: hero, Our Story, programs, success story, donate call to action
- [x] Program pages: Educational Support, Bala Vikas Schools, Medical Services, Tribal Distribution,
      Religious & Cultural Services
- [x] Official MST branding (navy blue `#003D7A` and saffron orange `#FF9900`)
- [x] Donor-focused copy; "Donate" buttons lead to the UPI Donate page
- [x] Navigation: About Us and Contact links, keyboard-accessible Programs menu, breadcrumbs, and
      "Explore Our Other Programs" links; logo returns to the top of the home page
- [x] Mobile-first responsive design (checked at phone and desktop widths)
- [x] Custom domain `manavsahayata.org` with HTTPS (Cloudflare Registrar + GitHub Pages)
- [x] SEO: per-page titles/descriptions, social share previews, NGO structured data, sitemap,
      robots.txt, real 404 page; sitemap submitted to Google Search Console
- [x] Performance: photos resized (36 MB → 9.3 MB) and below-the-fold images lazy-loaded
- [x] Dependencies upgraded (Vite 8, Express 5, TypeScript 6); 0 known vulnerabilities
- [x] Removed Manus template code, 49 unused UI components, and 49 unused packages
      (deployment 11 MB → 6.7 MB, CSS 107 KB → 40 KB, node_modules 1.4 GB → 180 MB)
- [x] Favicon and iOS home-screen icon in the logo's colors
- [x] Playwright end-to-end tests (`pnpm test`) for layout, navigation, and SEO

## Next Steps

### Get found (High Priority, no code needed)
- [ ] Create a **Google Business Profile** for the trust (Visakhapatnam address, website link) so it
      appears on Google Maps and local searches
- [ ] Use Search Console **URL Inspection → Request indexing** for each page; review the **Pages**
      report after a week
- [ ] List the trust on donation platforms (e.g. GiveIndia) and link the website from any social
      media profiles; share profile links so they can be added to the site and structured data
- [ ] Set up a domain email address (e.g. `contact@manavsahayata.org`) with Cloudflare Email Routing
      (free forwarding to Gmail)

### Donor trust & giving (High Priority)
- [ ] Confirm the facts on the site and gather current statistics (see [CONTENT_TO_VERIFY.md](CONTENT_TO_VERIFY.md))
- [ ] Show registration details (trust registration number, year) and, if available, **80G tax
      exemption** status — Indian donors look for this before giving
- [x] **Donate page (`/donate`)** with the trust's UPI QR code and ID (verified), copy button, pay-by-app on
      phones, and WhatsApp for sharing transaction details; every Donate button links to it
- [x] Bank transfer details (NEFT/RTGS/IMPS) with copy buttons on the Donate page
- [ ] Donate page follow-ups: 80G/12A status, real "what your gift does"
      figures (e.g. cost of a scholarship or a winter blanket)
- [x] Contact page with a form (Web3Forms → manavsahayata@gmail.com)

### Content (Medium Priority)
- [ ] News / updates page for recent camps, distributions, and events
- [ ] Team / leadership page introducing the founder, trustees, and key volunteers
- [ ] Photo gallery organized by program
- [ ] More success stories and testimonials (with permission from the people featured)

### Measurement (Lower Priority)
- [ ] Add privacy-friendly analytics (e.g. Cloudflare Web Analytics, free) to see visits and which
      pages lead to donation chats

## Technical Notes

- **Deploy:** push to `main`; GitHub Actions builds and publishes in 1–2 minutes.
- **Branding:** colors live in `client/src/lib/branding.ts` (`MST_COLORS`, `getCardStyle()`).
- **Programs list:** `client/src/lib/programs.ts` drives the header, footer, and program navigation.
- **Page titles/descriptions:** `client/src/lib/seo-pages.json`.
- **Images:** store in `client/public/images/<program>/`, resize to 1280px before committing (see
  [DEPLOYMENT.md](DEPLOYMENT.md#adding-photos)), reference with `getAssetPath()`.

## Questions for Stakeholders

1. Does the trust have 80G / 12A registration, and can the certificate details be shown on the site?
2. Which donation method is preferred: UPI/bank transfer, Razorpay, or continuing via WhatsApp?
3. Who will provide regular updates (photos, events, statistics), and how often?
4. Which metrics matter most to show donors on the program pages?

## Links

- Live site: https://manavsahayata.org
- GitHub repository: https://github.com/apalanki/maanav-sahayatha-trust
