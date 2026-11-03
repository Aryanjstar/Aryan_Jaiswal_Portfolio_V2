"use client";

import { useState } from "react";

import type { Highlight } from "@/content/schema";

import { Ticker } from "./ticker";

/** I7: number lifts, scope note fades in on hover/focus; click or tap pins it. Notes are always in the DOM. */
export function Highlights({ items }: { items: Highlight[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {items.map((h) => (
        <li key={h.id} className="reveal">
          <button
            type="button"
            className="hl-card glow group flex h-full w-full flex-col items-start justify-start rounded-[18px] bg-card-alt p-5 text-left md:p-7"
            aria-pressed={open === h.id}
            onClick={() => setOpen((o) => (o === h.id ? null : h.id))}
            data-open={open === h.id || undefined}
          >
            <span className="hl-big mono block text-[clamp(1.15rem,3.6vw,2.75rem)] sm:whitespace-nowrap font-semibold leading-none tracking-[-0.03em] text-ink">
              <Ticker value={h.big} />
            </span>
            <span className="mt-3 block text-[15px] leading-snug text-ink-2 md:text-[17px]">{h.label}</span>
            <span className="hl-note mt-3 block text-[13px] leading-snug text-muted">{h.scope}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
