// QA sweep: console errors, failed requests, broken images, missing alt, duplicate ids, empty links, titles/descriptions.
import { chromium } from "@playwright/test";
const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const routes = ["/", "/?role=backend", "/projects", "/resume", "/notesbyaryan", "/colophon", "/now", "/work/argus-autoloop", "/work/enterprise-integrations", "/work/production-infra", "/work/aura", "/work/the-wedding-home", "/does-not-exist"];
const b = await chromium.launch();
const titles = new Map();
for (const scheme of ["light", "dark"]) {
  for (const r of routes) {
    const ctx = await b.newContext({ colorScheme: scheme, viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    const issues = [];
    p.on("console", (m) => m.type() === "error" && !/404/.test(m.text()) && issues.push("console: " + m.text().slice(0, 140)));
    p.on("pageerror", (e) => issues.push("pageerror: " + e.message.slice(0, 140)));
    p.on("requestfailed", (q) => !q.url().includes("_rsc=") && issues.push("failed: " + q.url().slice(0, 100)));
    p.on("response", (s) => s.status() >= 400 && !s.url().includes("does-not-exist") && issues.push(`${s.status()}: ${s.url().slice(0, 100)}`));
    await p.goto(BASE + r, { waitUntil: "load" });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
    await p.waitForTimeout(500);
    const dom = await p.evaluate(() => {
      const out = [];
      document.querySelectorAll("img").forEach((i) => { if (!i.complete || i.naturalWidth === 0) out.push("broken img " + i.src.slice(-50)); if (!i.hasAttribute("alt")) out.push("img without alt " + i.src.slice(-50)); });
      const ids = [...document.querySelectorAll("[id]")].map((e) => e.id); const d = ids.filter((x, k) => ids.indexOf(x) !== k); if (d.length) out.push("duplicate ids " + [...new Set(d)].join(","));
      document.querySelectorAll("a").forEach((a) => { if (!a.getAttribute("href")) out.push("link without href: " + a.textContent.slice(0, 30)); if (!(a.textContent.trim() || a.getAttribute("aria-label"))) out.push("empty link " + a.getAttribute("href")); });
      document.querySelectorAll("button").forEach((x) => { if (!(x.textContent.trim() || x.getAttribute("aria-label"))) out.push("empty button"); });
      const h1 = document.querySelectorAll("h1").length; if (h1 !== 1) out.push(`h1 count ${h1}`);
      return { out, title: document.title, desc: document.querySelector('meta[name=description]')?.content ?? "", canon: document.querySelector('link[rel=canonical]')?.href ?? "", og: document.querySelector('meta[property="og:image"]')?.content ?? "" };
    });
    if (scheme === "light") titles.set(r, dom);
    const all = [...issues, ...dom.out];
    console.log(`${all.length ? "✗" : "✓"} [${scheme}] ${r}${all.length ? "\n    " + [...new Set(all)].join("\n    ") : ""}`);
    await ctx.close();
  }
}
console.log("\n— metadata —");
for (const [r, d] of titles) console.log(`${r}\n   title: ${d.title}\n   desc: ${d.desc.slice(0, 90)}\n   canonical: ${d.canon}  og: ${d.og ? "yes" : "NO"}`);
await b.close();
