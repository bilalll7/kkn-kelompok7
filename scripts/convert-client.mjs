import fs from "node:fs/promises";
import convert from "heic-convert";
import sharp from "sharp";
const root = "public/images/client-assets";
const files = (await fs.readdir(root)).sort((a, b) => a.localeCompare(b));
for (const [i, name] of files.entries()) {
  if (!/\.hei[cf]$/i.test(name)) continue;
  try {
    const buffer = await convert({
      buffer: await fs.readFile(`${root}/${name}`),
      format: "JPEG",
      quality: 1,
    });
    await sharp(buffer)
      .rotate()
      .resize({
        width: 1800,
        height: 1800,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 88 })
      .toFile(`public/images/documentation/heic-${i}.webp`);
    console.log(i, name);
  } catch (e) {
    console.log("FAILED", name, e.message);
  }
}
