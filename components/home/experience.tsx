import Link from "next/link";

import { earlier, exotel } from "@/content/experience";
import { profile } from "@/content/profile";
import { matches } from "@/content/roles";
import type { Bullet, RoleKey } from "@/content/schema";
import { cn } from "@/lib/cn";

const PLACE: Record<string, string> = {
  "argus-autoloop": "argus exotel",
  "enterprise-integrations": "integrations exotel",
  "production-infra": "infra exotel",
};

function BulletText({ b }: { b: Bullet }) {
  if (!b.strong || !b.text.includes(b.strong)) return <>{b.text}</>;
  const [pre, post] = b.text.split(b.strong);
  return (
    <>
      {pre}
      <strong className="marker font-semibold text-ink">{b.strong}</strong>
      {post}
    </>
  );
}

/** Dated Exotel block with a promotion connector, bullets highlighted by role (F3, I8), and an "Earlier" disclosure. */
export function Experience({ role }: { role: RoleKey }) {
  return (
    <div className="space-y-4">
      <article className="glow reveal rounded-[28px] bg-card p-6 md:p-10">
        <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-[28px] font-semibold tracking-[-0.02em]">{exotel.company}</h3>
          <p className="text-[15px] text-muted">
            {exotel.descriptor} · {exotel.location}
          </p>
        </header>

        <ol className="mt-6 md:mt-8">
          {exotel.roles.map((r, ri) => (
            <li key={r.title} className="relative">
              {ri > 0 && (
                <div className="promo my-6 flex items-center gap-3 text-[13px] font-medium text-muted" aria-label={exotel.connector}>
                  <span className="promo-line" aria-hidden />
                  <span className="rounded-full bg-bg px-3 py-1">{exotel.connector} ↑</span>
                  <span className="promo-line" aria-hidden />
                </div>
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h4 className="text-[19px] font-semibold tracking-[-0.01em] md:text-[21px]">{r.title}</h4>
                <p className="mono text-[13px] text-muted">{r.dates}</p>
              </div>
              <ul className="mt-3 space-y-1">
                {r.bullets.map((b) => (
                  <li
                    key={b.text}
                    data-place={b.caseStudy ? PLACE[b.caseStudy] : "exotel"}
                    className={cn("exp-bullet lens-item group relative rounded-[12px] py-2.5 pl-5 pr-3 text-[16px] leading-relaxed text-ink-2 md:text-[17px]", matches(b.roles, role) && "lens-match")}
                  >
                    <span aria-hidden className="exp-dot" />
                    <BulletText b={b} />
                    {b.caseStudy && (
                      <>
                        {" "}
                        <Link href={`/work/${b.caseStudy}`} className="exp-cs link-quiet whitespace-nowrap text-[15px] font-medium">
                          Case study <span className="chev" aria-hidden>›</span>
                        </Link>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </article>

      <details className="earlier reveal group/d rounded-[28px] bg-card">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 md:px-10 md:py-7 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-[21px] font-semibold tracking-[-0.01em]">Earlier</span>
            <span className="mt-0.5 block text-[15px] text-muted">{earlier.map((e) => e.company).join(" · ")}</span>
          </span>
          <span aria-hidden className="earlier-icon grid h-9 w-9 flex-none place-items-center rounded-full bg-bg text-ink-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </summary>
        <ul className="space-y-1 px-6 pb-7 md:px-10">
          {earlier.map((e) => (
            <li key={e.company} data-place={e.company === "Joveo" ? "joveo" : e.company === "InfoKalash" ? "infokalash" : undefined} className={cn("lens-item rounded-[12px] px-3 py-3", matches(e.roles, role) && "lens-match")}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="font-semibold">
                  {e.company} <span className="font-normal text-ink-2">· {e.title}</span>
                </p>
                <p className="mono text-[13px] text-muted">{e.dates}</p>
              </div>
              <p className="mt-1 text-[16px] leading-relaxed text-ink-2">{e.text}</p>
            </li>
          ))}
        </ul>
      </details>

      <article className="glow reveal rounded-[28px] bg-card p-6 md:px-10 md:py-8" aria-label="Education">
        <h3 className="text-[21px] font-semibold tracking-[-0.01em]">
          {profile.education.school}{" "}
          <span className="font-normal text-ink-2">
            · {profile.education.degree} <span className="whitespace-nowrap">({profile.education.years})</span>
          </span>
        </h3>
        <p className="mt-1 text-[16px] text-ink-2">
          CGPA {profile.education.cgpa} · {profile.education.note}
        </p>
        <ul className="mt-2 space-y-0.5 text-[15px] text-ink-2">
          {profile.education.campus.map((c) => (
            <li key={c} className="flex gap-2.5">
              <span aria-hidden className="mt-[9px] h-1 w-1 flex-none rounded-full bg-muted" />
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-3 flex flex-wrap gap-1.5">
          {profile.education.coursework.map((c) => (
            <span key={c} className="tag !bg-bg">
              {c}
            </span>
          ))}
        </p>
      </article>
    </div>
  );
}
