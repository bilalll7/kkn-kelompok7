import { test, expect } from "@playwright/test";
import { members } from "../src/data/team";
import fs from "node:fs";
test("all member records, routes and responsive profiles",async({page,request})=>{
 test.setTimeout(120000);
 expect(members).toHaveLength(13);
 expect(new Set(members.map(m=>m.slug)).size).toBe(13);
 expect(new Set(members.map(m=>m.nim)).size).toBe(13);
 const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
 for(const member of members){
  expect(fs.existsSync("public"+member.image)).toBe(true);
  const response=await page.goto("/tentang/anggota/"+member.slug);
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText(member.name);
  await expect(page.locator(".member-copy")).toContainText(member.nim);
  await expect(page).toHaveTitle(new RegExp(member.name));
  for(const width of [375,768,1440]){
   await page.setViewportSize({width,height:900});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
 expect((await request.get("/tentang/anggota/tidak-ada")).status()).toBe(404);
 await page.goto("/tentang");
 await expect(page.locator(".member-card")).toHaveCount(13);
 await page.locator(".member-card").last().click();
 await expect(page.locator("h1")).toHaveText("Keisha Andhara Patricia L");
 await page.getByRole("link",{name:/Berikutnya/}).click();
 await expect(page.locator("h1")).toHaveText(members[0].name);
 await page.getByRole("link",{name:/Sebelumnya/}).click();
 await expect(page.locator("h1")).toHaveText(members[12].name);
 await page.getByRole("link",{name:"Semua anggota",exact:true}).click();
 await expect(page).toHaveURL(/\/tentang#anggota$/);
 expect(errors).toEqual([]);
});
