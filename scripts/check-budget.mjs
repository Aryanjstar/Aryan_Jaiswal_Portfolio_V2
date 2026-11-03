// Fails if any listed route ships more than BUDGET_KB of gzipped JS on first load (plan: homepage ≤ 150 KB).
// Usage: node scripts/check-budget.mjs  (needs `next start` on BASE_URL, default http://localhost:3100)
import { chromium } from "@playwright/test";
import zlib from "node:zlib";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const BUDGET_KB = Number(process.env.BUDGET_KB ?? 150);
const routes = ["/", "/notesbyaryan", "/projects", "/resume", "/work/argus-autoloop", "/colophon"];

const browser = await chromium.launch();
let failed = false;
for (const route of routes) {
  const page = await (await browser.newContext()).newPage();
  let loaded = false;
  const sizes = [];
  page.on("response", async (r) => {
    if (r.request().resourceType() !== "script" || loaded) return;
    try {
      sizes.push(zlib.gzipSync(await r.body()).length);
    } catch {}
  });
  await page.goto(BASE + route, { waitUntil: "load" });
  loaded = true;
  await page.waitForTimeout(300);
  const kb = sizes.reduce((a, b) => a + b, 0) / 1024;
  const ok = kb <= BUDGET_KB;
  if (!ok) failed = true;
  console.log(`${ok ? "✓" : "✗"} ${route.padEnd(24)} ${kb.toFixed(1)} KB gz`);
}
await browser.close();
process.exit(failed ? 1 : 0);
