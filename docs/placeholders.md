# Placeholder content to replace before launch

Everything below was written as realistic sample content so the site looks finished. None of it is a confirmed offer, price or fact yet. Replace each item (or confirm it) before going live, then tick it here.

## Offer and prices

- [ ] Pricing tiers on the home page: names, "from" prices (vi in triệu, en in USD), descriptions and feature lists: `src/i18n/ui.ts` → `home.tiers` (vi + en)
- [ ] Service "from" prices and feature lists: CMS → Services (seed: `seed/seed.json`, `services`)
- [ ] Warranty and free maintenance periods (6/12 months, 3/6 months) in tiers and in `home.why`
- [ ] Payment and shipping integrations named in tiers (VNPay, MoMo, GHN, GHTK)
- [ ] Budget ranges in the contact form: `scripts/create-contact-forms.mjs` (and Admin → Forms on existing DBs)

## Commitments

- [ ] "Why CTStack" commitments (fixed quote, weekly demo, full handover, 12-month warranty): `home.why`
- [ ] Trust promises next to the forms (24h reply, specific proposals, privacy): `contact.trust`
- [ ] "Reply within 24 hours" wording in the CTA band, contact page and pricing note

## Company facts

- [ ] Contact channels: `contactEmail`, `contactPhone`, `zaloUrl`, `messengerUrl` in `src/i18n/ui.ts` (floating buttons and footer links stay hidden while empty)
- [ ] Location: `contact.location`, `footer.location`
- [ ] Working hours shown on the contact page (currently sample: Mon–Sat, 8:30 am–6:00 pm / T2–T7, 8:30–18:00): `contact.hours`
- [ ] About page text: CMS → Pages → About

## FAQ and policies

- [ ] FAQ answers (30 questions × vi/en, prices, timelines, payment split, warranty, tech): CMS → FAQs (seed: `faqs`)
- [ ] Policy texts: warranty (`bao-hanh`), privacy (`chinh-sach-bao-mat`), terms (`dieu-khoan`): CMS → Pages. Have them checked before launch; the terms and privacy texts are not legal advice.

## Portfolio

- [ ] Sample projects (client "Khách hàng mẫu", Unsplash images, results like +35%): CMS → Projects. Replace with real projects, real screenshots and measured results only.
- [ ] Hero illustration numbers (128.450.000đ, 1.204, 892…) are decorative, not claims. Keep or swap for a real project screenshot.

## Not added on purpose

- Testimonials, client logos and stats ("50+ projects") are left out until they are real. See `docs/content-guide.md`.
