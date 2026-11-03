import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);

export default defineConfig({
  testDir: "tests",
  timeout: 60_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // Cross-browser QA (Phase 6): the user-facing journeys on Safari (iPhone) and Firefox.
    { name: "webkit-iphone", use: { ...devices["iPhone 13"] }, testMatch: /(journey|smoke|theme)\.spec\.ts/ },
    // Aryan's phone: iPhone 17 Pro (402×874 pt, 3x) on WebKit, with interactions and axe too.
    {
      name: "webkit-iphone17pro",
      use: { ...devices["iPhone 13"], viewport: { width: 402, height: 874 }, screen: { width: 402, height: 874 }, deviceScaleFactor: 3 },
      testMatch: /(journey|smoke|theme|interactions|a11y)\.spec\.ts/,
    },
    { name: "firefox", use: { ...devices["Desktop Firefox"] }, testMatch: /(journey|smoke|theme)\.spec\.ts/ },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
