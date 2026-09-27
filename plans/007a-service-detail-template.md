# 007a: Service detail page, template + first service

- **Status:** ready (start after 005 and 006 are merged)
- **Wave:** 4
- **Roadmap:** Phase 2, "Service detail pages `/services/[slug]`"
- **Mockups:** `mockup/08-service-detail/BRIEF.md` (no image: build from existing components, see Styling rules in `AGENTS.md`)
- **Owner:** AI
- **Next:** 007b fills the other 4 services and adds SEO

## Goal

A working `/services/[slug]` page with every section from the brief, fully filled for **one** service ("Website doanh nghiệp", slug `thiet-ke-website`), so 007b only has to add content.

## Scope

- In: shared `PricingTiers` component, schema fields, route, all sections, links from service cards.
- Out: content for the other 4 services, JSON-LD and meta tuning (007b). Other services must still render (sections with no data are hidden).

## Design

- Extract the pricing markup + CSS from `src/pages/[...lang]/index.astro` into `src/components/PricingTiers.astro` (props: tiers list, optional heading). Home must look identical afterwards (compare screenshots).
- Route: move `src/pages/[...lang]/services.astro` to `services/index.astro`; add `services/[slug].astro`. Server-rendered, unknown slug → 404 (`isNotFoundError`).
- Schema (`services` in `seed/seed.json`), all optional so existing entries stay valid:
  - `hero_title` (string), `value_props` (repeater `{ title, text }`), `pains` (repeater `{ title, text }`), `comparison` (repeater `{ label, diy, ctstack }`), `questions` (repeater `{ question, answer }`), `related_services` (repeater of service slugs, or references if EmDash supports them: check `emdash-docs`).
  - Packages: `packages` (repeater `{ name, price, desc, features (text, one per line), popular }`) rendered with `PricingTiers`.
- Sections in brief order: breadcrumb, hero (+ value props, CTA "Nhận tư vấn & báo giá trong 24h"), packages, pains, comparison table, questions before signing, 6-step process, related projects (same category) + testimonial if one exists (plan 006), FAQ (`faqs` from plan 005: add an optional `service` field to `faqs`, or pick by category; decide and note it here), related services, CTA band. Hide any section whose data is empty.
- Comparison table: real `<table>` with a caption; check/cross as text or icons with `aria-label`.
- Service cards on home and `/services` link to their detail page.
- Content for `thiet-ke-website` (vi + en) is sample copy: list it in `docs/placeholders.md`.

## Tasks

- [ ] `PricingTiers` component, home unchanged
- [ ] Route move + `[slug]` page, 404 handling
- [ ] Schema fields + architecture doc
- [ ] All sections, hidden when empty
- [ ] Content for `thiet-ke-website` (vi + en), placeholders listed
- [ ] Card links

## Verification

- [ ] `pnpm typecheck`: 0 errors
- [ ] `pnpm build` succeeds
- [ ] `/services`, `/services/thiet-ke-website`, `/en/services/thiet-ke-website` return 200; the other 4 slugs return 200 with fewer sections; unknown slug 404
- [ ] Home screenshot unchanged after the `PricingTiers` extraction
- [ ] Screenshots at 390px and 1440px of the filled service page

## Notes / decisions

- Hot files touched: `seed/seed.json`, `src/i18n/ui.ts`, `src/pages/[...lang]/index.astro`. Run alone.
