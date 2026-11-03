"use client";

import { useRef, useState } from "react";

import type { Project } from "@/content/schema";
import { cn } from "@/lib/cn";

const PLACE: Record<string, string> = {
  "ai-career-navigator": "career-navigator",
  myriox: "myriox",
  devtinder: "devtinder",
  "cognitive-os": "cognitive-os",
  "digit-motor-fnol": "fnol",
};

/** "github.com/Aryanjstar/<repo>" for the preview card, or the live host when there is no repo. */
function repoPath(p: Project) {
  const href = p.links.find((l) => l.label === "GitHub")?.href ?? p.links[0]?.href ?? "";
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Compact list (I11). Fine pointers get a preview card that follows the cursor (screenshot when one exists,
 * otherwise the stack). Touch and keyboard see everything inline; nothing depends on hover.
 */
export function ProjectList({ projects, matchSlugs }: { projects: Project[]; matchSlugs: string[] }) {
  const [hover, setHover] = useState<Project | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const p = pos.current;
    p.tx = e.clientX + 24;
    p.ty = e.clientY - 80;
    if (!p.raf) {
      const tick = () => {
        p.x += (p.tx - p.x) * 0.2;
        p.y += (p.ty - p.y) * 0.2;
        if (card.current) card.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        p.raf = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.5 ? requestAnimationFrame(tick) : 0;
      };
      p.raf = requestAnimationFrame(tick);
    }
  }

  return (
    <div
      className="relative"
      onPointerMove={onMove}
      onPointerLeave={() => setHover(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHover(null);
      }}
    >
      <ul className="-mx-3 divide-y divide-hairline border-y border-hairline">
        {projects.map((p) => {
          const primary = p.links[0];
          return (
            <li
              key={p.slug}
              data-place={PLACE[p.slug]}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                if (!hover) {
                  // Place the card at the pointer before showing it (a row can scroll under a still mouse).
                  pos.current.x = pos.current.tx = e.clientX + 24;
                  pos.current.y = pos.current.ty = e.clientY - 80;
                  if (card.current) card.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
                }
                setHover(p);
              }}
              onFocus={(e) => {
                // Keyboard: dock the preview beside the focused row (I11) instead of following a cursor.
                if (!(e.target as HTMLElement).matches(":focus-visible")) return;
                const r = e.currentTarget.getBoundingClientRect();
                const x = Math.min(window.innerWidth - 324, r.right + 16);
                pos.current.x = pos.current.tx = x;
                pos.current.y = pos.current.ty = r.top;
                if (card.current) card.current.style.transform = `translate3d(${x}px, ${r.top}px, 0)`;
                setHover(p);
              }}
              className={cn("proj-row lens-item reveal group relative px-3 py-5 md:py-6", matchSlugs.includes(p.slug) && "lens-match")}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
                <h3 className="text-[19px] font-semibold tracking-[-0.015em] md:w-[260px] md:flex-none md:text-[21px]">
                  <a href={primary.href} target="_blank" rel="noopener noreferrer" className="proj-link after:absolute after:inset-0 after:content-['']">
                    {p.name}
                    <span className="proj-arrow ml-1.5 inline-block text-link" aria-hidden>
                      ↗
                    </span>
                    <span className="sr-only"> ({primary.label === "Live" ? "live site" : primary.label})</span>
                  </a>

                </h3>
                <div className="flex-1">
                  <p className="text-[16px] leading-relaxed text-ink-2">{p.line}</p>
                  {p.badge && <p className="mt-1.5 text-[13px] font-medium text-muted">{p.badge}</p>}
                  <p className="relative z-10 mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-quiet">
                        {l.label}
                        <span className="sr-only"> for {p.name}</span> <span className="chev" aria-hidden>›</span>
                      </a>
                    ))}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        ref={card}
        aria-hidden
        className={cn("preview-card pointer-events-none fixed left-0 top-0 z-40 hidden w-[300px] lg:block", hover ? "is-on" : "")}
      >
        {hover && (
          <div className="overflow-hidden rounded-[18px] border border-hairline bg-bg shadow-[var(--shadow-float)]">
            {hover.shot ? (
              // Plain <img>: a decorative 300px preview; next/image would add its client runtime to the homepage bundle.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/shots/${hover.shot}.webp`} alt="" width={1600} height={1000} loading="lazy" decoding="async" className="block h-auto w-full" />
            ) : (
              // No screenshot or demo frame: a designed card with the name, the one-liner and the repo.
              <div className="preview-fallback flex aspect-[16/10] flex-col justify-between p-5">
                <span className="mono text-[11px] text-muted">{repoPath(hover)}</span>
                <div>
                  <p className="text-[22px] font-semibold tracking-[-0.02em]">{hover.name}</p>
                  <p className="mt-1 line-clamp-3 text-[13px] leading-snug text-ink-2">{hover.line}</p>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 p-3">
              {hover.stack.slice(0, 5).map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
