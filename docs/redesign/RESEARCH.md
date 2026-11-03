# RESEARCH.md: what the redesign decisions are based on

Compiled 2–3 Nov 2026 from web research (recruiter and hiring-manager sources, Reddit/HN/Blind threads, design-system and AI-UI guides, showcase sites), a code comparison of the current site against its original template, and Aryan's own career context. Each finding cites its source.

## 1. How recruiters and hiring managers use portfolios
- **Time:** about 15 seconds on the first screen ("Is there enough here to justify forwarding this candidate?"). Aceternity's own template page says hiring managers give a site 15–40 seconds. These are practitioner estimates, not controlled studies. ([SlateGit](https://slategit.com/blog/developer-portfolio-examples-that-got-hired), [Aceternity](https://ui.aceternity.com/portfolio-website-templates))
- **What they check:** recency, original work over tutorial clones, a clear one-line purpose per project, live signals, a visible contact without scrolling, an ATS-readable résumé, a working mobile layout. Common mistakes: dead demo links, too many projects, a buried résumé, a template copied verbatim. ([DevBio](https://devbio.me/blogs/developer-portfolio-guide-2026))
- **Is a site needed at all?** Profy.dev surveyed 60+ hiring managers: 65% would look at an inexperienced candidate's site, but 51% said not having one wouldn't lower chances. One commenter had rejected candidates for over-engineered sites. A Hover survey of 121 hiring professionals found 86% visit when given the option and 71% say quality influences them. ([Profy.dev](https://dev.to/profydev/this-survey-among-60-hiring-managers-reveals-don-t-waste-your-time-on-a-react-portfolio-website-17ge/comments), [Hover](https://hover.blog/online-portfolio-site-importance/))
- **Tutorial copies count for little;** portfolios help only when they show original work. ([Blind thread](https://www.teamblind.com/post/do-you-look-at-candidates-portfolio-zlbuydfd))
- **Mobile matters:** many visits come from phones, often inside the LinkedIn app. Near-zero time-on-page from mobile visitors often means the site breaks on phones. Track résumé downloads and email clicks, and tag links per channel. ([SlateGit analytics](https://slategit.com/blog/portfolio-analytics-are-recruiters-actually-visiting-your-site))
- **What strong sites share:** loads in < 2 s, Lighthouse ≥ 90, 3–4 projects visible quickly, a live link per project, a short human "about", a working contact link. The archetypes that get people hired range from minimalist to code-first write-ups to the "site itself is the demo" frontend showcase. ([SlateGit](https://slategit.com/blog/developer-portfolio-examples-that-got-hired))

## 2. What different engineering roles look for (Aryan targets all entry-level tracks)
- **FDE / AI:** production deployments with real integration work (retries, idempotency, webhooks, OAuth), judgment under messy conditions, customer communication, and honest case studies (what broke, diagnosis, fix, what you'd do differently). Video walkthroughs often beat polished demos. ([fde.academy](https://fde.academy/blog/how-to-build-a-forward-deployed-engineer-portfolio), [Perspective](https://getperspective.ai/blog/how-to-hire-an-fde-the-2026-forward-deployed-engineer-hiring-playbook))
- **SDE / backend / full-stack / DevOps:** the same "proof over claims" pattern. A strong technical write-up is a major signal for infrastructure and platform roles. For frontend roles, the portfolio is itself the technical evaluation, so a heavy page that fails Lighthouse hurts. ([SlateGit](https://slategit.com/blog/developer-portfolio-examples-that-got-hired))
- **Implication:** one site, with proof re-ordered by role (the Role Lens), plus 5 case studies that cover AI, backend/integrations, infra, and full-stack.

## 3. The current site vs its template (code comparison, 3 Nov 2026)
The repo began as [adrianhajdin/portfolio](https://github.com/adrianhajdin/portfolio) (JS Mastery, Aceternity UI). Line diffs show the visual "wow" components are near-verbatim copies:
- `grid-globe.tsx`: ~8 of 406 lines changed
- `globe.tsx`: ~19 of 309
- `canvas-reveal-effect.tsx` (WebGL): ~5 of 311
- `spotlight.tsx`: ~5 of 55
- `text-generate-effect.tsx`: ~9 of 59
- `3d-pin.tsx`: ~39 of 184
- `moving-borders.tsx`: ~29 of 144
- `background-gradient-animation.tsx`: ~35 of 198

Aryan's own work is the music page, résumé page, projects/experience pages, highlights and content. Aceternity-style UI is recognizable as the "dark-mode SaaS landing" look, and it ships Framer Motion plus three.js weight. ([PkgPulse comparison](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)) **Conclusion:** revamp the presentation layer; reuse the content and assets.

## 4. Getting distinctive (non-"AI slop") UI from AI coding tools
- **Anthropic's frontend-design guidance:**
  - avoid Inter/Roboto/Arial/system fonts and the Space Grotesk convergence; avoid purple gradients
  - commit to one aesthetic; pair contrasting typefaces; use extreme size and weight jumps
  - one dominant color with sharp accents
  - one well-orchestrated page-load moment rather than scattered micro-interactions
  - atmospheric backgrounds, CSS variables, a DESIGN.md
  - ([Anthropic](https://claude.com/resources/articles/improving-frontend-design-through-skills), [frontend-design plugin](https://claude.com/marketplace/plugins/frontend-design))
- **Workflow tips:** declare the direction before code; name the banned defaults; generate variants; iterate by naming what converged. ([Claude Code frontend-design guide](https://thomas-wiegold.com/blog/claude-code-frontend-design-plugin/))
- **Emil Kowalski's design-engineering rules (emil-design-eng skill):**
  - don't animate frequent or keyboard actions
  - easing: ease-out for enter/exit, ease-in-out for movement, never ease-in
  - durations: buttons 100–160 ms, popovers 125–200 ms, dropdowns 150–250 ms, modals 200–500 ms, UI under 300 ms
  - press scale 0.95–0.98; never scale from 0
  - stagger 30–80 ms; exits faster than enters
  - animate only transform/opacity; gate hover with `(hover:hover) and (pointer:fine)`
  - reduced motion keeps opacity and color
  - ([skill summary](https://skillselion.com/skills/emilkowalski/skill/emil-design-eng))

## 5. Apple-style minimalism (Aryan's chosen direction)
- **Foundation:** `#FFFFFF`, `#F5F5F7`, `#000`; ink `#1D1D1F`; secondary `#6E6E73`; hairline `#D2D2D7`.
- **Blue:** Action Blue `#0071E3` for buttons and focus; link `#0066CC` on light and `#2997FF` on dark; no competing accents.
- **Type:** display at weight 600 with tight tracking (80px hero, 56/48/40 headings), body 17px / 1.47.
- **Layout and shapes:** 8px spacing base; sections separated by surface color; radius tiers (tags 5, controls 8–12, cards 16–18, modules 28–36, capsules 980px); soft shadows used sparingly.
- **Fonts:** SF Pro is Apple-only, so use an open substitute.
- **Sources:** [Apple design-system breakdown](https://cdn.jsdelivr.net/npm/oh-my-opencode@4.18.2/dist/skills/frontend/references/design/apple.md), [Kombai Apple gallery](https://kombai.com/gallery/inspirations/apple/)

## 6. Accent color decision
Compared green, Apple blue, orange and teal in light and dark (mock: `assets/accent-options.png`). Aryan chose **Apple blue**: the most professional choice for every role type, and blue link text passes contrast (5.6:1 on white, 6.2:1 on dark). Bright greens are only ~2.2:1 as text on white. ([Icons8 green guide](https://blog.icons8.com/articles/green-color-guide), [Figma shades of green](https://figma.com/resource-library/shades-of-green/))

Contrast was checked with the WCAG formula for every token pair used:
- blue fill + white text: 4.7:1
- `#0066CC` on white: 5.6:1
- `#2997FF` on `#121214`: 6.2:1
- dark ink `#F5F5F7` on `#121214`: 17.2:1
- dark muted `#A1A1A6`: 7.3:1

## 7. Dark mode
Aryan chose follow-system + toggle, "only if it can be done perfectly". Requirements drawn from common failure modes:
- no flash of the wrong theme (next-themes' inline script)
- both themes designed rather than inverted
- `color-scheme` and `theme-color` per theme
- persistence, and live response to OS changes
- contrast verified in both themes
- screenshots and axe in both themes

## 8. Reference portfolios worth studying (borrow ideas, not looks)

| Portfolio | What to borrow |
|---|---|
| Brittany Chiang | Always-visible identity |
| [Paco Coursey](https://paco.me/) | Restraint and a /now page |
| Lee Robinson | Fast, text-first |
| [Rauno Freiberg](https://rauno.me/craft) | Dated craft log |
| Emil Kowalski | Motion discipline, toasts |
| Josh Comeau | Playful but accessible delight, theme toggle |
| [Henry Heffernan](https://os.henryheffernan.com/projects/software) | Spectacle layer **plus** a fast 2D fallback |
| Lynn Fisher | Versioned yearly redesigns |
| [ajmaln redesign](https://github.com/ajmaln/ajmaln.github.io/pull/1) | ⌘K and role text tested at 390px with reduced motion |

Galleries for mood boards: Godly, Awwwards, Minimal Gallery, Bestfolios, [Colorlib developer portfolios](https://colorlib.com/wp/developer-portfolios/).

## 9. Platform facts used
- [Next.js 16](https://nextjs.org/blog/next-16):
  - Turbopack is the default; Node ≥ 20.9
  - async `params`; `next lint` removed; `middleware` → `proxy`
  - React 19.2, with `<ViewTransition>` still experimental in Next ([docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition))
- [Tailwind v4](https://tailwindcss.com/blog/tailwindcss-v4) ([upgrade guide](https://tailwindcss.com/docs/upgrade-guide)): CSS-first `@theme`.
- **Motion:**
  - `LazyMotion` + `m` cuts the initial cost to ~5 KB ([docs](https://motion.dev/docs/react-reduce-bundle-size))
  - `MotionConfig reducedMotion` defaults to `"never"`, so set `"user"` ([docs](https://motion.dev/docs/react-motion-config))
- **GSAP** became fully free (including all plugins) in 3.13. ([GSAP](https://gsap.com/blog/3-13/))
- **CSS scroll-driven animations:** Chrome and Safari 26 support them; Firefox support is reported inconsistently, so use `@supports`. ([demo/status](https://scroll-driven-animations.style/demos/baseline-newly-available/css/))
- **Core Web Vitals:** LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. ([web.dev](https://web.dev/articles/vitals))
- **Instagram oEmbed:**
  - the unauthenticated endpoint was deprecated in Oct 2020 and now needs a Meta app token ([changelog](https://developers.facebook.com/docs/graph-api/changelog/non-versioned-changes/oct-24-2020), [docs](https://developers.facebook.com/docs/instagram/oembed))
  - further changes announced Apr 2025 ([Meta blog](https://developers.facebook.com/blog/post/2025/04/08/oembed-updates/))

## 10. Limits of this research
- Recruiter time figures are practitioner estimates.
- The surveys are small and partly older.
- First-party Reddit/HN threads specifically about Aceternity clones were thin. The "template fatigue" point rests on the code comparison, Anthropic's guidance and how widely the template is copied.
- The old site couldn't be built in the research sandbox, so Phase 0 records live Lighthouse and bundle numbers before any change.
