import { chromium } from 'playwright';
import { existsSync, mkdirSync, statSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = 'C:\\Users\\BGF\\OneDrive\\Documents\\StartsDigital\\scratch\\release-review-tools-brands-2026-08-06';
const LIVE_URL = 'https://firdosi.github.io/startsdigital/';

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function main() {
  console.log(`Connecting to live URL: ${LIVE_URL}...`);
  const browser = await chromium.launch({ headless: true });

  const captureLiveSection = async (viewportWidth, sectionId, filename) => {
    const context = await browser.newContext({
      viewport: { width: viewportWidth, height: 1000 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto(LIVE_URL, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1000);

    const section = page.locator(`#${sectionId}`);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Force eager loading
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
    }, sectionId);

    // Wait for all images to complete
    const imagesLoaded = await page.evaluate(async (id) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const imgs = Array.from(el.querySelectorAll('img'));
      const results = await Promise.all(imgs.map(img => {
        if (img.complete) return img.naturalWidth > 0;
        return new Promise(resolve => {
          img.onload = () => resolve(img.naturalWidth > 0);
          img.onerror = () => resolve(false);
        });
      }));
      return results.every(res => res === true);
    }, sectionId);

    if (!imagesLoaded) {
      console.error(`[ERROR] Live images inside #${sectionId} failed to load cleanly!`);
      process.exit(1);
    }

    // Disable CSS animations & transitions inside section
    await page.evaluate((id) => {
      const style = document.createElement('style');
      style.textContent = `#${id} *, #${id} { animation: none !important; transition: none !important; }`;
      document.head.appendChild(style);
    }, sectionId);

    await page.waitForTimeout(500);

    const outPath = join(OUTPUT_DIR, filename);
    await section.screenshot({ path: outPath });
    console.log(`Captured Live: ${filename} (${statSync(outPath).size} bytes)`);

    await context.close();
  };

  // 1. Live Brand Wall & Tools Screenshots
  console.log('Capturing Live Screenshots...');
  await captureLiveSection(1440, 'brand-logos', 'live-brand-wall-1440.png');
  await captureLiveSection(390, 'brand-logos', 'live-brand-wall-390.png');
  await captureLiveSection(1440, 'platforms', 'live-tools-1440.png');
  await captureLiveSection(390, 'platforms', 'live-tools-390.png');

  // 2. Live Brand Contrast Closeup Screenshot
  const ctxClose = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });
  const pageClose = await ctxClose.newPage();
  await pageClose.emulateMedia({ reducedMotion: 'reduce' });
  await pageClose.goto(LIVE_URL, { waitUntil: 'networkidle', timeout: 45000 });
  await pageClose.waitForTimeout(1000);

  const brandSection = pageClose.locator('#brand-logos');
  await brandSection.scrollIntoViewIfNeeded();
  await pageClose.waitForTimeout(500);

  // Disable CSS animations
  await pageClose.evaluate(() => {
    const style = document.createElement('style');
    style.textContent = `#brand-logos *, #brand-logos { animation: none !important; transition: none !important; }`;
    document.head.appendChild(style);
  });

  // Capture closeup of client brand wall grid
  const brandGrid = pageClose.locator('#brand-logos .grid');
  const closePath = join(OUTPUT_DIR, 'live-brand-contrast-closeup.png');
  await brandGrid.screenshot({ path: closePath });
  console.log(`Captured Live: live-brand-contrast-closeup.png (${statSync(closePath).size} bytes)`);

  await ctxClose.close();

  // Audit 1440, 1024, 390 viewports
  for (const w of [1440, 1024, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(LIVE_URL, { waitUntil: 'networkidle', timeout: 45000 });
    const brandCount = await p.locator('#brand-logos img').count();
    const platformCount = await p.locator('#platforms [data-tool-id]').count();
    console.log(`[Live Viewport ${w}px] Brand cards: ${brandCount}, Ecosystem items: ${platformCount}`);
    await ctx.close();
  }

  await browser.close();
  console.log('Live deployment screenshots and visual verification complete!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
