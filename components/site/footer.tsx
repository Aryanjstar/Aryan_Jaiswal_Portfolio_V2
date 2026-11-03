import Link from "next/link";

import { BUILD_DATE, profile } from "@/content/profile";

const socials = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
  { label: "X", href: profile.links.x },
  { label: "notesbyaryan", href: profile.links.music },
];

const fmt = (iso: string) =>
  iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";

export function Footer() {
  return (
    <footer className="no-print border-t border-hairline bg-bg-alt text-[13px] text-muted">
      <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1.5">
            <p className="text-[15px] font-semibold text-ink">{profile.name}</p>
            <p>
              {profile.current.title}, {profile.current.company} · {profile.locationShort}
            </p>
            <p>
              <a className="link-quiet" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="foot-link">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-hairline pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap gap-x-4">
            <Link href="/colophon" className="foot-link">
              v3 · 2026 · Designed and built by Aryan
            </Link>
            <Link href="/now" className="foot-link">
              Now
            </Link>
          </p>
          <p className="mono flex flex-wrap items-center gap-x-3 text-[12px]">
            {BUILD_DATE && <span>Last updated {fmt(BUILD_DATE)}</span>}
            {process.env.BUILD_SHA && <span>build {process.env.BUILD_SHA}</span>}
            <span className="hidden md:inline">
              Press <kbd className="rounded-[5px] bg-bg px-1.5 py-0.5">⌘K</kbd>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
