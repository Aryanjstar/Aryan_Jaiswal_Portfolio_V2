/**
 * F15. Add a cover to content/music.json.
 *   npm run add-cover -- --url <instagram-url> --title "<song>" [--line "…"] [--description "…"] [--vibe "…"]
 *                        [--artist "…"] [--lang hi|en] [--place "…"] [--position <n>] [--dry-run]
 * --line = the Hindi/poetic line shown above the title; --description and --vibe are the card's two caption lines.
 * Emoji are kept exactly as given (Aryan, 3 Nov 2026).
 * - strips tracking query strings and normalizes /p/ → /reel/<code>/
 * - decodes postedAt (IST) from the reel code: Instagram IDs embed ms since 2011-08-24
 * - rejects duplicates, inserts at --position (1-based, default: end), Zod-validates
 * Local only; never runs at build or request time. (The optional --ai helper from scripts/music-ai.ts is not wired yet.)
 */
import fs from "node:fs";
import { parseArgs } from "node:util";

import { MusicSchema, type Song } from "../content/schema";

const FILE = "content/music.json";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const IG_EPOCH_MS = 1314220021721;

export function codeFromUrl(raw: string) {
  const u = new URL(raw);
  const m = u.pathname.match(/\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/);
  if (!m) throw new Error(`Not an Instagram post/reel URL: ${raw}`);
  return m[1];
}

export function postedAtFromCode(code: string) {
  let id = 0n;
  for (const ch of code.slice(0, 11)) {
    const v = ALPHABET.indexOf(ch);
    if (v < 0) throw new Error(`Bad character in code: ${ch}`);
    id = id * 64n + BigInt(v);
  }
  const ms = Number(id >> 23n) + IG_EPOCH_MS;
  return new Date(ms + 5.5 * 3600_000).toISOString().slice(0, 10);
}

function main() {
  const { values } = parseArgs({
    options: {
      url: { type: "string" },
      title: { type: "string" },
      artist: { type: "string" },
      lang: { type: "string", default: "hi" },
      place: { type: "string" },
      line: { type: "string" },
      description: { type: "string" },
      vibe: { type: "string" },
      position: { type: "string" },
      "dry-run": { type: "boolean", default: false },
    },
  });
  if (!values.url || !values.title) {
    console.error('Usage: npm run add-cover -- --url <instagram-url> --title "<song>" [--line …] [--description …] [--vibe …] [--artist …] [--lang hi|en] [--place …] [--position n]');
    process.exit(1);
  }

  const songs: Song[] = MusicSchema.parse(JSON.parse(fs.readFileSync(FILE, "utf8")));
  const code = codeFromUrl(values.url);
  if (songs.some((s) => s.code === code)) {
    console.error(`✗ Already listed: ${code} (${songs.find((s) => s.code === code)!.title})`);
    process.exit(1);
  }

  const entry: Song = {
    code,
    url: `https://www.instagram.com/reel/${code}/`,
    title: values.title.trim(),
    ...(values.line?.trim() ? { line: values.line.trim() } : {}),
    ...(values.description?.trim() ? { description: values.description.trim() } : {}),
    ...(values.vibe?.trim() ? { vibe: values.vibe.trim() } : {}),
    ...(values.artist ? { artist: values.artist.trim() } : {}),
    lang: values.lang === "en" ? "en" : "hi",
    ...(values.place ? { place: values.place.trim() } : {}),
    postedAt: postedAtFromCode(code),
    pinned: true,
  };

  const pos = values.position ? Math.max(1, Math.min(songs.length + 1, Number(values.position))) - 1 : songs.length;
  const next = [...songs.slice(0, pos), entry, ...songs.slice(pos)];
  MusicSchema.parse(next);

  console.log(`+ #${pos + 1} ${entry.title} · ${entry.postedAt} · ${entry.url}`);
  if (values["dry-run"]) return;
  fs.writeFileSync(FILE, JSON.stringify(next, null, 2) + "\n");
  console.log(`✓ ${FILE} now has ${next.length} songs (#${pos + 1} is new).`);
}

if (process.argv[1]?.endsWith("add-cover.ts")) main();
