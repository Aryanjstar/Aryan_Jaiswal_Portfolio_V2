"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Song } from "@/content/schema";
import { cn } from "@/lib/cn";
import { fmtMonth } from "@/lib/format";

import { CoverArt } from "./cover-art";

/** Arrow keys move and select within a radiogroup (WAI-ARIA radio pattern). */
function radioKeys(e: React.KeyboardEvent<HTMLDivElement>) {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
  e.preventDefault();
  const radios = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
  const i = radios.indexOf(document.activeElement as HTMLButtonElement);
  const next = radios[(i + (e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1) + radios.length) % radios.length];
  next.focus();
  next.click();
}

const langOf = (s?: string) => (s && /[ऀ-ॿ]/.test(s) ? "hi" : undefined);

type Filter = "all" | "hi" | "en" | "live";
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "hi", label: "Hindi" },
  { key: "en", label: "English" },
  { key: "live", label: "Live" },
];

const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * F14. Rich song cards in Aryan's order: his Hindi line, title, description, vibe, and a direct
 * "Watch on Instagram" button on every card. "Play here" opens a sheet with the reel embedded right away
 * (Aryan, 3 Nov 2026); nothing from Instagram loads before a song is opened. Server HTML has every card
 * and link (JS-off safe).
 */
export function TrackGrid({ songs }: { songs: Song[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<"picks" | "newest">("picks");
  const [current, setCurrent] = useState<number | null>(null);
  const [embed, setEmbed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const visible = useMemo(() => {
    const withIndex = songs.map((s, i) => ({ s, i }));
    const filtered = withIndex.filter(({ s }) => (filter === "all" ? true : filter === "live" ? !!(s.live || s.place) : s.lang === filter));
    return sort === "newest" ? [...filtered].sort((a, b) => b.s.postedAt.localeCompare(a.s.postedAt)) : filtered;
  }, [songs, filter, sort]);

  const song = current === null ? null : songs[current];

  function open(i: number, e: React.MouseEvent<HTMLElement>) {
    opener.current = e.currentTarget;
    setCurrent(i);
    setEmbed(true);
    dialog.current?.showModal();
  }

  function step(dir: 1 | -1) {
    if (current === null) return;
    const pos = visible.findIndex((v) => v.i === current);
    const next = visible[(pos + dir + visible.length) % visible.length];
    setCurrent(next.i);
    setEmbed(true);
  }

  // The vinyl (and anything else) can ask for a song: window.dispatchEvent(new CustomEvent("play-song", { detail: code })).
  useEffect(() => {
    const onPlay = (e: Event) => {
      const i = songs.findIndex((s) => s.code === (e as CustomEvent<string>).detail);
      if (i < 0) return;
      opener.current = document.activeElement as HTMLElement | null;
      setCurrent(i);
      setEmbed(true);
      dialog.current?.showModal();
    };
    window.addEventListener("play-song", onPlay);
    return () => window.removeEventListener("play-song", onPlay);
  }, [songs]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      setEmbed(false);
      // The close event lands a moment later; don't steal focus if the visitor already moved it.
      const active = document.activeElement;
      if (!active || active === document.body || d.contains(active)) opener.current?.focus();
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        <div role="radiogroup" aria-label="Filter songs" className="segmented" onKeyDown={radioKeys}>
          {FILTERS.map((f) => (
            <button key={f.key} type="button" role="radio" aria-checked={filter === f.key} tabIndex={filter === f.key ? 0 : -1} onClick={() => setFilter(f.key)} className={cn("seg", filter === f.key && "is-on")}>
              {f.label}
            </button>
          ))}
        </div>
        <div role="radiogroup" aria-label="Sort songs" className="segmented" onKeyDown={radioKeys}>
          {(["picks", "newest"] as const).map((k) => (
            <button key={k} type="button" role="radio" aria-checked={sort === k} tabIndex={sort === k ? 0 : -1} onClick={() => setSort(k)} className={cn("seg", sort === k && "is-on")}>
              {k === "picks" ? "Aryan's picks" : "Newest"}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} songs shown
      </p>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ s, i }, pos) => (
          <li key={s.code} className="track-in">
            <article className="song-card glow group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-card">
              <button type="button" onClick={(e) => open(i, e)} className="cover-link block text-left" aria-label={`Play ${s.title} here`}>
                {/* Numbered by position in the current order, so "Newest" reads 01, 02, 03… */}
                <CoverArt song={s} index={pos} variant="banner" />
              </button>
              <div className="flex flex-1 flex-col p-6">
                {s.line && (
                  <p lang={langOf(s.line)} className="text-[15px] text-link">
                    {s.line}
                  </p>
                )}
                <h3 className="mt-1 text-[24px] font-semibold leading-tight tracking-[-0.02em]">{s.title}</h3>
                {s.subtitle && <p className="text-[14px] italic text-ink-2">{s.subtitle}</p>}
                {s.description && (
                  <p lang={langOf(s.description)} className="mt-2 text-[16px] text-ink-2">
                    {s.description}
                  </p>
                )}
                {s.vibe && (
                  <p lang={langOf(s.vibe)} className="mt-2 flex gap-2 text-[15px] italic text-muted">
                    <span aria-hidden className="sparkle not-italic text-link">
                      ✦
                    </span>
                    {s.vibe}
                  </p>
                )}
                {(s.artist || s.place || s.live) && (
                  // No month here (Aryan, 3 Nov 2026): the year is on the banner and "Newest" sorts by date.
                  <p className="mt-3 text-[13px] text-muted">{[s.artist, s.place ?? (s.live ? "Live" : undefined)].filter(Boolean).join(" · ")}</p>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost ig-btn !min-h-10 !text-[14px]">
                    <IgIcon />
                    Watch on Instagram
                    <span aria-hidden className="chev">
                      →
                    </span>
                  </a>
                  <button type="button" onClick={(e) => open(i, e)} className="btn play-btn !min-h-10 !px-3 !text-[14px] text-link" aria-label={`Play ${s.title} here`}>
                    ▶ Play here
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className="track-sheet" aria-labelledby="sheet-title" onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
        {song && current !== null && (
          <div className="grid gap-6 p-5 md:grid-cols-[280px_1fr] md:p-7">
            <div>
              {embed ? (
                <div className="overflow-hidden rounded-[18px] bg-bg-alt">
                  <iframe
                    src={`https://www.instagram.com/reel/${song.code}/embed/`}
                    title={`${song.title} on Instagram`}
                    className="block h-[480px] w-full border-0"
                    loading="lazy"
                    allow="encrypted-media; picture-in-picture"
                  />
                </div>
              ) : (
                <CoverArt song={song} index={current} size="lg" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono text-[12px] text-muted">
                    {String(current + 1).padStart(2, "0")} / {songs.length}
                  </p>
                  {song.line && (
                    <p lang={langOf(song.line)} className="mt-1 text-link">
                      {song.line}
                    </p>
                  )}
                  <h2 id="sheet-title" className="mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em]">
                    {song.title}
                  </h2>
                  {song.subtitle && <p className="italic text-ink-2">{song.subtitle}</p>}
                </div>
                <button type="button" className="icon-btn flex-none" onClick={() => dialog.current?.close()} aria-label="Close">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
              {song.description && (
                <p lang={langOf(song.description)} className="mt-3 text-[17px] text-ink-2">
                  {song.description}
                </p>
              )}
              {song.vibe && (
                <p lang={langOf(song.vibe)} className="mt-2 text-[16px] italic text-muted">
                  <span aria-hidden className="not-italic text-link">
                    ✦{" "}
                  </span>
                  {song.vibe}
                </p>
              )}
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[15px]">
                <dt className="text-muted">Singer</dt>
                <dd>Aryan Jaiswal</dd>
                {song.artist && (
                  <>
                    <dt className="text-muted">Original</dt>
                    <dd>{song.artist}</dd>
                  </>
                )}
                <dt className="text-muted">Posted</dt>
                <dd>{fmtMonth(song.postedAt)}</dd>
                {song.place && (
                  <>
                    <dt className="text-muted">Place</dt>
                    <dd>{song.place}</dd>
                  </>
                )}
              </dl>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                {!embed && (
                  <button type="button" className="btn btn-secondary" onClick={() => setEmbed(true)}>
                    ▶ Load video
                  </button>
                )}
                <a href={song.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <IgIcon /> Watch on Instagram <span aria-hidden>→</span>
                </a>
              </div>
              {!embed && <p className="mt-2 text-[12px] text-muted">Loading the video contacts Instagram.</p>}
            </div>
          </div>
        )}
      </dialog>

      {song && current !== null && (
        <div className="now-playing no-print" role="region" aria-label="Now playing">
          <span className="eq" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="min-w-0 flex-1 truncate text-[14px]">
            <span className="font-semibold">{song.title}</span>
            {song.artist && <span className="text-muted"> · {song.artist}</span>}
          </span>
          <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous song">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6 5h2v14H6zM20 5v14L9 12z" />
            </svg>
          </button>
          <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next song">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
            </svg>
          </button>
          <a href={song.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-9 !px-4 !text-[14px]">
            Watch
          </a>
        </div>
      )}
    </>
  );
}
