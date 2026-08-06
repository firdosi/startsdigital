import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '../..');
const DIST = join(ROOT, 'dist');
const OUTPUT_DIR = 'C:\\Users\\BGF\\OneDrive\\Documents\\StartsDigital\\scratch\\release-review-tools-brands-2026-08-06';

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

async function main() {
  // Start static file server for dist
  const server = createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath.startsWith('/startsdigital/')) {
      reqPath = reqPath.substring('/startsdigital'.length);
    } else if (reqPath === '/startsdigital') {
      reqPath = '/';
    }
    if (reqPath.endsWith('/')) reqPath += 'index.html';
    let filePath = join(DIST, reqPath);

    if (!existsSync(filePath) && existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }

    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = join(filePath, 'index.html');
    }

    if (!existsSync(filePath)) {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(readFileSync(filePath));
  });

  await new Promise(resolve => server.listen(4399, resolve));
  console.log('Preview server running on port 4399');

  const browser = await chromium.launch({ headless: true });

  const captureSection = async (viewportWidth, sectionId, filename) => {
    const context = await browser.newContext({
      viewport: { width: viewportWidth, height: 1000 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('http://localhost:4399/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const section = page.locator(`#${sectionId}`);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Force eager loading on all images inside section
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.querySelectorAll('img').forEach(img => {
        img.loading = 'eager';
      });
    }, sectionId);

    // Wait for images to load cleanly
    const failedImgs = await page.evaluate(async (id) => {
      const el = document.getElementById(id);
      if (!el) return ['Element not found'];
      const imgs = Array.from(el.querySelectorAll('img'));
      const failed = [];
      await Promise.all(imgs.map(img => {
        if (img.complete) {
          if (img.naturalWidth === 0) failed.push(img.src);
          return;
        }
        return new Promise(resolve => {
          img.onload = () => {
            if (img.naturalWidth === 0) failed.push(img.src);
            resolve();
          };
          img.onerror = () => {
            failed.push(img.src);
            resolve();
          };
        });
      }));
      return failed;
    }, sectionId);

    if (failedImgs.length > 0) {
      console.error(`[ERROR] Images inside #${sectionId} failed to load cleanly:`, failedImgs);
      process.exit(1);
    }

    // Disable CSS animations & transitions inside section
    await page.evaluate((id) => {
      const style = document.createElement('style');
      style.textContent = `#${id} *, #${id} { animation: none !important; transition: none !important; }`;
      document.head.appendChild(style);
    }, sectionId);

    await page.waitForTimeout(500);

    const outPath = join(OUTPUT_DIR, filename);
    await section.screenshot({ path: outPath });
    console.log(`Captured: ${filename} (${statSync(outPath).size} bytes)`);

    await context.close();
  };

  // Capture Pre-Merge Visual Gate Screenshots
  console.log('Capturing Pre-Merge Visual Gate Screenshots...');
  await captureSection(1440, 'brand-logos', 'premerge-brand-wall-1440.png');
  await captureSection(390, 'brand-logos', 'premerge-brand-wall-390.png');
  await captureSection(1440, 'platforms', 'premerge-tools-1440.png');
  await captureSection(390, 'platforms', 'premerge-tools-390.png');

  await browser.close();
  server.close();
  console.log('Pre-merge screenshot capture completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
