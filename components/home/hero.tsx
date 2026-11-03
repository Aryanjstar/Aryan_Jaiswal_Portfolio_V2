import Link from "next/link";

import { CopyEmail } from "@/components/site/copy-email";
import { profile } from "@/content/profile";
import { pdfFor, roles } from "@/content/roles";
import type { RoleKey } from "@/content/schema";

import { Greeting } from "./greeting";
import { ResumeButton } from "./resume-button";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/** Recruiter path first (CLAUDE.md): name, role, pitch, status, Resume + Email above the fold at 390px. */
export function Hero({ role }: { role: RoleKey }) {
  const r = roles[role];
  const pdf = pdfFor(role);
  return (
    <section aria-labelledby="hero-title" className="spot relative flex min-h-[calc(100svh-52px)] items-center overflow-hidden bg-bg" data-pause-offscreen>
      <div className="tech-grid" aria-hidden />
      <div className="relative mx-auto w-full max-w-[980px] px-5 py-14 text-center md:px-8 md:py-20">
        <p className="enter text-[14px] font-semibold text-muted md:text-[17px]" style={i(0)}>
          {profile.eyebrow}
        </p>

        <p className="enter mt-5 text-[19px] text-ink-2 md:text-[24px]" style={i(1)}>
          <Greeting />, I&apos;m {profile.first}, {r.article} <span className="role-word">{r.word}</span>.
        </p>

        <h1 id="hero-title" className="display enter mt-3 text-[clamp(2.6rem,7vw,5.5rem)]" style={i(2)}>
          {profile.headline.before} <span className="serif-word ship-word">{profile.headline.accent}</span> {profile.headline.after}
        </h1>

        <p key={role} className="sub-line enter mx-auto mt-5 max-w-[680px] text-[17px] text-ink-2 md:mt-6 md:text-[19px]" style={i(3)}>
          {r.sub}
        </p>

        <div className="enter mt-6 flex justify-center" style={i(4)}>
          <a href="#contact" className="status-pill tip" data-tip={profile.statusTip}>
            <span className="status-dot" aria-hidden />
            {profile.status}
            <span id="status-tip" className="sr-only">{profile.statusTip}</span>
          </a>
        </div>

        <div className="enter mt-7 flex flex-wrap items-center justify-center gap-3" style={i(5)}>
          <ResumeButton href={pdf.href} variant={pdf.variant} />
          <CopyEmail />
        </div>
        <div className="enter mt-4 flex items-center justify-center gap-6 text-[15px]" style={i(6)}>
          <a className="link-quiet" href={profile.links.github} target="_blank" rel="noopener noreferrer">
            GitHub <span className="chev" aria-hidden>›</span>
          </a>
          <a className="link-quiet" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <span className="chev" aria-hidden>›</span>
          </a>
        </div>

        {role !== "all" && (
          <p className="enter mt-8 text-[13px] text-muted" style={i(7)}>
            Showing {r.label.toLowerCase()} work first ·{" "}
            <Link href="/" scroll={false} className="link">
              show everything
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
