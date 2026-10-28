// One-time preservation of the already-used, licensed illustration photos.
// This does not download or label any client documentation.
import { request } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const preview = process.env.ASSET_PREVIEW_URL;
if (!preview)
  throw new Error(
    "Set ASSET_PREVIEW_URL to the running image-enabled preview.",
  );
const sources = {
  community: "photo-1526739473439-bd18f05d4f43",
  nature: "photo-1552301726-fba9cdb27083",
  fields: "photo-1543449131-35044d59760d",
  craft: "photo-1695815870444-da67db99d7c0",
  village: "photo-1573397942508-6e4d9d97a8a0",
};
await mkdir("public/images/illustrations", { recursive: true });
const client = await request.newContext();
try {
  for (const [name, id] of Object.entries(sources)) {
    const source = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=85`;
    const url = `${preview}/_next/image?url=${encodeURIComponent(source)}&w=1920&q=75`;
    const response = await client.get(url, { timeout: 60000 });
    if (
      !response.ok() ||
      !response.headers()["content-type"]?.startsWith("image/")
    )
      throw new Error(`${name}: image download failed (${response.status()})`);
    const result = await sharp(await response.body())
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(`public/images/illustrations/${name}.webp`);
    console.log(
      `${name}: ${result.width} × ${result.height}, ${result.size} bytes`,
    );
  }
} finally {
  await client.dispose();
}
