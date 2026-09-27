# 004: Project details and industry filter

- **Status:** done
- **Wave:** 1 (parallel with 002, 003)
- **Roadmap:** Phase 2, "Projects: industry field + filter, duration, team size, key features, Live badge"
- **Mockups:** `mockup/02-projects/BRIEF.md`, `mockup/03-project-detail/BRIEF.md`, `mockup/04-projects-desktop.png`, `mockup/05-project-detail-desktop.png`
- **Owner:** AI

## Goal

Visitors can find projects from their own industry and see how long a project took, how big the team was and what it includes, which makes case studies more convincing than competitors'.

## Scope

- In: new project fields, industry filter row with counts, card badges, detail facts and "Tính năng chính" list.
- Out: testimonials (plan 006), device-frame gallery and before/after block (later).

## Design

- Schema (`seed/seed.json`, `projects`): `industry` (select: `fnb`, `beauty`, `real_estate`, `retail`, `education`, `other`), `duration` (string, e.g. "6 tuần" / "6 weeks"), `team_size` (string), `features` (repeater of `{ item }`), `live` (boolean). Fill all sample projects in vi + en; these are samples, keep client "Khách hàng mẫu".
- Industry labels in `src/i18n/ui.ts` like `category.*` (`industry.*`), placed right after the `category.*` keys in both dictionaries. Export an `projectIndustries` list next to `projectCategories`.
- Projects page: second filter row "Ngành" with counts, same pill style as the type filter; both filters combine via query params (`?category=…&industry=…`). `where` matches strings only, which works for selects; counts come from one unfiltered query.
- `ProjectCard` (large): "Live" badge on the image when `live`, up to 4 stack chips, duration.
- Detail page: add Ngành, Thời gian, Đội ngũ to the facts card; "Tính năng chính" checklist above the story sections.
- After changing the seed, update the content model in `docs/architecture.md`. Existing local DBs: `pnpm exec emdash seed seed/seed.json --on-conflict update` against the local D1 file (see plan 001 notes).

## Tasks

- [x] Seed fields + sample values (vi + en) and architecture doc
- [x] Industry filter with counts, combined with type filter
- [x] Card: Live badge, stack chips, duration
- [x] Detail: new facts, key features list
- [x] Strings vi + en

## Verification

- [x] `pnpm typecheck`: 0 errors
- [x] `pnpm build` succeeds
- [x] `/projects?industry=fnb`, combined filters and `/en/projects` return 200 with correct results; bad filter values fall back to "all"
- [x] Screenshots at 390px and 1440px compared with the mockups

## Notes / decisions

- Hot files touched: `seed/seed.json` (projects only), `src/i18n/ui.ts` (after `category.*`). No other wave-1 plan edits the seed.
- `emdash-env.d.ts` is refreshed with the generated project field types so Astro checks the new schema fields safely.
