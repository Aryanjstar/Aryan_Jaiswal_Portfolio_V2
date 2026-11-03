"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** <details>-based menu: works without JS; JS only closes it after navigation or Esc. */
export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <details ref={ref} className="mobile-menu relative md:hidden">
      <summary className="icon-btn list-none [&::-webkit-details-marker]:hidden" aria-label="Menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <path className="menu-top" d="M4 8h16" />
          <path className="menu-bottom" d="M4 16h16" />
        </svg>
      </summary>
      <div className="menu-sheet absolute right-0 top-[44px] w-[min(86vw,320px)] rounded-[18px] border border-hairline bg-bg p-2 shadow-[var(--shadow-float)]">
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => ref.current && (ref.current.open = false)} className="flex min-h-11 items-center justify-between rounded-[12px] px-4 text-[17px] font-medium text-ink hover:bg-bg-alt">
                {l.label}
                <span className="chev text-muted" aria-hidden>›</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
