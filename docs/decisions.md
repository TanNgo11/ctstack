# Decision log

Short records of choices that affect the whole project. Add new entries at the bottom; don't rewrite old ones. Mark superseded entries instead.

## 001: EmDash as the CMS (2026-09-27)

**Context:** Portfolio + services site, content will later be written with AI.
**Decision:** EmDash (Astro-based CMS).
**Why:** Built-in MCP server, so AI agents can create and edit content directly. Structured content (Portable Text). Admin UI included. Astro output is fast and SEO-friendly.
**Trade-off:** Young project (0.x), so expect breaking changes and a small ecosystem. Keep the content model simple so a migration to plain Astro content collections stays possible.

## 002: Cloudflare full stack (2026-09-27)

**Decision:** Workers + D1 + R2, cron trigger.
**Why:** EmDash's primary target. Near-zero cost at low traffic. No server to maintain.
**Note:** Sandboxed plugins need Worker Loader (paid plan). It is disabled, so only trusted npm plugins are used.

## 003: i18n with a single `[...lang]` route tree (2026-09-27)

**Decision:** All pages live in `src/pages/[...lang]/`; `lang` is empty (vi) or `en`.
**Why:** One file per page for both languages. Astro components can't return redirects/Responses, so thin wrappers around shared views didn't work.
**Rules:** Unknown `lang` → rewrite `/404`. UI strings in `src/i18n/ui.ts`; content translated per entry in EmDash.

## 004: Forms plugin for leads (2026-09-27)

**Decision:** `@emdash-cms/plugin-forms`, one form per language (`lien-he`, `contact`).
**Why:** Official, trusted (works without Worker Loader), stores submissions in D1 with an admin inbox, honeypot/Turnstile built in.
**Follow-up:** Email notifications need an email provider plugin and a domain (Phase 2).

## 005: Category as a select field, not a taxonomy (2026-09-27)

**Decision:** `projects.category` is a `select` field; labels are translated in `ui.ts`.
**Why:** Taxonomy terms are per-locale in EmDash, which doubles the maintenance for a fixed list of five categories.
