# NNN: <Feature name>

- **Status:** draft | ready | in progress | done
- **Roadmap:** Phase X, "<roadmap line>"
- **Mockups:** `mockup/<feature>/`
- **Owner:** human | AI

## Goal

What changes for the visitor or the editor, in one or two sentences.

## Scope

- In:
- Out:

## Design

Pages/components touched, data needed (collections, fields), UI strings to add (vi + en).

## Tasks

- [ ] ...
- [ ] Add vi + en strings to `src/i18n/ui.ts`
- [ ] Update docs (`AGENTS.md`, `docs/architecture.md`) if structure or schema changed

## Verification

- [ ] `pnpm typecheck`: 0 errors
- [ ] `pnpm build` succeeds
- [ ] vi and en routes return 200; bad slugs return 404
- [ ] Matches mockups at 390px and 1440px

## Notes / decisions

