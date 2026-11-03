import Link from "next/link";

import { caseStudies } from "@/content/caseStudies";
import { earlier, exotel } from "@/content/experience";
import { BUILD_DATE, profile } from "@/content/profile";
import { caseStudyProjects, moreProjects } from "@/content/projects";
import { recognition } from "@/content/recognition";
import { orderByRole } from "@/content/roles";
import type { RoleKey } from "@/content/schema";
import { specs } from "@/content/specs";

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-9 border-b border-hairline pb-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-muted print:mt-5">{children}</h2>
);

/**
 * Plain, single-column resume (F1 Recruiter Mode and F16 /resume). Rendered from content/, no animation,
 * max 70ch, print-friendly. No phone number (Q1).
 */
export function ResumeDoc({ role = "all", headingLevel = 1, actions }: { role?: RoleKey; headingLevel?: 1 | 2; actions?: React.ReactNode }) {
  const Title = headingLevel === 1 ? "h1" : "h2";
  const projects = orderByRole([...caseStudyProjects, ...moreProjects], role).slice(0, 5);
  return (
    <article className="resume-doc hl-read mx-auto max-w-[70ch] text-[16px] leading-relaxed text-ink">
      {/* Header (Aryan, 3 Nov 2026): name + role left, the two actions right on desktop and a full-width row
          on phones; contact links in one quiet row under a hairline. */}
      <header className="border-b border-hairline pb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <Title className="text-[clamp(2.25rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{profile.name}</Title>
            <p className="mt-2 text-[17px] text-ink-2">
              {profile.current.title}, {profile.current.company}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-bg-alt px-3 py-1 text-[13px] text-ink-2 print:bg-transparent print:px-0">
              <span className="status-dot no-print" aria-hidden />
              {profile.status}
            </p>
          </div>
          {actions && <div className="no-print grid grid-cols-2 gap-2 sm:flex sm:flex-none sm:flex-col sm:items-stretch">{actions}</div>}
        </div>
        <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[15px] text-ink-2">
          <span>{profile.location}</span>
          <a className="link-quiet print-url" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="link-quiet print-url" href={profile.links.linkedin}>LinkedIn <span aria-hidden>↗</span></a>
          <a className="link-quiet print-url" href={profile.links.github}>GitHub <span aria-hidden>↗</span></a>
          <a className="link-quiet print-url" href={profile.links.leetcode}>LeetCode <span aria-hidden>↗</span></a>
        </p>
      </header>

      <H>Education</H>
      <p className="mt-3">
        <strong className="font-semibold">{profile.education.school}</strong> · {profile.education.degree}{" "}
        <span className="whitespace-nowrap">({profile.education.years})</span>
      </p>
      <p className="text-ink-2">CGPA {profile.education.cgpa} · {profile.education.note}</p>

      <H>Experience</H>
      <p className="mt-3 font-semibold">
        {exotel.company} <span className="font-normal text-ink-2">· {exotel.descriptor}, {exotel.location}</span>
      </p>
      {exotel.roles.map((r) => (
        <section key={r.title} className="mt-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-semibold">{r.title}</h3>
            <p className="mono text-[13px] text-muted">{r.dates}</p>
          </div>
          <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-ink-2 marker:text-muted">
            {r.bullets.map((b) => (
              <li key={b.text}>{b.text}</li>
            ))}
          </ul>
        </section>
      ))}
      {earlier.map((e) => (
        <section key={e.company} className="mt-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-semibold">
              {e.company} <span className="font-normal text-ink-2">· {e.title}</span>
            </h3>
            <p className="mono text-[13px] text-muted">{e.dates}</p>
          </div>
          <p className="mt-1 text-ink-2">{e.text}</p>
        </section>
      ))}

      <H>Projects</H>
      <ul className="mt-3 space-y-3">
        {projects.map((p) => {
          const cs = caseStudies.find((c) => c.slug === p.slug);
          return (
            <li key={p.slug}>
              <p className="font-semibold">
                {p.name}
                {p.badge && <span className="font-normal text-muted"> · {p.badge}</span>}
              </p>
              <p className="text-ink-2">{cs ? cs.outcome : p.line}</p>
              <p className="mt-0.5 flex flex-wrap gap-x-3 text-[14px]">
                {cs && (
                  <Link className="link" href={`/work/${cs.slug}`}>
                    Case study
                  </Link>
                )}
                {p.links.map((l) => (
                  <a key={l.href} className="link print-url" href={l.href}>
                    {l.label}
                  </a>
                ))}
              </p>
            </li>
          );
        })}
      </ul>

      <H>Skills</H>
      <dl className="mt-3 space-y-1.5">
        {specs.map((g) => (
          <div key={g.group} className="sm:flex sm:gap-3">
            <dt className="font-semibold sm:w-[190px] sm:flex-none">{g.group}</dt>
            <dd className="text-ink-2">{g.items.map((i) => i.name).join(", ")}</dd>
          </div>
        ))}
      </dl>

      <H>Recognition</H>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-2 marker:text-muted">
        {recognition.map((r) => (
          <li key={r.title}>
            <strong className="font-semibold text-ink">{r.kicker}:</strong> {r.title}
            {r.detail ? `. ${r.detail}` : ""}
          </li>
        ))}
      </ul>

      {/* Footer row: the same two actions at opposite ends (Aryan, 3 Nov 2026). */}
      {actions && <div className="no-print mt-12 flex items-center justify-between gap-3 border-t border-hairline pt-6">{actions}</div>}
      {BUILD_DATE && (
        <p className="mt-6 text-[13px] text-muted">
          Last updated {new Date(BUILD_DATE + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      )}
    </article>
  );
}
