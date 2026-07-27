import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const outputDir = path.resolve('scratch/final-6-3');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function captureScreenshots() {
  console.log('🚀 Launching Astro preview server for final 6.3 screenshots...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4322'], {
    shell: true,
    cwd: path.resolve('.'),
  });

  await new Promise((resolve) => setTimeout(resolve, 4000));

  const browser = await chromium.launch();
  const baseUrl = 'http://localhost:4322/startsdigital';

  try {
    // 1. industries-index-final-1440.png (Desktop 1440x900)
    console.log('📸 Capturing industries-index-final-1440.png...');
    const page1 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page1.goto(`${baseUrl}/industries/`, { waitUntil: 'networkidle' });
    await page1.screenshot({
      path: path.join(outputDir, 'industries-index-final-1440.png'),
      clip: { x: 0, y: 0, width: 1440, height: 1000 },
    });
    await page1.close();

    // 2. industries-index-final-390.png (Mobile 390x844)
    console.log('📸 Capturing industries-index-final-390.png...');
    const page2 = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page2.goto(`${baseUrl}/industries/`, { waitUntil: 'networkidle' });
    await page2.screenshot({
      path: path.join(outputDir, 'industries-index-final-390.png'),
      clip: { x: 0, y: 0, width: 390, height: 900 },
    });
    await page2.close();

    // 3. lahore-and-cta-final-390.png (Mobile 390x844)
    console.log('📸 Capturing lahore-and-cta-final-390.png...');
    const page3 = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page3.goto(`${baseUrl}/locations/lahore/`, { waitUntil: 'networkidle' });
    await page3.screenshot({
      path: path.join(outputDir, 'lahore-and-cta-final-390.png'),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });
    await page3.close();

    // 4. contact-convortai-form-final-390.png (Mobile 390x844)
    console.log('📸 Capturing contact-convortai-form-final-390.png...');
    const page4 = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page4.goto(`${baseUrl}/contact/?source=convortai`, { waitUntil: 'networkidle' });
    await page4.evaluate(() => {
      window.scrollTo(0, 1150);
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    await page4.screenshot({
      path: path.join(outputDir, 'contact-convortai-form-final-390.png'),
    });
    await page4.close();

    console.log('✅ All 4 final 6.3 screenshots captured successfully in scratch/final-6-3/');
  } finally {
    await browser.close();
    server.kill();
  }
}

captureScreenshots().catch((err) => {
  console.error('❌ Screenshot capture error:', err);
  process.exit(1);
});
