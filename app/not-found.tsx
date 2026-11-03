import Link from "next/link";

import { OpenPaletteButton } from "@/components/site/open-palette-button";

export const metadata = { title: "Not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-[680px] flex-col justify-center px-5 py-24">
      <p className="mono text-[13px] text-muted">404</p>
      <h1 className="display mt-3 text-[clamp(2rem,6vw,3.5rem)]">
        This page didn&apos;t make it to <span className="serif-word">production</span>.
      </h1>
      <ol className="mono mt-8 space-y-1.5 rounded-[18px] bg-bg-alt p-5 text-[13px] text-ink-2" aria-label="Build log">
        <li><span className="text-[var(--pass-dot)]">✓</span> request received</li>
        <li><span className="text-[var(--fail-ink)]">✗</span> route not found</li>
        <li><span className="text-link">↻</span> suggesting alternatives</li>
      </ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">Home</Link>
        <Link href="/#work" className="btn btn-ghost">Work</Link>
        <Link href="/resume" className="btn btn-ghost">Resume</Link>
        <OpenPaletteButton className="btn btn-ghost" />
      </div>
    </section>
  );
}
