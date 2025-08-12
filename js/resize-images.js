const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.resolve("optimized/images");

if (!fs.existsSync(inputDir)) {
  console.log("Images directory does not exist:", inputDir);
  process.exit(0);
}

const sizes = [320, 640, 1024, 1920];

fs.readdirSync(inputDir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const baseName = path.basename(file, ext);

  sizes.forEach((size) => {
    const outputDir = path.join(inputDir, `${size}w`);
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    sharp(path.join(inputDir, file))
      .resize(size)
      .toFile(path.join(outputDir, `${baseName}_${size}w${ext}`))
      .then(() => console.log(`Created: ${baseName}_${size}w${ext}`))
      .catch((err) => console.error("Error processing", file, err));
  });
});
