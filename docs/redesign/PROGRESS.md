# PROGRESS — aryanjaiswal.in v3

Working copy: `~/Developer/Aryan_Jaiswal_Portfolio_V2`, cloned from `origin/main` @ `2477ccb` on 3 Nov 2026.
**Git:** per Aryan's instruction (3 Nov 2026), Claude Code does not branch, commit or push on this machine. Aryan reviews locally and commits/pushes from his other laptop. Each phase below lists what would have been its commit message.

Open-question answers were not supplied (prompt placeholder left as-is), so **all plan §9 defaults apply**, except where Aryan answered in chat on 3 Nov 2026 (see D-22 to D-25).

**Aryan's mid-build direction (3 Nov 2026):** don't handle deployment; the site must *not* read as "open to every role" (a hiring manager for any track should see a strong engineer, not a generalist); live screenshots are fine (links from the résumé context); footer is my call; Linux and Postman are real skills; the site should feel fluid with hover/click/colour interactions; dynamic rendering is fine.

---

## Phase 0 — Setup and baseline ✅

Suggested commit: `chore(redesign): phase 0 baseline, inventory and progress log`

### Baseline (live site, 3 Nov 2026)

Lighthouse 13 (local Chrome, headless) — `docs/redesign/baseline/lh-*.json`

| Route | Form | Perf | A11y | BP | SEO | LCP | TBT | CLS | Bytes |
|---|---|---|---|---|---|---|---|---|---|
| `/` | mobile | 46 | 95 | 96 | 100 | 5.1 s | 1,710 ms | 0 | 5.8 MB |
| `/` | desktop | 71 | 95 | 96 | 100 | 3.8 s | 200 ms | 0 | 5.8 MB |
| `/notesbyaryan` | mobile | 69 | 96 | 100 | 100 | 9.8 s | 280 ms | 0 | 1.8 MB |
| `/notesbyaryan` | desktop | 92 | 96 | 100 | 100 | 1.7 s | 10 ms | 0 | 1.8 MB |

`next build` (Next 14.2.10) — `baseline/next-build-old.txt`: `/` **378 kB** first-load JS (221 kB page + 87 kB shared), `/resume` 194 kB, `/notesbyaryan` 162 kB, `/projects` 158 kB, `/experience` 158 kB.

Screenshots: `baseline/<route>-<390|1440>-{fold,full}.png` for `/`, `/projects`, `/experience`, `/resume`, `/notesbyaryan`. (`/projects` at 390 never reached network-idle in 60 s; screenshot taken anyway.)

Observations: live site is served by **Netlify** (`cache-status: "Netlify Edge"`), not Vercel, despite `vercel.json`. See D-20.

### Checks
- `lib/music-ai.ts` and `lib/instagram.ts`: **unused** — the only import of either is `instagram.ts → ./music-ai` (type only). ✅
- No `.env*` tracked (`git ls-files | grep .env` empty). ✅
- Nothing user-visible changed (only `docs/` and `CLAUDE.md` added). ✅

### Inventory (keep / rewrite / delete)

| Path | Verdict | Note |
|---|---|---|
| `components/grid-globe.tsx`, `ui/globe.tsx`, `data/globe.json` | delete | template three-globe |
| `ui/canvas-reveal-effect.tsx`, `ui/background-gradient-animation.tsx`, `ui/spotlight.tsx`, `ui/text-generate-effect.tsx`, `ui/moving-borders.tsx`, `ui/3d-pin.tsx`, `ui/bento-grid.tsx`, `ui/infinite-moving-cards.tsx`, `ui/magic-button.tsx`, `ui/floating-nav.tsx` | delete | template DNA (§1.0) |
| `components/hero.tsx`, `grid.tsx`, `approach.tsx`, `experience.tsx`, `career-highlights.tsx`, `recent-projects.tsx` (unused), `footer.tsx` | delete → rewrite | replaced by v3 chapters |
| `components/resume.tsx` (548 lines) | delete → rewrite | `/resume` rendered from `content/` |
| `ui/scroll-reveal.tsx`, `ui/page-transition.tsx` (unused) | rewrite | idea kept, re-implemented in Phase 3 |
| `app/notesbyaryan/page.tsx` | rewrite | inline track array removed; data → `content/music.json` |
| `app/experience`, `app/projects`, `app/resume` | rewrite / redirect | `/experience` → `/#work` |
| `data/index.ts`, `data/performances.json`, `data/confetti.json` | delete | facts → `content/` |
| `lib/instagram.ts` | delete | dead (F15) |
| `lib/music-ai.ts` | move → `scripts/` | dead at runtime (F15) |
| `lib/utils.ts` | rewrite | small `cn` helper |
| `config/index.ts`, `cache/config.json`, `tailwind.config.ts`, `tailwind.d.ts`, `startup.sh` | delete | Tailwind v4 is CSS-first; Azure script |
| `Aryan_CV/` | delete | outdated LaTeX (F13) |
| `public/` (82 files, 14 MB) | mostly delete | keep `dp.jpg` (re-encoded); `farewell-performance.jpg` is byte-identical to `dp.jpg`; 31 files unreferenced; `Aryan_Resume.pdf`, `Aryan_CV.pdf` replaced by `public/resume/Aryan-Jaiswal-Resume.pdf` |

---

## Plan for Phases 0–2 (shared with Aryan before Phase 1)

**Phase 1 — Foundation:** Next 16.4 / React 19 / Tailwind 4 / `motion` / TS strict; remove three, R3F, globe, lottie, framer-motion, react-icons; delete every template component and asset; `globals.css` with light + dark tokens from DESIGN.md; root layout with skip link, translucent nav, `next-themes` (no flash), fonts (Instrument Sans/Serif, JetBrains Mono), `MotionConfig`/`LazyMotion`, Toaster; metadata, JSON-LD, sitemap, robots, OG image, icons, 404, error boundary, redirects; README; Playwright harness (screens + no-flash + axe).

**Phase 2 — Content and static layout:** typed + Zod-validated `content/` with role tags; every homepage chapter server-rendered, role via `?role=` (links, no JS needed); `/projects`, `/resume` (+ print CSS), `/notesbyaryan` (26 songs, generated `CoverArt`, filters, track sheet via `<dialog>` / click-to-load embed), `content/music.json` + `npm run add-cover`, Recruiter Mode (`?mode=resume`), 5 `/work/[slug]` pages (text), "Never publish" test, product screenshots where a live site exists.

---

## Phase 1 — Foundation ✅

Suggested commit: `feat(redesign): phase 1 foundation — Next 16, Tailwind 4, tokens, theme, SEO, test harness`

Shipped
- Next **16.4.4** (Turbopack), React 19.3, TypeScript strict, Tailwind **4.3** (`@theme inline` + `[data-theme]` tokens), ESLint 9 flat config, `next-themes` 0.4.6.
- Removed: three, @react-three/*, three-globe, lottie-react, framer-motion, react-icons, mini-svg-data-uri, tailwindcss-animate, tailwind-merge, every template component, `Aryan_CV/`, `startup.sh`, `config/`, `cache/`, `data/`, old PDFs. `/public` 14 MB → **0.5 MB**.
- `app/globals.css`: light + dark tokens from DESIGN.md, motion tokens, buttons/links/focus, print styles.
- Root layout: skip link, translucent sticky nav (hairline appears on scroll via CSS scroll timeline), `ThemeProvider` (system + toggle, no flash), theme-color sync on toggle, Instrument Sans / Instrument Serif / JetBrains Mono, footer.
- Theme toggle with a circular View Transition reveal from the button; instant with reduced motion.
- SEO: metadata + title template, canonical, OpenGraph/Twitter, JSON-LD Person, `sitemap.ts`, `robots.ts`, `manifest.ts`, SVG "aj" icon + 180px apple icon, light OG images (Instrument Sans via `next/og`).
- 404 ("didn't make it to production" build log), error boundary, redirects (`/experience`, `/music`, `/contact`, `/resume.pdf`, `/Aryan_Resume.pdf`).
- Playwright harness: screens, theme (no-flash before hydration, persistence, live OS change, labelled toggle), axe.

Checks
| AC | Result |
|---|---|
| Build passes | ✅ |
| Placeholder home in both themes, no flash | ✅ 4/4 theme tests (JS chunks blocked → `data-theme` and body colour already correct) |
| Lighthouse SEO 100 | ✅ mobile: Perf 100 · A11y 100 · BP 96 (only a prefetch 404 for `/colophon`, added in Phase 2) · SEO 100 |
| `grep -ri "aceternity\|spotlight\|moving-border\|3d-pin\|globe"` in app code | ✅ nothing found |
| Screens | `screens/phase-1/` 390/1440 × light/dark + reduced motion, reviewed |

---

## Phase 2 — Content and static layout ✅ (ready to ship)

Suggested commit: `feat(redesign): phase 2 content, homepage chapters, music, résumé, case studies`

Shipped
- `content/`: `schema.ts` (Zod), `profile`, `roles`, `highlights`, `experience`, `projects`, `caseStudies`, `specs`, `recognition`, `ship`, `music.json` (26 songs) + `music.ts` (validated at build).
- Homepage (server-rendered; `?role=` re-orders proof server-side, no flash): hero with "Hi" greeting tooltip (5 scripts with `lang`), status pill, magnetic résumé CTA, copy email → highlights (scope notes always visible) → Exotel experience with promotion connector + "Earlier" disclosure → **How I ship** (stacked on mobile / reduced motion / JS off; sticky story with swapping artifacts on desktop) → 5 work tiles (designed title cards for Exotel work, real screenshots for AURA and The Wedding Home) → more projects (cursor-follow preview on fine pointers) → Tech Specs (CSS `:has()` cross-highlights where each tool was used) → recognition → off the clock (3 pinned covers) → contact.
- `/projects` archive table (filter by link, works with JS off), `/resume` (sticky PDF/copy/print bar, print CSS), Recruiter Mode `/?mode=resume` + `R` shortcut, `/work/[slug]` × 5 with build logs, results with scope notes, diagram lanes, prev/next, reading-progress bar, per-slug OG image, `/colophon` placeholder.
- `/notesbyaryan`: all 26 songs in Aryan's order, generated `CoverArt` (6-colour light/dark palette by title hash, waveform signature, shared hover animation), filters (All/Hindi/English/Live) + sort (picks/newest) as keyboard radiogroups, track sheet (`<dialog>`), click-to-load Instagram embed, now-playing bar.
- `npm run add-cover` (URL normalisation, date decoded from the reel code, duplicate rejection, `--position`, Zod), `npm run test:content`, `npm run check:links`.
- Product screenshots (1440×900 @2x → WebP 1600w): The Wedding Home, AURA, Myriox, LEELA.

Checks (local production build, 3 Nov 2026)
| AC | Result |
|---|---|
| Facts match CONTENT.md; "Never publish" test | ✅ `test:content`: 18 routes × 31 banned patterns, 6 item-scoped checks, 26 songs in CONTENT order |
| Lighthouse mobile ≥ 95 (all four) | ✅ `/` 100/100/100/100 · `/notesbyaryan` 100/100/100/100 · `/projects` 100/100/100/100 · `/resume` 100/100/100/100 · `/work/argus-autoloop` 100/100/100/100 (LCP 0.8–0.9 s, CLS 0) |
| axe clean in both themes | ✅ 9 routes × 2 themes (incl. `?role=backend`, `?mode=resume`, 404) |
| Homepage JS ≤ 150 KB gz | ✅ 146.5 KB (was 378 KB). `/notesbyaryan` 149.5, `/work/*` 146.6, `/resume` 143.3, `/projects` 141.1 |
| JS off, keyboard, no third-party before "Load video", 320 px no h-scroll | ✅ `tests/smoke.spec.ts` 6/6 |
| Links | ✅ 94 links across 11 routes; LinkedIn (999) and LeetCode (403) block bots — verify by hand |
| 390/1440 light + dark (+ reduced motion) screenshots reviewed | ✅ `screens/phase-2/` (90 files) |

Fixed after looking at the screenshots: Highlights cards top-aligned and number no longer wraps at 390; tile tags invisible on tile surface; wide Argus tile now side-by-side; project-row dividers; widowed words (`text-wrap: pretty`); stacked "How I ship" uses two columns on desktop; sticky artifact panel re-centred; `/projects` 320px overflow from absolutely positioned sr-only text; cover meta contrast; music LCP (served the 12 KB avatar directly).

### Open items for Aryan (TODO(aryan) in code)
- Q7 Joveo exact dates (shows "2025").
- Q16 original artists for 14 songs (artist line hidden until filled) and #10 "Aawara Angaara" artist confirmation (shown as in old data).
- "What I'd do differently" for Argus and Production infra are CONTENT.md drafts — please confirm. The Wedding Home has none yet; team size unknown.
- No-phone SDE and AI/FDE résumé PDFs (D-21).
- `aryan.jpg` is a stage photo from the farewell; a non-stage headshot for Contact/OG would be better if you have one.
- Screenshots folders are large (`screens/` 27 MB, `baseline/` 11 MB); delete or gitignore the `*-full.png` files if you don't want them in history.

---

## Phase 3 — Signature interactions + Aryan's feedback ✅

Suggested commit: `feat(redesign): phase 3 — expressive layer, ⌘K, terminal, music cards, Argus/AutoLoop detail`

Aryan's feedback (3 Nov 2026) and what changed
| Ask | Done |
|---|---|
| "Resume has a comma over it" (the é accent) | All UI copy now says **Resume** |
| Header "dp" and music photo look off | New SVG mark: a `>_` terminal prompt on a blue squircle with a blinking caret (header, favicon `app/icon.svg`, apple-icon, OG). Music avatar is now a **spinning vinyl** with his photo as the label (sharper 480px crop from the original 2335×4160) and a tonearm that drops on hover |
| Colour effect when reading + hover highlight | Stronger blue text selection; a **highlighter** sweeps under key phrases as they scroll in (CSS view timeline); a **cursor-following glow border** on cards (highlights, Exotel, tiles, recognition, contact, terminal, song cards, music chips) |
| Old music page copy | Name, MUSICIAN • SINGER • DREAMER, the quote, Hindi line ✨, "Follow the journey @notesbyaryan", "Currently vibing to Tum Ho Toh • Saiyaara", "♪ LATEST DROPS ♪ / From My Heart to Your Soul"; title letters bounce in; floating ♪♫♬ |
| Rich cards + direct Instagram button | Every card: his Hindi line, title, description, ✦ vibe (emoji kept), artist · date · place, **Watch on Instagram →** (direct) and **▶ Play here** (sheet with click-to-load embed). Notes float and the waveform dances on hover. 15 old captions restored from the previous site |
| A skill to add songs | `.claude/skills/add-song/SKILL.md` + `npm run add-cover -- --url … --title … --position n --line … --description … --vibe …` (date decoded from the reel; content check now allows new songs anywhere while keeping the original 26 in order) |
| More expressive, techy side visible | Engineering grid in the hero with a cursor spotlight; a **terminal** that types real facts; **count-up numbers** in highlights; **brand icons** in Tech Specs (simple-icons, monochrome, brand tint on hover); **⌘K palette** (lazy-loaded, terminal-style); **debug mode** (type `ship` or the Konami code); build hash in the footer |
| AutoLoop steps + ownership | Argus/AutoLoop case study rewritten from the 3 Nov detail sheet: Argus internals, build loop (his steps: requirements.md → eval-suite scenarios → baseline + 4 prompt techniques in chat sims, lock the winner → iterate → voice sims → real calls), the 7-stage improve loop (Evaluate → Investigate → Recommend → human approval → Apply → Verify → Compare → Journey), the May 2026 incident as a fail/fix build log, 514 commits · 79 merged PRs. Ownership states he built all of it (D-30) |

Checks (local production build)
| AC | Result |
|---|---|
| Playwright (smoke, JS-off, keyboard, music sheet, 320px, theme, axe 9 routes × 2 themes) | ✅ 34/34 |
| Content guard | ✅ |
| Lighthouse mobile `/`, `/notesbyaryan`, `/work/argus-autoloop` | ✅ 100/100/100/100 each (LCP 0.9–1.2 s, CLS 0) |
| Homepage JS ≤ 150 KB gz | ✅ 148.0 KB (⌘K palette is code-split; loads on first open) |
| Screens | `screens/phase-3/` (standard set + hover/palette/terminal captures), reviewed |

Fixed after review: ⌘K pill and mobile search icon both visible on desktop (custom `display` beat `md:hidden`); vinyl label enlarged; palette input focus box.

Open for Aryan
- AutoLoop: confirm whether your own "7 steps" list continues differently from the documented 7 stages (steps 4–7).
- "Currently vibing to" is hard-coded in `content/music.ts` (update when it changes).
- Resume PDFs/LaTeX not changed: the current bullets don't contradict the ownership correction, and Tectonic (the resume build tool) isn't installed on this machine.

---

## Phase 4 — Case studies ✅

Suggested commit: `feat(redesign): phase 4 — case-study template, stage diagrams, build logs, tile→hero morph`

Shipped
- **Template (F5):** reading time + TL;DR box at the top (every study readable in under a minute; full read 1–3 min), meta table, hero visual, "How it fits together" diagram, sections, build logs, result cards (count-up numbers with scope notes), ownership line, what I'd do differently, stack, prev/next, reading-progress bar, sticky "On this page" rail with the active section (≥1280px).
- **Stage diagrams** for all 5 studies (new for Production infra and The Wedding Home; Integrations gains the campaign cycle). Nodes light up in sequence as the diagram scrolls through view; the human-approval gate is drawn dashed.
- **Build logs (I18):** pass / fail / fix / step chips; steps tied to a diagram node show it, hovering or focusing a step turns that node blue (CSS `:has()`, works before hydration), and clicking a node jumps to its first step.
- **View Transition (React 19.3 `<ViewTransition share="morph">`):** a work tile's visual morphs into the case-study hero on navigation; browsers without support navigate normally. The theme toggle's circular reveal is now scoped to theme changes so it never plays on navigation.
- Per-slug OG images (from Phase 2) unchanged.

Checks
| AC | Result |
|---|---|
| Readable in < 3 min | ✅ TL;DR on every study; full reading time 1–3 min (Argus 3, others 1) |
| Every number traceable | ✅ CONTENT.md §5 + the 3 Nov Argus/AutoLoop detail sheet (noted in CONTENT.md §5.1); content guard passes |
| Lighthouse ≥ 95 | ✅ all 5 studies 100/100/100/100 mobile (LCP 0.9 s, CLS 0) |
| axe both themes | ✅ now covers all 5 studies (26/26) |
| View Transition degrades cleanly | ✅ `startViewTransition` invoked on tile click in Chromium, no console errors; plain navigation elsewhere |
| JS budget | ✅ `/` 148.0 KB, `/work/*` 148.1 KB |
| Tests / links | ✅ Playwright all green; 94 links (LeetCode/LinkedIn block bots) |
| Screens | `screens/phase-4/` 5 studies × 390/1440 × light/dark (+ reduced motion), reviewed |

Fixed after review: build-log headings were lower-cased ("feb – may"); Exotel case-study heroes had a tall empty box; axe could catch the music heading mid-fade (test now waits 400 ms).

---

## Phase 5 — Micro-interactions and fun ✅

Suggested commit: `feat(redesign): phase 5 — interaction catalog pass, colophon, 404 search, interaction tests`

### Catalog verification (DESIGN.md §8) — `tests/interactions.spec.ts` + earlier suites

| # | Element | Hover | Focus / keyboard | Touch | Reduced motion | Both themes | Status |
|---|---|---|---|---|---|---|---|
| I1 | Hero role word | — | — | — | — | — | Hidden by D-22 (URL-only tailoring) |
| I2 | "Hi" greeting | tooltip cycles | focus shows ✅ test | tap pins ✅ test | static list | ✅ | ✅ |
| I3 | Download resume | magnet ≤6px, arrow nudge | ring, Enter downloads | press 0.97 | no magnet | ✅ | ✅ |
| I4 | Links "›" | underline + chevron slide | chevron slides on focus | — | no slide | ✅ | ✅ |
| I5 | Status pill | pulse quickens + tooltip | tooltip on focus ✅ test (was `title` only) | tap → Contact | no pulse ✅ test | ✅ | ✅ fixed |
| I6 | Role Lens | — | — | — | — | — | Hidden by D-22 |
| I7 | Highlights | lift + blue number | focus emphasises | tap pins ✅ test; notes always visible | count-up skipped | ✅ | ✅ |
| I8 | Experience bullets | blue bar | same on link focus ✅ test (was missing) | case-study link always visible | — | ✅ | ✅ fixed |
| I9 | How I ship | — | step titles are buttons | stacked | stacked | ✅ | ✅ |
| I10 | Work tiles | zoom 1.03 + chevron + glow | same via `:has(:focus-visible)` | link | no scale | ✅ | ✅ + morph |
| I11 | More projects | row tint + cursor preview | preview docks beside focused row ✅ test (was missing) | inline links | static | ✅ | ✅ fixed |
| I12 | Tech Specs | lights places + brand tint | focus lights ✅ test; Esc clears ✅ test (was missing) | tap pins ✅ test (was missing) | no sweep | ✅ | ✅ fixed |
| I13 | Recognition | lift + ↗ | lift on focus | links visible | — | ✅ | ✅ |
| I14 | ⌘K palette | — | ⌘K / Ctrl+K / "/" / button; ↑↓ ↵; Esc restores focus ✅ test | search icon → bottom sheet ✅ test | fade | ✅ test both | ✅ (fixed an Esc→⌘K race) |
| I15 | Theme toggle | icon rotates 15° | Enter toggles ✅ test, aria-label | tap | instant | ✅ | ✅ |
| I16 | Resume view | tooltip | tooltip on focus (was `title` only); `R` shortcut ✅ test | tap | — | ✅ | ✅ fixed |
| I17 | Copy email | — | toast `role=status` ✅ test, now with exit | tap | fade | ✅ | ✅ fixed |
| I18 | Build log ↔ diagram | step lights node | node click → step + node lit ✅ test | tap node | static lit | ✅ | ✅ |
| I19 | Music cards | lift, notes rise, bars dance | play/watch buttons focusable | buttons visible | static ✅ test | ✅ | ✅ |
| I20 | Now-playing bar | controls tint | keyboard controls | tap | no equalizer | ✅ | ✅ |
| I21 | Debug mode | — | type `ship` / Konami ✅ test; Esc exits | — | static | ✅ | ✅ |

Global checks: no `transition: all` and no `ease-in` in the shipped CSS (✅ test); nothing hover-only (status/Resume-view tooltips were the last `title`-only info); looping animations pause offscreen (✅ test).

### Animation review (emil-design-eng checklist)

| Before | After | Why |
|---|---|---|
| Toast vanished instantly | 160 ms fade/drop exit (enter 240 ms) | Exits ~30% faster than enters, never abrupt |
| Cards had hover lift but no press | `:active` translate −1px + scale 0.99 (120 ms) | Press feedback on everything clickable |
| Status / Resume-view tips were `title` attributes | CSS tooltip on hover (300 ms delay) and instant on keyboard focus | Nothing hover-only; delay avoids flicker on pass-through |
| Highlight cards carried per-item `animation-delay` | Removed | Delays are meaningless on scroll-driven timelines |
| Hero pulse, vinyl, floating notes, equalizers ran offscreen | Paused via IntersectionObserver (`data-paused`) | DESIGN.md §7 rule 10: no background work |
| Theme reveal CSS applied to every view transition | Scoped to `.theme-vt` | Route morphs must not inherit the theme wipe |
| ⌘K toggled from React state | Decides from the DOM (`dialog[open]`) | Esc → ⌘K in quick succession closed it again |
| Durations audited | UI 120–260 ms; longer only for the hero entrance, scroll stories, tile zoom (Apple 400 ms) and decorative loops | Matches DESIGN.md §7 |

### Pages
- `/colophon`: measured numbers (Lighthouse 100, 148 KB JS, LCP 0.9 s, CLS 0, /public 0.56 MB, 59 tests), stack, decisions, changelog v1→v3, credits.
- 404: added "Search the site ⌘K" (opens the palette via an `open-palette` event).
- `/now`: **not built**: it needs Aryan's own words on what he's working on and learning (plan marks it optional).

### Checks
| AC | Result |
|---|---|
| Every catalog item verified (hover, focus, touch, reduced motion, both themes) | ✅ table above; 23 new interaction tests |
| No `transition: all`; nothing hover-only | ✅ |
| Full Playwright suite | ✅ 59/59 (excluding screenshot jobs) |
| Lighthouse mobile `/`, `/colophon` | ✅ 100/100/100/100 |
| JS budget | ✅ `/` 148.7 KB |
| Screens | `screens/phase-5/` (colophon, 404, home), reviewed |

---

## Phase 6 — QA and launch prep ✅

Suggested commit: `chore(redesign): phase 6 QA — cross-browser tests, CI, budget check, launch checklist`

### Results
| Check | Result |
|---|---|
| Playwright, every suite × Chromium + WebKit (iPhone 13) + Firefox | ✅ 85/85, twice in a row; ⌘K test 20/20 under repeat |
| Screens: 12 routes × 390 / 768 / 1440 × light / dark (+ reduced motion) | ✅ 180 shots in `screens/phase-6/`, reviewed; + Firefox / Safari-iPhone renders in `screens/phase-6/browsers/` |
| Keyboard journey ⌘K → case study → contact | ✅ all three browsers (`tests/journey.spec.ts`) |
| JS off (`/`, `/?mode=resume`), no-theme-flash, reduced motion | ✅ all three browsers |
| axe WCAG 2.2 AA, every route × both themes | ✅ |
| Lighthouse mobile, all 12 scorable routes | ✅ 100/100/100/100 (one cold first run at 99, re-runs 100 ×3) |
| First-load JS (new `npm run check:budget`) | ✅ 142.3–148.7 KB gz |
| Links | ✅ 94; LinkedIn (999) and LeetCode (403) block bots |
| Content vs `resume_master.tex` + claim ledger | ✅ titles, dates, CGPA, ranks, metrics match; no phone number anywhere |
| Print `/resume` (from dark mode) | ✅ light, A4, URLs printed (`screens/phase-6/print/`) |
| OG images | ✅ home, notesbyaryan, 5 studies |
| Gap checklist (plan §10) | ✅ ticked; open items are Aryan's (Post Inspector, www→apex, analytics + `?ref=` on the live site, LinkedIn/GitHub/Naukri headlines) |

### Fixed during QA
- **Anchor links landed short** (e.g. ⌘K → Contact from a case study): How I ship switched to its sticky layout *after* hydration, changing page height mid-scroll. The layout is now decided by CSS (`html.js` + media query), so hydration never changes height.
- **768 px:** highlight numbers overflowed (font now scales with the card); `/projects` table clipped (Stack column folds under the name below 1024 px).
- **⌘K race** when Esc and ⌘K are pressed in quick succession (dialog closed natively before React heard): reopen the mounted dialog; ignore the late close event. Palette chunk now pre-warms on idle so the first ⌘K is instant.
- **OG title weight:** Satori was given a variable font and rendered 400; now a static Instrument Sans 600 TTF.
- **/projects axe:** case-study name links underlined (link-in-text-block).
- **Vinyl:** removed the spindle dot that sat on the face.
- WebKit has no Playwright clipboard permission; that grant is now Chromium-only (the component already falls back to `execCommand`).

### Added
- `.github/workflows/ci.yml`: lint, typecheck, build, content guard, JS budget, Playwright on 3 browsers, link check (non-blocking). Runs once pushed.
- `scripts/check-budget.mjs` (`npm run check:budget`).
- `docs/redesign/LAUNCH.md`: merge, deploy, post-deploy and "only you" checklist.
- `.gitignore`: full-page screenshots and print PDFs (screens folder is ~124 MB with them).

### Not verifiable here
- The real LinkedIn in-app browser (proxied by WebKit/iPhone 13; check on a phone after deploy).
- LinkedIn / Naukri / GitHub profile text (needs your login).
- Analytics and `?ref=` (off until deployed with `NEXT_PUBLIC_ANALYTICS=vercel`).

---

## Follow-ups from Aryan (3 Nov 2026, after Phase 6) ✅

| Ask | Done |
|---|---|
| AutoLoop from the detail sheet | Kept as built: build loop (his steps) + the 7 documented stages; open question removed |
| "Rest, see what's best" | Finalised the Argus and infra "What I'd do differently"; wrote one for The Wedding Home (grounded in its facts); removed remaining TODO(aryan) markers; added `/now` (facts only, dated) and linked it from the footer and ⌘K |
| Phone in the resumes | All three PDFs (general, SDE, AI/FDE) now come from `Aryan_Resume_Context/output/pdf` (2 Nov build, with phone). `?role=` downloads the matching variant. HTML pages still don't print the number (D-36) |
| Deploy + CI/CD for "another AI" | `AGENTS.md` (agent entry point), `docs/DEPLOY.md` (Vercel/Netlify, DNS, secrets, CI/CD diagram, rollback, content updates), `.github/workflows/deploy.yml` (deploys after CI: prod on `main`, preview elsewhere; skips cleanly without secrets). CLAUDE.md, README and LAUNCH.md point to them |
| Joveo dates | "Oct 2025 · 2 weeks" (10–15 days); claim ledger, EXPERIENCE.md and GAP_REPORT.md updated |
| Song artists + captions | All 26 have an artist; 11 new songs got a Hindi line, description and vibe in his style (original lines, not lyrics). "Mere Nisha" renamed **Mere Nishaan** (the OMG song) |
| Reel preview on click | "Play here" now opens the sheet with the Instagram reel embedded immediately (no extra "Load video"); still nothing from Instagram before a song is opened |

Artist sources (web search, 3 Nov 2026) — **confirmed**: Barbaad → Jubin Nautiyal (Saiyaara, [Wikipedia](https://en.wikipedia.org/wiki/Saiyaara_(soundtrack))); Haal-e-Dil → Harshit Saxena (Murder 2, [Wikipedia](https://en.wikipedia.org/wiki/Harshit_Saxena)); Qaayde Se → Papon (Metro… In Dino, [Wikipedia](https://en.wikipedia.org/wiki/Metro..._In_Dino_(soundtrack))); Mainu Ishq Tera Le Dooba → Sunidhi Chauhan ("Lae Dooba", Aiyaary); Aawara Angaara → Faheem Abdullah (Tere Ishk Mein); Mere Nishaan → Kailash Kher (OMG, [Wikipedia](https://en.wikipedia.org/wiki/List_of_songs_recorded_by_Kailash_Kher)). **Well known**: Main Hoon Saath Tere → Arijit Singh; Tum Se Hi → Mohit Chauhan; Kyun Main Jaagoon → Shafqat Amanat Ali; Jiyein Kyun → Papon; Until I Found You → Stephen Sanchez. **Best guesses (please confirm)**: Aankhein Teri → Arijit Singh ("Raaz Aankhein Teri"); Tera Chehra → Arijit Singh (Sanam Teri Kasam; Adnan Sami also has one); Tose Naina → Arijit Singh (Mickey Virus; "Tose Naina Laage" is a different song); Sitaarein → Arijit Singh ("Sitaare", Ikkis); Mere Nishaan title itself.

Checks: Playwright 87/87 on Chromium + WebKit + Firefox (incl. `/now` axe), content guard ✅, budget ✅ (142–149 KB), 97 links ✅. Screens: `screens/phase-7/`.

---

## Round 2 feedback from Aryan (3 Nov 2026) ✅

| Ask | Done |
|---|---|
| Song corrections | Aankhein Teri → Roop Kumar Rathod ("Maula Mere Maula", Anwar); Tera Chehra (Arijit) and Sitaare (Arijit) confirmed; Tose Naina → Arijit Singh (the "jab se mile" song); Mere Nishaan → Darshan Raval. Captions adjusted to match |
| Vinyl: keep the disk + hover, no DP, click plays Aankhein Teri | Label is now an SVG (blue label, "NOTESBYARYAN • I SING WHAT I CAN'T EXPRESS" around the edge, waveform that dances on hover/focus). Clicking the record opens Aankhein Teri's sheet with the reel loaded (`play-song` event; `musicCopy.featuredCode`). A "▶ Aankhein Teri" hint shows on hover/focus/touch. No-JS: links to the reel |
| Bright homepages for Wedding Home / AURA clash | Designed SVG visuals in site tokens: AURA = orchestrator fanning out to five agents + the 6 MCP finance tools; Wedding Home = function tabs, guest list with RSVP states, QR gallery, CI strip. Used on tiles and case-study heroes; the real screenshot moved into each case study as "The live site" |
| Drop weak projects; reorder | Homepage: Career Navigator, Myriox, Cognitive-OS, DevTinder, LEELA, Digit Motor. Raya Pay and Null removed site-wide; archive keeps fi-mcp-server, HireForge, FreelanceGuard, MSA website, Plant Disease Classification |
| Paragraph hover highlight | `.hl-read`: the paragraph/bullet under the pointer gets a soft blue wash + bar (case studies, resume, colophon, /now); experience bullets now use the same stronger wash; the scroll highlighter under key phrases is bolder |
| Commits / numbers / terminal | Terminal no longer names the employer (`aryan@macbook`, whoami without Exotel); commits shown as "500+ · 79 merged PRs" (514 in Feb–May per git log, more since). 7 production voice agents kept (no newer count supplied) |
| "Go through everything; add what's missing" | Added an Education card to the homepage (IIIT Dharwad, CGPA, coursework from the resume, MSA chapter). Chapter renamed "Experience & education" |

Fixed after review: 320 px overflow (new Wedding chips didn't wrap; highlight numbers; reading-highlight pseudo-element at the screen edge); project preview card could appear at the top-left when a row scrolled under a still mouse; two test timing flakes (hydration wait, focus wait).

Checks: Playwright 87/87 twice (Chromium, WebKit/iPhone, Firefox), content guard ✅, budget ✅ (≤148.7 KB), screens in `screens/phase-8/`.

---

## QA pass + record player (3 Nov 2026) ✅

**Number audit.** Extracted all 285 numeric fragments from every rendered page (`tests/tools/numbers.mjs`) and checked each against CONTENT.md, the claim ledger, `resume_master.tex` and the 3 Nov Argus/AutoLoop sheet. Fixed:
- How I ship → Test card showed "local 14-scenario regression ~1 min ✓ passed". The source only gives a run time (~1 min local vs ~20 min remote) and the ledger warns other suites had failures, so the row is now a neutral measurement, not a pass.
- "16 skills" (experience) vs "20+ agent skills" (case study): both true per the sheet; the case study now says "20+ in all; 16 call the platform's REST APIs".
- Colophon: /public 0.64 MB (three PDFs), 90 Playwright checks across three browsers.
- Known source discrepancies kept as-is and noted: Gemini tools 16 (sheet, used on site) vs 17 (older CONTENT.md, not used); simulation metrics 6 of 23 (ledger, used) vs 24 (sheet).

**QA sweep** (`tests/tools/qa-sweep.mjs`, 14 routes × 2 themes): no console errors, no failed requests, every image has alt text and loads, unique ids, one h1 per page, every page has title/description/canonical/OG. Fixed: Resume-view title now "Resume view · Aryan Jaiswal"; 404 is `noindex`; /resume date format matches the rest.

**Header glass.** Confirmed in both themes: translucent `--bg` at 72% with Apple's `saturate(180%) blur(20px)`, hairline after scrolling; content (song cards, tiles) blurs through in dark and light. No change needed.

**Record player (Aryan's request).** The record on /notesbyaryan now plays the song on the page when an audio file is set: click plays, click again pauses, it stops and resets at the end (no loop); needle drops onto the record, faster spin, progress ring, "❚❚ Pause" label, live-region announcement. No Instagram request at all. Verified in Chromium and WebKit with a temporary test tone (removed). Instagram can't be streamed by other sites, so Aryan needs to drop his own audio file into `public/audio/` and add `"audio"` to the song (see `public/audio/README.md`); until then the record opens the song's sheet as before.

Also fixed: closing the song sheet or ⌘K could steal focus back a moment later after the visitor had moved on (focus is now restored only if it's still on the page body or inside the closed dialog).

Checks: Playwright 90/90 twice (Chromium, WebKit/iPhone, Firefox); content guard ✅; budget ✅ (≤148.7 KB); Lighthouse 100/100/100/100 on `/`, `/notesbyaryan`, `/work/argus-autoloop`, `/colophon`.

---

## Record plays Aankhein Teri (3 Nov 2026) ✅
Aryan supplied `aankhein_teri.mp3` (25.6 s, 128 kbps, 400 KB; tags clean: encoder info only). Copied to `public/audio/aankhein-teri.mp3` and set as that song's `audio`. Verified in Chromium, WebKit and Firefox: click plays on the page, click pauses, it stops and resets at the end; no Instagram requests. Playwright 90/90.

---

## Contact photo from X (3 Nov 2026) ✅
At Aryan's request the "Let's talk" avatar is now his X profile picture (@Aryanjstar), fetched from X's own image CDN (pbs.twimg.com, 400×400, the largest X keeps), cropped around the face to `public/aryan-x.jpg` (240 px, 14 KB) with a theme-aware ring. JSON-LD `image` points to it. The old stage-photo crops (`aryan.jpg`, `aryan-face.jpg`) were removed; the homepage "Off the clock" photo (`aryan-720.webp`) stays. Colophon /public updated to 0.81 MB. Playwright 90/90.

---

## Skills + live-site links (3 Nov 2026) ✅
- Tech Specs → AI / LLM: added **LangChain** and **Langflow** (Aryan confirmed; "Daily driver" until a project is named) and **n8n** (used at Joveo). LangGraph now uses its own icon. Recorded in the claim ledger.
- Links: on /projects a **blue project name opens the live site** (AURA, The Wedding Home, Myriox, LEELA, MSA website); the Links column keeps the same plain style for all (Case study ›, Live ↗, GitHub ↗, Demo ↗). Homepage tiles show "Read case study ›  Live site ↗" in the same link style (whole card still opens the case study). Case-study pages have Visit live site / GitHub / Watch demo buttons at the top. A short pill style was tried and reverted at Aryan's request.
- MSA IIIT Dharwad website dated 2025 (Aryan).
- Re-verified: Playwright 90/90 (3 browsers), content guard, budget (≤148.7 KB), 88 links, QA sweep clean in both themes.

## Profile-overhaul cross-check + iPhone 17 Pro QA (3 Nov 2026) ✅

- Read every file in `Profile_overhaul_2026-11-03.zip` (README, before/after, sources, Aryan's messages in the transcript, LinkedIn running log, Argus/AutoLoop sheet, old + new resume PDFs, resume source). Kept it out of both repos (internal hosts, customer names, salaries).
- **Kinetic Green → 150K lead entries** (Aryan, 3 Nov: ~50K more leads). Updated the experience bullet, the highlight, the enterprise-integrations TL;DR and result, CONTENT.md, the claim ledger, the three resume `.tex` sources + validator; rebuilt and validated all three PDFs (1 page, A4, 21 links) and copied them to `public/resume/`. The cycle count is no longer stated.
- Added from the overhaul (ledger-compatible): Myriox badge "Top 50 of 2,989 · OpenAI × NamasteDev hackathon" (self-reported); Gold Startup Scout (8 startup referrals) on the Gold MSA row.
- **Not adopted, flagged for Aryan** (the new resume/LinkedIn say them; the ledger rejects or can't support them): 14+ production agents in 4 languages (ledger: 7, SBI excluded), "~75% less prompt-tuning effort" (ledger: simulation-cost only), "8x / 1,024 connections" (ledger: 8 workers, not a capacity multiple), "Bawa in 2 days, 260/260 + 100/100" (ledger: 313/313 + 114/114 staging, cutover Nov 2), naming customers (SBI Cap, ICICI…).
- QA: new Playwright project `webkit-iphone17pro` (402×874, 3x, touch) running smoke, theme, journey, interactions and axe; new `tests/tools/device-sweep.mjs` (14 routes × 320–1920 × light/dark × WebKit + Chromium: overflow, console errors, broken images, 24 px tap targets on phones).
- Fixed: the "How I ship" code block scrolled sideways on phones but wasn't keyboard-reachable (now focusable, labelled); small text links / footer links / the "Hi" button now have ≥24 px touch targets via padding + negative margin under `pointer: coarse` (no layout shift); `/projects` table stacks into rows below 768 px instead of clipping "What it does"; journey and copy-email tests wait for hydration; clipboard permission granted only on Chromium.
- Checked on iPhone 17 Pro WebKit, both themes: tapping the record plays Aankhein Teri (no popup), second tap pauses; menu, theme toggle, ⌘K journey, copy-email toast; highlights settle at 150K. Headless WebKit screenshots don't paint `backdrop-filter`; the computed style confirms the glass header blur is applied.

## Decisions log additions (mirrored into the plan §8)
- **D-20 (3 Nov 2026)** — Host-agnostic build. The live site is on Netlify, the plan says Vercel. Analytics (`@vercel/analytics` + Speed Insights) render only when `NEXT_PUBLIC_ANALYTICS=vercel`, so a Netlify deploy doesn't 404 the insights script. `vercel.json` kept; `startup.sh` (Azure) deleted. Aryan picks the host (Q10).
- **D-21 (3 Nov 2026)** — Only the general public (no-phone) résumé PDF exists. The SDE and AI-FDE PDFs in the context repo carry the phone number (Block A). Per Q1 default, every lens links the general PDF until no-phone SDE / AI-FDE variants are added at `public/resume/Aryan-Jaiswal-Resume-SDE.pdf` / `-AI-FDE.pdf`; the role → PDF map is in `content/roles.ts` behind a single `available` flag.
- **D-22 (3 Nov 2026, Aryan)** — No visible list of tracks. The 8-segment Role Lens and the click-to-cycle hero role word are **not** shown; tailoring stays URL-only (`?role=`), with a small "Showing backend work first · show everything" note. Status copy: "Open to new roles · Bangalore or remote"; contact copy drops the role list. Reason: a hiring manager for any track should see depth, not "I'll take anything".
- **D-23 (3 Nov 2026)** — Myriox and LEELA get Live links from their own GitHub homepage fields (both answered 200). DevTinder/Cognitive-OS hosts timed out; AI Career Navigator's homepage is a backend (403) — no Live link. AURA live = `aura-finance-ai-in.azurewebsites.net` (the other URL returns 403).
- **D-24 (3 Nov 2026)** — Motion is CSS-first (scroll-driven reveals, View Transitions, keyframes); the `motion` package was removed because nothing needed it and it costs bundle. Interactions Aryan asked for (hover/press/colour) are in Phase 2 rather than waiting for Phase 3.
- **D-25 (3 Nov 2026)** — Highlights scope notes are always visible (hover/focus/tap emphasise them) instead of hover-only: honest at a glance, no empty cards on desktop.
- **D-26 (3 Nov 2026)** — Role highlight no longer dims non-matching items to 65%: that fails WCAG contrast. Matches get the blue wash + bar only.
- **D-27 (3 Nov 2026)** — Owned 30-line toast (`lib/toast.ts`) replaces sonner, and the homepage uses a server `<img>` for pre-optimized assets, to bring homepage JS from 161 KB to 146.5 KB.
- **D-28 (3 Nov 2026)** — Homepage and `/projects` render per request (they read `searchParams`) so `?role=` is server-tailored; everything else is static. Linux and Postman listed as "Daily driver" (Aryan confirmed use; no specific project attached).
- **D-29 (3 Nov 2026, Aryan)** — notesbyaryan uses his original copy and captions **with emoji** (overrides Q11), "Currently vibing to" shown without a link, and every card has a direct Instagram button. "Résumé" → "Resume" site-wide.
- **D-30 (3 Nov 2026, Aryan)** — Ownership: Aryan states he designed and built everything in the Argus/AutoLoop detail sheet; the site says so. The sheet's git-log attribution to teammates is preserved as a conflict in `Aryan_Resume_Context/profile/CLAIMS.md`.
- **D-31 (3 Nov 2026, Aryan)** — Techy/expressive layer allowed despite DESIGN.md's restraint: owned versions of grid + spotlight, glow border, highlighter, terminal, number ticker, brand icons (hover tint only), vinyl. Still one accent at rest, gated for touch and reduced motion, under budget.
- **D-32 (3 Nov 2026)** — ⌘K palette is a small owned component, code-split and loaded on first use (cmdk not needed); keeps homepage JS at 148 KB.
- **D-33 (3 Nov 2026)** — Stage diagrams light up with CSS scroll timelines; where unsupported (and with reduced motion) every node is simply lit instead of using an IntersectionObserver fallback: same information, no JS.
- **D-34 (3 Nov 2026)** — Case studies get a TL;DR box, reading time and an "On this page" rail so the long Argus study still meets "readable in < 3 min".
- **D-35 (3 Nov 2026)** — `/now` deferred until Aryan writes it; the colophon reports numbers measured on 3 Nov 2026 and should be re-measured after big changes.
- **D-36 (3 Nov 2026, Aryan)** — Public resume PDFs carry the phone number (supersedes Q1 default / D-21); HTML pages still don't.
- **D-37 (3 Nov 2026, Aryan)** — "Play here" embeds the reel immediately on click (supersedes the extra "Load video" step); no third-party requests before a click.
- **D-38 (3 Nov 2026, Aryan)** — Claude drafted captions for the 11 new songs and filled artists from web search, with best guesses flagged here.
- **D-39 (3 Nov 2026, Aryan)** — Designed SVG visuals replace product screenshots on the AURA and Wedding Home tiles/heroes; screenshots stay inside the case studies.
- **D-40 (3 Nov 2026, Aryan)** — Raya Pay and Null removed; archive pruned to projects worth showing.
- **D-41 (3 Nov 2026, Aryan)** — Vinyl label is an SVG (no photo) and plays the featured song on click.
- **D-42 (3 Nov 2026, Aryan)** — The record is an inline audio player (plays once, no loop) when the song has a local audio file; falls back to the Instagram sheet otherwise.
- **D-43 (3 Nov 2026, Aryan)** — Kinetic Green shown as 150K lead entries (cumulative, not unique people), no cycle count. Overhaul claims the ledger rejects stay off the site until Aryan confirms them against the ledger.
- **D-44 (3 Nov 2026, Aryan)** — Key-phrase highlight shows nothing at rest and sweeps a full-height highlight over the whole phrase on hover (pointer devices only); replaces the half-height scroll marker. Contact photo is the full X picture cropped head to mid-torso, circle enlarged to 128/144 px. New "AI coding tools" spec group: Claude Code, Cursor (Argus/Exotel), Codex (Myriox). Production agents now **14+ in 5 languages** (Aryan confirmed; site, resumes and ledger updated).
- **D-45 (3 Nov 2026, Aryan)** — Every "More projects" row has a hover preview: AI Career Navigator and DevTinder use a frame of their demo videos (their Azure apps are down), Cognitive-OS and Digit Motor get a designed card (repo path, name, one-liner). Codex uses the OpenAI mark (simple-icons 11.15). Education shows years inline "(2022–2026)" and a campus list (MSA chapter founder; Inaugural Alumni Secretary). Contact photo upscaled to 384 px, circle 160/176 px. /resume shows one "Download resume (PDF)" (tailored by ?role=) plus Copy email; the General/SDE/AI-FDE buttons and Print were removed (recruiters expect one clear PDF; visible variants read as applying for everything).
- **D-46 (3 Nov 2026, Aryan)** — Header wordmark matches the resume header: caps, initials A and J 17px over 13.5px, 0.07em tracking. "Resume view" removed (header pill, mobile menu, palette, R shortcut); old `?mode=resume` links redirect to `/resume` (keeping `?role=`). Music sub-line: "When the terminal goes quiet, the mic comes on. A few from notesbyaryan:"
- **D-47 (3 Nov 2026, Aryan)** — "I also sing" photo reframed lower (object-position 50% 100%): bunting trimmed at the top, full figure to the stage floor.
- **D-48 (3 Nov 2026, Aryan)** — Homepage cover cards drop the month line and the "· N covers" count; the hover play button is 32px, centred on the waveform with a ring in the cover colour so it never touches the title; notesbyaryan banner play button 44 → 36px.
- **D-49 (3 Nov 2026, Aryan)** — notesbyaryan cards drop the month (artist · place/Live only; the sheet still lists the date). Cards are numbered by their position in the current order, so "Newest" reads 01, 02, 03 (the sort itself already worked; the pick numbers made it look unsorted). Songs can be flagged `live: true` without a place; Tum Se Hi is the first. Homepage "Listen on notesbyaryan ›" and the tagline share one line (wraps only below ~360px).
- **D-50 (3 Nov 2026, Aryan)** — /resume header redesigned: the separate sticky action bar is gone; name + role + status pill on the left, Download PDF (tailored by ?role=) and Copy email stacked on the right (a 2-up row on phones), location and quiet ↗ contact links under a hairline. The duplicate bottom Download/Email block is removed; education years inline.
- **D-51 (3 Nov 2026, Aryan)** — Resume button reads "Download" (aria-label "Download resume (PDF)"); kept the one accent blue rather than a second shade. The resume page ends with the same Download / Copy email pair at opposite ends of a hairline row.
