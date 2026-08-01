import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const savePath = path.resolve('scratch/final-acceptance-gate/analytics-runtime-audit.json');
const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function ensureServer(port) {
  const server = spawn('cmd.exe', ['/c', 'node node_modules/astro/dist/cli/index.js preview --host 0.0.0.0 --port ' + port], {
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

async function runAnalyticsAudit() {
  console.log('🚀 Running Real Analytics Playwright Runtime Audit...');
  const port = 4349;
  const server = await ensureServer(port);

  const browser = await chromium.launch();
  const baseUrl = `http://localhost:${port}/startsdigital`;
  const errors = [];

  let disabledRequestsCount = 0;
  let disabledCookiesCount = 0;
  let initialPageViewsCount = 0;
  let navPageViewsCount = 0;
  let backPageViewsCount = 0;
  let ctaEventCount = 0;
  let formValidationOrderVerified = false;
  let piiSafetyVerified = false;
  let exactSequenceVerified = false;

  try {
    // 1. Test Disabled Production Mode
    const contextDisabled = await browser.newContext();
    const pageDisabled = await contextDisabled.newPage();
    pageDisabled.on('request', (req) => {
      const url = req.url();
      if (url.includes('googletagmanager') || url.includes('google-analytics')) {
        disabledRequestsCount++;
        errors.push(`[Analytics Disabled] External tracking request detected: ${url}`);
      }
    });

    await pageDisabled.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
    const cookies = await contextDisabled.cookies();
    disabledCookiesCount = cookies.filter((c) => c.name.startsWith('_ga')).length;
    if (disabledCookiesCount > 0) {
      errors.push(`[Analytics Disabled] GA cookie set when disabled`);
    }

    const hasActiveGtag = await pageDisabled.evaluate(() => typeof window.gtag === 'function');
    if (hasActiveGtag) {
      errors.push(`[Analytics Disabled] Active gtag function found on window when disabled`);
    }

    await pageDisabled.close();
    await contextDisabled.close();

    // 2. Test Debug Mode Runtime Events & Validation Logic
    const contextDebug = await browser.newContext();
    const pageDebug = await contextDebug.newPage();

    await pageDebug.addInitScript(() => {
      window.__ANALYTICS_DEBUG__ = true;
    });

    // Initial page load
    await pageDebug.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    let events = await pageDebug.evaluate(() => window.__ANALYTICS_EVENTS__ || []);
    const initialPageViews = events.filter((e) => e.eventName === 'page_view');
    initialPageViewsCount = initialPageViews.length;
    if (initialPageViewsCount !== 1) {
      errors.push(`Expected 1 initial page_view event, found ${initialPageViewsCount}`);
    }

    // ClientRouter Navigation
    const servicesLink = pageDebug.locator('a[href*="/services/"], button:has-text("Services"), a:has-text("Services")').first();
    await servicesLink.click();
    await pageDebug.waitForTimeout(500);

    events = await pageDebug.evaluate(() => window.__ANALYTICS_EVENTS__ || []);
    const navPageViews = events.filter((e) => e.eventName === 'page_view');
    navPageViewsCount = navPageViews.length;
    if (navPageViewsCount !== 2) {
      errors.push(`Expected exactly 2 page_view events after navigation, found ${navPageViewsCount}`);
    }

    // Browser Back
    await pageDebug.goBack();
    await pageDebug.waitForTimeout(500);

    events = await pageDebug.evaluate(() => window.__ANALYTICS_EVENTS__ || []);
    const backPageViews = events.filter((e) => e.eventName === 'page_view');
    backPageViewsCount = backPageViews.length;
    if (backPageViewsCount !== 3) {
      errors.push(`Expected exactly 3 page_view events after back navigation, found ${backPageViewsCount}`);
    }

    // Primary CTA click test
    const ctaBeforeCount = (await pageDebug.evaluate(() => window.__ANALYTICS_EVENTS__ || [])).filter((e) => e.eventName === 'primary_cta_click').length;
    const ctaBtn = pageDebug.locator('a[href*="/contact/"]').first();
    if (await ctaBtn.isVisible()) {
      await ctaBtn.click();
      await pageDebug.waitForTimeout(500);
    }
    const ctaAfterCount = (await pageDebug.evaluate(() => window.__ANALYTICS_EVENTS__ || [])).filter((e) => e.eventName === 'primary_cta_click').length;
    ctaEventCount = ctaAfterCount - ctaBeforeCount;

    // Contact Form Validation & Event Order Test
    await pageDebug.goto(`${baseUrl}/contact/?source=convortai`, { waitUntil: 'domcontentloaded' });
    await pageDebug.waitForTimeout(500);

    const isConversionEvent = (e) => ['contact_brief_generate', 'whatsapp_click', 'email_click'].includes(e.eventName);

    const countBeforeInvalid = (await pageDebug.evaluate(() => window.__ANALYTICS_EVENTS__ || [])).filter(isConversionEvent).length;

    // Click WhatsApp button with empty required fields
    await pageDebug.click('#btn-send-whatsapp');
    await pageDebug.waitForTimeout(300);

    const countAfterInvalidWa = (await pageDebug.evaluate(() => window.__ANALYTICS_EVENTS__ || [])).filter(isConversionEvent).length;
    if (countAfterInvalidWa > countBeforeInvalid) {
      errors.push(`Conversion events emitted on invalid WhatsApp form submit`);
    }

    // Click Email button with empty required fields
    await pageDebug.click('#btn-send-email');
    await pageDebug.waitForTimeout(300);

    const countAfterInvalidEmail = (await pageDebug.evaluate(() => window.__ANALYTICS_EVENTS__ || [])).filter(isConversionEvent).length;
    if (countAfterInvalidEmail > countBeforeInvalid) {
      errors.push(`Conversion events emitted on invalid Email form submit`);
    }

    if (countAfterInvalidEmail === countBeforeInvalid) {
      formValidationOrderVerified = true;
    }

    // Fill valid form
    await pageDebug.fill('#name', 'Test User');
    await pageDebug.fill('#company', 'Test Company');
    await pageDebug.fill('#email', 'test@example.com');
    await pageDebug.selectOption('#service', { index: 1 });
    await pageDebug.selectOption('#goal', { index: 1 });
    await pageDebug.fill('#message', 'Test project details message.');

    const countBeforeValidWa = (await pageDebug.evaluate(() => window.__ANALYTICS_EVENTS__ || [])).length;

    // Click WhatsApp button with valid fields
    await pageDebug.click('#btn-send-whatsapp');
    await pageDebug.waitForTimeout(300);

    const validWaEvents = (await pageDebug.evaluate(() => window.__ANALYTICS_EVENTS__ || [])).slice(countBeforeValidWa);
    if (validWaEvents.length === 2 && validWaEvents[0].eventName === 'contact_brief_generate' && validWaEvents[1].eventName === 'whatsapp_click') {
      exactSequenceVerified = true;
    } else {
      errors.push(`Exact event sequence for WhatsApp brief failed: expected [contact_brief_generate, whatsapp_click], got ${JSON.stringify(validWaEvents.map(e => e.eventName))}`);
    }

    // Check PII safety
    let piiFound = false;
    for (const evt of validWaEvents) {
      const paramStr = JSON.stringify(evt.params || {});
      if (
        paramStr.includes('Test User') ||
        paramStr.includes('test@example.com') ||
        paramStr.includes('Test Company') ||
        paramStr.includes('Test project details')
      ) {
        piiFound = true;
        errors.push(`PII detected in analytics event payload: ${paramStr}`);
      }
    }
    piiSafetyVerified = !piiFound;

    await pageDebug.close();
    await contextDebug.close();

    const auditResult = {
      disabledRequestsCount,
      disabledCookiesCount,
      initialPageViewsCount,
      navPageViewsCount,
      backPageViewsCount,
      ctaEventCount,
      formValidationOrderVerified,
      exactSequenceVerified,
      piiSafetyVerified,
      errorCount: errors.length,
      errors,
      timestamp: new Date().toISOString(),
    };

    fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

    if (errors.length === 0) {
      console.log('✅ QA:ANALYTICS PASSED — Playwright verified disabled state, page_views, exact sequence order, and PII safety. 0 errors.');
      process.exit(0);
    } else {
      console.error(`❌ QA:ANALYTICS FAILED — Found ${errors.length} analytics errors:`);
      errors.forEach((e) => console.error('  ' + e));
      process.exit(1);
    }
  } finally {
    await browser.close();
    server.kill();
  }
}

runAnalyticsAudit().catch((err) => {
  console.error('❌ Analytics Playwright audit error:', err);
  process.exit(1);
});
