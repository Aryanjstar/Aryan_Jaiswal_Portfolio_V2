# aryanjaiswal.in v3: redesign plan (revision 3)

Owner: Aryan Jaiswal · Prepared 3 Nov 2026 (IST) · Executed by Claude Code on branch `redesign/v3` · Aryan merges to `main`.

Companion docs: [`DESIGN.md`](./DESIGN.md) (look, motion, interactions) · [`CONTENT.md`](./CONTENT.md) (every word and number) · [`RESEARCH.md`](./RESEARCH.md) (what the decisions are based on).

**What changed in revision 3 (Aryan's answers, 3 Nov 2026):**
1. **Identity is broad, not voice-only.** Aryan is open to any entry-level role: SDE-1 / MTS-1, AI engineer, backend, frontend, full-stack, DevOps / infra / cloud, FDE. Voice AI is his most recent and strongest work, so it stays a highlight, but it isn't the whole personality. The "site is a phone call" concept is retired.
2. **Accent: Apple blue** (`#0071E3` fills, `#0066CC` / `#2997FF` links). Green appears only as the universal "available" status dot.
3. **Light and dark mode: follow the system + manual toggle**, built to a strict spec (no flash, both themes fully designed and tested). Fall back to light-only only if the F7 acceptance criteria can't all be met (log the decision).
4. **Verdict on revamp or fix: revamp the presentation layer** (evidence in §1.0). Keep the repo, domain, routes, music data, photos and the good ideas.

---

## 0. One-paragraph brief

Aryan graduated from IIIT Dharwad (B.Tech CSE, May 2026). He has been a **Forward Deployed Engineer at Exotel since June 2026**, after a GenAI internship there from Oct 2025. His work spans:
- **AI:** production LLM voice agents and an eval / prompt-optimization platform.
- **Backend and integrations:** Apache Camel routes, signed APIs, automation.
- **Infra:** WebSocket workers, NGINX, Prometheus/Grafana, Ansible, Jenkins.
- **Full-stack products:** Next.js platforms and multi-agent apps.

He wants a job switch now, into **any entry-level engineering role**.

v3 is an **Apple-like, creative-minimal** site: white and soft-gray chapters (or their dark equivalents), big confident type, one blue accent, and craft in the interactions. The organizing idea is **"one engineer, many roles"**. The visitor tells the site what they're hiring for, and it re-tailors itself to show proof for that role first. A recruiter gets everything in 15 seconds. An engineer finds depth and delight.

---

## 1. Audit

### 1.0 Revamp or fix? Verdict: revamp the UI, reuse the content

The current site *feels* high-end because of the 3D globe, WebGL shader, gradients and 3D cards. A file-by-file comparison with the original template ([adrianhajdin/portfolio](https://github.com/adrianhajdin/portfolio)) shows those pieces are copied almost unchanged:

| Component | Lines | Changed vs template | Notes |
|---|---|---|---|
| `components/grid-globe.tsx` (3D globe config) | 406 | ~8 | three.js/three-globe world map; says nothing about Aryan |
| `components/ui/globe.tsx` (R3F globe) | 309 | ~19 | |
| `components/ui/canvas-reveal-effect.tsx` (WebGL shader dots) | 311 | ~5 | Used on "Approach" hover |
| `components/ui/background-gradient-animation.tsx` | 198 | ~35 | |
| `components/ui/3d-pin.tsx` (project cards) | 184 | ~39 | |
| `components/ui/spotlight.tsx` | 55 | ~5 | |
| `components/ui/text-generate-effect.tsx` | 59 | ~9 | |
| `components/ui/moving-borders.tsx` | 144 | ~29 | |
| `components/ui/bento-grid.tsx` | 201 | ~87 | |
| `components/ui/infinite-moving-cards.tsx` | 167 | ~73 | |
| `components/ui/floating-nav.tsx`, `magic-button.tsx` | 116 | ~47 | |

Aryan's own work: `/notesbyaryan`, `/resume` (`components/resume.tsx`), `/projects`, `/experience`, `career-highlights.tsx`, `scroll-reveal.tsx`, `page-transition.tsx`, the data, and the photos.

Why fixing isn't enough:
- **The impressive parts are the template parts.** Polishing them keeps the "I've seen this exact site" problem that engineers and founders notice.
- **They carry the weight.** three.js + R3F + drei + three-globe + a WebGL shader + `images.unoptimized: true` + a 14 MB `/public` folder add up. That's a lot of JS and bytes for a text-first site, and recruiters often open links inside the LinkedIn app on a phone.
- **The content is wrong in many places** (§1.1) and duplicated across 4 files, so "fixing" means a rewrite anyway.

What we keep:
- The Next.js App Router project and its Git history.
- The domain and Vercel setup.
- Route URLs: `/projects`, `/resume`, `/notesbyaryan` (and `/experience` as a redirect).
- Music data and photos.
- Good instincts from the old site (a dedicated resume page, a music page, page transitions, scroll reveals), re-implemented properly.

About 3D/WebGL: v3.0 ships without it, for the performance budget and the Apple-minimal look. If Aryan still wants one "wow" 3D moment later, Phase 7 allows **one owned, meaningful, lazy-loaded WebGL piece**: desktop only, with a reduced-motion fallback, off the homepage critical path. An interactive 3D architecture view of Argus would fit. A globe would not.

### 1.1 Content problems (fix first; these can actively hurt)

| # | Where | Problem | Severity |
|---|---|---|---|
| C1 | Hero, /experience, /resume | Current role shown as **"Tech Intern, Gen AI, Exotel"**, though he has been FDE since Jun 2026. /resume says "final-year CS student" | Critical |
| C2 | Hero | "building production systems that serve **150K+ users**". 150K+ is **calls/month** on the LLM path he was DRI for, not users | Critical |
| C3 | Exotel card, /resume | "**8× WebSocket capacity**". 8 workers ≠ 8× capacity | Critical |
| C4 | Projects, /resume | AURA "**99.9% uptime**", DevTinder "**ANN/vector search**" and "200+ signups", Cognitive-OS "51 devs / 0.84", plant model "90%/92%". All unsupported or contradicted | Critical |
| C5 | Highlights | GFG rank **4** (now **2**), "500+ problems" (now **867 LeetCode, 165 hard**), "**only** Gold Startup Scout in India" (unproven) | High |
| C6 | Everywhere | **No dates on roles**; the Joveo/Exotel overlap is unexplained | High |
| C7 | Footer | Student framing ("Ready to start my journey…"). "Let's get in touch" opens **Gmail web compose**. The email address is never shown | High |
| C8 | Bento | Filler tiles ("I believe in collaborative learning…"); MERN-only stack; copy-email with no visible address | High |
| C9 | Approach | Generic Plan/Learn/Implement cards | Medium |
| C10 | Highlights | Testimonial marquee with stray "- >" markers and a lone ";". Microsoft logo reused 3×; generic avatar for Infosys | Medium |
| C11 | /projects | 9 equal cards. "Visit" duplicates "Live"/"GitHub". Wrong tech icons. AI Career Navigator "Live" points to a backend host; the portfolio card points to the V1 repo | Medium |
| C12 | Metadata | Title "Aryan's Portfolio", description "Modern & Minimalist Next.js Portfolio.", template keywords. No OG/JSON-LD/sitemap; filename alt text | High |
| C13 | /public | Old `Aryan_Resume.pdf`, `Aryan_CV.pdf`, outdated `Aryan_CV/` LaTeX | High |
| C14 | README/config | README says Netlify, while `vercel.json` (Vercel) and `startup.sh` (Azure) also exist | Low |

### 1.2 Design / UX problems
- Instantly recognizable template.
- Purple on navy `#000319` + Inter.
- Motion everywhere, hierarchy nowhere.
- No recruiter fast path: no visible email, resume one click deep, no "open to roles", no dates.
- Dark-only, with no light option.

### 1.3 Technical problems
- Next 14.2, React 18, Tailwind 3, framer-motion 11, three + R3F + drei + three-globe + lottie.
- `images.unoptimized: true`; `/public` ≈ 14 MB across 82 files.
- No sitemap, robots, OG images, JSON-LD, analytics, 404, error boundary or link checks.
- Template leftovers in `package.json`.

### 1.4 Homepage: section-by-section verdict

| Current section | What it does now | Verdict | v3 replacement |
|---|---|---|---|
| Floating nav | Pill nav; "Contact" → `#contact` only exists on home | Rewrite | Translucent Apple-style top nav |
| Hero (3 spotlights, grid, TextGenerateEffect, "150K+ users", 1 button) | Generic headline, wrong claim, no contact/resume | Replace | "One engineer, many roles" hero with clickable role word, status, Résumé/Email |
| Bento grid (filler, globe, stack, copy email) | Filler, heavy | Delete | Highlights strip + Tech Specs |
| Experience (4 moving-border cards, no dates) | Outdated, banned claims | Replace | Dated Exotel block + Earlier |
| 2 MagicButtons | Duplicate nav | Delete | Inline "Learn more ›" links |
| Career highlights marquee | Auto-scroll, stale | Replace | Recognition chapter (static) |
| Approach (3 canvas cards) | Filler | Replace | "How I ship" scroll story with real artifacts |
| Footer (journey copy, Gmail button) | Student framing, broken on mobile | Replace | Contact chapter + minimal footer |

### 1.5 Music page `/notesbyaryan`
Today it is a long dark page with:
- a purple-glow photo, gradient-text H1 and floating notes
- "MUSICIAN • SINGER • DREAMER", a quote, an "@notesbyaryan" CTA and an unlinked "Currently vibing to…"
- "♪ LATEST DROPS ♪" over **15 text-only cards**, a closing quote, and the footer "Made with 💜 and Sleepless Emotions"

Problems:
- The most memorable thing about Aryan, an engineer who sings, is hidden in 15 identical text cards.
- ~20 emoji plus `♪♫♪♬`; mixed casing; two different back links; a dead "Contact" anchor.
- Template metadata.
- **Track data duplicated** (inline in `page.tsx` and in `data/performances.json`).
- No dates shown.

Keep: the name **notesbyaryan**, the bilingual titles, his own words, the Instagram links.

### 1.6 Resume page `/resume`
- A 548-line hand-written component with outdated and banned claims.
- Joveo and InfoKalash have start dates only.
- Links an old PDF; title and heading don't match; no print styles.
- A separate copy of the facts that drifts from the homepage.

### 1.7 Contact
- No contact section outside the home footer.
- Gmail-web compose instead of a normal email link.
- The address is never visible.
- No response-time or availability signal.

### 1.8 API and data layer
- **No API routes exist.** The site is effectively static.
- `lib/music-ai.ts` (Azure OpenAI caption generator) and `lib/instagram.ts` (Instagram oEmbed fetch) are **dead code**; nothing imports them. The unauthenticated `api.instagram.com/oembed` endpoint was deprecated by Meta in Oct 2020 and needs a Meta app token, and Meta changed oEmbed again in Apr 2025.
- Facts live in 4 places: `data/index.ts`, `components/resume.tsx`, `app/notesbyaryan/page.tsx`, `data/performances.json`.
- Three deploy targets are referenced (Vercel, Netlify, Azure).
- `.env*` files are untracked today; keep them that way.

> Phase 0 adds the visual baseline (screenshots + Lighthouse + bundle size of the live site). This planning pass audited the live page content and the full source, but couldn't build the old site in its sandbox.

---

## 2. Research findings that drive the decisions
Summary only. Details and sources are in [`RESEARCH.md`](./RESEARCH.md).
1. **Recruiters give a portfolio ~15–40 s** and click 1–2 links, often from the LinkedIn app on a phone → essentials above the fold at 390px.
2. **The site matters most at the second, human look** (founder, hiring manager, engineer). Over-engineered sites can hurt → proof first, craft second, weight never.
3. **Interviews probe 3–5 projects you can defend:** problem → what broke → diagnosis → fix → measured result → what I'd do differently.
4. **Template fatigue is real.** Anthropic's frontend guidance flags generic fonts, purple gradients, bento/three-card layouts and scattered effects as "AI slop". It recommends one committed aesthetic with one orchestrated moment.
5. **Motion craft (Emil Kowalski):** 100–300 ms, ease-out, press 0.97, never from scale 0, stagger 30–80 ms, gate hover, reduced motion keeps fades only.
6. **Apple-style minimalism:**
   - neutral surfaces (`#FFF`, `#F5F5F7`, ink `#1D1D1F`) and one accent reserved for actions and links (Apple blue)
   - large 600-weight display type with tight tracking, and a 17px body
   - chapters separated by surface color, capsule buttons, radius tiers
   - imagery carries the weight; stories told by scroll
   - SF Pro isn't licensed for the web
7. **Dark mode** is expected by many developers and by visitors on system dark mode. Doing it well means no flash of the wrong theme, both themes designed rather than inverted, and contrast checked in both.
8. **Platform:** Next.js 16, Tailwind v4, Motion with LazyMotion + `MotionConfig reducedMotion="user"`, View Transitions as progressive enhancement, CSS scroll timelines behind `@supports`.

---

## 3. Positioning

**Identity line:**
> Software engineer who ships to production: AI systems, backends, infrastructure and the products around them.

**Status:** `● Open to entry-level roles · Bangalore or remote`. The hero role word and the Role Lens list the specific roles.

**Role tracks (the Role Lens):** `All` · `SDE / MTS` · `AI` · `Backend` · `Frontend` · `Full-stack` · `DevOps & Cloud` · `FDE`.

Evidence per track (all from CONTENT.md):
- **SDE / MTS:** production code merged at Exotel since 2025; 867 LeetCode (165 hard); GFG institute rank 2; COMSNETS 2026 paper; The Wedding Home with 61 API routes and CI.
- **AI:** 7 production LLM voice agents in 5 languages; the Argus + AutoLoop eval/prompt-optimization harness; LLM guards tested on 269 production replies; AURA (5 agents, MCP); Myriox; AI Career Navigator (Build-a-thon winner).
- **Backend:** Apache Camel routes with HMAC signing, retries and a booking guard (313/313 and 114/114 checks); batching 10K→150 requests (25→2 min); FastAPI/Redis services; a Fastify FNOL agent with idempotency.
- **Frontend:** the React/TypeScript UI for the bot test framework; The Wedding Home (Next.js); InfoKalash UX work; this site itself (a colophon with real performance numbers).
- **Full-stack:** The Wedding Home, AURA, Raya Pay, DevTinder, and the Exotel test-framework feature (FastAPI + Redis + React).
- **DevOps & Cloud:** Pipecat WebSocket workers 1→8 behind NGINX; Prometheus/Grafana with EC2 discovery; 5 Ansible roles; Jenkins + AWS S3/SES automation; Docker → Azure Container Apps via GitHub Actions; Vercel cron + CI; Azure certification.
- **FDE:** client calls, demos and go-lives across 10+ accounts; same-day fixes; production cutovers.

Voice AI appears as **the most recent and strongest highlight**: the first case study and the first Exotel bullets. It is never the site's theme.

---

## 4. Concept: "One engineer, many roles" × Apple product-page craft

The site is calm, premium and minimal like an Apple product page. The creativity is in how it **adapts to the visitor** and in small, well-made moments.

| Idea | Feature | Why recruiters like it |
|---|---|---|
| "Which engineer are you hiring?" (like Apple's "Which model is right for you?") | **Clickable role word in the hero:** "Hi, I'm Aryan, a *software engineer* ▾". Click it to cycle roles, or pick from a popover. The sub-line, highlights, project order and résumé PDF re-tailor instantly. Shares state with the Role Lens | Proof for *their* role comes first; tailored links (`?role=devops`) per application |
| Product-page storytelling | **"How I ship"** sticky scroll story: Understand → Design → Build → Test → Deploy → Observe. Each step shows a real artifact from different work: a client requirement note, a route diagram, code, a 313/313 check, a Jenkins run, a Grafana panel mock | Shows his engineering process across AI, backend, infra and web in 20 s |
| Apple "Tech Specs" page | **Specs sheet:** Languages, Backend, AI/LLM, Frontend, Cloud & DevOps, Data, Testing. Each item links to where it was used; hover/focus highlights it across the page | Evidence instead of logo walls |
| Case studies | **Build logs:** timestamped timeline with pass/fail/fix chips, a stage diagram, results with scope notes | The "what broke / how I diagnosed it" format that interviews probe |
| Skip to the facts | **Recruiter Mode:** one switch → a plain one-page résumé view | Removes all creative risk |
| Power-user delight | **⌘K command palette:** jump anywhere, copy email, download the résumé for a role, toggle theme | Fast navigation; feels crafted |
| Personal side | **notesbyaryan:** Apple Music-style artwork grid of his song covers + a "now playing" bar; one "Off the clock" chapter on the homepage | Memorable and human, kept secondary |
| Small touches | **"Hi" greeting** that shows hello in 5 Indian languages on hover/tap (a nod to his multilingual voice work); **theme toggle** with a smooth reveal; **"debug mode"** Easter egg; **friendly 404** | Delight without weight |

**Explicitly not doing:**
- a voice/phone theme across the site
- 3D/WebGL in v3.0
- cursor trails, scroll-jacking or Lenis
- glassmorphism as decoration, gradients
- logo walls, skill bars, marquees
- runtime LLM calls to render pages
- a live AI chat in v3.0

---

## 5. Information architecture and feature specs

### 5.1 Routes

| Route | Purpose | Notes |
|---|---|---|
| `/` | Everything a recruiter needs + the signature moments | §5.2 |
| `/work/[slug]` | 5 case studies | `argus-autoloop`, `enterprise-integrations`, `production-infra`, `aura`, `the-wedding-home` |
| `/projects` | Archive table (year · name · what · stack · links), filterable by role | |
| `/resume` | HTML résumé + print CSS + PDFs | F16 |
| `/notesbyaryan` | Music | Keep the URL; `/music` → here. F14 |
| `/colophon` | How this site was built: stack, performance numbers, decisions, credits, "v3 · 2026" changelog | Frontend evidence |
| `/now` *(optional, P5)* | What he's working on and learning | Last-updated date |
| `not-found` | Friendly 404 | F10 |
| Redirects (308) | `/experience` → `/#work`, `/music` → `/notesbyaryan`, `/contact` → `/#contact`, `/resume.pdf` → current public PDF | In `next.config` |

### 5.2 Homepage chapters (top → bottom)
Each chapter is a full-bleed band alternating `--bg` / `--bg-alt` (the Apple rhythm), with a small eyebrow and a centered 600-weight headline.

1. **Top nav** (sticky, translucent): wordmark `aryan jaiswal` · Work · Projects · Résumé · Music · `⌘K` · theme toggle · "Résumé view" (Recruiter Mode). Mobile: wordmark + ⌘K + theme + menu sheet. The skip link comes first.
2. **Hero** (`100dvh`, centered):
   - Eyebrow: `Forward Deployed Engineer at Exotel · CSE '26, IIIT Dharwad`.
   - Line 1: "Hi, I'm Aryan, a" + the **role word** (blue, underlined, ▾), "software engineer" by default. Clicking it cycles roles; a popover lists them all. Keyboard: Enter opens the list, arrows choose.
   - Headline (big, 600): "I build software that *ships* to production." One Instrument Serif italic word.
   - Sub-line: changes with the role (CONTENT.md §2).
   - Status pill: green dot + "Open to entry-level roles · Bangalore or remote".
   - Buttons: **Download résumé** (blue capsule, magnetic, role-aware PDF) · **Copy email** (ink capsule) · GitHub › · LinkedIn ›.
   - Below: a subtle "Highlights for: <role>" anchor link into chapter 4.
   - The LCP element is the headline text, server-rendered. No canvas in the hero.
3. **Role Lens** (just under the hero): an Apple segmented control with the 8 tracks (horizontally scrollable on mobile, with fade edges). Shares state with the hero role word. Writes `?role=` without a scroll jump.
4. **Highlights:** 6 big mono numbers mixed across tracks and re-ordered by role, each with a scope note on hover/focus/tap (CONTENT.md §3).
5. **Work** `#work`:
   - An Exotel card with two dated titles and a "Converted to full-time" connector.
   - Bullets re-ordered and highlighted by role, each with "Case study ›" where relevant.
   - An "Earlier" disclosure for Joveo, InfoKalash and Infosys Springboard.
6. **How I ship** (sticky scroll story): 6 steps. Text on the left; on the right, a sticky artifact card that changes per step. Each step names the project it comes from and links to it. On mobile or with reduced motion: stacked steps with inline cards.
7. **Selected work:** 5 large Apple-style tiles (28px radius) with a real product screenshot or a designed title card, an outcome line, role tags and "Read case study ›". Order follows the role. Desktop: 1 wide + 2×2; mobile: stacked.
8. **More projects:** a compact list of 8. Cursor-follow thumbnails on desktop, inline thumbnails on mobile. "All projects ›".
9. **Tech Specs:** an Apple spec-sheet table, grouped. Each item shows where it was used (cross-highlight).
10. **Recognition:** paper, Build-a-thon win, Google finalist, Gold MSA, LeetCode/GFG, certifications. Static rows.
11. **Off the clock:** "I also sing." The 3 newest covers (generated artwork) + "Listen on notesbyaryan ›".
12. **Contact** `#contact`: F17.
13. **Footer:** `v3 · 2026 · Designed and built by Aryan` → /colophon · last updated · socials · "Press ⌘K".

### 5.3 Feature specs (with acceptance criteria)

**F1. Recruiter Mode ("Résumé view")**
- Toggle in the nav (`R` when not typing); URL `?mode=resume`.
- A single-column plain résumé view: name, role, status, contacts, education, experience, top projects for the selected role, skills, recognition, PDF buttons. No animation; max 70ch; print-friendly.
- AC: works with JS off via the URL; axe clean; contact reachable within one desktop screen.

**F2. ⌘K command palette** (cmdk)
- Opens with ⌘K / Ctrl+K / `/` or the nav button. Mobile: a bottom sheet.
- Groups: Go to (sections, pages), Case studies, Projects (fuzzy), Actions (Copy email, Download résumé for <role>, Switch role, Theme: System/Light/Dark, Résumé view), Links.
- AC: fully keyboard operable, focus trapped and restored, works at 390px, Esc closes.

**F3. Role Lens + hero role word**
- Data-driven: every bullet, project, highlight and spec item has `roles: Role[]`.
- On change:
  - the hero sub-line crossfades (≤ 200 ms)
  - highlights, work tiles and projects re-order (Motion `layout`, 260 ms; reduced motion → instant)
  - matching bullets get a soft-blue wash and a blue left bar; others dim to 65% (never hidden)
  - the résumé button switches PDF
- Role → PDF: SDE/MTS, Backend, Frontend, Full-stack, DevOps → SDE PDF; AI, FDE → AI/FDE PDF; All → general PDF.
- AC: `/?role=devops` server-renders the right order and copy (no flash). The segmented control is a `radiogroup` with arrow keys. The hero role word is a button + listbox with full keyboard support.

**F4. Hero entrance (the one orchestrated moment)**
- First visit per session: eyebrow → role line → headline (40 ms stagger, 240 ms each, 8px rise) → the status dot starts its gentle pulse → buttons. Total ≤ 900 ms, then it rests.
- "Hi" greeting: hover/focus/tap shows a small tooltip cycling **Hello · नमस्ते · வணக்கம் · నమస్కారం · नमस्कार** (with `lang` attributes), captioned "the languages my production voice agents speak".
- AC: text present in the server HTML; reduced motion → fade only; no layout shift (CLS < 0.01 for the hero).

**F5. Case study template `/work/[slug]`**
- Hero: title, one-line outcome, meta table (role, team, timeline, stack), links (repo/live/demo/video), and a product screenshot or diagram.
- Blocks:
  - Context
  - Constraints
  - **Build log** (timestamped steps with pass/fail/fix chips)
  - Architecture or stage diagram that lights up on scroll (`@supports` scroll timeline, with an IntersectionObserver fallback)
  - Results (metric cards + scope notes)
  - What I'd do differently
  - Stack
- The Argus case study may use a small audio-waveform visual, since it's a voice platform. The other studies use their own visuals.
- Reading progress bar; prev/next; a per-slug OG image.
- AC: readable in < 3 min; every number traceable to CONTENT.md; Lighthouse ≥ 95.

**F6. Toasts** (sonner): "Copied aryanjstar3@gmail.com", "Résumé downloading (SDE version)". `role=status`.

**F7. Theme: follow the system + toggle (must be implemented perfectly)**
- **Setup:** `next-themes` with `attribute="data-theme"`, `defaultTheme="system"`, `enableSystem`, and `disableTransitionOnChange` on first paint. Its inline script prevents a flash of the wrong theme.
- **Toggle** (sun/moon icon in the nav): a click switches Light ⇄ Dark. The ⌘K palette offers System / Light / Dark. The choice persists (localStorage via next-themes); "System" clears it.
- **Switch animation:** a View Transition circular reveal from the toggle (≤ 350 ms); 150 ms crossfade fallback; instant with reduced motion.
- **Browser chrome:** `<meta name="theme-color">` for both schemes (`media="(prefers-color-scheme: …)"`), updated on toggle. `color-scheme` set per theme so form controls and scrollbars match.
- **Both themes fully designed** from DESIGN.md tokens, not inverted. Product screenshots sit on theme-aware tiles. Logos and icons have dark variants or are monochrome `currentColor`. Generated music artwork has light and dark palettes.
- OG images stay light (social previews).
- **AC (all required):**
  - No flash on hard reload in either system mode (verified with Playwright `colorScheme: 'dark'` and `'light'`, screenshots taken before hydration).
  - The toggle works without JS errors and persists across pages and reloads.
  - "System" follows an OS change live.
  - axe contrast passes in both themes on every route.
  - Every screenshot set exists in both themes.
  - The toggle is keyboard accessible, with an `aria-label` stating the current theme.
  - **If any of these can't be met, ship light-only and log it as a decision.**

**F8. Sound:** none in v3.0 (removed with the phone concept).

**F9. Easter egg** (P5): typing `ship` or the Konami code opens "debug mode", an overlay with:
- a mono log card of real, non-confidential lines (`routes 313/313 ✓`, `bulk_load 10000→150 requests`, `workers 1→8 behind nginx`)
- component outlines labelled by name

Esc exits.

**F10. 404:** "404: this page didn't make it to production." A short build log ("✓ request received · ✗ route not found · ↻ suggesting alternatives") + links to Home, Work, Résumé and ⌘K.

**F11. SEO / share**
- Metadata API: title template `%s · Aryan Jaiswal`; default title `Aryan Jaiswal: Software Engineer (AI · Backend · Full-stack · Cloud)`; a real description; canonical `https://aryanjaiswal.in`; openGraph; twitter.
- `next/og` images for home, each case study and notesbyaryan: light, white background, Instrument Sans title, blue accent bar, mono URL.
- JSON-LD Person; `sitemap.ts`; `robots.ts`; a favicon set (SVG monogram "aj" in blue + 180px apple-touch + manifest); theme-color for both schemes.
- AC: LinkedIn Post Inspector and opengraph.xyz render correctly.

**F12. Analytics**
- Vercel Web Analytics + Speed Insights.
- Custom events via Umami if Q5 = yes: résumé download by variant, email copy, outbound clicks, role selected, palette used, theme toggled, case-study 75% read.
- `?ref=` captured (linkedin, naukri, wellfound, resume, email…).

**F13. Résumé assets**
- `/public/resume/Aryan-Jaiswal-Resume.pdf` (general), `-SDE.pdf`, `-AI-FDE.pdf`. Public versions are **without phone** (Q1).
- A `/resume.pdf` redirect.
- Delete the old PDFs and `Aryan_CV/`.

**F14. notesbyaryan (Apple Music-style)**
- **Hero:** small round photo, H1 `notesbyaryan` (no gradient text), "i sing what i can't express" + his Hindi caption (`lang="hi"`), an Instagram capsule "@notesbyaryan", "Latest cover · <date>".
- **Song list and order:** exactly the 26 songs in CONTENT.md §10.1, in that order (Aryan's pins). 15 entries already exist in the codebase and get updated (title, canonical URL, real date, order); 11 are new and get added. The default view is "Aryan's picks" in that order. An optional "Newest" sort uses the decoded dates. The homepage shows pins 1–3.
- **Card design (decided, D-18): one consistent generated cover for every song**, with the same layout and the same animation for all 26. Each `CoverArt` is a deterministic SVG:
  - **Background:** a soft tile from a fixed 6-colour palette, with light and dark variants. The colour is picked by hashing the song title, so the grid has gentle variety but one system.
  - **Waveform:** a strip whose bar heights are derived from the title's letters, so each song gets its own "signature".
  - **Text:** the title in Instrument Sans 600, with the position number and year in small mono.
  - **Hover / focus:** one shared animation: the waveform bars rise in a 40 ms stagger, the tile lifts 4px, and a play glyph fades in. Reduced motion → static.
  - **Layout:** 2 columns on mobile, 3 on tablet, 4 on desktop. Title, original artist (only if known) and the date (e.g. "Apr 2026") sit under each tile.
- **Why not Instagram cover photos on the cards (decision):**
  - Reel thumbnails can't be fetched reliably without a Meta app token.
  - Thumbnails vary wildly in framing, lighting and text overlays, so a 26-photo grid looks busy next to an Apple-minimal site.
  - They don't adapt to dark mode.
  - They add ~26 image downloads.

  Aryan's actual performances are one tap away (track sheet → click-to-load reel). If Aryan later exports **all 26** thumbnails into `public/covers/<code>.webp`, a single flag `useRealCovers` switches the whole grid to photos with one uniform treatment (same 4:5 crop, same corner radius, a subtle bottom gradient for the title). Never mix photos and generated art.
- **Track sheet** (dialog): big artwork, both titles, singer, date, place, his caption, "Watch on Instagram ›", and a **click-to-load Instagram embed** (nothing third-party loads until clicked).
- **Now-playing bar:** a slim floating bar showing the selected track with a visual-only equalizer, prev/next and Watch. Never autoplays.
- **Filters** (segmented): All · Hindi · English · Live (Live = songs with a place: Nandi Hills, IIIT Dharwad farewell). Default order is Aryan's picks; optional "Newest" toggle.
- "Currently listening" only if `music.json` has a linked `nowListening` entry.
- **Cleanup:** no emoji/♪ in labels; captions emoji-stripped by default (Q11); one back link; the standard footer; proper metadata + OG.
- **Data:** a single `content/music.json` built from CONTENT.md §10.1 and Zod-validated. Array order = display order. Fields:

  | Field | Notes |
  |---|---|
  | `code` | Reel code; the unique key |
  | `url` | Canonical, no query string |
  | `title` | |
  | `titleHi?` | Plus `needsReview` |
  | `artist?` | |
  | `lang` | `hi` or `en` |
  | `place?` | |
  | `caption?` | |
  | `postedAt` | |
  | `pinned` | Order is implicit in the array |

  Migrate and correct the 15 existing entries (titles, `/p/` → `/reel/`, decoded dates). Add the 11 new ones. Delete the inline array in `app/notesbyaryan/page.tsx` and `data/performances.json`. Drop the `accent`/`pattern` fields. A test checks: 26 entries, unique codes, canonical URLs only, order matches CONTENT.md §10.1.
- AC: works in both themes; zero third-party requests until "Load video"; keyboard-operable; Lighthouse ≥ 95.

**F15. Adding a cover** (replaces the dead "API" code)
- `npm run add-cover -- --url <instagram-url> --title "<song>" [--artist "…"] [--lang hi|en] [--place "…"] [--caption "…"] [--position <n>]`:
  - strips tracking query strings and normalizes to `/reel/<code>/`
  - **decodes `postedAt` from the reel code** (Instagram IDs embed the creation time)
  - rejects duplicates by code
  - inserts at `--position` (default: the end)
  - Zod-validates the result
- Optional `--ai`: if `AZURE_OPENAI_*` is set locally, reuse the `lib/music-ai.ts` logic to *suggest* a Hindi title and caption for Aryan to approve (`--yes` to write). Local only; never at build or request time.
- Delete `lib/instagram.ts`; move `lib/music-ai.ts` to `scripts/`.

**F16. Résumé page `/resume`**
- Rendered from `content/`, the single source.
- A clean document page (max 820px) with a sticky capsule bar: "Download PDF ▾" (General / SDE / AI-FDE, role-aware default), Copy email, Print.
- Sections in résumé order; **no phone**. "Last updated".
- `@media print`: hide the chrome, black on white, A4 margins, link URLs printed.
- AC: wording matches the current résumé (the claim ledger wins); PDFs are text-selectable and named `Aryan-Jaiswal-Resume*.pdf`; correct in both themes on screen and always light when printed.

**F17. Contact `#contact`**
- Headline "Let's talk." Line: "Hiring for an entry-level engineering role — SDE, AI, backend, frontend, full-stack, DevOps/cloud or FDE? I reply within a day."
- A card with:
  - the **email as selectable text** + Copy (toast)
  - "Write email" (`mailto:` with the subject "Hi Aryan — <role> at <company>", role prefilled from the lens)
  - LinkedIn › · GitHub › · Résumé › · Cal.com › (if Q4)
- "Bangalore · open to remote". A compact contact row in every footer.
- No form in v3.0. Phase 7 option: Route Handler → Resend + Turnstile + rate limit.
- AC: works with JS off; copy works on iOS Safari; the toast is announced.

**F18. API and data architecture**
- No runtime API routes in v3.0 beyond `opengraph-image`, `sitemap` and `robots`.
- A single typed, Zod-validated content source in `content/`: `profile.ts`, `roles.ts`, `experience.ts`, `projects.ts`, `caseStudies/*`, `specs.ts`, `recognition.ts`, `music.json`.
- A build-time test fails on the CONTENT.md §14 "Never publish" list and on schema errors.
- Deploy: Vercel only. Delete `startup.sh`; fix the README.

---

## 6. Tech decisions

| Area | Decision |
|---|---|
| Framework | Next.js 16 (latest stable), React 19.x, TS strict. Codemod `npx @next/codemod@latest upgrade latest`, then fix async `params` |
| Styling | Tailwind v4 with `@theme` tokens; theme variables switched by `[data-theme]` |
| Theme | `next-themes` (system + toggle), per F7 |
| Motion | `motion` (`motion/react`) with `LazyMotion` + `m`, `MotionConfig reducedMotion="user"`. CSS for simple hovers. No GSAP unless needed |
| UI primitives | `cmdk`, `sonner`, Radix only where needed (Popover/Dialog/Tooltip) |
| Fonts | `next/font/google`: **Instrument Sans** (display + body), **Instrument Serif** italic (one word per page), **JetBrains Mono** (data). Noto Sans Devanagari/Tamil/Telugu only for the greeting tooltip (`preload:false`), or system fallback |
| Content | `content/` single source (F18) |
| Images | Remove `images.unoptimized`; AVIF/WebP with explicit sizes; delete template assets; `/public` < 3 MB |
| Removed | `three`, `@react-three/*`, `three-globe`, `lottie-react`, `framer-motion` (→ `motion`), `mini-svg-data-uri`, `tailwindcss-animate`, most `react-icons` (use `lucide-react`) |
| Testing | Playwright (smoke, keyboard, reduced motion, **both color schemes**, screenshots), `@axe-core/playwright`, a link checker, `@next/bundle-analyzer`, optional Lighthouse CI |
| API | None at runtime (F18); `scripts/add-cover` (F15) |
| Deploy | Vercel; `www` → apex |

---

## 7. Phases (each ends with a commit on `redesign/v3`)

### Phase 0: Setup and baseline
- [ ] Branch `redesign/v3`; create `docs/redesign/PROGRESS.md`.
- [ ] Baseline: Lighthouse (mobile + desktop) and 390/1440 screenshots of the live `/`, `/projects`, `/experience`, `/resume`, `/notesbyaryan` → `docs/redesign/baseline/`. Record the current bundle size (`next build` output).
- [ ] Inventory `components/`, `public/`, `lib/` → keep/rewrite/delete in PROGRESS.md, starting from the §1.0 table.
- [ ] Confirm `lib/music-ai.ts` and `lib/instagram.ts` are unused and no `.env*` is tracked.
- AC: baseline recorded; nothing user-visible changed.

### Phase 1: Foundation
- [ ] Upgrade to Next 16 / React 19 / Tailwind v4 and `motion`. Remove the deps in §6. ESLint flat config; scripts from CLAUDE.md.
- [ ] Delete the template components and theme. `globals.css` with light **and** dark tokens.
- [ ] Root layout: skip link, translucent nav, ThemeProvider (F7), `MotionConfig`, `LazyMotion`, Toaster, fonts.
- [ ] SEO (F11), analytics (F12), 404 skeleton, error boundary, redirects.
- [ ] Clean `package.json` and the README; delete `startup.sh`.
- AC:
  - the build passes
  - the placeholder homepage works in both themes with no flash (F7 checks)
  - Lighthouse SEO 100
  - `grep -ri "aceternity\|spotlight\|moving-border\|3d-pin\|globe"` finds nothing in app code

### Phase 2: Content and static layout (shippable on its own)
- [ ] `content/` from CONTENT.md, with `roles` tags.
- [ ] All homepage chapters (§5.2) as static, server-rendered components:
  - hero (the role word works via URL/links) and Role Lens (works, no animation)
  - highlights, work, and How I ship (stacked version)
  - selected-work tiles, more projects, Tech Specs, recognition
  - off the clock, contact, footer
- [ ] `/projects`, `/resume` (F16), `/notesbyaryan` (F14: the 26 songs in Aryan's order from CONTENT.md §10.1, generated covers, sheet, filters), `content/music.json` + `add-cover` (F15), Recruiter Mode (F1), and `/work/[slug]` pages with text content (visual polish in Phase 4).
- [ ] Product screenshots via Playwright of the live Wedding Home, AURA, Myriox and LEELA (1440×900 @2x → AVIF/WebP). Use designed title cards where a site is down, plus a TODO.
- AC:
  - facts match CONTENT.md and the "Never publish" test passes
  - Lighthouse mobile ≥ 95 on all four scores
  - axe clean in both themes
  - 390/1440 screenshots in light + dark reviewed
  - **Merge-worthy: tell Aryan it can ship.**

### Phase 3: Signature interactions
- [ ] Hero entrance + greeting tooltip (F4); hero role word ⇄ Role Lens animations (F3).
- [ ] ⌘K palette (F2); theme switch reveal (F7); toasts (F6).
- [ ] The "How I ship" sticky scroll story; the notesbyaryan now-playing bar + tile interactions.
- AC: the F2–F4, F6, F7 and F14 ACs; homepage JS ≤ 150 KB gz; INP < 200 ms; reduced-motion and both-theme screenshots reviewed.

### Phase 4: Case studies
- [ ] F5 template visuals for all 5 studies; the build-log and diagram components; an OG image per slug; a View Transition from the tiles (experimental flag, must degrade cleanly).
- AC: the F5 ACs.

### Phase 5: Micro-interactions and fun
- [ ] The DESIGN.md §8 catalog, item by item; the Easter egg (F9); 404 (F10); `/colophon`; optional `/now`.
- [ ] Animation review with the emil-design-eng checklist (a Before/After/Why table in PROGRESS.md).
- AC: every catalog item verified for hover, focus, touch, reduced motion and both themes; no `transition: all`; nothing hover-only.

### Phase 6: QA and launch prep
- [ ] Playwright:
  - every route × {light, dark} × {390, 768, 1440}
  - a keyboard journey (palette → case study → contact)
  - reduced motion; JS-off for `/` and `/?mode=resume`; no-flash checks
- [ ] axe on every route in both themes; link check; bundle report; Lighthouse ≥ 95 everywhere.
- [ ] Safari iOS (`100dvh`, safe areas), Firefox (scroll-timeline fallback), Chrome, the LinkedIn in-app browser.
- [ ] Content review against CONTENT.md and the claim ledger; titles and dates match LinkedIn and the résumé.
- [ ] OG cards checked; a final PROGRESS.md + a "How to merge and deploy" note.
- AC: all green; Aryan has a preview URL and a checklist.

### Phase 7: Later (optional)
- A scripted "ask about Aryan" panel (no LLM) → optionally a grounded LLM version with rate limits and a spend cap.
- A contact form (Resend + Turnstile).
- 2–3 min redacted video walkthroughs.
- A `/lab` craft log.
- **One owned 3D/WebGL moment** (e.g. an interactive 3D view of the Argus architecture): lazy-loaded, desktop-only, with a static fallback.

---

## 8. Decisions log

| ID | Decision | Reason |
|---|---|---|
| D-01 | **Revamp the presentation layer**; keep repo, routes, history, music data, photos | The "high-end" pieces are ~95–99% template code (§1.0), and the content needs a rewrite anyway |
| D-02 | **Light + dark, following the system with a toggle** (rev. 3), to the F7 spec; light-only fallback if F7 can't fully pass | Aryan's choice; many visitors use system dark mode; the quality bar is "perfect or not at all" |
| D-03 | Concept: **"One engineer, many roles"** × Apple product-page craft (rev. 3; replaces "the site is a call") | Aryan targets every entry-level track; voice AI is a highlight, not the identity |
| D-04 | Role Lens + clickable hero role word, deep-linkable `?role=` | Tailored proof per application without separate sites |
| D-05 | Recruiter Mode ("Résumé view") always available | Removes creative risk for 15-second scans |
| D-06 | 5 case studies (AI, backend/integrations, infra, AI full-stack, web full-stack) + compact list + archive | Every target role gets a deep example |
| D-07 | Drop the globe, bento, marquee, "approach", logo walls, skill bars, and the phone/IVR theme | Template DNA, filler, or too narrow |
| D-08 | Next 16 + Tailwind v4 + Motion (LazyMotion); no three.js in v3.0 | Perf budget and Apple-minimal look; one owned 3D piece possible later |
| D-09 | Keep **/notesbyaryan**, redesigned Apple Music-style; one homepage chapter + a "Music" nav item | Human and memorable; existing links keep working |
| D-10 | No live AI chat/voice agent in v3.0 | Cost, abuse and hallucination risk |
| D-11 | Public résumé PDFs without phone (default) | The site is crawlable; the phone goes on PDFs sent directly |
| D-12 | Client names only where the public résumé uses them; descriptors in long-form | Confidentiality + consistency |
| D-13 | Analytics with `?ref=` channel tags | Shows which applications produce visits |
| D-14 | **Accent: Apple blue** (`#0071E3` fills, `#0066CC`/`#2997FF` links); green only for the "available" dot | Aryan's choice; professional across all role types; blue link text passes AA |
| D-15 | Instrument Sans + one Instrument Serif italic word + JetBrains Mono | An Apple-like clean sans without Inter/Geist; SF Pro isn't web-licensable |
| D-16 | The "How I ship" scroll story replaces "Approach" | Apple-style storytelling with real artifacts across tracks |
| D-17 | No runtime APIs; a single validated content source; a local `add-cover` script | Removes dead/broken code; keeps the site static, fast and secret-free |
| D-18 | **Music cards: one consistent generated cover + one shared animation for all 26 songs**; real reels play from the track sheet. A switch to real thumbnails is allowed only for all songs at once | Consistent, Apple-minimal, theme-aware, fast. Instagram thumbnails need a Meta token and vary too much |
| D-19 | Music order = Aryan's pinned list (CONTENT.md §10.1), not date. Dates are decoded from reel IDs | Aryan curates his best first; the old hand-typed dates were wrong |
| D-20 | (3 Nov 2026) Host-agnostic build; analytics only with `NEXT_PUBLIC_ANALYTICS=vercel` | Live site is on Netlify; deployment is Aryan's call |
| D-21 | (3 Nov 2026) Every lens links the general no-phone PDF until no-phone SDE/AI-FDE PDFs exist | Only the general public PDF exists |
| D-22 | (3 Nov 2026, Aryan) No visible track list: Role Lens control and cycling role word hidden; `?role=` tailoring stays URL-only; status "Open to new roles" | Site must not read as "open to anything" |
| D-23 | (3 Nov 2026) Live links for Myriox/LEELA from their repos; AURA uses the `-in` host | Verified 200; others down or backend-only |
| D-24 | (3 Nov 2026) CSS-first motion; `motion` package removed; interactions pulled into Phase 2 | Aryan asked for a fluid feel now; bundle budget |
| D-25 | (3 Nov 2026) Highlights scope notes always visible | Honest at a glance |
| D-26 | (3 Nov 2026) No 65% dimming for non-matching role items | WCAG contrast |
| D-27 | (3 Nov 2026) Owned toast instead of sonner; server `<img>` for pre-optimized homepage images | Homepage JS 161 → 146.5 KB |
| D-28 | (3 Nov 2026) `/` and `/projects` render per request for `?role=`; Linux/Postman as "Daily driver" | Server-tailored, no flash; Aryan confirmed skills |
| D-29 | (3 Nov 2026, Aryan) notesbyaryan: original copy + captions with emoji, direct Instagram button per card; "Resume" without accent | Aryan's request |
| D-30 | (3 Nov 2026, Aryan) Argus/AutoLoop ownership: all built by Aryan; git-log conflict preserved in the claim ledger | Aryan's correction |
| D-31 | (3 Nov 2026, Aryan) Expressive/techy layer (grid, glow, highlighter, terminal, ticker, icons, vinyl) | Aryan asked for more expression and the techy feel of the old site |
| D-32 | (3 Nov 2026) Owned, code-split ⌘K palette instead of cmdk | Bundle budget |
| D-33 | (3 Nov 2026) Diagram light-up via CSS scroll timeline; static-lit fallback instead of IO | Same info, no JS |
| D-34 | (3 Nov 2026) TL;DR + reading time + contents rail on case studies | Keeps long studies readable in < 3 min |
| D-35 | (3 Nov 2026) `/now` deferred until Aryan writes it — superseded: built from known facts after Aryan's go-ahead | No invented content |
| D-36 | (3 Nov 2026, Aryan) Phone on public resume PDFs; not in HTML | Aryan's request; HTML is crawlable |
| D-37 | (3 Nov 2026, Aryan) Reel embeds on click | Aryan liked the preview |
| D-38 | (3 Nov 2026, Aryan) Drafted song captions; artists from web search, guesses flagged | Aryan's request |

---

## 9. Open questions for Aryan (defaults let the build proceed)

| # | Question | Default |
|---|---|---|
| Q1 | Phone on the public site/PDFs? | No. Use public no-phone PDFs; generate SDE/AI-FDE public variants, and until then link only the general one |
| Q2 | OK to name Exotel clients (Bawa, Kinetic Green, BlueDart, IndusInd/BFIL)? | Only in short bullets that mirror the public résumé |
| Q3 | Domain email (e.g. hi@aryanjaiswal.in)? | Keep aryanjstar3@gmail.com |
| Q4 | Cal.com link? | Omit |
| Q5 | Umami account for custom events? | Vercel Analytics only |
| Q6 | Which older projects stay in the archive? | All, no metrics |
| Q7 | Joveo exact dates? | Year only ("2025") |
| Q8 | Redacted 2-min walkthrough videos? | Hidden slot until a URL exists |
| Q9 | Profile photo on the homepage? | Small, in Contact only |
| Q10 | Vercel or Netlify? | Vercel |
| Q11 | Strip emoji from song captions? | Yes |
| Q12 | Use screenshots of live projects? | Yes |
| Q13 | Real Instagram thumbnails for covers? | No: generated artwork for all 26 (D-18). If you ever want photos, export all 26 at once |
| Q16 | Original artists for the 14 songs marked TODO in CONTENT.md §10.1, plus the title/subtitle for #4 ("Aankhein Teri" / "Some songs aren't sung")? | Hide the artist line until filled; show "Aankhein Teri" with the subtitle "Some songs aren't sung" |
| Q14 | "Currently listening" on notesbyaryan? | Drop unless a link is added |
| Q15 | Any DevOps/cloud work beyond what's listed (certs, personal infra projects) to strengthen that track? | Use what CONTENT.md has |

---

## 10. Gap checklist (tick during Phase 6)
- [x] Template remnants gone (code, package.json, README, favicons, meta, alt text) — grep clean; new `>_` mark
- [x] Favicon set + manifest + theme-color for both schemes
- [x] Per-route OG images (home, notesbyaryan, 5 case studies) · [ ] LinkedIn Post Inspector refresh — Aryan, after deploy
- [x] JSON-LD, sitemap, robots, canonical · [ ] `www` → apex — host setting, Aryan
- [x] 404 + error boundary
- [x] Reduced motion everywhere; `@supports` around scroll timelines (Firefox fallback verified)
- [x] Hover gated; touch alternatives for every hover reveal (tests/interactions.spec.ts)
- [x] JS-off readable · [~] LinkedIn in-app browser: proxied by WebKit/iPhone 13 runs; check on a real phone after deploy
- [x] No theme flash on reload in either system mode (Chromium, WebKit, Firefox); contrast passes in both themes
- [x] iOS Safari: `svh`/`dvh`, safe areas (nav, toast, now-playing bar)
- [x] Print stylesheet on /resume (always light, URLs printed); PDF named `Aryan-Jaiswal-Resume.pdf`
- [ ] Analytics + `?ref=` — analytics off until `NEXT_PUBLIC_ANALYTICS=vercel` (D-20); test on the deployed site
- [x] Link checker + axe + bundle budget in CI (`.github/workflows/ci.yml`, runs once pushed)
- [x] Explicit image sizes; `/public` 0.56 MB
- [x] Greeting scripts render correctly with `lang` attributes
- [x] No client recordings, transcripts or internal screenshots (no internal URLs/IDs either)
- [x] Titles and dates identical across the site and résumé · [ ] LinkedIn, GitHub bio, Naukri — Aryan
- [x] "Last updated" in the footer (+ build hash)
- [x] README rewritten

Sources are listed in [`RESEARCH.md`](./RESEARCH.md).
