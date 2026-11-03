import type { Song } from "@/content/schema";

/** FNV-1a: stable across server and client, so the art never changes between renders. */
function hash(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * D-18: one generated cover per song, same layout and animation for all.
 * Background from a 6-colour palette (light + dark tokens) picked by title hash;
 * a waveform "signature" derived from the title's letters; title, position and year.
 */
export function CoverArt({ song, index, size = "md", variant = "tile" }: { song: Song; index: number; size?: "md" | "lg"; variant?: "tile" | "banner" }) {
  const tone = (hash(song.title) % 6) + 1;
  const letters = song.title.replace(/[^a-z]/gi, "").toLowerCase().padEnd(18, song.code.toLowerCase());
  const bars = Array.from({ length: 18 }, (_, i) => {
    const c = letters.charCodeAt(i % letters.length) - 96;
    return 0.22 + ((Math.abs(c) * 7 + i * 3) % 26) / 34;
  });
  const year = song.postedAt.slice(0, 4);

  if (variant === "banner") {
    // Song-card header: waveform + floating notes (the ♪ ♫ ♪ ♬ from the old page), no title (the card shows it).
    return (
      <div className="cover banner relative aspect-[16/9] w-full overflow-hidden" style={{ background: `var(--cover-${tone})`, color: `var(--cover-${tone}-ink)` }} aria-hidden>
        <div className="mono absolute inset-x-0 top-0 flex justify-between p-4 text-[11px]">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{year}</span>
        </div>
        <div className="absolute inset-x-[10%] top-[30%] flex h-[40%] items-center gap-[2.5%]">
          {bars.map((b, i) => (
            <span key={i} className="cover-bar flex-1 rounded-full bg-current" style={{ height: `${Math.round(b * 100)}%`, "--n": i } as React.CSSProperties} />
          ))}
        </div>
        {["♪", "♫", "♪", "♬"].map((n, i) => (
          <span key={i} className="note absolute text-[20px]" style={{ left: `${14 + i * 22}%`, bottom: "10%", "--n": i } as React.CSSProperties}>
            {n}
          </span>
        ))}
        <span className="cover-play absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-current">
          <svg width="14" height="14" viewBox="0 0 24 24" style={{ color: `var(--cover-${tone})` }} fill="currentColor">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      </div>
    );
  }

  return (
    <div
      className="cover relative aspect-[4/5] w-full overflow-hidden rounded-[18px]"
      style={{ background: `var(--cover-${tone})`, color: `var(--cover-${tone}-ink)` }}
      aria-hidden
    >
      <div className="absolute inset-x-0 top-0 flex justify-between p-[7%] mono text-[11px]">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{year}</span>
      </div>
      <div className="absolute inset-x-[9%] top-[30%] flex h-[26%] items-center gap-[3%]">
        {bars.map((b, i) => (
          <span key={i} className="cover-bar flex-1 rounded-full bg-current" style={{ height: `${Math.round(b * 100)}%`, "--n": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-[8%]">
        <p className={size === "lg" ? "text-[30px] font-semibold leading-[1.05] tracking-[-0.02em]" : "text-[clamp(15px,2.1vw,20px)] font-semibold leading-[1.1] tracking-[-0.015em]"}>{song.title}</p>
      </div>
      {/* Centred on the waveform, ringed in the cover colour, so it never touches the title or the corner labels. */}
      <span
        className="cover-play absolute left-[calc(50%-16px)] top-[calc(43%-16px)] grid h-8 w-8 place-items-center rounded-full bg-current"
        style={{ boxShadow: `0 0 0 4px var(--cover-${tone})` }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" style={{ color: `var(--cover-${tone})` }} fill="currentColor">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
    </div>
  );
}
