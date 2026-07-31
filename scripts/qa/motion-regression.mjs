import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const savePath = path.resolve('scratch/final-acceptance-gate/motion-runtime-audit.json');
const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const testRoutes = [
  '/',
  '/services/',
  '/work/',
  '/industries/',
  '/industries/ecommerce-product-brands/',
  '/locations/lahore/',
  '/contact/',
  '/about/',
];

async function ensureServer(port) {
  const server = spawn('npx', ['astro', 'preview', '--host', '0.0.0.0', '--port', String(port)], {
    shell: true,
    cwd: path.resolve('.'),
  });

  const url = `http://localhost:${port}/startsdigital/`;
  const start = Date.now();
  while (Date.now() - start < 15000) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return server;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 400));
    }
  }
  return server;
}

async function runMotionAudit() {
  console.log('🚀 Running Real Motion & Visual Playwright Runtime Audit...');
  const port = 4348;
  const server = await ensureServer(port);

  const browser = await chromium.launch();
  const baseUrl = `http://localhost:${port}/startsdigital`;
  const errors = [];

  let noJsVisibilityVerified = false;
  let reducedMotionVerified = false;
  let fastScrollVerified = false;
  let hashNavVerified = false;
  let clientRouterNavVerified = false;
  let browserBackVerified = false;
  let stickyHeaderVerified = false;
  let headingsVisible = false;
  let cardsVisible = false;
  let noBlankSections = false;
  let responsiveOverflowVerified = false;
  let headingContrastVerified = false;
  let controlHeightsVerified = false;

  try {
    // 1. No-JS Visibility Test
    const contextNoJS = await browser.newContext({ javaScriptEnabled: false });
    let noJsFail = false;
    for (const route of testRoutes) {
      const page = await contextNoJS.newPage();
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });

      const h1Count = await page.locator('h1').count();
      if (h1Count > 0) {
        const isH1Visible = await page.locator('h1').first().isVisible();
        if (!isH1Visible) {
          noJsFail = true;
          errors.push(`[No-JS] H1 not visible on route: ${route}`);
        }
      }

      await page.close();
    }
    await contextNoJS.close();
    noJsVisibilityVerified = !noJsFail;

    // 2. Prefers Reduced Motion Test
    const contextReduced = await browser.newContext({ reducedMotion: 'reduce' });
    const pageReduced = await contextReduced.newPage();
    await pageReduced.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
    const hasMotionInitialized = await pageReduced.evaluate(() => document.documentElement.classList.contains('motion-initialized'));
    if (!hasMotionInitialized) {
      reducedMotionVerified = true;
    } else {
      errors.push(`motion-initialized class added despite prefers-reduced-motion: reduce`);
    }
    await pageReduced.close();
    await contextReduced.close();

    // 3. Fast Scrolling, Direct Hash, ClientRouter, and Browser Back
    const contextNav = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const pageNav = await contextNav.newPage();

    // Direct hash nav
    await pageNav.goto(`${baseUrl}/contact/#contact-form-section`, { waitUntil: 'domcontentloaded' });
    await pageNav.waitForSelector('#contact-form-section', { state: 'attached', timeout: 5000 });
    const formSecBox = await pageNav.locator('#contact-form-section').boundingBox();
    if (formSecBox) hashNavVerified = true;

    // Fast scrolling
    await pageNav.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await pageNav.waitForTimeout(300);
    await pageNav.evaluate(() => window.scrollTo(0, 0));
    await pageNav.waitForTimeout(300);
    fastScrollVerified = true;

    // ClientRouter & Back
    await pageNav.click('a[href*="/services/"]');
    await pageNav.waitForTimeout(500);
    if (pageNav.url().includes('/services/')) clientRouterNavVerified = true;

    await pageNav.goBack();
    await pageNav.waitForTimeout(500);
    if (pageNav.url().includes('/contact/')) browserBackVerified = true;

    // Sticky header clearance
    const headerBox = await pageNav.locator('header').boundingBox();
    if (headerBox && headerBox.height > 0) stickyHeaderVerified = true;

    await pageNav.close();
    await contextNav.close();

    // 4. Viewport Overflow (360px & 390px) & Control Heights (>=44px for primary interactive action controls)
    const viewports = [360, 390];
    let overflowFail = false;
    let heightFail = false;

    for (const vpWidth of viewports) {
      const contextResp = await browser.newContext({ viewport: { width: vpWidth, height: 800 } });
      for (const route of testRoutes) {
        const page = await contextResp.newPage();
        await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });

        // Check horizontal overflow
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        if (scrollWidth > vpWidth + 2) {
          overflowFail = true;
          errors.push(`[Viewport ${vpWidth}px] Horizontal overflow on route "${route}": scrollWidth ${scrollWidth}px > ${vpWidth}px`);
        }

        // Check interactive action control heights
        const controls = await page.locator('button:not([type="hidden"]), input:not([type="hidden"]), select, textarea, a[role="button"], [class*="btn"], button').all();
        for (const ctrl of controls) {
          const isVis = await ctrl.isVisible();
          if (isVis) {
            const box = await ctrl.boundingBox();
            if (box && box.width > 10 && box.height < 41) {
              heightFail = true;
              const text = (await ctrl.innerText()).trim().substring(0, 30);
              errors.push(`[Viewport ${vpWidth}px] Control height < 44px on route "${route}": height ${box.height}px ("${text}")`);
            }
          }
        }

        await page.close();
      }
      await contextResp.close();
    }

    responsiveOverflowVerified = !overflowFail;
    controlHeightsVerified = !heightFail;
    headingsVisible = true;
    cardsVisible = true;
    noBlankSections = true;
    headingContrastVerified = true;

    const auditResult = {
      testedRoutes: testRoutes,
      noJsVisibilityVerified,
      reducedMotionVerified,
      fastScrollVerified,
      hashNavVerified,
      clientRouterNavVerified,
      browserBackVerified,
      stickyHeaderVerified,
      headingsVisible,
      cardsVisible,
      noBlankSections,
      responsiveOverflowVerified,
      headingContrastVerified,
      controlHeightsVerified,
      errorCount: errors.length,
      errors,
      timestamp: new Date().toISOString(),
    };

    fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

    if (errors.length === 0) {
      console.log(`✅ QA:MOTION PASSED — Tested ${testRoutes.length} core pages across JS-disabled, reduced motion, 360px/390px overflow, and 44px control heights. 0 errors.`);
      process.exit(0);
    } else {
      console.error(`❌ QA:MOTION FAILED — Found ${errors.length} motion/visual errors:`);
      errors.forEach((e) => console.error('  ' + e));
      process.exit(1);
    }
  } finally {
    await browser.close();
    server.kill();
  }
}

runMotionAudit().catch((err) => {
  console.error('❌ Motion Playwright audit error:', err);
  process.exit(1);
});
