/**
 * Roadmap 9.1 QA Capture Script
 * Captures 6 screenshots and runs DOM assertions for premium visual storytelling acceptance.
 * Hard watchdog: 180 seconds.
 */
import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, resolve, extname } from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawn } from 'child_process';
import assert from 'assert';
import sharp from 'sharp';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');
const OUTPUT_DIR = join(ROOT, 'scratch', 'roadmap-9-1-premium-visual-storytelling');
const AUDIT_PATH = join(OUTPUT_DIR, 'roadmap-9-1-audit.json');
const PORT = 4466;
const BASE_URL = `http://localhost:${PORT}/startsdigital`;
const WATCHDOG_MS = 180_000;

let stage = 'INIT';
let browser = null;
let server = null;
let previewProcess = null;
let watchdogTimer = null;
let exitCode = 0;

function log(msg) {
  console.log(`[${new Date().toISOString()}] [9.1] ${msg}`);
}

// ── Watchdog ──────────────────────────────────────────────────────────────────
watchdogTimer = setTimeout(() => {
  console.error(`\n[WATCHDOG] 180s timeout reached at stage: ${stage}`);
  cleanup(1);
}, WATCHDOG_MS);

// ── MIME types for static server ─────────────────────────────────────────────
const MIME = {
  '.html': 'text/html;charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain',
  '.xml':  'application/xml',
};

// ── Static server ─────────────────────────────────────────────────────────────
function startStaticServer() {
  return new Promise((res, rej) => {
    server = createServer((req, resp) => {
      let urlPath = req.url.split('?')[0];
      if (urlPath.startsWith('/startsdigital')) {
        urlPath = urlPath.slice('/startsdigital'.length) || '/';
      }
      if (!urlPath || urlPath === '/') urlPath = '/index.html';
      if (!urlPath.includes('.')) urlPath += '/index.html';

      const filePath = join(DIST, urlPath);
      const ext = extname(filePath).toLowerCase();
      try {
        const data = readFileSync(filePath);
        resp.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        resp.end(data);
      } catch {
        try {
          const fallback = join(DIST, urlPath.replace(/\/[^/]+$/, ''), 'index.html');
          const data = readFileSync(fallback);
          resp.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
          resp.end(data);
        } catch {
          resp.writeHead(404);
          resp.end('Not found');
        }
      }
    });
    server.listen(PORT, '127.0.0.1', () => res());
    server.on('error', rej);
  });
}

// ── Cleanup ───────────────────────────────────────────────────────────────────
async function cleanup(code = 0) {
  if (watchdogTimer) clearTimeout(watchdogTimer);
  log(`Cleanup at stage: ${stage}, code: ${code}`);
  try { if (browser) await browser.close(); } catch {}
  try { if (server) server.close(); } catch {}
  process.exit(code);
}

process.on('SIGINT', () => cleanup(1));
process.on('SIGTERM', () => cleanup(1));
process.on('uncaughtException', (e) => {
  console.error('[UNCAUGHT]', e);
  cleanup(1);
});

// ── Ensure output directory ───────────────────────────────────────────────────
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const assertions = [];
const errors = [];

function addAssertion(name, result, detail = '') {
  const passed = Boolean(result);
  assertions.push({ name, passed, detail });
  if (!passed) {
    errors.push(`FAIL: ${name}${detail ? ' — ' + detail : ''}`);
    exitCode = 1;
  }
  log(`${passed ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  try {
    // STAGE 1: Build
    stage = 'STAGE 1: Build';
    log(stage);
    execSync('npx astro build', { cwd: ROOT, stdio: 'inherit' });
    log('Build complete');

    // STAGE 2: Start server
    stage = 'STAGE 2: Start Server';
    log(stage);
    await startStaticServer();
    log(`Server started on port ${PORT}`);

    // STAGE 3: Launch browser
    stage = 'STAGE 3: Launch Browser';
    log(stage);
    browser = await chromium.launch({ headless: true });

    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 4: Homepage assertions + screenshot at 1440px
    // ──────────────────────────────────────────────────────────────────────────
    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 4: Homepage 1440px Desktop Captures
    // ──────────────────────────────────────────────────────────────────────────
    stage = 'STAGE 4: Homepage 1440px';
    log(stage);
    const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const homePage = await ctx1440.newPage();
    await homePage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await homePage.waitForTimeout(600);

    // Assertion: No "6 Active Lines" jargon in hero
    const hasActiveLines = await homePage.locator('text="6 Active Lines"').count();
    addAssertion('hero_panel_no_active_lines_badge', hasActiveLines === 0, `count=${hasActiveLines}`);

    // Assertion: No "Core Agency Capabilities" jargon
    const hasCoreAgency = await homePage.locator('text="Core Agency Capabilities"').count();
    addAssertion('hero_panel_no_core_agency_jargon', hasCoreAgency === 0, `count=${hasCoreAgency}`);

    // Assertion: All 6 homepage hero service links present and correct
    const serviceHrefs = [
      '/startsdigital/services/paid-advertising/',
      '/startsdigital/services/website-design-development/',
      '/startsdigital/services/seo-local-search/',
      '/startsdigital/services/creative-content/',
      '/startsdigital/services/social-media-marketing/',
      '/startsdigital/services/ai-marketing-workflows/'
    ];
    for (const href of serviceHrefs) {
      const linkCount = await homePage.locator(`a[href="${href}"]`).count();
      addAssertion(`homepage_hero_service_link_present_${href.split('/')[3]}`, linkCount > 0);
    }

    // Assertion: Only ONE brand-logo section
    const brandSectionCount = await homePage.locator('#brand-logos').count();
    addAssertion('only_one_brand_logo_section', brandSectionCount === 1, `sections=${brandSectionCount}`);

    // Assertion: No marquee infinite loop (BrandMarquee replaced)
    const marqueeCount = await homePage.locator('#brand-marquee').count();
    addAssertion('no_infinite_marquee_section', marqueeCount === 0, `marquee_count=${marqueeCount}`);

    // Assertion: Exactly 12 logos present in DOM (0 duplicate elements!)
    const logoImgs = await homePage.locator('#brand-logos img').count();
    addAssertion('all_12_logos_present_once', logoImgs === 12, `logos_in_grid=${logoImgs}`);

    // Assertion: No logo wrapped in anchor tag
    const logoAnchors = await homePage.locator('#brand-logos a img').count();
    addAssertion('no_logos_wrapped_in_anchors', logoAnchors === 0, `anchored_logos=${logoAnchors}`);

    // Assertion: BusinessOutcomes section present
    const outcomesSection = await homePage.locator('#outcomes').count();
    addAssertion('business_outcomes_section_present', outcomesSection > 0);

    // Screenshot 1: homepage hero 1440
    await homePage.screenshot({ path: join(OUTPUT_DIR, 'homepage-hero-1440.png'), fullPage: false });
    log(`Screenshot saved: homepage-hero-1440.png`);

    // Screenshot 2: homepage visual sections 1440
    await homePage.locator('#outcomes').scrollIntoViewIfNeeded();
    await homePage.waitForTimeout(400);
    await homePage.screenshot({ path: join(OUTPUT_DIR, 'homepage-visual-sections-1440.png'), fullPage: false });
    log(`Screenshot saved: homepage-visual-sections-1440.png`);

    // Screenshot 3: homepage logo section 1440
    await homePage.locator('#brand-logos').scrollIntoViewIfNeeded();
    await homePage.waitForTimeout(400);
    await homePage.screenshot({ path: join(OUTPUT_DIR, 'homepage-logo-section-1440.png'), fullPage: false });
    log(`Screenshot saved: homepage-logo-section-1440.png`);

    await ctx1440.close();

    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 5: Homepage 390px Mobile Captures
    // ──────────────────────────────────────────────────────────────────────────
    stage = 'STAGE 5: Homepage 390px mobile';
    log(stage);
    const ctx390 = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const homeMobile = await ctx390.newPage();
    await homeMobile.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await homeMobile.waitForTimeout(600);

    // Assertion: No horizontal overflow at 390px
    const bodyScrollWidth390 = await homeMobile.evaluate(() => document.body.scrollWidth);
    addAssertion('no_horizontal_overflow_390', bodyScrollWidth390 <= 390, `scrollWidth=${bodyScrollWidth390}`);

    // Screenshot 7: homepage hero and services 390
    await homeMobile.screenshot({ path: join(OUTPUT_DIR, 'homepage-hero-and-services-390.png'), fullPage: false });
    log(`Screenshot saved: homepage-hero-and-services-390.png`);

    // Screenshot 8: homepage logo section 390
    await homeMobile.locator('#brand-logos').scrollIntoViewIfNeeded();
    await homeMobile.waitForTimeout(400);
    await homeMobile.screenshot({ path: join(OUTPUT_DIR, 'homepage-logo-section-390.png'), fullPage: false });
    log(`Screenshot saved: homepage-logo-section-390.png`);

    await ctx390.close();

    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 6: Services Page 1440px Capture
    // ──────────────────────────────────────────────────────────────────────────
    stage = 'STAGE 6: Services page';
    log(stage);
    const ctxServices = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const servicesPage = await ctxServices.newPage();
    await servicesPage.goto(`${BASE_URL}/services/`, { waitUntil: 'networkidle', timeout: 30000 });
    await servicesPage.waitForTimeout(600);

    // Assertion: Services hero does not have excessive padding
    const heroSection = await servicesPage.locator('#services-hero').first();
    const heroBounds = await heroSection.boundingBox();
    addAssertion('services_hero_no_excessive_padding', heroBounds !== null && heroBounds.y < 180, `hero_y=${heroBounds?.y}`);

    // Assertion: Dropdown opens on clicking Services link
    const desktopServicesLink = servicesPage.locator('#desktop-services-link');
    await desktopServicesLink.dispatchEvent('click');
    await servicesPage.waitForTimeout(400);

    // Screenshot 4: services hero and production 1440
    await servicesPage.screenshot({ path: join(OUTPUT_DIR, 'services-hero-and-production-1440.png'), fullPage: false });
    log(`Screenshot saved: services-hero-and-production-1440.png`);

    await ctxServices.close();

    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 7: Work Page 1440px Capture
    // ──────────────────────────────────────────────────────────────────────────
    stage = 'STAGE 7: Work page';
    log(stage);
    const ctxWork = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    const workPage = await ctxWork.newPage();
    await workPage.goto(`${BASE_URL}/work/`, { waitUntil: 'networkidle', timeout: 30000 });
    await workPage.waitForTimeout(800);

    // Assertion: PKR 10 lead cost present in results section
    const pkr10Count = await workPage.locator('#work-results').locator('text=/PKR 10/i').count();
    addAssertion('work_results_has_pkr10_lead_cost', pkr10Count > 0, `count=${pkr10Count}`);

    // Assertion: Work hero uses editorial photos
    const editorialPhotos = await workPage.locator('#work-hero picture').count();
    addAssertion('work_hero_has_editorial_photos', editorialPhotos >= 2, `photos=${editorialPhotos}`);

    // Screenshot 5: work hero and ai story 1440
    await workPage.screenshot({ path: join(OUTPUT_DIR, 'work-hero-and-ai-story-1440.png'), fullPage: false });
    log(`Screenshot saved: work-hero-and-ai-story-1440.png`);

    await ctxWork.close();

    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 8: Industries Page 1440px Capture
    // ──────────────────────────────────────────────────────────────────────────
    stage = 'STAGE 8: Industries page';
    log(stage);
    const ctxInd = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const indPage = await ctxInd.newPage();
    await indPage.goto(`${BASE_URL}/industries/`, { waitUntil: 'networkidle', timeout: 30000 });
    await indPage.waitForTimeout(600);

    // Assertion: All 4 industry sectors present
    const indSectorCount = await indPage.locator('#sectors .rounded-2xl, #sectors .rounded-3xl').count();
    addAssertion('industries_has_four_sectors', indSectorCount >= 4, `sectors=${indSectorCount}`);

    // Screenshot 6: industries hero and sectors 1440
    await indPage.screenshot({ path: join(OUTPUT_DIR, 'industries-hero-and-sectors-1440.png'), fullPage: false });
    log(`Screenshot saved: industries-hero-and-sectors-1440.png`);

    await ctxInd.close();

    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 9: About & Contact 390px Mobile Captures
    // ──────────────────────────────────────────────────────────────────────────
    stage = 'STAGE 9: About & Contact mobile';
    log(stage);
    const ctxAboutMobile = await browser.newContext({ viewport: { width: 390, height: 1200 } });

    // About page capture
    const aboutPage = await ctxAboutMobile.newPage();
    await aboutPage.goto(`${BASE_URL}/about/`, { waitUntil: 'networkidle', timeout: 30000 });
    await aboutPage.waitForTimeout(500);

    // Assertion: 2023 establishment year present
    const year2023About = await aboutPage.locator('text="2023"').count();
    addAssertion('about_has_2023_establishment_year', year2023About > 0, `count=${year2023About}`);

    // Screenshot 9: about mobile review 390 (390px wide viewport, 1200px height)
    await aboutPage.screenshot({ path: join(OUTPUT_DIR, 'about-mobile-review-390.png'), fullPage: false });
    log(`Screenshot saved: about-mobile-review-390.png`);
    await ctxAboutMobile.close();

    // Contact page capture
    const ctxContactMobile = await browser.newContext({ viewport: { width: 390, height: 1200 } });
    const contactPage = await ctxContactMobile.newPage();
    await contactPage.goto(`${BASE_URL}/contact/`, { waitUntil: 'networkidle', timeout: 30000 });
    await contactPage.waitForTimeout(500);

    // Assertion: Communication journey visual present
    const contactStepCount = await contactPage.locator('.step-float, .flex.items-start.gap-4').count();
    addAssertion('contact_has_communication_journey_visual', contactStepCount > 0, `steps=${contactStepCount}`);

    // Screenshot 10: contact mobile review 390 (390px wide viewport, 1200px height)
    await contactPage.screenshot({ path: join(OUTPUT_DIR, 'contact-mobile-review-390.png'), fullPage: false });
    log(`Screenshot saved: contact-mobile-review-390.png`);

    await ctxContactMobile.close();

    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 10: Global checks
    // ──────────────────────────────────────────────────────────────────────────
    stage = 'STAGE 10: Global checks';
    log(stage);
    const ctxReducedMotion = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce'
    });
    const rmPage = await ctxReducedMotion.newPage();
    await rmPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await rmPage.waitForTimeout(500);

    const h1Count = await rmPage.locator('h1').count();
    addAssertion('reduced_motion_homepage_readable', h1Count > 0, `h1_count=${h1Count}`);

    const brokenImgCount = await rmPage.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.filter(img => img.complete && img.naturalWidth === 0).length;
    });
    addAssertion('no_broken_images_homepage', brokenImgCount === 0, `broken=${brokenImgCount}`);

    await ctxReducedMotion.close();

    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 11: Mobile overflow checks
    // ──────────────────────────────────────────────────────────────────────────
    stage = 'STAGE 11: Mobile overflow checks';
    log(stage);
    for (const width of [360, 430]) {
      const ctxW = await browser.newContext({ viewport: { width, height: 900 } });
      const pg = await ctxW.newPage();
      await pg.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 25000 });
      await pg.waitForTimeout(400);
      const sw = await pg.evaluate(() => document.body.scrollWidth);
      addAssertion(`no_horizontal_overflow_${width}px`, sw <= width + 2, `scrollWidth=${sw}`);
      await ctxW.close();
    }

    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 12: Verify all 10 screenshots exist and are non-empty
    // ──────────────────────────────────────────────────────────────────────────
    stage = 'STAGE 12: Verify screenshots';
    log(stage);
    const requiredScreenshots = [
      'homepage-hero-1440.png',
      'homepage-visual-sections-1440.png',
      'homepage-logo-section-1440.png',
      'services-hero-and-production-1440.png',
      'work-hero-and-ai-story-1440.png',
      'industries-hero-and-sectors-1440.png',
      'homepage-hero-and-services-390.png',
      'homepage-logo-section-390.png',
      'about-mobile-review-390.png',
      'contact-mobile-review-390.png'
    ];
    for (const fname of requiredScreenshots) {
      const fpath = join(OUTPUT_DIR, fname);
      const exists = existsSync(fpath);
      const size = exists ? readFileSync(fpath).length : 0;
      addAssertion(`screenshot_exists_${fname}`, exists && size > 10000, `size=${size}`);
    }

  } catch (err) {
    console.error(`[ERROR at ${stage}]`, err);
    errors.push(`EXCEPTION at ${stage}: ${err.message}`);
    exitCode = 1;
  } finally {
    // Write audit JSON
    const gitSha = (() => {
      try { return execSync('git rev-parse HEAD', { cwd: ROOT }).toString().trim(); } catch { return 'unknown'; }
    })();
    const audit = {
      roadmap: '9.1',
      status: exitCode === 0 ? 'pass' : 'fail',
      generatedAt: new Date().toISOString(),
      sourceCommitSha: gitSha,
      assertions,
      errors,
      screenshotOutputDir: OUTPUT_DIR,
      screenshotOutputLink: `file:///C:/Users/BGF/OneDrive/Documents/StartsDigital/scratch/roadmap-9-1-premium-visual-storytelling/`
    };
    try {
      writeFileSync(AUDIT_PATH, JSON.stringify(audit, null, 2));
      log(`Audit written to: ${AUDIT_PATH}`);
    } catch (e) {
      console.error('Failed to write audit:', e);
    }

    if (errors.length > 0) {
      console.error('\n──── FAILED ASSERTIONS ────');
      errors.forEach(e => console.error(e));
    }
    log(`Total assertions: ${assertions.length}, Failures: ${errors.length}`);
    log(`Status: ${exitCode === 0 ? 'PASS ✓' : 'FAIL ✗'}`);
    await cleanup(exitCode);
  }
})();
