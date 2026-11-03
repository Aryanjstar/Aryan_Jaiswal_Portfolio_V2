import { test } from "@playwright/test";
import fs from "node:fs";

import { SCREEN_ROUTES } from "./routes";

// 390×844 and 1440×900, light + dark, plus reduced motion. Output: docs/redesign/screens/<phase>/
const phase = process.env.PHASE ?? "dev";
const dir = `docs/redesign/screens/${phase}`;
fs.mkdirSync(dir, { recursive: true });

const sizes = (process.env.SCREEN_WIDTHS ?? "390,1440").split(",").map((w) => ({ w: Number(w), h: Number(w) < 768 ? 844 : Number(w) < 1200 ? 1024 : 900 }));
const schemes = ["light", "dark"] as const;
const slug = (r: string) => (r === "/" ? "home" : r.replace(/^\//, "").replace(/[/?=&]+/g, "_"));

for (const route of SCREEN_ROUTES) {
  for (const { w, h } of sizes) {
    for (const scheme of schemes) {
      for (const motion of ["full", "reduced"] as const) {
        if (motion === "reduced" && scheme === "dark") continue;
        test(`${route} ${w} ${scheme} ${motion}`, async ({ browser }) => {
          const ctx = await browser.newContext({
            viewport: { width: w, height: h },
            colorScheme: scheme,
            reducedMotion: motion === "reduced" ? "reduce" : "no-preference",
            deviceScaleFactor: 1,
            isMobile: w < 768,
            hasTouch: w < 768,
          });
          const page = await ctx.newPage();
          await page.goto(route, { waitUntil: "load" });
          await page.waitForTimeout(1200);
          const base = `${dir}/${slug(route)}-${w}-${scheme}${motion === "reduced" ? "-reduced" : ""}`;
          await page.screenshot({ path: `${base}-fold.png` });
          if (motion === "full") {
            // Scroll through once so CSS view-timeline reveals settle before the full-page capture.
            await page.evaluate(async () => {
              for (let y = 0; y < document.body.scrollHeight; y += 600) {
                window.scrollTo(0, y);
                await new Promise((r) => setTimeout(r, 40));
              }
              window.scrollTo(0, 0);
            });
            await page.emulateMedia({ reducedMotion: "reduce" });
            await page.screenshot({ path: `${base}-full.png`, fullPage: true });
          }
          await ctx.close();
        });
      }
    }
  }
}
