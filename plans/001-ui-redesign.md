# 001: UI redesign from mockups

- **Status:** done
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

- [x] Mockups generated and approved (all folders)
- [x] Design system: tokens, buttons, cards, inputs, pills, grid + glow background (`theme.css`)
- [x] Header: sticky, blurred, centered nav, gradient CTA, stacked-layers logo mark; mobile: link row + hamburger opening a full-screen menu
- [x] Footer: brand + 3 link columns + bottom row (copyright, theme, language)
- [x] Global CTA band on every page
- [x] Home (`01`, `02`, `03` light)
- [x] Projects list (`04`)
- [x] Project detail (`05`)
- [x] Services (`06`)
- [x] Contact, incl. form plugin styling (`07`, `08`)
- [x] About (brief only, no image): lead, CMS sections as cards, process, tech grid
- [x] 404 (brief only, no image)
- [x] Light/dark check (home light vs `03-home-desktop-light.png`)

Follow-ups (not in this plan):

- [ ] Floating contact buttons: built but hidden until phone/Zalo/Messenger are set in `src/i18n/ui.ts`
- [ ] Footer per `mockup/11-global-components/BRIEF.md`: FAQ/policy links and social icons need those pages/accounts first
- [ ] About: stats row, team, company profile PDF (need real data; no placeholders per content guide)
- [ ] Decide default theme when no cookie: dark-first vs follow OS (currently follows OS)

## Verification

- [x] `pnpm typecheck`: 0 errors
- [x] `pnpm build` succeeds
- [x] vi + en routes 200, bad slugs 404
- [x] Side-by-side with mockups at 390px and 1440px (headless Chrome screenshots)

## Notes / decisions

- Review pass 2 (after comparing screenshots with mockups): contact form fixes (empty select choice, textarea whitespace), logo mark, hamburger menu, richer hero illustration, real tech logos (`simple-icons`, CC0), process connectors, mobile icon project cards, related projects as row cards, service icons `monitor`/`code`/`chart` (seed updated; existing DBs: `pnpm exec emdash seed seed/seed.json --on-conflict update` or change icons in the admin).
