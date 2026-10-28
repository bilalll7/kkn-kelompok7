import { chromium, expect } from "@playwright/test";
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      failures.push(`${response.status()} ${response.url()}`);
  });
  page.on("requestfailed", (request) =>
    failures.push(`${request.failure()?.errorText} ${request.url()}`),
  );
  const response = await page.goto(
    process.env.PREVIEW_URL || "http://127.0.0.1:3017",
    { waitUntil: "networkidle" },
  );
  for (const img of await page.locator("img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate((image) => image.complete && image.naturalWidth > 0),
      )
      .toBe(true);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  console.log(
    JSON.stringify(
      {
        status: response.status(),
        title: await page.title(),
        failures,
        images: await page.locator("img").evaluateAll((images) =>
          images.map((image) => ({
            alt: image.alt,
            complete: image.complete,
            width: image.naturalWidth,
          })),
        ),
      },
      null,
      2,
    ),
  );
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.screenshot({ path: "test-results/home-desktop-viewport.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await page.screenshot({ path: "test-results/home-mobile-viewport.png" });
  await page.getByRole("button", { name: "Buka menu" }).click();
  console.log(
    "Menu expanded:",
    await page
      .getByRole("button", { name: /menu/ })
      .getAttribute("aria-expanded"),
  );
} finally {
  await browser.close();
}
