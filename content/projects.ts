import type { Project } from "./schema";

// Sources: CONTENT.md §5–7 and Aryan_Resume_Context/profile/PROJECTS.md (2 Nov 2026).
// `started` = GitHub repository creation year (API, 3 Nov 2026). Live links for Myriox and LEELA come from the
// repos' own homepage fields and answered 200 on 3 Nov 2026 (D-23). DevTinder/Cognitive-OS live hosts timed out, so no Live link.

const gh = (repo: string) => ({ label: "GitHub", href: `https://github.com/Aryanjstar/${repo}` });
const yt = (id: string) => ({ label: "Demo", href: `https://www.youtube.com/watch?v=${id}` });

/** Homepage "More projects" list (Aryan, 3 Nov 2026: Raya Pay and Null dropped; Cognitive-OS and DevTinder above LEELA; Digit Motor lower). */
export const moreProjects: Project[] = [
  {
    slug: "ai-career-navigator",
    name: "AI Career Navigator",
    line: "Azure OpenAI career assistant: resume feedback, gap analysis, generated mock interviews.",
    badge: "Microsoft JS AI Build-a-thon — Overall Winner + People's Choice",
    links: [
      gh("AI-Career-Navigator"),
      yt("t_e-CtLxn_Q"),
      { label: "Microsoft blog", href: "https://techcommunity.microsoft.com/blog/educatordeveloperblog/ai-career-navigator-%E2%80%94-empowering-job-seekers-with-azure-openai/4459774" },
    ],
    roles: ["ai", "fullstack"],
    stack: ["Azure OpenAI"],
    started: 2025,
    // Hover preview: a frame of the demo video (the Azure app is stopped).
    shot: "ai-career-navigator",
  },
  {
    slug: "myriox",
    name: "Myriox",
    line: "LLM-directed personas with five mobility types walk a floor plan to find accessibility issues, grounded in ADA clauses via vector search.",
    badge: "Top 50 of 2,989 · OpenAI × NamasteDev hackathon",
    links: [
      { label: "Live", href: "https://myriox-web.thankfulsmoke-88e827d4.eastus2.azurecontainerapps.io" },
      gh("Myriox_v2"),
      yt("IfA1XU-qBrU"),
    ],
    roles: ["ai", "backend", "fullstack"],
    stack: ["FastAPI", "Next.js", "WebSockets", "Azure Container Apps", "MCP"],
    started: 2026,
    shot: "myriox",
  },
  {
    slug: "cognitive-os",
    name: "Cognitive-OS",
    line: "GitHub-synced developer focus tracker: 0–100 cognitive-load heuristic with z-score anomaly detection, Redis cache, three Azure OpenAI agents, Docker → Azure Container Apps via GitHub Actions.",
    links: [gh("Cognitive-OS")],
    roles: ["fullstack", "ai", "devops"],
    stack: ["Next.js", "Redis", "Azure OpenAI", "Docker", "GitHub Actions"],
    started: 2026,
  },
  {
    slug: "devtinder",
    name: "DevTinder",
    line: "MERN developer-networking app: connection requests, real-time chat, Google OAuth, Razorpay webhooks, Docker.",
    links: [gh("DevTinder"), yt("t0ggxZnVgTQ")],
    roles: ["fullstack", "frontend"],
    stack: ["MongoDB", "Express", "React", "Node.js", "Socket.IO", "Docker"],
    started: 2025,
    shot: "devtinder",
  },
  {
    slug: "leela",
    name: "LEELA",
    line: "Turns topics, notes or code into narrated short films with timed speech and FFmpeg.",
    links: [{ label: "Live", href: "https://leela-kappa.vercel.app" }, gh("LEELA")],
    roles: ["ai", "fullstack"],
    stack: ["TypeScript", "FFmpeg"],
    started: 2026,
    shot: "leela",
  },
  {
    slug: "digit-motor-fnol",
    name: "Digit Motor FNOL Voice Agent",
    line: "TypeScript/Fastify insurance-claim voice flow with confirmation gates, bearer auth, an idempotency store, 6 tool schemas and 27 tests.",
    links: [gh("digit-motor-fnol-voice-agent")],
    roles: ["ai", "backend", "fde"],
    stack: ["TypeScript", "Fastify"],
    started: 2026,
  },
];

/** Projects that have a case study; also appear in the archive. */
export const caseStudyProjects: Project[] = [
  {
    slug: "aura",
    name: "AURA",
    line: "Five-agent finance advisor with an MCP tool layer and streamed answers.",
    badge: "Google Cloud Agentic AI Day — Finalist",
    links: [
      { label: "Live", href: "https://aura-finance-ai-in.azurewebsites.net" },
      gh("AURA---THE-FINANCE-AI"),
      yt("3q4uTliRNr8"),
    ],
    roles: ["ai", "fullstack"],
    stack: ["Node.js", "Express", "Azure OpenAI", "MCP", "Socket.IO"],
    started: 2025,
    shot: "aura",
  },
  {
    slug: "the-wedding-home",
    name: "The Wedding Home",
    line: "Planning platform for Indian weddings: family workspaces, guest lists, no-login RSVPs, QR galleries.",
    links: [{ label: "Live", href: "https://the-wedding-home.vercel.app" }, gh("the-wedding-home")],
    roles: ["fullstack", "frontend", "backend", "devops"],
    stack: ["Next.js", "TypeScript", "MongoDB", "Vitest", "Playwright"],
    started: 2026,
    shot: "the-wedding-home",
  },
];

/** /projects archive only. Pruned 3 Nov 2026 with Aryan's go-ahead to the ones worth showing; one neutral line each, no metrics. */
export const archiveProjects: Project[] = [
  { slug: "hireforge", name: "HireForge", line: "Job-search workflow built on Claude Code, with a dashboard and PDF generation.", links: [gh("hireforge")], roles: ["ai"], stack: ["JavaScript", "Go"], started: 2026 },
  { slug: "fi-mcp-server", name: "fi-mcp-server", line: "Mock financial-data MCP server that feeds AURA's finance tools.", links: [gh("fi-mcp-server")], roles: ["ai", "backend"], stack: ["JavaScript", "MCP"], started: 2025 },
  { slug: "freelanceguard", name: "FreelanceGuard", line: "Contract analysis, scope monitoring and collections assistant for freelancers.", badge: "Bangalore AI Hack Day", links: [gh("FreelanceGuard")], roles: ["ai", "fullstack"], stack: ["TypeScript"], started: 2025 },
  { slug: "msa-website", name: "MSA IIIT Dharwad website", line: "Website for the Microsoft Student Ambassadors chapter at IIIT Dharwad.", links: [{ label: "Live", href: "https://msa-iiitdwd.vercel.app" }], roles: ["frontend"], stack: [], started: 2025 },
  { slug: "plant-disease", name: "Plant Disease Classification", line: "CNN plant-leaf disease classifier served with Flask (Infosys Springboard internship).", links: [gh("Plant_Disease_Classification")], roles: ["ai"], stack: ["Python", "Flask"], started: 2024 },
];
