# 008: Quality pass (performance, accessibility, light theme)

- **Status:** done
- **Wave:** 6
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

- [x] Lighthouse report per page type, fixes, report numbers in this plan
- [x] Keyboard + screen reader pass, fixes
- [x] Light theme pass, fixes
- [x] Image sizing
- [x] Repo-wide `pnpm format` commit

## Verification

- [x] `pnpm typecheck`: 0 errors
- [x] `pnpm build` succeeds
- [x] Lighthouse targets met (numbers recorded here)
- [x] Screenshots at 390px and 1440px, dark and light

## Notes / decisions

- Touches many files; run alone.
- Lighthouse mobile (production preview, simulated throttling), 2026-09-28. All four categories are at least 90.

  | Page                             | Performance | Accessibility | Best practices | SEO |
  | -------------------------------- | ----------- | ------------- | -------------- | --- |
  | `/`                              | 95          | 100           | 100            | 100 |
  | `/projects`                      | 97          | 100           | 96             | 100 |
  | `/projects/website-chuoi-ca-phe` | 98          | 100           | 96             | 100 |
  | `/services`                      | 99          | 100           | 100            | 100 |
  | `/services/thiet-ke-website`     | 99          | 100           | 100            | 100 |
  | `/faq`                           | 98          | 100           | 100            | 100 |
  | `/contact`                       | 97          | 100           | 100            | 100 |

- Best practices is 96 on the two project pages because the local media files for those sample images respond 404 (`File not found` from R2). The score still meets the target. Re-seed or restore the media objects before launch screenshots of real projects.
- Service JSON-LD (`url` and `provider.@id`) uses `resolveSiteOrigin`, the same Site URL → request-origin rule as the Organization graph in `Base.astro`. The sitemap uses that helper too.
- Accessibility fixes: skip link, visible `:focus-visible`, mobile menu focus trap (returns focus on close), FAQ tab arrow keys, heading levels so list pages do not skip from `h1` to `h3`.
- Performance: preload only the 700 weight of Be Vietnam Pro (the hero), and inline stylesheets so mobile LCP is not waiting on several CSS files. `public/favicon.ico` removes the console 404.
- Light theme: laptop and phone frames use `light-dark()` so the bezel is light aluminum in the light theme. The dashboard drawn inside the screen stays as it was.
- Card, hero, gallery and avatar images pass a `sizes` value so the browser does not treat them as full-viewport. Avatars also set width and height to 88.
