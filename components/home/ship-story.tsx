"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { ShipStep } from "@/content/ship";
import { cn } from "@/lib/cn";

import { ShipArtifactCard } from "./ship-artifact";

/**
 * "How I ship" (D-16, I9). The layout is decided by CSS, not JS, so the page height never changes after
 * hydration (anchor links like /#contact land correctly and CLS stays 0):
 * - default (mobile, reduced motion, JS off): stacked steps with their artifact inline;
 * - `html.js` + ≥1024px + motion allowed: sticky story, the right-hand artifact swaps as each step
 *   crosses the middle of the viewport.
 */
export function ShipStory({ steps }: { steps: ShipStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="ship">
      <ol className="ship-steps">
        {steps.map((s, i) => (
          <li
            key={s.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-idx={i}
            className={cn("ship-step reveal", active !== i && "ship-dim")}
          >
            <div>
              <p className="mono text-[13px] text-muted">0{i + 1}</p>
              <h3 className="mt-1 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold tracking-[-0.025em]">
                <button type="button" onClick={() => jump(i)} className="text-left">
                  {s.verb}
                </button>
              </h3>
              <p className="mt-3 max-w-[460px] text-[17px] leading-relaxed text-ink-2 md:text-[19px]">{s.line}</p>
              <p className="mt-3 text-[15px]">
                <span className="text-muted">From </span>
                <Link href={s.from.href} className="link-quiet font-medium">
                  {s.from.label} <span className="chev" aria-hidden>›</span>
                </Link>
              </p>
            </div>
            <div className="ship-inline mt-6 md:mt-0">
              <ShipArtifactCard a={s.artifact} />
            </div>
          </li>
        ))}
      </ol>

      <div className="ship-panel relative" aria-hidden>
        <div className="sticky top-[calc(50vh-150px)]">
          <div className="mb-5 flex gap-1.5">
            {steps.map((s, i) => (
              <span key={s.id} className={cn("h-1 flex-1 rounded-full transition-colors duration-300", i <= active ? "bg-blue" : "bg-hairline")} />
            ))}
          </div>
          <div className="grid">
            {steps.map((s, i) => (
              <div key={s.id} className={cn("ship-card [grid-area:1/1]", active === i ? "is-active" : "pointer-events-none")}>
                <ShipArtifactCard a={s.artifact} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
