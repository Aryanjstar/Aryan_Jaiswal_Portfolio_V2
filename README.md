# aryanjaiswal.in (v3)

Portfolio of **Aryan Jaiswal**, software engineer (Forward Deployed Engineer at Exotel, IIIT Dharwad CSE '26).
Apple-style, light and dark (follows the system, with a toggle), server-rendered and readable with JS off.

## Run it

Requires Node ≥ 20.9.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm run start   # production build
```

## Checks

```bash
npm run lint
npm run typecheck
npm run test:content     # "Never publish" claims, music data vs docs/redesign/CONTENT.md (needs a build)
npm run test:e2e         # Playwright on Chromium, WebKit (iPhone) and Firefox: smoke, JS-off, axe in both themes,
                         # no-theme-flash, keyboard journey, interaction catalog, reduced motion
npm run check:budget     # first-load JS ≤ 150 KB gz per route (needs `npm run start` on :3100)
npm run screens          # 390/1440 × light/dark (+ reduced motion) → docs/redesign/screens/$PHASE
npm run check:links      # every internal and external link (needs a build)
npm run analyze          # bundle analyzer (webpack build)
```

First Playwright run: `npx playwright install chromium webkit firefox`. CI runs all of this on every push (`.github/workflows/ci.yml`).

## Launch

- How to deploy, CI/CD, secrets and rollback: [`docs/DEPLOY.md`](docs/DEPLOY.md)
- Launch-day checklist: [`docs/redesign/LAUNCH.md`](docs/redesign/LAUNCH.md)
- Working with an AI agent on this repo: [`AGENTS.md`](AGENTS.md)

## Where things live

| Path | What |
|---|---|
| `content/` | **The only source of facts.** Typed, Zod-validated: profile, roles, highlights, experience, projects, case studies, specs, recognition, `music.json` |
| `app/` | Routes: `/`, `/projects`, `/resume`, `/notesbyaryan`, `/work/[slug]`, `/colophon`, OG images, sitemap, robots |
| `components/` | Owned components (no UI kits) |
| `docs/redesign/` | Plan, design system, content, research, progress log, screenshots |
| `scripts/` | `check-content`, `check-links`, `add-cover`, `music-ai` (local helper, not wired) |

## Tailored links

Send `?role=` with an application and the homepage re-orders its proof server-side:
`sde`, `ai`, `backend`, `frontend`, `fullstack`, `devops`, `fde`. `?mode=resume` (or press **R**) shows the plain résumé view.

## Add a song

Easiest: ask Claude Code to "add this song" with the reel link, title and position (it uses `.claude/skills/add-song`). Or by hand:

```bash
npm run add-cover -- --url "https://www.instagram.com/reel/<code>/" --title "Song" --artist "Original artist" --lang hi --position 1
```

The date is decoded from the reel code. Then update the table in `docs/redesign/CONTENT.md` §10.1 (the content check compares them).

## Analytics

Off by default. Set `NEXT_PUBLIC_ANALYTICS=vercel` on a Vercel deployment to enable Vercel Web Analytics + Speed Insights.

## Résumé PDFs

`public/resume/Aryan-Jaiswal-Resume.pdf` is the public (no phone) version. To add role variants, drop
`Aryan-Jaiswal-Resume-SDE.pdf` / `-AI-FDE.pdf` next to it and set `available: true` in `content/profile.ts`.
