// "How I ship" (plan §5.2 ch. 6, D-16). Each step shows a real, non-confidential artifact from one piece of work.
// Every number here appears in CONTENT.md §4–5. No customer data, internal identifiers or recordings.

export type ShipArtifact =
  | { kind: "note"; title: string; lines: string[] }
  | { kind: "flow"; title: string; nodes: string[] }
  | { kind: "code"; title: string; code: string; caption: string }
  | { kind: "checks"; title: string; rows: { label: string; value: string; ok: boolean }[] }
  | { kind: "pipeline"; title: string; stages: string[]; footer: string }
  | { kind: "panel"; title: string; bars: number[]; footer: string };

export type ShipStep = {
  id: string;
  verb: string;
  line: string;
  from: { label: string; href: string };
  artifact: ShipArtifact;
};

export const shipSteps: ShipStep[] = [
  {
    id: "understand",
    verb: "Understand",
    line: "Start on the customer call. Write down what the agent must do, in their words, before touching code.",
    from: { label: "Hotel-booking migration", href: "/work/enterprise-integrations" },
    artifact: {
      kind: "note",
      title: "requirements.md",
      lines: [
        "Six properties, English + Hindi callers",
        "Move booking to the new provider without breaking live calls",
        "Payment link by invoice; guard against duplicate bookings in a session",
        "Cut over only after the staging harness is green",
      ],
    },
  },
  {
    id: "design",
    verb: "Design",
    line: "Draw the routes and the failure paths first: signing, retries, timeouts and what happens when a call repeats.",
    from: { label: "Hotel-booking migration", href: "/work/enterprise-integrations" },
    artifact: {
      kind: "flow",
      title: "4 Apache Camel routes",
      nodes: ["Session setup", "Availability", "Booking + guard", "Payment-link invoice"],
    },
  },
  {
    id: "build",
    verb: "Build",
    line: "Small, typed, boring code at the edges. Every outbound request is signed; every retry is bounded.",
    from: { label: "Hotel-booking migration", href: "/work/enterprise-integrations" },
    artifact: {
      kind: "code",
      title: "sign.ts",
      caption: "Illustrative sketch of the HMAC-SHA256 signing step, not the production code.",
      code: `const signature = createHmac("sha256", secret)
  .update(\`\${timestamp}.\${body}\`)
  .digest("hex");

await withRetry(() => post(url, body, {
  "X-Signature": signature,
  "X-Timestamp": timestamp,
}), { attempts: 3 });`,
    },
  },
  {
    id: "test",
    verb: "Test",
    line: "Prove it on staging before anyone hears it on a call. Chat simulations, then voice simulations, then real calls.",
    from: { label: "Argus / AutoLoop", href: "/work/argus-autoloop" },
    artifact: {
      kind: "checks",
      title: "staging harness",
      rows: [
        { label: "route comparisons", value: "313/313", ok: true },
        { label: "booking checks", value: "114/114", ok: true },
        { label: "14-scenario regression, local run time (vs ~20 min remote)", value: "~1 min", ok: false },
      ],
    },
  },
  {
    id: "deploy",
    verb: "Deploy",
    line: "Automate the boring, dangerous parts. Integrity checks block destructive steps; dry-run mode comes first.",
    from: { label: "Campaign automation", href: "/work/enterprise-integrations" },
    artifact: {
      kind: "pipeline",
      title: "Jenkins · twice daily",
      stages: ["Dump + reconcile", "Reports", "Archive + email", "Integrity check", "Load batch", "Compare to source"],
      footer: "7/7 successful recorded production builds in the first observation window",
    },
  },
  {
    id: "observe",
    verb: "Observe",
    line: "If you can't see it, you can't scale it. Workers, exporters and dashboards that find new hosts on their own.",
    from: { label: "Production infra", href: "/work/production-infra" },
    artifact: {
      kind: "panel",
      title: "WebSocket workers · NGINX least_conn",
      bars: [1, 1, 1, 8, 8, 8, 8, 8],
      footer: "Worker count 1 → 8 · Prometheus + Grafana · EC2 discovery",
    },
  },
];
