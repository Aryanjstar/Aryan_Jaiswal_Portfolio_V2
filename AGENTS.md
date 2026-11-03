# AGENTS.md — working on aryanjaiswal.in

For any AI coding agent (Claude Code, Cursor, Codex, Copilot…) or developer picking this repo up.

> **Shipping the v3 redesign?** Start with [`HANDOFF.md`](HANDOFF.md): the exact steps, and what to commit and what never to commit.

## What this is
Aryan Jaiswal's portfolio, v3: Next.js 16 (App Router) + React 19 + TypeScript strict + Tailwind v4. Light and dark themes (system + toggle).
Mostly static; `/` and `/projects` render per request so `?role=` links are tailored on the server. No database, no runtime secrets.

## Commands
```bash
npm ci
npm run dev                      # http://localhost:3000
npm run build && npm run start   # production on :3000 (CI and tests use :3100)
npm run lint && npm run typecheck
npm run test:content             # needs a build; fails on banned claims / music drift
npm run check:budget             # needs `next start -p 3100`; ≤150 KB gz JS per route
npm run test:e2e                 # Playwright on Chromium, WebKit (iPhone), Firefox
npm run screens                  # screenshots → docs/redesign/screens/$PHASE
npm run check:links
npm run add-cover -- --url <reel> --title "<song>" --position <n> [--line … --description … --vibe … --artist …]
```
First time: `npx playwright install chromium webkit firefox`.

## Rules (please keep)
- **Facts live only in `content/`.** Don't invent metrics, dates, users or artists. Sources: `docs/redesign/CONTENT.md` and, if available, Aryan's private claim ledger. The "Never publish" list in CONTENT.md §14 is enforced by `scripts/check-content.ts`.
- **No phone number in HTML** (PDFs in `public/resume/` may carry it; Aryan approved that).
- Design: `docs/redesign/DESIGN.md` (one Apple-blue accent, Instrument Sans/Serif + JetBrains Mono, motion rules, every hover has a focus + touch equivalent, reduced motion respected). No UI kits; small owned components.
- Budget: ≤150 KB gz first-load JS on every route; Lighthouse mobile ≥95. Heavy things load on demand (the ⌘K palette is code-split).
- Accessibility: axe must stay clean in both themes (`tests/a11y.spec.ts`).
- Don't touch `main` directly; open a PR. CI must be green.

## Map
| Path | What |
|---|---|
| `app/` | routes: `/`, `/projects`, `/resume`, `/notesbyaryan`, `/work/[slug]`, `/colophon`, `/now`, OG images, sitemap, robots, 404 |
| `components/home`, `components/work`, `components/music`, `components/site` | owned UI |
| `content/` | all copy and data (Zod-validated) |
| `scripts/` | content guard, link checker, budget check, add-cover |
| `tests/` | Playwright suites (`interactions.spec.ts` = design catalog checks) |
| `docs/DEPLOY.md` | **how to deploy, CI/CD, secrets, rollback** |
| `docs/redesign/` | plan, design system, content, progress log, launch checklist |

## Deploy
Read `docs/DEPLOY.md`. Short version: CI (`.github/workflows/ci.yml`) runs on every push; when it passes, `.github/workflows/deploy.yml` deploys to Vercel (production on `main`, preview elsewhere) if `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` are set.
