import { expect, test, type Page } from "@playwright/test";

// DESIGN.md §8 catalog: every interactive item has a focus and a touch path, works in both themes,
// and respects reduced motion. (I1 and I6 are hidden by D-22.)

const pseudoOpacity = (page: Page, sel: string) => page.locator(sel).first().evaluate((el) => getComputedStyle(el, "::after").opacity);
const bg = (page: Page, sel: string) => page.locator(sel).first().evaluate((el) => getComputedStyle(el).backgroundColor);

for (const scheme of ["light", "dark"] as const) {
  test.describe(`keyboard (${scheme})`, () => {
    test.use({ colorScheme: scheme, viewport: { width: 1440, height: 900 } });

    test("I2 greeting + I5 status tooltip show on keyboard focus", async ({ page }) => {
      await page.goto("/");
      await page.keyboard.press("Tab"); // switch to keyboard modality
      await page.locator(".greeting-trigger").focus();
      await expect.poll(() => page.locator(".greeting-tip").evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
      await page.locator(".status-pill").focus();
      await expect.poll(() => pseudoOpacity(page, ".status-pill")).toBe("1");
    });

    test("I8 experience bullet highlights when its case-study link has focus", async ({ page }) => {
      await page.goto("/");
      await page.keyboard.press("Tab");
      await page.locator(".exp-bullet .exp-cs").first().focus();
      await expect.poll(() => page.locator(".exp-bullet:has(.exp-cs:focus)").evaluate((el) => getComputedStyle(el).boxShadow)).not.toBe("none");
    });

    test("I11 project preview docks on keyboard focus", async ({ page }) => {
      await page.goto("/");
      await page.keyboard.press("Tab");
      await page.locator(".proj-link").nth(1).focus();
      await expect(page.locator(".preview-card")).toHaveClass(/is-on/);
    });

    test("I12 spec focus lights its places; Esc clears", async ({ page }) => {
      await page.goto("/");
      const before = await bg(page, '[data-place~="argus"]');
      await page.locator('.spec[data-spec="python"]').focus();
      await expect.poll(() => bg(page, '[data-place~="argus"]')).not.toBe(before);
      await page.keyboard.press("Escape");
      await expect(page.locator('.spec[data-spec="python"]')).not.toBeFocused();
    });

    test("I14 ⌘K palette: open, filter, Enter navigates, Esc restores focus", async ({ page }) => {
      await page.goto("/");
      const trigger = page.getByRole("button", { name: /open command palette \(command k\)/i });
      await trigger.focus();
      await page.keyboard.press("Enter");
      const dialog = page.getByRole("dialog", { name: "Command palette" });
      await expect(dialog).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
      await page.keyboard.press("ControlOrMeta+k");
      await expect(dialog).toBeVisible();
      await page.keyboard.type("wedding");
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/\/work\/the-wedding-home$/);
    });

    test("I15 theme toggle works from the keyboard", async ({ page }) => {
      await page.goto("/");
      const before = await page.locator("html").getAttribute("data-theme");
      await page.getByRole("button", { name: /switch to (dark|light) theme/i }).focus();
      await page.keyboard.press("Enter");
      await expect(page.locator("html")).not.toHaveAttribute("data-theme", before ?? "");
    });

    test("I17 copy email toast is announced, then leaves", async ({ page, context, browserName }) => {
      if (browserName === "chromium") await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await page.goto("/");
      await expect(page.getByRole("button", { name: /switch to (dark|light) theme/i })).toBeVisible();
      await page.getByRole("button", { name: /copy email address/i }).first().press("Enter");
      const toast = page.getByRole("status").filter({ hasText: "Copied" });
      await expect(toast).toBeVisible();
      await expect(toast).toBeHidden({ timeout: 4000 });
    });

    test("I18 clicking a diagram stage jumps to its build-log step and lights the stage", async ({ page }) => {
      await page.goto("/work/production-infra");
      await page.locator('.stage-node[data-stage="ec2-discovery"]').click();
      await expect(page).toHaveURL(/#step-ec2-discovery$/);
      await expect.poll(() => bg(page, '.stage-node[data-stage="ec2-discovery"]')).toBe("rgb(0, 113, 227)");
    });

    test("I21 typing “ship” toggles debug mode", async ({ page }) => {
      await page.goto("/");
      await page.locator("body").click({ position: { x: 5, y: 400 } });
      await page.keyboard.type("ship");
      await expect(page.locator("html")).toHaveAttribute("data-debug", "");
      await page.keyboard.type("ship");
      await expect(page.locator("html")).not.toHaveAttribute("data-debug", "");
    });
  });
}

test.describe("touch", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("I2 tap pins the greeting; I7 tap pins a highlight; scope notes visible without hover", async ({ page }) => {
    await page.goto("/");
    await page.locator(".greeting-trigger").tap();
    await expect(page.locator(".greeting")).toHaveAttribute("data-pinned", "true");
    const card = page.locator(".hl-card").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator(".hl-note")).toBeVisible();
    await card.tap();
    await expect(card).toHaveAttribute("aria-pressed", "true");
  });

  test("I12 tap pins a spec (focus), I19 music card buttons reachable, ⌘K opens from the search icon", async ({ page }) => {
    await page.goto("/");
    await page.locator('.spec[data-spec="docker"]').tap();
    await expect(page.locator('.spec[data-spec="docker"]')).toBeFocused();
    await page.getByRole("button", { name: "Open command palette", exact: true }).tap();
    await expect(page.getByRole("dialog", { name: "Command palette" })).toBeVisible();
    await page.goto("/notesbyaryan");
    await expect(page.getByRole("link", { name: /watch on instagram/i }).first()).toBeVisible();
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });

  test("loops stop, typing and counting are skipped", async ({ page }) => {
    await page.goto("/notesbyaryan");
    expect(await page.locator(".vinyl-disc").evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
    expect(await page.locator(".music-float").first().evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
    await page.goto("/");
    await page.locator(".terminal").scrollIntoViewIfNeeded();
    await expect(page.locator(".terminal")).toContainText("open to new roles");
    await expect(page.locator(".hl-card").first()).toContainText("14+");
    // Key-phrase highlight is invisible at rest (it only sweeps in on hover).
    expect(await page.locator(".marker").first().evaluate((el) => getComputedStyle(el).backgroundSize)).toBe("0% 100%");
    expect(await page.locator(".status-dot").first().evaluate((el) => getComputedStyle(el, "::after").animationName)).toBe("none");
  });
});

test("no `transition: all` and no ease-in in the shipped CSS", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator('link[rel="stylesheet"]').evaluateAll((ls) => ls.map((l) => (l as HTMLLinkElement).href));
  const css = (await Promise.all(hrefs.map(async (h) => (await request.get(h)).text()))).join("\n");
  expect(css).not.toMatch(/transition:\s*all/);
  expect(css).not.toMatch(/(^|[\s,:])ease-in(?!-out)[\s;,)]/);
});

test("looping sections pause when offscreen", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.locator("section.spot")).toHaveAttribute("data-paused", "");
});
