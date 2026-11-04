import type { Link, Roles } from "./schema";

// Source: CONTENT.md §5 only. Descriptors instead of client names in long-form (plan Q2 default).
// Never add stage names, timings or numbers beyond these notes.

export type LogStep = { when?: string; text: string; state: "pass" | "fail" | "fix" | "note"; /** Diagram node this step belongs to (exact node text). */ stage?: string };
export type Result = { big: string; label: string; scope: string };
export type Section = { heading: string; paragraphs?: string[]; bullets?: string[] };

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  outcome: string;
  /** Three-line summary at the top (readable in under a minute). */
  tldr: string[];
  roles: Roles;
  meta: { role: string; team?: string; timeline: string; stack: string[] };
  links: Link[];
  shot?: string;
  diagram?: { caption: string; lanes: { label: string; nodes: string[]; loop?: boolean }[] };
  sections: Section[];
  log?: { title: string; steps: LogStep[] }[];
  results: Result[];
  differently: string[];
  ownership?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    // Source: CONTENT.md §5.1 + "Argus/AutoLoop detail sheet" Aryan supplied on 3 Nov 2026 (compiled from the Argus repo).
    // Ownership: Aryan confirmed on 3 Nov 2026 that he designed and built all of it (D-30). No internal URLs, IDs or client names.
    slug: "argus-autoloop",
    kicker: "AI · Evaluation platform",
    title: "Making voice bots debuggable, then making them improve themselves",
    outcome: "Built from zero to production in three months: triage from ~30 minutes to under a minute, and per-bot delivery from about a week to 1–2 days.",
    tldr: [
      "Built Argus: debug any voice-bot call with one command, from Google Chat, a CLI or a REST API.",
      "Built AutoLoop on top: a build loop for new bots and a 7-stage, human-gated improve loop for live ones.",
      "Triage went from ~30 minutes to under a minute; bot delivery from about a week to 1–2 days (estimate).",
    ],
    roles: ["ai", "fde", "backend"],
    meta: {
      role: "Designed and built end to end: Argus as a GenAI intern, AutoLoop and the voice simulator as FDE",
      team: "Exotel voicebot platform",
      timeline: "Feb 2026 – Present",
      stack: ["Python 3.11", "FastAPI", "Gemini (Pro + Flash)", "LangGraph", "OpenSearch", "AWS S3 / SES", "SQLite", "WebSockets", "Google Chat API", "Splunk On-Call", "Jenkins", "numpy / ffmpeg"],
    },
    links: [],
    diagram: {
      caption: "Simplified view. Stage names as documented in the AutoLoop skills.",
      lanes: [
        { label: "Build loop · before go-live", nodes: ["requirements.md", "Eval-suite scenarios", "Baseline + 4 prompt techniques in chat sims", "Lock the winner", "Iterate on failures", "Voice sims → real calls"] },
        { label: "Improve loop · live bots, 7 stages", nodes: ["1 Evaluate", "2 Investigate", "3 Recommend", "Human approval", "4 Apply", "5 Verify", "6 Compare", "7 Journey"], loop: true },
      ],
    },
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "Voice bots fail in ways that are slow to find: latency, speech recognition, prompt drift, tool errors, platform fallbacks that look like the bot misbehaving. Engineers dug through recordings and logs one call at a time.",
        ],
      },
      {
        heading: "Argus: one command to debug any call",
        paragraphs: [
          "A FastAPI service I built from scratch and shipped behind a load balancer with a Jenkins rolling deploy and automatic rollback. It answers in Google Chat, from a CLI and over a REST API.",
          "Give it any call identifier and it pulls metrics and logs from two OpenSearch clusters, the bot's configuration from the platform API, and the recording from S3, then explains what happened.",
        ],
        bullets: [
          "Perceived latency measured from the recording itself (energy-based VAD + Gemini audio analysis): the gap the caller heard, not the gap the logs claim.",
          "Disconnect attribution that cross-checks the platform's “who hung up” against error logs and transport events.",
          "Recordings playable without VPN through an HMAC-signed proxy with per-account token derivation.",
          "A natural-language mode: Gemini Flash with 16 function-calling tools and per-thread memory, so follow-ups need no IDs.",
          "A daily Splunk On-Call alert digest, file-locked across workers.",
        ],
      },
      {
        heading: "AutoLoop, part 1: building a bot before go-live",
        paragraphs: ["The loop I run on every new bot, packaged so any FDE can run it from Cursor or Claude Code:"],
        bullets: [
          "Generate requirements.md for the bot from the customer's requirement document.",
          "Generate the scenarios: the eval suite the bot has to pass.",
          "Write a baseline prompt and four other prompting techniques (compact, decision table, chain-of-thought, persona-driven), run all five in chat simulations against the real bot runtime over WebSocket, and lock the technique that passes the most scenarios.",
          "Iterate: analyse failing transcripts (thinking-tag leaks, stalls, language mismatch, missing empathy), make a targeted prompt edit, re-run. Usually 2–4 rounds; one documented CCTV-support bot went from a 30% to an 85% behavioural score in 3.",
          "Validate with voice simulations on the in-house voice simulator, then real calls. Every run ends in a report and a PDF.",
        ],
      },
      {
        heading: "AutoLoop, part 2: improving bots already in production",
        paragraphs: ["Seven stages with a human approval gate in the middle. Nothing is applied without a person saying yes."],
        bullets: [
          "Evaluate: benchmark sampled production calls on 8 deterministic and 6 LLM-as-judge dimensions (plus 12 use-case ones). Platform health is classified first, across 11 infrastructure failure patterns, so an outage never gets blamed on the prompt.",
          "Investigate: five data streams per call, a per-turn “was this actually LLM-generated?” check, one root-cause tag per call, and log lines traced back to the source code that emitted them.",
          "Recommend: six preflight gates (sample-size confidence, same-config evidence, grounding in a specific call and turn) before proposing an exact before/after diff to one prompt layer.",
          "Apply: after approval, a drift check, then a new assistant version with the actor recorded.",
          "Verify: re-benchmark only calls after the change (time-fenced), so old calls can't pollute the score.",
          "Compare: per-dimension deltas marked improved, stable or regressed; a regressed composite means roll back.",
          "Journey: a version-by-version audit of what changed, when, and by whom.",
        ],
      },
      {
        heading: "Packaging",
        paragraphs: [
          "AutoLoop ships as 20+ agent skills in all (stage skills, simulation skills and model-specific prompt skills for Gemini Flash, Gemma 4, GPT-4.1-mini and Qwen 3; 16 of them call the platform's REST APIs), an argus.sh CLI with about 30 commands, and an idempotent installer. Argus also hosts the CallEvaluator and ProdBotRecommender pipelines and a nightly evaluation harness.",
        ],
      },
    ],
    log: [
      {
        title: "Argus and AutoLoop, Feb – May 2026",
        steps: [
          { when: "Feb 2026", text: "Argus launches as a Google Chat bot over the metrics cluster", state: "pass" },
          { when: "Mar 2026", text: "Call details, perceived-latency analysis, root-cause analysis, recording proxy, alert digest, natural-language mode", state: "pass" },
          { when: "Apr 2026", text: "AutoLoop: simulate, approve, reject, roll back; evolutionary (GEPA) prompt optimisation with auto-rollback; ~75% lower simulation cost", state: "pass" },
          { when: "May 2026", text: "An earlier loop recommended a prompt fix and a longer timeout for a bot that “refused” every request. The LLM endpoint was returning 404 on every call; the refusals were platform fallbacks.", state: "fail", stage: "1 Evaluate" },
          { when: "May 2026", text: "Added platform-health classification and the investigate-before-recommend gates; hardened into 8 invariants enforced in code and skills", state: "fix", stage: "2 Investigate" },
          { when: "May 2026", text: "Journey audit, version-fenced benchmarks, pre-deploy simulation pipeline", state: "pass" },
        ],
      },
    ],
    results: [
      { big: "~30 min → <1 min", label: "triage per issue", scope: "Conservative, from the work record" },
      { big: "~1 wk → 1–2 d", label: "per-bot delivery", scope: "Estimate across 10+ builds" },
      { big: "500+ · 79", label: "commits · merged PRs", scope: "Argus repo: 514 commits and 79 merged PRs in Feb – May 2026 alone, more since" },
      { big: "30% → 85%", label: "behavioural score in 3 iterations", scope: "One documented CCTV-support bot, simulations" },
      { big: "~75%", label: "lower simulation cost", scope: "Scoring 6 instead of 23 metrics; simulation cost only" },
      { big: "~42K → ~19K", label: "prompt characters, one banking client", scope: "Simulated time-to-first-word ~900 → ~450 ms (simulated, not production)" },
    ],
    differently: [
      "Define the eval metrics before building the tooling around them.",
      "Classify platform health from day one; I learned that one from the May incident.",
      "Invest in the voice simulator earlier, because chat simulations miss audio-level failures.",
    ],
    ownership: "Designed and built by me, Aryan Jaiswal: Argus, AutoLoop, the simulation pipeline, the in-house voice simulator, and the CallEvaluator and ProdBotRecommender pipelines Argus hosts.",
  },
  {
    slug: "enterprise-integrations",
    kicker: "Backend · Integrations",
    title: "The plumbing behind a voice agent",
    outcome: "A signed, guarded hotel-booking migration that passed 313/313 route checks in staging, and a campaign pipeline that turned 25-minute loads into 2.",
    tldr: [
      "Moved a six-property hotel-booking agent to a new provider over 4 HMAC-signed Apache Camel routes: 313/313 route and 114/114 booking checks on staging, then the production cutover.",
      "Automated a twice-daily campaign pipeline: 150K lead entries so far; batching cut ~10K-row loads from ~25 to ~2 minutes.",
      "Honest limits included: the booking guard reduces duplicate risk but isn't exactly-once.",
    ],
    roles: ["backend", "fde", "sde"],
    meta: {
      role: "Owner, as Forward Deployed Engineer",
      team: "Exotel",
      timeline: "Oct – Nov 2026",
      stack: ["Java", "Spring Boot", "Apache Camel (YAML routes)", "Python", "Jenkins", "AWS S3/SES", "Headless Chromium", "REST", "HMAC"],
    },
    links: [],
    diagram: {
      caption: "Simplified view of both systems.",
      lanes: [
        { label: "A · Booking routes (Apache Camel, HMAC-signed)", nodes: ["Session setup", "Availability", "Booking + per-session guard", "Payment-link invoice"] },
        { label: "B · Campaign cycle (Jenkins, twice daily)", nodes: ["Dump + reconcile", "PDF/Excel reports", "Archive + email", "Integrity check", "Delete reported batch", "Load queued batch", "Compare to source"] },
      ],
    },
    sections: [
      {
        heading: "A. Hotel-booking provider migration",
        paragraphs: [
          "Six properties, English and Hindi callers. I owned provider discovery, route implementation, the bilingual conversation changes, layered testing and the production cutover.",
        ],
        bullets: [
          "4 Apache Camel routes: session setup, availability, booking and payment-link invoices.",
          "HMAC-SHA256 signing, pricing and promo rules, bounded retries and a per-session booking guard.",
        ],
      },
      {
        heading: "B. Campaign automation for an EV maker",
        paragraphs: [
          "A Marathi outbound sales bot. I owned the bot, the lead-table routes, reporting, daily campaign prep and production troubleshooting.",
          "A twice-daily cycle with Python, Jenkins, AWS S3/SES and headless Chromium: dump and reconcile the lead table → generate PDF/Excel reports → archive and email → conditionally delete the reported batch → load the queued batch → compare against the raw client file.",
          "Failed integrity checks block the destructive steps. There's a dry-run mode, UAT mocks and separate internal failure notices.",
        ],
      },
    ],
    log: [
      {
        title: "Booking migration",
        steps: [
          { when: "Oct 12–13", text: "Initial integration build", state: "note" },
          { when: "Oct 14", text: "Live bot wired to provider staging", state: "pass", stage: "Session setup" },
          { when: "Oct 23", text: "114/114 booking checks in staging", state: "pass", stage: "Booking + per-session guard" },
          { when: "→ Nov 1", text: "Hardening and vendor feedback", state: "fix" },
          { when: "Nov 2, 14:31 IST", text: "Production cutover; two check calls confirm bookings", state: "pass" },
        ],
      },
      {
        title: "Campaign loads",
        steps: [
          { text: "Bursty writes hit rate limits", state: "fail", stage: "Load queued batch" },
          { text: "Moved to batching and pacing", state: "fix", stage: "Load queued batch" },
          { text: "~10,000 requests → ~150; ~25 → ~2 min for ~10K-row lists", state: "pass" },
        ],
      },
    ],
    results: [
      { big: "313/313", label: "route comparisons", scope: "Staging harness; plus 114/114 booking checks" },
      { big: "~7.5K → ~2K", label: "tokens per multi-room tool response", scope: "One multi-room example" },
      { big: "2.0 → 0.6 s", label: "configured end-of-turn wait", scope: "Configuration, not a latency benchmark" },
      { big: "~1 vs ~20 min", label: "14-scenario regression, local vs remote", scope: "Local harness run time" },
      { big: "150K", label: "lead entries automated", scope: "Cumulative entries across campaign cycles, not unique people" },
      { big: "7/7", label: "successful production builds", scope: "First observation window" },
      { big: "~1 h", label: "manual work removed per cycle", scope: "Estimate" },
    ],
    differently: [
      "The booking guard fails open after its own timeout, so it reduces duplicate risk but isn't exactly-once.",
      "Cold provider calls can exceed the platform's tool deadline.",
      "Next: an idempotency key at the provider, plus a warm-up path.",
    ],
  },
  {
    slug: "production-infra",
    kicker: "DevOps · Infrastructure",
    title: "Running it in production: workers, monitoring and pipelines",
    outcome: "Media workers scaled from 1 to 8 behind NGINX, with monitoring that finds new hosts by itself and pipelines that refuse to do damage.",
    tldr: [
      "Scaled voice WebSocket handling from 1 to 8 workers behind NGINX least_conn, with Prometheus/Grafana and 5 Ansible roles.",
      "Hardened the LLM path as DRI for 150K+ calls/month: 7 s timeout with fallback, tool-call guards, a leak guard tested on 269 replies.",
      "Built pipelines that refuse to do damage: integrity checks block destructive steps; dry-run first.",
    ],
    roles: ["devops", "backend", "sde"],
    meta: {
      role: "Intern and FDE at Exotel; side projects",
      timeline: "2025 – 2026",
      stack: ["NGINX", "Pipecat", "Prometheus", "Grafana", "Ansible", "AWS (EC2, S3, SES)", "Jenkins", "Docker", "GitHub Actions", "Azure Container Apps / App Service", "Vercel"],
    },
    links: [],
    diagram: {
      caption: "Simplified view of the voice media path and how hosts are provisioned.",
      lanes: [
        { label: "Voice media path", nodes: ["Calls", "NGINX least_conn", "8 Pipecat WebSocket workers", "Prometheus exporters", "Grafana dashboards"] },
        { label: "Provisioning", nodes: ["5 Ansible roles", "EC2 discovery", "New hosts show up in Grafana"] },
      ],
    },
    sections: [
      {
        heading: "Voice media pipeline",
        paragraphs: [
          "Scaled Pipecat WebSocket handling from 1 to 8 workers behind NGINX least_conn. Added Prometheus exporters and Grafana dashboards with EC2 service discovery, 5 Ansible roles for automated provisioning, and logs for debugging. Eight workers is a worker count, not a capacity multiple.",
        ],
      },
      {
        heading: "LLM path hardening (DRI for 150K+ calls/month)",
        paragraphs: [
          "A 7-second wall-clock timeout with a fallback, parallel-tool-call guards, a TTS markdown filter, and a reasoning-leak guard tested on 269 labelled production replies. Reliability work, not model work.",
        ],
      },
      {
        heading: "Campaign automation",
        paragraphs: [
          "A twice-daily Jenkins pipeline (Python, AWS S3/SES, headless Chromium) with integrity checks that block destructive steps, a dry-run mode, UAT mocks and separate failure notices. Batching cut ~10K-row loads from ~25 to ~2 minutes.",
        ],
      },
      {
        heading: "Side projects",
        bullets: [
          "Cognitive-OS ships as Docker images to Azure Container Apps through GitHub Actions.",
          "The Wedding Home runs typecheck, 11 Vitest suites and a Playwright journey in CI on every push, with a daily Vercel cron.",
          "AURA runs on Azure App Service.",
        ],
      },
    ],
    log: [
      {
        title: "Scaling the media workers",
        steps: [
          { text: "1 worker", state: "note", stage: "8 Pipecat WebSocket workers" },
          { text: "Bottleneck under concurrent calls", state: "fail", stage: "8 Pipecat WebSocket workers" },
          { text: "Add 7 workers behind NGINX least_conn", state: "fix", stage: "NGINX least_conn" },
          { text: "Add exporters + Grafana panels", state: "pass", stage: "Prometheus exporters" },
          { text: "Provision with Ansible roles", state: "pass", stage: "5 Ansible roles" },
          { text: "EC2 discovery so new hosts appear automatically", state: "pass", stage: "EC2 discovery" },
        ],
      },
    ],
    results: [
      { big: "1 → 8", label: "WebSocket workers", scope: "Worker count behind NGINX least_conn, not a capacity multiple" },
      { big: "5", label: "Ansible roles", scope: "Automated provisioning" },
      { big: "269", label: "labelled production replies", scope: "Test set for the reasoning-leak guard" },
      { big: "7/7", label: "successful production builds", scope: "Campaign pipeline, first observation window" },
    ],
    differently: [
      "Load-test with a recorded call mix before and after, so the scaling change has a measured number.",
      "Codify the dashboards as code.",
    ],
  },
  {
    slug: "aura",
    kicker: "AI · Full-stack",
    title: "AURA: a five-agent finance advisor",
    outcome: "Google Cloud Agentic AI Day finalist, top 3.5% of 57,000+ participants, as team lead.",
    tldr: [
      "Team lead; Google Cloud Agentic AI Day finalist, top 3.5% of 57,000+ participants.",
      "An orchestrator runs 2, 3 or 5 agents in parallel with 20 s timeouts and streams answers over Socket.IO; an MCP client exposes 6 finance tools.",
      "The live build uses keyword retrieval; next step is vector retrieval with an eval set.",
    ],
    roles: ["ai", "fullstack"],
    meta: {
      role: "Team lead",
      team: "Hackathon team",
      timeline: "2025",
      stack: ["Node.js", "Express", "Azure OpenAI", "MCP", "Socket.IO", "Google OAuth", "Azure App Service"],
    },
    links: [
      { label: "Live", href: "https://aura-finance-ai-in.azurewebsites.net" },
      { label: "GitHub", href: "https://github.com/Aryanjstar/AURA---THE-FINANCE-AI" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=3q4uTliRNr8" },
    ],
    shot: "aura",
    diagram: {
      caption: "Simplified view of a request.",
      lanes: [{ label: "Request", nodes: ["Rate complexity", "Run 2, 3 or 5 agents in parallel", "MCP finance tools", "Stream over Socket.IO"] }],
    },
    sections: [
      {
        heading: "How it works",
        paragraphs: [
          "An orchestrator rates each query's complexity and runs 2, 3 or 5 agents in parallel, each with a 20-second timeout, streaming the answer over Socket.IO.",
          "An MCP JSON-RPC client exposes 6 finance tools: net worth, bank transactions, mutual-fund and stock transactions, credit report and EPF.",
          "Google OAuth, Helmet and rate limiting; deployed on Azure App Service.",
        ],
      },
    ],
    results: [
      { big: "3–8 s", label: "answers", scope: "On the hackathon dataset, not a production SLA" },
      { big: "Top 3.5%", label: "of 57,000+ participants", scope: "Google Cloud Agentic AI Day finalist (2,000 finalists)" },
    ],
    differently: [
      "The deployed version uses keyword retrieval over finance guides; embedding retrieval and MongoDB were disabled in the live build.",
      "Next step: re-enable vector retrieval, with an eval set to prove it helps.",
    ],
  },
  {
    slug: "the-wedding-home",
    kicker: "Full-stack · Web",
    title: "The Wedding Home: a planning platform for Indian weddings",
    outcome: "61 API routes with typecheck, 11 Vitest suites and a Playwright journey in CI on every push.",
    tldr: [
      "A planning platform for Indian weddings: family workspaces, per-function guest lists, no-login RSVP links, QR galleries.",
      "61 API routes; typecheck, 11 Vitest suites and a Playwright journey run on every push (Oct 2026 snapshot).",
      "bcrypt, HMAC-SHA256 tokens, Zod validation and rate limiting.",
    ],
    roles: ["fullstack", "frontend", "backend", "devops"],
    meta: {
      role: "Design, build and CI",
      timeline: "2026",
      stack: ["Next.js", "TypeScript", "MongoDB", "Vercel Blob", "Resend", "Zod", "Vitest", "Playwright"],
    },
    links: [
      { label: "Live", href: "https://the-wedding-home.vercel.app" },
      { label: "GitHub", href: "https://github.com/Aryanjstar/the-wedding-home" },
    ],
    diagram: {
      caption: "Simplified view of the product and its CI.",
      lanes: [
        { label: "Product", nodes: ["Family workspace", "Per-function guest lists", "Tokenized RSVP link", "QR photo/video gallery", "Daily reminders (cron + Resend)"] },
        { label: "Every push", nodes: ["Typecheck", "11 Vitest suites", "Playwright journey", "Vercel"] },
      ],
    },
    shot: "the-wedding-home",
    sections: [
      {
        heading: "What it does",
        paragraphs: [
          "Role-based family workspaces, per-function guest lists, tokenized no-login RSVP links, a QR photo and video gallery on Vercel Blob, Resend email, daily cron reminders and OpenStreetMap search. The current version adds themed guest websites with music.",
        ],
      },
      {
        heading: "Security",
        bullets: ["bcrypt for passwords", "HMAC-SHA256 tokens for RSVP links", "Zod validation on every input", "Rate limiting"],
      },
      {
        heading: "Quality",
        paragraphs: ["61 API routes, 11 Vitest suites, typecheck and a Playwright end-to-end journey in CI (Oct 2026 snapshot)."],
      },
    ],
    results: [
      { big: "61", label: "API routes", scope: "Oct 2026 snapshot" },
      { big: "11", label: "Vitest suites", scope: "Plus typecheck and a Playwright journey on every push" },
    ],
    // Written 3 Nov 2026 with Aryan's go-ahead ("see what is best"); grounded in the facts above.
    differently: [
      "Add product analytics and error monitoring from day one. CI proves the code works, but not yet how families actually use it.",
      "Load-test the RSVP and gallery-upload paths before a busy wedding week, since guests hit them all at once.",
      "Write the end-to-end journey first and grow the unit suites around it.",
    ],
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);

/** Homepage tile order (CONTENT.md §5) and lines. */
export const tileOrder = ["argus-autoloop", "enterprise-integrations", "production-infra", "aura", "the-wedding-home"];
