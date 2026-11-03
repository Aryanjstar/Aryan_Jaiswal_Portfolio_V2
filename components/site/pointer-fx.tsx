"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for the cursor effects: writes --mx/--my (px, element-relative)
 * on the nearest `.glow` card and `.spot` section. Fine pointers only; rAF-throttled; no re-renders.
 */
export function PointerFx() {
  // Esc clears a pinned Tech Specs highlight (I12).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (e.key === "Escape" && el instanceof HTMLElement && el.classList.contains("spec")) el.blur();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Pause looping CSS animations in sections that are offscreen (DESIGN.md §7 rule 10).
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.target as HTMLElement).toggleAttribute("data-paused", !e.isIntersecting);
    });
    const observe = () => document.querySelectorAll("[data-pause-offscreen]").forEach((el) => io.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      raf = 0;
      const e = last;
      if (!e || !(e.target instanceof Element)) return;
      for (const sel of [".glow", ".spot"]) {
        const el = e.target.closest<HTMLElement>(sel);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
