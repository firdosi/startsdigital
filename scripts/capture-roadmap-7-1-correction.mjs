import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const targetDir = path.resolve('scratch/roadmap-7-1-visual-correction');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`📁 Created target directory: ${targetDir}`);
}

async function captureScreenshots() {
  console.log('🚀 Launching Astro preview server for Roadmap 7.1 visual correction screenshots...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4340'], {
    shell: true,
    cwd: path.resolve('.'),
  });

  await new Promise((resolve) => {
    const onData = (data) => {
      if (data.toString().includes('ready')) {
        server.stdout.removeListener('data', onData);
        resolve(true);
      }
    };
    server.stdout.on('data', onData);
    setTimeout(resolve, 8000);
  });

  await new Promise((r) => setTimeout(r, 1000));

  const browser = await chromium.launch();
  const baseUrl = 'http://localhost:4340/startsdigital';

  try {
    // A. Measure Closed Mobile Header Height at 360px, 390px, 430px
    console.log('\n--- Closed Mobile Header Height Measurements ---');
    const headerWidths = [360, 390, 430];
    const headerMeasurements = {};

    for (const w of headerWidths) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2 });
      const p = await ctx.newPage();
      await p.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(500);

      const headerHeight = await p.evaluate(() => {
        const header = document.querySelector('#main-header');
        if (!header) return null;
        const rect = header.getBoundingClientRect();
        return Math.round(rect.height);
      });

      headerMeasurements[w] = headerHeight;
      console.log(`📏 Closed Header Height at ${w}px width: ${headerHeight}px`);
      await p.close();
      await ctx.close();
    }

    // 1. homepage-corrected-1440.png (Desktop 1440x1000)
    console.log('\n📸 Capturing homepage-corrected-1440.png...');
    const ctxDesktop1 = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page1 = await ctxDesktop1.newPage();
    await page1.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page1.waitForTimeout(600);
    await page1.screenshot({
      path: path.join(targetDir, 'homepage-corrected-1440.png'),
      fullPage: false,
    });
    await page1.close();
    await ctxDesktop1.close();

    // 2. homepage-corrected-390.png (Mobile 390x844)
    console.log('📸 Capturing homepage-corrected-390.png...');
    const ctxMobile1 = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page2 = await ctxMobile1.newPage();
    await page2.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page2.waitForTimeout(600);
    await page2.screenshot({
      path: path.join(targetDir, 'homepage-corrected-390.png'),
      fullPage: false,
    });
    await page2.close();
    await ctxMobile1.close();

    // 3. industries-corrected-1440.png (Desktop 1440x1000)
    console.log('📸 Capturing industries-corrected-1440.png...');
    const ctxDesktop2 = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page3 = await ctxDesktop2.newPage();
    await page3.goto(`${baseUrl}/industries/`, { waitUntil: 'networkidle' });
    await page3.waitForTimeout(600);
    await page3.screenshot({
      path: path.join(targetDir, 'industries-corrected-1440.png'),
      fullPage: false,
    });
    await page3.close();
    await ctxDesktop2.close();

    // 4. about-meesam-zaid-corrected-390.png (Mobile 390x844 scrolled to #team)
    console.log('📸 Capturing about-meesam-zaid-corrected-390.png...');
    const ctxMobile2 = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page4 = await ctxMobile2.newPage();
    await page4.goto(`${baseUrl}/about/`, { waitUntil: 'networkidle' });
    await page4.waitForTimeout(500);

    // Scroll to #team so Meesam's card end and Zaid's full card are in viewport
    await page4.evaluate(() => {
      const teamEl = document.querySelector('#team');
      if (teamEl) {
        const rect = teamEl.getBoundingClientRect();
        window.scrollBy(0, rect.top - 20);
      }
    });
    await page4.waitForTimeout(500);

    await page4.screenshot({
      path: path.join(targetDir, 'about-meesam-zaid-corrected-390.png'),
      fullPage: false,
    });
    await page4.close();
    await ctxMobile2.close();

    console.log('\n✅ All 4 corrected screenshots successfully saved in:');
    console.log(targetDir);

    fs.writeFileSync(path.join(targetDir, 'header-measurements.json'), JSON.stringify(headerMeasurements, null, 2));
  } finally {
    await browser.close();
    server.kill();
  }
}

captureScreenshots().catch((err) => {
  console.error('❌ Error capturing screenshots:', err);
  process.exit(1);
});
