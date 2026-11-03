// Finds the elements that make a route scroll horizontally. node tests/tools/overflow.mjs <route> [width]
import { chromium } from "@playwright/test";
const [route = "/", w = "320"] = process.argv.slice(2);
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: +w, height: 700 } })).newPage();
await p.goto("http://localhost:3100" + route);
console.log(await p.evaluate(() => [...document.querySelectorAll("body, body *")]
  .filter((e) => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflowX === "visible")
  .slice(0, 8).map((e) => `${e.tagName}.${String(e.className).slice(0, 70)} sw=${e.scrollWidth} cw=${e.clientWidth}`)));
await b.close();
