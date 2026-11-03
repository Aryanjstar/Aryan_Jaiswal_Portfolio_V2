import Link from "next/link";

import { CoverArt } from "@/components/music/cover-art";
import { Img } from "@/components/site/img";
import { musicCopy, songs } from "@/content/music";

/** Homepage music chapter: pins 1–3 + a link to /notesbyaryan (D-09). */
export function OffTheClock() {
  const picks = songs.slice(0, 3);
  return (
    <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
      <div className="reveal relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[28px] md:max-w-none">
        <Img src="/aryan-720.webp" alt="Aryan singing on stage at the IIIT Dharwad farewell" width={720} height={1282} className="aspect-[4/5] w-full object-cover object-[50%_100%]" />
      </div>
      <div>
        <ul className="grid grid-cols-3 gap-3">
          {picks.map((s, i) => (
            <li key={s.code} className="reveal">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="cover-link group block" aria-label={`${s.title}${s.artist ? `, originally by ${s.artist}` : ""}, watch on Instagram`}>
                <CoverArt song={s} index={i} />
                <span className="mt-2 block text-[14px] font-semibold leading-tight">{s.title}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="reveal mt-8 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 sm:gap-x-3">
          <Link href="/notesbyaryan" className="link-quiet whitespace-nowrap text-[15px] font-medium sm:text-[17px]">
            Listen on notesbyaryan <span className="chev" aria-hidden>›</span>
          </Link>
          <span className="whitespace-nowrap text-[14px] italic text-muted sm:text-[15px]">{musicCopy.line}</span>
        </p>
      </div>
    </div>
  );
}
