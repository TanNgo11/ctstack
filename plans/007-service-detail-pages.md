# 007: Service detail landing pages

- **Status:** ready (start after 005 and 006 are merged)
- **Wave:** 4
- **Roadmap:** Phase 2, "Service detail pages `/services/[slug]`"
- **Mockups:** `mockup/08-service-detail/BRIEF.md` (no image: follow the brief and the style of the existing pages)
- **Owner:** AI

## Goal

One long page per service that ranks on Google for that service and turns readers into leads: the strongest page type in the competitor research.

## Scope

- In: `/services/[slug]` for the 5 services, links from service cards and the footer, sections from the brief.
- Out: new services, blog, pricing calculator.

## Design

- Route `src/pages/[...lang]/services/[slug].astro` (move `services.astro` to `services/index.astro`). Server-rendered, 404 on unknown slugs.
- Data: extend `services` in the seed with fields the brief needs: `hero_title`, `value_props` (repeater `{ title, text, icon }`), `pains` (repeater `{ title, text }`), `comparison` (repeater `{ label, diy, ctstack }`), `questions` (repeater `{ question, answer }`), `related_services` (references). Packages reuse the home tier component (extract `home.tiers` markup into `src/components/PricingTiers.astro` first). FAQ reuses the `faqs` collection from plan 005 (filter by a new `services` reference or a category). Related projects by category; testimonial from plan 006 if one exists.
- Sections top to bottom as in the brief: breadcrumb, hero + value props + CTA, packages, pains, comparison table, questions before signing, 6-step process, related projects (+ testimonial), FAQ accordion, related services, CTA band.
- Content for all 5 services in vi + en is sample copy: list it in `docs/placeholders.md`.
- SEO: title/description per service, BreadcrumbList + FAQPage JSON-LD (reuse helpers from plan 003).

## Tasks

- [ ] Extract `PricingTiers` component from the home page
- [ ] Seed fields + content for 5 services (vi + en), architecture doc
- [ ] Route + sections
- [ ] Links: service cards (home + services page), footer services column
- [ ] SEO meta + JSON-LD
- [ ] Placeholders listed

## Verification

- [ ] `pnpm typecheck`: 0 errors
- [ ] `pnpm build` succeeds
- [ ] All 5 services return 200 in vi + en; unknown slug 404; `/services` still works
- [ ] Screenshots at 390px and 1440px

## Notes / decisions

- Hot files touched: `seed/seed.json`, `src/i18n/ui.ts`, `src/layouts/Base.astro` (footer links), `src/pages/[...lang]/index.astro`. Run alone.
