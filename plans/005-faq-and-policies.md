# 005: FAQ page and policy pages

- **Status:** ready (start after wave 1 is merged)
- **Wave:** 2
- **Roadmap:** Phase 2, "FAQ collection + `/faq` page with category tabs" and "Policy pages: warranty, privacy, terms"
- **Mockups:** `mockup/10-faq/BRIEF.md` (no image: follow the brief and the shared style of the existing pages)
- **Owner:** AI

## Goal

Answer the questions buyers ask before contacting us (price, timeline, warranty) and publish the warranty, privacy and terms pages, so the footer can link to them and the site looks like a real company.

## Scope

- In: `faqs` collection, `/faq` page (tabs, accordion, search, side card), FAQPage JSON-LD; policy pages in the `pages` collection with a generic route; footer "Liên kết nhanh" links.
- Out: FAQ blocks on service pages (plan 007 reuses this collection).

## Design

- Schema: new collection `faqs` with `question` (string), `answer` (portableText), `category` (select: `pricing`, `timeline`, `warranty`, `technical`, `content`), `sort_order` (integer). 6 entries per category, vi + en linked with `translationOf`. Answers are sample copy: add them to `docs/placeholders.md`.
- `/faq` (`src/pages/[...lang]/faq.astro`): title, search input (client-side filter over questions), category tabs (buttons with `aria-selected`, work without JS by showing all), native `<details>` accordion with the first item open, side card "Chưa thấy câu trả lời?" with Zalo (if set) and a button to `/contact`. FAQPage JSON-LD from the entries.
- Policy pages: add `bao-hanh`, `chinh-sach-bao-mat`, `dieu-khoan` (vi) and their en translations to `pages` in the seed. Add a generic page route `src/pages/[...lang]/[page].astro` that renders any `pages` entry like `about.astro` does (keep `about.astro` as is). Static routes win over the dynamic one; unknown slugs must 404. Policy text is sample content: mark it in `docs/placeholders.md`.
- Footer (`src/layouts/Base.astro`): quick links column FAQ, Chính sách bảo hành, Bảo mật, Điều khoản. Nav gets no new item.
- Strings: `faq.*`, `footer.*` keys, vi + en.

## Tasks

- [ ] `faqs` collection + seed entries, architecture doc
- [ ] `/faq` page: tabs, search, accordion, side card, JSON-LD
- [ ] Policy pages + generic page route
- [ ] Footer quick links
- [ ] Placeholders listed in `docs/placeholders.md`

## Verification

- [ ] `pnpm typecheck`: 0 errors
- [ ] `pnpm build` succeeds
- [ ] `/faq`, `/en/faq`, each policy page (vi + en) return 200; `/khong-co-trang-nay` returns 404
- [ ] Tabs and search work with JS; content readable without JS
- [ ] Screenshots at 390px and 1440px

## Notes / decisions

- Hot files touched: `seed/seed.json`, `src/layouts/Base.astro` (footer), `src/i18n/ui.ts`. Run alone (no other plan in wave 2).
