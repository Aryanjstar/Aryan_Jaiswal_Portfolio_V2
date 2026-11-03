import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const b = await chromium.launch(); const ctx = await b.newContext({ reducedMotion: "reduce" }); const p = await ctx.newPage();
const route = process.argv[2] ?? "/";
await p.goto("http://localhost:3100" + route, { waitUntil: "load" });
const r = await new AxeBuilder({ page: p }).withTags(["wcag2aa"]).analyze();
for (const v of r.violations) for (const n of v.nodes.slice(0, 6)) console.log(v.id, n.target.join(" ").slice(0, 90), "|", n.any[0]?.message?.slice(0, 140));
await b.close();
