// js/convert-webp.js
const { exec } = require("child_process");
const path = require("path");
const glob = require("glob");
const fs = require("fs");
const { ImagePool } = require("@squoosh/lib");
const imagePool = new ImagePool();

(async () => {
  const projectRoot = path.resolve(".");
  const imageFiles = glob.sync("**/images/**/*.{jpg,jpeg,png}", {
    cwd: projectRoot,
    nodir: true,
    absolute: true, // absolute for reading
  });

  console.log(`Found ${imageFiles.length} images to convert to WebP`);

  for (const filePath of imageFiles) {
    try {
      const ext = path.extname(filePath).toLowerCase();
      const baseName = path.basename(filePath, ext);
      const dir = path.dirname(filePath);
      const outputPath = path.join(dir, `${baseName}.webp`);

      const image = imagePool.ingestImage(fs.readFileSync(filePath));
      await image.encode({ webp: {} });
      const webpBuffer = (await image.encodedWith.webp).binary;
      fs.writeFileSync(outputPath, webpBuffer);

      console.log(`Converted: ${outputPath}`);
    } catch (err) {
      console.error(`Error converting ${filePath}:`, err);
    }
  }

  await imagePool.close();
})();
