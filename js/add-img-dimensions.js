const fs = require("fs");
const path = require("path");
const glob = require("glob");
const sharp = require("sharp");
const cheerio = require("cheerio");

const projectRoot = path.resolve("."); // current project directory

async function addImageDimensionsToFile(file) {
  let content = fs.readFileSync(file, "utf8");
  const $ = cheerio.load(content, { decodeEntities: false });
  let modified = false;

  $("img").each(function () {
    const $img = $(this);
    if ($img.attr("width") && $img.attr("height")) return; // skip if already present

    let src = $img.attr("src");
    if (!src) return;

    // Make src absolute relative to the current file
    const imgPath = path.resolve(path.dirname(file), src);

    if (fs.existsSync(imgPath)) {
      try {
        const metadata = sharp(imgPath).metadata
          ? sharp(imgPath).metadata()
          : null;

        // Use async metadata call to get width and height
        metadata
          .then((meta) => {
            if (meta && meta.width && meta.height) {
              $img.attr("width", meta.width);
              $img.attr("height", meta.height);
              modified = true;

              fs.writeFileSync(file, $.html(), "utf8");
              console.log(`Added dimensions to ${src} in ${file}`);
            }
          })
          .catch((err) => {
            console.warn(`Error reading metadata for ${imgPath}:`, err.message);
          });
      } catch (err) {
        console.warn(`Error processing ${imgPath}:`, err.message);
      }
    }
  });

  if (modified) {
    fs.writeFileSync(file, $.html(), "utf8");
  }
}

async function main() {
  const htmlFiles = glob.sync(`${projectRoot}/**/*.{html,php}`, {
    nodir: true,
  });

  for (const file of htmlFiles) {
    await addImageDimensionsToFile(file);
  }
  console.log("✅ Completed adding image dimensions.");
}

main();
