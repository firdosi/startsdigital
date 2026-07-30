import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const targetDir = path.resolve('scratch/roadmap-7-1-visual-correction-final');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`📁 Created target directory: ${targetDir}`);
}

async function captureScreenshots() {
  console.log('🚀 Building and launching Astro preview server...');
  
  // First run astro build
  await new Promise((resolve, reject) => {
    const buildProc = spawn('npx', ['astro', 'build'], { shell: true, cwd: path.resolve('.') });
    buildProc.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Build failed with code ${code}`));
    });
  });

  const server = spawn('npx', ['astro', 'preview', '--port', '4345'], {
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
  const baseUrl = 'http://localhost:4345/startsdigital';

  try {
    // 1. homepage-corrected-390-final.png (Mobile 390x844)
    console.log('📸 Capturing homepage-corrected-390-final.png...');
    const ctxMobile1 = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page1 = await ctxMobile1.newPage();
    await page1.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page1.waitForTimeout(600);

    const homepagePath = path.join(targetDir, 'homepage-corrected-390-final.png');
    await page1.screenshot({
      path: homepagePath,
      fullPage: false,
    });
    const homepageSize = fs.statSync(homepagePath).size;
    console.log(`✅ Saved ${homepagePath} (${homepageSize} bytes)`);
    await page1.close();
    await ctxMobile1.close();

    // 2. about-meesam-zaid-corrected-390-final.png (Mobile 390x844 scrolled to team cards)
    console.log('📸 Capturing about-meesam-zaid-corrected-390-final.png...');
    const ctxMobile2 = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page2 = await ctxMobile2.newPage();
    await page2.goto(`${baseUrl}/about/`, { waitUntil: 'networkidle' });
    await page2.waitForTimeout(500);

    // Scroll so end of Meesam's card and full Zaid card (with bottom border) are visible
    await page2.evaluate(() => {
      const teamCards = document.querySelectorAll('#team article');
      if (teamCards.length >= 2) {
        // meesam is teamCards[0], zaid is teamCards[1]
        const meesamCard = teamCards[0];
        const meesamRect = meesamCard.getBoundingClientRect();
        // Scroll so Meesam's top part is scrolled past, showing end of Meesam card + full Zaid card
        window.scrollBy(0, meesamRect.top + 80);
      }
    });
    await page2.waitForTimeout(500);

    const aboutPath = path.join(targetDir, 'about-meesam-zaid-corrected-390-final.png');
    await page2.screenshot({
      path: aboutPath,
      fullPage: false,
    });
    const aboutSize = fs.statSync(aboutPath).size;
    console.log(`✅ Saved ${aboutPath} (${aboutSize} bytes)`);
    await page2.close();
    await ctxMobile2.close();

  } finally {
    await browser.close();
    server.kill();
  }
}

captureScreenshots().catch((err) => {
  console.error('❌ Error capturing screenshots:', err);
  process.exit(1);
});
