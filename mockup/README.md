# Mockups

Design references, one folder per feature. The UI must match these. Each folder has a `BRIEF.md` (what to draw) and the generated images.

## How to generate (Codex / image tool)

Give the tool the **shared style** below plus the folder's `BRIEF.md`, and save the images into that folder with the exact file names listed in the brief. Generate `00-design-system` first and attach it when generating the other folders so every page shares one design language.

After generating a folder, fill in its `NOTES.md` with the exact values used (hex colors, font sizes, spacing, radii), so a developer or AI can implement it precisely.

## Shared style (paste into every prompt)

> Website UI mockups for "CTStack", a Vietnamese software studio building websites, web apps and mobile apps for SMBs. Goal: look premium and trustworthy, and push visitors to click "Nhận báo giá" (Get a quote). Must be realistic to build in Astro + plain CSS: no 3D renders, no effects that can't be recreated.
>
> - Dark-first modern tech studio aesthetic (like Linear, Vercel, Raycast): near-black background (~#0A0B0F), subtle grid/noise texture, soft radial glow behind hero.
> - ONE accent: electric blue → violet gradient (#3B82F6 → #8B5CF6), used sparingly (primary buttons, key numbers, highlights).
> - Font: "Be Vietnam Pro" with correct Vietnamese diacritics. Bold, tight headlines; 16–18px body.
> - Cards: 1px subtle borders, 12–16px radius. Generous whitespace, clear hierarchy.
> - Real Vietnamese copy from the brief, no lorem ipsum, no translation.
> - No real company logos in project images; use abstract UI screenshots.
> - Sizes: desktop 1440px wide, mobile 390px wide, full-page tall PNG.
> - Header on every page: wordmark "CTStack" · Dự án · Dịch vụ · Giới thiệu · EN toggle · primary button "Nhận báo giá". Mobile: logo + hamburger + small CTA.
> - Footer on every page: logo, tagline "Thiết kế & phát triển website, ứng dụng", links, © 2026 CTStack.

## Status

| Folder | Feature | Images |
| ------ | ------- | ------ |
| [`00-design-system/`](00-design-system/BRIEF.md) | Design system | todo |
| [`01-home/`](01-home/BRIEF.md) | Home | todo |
| [`02-projects/`](02-projects/BRIEF.md) | Projects list | todo |
| [`03-project-detail/`](03-project-detail/BRIEF.md) | Project detail (case study) | todo |
| [`04-services/`](04-services/BRIEF.md) | Services | todo |
| [`05-contact/`](05-contact/BRIEF.md) | Contact | todo |
| [`06-about/`](06-about/BRIEF.md) | About | todo |
| [`07-not-found/`](07-not-found/BRIEF.md) | 404 | todo |
