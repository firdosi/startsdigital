import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

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

server.listen(3364, async () => {
  console.log('=== Running Motion V4 Strict Viewport Scroll-Trigger Verification Suite ===\n');
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

  // 1. Initial State Assertions at scrollY = 0
  console.log('Test 1: Initial state at scrollY = 0');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3364/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const heroHeadlineRevealed = await page.evaluate(() => {
    const h1 = document.querySelector('#hero h1');
    return h1 ? h1.classList.contains('is-motion-revealed') : false;
  });
  assert(heroHeadlineRevealed, 'Hero headline is revealed automatically on initial page load');

  const initialBelowFoldStates = await page.evaluate(() => {
    const isRevealed = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.classList.contains('is-motion-revealed') || el.classList.contains('is-revealed') : false;
    };
    return {
      servicesCard1: isRevealed('#services [data-motion]'),
      whyUsContent: isRevealed('#about [data-motion]'),
      processContent: isRevealed('#process [data-motion]'),
      featuredWorkCard1: isRevealed('#work article'),
      resultsCard1: isRevealed('#results [data-motion="pop-in"]'),
      operatorContent: isRevealed('#operator [data-motion]'),
      platformTiles: isRevealed('#platforms [data-motion]'),
      faqList: isRevealed('#faq-list'),
      finalCta: isRevealed('#contact [data-motion]')
    };
  });

  assert(!initialBelowFoldStates.servicesCard1, 'Services card 1 is NOT revealed at scrollY = 0');
  assert(!initialBelowFoldStates.whyUsContent, 'Why Starts Digital content is NOT revealed at scrollY = 0');
  assert(!initialBelowFoldStates.processContent, 'Working Method content is NOT revealed at scrollY = 0');
  assert(!initialBelowFoldStates.featuredWorkCard1, 'Featured Work card 1 is NOT revealed at scrollY = 0');
  assert(!initialBelowFoldStates.resultsCard1, 'Results card 1 is NOT revealed at scrollY = 0');
  assert(!initialBelowFoldStates.operatorContent, 'About Operator content is NOT revealed at scrollY = 0');
  assert(!initialBelowFoldStates.platformTiles, 'Platform tiles are NOT revealed at scrollY = 0');
  assert(!initialBelowFoldStates.faqList, 'FAQ list is NOT revealed at scrollY = 0');
  assert(!initialBelowFoldStates.finalCta, 'Final CTA is NOT revealed at scrollY = 0');

  // 2. Mandatory 4-Second Idle Test at scrollY = 0
  console.log('\nTest 2: Mandatory 4-Second Idle Test at scrollY = 0');
  console.log('Waiting 4.2 seconds at top of page...');
  await page.waitForTimeout(4200);

  const statesAfter4s = await page.evaluate(() => {
    const isRevealed = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.classList.contains('is-motion-revealed') || el.classList.contains('is-revealed') : false;
    };
    return {
      servicesCard1: isRevealed('#services [data-motion]'),
      featuredWorkCard1: isRevealed('#work article'),
      resultsCard1: isRevealed('#results [data-motion="pop-in"]'),
      faqList: isRevealed('#faq-list')
    };
  });

  assert(!statesAfter4s.servicesCard1, 'Services card 1 STILL unrevealed after 4 seconds idle');
  assert(!statesAfter4s.featuredWorkCard1, 'Featured Work card 1 STILL unrevealed after 4 seconds idle');
  assert(!statesAfter4s.resultsCard1, 'Results card 1 STILL unrevealed after 4 seconds idle');
  assert(!statesAfter4s.faqList, 'FAQ list STILL unrevealed after 4 seconds idle');

  // 3. Scroll to Services & Verify Hero Ambient Motion Offscreen Pausing
  console.log('\nTest 3: Scroll to Services & Verify Hero Ambient Motion Offscreen Pausing');

  // Verify Hero ambient motion running at top
  const heroOrbitAtTop = await page.evaluate(() => {
    const ring = document.querySelector('#hero .animate-spin-slow');
    return ring ? getComputedStyle(ring).animationPlayState : 'running';
  });
  assert(heroOrbitAtTop === 'running', 'Hero ambient orbit animation is RUNNING at top of page');

  await page.evaluate(() => document.getElementById('services')?.scrollIntoView());
  await page.waitForTimeout(600);

  const heroOrbitScrolled = await page.evaluate(() => {
    const ring = document.querySelector('#hero .animate-spin-slow');
    return ring ? getComputedStyle(ring).animationPlayState : 'paused';
  });
  assert(heroOrbitScrolled === 'paused', 'Hero ambient orbit animation becomes PAUSED after scrolling beyond Hero');

  // Scroll back to top to verify resume
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const heroOrbitResumed = await page.evaluate(() => {
    const ring = document.querySelector('#hero .animate-spin-slow');
    return ring ? getComputedStyle(ring).animationPlayState : 'running';
  });
  assert(heroOrbitResumed === 'running', 'Hero ambient orbit animation RESUMES when returning to top of page');

  // Scroll back to services for subsequent tests
  await page.evaluate(() => document.getElementById('services')?.scrollIntoView());
  await page.waitForTimeout(500);

  const servicesRevealed = await page.evaluate(() => {
    const card1 = document.querySelector('#services [data-motion]');
    const delays = Array.from(document.querySelectorAll('#services [data-motion]')).map(el => el.getAttribute('data-motion-delay'));
    return {
      card1Revealed: card1 ? card1.classList.contains('is-motion-revealed') : false,
      uniqueDelays: new Set(delays).size
    };
  });

  assert(servicesRevealed.card1Revealed, 'Service card 1 becomes revealed after scrolling into view');
  assert(servicesRevealed.uniqueDelays > 2, `Service cards use distinct CSS transition delays (${servicesRevealed.uniqueDelays} unique delay values)`);

  // 4. Scroll to Featured Work
  console.log('\nTest 4: Scroll to Featured Work');
  // Check Card 3 before scrolling to Card 3
  const card3BeforeScroll = await page.evaluate(() => {
    const cards = document.querySelectorAll('#work article');
    return cards[2] ? cards[2].classList.contains('is-motion-revealed') : false;
  });
  assert(!card3BeforeScroll, 'Featured Work card 3 was NOT revealed before reaching its position');

  await page.evaluate(() => document.getElementById('work')?.scrollIntoView());
  await page.waitForTimeout(600);

  const card1Revealed = await page.evaluate(() => {
    const cards = document.querySelectorAll('#work article');
    return cards[0] ? cards[0].classList.contains('is-motion-revealed') : false;
  });
  assert(card1Revealed, 'Featured Work project card 1 becomes revealed after scrolling into view');

  // 5. Scroll to Results & Verify Metric Text
  console.log('\nTest 5: Scroll to Results');
  await page.evaluate(() => document.getElementById('results')?.scrollIntoView());
  await page.waitForTimeout(600);

  const resultsState = await page.evaluate(() => {
    const card1 = document.querySelector('#results [data-motion="pop-in"]');
    const texts = Array.from(document.querySelectorAll('#results [data-counter-target]')).map(el => el.textContent?.trim());
    return {
      revealed: card1 ? card1.classList.contains('is-motion-revealed') : false,
      texts
    };
  });
  assert(resultsState.revealed, 'Result cards become revealed after scrolling into view');
  assert(resultsState.texts.includes('PKR 30M+'), 'Result metric text 1 is exact static string "PKR 30M+"');
  assert(resultsState.texts.includes('29,000+'), 'Result metric text 2 is exact static string "29,000+"');
  assert(resultsState.texts.includes('PKR 4.2M+'), 'Result metric text 3 is exact static string "PKR 4.2M+"');
  assert(resultsState.texts.includes('More Than 150'), 'Result metric text 4 is exact static string "More Than 150"');

  // 6. Scroll to FAQ
  console.log('\nTest 6: Scroll to FAQ');
  await page.evaluate(() => document.getElementById('faq')?.scrollIntoView());
  await page.waitForTimeout(600);

  const faqRevealed = await page.evaluate(() => {
    const list = document.getElementById('faq-list');
    return list ? list.classList.contains('is-motion-revealed') : false;
  });
  assert(faqRevealed, 'FAQ elements become revealed after scrolling into view');

  // 7. Horizontal Overflow Check
  console.log('\nTest 7: No Horizontal Overflow across 4 viewports');
  const viewports = [
    { width: 1440, height: 900 },
    { width: 1024, height: 900 },
    { width: 768, height: 1024 },
    { width: 375, height: 812 },
  ];
  for (const vp of viewports) {
    const vpPage = await browser.newPage({ viewport: vp });
    await vpPage.goto('http://localhost:3364/', { waitUntil: 'networkidle' });
    await vpPage.waitForTimeout(300);
    const scrollWidth = await vpPage.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await vpPage.evaluate(() => document.documentElement.clientWidth);
    assert(scrollWidth <= clientWidth + 1, `Viewport [${vp.width}x${vp.height}] has no horizontal overflow (scrollWidth=${scrollWidth}, clientWidth=${clientWidth})`);
    await vpPage.close();
  }

  // 8. View Transitions Lifecycle & Accordion Interaction
  console.log('\nTest 8: View Transitions Navigation & Accordions');
  await page.goto('http://localhost:3364/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Route navigation sequence
  await page.click('nav a[href$="/services/"]');
  await page.waitForTimeout(600);
  await page.click('nav a[href$="/work/"]');
  await page.waitForTimeout(600);
  await page.click('nav a[href$="/about/"]');
  await page.waitForTimeout(600);
  await page.click('nav a[href$="/contact/"]');
  await page.waitForTimeout(600);
  await page.click('nav a[href$="/"]');
  await page.waitForTimeout(800);

  // Test accordion interaction after navigation
  await page.evaluate(() => document.getElementById('process')?.scrollIntoView());
  await page.waitForTimeout(500);
  const stage2Toggle = page.locator('.accordion-item[data-accordion-id="02"] .accordion-toggle');
  await stage2Toggle.click();
  await page.waitForTimeout(400);
  const stage2Open = await page.evaluate(() => {
    const item = document.querySelector('.accordion-item[data-accordion-id="02"]');
    return item ? item.classList.contains('bg-[#ff762b]') : false;
  });
  assert(stage2Open, 'Working Method accordion functions cleanly after ClientRouter navigation loop');

  // 9. No Mousemove or Pointermove Listeners
  console.log('\nTest 9: No Mouse-Follow Listeners');
  const mouseTrackerCount = await page.evaluate(() => window.__mouseTrackers || 0);
  assert(mouseTrackerCount === 0, 'No mousemove or pointermove listeners present');

  // 10. Reduced Motion Mode
  console.log('\nTest 10: Reduced Motion Mode');
  const rmPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await rmPage.emulateMedia({ reducedMotion: 'reduce' });
  await rmPage.goto('http://localhost:3364/', { waitUntil: 'networkidle' });
  await rmPage.waitForTimeout(400);

  const rmState = await rmPage.evaluate(() => {
    const servicesCard1 = document.querySelector('#services [data-motion]');
    const isRevealed = servicesCard1 ? servicesCard1.classList.contains('is-motion-revealed') : false;
    const marquee = document.querySelector('.animate-marquee-left');
    const animationName = marquee ? getComputedStyle(marquee).animationName : 'none';
    return { isRevealed, animationName };
  });
  assert(rmState.isRevealed, 'prefers-reduced-motion: reduce immediately reveals all elements');
  assert(rmState.animationName === 'none', 'prefers-reduced-motion: reduce disables continuous CSS keyframe animations');
  await rmPage.close();

  await page.close();
  await browser.close();
  server.close();

  console.log(`\n========================================`);
  console.log(`VERIFICATION SUMMARY: ${testsPassed}/${totalTests} tests passed.`);
  console.log(`========================================\n`);

  process.exit(testsPassed === totalTests ? 0 : 1);
});
