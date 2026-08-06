import fs from 'fs';
import path from 'path';
import http from 'http';
import { chromium } from 'playwright';

const PORT = 4325;
const DIST_DIR = path.join(process.cwd(), 'dist');

function createStaticServer() {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };

  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath.startsWith('/startsdigital')) {
      reqPath = reqPath.replace('/startsdigital', '');
    }
    if (!reqPath || reqPath.endsWith('/')) reqPath += 'index.html';
    
    let filePath = path.join(DIST_DIR, reqPath);
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });
}

async function main() {
  console.log('Generating required evidence screenshots via Playwright...');

  const server = createStaticServer();
  await new Promise(res => server.listen(PORT, res));

  const browser = await chromium.launch({ headless: true });

  try {
    // 1. tools-ecosystem-final-1440.png
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
      const page = await ctx.newPage();
      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });
      await page.locator('#platforms').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#platforms img, #brand-logos img'));
        imgs.forEach(img => { img.loading = 'eager'; img.src = img.src; });
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      await page.waitForTimeout(500);
      const platformsSection = page.locator('#platforms');
      await platformsSection.screenshot({ path: 'tools-ecosystem-final-1440.png' });
      console.log('✓ Captured tools-ecosystem-final-1440.png');
      await ctx.close();
    }

    // 2. tools-ecosystem-final-1024.png
    {
      const ctx = await browser.newContext({ viewport: { width: 1024, height: 1200 } });
      const page = await ctx.newPage();
      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });
      await page.locator('#platforms').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#platforms img, #brand-logos img'));
        imgs.forEach(img => { img.loading = 'eager'; img.src = img.src; });
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      await page.waitForTimeout(500);
      const platformsSection = page.locator('#platforms');
      await platformsSection.screenshot({ path: 'tools-ecosystem-final-1024.png' });
      console.log('✓ Captured tools-ecosystem-final-1024.png');
      await ctx.close();
    }

    // 3. tools-ecosystem-final-390.png
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 1200 } });
      const page = await ctx.newPage();
      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });
      await page.locator('#platforms').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#platforms img, #brand-logos img'));
        imgs.forEach(img => { img.loading = 'eager'; img.src = img.src; });
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      await page.waitForTimeout(500);
      const platformsSection = page.locator('#platforms');
      await platformsSection.screenshot({ path: 'tools-ecosystem-final-390.png' });
      console.log('✓ Captured tools-ecosystem-final-390.png');
      await ctx.close();
    }

    // 4. brand-wall-final-1440.png
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
      const page = await ctx.newPage();
      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });
      await page.locator('#brand-logos').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#brand-logos img'));
        imgs.forEach(img => { img.loading = 'eager'; img.src = img.src; });
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      await page.waitForTimeout(500);
      const brandSection = page.locator('#brand-logos');
      await brandSection.screenshot({ path: 'brand-wall-final-1440.png' });
      console.log('✓ Captured brand-wall-final-1440.png');
      await ctx.close();
    }

    // 5. brand-wall-final-390.png
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 1000 } });
      const page = await ctx.newPage();
      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });
      await page.locator('#brand-logos').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#brand-logos img'));
        imgs.forEach(img => { img.loading = 'eager'; img.src = img.src; });
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      await page.waitForTimeout(500);
      const brandSection = page.locator('#brand-logos');
      await brandSection.screenshot({ path: 'brand-wall-final-390.png' });
      console.log('✓ Captured brand-wall-final-390.png');
      await ctx.close();
    }

    // 6. tool-logo-quality-closeup.png
    // Must feature: HeyGen, Kling AI, CapCut, Google Business Profile, Microsoft Clarity
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
      const page = await ctx.newPage();
      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });
      await page.locator('#platforms').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#platforms img'));
        imgs.forEach(img => { img.loading = 'eager'; img.src = img.src; });
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      await page.waitForTimeout(500);

      // Create a temporary overlay container in page DOM containing close-up cards for HeyGen, Kling AI, CapCut, Google Business Profile, Microsoft Clarity
      await page.evaluate(() => {
        const targetIds = ['heygen', 'kling-ai', 'capcut', 'google-business-profile', 'microsoft-clarity'];
        const cards = targetIds.map(id => document.querySelector(`[data-tool-id="${id}"]`)).filter(Boolean);

        const wrapper = document.createElement('div');
        wrapper.id = 'closeup-wrapper';
        wrapper.style.cssText = 'position: fixed; top: 50px; left: 50px; z-index: 999999; background: #f7f4ed; padding: 32px; border-radius: 24px; border: 2px solid #061d33; display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);';

        cards.forEach(card => {
          const clone = card.cloneNode(true);
          clone.style.width = '220px';
          clone.style.height = '200px';
          wrapper.appendChild(clone);
        });

        document.body.appendChild(wrapper);
      });

      await page.waitForTimeout(300);
      const closeupEl = page.locator('#closeup-wrapper');
      await closeupEl.screenshot({ path: 'tool-logo-quality-closeup.png' });
      console.log('✓ Captured tool-logo-quality-closeup.png');

      await ctx.close();
    }

    console.log('\nAll 6 required evidence screenshots generated successfully.');

  } finally {
    await browser.close();
    server.close();
  }
}

main().catch(console.error);
