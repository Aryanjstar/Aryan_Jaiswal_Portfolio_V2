import { recognition, recognitionSmall } from "@/content/recognition";

/** Static rows (I13): badge lifts, ↗ slides on hover; links always visible. */
export function RecognitionList() {
  return (
    <>
      <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
        {recognition.map((r) => (
          <li key={r.title} className="reveal lift glow rec-card rounded-[18px] bg-card-alt p-6 md:p-7">
            <p className="text-[13px] font-semibold text-muted">{r.kicker}</p>
            <p className="mt-2 text-[19px] font-semibold leading-snug tracking-[-0.015em] md:text-[21px]">{r.title}</p>
            {r.detail && <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{r.detail}</p>}
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
              {r.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-quiet rec-link font-medium">
                  {l.label} <span className="rec-arrow inline-block" aria-hidden>↗</span>
                </a>
              ))}
            </p>
          </li>
        ))}
      </ul>
      <ul className="reveal mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-center text-[14px] text-muted">
        {recognitionSmall.map((s) => (
          <li key={s.text}>
            {s.href ? (
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-quiet">
                {s.text}
              </a>
            ) : (
              s.text
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
