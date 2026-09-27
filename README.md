# CTStack

Portfolio and services site for CTStack, built with [EmDash](https://github.com/emdash-cms/emdash) (Astro) and deployed on Cloudflare Workers + D1 + R2. Bilingual: Vietnamese (default) and English.

New here? Open [`docs/onboarding.html`](docs/onboarding.html) (Vietnamese) in a browser. Architecture diagrams: [`docs/overview.html`](docs/overview.html). AI agents: [`AGENTS.md`](AGENTS.md).

## Pages

| Page           | Vietnamese         | English               |
| -------------- | ------------------ | --------------------- |
| Home           | `/`                | `/en`                 |
| Projects       | `/projects`        | `/en/projects`        |
| Project detail | `/projects/:slug`  | `/en/projects/:slug`  |
| Services       | `/services`        | `/en/services`        |
| About          | `/about`           | `/en/about`           |
| Contact        | `/contact`         | `/en/contact`         |

All routes live in `src/pages/[...lang]/`; the optional `lang` segment is empty for Vietnamese and `en` for English. Anything else returns 404.

## Content model

Defined in `seed/seed.json` (regenerate with care; the seed is only applied to an empty database).

- **projects** — title, featured image, client, year, category (`website | web_app | mobile_app | ecommerce | landing_page`), stack (comma separated), summary, case study (rich text), results (value + label), gallery, live URL, `featured` (show on homepage), `sort_order`.
- **services** — title, icon (`globe | cart | layout | smartphone | wrench | sparkles`), summary, price from, features, details, `sort_order`.
- **pages** — title, content. `about` is used by `/about`.

Each entry exists once per language, linked as translations (Admin → entry → Translations). The Vietnamese and English versions may share a slug.

The seeded projects are **samples**: replace them with real work (and real numbers) before launch.

## Hardcoded text

UI strings (nav, headings, buttons, process steps) are in `src/i18n/ui.ts`. `contactEmail` there shows a mailto link on the contact page when set.

## Contact form

Uses `@emdash-cms/plugin-forms`. The pages embed forms with slugs `lien-he` (vi) and `contact` (en) — create them in **Admin → Forms** on a fresh database. Submissions appear in **Admin → Forms → Submissions**. Email notifications need an email provider plugin (e.g. `emdash-plugin-resend`) and a domain.

## Development

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

- Admin: `http://localhost:4321/_emdash/admin`
- Dev login + seed sample content: `http://localhost:4321/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin`
- MCP server (for AI content work): `http://localhost:4321/_emdash/api/mcp`
- Reset local data: stop the server and delete `.wrangler/state`.

```bash
pnpm typecheck
pnpm build
```

## Deploy (Cloudflare)

```bash
pnpm exec wrangler login
pnpm run deploy       # first deploy provisions the D1 database and R2 bucket from wrangler.jsonc
pnpm exec wrangler secret put EMDASH_ENCRYPTION_KEY   # value from .env
```

If provisioning is skipped, create them manually (`pnpm exec wrangler d1 create ctstack`, `pnpm exec wrangler r2 bucket create ctstack-media`) and put the `database_id` in `wrangler.jsonc`.

Then open `/_emdash/admin` on the deployed URL, finish the setup wizard (include sample content if wanted), create the two contact forms, and set the site URL in Settings once a domain is attached (needed for hreflang and sitemap).
