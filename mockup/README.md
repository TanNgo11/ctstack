# CTStack mockup set

Generated full-page PNG mockups for the CTStack Astro + plain CSS implementation. The primary direction is **dark-first technology studio**; `10-home-desktop-alt-style.png` is an intentionally different editorial variant for visual review.

## Files

| File | Viewport / role |
| --- | --- |
| `01-home-desktop-dark.png` | 1440px desktop homepage, dark theme |
| `02-home-mobile-dark.png` | 390px mobile homepage, dark theme |
| `03-home-desktop-light.png` | 1440px desktop homepage, light variant, same content structure |
| `04-projects-desktop.png` | 1440px desktop “Dự án” index with filters and project grid |
| `05-project-detail-desktop.png` | 1440px desktop “Website chuỗi cà phê” case study |
| `06-services-desktop.png` | 1440px desktop services page, five service cards |
| `07-contact-desktop.png` | 1440px desktop contact page with split intro + form |
| `08-contact-mobile.png` | 390px mobile contact page |
| `09-design-system.png` | 1440px design-system reference sheet |
| `10-home-desktop-alt-style.png` | 1440px alternate editorial/Swiss homepage direction |

All files are PNGs. Full-page heights are intentionally content-driven: desktop pages are 2,160–2,614px tall, contact/design-system sheets are 960px, and mobile pages are 834–843px.

## Primary dark direction tokens

### Color

| Token | Hex | Usage |
| --- | --- | --- |
| `--bg` | `#0A0B0F` | page background |
| `--surface` | `#11131A` | cards, form surfaces |
| `--border` | `#242938` | 1px borders and dividers |
| `--text` | `#F4F5F7` | primary text |
| `--muted` | `#9AA3B2` | secondary text |
| `--brand-blue` | `#3B82F6` | accent start, focus ring |
| `--brand-violet` | `#8B5CF6` | accent end |
| `--accent` | `linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)` | primary buttons and key result numbers |
| `--danger` | `#EF4444` | form error state only |

### Typography

- Font family: **Be Vietnam Pro** (headings and body; Vietnamese diacritics required).
- Desktop hero: `72px`, `font-weight: 700`, `line-height: 1.05`, `letter-spacing: -0.04em`.
- Desktop section title: `40px`, `700`, `line-height: 1.15`.
- Desktop page title: `64px`, `700`, `line-height: 1.05`.
- Card title: `20px`, `600`, `line-height: 1.25`.
- Body: `16px`, `400`, `line-height: 1.6`.
- Lead/body large: `18px`, `400`, `line-height: 1.55`.
- Eyebrow, tag and metadata: `12–14px`, `600`, uppercase or sentence case as shown.
- Button text: `16px`, `600`.
- Mobile hero: `40px`, `700`, `line-height: 1.05`.
- Mobile section title: `28px`, `700`, `line-height: 1.15`.

### Geometry and spacing

- Content max-width: `1200px`; desktop side gutter: `48px`; mobile gutter: `20px`.
- Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 120px`.
- Card radius: `16px`; compact card radius: `12px`.
- Button radius: `12px`; pill radius: `999px`.
- Inputs: `12px` radius, `48px` minimum height, `16px` horizontal padding.
- Grid gap: `16px` for cards; `24px` for major columns; `48–96px` between sections.
- Borders: `1px solid #242938`; hover adds a subtle blue/violet inner glow only.
- Icons: simple geometric 24px line icons, `1.5px` stroke.

## Light homepage tokens (`03-home-desktop-light.png`)

- Background `#F7F8FA`
- Surface `#FFFFFF`
- Border `#E3E7EF`
- Text `#12151C`
- Muted `#667085`
- Accent remains `#3B82F6 → #8B5CF6`
- Same typography, radii and spacing as the dark direction.

## Alternate direction tokens (`10-home-desktop-alt-style.png`)

Editorial/Swiss print direction for review only:

- Paper background `#F4F1EA`
- Ink `#111217`
- Rule/border `#111217`
- Muted ink `#66645C`
- Single accent `#2456FF`
- No gradient, glow or shadow; use strict grid rules, asymmetric columns and square corners (`0–4px`) while preserving the same content hierarchy.

## Implementation notes

- Keep the copy exactly as rendered in the supplied brief; do not substitute lorem ipsum or invented project names.
- Project imagery is abstract flat UI, not photography and not real third-party logos.
- `09-design-system.png` is the visual source of truth for button, card, input, pill, icon and spacing treatment in the primary direction.
