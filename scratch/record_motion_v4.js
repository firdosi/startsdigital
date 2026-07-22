import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const folderName = `motion-review-v4-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
const outputDir = path.join(rootDir, folderName);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Simple static HTTP server serving the built site
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

server.listen(3365, async () => {
  console.log(`=== Recording Motion Review Videos to ${folderName} ===\n`);
  const browser = await chromium.launch();

  const sectionsToReview = [
    { id: 'hero', name: 'Hero' },
    { id: 'services', name: 'Services' },
    { id: 'about', name: 'Why Starts Digital' },
    { id: 'process', name: 'Working Method' },
    { id: 'manifesto', name: 'Manifesto' },
    { id: 'work', name: 'Featured Work' },
    { id: 'results', name: 'Results' },
    { id: 'operator', name: 'About Operator' },
    { id: 'platforms', name: 'Platforms' },
    { id: 'faq', name: 'FAQ' },
    { id: 'contact', name: 'Final CTA' },
  ];

  // 1. Desktop Scroll-Trigger Review Recording
  console.log('Recording desktop-scroll-trigger-review.mp4...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1440, height: 900 },
    },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3365/', { waitUntil: 'networkidle' });

  // Pause at Hero entrance
  await desktopPage.waitForTimeout(1500);

  // Smooth step-by-step section scroll
  const sectionIds = ['services', 'about', 'process', 'work', 'results', 'operator', 'platforms', 'faq', 'contact'];
  for (const id of sectionIds) {
    await desktopPage.evaluate((targetId) => {
      const el = document.getElementById(targetId) || document.querySelector(`section:has(#${targetId})`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, id);
    // Pause before and after section entrance animation completes
    await desktopPage.waitForTimeout(1400);
  }

  const desktopVideo = await desktopPage.video();
  await desktopPage.close();
  await desktopContext.close();
  if (desktopVideo) {
    const desktopVideoPath = await desktopVideo.path();
    fs.renameSync(desktopVideoPath, path.join(outputDir, 'desktop-scroll-trigger-review.mp4'));
    console.log(`Saved: ${folderName}/desktop-scroll-trigger-review.mp4`);
  }

  // 2. Mobile Scroll-Trigger Review Recording
  console.log('Recording mobile-scroll-trigger-review.mp4...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    recordVideo: {
      dir: outputDir,
      size: { width: 375, height: 812 },
    },
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3365/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);

  for (const id of sectionIds) {
    await mobilePage.evaluate((targetId) => {
      const el = document.getElementById(targetId) || document.querySelector(`section:has(#${targetId})`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, id);
    await mobilePage.waitForTimeout(1200);
  }

  const mobileVideo = await mobilePage.video();
  await mobilePage.close();
  await mobileContext.close();
  if (mobileVideo) {
    const mobileVideoPath = await mobileVideo.path();
    fs.renameSync(mobileVideoPath, path.join(outputDir, 'mobile-scroll-trigger-review.mp4'));
    console.log(`Saved: ${folderName}/mobile-scroll-trigger-review.mp4`);
  }

  // 3. Desktop Navigation Lifecycle Review Recording
  console.log('Recording desktop-navigation-review.mp4...');
  const navContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1440, height: 900 },
    },
  });
  const navPage = await navContext.newPage();
  await navPage.goto('http://localhost:3365/', { waitUntil: 'networkidle' });
  await navPage.waitForTimeout(1200);

  // Navigate through pages via header navigation
  const routes = ['/services/', '/work/', '/about/', '/contact/', '/'];
  for (const route of routes) {
    await navPage.click(`nav a[href$="${route}"]`);
    await navPage.waitForTimeout(1200);
  }

  // Demonstrate accordion interaction on homepage
  await navPage.evaluate(() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }));
  await navPage.waitForTimeout(1000);
  const stage2Btn = navPage.locator('.accordion-item[data-accordion-id="02"] .accordion-toggle');
  await stage2Btn.click();
  await navPage.waitForTimeout(1000);

  const navVideo = await navPage.video();
  await navPage.close();
  await navContext.close();
  if (navVideo) {
    const navVideoPath = await navVideo.path();
    fs.renameSync(navVideoPath, path.join(outputDir, 'desktop-navigation-review.mp4'));
    console.log(`Saved: ${folderName}/desktop-navigation-review.mp4`);
  }

  await browser.close();
  server.close();

  console.log(`\nAll 3 review videos recorded successfully into folder: ${folderName}\n`);
  process.exit(0);
});
