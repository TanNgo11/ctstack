# Plans

One file per feature: `NNN-<feature>.md`, copied from [`_template.md`](_template.md). Write the plan before coding anything non-trivial, keep its checkboxes current, and set **Status: done** when finished.

| #    | Plan                                                                             | Wave | Status |
| ---- | -------------------------------------------------------------------------------- | ---- | ------ |
| 001  | [UI redesign from mockups](001-ui-redesign.md)                                   | –    | done   |
| 002  | [Contact: next steps, channels, success state](002-contact-next-steps.md)        | 1    | done   |
| 003  | [Basic SEO](003-seo-basics.md)                                                   | 1    | done   |
| 004  | [Project details and industry filter](004-project-details-and-filters.md)        | 1    | done   |
| 005  | [FAQ page and policy pages](005-faq-and-policies.md)                             | 2    | done   |
| 006  | [Testimonials (structure only)](006-testimonials.md)                             | 3    | done   |
| 007a | [Service detail: template + first service](007a-service-detail-template.md)      | 4    | done   |
| 007b | [Service detail: content for all services + SEO](007b-service-detail-content.md) | 5    | done   |
| 008  | [Quality pass](008-quality-pass.md)                                              | 6    | done   |

Deploy to Cloudflare is not planned yet (owner will do it later).

## Running plans in parallel

Plans in the same wave can run at the same time, each in its own branch + worktree (see "Branches and parallel sessions" in `AGENTS.md`). Start a wave only after the previous wave is merged into `main`.

Shared hot files and who touches them:

| File                     | Wave 1        | Later waves          |
| ------------------------ | ------------- | -------------------- |
| `src/layouts/Base.astro` | 003 only      | 005, 007b            |
| `seed/seed.json`         | 004 only      | 005, 006, 007a, 007b |
| `src/i18n/ui.ts`         | 002, 003, 004 | all                  |
| `src/styles/theme.css`   | none          | 008                  |

`ui.ts` is shared in wave 1, so each plan adds its keys next to its own prefix (`contact.*`, `seo.*` at the end, `industry.*` after `category.*`). Merge wave-1 branches one at a time and re-run `pnpm typecheck` after each merge.

Each worktree has its own local database and dev server:

- Use a different port per session: `pnpm dev --port 4322`, `4323`, …
- Fresh worktree: `pnpm install`, start the dev server, open `/_emdash/api/setup/dev-bypass?redirect=/` once to seed, then `node scripts/create-contact-forms.mjs http://localhost:<port>`.

## Prompt for another AI session

> Read `AGENTS.md`, `docs/placeholders.md`, `plans/README.md` and `plans/00X-….md`. Work in your own branch/worktree and run the dev server on port 43XX. Implement the plan, tick its checkboxes, run `pnpm typecheck` and `pnpm build`, check the vi + en routes, compare screenshots at 390px and 1440px with the mockups, then commit. Don't touch files outside the plan; if you must, say so in the plan's Notes. Reply to me in Vietnamese.
