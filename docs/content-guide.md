# Content guide

For humans and AI agents writing content for the site.

## Voice

- Speak to business owners, not developers. Lead with the business problem and the result, then the technology.
- Specific beats generic. "Website bán hàng cho shop thời trang, đồng bộ tồn kho" beats "Giải pháp số toàn diện".
- Vietnamese: natural, polite, no word-for-word translation from English. Use "bạn" for the reader and "chúng tôi" for CTStack.
- English: plain and concise. Localize units and currency (VND ↔ USD) instead of converting literally.

## Truthfulness (hard rules)

- Never invent clients, metrics, testimonials, awards or partner logos as if real.
- Results (`results` field) must come from real data provided by the team. Unknown? Leave the field empty.
- Sample/demo content must say so (for example, client = "Khách hàng mẫu" / "Sample client") and be replaced before launch.
- Client names or screenshots need the client's permission. Otherwise use "Chuỗi cà phê tại TP.HCM"-style descriptions.

## Project (case study) template

- **title**: what was built, e.g. "Website bán hàng thời trang"
- **summary**: one sentence: what it is + who it's for
- **category / stack / year / client**
- **results**: 2–3 measurable outcomes (value + short label)
- **content** (Portable Text), with sections:
  - `h2` Bài toán / Challenge: the situation before, and why it hurt
  - `h2` Giải pháp / Solution: what we built and the key features
  - `h2` Kết quả / Outcome: what changed for the client
- **featured_image**: 16:10, at least 1600px wide, UI screenshot or device mockup
- **gallery**: 2–6 screens with short captions

## Service template

- **title**: 2–4 words
- **summary**: one sentence: who it's for + main benefit
- **price_from**: "8 triệu" / "$400" (per locale)
- **features**: 4–6 concrete items
- **icon**: one of `globe | cart | layout | smartphone | wrench | sparkles`

## Translation

- Create the `vi` entry first, then add the `en` translation from the entry's Translations panel (or `translationOf` in the seed).
- Slugs may be identical across languages, or localized.
- Translate meaning, not words. Rewrite examples to fit the English-speaking audience.

## AI workflow (Phase 3)

1. The agent drafts via the EmDash MCP server, saved as **draft**, never published directly.
2. A human reviews facts, numbers and tone, then publishes.
3. The agent creates the translation as a draft; a human reviews it.
