import { test, expect } from "@playwright/test";
test("mobile footer ends at document bottom and Instagram is available", async ({page}) => {
 const errors: string[] = [];
 page.on("pageerror", e => errors.push(e.message));
 for (const width of [375,390,768,1024,1440,1920]) {
  await page.setViewportSize({width,height:844});
  for (const route of ["/","/kontak"]) {
   await page.goto(route);
   await page.locator("footer").scrollIntoViewIfNeeded();
   await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
   const metrics=await page.evaluate(()=>{
    const footer=document.querySelector("footer")!;
    return {gap:document.documentElement.scrollHeight-(footer.getBoundingClientRect().bottom+scrollY),overflow:document.documentElement.scrollWidth>innerWidth,background:getComputedStyle(document.documentElement).backgroundColor};
   });
   expect(Math.abs(metrics.gap)).toBeLessThanOrEqual(1);
   expect(metrics.overflow).toBe(false);
   expect(metrics.background).toBe("rgb(21, 40, 67)");
   const link=page.locator('footer a[href="https://www.instagram.com/kkn7sadangserang/"]');
   await expect(link).toHaveCount(1);
   await expect(link).toBeVisible();
   await expect(page.locator(".footer-contact a")).toHaveCount(1);
   const bounds = await page.locator(".footer-contact").evaluate(el => { const p = el.querySelector("p")!.getBoundingClientRect(); const a = el.querySelector("a")!.getBoundingClientRect(); const box = el.getBoundingClientRect(); return {below: a.top >= p.bottom, fits: a.right <= box.right + 1}; });
   expect(bounds.below).toBe(true);
   expect(bounds.fits).toBe(true);
   await expect(link).toHaveAttribute("target","_blank");
   await expect(link).toHaveAttribute("rel","noopener noreferrer");
   await page.screenshot({path:`test-results/footer-${width}-${route==="/"?"home":"contact"}.png`});
  }
 }
 await expect(page.locator("form")).toHaveCount(0);
 expect(errors).toEqual([]);
});
