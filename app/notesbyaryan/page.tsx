import type { Metadata } from "next";
import Link from "next/link";

import { TrackGrid } from "@/components/music/track-grid";
import { Vinyl } from "@/components/music/vinyl";
import { musicCopy, songs } from "@/content/music";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "notesbyaryan",
  description: "Song covers by Aryan Jaiswal. i sing what i can't express.",
  alternates: { canonical: "/notesbyaryan" },
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;
const WORD = "notesbyaryan";

export default function Music() {
  const featured = songs.find((s) => s.code === musicCopy.featuredCode) ?? songs[0];
  return (
    <>
      <section className="music-hero relative overflow-hidden bg-bg" data-pause-offscreen>
        <span aria-hidden className="music-float" style={{ left: "8%", top: "22%" }}>♪</span>
        <span aria-hidden className="music-float" style={{ right: "10%", top: "16%", animationDelay: "-2s" }}>♫</span>
        <span aria-hidden className="music-float" style={{ left: "14%", bottom: "18%", animationDelay: "-4s" }}>♬</span>
        <span aria-hidden className="music-float" style={{ right: "16%", bottom: "24%", animationDelay: "-1s" }}>♪</span>

        <div className="relative mx-auto max-w-[980px] px-5 pb-16 pt-14 text-center md:px-8 md:pb-20 md:pt-20">
          <div className="enter" style={i(0)}>
            <Vinyl size={200} code={featured.code} title={featured.title} href={featured.url} audio={featured.audio} />
          </div>
          <p className="enter mt-14 text-[15px] font-semibold text-muted md:text-[17px]" style={i(1)}>
            {musicCopy.name}
          </p>
          <h1 className="display mt-1 text-[clamp(3rem,10vw,6.5rem)]" aria-label={WORD}>
            {WORD.split("").map((ch, k) => (
              <span key={k} aria-hidden className="bounce-letter" style={{ "--k": k } as React.CSSProperties}>
                {ch}
              </span>
            ))}
          </h1>
          <p className="enter mono mt-3 text-[12px] tracking-[0.32em] text-muted md:text-[13px]" style={i(3)}>
            {musicCopy.tagline}
          </p>
          <p className="enter mt-6 text-[clamp(1.5rem,3.6vw,2.25rem)] text-ink" style={i(4)}>
            <span className="serif-word">“{musicCopy.line}”</span>
          </p>
          <p lang="hi" className="enter mx-auto mt-3 max-w-[620px] text-[17px] text-ink-2" style={i(5)}>
            {musicCopy.lineHi}
          </p>

          <div className="enter mx-auto mt-10 grid max-w-[640px] gap-3 sm:grid-cols-2" style={i(6)}>
            <a href={profile.links.music} target="_blank" rel="noopener noreferrer" className="music-chip glow group">
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{musicCopy.follow}</span>
              <span className="mt-1 flex items-center gap-2 text-[19px] font-semibold text-ink">
                @notesbyaryan <span className="chev text-link" aria-hidden>→</span>
              </span>
            </a>
            <div className="music-chip glow">
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Currently vibing to</span>
              <span className="mt-1 flex items-center gap-2.5 text-[19px] font-semibold text-ink">
                <span className="eq" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
                {musicCopy.nowListening.song} <span className="font-normal text-muted">• {musicCopy.nowListening.from}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="drops-title" className="bg-bg pb-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <header className="reveal mb-8 text-center">
            <h2 id="drops-title" className="mono text-[13px] font-semibold tracking-[0.28em] text-link">
              {musicCopy.dropsTitle}
            </h2>
            <p className="display mt-3 text-[clamp(2rem,4.5vw,3.25rem)]">{musicCopy.dropsSub}</p>
          </header>
          <TrackGrid songs={songs} />
        </div>
      </section>

      <section className="bg-bg-alt py-20 text-center">
        <p className="mx-auto max-w-[680px] px-5 text-[clamp(1.25rem,3vw,1.75rem)] font-medium leading-snug tracking-[-0.01em]">{musicCopy.closing}</p>
        <p className="mt-8 text-[15px]">
          <Link href="/" className="link-quiet font-medium">
            <span aria-hidden>‹ </span>Back to the engineering side
          </Link>
        </p>
      </section>
    </>
  );
}
