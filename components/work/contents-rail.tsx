"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

/** Sticky "On this page" list (desktop) that marks the section being read. Plain anchors without JS. */
export function ContentsRail({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label="On this page" className="sticky top-24 hidden text-[14px] xl:block">
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">On this page</p>
      <ul className="space-y-1 border-l border-hairline">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "true" : undefined} className={cn("rail-link -ml-px block border-l-2 py-1 pl-3", active === i.id ? "border-blue text-ink" : "border-transparent text-muted")}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
