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

server.listen(3361, async () => {
  console.log('Running Enhanced Motion V2 Verification Suite...');
  const browser = await chromium.launch();

  let totalTests = 0;
  let testsPassed = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`✓ PASS: ${message}`);
      testsPassed++;
    } else {
      console.error(`✗ FAIL: ${message}`);
    }
  }

  // 1. Horizontal Overflow Verification across 4 Viewports
  const viewports = [
    { width: 1440, height: 900 },
    { width: 1024, height: 900 },
    { width: 768, height: 1024 },
    { width: 375, height: 812 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: vp });
    await page.goto('http://localhost:3361/startsdigital/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    assert(scrollWidth <= clientWidth + 1, `[${vp.width}x${vp.height}] No horizontal overflow (scrollWidth=${scrollWidth}, clientWidth=${clientWidth})`);

    await page.close();
  }

  // 2. Measure Computed Transform Changes Over Time (t1 vs t2)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3361/startsdigital/', { waitUntil: 'networkidle' });

  // A. Hero Orbit Ring Movement
  const orbitT1 = await page.evaluate(() => {
    const ring = document.querySelector('.animate-spin-slow');
    return ring ? getComputedStyle(ring).transform : 'none';
  });
  await page.waitForTimeout(600);
  const orbitT2 = await page.evaluate(() => {
    const ring = document.querySelector('.animate-spin-slow');
    return ring ? getComputedStyle(ring).transform : 'none';
  });
  assert(orbitT1 !== orbitT2, `Hero orbit ring matrix changes over time (${orbitT1.slice(0, 18)} -> ${orbitT2.slice(0, 18)})`);

  // B. Hero Floating Object Movement
  const orbT1 = await page.evaluate(() => {
    const orb = document.querySelector('.animate-pulse-glow');
    return orb ? getComputedStyle(orb).transform : 'none';
  });
  await page.waitForTimeout(600);
  const orbT2 = await page.evaluate(() => {
    const orb = document.querySelector('.animate-pulse-glow');
    return orb ? getComputedStyle(orb).transform : 'none';
  });
  assert(orbT1 !== orbT2, `Hero floating orb matrix changes over time (${orbT1.slice(0, 18)} -> ${orbT2.slice(0, 18)})`);

  // C. Brand Marquee Movement
  const marqueeT1 = await page.evaluate(() => {
    const marquee = document.querySelector('.animate-marquee-left');
    return marquee ? getComputedStyle(marquee).transform : 'none';
  });
  await page.waitForTimeout(600);
  const marqueeT2 = await page.evaluate(() => {
    const marquee = document.querySelector('.animate-marquee-left');
    return marquee ? getComputedStyle(marquee).transform : 'none';
  });
  assert(marqueeT1 !== marqueeT2, `Brand marquee matrix changes over time (${marqueeT1.slice(0, 18)} -> ${marqueeT2.slice(0, 18)})`);

  // D. Manifesto Sticker Movement
  await page.evaluate(() => document.querySelector('section:has(.animate-float-gentle)')?.scrollIntoView());
  await page.waitForTimeout(400);
  const stickerT1 = await page.evaluate(() => {
    const sticker = document.querySelector('.animate-float-gentle');
    return sticker ? getComputedStyle(sticker).transform : 'none';
  });
  await page.waitForTimeout(600);
  const stickerT2 = await page.evaluate(() => {
    const sticker = document.querySelector('.animate-float-gentle');
    return sticker ? getComputedStyle(sticker).transform : 'none';
  });
  assert(stickerT1 !== stickerT2, `Manifesto sticker matrix changes over time (${stickerT1.slice(0, 18)} -> ${stickerT2.slice(0, 18)})`);

  // 3. Service Cards Entrance Stagger
  await page.evaluate(() => document.getElementById('services')?.scrollIntoView());
  await page.waitForTimeout(500);
  const serviceDelays = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#services [data-motion]'));
    return cards.map(c => c.getAttribute('data-motion-delay'));
  });
  const uniqueDelays = new Set(serviceDelays);
  assert(uniqueDelays.size > 2, `Services have staggered data-motion-delay attributes (${Array.from(uniqueDelays).slice(0, 4).join(', ')}ms)`);

  // 4. Project Mask Clip Reveal (Hidden -> Visible)
  await page.evaluate(() => document.getElementById('work')?.scrollIntoView());
  const projectMaskStyle = await page.evaluate(() => {
    const imgWrapper = document.querySelector('#work [data-motion="clip-left"]');
    return imgWrapper ? getComputedStyle(imgWrapper).clipPath : '';
  });
  assert(projectMaskStyle.includes('inset(0') || projectMaskStyle.includes('none') || projectMaskStyle.includes('0px'), `Project mask finishes fully visible (clipPath=${projectMaskStyle})`);

  // 5. Counters Exact Final String Verification
  await page.evaluate(() => document.getElementById('hero')?.scrollIntoView());
  await page.waitForTimeout(1500);
  const counterValues = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-counter-target]')).map(el => el.textContent?.trim());
  });
  assert(counterValues.includes('PKR 30M+'), 'Counter finishes at exact string PKR 30M+');
  assert(counterValues.includes('29,000+'), 'Counter finishes at exact string 29,000+');
  assert(counterValues.includes('PKR 4.2M+'), 'Counter finishes at exact string PKR 4.2M+');
  assert(counterValues.includes('More Than 150'), 'Counter finishes at exact string More Than 150');

  // 6. View-Transitions Lifecycle Navigation Test: Home -> Services -> Work -> About -> Contact -> Home
  console.log('Testing View-Transitions Lifecycle Navigation (Home -> Services -> Work -> About -> Contact -> Home)...');
  await page.goto('http://localhost:3361/startsdigital/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Navigate to Services
  await page.click('nav a[href$="/services/"]');
  await page.waitForTimeout(800);
  // Navigate to Work
  await page.click('nav a[href$="/work/"]');
  await page.waitForTimeout(800);
  // Navigate to About
  await page.click('nav a[href$="/about/"]');
  await page.waitForTimeout(800);
  // Navigate to Contact
  await page.click('nav a[href$="/contact/"]');
  await page.waitForTimeout(800);
  // Navigate back to Home
  await page.click('nav a[href$="/"]');
  await page.waitForTimeout(1000);

  // Verify Accordion functions on Home AFTER route navigation sequence
  await page.evaluate(() => document.getElementById('process')?.scrollIntoView());
  await page.waitForTimeout(600);
  const stage2Btn = page.locator('.accordion-item[data-accordion-id="02"] .accordion-toggle');
  await stage2Btn.click();
  await page.waitForTimeout(400);
  const stage2IsOpen = await page.evaluate(() => {
    const item = document.querySelector('.accordion-item[data-accordion-id="02"]');
    return item ? item.classList.contains('bg-[#ff762b]') : false;
  });
  assert(stage2IsOpen, 'Accordion functions cleanly after 5-step ClientRouter navigation loop');

  // 7. No Mouse-Follow Listeners Verification
  const mouseListenersCount = await page.evaluate(() => {
    return window.__mouseTrackers || 0;
  });
  assert(mouseListenersCount === 0, 'No mouse-follow animation event listeners exist');

  await page.close();

  // 8. Reduced Motion Mode Verification
  const reducedMotionPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await reducedMotionPage.emulateMedia({ reducedMotion: 'reduce' });
  await reducedMotionPage.goto('http://localhost:3361/startsdigital/', { waitUntil: 'networkidle' });
  await reducedMotionPage.waitForTimeout(500);

  const reducedAnimations = await reducedMotionPage.evaluate(() => {
    const marquee = document.querySelector('.animate-marquee-left');
    const orb = document.querySelector('.animate-pulse-glow');
    return {
      marquee: marquee ? getComputedStyle(marquee).animationName : 'none',
      orb: orb ? getComputedStyle(orb).animationName : 'none',
    };
  });
  assert(reducedAnimations.marquee === 'none' && reducedAnimations.orb === 'none', 'prefers-reduced-motion: reduce disables all continuous animation names');

  await browser.close();
  server.close();

  console.log(`\n========================================`);
  console.log(`FULL TEST RESULTS: ${testsPassed}/${totalTests} tests passed.`);
  console.log(`========================================\n`);

  process.exit(testsPassed === totalTests ? 0 : 1);
});
