# 007b: Service detail pages, content for all services + SEO

- **Status:** ready (start after 007a is merged)
- **Wave:** 5
- **Roadmap:** Phase 2, "Service detail pages `/services/[slug]`"
- **Mockups:** `mockup/08-service-detail/BRIEF.md`
- **Owner:** AI

## Goal

All 5 service pages are complete and findable: each has its own content, packages and FAQ, a unique title/description and structured data.

## Scope

- In: content for `website-ban-hang`, `web-app-theo-yeu-cau`, `ung-dung-di-dong`, `bao-tri-toi-uu` (vi + en, check the real slugs in the seed); per-page meta; JSON-LD; footer links.
- Out: new sections or layout changes (fix bugs in 007a's template only if needed, and note them here).

## Design

- Content per service: hero title, 4–6 value props, 3 packages, 6 pains, 6 comparison rows, 6 questions, 6 FAQ entries, 3 related services. Write for business owners in Vietnam, follow `docs/content-guide.md`: specific, no hype, no invented clients or numbers. Everything goes to `docs/placeholders.md`.
- Meta: title "Service — CTStack", description from the hero subtitle; OG image = default (plan 003).
- JSON-LD: BreadcrumbList, FAQPage, and a `Service` entry (provider CTStack, areaServed Vietnam). Reuse the helpers from plan 003.
- Footer services column in `src/layouts/Base.astro` links to the 5 detail pages instead of `/services` + `/projects`.

## Tasks

- [ ] Content for the 4 remaining services (vi + en)
- [ ] Meta + JSON-LD
- [ ] Footer service links
- [ ] Placeholders listed

## Verification

- [ ] `pnpm typecheck`: 0 errors
- [ ] `pnpm build` succeeds
- [ ] All 10 URLs (5 services × vi/en) return 200 with every section filled
- [ ] JSON-LD validates
- [ ] Screenshots at 390px and 1440px for 2 services

## Notes / decisions

- Hot files touched: `seed/seed.json`, `src/layouts/Base.astro` (footer). Run alone.
