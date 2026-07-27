import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const targetDir = path.resolve('scratch/final-acceptance-gate');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

async function captureScreenshots() {
  console.log('🚀 Launching Astro preview server for final acceptance screenshots...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4339'], {
    shell: true,
    cwd: path.resolve('.'),
  });

  server.stdout.on('data', (d) => console.log(`[preview stdout] ${d}`));
  server.stderr.on('data', (d) => console.error(`[preview stderr] ${d}`));

  // Bounded wait until preview server outputs 'ready'
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

  // Small additional buffer for socket binding
  await new Promise((r) => setTimeout(r, 1000));

  const browser = await chromium.launch();
  const baseUrl = 'http://localhost:4339/startsdigital';

  try {
    // 1. industries-combinations-final-1440.png (Desktop 1440x900)
    console.log('📸 Capturing industries-combinations-final-1440.png...');
    const ctxDesktop = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    const page1 = await ctxDesktop.newPage();
    await page1.goto(`${baseUrl}/industries/`, { waitUntil: 'networkidle' });
    await page1.waitForTimeout(500);
    await page1.screenshot({
      path: path.join(targetDir, 'industries-combinations-final-1440.png'),
      fullPage: false,
    });
    await page1.close();
    await ctxDesktop.close();

    // 2. industries-faq-final-390.png (Mobile 390x844)
    console.log('📸 Capturing industries-faq-final-390.png...');
    const ctxMobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page2 = await ctxMobile.newPage();
    await page2.goto(`${baseUrl}/industries/`, { waitUntil: 'networkidle' });
    await page2.waitForTimeout(500);
    // Scroll to FAQ section
    await page2.evaluate(() => {
      const el = document.querySelector('section:nth-of-type(6)') || document.querySelector('h2:has-text("Industry Engagement Questions")');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page2.waitForTimeout(400);
    await page2.screenshot({
      path: path.join(targetDir, 'industries-faq-final-390.png'),
      fullPage: false,
    });
    await page2.close();

    // 3. lahore-final-390.png (Mobile 390x844)
    console.log('📸 Capturing lahore-final-390.png...');
    const page3 = await ctxMobile.newPage();
    await page3.goto(`${baseUrl}/locations/lahore/`, { waitUntil: 'networkidle' });
    await page3.waitForTimeout(500);
    await page3.screenshot({
      path: path.join(targetDir, 'lahore-final-390.png'),
      fullPage: false,
    });
    await page3.close();

    // 4. contact-convortai-form-final-390.png (Mobile 390x844)
    console.log('📸 Capturing contact-convortai-form-final-390.png...');
    const page4 = await ctxMobile.newPage();
    await page4.goto(`${baseUrl}/contact/?source=convortai`, { waitUntil: 'networkidle' });
    await page4.waitForTimeout(500);
    await page4.screenshot({
      path: path.join(targetDir, 'contact-convortai-form-final-390.png'),
      fullPage: false,
    });
    await page4.close();
    await ctxMobile.close();

    console.log('✅ All 4 final acceptance screenshots captured successfully in scratch/final-acceptance-gate/');
  } finally {
    await browser.close();
    server.kill();
  }
}

captureScreenshots().catch((err) => {
  console.error('❌ Error capturing screenshots:', err);
  process.exit(1);
});
