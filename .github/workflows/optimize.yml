name: Website Optimization with Advanced Steps

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  optimize:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: |
          npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant cssnano terser purgecss sharp lighthouse @lighthouse-ci/cli critical

      # Resize images (example: resize all images to max width 1200px)
      - name: Resize images with Sharp
        run: |
          mkdir -p optimized/resized-images
          node -e "
            const sharp = require('sharp');
            const fs = require('fs');
            const path = require('path');
            const inputDir = 'images';
            const outputDir = 'optimized/resized-images';
            fs.readdirSync(inputDir).forEach(file => {
              const ext = path.extname(file).toLowerCase();
              if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                sharp(path.join(inputDir, file))
                  .resize({ width: 1200 })
                  .toFile(path.join(outputDir, file))
                  .catch(console.error);
              }
            });
          "

      # Optimize resized images
      - name: Optimize resized images
        run: |
          mkdir -p optimized/images
          imagemin "optimized/resized-images/*.{jpg,jpeg,png}" --plugin=mozjpeg --plugin=pngquant --out-dir=optimized/images

      # Minify CSS
      - name: Minify CSS
        run: |
          mkdir -p optimized/css
          for file in css/*.css; do
            npx cssnano "$file" "optimized/css/$(basename $file)"
          done

      # Minify JS
      - name: Minify JS
        run: |
          mkdir -p optimized/js
          for file in js/*.js; do
            npx terser "$file" -o "optimized/js/$(basename $file)" --compress --mangle
          done

      # Purge unused CSS
      - name: Purge unused CSS
        run: |
          npx purgecss --css css/*.css --content index.html --output optimized/css/purged

      # Extract critical CSS (for index.html example)
      - name: Extract Critical CSS
        run: |
          npx critical index.html --inline --minify --extract --base ./ --dest optimized/index.html

      # Cache busting (add hash to CSS and JS filenames)
      - name: Cache Busting - Add hashes to CSS & JS files
        run: |
          mkdir -p optimized/hash-css optimized/hash-js
          for file in optimized/css/*.css; do
            HASH=$(sha256sum "$file" | cut -c1-8)
            BASENAME=$(basename "$file" .css)
            cp "$file" "optimized/hash-css/${BASENAME}.${HASH}.css"
          done
          for file in optimized/js/*.js; do
            HASH=$(sha256sum "$file" | cut -c1-8)
            BASENAME=$(basename "$file" .js)
            cp "$file" "optimized/hash-js/${BASENAME}.${HASH}.js"
          done

      # Run Lighthouse CI for audit (on index.html served via a simple HTTP server)
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          npx http-server -p 8080 &
          sleep 5
          lhci autorun --url=http://localhost:8080/index.html --upload.target=temporary-public-storage

      # Optional: Commit optimized files
      - name: Commit optimized files
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "GitHub Actions Bot"
          git add optimized/
          git commit -m "Add advanced website optimizations"
          git push
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
