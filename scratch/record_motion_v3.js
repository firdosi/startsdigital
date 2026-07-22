import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outputFolder = path.join(rootDir, 'motion-review-v3-20260722-1000');

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// Static HTTP Server
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

server.listen(3360, async () => {
  console.log('Serving for Motion V3 recording at http://localhost:3360/startsdigital/');

  const browser = await chromium.launch();

  // -------------------------------------------------------------
  // A. VIDEO CONTEXT 1: Desktop Homepage Motion (Continuous Scroll ~20s)
  // -------------------------------------------------------------
  {
    console.log('Recording Desktop Homepage Motion MP4...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: {
        dir: outputFolder,
        size: { width: 1440, height: 900 },
      },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3360/startsdigital/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500); // Initial hero entrance

    // Smooth continuous scroll over 20s
    await page.evaluate(async () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const duration = 20000; // 20 seconds
      const startTime = performance.now();

      await new Promise((resolve) => {
        function step(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          window.scrollTo(0, totalHeight * progress);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            resolve(true);
          }
        }
        requestAnimationFrame(step);
      });
    });

    await page.waitForTimeout(1000);

    const video = page.video();
    await context.close();
    if (video) {
      await video.saveAs(path.join(outputFolder, 'desktop-homepage-motion.mp4'));
    }
  }

  // -------------------------------------------------------------
  // A. VIDEO CONTEXT 2: Mobile Homepage Motion (Continuous Scroll ~28s)
  // -------------------------------------------------------------
  {
    console.log('Recording Mobile Homepage Motion MP4...');
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
    await page.goto('http://localhost:3360/startsdigital/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Smooth continuous scroll over 28s
    await page.evaluate(async () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const duration = 28000; // 28 seconds
      const startTime = performance.now();

      await new Promise((resolve) => {
        function step(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          window.scrollTo(0, totalHeight * progress);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            resolve(true);
          }
        }
        requestAnimationFrame(step);
      });
    });

    await page.waitForTimeout(1000);

    const video = page.video();
    await context.close();
    if (video) {
      await video.saveAs(path.join(outputFolder, 'mobile-homepage-motion.mp4'));
    }
  }

  // -------------------------------------------------------------
  // A. VIDEO CONTEXT 3: Desktop Navigation & Interactions
  // -------------------------------------------------------------
  {
    console.log('Recording Desktop Navigation & Interactions MP4...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: {
        dir: outputFolder,
        size: { width: 1440, height: 900 },
      },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3360/startsdigital/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // View transitions route navigation loop: Home -> Services -> Work -> About -> Contact -> Home
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

    // Scroll smoothly to Working Method section
    await page.evaluate(() => {
      document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1200);

    const stage2 = page.locator('.accordion-item[data-accordion-id="02"] .accordion-toggle');
    if (await stage2.count() > 0) {
      await stage2.click();
      await page.waitForTimeout(1000);
    }

    // Scroll smoothly to FAQ section
    await page.evaluate(() => {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1200);

    const faq2 = page.locator('#faq-list .faq-item:nth-child(2) button');
    if (await faq2.count() > 0) {
      await faq2.click();
      await page.waitForTimeout(1000);
    }

    const video = page.video();
    await context.close();
    if (video) {
      await video.saveAs(path.join(outputFolder, 'desktop-navigation-and-interactions.mp4'));
    }
  }

  // -------------------------------------------------------------
  // B. SCREENSHOT CONTEXT (No Video Recording, Dedicated Context)
  // -------------------------------------------------------------
  {
    console.log('Capturing Desktop & Mobile Final Full-Page Screenshots...');
    const context = await browser.newContext();

    // 1. Desktop Full-Page Screenshot
    {
      const page = await context.newPage();
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('http://localhost:3360/startsdigital/', { waitUntil: 'networkidle' });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);

      // Temporarily set sticky header to static so it doesn't repeat on fullPage capture
      await page.evaluate(() => {
        const header = document.getElementById('main-header');
        if (header) header.style.position = 'static';
      });

      await page.screenshot({ path: path.join(outputFolder, 'desktop-final.png'), fullPage: true });
      await page.close();
    }

    // 2. Mobile Full-Page Screenshot
    {
      const page = await context.newPage();
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('http://localhost:3360/startsdigital/', { waitUntil: 'networkidle' });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);

      await page.evaluate(() => {
        const header = document.getElementById('main-header');
        if (header) header.style.position = 'static';
      });

      await page.screenshot({ path: path.join(outputFolder, 'mobile-final.png'), fullPage: true });
      await page.close();
    }

    await context.close();
  }

  await browser.close();
  server.close();
  console.log('\nMotion V3 recording completed successfully in:', outputFolder);
  process.exit(0);
});
