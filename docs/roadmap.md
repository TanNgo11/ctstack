# Roadmap

Status: `[x]` done · `[~]` in progress · `[ ]` todo. Update this file when a task changes state.

## Phase 0: Decisions ✅

- [x] Stack: EmDash + Cloudflare (Workers, D1, R2)
- [x] Languages: Vietnamese (default) + English
- [x] Brand name: CTStack
- [ ] Domain (decide later)
- [ ] Real project material for 3–5 best projects (images, stack, results)

## Phase 1: MVP (site live, collecting leads)

- [x] Scaffold EmDash portfolio template (Cloudflare)
- [x] i18n routing vi/en + language switcher
- [x] Collections: `projects`, `services`, `pages`
- [x] Pages: home, projects (filter), project detail, services, about, contact, 404
- [x] Contact form (forms plugin) + admin inbox
- [x] Agent docs, architecture, roadmap, plans, mockup briefs
- [~] UI redesign from mockups → [plans/001-ui-redesign.md](../plans/001-ui-redesign.md)
- [ ] Replace sample projects/prices with real content
- [ ] Deploy to Cloudflare (`*.workers.dev`)
- [ ] Basic SEO check: titles, descriptions, OG images, sitemap

## Phase 2: Credibility

- [ ] Testimonials collection + section on home
- [ ] About page: team, process detail, tech stack
- [ ] FAQ (services page)
- [ ] Custom domain + site URL in settings (hreflang, sitemap)
- [ ] Email notification for new leads (Resend plugin)
- [ ] Analytics (Cloudflare Web Analytics)
- [ ] Turnstile on contact form if spam appears

## Phase 3: AI content

- [ ] Blog collection (`posts`) + listing/detail pages
- [ ] Connect AI agent to EmDash MCP server (`/_emdash/api/mcp`)
- [ ] Workflow: AI drafts → human review → publish (see `docs/content-guide.md`)
- [ ] AI translation vi ↔ en with review

## Phase 4: Optional

- [ ] Quote estimator form
- [ ] Niche landing pages (e-commerce, booking apps, ...)
- [ ] Case study PDF export
