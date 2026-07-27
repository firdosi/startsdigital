import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const targetDir = path.resolve('scratch/content-architecture-7-1');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

async function captureScreenshots() {
  console.log('🚀 Launching Astro preview server for Roadmap 7.1 screenshots...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4340'], {
    shell: true,
    cwd: path.resolve('.'),
  });

  server.stdout.on('data', (d) => console.log(`[preview stdout] ${d}`));
  server.stderr.on('data', (d) => console.error(`[preview stderr] ${d}`));

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
    // 1. homepage-service-first-1440.png (Desktop 1440x1100)
    console.log('📸 Capturing homepage-service-first-1440.png...');
    const ctxDesktop = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    const page1 = await ctxDesktop.newPage();
    await page1.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page1.waitForTimeout(600);
    await page1.screenshot({
      path: path.join(targetDir, 'homepage-service-first-1440.png'),
      fullPage: false,
    });
    await page1.close();
    await ctxDesktop.close();

    // 2. homepage-service-first-390.png (Mobile 390x844)
    console.log('📸 Capturing homepage-service-first-390.png...');
    const ctxMobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page2 = await ctxMobile.newPage();
    await page2.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page2.waitForTimeout(600);
    await page2.screenshot({
      path: path.join(targetDir, 'homepage-service-first-390.png'),
      fullPage: false,
    });
    await page2.close();

    // 3. about-team-with-zaid-390.png (Mobile 390x844)
    console.log('📸 Capturing about-team-with-zaid-390.png...');
    const page3 = await ctxMobile.newPage();
    await page3.goto(`${baseUrl}/about/`, { waitUntil: 'networkidle' });
    await page3.waitForTimeout(500);
    await page3.evaluate(() => {
      const teamEl = document.querySelector('#team');
      if (teamEl) teamEl.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page3.waitForTimeout(400);
    await page3.screenshot({
      path: path.join(targetDir, 'about-team-with-zaid-390.png'),
      fullPage: false,
    });
    await page3.close();
    await ctxMobile.close();

    // 4. industries-service-first-1440.png (Desktop 1440x1100)
    console.log('📸 Capturing industries-service-first-1440.png...');
    const ctxDesktop2 = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    const page4 = await ctxDesktop2.newPage();
    await page4.goto(`${baseUrl}/industries/`, { waitUntil: 'networkidle' });
    await page4.waitForTimeout(600);
    await page4.screenshot({
      path: path.join(targetDir, 'industries-service-first-1440.png'),
      fullPage: false,
    });
    await page4.close();
    await ctxDesktop2.close();

    console.log('✅ All 4 screenshots captured successfully in scratch/content-architecture-7-1/');
  } finally {
    await browser.close();
    server.kill();
  }
}

captureScreenshots().catch((err) => {
  console.error('❌ Error capturing screenshots:', err);
  process.exit(1);
});
