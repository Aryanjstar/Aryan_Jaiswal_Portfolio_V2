"use client";

import { useEffect, useRef, useState } from "react";

/** Counts every number inside a string up from 0 when it scrolls into view ("313/313", "25→2 min"). Static with reduced motion. */
export function Ticker({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [p, setP] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - start) / 900);
          setP(1 - Math.pow(1 - k, 3));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        setP(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const text = p === 1 ? value : value.replace(/\d+/g, (d) => String(Math.round(Number(d) * p)));
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden>{text}</span>
    </span>
  );
}
