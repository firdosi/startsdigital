import fs from 'fs';
import path from 'path';
import http from 'http';
import { chromium } from 'playwright';

const PORT = 4324;
const DIST_DIR = path.join(process.cwd(), 'dist');
const REGISTER_FILE = path.join(process.cwd(), 'docs/tool-logo-source-register.json');

const expectedCategories = {
  'Advertising & Social Platforms': 8,
  'Analytics, Search & Tracking': 8,
  'Websites, Development & Commerce': 15,
  'Design, Content & Video': 7,
  'Communication & Business Operations': 5,
  'AI & Automation': 10
};

const expectedClientBrandIds = [
  'black-gold-fertilizer',
  'wajib-livestock',
  'rk-reno-solutions',
  'convort-ai',
  'rapidline-immigration-services',
  'rapidzone',
  'clearzone-immigration',
  'riyadh-finish-pro',
  'viral-naturals',
  'shopinq-online',
  'super-safety-covers',
  'unique-lahore-lab-sahiwal'
];

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
    if (reqPath.endsWith('/')) reqPath += 'index.html';
    
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
  console.log('🚀 Running Dedicated Tool & Brand Logo QA Audit...');

  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      passed++;
    } else {
      failed++;
      console.error(`✗ FAIL: ${msg}`);
    }
  }

  // Load Source Register
  assert(fs.existsSync(REGISTER_FILE), `Source register file missing at ${REGISTER_FILE}`);
  const toolEcosystem = JSON.parse(fs.readFileSync(REGISTER_FILE, 'utf-8'));

  // 1. DATA AUDIT: Tool Ecosystem Unique IDs & Filesystem Assets
  const toolIds = new Set();
  toolEcosystem.forEach(t => {
    assert(!toolIds.has(t.id), `Duplicate tool ID found: ${t.id}`);
    toolIds.add(t.id);

    const localAssetPath = path.join(process.cwd(), 'public', t.localAsset);
    assert(fs.existsSync(localAssetPath), `Local tool asset missing: ${localAssetPath}`);
    assert(!!t.sourceUrl, `Missing source URL for tool entry: ${t.id}`);
  });

  assert(toolEcosystem.length === 53, `Expected exactly 53 tools in ecosystem, found ${toolEcosystem.length}`);

  // 2. CATEGORY DISTRIBUTION AUDIT
  for (const [cat, expectedCount] of Object.entries(expectedCategories)) {
    const count = toolEcosystem.filter(t => t.category === cat).length;
    assert(count === expectedCount, `Category [${cat}] count mismatch: expected ${expectedCount}, got ${count}`);
  }

  // 3. CLIENT BRAND AUDIT
  assert(expectedClientBrandIds.length === 12, 'Expected exactly 12 client brand IDs');

  // 4. PLAYWRIGHT RUNTIME DOM & VISUAL ALIGNMENT AUDIT
  const server = createStaticServer();
  await new Promise(res => server.listen(PORT, res));

  const browser = await chromium.launch({ headless: true });

  const viewports = [1440, 1280, 1024, 768, 430, 390, 360];

  try {
    for (const w of viewports) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 1000 } });
      const page = await ctx.newPage();

      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

      // Scroll into view & check Tool Cards in DOM
      await page.locator('#platforms').scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      const toolCards = page.locator('[data-tool-logo]');
      const toolCardCount = await toolCards.count();
      assert(toolCardCount === 53, `[${w}px] DOM tool card count mismatch: expected 53, got ${toolCardCount}`);

      // Scroll into view & check Client Brand Cards in DOM
      await page.locator('#brand-logos').scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      const clientCards = page.locator('[data-client-logo]');
      const clientCardCount = await clientCards.count();
      assert(clientCardCount === 12, `[${w}px] DOM client brand card count mismatch: expected 12, got ${clientCardCount}`);

      // Verify no duplicate desktop/mobile trees
      const brandSectionCards = await page.$$eval('#brand-logos [data-client-logo]', els => els.length);
      assert(brandSectionCards === 12, `[${w}px] Expected exactly 12 brand cards inside #brand-logos section, got ${brandSectionCards}`);

      // Verify all 12 unique client brand IDs present in DOM
      const brandIdsInDom = await page.$$eval('[data-client-logo]', els => els.map(e => e.getAttribute('data-client-brand-id')));
      const uniqueBrandIdsInDom = new Set(brandIdsInDom);
      assert(uniqueBrandIdsInDom.size === 12, `[${w}px] Expected 12 unique client brand IDs in DOM, got ${uniqueBrandIdsInDom.size}`);

      for (const expectedId of expectedClientBrandIds) {
        assert(uniqueBrandIdsInDom.has(expectedId), `[${w}px] Client brand ID [${expectedId}] missing from DOM`);
      }

      // Check card background colors (must be white or rgb(255, 255, 255))
      const nonWhiteToolCards = await page.$$eval('[data-tool-logo]', els => {
        return els.filter(el => {
          const bg = window.getComputedStyle(el).backgroundColor;
          const isWhite = bg === 'rgb(255, 255, 255)' || bg.includes('255, 255, 255') || el.style.backgroundColor === '#ffffff' || el.classList.contains('bg-white');
          return !isWhite;
        }).length;
      });
      assert(nonWhiteToolCards === 0, `[${w}px] Tool cards with non-white background found: ${nonWhiteToolCards}`);

      const nonWhiteClientCards = await page.$$eval('[data-client-logo]', els => {
        return els.filter(el => {
          const bg = window.getComputedStyle(el).backgroundColor;
          const isWhite = bg === 'rgb(255, 255, 255)' || bg.includes('255, 255, 255') || el.style.backgroundColor === '#ffffff' || el.classList.contains('bg-white');
          return !isWhite;
        }).length;
      });
      assert(nonWhiteClientCards === 0, `[${w}px] Client brand cards with non-white background found: ${nonWhiteClientCards}`);

      // Check section horizontal overflow
      const platformsScrollW = await page.$eval('#platforms', el => el.scrollWidth);
      assert(platformsScrollW <= w + 2, `[${w}px] #platforms section horizontal overflow: scrollWidth (${platformsScrollW}px) > viewport (${w}px)`);

      const brandScrollW = await page.$eval('#brand-logos', el => el.scrollWidth);
      assert(brandScrollW <= w + 2, `[${w}px] #brand-logos section horizontal overflow: scrollWidth (${brandScrollW}px) > viewport (${w}px)`);

      await ctx.close();
    }

    console.log(`\n🎉 TOOL & BRAND LOGO QA COMPLETE: ${passed} assertions passed, ${failed} failed.`);

    if (failed > 0) {
      throw new Error(`Tool & Brand Logo QA failed with ${failed} failed assertions.`);
    }

  } finally {
    await browser.close();
    server.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
