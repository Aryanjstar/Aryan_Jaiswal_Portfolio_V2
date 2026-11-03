import Link from "next/link";
import { ViewTransition } from "react";

import { TileVisual } from "@/components/work/tile-visual";
import type { CaseStudy } from "@/content/caseStudies";
import { matches } from "@/content/roles";
import type { RoleKey } from "@/content/schema";
import { cn } from "@/lib/cn";

const TAGS: Record<string, string[]> = {
  "argus-autoloop": ["AI", "Evaluation", "Python"],
  "enterprise-integrations": ["Backend", "Apache Camel", "Jenkins"],
  "production-infra": ["DevOps", "NGINX", "Grafana"],
  aura: ["AI", "Full-stack", "MCP"],
  "the-wedding-home": ["Full-stack", "Next.js", "CI"],
};
const PLACE: Record<string, string> = {
  "argus-autoloop": "argus exotel",
  "enterprise-integrations": "integrations exotel",
  "production-infra": "infra exotel",
  aura: "aura",
  "the-wedding-home": "twh",
};

/** 5 Apple-style tiles (28px radius). Desktop: 1 wide + 2×2. Order follows the role (I10). */
export function WorkTiles({ studies, role }: { studies: CaseStudy[]; role: RoleKey }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
      {studies.map((c, i) => {
        const wide = i === 0;
        const live = c.links.find((l) => l.label === "Live");
        return (
          <li key={c.slug} className={cn("reveal", wide && "md:col-span-2")} data-place={PLACE[c.slug]}>
            {/* The whole card links to the case study (stretched link); "Visit live site" sits above it as its own link. */}
            <div
              className={cn(
                "tile glow group lift relative flex h-full flex-col overflow-hidden rounded-[28px] bg-card",
                wide ? "min-h-[460px] md:min-h-[440px] md:flex-row md:items-stretch" : "min-h-[440px]",
                matches(c.roles, role) && "tile-match",
              )}
            >
              <div className={cn("relative z-10 p-7 md:p-9", wide && "md:flex md:w-[48%] md:flex-none md:flex-col md:justify-center md:py-12 md:pl-12")}>
                <p className="text-[13px] font-semibold text-muted">{c.kicker}</p>
                <h3 className={cn("mt-2 font-semibold tracking-[-0.022em] text-ink", wide ? "text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.1]" : "text-[24px] leading-[1.15]")}>
                  <Link href={`/work/${c.slug}`} className="tile-link after:absolute after:inset-0 after:z-10 after:rounded-[28px] after:content-['']">
                    {c.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{c.outcome}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {TAGS[c.slug]?.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] font-medium">
                  <span className="text-link" aria-hidden>
                    Read case study <span className="chev">›</span>
                  </span>
                  {live && (
                    <a href={live.href} target="_blank" rel="noopener noreferrer" className="link-quiet relative z-20">
                      Live site <span aria-hidden>↗</span>
                    </a>
                  )}
                </p>
              </div>
              <div className={cn("zoom-media relative flex flex-1", wide ? "items-end md:items-center" : "items-end")}>
                {/* Mouse/touch target for the visual half; the title link is the keyboard/screen-reader target. */}
                <Link href={`/work/${c.slug}`} tabIndex={-1} aria-hidden className="flex w-full items-end self-stretch">
                  {/* Morphs into the case-study hero on navigation (React ViewTransition; plain navigation without support). */}
                  <ViewTransition name={`cs-visual-${c.slug}`} share="morph" default="none">
                    <div className="flex w-full items-end">
                      <TileVisual slug={c.slug} shot={c.shot} sizes={wide ? "(min-width: 768px) 1100px, 92vw" : "(min-width: 768px) 560px, 92vw"} />
                    </div>
                  </ViewTransition>
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
