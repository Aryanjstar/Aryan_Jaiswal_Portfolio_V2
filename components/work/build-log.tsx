import type { CaseStudy } from "@/content/caseStudies";
import { cn } from "@/lib/cn";

import { stageId } from "./stage-id";

const STATE = {
  pass: { label: "pass", chip: "bg-[var(--pass-bg)] text-ink", dot: "bg-[var(--pass-dot)]" },
  fail: { label: "fail", chip: "bg-[var(--fail-bg)] text-[var(--fail-ink)]", dot: "bg-[var(--fail-ink)]" },
  fix: { label: "fix", chip: "bg-blue-soft text-link", dot: "bg-blue" },
  note: { label: "step", chip: "bg-bg-alt text-ink-2", dot: "bg-muted" },
};

/** F5 build log: timestamped steps with pass / fail / fix chips. Steps tied to a diagram node carry its id. */
export function BuildLog({ log }: { log: NonNullable<CaseStudy["log"]>[number] }) {
  const ids = log.steps.map((s) => (s.stage ? stageId(s.stage) : undefined));
  const anchors = ids.map((sid, i) => (sid && ids.indexOf(sid) === i ? `step-${sid}` : undefined));
  return (
    <ol className="build-log relative mt-6 space-y-3 before:absolute before:bottom-4 before:left-[11px] before:top-4 before:w-px before:bg-hairline">
      {log.steps.map((s, i) => {
        const st = STATE[s.state];
        return (
          <li key={s.text} id={anchors[i]} data-step-stage={ids[i]} className="log-step reveal relative flex scroll-mt-28 gap-4">
            <span aria-hidden className={cn("relative z-10 ml-[7px] mt-[18px] h-[9px] w-[9px] flex-none rounded-full ring-4 ring-bg", st.dot)} />
            <div className="log-card flex-1 rounded-[14px] bg-bg-alt px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                {s.when && <span className="mono text-[12px] text-muted">{s.when}</span>}
                <span className={cn("mono rounded-[6px] px-1.5 py-0.5 text-[11px] font-semibold uppercase", st.chip)}>{st.label}</span>
                {s.stage && <span className="text-[12px] text-muted">· {s.stage}</span>}
              </div>
              <p className="mt-1 text-[16px] leading-relaxed">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
