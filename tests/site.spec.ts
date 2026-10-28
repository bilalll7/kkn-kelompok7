import { test, expect } from "@playwright/test";

test("all routes render without page errors and without overflow", async ({
  page,
}) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const paths = [
    "/",
    "/tentang",
    "/profil",
    "/pemerintahan",
    "/potensi",
    "/berita",
    "/berita/merawat-lingkungan-bersama",
    "/galeri",
    "/kontak",
  ];
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

test("mobile menu supports navigation and Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Buka menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Navigasi seluler" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Buka menu" })).toBeFocused();
  await page.getByRole("button", { name: "Buka menu" }).click();
  await page
    .getByRole("navigation", { name: "Navigasi seluler" })
    .getByRole("link", { name: "Profil Wilayah" })
    .click();
  await expect(page).toHaveURL(/\/profil$/);
  await expect(page.getByRole("button", { name: "Buka menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("news categories and article details work", async ({ page }) => {
  await page.goto("/berita");
  await page.getByRole("button", { name: "KKN", exact: true }).click();
  await expect(page.locator(".news-list .article-card")).toHaveCount(1);
  await page
    .locator(".news-list")
    .getByRole("link", { name: "Catatan perjalanan Kelompok 7" })
    .click();
  await expect(page.locator("h1")).toContainText(
    "Catatan perjalanan Kelompok 7",
  );
  await expect(page.locator(".article-heading")).toContainText(
    "Menunggu verifikasi",
  );
  await expect(page.locator(".article-heading time")).toHaveCount(0);
});

test("identity, seven navigation links, and separate RW profiles are present", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page).toHaveTitle(/KKN Berdampak — Sadang Serang/);
  await expect(page.locator("h1")).toContainText("Bergerak Bersama,");
  const nav = page.getByRole("navigation", { name: "Navigasi utama" });
  for (const label of [
    "Beranda",
    "Tentang Kami",
    "Profil Wilayah",
    "Program Kerja",
    "Kegiatan",
    "Galeri",
    "Kontak",
  ]) {
    const link = nav.getByRole("link", { name: label, exact: true });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page.locator("h1")).toHaveCount(1);
  }
  await page.goto("/profil");
  for (const id of ["rw-12", "rw-13"])
    await expect(page.locator(`#${id}`)).toContainText("Belum dikonfirmasi");
  await page.goto("/");
  await expect(page.locator(".timeline-pending")).toContainText(
    "Linimasa sedang disusun",
  );
});

test("legacy routes redirect and preserve access to existing content", async ({
  request,
}) => {
  for (const [source, destination] of [
    ["/pemerintahan", "/profil#pengurus"],
    ["/program-kerja", "/potensi"],
    ["/kegiatan", "/berita"],
    ["/tentang-kami", "/tentang"],
    ["/berita/ruang-belajar-digital-umkm", "/berita"],
    ["/berita/mengenal-potensi-pertanian", "/berita"],
  ]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
  }
  expect((await request.get("/berita/merawat-lingkungan-bersama")).ok()).toBe(
    true,
  );
});

test("gallery filters, arrow navigation, Escape, and focus restoration work", async ({
  page,
}) => {
  await page.goto("/galeri");
  await page.getByRole("button", { name: "RW 12", exact: true }).click();
  await expect(page.locator(".gallery-open")).toHaveCount(2);
  const first = page.locator(".gallery-open").first();
  await first.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-caption h2")).toContainText(
    "Menelusuri",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(first).toBeFocused();
});

test("contact never falsely reports successful submission", async ({
  page,
}) => {
  await page.goto("/kontak");
  await page.getByLabel("Nama lengkap").fill("Warga Contoh");
  await page.getByLabel("Email", { exact: true }).fill("warga@example.com");
  await page
    .getByLabel("Pesan", { exact: true })
    .fill("Saya ingin mengetahui informasi wilayah.");
  await page.getByRole("button", { name: "Periksa status pengiriman" }).click();
  await expect(page.getByRole("status")).toContainText("Pesan belum dikirim");
});

test("unknown article returns 404 and metadata routes exist", async ({
  page,
  request,
}) => {
  expect((await page.goto("/berita/tidak-ada"))?.status()).toBe(404);
  for (const path of ["/sitemap.xml", "/robots.txt", "/opengraph-image"])
    expect((await request.get(path)).ok()).toBe(true);
});

test("local illustrations load and remain explicitly identified as placeholders", async ({
  page,
}) => {
  await page.goto("/galeri");
  for (const photo of await page.locator(".gallery-grid img").all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        photo.evaluate(
          (image) =>
            (image as HTMLImageElement).complete &&
            (image as HTMLImageElement).naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await expect(page.locator(".gallery-grid .photo-notice")).toHaveCount(0);
});
