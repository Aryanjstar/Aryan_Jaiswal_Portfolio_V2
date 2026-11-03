# Deploying aryanjaiswal.in

Written so a person **or an AI coding agent** can set this up from zero. The site is a standard Next.js 16 app
(App Router). It needs no database, no secrets at runtime and no server-side API keys.

## TL;DR

| Step | Command / place |
|---|---|
| Install | `npm ci` (Node ≥ 20.9; CI uses 22) |
| Check | `npm run lint && npm run typecheck && npm run build` |
| Test | `npm run start` in one terminal, then `npm run test:content && npm run check:budget && npm run test:e2e` |
| Deploy | Push to `main` → GitHub Actions **CI** → **Deploy** workflow → Vercel production |

## 1. One-time setup on Vercel (recommended host)

1. Create a Vercel account and **Add New → Project → Import** `Aryanjstar/Aryan_Jaiswal_Portfolio_V2`.
   - Framework preset: **Next.js**. Build command `next build`, output default. Root directory: repo root.
   - Environment variables: none required. Optional: `NEXT_PUBLIC_ANALYTICS=vercel` to turn on Vercel Web Analytics + Speed Insights (then enable both in the Vercel project's Analytics tab).
2. **Domains** (Project → Settings → Domains): add `aryanjaiswal.in` and `www.aryanjaiswal.in`; set `www` to **redirect (308) to `aryanjaiswal.in`**. At your DNS provider:
   - apex `aryanjaiswal.in` → `A 76.76.21.21`
   - `www` → `CNAME cname.vercel-dns.com`
   (Vercel shows the exact records; use those if they differ.) If the domain currently points at Netlify, change these records only when you're ready to switch.
3. Decide who deploys:
   - **Option A — Vercel's GitHub integration (simplest):** leave it connected. Every push gets a preview; `main` goes to production. You can then delete `.github/workflows/deploy.yml` or leave it (it skips without secrets).
   - **Option B — deploy from GitHub Actions only after CI passes (stricter):** in Vercel, Project → Settings → Git → **disconnect** (or set "Ignored Build Step" to `exit 0`), then add the three secrets below. `.github/workflows/deploy.yml` deploys only when the **CI** workflow succeeded.

### Secrets for Option B (GitHub → Settings → Secrets and variables → Actions)

| Secret | Where to get it |
|---|---|
| `VERCEL_TOKEN` | vercel.com/account/tokens → Create (scope: your account/team) |
| `VERCEL_ORG_ID` | run `npx vercel link` locally once, then read `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | same file → `projectId` |

`.vercel/` is git-ignored; never commit it or the token.

## 2. CI/CD — what runs where

```
push / PR ──► .github/workflows/ci.yml  (job "check")
              npm ci → lint → typecheck → build → start server
              → test:content (banned claims, music order)
              → check:budget (≤150 KB JS per route)
              → test:e2e (Playwright: Chromium, WebKit/iPhone, Firefox; axe; JS-off; keyboard)
              → check:links (reported, non-blocking)
         CI success ──► .github/workflows/deploy.yml
              main → Vercel production · other branches → Vercel preview (URL in the run summary)
```

A red CI blocks deploys. Note: GitHub runs `workflow_run` workflows from the copy on the default branch, so the Deploy workflow starts working once this is merged into `main`. To reproduce CI locally: `npm run build && npx next start -p 3100` then the test commands above (`BASE_URL=http://localhost:3100` for the scripts).

## 3. Alternative: Netlify (where the old site lives)

1. Netlify → Add new site → Import from Git → this repo. Netlify detects Next.js and uses its Next.js runtime automatically. Build `npm run build`, publish dir handled by the runtime. Node 22 (`NODE_VERSION=22` env var).
2. Leave `NEXT_PUBLIC_ANALYTICS` unset (Vercel analytics don't work on Netlify).
3. Domains: Netlify → Domain management; set the `www` → apex redirect there.
4. For CI-gated deploys on Netlify, turn off auto-publishing and use `netlify deploy --prod` in a workflow (needs `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`), mirroring `deploy.yml`.

## 4. After every production deploy

- Open `/`, `/resume`, `/notesbyaryan`, one `/work/*` page on a phone (including inside the LinkedIn app).
- Old links still work: `/experience`, `/music`, `/contact`, `/resume.pdf`, `/Aryan_Resume.pdf` (redirects live in `next.config.ts`).
- LinkedIn Post Inspector on the homepage and one case study to refresh link previews.
- Lighthouse (mobile) on the live URL.

## 5. Rollback

- Vercel → Deployments → pick the last good one → **Promote to Production** (instant).
- Or `git revert <sha>` on `main`; CI + Deploy run again.

## 6. Updating content (no code knowledge needed)

| Change | Where |
|---|---|
| Any fact, metric, job, project | `content/*.ts` (typed; the build fails on schema errors) |
| A new song | `npm run add-cover -- --url … --title … --position n` (see `.claude/skills/add-song/SKILL.md`) |
| Resume PDFs | replace files in `public/resume/` (keep the names) |
| "Now" page | `app/now/page.tsx` (bump the date) |

Then push; CI checks it and deploys.
