import { expect, test } from "@playwright/test";

// Plan Phase 6: keyboard-only journey — palette → case study → contact. Runs on every browser project.
test("keyboard journey: palette → case study → contact", async ({ page, browserName }) => {
  await page.goto("/");
  // Wait for hydration (the toggle's label switches from "Switch theme" once mounted).
  await expect(page.getByRole("button", { name: /switch to (dark|light) theme/i })).toBeVisible();
  await page.locator("body").press("/");
  const dialog = page.getByRole("dialog", { name: "Command palette" });
  await expect(dialog).toBeVisible();
  await page.keyboard.type("debuggable");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/argus-autoloop$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("debuggable");

  await page.locator("body").press("/");
  await expect(dialog).toBeVisible();
  await page.keyboard.type("contact");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#contact-title")).toBeInViewport();
  // Contact actions are reachable by keyboard
  const write = page.getByRole("link", { name: "Write email" });
  await write.focus();
  await expect(write).toBeFocused();
  expect(await write.getAttribute("href")).toMatch(/^mailto:aryanjstar3@gmail\.com\?subject=/);
  test.info().annotations.push({ type: "browser", description: browserName });
});

test("no horizontal scroll at 768 px", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const page = await ctx.newPage();
  for (const r of ["/", "/projects", "/notesbyaryan", "/resume", "/work/enterprise-integrations", "/colophon"]) {
    await page.goto(r);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, r).toBeLessThanOrEqual(0);
  }
  await ctx.close();
});
