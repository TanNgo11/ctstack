# 001: UI redesign from mockups

- **Status:** draft (waiting for mockup images)
- **Roadmap:** Phase 1, "UI redesign from mockups"
- **Mockups:** `mockup/00-design-system/` … `mockup/07-not-found/`
- **Owner:** AI (implementation), human (mockup approval)

## Goal

Replace the current generic look with a distinctive, trustworthy studio design that pushes visitors to "Nhận báo giá".

## Scope

- In: theme tokens, layout (header/footer, mobile nav), every public page, light + dark.
- Out: schema changes, new sections that need new CMS fields (log them as follow-up plans).

## Design

- Source of truth: images + `README.md` in each `mockup/<feature>/` folder.
- Tokens go in `src/styles/theme.css` (colors via `light-dark()`); font in `astro.config.mjs`.
- Shared components: extend `ProjectCard`, `ServiceCard`; add new ones in `src/components/` as needed.
- Any new hardcoded text → `src/i18n/ui.ts` (vi + en).

## Tasks

- [ ] Mockups generated and approved (all folders)
- [ ] Design system: tokens, buttons, cards, inputs, pills (`theme.css`)
- [ ] Header (with mobile menu) + footer (`Base.astro`)
- [ ] Home
- [ ] Projects list
- [ ] Project detail
- [ ] Services
- [ ] Contact (form plugin styling)
- [ ] About
- [ ] 404
- [ ] Light/dark check on every page

## Verification

- [ ] `pnpm typecheck`: 0 errors
- [ ] `pnpm build` succeeds
- [ ] vi + en routes 200, bad slugs 404
- [ ] Side-by-side with mockups at 390px and 1440px

## Notes / decisions
