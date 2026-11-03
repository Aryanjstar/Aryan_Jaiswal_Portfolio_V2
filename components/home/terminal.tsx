"use client";

import { useEffect, useRef, useState } from "react";

import { terminalLines } from "@/content/terminal";

/**
 * A terminal that types real facts once it scrolls into view. Server HTML renders every line
 * (readable with JS off and to screen readers); typing is a visual layer only, skipped with reduced motion.
 */
export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState<number | null>(null); // characters revealed; null = show all

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const total = terminalLines.reduce((n, l) => n + l.cmd.length + 1, 0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const n = Math.floor((t - start) / 28);
          setTyped(n);
          if (n < total + 8) raf = requestAnimationFrame(tick);
          else setTyped(null);
        };
        setTyped(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const budget = typed ?? Infinity;
  const offsets = terminalLines.map((_, i) => terminalLines.slice(0, i).reduce((n, l) => n + l.cmd.length + 1, 0));
  return (
    <div ref={ref} className="terminal glow reveal mx-auto mt-10 max-w-[860px] overflow-hidden rounded-[18px] border border-hairline bg-[var(--term-bg)] text-left shadow-[var(--shadow-float)]">
      <div className="flex items-center gap-2 border-b border-[var(--term-line)] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
        <span className="mono ml-2 text-[12px] text-[var(--term-dim)]">aryan@macbook: ~</span>
      </div>
      <div className="mono space-y-2.5 p-5 text-[13px] leading-relaxed md:text-[14px]">
        {terminalLines.map((l, i) => {
          const left = budget - offsets[i];
          const shown = Math.max(0, Math.min(l.cmd.length, left));
          const done = left > l.cmd.length;
          if (typed !== null && shown === 0 && !done) return null;
          return (
            <div key={i}>
              <p className="text-[var(--term-fg)]">
                <span className="text-[var(--term-accent)]">❯ </span>
                {typed === null ? l.cmd : l.cmd.slice(0, shown)}
                {typed !== null && !done && <span className="term-caret" aria-hidden />}
              </p>
              {(typed === null || done) && <p className="term-out text-[var(--term-dim)]">{l.out}</p>}
            </div>
          );
        })}
        {typed === null && (
          <p className="text-[var(--term-fg)]">
            <span className="text-[var(--term-accent)]">❯ </span>
            <span className="term-caret" aria-hidden />
          </p>
        )}
      </div>
    </div>
  );
}
