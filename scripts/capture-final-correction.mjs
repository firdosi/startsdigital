import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const saveDir = path.resolve('scratch/final-closure-correction');
if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

async function captureScreenshots() {
  console.log('🚀 Launching Astro preview server for final correction screenshots...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4329'], {
    shell: true,
    cwd: path.resolve('.'),
  });

  await new Promise((r) => setTimeout(r, 4000));

  const browser = await chromium.launch();
  const baseUrl = 'http://localhost:4329/startsdigital';

  try {
    // 1. industries-combinations-final-1440.png
    console.log('📸 Capturing industries-combinations-final-1440.png...');
    const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p1 = await ctx1440.newPage();
    await p1.goto(`${baseUrl}/industries/`, { waitUntil: 'networkidle' });
    await p1.locator('h2:has-text("Industry-Specific Service Combinations")').scrollIntoViewIfNeeded();
    await p1.waitForTimeout(600);
    await p1.screenshot({ path: path.join(saveDir, 'industries-combinations-final-1440.png') });
    await p1.close();
    await ctx1440.close();

    // 2. industries-faq-final-390.png
    console.log('📸 Capturing industries-faq-final-390.png...');
    const ctx390 = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const p2 = await ctx390.newPage();
    await p2.goto(`${baseUrl}/industries/`, { waitUntil: 'networkidle' });
    await p2.locator('h2:has-text("Industry Engagement Questions")').scrollIntoViewIfNeeded();
    await p2.waitForTimeout(600);
    await p2.screenshot({ path: path.join(saveDir, 'industries-faq-final-390.png') });
    await p2.close();

    // 3. lahore-final-390.png
    console.log('📸 Capturing lahore-final-390.png...');
    const p3 = await ctx390.newPage();
    await p3.goto(`${baseUrl}/locations/lahore/`, { waitUntil: 'networkidle' });
    await p3.waitForTimeout(600);
    await p3.screenshot({ path: path.join(saveDir, 'lahore-final-390.png') });
    await p3.close();

    // 4. contact-convortai-form-final-390.png
    console.log('📸 Capturing contact-convortai-form-final-390.png...');
    const p4 = await ctx390.newPage();
    await p4.goto(`${baseUrl}/contact/?source=convortai`, { waitUntil: 'networkidle' });
    await p4.locator('#contact-form-section').scrollIntoViewIfNeeded();
    await p4.waitForTimeout(600);
    await p4.screenshot({ path: path.join(saveDir, 'contact-convortai-form-final-390.png') });
    await p4.close();

    await ctx390.close();
    console.log('✅ All 4 final correction screenshots captured successfully in scratch/final-closure-correction/');
  } finally {
    await browser.close();
    server.kill();
  }
}

captureScreenshots().catch((err) => {
  console.error('❌ Error capturing screenshots:', err);
  process.exit(1);
});
