import type { Highlight } from "./schema";
import type { RoleKey } from "./schema";

// Source: CONTENT.md §3. Scope notes are required and shown on hover/focus/tap.
export const highlights: Highlight[] = [
  { id: "agents", big: "14+", label: "LLM voice agents in production", scope: "Exotel; 5 languages; 16 bots for 15+ clients through formal eval", roles: ["ai", "fde", "all"] },
  { id: "routes", big: "313/313", label: "integration route checks passed", scope: "Hotel-booking provider migration, staging harness; plus 114/114 booking checks", roles: ["backend", "sde", "fde"] },
  { id: "bulk", big: "25→2 min", label: "bulk lead loads", scope: "~10K-row lists; ~10,000 requests → ~150 via batching and pacing", roles: ["backend", "devops", "sde"] },
  { id: "workers", big: "1→8", label: "WebSocket workers behind NGINX", scope: "Pipecat media pipeline, least_conn, with Prometheus/Grafana monitoring and 5 Ansible roles (worker count, not a capacity multiple)", roles: ["devops", "backend"] },
  { id: "twh", big: "61", label: "API routes, CI with Playwright", scope: "The Wedding Home (Oct 2026 snapshot): 11 Vitest suites + typecheck + an e2e journey on every push", roles: ["fullstack", "frontend"] },
  { id: "delivery", big: "~1 wk→1–2 d", label: "per voice-bot build", scope: "Estimate across 10+ builds using the AutoLoop harness", roles: ["ai", "fde"] },
  { id: "lc", big: "867", label: "LeetCode problems (165 hard)", scope: "Oct 2026 snapshot; also GFG institute rank 2 at IIIT Dharwad", roles: ["sde", "all"] },
  { id: "leads", big: "150K", label: "lead entries automated", scope: "Kinetic Green campaign cycles with Python, Jenkins, AWS S3/SES (cumulative entries, not unique people)", roles: ["devops", "backend"] },
];

const DEFAULT_ORDER = ["agents", "routes", "bulk", "workers", "twh", "lc"];

/** Six highlights. `all` uses the CONTENT.md default; a role pulls its tagged items to the front. */
export function highlightsFor(role: RoleKey): Highlight[] {
  const byId = new Map(highlights.map((h) => [h.id, h]));
  const base = DEFAULT_ORDER.map((id) => byId.get(id)!);
  if (role === "all") return base;
  const tagged = highlights.filter((h) => h.roles.includes(role));
  const rest = [...base, ...highlights].filter((h, i, arr) => !tagged.includes(h) && arr.indexOf(h) === i);
  return [...tagged, ...rest].slice(0, 6);
}
