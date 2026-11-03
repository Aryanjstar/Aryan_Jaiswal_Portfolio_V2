"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-[680px] flex-col justify-center px-5 py-24">
      <p className="mono text-[13px] text-muted">500</p>
      <h1 className="display mt-3 text-[clamp(2rem,6vw,3.5rem)]">Something broke on my side.</h1>
      <p className="mt-4 text-ink-2">The rest of the site is fine. Try again, or head home.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">Try again</button>
        <Link href="/" className="btn btn-ghost">Home</Link>
      </div>
    </section>
  );
}
