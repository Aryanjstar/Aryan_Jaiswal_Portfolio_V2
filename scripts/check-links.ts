/**
 * Link checker. Crawls the running site's routes, collects every href, and checks:
 * internal links resolve (2xx/3xx) and external links answer (HEAD, falling back to GET).
 * Some hosts block bots (LinkedIn 999, Instagram/X 4xx); those are reported as warnings, not failures.
 * Usage: npm run build && npm run check:links  (starts `next start` itself if needed)
 */
import { spawn, type ChildProcess } from "node:child_process";

import { caseStudies } from "../content/caseStudies";

const BASE = process.env.BASE_URL ?? "http://localhost:3124";
const BOT_HOSTILE = /linkedin\.com|instagram\.com|x\.com|credly\.com|leetcode\.com|geeksforgeeks\.org|ieeexplore\.ieee\.org|drive\.google\.com/;

async function up() {
  try {
    return (await fetch(BASE)).ok;
  } catch {
    return false;
  }
}

async function check(url: string): Promise<number> {
  const opts = { redirect: "follow" as const, signal: AbortSignal.timeout(20_000), headers: { "user-agent": "Mozilla/5.0 link-check (aryanjaiswal.in)" } };
  try {
    const r = await fetch(url, { ...opts, method: "HEAD" });
    if (r.status < 400) return r.status;
    return (await fetch(url, { ...opts, method: "GET" })).status;
  } catch {
    return 0;
  }
}

async function main() {
  let server: ChildProcess | null = null;
  if (!(await up())) {
    server = spawn("npx", ["next", "start", "-p", new URL(BASE).port], { stdio: "ignore" });
    for (let i = 0; i < 60 && !(await up()); i++) await new Promise((r) => setTimeout(r, 500));
  }
  const routes = ["/", "/projects", "/resume", "/notesbyaryan", "/colophon", ...caseStudies.map((c) => `/work/${c.slug}`)];
  const links = new Map<string, string>();
  for (const r of routes) {
    const html = await (await fetch(BASE + r)).text();
    for (const m of html.matchAll(/href="([^"#]+)/g)) {
      const href = m[1].replace(/&amp;/g, "&");
      if (href.startsWith("mailto:") || href.startsWith("/_next/")) continue;
      // Canonical/OG links point at the production domain; check them against this build instead.
      const abs = href.startsWith("/") ? BASE + href : href.replace(/^https:\/\/aryanjaiswal\.in/, BASE);
      if (abs.startsWith("http") && !links.has(abs)) links.set(abs, r);
    }
  }

  const bad: string[] = [];
  const warn: string[] = [];
  const entries = [...links.entries()];
  for (let i = 0; i < entries.length; i += 8) {
    await Promise.all(
      entries.slice(i, i + 8).map(async ([url, from]) => {
        const s = await check(url);
        if (s >= 200 && s < 400) return;
        (BOT_HOSTILE.test(url) ? warn : bad).push(`${s || "ERR"} ${url} (on ${from})`);
      }),
    );
  }
  server?.kill();
  if (warn.length) console.warn(`! ${warn.length} bot-hostile links not verifiable automatically:\n  ` + warn.join("\n  "));
  if (bad.length) {
    console.error(`✗ ${bad.length} broken links:\n  ` + bad.join("\n  "));
    process.exit(1);
  }
  console.log(`✓ ${links.size} links checked across ${routes.length} routes`);
}

main();
