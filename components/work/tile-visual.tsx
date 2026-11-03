import { Img } from "@/components/site/img";

/**
 * Designed title cards for the Exotel case studies (no internal screenshots allowed),
 * real screenshots for public products. All theme-aware via tokens.
 */
export function TileVisual({ slug, shot, priority = false, sizes }: { slug: string; shot?: string; priority?: boolean; sizes: string }) {
  // Aryan, 3 Nov 2026: the bright product homepages clash with the site; these two get designed visuals.
  if (slug === "aura") return <AuraVisual />;
  if (slug === "the-wedding-home") return <WeddingVisual />;

  if (shot) {
    return (
      <div className="device zoom-target relative mx-auto mt-auto w-[92%] translate-y-3 overflow-hidden rounded-t-[14px] border border-b-0 border-hairline bg-bg shadow-[var(--shadow-float)]">
        <div className="flex h-6 items-center gap-1.5 border-b border-hairline px-3" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-hairline" />
          <span className="h-2 w-2 rounded-full bg-hairline" />
          <span className="h-2 w-2 rounded-full bg-hairline" />
        </div>
        <Img src={`/shots/${shot}.webp`} alt="" width={1600} height={1000} sizes={sizes} priority={priority} className="block h-auto w-full" />
      </div>
    );
  }

  if (slug === "argus-autoloop") {
    // A small waveform is allowed for Argus only (F5); bars are fixed so the art is deterministic.
    const bars = [3, 6, 9, 14, 10, 18, 24, 16, 28, 20, 12, 22, 30, 18, 10, 16, 26, 14, 8, 12, 20, 9, 5, 3];
    return (
      <div className="zoom-target mt-auto flex w-full flex-col items-center gap-6 px-6 pb-8">
        <div className="flex h-16 items-center gap-[3px]" aria-hidden>
          {bars.map((b, i) => (
            <span key={i} className="wave-bar w-[5px] rounded-full bg-link" style={{ height: `${b * 2}px`, "--n": i } as React.CSSProperties} />
          ))}
        </div>
        <ol className="flex flex-wrap items-center justify-center gap-2 text-[13px] font-medium" aria-label="Validation ladder">
          {["Chat sim", "Voice sim", "Real calls"].map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-muted">→</span>}
              <span className="rounded-full bg-bg px-3 py-1.5 text-ink shadow-[0_0_0_1px_var(--hairline)]">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (slug === "enterprise-integrations") {
    return (
      <div className="zoom-target mt-auto w-full px-6 pb-8" aria-hidden>
        <div className="mx-auto flex max-w-[420px] flex-col gap-2">
          {["Session setup", "Availability", "Booking + guard", "Payment link"].map((n, i) => (
            <div key={n} className="flex items-center gap-3" style={{ marginLeft: `${i * 6}%` }}>
              <span className="mono grid h-6 w-6 place-items-center rounded-full bg-blue text-[11px] font-semibold text-white">{i + 1}</span>
              <span className="flex-1 rounded-[10px] bg-bg px-3 py-2 text-[13px] font-medium shadow-[0_0_0_1px_var(--hairline)]">{n}</span>
              <span className="mono text-[11px] text-muted">HMAC</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // production-infra
  const workers = [1, 1, 1, 8, 8, 8, 8, 8, 8, 8];
  return (
    <div className="zoom-target mt-auto w-full px-6 pb-8" aria-hidden>
      <div className="mx-auto max-w-[420px] rounded-[14px] bg-bg p-4 shadow-[0_0_0_1px_var(--hairline)]">
        <div className="mono mb-3 flex justify-between text-[11px] text-muted">
          <span>ws_workers</span>
          <span>nginx least_conn</span>
        </div>
        <div className="flex h-20 items-end gap-1.5">
          {workers.map((w, i) => (
            <span key={i} className="flex-1 rounded-t-[3px] bg-blue" style={{ height: `${(w / 8) * 100}%`, opacity: w === 1 ? 0.35 : 0.9 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** AURA: an orchestrator fanning out to 2, 3 or 5 agents in parallel, with the 6 MCP finance tools underneath. */
function AuraVisual() {
  const agents = [
    { x: 40, y: 32 },
    { x: 100, y: 18 },
    { x: 160, y: 32 },
    { x: 58, y: 96 },
    { x: 142, y: 96 },
  ];
  const tools = ["Net worth", "Bank", "Mutual funds", "Stocks", "Credit", "EPF"];
  return (
    <div className="zoom-target mt-auto w-full px-6 pb-8" aria-hidden>
      <div className="mx-auto max-w-[440px] rounded-[18px] bg-bg p-4 shadow-[0_0_0_1px_var(--hairline)]">
        <svg viewBox="0 0 200 128" className="block h-auto w-full">
          {agents.map((a, i) => (
            <line key={i} x1="100" y1="64" x2={a.x} y2={a.y} stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="3 4" className="aura-flow" style={{ "--n": i } as React.CSSProperties} />
          ))}
          {agents.map((a, i) => (
            <g key={i} className="aura-agent" style={{ "--n": i } as React.CSSProperties}>
              <circle cx={a.x} cy={a.y} r="11" fill="var(--blue-soft)" stroke="var(--blue)" strokeWidth="1.5" />
              <text x={a.x} y={a.y + 3.5} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--link)">
                A{i + 1}
              </text>
            </g>
          ))}
          <rect x="70" y="52" width="60" height="24" rx="12" fill="var(--blue)" />
          <text x="100" y="67.5" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">
            Orchestrator
          </text>
        </svg>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {tools.map((t) => (
            <span key={t} className="mono rounded-full bg-bg-alt px-2 py-0.5 text-[10.5px] text-ink-2">
              {t}
            </span>
          ))}
        </div>
        <p className="mono mt-2 text-center text-[10.5px] text-muted">MCP · 6 finance tools · streamed over Socket.IO</p>
      </div>
    </div>
  );
}

/** The Wedding Home: functions as tabs, a guest list with no-login RSVP state, a QR gallery and the CI strip. */
function WeddingVisual() {
  const functions = ["Haldi", "Mehendi", "Sangeet", "Wedding"];
  const rows = [true, true, false, true];
  return (
    <div className="zoom-target mt-auto w-full px-6 pb-8" aria-hidden>
      <div className="mx-auto max-w-[440px] overflow-hidden rounded-[18px] bg-bg shadow-[0_0_0_1px_var(--hairline)]">
        <div className="flex flex-wrap gap-1.5 border-b border-hairline p-3">
          {functions.map((f, i) => (
            <span key={f} className={i === 2 ? "rounded-full bg-blue px-2.5 py-1 text-[11px] font-medium text-white" : "rounded-full bg-bg-alt px-2.5 py-1 text-[11px] text-ink-2"}>
              {f}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[1fr_88px] gap-3 p-3">
          <ul className="space-y-1.5">
            {rows.map((ok, i) => (
              <li key={i} className="wh-row flex items-center gap-2 rounded-[8px] bg-bg-alt px-2 py-1.5" style={{ "--n": i } as React.CSSProperties}>
                <span className="h-4 w-4 flex-none rounded-full bg-hairline" />
                <span className="h-1.5 flex-1 rounded-full bg-hairline" />
                <span className={ok ? "mono rounded-[5px] bg-[var(--pass-bg)] px-1.5 text-[9.5px] text-ink" : "mono rounded-[5px] bg-blue-soft px-1.5 text-[9.5px] text-link"}>{ok ? "RSVP ✓" : "link sent"}</span>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-5 gap-[3px] rounded-[10px] bg-bg-alt p-2">
            {Array.from({ length: 25 }, (_, i) => (
              <span key={i} className="aspect-square rounded-[1.5px]" style={{ background: [0, 1, 5, 6, 3, 4, 8, 9, 15, 16, 20, 21, 12, 18, 24, 7, 22].includes(i) ? "var(--ink)" : "transparent" }} />
            ))}
            <span className="col-span-5 mt-1 text-center text-[9px] text-muted">QR gallery</span>
          </div>
        </div>
        <p className="mono border-t border-hairline px-3 py-2 text-[10.5px] text-muted">typecheck ✓ · 11 Vitest suites ✓ · Playwright ✓ · 61 API routes</p>
      </div>
    </div>
  );
}
