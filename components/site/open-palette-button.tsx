"use client";

/** Opens the ⌘K palette from anywhere (e.g. the 404 page). */
export function OpenPaletteButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("open-palette"))}>
      Search the site <kbd className="mono ml-1 rounded-[5px] bg-bg-alt px-1.5 py-0.5 text-[12px] text-muted">⌘K</kbd>
    </button>
  );
}
