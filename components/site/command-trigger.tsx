"use client";

import { lazy, Suspense, useCallback, useEffect, useState } from "react";

import { toast } from "@/lib/toast";

const Palette = lazy(() => import("./command-palette"));

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const isTyping = (t: EventTarget | null) => t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));

/** ⌘K / Ctrl+K / "/" opens the palette (loaded on first use). Typing "ship" or the Konami code toggles debug mode (F9). */
export function CommandTrigger() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  // Work from the DOM, not state: right after Esc the dialog is closed before its `close` event reaches React,
  // so a quick ⌘K must reopen the still-mounted dialog instead of toggling state.
  const openPalette = useCallback(() => {
    const d = document.querySelector<HTMLDialogElement>("dialog.palette");
    if (d && !d.open) d.showModal();
    else if (!d) setOpen(true);
  }, []);

  // Warm the palette chunk once the page is idle so the first ⌘K opens instantly (not part of first-load JS).
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const warm = () => void import("./command-palette");
    if (w.requestIdleCallback) w.requestIdleCallback(warm);
    else setTimeout(warm, 2000);
  }, []);

  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const d = document.querySelector<HTMLDialogElement>("dialog.palette[open]");
        if (d) d.close();
        else openPalette();
        return;
      }
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        openPalette();
        return;
      }
      buf = [...buf, e.key].slice(-10);
      const word = buf.slice(-4).join("").toLowerCase();
      if (word === "ship" || buf.join(",") === KONAMI.join(",")) {
        buf = [];
        const on = document.documentElement.toggleAttribute("data-debug");
        toast(on ? "Debug mode on · type “ship” again to exit" : "Debug mode off");
      }
      if (e.key === "Escape" && document.documentElement.hasAttribute("data-debug")) document.documentElement.removeAttribute("data-debug");
    };
    const onOpen = () => openPalette();
    document.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [openPalette]);

  return (
    <>
      <button type="button" onClick={openPalette} onPointerEnter={() => import("./command-palette")} className="kbd-btn hidden md:inline-flex" aria-label="Open command palette (Command K)">
        <span aria-hidden>⌘K</span>
      </button>
      <span className="md:hidden">
      <button type="button" onClick={openPalette} className="icon-btn" aria-label="Open command palette">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-4.2-4.2" />
        </svg>
      </button>
      </span>
      {open && (
        <Suspense fallback={null}>
          <Palette onClose={close} />
        </Suspense>
      )}
    </>
  );
}
