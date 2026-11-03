> **Status (3 Nov 2026):** phases 0–6 are built. For day-to-day work read `AGENTS.md`; for deploying read `docs/DEPLOY.md`; history in `docs/redesign/PROGRESS.md`. The brief below is the original redesign brief and still holds for design and content rules.

# CLAUDE.md — aryanjaiswal.in v3 redesign

You are rebuilding Aryan Jaiswal's portfolio (Next.js, repo `Aryan_Jaiswal_Portfolio_V2`, live at https://aryanjaiswal.in). The current site is a near-verbatim copy of the JS Mastery / Aceternity template with outdated and partly incorrect content. The goal is a site that a recruiter can verify in 15–30 seconds **and** that people remember.

## Read these first, in this order

1. `docs/redesign/REDESIGN_PLAN.md` — audit, concept, information architecture, feature specs, phases, acceptance criteria, decisions log. **The source of truth for what to build.**
2. `docs/redesign/DESIGN.md` — design tokens, typography, color, motion rules, interaction catalog, banned list. **The source of truth for how it looks and moves.**
3. `docs/redesign/CONTENT.md` — every word of copy, every metric, every link, plus the list of claims that must NOT appear. **The source of truth for what the site says.**

If the private `Aryan_Resume_Context` repo is available on this machine, its `profile/CLAIMS.md` and `HANDOFF.md` outrank everything here on facts. Never outrank them with your own wording.

## Hard rules

- **Never invent facts, metrics, dates, users, uptime, ranks or awards.** Use only what `CONTENT.md` gives you. If a section needs a number that isn't there, write it without a number and add a `TODO(aryan):` comment plus an entry in the plan's Open Questions.
- **Do not reintroduce the banned claims** listed in `CONTENT.md` § "Never publish" (e.g. "150K+ users", "8x WebSocket capacity", "99.9% uptime", DevTinder "ANN/vector search", Cognitive-OS "51 developers / 0.84", GFG rank 4, "India's only Gold Startup Scout").
- **No template DNA.** Delete Aceternity/JS Mastery components rather than restyling them: Spotlight, TextGenerateEffect, BentoGrid, Globe/three-globe, MovingBorder, 3D Pin, InfiniteMovingCards, CanvasRevealEffect, BackgroundGradientAnimation, MagicButton, the purple-on-navy theme, `#000319`, Inter.
- **Look:** Apple-like, creative-minimal, one **Apple-blue** accent. **Light + dark mode that follows the system, with a toggle** (plan F7, no flash, both themes designed, not inverted).
- **Identity:** "one engineer, many roles". Aryan targets every entry-level track (SDE/MTS, AI, backend, frontend, full-stack, DevOps/cloud, FDE). Voice AI is his most recent highlight, **not** the site's theme. No phone/IVR/voice styling across the site.
- **Recruiter path first.** At 390px wide, above the fold must show name, current role, one-line pitch, "open to roles" status, and Resume + Email actions. Nothing creative may delay or hide this. Content is server-rendered and readable with JS off and with `prefers-reduced-motion: reduce`.
- **Performance budget:** homepage first-load JS ≤ 150 KB gzipped, LCP < 2.5 s on throttled mobile, CLS < 0.1, INP < 200 ms, Lighthouse mobile ≥ 95 for Performance, Accessibility, Best Practices and SEO. No three.js / WebGL on the homepage.
- **Accessibility:** WCAG 2.2 AA. Visible focus rings, skip link, full keyboard use of every interactive feature (command palette, role lens, toggles), `lang` attributes on non-English text, hover effects gated behind `(hover: hover) and (pointer: fine)`, nothing reachable only by hover, sound is off by default and never autoplays.
- **Client confidentiality:** client names may appear only where `CONTENT.md` already uses them. No recordings, transcripts, internal screenshots, customer data or internal identifiers.
- **Motion discipline:** follow `DESIGN.md` § Motion. Animate only `transform`, `opacity`, `clip-path`, `filter` and colors. One orchestrated moment per page; everything else is quick, purposeful feedback.

## Working method

- Branch: `redesign/v3` (Aryan merges to `main` himself from another machine). Commit at the end of each phase with a clear message; never push to `main`.
- Work phase by phase as listed in the plan. At the end of each phase run the phase's acceptance checks and record the results in `docs/redesign/PROGRESS.md` (create it): what shipped, check results, deviations from the plan and why, open questions.
- Any decision that differs from the plan goes in the plan's Decisions Log (append `D-xx`, date, decision, reason). Do not silently diverge.
- Before writing UI, if available, load the `frontend-design` skill (Anthropic's official plugin/skill) and, optionally, Emil Kowalski's `emil-design-eng` skill. Their key rules are already embedded in `DESIGN.md`, so the build does not depend on installing them.
- After each visual phase, take Playwright screenshots at 390×844 and 1440×900 in **light and dark** (`colorScheme`), plus reduced motion, look at them, and fix what looks off before moving on. Save to `docs/redesign/screens/<phase>/`.
- Prefer small, owned components over UI-kit copy-paste. You may borrow *mechanics* from React Bits / Motion Primitives / Codrops, but restyle them to `DESIGN.md` and keep the code readable.

## Commands (after Phase 1)

- `npm run dev`, `npm run build`, `npm run start`
- `npm run lint` (ESLint flat config; `next lint` no longer exists in Next 16)
- `npm run typecheck` (`tsc --noEmit`)
- `npm run test:e2e` (Playwright: smoke, axe, keyboard, reduced motion, both color schemes, no-theme-flash, 390/1440 screenshots)
- `npm run check:links` (lychee or the Playwright link crawler)
- `npm run analyze` (bundle analyzer)

Node ≥ 20.9 is required.
