# 003: Basic SEO

- **Status:** done
- **Wave:** 1 (parallel with 002, 004)
- **Roadmap:** Phase 1, "Basic SEO check: titles, descriptions, OG images, sitemap"
- **Mockups:** none (no UI)
- **Owner:** AI

## Goal

Every public page has a correct title, description, canonical URL, hreflang pair and share image, and search engines can find all pages through a sitemap.

## Scope

- In: meta tags, default OG image, sitemap, robots.txt, structured data (Organization, BreadcrumbList on project detail), 404 is `noindex`.
- Out: custom domain and site URL (Phase 2), analytics, content rewriting.

## Design

- Check first what EmDash already provides: `EmDashHead`, `getSeoMeta`, sitemap/robots support. Use the `emdash-docs` MCP server (`search_docs`) or `node_modules/emdash/src`. Don't duplicate what EmDash emits.
- Titles: `Page — CTStack`, home uses the tagline. Descriptions: each page passes a real one (projects/services/about/contact/404); add `seo.*` keys to `src/i18n/ui.ts` (vi + en) if a page has no description today, placed at the end of each dictionary.
- Default OG image: 1200×630 PNG in `public/og-default.png` (dark background, logo mark, "CTStack", tagline). Project pages use their featured image.
- hreflang: static pages already emit alternates in `Base.astro`; make sure content pages (project detail, about) emit them too and that `x-default` points to vi.
- Sitemap: include vi + en URLs of all pages and projects; exclude `/_emdash`, 404. Robots: allow all, link the sitemap.
- Site URL is not final yet: read it from one place (`astro.config.mjs` `site`, or EmDash settings) so switching to the real domain later is one change. Document where in `docs/architecture.md`.

## Tasks

- [x] Audit current `<head>` output for every route (vi + en) and list gaps in this plan
- [x] Descriptions for all pages
- [x] Default OG image + per-page images
- [x] hreflang + canonical correct on every page, `x-default`
- [x] Sitemap + robots.txt
- [x] JSON-LD: Organization (site-wide), BreadcrumbList (project detail)
- [x] Update `docs/architecture.md` (SEO section)

## Verification

- [x] `pnpm typecheck`: 0 errors
- [x] `pnpm build` succeeds
- [x] `curl` each route and check title, description, canonical, hreflang, og:image
- [x] Sitemap lists every page in both languages; JSON-LD validates (schema.org validator or Google Rich Results test on a deploy preview)

## Notes / decisions

- Hot files touched: `src/layouts/Base.astro` (head only), `src/i18n/ui.ts` (end of each dictionary), `astro.config.mjs`. No other wave-1 plan edits `Base.astro`.
- EmDash's built-in sitemap is collection-only, so `src/pages/sitemap.xml.ts` supplies the required static routes and project URLs. The built-in `robots.txt` endpoint remains the source of robots directives and links to this sitemap.
- Project detail pages pass the featured media API URL as the SEO fallback image because EmDash media values expose `url`/`id`, not a `src` property.
- Review (wave 1): the sitemap pairs vi/en project URLs by identical slug. That holds for the seed today; if a translation ever gets its own slug, switch to `contentAlternates()` so hreflang pairs stay correct.
