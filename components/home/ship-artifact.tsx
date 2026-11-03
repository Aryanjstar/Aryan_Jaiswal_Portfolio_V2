import type { ShipArtifact } from "@/content/ship";

/** One artifact card for the "How I ship" story. Pure markup, theme-aware via tokens. */
export function ShipArtifactCard({ a }: { a: ShipArtifact }) {
  return (
    <figure className="artifact overflow-hidden rounded-[18px] border border-hairline bg-bg shadow-[var(--shadow-float)]">
      <figcaption className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
          <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
          <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
        </span>
        <span className="mono ml-2 truncate text-[12px] text-muted">{a.title}</span>
      </figcaption>
      <div className="p-5 md:p-6">
        {a.kind === "note" && (
          <ul className="space-y-2.5 text-[15px] text-ink-2">
            {a.lines.map((l) => (
              <li key={l} className="flex gap-3">
                <span aria-hidden className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-link" />
                {l}
              </li>
            ))}
          </ul>
        )}

        {a.kind === "flow" && (
          <ol className="flex flex-col gap-2">
            {a.nodes.map((n, i) => (
              <li key={n} className="flow-node flex items-center gap-3" style={{ "--n": i } as React.CSSProperties}>
                <span className="mono grid h-7 w-7 flex-none place-items-center rounded-full bg-blue-soft text-[12px] font-semibold text-link">{i + 1}</span>
                <span className="flex-1 rounded-[10px] border border-hairline px-3 py-2 text-[15px]">{n}</span>
              </li>
            ))}
          </ol>
        )}

        {a.kind === "code" && (
          <>
            {/* Scrolls sideways on phones, so it takes focus and can be scrolled with the keyboard. */}
            <pre tabIndex={0} aria-label={a.caption} className="mono overflow-x-auto rounded-[10px] bg-bg-alt p-4 text-[12.5px] leading-relaxed text-ink">
              <code>{a.code}</code>
            </pre>
            <p className="mt-3 text-[12px] text-muted">{a.caption}</p>
          </>
        )}

        {a.kind === "checks" && (
          <ul className="space-y-2">
            {a.rows.map((r) =>
              r.ok ? (
                <li key={r.label} className="flex items-center justify-between gap-3 rounded-[10px] bg-[var(--pass-bg)] px-3 py-2.5">
                  <span className="flex items-center gap-2.5 text-[14px] text-ink">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--pass-dot)]" />
                    {r.label}
                  </span>
                  <span className="mono text-[14px] font-semibold text-ink">
                    {r.value} <span className="sr-only">passed</span>
                    <span aria-hidden>✓</span>
                  </span>
                </li>
              ) : (
                // A measurement, not a pass/fail result: shown neutral.
                <li key={r.label} className="flex items-center justify-between gap-3 rounded-[10px] bg-bg-alt px-3 py-2.5">
                  <span className="flex items-center gap-2.5 text-[14px] text-ink-2">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-muted" />
                    {r.label}
                  </span>
                  <span className="mono text-[14px] font-semibold text-ink">{r.value}</span>
                </li>
              ),
            )}
          </ul>
        )}

        {a.kind === "pipeline" && (
          <>
            <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {a.stages.map((s, i) => (
                <li key={s} className="rounded-[10px] border border-hairline px-3 py-2.5">
                  <span className="mono block text-[11px] text-muted">stage {i + 1}</span>
                  <span className="text-[14px] font-medium">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-2 text-[13px] text-ink-2">
              <span aria-hidden className="h-2 w-2 flex-none rounded-full bg-[var(--pass-dot)]" />
              {a.footer}
            </p>
          </>
        )}

        {a.kind === "panel" && (
          <>
            <div className="flex h-36 items-end gap-2 rounded-[10px] bg-bg-alt p-3" role="img" aria-label="Bar chart: one worker, then eight workers">
              {a.bars.map((b, i) => (
                <span key={i} className="panel-bar flex-1 rounded-t-[4px] bg-blue" style={{ height: `${(b / 8) * 100}%`, opacity: b === 1 ? 0.35 : 0.9, "--n": i } as React.CSSProperties} />
              ))}
            </div>
            <p className="mono mt-3 text-[12px] text-muted">{a.footer}</p>
          </>
        )}
      </div>
    </figure>
  );
}
