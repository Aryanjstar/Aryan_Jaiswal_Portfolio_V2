"use client";

import { useEffect, useRef, useState } from "react";

import { profile } from "@/content/profile";

/**
 * "Hi" greeting (F4, I2). Hover/focus shows a tooltip cycling hello in five languages;
 * click/tap pins it. Words carry `lang` so each script renders and is read correctly.
 */
export function Greeting() {
  const [pinned, setPinned] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!pinned) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof PointerEvent && ref.current?.contains(e.target as Node)) return;
      setPinned(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [pinned]);

  return (
    <span ref={ref} className="greeting relative inline-block" data-pinned={pinned || undefined}>
      <button
        type="button"
        className="greeting-trigger"
        aria-expanded={pinned}
        aria-describedby="greeting-tip"
        onClick={() => setPinned((p) => !p)}
      >
        Hi
      </button>
      <span id="greeting-tip" role="tooltip" className="greeting-tip">
        <span className="greeting-words" aria-hidden>
          {profile.greeting.words.map((w, i) => (
            <span key={w.lang} lang={w.lang} style={{ "--w": i } as React.CSSProperties}>
              {w.text}
            </span>
          ))}
        </span>
        <span className="sr-only">
          {profile.greeting.words.map((w) => (
            <span key={w.lang} lang={w.lang}>
              {w.text}{" "}
            </span>
          ))}
        </span>
        <span className="greeting-caption">{profile.greeting.caption}</span>
      </span>
    </span>
  );
}
