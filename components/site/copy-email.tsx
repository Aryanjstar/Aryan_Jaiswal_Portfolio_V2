"use client";

import { toast } from "@/lib/toast";

import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

/** Copies the address and confirms with a toast (F6, I17). Falls back to a mailto link without JS. */
export function CopyEmail({ className, label = "Copy email", variant = "secondary" }: { className?: string; label?: string; variant?: "secondary" | "ghost" | "link" }) {
  async function copy(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    toast(`Copied ${profile.email}`);
  }

  return (
    <a
      href={`mailto:${profile.email}`}
      onClick={copy}
      role="button"
      className={cn(variant === "link" ? "link-quiet font-medium" : `btn btn-${variant}`, className)}
      aria-label={`Copy email address ${profile.email}`}
    >
      {variant !== "link" && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="9" y="9" width="12" height="12" rx="2.5" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
      )}
      {label}
    </a>
  );
}
