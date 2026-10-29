import { test, expect } from "@playwright/test";
test("intro appears once per tab and expires",async({page})=>{
 await page.emulateMedia({reducedMotion:"no-preference"});
 await page.goto("/",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".intro-logo")).toBeVisible();
 await expect(page.locator(".intro-logo")).toBeHidden({timeout:3000});
 await page.reload();
 await expect(page.locator(".intro-logo")).toBeHidden();
});
test("intro respects reduced motion",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.goto("/");
 await expect(page.locator(".intro-logo")).toBeHidden();
 await page.keyboard.press("Tab");
 await expect(page.locator(".skip-link")).toBeFocused();
});
