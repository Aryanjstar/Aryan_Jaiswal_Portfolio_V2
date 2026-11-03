"use client";

import { useRef } from "react";
import { toast } from "@/lib/toast";

/**
 * Primary CTA (I3): magnetic up to 6px on fine pointers, arrow nudges down, press 0.97,
 * then a toast naming the variant. A plain download link with JS off.
 */
export function ResumeButton({ href, variant }: { href: string; variant: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef(0);

  function move(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 6;
    const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 4;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    });
  }
  function leave() {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.translate = "0 0";
  }

  return (
    <a
      ref={ref}
      href={href}
      download={href.split("/").pop()}
      onPointerMove={move}
      onPointerLeave={leave}
      onClick={() => toast(`Resume downloading (${variant} version)`)}
      className="btn btn-primary magnetic"
    >
      Download resume
      <span aria-hidden className="btn-arrow-down">↓</span>
    </a>
  );
}
