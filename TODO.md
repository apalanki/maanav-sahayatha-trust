# Manav Sahayata Trust Website - Development Roadmap

## Completed Features ✅
- [x] Landing page with hero section and program overview
- [x] Official MST branding (navy blue #003D7A and saffron orange #FF9900)
- [x] Educational Support program page with timeline activities
- [x] Year-by-year statistics and impact metrics
- [x] Mobile-first responsive design
- [x] Dynamic footer with current year
- [x] Reusable branding constants system
- [x] GitHub Pages deployment

## Next Steps - Priority Order

### Phase 1: Expand Program Pages (Medium Priority)
- [ ] Create Medical Services program page with timeline activities
  - Include medical camps, medicine distribution, and hospital assistance data
  - Add year-by-year statistics for patients served
  - Link from landing page programs section

- [ ] Create Tribal Distribution program page
  - Timeline of clothing distribution and eye camps
  - Statistics on villages served and beneficiaries
  - Partnership information with organizations like Vema Netralaya

- [ ] Create Bala Vikas Schools program page
  - Timeline of school activities and student achievements
  - Statistics on children enrolled and centers established
  - Curriculum and values taught

### Phase 2: Donor Engagement (High Priority)
- [ ] Add Contact Form to landing page
  - Fields: Name, Email, Phone, Message, Inquiry Type
  - Consider upgrading to web-db-user for backend form handling
  - Add form submission confirmation

- [ ] Add Email Newsletter Signup
  - Section on landing page footer or dedicated section
  - Collect emails for donor communications
  - Requires backend integration (web-db-user feature)

- [ ] Enable Online Donations
  - Integrate Stripe payment processing (requires web-db-user upgrade)
  - Add donation buttons on landing page and each program page
  - Support one-time and recurring donations

### Phase 3: Content & SEO (Medium Priority)
- [ ] Create Blog/News Section
  - Add page for program updates and success stories
  - Timeline of recent activities and achievements
  - Improve search engine visibility

- [ ] Add Team/Leadership Page
  - Introduce founding members and key volunteers
  - Build trust and credibility with donors

- [ ] Optimize for Search Engines
  - Add meta descriptions and keywords
  - Create sitemap.xml
  - Implement Open Graph tags for social sharing

### Phase 4: Advanced Features (Lower Priority)
- [ ] Add Photo Gallery
  - Showcase program activities and community impact
  - Organize by program area

- [ ] Add Testimonials Section
  - Success stories from beneficiaries
  - Quotes from community members and partners

- [ ] Add Event Calendar
  - Upcoming medical camps, distribution events, etc.
  - Allow supporters to register or volunteer

- [ ] Implement Analytics
  - Track visitor engagement
  - Monitor donation conversion rates

## Technical Notes

### Branding System
- All colors are managed in `/client/src/lib/branding.ts`
- Update `MST_COLORS` object to change brand colors globally
- Use `getCardStyle()` function for consistent card styling

### Image Management
- Store images in `/home/ubuntu/webdev-static-assets/` (outside project)
- Upload using: `manus-upload-file --webdev path/to/image.png`
- Use returned CDN URLs in code

### Deployment
- GitHub Pages deployment is automatic on push to main branch
- Site available at: https://apalanki.github.io/maanav-sahayatha-trust/
- Base path configured in `vite.config.ts`

## Feature Upgrade Requirements

### To Enable Contact Forms & Donations:
- Run: `webdev_add_feature web-db-user`
- This adds: Backend server, database, authentication, Stripe integration

### To Enable Email Notifications:
- Requires web-db-user upgrade
- Configure in Settings → Secrets panel

## Questions for Stakeholders

1. What is the priority for online donations vs. contact forms?
2. Do you want to collect donor information for follow-up communications?
3. Should the blog section be editable by non-technical team members?
4. What metrics are most important to showcase on program pages?

## Contact & Support
- GitHub Repository: https://github.com/apalanki/maanav-sahayatha-trust
- Live Site: https://apalanki.github.io/maanav-sahayatha-trust/
