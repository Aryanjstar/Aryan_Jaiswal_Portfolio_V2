import type { Metadata } from "next";
import Link from "next/link";

import { BUILD_DATE } from "@/content/profile";

export const metadata: Metadata = { title: "Colophon", description: "How aryanjaiswal.in v3 was built: stack, performance numbers, decisions and credits.", alternates: { canonical: "/colophon" } };

// Numbers measured on a local production build (Lighthouse mobile, Playwright), 3 Nov 2026. Re-measure after big changes.
const numbers = [
  { big: "100", label: "Lighthouse mobile, all four scores", note: "Homepage, music page, colophon and all five case studies" },
  { big: "148 KB", label: "homepage JavaScript, gzipped", note: "Budget 150 KB. The old site shipped 378 KB" },
  { big: "0.9 s", label: "largest contentful paint", note: "Throttled mobile; 1.2 s on the homepage" },
  { big: "0", label: "cumulative layout shift", note: "Every page" },
  { big: "0.81 MB", label: "/public", note: "Was 14 MB across 82 files. Includes three resume PDFs and a song" },
  { big: "90", label: "Playwright checks", note: "Chrome, Safari (iPhone) and Firefox; both themes, JS off, keyboard, reduced motion, axe" },
];

const stack = [
  ["Framework", "Next.js 16 (App Router, Turbopack), React 19.3, TypeScript strict"],
  ["Styling", "Tailwind CSS v4 with CSS tokens; light and dark designed separately, following the system with a toggle and no flash"],
  ["Type", "Instrument Sans for everything, one Instrument Serif italic word per page, JetBrains Mono for numbers and code"],
  ["Motion", "CSS first: scroll-driven reveals and highlighter, View Transitions for the theme switch and tile → case-study morph, a few small client components (terminal, count-up, ⌘K). Reduced motion turns movement off everywhere"],
  ["Content", "One typed, Zod-validated source in content/. A build check fails if a claim that must not be published appears, and the music list is checked against Aryan's order"],
  ["Testing", "Playwright + axe in both themes, a link checker, Lighthouse"],
  ["Rendering", "Static where possible; the homepage renders per request so ?role= links are tailored on the server"],
];

const decisions = [
  "Rebuilt instead of restyling: the old site's showpieces were template components, and they carried most of its weight.",
  "No 3D on the homepage. The craft is in behaviour: the How I ship story, the Tech Specs cross-highlight, build logs, ⌘K.",
  "One accent colour, Apple blue. Green only means “available” or “passed”.",
  "No role menu. Proof re-orders quietly when a link carries ?role=, so the page reads as one engineer, not a list of job titles.",
  "Music covers are generated, not Instagram thumbnails: consistent, theme-aware, and nothing third-party loads until you press play.",
];

const changelog = [
  { v: "v3", when: "Nov 2026", what: "This site. Rebuilt from scratch: Apple-like, light + dark, case studies with build logs, notesbyaryan redesigned." },
  { v: "v2", when: "2025", what: "Next.js site built on a popular open-source portfolio template (globe, bento grid, 3D cards)." },
  { v: "v1", when: "2024", what: "First portfolio: React, Next.js, Three.js and Tailwind." },
];

const credits = [
  ["Instrument Sans & Instrument Serif", "Open-source fonts by Instrument"],
  ["JetBrains Mono", "Open-source font by JetBrains"],
  ["Simple Icons", "Brand icons in Tech Specs (CC0)"],
  ["Ideas", "Apple product pages for the look; Emil Kowalski's motion rules; mechanics like the glow card, number ticker and highlighter from the Magic UI / React Bits family, rebuilt small"],
];

export default function Colophon() {
  return (
    <div className="bg-bg">
      <section className="mx-auto max-w-[980px] px-5 pb-10 pt-14 md:px-8 md:pt-20">
        <p className="enter text-[15px] font-semibold text-muted">Colophon</p>
        <h1 className="display enter mt-2 text-[clamp(2.5rem,6vw,4.5rem)]" style={{ "--i": 1 } as React.CSSProperties}>
          How this site is <span className="serif-word">built</span>.
        </h1>
        <p className="enter mt-4 max-w-[640px] text-[17px] text-ink-2 md:text-[19px]" style={{ "--i": 2 } as React.CSSProperties}>
          v3 · 2026. Designed and built by Aryan, from scratch, to a performance budget. The site is also a frontend sample: everything here is owned code, no UI kit.
        </p>
      </section>

      <section aria-labelledby="numbers" className="mx-auto max-w-[980px] px-5 md:px-8">
        <h2 id="numbers" className="sr-only">
          Numbers
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {numbers.map((n) => (
            <li key={n.label} className="glow reveal rounded-[18px] bg-bg-alt p-5">
              <p className="mono text-[clamp(1.6rem,4vw,2.25rem)] font-semibold leading-none tracking-[-0.03em]">{n.big}</p>
              <p className="mt-2 text-[16px]">{n.label}</p>
              <p className="mt-1 text-[13px] text-muted">{n.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] text-muted">Measured on a local production build, 3 Nov 2026.</p>
      </section>

      <div className="hl-read mx-auto max-w-[760px] px-5 py-16 md:px-8">
        <section aria-labelledby="stack-h" className="reveal">
          <h2 id="stack-h" className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em]">
            Stack
          </h2>
          <dl className="mt-5 divide-y divide-hairline border-y border-hairline">
            {stack.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="decisions-h" className="reveal mt-14">
          <h2 id="decisions-h" className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em]">
            Decisions
          </h2>
          <ul className="mt-5 list-disc space-y-2.5 pl-5 text-[17px] leading-relaxed text-ink-2 marker:text-link">
            {decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="changelog-h" className="reveal mt-14">
          <h2 id="changelog-h" className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em]">
            Changelog
          </h2>
          <ol className="mt-5 space-y-3">
            {changelog.map((c) => (
              <li key={c.v} className="flex gap-4 rounded-[14px] bg-bg-alt p-4">
                <span className="mono w-10 flex-none text-[15px] font-semibold text-link">{c.v}</span>
                <span>
                  <span className="mono block text-[12px] text-muted">{c.when}</span>
                  <span className="text-[16px] text-ink-2">{c.what}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="credits-h" className="reveal mt-14">
          <h2 id="credits-h" className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em]">
            Credits
          </h2>
          <dl className="mt-5 space-y-3">
            {credits.map(([k, v]) => (
              <div key={k}>
                <dt className="font-semibold">{k}</dt>
                <dd className="text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-14 text-[15px] text-ink-2">
          Psst: press <kbd className="mono rounded-[5px] bg-bg-alt px-1.5 py-0.5 text-[13px]">⌘K</kbd>, or type <span className="mono">ship</span> anywhere for debug mode.{" "}
          {BUILD_DATE && <span className="text-muted">Last built {BUILD_DATE}.</span>}
        </p>
        <p className="mt-6 text-[15px]">
          <Link href="/" className="link-quiet font-medium">
            <span aria-hidden>‹ </span>Home
          </Link>
        </p>
      </div>
    </div>
  );
}
