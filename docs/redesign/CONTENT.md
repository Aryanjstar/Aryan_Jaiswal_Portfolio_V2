# CONTENT.md — every word and number the site may use

Source of truth: Aryan's private `Aryan_Resume_Context` repo (profile/*.md, CLAIMS.md, HANDOFF.md, resume_*.tex), reconciled 2 Nov 2026 and confirmed again 3 Nov 2026. If that repo is on this machine and disagrees with this file, **the repo wins**. Log the difference in PROGRESS.md.

Conventions: `[roles: …]` tags feed the Role Lens (`sde`, `ai`, `backend`, `frontend`, `fullstack`, `devops`, `fde`). Voice AI is the most recent highlight, not the site's theme. "Scope note" text appears on hover/focus of a metric and is required wherever given.

---

## 1. Identity

- **Name:** Aryan Jaiswal
- **Location:** Bangalore, India (open to roles anywhere in India or remote; Aryan, 3 Nov 2026)
- **Current:** Forward Deployed Engineer, Exotel (Jun 2026–Present)
- **Education:** B.Tech, Computer Science and Engineering, IIIT Dharwad, 2022–2026, CGPA 7.76/10. Graduated May 2026.
- **Email:** aryanjstar3@gmail.com (public). **Phone: do not publish** (see plan Q1).
- **Links:** GitHub https://github.com/Aryanjstar · LinkedIn https://www.linkedin.com/in/aryanjstar · LeetCode https://leetcode.com/u/aryanjstar/ · GeeksforGeeks https://www.geeksforgeeks.org/profile/aryanjstar · X https://x.com/Aryanjstar · Instagram https://instagram.com/aryanjstar · Music Instagram https://www.instagram.com/notesbyaryan/
- **Status pill:** `Open to new roles · anywhere in India or remote` (updated 3 Nov 2026)
- **Eyebrow:** `Forward Deployed Engineer at Exotel · CSE '26, IIIT Dharwad`

## 2. Hero copy

**Line 1:** "Hi, I'm Aryan, a" + **role word** (button). Role words by lens:

| Lens key | Segment label | Role word in hero | Résumé PDF |
|---|---|---|---|
| `all` | All | software engineer | General |
| `sde` | SDE / MTS | software engineer (SDE / MTS) | SDE |
| `ai` | AI | AI engineer | AI-FDE |
| `backend` | Backend | backend engineer | SDE |
| `frontend` | Frontend | frontend engineer | SDE |
| `fullstack` | Full-stack | full-stack developer | SDE |
| `devops` | DevOps & Cloud | DevOps & cloud engineer | SDE |
| `fde` | FDE | forward deployed engineer | AI-FDE |

**"Hi" greeting tooltip** (with `lang`): Hello (en) · नमस्ते (hi) · வணக்கம் (ta) · నమస్కారం (te) · नमस्कार (mr). Caption: "The languages my production voice agents speak."

**Headline (all lenses):**
> I build software that *ships* to production.

(Alternates, pick one and log it as D-xx: "Software engineer. Production is where I do my best work." / "From client call to production, end to end.")

**Sub-line by lens** (crossfades on change):

| Lens | Sub-line |
|---|---|
| all | Forward Deployed Engineer at Exotel and a CS grad from IIIT Dharwad ('26). I've shipped LLM voice agents to production, built the eval platform behind them, wired the integrations, automated the pipelines, and built full-stack products on the side. |
| sde | CS grad (IIIT Dharwad '26) shipping production code since 2025: platform features, integrations and tooling at Exotel, plus 867 LeetCode problems and a COMSNETS 2026 paper. |
| ai | 10+ LLM voice agents in production across 5 languages, an eval and prompt-optimization harness with chat → voice → real-call simulation, and multi-agent apps like AURA. |
| backend | Signed integration routes, retries and guards, batching that took bulk loads from 25 to 2 minutes, and FastAPI/Redis services behind a voice-AI platform. |
| frontend | React and TypeScript, from a shipped test-framework UI at Exotel to a 61-route Next.js wedding platform. And this site, built from scratch to a performance budget. |
| fullstack | End to end: FastAPI and Node backends, React/Next.js frontends, MongoDB and Postgres, CI with Playwright, deployed on Vercel and Azure. |
| devops | WebSocket workers scaled behind NGINX, Prometheus/Grafana monitoring, Ansible provisioning, Jenkins + AWS automation, and Docker → Azure Container Apps through GitHub Actions. |
| fde | Requirements, demos, prompts, integrations and go-lives across 10+ client accounts. I sit with the customer, find the real problem and ship the fix the same day. |

**Actions:** `Download résumé ↓` (lens PDF) · `Copy email` · `GitHub ›` · `LinkedIn ›`

## 3. Highlights (6 shown; order follows the lens; the "roles" column sets priority)

| Big | Label | Scope note (required) | roles |
|---|---|---|---|
| `10+` | LLM voice agents in production | Exotel; 5 languages; 16 bots for 15+ clients through formal eval | ai, fde, all |
| `313/313` | integration route checks passed | Hotel-booking provider migration, staging harness; plus 114/114 booking checks | backend, sde, fde |
| `25→2 min` | bulk lead loads | ~10K-row lists; ~10,000 requests → ~150 via batching and pacing | backend, devops, sde |
| `1→8` | WebSocket workers behind NGINX | Pipecat media pipeline, least_conn, with Prometheus/Grafana monitoring and 5 Ansible roles (worker count, not a capacity multiple) | devops, backend |
| `61` | API routes, CI with Playwright | The Wedding Home (Oct 2026 snapshot): 11 Vitest suites + typecheck + an e2e journey on every push | fullstack, frontend |
| `~1 wk→1–2 d` | per voice-bot build | Estimate across 10+ builds using the AutoLoop harness | ai, fde |
| `867` | LeetCode problems (165 hard) | Oct 2026 snapshot; also GFG institute rank 2 at IIIT Dharwad | sde, all |
| `150K` | lead entries automated | Kinetic Green campaign cycles with Python, Jenkins, AWS S3/SES (cumulative entries, not unique people) | devops, backend |

With `all`, show: 7 · 313/313 · 25→2 min · 1→8 · 61 · 867.

## 4. Experience

### Exotel — voice AI / conversational AI platform · Bangalore

**Forward Deployed Engineer · Jun 2026–Present**
1. Shipped **10+ LLM voice agents to production** in 5 languages and took 16 bots for 15+ clients through formal evaluation, owning requirements, prompts, tool/KB design, integrations and go-live. `[ai, fde]`
2. Ran client calls, demos and requirement sessions with CSM and sales across 10+ accounts, turning call feedback into same-day fixes. `[fde]`
3. Built **AutoLoop** inside Argus: a 7-stage workflow in an agentic harness with symlinked bot repos and 16 skills. It generates scenarios, compares prompt techniques in chat simulations, selects winners and rolls back regressions. → case study `argus-autoloop` `[ai, backend]`
4. Built Argus's **in-house voice simulator** for tests between chat simulations and real calls; made Argus/AutoLoop usable from AI coding tools (Cursor, Claude Code). Harness used on 10+ builds; bot delivery went from ~1 week to 1–2 days (estimate). → `argus-autoloop` `[ai, fde]`
5. Migrated Bawa's booking agent for 6 hotels to the CIN booking provider with HMAC-signed Apache Camel routes; passed **313/313 route and 114/114 booking checks** on staging, then confirmed bookings after the production cutover. → `enterprise-integrations` `[backend, fde, sde]`
6. Automated Kinetic Green's campaign cycles (**150K lead entries**) with Python, Jenkins and AWS S3/SES: post-call lead reports and deterministic PDF summaries emailed after each campaign, with backups and validated lead reloads. → `enterprise-integrations` `[backend, devops, sde]`

**Tech Intern, GenAI · Oct 2025–Jun 2026**
1. Built **Argus**, a voicebot debugging/evaluation platform with Google Chat access, Gemini tool calling, VAD latency analysis, an HMAC-signed recording proxy and Splunk On-Call alerts; cut triage from ~30 min to under a minute. → `argus-autoloop` `[ai, backend]`
2. Hardened the LangGraph LLM path as DRI for **150K+ calls/month** (incl. BlueDart): 7 s wall-clock timeout/fallback, parallel-tool-call guards, TTS markdown filter and a reasoning-leak guard tested on 269 production replies. `[ai, backend]`
3. Scaled Pipecat WebSocket handling from 1 to 8 workers behind NGINX least_conn; added Prometheus/Grafana monitoring with EC2 discovery and 5 Ansible roles for provisioning. → `production-infra` `[devops, backend, sde]`
4. Added per-company custom test cases and scenarios to the bot test framework: FastAPI endpoints, Redis storage, a React/TypeScript UI and a scenario-mix algorithm. `[fullstack, frontend, backend]`

Promotion connector label: "Converted to full-time".

### Earlier (collapsed)
- **Joveo** — AI/ML Intern, Supply Automation · 2025 · Built an email-processing and enterprise-search pipeline with n8n, Gemini embeddings and PostgreSQL/pgvector, with entity extraction, LLM summaries and WhatsApp/Telegram alerts. `[ai, backend]` *(exact dates: TODO(aryan) Q7)*
- **InfoKalash** — UI/UX Developer Intern · Jan 2025 · Redesigned navigation and Figma workflows through research with 15+ users, producing reusable components, interactive prototypes and developer handoffs. `[frontend]`
- **Infosys Springboard** — AI/ML Intern · Mar–Jun 2024 · Built a CNN plant-disease classifier with Python and Flask, including image preprocessing and model-serving workflows. Presented at the inaugural Infosys Springboard Summit. `[ai]` *(no accuracy numbers: they conflict with the repo README)*

## 5. Case studies (5)

Write each as: **Context → Constraints → Build log → Results → What I'd do differently → Stack.** Use descriptors instead of client names in long-form text unless plan Q2 is answered yes. Never invent stage names, timings or numbers beyond these notes.

### 5.1 `argus-autoloop` — "Making voice bots debuggable, then making them improve themselves" `[ai, fde, backend]`

> **Update 3 Nov 2026 (Aryan, in chat):** (1) Ownership: Aryan states he designed and built everything in the Argus/AutoLoop detail sheet, including the pieces the sheet attributes to teammates; the attribution was "a mishappening in my talk". The site says so; the "later evaluator modules are team work" note is removed. (2) AutoLoop build-loop steps supplied by Aryan: requirements.md → eval-suite scenarios → baseline + 4 prompting techniques in chat sims, lock the winner; the improve loop's 7 stage names come from the detail sheet (Evaluate, Investigate, Recommend, Apply, Verify, Compare, Journey, with a human gate). The site's case study (`content/caseStudies.ts`) is the current copy.
- **Context:** Voice bots fail in ways that are slow to find (latency, ASR, prompt drift, tool errors). Engineers dug through recordings and logs per call.
- **What I built (intern):** Argus, a debugging/evaluation platform: Gemini function calling over 17 tools, OpenSearch, S3 recordings, platform APIs, Splunk On-Call automation, VAD-based latency analysis, an HMAC-signed recording proxy. Started as a Google Chat app, now also used from AI coding tools (Cursor, Claude Code).
- **What I built (FDE):** AutoLoop, a 7-stage workflow in an agentic harness. Voicebot repos are symlinked into the harness so it has the bot's real implementation context. Flow: generate scenarios → compare prompt techniques in chat simulations → pick a winner → refine iteratively → check for regressions and roll back. Plus an in-house **voice simulator**, so validation goes **chat sims → voice sims → real calls**. 16 skills around platform REST APIs and 50+ failure rules.
- **Pipeline component:** show the validation ladder (chat sim → voice sim → real call) and the loop (scenarios → compare → select → refine → regression/rollback). **Do not label it with seven invented stage names**; the exact stage names were not supplied. Caption: "Simplified view of the workflow."
- **Results (with scope notes):** triage ~30 min → under a minute (conservative, from the work record) · per-bot delivery ~1 week → 1–2 days (estimate, 10+ builds) · simulation cost ~75% lower by scoring 6 instead of 23 metrics (simulation cost only) · one banking client's prompt cut from ~42K to ~19K characters with simulated time-to-first-word ~900 → ~450 ms (simulated, not production).
- **Ownership note:** "I built Argus, AutoLoop and the voice simulator; later evaluator modules are team work."
- **What I'd do differently:** (draft for Aryan to confirm) define eval metrics before building tooling; earlier investment in the voice simulator because chat sims miss audio-level failures.
- **Stack:** Python, FastAPI, LangGraph, Gemini, OpenSearch, AWS S3, Redis, Google Chat API, Splunk On-Call.

### 5.2 `enterprise-integrations` — "The plumbing behind a voice agent" `[backend, fde, sde]`
Two short stories on one page.

**A. Hotel-booking provider migration (six properties, English/Hindi)**
- Owned provider discovery, route implementation, bilingual conversation changes, layered testing and production cutover.
- 4 Apache Camel routes: session setup, availability, booking, payment-link invoices. HMAC-SHA256 signing, pricing/promo rules, bounded retries, a per-session booking guard.
- **Build log:** `Oct 12–13` initial integration build → `Oct 14` live bot wired to provider staging → `Oct 23` 114/114 booking checks → hardening and vendor feedback through `Nov 1` → `Nov 2, 14:31 IST` production cutover, two check calls confirm bookings.
- **Results:** 313/313 route comparisons and 114/114 booking checks (staging harness) · multi-room tool response ~7.5K → ~2K tokens (one multi-room example) · configured end-of-turn wait 2.0 s → 0.6 s (configuration, not a latency benchmark) · local 14-scenario regression ~1 min vs ~20 min remotely.
- **What I'd do differently:** the booking guard fails open after its own timeout, so it reduces duplicate risk but isn't exactly-once; cold provider calls can exceed the platform tool deadline. Next step would be an idempotency key at the provider plus a warm-up path.

**B. Campaign automation for an EV maker (Marathi outbound sales bot)**
- Owned the bot, lead-table routes, reporting, daily campaign prep and production troubleshooting.
- Twice-daily cycle with Python, Jenkins, AWS S3/SES and headless Chromium: dump and reconcile the lead table → generate PDF/Excel reports → archive and email → conditionally delete the reported batch → load the queued batch → compare against the raw client file. **Failed integrity checks block destructive steps.** Dry-run mode, UAT mocks, separate internal failure notices.
- **Build-log beat (debugging story):** bursty writes hit rate limits → moved to batching and pacing → ~10,000 requests → ~150, load time ~25 → ~2 min for ~10K-row lists.
- **Results:** 150K lead entries across campaign cycles (cumulative entries, not unique people; Aryan, 3 Nov 2026) · 7/7 successful recorded production builds in the first observation window · ~1 hour of manual work removed per cycle (estimate).
- **Stack:** Java/Spring Boot + Apache Camel (YAML routes), Python, Jenkins, AWS S3/SES, headless Chromium, REST, HMAC.

### 5.3 `aura` — "AURA: a five-agent finance advisor" `[ai, fullstack]`
- Google Cloud Agentic AI Day **finalist**, team lead: top 3.5% of 57,000+ participants (2,000 finalists).
- Orchestrator rates query complexity and runs 2, 3 or 5 agents in parallel with 20 s timeouts and Socket.IO streaming. An MCP JSON-RPC client exposes 6 finance tools (net worth, bank, mutual-fund and stock transactions, credit report, EPF). Google OAuth, Helmet, rate limiting; Azure App Service.
- **Results:** 3–8 s answers on the hackathon dataset (not a production SLA).
- **What I'd do differently (honest):** the deployed version uses keyword retrieval over finance guides; embedding retrieval and MongoDB were disabled in the live build. Next step: re-enable vector retrieval with an eval set.
- **Links:** GitHub https://github.com/Aryanjstar/AURA---THE-FINANCE-AI · Demo https://www.youtube.com/watch?v=3q4uTliRNr8 · Live: TODO(aryan) confirm which URL works: `https://aura-finance-ai-in.azurewebsites.net` (context repo) or `https://aura-finance-ai.azurewebsites.net` (current site). Link-check both and use the live one.
- **Stack:** Node.js, Express, Azure OpenAI, MCP, Socket.IO, Google OAuth, Azure App Service.

### 5.4 `the-wedding-home` — "The Wedding Home: planning platform for Indian weddings" `[fullstack, frontend, backend, devops]`
- Next.js/TypeScript/MongoDB: role-based family workspaces, per-function guest lists, tokenized no-login RSVP links, QR photo/video gallery on Vercel Blob, Resend email, daily cron reminders, OpenStreetMap search; themed guest websites and music in the current version.
- Security: bcrypt, HMAC-SHA256 tokens, Zod validation, rate limiting.
- Quality: 61 API routes, 11 Vitest suites, typecheck and a Playwright end-to-end journey in CI (Oct 2026 snapshot).
- No user counts.
- **Links:** GitHub https://github.com/Aryanjstar/the-wedding-home · Live https://the-wedding-home.vercel.app
- **Stack:** Next.js, TypeScript, MongoDB, Vercel Blob, Resend, Zod, Vitest, Playwright.

### 5.5 `production-infra` — "Running it in production: workers, monitoring and pipelines" `[devops, backend, sde]`
A cross-project story for DevOps / infra / cloud roles. Only the facts below. **No capacity multiples** (8 workers ≠ 8× capacity).
- **Voice media pipeline (Exotel, intern):** scaled Pipecat WebSocket handling from 1 to 8 workers behind NGINX `least_conn`; added Prometheus exporters and Grafana dashboards with EC2 service discovery; 5 Ansible roles for automated provisioning; logs for debugging.
- **LLM path hardening (Exotel, intern, DRI for 150K+ calls/month):** a 7 s wall-clock timeout with a fallback, parallel-tool-call guards, a TTS markdown filter, and a reasoning-leak guard tested on 269 labelled production replies. Reliability work, not model work.
- **Campaign automation (Exotel, FDE):** twice-daily Jenkins pipeline (Python, AWS S3/SES, headless Chromium) with integrity checks that block destructive steps, a dry-run mode, UAT mocks and separate failure notices; 7/7 successful recorded production builds in the first observation window; batching cut ~10K-row loads from ~25 to ~2 min.
- **Side projects:** Cognitive-OS shipped as Docker images to Azure Container Apps through GitHub Actions; The Wedding Home runs typecheck, 11 Vitest suites and a Playwright journey in CI on every push, with a daily Vercel cron; AURA on Azure App Service.
- **Build log (example):** `1 worker` → bottleneck under concurrent calls → add 7 workers behind NGINX least_conn → add exporters + Grafana panels → provision with Ansible roles → EC2 discovery so new hosts appear automatically.
- **What I'd do differently:** (draft for Aryan) load-test with a recorded call mix before and after, so the scaling change has a measured number; codify dashboards as code.
- **Stack:** NGINX, Pipecat, Prometheus, Grafana, Ansible, AWS (EC2, S3, SES), Jenkins, Docker, GitHub Actions, Azure Container Apps / App Service, Vercel.

## 6. More projects (homepage list, in default order)

> **Update 3 Nov 2026 (Aryan):** Raya Pay and Null removed from the site; order is AI Career Navigator, Myriox, Cognitive-OS, DevTinder, LEELA, Digit Motor FNOL. The /projects archive keeps fi-mcp-server, HireForge, FreelanceGuard, the MSA website and Plant Disease Classification; VaaniGram, BuzzHive, PowerUpResume, Pawse, EV_Bidding_Algo and Portfolio V1 are no longer shown. Argus commits shown as "500+" (514 in Feb–May 2026; Aryan has made more since). Production voice-agent count stays 7 (no newer count supplied).

| Project | One line | Badge | Links | roles |
|---|---|---|---|---|
| AI Career Navigator | Azure OpenAI career assistant: resume feedback, gap analysis, generated mock interviews | Microsoft JS AI Build-a-thon — Overall Winner + People's Choice | [GitHub](https://github.com/Aryanjstar/AI-Career-Navigator) · [Demo](https://www.youtube.com/watch?v=t_e-CtLxn_Q) · [Microsoft blog](https://techcommunity.microsoft.com/blog/educatordeveloperblog/ai-career-navigator-%E2%80%94-empowering-job-seekers-with-azure-openai/4459774) | ai, fullstack |
| Myriox | LLM-directed personas with five mobility types walk a floor plan to find accessibility issues, grounded in ADA clauses via vector search | "Built for the OpenAI × NamasteDev hackathon" (top-50 placement is self-reported, so don't show it) | [GitHub](https://github.com/Aryanjstar/Myriox_v2) · [Demo](https://www.youtube.com/watch?v=IfA1XU-qBrU) | ai, backend, fullstack |
| LEELA | Turns topics, notes or code into narrated short films with timed speech and FFmpeg | — | [GitHub](https://github.com/Aryanjstar/LEELA) | ai, fullstack |
| Digit Motor FNOL Voice Agent | TypeScript/Fastify insurance-claim voice flow with confirmation gates, bearer auth, idempotency store, 6 tool schemas and 27 tests | — | [GitHub](https://github.com/Aryanjstar/digit-motor-fnol-voice-agent) | ai, backend, fde |
| DevTinder | MERN developer-networking app: connection requests, real-time chat, Google OAuth, Razorpay webhooks, Docker | — | [GitHub](https://github.com/Aryanjstar/DevTinder) · [Demo](https://www.youtube.com/watch?v=t0ggxZnVgTQ) | fullstack, frontend |
| Cognitive-OS | GitHub-synced developer focus tracker: 0–100 cognitive-load heuristic with z-score anomaly detection, Redis cache, three Azure OpenAI agents, Docker → Azure Container Apps via GitHub Actions | — | [GitHub](https://github.com/Aryanjstar/Cognitive-OS) | fullstack, ai, devops |
| Raya Pay | FastAPI/Next.js/PostgreSQL credit-card bill app with reward coins and a spend view over ~10K seeded transactions | Take-home | [GitHub](https://github.com/Aryanjstar/raya-pay) | fullstack, backend |
| Null | Voice transaction-plan prototype (plans only; signs and sends nothing) | Hacker House Goa 2026 | [GitHub](https://github.com/Aryanjstar/Null) | ai |

## 7. Archive only (`/projects`, no metrics)

VaaniGram (Indian-language translation) · HireForge (Claude Code-based job-search workflow; describe neutrally) · fi-mcp-server · FreelanceGuard (Bangalore AI Hack Day) · Pawse · BuzzHive · PowerUpResume · MSA IIIT Dharwad website (https://msa-iiitdwd.vercel.app) · Plant Disease Classification (no accuracy numbers) · EV_Bidding_Algo (do **not** call it the paper's implementation until Aryan confirms) · Portfolio V1. Each needs year + one line + links. TODO(aryan): years for each.

## 8. Tech Specs (Apple spec-sheet style; each item maps to the experience/projects that used it, for cross-highlighting)

- **Languages:** Python, TypeScript, JavaScript, Java, C++, SQL
- **Backend & integration:** FastAPI, Node.js/Express, Fastify, Spring Boot + Apache Camel, REST, WebSockets, Socket.IO, HMAC signing, Redis
- **AI / LLM:** LangGraph, Gemini, Azure OpenAI, MCP, Pipecat, prompt evaluation/simulation, RAG (keyword + vector)
- **Frontend:** React, Next.js, Tailwind CSS, Figma
- **Cloud & DevOps:** AWS (S3, SES, EC2), Azure (App Service, Container Apps), Docker, Jenkins, GitHub Actions, NGINX, Prometheus/Grafana, Ansible, Vercel, Linux
- **Data:** PostgreSQL/pgvector, MongoDB, OpenSearch
- **Testing:** Playwright, Vitest, Postman

Only list an item if at least one experience bullet or project uses it (Linux: confirm with Aryan, Q15).

## 9. Recognition

- **COMSNETS 2026 (main conference):** *A Bid-Driven Optimization Framework for Real-Time Electric Vehicle Charging Scheduling*, with Pranay Ch., Vinay Jain, Malay Kumar. pp. 60–66. DOI [10.1109/COMSNETS67989.2026.11418229](https://ieeexplore.ieee.org/document/11418229) · [Paper](https://drive.google.com/file/d/1BIn6lJDBAFv0X1xafRWhf47dfCS2loqz/view?usp=sharing)
- **Microsoft JS AI Build-a-thon — Overall Winner + People's Choice**, Troop Lead mentoring 80+ developers · [Program](https://github.com/Azure-Samples/JS-AI-Build-a-thon/blob/main/README.md) · [Badge](https://www.credly.com/badges/78eec55a-554b-4706-8990-261e20b92fc9/linked_in_profile)
- **Google Cloud Agentic AI Day — Finalist**, team lead (top 3.5% of 57,000+ participants) · [Proof](https://drive.google.com/file/d/1pKSY7Rol-mGALg7XRb_uN9UDeuLEH3ZP/view?usp=sharing)
- **Gold Microsoft Student Ambassador** (highest tier). Founded the IIIT Dharwad chapter, 500+ members · [Microsoft feature](https://techcommunity.microsoft.com/blog/studentdeveloperblog/meet-aryan-jaiswal/4538102)
- **Problem solving:** 867 LeetCode problems (165 hard) · GeeksforGeeks institute rank 2 at IIIT Dharwad
- **Certified:** Microsoft Azure AI Apps & Agents Developer Associate ([verify](https://learn.microsoft.com/en-us/users/aryanjstar/credentials/certification/azure-ai-apps-and-agents-developer-associate?tab=credentials-tab)) · GitHub Agentic AI Developer ([verify](https://learn.microsoft.com/api/credentials/share/en-us/Aryanjstar/D269D8B15535F5D1?sharingId=3E11B14851102961)) · Azure AI Fundamentals AI-900 ([verify](https://learn.microsoft.com/en-in/users/aryanjstar/credentials/e4c4296f82bdf8ad))
- *Optional, smaller:* Co-organized GitHub Copilot Dev Days Bengaluru with TechNexus at Microsoft Reactor (~200 attendees) · Exotel Swag Battle Winner 2025 · Talk: [Future Voices: Generative AI Impact on Student Careers](https://www.youtube.com/watch?v=wcXFhSJnDE4) · 3rd place, Parsec 4.0 BitHunt 2.0, IIT Dharwad

## 10. Off the clock (music)

- Headline: "I also sing."
- Sub: "When the terminal goes quiet, the mic comes on. A few from notesbyaryan:" (Aryan, 3 Nov 2026: no language named, less direct)
- Homepage shows **pins 1–3** (Aryan's order, below); `/notesbyaryan` shows all 26.

### 10.1 Song list — Aryan's pinned order (3 Nov 2026). This order IS the display order.

Rules:
- **Display order = this table's order**, top to bottom, on `/notesbyaryan` (default view "Aryan's picks") and on the homepage (first 3). An optional "Newest first" sort may exist, but the default is this order.
- In Aryan's message, item 8 contained two songs ("Khat" and "Kyun Main Jaagoon"), so there are **26 positions**. If a song ever appears twice in a future list, the **first occurrence** sets its position.
- **URLs:** store the canonical form `https://www.instagram.com/reel/<code>/` only. Strip share-tracking query strings (`?xtok=…`, `?dlrf=…`, `?srtk=…`, etc.) and convert old `/p/` links to `/reel/`.
- **Dates:** `postedAt` below is **decoded from the reel's Instagram ID** (the ID embeds its creation time; IST). It replaces the old hand-typed dates in `data/performances.json`, which were wrong (e.g. "Har Kisi Ko" was listed as 2026-02-15 but was posted 2025-11-25). Aryan can override any date.
- **Original artist:** carry over from `data/performances.json` where known. `TODO(aryan)` where unknown or new. **Never guess an artist.** Leave the field empty and hide it on the card until filled.
- **Captions/subtitles:** reuse Aryan's existing words from `performances.json` (`line` = old `titleHindi`, `description`, `vibe`). **Emoji kept** (Aryan, 3 Nov 2026; overrides Q11). New songs get no caption until Aryan adds one.
- **Devanagari title (`titleHi`):** the old data's `titleHindi` fields are mostly poetic lines, not titles. Keep them as `caption` text. Claude Code may propose a Devanagari *song title*, but must mark it `needsReview: true` and show it only after Aryan approves.

| # | Title (display) | Reel code | Canonical URL | postedAt (from ID) | Status | Original artist | Lang | Place / note | Existing caption to reuse |
|---|---|---|---|---|---|---|---|---|---|
| 1 | I Think They Call This Love | DXN6uE9D6az | https://www.instagram.com/reel/DXN6uE9D6az/ | 2026-04-17 | in codebase | Matthew i-Field / Elliot James Reay | en | — | "English cover" · "When love finds its own language" |
| 2 | Mujhe Tum Nazar Se | DR0dnM5k46A | https://www.instagram.com/reel/DR0dnM5k46A/ | 2025-12-04 | in codebase | Mehdi Hassan | hi | — | "Soulful cover" · "When words fail, music speaks" |
| 3 | Khamoshiyan | DSAwZVzk950 | https://www.instagram.com/reel/DSAwZVzk950/ | 2025-12-08 | in codebase (was `/p/`) | Arijit Singh | hi | — | "खामोशियाँ आकाश है, तुम उड़ने तो आओ ज़रा" |
| 4 | Aankhein Teri — "Some songs aren't sung" | DenuMfvBtsX | https://www.instagram.com/reel/DenuMfvBtsX/ | 2026-10-18 | **new** | TODO(aryan) | hi | — | — (Aryan's label: "some songs aren't sung"; confirm title vs subtitle) |
| 5 | Mere Nisha | Db-_Dm3ywoB | https://www.instagram.com/reel/Db-_Dm3ywoB/ | 2026-08-13 | **new** | TODO(aryan) | hi | — | — |
| 6 | Main Hoon Saath Tere | DbvpI3LvATl | https://www.instagram.com/reel/DbvpI3LvATl/ | 2026-08-07 | **new** | TODO(aryan) | hi | — | — |
| 7 | Tum Se Hi | DYxNJAQvLvE | https://www.instagram.com/reel/DYxNJAQvLvE/ | 2026-05-25 | **new** | TODO(aryan) | hi | — | — |
| 8 | Khat | DUs_-siD7CG | https://www.instagram.com/reel/DUs_-siD7CG/ | 2026-02-13 | in codebase | Navjot Ahuja | hi | — | "Love is choosing the same person… every single day" |
| 9 | Kyun Main Jaagoon | DfPccrMyWN8 | https://www.instagram.com/reel/DfPccrMyWN8/ | 2026-11-02 | **new** | TODO(aryan) | hi | — | — |
| 10 | Aawara Angaara | DWeKxNJj764 | https://www.instagram.com/reel/DWeKxNJj764/ | 2026-03-29 | in codebase (was titled "Angaara") | Faheem Abdullah / A.R. Rahman (as in old data; confirm) | hi | — | "मैंने इश्क़ सिखा, मैंने प्यार सिखा" |
| 11 | Main Rahoon Ya Na Rahoon | DT-qnIpD2Eb | https://www.instagram.com/reel/DT-qnIpD2Eb/ | 2026-01-26 | in codebase (was `/p/`) | Armaan Malik | hi | Nandi Hills, Bangalore (live) | "कुछ कहूँ या ना कहूँ, तुम मुझको सदा सुनते रहना" |
| 12 | Ho Gaya Hai Tujhko | DTnamJTjzLB | https://www.instagram.com/reel/DTnamJTjzLB/ | 2026-01-17 | in codebase (was `/p/`) | Udit Narayan | hi | — | "Jab dil ne finally baat keh di" |
| 13 | Haal-e-Dil | DSh1nnYj3xF | https://www.instagram.com/reel/DSh1nnYj3xF/ | 2025-12-21 | in codebase (was `/p/`) | TODO(aryan) (old data: "Unknown") | hi | — | "काश यूं होता, हर शाम साथ तू होता" |
| 14 | Har Kisi Ko | DRdYboGjBq- | https://www.instagram.com/reel/DRdYboGjBq-/ | 2025-11-25 | in codebase | Sonu Nigam | hi | Farewell, IIIT Dharwad (live) | "The night I poured my heart out on stage" |
| 15 | Until I Found You | DeCZbpzP4mf | https://www.instagram.com/reel/DeCZbpzP4mf/ | 2026-10-03 | **new** | TODO(aryan) | en | — | — |
| 16 | Tera Chehra | DcTqHkxPeJB | https://www.instagram.com/reel/DcTqHkxPeJB/ | 2026-08-21 | **new** | TODO(aryan) | hi | — | — |
| 17 | Rakh Loon Chupa Ke | DW8xRDWToOF | https://www.instagram.com/reel/DW8xRDWToOF/ | 2026-04-10 | in codebase | Roop Kumar Rathod | hi | — | "तुम ही मेरी हर जुस्तजू… तुम ही आरज़ू" |
| 18 | Qaayde Se | DUiukYvj1pY | https://www.instagram.com/reel/DUiukYvj1pY/ | 2026-02-09 | in codebase (was `/p/`) | TODO(aryan) (old data: "Unknown") | hi | — | "दिल जला के मुस्कुराने की जो आदत हुई है मुझे" |
| 19 | Jiyein Kyun | Da5bTuNPrDu | https://www.instagram.com/reel/Da5bTuNPrDu/ | 2026-07-17 | **new** | TODO(aryan) | hi | — | — |
| 20 | Dhun | DV1NlyCj_yI | https://www.instagram.com/reel/DV1NlyCj_yI/ | 2026-03-13 | in codebase | Arijit Singh | hi | — | "है यही एक धुन… मोहब्बत की धुन" |
| 21 | Tum Hi Ho | DVZCG03jy-G | https://www.instagram.com/reel/DVZCG03jy-G/ | 2026-03-02 | in codebase | Arijit Singh | hi | — | "Ab tum hi ho… zindagi ab tum hi ho" |
| 22 | Mere Naam Tu | DVIX14Pj_oG | https://www.instagram.com/reel/DVIX14Pj_oG/ | 2026-02-24 | in codebase | Abhay Jodhpurkar | hi | — | "Mere naam tu… bas itna hi kaafi hai" |
| 23 | Barbaad | DSwpvRij4BW | https://www.instagram.com/reel/DSwpvRij4BW/ | 2025-12-27 | in codebase (was `/p/`) | TODO(aryan) (old data: "Unknown") | hi | — | "When love hits different" |
| 24 | Tose Naina | Dewu7LOBcjt | https://www.instagram.com/reel/Dewu7LOBcjt/ | 2026-10-21 | **new** | TODO(aryan) | hi | — | — |
| 25 | Sitaarein | DYjVq-mT-ck | https://www.instagram.com/reel/DYjVq-mT-ck/ | 2026-05-20 | **new** | TODO(aryan) | hi | — | — |
| 26 | Mainu Ishq Tera Le Dooba | DZ3_N9hzlBb | https://www.instagram.com/reel/DZ3_N9hzlBb/ | 2026-06-22 | **new** | TODO(aryan) | hi | — | — |

Counts: 26 songs. 15 already in the codebase (update URL/title/date/order), 11 new (add). No duplicates. All 15 old entries appear in the new list, so none are dropped.

Notes on old data to drop: the Tailwind `accent`/`pattern` gradient fields, emoji, the poetic `titleHindi` lines as titles, and the wrong `postedAt` values. Old captions with personal context ("Corporate life mein bhi dil gaata hai", "SHE:- What is love for you?…") stay as optional captions, emoji-stripped, if Aryan wants them (Q11).

### 10.2 notesbyaryan page copy

- H1: `notesbyaryan`
- Line: *i sing what i can't express* (keep his Hindi caption beneath, `lang="hi"`; copy it from the current page)
- Instagram: [@notesbyaryan](https://www.instagram.com/notesbyaryan/)
- Default view: "Aryan's picks" (the §10.1 order). Filters: All · Hindi · English · Live. Optional sort toggle: Aryan's picks / Newest.
- Closing line (his words, keep): "In a world full of noise, music is my silence — a place where my soul breathes free."
- Footer: standard site footer (drop "Made with 💜 and Sleepless Emotions", or keep it emoji-free if Aryan wants: "Made with sleepless emotions.")
- No emoji or ♪♫ symbols in labels. Captions are emoji-stripped by default (Q11).

## 11. Contact

- Heading: "Let's talk."
- Body: "Hiring for an entry-level engineering role — SDE, AI, backend, frontend, full-stack, DevOps/cloud or FDE? I reply within a day."
- Email shown in full + Copy + "Write email" (`mailto:` subject: "Hi Aryan — <role> at <company>", role from the lens). LinkedIn › · GitHub › · Résumé ›.
- "Based in Bangalore · open to anywhere in India or remote"

## 12. Footer

`v3 · 2026 · Designed and built by Aryan` → /colophon · `Last updated: <build date>` · socials · `Press ⌘K`.

## 13. Metadata

- Default title: `Aryan Jaiswal: Software Engineer (AI · Backend · Full-stack · Cloud)`
- Description: `Software engineer and Forward Deployed Engineer at Exotel. I ship AI systems, backend integrations, infrastructure and full-stack products to production. Open to entry-level SDE/MTS, AI, backend, frontend, full-stack, DevOps/cloud and FDE roles.`
- JSON-LD Person: name, url, image, jobTitle "Forward Deployed Engineer", worksFor Exotel, alumniOf IIIT Dharwad, address Bangalore IN, sameAs (LinkedIn, GitHub, LeetCode, GFG, X).

## 14. Never publish (CI must fail if any of these strings or claims appear)

- "150K+ users" or any user count for Exotel work (150K+ is **calls/month**, DRI scope)
- "8x" / "8×" WebSocket capacity, "1,024 concurrent calls"
- AURA "99.9% uptime" or any uptime number
- DevTinder "vector", "embeddings", "ANN"; "200+ beta signups"
- Cognitive-OS "51 developers", "0.84", "pilot study"
- Plant disease "90%", "92%" accuracy/precision
- AI Career Navigator "100+ users", "500+ requests", "99% uptime", "60% less prep time"
- GFG rank 3 or 4, "500+ problems"
- "only Gold Startup Scout in India"
- InfoKalash "40%" / "30%"; Joveo "60%" / "50%" / "40% alert noise"
- "final-year student", "Tech Intern … Present"
- Bawa "two days" for the whole migration; "exactly-once"/"duplicate-free" booking; "all tests passed 100%"
- Kinetic "150K leads/people/customers" (it's lead **entries**), "agreed" as purchases, "300K+"
- "used Cekura" for the voice simulator; "SBI live"; internal Argus URLs, bot IDs or error codes. (Ownership and stage-name rules updated 3 Nov 2026, see §5.1.)
- "Transforming Ideas into Innovative, Impactful Solutions", "Ready to start my journey in tech", "Modern & Minimalist Next.js Portfolio"

Suggested test: after `next build`, crawl all routes and fail on (a) an exact-phrase list derived from this section (case-insensitive), and (b) project-scoped checks. For example, the DevTinder entry must not contain "vector|embedding|ANN", and the AURA entry must not contain "uptime". Words like "vector" are legitimate elsewhere (Myriox, the stack list), so scope those checks to the item, not the whole page. This doc is excluded from the crawl.
