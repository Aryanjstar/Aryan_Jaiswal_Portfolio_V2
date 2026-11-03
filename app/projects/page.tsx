import type { Metadata } from "next";
import Link from "next/link";

import { archiveProjects, caseStudyProjects, moreProjects } from "@/content/projects";
import { matches, orderByRole, parseRole } from "@/content/roles";
import type { Project } from "@/content/schema";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Projects",
  description: "Every project Aryan Jaiswal has built: year, what it does, stack and links.",
  alternates: { canonical: "/projects" },
};

const TRACKS = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI" },
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "fullstack", label: "Full-stack" },
  { key: "devops", label: "DevOps & Cloud" },
] as const;

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const live = (p: Project) => p.links.find((l) => l.label === "Live")?.href;

/** Archive table (plan §5.1). Filter is a set of links, so it works without JS. */
export default async function Projects({ searchParams }: Props) {
  const role = parseRole((await searchParams).role);
  const all: (Project & { cs?: boolean })[] = [...caseStudyProjects.map((p) => ({ ...p, cs: true })), ...moreProjects, ...archiveProjects];
  const rows = orderByRole(all, role);

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-14 md:px-8 md:pt-20">
        <p className="enter text-[15px] font-semibold text-muted md:text-[17px]">Projects</p>
        <h1 className="display enter mt-2 max-w-[760px] text-[clamp(2.5rem,6vw,4.5rem)]" style={{ "--i": 1 } as React.CSSProperties}>
          Everything I&apos;ve built, in one list.
        </h1>
        <p className="enter mt-4 max-w-[600px] text-[17px] text-ink-2 md:text-[19px]" style={{ "--i": 2 } as React.CSSProperties}>
          Case studies first, then side projects and the archive. Work at Exotel lives on the{" "}
          <Link href="/#work" className="link">homepage</Link>.
        </p>

        <nav aria-label="Filter by track" className="enter mt-8 overflow-x-auto no-scrollbar" style={{ "--i": 3 } as React.CSSProperties}>
          <ul className="segmented">
            {TRACKS.map((t) => (
              <li key={t.key}>
                <Link href={t.key === "all" ? "/projects" : `/projects?role=${t.key}`} scroll={false} aria-current={role === t.key ? "page" : undefined} className={cn("seg inline-flex items-center whitespace-nowrap", role === t.key && "is-on")}>
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative mt-8 overflow-x-auto" data-lens={role === "all" ? undefined : role}>
          <table className="proj-table w-full border-collapse text-left md:min-w-[600px]">
            <thead>
              <tr className="border-b border-hairline text-[13px] text-muted">
                <th scope="col" className="w-[72px] py-3 pr-4 font-medium">Year</th>
                <th scope="col" className="w-[220px] py-3 pr-4 font-medium">Project</th>
                <th scope="col" className="py-3 pr-4 font-medium">What it does</th>
                <th scope="col" className="hidden w-[200px] py-3 pr-4 font-medium lg:table-cell">Stack</th>
                <th scope="col" className="w-[150px] py-3 font-medium">Links</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.slug} className={cn("arch-row lens-item border-b border-hairline align-top", matches(p.roles, role) && "lens-match")}>
                  <td className="mono py-4 pl-2 pr-4 text-[13px] text-muted">{p.started ?? "—"}</td>
                  <th scope="row" className="py-4 pr-4 text-[16px] font-semibold">
                    {/* Blue name = opens the live site (Aryan, 3 Nov 2026); case study stays in the Links column. */}
                    {live(p) ? (
                      <a href={live(p)!} target="_blank" rel="noopener noreferrer" className="link">
                        {p.name}
                        <span className="sr-only"> (live site)</span>
                      </a>
                    ) : (
                      p.name
                    )}
                    {p.badge && <span className="mt-1 block text-[12px] font-normal text-muted">{p.badge}</span>}
                    {p.stack.length > 0 && <span className="mt-1 block text-[12px] font-normal text-muted lg:hidden">{p.stack.join(", ")}</span>}
                  </th>
                  <td className="py-4 pr-4 text-[15px] leading-relaxed text-ink-2">{p.line}</td>
                  <td className="hidden py-4 pr-4 text-[13px] text-muted lg:table-cell">{p.stack.join(", ")}</td>
                  <td className="py-4 pr-2 text-[14px]">
                    <span className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:flex-nowrap">
                      {p.cs && <Link href={`/work/${p.slug}`} className="link-quiet">Case study <span className="chev" aria-hidden>›</span></Link>}
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-quiet">
                          {l.label}<span className="sr-only"> for {p.name}</span> <span aria-hidden>↗</span>
                        </a>
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-[13px] text-muted">Year = when the project started (the repository&apos;s creation date, or Aryan&apos;s date where there is no repo). A blue name opens the live site.</p>
      </div>
    </section>
  );
}
