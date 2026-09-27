# 008: Quality pass (performance, accessibility, light theme)

- **Status:** ready (last, after 002–007 are merged)
- **Wave:** 5
- **Roadmap:** Phase 1 wrap-up before deploy
- **Mockups:** all
- **Owner:** AI

## Goal

The site is fast, usable with keyboard and screen readers, and looks right in both themes on every page before it goes live.

## Scope

- In: Lighthouse (mobile) on every page type, keyboard and screen-reader checks, colour contrast, light theme on every page, image sizes, repo-wide Prettier format.
- Out: new features, redesigns.

## Design

- Targets: Lighthouse mobile ≥ 90 for performance, accessibility, best practices and SEO on home, projects, project detail, services, service detail, FAQ, contact.
- Accessibility: visible focus styles on links, buttons, pills, tabs and form fields; skip link; mobile menu traps focus while open and returns it on close; every icon-only button has a label; contrast ≥ 4.5:1 for text in both themes.
- Light theme: screenshot every page with `prefers-color-scheme: light`; fix hard-coded dark colours (e.g. hero illustration frames).
- Images: `Image` sizes/widths set so cards don't download full-size images; hero illustration stays CSS-only.
- Formatting: once no other branch is active, run `pnpm format` in its own commit.

## Tasks

- [ ] Lighthouse report per page type, fixes, report numbers in this plan
- [ ] Keyboard + screen reader pass, fixes
- [ ] Light theme pass, fixes
- [ ] Image sizing
- [ ] Repo-wide `pnpm format` commit

## Verification

- [ ] `pnpm typecheck`: 0 errors
- [ ] `pnpm build` succeeds
- [ ] Lighthouse targets met (numbers recorded here)
- [ ] Screenshots at 390px and 1440px, dark and light

## Notes / decisions

- Touches many files; run alone.
