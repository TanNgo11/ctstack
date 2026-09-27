# Roadmap

Status: `[x]` done · `[~]` in progress · `[ ]` todo. Update this file when a task changes state.
Layout and feature ideas come from [research/tanphatdigital.md](research/tanphatdigital.md).

## Phase 0: Decisions ✅

- [x] Stack: EmDash + Cloudflare (Workers, D1, R2)
- [x] Languages: Vietnamese (default) + English
- [x] Brand name: CTStack
- [ ] Domain (decide later)
- [ ] Real project material for 3–5 best projects (images, stack, results)
- [ ] Contact channels: phone, Zalo link, Messenger link, public email

## Phase 1: MVP (site live, collecting leads)

- [x] Scaffold EmDash portfolio template (Cloudflare)
- [x] i18n routing vi/en + language switcher
- [x] Collections: `projects`, `services`, `pages`
- [x] Pages: home, projects (filter), project detail, services, about, contact, 404
- [x] Contact form (forms plugin) + admin inbox
- [x] Agent docs, architecture, roadmap, plans, mockup briefs
- [x] UI redesign from mockups (dark-first direction approved) → [plans/001-ui-redesign.md](../plans/001-ui-redesign.md), including:
  - [~] Floating contact buttons (Zalo, phone, Messenger): built, hidden until real channels are set in `src/i18n/ui.ts`
  - [x] CTA band before the footer on every page ("phản hồi trong 24h")
  - [~] 4-column footer (services, quick links, social, contact): done except FAQ/policy links and social icons (pages/accounts not there yet)
  - [ ] Pricing tiers (3–4 packages, "Phổ biến" badge) on home + services
  - [ ] Trust stats row (real numbers only)
  - [ ] Contact page: "what happens next" steps, channels, working hours
- [ ] Replace sample projects/prices with real content
- [ ] Deploy to Cloudflare (`*.workers.dev`)
- [ ] Basic SEO check: titles, descriptions, OG images, sitemap

## Phase 2: Credibility + service landing pages

- [ ] Service detail pages `/services/[slug]`: hero + value props, packages, pain points, comparison table, "questions to ask before signing", process, related projects + testimonials, FAQ (FAQPage schema), related services, CTA
- [ ] Testimonials collection, shown on home, case studies and service pages
- [ ] FAQ collection + `/faq` page with category tabs
- [ ] Projects: industry field + filter, duration, team size, key features, "Live" badge, linked testimonial
- [ ] Case studies: device-frame images, before/after
- [ ] About page: stats, how we work, team, downloadable company profile (PDF)
- [ ] Policy pages: warranty, privacy, terms
- [ ] Custom domain + site URL in settings (hreflang, sitemap)
- [ ] Email notification for new leads (Resend plugin)
- [ ] Analytics (Cloudflare Web Analytics)
- [ ] Turnstile on contact form if spam appears

## Phase 3: AI content

- [ ] Blog collection (`posts`, with author) + listing (search, categories, read time) and article (breadcrumbs, TOC, FAQ, related posts, inline service CTAs)
- [ ] Connect AI agent to EmDash MCP server (`/_emdash/api/mcp`)
- [ ] Workflow: AI drafts → human review → publish (see `docs/content-guide.md`)
- [ ] AI translation vi ↔ en with review
- [ ] 1–2 niche tools (website speed/SEO check, meta/OG checker) with service CTAs

## Phase 4: Growth

- [ ] Pricing calculator: pick type (base price) → add features → live total → lead form for a detailed quote; prices managed in the CMS
- [ ] Niche landing pages (F&B, spa, real estate, e-commerce, booking apps…)
- [ ] Case study PDF export
