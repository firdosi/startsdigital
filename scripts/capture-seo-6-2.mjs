import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const outputDir = path.resolve('scratch/seo-6-2');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('🚀 Starting preview server for screenshot capture...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4326'], {
    shell: true,
    stdio: 'ignore',
  });

  // Give preview server 4 seconds to start
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const browser = await chromium.launch({ headless: true });
  const baseUrl = 'http://localhost:4326/startsdigital';

  try {
    // 1. Industries Index Page (1440px)
    console.log('📸 Capturing 1/4: industries-index-1440.png');
    const page1 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page1.goto(`${baseUrl}/industries/`, { waitUntil: 'networkidle' });
    await page1.screenshot({
      path: path.join(outputDir, 'industries-index-1440.png'),
      fullPage: false,
    });
    await page1.close();

    // 2. E-Commerce Industry Page (390px)
    console.log('📸 Capturing 2/4: ecommerce-industry-390.png');
    const page2 = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page2.goto(`${baseUrl}/industries/ecommerce-product-brands/`, { waitUntil: 'networkidle' });
    await page2.screenshot({
      path: path.join(outputDir, 'ecommerce-industry-390.png'),
      fullPage: false,
    });
    await page2.close();

    // 3. Lahore Location Page (390px)
    console.log('📸 Capturing 3/4: lahore-location-390.png');
    const page3 = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page3.goto(`${baseUrl}/locations/lahore/`, { waitUntil: 'networkidle' });
    await page3.screenshot({
      path: path.join(outputDir, 'lahore-location-390.png'),
      fullPage: false,
    });
    await page3.close();

    // 4. Contact Page with ConvortAI source (390px)
    console.log('📸 Capturing 4/4: contact-convortai-source-390-final.png');
    const page4 = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page4.goto(`${baseUrl}/contact/?source=convortai`, { waitUntil: 'networkidle' });
    await page4.locator('#case-study-context-note').scrollIntoViewIfNeeded();
    await page4.screenshot({
      path: path.join(outputDir, 'contact-convortai-source-390-final.png'),
      fullPage: false,
    });
    await page4.close();

    console.log('✅ Screenshot capture complete!');
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((e) => {
  console.error('❌ Capture error:', e);
  process.exit(1);
});
