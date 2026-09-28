# 006: Testimonials (structure only, no fake quotes)

- **Status:** done
- **Wave:** 3
- **Roadmap:** Phase 2, "Testimonials collection, shown on home, case studies and service pages"
- **Mockups:** `mockup/11-global-components/BRIEF.md` (`testimonial-card.png` described there)
- **Owner:** AI

## Goal

When the first real client quote exists, an editor can add it in the admin and it appears on the home page and the related case study, with no code change.

## Scope

- In: `testimonials` collection, `TestimonialCard` component, sections on home and project detail that render **only when entries exist**.
- Out: sample testimonials. Do not seed any quote, name or photo; the content guide forbids invented testimonials. The seed only defines the collection.

## Design

- Schema: `testimonials` with `quote` (text), `author` (string), `role` (string), `company` (string), `avatar` (image, optional), `project` (project slug as a string, optional; see Notes), `featured` (boolean), `sort_order` (integer).
- `src/components/TestimonialCard.astro`: quote, author, role/company, optional avatar; one variant for grids, one wide variant for case studies.
- Home: section after "Dự án nổi bật" showing up to 3 featured testimonials; hidden when there are none.
- Project detail: the testimonial linked to the project, below the story sections; hidden when there is none.
- To test locally, create a testimonial in the admin, check both places, then delete it. Don't commit test data.

## Tasks

- [x] Collection in the seed (no entries) + architecture doc
- [x] `TestimonialCard` component
- [x] Home section (conditional)
- [x] Project detail block (conditional)
- [x] Strings vi + en

## Verification

- [x] `pnpm typecheck`: 0 errors
- [x] `pnpm build` succeeds
- [x] With no testimonials: home and detail pages unchanged. With one test entry: both sections render (vi + en)
- [x] Screenshots at 390px and 1440px with a test entry

## Notes / decisions

- Hot files touched: `seed/seed.json`, `src/i18n/ui.ts`, `src/pages/[...lang]/index.astro`. Run alone.
- EmDash 0.40 has no relations in seeds and no `references` query option (the online docs describe a newer version), and a bare `reference` field is just an ID text box. So `project` holds the project **slug**; the case study finds its quote with `where: { project: slug }`. Switch to a `reference` field bound to a relation after upgrading EmDash.
- Verified with a temporary entry created through the content API (dev-bypass), then deleted permanently: home grid and case-study block render in vi; other projects and `/en` (no translation) stay unchanged.
- To add a real quote: Admin → Testimonials → new entry (vi, plus an en translation if you have one), tick "Show on homepage", type the project slug to show it on that case study.
