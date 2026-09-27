# 002: Contact page, next steps, channels and success state

- **Status:** done
- **Wave:** 1 (parallel with 003, 004)
- **Roadmap:** Phase 1, "Contact page: what happens next steps, channels, working hours"
- **Mockups:** `mockup/05-contact/BRIEF.md`, `mockup/07-contact-desktop.png`, `mockup/08-contact-mobile.png`
- **Owner:** AI

## Goal

After reading the contact page a visitor knows exactly what happens once they send the form, when we work and how else to reach us. After sending, they see a clear confirmation.

## Scope

- In: "Sau khi gửi" 3 steps, channels block with working hours, styled success/error states of the form.
- Out: new form fields, email notifications (needs Resend, later), real contact values (see `docs/placeholders.md`).

## Design

- Page: `src/pages/[...lang]/contact.astro`; form card: `src/components/ContactForm.astro`.
- Steps below the form (desktop: 3 columns; mobile: stacked): 01 "Chúng tôi gọi lại trong 24h" · 02 "Trao đổi chi tiết & đề xuất" · 03 "Báo giá rõ ràng". Reuse the numbered style of the home "why" list (`.why` in `index.astro`), don't invent a new look.
- Channels block: Zalo, phone, email, working hours "T2–T7, 8:30–18:00", location. Channels read from `contactPhone`, `zaloUrl`, `messengerUrl`, `contactEmail` in `src/i18n/ui.ts`; hide a row when its value is empty. Working hours is new sample content: add it to `docs/placeholders.md`.
- Success state: the forms plugin replaces the form with its confirmation message (`.ec-form-status`); style it as in the brief ("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong vòng 24 giờ.") with a check icon. Check the plugin markup in `node_modules/@emdash-cms/plugin-forms/src/` before styling. Error state: red border + message under the field (`--color-danger`).
- Strings: add `contact.*` keys to **both** `vi` and `en`, placed right after the existing `contact.*` keys (keeps git hunks separate from other plans).

## Tasks

- [x] Steps section (vi + en)
- [x] Channels block with working hours, empty values hidden
- [x] Success + error states styled (submit a test message on the local dev server)
- [x] Add working hours to `docs/placeholders.md`

## Verification

- [x] `pnpm typecheck`: 0 errors
- [x] `pnpm build` succeeds
- [x] `/contact` and `/en/contact` return 200; a test submission shows the success state and appears in Admin → Forms → Submissions
- [x] Screenshots at 390px and 1440px compared side by side with the mockup

## Notes / decisions

- Hot files touched: `src/i18n/ui.ts` (contact block only).
- The success copy is localized in `ContactForm.astro` so it stays correct even when an existing Forms plugin definition has older confirmation text.
