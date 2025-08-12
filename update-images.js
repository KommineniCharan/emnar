const fs = require("fs");
const path = require("path");

const dir = "./"; // project root

function replaceImgTags(content) {
  return content.replace(
    /<img\s+([^>]*?)src="images\/([^"]+)\.(jpg|jpeg|png)"([^>]*)>/gi,
    (match, beforeSrc, fileBase, ext, afterSrc) => {
      const sizes = [320, 640, 1024, 1920];
      const webpSrcset = sizes
        .map((size) => `images/${size}w/${fileBase}_${size}w.webp ${size}w`)
        .join(", ");
      const originalSrcset = sizes
        .map((size) => `images/${size}w/${fileBase}_${size}w.${ext} ${size}w`)
        .join(", ");

      // Preserve indentation
      const indent = match.match(/^\s*/)[0] || "";

      return `${indent}<picture>
${indent}  <source type="image/webp" srcset="${webpSrcset}" sizes="(max-width: 600px) 320px, (max-width: 900px) 640px, (max-width: 1200px) 1024px, 1920px">
${indent}  <source type="image/${ext}" srcset="${originalSrcset}" sizes="(max-width: 600px) 320px, (max-width: 900px) 640px, (max-width: 1200px) 1024px, 1920px">
${indent}  <img ${beforeSrc}src="images/${fileBase}.${ext}"${afterSrc}>
${indent}</picture>`;
    }
  );
}

function processFiles(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processFiles(filePath);
    } else if (/\.(php|html)$/i.test(file)) {
      let content = fs.readFileSync(filePath, "utf8");
      const newContent = replaceImgTags(content);
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Updated: ${filePath}`);
      }
    }
  });
}

processFiles(dir);
