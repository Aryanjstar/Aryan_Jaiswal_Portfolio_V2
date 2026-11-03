# Launch checklist — aryanjaiswal.in v3

Everything below the line "Done on this machine" is already verified locally (3 Nov 2026). The rest needs you.

## 1. Merge (from your other laptop)

The work is in `~/Developer/Aryan_Jaiswal_Portfolio_V2` on this machine, uncommitted, on top of `origin/main @ 2477ccb`.

```bash
git checkout -b redesign/v3
git add -A
git commit -m "v3 redesign: phases 0–6 (see docs/redesign/PROGRESS.md)"
git push -u origin redesign/v3
```

Open a PR from `redesign/v3`; CI (`.github/workflows/ci.yml`) runs lint, typecheck, build, the content guard, the JS budget and all Playwright suites on Chromium, WebKit and Firefox. Merge when green.

Screenshots in `docs/redesign/screens/` and `docs/redesign/baseline/` are git-ignored and stay on the original Mac. Step-by-step for an agent: [`HANDOFF.md`](../../HANDOFF.md).

## 2. Deploy

Full, step-by-step guide (Vercel or Netlify, DNS, CI/CD secrets, rollback): **[`docs/DEPLOY.md`](../DEPLOY.md)**. Any developer or AI agent can follow it; `AGENTS.md` at the repo root is the entry point for agents.

Short version: import the repo in Vercel (framework Next.js, no env vars needed), point the domain at it with `www` → apex, and either keep Vercel's Git integration or add `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` as GitHub secrets so `.github/workflows/deploy.yml` deploys only after CI passes.

## 3. Right after deploy

- [ ] Open the site on your phone: inside the **LinkedIn app** (paste the link in a DM to yourself), Safari, and Chrome. Check the hero, Resume download, Copy email, theme toggle, and a case study.
- [ ] LinkedIn **Post Inspector** → `https://aryanjaiswal.in` and one case-study URL, to refresh the preview card.
- [ ] Check old links still land: `/experience` → `/#work`, `/music` → `/notesbyaryan`, `/resume.pdf`, `/Aryan_Resume.pdf`.
- [ ] Run Lighthouse on the live URL once (mobile).
- [ ] If analytics is on: visit `/?ref=linkedin` in a private window and confirm it shows up.

## 4. Things only you can update

- [ ] LinkedIn headline, GitHub bio and Naukri headline: **Forward Deployed Engineer @ Exotel, Jun 2026–Present** (matches the site and resume).
- [ ] Use tailored links in applications: `https://aryanjaiswal.in/?role=backend` (also `sde`, `ai`, `frontend`, `fullstack`, `devops`, `fde`) and `?ref=linkedin|naukri|resume`.
- [ ] Glance at the five song artists marked "best guess" in PROGRESS.md (Aankhein Teri, Mere Nishaan, Tera Chehra, Tose Naina, Sitaarein) and the 11 captions I drafted for the new songs; edit `content/music.json` if any are off.
- [ ] Keep `/now` and "Currently vibing to" fresh (`app/now/page.tsx`, `content/music.ts`).

## Done on this machine (Phase 6)

| Check | Result |
|---|---|
| Playwright: 150 tests × Chromium, WebKit (iPhone 13 + iPhone 17 Pro), Firefox | ✅ all green (3 Nov, final) |
| Screenshots: 12 routes × 390 / 768 / 1440 × light / dark (+ reduced motion) | ✅ `screens/phase-6/` reviewed |
| Keyboard journey ⌘K → case study → contact | ✅ all three browsers |
| JS off (`/`, `/?mode=resume`), no theme flash, reduced motion | ✅ |
| axe (WCAG 2.2 AA) every route, both themes | ✅ |
| Lighthouse mobile, every route | ✅ 100/100/100/100 (404 is not scored by Lighthouse) |
| First-load JS | ✅ 142–149 KB gz per route (budget 150) |
| Links | ✅ 94 checked; LinkedIn and LeetCode block bots (open them by hand) |
| Content vs resume + claim ledger | ✅ dates, titles, CGPA, ranks and metrics match; no phone number anywhere |
| Print `/resume` | ✅ light, A4, URLs printed |
| OG images | ✅ home, notesbyaryan, 5 case studies (Instrument Sans 600) |
