"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, type ReactNode } from "react";

import { PointerFx } from "./pointer-fx";
import { Toaster } from "./toaster";

/** Keeps <meta name="theme-color"> in step with a manual theme choice (F7). */
function ThemeColorSync() {
  const { resolvedTheme, theme } = useTheme();
  useEffect(() => {
    const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
    metas.forEach((m) => {
      if (!m.dataset.media) m.dataset.media = m.media;
      if (theme === "system") {
        m.media = m.dataset.media ?? "";
        m.content = m.dataset.media?.includes("dark") ? "#121214" : "#ffffff";
      } else {
        m.media = "";
        m.content = resolvedTheme === "dark" ? "#121214" : "#ffffff";
      }
    });
  }, [resolvedTheme, theme]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ThemeColorSync />
      <PointerFx />
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
