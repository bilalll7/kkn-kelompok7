import { test, expect } from "@playwright/test";
test("carousel manual, keyboard, swipe and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Dokumentasi kegiatan" });
  await expect(carousel.locator(".carousel-caption")).toContainText("1 / 5");
  await carousel.getByRole("button", { name: "Foto berikutnya" }).click();
  await expect(carousel.locator(".carousel-caption")).toContainText("2 / 5");
  await page.keyboard.press("ArrowRight");
  await expect(carousel.locator(".carousel-caption")).toContainText("3 / 5");
  await carousel.evaluate((el) => {
    const start = new Touch({
      identifier: 1,
      target: el,
      clientX: 250,
      clientY: 100,
    });
    el.dispatchEvent(
      new TouchEvent("touchstart", { bubbles: true, touches: [start] }),
    );
    const end = new Touch({
      identifier: 1,
      target: el,
      clientX: 100,
      clientY: 105,
    });
    el.dispatchEvent(
      new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }),
    );
  });
  await expect(carousel.locator(".carousel-caption")).toContainText("4 / 5");
  await expect(
    carousel.getByRole("button", { name: "Jeda putar otomatis" }),
  ).toBeDisabled();
  await page.locator(".counter-grid").first().scrollIntoViewIfNeeded();
  await expect(page.locator(".counter-grid").first()).toContainText("75,56%");
});
test("autoplay pauses on hover, keyboard focus and explicit pause", async ({
  page,
}) => {
  test.setTimeout(45000);
  await page.goto("/");
  await page.mouse.move(0, 0);
  const c = page.locator(".hero-carousel");
  const caption = c.locator(".carousel-caption");
  await expect(caption).toContainText("2 / 5", { timeout: 8000 });
  await c.hover();
  await page.waitForTimeout(5300);
  await expect(caption).toContainText("2 / 5");
  await c.getByRole("button", { name: "Foto berikutnya" }).focus();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(5300);
  await expect(caption).toContainText("2 / 5");
  await c.getByRole("button", { name: "Jeda putar otomatis" }).click();
  await page.locator("h1").click();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(5300);
  await expect(caption).toContainText("2 / 5");
});
test("motion layouts and counter final values", async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.locator(".counter-grid").first().scrollIntoViewIfNeeded();
  await expect(
    page.locator(".counter-grid dd [aria-hidden]").last(),
  ).toHaveText("75,56%", { timeout: 4000 });
  await page.screenshot({
    path: "test-results/motion-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/motion-mobile.png" });
});
