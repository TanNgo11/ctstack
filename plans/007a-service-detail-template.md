# 007a: Service detail page, template + first service — spec and implementation plan

> **For agentic workers:** Implement task by task, in order. Each task ends with a verification step and a commit. Steps use checkbox (`- [ ]`) syntax: tick them as you go. There is no unit-test suite in this repo; "tests" are `pnpm typecheck`, `pnpm build`, HTTP checks with `curl` and screenshots.

- **Status:** done
- **Wave:** 4 (run alone: touches `seed/seed.json`, `src/i18n/ui.ts`, `src/pages/[...lang]/index.astro`)
- **Roadmap:** Phase 2, "Service detail pages `/services/[slug]`"
- **Mockups:** `mockup/08-service-detail/BRIEF.md` (no image). Build from existing components; follow the Styling rules in `AGENTS.md`.
- **Next:** `plans/007b-service-detail-content.md` (content for the other 4 services, JSON-LD, footer links)

**Goal:** A working `/services/[slug]` page (vi + en) with every section from the brief, fully filled for one service (`thiet-ke-website`); the other 4 services render with the sections they have data for.

**Architecture:** Service detail content lives in new optional fields on the existing `services` collection (repeaters for lists). The page is a server-rendered route under the fixed `services/` segment, reusing existing components (`PricingTiers` extracted from the home page, `ProjectCard`, `TestimonialCard`, `ServiceCard`) and existing CSS patterns (`.section-header`, `.why`, cards, pills). FAQ entries get an optional `service` slug so a service page can show its own questions.

**Tech stack:** Astro 7 (server output), EmDash 0.40 (`getEmDashEntry`, `getEmDashCollection`, `getSeoMeta`, `PortableText`), plain CSS with the tokens in `src/styles/theme.css`, Cloudflare D1 locally via Miniflare.

## Global constraints

- Read `AGENTS.md` first. Rules that matter most here:
  - Every page starts with `const lang = langFromParam(Astro.params.lang); if (!lang) return Astro.rewrite("/404");`.
  - Links via `localizePath(path, lang)`. Never hardcode `/en/...`.
  - No hardcoded UI text: every string goes into `src/i18n/ui.ts`, in **both** `vi` and `en`.
  - `getEmDashEntry` returns a missing slug as an **error**: check `isNotFoundError(error)` before anything else, then 404.
  - `where` in `getEmDashCollection` matches **string** values only; filter booleans in JS.
  - Never add a bare `src/pages/[...lang]/[param].astro`. This plan uses `services/[slug].astro` (fixed segment). Always check `/` and `/en` after adding the route.
  - Styling: gradient only on primary CTAs; accent text/numbers use `.text-accent`; no glows, no hover lift, no decorative filler copy; radii from tokens.
- EmDash 0.40 has **no relations** in seeds and **no `references`** query option. Cross-links use slugs stored in string fields.
- Sample copy follows `docs/content-guide.md`: concrete, no invented clients, no invented metrics. Every sample goes into `docs/placeholders.md`.
- Dev server: `pnpm dev` (or `pnpm dev --port 43XX` if another session uses 4321). After a seed change, apply it to the local DB (Task 2, Step 4) and **restart the dev server** so `emdash-env.d.ts` regenerates the types.
- Git Bash on Windows: prefix `node scripts/screenshot.mjs …` with `MSYS_NO_PATHCONV=1`.

## File map

| File                                                                                            | Change | Responsibility                                                        |
| ----------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------- |
| `src/components/PricingTiers.astro`                                                             | create | Package cards grid + optional note (moved out of the home page)       |
| `src/pages/[...lang]/index.astro`                                                               | modify | Use `PricingTiers`; remove the moved CSS                              |
| `src/pages/[...lang]/services.astro` → `services/index.astro`                                   | move   | Services list (unchanged markup, import paths updated)                |
| `src/pages/[...lang]/services/[slug].astro`                                                     | create | Service detail route: data loading, 404, sections                     |
| `src/components/ServiceCard.astro`                                                              | modify | Optional `href`: title links to the detail page                       |
| `src/pages/[...lang]/faq.astro`                                                                 | modify | Skip FAQ entries that belong to a service                             |
| `src/pages/sitemap.xml.ts`                                                                      | modify | Add `/services/[slug]` URLs                                           |
| `src/i18n/ui.ts`                                                                                | modify | `serviceDetail.*` keys (vi + en)                                      |
| `seed/seed.json`                                                                                | modify | New `services` fields, `faqs.service`, content for `thiet-ke-website` |
| `docs/architecture.md`, `docs/placeholders.md`, `docs/roadmap.md`, `plans/README.md`, this file | modify | Content model, placeholders, status                                   |

---

### Task 1: Extract `PricingTiers` from the home page

**Files:**

- Create: `src/components/PricingTiers.astro`
- Modify: `src/pages/[...lang]/index.astro` (pricing section markup ~lines 292–325; CSS block `/* Pricing */` up to `/* Contact at the end of the page */`; `.tiers` selectors inside the `@media (max-width: 1100px)` and `@media (max-width: 640px)` blocks)

**Interfaces:**

- Produces: `PricingTiers` component, props `{ tiers: PricingTier[]; note?: string }`, exported type
  `PricingTier = { name: string; price: string; desc?: string; features: string[]; popular?: boolean }`.
  The CTA links to `/contact?service=<tier name>` in the current language.

- [x] **Step 1: Take a "before" screenshot of the home page**

```bash
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs / 1440 shots/home-before.png
```

(`shots/` is scratch output; don't commit it.)

- [x] **Step 2: Create `src/components/PricingTiers.astro`**

```astro
---
/**
 * Package cards (home page pricing, service detail packages).
 * Each card links to the contact page with the package name prefilled.
 */
import { langFromPath, localizePath, useTranslations } from "../i18n/ui";

export interface PricingTier {
  name: string;
  price: string;
  desc?: string;
  features: string[];
  popular?: boolean;
}

interface Props {
  tiers: PricingTier[];
  note?: string;
}

const { tiers, note } = Astro.props;
const lang = langFromPath(Astro.originPathname ?? Astro.url.pathname);
const t = useTranslations(lang);
const contactHref = localizePath("/contact", lang);
---

<div class="tiers" style={`--tier-count: ${Math.min(Math.max(tiers.length, 1), 4)}`}>
  {tiers.map((tier) => (
    <article class:list={["tier", { popular: tier.popular }]}>
      {tier.popular && <span class="tier-badge">{t("home.pricingPopular")}</span>}
      <h3>{tier.name}</h3>
      {tier.desc && <p class="tier-desc">{tier.desc}</p>}
      <p class="tier-price">
        <span>{t("services.priceFrom")}</span> <strong>{tier.price}</strong>
      </p>
      <ul class="tier-features">
        {tier.features.map((f) => (
          <li>{f}</li>
        ))}
      </ul>
      <a
        href={`${contactHref}?service=${encodeURIComponent(tier.name)}`}
        class:list={["btn", tier.popular ? "btn-primary" : "btn-outline"]}
      >
        {t("home.pricingCta")}
      </a>
    </article>
  ))}
</div>
{note && <p class="pricing-note">{note}</p>}

<style>
  .tiers {
    display: grid;
    grid-template-columns: repeat(var(--tier-count), minmax(0, 1fr));
    gap: var(--spacing-md);
  }

  .tier {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    background: var(--color-surface);
  }

  .tier.popular {
    border-color: var(--color-brand);
  }

  .tier-badge {
    position: absolute;
    top: -11px;
    left: var(--spacing-lg);
    padding: 2px 10px;
    border-radius: var(--radius-pill);
    color: var(--color-on-brand);
    background: var(--color-brand);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .tier h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
  }

  .tier-desc {
    min-height: 3em;
    color: var(--color-muted);
    font-size: var(--font-size-sm);
  }

  .tier-price {
    padding-block: var(--spacing-sm);
    color: var(--color-muted);
    font-size: var(--font-size-sm);
  }

  .tier-price span {
    margin-inline-end: 4px;
  }

  .tier-price strong {
    color: var(--color-text);
    font-size: 1.75rem;
    font-weight: var(--font-weight-display);
  }

  .tier-features {
    display: grid;
    flex: 1;
    align-content: start;
    gap: 10px;
    margin-bottom: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--color-border);
    list-style: none;
    font-size: var(--font-size-sm);
  }

  .tier-features li {
    position: relative;
    padding-inline-start: 1.5em;
  }

  .tier-features li::before {
    content: "✓";
    position: absolute;
    inset-inline-start: 0;
    color: var(--color-brand);
    font-weight: 700;
  }

  .tier .btn {
    width: 100%;
  }

  .pricing-note {
    margin-top: var(--spacing-md);
    color: var(--color-muted);
    font-size: var(--font-size-sm);
  }

  @media (max-width: 1100px) {
    .tiers {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .tier-desc {
      min-height: 0;
    }
  }

  @media (max-width: 640px) {
    .tiers {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }
  }
</style>
```

- [x] **Step 3: Use it on the home page**

In `src/pages/[...lang]/index.astro`:

1. Add the import next to the other component imports: `import PricingTiers from "../../components/PricingTiers.astro";`
2. Replace everything from `<div class="tiers">` through `<p class="pricing-note">{t("home.pricingNote")}</p>` (inside the pricing `<section>`) with:

```astro
<PricingTiers tiers={t("home.tiers")} note={t("home.pricingNote")} />
```

3. Delete the CSS from `/* Pricing */` up to (not including) `/* Contact at the end of the page */`.
4. In `@media (max-width: 1100px)`: change the selector `.tiers,\n\t\t.why {` to `.why {` and delete the `.tier-desc { min-height: 0; }` rule.
5. In `@media (max-width: 640px)`: change `.tiers,\n\t\t.why {` to `.why {` and delete the `.tiers { gap: var(--spacing-lg); }` rule.

- [x] **Step 4: Verify**

```bash
pnpm exec prettier --write src/components/PricingTiers.astro "src/pages/[...lang]/index.astro"
pnpm typecheck        # expect: - 0 errors
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs / 1440 shots/home-after.png
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs / 390 shots/home-after-390.png
```

Compare `home-before.png` and `home-after.png`: the pricing section must look identical (4 cards, "Phổ biến" badge on the 2nd, note below). At 390px the cards stack.

- [x] **Step 5: Commit**

```bash
git add src/components/PricingTiers.astro "src/pages/[...lang]/index.astro"
git commit -m "refactor: extract PricingTiers component from the home page"
```

---

### Task 2: Schema, FAQ link and content for `thiet-ke-website`

**Files:**

- Modify: `seed/seed.json` (collections `services` and `faqs`; content `services` entries `s-website` / `s-website-en`; new `faqs` entries)
- Modify: `src/pages/[...lang]/faq.astro` (skip service FAQs)
- Modify: `docs/architecture.md` (content model), `docs/placeholders.md`

**Interfaces:**

- Produces (fields on `services`, all optional):
  - `hero_title: string`, `hero_subtitle: text`
  - `value_props: { title: string; text: string }[]`
  - `packages: { name: string; price: string; desc: string; features: string /* one per line */; popular: boolean }[]`
  - `pains: { title: string; text: string }[]`
  - `comparison: { label: string; diy: string; ctstack: string }[]`
  - `questions: { question: string; answer: string }[]`
  - `project_category: "website" | "web_app" | "mobile_app" | "ecommerce" | "landing_page"` (select)
  - `related_services: string` (comma-separated service slugs)
- Produces (field on `faqs`): `service: string` (service slug; empty = general FAQ)

- [x] **Step 1: Write the one-off seed patch script** at `scripts/tmp-seed-007a.mjs` (delete it after Step 3; don't commit it):

```js
import { readFileSync, writeFileSync } from "node:fs";

const P = "seed/seed.json";
const seed = JSON.parse(readFileSync(P, "utf8"));
const col = (slug) => seed.collections.find((c) => c.slug === slug);
const pt = (text) => [{ _type: "block", style: "normal", children: [{ _type: "span", text }] }];
const pair = (subFields) => ({ subFields });

// 1. Schema: services
const services = col("services");
const add = (f) => {
  if (!services.fields.some((x) => x.slug === f.slug)) services.fields.push(f);
};
add({ slug: "hero_title", label: "Detail page: hero title", type: "string" });
add({ slug: "hero_subtitle", label: "Detail page: hero subtitle", type: "text" });
add({
  slug: "value_props",
  label: "Detail page: value props",
  type: "repeater",
  validation: {
    maxItems: 6,
    ...pair([
      { slug: "title", label: "Title", type: "string", required: true },
      { slug: "text", label: "Text", type: "text" },
    ]),
  },
});
add({
  slug: "packages",
  label: "Detail page: packages",
  type: "repeater",
  validation: {
    maxItems: 4,
    ...pair([
      { slug: "name", label: "Name", type: "string", required: true },
      { slug: "price", label: "Price from", type: "string", required: true },
      { slug: "desc", label: "Short description", type: "text" },
      { slug: "features", label: "Features (one per line)", type: "text" },
      { slug: "popular", label: "Popular badge", type: "boolean" },
    ]),
  },
});
add({
  slug: "pains",
  label: "Detail page: common problems",
  type: "repeater",
  validation: {
    maxItems: 6,
    ...pair([
      { slug: "title", label: "Title", type: "string", required: true },
      { slug: "text", label: "Text", type: "text" },
    ]),
  },
});
add({
  slug: "comparison",
  label: "Detail page: comparison rows",
  type: "repeater",
  validation: {
    maxItems: 8,
    ...pair([
      { slug: "label", label: "Criterion", type: "string", required: true },
      { slug: "diy", label: "DIY / ready-made theme", type: "string" },
      { slug: "ctstack", label: "CTStack", type: "string" },
    ]),
  },
});
add({
  slug: "questions",
  label: "Detail page: questions to ask before signing",
  type: "repeater",
  validation: {
    maxItems: 6,
    ...pair([
      { slug: "question", label: "Question", type: "string", required: true },
      { slug: "answer", label: "Our answer", type: "text" },
    ]),
  },
});
add({
  slug: "project_category",
  label: "Detail page: related project category",
  type: "select",
  validation: { options: ["website", "web_app", "mobile_app", "ecommerce", "landing_page"] },
});
add({
  slug: "related_services",
  label: "Detail page: related service slugs (comma separated)",
  type: "string",
});

// 2. Schema: faqs.service
const faqs = col("faqs");
if (!faqs.fields.some((f) => f.slug === "service")) {
  faqs.fields.push({
    slug: "service",
    label: "Service slug (empty = general FAQ page)",
    type: "string",
  });
}

// 3. Content for thiet-ke-website (vi + en). Sample copy: listed in docs/placeholders.md.
const content = {
  vi: {
    hero_title: "Thiết kế website doanh nghiệp chuẩn SEO, tải nhanh",
    hero_subtitle:
      "Website giới thiệu công ty rõ ràng, dễ cập nhật và đo được hiệu quả, bàn giao trong 3–4 tuần.",
    value_props: [
      {
        title: "Thiết kế riêng",
        text: "Giao diện theo nhận diện thương hiệu, không dùng lại theme đại trà.",
      },
      { title: "Tải dưới 2 giây", text: "Tối ưu hình ảnh, mã nguồn gọn, chạy trên Cloudflare." },
      {
        title: "Chuẩn SEO từ đầu",
        text: "Tiêu đề, mô tả, sitemap và dữ liệu cấu trúc cho mọi trang.",
      },
      { title: "Tự cập nhật", text: "Trang quản trị để sửa nội dung, thêm dự án, tin tức." },
      { title: "Song ngữ", text: "Bản tiếng Việt và tiếng Anh, chuyển đổi bằng một nút." },
      {
        title: "Bảo hành 12 tháng",
        text: "Sửa lỗi miễn phí, hỗ trợ qua Zalo trong giờ hành chính.",
      },
    ],
    packages: [
      {
        name: "Cơ bản",
        price: "8 triệu",
        desc: "Lên online nhanh với giao diện theo mẫu tuỳ chỉnh.",
        features: "5–8 trang\nTối ưu mobile và tốc độ\nSEO cơ bản\nForm liên hệ\nBảo hành 6 tháng",
        popular: false,
      },
      {
        name: "Chuyên nghiệp",
        price: "12 triệu",
        desc: "Thiết kế riêng, tự cập nhật nội dung.",
        features:
          "10–15 trang, thiết kế riêng\nCMS cập nhật tin tức, dự án\nSEO on-page, sitemap, schema\nSong ngữ Việt – Anh\nBảo hành 12 tháng, bảo trì 3 tháng",
        popular: true,
      },
      {
        name: "Mở rộng",
        price: "20 triệu",
        desc: "Cho doanh nghiệp nhiều chi nhánh, nhiều nội dung.",
        features:
          "Không giới hạn số trang\nBộ lọc, tìm kiếm, bản đồ chi nhánh\nTích hợp CRM hoặc Google Sheets\nBáo cáo chuyển đổi\nBảo hành 12 tháng, bảo trì 6 tháng",
        popular: false,
      },
    ],
    pains: [
      { title: "Tải chậm", text: "Khách rời trang trước khi thấy nội dung, nhất là trên 4G." },
      { title: "Không chuẩn mobile", text: "Chữ nhỏ, nút khó bấm, form khó điền trên điện thoại." },
      {
        title: "Không lên Google",
        text: "Thiếu tiêu đề, mô tả, sitemap nên khách tìm không thấy.",
      },
      {
        title: "Không có form thu khách",
        text: "Người quan tâm không biết để lại thông tin ở đâu.",
      },
      { title: "Khó cập nhật", text: "Sửa một dòng chữ cũng phải gọi lập trình viên." },
      {
        title: "Không mở rộng được",
        text: "Thêm ngôn ngữ, thêm trang mới là phải làm lại từ đầu.",
      },
    ],
    comparison: [
      { label: "Chi phí ban đầu", diy: "Thấp", ctstack: "Từ 8 triệu, báo giá cố định" },
      {
        label: "Thời gian",
        diy: "Tuỳ thời gian rảnh của bạn",
        ctstack: "3–4 tuần, ghi trong hợp đồng",
      },
      { label: "SEO", diy: "Phải tự cấu hình plugin", ctstack: "Có sẵn cho mọi trang" },
      { label: "Tốc độ", diy: "Theme nặng, nhiều plugin", ctstack: "Mục tiêu dưới 2 giây trên 4G" },
      {
        label: "Hỗ trợ",
        diy: "Tự tìm trên diễn đàn",
        ctstack: "Zalo trong giờ hành chính, bảo hành 12 tháng",
      },
      {
        label: "Sở hữu source code",
        diy: "Phụ thuộc theme và plugin",
        ctstack: "Bàn giao toàn bộ, đứng tên bạn",
      },
    ],
    questions: [
      {
        question: "Ai giữ source code và tài khoản?",
        answer:
          "Bạn. Source code, tên miền, hosting và tài khoản quản trị đứng tên bạn khi thanh toán đủ.",
      },
      {
        question: "Được sửa giao diện mấy lần?",
        answer: "2–3 vòng trước khi lập trình, ghi rõ trong hợp đồng.",
      },
      {
        question: "Bảo hành bao lâu, gồm những gì?",
        answer: "12 tháng cho lỗi chức năng, hiển thị và bảo mật do chúng tôi gây ra.",
      },
      {
        question: "Có cam kết tốc độ tải trang không?",
        answer: "Có: điểm Lighthouse trên 90 và dưới 2 giây trên 4G cho trang chủ.",
      },
      {
        question: "Ai lo nội dung?",
        answer: "Bạn cung cấp nội dung chính, chúng tôi biên tập lại cho gọn và chuẩn SEO.",
      },
      {
        question: "Trễ tiến độ thì xử lý thế nào?",
        answer: "Hợp đồng ghi mốc thời gian và mức giảm trừ nếu chúng tôi trễ.",
      },
    ],
    project_category: "website",
    related_services: "website-ban-hang,bao-tri-toi-uu",
  },
  en: {
    hero_title: "Business websites that load fast and rank on Google",
    hero_subtitle:
      "A clear company website that is easy to update and measurable, delivered in 3–4 weeks.",
    value_props: [
      { title: "Custom design", text: "Built around your brand, not a reused mass-market theme." },
      {
        title: "Loads in under 2 seconds",
        text: "Optimised images, lean code, served from Cloudflare.",
      },
      {
        title: "SEO from day one",
        text: "Titles, descriptions, sitemap and structured data on every page.",
      },
      {
        title: "Update it yourself",
        text: "An admin panel to edit content and add projects or news.",
      },
      { title: "Bilingual", text: "Vietnamese and English versions with a language switch." },
      {
        title: "12-month warranty",
        text: "Free bug fixes and Zalo support during business hours.",
      },
    ],
    packages: [
      {
        name: "Basic",
        price: "$350",
        desc: "Get online fast with a customised template.",
        features:
          "5–8 pages\nMobile and speed optimised\nBasic SEO\nContact form\n6-month warranty",
        popular: false,
      },
      {
        name: "Professional",
        price: "$500",
        desc: "Custom design, content you can update yourself.",
        features:
          "10–15 pages, custom design\nCMS for news and projects\nOn-page SEO, sitemap, schema\nVietnamese – English\n12-month warranty, 3 months maintenance",
        popular: true,
      },
      {
        name: "Extended",
        price: "$800",
        desc: "For companies with several branches and lots of content.",
        features:
          "Unlimited pages\nFilters, search, branch map\nCRM or Google Sheets integration\nConversion reports\n12-month warranty, 6 months maintenance",
        popular: false,
      },
    ],
    pains: [
      { title: "Slow to load", text: "Visitors leave before they see anything, especially on 4G." },
      {
        title: "Not built for phones",
        text: "Tiny text, hard-to-tap buttons, forms that are painful to fill.",
      },
      {
        title: "Invisible on Google",
        text: "No titles, descriptions or sitemap, so nobody finds it.",
      },
      {
        title: "No way to leave details",
        text: "Interested visitors don't know how to get in touch.",
      },
      { title: "Hard to update", text: "Changing one line of text needs a developer." },
      { title: "Can't grow", text: "Adding a language or a new page means starting over." },
    ],
    comparison: [
      { label: "Upfront cost", diy: "Low", ctstack: "From $350, fixed quote" },
      { label: "Timeline", diy: "Whenever you find time", ctstack: "3–4 weeks, in the contract" },
      { label: "SEO", diy: "Configure plugins yourself", ctstack: "Built into every page" },
      { label: "Speed", diy: "Heavy theme, many plugins", ctstack: "Target under 2 s on 4G" },
      {
        label: "Support",
        diy: "Search forums yourself",
        ctstack: "Zalo in business hours, 12-month warranty",
      },
      {
        label: "Source code ownership",
        diy: "Tied to the theme and plugins",
        ctstack: "Fully handed over, in your name",
      },
    ],
    questions: [
      {
        question: "Who owns the source code and accounts?",
        answer:
          "You do. Code, domain, hosting and admin accounts are in your name once paid in full.",
      },
      {
        question: "How many design revisions?",
        answer: "2–3 rounds before development, written into the contract.",
      },
      {
        question: "How long is the warranty and what does it cover?",
        answer: "12 months for functional, display and security bugs we caused.",
      },
      {
        question: "Do you commit to page speed?",
        answer: "Yes: Lighthouse above 90 and under 2 seconds on 4G for the home page.",
      },
      {
        question: "Who handles the content?",
        answer: "You provide the main content; we edit it for clarity and SEO.",
      },
      {
        question: "What if you are late?",
        answer: "The contract sets milestones and the discount if we miss them.",
      },
    ],
    project_category: "website",
    related_services: "website-ban-hang,bao-tri-toi-uu",
  },
};
for (const entry of seed.content.services) {
  if (entry.slug === "thiet-ke-website") Object.assign(entry.data, content[entry.locale]);
}

// 4. FAQs for this service (vi + en), category "pricing"/"technical"
const faqPairs = [
  [
    "pricing",
    "Website doanh nghiệp giá bao nhiêu?",
    "Từ 8 triệu cho gói Cơ bản. Gói Chuyên nghiệp 12 triệu là lựa chọn phổ biến nhất.",
    "How much is a business website?",
    "From $350 for Basic. Professional at $500 is the most popular choice.",
  ],
  [
    "timeline",
    "Bao lâu thì website chạy?",
    "3–4 tuần từ khi chốt nội dung và giao diện.",
    "When will the site be live?",
    "3–4 weeks after content and design are approved.",
  ],
  [
    "technical",
    "Website có tự đăng bài được không?",
    "Có. Bạn thêm tin tức, dự án và sửa nội dung trong trang quản trị.",
    "Can we publish posts ourselves?",
    "Yes. You add news and projects and edit content in the admin panel.",
  ],
  [
    "technical",
    "Có làm website song ngữ không?",
    "Có, gói Chuyên nghiệp trở lên gồm bản tiếng Việt và tiếng Anh.",
    "Do you build bilingual sites?",
    "Yes, Professional and above include Vietnamese and English.",
  ],
  [
    "warranty",
    "Sau bàn giao ai bảo trì?",
    "Chúng tôi bảo hành 12 tháng và có gói bảo trì theo tháng nếu bạn cần.",
    "Who maintains it after launch?",
    "We give a 12-month warranty and offer monthly maintenance if you want it.",
  ],
  [
    "content",
    "Tôi chưa có nội dung thì sao?",
    "Chúng tôi gửi mẫu câu hỏi để bạn trả lời, rồi biên tập thành nội dung website.",
    "What if we have no content yet?",
    "We send a short questionnaire and turn your answers into website copy.",
  ],
];
faqPairs.forEach(([category, qv, av, qe, ae], i) => {
  const id = `svc-website-${i + 1}`;
  if (seed.content.faqs.some((f) => f.id === id)) return;
  seed.content.faqs.push(
    {
      id,
      slug: id,
      status: "published",
      locale: "vi",
      data: {
        question: qv,
        answer: pt(av),
        category,
        service: "thiet-ke-website",
        sort_order: 100 + i,
      },
    },
    {
      id: `${id}-en`,
      slug: id,
      status: "published",
      locale: "en",
      translationOf: id,
      data: {
        question: qe,
        answer: pt(ae),
        category,
        service: "thiet-ke-website",
        sort_order: 100 + i,
      },
    },
  );
});

writeFileSync(P, JSON.stringify(seed, null, "\t") + "\n");
console.log("ok");
```

- [x] **Step 2: Run it and check the seed**

```bash
node scripts/tmp-seed-007a.mjs            # prints: ok
pnpm exec prettier --write seed/seed.json
git diff --stat seed/seed.json            # insertions only (plus a few changed lines inside s-website/s-website-en)
pnpm exec emdash seed seed/seed.json --validate   # ✔ Seed file is valid
rm scripts/tmp-seed-007a.mjs
```

- [x] **Step 3: Skip service FAQs on the general FAQ page**

In `src/pages/[...lang]/faq.astro`, change

```ts
const faqs = result.entries;
```

to

```ts
// Entries with a `service` belong to a service page (plan 007a), not /faq.
const faqs = result.entries.filter((f) => !f.data.service);
```

- [x] **Step 4: Apply the seed to the local DB and restart the dev server**

```bash
DB=$(find .wrangler/state/v3/d1 -name "*.sqlite" -size +50k | head -1)
cp "$DB" /tmp/d1-backup.sqlite
pnpm exec emdash seed seed/seed.json -d "$DB" --on-conflict update   # Collections: … updated, Fields: … created
```

Stop and restart `pnpm dev` so `emdash-env.d.ts` gets the new fields (check: `grep -c "hero_title" emdash-env.d.ts` → `1`).

- [x] **Step 5: Update docs**

- `docs/architecture.md` → content model: add the new fields to `SERVICES` (`hero_title`, `hero_subtitle`, `value_props`, `packages`, `pains`, `comparison`, `questions`, `project_category`, `related_services "comma separated slugs"`) and `service "service slug, optional"` to `FAQS`.
- `docs/placeholders.md` → under "Offer and prices" add:
  `- [ ] Service detail copy for thiet-ke-website (hero, value props, packages, problems, comparison, questions, 6 service FAQs): CMS → Services / FAQs`

- [x] **Step 6: Verify and commit**

```bash
pnpm typecheck                           # - 0 errors
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/faq   # 200
curl -s http://localhost:4321/faq | grep -o 'class="faq-item' | wc -l   # 30 (service FAQs excluded)
git add seed/seed.json "src/pages/[...lang]/faq.astro" docs/architecture.md docs/placeholders.md emdash-env.d.ts
git commit -m "feat(services): detail page fields, service FAQs and content for thiet-ke-website"
```

---

### Task 3: Route `/services/[slug]` with all sections

**Files:**

- Move: `src/pages/[...lang]/services.astro` → `src/pages/[...lang]/services/index.astro`
- Create: `src/pages/[...lang]/services/[slug].astro`
- Modify: `src/i18n/ui.ts` (add `serviceDetail.*` keys at the end of **both** dictionaries, right before the closing `};` of `vi` and of `en`)

**Interfaces:**

- Consumes: `PricingTier`/`PricingTiers` (Task 1); service fields and `faqs.service` (Task 2); existing `ProjectCard` (`size="compact"`), `TestimonialCard` (`variant="wide"`), `ServiceCard`, `ServiceIcon`, `contentAlternates()`, `isNotFoundError()`, `getSeoMeta()`.
- Produces: route `/services/<slug>` and `/en/services/<slug>`; i18n keys listed in Step 2.

- [x] **Step 1: Move the list page**

```bash
mkdir -p "src/pages/[...lang]/services"
git mv "src/pages/[...lang]/services.astro" "src/pages/[...lang]/services/index.astro"
```

In the moved file, change the three import paths from `../../` to `../../../` (`layouts/Base.astro`, `components/ServiceCard.astro`, `i18n/ui`).

- [x] **Step 2: Add the strings**

Append to the `vi` dictionary in `src/i18n/ui.ts`:

```ts
	"serviceDetail.cta": "Nhận tư vấn & báo giá trong 24h",
	"serviceDetail.packagesEyebrow": "Bảng giá",
	"serviceDetail.packagesTitle": "Chọn gói phù hợp",
	"serviceDetail.painsEyebrow": "Vấn đề thường gặp",
	"serviceDetail.painsTitle": "Những vấn đề chúng tôi hay gặp ở website cũ",
	"serviceDetail.comparisonEyebrow": "So sánh",
	"serviceDetail.comparisonTitle": "Tự làm hoặc dùng theme có sẵn, so với thuê CTStack",
	"serviceDetail.comparisonCriterion": "Tiêu chí",
	"serviceDetail.comparisonDiy": "Tự làm / theme có sẵn",
	"serviceDetail.comparisonUs": "CTStack",
	"serviceDetail.questionsEyebrow": "Trước khi ký hợp đồng",
	"serviceDetail.questionsTitle": "Những câu nên hỏi bất kỳ bên làm web nào",
	"serviceDetail.processTitle": "Quy trình 6 bước",
	"serviceDetail.process": [
		["Trao đổi", "Nghe mục tiêu, khách hàng và ngân sách của bạn."],
		["Đề xuất", "Phạm vi, timeline và báo giá cố định."],
		["Thiết kế", "Giao diện trên Figma, 2–3 vòng góp ý."],
		["Lập trình", "Demo mỗi tuần trên link thật."],
		["Kiểm thử", "Tốc độ, mobile, SEO, form, trình duyệt."],
		["Bàn giao", "Hướng dẫn sử dụng, bàn giao tài khoản, bảo hành."],
	],
	"serviceDetail.relatedProjects": "Dự án liên quan",
	"serviceDetail.faqTitle": "Câu hỏi về dịch vụ này",
	"serviceDetail.faqAll": "Xem tất cả câu hỏi",
	"serviceDetail.relatedServices": "Dịch vụ liên quan",
	"serviceDetail.viewDetails": "Xem chi tiết",
```

Append to the `en` dictionary:

```ts
	"serviceDetail.cta": "Get advice and a quote within 24 hours",
	"serviceDetail.packagesEyebrow": "Pricing",
	"serviceDetail.packagesTitle": "Choose a package",
	"serviceDetail.painsEyebrow": "Common problems",
	"serviceDetail.painsTitle": "Problems we often find on existing websites",
	"serviceDetail.comparisonEyebrow": "Comparison",
	"serviceDetail.comparisonTitle": "Doing it yourself or using a theme, vs. hiring CTStack",
	"serviceDetail.comparisonCriterion": "Criterion",
	"serviceDetail.comparisonDiy": "DIY / ready-made theme",
	"serviceDetail.comparisonUs": "CTStack",
	"serviceDetail.questionsEyebrow": "Before you sign",
	"serviceDetail.questionsTitle": "Questions to ask any web agency",
	"serviceDetail.processTitle": "Our 6-step process",
	"serviceDetail.process": [
		["Discovery", "Your goals, customers and budget."],
		["Proposal", "Scope, timeline and a fixed quote."],
		["Design", "Screens in Figma, 2–3 feedback rounds."],
		["Development", "A live demo link every week."],
		["Testing", "Speed, mobile, SEO, forms, browsers."],
		["Handover", "Training, account handover, warranty."],
	],
	"serviceDetail.relatedProjects": "Related projects",
	"serviceDetail.faqTitle": "Questions about this service",
	"serviceDetail.faqAll": "See all questions",
	"serviceDetail.relatedServices": "Related services",
	"serviceDetail.viewDetails": "View details",
```

- [x] **Step 3: Create `src/pages/[...lang]/services/[slug].astro`**

```astro
---
import { decodeSlug, getEmDashCollection, getEmDashEntry, getSeoMeta } from "emdash";
import { PortableText } from "emdash/ui";
import Base from "../../../layouts/Base.astro";
import PricingTiers from "../../../components/PricingTiers.astro";
import ProjectCard from "../../../components/ProjectCard.astro";
import ServiceCard from "../../../components/ServiceCard.astro";
import ServiceIcon from "../../../components/ServiceIcon.astro";
import TestimonialCard from "../../../components/TestimonialCard.astro";
import { langFromParam, localizePath, useTranslations } from "../../../i18n/ui";
import { contentAlternates, isNotFoundError } from "../../../lib/content";

const lang = langFromParam(Astro.params.lang);
if (!lang) return Astro.rewrite("/404");
const t = useTranslations(lang);

const slug = decodeSlug(Astro.params.slug);
if (!slug) return Astro.rewrite("/404");

const {
  entry: service,
  error,
  cacheHint,
} = await getEmDashEntry("services", slug, {
  locale: lang,
});
if (!service || isNotFoundError(error)) return Astro.rewrite("/404");
if (error) return new Response("Could not load the service", { status: 500 });

const d = service.data;
const relatedSlugs = (d.related_services ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter((s) => s && s !== slug)
  .slice(0, 3);

const [projectsResult, faqResult, servicesResult, testimonialsResult, alternates] =
  await Promise.all([
    getEmDashCollection("projects", {
      locale: lang,
      orderBy: { sort_order: "asc" },
      limit: 3,
      ...(d.project_category ? { where: { category: d.project_category } } : {}),
    }),
    getEmDashCollection("faqs", {
      locale: lang,
      orderBy: { sort_order: "asc" },
      where: { service: slug },
      limit: 6,
    }),
    getEmDashCollection("services", { locale: lang, orderBy: { sort_order: "asc" }, limit: 50 }),
    getEmDashCollection("testimonials", { locale: lang, limit: 50 }),
    contentAlternates("services", d.id, (s) => `/services/${s}`),
  ]);
if (Astro.cache?.enabled) {
  Astro.cache.set(cacheHint);
  for (const r of [projectsResult, faqResult, servicesResult, testimonialsResult]) {
    if (r.cacheHint) Astro.cache.set(r.cacheHint);
  }
}

const projects = projectsResult.entries ?? [];
const faqs = faqResult.entries ?? [];
const relatedServices = (servicesResult.entries ?? []).filter((s) => relatedSlugs.includes(s.id));
const projectSlugs = new Set(projects.map((p) => p.id));
const testimonial = (testimonialsResult.entries ?? []).find(
  (q) => q.data.project && projectSlugs.has(q.data.project),
);
const packages = (d.packages ?? []).map((p) => ({
  name: p.name,
  price: p.price,
  desc: p.desc,
  features: (p.features ?? "")
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean),
  popular: Boolean(p.popular),
}));
const valueProps = d.value_props ?? [];
const pains = d.pains ?? [];
const comparison = d.comparison ?? [];
const questions = d.questions ?? [];

const contactHref = `${localizePath("/contact", lang)}?service=${encodeURIComponent(d.title)}`;
const pagePath = localizePath(`/services/${slug}`, lang);
const breadcrumbs = [
  { name: t("nav.home"), url: localizePath("/", lang) },
  { name: t("services.title"), url: localizePath("/services", lang) },
  { name: d.title, url: pagePath },
];
const seo = getSeoMeta(service, {
  siteUrl: Astro.url.origin,
  path: pagePath,
  defaultDescription: d.hero_subtitle ?? d.summary,
});
---

<Base
  title={seo.title}
  pageTitle={seo.ogTitle}
  description={seo.description}
  image={seo.ogImage}
  canonical={seo.canonical}
  robots={seo.robots}
  content={{ collection: "services", id: d.id, slug }}
  alternates={alternates}
  breadcrumbs={breadcrumbs}
>
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {breadcrumbs.map((b, i) => (
          <li>
            {i < breadcrumbs.length - 1 ? (
              <a href={b.url}>{b.name}</a>
            ) : (
              <span aria-current="page">{b.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>

    <header class="service-hero">
      <span class="hero-icon" aria-hidden="true">
        <ServiceIcon name={d.icon} />
      </span>
      <p class="eyebrow">{d.title}</p>
      <h1 {...service.edit.hero_title}>{d.hero_title ?? d.title}</h1>
      {(d.hero_subtitle ?? d.summary) && (
        <p class="page-intro" {...service.edit.hero_subtitle}>
          {d.hero_subtitle ?? d.summary}
        </p>
      )}
      <a class="btn btn-primary" href={contactHref}>
        {t("serviceDetail.cta")} <span aria-hidden="true">→</span>
      </a>
    </header>

    {valueProps.length > 0 && (
      <ul class="value-props" {...service.edit.value_props}>
        {valueProps.map((v) => (
          <li class="card">
            <h2>{v.title}</h2>
            {v.text && <p>{v.text}</p>}
          </li>
        ))}
      </ul>
    )}

    {packages.length > 0 && (
      <section class="section" aria-labelledby="packages-title">
        <header class="section-header">
          <div>
            <p class="eyebrow">{t("serviceDetail.packagesEyebrow")}</p>
            <h2 class="section-title" id="packages-title">
              {t("serviceDetail.packagesTitle")}
            </h2>
          </div>
        </header>
        <PricingTiers tiers={packages} note={t("home.pricingNote")} />
      </section>
    )}

    {pains.length > 0 && (
      <section class="section" aria-labelledby="pains-title">
        <header class="section-header">
          <div>
            <p class="eyebrow">{t("serviceDetail.painsEyebrow")}</p>
            <h2 class="section-title" id="pains-title">
              {t("serviceDetail.painsTitle")}
            </h2>
          </div>
        </header>
        <ul class="grid-cards">
          {pains.map((p) => (
            <li class="card">
              <h3>{p.title}</h3>
              {p.text && <p>{p.text}</p>}
            </li>
          ))}
        </ul>
      </section>
    )}

    {comparison.length > 0 && (
      <section class="section" aria-labelledby="comparison-title">
        <header class="section-header">
          <div>
            <p class="eyebrow">{t("serviceDetail.comparisonEyebrow")}</p>
            <h2 class="section-title" id="comparison-title">
              {t("serviceDetail.comparisonTitle")}
            </h2>
          </div>
        </header>
        <div class="table-wrap">
          <table class="comparison">
            <caption class="sr-only">{t("serviceDetail.comparisonTitle")}</caption>
            <thead>
              <tr>
                <th scope="col">{t("serviceDetail.comparisonCriterion")}</th>
                <th scope="col">{t("serviceDetail.comparisonDiy")}</th>
                <th scope="col" class="us">
                  {t("serviceDetail.comparisonUs")}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr>
                  <th scope="row">{row.label}</th>
                  <td>{row.diy}</td>
                  <td class="us">{row.ctstack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )}

    {questions.length > 0 && (
      <section class="section" aria-labelledby="questions-title">
        <header class="section-header">
          <div>
            <p class="eyebrow">{t("serviceDetail.questionsEyebrow")}</p>
            <h2 class="section-title" id="questions-title">
              {t("serviceDetail.questionsTitle")}
            </h2>
          </div>
        </header>
        <ol class="grid-cards questions">
          {questions.map((q, i) => (
            <li class="card">
              <span class="num text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3>{q.question}</h3>
              {q.answer && <p>{q.answer}</p>}
            </li>
          ))}
        </ol>
      </section>
    )}

    <section class="section" aria-labelledby="process-title">
      <header class="section-header">
        <div>
          <p class="eyebrow">{t("home.processEyebrow")}</p>
          <h2 class="section-title" id="process-title">
            {t("serviceDetail.processTitle")}
          </h2>
        </div>
      </header>
      <ol class="steps">
        {t("serviceDetail.process").map(([title, text], i) => (
          <li>
            <span class="num text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>

    {projects.length > 0 && (
      <section class="section" aria-labelledby="projects-title">
        <header class="section-header">
          <div>
            <h2 class="section-title" id="projects-title">
              {t("serviceDetail.relatedProjects")}
            </h2>
          </div>
          <a href={localizePath("/projects", lang)} class="section-link">
            {t("home.projectsLink")} →
          </a>
        </header>
        <div class="projects-grid">
          {projects.map((p) => (
            <ProjectCard
              size="row"
              title={p.data.title}
              summary={p.data.summary}
              featuredImage={p.data.featured_image}
              href={localizePath(`/projects/${p.id}`, lang)}
              category={p.data.category}
              results={p.data.results}
              edit={p.edit}
            />
          ))}
        </div>
        {testimonial && (
          <div class="testimonial">
            <TestimonialCard
              variant="wide"
              quote={testimonial.data.quote}
              author={testimonial.data.author}
              role={testimonial.data.role}
              company={testimonial.data.company}
              avatar={testimonial.data.avatar}
              edit={testimonial.edit}
            />
          </div>
        )}
      </section>
    )}

    {faqs.length > 0 && (
      <section class="section" aria-labelledby="faq-title">
        <header class="section-header">
          <div>
            <h2 class="section-title" id="faq-title">
              {t("serviceDetail.faqTitle")}
            </h2>
          </div>
          <a href={localizePath("/faq", lang)} class="section-link">
            {t("serviceDetail.faqAll")} →
          </a>
        </header>
        <div class="faq-list">
          {faqs.map((f, i) => (
            <details class="faq-item" open={i === 0}>
              <summary>{f.data.question}</summary>
              <div class="faq-answer prose">
                <PortableText value={f.data.answer} />
              </div>
            </details>
          ))}
        </div>
      </section>
    )}

    {relatedServices.length > 0 && (
      <section class="section" aria-labelledby="related-title">
        <header class="section-header">
          <div>
            <h2 class="section-title" id="related-title">
              {t("serviceDetail.relatedServices")}
            </h2>
          </div>
        </header>
        <div class="related-services">
          {relatedServices.map((s) => (
            <ServiceCard
              title={s.data.title}
              summary={s.data.summary}
              icon={s.data.icon}
              priceFrom={s.data.price_from}
              href={localizePath(`/services/${s.id}`, lang)}
              edit={s.edit}
            />
          ))}
        </div>
      </section>
    )}

    {d.content && (
      <div class="prose service-content" {...service.edit.content}>
        <PortableText value={d.content} />
      </div>
    )}
  </div>
</Base>

<style>
  .breadcrumb ol {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    padding-top: var(--spacing-xl);
    color: var(--color-muted);
    font-size: var(--font-size-sm);
    list-style: none;
  }

  .breadcrumb li + li::before {
    content: "/";
    margin-inline-end: var(--spacing-xs);
  }

  .breadcrumb a {
    color: inherit;
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: var(--color-text);
  }

  .service-hero {
    max-width: 820px;
    padding-block: var(--spacing-2xl) var(--spacing-xl);
  }

  .hero-icon {
    display: inline-grid;
    width: 48px;
    height: 48px;
    margin-bottom: var(--spacing-md);
    place-items: center;
    border-radius: var(--radius);
    color: var(--color-brand);
    background: var(--color-brand-ring);
  }

  .service-hero h1 {
    margin-bottom: var(--spacing-md);
    font-size: clamp(2.25rem, 4.2vw, 3.5rem);
    font-weight: var(--font-weight-display);
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  .service-hero .page-intro {
    margin-bottom: var(--spacing-xl);
  }

  .value-props,
  .grid-cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--spacing-md);
    list-style: none;
  }

  .value-props li,
  .grid-cards li {
    padding: var(--spacing-lg);
  }

  .value-props h2,
  .grid-cards h3 {
    margin-bottom: var(--spacing-xs);
    font-size: var(--font-size-base);
    font-weight: 600;
  }

  .value-props p,
  .grid-cards p {
    color: var(--color-muted);
    font-size: var(--font-size-sm);
  }

  .num {
    display: block;
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-sm);
    font-weight: 600;
  }

  .table-wrap {
    overflow-x: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
  }

  .comparison {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-sm);
  }

  .comparison th,
  .comparison td {
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    text-align: start;
    vertical-align: top;
  }

  .comparison tbody tr:last-child > * {
    border-bottom: 0;
  }

  .comparison thead th {
    color: var(--color-muted);
    font-weight: 600;
  }

  .comparison td {
    color: var(--color-muted);
  }

  .comparison .us {
    color: var(--color-text);
    background: var(--color-surface);
  }

  .comparison thead .us {
    color: var(--color-brand);
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    border-top: 1px solid var(--color-border);
    list-style: none;
  }

  .steps li {
    padding: var(--spacing-lg) var(--spacing-md) 0 0;
  }

  .steps li + li {
    padding-inline-start: var(--spacing-md);
    border-inline-start: 1px solid var(--color-border);
  }

  .steps h3 {
    margin-bottom: var(--spacing-xs);
    font-size: var(--font-size-base);
    font-weight: 600;
  }

  .steps p {
    color: var(--color-muted);
    font-size: var(--font-size-sm);
  }

  .projects-grid,
  .related-services {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--spacing-md);
  }

  .testimonial {
    max-width: 860px;
    margin-top: var(--spacing-lg);
  }

  .faq-list {
    display: grid;
    gap: var(--spacing-sm);
    max-width: 860px;
  }

  .faq-item {
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
  }

  .faq-item[open] {
    border-color: color-mix(in srgb, var(--color-brand) 45%, var(--color-border));
  }

  .faq-item summary {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    font-weight: 600;
    cursor: pointer;
    list-style: none;
  }

  .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .faq-item summary::after {
    content: "+";
    color: var(--color-brand);
  }

  .faq-item[open] summary::after {
    content: "−";
  }

  .faq-answer {
    padding: 0 var(--spacing-lg) var(--spacing-md);
    color: var(--color-muted);
  }

  .service-content {
    max-width: var(--max-width);
    padding-block: var(--spacing-xl);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (max-width: 1000px) {
    .value-props,
    .grid-cards,
    .projects-grid,
    .related-services {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .steps {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      row-gap: var(--spacing-lg);
    }

    .steps li:nth-child(4) {
      padding-inline-start: 0;
      border-inline-start: 0;
    }
  }

  @media (max-width: 640px) {
    .value-props,
    .grid-cards,
    .projects-grid,
    .related-services,
    .steps {
      grid-template-columns: 1fr;
    }

    .steps li,
    .steps li + li {
      padding: var(--spacing-md) 0;
      border-inline-start: 0;
      border-bottom: 1px solid var(--color-border);
    }

    .comparison th,
    .comparison td {
      padding: var(--spacing-sm) var(--spacing-md);
    }
  }
</style>
```

Notes for this step:

- `service.id` is the slug; `d.id` is the ULID (used for `contentAlternates`).
- If `pnpm typecheck` reports a repeater item type as `unknown`, the dev server hasn't regenerated `emdash-env.d.ts` yet (Task 2, Step 4). Don't cast around it.
- `ServiceCard` gets its `href` prop in Task 4; until then typecheck fails on that prop. Do Task 4 before running typecheck, or temporarily remove `href`.

- [x] **Step 4: Format**

```bash
pnpm exec prettier --write "src/pages/[...lang]/services/[slug].astro" "src/pages/[...lang]/services/index.astro" src/i18n/ui.ts
```

(Commit together with Task 4.)

---

### Task 4: Link service cards to their detail page, sitemap

**Files:**

- Modify: `src/components/ServiceCard.astro`
- Modify: `src/pages/[...lang]/index.astro` (ServiceCard usage), `src/pages/[...lang]/services/index.astro` (ServiceCard usage)
- Modify: `src/pages/sitemap.xml.ts`

**Interfaces:**

- Consumes: route from Task 3.
- Produces: `ServiceCard` prop `href?: string`. When set, the title is a link; on `compact` cards the whole card is clickable (stretched link); on `detailed` cards a "Xem chi tiết" link appears above the CTA button.

- [x] **Step 1: `ServiceCard.astro`**

1. Add to `Props`: `/** Detail page URL; makes the title a link. */ href?: string;` and destructure `href`.
2. Replace the title element

```astro
<h3 class="service-title" {...edit?.title}>
  {title}
</h3>
```

with

```astro
<h3 class="service-title" {...edit?.title}>
  {href ? (
    <a class="service-link" href={href}>
      {title}
    </a>
  ) : (
    title
  )}
</h3>
```

3. In the `detailed` footer, right before the `btn btn-outline` link, add:

```astro
{detailed && href && (
  <a class="service-more section-link" href={href}>
    {t("serviceDetail.viewDetails")} →
  </a>
)}
```

4. Add CSS:

```css
.service-card {
  position: relative;
}

.service-link {
  color: inherit;
  text-decoration: none;
}

.service-link:hover {
  color: var(--color-brand);
}

/* Compact cards: the whole card is the link */
.compact .service-link::after {
  content: "";
  position: absolute;
  inset: 0;
}
```

(Keep the existing `.service-card` rule; add `position: relative` to it rather than a second rule if you prefer.)

- [x] **Step 2: Pass `href` where cards are rendered**

- `src/pages/[...lang]/index.astro`, in `services.map`: add `href={localizePath(`/services/${s.id}`, lang)}`.
- `src/pages/[...lang]/services/index.astro`: import `localizePath` from `../../../i18n/ui` and add the same `href` prop.

- [x] **Step 3: Sitemap**

In `src/pages/sitemap.xml.ts`:

1. Change the `getSlugs` signature to `collection: "projects" | "pages" | "services"` and `collect`'s parameter type the same way.
2. After `const projectSet = await collect("projects");` add `const serviceSet = await collect("services");`
3. After the loop that adds project paths add:

```ts
for (const slug of serviceSet) {
  for (const locale of locales) paths.add(localizePath(`/services/${slug}`, locale));
}
```

- [x] **Step 4: Verify routes (both languages, 404s, the `/en` trap)**

```bash
pnpm exec prettier --write src/components/ServiceCard.astro "src/pages/[...lang]/index.astro" "src/pages/[...lang]/services/index.astro" src/pages/sitemap.xml.ts
pnpm typecheck          # - 0 errors
for u in / /en /services /en/services \
  /services/thiet-ke-website /en/services/thiet-ke-website \
  /services/website-ban-hang /services/web-app-theo-yeu-cau /services/ung-dung-di-dong /services/bao-tri-toi-uu \
  /en/services/bao-tri-toi-uu /services/khong-co /en/services/khong-co /faq; do
  printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:4321$u)" "$u"; done
```

Expected: `200` for everything except `/services/khong-co` and `/en/services/khong-co` → `404`.

```bash
curl -s http://localhost:4321/services/thiet-ke-website | grep -o 'class="comparison"\|class="tiers"\|class="faq-item\|class="value-props"\|class="steps"' | sort | uniq -c
# comparison 1, tiers 1, faq-item 6, value-props 1, steps 1
curl -s http://localhost:4321/sitemap.xml | grep -c "/services/"   # 10 (5 services × vi/en)
curl -s http://localhost:4321/ | grep -c 'href="/services/thiet-ke-website"'   # ≥ 1
```

If `/sitemap.xml` still shows EmDash's sitemap index, restart the dev server.

- [x] **Step 5: Screenshots**

```bash
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs /services/thiet-ke-website 1440 shots/svc-1440.png
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs /services/thiet-ke-website 390 shots/svc-390.png
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs /en/services/thiet-ke-website 1440 shots/svc-en-1440.png
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs /services/website-ban-hang 1440 shots/svc-sparse-1440.png
MSYS_NO_PATHCONV=1 node scripts/screenshot.mjs /services/thiet-ke-website 1440 shots/svc-light.png light
```

Check against the brief's section order: breadcrumb → hero + value props + CTA → packages (3 cards, one "Phổ biến") → problems → comparison table → questions → 6-step process → related projects → FAQ → related services → CTA band. The sparse page (`website-ban-hang`) shows hero, process and whatever data exists, with no empty headings. No gradient except the CTA buttons; no glows.

- [x] **Step 6: Commit**

```bash
git add "src/pages/[...lang]/services" src/components/ServiceCard.astro "src/pages/[...lang]/index.astro" src/pages/sitemap.xml.ts src/i18n/ui.ts
git commit -m "feat(services): /services/[slug] detail page with packages, comparison, FAQ and related content"
```

---

### Task 5: Docs, status, merge

**Files:** `docs/roadmap.md`, `docs/overview.html`, `plans/README.md`, this file, `AGENTS.md` (project layout row for `src/components/`)

- [x] **Step 1: Update docs**
- `docs/roadmap.md`: change the Phase 2 "Service detail pages" line to `- [~] Service detail pages /services/[slug]: template + thiet-ke-website done (007a); other services' content → 007b`.
- `docs/overview.html` Phase 2 card: mark "Trang chi tiết từng dịch vụ" as `wip` (◐).
- `AGENTS.md` project layout: add `PricingTiers` to the `src/components/` row.
- This file: `Status: done`, tick every box, add Notes for anything you decided differently.
- `plans/README.md`: 007a → `done`.

- [x] **Step 2: Final check and merge**

```bash
pnpm exec prettier --write AGENTS.md docs/roadmap.md plans/README.md plans/007a-service-detail-template.md
pnpm typecheck && pnpm build
git add AGENTS.md docs plans
git commit -m "docs: service detail page template done (plan 007a)"
```

Hand the branch back for review; don't merge into `main` yourself unless told to.

## Self-review checklist (for the implementer, before handing back)

- [x] `/`, `/en`, `/services`, `/en/services` still 200 (route move + new route didn't shadow anything)
- [x] Unknown service slug → 404 in both languages
- [x] `/faq` still shows 30 general questions (service FAQs excluded)
- [x] Home pricing looks exactly as before (Task 1)
- [x] No hardcoded strings in the new page (search for Vietnamese letters in `services/[slug].astro`: `grep -nP "[à-ỹ]" "src/pages/[...lang]/services/[slug].astro"` → no output)
- [x] Sample copy listed in `docs/placeholders.md`
- [x] Screenshots at 390 and 1440, dark and light, reviewed

## Notes / decisions

- Cross-links use slugs in string fields (`project_category`, `related_services`, `faqs.service`) because EmDash 0.40 has no relations in seeds and no `references` query option. Switch to relations after upgrading EmDash.
- Package `desc` from EmDash is `string | null`. The page maps it with `p.desc ?? undefined` so it matches `PricingTier.desc?: string`. `pnpm typecheck` is 0 errors after that.
- `grep -c "/services/" sitemap.xml` counts 40 lines, not 10: each of the 10 service URLs (5 slugs × vi/en) is a `<loc>` plus three `xhtml:link` alternates. The 10 `<loc>` entries are the ones the plan asked for.
- Moving `services.astro` while `pnpm dev` was running left a stale Vite CSS module for the old path (error overlay on the page). Restarting the dev server cleared it. Production `pnpm build` does not use that cache.
- Prettier on this file rewrites every code sample and table. Those reflows were reverted; only status, checkboxes and these notes changed.
- Packages store features as multi-line text (one per line) because repeaters can't nest.
- The 6-step process is shared by all services (i18n `serviceDetail.process`), not per-service data (YAGNI).
- Related projects come from `project_category`; the testimonial is the first one whose `project` is among those projects.
