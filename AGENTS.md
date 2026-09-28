# CTStack — agent guide

Portfolio + services site for CTStack, a studio that builds websites, web apps and mobile apps. Goal: show real projects and turn visitors into leads ("Nhận báo giá" / "Get a quote"). Built on **EmDash** (Astro CMS) and deployed to **Cloudflare Workers + D1 + R2**. Bilingual: Vietnamese (default) and English.

Read before non-trivial work:

- [docs/architecture.md](docs/architecture.md): stack, diagrams, request flow, content model
- [docs/roadmap.md](docs/roadmap.md): phases and current status
- [docs/decisions.md](docs/decisions.md): why things are the way they are
- [docs/content-guide.md](docs/content-guide.md): rules for writing site content (including AI-written content)
- [docs/placeholders.md](docs/placeholders.md): sample content that must be replaced before launch; add to it when you write placeholder copy
- [plans/](plans/): one plan per feature; check for an active plan before starting
- [mockup/](mockup/): design references per feature; UI work must match them

Human docs (Vietnamese): `docs/overview.html` mirrors the architecture and roadmap, and `docs/onboarding.html` is the newcomer guide. When you change commands, structure or the roadmap, update them too.

## Commands

```bash
pnpm dev          # http://localhost:4321 (admin: /_emdash/admin)
pnpm typecheck    # astro check, must be 0 errors
pnpm build        # production build (Cloudflare)
pnpm run deploy   # build + wrangler deploy (not `pnpm deploy`: that is a pnpm builtin)
pnpm format       # prettier --write . (format:check to only check)
```

Package manager is **pnpm** only (`pnpm add`, `pnpm exec`). Don't use npm/yarn or create `package-lock.json`. `pnpm-workspace.yaml` holds the build-script allowlist and a 24h release-age cooldown (EmDash packages exempt); keep it. `@cloudflare/kumo` is pinned to the exact version the EmDash packages expect as a peer.

Dev login + sample content: `http://localhost:4321/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin`.
Reset local data: stop the server, delete `.wrangler/state`.
Contact forms on a fresh local DB: `node scripts/create-contact-forms.mjs` (dev server running).

## Project layout

| Path                     | Purpose                                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro + EmDash config, i18n (`vi` default, `en`), plugins, fonts                                                  |
| `wrangler.jsonc`         | Cloudflare Worker, D1 (`DB`), R2 (`MEDIA`), cron                                                                  |
| `seed/seed.json`         | Schema + sample content. Only applied to an empty database                                                        |
| `src/pages/[...lang]/`   | All public routes. `lang` param is empty (vi) or `en`; anything else 404                                          |
| `src/pages/404.astro`    | Not-found page (language from the original path)                                                                  |
| `src/layouts/Base.astro` | HTML shell, nav, language switch, footer, EmDash head/body hooks                                                  |
| `src/components/`        | `ProjectCard`, `ServiceCard`, `ServiceIcon`, `PricingTiers`, `ContactForm`, `TestimonialCard`, `Logo`, `TechLogo` |
| `src/views/`             | Shared view components with no data loading (`NotFound`)                                                          |
| `src/i18n/ui.ts`         | UI strings (vi/en), locale helpers, contact form slugs, contact email                                             |
| `src/lib/content.ts`     | Content helpers: translation alternates, safe URLs, not-found detection                                           |
| `src/styles/tokens.css`  | Default design tokens (don't edit)                                                                                |
| `src/styles/theme.css`   | CTStack theme overrides + shared classes (`.container`, `.btn`, `.prose`...)                                      |
| `src/live.config.ts`     | EmDash loader boilerplate (don't modify)                                                                          |
| `.agents/skills/`        | EmDash skills (also linked at `.claude/skills/`)                                                                  |

## Rules

### i18n

- Every page file lives in `src/pages/[...lang]/` and starts with:
  ```ts
  const lang = langFromParam(Astro.params.lang);
  if (!lang) return Astro.rewrite("/404");
  ```
- Build internal links with `localizePath(path, lang)`. Never hardcode `/en/...`.
- Never add a bare dynamic route `src/pages/[...lang]/[param].astro`: it outranks `[...lang]/index.astro` and turns `/en` into a 404. Put dynamic pages under a fixed segment (`projects/[slug]`, `chinh-sach/[page]`), and always check `/` and `/en` after adding a route.
- No hardcoded UI text in templates. Add keys to **both** `vi` and `en` in `src/i18n/ui.ts` (the `en` object is typed from `vi`, so a missing key is a type error).
- Query CMS content with `locale: lang`. Each entry exists per language, linked as translations; `contentAlternates()` feeds the language switcher.
- Components find the language with `langFromPath(Astro.originPathname ?? Astro.url.pathname)`.

### EmDash

- All content pages are server-rendered. No `getStaticPaths()` for CMS content.
- Image fields are objects. Render with `<Image image={...} />` from `emdash/ui`.
- `entry.id` is the slug (URLs); `entry.data.id` is the ULID (API calls like `getTranslations`).
- A missing slug from `getEmDashEntry` comes back as an **error**, not a null entry. Check `isNotFoundError(error)` first, then return 404.
- `where` in `getEmDashCollection` matches string values only. Filter booleans (`featured`) in JS.
- Spread `entry.edit.<field>` on the element that renders the field (visual editing).
- Pass `cacheHint`s to `Astro.cache.set()` when `Astro.cache?.enabled`.
- Astro components can't `return Astro.redirect()` or `Response`; only pages can. Keep data loading and 404 handling in page files.
- Verify EmDash APIs with the docs MCP server (`emdash-docs`, `search_docs`) or `node_modules/emdash/src`, not from memory.

### Schema changes

- Edit `seed/seed.json` (every content entry needs a `vi` and an `en` version linked with `translationOf`), then update the content model in `docs/architecture.md`.
- The seed only applies to an empty DB. Existing sites need the change made in the admin (or `pnpm exec emdash seed ... --on-conflict update`).

### Styling

- Tokens: override in `theme.css`, never edit `tokens.css`. Colors use `light-dark()`.
- Reuse shared classes from `theme.css` before adding page CSS.
- UI must match the mockups in `mockup/<feature>/`. If none exist, write the brief first.
- Mobile first. Check 390px and 1440px widths.
- Follow the mockup layout, but avoid the "AI template" look (decided after review, see `plans/001-ui-redesign.md`):
  - The blue→violet gradient (`--accent-gradient`) is only for primary CTAs (`.btn-primary`, form submit). Accent text, prices, numbers, icons and badges use the solid `--color-brand` (`.text-accent`).
  - No glows: no radial-gradient blobs, coloured box-shadows, inner hover glows or blur halos. Hover = border colour change.
  - No decorative filler copy (slogan tiles, "Ideas today / Better products tomorrow" taglines). Every line of text must say something concrete.
  - Small radii (`--radius` 8px, `--radius-card` 12px), no hover lift, arrows only on primary CTAs and "see all" links.
  - Pages without a mockup image: build from existing components and page patterns (cards, pills, `.section-header`, `.why`, tiers) instead of inventing new visual styles.

### Formatting

- Prettier (`.prettierrc.json`: tabs, width 100, Astro plugin). Run `pnpm exec prettier --write <files you touched>` before committing.
- Don't reformat files outside your task: a repo-wide `pnpm format` belongs in its own commit, done when no other branch is mid-change.

### Secrets

- Local: `.env` / `.dev.vars` (both gitignored). Production: `pnpm exec wrangler secret put <NAME>`.
- Never put secrets in `wrangler.jsonc` `vars`, `seed/seed.json`, source code or docs. Only non-secret config goes in `vars`.

### Content

- Follow `docs/content-guide.md`. Never invent client names, metrics or testimonials as if real; mark samples clearly.

## Workflow

1. Check `docs/roadmap.md` and `plans/` for the task. Non-trivial feature: write `plans/NNN-<feature>.md` from `plans/_template.md` first.
2. UI feature: make sure `mockup/<feature>/` has a brief and images.
3. Implement, keeping both languages working.
4. Verify: `pnpm typecheck`, `pnpm build`, and hit the affected vi + en routes on the dev server (expect 200; bad slugs 404).
5. UI work: screenshot each changed page at 390px and 1440px (`node scripts/screenshot.mjs <path> <width> <out.png> [dark|light] [baseUrl]`) and compare side by side with the mockup before ticking it in the plan.
6. Update the plan status, `docs/roadmap.md` checkboxes, and docs affected by the change.

### Branches and parallel sessions

- One session (human or AI) = one branch in its own worktree. Never run two sessions in the same worktree.
- Work in small steps (e.g. design system → global components → one page at a time) and commit each step.
- Before merging a step into `main`: `pnpm typecheck` (0 errors) and `pnpm build` pass.
- Merge into `main` after every step, and rebase/merge `main` back into other active branches early, so parallel sessions don't drift.
- Shared hot files (`src/styles/theme.css`, `src/layouts/Base.astro`, `src/i18n/ui.ts`, `seed/seed.json`): only one branch changes them at a time.
