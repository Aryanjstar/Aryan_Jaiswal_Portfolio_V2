import { expect, test } from "@playwright/test";

test.describe("JS off", () => {
  test.use({ javaScriptEnabled: false });

  test("homepage is complete without JS", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("ships");
    await expect(page.locator(".status-pill")).toContainText("Open to new roles");
    await expect(page.getByRole("link", { name: /download resume/i })).toHaveAttribute("href", /\.pdf$/);
    await expect(page.locator("#contact").getByText("aryanjstar3@gmail.com")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Understand" })).toBeVisible();
  });

  test("old ?mode=resume links land on /resume", async ({ page }) => {
    await page.goto("/?mode=resume&role=sde");
    await expect(page).toHaveURL(/\/resume\?role=sde$/);
    await expect(page.getByRole("heading", { level: 1, name: "Aryan Jaiswal" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Forward Deployed Engineer" })).toBeVisible();
  });
});

test("?role= is server-rendered (no flash)", async ({ request }) => {
  const html = await (await request.get("/?role=devops")).text();
  expect(html).toContain("DevOps &amp; cloud engineer");
  expect(html).toContain("WebSocket workers scaled behind NGINX");
  // DevOps-tagged highlight comes first
  expect(html.indexOf("25→2 min")).toBeLessThan(html.indexOf("LLM voice agents in production"));
});

test("copy email shows an announced toast", async ({ page, context, browserName }) => {
  // Only Chromium supports clipboard permissions in Playwright; the component falls back to execCommand elsewhere.
  if (browserName === "chromium") await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  // Wait for hydration (the toggle's label switches from "Switch theme" once mounted).
  await expect(page.getByRole("button", { name: /switch to (dark|light) theme/i })).toBeVisible();
  await page.getByRole("button", { name: /copy email address/i }).first().click();
  await expect(page.getByRole("status").filter({ hasText: "Copied" })).toBeVisible();
});

test("music: nothing from Instagram before a song is opened; keyboard opens the sheet with the reel; Esc closes", async ({ page }) => {
  const thirdParty: string[] = [];
  page.on("request", (r) => {
    if (/instagram|cdninstagram|facebook/.test(r.url())) thirdParty.push(r.url());
  });
  await page.goto("/notesbyaryan");
  await expect(page.locator(".track-in")).toHaveCount(26);
  const first = page.getByRole("button", { name: "Play I Think They Call This Love here" }).first();
  await page.waitForTimeout(500);
  expect(thirdParty).toEqual([]);
  await first.focus();
  await page.keyboard.press("Enter");
  const sheet = page.getByRole("dialog");
  await expect(sheet).toBeVisible();
  await expect(sheet.getByRole("heading", { name: "I Think They Call This Love" })).toBeVisible();
  await expect(sheet.locator('iframe[src*="instagram.com/reel/DXN6uE9D6az/embed"]')).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(sheet).toBeHidden();
  await expect(first).toBeFocused();

  // Filters are a radiogroup with arrow keys
  await page.getByRole("radio", { name: "All" }).focus();
  await expect(page.getByRole("radio", { name: "All" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Hindi" })).toHaveAttribute("aria-checked", "true");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".track-in")).toHaveCount(2);
});

test("no horizontal scroll at 320px", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 320, height: 700 } });
  const page = await ctx.newPage();
  for (const r of ["/", "/notesbyaryan", "/resume", "/work/enterprise-integrations", "/projects"]) {
    await page.goto(r);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, r).toBeLessThanOrEqual(0);
  }
  await ctx.close();
});

test("the record on /notesbyaryan: plays its file inline when one is set, otherwise opens the featured song", async ({ page }) => {
  await page.goto("/notesbyaryan");
  const vinyl = page.locator(".vinyl");
  const hasAudio = (await page.locator("audio").count()) > 0;
  await vinyl.click();
  if (hasAudio) {
    await expect(vinyl).toHaveAttribute("data-state", "playing");
    await vinyl.click();
    await expect(vinyl).toHaveAttribute("data-state", "paused");
  } else {
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Aankhein Teri" })).toBeVisible();
  }
});
