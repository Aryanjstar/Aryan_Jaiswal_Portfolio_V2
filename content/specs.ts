// Source: CONTENT.md §8 plus the resume skills section (Linux and Postman confirmed by Aryan, 3 Nov 2026; Cursor, Claude Code and Codex added at his request the same day).
// Every item names where it was used; ids in `usedIn` are the `data-uses` anchors on the page.

export type SpecItem = { name: string; usedIn: string[] };
export type SpecGroup = { group: string; items: SpecItem[] };

export const USED_IN_LABELS: Record<string, string> = {
  exotel: "Exotel",
  argus: "Argus / AutoLoop",
  integrations: "Integrations",
  infra: "Production infra",
  aura: "AURA",
  twh: "The Wedding Home",
  myriox: "Myriox",
  "career-navigator": "AI Career Navigator",
  devtinder: "DevTinder",
  "cognitive-os": "Cognitive-OS",
  fnol: "Digit Motor FNOL",
  joveo: "Joveo",
  infokalash: "InfoKalash",
  dsa: "Problem solving",
  site: "This site",
};

export const specs: SpecGroup[] = [
  {
    group: "Languages",
    items: [
      { name: "Python", usedIn: ["argus", "integrations", "myriox"] },
      { name: "TypeScript", usedIn: ["twh", "fnol", "exotel", "site"] },
      { name: "JavaScript", usedIn: ["aura", "devtinder", "career-navigator"] },
      { name: "Java", usedIn: ["integrations"] },
      { name: "C++", usedIn: ["dsa"] },
      { name: "SQL", usedIn: ["joveo"] },
    ],
  },
  {
    group: "Backend & integration",
    items: [
      { name: "FastAPI", usedIn: ["argus", "exotel", "myriox"] },
      { name: "Node.js / Express", usedIn: ["aura", "devtinder"] },
      { name: "Fastify", usedIn: ["fnol"] },
      { name: "Spring Boot + Apache Camel", usedIn: ["integrations"] },
      { name: "REST", usedIn: ["integrations", "argus"] },
      { name: "WebSockets", usedIn: ["infra", "myriox"] },
      { name: "Socket.IO", usedIn: ["aura", "devtinder"] },
      { name: "HMAC signing", usedIn: ["integrations", "argus", "twh"] },
      { name: "Redis", usedIn: ["exotel", "argus", "cognitive-os"] },
    ],
  },
  {
    group: "AI / LLM",
    items: [
      { name: "LangGraph", usedIn: ["infra", "argus"] },
      { name: "LangChain", usedIn: [] },
      { name: "Langflow", usedIn: [] },
      { name: "n8n", usedIn: ["joveo"] },
      { name: "Gemini", usedIn: ["argus", "joveo"] },
      { name: "Azure OpenAI", usedIn: ["aura", "career-navigator", "cognitive-os"] },
      { name: "MCP", usedIn: ["aura", "myriox"] },
      { name: "Pipecat", usedIn: ["infra"] },
      { name: "Prompt evaluation & simulation", usedIn: ["argus"] },
      { name: "RAG (keyword + vector)", usedIn: ["aura", "myriox", "joveo"] },
    ],
  },
  {
    group: "AI coding tools",
    items: [
      { name: "Claude Code", usedIn: ["argus", "exotel", "site"] },
      { name: "Cursor", usedIn: ["argus", "exotel"] },
      { name: "Codex", usedIn: ["myriox"] },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React", usedIn: ["exotel", "devtinder"] },
      { name: "Next.js", usedIn: ["twh", "myriox", "site"] },
      { name: "Tailwind CSS", usedIn: ["devtinder", "site"] },
      { name: "Figma", usedIn: ["infokalash"] },
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      { name: "AWS (S3, SES, EC2)", usedIn: ["integrations", "infra"] },
      { name: "Azure (App Service, Container Apps)", usedIn: ["aura", "cognitive-os", "myriox"] },
      { name: "Docker", usedIn: ["cognitive-os", "devtinder"] },
      { name: "Jenkins", usedIn: ["integrations"] },
      { name: "GitHub Actions", usedIn: ["cognitive-os"] },
      { name: "NGINX", usedIn: ["infra"] },
      { name: "Prometheus / Grafana", usedIn: ["infra"] },
      { name: "Ansible", usedIn: ["infra"] },
      { name: "Vercel", usedIn: ["twh", "site"] },
      { name: "Linux", usedIn: [] },
    ],
  },
  {
    group: "Data",
    items: [
      { name: "PostgreSQL / pgvector", usedIn: ["joveo"] },
      { name: "MongoDB", usedIn: ["twh", "devtinder"] },
      { name: "OpenSearch", usedIn: ["argus"] },
    ],
  },
  {
    group: "Testing",
    items: [
      { name: "Playwright", usedIn: ["twh", "site"] },
      { name: "Vitest", usedIn: ["twh"] },
      { name: "Postman", usedIn: [] },
    ],
  },
];

export const specId = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
