# Architecture

## Tech stack

| Layer          | Choice                                 | Notes                                                      |
| -------------- | -------------------------------------- | ---------------------------------------------------------- |
| Framework      | Astro 7 (`output: "server"`)           | Every page is server-rendered on each request              |
| CMS            | EmDash 0.40                            | Schema in the DB, admin UI at `/_emdash/admin`, MCP server |
| UI             | `.astro` components + plain CSS tokens | React is only used inside the EmDash admin                 |
| i18n           | Astro i18n (`vi` default, `en`)        | EmDash stores one row per locale, linked as translations   |
| Forms / leads  | `@emdash-cms/plugin-forms`             | Public submit route, submissions stored in D1, admin inbox |
| Runtime        | Cloudflare Workers                     | `@astrojs/cloudflare` adapter, entry `src/worker.ts`       |
| Database       | Cloudflare D1 (SQLite), binding `DB`   | Content, schema, users, plugin storage                     |
| Media          | Cloudflare R2, binding `MEDIA`         | Uploaded images                                            |
| Scheduled jobs | Workers cron (every minute)            | Scheduled publishing, plugin cron (form cleanup)           |
| Font           | Be Vietnam Pro (Astro Fonts API)       | Covers Vietnamese diacritics                               |
| Tooling        | TypeScript, `astro check`, Wrangler 4  |                                                            |

## System overview

```mermaid
flowchart LR
    V["Visitor<br/>(browser)"]
    E["Editor / Admin<br/>(browser)"]
    AI["AI agent<br/>(Claude / Codex)"]

    subgraph CF["Cloudflare"]
        W["Worker<br/>Astro SSR + EmDash runtime"]
        D1[("D1<br/>content, schema,<br/>users, form submissions")]
        R2[("R2<br/>media files")]
        CRON["Cron trigger<br/>every minute"]
    end

    V -- "GET /, /en/projects/..." --> W
    V -- "POST /_emdash/api/plugins/emdash-forms/submit" --> W
    E -- "/_emdash/admin" --> W
    AI -- "MCP /_emdash/api/mcp" --> W
    W <--> D1
    W <--> R2
    CRON --> W
```

## Request flow (public page)

```mermaid
sequenceDiagram
    participant B as Browser
    participant MW as EmDash middleware
    participant P as Page src/pages/[...lang]/...
    participant Q as EmDash query API
    participant DB as D1
    participant L as Base.astro

    B->>MW: GET /en/projects/website-chuoi-ca-phe
    MW->>MW: init runtime, run pending migrations (first request)
    MW->>P: route match (lang="en", slug=...)
    P->>P: langFromParam("en") (invalid lang -> rewrite /404)
    P->>Q: getEmDashEntry("projects", slug, { locale: "en" })
    Q->>DB: SELECT from ec_projects
    DB-->>Q: row
    Q-->>P: entry (or LiveEntryNotFoundError -> 404)
    P->>Q: getTranslations() for the language switcher
    P->>L: render with title, SEO, alternates
    L->>Q: getSiteSettings()
    L-->>B: HTML (EmDashHead adds SEO / hreflang)
```

## Code structure

```mermaid
flowchart TB
    subgraph pages["src/pages"]
        LANG["[...lang]/<br/>index · projects/index · projects/[slug]<br/>services · about · contact · faq<br/>[page] (CMS pages: policies)"]
        NF["404.astro"]
    end
    subgraph layout["src/layouts"]
        BASE["Base.astro<br/>head, nav, lang switch, footer"]
    end
    subgraph comps["src/components"]
        PC["ProjectCard"]
        SC["ServiceCard"]
        SI["ServiceIcon"]
    end
    subgraph views["src/views"]
        NFV["NotFound"]
    end
    subgraph lib["shared"]
        I18N["i18n/ui.ts<br/>strings, localizePath,<br/>langFromParam/Path"]
        CONT["lib/content.ts<br/>contentAlternates,<br/>isNotFoundError, safeExternalUrl"]
        THEME["styles/theme.css<br/>tokens + shared classes"]
    end
    EMD["emdash / emdash/ui"]
    FORMS["@emdash-cms/plugin-forms/ui<br/>Form component"]

    LANG --> BASE
    LANG --> PC
    LANG --> SC
    LANG --> I18N
    LANG --> CONT
    LANG --> EMD
    LANG -- contact --> FORMS
    NF --> NFV --> BASE
    SC --> SI
    BASE --> I18N
    BASE --> THEME
    PC --> I18N
    SC --> I18N
    CONT --> EMD
```

## i18n routing

```mermaid
flowchart LR
    URL["Request path"] --> M{"first segment"}
    M -- "none (e.g. /projects)" --> VI["lang = vi"]
    M -- "en" --> EN["lang = en"]
    M -- "anything else" --> R404["rewrite /404"]
    VI --> Q["query content with locale"]
    EN --> Q
    Q --> SW["language switcher:<br/>translation URL, else home"]
```

- Vietnamese has no prefix (`prefixDefaultLocale: false`); English is under `/en`.
- Slugs can be the same in both languages (for example, `about`).
- `hreflang`: static pages emit links from `Base.astro`. Content pages get them from `EmDashHead` once the site URL is set in Admin → Settings.

## SEO and discovery

`src/layouts/Base.astro` is the single public-page head. It passes the resolved
title, description, canonical URL, robots directive and absolute share image to
EmDash's `EmDashHead`, which renders the standard description, Open Graph,
Twitter Card, canonical and WebSite JSON-LD tags. The layout also emits the
site-wide Organization graph and a BreadcrumbList for project detail entries.
Static pages render Vietnamese, English and `x-default` alternates in the
layout; translated content entries get their alternates from EmDash's
translation-aware head integration.

The default share image is `public/og-default.png`. A project featured image
provided by its SEO/content data takes precedence. The public site origin is
read from EmDash Admin → Settings → Site URL, with the current request origin
as the local/development fallback, so changing the production domain requires
one settings change.

`src/pages/sitemap.xml.ts` provides the top-level sitemap. It includes the
Vietnamese and English home, projects, services, about, contact and FAQ routes,
all published project detail routes and the CMS pages served by the generic
`[page]` route (policies), and emits their hreflang pairs. Pairs assume the vi
and en entries share a slug. EmDash's
`robots.txt` endpoint allows public crawling, disallows `/_emdash/`, and links
to this sitemap. The 404 page is marked `noindex` and is excluded from the
sitemap.

## Content model

```mermaid
erDiagram
    PROJECTS {
        string title
        image featured_image
        string client
        string year
        select category "website|web_app|mobile_app|ecommerce|landing_page"
        select industry "fnb|beauty|real_estate|retail|education|other"
        string duration "project duration, e.g. 6 weeks"
        string team_size "team size, e.g. 3 people"
        string stack "comma separated"
        text summary
        portableText content "case study"
        repeater results "value, label"
        repeater features "item"
        repeater gallery "image, caption"
        url url
        boolean featured "show on home"
        boolean live "live project badge"
        integer sort_order
    }
    SERVICES {
        string title
        select icon "monitor|cart|code|smartphone|chart|globe|layout|wrench|sparkles"
        text summary
        string price_from
        repeater features "item"
        portableText content
        integer sort_order
    }
    PAGES {
        string title
        portableText content "about + policies, generic route /[slug]"
    }
    FAQS {
        string question
        portableText answer
        select category "pricing|timeline|warranty|technical|content"
        integer sort_order
    }
    FORM_SUBMISSIONS {
        string formId "lien-he | contact"
        json data "name, phone, email, service, budget, message"
        string status "new|read|archived"
    }
```

Every content row also has system fields: `id` (ULID), `slug`, `status`, `locale`, `translation_group`, timestamps. `vi` and `en` rows of the same item share a `translation_group`.

## Lead flow

```mermaid
sequenceDiagram
    participant V as Visitor
    participant C as /contact page
    participant F as forms plugin (public route)
    participant DB as D1
    participant A as Admin inbox

    V->>C: open /contact or /en/contact
    C->>F: load form definition (lien-he / contact)
    C-->>V: server-rendered form (+ honeypot)
    V->>F: POST submit
    F->>F: validate, spam check
    F->>DB: store submission
    F-->>V: confirmation message
    A->>DB: Admin → Forms → Submissions
    Note over F: Phase 2: email notification<br/>via email provider plugin
```

## Environments

| Env        | Database                                    | How to run        |
| ---------- | ------------------------------------------- | ----------------- |
| Local      | Miniflare D1/R2 in `.wrangler/state`        | `pnpm dev`        |
| Production | Cloudflare D1 `ctstack`, R2 `ctstack-media` | `pnpm run deploy` |

Secret: `EMDASH_ENCRYPTION_KEY` (`.env` locally, `wrangler secret put` in production).
