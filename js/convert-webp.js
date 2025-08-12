const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.resolve("optimized/images");

if (!fs.existsSync(inputDir)) {
  console.log("Images directory does not exist:", inputDir);
  process.exit(0);
}

fs.readdirSync(inputDir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const outputFile = path.join(inputDir, file.replace(ext, ".webp"));

  sharp(path.join(inputDir, file))
    .toFormat("webp")
    .toFile(outputFile)
    .then(() => console.log(`Converted to WebP: ${outputFile}`))
    .catch((err) => console.error("Error converting", file, err));
});
