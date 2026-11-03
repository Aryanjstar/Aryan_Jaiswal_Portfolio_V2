// Sums gzipped JS transferred on first load of a route. node tests/tools/js-weight.mjs [route]
import { chromium } from "@playwright/test";
import zlib from "node:zlib";
const route = process.argv[2] ?? "/";
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
const files = [];
let loaded = false;
p.on("response", async (r) => {
  if (r.request().resourceType() !== "script" || loaded) return;
  try { const body = await r.body(); files.push([r.url().split("/").pop(), zlib.gzipSync(body).length]); } catch {}
});
await p.goto("http://localhost:3100" + route, { waitUntil: "load" });
loaded = true;
await p.waitForTimeout(300);
const total = files.reduce((a, [, n]) => a + n, 0);
files.sort((a, b) => b[1] - a[1]).slice(0, 6).forEach(([f, n]) => console.log("   ", (n / 1024).toFixed(1), f));
console.log(`${route}: ${files.length} scripts, ${(total / 1024).toFixed(1)} KB gzipped`);
await b.close();
