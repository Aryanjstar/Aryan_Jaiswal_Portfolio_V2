import { ROLE_KEYS, type RoleKey } from "./schema";
import { resumePdf } from "./profile";

// Source: CONTENT.md §2. Tailoring is URL-driven (?role=) so Aryan can send a link per application.
// Per D-22 the full track list is never shown as a menu on the page.

type RoleDef = {
  label: string;
  word: string;
  article: "a" | "an";
  pdf: "general" | "sde" | "aiFde";
  sub: string;
};

export const roles: Record<RoleKey, RoleDef> = {
  all: {
    label: "All",
    word: "software engineer",
    article: "a",
    pdf: "general",
    sub: "Forward Deployed Engineer at Exotel and a CS grad from IIIT Dharwad ('26). I've shipped LLM voice agents to production, built the eval platform behind them, wired the integrations, automated the pipelines, and built full-stack products on the side.",
  },
  sde: {
    label: "SDE / MTS",
    word: "software engineer",
    article: "a",
    pdf: "sde",
    sub: "CS grad (IIIT Dharwad '26) shipping production code since 2025: platform features, integrations and tooling at Exotel, plus 867 LeetCode problems and a COMSNETS 2026 paper.",
  },
  ai: {
    label: "AI",
    word: "AI engineer",
    article: "an",
    pdf: "aiFde",
    sub: "14+ LLM voice agents in production across 5 languages, an eval and prompt-optimization harness with chat → voice → real-call simulation, and multi-agent apps like AURA.",
  },
  backend: {
    label: "Backend",
    word: "backend engineer",
    article: "a",
    pdf: "sde",
    sub: "Signed integration routes, retries and guards, batching that took bulk loads from 25 to 2 minutes, and FastAPI/Redis services behind a voice-AI platform.",
  },
  frontend: {
    label: "Frontend",
    word: "frontend engineer",
    article: "a",
    pdf: "sde",
    sub: "React and TypeScript, from a shipped test-framework UI at Exotel to a 61-route Next.js wedding platform. And this site, built from scratch to a performance budget.",
  },
  fullstack: {
    label: "Full-stack",
    word: "full-stack developer",
    article: "a",
    pdf: "sde",
    sub: "End to end: FastAPI and Node backends, React/Next.js frontends, MongoDB and Postgres, CI with Playwright, deployed on Vercel and Azure.",
  },
  devops: {
    label: "DevOps & Cloud",
    word: "DevOps & cloud engineer",
    article: "a",
    pdf: "sde",
    sub: "WebSocket workers scaled behind NGINX, Prometheus/Grafana monitoring, Ansible provisioning, Jenkins + AWS automation, and Docker → Azure Container Apps through GitHub Actions.",
  },
  fde: {
    label: "FDE",
    word: "forward deployed engineer",
    article: "a",
    pdf: "aiFde",
    sub: "Requirements, demos, prompts, integrations and go-lives across 10+ client accounts. I sit with the customer, find the real problem and ship the fix the same day.",
  },
};

export function parseRole(value: unknown): RoleKey {
  const v = Array.isArray(value) ? value[0] : value;
  return typeof v === "string" && (ROLE_KEYS as readonly string[]).includes(v) ? (v as RoleKey) : "all";
}

export function pdfFor(role: RoleKey): { href: string; variant: string } {
  const which = roles[role].pdf;
  if (which === "sde" && resumePdf.sde.available) return { href: resumePdf.sde.href, variant: "SDE" };
  if (which === "aiFde" && resumePdf.aiFde.available) return { href: resumePdf.aiFde.href, variant: "AI/FDE" };
  return { href: resumePdf.general, variant: "general" };
}

/** Stable sort: items tagged with the role first, original order otherwise. */
export function orderByRole<T extends { roles: readonly string[] }>(items: readonly T[], role: RoleKey): T[] {
  if (role === "all") return [...items];
  return [...items].sort((a, b) => Number(b.roles.includes(role)) - Number(a.roles.includes(role)));
}

export function matches(roles: readonly string[], role: RoleKey) {
  return role !== "all" && roles.includes(role);
}
