"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

/** Sun/moon toggle with a circular View Transition reveal from the button (F7, I15). */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes hydration guard
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  function toggle() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    const r = ref.current?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : window.innerWidth;
    const y = r ? r.top + r.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${radius}px`);
    root.classList.add("theme-vt");
    const vt = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    }) as { finished?: Promise<void> } | undefined;
    vt?.finished?.finally(() => root.classList.remove("theme-vt"));
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      className="icon-btn group"
      aria-label={mounted ? `Switch to ${next} theme (current: ${resolvedTheme})` : "Switch theme"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden className="transition-transform duration-200 ease-out group-hover:rotate-[15deg]">
        {/* Shows the theme you'd switch to; rendered for both before mount via CSS */}
        <g className="dark:hidden">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
        </g>
        <g className="hidden dark:inline">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
        </g>
      </svg>
    </button>
  );
}
