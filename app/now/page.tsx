import type { Metadata } from "next";
import Link from "next/link";

import { musicCopy, songs } from "@/content/music";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Now", description: "What Aryan Jaiswal is doing now.", alternates: { canonical: "/now" } };

// A /now page (nownownow.com). Facts only; update the date when anything changes.
const UPDATED = "3 Nov 2026";

export default function Now() {
  const latest = [...songs].sort((a, b) => b.postedAt.localeCompare(a.postedAt))[0];
  const items = [
    { k: "Work", v: <>Forward Deployed Engineer at Exotel, shipping LLM voice agents for clients and running every new bot through AutoLoop before it goes live. <Link className="link" href="/work/argus-autoloop">How that works ›</Link></> },
    { k: "Looking", v: <>{profile.status}. If you&apos;re hiring, <Link className="link" href="/#contact">say hi</Link>.</> },
    { k: "Building", v: <>LEELA, a studio that turns a topic, notes or code into a narrated short film (<a className="link" href="https://leela-kappa.vercel.app" target="_blank" rel="noopener noreferrer">live</a>), and this site, v3.</> },
    { k: "Singing", v: <>Latest cover: {latest.title}. Currently vibing to {musicCopy.nowListening.song} • {musicCopy.nowListening.from}. <Link className="link" href="/notesbyaryan">All covers ›</Link></> },
  ];
  return (
    <section className="mx-auto max-w-[760px] px-5 pb-24 pt-14 md:pt-20">
      <p className="enter text-[15px] font-semibold text-muted">Now</p>
      <h1 className="display enter mt-2 text-[clamp(2.5rem,6vw,4.5rem)]" style={{ "--i": 1 } as React.CSSProperties}>
        What I&apos;m doing <span className="serif-word">now</span>.
      </h1>
      <p className="mono enter mt-3 text-[13px] text-muted" style={{ "--i": 2 } as React.CSSProperties}>
        Updated {UPDATED} · Bangalore
      </p>
      <dl className="hl-read mt-10 divide-y divide-hairline border-y border-hairline">
        {items.map((i) => (
          <div key={i.k} className="reveal grid gap-1 py-5 sm:grid-cols-[130px_1fr] sm:gap-6">
            <dt className="font-semibold">{i.k}</dt>
            <dd className="text-[17px] leading-relaxed text-ink-2">{i.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
