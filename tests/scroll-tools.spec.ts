import { test, expect } from "@playwright/test";
test("scroll tools work with reduced motion", async ({page}) => {
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.setViewportSize({width:375,height:844});
 await page.goto("/");
 const top=page.getByRole("button",{name:"Kembali ke atas"});
 await expect(top).toBeHidden();
 await page.keyboard.press("Tab");
 await expect(page.locator(".skip-link")).toBeFocused();
 await page.locator("footer").scrollIntoViewIfNeeded();
 await expect(top).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await top.click();
 await expect(page.locator("#main-content")).toBeFocused();
 await expect(page.locator(".skip-link")).not.toBeFocused();
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
 await expect(top).toBeHidden();
});
