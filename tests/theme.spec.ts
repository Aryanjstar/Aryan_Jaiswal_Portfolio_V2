import { expect, test } from "@playwright/test";

// F7 acceptance: no flash before hydration, persistence, live system changes, accessible toggle.
for (const scheme of ["light", "dark"] as const) {
  test(`no theme flash before hydration (${scheme})`, async ({ browser }) => {
    const ctx = await browser.newContext({ colorScheme: scheme });
    const page = await ctx.newPage();
    // Block every external JS chunk so only inline scripts run: the state a visitor sees before hydration.
    await page.route(/\/_next\/static\/.*\.js$/, (r) => r.abort());
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", scheme);
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe(scheme === "dark" ? "rgb(18, 18, 20)" : "rgb(255, 255, 255)");
    await ctx.close();
  });
}

test("toggle switches, persists across pages and reloads, and is labelled", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "light" });
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /switch to dark theme/i });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.goto("/resume");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: /switch to light theme/i })).toBeVisible();
  expect(errors).toEqual([]);
  await ctx.close();
});

test("system mode follows an OS change live", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await ctx.close();
});
