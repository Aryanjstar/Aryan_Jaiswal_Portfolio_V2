"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The notesbyaryan record. With an `audio` file it is a real player (Aryan, 3 Nov 2026):
 * click plays the song on the page, click again pauses, it stops at the end (no loop). While playing the
 * needle sits on the record, the disk spins faster and a ring shows progress. Without a file it falls back
 * to opening the song's sheet (Instagram embed). Reduced motion: no spinning; playback still works.
 */
export function Vinyl({ size = 220, code, title, href, audio }: { size?: number; code: string; title: string; href: string; audio?: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const grooves = [96, 90, 84, 78, 72, 66, 60];
  const bars = [6, 11, 16, 9, 19, 13, 7, 15, 10, 5];
  const R = 98;
  const C = 2 * Math.PI * R;

  // Progress ring, updated without re-rendering.
  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    let raf = 0;
    const draw = () => {
      if (ring.current && a.duration) ring.current.style.strokeDashoffset = String(C * (1 - a.currentTime / a.duration));
      if (!a.paused) raf = requestAnimationFrame(draw);
    };
    const onPlay = () => {
      setState("playing");
      raf = requestAnimationFrame(draw);
    };
    const onPause = () => {
      cancelAnimationFrame(raf);
      if (!a.ended) setState("paused");
    };
    const onEnded = () => {
      cancelAnimationFrame(raf);
      a.currentTime = 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(C);
      setState("idle");
    };
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    return () => {
      cancelAnimationFrame(raf);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
    };
  }, [C]);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    const a = ref.current;
    if (!audio || !a) {
      window.dispatchEvent(new CustomEvent("play-song", { detail: code }));
      return;
    }
    if (a.paused) void a.play();
    else a.pause();
  }

  const label = !audio ? `Play ${title}` : state === "playing" ? `Pause ${title}` : `Play ${title}`;
  const cta = !audio ? `▶ ${title}` : state === "playing" ? `❚❚ Pause` : state === "paused" ? `▶ Resume ${title}` : `▶ Play ${title}`;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <a
        href={href}
        onClick={onClick}
        role={audio ? "button" : undefined}
        aria-pressed={audio ? state === "playing" : undefined}
        className="vinyl group relative block h-full w-full"
        data-state={state}
        aria-label={label}
      >
        <div className="vinyl-disc absolute inset-0">
          <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
            <defs>
              <radialGradient id="vinyl-sheen" cx="30%" cy="25%" r="80%">
                <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
                <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <path id="vinyl-ring" d="M100,100 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
            </defs>
            <circle cx="100" cy="100" r="100" fill="#111113" />
            {grooves.map((r) => (
              <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#fff" strokeOpacity="0.07" strokeWidth="0.8" />
            ))}
            <circle cx="100" cy="100" r="100" fill="url(#vinyl-sheen)" />
            <circle cx="100" cy="100" r="47" fill="#0071E3" />
            <circle cx="100" cy="100" r="47" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" />
            <text fill="#fff" fontSize="8.2" fontFamily="var(--font-mono), monospace" letterSpacing="2.2" opacity="0.9">
              <textPath href="#vinyl-ring">NOTESBYARYAN • I SING WHAT I CAN&apos;T EXPRESS •</textPath>
            </text>
            <g transform="translate(77 100)">
              {bars.map((h, i) => (
                <rect key={i} className="vinyl-bar" x={i * 4.8} y={-h / 2} width="2.6" height={h} rx="1.3" fill="#fff" style={{ "--n": i } as React.CSSProperties} />
              ))}
            </g>
            <circle cx="100" cy="100" r="2.4" fill="#fff" opacity="0.9" />
          </svg>
        </div>
        {audio && (
          <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 h-full w-full -rotate-90" aria-hidden>
            <circle ref={ring} cx="100" cy="100" r={R} fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} className="vinyl-progress" />
          </svg>
        )}
        <svg viewBox="0 0 60 120" className="vinyl-arm absolute -right-[14%] -top-[6%] h-[62%]" aria-hidden>
          <circle cx="44" cy="14" r="9" fill="var(--bg-alt)" stroke="var(--hairline)" strokeWidth="2" />
          <circle cx="44" cy="14" r="3.5" fill="var(--muted)" />
          <path d="M44 14 L40 86 L22 104" fill="none" stroke="var(--muted)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="12" y="98" width="16" height="10" rx="2.5" transform="rotate(-42 20 103)" fill="var(--ink-2)" />
        </svg>
        <span className="vinyl-cta" aria-hidden>
          {cta}
        </span>
      </a>
      {audio && <audio ref={ref} src={audio} preload="none" />}
      <span className="sr-only" aria-live="polite">
        {state === "playing" ? `Playing ${title}` : state === "paused" ? `Paused ${title}` : ""}
      </span>
    </div>
  );
}
