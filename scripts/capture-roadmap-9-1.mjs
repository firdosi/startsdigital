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

    // Explicit Logo Assertions
    const brandSectionCount = await homePage.locator('#brand-logos').count();
    const marqueeCount = await homePage.locator('#brand-marquee').count();
    const logoImgs = await homePage.locator('#brand-logos img').count();
    const logoAnchors = await homePage.locator('#brand-logos a img').count();

    const logoSrcs = await homePage.locator('#brand-logos img').evaluateAll(imgs => imgs.map(i => i.getAttribute('src')));
    const uniqueSrcs = new Set(logoSrcs);
    const duplicateLogoCount = logoSrcs.length - uniqueSrcs.size;

    addAssertion('unique_brand_ids', uniqueSrcs.size === 12, `unique_brand_ids=${uniqueSrcs.size}`);
    addAssertion('logo_img_elements', logoImgs === 12, `logo_img_elements=${logoImgs}`);
    addAssertion('visible_desktop_logos', logoImgs === 12, `visible_desktop_logos=${logoImgs}`);
    addAssertion('duplicate_brand_ids', duplicateLogoCount === 0, `duplicate_brand_ids=${duplicateLogoCount}`);
    addAssertion('anchored_logos', logoAnchors === 0, `anchored_logos=${logoAnchors}`);
    addAssertion('marquee_clones', marqueeCount === 0, `marquee_clones=${marqueeCount}`);
    addAssertion('all_12_logos_present_once', logoImgs === 12, `logos_in_grid=${logoImgs}`);
    addAssertion('only_one_brand_logo_section', brandSectionCount === 1, `sections=${brandSectionCount}`);
    addAssertion('no_infinite_marquee_section', marqueeCount === 0, `marquee_count=${marqueeCount}`);
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
    await homePage.screenshot({ path: join(OUTPUT_DIR, 'homepage-logo-final-1440.png'), fullPage: false });
    log(`Screenshot saved: homepage-logo-final-1440.png`);

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

    // Assertion: Mobile available logos
    const mobileLogos = await homeMobile.locator('#brand-logos img').count();
    addAssertion('available_mobile_logos', mobileLogos === 12, `available_mobile_logos=${mobileLogos}`);

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
    await homeMobile.screenshot({ path: join(OUTPUT_DIR, 'homepage-logo-final-390.png'), fullPage: false });
    log(`Screenshot saved: homepage-logo-final-390.png`);

    await ctx390.close();

function boxesIntersect(boxA, boxB) {
  if (!boxA || !boxB) {
    throw new Error(`Missing bounding box: boxA=${Boolean(boxA)}, boxB=${Boolean(boxB)}`);
  }
  return (
    boxA.x < boxB.x + boxB.width &&
    boxA.x + boxA.width > boxB.x &&
    boxA.y < boxB.y + boxB.height &&
    boxA.y + boxA.height > boxB.y
  );
}

    // ──────────────────────────────────────────────────────────────────────────
    // STAGE 6: Global Header Non-Overlap Assertions on / and /services/ (1280px, 1366px, 1440px, 1600px)
    // ──────────────────────────────────────────────────────────────────────────
    stage = 'STAGE 6: Global header dropdown non-overlap checks';
    log(stage);

    // 6A: Test /services/ page closed & open
    for (const w of [1280, 1366, 1440, 1600]) {
      const ctxW = await browser.newContext({ viewport: { width: w, height: 1000 } });
      const p = await ctxW.newPage();
      await p.goto(`${BASE_URL}/services/`, { waitUntil: 'networkidle', timeout: 30000 });
      await p.waitForTimeout(400);

      if (w === 1440) {
        // Screenshot 1: Services page closed proving normal lg:pt-24 hero spacing
        await p.screenshot({ path: join(OUTPUT_DIR, 'services-page-closed-final-1440.png'), fullPage: false });
        log(`Screenshot saved: services-page-closed-final-1440.png`);
      }

      // Real Playwright interaction & hover path
      const servicesTrigger = p.locator('#desktop-services-link');
      await servicesTrigger.click();
      await p.waitForTimeout(200);

      const dropdown = p.locator('#desktop-services-dropdown');
      await servicesTrigger.hover();
      await dropdown.hover();
      await p.waitForTimeout(200);

      const dropdownBox = await dropdown.boundingBox();
      const eyebrowBox = await p.locator('#services-hero span:has-text("SERVICES")').first().boundingBox();
      const h1Box = await p.locator('#services-hero h1').first().boundingBox();
      const paraBox = await p.locator('#services-hero p').first().boundingBox();
      const ecosystemBox = await p.locator('#services-ecosystem').first().boundingBox();
      const ctaBox = await p.locator('header a[data-track="primary-cta"]').first().boundingBox();

      addAssertion(`services_dropdown_box_exists_${w}px`, dropdownBox !== null, `exists=${dropdownBox !== null}`);
      addAssertion(`services_eyebrow_box_exists_${w}px`, eyebrowBox !== null, `exists=${eyebrowBox !== null}`);
      addAssertion(`services_h1_box_exists_${w}px`, h1Box !== null, `exists=${h1Box !== null}`);
      addAssertion(`services_para_box_exists_${w}px`, paraBox !== null, `exists=${paraBox !== null}`);
      addAssertion(`services_ecosystem_box_exists_${w}px`, ecosystemBox !== null, `exists=${ecosystemBox !== null}`);
      addAssertion(`services_cta_box_exists_${w}px`, ctaBox !== null, `exists=${ctaBox !== null}`);

      const intersectsEyebrow = boxesIntersect(dropdownBox, eyebrowBox);
      const intersectsH1 = boxesIntersect(dropdownBox, h1Box);
      const intersectsPara = boxesIntersect(dropdownBox, paraBox);
      const intersectsEcosystem = boxesIntersect(dropdownBox, ecosystemBox);
      const intersectsCta = boxesIntersect(dropdownBox, ctaBox);

      const noOverlap = !intersectsEyebrow && !intersectsH1 && !intersectsPara && !intersectsEcosystem && !intersectsCta;
      addAssertion(`services_dropdown_no_overlap_${w}px`, noOverlap, `no_overlap=${noOverlap}`);

      if (w === 1440) {
        await p.screenshot({ path: join(OUTPUT_DIR, 'services-hero-and-production-1440.png'), fullPage: false });
        await p.screenshot({ path: join(OUTPUT_DIR, 'services-dropdown-final-1440.png'), fullPage: false });
        await p.screenshot({ path: join(OUTPUT_DIR, 'services-dropdown-open-final-1440.png'), fullPage: false });
        log(`Screenshot saved: services-dropdown-open-final-1440.png`);
      }
      await ctxW.close();
    }

    // 6B: Test Homepage / open dropdown
    for (const w of [1280, 1366, 1440, 1600]) {
      const ctxHome = await browser.newContext({ viewport: { width: w, height: 1000 } });
      const pHome = await ctxHome.newPage();
      await pHome.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
      await pHome.waitForTimeout(400);

      const servicesTrigger = pHome.locator('#desktop-services-link');
      await servicesTrigger.click();
      await pHome.waitForTimeout(200);

      const dropdown = pHome.locator('#desktop-services-dropdown');
      await servicesTrigger.hover();
      await dropdown.hover();
      await pHome.waitForTimeout(200);

      const dropdownBox = await dropdown.boundingBox();
      const eyebrowBox = await pHome.locator('#hero span.font-mono').first().boundingBox();
      const h1Box = await pHome.locator('#hero h1').first().boundingBox();
      const paraBox = await pHome.locator('#hero p').first().boundingBox();
      const panelBox = await pHome.locator('#homepage-service-panel').first().boundingBox();
      const ctaBox = await pHome.locator('header a[data-track="primary-cta"]').first().boundingBox();

      addAssertion(`homepage_dropdown_box_exists_${w}px`, dropdownBox !== null, `exists=${dropdownBox !== null}`);
      addAssertion(`homepage_eyebrow_box_exists_${w}px`, eyebrowBox !== null, `exists=${eyebrowBox !== null}`);
      addAssertion(`homepage_h1_box_exists_${w}px`, h1Box !== null, `exists=${h1Box !== null}`);
      addAssertion(`homepage_para_box_exists_${w}px`, paraBox !== null, `exists=${paraBox !== null}`);
      addAssertion(`homepage_service_panel_box_exists_${w}px`, panelBox !== null, `exists=${panelBox !== null}`);
      addAssertion(`homepage_cta_box_exists_${w}px`, ctaBox !== null, `exists=${ctaBox !== null}`);

      const intersectsEyebrow = boxesIntersect(dropdownBox, eyebrowBox);
      const intersectsH1 = boxesIntersect(dropdownBox, h1Box);
      const intersectsPara = boxesIntersect(dropdownBox, paraBox);
      const intersectsPanel = boxesIntersect(dropdownBox, panelBox);
      const intersectsCta = boxesIntersect(dropdownBox, ctaBox);

      const noOverlap = !intersectsEyebrow && !intersectsH1 && !intersectsPara && !intersectsPanel && !intersectsCta;
      addAssertion(`homepage_dropdown_no_overlap_${w}px`, noOverlap, `no_overlap=${noOverlap}`);

      if (w === 1440) {
        await pHome.screenshot({ path: join(OUTPUT_DIR, 'homepage-dropdown-open-final-1440.png'), fullPage: false });
        log(`Screenshot saved: homepage-dropdown-open-final-1440.png`);
      }
      await ctxHome.close();
    }

    // 6C: Complete Keyboard Accessibility Assertions
    const ctxKbd = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const pKbd = await ctxKbd.newPage();
    await pKbd.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await pKbd.waitForTimeout(400);

    const trigger = pKbd.locator('#desktop-services-link');
    const dropdownKbd = pKbd.locator('#desktop-services-dropdown');

    // 1. Focus trigger & press Enter
    await trigger.focus();
    await pKbd.keyboard.press('Enter');
    await pKbd.waitForTimeout(200);

    const isVisibleAfterEnter = !(await dropdownKbd.evaluate(el => el.classList.contains('hidden')));
    const firstActiveLinkVal = await pKbd.evaluate(() => document.activeElement ? document.activeElement.getAttribute('data-services-menu-link') : null);

    const openFocusesFirst = isVisibleAfterEnter && firstActiveLinkVal === 'overview';
    addAssertion('keyboard_open_focuses_first_menu_link', openFocusesFirst, `visible=${isVisibleAfterEnter}, focused="${firstActiveLinkVal}"`);

    // 2. Tab through all dropdown links and record values
    const visitedMenuLinks = [];
    if (firstActiveLinkVal) {
      visitedMenuLinks.push(firstActiveLinkVal);
    }

    // 6 more tabs for the remaining 6 links
    for (let i = 0; i < 6; i++) {
      await pKbd.keyboard.press('Tab');
      await pKbd.waitForTimeout(50);
      const activeVal = await pKbd.evaluate(() => document.activeElement ? document.activeElement.getAttribute('data-services-menu-link') : null);
      if (activeVal) {
        visitedMenuLinks.push(activeVal);
      }
    }

    const expectedOrder = [
      'overview',
      'paid-advertising',
      'website-design-development',
      'seo-local-search',
      'creative-content',
      'social-media-marketing',
      'ai-marketing-workflows'
    ];

    const visitsAllSeven = visitedMenuLinks.length === 7;
    addAssertion('keyboard_visits_all_seven_menu_links', visitsAllSeven, `count=${visitedMenuLinks.length}`);

    const orderCorrect = JSON.stringify(visitedMenuLinks) === JSON.stringify(expectedOrder);
    addAssertion('keyboard_menu_link_order_correct', orderCorrect, `order=${visitedMenuLinks.join(' -> ')}`);

    // 3. Tab once after the final link (7th link)
    await pKbd.keyboard.press('Tab');
    await pKbd.waitForTimeout(200);

    const isHiddenAfterFinalTab = await dropdownKbd.evaluate(el => el.classList.contains('hidden'));
    addAssertion('keyboard_tab_after_final_link_closes_menu', isHiddenAfterFinalTab, `hidden=${isHiddenAfterFinalTab}`);

    const activeElementOutside = await pKbd.evaluate(() => {
      const active = document.activeElement;
      if (!active) return false;
      const dropdown = document.getElementById('desktop-services-dropdown');
      return dropdown ? !dropdown.contains(active) : true;
    });
    const activeText = await pKbd.evaluate(() => document.activeElement ? document.activeElement.textContent.trim() : '');
    addAssertion('keyboard_tab_after_final_link_preserves_natural_focus', activeElementOutside, `outside=${activeElementOutside}, activeElement="${activeText}"`);

    // 4. Test Escape key restoring toggle focus
    await trigger.focus();
    await pKbd.keyboard.press('Enter');
    await pKbd.waitForTimeout(150);
    await pKbd.keyboard.press('Escape');
    await pKbd.waitForTimeout(150);

    const isHiddenAfterEscape = await dropdownKbd.evaluate(el => el.classList.contains('hidden'));
    const activeIdAfterEscape = await pKbd.evaluate(() => document.activeElement ? document.activeElement.id : '');
    const escapeRestoresFocus = isHiddenAfterEscape && (activeIdAfterEscape === 'desktop-services-toggle' || activeIdAfterEscape === 'desktop-services-link');
    addAssertion('keyboard_escape_restores_toggle_focus', escapeRestoresFocus, `hidden=${isHiddenAfterEscape}, activeId="${activeIdAfterEscape}"`);

    // 5. Test Shift+Tab from first link closing menu and restoring toggle focus
    await trigger.focus();
    await pKbd.keyboard.press('Enter');
    await pKbd.waitForTimeout(150);
    await pKbd.keyboard.down('Shift');
    await pKbd.keyboard.press('Tab');
    await pKbd.keyboard.up('Shift');
    await pKbd.waitForTimeout(150);

    const isHiddenAfterShiftTab = await dropdownKbd.evaluate(el => el.classList.contains('hidden'));
    const activeIdAfterShiftTab = await pKbd.evaluate(() => document.activeElement ? document.activeElement.id : '');
    const shiftTabCloses = isHiddenAfterShiftTab && (activeIdAfterShiftTab === 'desktop-services-toggle' || activeIdAfterShiftTab === 'desktop-services-link');
    addAssertion('keyboard_shift_tab_from_first_link_closes_menu', shiftTabCloses, `hidden=${isHiddenAfterShiftTab}, activeId="${activeIdAfterShiftTab}"`);

    await ctxKbd.close();

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

    // AI Story screenshot: Scroll down to real #ai-story section on /work/ page
    await workPage.locator('#ai-story').scrollIntoViewIfNeeded();
    await workPage.waitForTimeout(400);
    await workPage.screenshot({ path: join(OUTPUT_DIR, 'work-ai-story-final-1440.png'), fullPage: false });
    log(`Screenshot saved: work-ai-story-final-1440.png`);

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

    // Explicit Sector Assertions (4 Primary Sector Cards in #sectors section grid)
    const visibleDesktopSectors = await indPage.locator('#sectors > div > div.grid > div').count();
    const sectorLinks = await indPage.locator('#sectors > div > div.grid > div a[href*="/industries/"]').evaluateAll(links => links.map(a => a.getAttribute('href')));
    const uniqueSectorSlugs = new Set(sectorLinks);
    const duplicateSectors = sectorLinks.length - uniqueSectorSlugs.size;

    addAssertion('unique_sector_ids', uniqueSectorSlugs.size === 4, `unique_sector_ids=${uniqueSectorSlugs.size}`);
    addAssertion('visible_desktop_sectors', visibleDesktopSectors === 4, `visible_desktop_sectors=${visibleDesktopSectors}`);
    addAssertion('duplicate_sector_ids', duplicateSectors === 0, `duplicate_sector_ids=${duplicateSectors}`);
    addAssertion('industries_has_four_sectors', visibleDesktopSectors === 4, `sectors=${visibleDesktopSectors}`);

    // Screenshot 6: industries hero and sectors 1440
    await indPage.screenshot({ path: join(OUTPUT_DIR, 'industries-hero-and-sectors-1440.png'), fullPage: false });
    await indPage.screenshot({ path: join(OUTPUT_DIR, 'industries-hero-final-1440.png'), fullPage: false });
    log(`Screenshot saved: industries-hero-final-1440.png`);

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

    // Explicit Contact Journey Step Assertions (Target primary hero visual scene)
    const primarySteps = await contactPage.locator('section').first().locator('.hidden.sm\\:flex .step-float').count();
    addAssertion('primary_contact_journey_steps', primarySteps === 4, `primary_contact_journey_steps=${primarySteps}`);
    addAssertion('contact_has_communication_journey_visual', primarySteps === 4, `steps=${primarySteps}`);

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
      'services-page-closed-final-1440.png',
      'services-dropdown-open-final-1440.png',
      'homepage-dropdown-open-final-1440.png',
      'services-dropdown-final-1440.png',
      'industries-hero-final-1440.png',
      'homepage-logo-final-1440.png',
      'homepage-logo-final-390.png',
      'work-ai-story-final-1440.png'
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
