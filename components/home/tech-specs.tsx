import { specId, specs, USED_IN_LABELS } from "@/content/specs";
import { SPEC_ICONS } from "@/lib/spec-icons";

/** Brand tint on hover, unless the brand colour is near-black/white (it would vanish in one theme). */
function tint(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const l = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return l < 0.18 || l > 0.9 ? "var(--link)" : hex;
}

/**
 * Apple-style spec sheet (I12). Hover or focus an item and everything on the page that used it gets a
 * soft-blue wash. Pure CSS (`:has()`), generated per item, so it works before hydration.
 */
export function TechSpecs() {
  const rules = specs
    .flatMap((g) => g.items)
    .filter((i) => i.usedIn.length)
    .map((i) => {
      const targets = i.usedIn.map((p) => `[data-place~="${p}"]`).join(",");
      return `body:has(.spec[data-spec="${specId(i.name)}"]:is(:hover,:focus)) :is(${targets}){background:var(--blue-soft);box-shadow:inset 0 0 0 2px var(--blue);opacity:1}`;
    })
    .join("\n");

  return (
    <>
      <style>{rules}</style>
      <dl className="divide-y divide-hairline border-y border-hairline">
        {specs.map((g) => (
          <div key={g.group} className="reveal grid gap-3 py-6 md:grid-cols-[220px_1fr] md:gap-10 md:py-8">
            <dt className="text-[17px] font-semibold md:text-[19px]">{g.group}</dt>
            <dd>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((i) => (
                  <li key={i.name}>
                    <span
                      tabIndex={i.usedIn.length ? 0 : -1}
                      data-spec={specId(i.name)}
                      className="spec group -mx-2 flex gap-3 rounded-[10px] px-2 py-1.5"
                      style={SPEC_ICONS[i.name] ? ({ "--brand": tint(SPEC_ICONS[i.name].hex) } as React.CSSProperties) : undefined}
                    >
                      <span aria-hidden className="spec-icon mt-[3px] grid h-[18px] w-[18px] flex-none place-items-center">
                        {SPEC_ICONS[i.name] ? (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d={SPEC_ICONS[i.name].path} />
                          </svg>
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        )}
                      </span>
                      <span className="min-w-0">
                      <span className="block text-[17px] text-ink">{i.name}</span>
                      <span className="mono block text-[12px] leading-relaxed text-muted">
                        {i.usedIn.length ? i.usedIn.map((p) => USED_IN_LABELS[p]).join(" · ") : "Daily driver"}
                      </span>
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
