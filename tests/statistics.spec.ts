import { test, expect } from "@playwright/test";
const expected = ["1.713", "479", "11", "2"];
test("statistics count once and preserve layout", async ({page}) => {
 await page.emulateMedia({reducedMotion:"no-preference"});
 await page.goto("/");
 const values=page.locator(".stats-grid dd [aria-hidden]");
 await expect(values).toHaveText(["0","0","0","0"]);
 await page.locator(".statistics").scrollIntoViewIfNeeded();
 await expect(values).toHaveText(expected);
 await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
 await page.locator(".statistics").scrollIntoViewIfNeeded();
 await expect(values).toHaveText(expected);
 for(const width of [375,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});
test("statistics final values with reduced motion and without JavaScript",async({browser})=>{
 for(const javaScriptEnabled of [true,false]){
  const context=await browser.newContext({javaScriptEnabled,reducedMotion:"reduce"});
  const page=await context.newPage();
  await page.goto("http://127.0.0.1:3017/");
  await expect(page.locator(".stats-grid dd [aria-hidden]")).toHaveText(expected);
  await expect(page.locator(".stats-grid .sr-only")).toHaveText(expected);
  await context.close();
 }
});
