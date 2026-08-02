import fs from 'fs';
import path from 'path';
import http from 'http';
import crypto from 'crypto';
import { chromium } from 'playwright';

const PORT = 4324;
const DIST_DIR = path.join(process.cwd(), 'dist');
const REGISTER_FILE = path.join(process.cwd(), 'docs/tool-logo-source-register.json');

const expectedCategories = {
  'Advertising & Social Platforms': 8,
  'Analytics, Search & Tracking': 6,
  'Websites, Development & Commerce': 15,
  'Design, Content & Video': 7,
  'Communication & Business Operations': 5,
  'AI & Automation': 9
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

function getHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

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
  console.log('🚀 Running Dedicated Tool & Brand Logo Authenticity QA Audit...');

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

  // 1. DATA & SOURCE REGISTER AUDIT
  assert(fs.existsSync(REGISTER_FILE), `Source register file missing at ${REGISTER_FILE}`);
  const toolEcosystem = JSON.parse(fs.readFileSync(REGISTER_FILE, 'utf-8'));

  const toolIds = new Set();
  const hashToToolMap = new Map();

  toolEcosystem.forEach(t => {
    assert(!toolIds.has(t.id), `Duplicate tool ID found: ${t.id}`);
    toolIds.add(t.id);

    const localAssetPath = path.join(process.cwd(), 'public', t.localAsset);
    assert(fs.existsSync(localAssetPath), `Local tool asset missing: ${localAssetPath}`);
    assert(!!t.verifiedSourceUrl, `Missing verified source URL for tool entry: ${t.id}`);
    assert(!!t.sourceType, `Missing sourceType for tool entry: ${t.id}`);
    assert(!!t.localAssetHash, `Missing localAssetHash for tool entry: ${t.id}`);

    // Verify hash matches filesystem asset
    const fileContent = fs.readFileSync(localAssetPath, 'utf-8');
    const computedHash = getHash(fileContent);
    assert(computedHash === t.localAssetHash, `Hash mismatch for [${t.id}]: expected ${t.localAssetHash}, got ${computedHash}`);

    // Check duplicate hashes (no unapproved duplicate logos)
    if (hashToToolMap.has(computedHash)) {
      const existingId = hashToToolMap.get(computedHash);
      assert(false, `Unallowed duplicate logo hash detected: [${t.id}] has same SVG hash as [${existingId}]`);
    } else {
      hashToToolMap.set(computedHash, t.id);
    }
  });

  // Explicit Authenticity Checks:
  const openAiHash = toolEcosystem.find(t => t.id === 'openai')?.localAssetHash;
  const heyGenHash = toolEcosystem.find(t => t.id === 'heygen')?.localAssetHash;
  const klingHash = toolEcosystem.find(t => t.id === 'kling-ai')?.localAssetHash;
  const capCutHash = toolEcosystem.find(t => t.id === 'capcut')?.localAssetHash;
  const gbpHash = toolEcosystem.find(t => t.id === 'google-business-profile')?.localAssetHash;

  assert(heyGenHash !== openAiHash, 'HeyGen must not use OpenAI logo hash');
  assert(klingHash !== openAiHash, 'Kling AI must not use OpenAI logo hash');
  assert(!!capCutHash && capCutHash !== openAiHash, 'CapCut must have distinct authentic logo hash');
  assert(!!gbpHash && gbpHash !== openAiHash, 'Google Business Profile must have distinct authentic logo hash');

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

      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });

      // Scroll into view & trigger lazy image loading across all cards
      await page.locator('#platforms').scrollIntoViewIfNeeded();
      await page.evaluate(() => {
        document.querySelectorAll('#platforms img, #brand-logos img').forEach(img => {
          img.loading = 'eager';
        });
      });
      await page.waitForTimeout(400);

      const toolCards = page.locator('[data-tool-logo]');
      const toolCardCount = await toolCards.count();
      assert(toolCardCount === 50, `[${w}px] DOM tool card count mismatch: expected 50, got ${toolCardCount}`);

      // Check image load status (naturalWidth > 0, naturalHeight > 0)
      const invalidToolImgs = await page.$$eval('[data-tool-logo] img', imgs => {
        return imgs.filter(img => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0).length;
      });
      assert(invalidToolImgs === 0, `[${w}px] Broken/unrendered tool images found: ${invalidToolImgs}`);

      // Scroll into view & check Client Brand Cards in DOM
      await page.locator('#brand-logos').scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const clientCards = page.locator('[data-client-logo]');
      const clientCardCount = await clientCards.count();
      assert(clientCardCount === 12, `[${w}px] DOM client brand card count mismatch: expected 12, got ${clientCardCount}`);

      const invalidClientImgs = await page.$$eval('[data-client-logo] img', imgs => {
        return imgs.filter(img => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0).length;
      });
      assert(invalidClientImgs === 0, `[${w}px] Broken/unrendered client brand images found: ${invalidClientImgs}`);

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

      // Check card background colors (must be white)
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

    console.log(`\n🎉 TOOL & BRAND LOGO AUTHENTICITY QA COMPLETE: ${passed} assertions passed, ${failed} failed.`);

    if (failed > 0) {
      throw new Error(`Tool & Brand Logo Authenticity QA failed with ${failed} failed assertions.`);
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
