import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outputFolder = path.join(rootDir, 'motion-review-v2-20260722-0945');

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// Simple HTTP static file server
const server = http.createServer((req, res) => {
  let reqUrl = req.url || '/';
  if (reqUrl.startsWith('/startsdigital')) reqUrl = reqUrl.replace('/startsdigital', '');
  if (reqUrl === '' || reqUrl === '/') reqUrl = '/index.html';

  let filePath = path.join(distDir, reqUrl);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };

  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(3359, async () => {
  console.log('Serving for motion V2 recording at http://localhost:3359/startsdigital/');

  const browser = await chromium.launch();

  // A. Desktop Homepage Motion Recording
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: {
        dir: outputFolder,
        size: { width: 1440, height: 900 },
      },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3359/startsdigital/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    for (let i = 0; i < 8; i++) {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(600);
    }
    await page.waitForTimeout(1200);

    await page.screenshot({ path: path.join(outputFolder, 'desktop-final.png'), fullPage: true });

    const video = page.video();
    await context.close();
    if (video) {
      await video.saveAs(path.join(outputFolder, 'desktop-homepage-motion.mp4'));
    }
  }

  // B. Mobile Homepage Motion Recording
  {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      recordVideo: {
        dir: outputFolder,
        size: { width: 375, height: 812 },
      },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3359/startsdigital/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, 450));
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(1000);

    await page.screenshot({ path: path.join(outputFolder, 'mobile-final.png'), fullPage: true });

    const video = page.video();
    await context.close();
    if (video) {
      await video.saveAs(path.join(outputFolder, 'mobile-homepage-motion.mp4'));
    }
  }

  // C. Desktop Navigation & Interactions Recording (ClientRouter Navigation Loop + Accordions)
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: {
        dir: outputFolder,
        size: { width: 1440, height: 900 },
      },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3359/startsdigital/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // ClientRouter navigation loop: Home -> Services -> Work -> About -> Contact -> Home
    await page.click('nav a[href$="/services/"]');
    await page.waitForTimeout(800);

    await page.click('nav a[href$="/work/"]');
    await page.waitForTimeout(800);

    await page.click('nav a[href$="/about/"]');
    await page.waitForTimeout(800);

    await page.click('nav a[href$="/contact/"]');
    await page.waitForTimeout(800);

    await page.click('nav a[href$="/"]');
    await page.waitForTimeout(1000);

    // Test Accordion interaction after navigation
    await page.evaluate(() => {
      document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);

    const stage2 = page.locator('.accordion-item[data-accordion-id="02"] .accordion-toggle');
    if (await stage2.count() > 0) {
      await stage2.click();
      await page.waitForTimeout(800);
    }

    const video = page.video();
    await context.close();
    if (video) {
      await video.saveAs(path.join(outputFolder, 'desktop-navigation-and-interactions.mp4'));
    }
  }

  await browser.close();
  server.close();
  console.log('Motion V2 recording completed successfully in:', outputFolder);
  process.exit(0);
});
