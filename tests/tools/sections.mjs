// Review helper: screenshots each top-level section of a route. node tests/tools/sections.mjs <route> <width> <scheme> <outdir>
import { chromium } from "@playwright/test";
const [route = "/", width = "1440", scheme = "light", out = "docs/redesign/screens/dev/sections"] = process.argv.slice(2);
const fs = await import("node:fs");
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +width, height: 900 }, colorScheme: scheme, reducedMotion: "reduce", isMobile: +width < 768, hasTouch: +width < 768 });
const p = await ctx.newPage();
await p.goto("http://localhost:3100" + route, { waitUntil: "load" });
const n = await p.locator("main section, main > div > section, footer").count();
for (let i = 0; i < n; i++) {
  const el = p.locator("main section, main > div > section, footer").nth(i);
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(250);
  await el.screenshot({ path: `${out}/${(route === "/" ? "home" : route.slice(1).replace(/\W+/g, "_"))}-${width}-${scheme}-${String(i).padStart(2, "0")}.png` }).catch(() => {});
}
console.log("sections", n);
await b.close();
