// Homepage terminal (techy layer, 3 Nov 2026). Every output is a fact from CONTENT.md or the
// Argus/AutoLoop detail sheet Aryan supplied on 3 Nov 2026. Per Aryan: no employer name here, and
// commits shown as "500+" (514 in Feb–May 2026 per git log; he has made more since).
export const terminalLines: { cmd: string; out: string }[] = [
  { cmd: "whoami", out: "aryan jaiswal · software engineer · cse '26, iiit dharwad · bangalore" },
  { cmd: "git log --author=aryan --oneline -- argus/ | wc -l", out: "500+ commits · 79 merged PRs, and counting" },
  { cmd: "./autoloop --stages", out: "evaluate → investigate → recommend → [approve] → apply → verify → compare → journey" },
  { cmd: "ls ~/shipped", out: "argus/  autoloop/  voice-sim/  booking-routes/  campaign-pipeline/  the-wedding-home/  aura/" },
  { cmd: "cat status", out: "● open to new roles · anywhere in india or remote" },
];
