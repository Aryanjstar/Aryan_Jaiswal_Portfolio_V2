// QA helper: every sentence/fragment containing a digit, per route, deduplicated across the site.
// node tests/tools/numbers.mjs > out.txt
const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const routes = ["/", "/projects", "/resume", "/notesbyaryan", "/colophon", "/now", "/work/argus-autoloop", "/work/enterprise-integrations", "/work/production-infra", "/work/aura", "/work/the-wedding-home"];
const seen = new Map();
for (const r of routes) {
  const html = await (await fetch(BASE + r)).text();
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<\/(p|li|h1|h2|h3|h4|dd|dt|td|th|span|a|div|figcaption|button)>/g, "\n")
    .replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<");
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (!/\d/.test(line) || line.length < 2) continue;
    if (!seen.has(line)) seen.set(line, new Set());
    seen.get(line).add(r);
  }
}
for (const [line, rs] of [...seen.entries()].sort()) console.log(`${line}   ⟵ ${[...rs].join(" ")}`);
console.error(`${seen.size} unique numeric fragments`);
