# DESIGN.md — "Product Page" (revision 3)

The design system for aryanjaiswal.in v3: **Apple-like, creative-minimal, Apple-blue accent, light + dark (follows the system, with a toggle)**. Tokens live in `app/globals.css` (Tailwind v4 `@theme` + `[data-theme]` overrides). Change tokens here first, then in code.

## 1. Direction in one paragraph

The site reads like an Apple product page whose product is an engineer. It uses neutral surfaces, near-black (or near-white) type, generous whitespace, big confident sans headlines at weight 600, rounded tiles, capsule buttons and **one accent: Apple blue**, reserved for actions, links, selection and focus. Chapters are separated by surface colour, not lines. The creativity lives in **behaviour**: the hero role word that re-tailors the page, the "How I ship" scroll story, the Tech Specs sheet that lights up evidence across the page, build-log case studies, ⌘K, and the music artwork grid. If a section could pass for an Apple page, it's right. If it looks like a dev-portfolio template, it's wrong.

## 2. Banned (anti-convergence list)

- **Fonts:** Inter / Inter Tight, Roboto, Arial, Space Grotesk, Geist, Poppins, Montserrat. SF Pro isn't licensed for the web; the system stack may appear only as a fallback.
- **Colour:** purple/indigo/violet, gradient text, neon glows, spotlight beams, aurora/mesh blobs, multiple accent colours, navy `#000319`.
- **Template pieces:** bento grids, globes, logo walls, skill bars, testimonial marquees, moving gradient borders, 3D tilt/pin cards.
- **Decoration:** emoji in UI chrome, glassmorphism as decoration (the translucent sticky nav is fine).
- **Motion:** `transition: all`, `ease-in` on UI, scaling from 0, UI animations over 300 ms (only the hero entrance and scroll stories run longer), scroll-jacking.
- **Theme:** an "inverted" dark theme. Dark is designed with its own tokens below.

## 3. Colour tokens

Contrast ratios below are measured against the stated background.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `#121214` | Default chapter |
| `--bg-alt` | `#F5F5F7` | `#1C1C1E` | Alternate chapters, cards on `--bg` |
| `--card` | `#FFFFFF` on alt / `#F5F5F7` on bg | `#1C1C1E` on bg / `#232326` on alt | Tiles, cards |
| `--ink` | `#1D1D1F` (16.8:1) | `#F5F5F7` (17.2:1) | Headlines, body |
| `--ink-2` | `#424245` (10.0:1) | `#D1D1D6` | Secondary text |
| `--muted` | `#6E6E73` (5.1:1); `#636366` on alt (5.5:1) | `#A1A1A6` (7.3:1; 6.6 on alt) | Meta, captions |
| `--hairline` | `#D2D2D7` | `#38383A` | Card outlines, inputs (decorative, not text) |
| `--blue` | `#0071E3` | `#0071E3` | **Fills:** primary buttons, selected segments, progress, focus halo. White text on it: 4.7:1 |
| `--link` | `#0066CC` (5.6:1 on white, 5.1 on alt) | `#2997FF` (6.2:1; 5.6 on alt) | Links and the hero role word (text) |
| `--blue-soft` | `#E8F1FD` (ink on it 14.8:1) | `#0B2A4A` (ink on it 13.4:1) | Role Lens highlight wash, selection |
| `--status` | `#28A745` | `#30D158` | The "open to roles" dot only (non-text) |
| `--pass` / `--fail` | dot `#28A745` + ink text on `#E8F7EE`; `#B42318` on `#FDECEC` (5.8:1) | dot `#30D158` + ink on `#10261A`; `#FF6B6B` on `#2A1414` (6.3:1) | Build-log chips |

Rules:
- Blue is the only accent. Green exists only as the availability dot and pass chips (semantic, tiny).
- **Buttons:**
  - Primary: blue capsule, white label.
  - Secondary: ink capsule with a `--bg` label (inverts per theme).
  - Tertiary: link text + "›".
- **Links:** `--link` colour, no underline at rest in nav; underlined (1px, offset 3px) in body text, 2px on hover.
- **Focus ring:** `outline: 2px solid var(--blue); outline-offset: 2px` (≥ 3:1 against both backgrounds).
- `::selection { background: var(--blue-soft); color: var(--ink) }`.
- Squint test: in any viewport, only one or two blue elements compete for attention.

## 4. Typography

| Role | Family | Settings |
|---|---|---|
| Display + UI + body | **Instrument Sans** (variable `wght`, `wdth`) | Headlines 600, tracking −0.02 to −0.03em, line-height 1.05. Body 17px / 400 / 1.5 / −0.01em |
| Accent | **Instrument Serif** *italic* | At most one word per page headline ("software that *ships*") |
| Data | **JetBrains Mono** | Highlights, build logs, specs values, keyboard hints; `tabular-nums` |
| Greeting tooltip | Noto Sans Devanagari / Tamil / Telugu (subset, `preload:false`) | With `lang` attributes |

Scale (fluid):

| Element | Size and weight |
|---|---|
| Hero headline | `clamp(2.75rem, 7vw, 5.5rem)` / 600 |
| Chapter headline | `clamp(2rem, 4.5vw, 3.25rem)` / 600 |
| Eyebrow | 14–17px / 600 in `--muted` |
| Card title | 21–28px / 600 |
| Body | 17px |
| Small | 14px |
| Meta | 12px |

Hierarchy comes from size and weight, not colour.

## 5. Layout and shape

- **Chapters:** full-bleed bands alternating `--bg` / `--bg-alt`. Text-led content max 980px; grids max 1200px. Vertical padding `clamp(88px, 13vw, 168px)`.
- **Alignment:** centered hero and chapter headlines; content below can be left-aligned.
- **Radius tiers:**

  | Element | Radius |
  |---|---|
  | Tags | 6px |
  | Inputs / small controls | 10px |
  | Cards | 18px |
  | Feature tiles / media | 28px |
  | Buttons / segments | 980px (capsule) |
  | Dots / avatars | 50% |

- **Depth:** flat by default. A soft shadow appears only on floating layers (palette, popovers, toasts, hover preview, now-playing bar): light `0 8px 30px rgb(0 0 0 / .08)`, dark `0 8px 30px rgb(0 0 0 / .5)` + 1px `--hairline`.
- **Nav:** 52px, sticky. Translucent `--bg` at 72% + `saturate(180%) blur(20px)`; a hairline bottom border after scrolling.
- **Grid and viewport:** 8px base; mobile padding ≥ 20px; no horizontal scroll at 320px; `100dvh` hero; safe-area insets respected.
- **Imagery:** real product screenshots in theme-aware tiles, with an optional simple CSS device frame. No template illustrations, no stock imagery.

## 6. Theme behaviour (implements plan F7)

- `next-themes`: `attribute="data-theme"`, `defaultTheme="system"`, `enableSystem`. Tokens are defined under `:root` (light) and `[data-theme="dark"]`.
- Set `color-scheme: light` / `dark` per theme. Provide `theme-color` meta for both schemes and update it on toggle.
- **Toggle:** a sun/moon icon button in the nav. The ⌘K palette offers System / Light / Dark. Switching uses a View Transition circular reveal from the toggle (≤ 350 ms); otherwise a 150 ms crossfade; instant with reduced motion.
- Every component, screenshot tile, chip, chart and generated cover has both variants. Icons use `currentColor`. Monochrome logos only.
- Print and OG images are always light.

## 7. Motion

### 7.1 Tokens

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-apple: cubic-bezier(0.28, 0.11, 0.32, 1);
--dur-press: 120ms; --dur-fast: 160ms; --dur-ui: 220ms; --dur-layout: 260ms;
--dur-reveal: 600ms;   /* chapter reveal, once */
--dur-hero: 900ms;     /* the one orchestrated entrance, total */
```

Springs only for pointer-following (magnetic CTA, hover preview): `{ stiffness: 300, damping: 30, mass: 0.6 }`.

### 7.2 Rules

These combine Anthropic's frontend-design guidance, Emil Kowalski's design-engineering rules and Apple's calm.

1. **One orchestrated moment per page** (the hero entrance). Chapter reveals are quiet: opacity + 16px rise, 600 ms, once.
2. **Purpose first:** continuity, state, feedback or explanation.
3. **Easing:** ease-out for enter/exit, ease-in-out for movement, ease for colour. Never ease-in.
4. **Duration:** UI 120–260 ms; exits ~30% faster than enters.
5. **Press and entry:** press scale 0.97 for 120 ms. Never scale from 0; enter from 0.96 + opacity.
6. **Stagger:** 40 ms, never blocking interaction.
7. **Properties:** animate only `transform`, `opacity`, `clip-path`, `filter` (≤ 8px blur) and colours.
8. **Hover:** gate with `@media (hover: hover) and (pointer: fine)`. Every hover has a focus and a touch equivalent.
9. **Reduced motion:** `MotionConfig reducedMotion="user"` + CSS overrides. No movement, fades ≤ 120 ms; scroll stories become static stacked lists.
10. **Background work:** pause continuous animation offscreen and in hidden tabs.
11. **Scroll stories:** sticky positioning + IntersectionObserver step switching, with CSS `view()` timelines as an `@supports` enhancement. Never change scroll speed; no Lenis.

## 8. Interaction catalog

Every row must work in both themes.

| # | Element | Hover (fine pointer) | Click / press | Focus | Touch | Reduced motion | Impl |
|---|---|---|---|---|---|---|---|
| I1 | **Hero role word** ("software engineer ▾") | Underline thickens; a faint preview of the next role fades in after it | Click cycles to the next role; the ▾ opens a popover list. The page re-tailors (F3) and a toast reads "Showing highlights for Backend" | Enter opens list; arrows choose | Tap opens list | Instant swap | Button + Radix Popover + Motion |
| I2 | **"Hi" greeting** | Tooltip cycles Hello · नमस्ते · வணக்கம் · నమస్కారం · नमस्कार | Click pins the tooltip | Focus shows it | Tap toggles | No cycling animation; static list | Small client component |
| I3 | **Primary CTA "Download résumé"** | Magnetic ≤ 6px; arrow nudges down 2px; fill brightens 6% | Press 0.97; downloads the role PDF; toast | Ring | Press state | No magnet | Motion `useSpring` |
| I4 | **Links / "Learn more ›"** | Underline 1→2px; chevron slides 2px | — | Ring | — | No slide | CSS |
| I5 | **Status pill** | Dot pulse quickens; tooltip "Replies within a day" | Scrolls to Contact | Same | Tap | No pulse | CSS |
| I6 | **Role Lens** (segmented) | Segment shows `--bg-alt` | Selected pill slides (shared `layoutId`, 260 ms); content re-orders; matching bullets get a `--blue-soft` wash + blue left bar, others dim to 65% | Arrow keys, radiogroup | Scrollable segments with fade edges | Instant | Motion + CSS |
| I7 | **Highlights numbers** | Number lifts 2px; scope note fades in | Click pins the note | Focus shows | Tap toggles | Fade only | CSS |
| I8 | **Experience bullets** | Blue left bar; "Case study ›" appears | Navigate | Same | Link always visible | — | CSS |
| I9 | **How I ship** (sticky story) | — | Step titles are buttons that jump to the step | Same | Swipe/scroll | Stacked list | Sticky + IO |
| I10 | **Selected-work tiles** | Screenshot scales 1.00→1.03 inside the clipped tile (400 ms ease-apple); "Read case study ›" chevron slides | View Transition morphs the tile image into the case-study hero (fallback: normal nav) | Same as hover | Link visible | No scale | CSS + `<ViewTransition>` |
| I11 | **More projects list** | Row gets `--bg-alt`; cursor-follow thumbnail | Opens live/repo | Docked thumbnail | Inline thumbnail | Static | CSS + Motion |
| I12 | **Tech Specs items** | Everything using that tech gets a `--blue-soft` wash; "Used in N places" | Pins; popover lists the places with links | Same; Esc clears | Tap pins | No sweep | data-attrs + `:has()` + JS fallback |
| I13 | **Recognition rows** | Badge lifts 2px; ↗ appears | Opens source | Same | — | — | CSS |
| I14 | **⌘K palette** | — | Opens centered (0.96→1, 200 ms) | Full keyboard, focus trap | Bottom sheet | Fade | cmdk |
| I15 | **Theme toggle** | Icon rotates 15° | Circular View Transition reveal from the button | `aria-label` "Switch to dark theme" | Tap | Instant | View Transitions API |
| I16 | **Résumé view switch** | Tooltip "Plain résumé view" | Swaps to Recruiter Mode with a fade | `R` shortcut | Tap | Same | Search param, SSR |
| I17 | **Copy email** | Underline | Copies + toast (`role=status`) | Same | Tap | Fade | sonner |
| I18 | **Build-log steps** (case studies) | Highlights the matching diagram stage | Click a stage → scroll to its steps | Same | Tap | — | CSS + IO |
| I19 | **Music artwork tiles** | Artwork lifts 4px with soft shadow; play glyph; mini equalizer animates | Opens the track sheet and sets "now playing" | Same | Tap | Static | CSS + Motion |
| I20 | **Now-playing bar** | Controls highlight | Prev/next, Watch, click-to-load embed | Keyboard controls | Tap | No equalizer | Client component |
| I21 | **Debug-mode Easter egg** | — | Type `ship` or the Konami code → mono log card + component outlines | Esc exits | — | Static | Small client component |

## 9. Components to build (owned, no kits)

| Area | Components |
|---|---|
| Nav and hero | `TopNav`, `ThemeToggle`, `RoleWord`, `Greeting`, `StatusPill` |
| Buttons and actions | `CapsuleButton` (primary/secondary/tertiary), `MagneticButton`, `CopyEmail` |
| Homepage chapters | `RoleLens`, `Chapter`, `Highlights`, `ExperienceRole`, `ShipStory`, `WorkTile` + `DeviceFrame`, `ProjectList` + `HoverPreview`, `TechSpecs`, `Recognition`, `OffTheClock`, `Contact`, `Footer` |
| Global | `CommandPalette`, `RecruiterView`, `DebugOverlay`, `NotFound`, `OgImage` |
| Résumé and case studies | `ResumeDoc`, `CaseStudyHero`, `BuildLog`, `StageDiagram`, `ResultCard`, `ReadingProgress` |
| Music | `CoverArt` (light/dark), `TrackGrid`, `TrackSheet`, `NowPlayingBar`, `LiteInstagramEmbed` |

## 10. Self-review before calling any screen done

- At 390px, are name, role, status, Résumé and Email visible without scrolling, in both themes?
- Is blue the only accent, with at most two blue elements per viewport?
- Would it pass as an Apple page? If it's too busy, remove something.
- Is there exactly one orchestrated motion moment per page?
- Does every hover have focus and touch equivalents?
- Does dark look *designed*, not inverted? No flash on reload?
- Is anything recognizable from the JS Mastery template or the banned list? Remove it.
