import type { Bullet, Roles } from "./schema";

// Source: CONTENT.md §4, matching resume_master.tex (2 Nov 2026) and CLAIMS.md.

export type Role = { title: string; dates: string; bullets: Bullet[] };

export const exotel = {
  company: "Exotel",
  descriptor: "Voice AI / conversational AI platform",
  location: "Bangalore",
  connector: "Converted to full-time",
  roles: [
    {
      title: "Forward Deployed Engineer",
      dates: "Jun 2026 – Present",
      bullets: [
        { text: "Shipped 14+ LLM voice agents to production in 5 languages and took 16 bots for 15+ clients through formal evaluation, owning requirements, prompts, tool/KB design, integrations and go-live.", strong: "14+ LLM voice agents to production", roles: ["ai", "fde"] },
        { text: "Ran client calls, demos and requirement sessions with CSM and sales across 10+ accounts, turning call feedback into same-day fixes.", roles: ["fde"] },
        { text: "Built AutoLoop inside Argus: a 7-stage workflow in an agentic harness with symlinked bot repos and 16 skills. It generates scenarios, compares prompt techniques in chat simulations, selects winners and rolls back regressions.", strong: "AutoLoop", roles: ["ai", "backend"], caseStudy: "argus-autoloop" },
        { text: "Built Argus's in-house voice simulator for tests between chat simulations and real calls; made Argus/AutoLoop usable from AI coding tools (Cursor, Claude Code). Harness used on 10+ builds; bot delivery went from ~1 week to 1–2 days (estimate).", strong: "in-house voice simulator", roles: ["ai", "fde"], caseStudy: "argus-autoloop" },
        { text: "Migrated Bawa's booking agent for 6 hotels to the CIN booking provider with HMAC-signed Apache Camel routes; passed 313/313 route and 114/114 booking checks on staging, then confirmed bookings after the production cutover.", strong: "313/313 route and 114/114 booking checks", roles: ["backend", "fde", "sde"], caseStudy: "enterprise-integrations" },
        { text: "Automated Kinetic Green's campaign cycles (150K lead entries) with Python, Jenkins and AWS S3/SES: post-call lead reports and deterministic PDF summaries emailed after each campaign, with backups and validated lead reloads.", strong: "150K lead entries", roles: ["backend", "devops", "sde"], caseStudy: "enterprise-integrations" },
      ],
    },
    {
      title: "Tech Intern, GenAI",
      dates: "Oct 2025 – Jun 2026",
      bullets: [
        { text: "Built Argus, a voicebot debugging/evaluation platform with Google Chat access, Gemini tool calling, VAD latency analysis, an HMAC-signed recording proxy and Splunk On-Call alerts; cut triage from ~30 min to under a minute.", strong: "Argus", roles: ["ai", "backend"], caseStudy: "argus-autoloop" },
        { text: "Hardened the LangGraph LLM path as DRI for 150K+ calls/month (incl. BlueDart): 7 s wall-clock timeout/fallback, parallel-tool-call guards, TTS markdown filter and a reasoning-leak guard tested on 269 production replies.", strong: "150K+ calls/month", roles: ["ai", "backend"], caseStudy: "production-infra" },
        { text: "Scaled Pipecat WebSocket handling from 1 to 8 workers behind NGINX least_conn; added Prometheus/Grafana monitoring with EC2 discovery and 5 Ansible roles for provisioning.", strong: "1 to 8 workers", roles: ["devops", "backend", "sde"], caseStudy: "production-infra" },
        { text: "Added per-company custom test cases and scenarios to the bot test framework: FastAPI endpoints, Redis storage, a React/TypeScript UI and a scenario-mix algorithm.", roles: ["fullstack", "frontend", "backend"] },
      ],
    },
  ] satisfies Role[],
};

export type Earlier = { company: string; title: string; dates: string; text: string; roles: Roles; note?: string };

export const earlier: Earlier[] = [
  // Aryan, 3 Nov 2026: a 10–15 day engagement in October 2025.
  { company: "Joveo", title: "AI/ML Intern, Supply Automation", dates: "Oct 2025 · 2 weeks", text: "Built an email-processing and enterprise-search pipeline with n8n, Gemini embeddings and PostgreSQL/pgvector, with entity extraction, LLM summaries and WhatsApp/Telegram alerts.", roles: ["ai", "backend"] },
  { company: "InfoKalash", title: "UI/UX Developer Intern", dates: "Jan 2025", text: "Redesigned navigation and Figma workflows through research with 15+ users, producing reusable components, interactive prototypes and developer handoffs.", roles: ["frontend"] },
  { company: "Infosys Springboard", title: "AI/ML Intern", dates: "Mar – Jun 2024", text: "Built a CNN plant-disease classifier with Python and Flask, including image preprocessing and model-serving workflows. Presented at the inaugural Infosys Springboard Summit.", roles: ["ai"] },
];
