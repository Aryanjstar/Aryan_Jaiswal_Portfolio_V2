import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Instrument Sans 600 as a static TTF (Satori can't read woff2 or pick a weight from a variable font). Falls back to the default font if offline. */
async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/fontsource/fonts/instrument-sans@latest/latin-600-normal.ttf");
    return r.ok ? await r.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** Always light (F7): white background, blue accent bar, mono URL. */
export async function ogImage({ kicker, title, path = "" }: { kicker: string; title: string; path?: string }) {
  const font = await loadFont();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", padding: "72px 80px", ...(font ? { fontFamily: "Instrument Sans" } : {}) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="#0071E3" />
            <path d="M9.5 10.5 15 16l-5.5 5.5" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="17" y="19.6" width="7.5" height="2.8" rx="1.4" fill="#fff" />
          </svg>
          <div style={{ fontSize: 26, color: "#6E6E73" }}>{kicker}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ width: 72, height: 6, borderRadius: 3, background: "#0071E3" }} />
          <div style={{ fontSize: title.length > 60 ? 58 : 72, lineHeight: 1.05, letterSpacing: -2.5, color: "#1D1D1F", fontWeight: 600, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ fontSize: 24, color: "#6E6E73", letterSpacing: 0.5 }}>{`aryanjaiswal.in${path}`}</div>
      </div>
    ),
    { ...ogSize, fonts: font ? [{ name: "Instrument Sans", data: font, weight: 600, style: "normal" }] : undefined },
  );
}
