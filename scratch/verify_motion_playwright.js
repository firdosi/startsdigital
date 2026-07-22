import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

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

server.listen(3356, async () => {
  console.log('Running Playwright Verification Suite...');
  const browser = await chromium.launch();

  const viewports = [
    { width: 1440, height: 900 },
    { width: 1024, height: 900 },
    { width: 768, height: 1024 },
    { width: 375, height: 812 },
  ];

  let testsPassed = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`✓ PASS: ${message}`);
      testsPassed++;
    } else {
      console.error(`✗ FAIL: ${message}`);
    }
  }

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: vp });
    await page.goto('http://localhost:3356/startsdigital/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 1. Verify No Horizontal Overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    assert(scrollWidth <= clientWidth + 1, `[${vp.width}x${vp.height}] No horizontal overflow (scrollWidth=${scrollWidth}, clientWidth=${clientWidth})`);

    await page.close();
  }

  // Deep functional motion verification on Desktop
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3356/startsdigital/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1400);

  // 2. Hero Content Sequence Completes
  const heroH1Revealed = await page.evaluate(() => {
    const h1 = document.querySelector('#hero h1');
    return h1 ? h1.classList.contains('is-motion-revealed') : false;
  });
  assert(heroH1Revealed, 'Hero headline clip-up sequence completes and receives is-motion-revealed');

  // 3. Counter Final Values
  await page.evaluate(() => document.getElementById('hero')?.scrollIntoView());
  await page.waitForTimeout(1500);
  const counters = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-counter-target]')).map(el => el.textContent?.trim());
  });
  assert(counters.includes('PKR 30M+'), 'Counters finish at exact text PKR 30M+');
  assert(counters.includes('29,000+'), 'Counters finish at exact text 29,000+');
  assert(counters.includes('PKR 4.2M+'), 'Counters finish at exact text PKR 4.2M+');
  assert(counters.includes('More Than 150'), 'Counters finish at exact text More Than 150');

  // 4. Working Method Accordion
  await page.evaluate(() => document.getElementById('process')?.scrollIntoView());
  await page.waitForTimeout(600);
  const stage2Btn = page.locator('.accordion-item[data-accordion-id="02"] .accordion-toggle');
  await stage2Btn.click();
  await page.waitForTimeout(400);
  const stage2Open = await page.evaluate(() => {
    const item = document.querySelector('.accordion-item[data-accordion-id="02"]');
    return item ? item.classList.contains('bg-[#ff762b]') : false;
  });
  assert(stage2Open, 'Working method accordion stage 2 opens smoothly and transitions colors');

  // 5. FAQ Accordion
  await page.evaluate(() => document.getElementById('faq')?.scrollIntoView());
  await page.waitForTimeout(600);
  const faq2Btn = page.locator('#faq-list .faq-item:nth-child(2) button');
  await faq2Btn.click();
  await page.waitForTimeout(400);
  const faq2Open = await page.evaluate(() => {
    const btn = document.querySelector('#faq-list .faq-item:nth-child(2) button');
    return btn ? btn.getAttribute('aria-expanded') === 'true' : false;
  });
  assert(faq2Open, 'FAQ item 2 expands and rotates icon');

  await page.close();

  // 6. Reduced Motion Mode Verification
  const reducedMotionPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  });
  await reducedMotionPage.emulateMedia({ reducedMotion: 'reduce' });
  await reducedMotionPage.goto('http://localhost:3356/startsdigital/', { waitUntil: 'networkidle' });
  await reducedMotionPage.waitForTimeout(500);

  const reducedMotionStyles = await reducedMotionPage.evaluate(() => {
    const marquee = document.querySelector('.animate-marquee-left');
    const orb = document.querySelector('.animate-pulse-glow');
    return {
      marqueeAnim: marquee ? getComputedStyle(marquee).animationName : 'none',
      orbAnim: orb ? getComputedStyle(orb).animationName : 'none',
    };
  });
  assert(
    reducedMotionStyles.marqueeAnim === 'none',
    'prefers-reduced-motion: reduce disables continuous marquee movement'
  );

  await browser.close();
  server.close();
  console.log(`\nVerification Summary: ${testsPassed}/${totalTests} tests passed.`);
  process.exit(testsPassed === totalTests ? 0 : 1);
});
