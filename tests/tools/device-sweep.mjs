// Device sweep: every route × phone/tablet/desktop widths × light/dark, on WebKit and Chromium.
// Flags horizontal overflow (with the widest offenders), console/page errors, broken images and
// touch targets under 24×24 px on phone widths (WCAG 2.5.8). Usage: node tests/tools/device-sweep.mjs
import { chromium, webkit } from "@playwright/test";
import { ROUTES } from "../routes.ts";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const WIDTHS = (process.env.WIDTHS ?? "320,375,390,402,430,768,1024,1440,1920").split(",").map(Number);
const ENGINES = Object.fromEntries(Object.entries({ webkit, chromium }).filter(([n]) => !process.env.ENGINE || process.env.ENGINE === n));
let failures = 0;

for (const [name, engine] of Object.entries(ENGINES)) {
  const b = await engine.launch();
  for (const width of WIDTHS) {
    const phone = width < 768;
    for (const scheme of ["light", "dark"]) {
      const ctx = await b.newContext({
        colorScheme: scheme,
        viewport: { width, height: phone ? 874 : 900 },
        deviceScaleFactor: phone ? 3 : 1,
        isMobile: phone,
        hasTouch: phone,
      });
      for (const r of ROUTES) {
        const p = await ctx.newPage();
        const issues = [];
        p.on("console", (m) => m.type() === "error" && !/404|Failed to load resource/.test(m.text()) && issues.push("console: " + m.text().slice(0, 120)));
        p.on("pageerror", (e) => issues.push("pageerror: " + e.message.slice(0, 120)));
        await p.goto(BASE + r, { waitUntil: "load" });
        await p.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((res) => setTimeout(res, 25)); }
          scrollTo(0, 0);
        });
        await p.waitForTimeout(250);
        const dom = await p.evaluate((isPhone) => {
          const out = [];
          const vw = document.documentElement.clientWidth;
          if (document.documentElement.scrollWidth > vw + 1) {
            const wide = [...document.querySelectorAll("body *")]
              .filter((e) => { const b = e.getBoundingClientRect(); return b.width && b.right > vw + 1 && getComputedStyle(e).position !== "fixed"; })
              .filter((e) => !e.closest("[class*=overflow-x-auto],[class*=overflow-hidden],[class*=overflow-x-clip],pre,.sr-only"))
              .slice(0, 4)
              .map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(" ").slice(0, 3).join(".")} r=${Math.round(e.getBoundingClientRect().right)}`);
            out.push(`overflow ${document.documentElement.scrollWidth}>${vw}: ${wide.join(" | ")}`);
          }
          document.querySelectorAll("img").forEach((i) => { if (i.loading !== "lazy" && (!i.complete || i.naturalWidth === 0)) out.push("broken img " + i.src.slice(-40)); });
          if (isPhone) {
            const small = [...document.querySelectorAll("a[href], button, [role=button], input, summary")].filter((e) => {
              const b = e.getBoundingClientRect();
              if (!b.width || !b.height || e.closest(".sr-only,[aria-hidden=true]")) return false;
              // Links inside running text are exempt from 2.5.8.
              if (e.tagName === "A" && getComputedStyle(e).display === "inline" && e.parentElement && /^(P|LI|SPAN|DD|FIGCAPTION)$/.test(e.parentElement.tagName)) return false;
              return b.width < 24 || b.height < 24;
            });
            if (small.length) out.push(`small targets ${small.length}: ` + small.slice(0, 4).map((e) => `${e.tagName.toLowerCase()} "${(e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 24)}" ${Math.round(e.getBoundingClientRect().width)}×${Math.round(e.getBoundingClientRect().height)}`).join(" | "));
          }
          return out;
        }, phone);
        const all = [...new Set([...issues, ...dom])];
        if (process.env.VERBOSE) console.log(`  ${name} ${width} ${scheme} ${r} ${all.length ? "✗" : "✓"}`);
        if (all.length) {
          failures++;
          console.log(`✗ ${name} ${width} ${scheme} ${r}\n    ${all.join("\n    ")}`);
        }
        await p.close();
      }
      await ctx.close();
    }
  }
  await b.close();
}
console.log(failures ? `${failures} route/viewport combinations with findings` : "✓ device sweep clean");
