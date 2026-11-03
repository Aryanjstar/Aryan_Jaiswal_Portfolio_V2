import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { Ticker } from "@/components/home/ticker";
import { BuildLog } from "@/components/work/build-log";
import { ContentsRail } from "@/components/work/contents-rail";
import { ReadingProgress } from "@/components/work/reading-progress";
import { StageDiagram } from "@/components/work/stage-diagram";
import { stageId } from "@/components/work/stage-id";
import { TileVisual } from "@/components/work/tile-visual";
import { caseStudies, caseStudyBySlug, tileOrder, type CaseStudy } from "@/content/caseStudies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = caseStudyBySlug((await params).slug);
  if (!c) return {};
  return { title: c.title, description: c.outcome, alternates: { canonical: `/work/${c.slug}` } };
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function readingMinutes(c: CaseStudy) {
  const text = [c.outcome, ...c.tldr, ...c.sections.flatMap((s) => [...(s.paragraphs ?? []), ...(s.bullets ?? [])]), ...(c.log ?? []).flatMap((l) => l.steps.map((x) => x.text)), ...c.differently].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 230));
}

/** Per-stage CSS: hovering/focusing a build-log step lights its diagram node (I18). Works before hydration. */
function crossHighlightCss(c: CaseStudy) {
  const stages = new Set((c.log ?? []).flatMap((l) => l.steps.map((s) => s.stage).filter(Boolean) as string[]).map(stageId));
  return [...stages]
    .map((id) => `.cs:has(.log-step[data-step-stage="${id}"]:is(:hover,:focus-within,:target)) .stage-node[data-stage="${id}"]{background:var(--blue);color:#fff;box-shadow:none;animation:none}`)
    .join("\n");
}

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="scroll-mt-24 text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em]">
    {children}
  </h2>
);

/** F5 template: TL;DR → hero visual → diagram → Context/sections → Build log → Results → What I'd do differently → Stack. */
export default async function CaseStudyPage({ params }: Props) {
  const c = caseStudyBySlug((await params).slug);
  if (!c) notFound();
  const idx = tileOrder.indexOf(c.slug);
  const prev = caseStudyBySlug(tileOrder[(idx - 1 + tileOrder.length) % tileOrder.length])!;
  const next = caseStudyBySlug(tileOrder[(idx + 1) % tileOrder.length])!;
  const linked = new Set((c.log ?? []).flatMap((l) => l.steps.map((s) => (s.stage ? stageId(s.stage) : ""))).filter(Boolean));

  const rail = [
    ...(c.diagram ? [{ id: "how-it-fits", label: "How it fits together" }] : []),
    ...c.sections.map((s) => ({ id: slug(s.heading), label: s.heading.replace(/^[A-Z]\. /, "") })),
    ...(c.log ?? []).map((l) => ({ id: `log-${slug(l.title)}`, label: `Build log: ${l.title}` })),
    { id: "results", label: "Results" },
    ...(c.differently.length ? [{ id: "differently", label: "What I'd do differently" }] : []),
    { id: "stack", label: "Stack" },
  ];

  return (
    <article className="cs bg-bg">
      <style>{crossHighlightCss(c)}</style>
      <ReadingProgress />

      <header className="mx-auto max-w-[980px] px-5 pb-10 pt-14 md:px-8 md:pt-20">
        <p className="enter text-[15px] font-semibold text-muted">
          <Link href="/#selected-work" className="link">
            Selected work
          </Link>{" "}
          · {c.kicker} · <span className="mono text-[13px]">{readingMinutes(c)} min read</span>
        </p>
        <h1 className="display enter mt-3 text-[clamp(2.25rem,5.5vw,4rem)]" style={{ "--i": 1 } as React.CSSProperties}>
          {c.title}
        </h1>
        <p className="enter mt-5 max-w-[760px] text-[19px] leading-snug text-ink-2 md:text-[23px]" style={{ "--i": 2 } as React.CSSProperties}>
          {c.outcome}
        </p>

        {c.links.length > 0 && (
          <div className="enter mt-7 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            {c.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={l.label === "Live" ? "btn btn-primary" : "btn btn-ghost"}>
                {l.label === "Live" ? (
                  "Visit live site"
                ) : l.label === "Demo" ? (
                  "Watch demo"
                ) : (
                  l.label
                )}{" "}
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        )}

        <div className="enter glow mt-8 rounded-[18px] bg-bg-alt p-5 md:p-6" style={{ "--i": 3 } as React.CSSProperties}>
          <p className="mono text-[12px] font-semibold uppercase tracking-[0.1em] text-link">TL;DR</p>
          <ul className="tldr mt-2 list-disc space-y-1.5 pl-5 text-[16px] leading-relaxed text-ink md:text-[17px]">
            {c.tldr.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <dl className="enter mt-8 grid gap-x-8 gap-y-5 border-y border-hairline py-6 text-[15px] sm:grid-cols-2 md:grid-cols-4" style={{ "--i": 4 } as React.CSSProperties}>
          <div>
            <dt className="text-[13px] text-muted">Role</dt>
            <dd className="mt-1">{c.meta.role}</dd>
          </div>
          {c.meta.team && (
            <div>
              <dt className="text-[13px] text-muted">Team</dt>
              <dd className="mt-1">{c.meta.team}</dd>
            </div>
          )}
          <div>
            <dt className="text-[13px] text-muted">Timeline</dt>
            <dd className="mt-1">{c.meta.timeline}</dd>
          </div>
          {c.links.length === 0 && (
            <div>
              <dt className="text-[13px] text-muted">Links</dt>
              <dd className="mt-1 text-muted">Internal work; no public links</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <ViewTransition name={`cs-visual-${c.slug}`} share="morph" default="none">
          <div className="overflow-hidden rounded-[28px] border border-hairline bg-bg-alt">
            <div className="flex items-center justify-center py-10 md:py-14">
              <TileVisual slug={c.slug} sizes="100vw" />
            </div>
          </div>
        </ViewTransition>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-14 md:px-8 md:py-20 xl:grid-cols-[1fr_220px]">
        <div className="hl-read min-w-0 max-w-[760px] xl:mx-auto xl:w-full">
          {c.diagram && (
            <section className="mb-14" aria-labelledby="how-it-fits">
              <H2 id="how-it-fits">How it fits together</H2>
              <div className="mt-6">
                <StageDiagram diagram={c.diagram} linked={linked} />
              </div>
            </section>
          )}

          {c.shot && (
            <figure className="reveal mb-14">
              <div className="overflow-hidden rounded-[18px] border border-hairline">
                <Image src={`/shots/${c.shot}.webp`} alt={`${c.title.split(":")[0]}: the live site's home page`} width={1600} height={1000} sizes="(min-width: 800px) 760px, 100vw" className="h-auto w-full" />
              </div>
              <figcaption className="mt-2 text-[13px] text-muted">The live site, as of 3 Nov 2026.</figcaption>
            </figure>
          )}

          {c.sections.map((s) => (
            <section key={s.heading} className="reveal mb-12" aria-labelledby={slug(s.heading)}>
              <H2 id={slug(s.heading)}>{s.heading}</H2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-4 text-[17px] leading-[1.65] text-ink-2 md:text-[19px]">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[17px] leading-[1.6] text-ink-2 marker:text-link">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {c.log?.map((log) => (
            <section key={log.title} className="mb-12" aria-labelledby={`log-${slug(log.title)}`}>
              <H2 id={`log-${slug(log.title)}`}>Build log: {log.title}</H2>
              {c.diagram && log.steps.some((s) => s.stage) && <p className="mt-2 text-[14px] text-muted">Hover a step to see where it happened in the diagram above.</p>}
              <BuildLog log={log} />
            </section>
          ))}

          <section className="mb-12" aria-labelledby="results">
            <H2 id="results">Results</H2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.results.map((r) => (
                <li key={r.label} className="glow reveal rounded-[18px] bg-bg-alt p-5">
                  <p className="mono text-[clamp(1.5rem,3.5vw,2rem)] font-semibold leading-none tracking-[-0.03em]">
                    <Ticker value={r.big} />
                  </p>
                  <p className="mt-2 text-[16px]">{r.label}</p>
                  <p className="mt-1.5 text-[13px] text-muted">{r.scope}</p>
                </li>
              ))}
            </ul>
            {c.ownership && <p className="mt-5 text-[15px] font-medium text-ink">{c.ownership}</p>}
          </section>

          {c.differently.length > 0 && (
            <section className="reveal mb-12" aria-labelledby="differently">
              <H2 id="differently">What I&apos;d do differently</H2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-[1.6] text-ink-2 marker:text-link">
                {c.differently.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="reveal" aria-labelledby="stack">
            <H2 id="stack">Stack</H2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.meta.stack.map((s) => (
                <li key={s} className="tag !h-7 !px-2.5 !text-[13px]">
                  {s}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside>
          <ContentsRail items={rail} />
        </aside>
      </div>

      <nav aria-label="More case studies" className="border-t border-hairline bg-bg-alt">
        <div className="mx-auto grid max-w-[980px] gap-3 px-5 py-10 sm:grid-cols-2 md:px-8">
          <Link href={`/work/${prev.slug}`} className="lift glow group rounded-[18px] bg-card-alt p-5">
            <span className="text-[13px] text-muted">‹ Previous</span>
            <span className="mt-1 block font-semibold">{prev.title}</span>
          </Link>
          <Link href={`/work/${next.slug}`} className="lift glow group rounded-[18px] bg-card-alt p-5 sm:text-right">
            <span className="text-[13px] text-muted">Next ›</span>
            <span className="mt-1 block font-semibold">{next.title}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
