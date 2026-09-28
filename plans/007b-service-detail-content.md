# 007b: Service detail pages, content for all services + SEO — spec and implementation plan

> **For agentic workers:** Implement task by task, in order; tick the checkboxes as you go. No unit-test suite: verification is `pnpm typecheck`, `pnpm build`, `curl` checks and screenshots.

- **Status:** done
- **Wave:** 5 (run alone: touches `seed/seed.json`, `src/layouts/Base.astro`)
- **Roadmap:** Phase 2, "Service detail pages `/services/[slug]`"
- **Mockups:** `mockup/08-service-detail/BRIEF.md`
- **Depends on:** `plans/007a-service-detail-template.md` (fields, route, `PricingTiers`, `serviceDetail.*` strings). Read its "Global constraints" and the finished `thiet-ke-website` content first: it is the reference for tone, length and shape.

**Goal:** All 5 service pages are complete (vi + en) and findable: every section filled, unique title/description, FAQPage + Service + BreadcrumbList structured data, and footer links to each service.

**Architecture:** Content only goes into `seed/seed.json` (the same fields 007a added) through a one-off script, then into the local DB with `emdash seed --on-conflict update`. The page gets one more block of JSON-LD. `Base.astro` loads the service list once for the footer.

**Tech stack:** Astro 7, EmDash 0.40, Cloudflare D1 (Miniflare locally).

## Global constraints

- Everything in `AGENTS.md` and 007a's "Global constraints" applies.
- Copy rules (`docs/content-guide.md`): write for Vietnamese business owners, concrete and plain; no invented clients, projects, awards or metrics; numbers only for our own offer (prices, timelines, warranty). Every text you add is sample content → list it in `docs/placeholders.md`.
- Keep the offer consistent with what the site already says: warranty 12 months (6 months only on the cheapest website package), 24h reply, fixed quotes, weekly demos, full handover of code and accounts. Check `home.why`, `home.tiers` and the general FAQ answers before writing.
- Same slugs in vi and en (sitemap hreflang pairing relies on it).

## Content brief per service

Write the same shape as `thiet-ke-website` (see 007a Task 2): `hero_title`, `hero_subtitle`, 6 `value_props`, 3 `packages` (middle one `popular: true`, features one per line, 5 lines each), 6 `pains`, 6 `comparison` rows, 6 `questions`, `project_category` (omit where noted), `related_services`, and 6 service FAQs (`faqs` entries with `service: "<slug>"`, ids `svc-<short>-1…6`, `sort_order` 100–105, categories from `pricing|timeline|warranty|technical|content`). Lengths: value prop text ≤ 90 characters, pain text ≤ 90, comparison cells ≤ 45, question answers ≤ 140, FAQ answers 1–2 sentences.

| Slug (vi/en)           | Title (existing)                       | Packages (name — vi price / en price)                                                                                                                        | Timeline to state                                          | `project_category`                              | `related_services`                    | Comparison columns mean                                         |
| ---------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ----------------------------------------------- | ------------------------------------- | --------------------------------------------------------------- |
| `website-ban-hang`     | Website bán hàng / E-commerce stores   | Khởi đầu / Starter — 15 triệu / $700 · Tăng trưởng / Growth — 25 triệu / $1,100 (popular) · Chuỗi cửa hàng / Multi-store — 40 triệu / $1,800                 | 6–8 tuần / 6–8 weeks                                       | `ecommerce`                                     | `thiet-ke-website,bao-tri-toi-uu`     | DIY = Shopee/marketplace shop or a ready-made WooCommerce theme |
| `web-app-theo-yeu-cau` | Web app theo yêu cầu / Custom web apps | MVP — 30 triệu / $1,500 · Doanh nghiệp / Business — 60 triệu / $2,800 (popular) · Tích hợp hệ thống / Integration — 100 triệu / $4,500                       | 8–12 tuần / 8–12 weeks                                     | `web_app`                                       | `ung-dung-di-dong,bao-tri-toi-uu`     | DIY = spreadsheets + off-the-shelf SaaS                         |
| `ung-dung-di-dong`     | Ứng dụng di động / Mobile apps         | MVP — 40 triệu / $2,000 · Tiêu chuẩn / Standard — 70 triệu / $3,200 (popular) · Mở rộng / Extended — 120 triệu / $5,500                                      | 10–14 tuần / 10–14 weeks                                   | `mobile_app`                                    | `web-app-theo-yeu-cau,bao-tri-toi-uu` | DIY = app builder (no-code)                                     |
| `bao-tri-toi-uu`       | Bảo trì & tối ưu / Maintenance & care  | Cơ bản / Basic — 2 triệu/tháng / $100/month · Tiêu chuẩn / Standard — 4 triệu/tháng / $180/month (popular) · Ưu tiên / Priority — 8 triệu/tháng / $350/month | response time per package: 48h / 24h / 4h (business hours) | omit (the page then shows the first 3 projects) | `thiet-ke-website,website-ban-hang`   | DIY = managing hosting, updates and backups yourself            |

Topics each service should cover (use them for value props, pains, questions and FAQs):

- **website-ban-hang:** cart and checkout (VNPay, MoMo, COD), product/stock/order management, shipping integrations (GHN, GHTK), abandoned carts, product SEO, speed on mobile, admin for non-technical staff, reports.
- **web-app-theo-yeu-cau:** business analysis first, roles and permissions, dashboards and reports, integrations with existing software/APIs, data migration from spreadsheets, audit logs, deployment on the client's infrastructure, handover documentation.
- **ung-dung-di-dong:** one React Native codebase for iOS + Android, App Store / Google Play publishing (who owns the developer accounts), push notifications, login, payments in app, analytics, store review times, updates after launch.
- **bao-tri-toi-uu:** backups (frequency, restore tests), security updates, uptime monitoring, speed optimisation, small content/feature changes per month (hours per package), monthly report, response times, what's not included (new features are quoted separately).

---

### Task 1: Content for the 4 services

**Files:**

- Create (temporary, not committed): `scripts/tmp-seed-007b.mjs`
- Modify: `seed/seed.json`, `docs/placeholders.md`

**Interfaces:**

- Consumes: service fields and `faqs.service` from 007a.
- Produces: filled `services` entries (vi + en) for the 4 slugs; 24 service FAQs × 2 languages.

- [x] **Step 1: Write the script** with this exact structure, filling `content` and `faqPairs` for all 4 services following the brief above (the `thiet-ke-website` block in `plans/007a-service-detail-template.md` Task 2 is the model to copy the shape from):

```js
import { readFileSync, writeFileSync } from "node:fs";

const P = "seed/seed.json";
const seed = JSON.parse(readFileSync(P, "utf8"));
const pt = (text) => [{ _type: "block", style: "normal", children: [{ _type: "span", text }] }];

// content[slug][locale] = { hero_title, hero_subtitle, value_props[6], packages[3],
//   pains[6], comparison[6], questions[6], project_category?, related_services }
const content = {
  "website-ban-hang": { vi: {/* … */}, en: {/* … */} },
  "web-app-theo-yeu-cau": { vi: {/* … */}, en: {/* … */} },
  "ung-dung-di-dong": { vi: {/* … */}, en: {/* … */} },
  "bao-tri-toi-uu": { vi: {/* … */}, en: {/* … */} },
};

// faqPairs[slug] = [[category, questionVi, answerVi, questionEn, answerEn] × 6]
const faqPairs = {
  "website-ban-hang": [/* 6 rows */],
  "web-app-theo-yeu-cau": [/* 6 rows */],
  "ung-dung-di-dong": [/* 6 rows */],
  "bao-tri-toi-uu": [/* 6 rows */],
};
const short = {
  "website-ban-hang": "shop",
  "web-app-theo-yeu-cau": "webapp",
  "ung-dung-di-dong": "mobile",
  "bao-tri-toi-uu": "care",
};

for (const entry of seed.content.services) {
  const c = content[entry.slug]?.[entry.locale];
  if (c) Object.assign(entry.data, c);
}
for (const [slug, rows] of Object.entries(faqPairs)) {
  rows.forEach(([category, qv, av, qe, ae], i) => {
    const id = `svc-${short[slug]}-${i + 1}`;
    if (seed.content.faqs.some((f) => f.id === id)) return;
    seed.content.faqs.push(
      {
        id,
        slug: id,
        status: "published",
        locale: "vi",
        data: { question: qv, answer: pt(av), category, service: slug, sort_order: 100 + i },
      },
      {
        id: `${id}-en`,
        slug: id,
        status: "published",
        locale: "en",
        translationOf: id,
        data: { question: qe, answer: pt(ae), category, service: slug, sort_order: 100 + i },
      },
    );
  });
}

// Sanity checks: fail loudly instead of writing half-filled content.
for (const [slug, byLocale] of Object.entries(content)) {
  for (const locale of ["vi", "en"]) {
    const c = byLocale[locale];
    const need = { value_props: 6, packages: 3, pains: 6, comparison: 6, questions: 6 };
    for (const [k, n] of Object.entries(need)) {
      if (!Array.isArray(c?.[k]) || c[k].length !== n)
        throw new Error(`${slug}/${locale}: ${k} must have ${n} items`);
    }
    if (!c.hero_title || !c.hero_subtitle || !c.related_services)
      throw new Error(`${slug}/${locale}: hero/related missing`);
    if (c.packages.filter((p) => p.popular).length !== 1)
      throw new Error(`${slug}/${locale}: exactly one popular package`);
  }
  if (faqPairs[slug]?.length !== 6) throw new Error(`${slug}: 6 FAQs needed`);
}

writeFileSync(P, JSON.stringify(seed, null, "\t") + "\n");
console.log("ok");
```

- [x] **Step 2: Run, validate, apply**

```bash
node scripts/tmp-seed-007b.mjs                    # ok
pnpm exec prettier --write seed/seed.json
pnpm exec emdash seed seed/seed.json --validate   # ✔ Seed file is valid
DB=$(find .wrangler/state/v3/d1 -name "*.sqlite" -size +50k | head -1)
cp "$DB" /tmp/d1-backup-007b.sqlite
pnpm exec emdash seed seed/seed.json -d "$DB" --on-conflict update
rm scripts/tmp-seed-007b.mjs
```

- [x] **Step 3: Check every page has every section**

```bash
for s in thiet-ke-website website-ban-hang web-app-theo-yeu-cau ung-dung-di-dong bao-tri-toi-uu; do
  for p in "" /en; do
    html=$(curl -s "http://localhost:4321$p/services/$s")
    printf "%-28s %-3s tiers:%s comparison:%s faq:%s values:%s\n" "$s" "${p:-vi}" \
      "$(echo "$html" | grep -c 'class="tiers"')" "$(echo "$html" | grep -c 'class="comparison"')" \
      "$(echo "$html" | grep -o 'class="faq-item' | wc -l)" "$(echo "$html" | grep -c 'class="value-props"')"
  done
done
```

Expected on every line: `tiers:1 comparison:1 faq:6 values:1`.

- [x] **Step 4: Placeholders + commit**

Add to `docs/placeholders.md` under "Offer and prices":
`- [ ] Service detail copy and packages for website-ban-hang, web-app-theo-yeu-cau, ung-dung-di-dong, bao-tri-toi-uu (+ 24 service FAQs): CMS → Services / FAQs`

```bash
git add seed/seed.json docs/placeholders.md
git commit -m "content(services): detail copy, packages and FAQs for the remaining 4 services (sample)"
```

---

### Task 2: Structured data on service pages

**Files:**

- Modify: `src/pages/[...lang]/services/[slug].astro`

**Interfaces:**

- Consumes: `faqs`, `d`, `packages`, `pagePath` already defined in the page (007a). BreadcrumbList is already emitted by `Base.astro` from the `breadcrumbs` prop.
- Produces: `FAQPage` JSON-LD (when the page has FAQs) and `Service` JSON-LD.

- [x] **Step 1: Build the JSON-LD in the frontmatter** (after `const seo = getSeoMeta(...)`):

```ts
type Block = { children?: { text?: string }[] };
const plainText = (blocks: unknown): string =>
  ((blocks as Block[] | undefined) ?? [])
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .join("\n\n");
const toJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
const pageUrl = new URL(pagePath, Astro.url.origin).href;
const serviceJsonLd = toJsonLd({
  "@context": "https://schema.org",
  "@type": "Service",
  name: d.title,
  description: d.hero_subtitle ?? d.summary,
  url: pageUrl,
  areaServed: { "@type": "Country", name: "Vietnam" },
  provider: { "@id": `${Astro.url.origin}/#organization` },
  ...(packages.length > 0
    ? {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: d.title,
          itemListElement: packages.map((p) => ({
            "@type": "Offer",
            name: p.name,
            description: p.desc,
          })),
        },
      }
    : {}),
});
const faqJsonLd =
  faqs.length > 0
    ? toJsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.data.question,
          acceptedAnswer: { "@type": "Answer", text: plainText(f.data.answer) },
        })),
      })
    : null;
```

(Prices are free-text like "8 triệu", so offers carry no `price`; don't invent numeric prices.)

- [x] **Step 2: Emit it** as the first children inside `<Base …>`:

```astro
<script type="application/ld+json" set:html={serviceJsonLd} />
{faqJsonLd && <script type="application/ld+json" set:html={faqJsonLd} />}
```

- [x] **Step 3: Verify**

```bash
pnpm typecheck    # - 0 errors
curl -s http://localhost:4321/services/website-ban-hang | grep -o '"@type":"[A-Za-z]*"' | sort | uniq -c
# expect at least: Service, FAQPage, BreadcrumbList, Organization, Question ×6, Answer ×6, Offer ×3
curl -s http://localhost:4321/services/website-ban-hang | grep -o '<title>[^<]*</title>'
curl -s http://localhost:4321/en/services/website-ban-hang | grep -o '<meta name="description"[^>]*>'
```

Titles must differ per service (`<service title> — CTStack`); descriptions come from `hero_subtitle`.

- [x] **Step 4: Commit**

```bash
pnpm exec prettier --write "src/pages/[...lang]/services/[slug].astro"
git add "src/pages/[...lang]/services/[slug].astro"
git commit -m "feat(services): Service and FAQPage structured data on detail pages"
```

---

### Task 3: Footer links to each service

**Files:**

- Modify: `src/layouts/Base.astro` (frontmatter data loading; footer "Dịch vụ" column)

**Interfaces:**

- Produces: footer "Dịch vụ / Services" column listing every published service (title → `/services/<slug>`), then "Dự án".

- [x] **Step 1: Load the services in the frontmatter**

Add `getEmDashCollection` to the existing `import { getSiteSettingsWithCacheHint } from "emdash";` line, then after the settings block:

```ts
// Footer service links. A failed query just leaves the column with the list page link.
const footerServicesResult = await getEmDashCollection("services", {
  locale: lang,
  orderBy: { sort_order: "asc" },
  limit: 8,
});
if (Astro.cache?.enabled && footerServicesResult.cacheHint) {
  Astro.cache.set(footerServicesResult.cacheHint);
}
const footerServices = footerServicesResult.entries ?? [];
```

- [x] **Step 2: Replace the footer services column**

```astro
<div class="footer-column">
  <h2>{t("footer.services")}</h2>
  {footerServices.length > 0 ? (
    footerServices.map((s) => <a href={localizePath(`/services/${s.id}`, lang)}>{s.data.title}</a>)
  ) : (
    <a href={localizePath("/services", lang)}>{t("nav.services")}</a>
  )}
</div>
```

(Delete the old `Dịch vụ` + `Dự án` links in that column; "Dự án" is already in the header nav.)

- [x] **Step 3: Verify every page type still renders**

```bash
pnpm typecheck
for u in / /en /projects /en/projects /projects/website-chuoi-ca-phe /services /en/services \
  /services/bao-tri-toi-uu /about /contact /faq /chinh-sach/bao-hanh /khong-co; do
  printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:4321$u)" "$u"; done
curl -s http://localhost:4321/about | grep -o 'href="/services/[^"]*"' | sort -u    # 5 service links
```

Expected: all `200` except `/khong-co` → `404`.

- [x] **Step 4: Commit**

```bash
pnpm exec prettier --write src/layouts/Base.astro
git add src/layouts/Base.astro
git commit -m "feat(footer): link each service detail page"
```

---

### Task 4: Screenshots, docs, status

- [x] **Step 1: Screenshots** (review each against the brief's section order and the Styling rules)

```bash
for s in website-ban-hang web-app-theo-yeu-cau ung-dung-di-dong bao-tri-toi-uu; do
  MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs /services/$s 1440 shots/$s-1440.png
done
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs /services/ung-dung-di-dong 390 shots/mobile-390.png
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs /en/services/bao-tri-toi-uu 1440 shots/care-en-1440.png
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs /services/bao-tri-toi-uu 1440 shots/care-light.png light
```

Look for: long Vietnamese words breaking table cells, packages of uneven height, empty sections, any text in the wrong language.

- [x] **Step 2: Docs**
- `docs/roadmap.md`: Service detail pages → `[x]`.
- `docs/overview.html`: "Trang chi tiết từng dịch vụ" → `done` (✔).
- `docs/architecture.md`: mention `Base.astro` loads services for the footer (Code structure / request flow).
- This file: `Status: done`, boxes ticked, Notes for deviations. `plans/README.md`: 007b → `done`.

- [x] **Step 3: Final check and hand back**

```bash
pnpm exec prettier --write docs/roadmap.md docs/architecture.md plans/README.md plans/007b-service-detail-content.md
pnpm typecheck && pnpm build
git add docs plans
git commit -m "docs: service detail pages complete (plan 007b)"
```

Don't merge into `main` yourself unless told to.

## Notes / decisions

- USD prices are rough equivalents of the VND prices; both are sample (see `docs/placeholders.md`).
- `Service` JSON-LD carries no numeric `price` because prices are free text ("từ 15 triệu"); adding fake numbers would be worse than none.
- The footer query runs on every page; it is small (≤ 8 rows) and cached with the page when Astro cache is enabled.
- Implemented on branch `007b-service-detail-content` from `main` at `45dceb1`, dev server on port 4322. This shell is PowerShell, so the plan's bash `for` loops, `find` and `/tmp` were run as the same checks: D1 file is `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/<hash>.sqlite` (the only `*.sqlite` over 50KB). Backup is `%TEMP%\d1-backup-007b.sqlite`.
- `scripts/tmp-seed-007b.mjs` was deleted after the section check (the plan lists `rm` just before that check) and was not committed. The script also rejected copy over the brief's length limits and FAQ answers of more than two sentences.
- Maintenance hours are sample offer numbers the brief asked to name but did not set: 2 / 5 / 10 hours per month on Cơ bản / Tiêu chuẩn / Ưu tiên. They sit under the new placeholders line.
- Screenshots passed `http://localhost:4322` as the last argument because `scripts/screenshot.mjs` defaults to port 4321. `shots/` stays gitignored. Reviewed: sections filled, Vietnamese and English not mixed, comparison cells and the 390px mobile page stay inside the layout. Package cards share one row; the popular card is the highlighted middle one.
- `pnpm typecheck` reordered fields in `emdash-env.d.ts`. That file was restored and not committed.
- Shared headings such as "website cũ" and "theme có sẵn" come from the 007a UI strings and were left unchanged.
