import Link from "next/link";

import { CommandTrigger } from "./command-trigger";
import { LogoMark } from "./logo-mark";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/notesbyaryan", label: "Music" },
];

export function TopNav() {
  return (
    <header className="site-nav no-print sticky top-0 z-50">
      <nav aria-label="Primary" className="mx-auto flex h-[52px] max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="group flex items-center gap-2 text-ink" aria-label="Aryan Jaiswal, home">
          <LogoMark className="logo transition-transform duration-200 ease-out group-hover:-rotate-6 group-active:scale-95" />
          {/* Same small-caps treatment as the resume header: initials ~2 pt larger (Aryan, 3 Nov 2026). */}
          <span className="wordmark" aria-hidden>
            <span className="wordmark-cap">A</span>ryan <span className="wordmark-cap">J</span>aiswal
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="nav-link">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <CommandTrigger />
          <ThemeToggle />
          <MobileMenu links={NAV_LINKS} />
        </div>
      </nav>
    </header>
  );
}
