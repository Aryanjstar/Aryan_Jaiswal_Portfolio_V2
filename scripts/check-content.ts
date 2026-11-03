/**
 * Content guard (plan F18, CONTENT.md §14). Fails on:
 *  (a) any "Never publish" phrase in the rendered HTML of every route,
 *  (b) project-scoped claims (e.g. DevTinder + vector), checked on the item, not the page,
 *  (c) music data drift from CONTENT.md §10.1 (26 songs, unique codes, canonical URLs, Aryan's order).
 * Usage: npm run build && npm run test:content   (starts `next start` itself if nothing is listening)
 */
import { spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";

import { caseStudies } from "../content/caseStudies";
import { songs } from "../content/music";
import { archiveProjects, caseStudyProjects, moreProjects } from "../content/projects";

const BASE = process.env.BASE_URL ?? "http://localhost:3123";
const failures: string[] = [];
const fail = (msg: string) => failures.push(msg);

// (a) exact phrases, case-insensitive
const BANNED: (string | RegExp)[] = [
  /150k\+?\s*users/i,
  /\b8\s*[x×]\b.*(websocket|capacity)/i,
  /(websocket|capacity).*\b8\s*[x×]\b/i,
  "1,024 concurrent",
  /99\.9\s*%/,
  /\buptime\b/i,
  "200+ beta",
  "51 developers",
  "0.84",
  "pilot study",
  /\b9[02]\s*%/,
  "100+ users",
  "500+ requests",
  "60% less prep",
  /gfg[^.]{0,40}rank\s*[34]\b/i,
  /rank\s*[34]\b[^.]{0,40}(gfg|geeksforgeeks)/i,
  "500+ problems",
  /only gold startup scout/i,
  /final[- ]year student/i,
  /tech intern[^.]{0,40}present/i,
  /exactly-once booking|duplicate-free/i,
  /all tests passed 100/i,
  /100k (leads|people|customers)\b/i,
  "300K+",
  /sole owner of argus/i,
  /used cekura/i,
  /\bSBI\b[^.]{0,20}live/i,
  "Transforming Ideas into Innovative",
  "Ready to start my journey",
  "Modern & Minimalist Next.js Portfolio",
  /\+91[\s-]?\d/,
];

// (b) item-scoped checks
const allProjects = [...caseStudyProjects, ...moreProjects, ...archiveProjects];
const scoped: [string, RegExp][] = [
  ["devtinder", /vector|embedding|\bANN\b/i],
  ["aura", /uptime/i],
  ["cognitive-os", /pilot|0\.84|51 dev/i],
  ["plant-disease", /accuracy|precision|\d+\s*%/i],
  ["ai-career-navigator", /users|requests|uptime|prep time/i],
  ["ev-bidding-algo", /implementation of the paper|paper's implementation/i],
];
for (const [slug, re] of scoped) {
  const p = allProjects.find((x) => x.slug === slug);
  const c = caseStudies.find((x) => x.slug === slug);
  const text = JSON.stringify(p ?? "") + JSON.stringify(c ?? "");
  if (re.test(text)) fail(`scoped claim in ${slug}: ${re}`);
}

// (c) music data vs CONTENT.md §10.1
const md = fs.readFileSync("docs/redesign/CONTENT.md", "utf8");
const table = md.split("### 10.1")[1]?.split("### 10.2")[0] ?? "";
const expected = [...table.matchAll(/^\|\s*(\d+)\s*\|[^|]*\|\s*([A-Za-z0-9_-]{11})\s*\|/gm)].map((m) => m[2]);
if (songs.length < 26) fail(`music: expected at least the 26 songs from CONTENT.md, found ${songs.length}`);
if (new Set(songs.map((s) => s.code)).size !== songs.length) fail("music: duplicate reel codes");
songs.forEach((s) => {
  if (s.url !== `https://www.instagram.com/reel/${s.code}/`) fail(`music: non-canonical URL for ${s.title}`);
});
// New songs (added with `npm run add-cover`) may sit anywhere; the 26 from CONTENT.md must keep their relative order.
const codes = songs.map((s) => s.code);
const positions = expected.map((c) => codes.indexOf(c));
if (positions.includes(-1)) fail(`music: missing CONTENT.md songs: ${expected.filter((_, i) => positions[i] < 0).join(", ")}`);
else if (positions.some((p, i) => i > 0 && p < positions[i - 1])) fail("music: the CONTENT.md §10.1 songs are out of order");
if (expected.length !== 26) fail(`music: could not parse 26 codes from CONTENT.md (got ${expected.length})`);

async function up() {
  try {
    return (await fetch(BASE)).ok;
  } catch {
    return false;
  }
}

async function main() {
  let server: ChildProcess | null = null;
  if (!(await up())) {
    const port = new URL(BASE).port;
    server = spawn("npx", ["next", "start", "-p", port], { stdio: "ignore" });
    for (let i = 0; i < 60 && !(await up()); i++) await new Promise((r) => setTimeout(r, 500));
  }
  const routes = [
    "/",
    ...["sde", "ai", "backend", "frontend", "fullstack", "devops", "fde"].map((r) => `/?role=${r}`),
    "/projects",
    "/resume",
    "/notesbyaryan",
    "/colophon",
    ...caseStudies.map((c) => `/work/${c.slug}`),
  ];
  for (const r of routes) {
    const res = await fetch(BASE + r);
    if (!res.ok) {
      fail(`${r}: HTTP ${res.status}`);
      continue;
    }
    const text = (await res.text())
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ");
    for (const b of BANNED) {
      const hit = typeof b === "string" ? text.toLowerCase().includes(b.toLowerCase()) : b.test(text);
      if (hit) fail(`${r}: banned phrase ${b}`);
    }
  }
  server?.kill();

  if (failures.length) {
    console.error(`✗ content check failed (${failures.length}):\n  ` + failures.join("\n  "));
    process.exit(1);
  }
  console.log(`✓ content check passed: ${routes.length} routes, ${BANNED.length} banned patterns, ${scoped.length} scoped checks, ${songs.length} songs, CONTENT.md order kept`);
}

main();
