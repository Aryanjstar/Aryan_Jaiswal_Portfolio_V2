# HANDOFF — commit, push and deploy the v3 redesign

For the coding agent (Claude Code, Cursor, Codex…) or developer on the other Mac. Written 3 Nov 2026.
Aryan reviewed the site locally and approved it. Your job is to **ship it unchanged**: commit, push, PR, merge, deploy.
Read `AGENTS.md` for the general rules; this file is the task.

## Where things stand

- The redesign is **uncommitted** on top of `origin/main @ 2477ccb` (`git status` shows ~197 changes: ~146 deletions, ~13 modifications, ~38 new paths).
- Everything was verified on the original machine: lint, typecheck, build, content guard, JS budget (every route ≤ 150 KB gz),
  all 150 Playwright tests (Chromium, Firefox, WebKit iPhone 13 and iPhone 17 Pro), axe in both themes, and a device sweep at 320–1920 px.
- What changed and why: `docs/redesign/PROGRESS.md` (decisions D-01…D-51). Launch checklist: `docs/redesign/LAUNCH.md`. Deploy guide: `docs/DEPLOY.md`.

## Do this, in order

1. **Check the tree.** `git status` should list the changes above and `git log --oneline -1` should be `2477ccb`. If `origin/main` has moved since then, stop and tell Aryan before merging anything.
2. **Install and verify** (Node ≥ 20.9; CI uses 22):
   ```bash
   npm ci
   npx playwright install chromium webkit firefox
   npm run lint && npm run typecheck && npm run build
   npm run test:content
   npx next start -p 3100 &      # leave running for the next two
   npm run check:budget
   npm run test:e2e
   ```
   All must pass. If one fails, fix only what is needed to pass (environment issues, flaky timing) and do **not** change site content or design to make it pass. Tell Aryan what you changed.
3. **Branch, commit, push:**
   ```bash
   git checkout -b redesign/v3
   git add -A
   git status            # confirm nothing from the "never commit" list below is staged
   git commit -m "v3 redesign: Apple-style portfolio, case studies, notesbyaryan, resume (see docs/redesign/PROGRESS.md)"
   git push -u origin redesign/v3
   ```
4. **Open a PR** `redesign/v3 → main` on GitHub (`gh pr create --fill` works). CI (`.github/workflows/ci.yml`) runs lint, typecheck, build, content guard, budget and Playwright on three browsers.
5. **Merge when CI is green** (squash or merge commit, either is fine). Don't enable auto-merge, and don't push to `main` directly.
6. **Deploy** by following `docs/DEPLOY.md` (Vercel; no env vars needed). With Vercel's GitHub integration, merging to `main` deploys production. Point `aryanjaiswal.in` at Vercel only when Aryan says so if the domain is still on the old host.
7. **After deploy**, run the "Right after deploy" list in `docs/redesign/LAUNCH.md` (old URLs redirect, OG preview, Lighthouse on the live URL) and report back.

## Commit these (everything `git add -A` picks up)

- **New site:** `app/`, `components/`, `content/`, `lib/`, `scripts/`, `tests/`, `next.config.ts`, `eslint.config.mjs`, `playwright.config.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `postcss.config.mjs`, `next-env.d.ts`.
- **Public assets:** `public/resume/*.pdf` (three resumes; they intentionally include Aryan's phone number, which he approved), `public/audio/aankhein-teri.mp3` (his own cover), `public/shots/`, `public/aryan-x.jpg`, `public/aryan-720.webp`.
- **Docs and tooling:** `AGENTS.md`, `CLAUDE.md`, `HANDOFF.md`, `README.md`, `docs/` (minus the ignored screenshots), `.github/workflows/`, `.claude/skills/add-song/` and `.claude/launch.json`, `.gitignore`.
- **The deletions are intentional.** ~146 files from the old site go away: `Aryan_CV/`, old `components/` and `components/ui/`, `data/`, `config/`, `cache/`, old `public/` images and PDFs, `app/experience/`, `app/provider.tsx`, `next.config.mjs` (replaced by `next.config.ts`). Old URLs are redirected in `next.config.ts`. Don't restore them.

## Never commit

- `node_modules/`, `.next/`, `test-results/`, `playwright-report/`, `*.log`, `.DS_Store`
- `docs/redesign/screens/`, `docs/redesign/baseline/`, `docs/redesign/lighthouse/`: review screenshots and raw Lighthouse JSON (git-ignored; tens of MB)
- `.env*`, `.vercel/`, or any token, key or secret. Vercel tokens go in GitHub **Actions secrets** only (see `docs/DEPLOY.md`)
- Anything from Aryan's private `Aryan_Resume_Context` folder (claim ledger, transcripts, profile overhaul zip, salary or customer details)
- Never `git add -f` an ignored file; never force-push; never rewrite history on `main`

## Don't change while shipping

- Facts and copy in `content/` (numbers, dates, titles, artists): they are reconciled with Aryan's claim ledger. Banned claims are enforced by `scripts/check-content.ts`.
- No phone number in any HTML page (the PDFs may have it).
- Design tokens, fonts, motion and layout (`docs/redesign/DESIGN.md`). Keep every route ≤ 150 KB gz first-load JS.
- If something looks wrong, list it for Aryan instead of "fixing" it.

## Left for Aryan (not you)

LinkedIn, Naukri and other profile updates; deciding when DNS moves; checking the site in the LinkedIn in-app browser on his phone. See `docs/redesign/LAUNCH.md` §3–4.
