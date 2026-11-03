import type { CaseStudy } from "@/content/caseStudies";
import { cn } from "@/lib/cn";

import { stageId } from "./stage-id";

/**
 * F5 / I18 stage diagram. Nodes light up one after another as the diagram scrolls through the viewport
 * (CSS scroll timeline; without support every node is simply lit). A node with build-log steps links to them,
 * and hovering a log step lights its node (CSS :has rules emitted by the page).
 */
export function StageDiagram({ diagram, linked }: { diagram: NonNullable<CaseStudy["diagram"]>; linked: Set<string> }) {
  return (
    <figure className="stage-diagram rounded-[28px] bg-bg-alt p-6 md:p-9">
      {diagram.lanes.map((lane) => (
        <div key={lane.label} className="mb-6 last:mb-0">
          <p className="text-[13px] font-semibold text-muted">
            {lane.label}
            {lane.loop && <span className="ml-2 font-normal">(loops; regressions roll back)</span>}
          </p>
          <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2.5">
            {lane.nodes.map((n, i) => {
              const id = stageId(n);
              const gate = /approv/i.test(n);
              const Tag = linked.has(id) ? "a" : "span";
              return (
                <li key={n} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <span aria-hidden className="stage-edge">
                      <svg width="22" height="10" viewBox="0 0 22 10">
                        <path d="M1 5h18m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                  <Tag
                    {...(Tag === "a" ? { href: `#step-${id}` } : {})}
                    data-stage={id}
                    className={cn("stage-node", gate && "stage-gate", Tag === "a" && "stage-link")}
                    style={{ "--n": i } as React.CSSProperties}
                  >
                    {n}
                  </Tag>
                </li>
              );
            })}
            {lane.loop && (
              <li aria-hidden className="stage-loop ml-1 text-[18px] text-link">
                ↺
              </li>
            )}
          </ol>
        </div>
      ))}
      <figcaption className="mt-5 text-[12px] text-muted">{diagram.caption}</figcaption>
    </figure>
  );
}
