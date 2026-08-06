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
  'AI & Automation': 8
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

const prohibitedAssets = [
  'public/platforms/capcut.svg',
  'public/platforms/chatgpt.svg',
  'public/platforms/kling-ai.svg',
  'public/platforms/microsoft-clarity.svg',
  'public/platforms/google-trends.svg',
  'public/platforms/google-workspace.svg',
  'public/platforms/codex.svg',
  'public/platforms/meta-pixel.svg',
  'public/platforms/google-ads-conversion-tracking.svg'
];

const rootReviewPngs = [
  'brand-wall-final-1440.png',
  'brand-wall-final-390.png',
  'tool-logo-quality-closeup.png',
  'tools-ecosystem-final-1024.png',
  'tools-ecosystem-final-1440.png',
  'tools-ecosystem-final-390.png',
  'tools-ecosystem-polished-1440.png',
  'tools-ecosystem-polished-1024.png',
  'tools-ecosystem-polished-390.png',
  'brand-wall-polished-1440.png',
  'brand-wall-polished-390.png',
  'brand-logo-contrast-closeup.png',
  'brand-wall-final-check-1440.png',
  'brand-wall-final-check-390.png',
  'brand-logo-final-contrast-closeup.png',
  'brand-wall-black-gold-final-1440.png',
  'brand-wall-black-gold-final-390.png',
  'black-gold-brand-card-closeup.png'
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
  console.log('🚀 Running Authentic Tool Provenance & Brand Logo QA Audit...');

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

  // 1. NO REVIEW PNG EXISTS IN ROOT & SCRATCH DIR IS IGNORED
  rootReviewPngs.forEach(png => {
    const fullPath = path.join(process.cwd(), png);
    assert(!fs.existsSync(fullPath), `Review PNG file must not exist in repository root: ${png}`);
  });

  const gitignoreContent = fs.readFileSync(path.join(process.cwd(), '.gitignore'), 'utf8');
  assert(gitignoreContent.includes('scratch/'), `.gitignore must contain 'scratch/' to ignore local review screenshots`);

  // 2. PROHIBITED UNUSED & HANDMADE ASSETS CHECK
  prohibitedAssets.forEach(p => {
    const fullPath = path.join(process.cwd(), p);
    assert(!fs.existsSync(fullPath), `Prohibited / unused SVG asset still exists on disk: ${p}`);
  });

  // 3. UNUSED PLATFORM SVG AUDIT
  assert(fs.existsSync(REGISTER_FILE), `Source register file missing at ${REGISTER_FILE}`);
  const toolEcosystem = JSON.parse(fs.readFileSync(REGISTER_FILE, 'utf-8'));
  assert(toolEcosystem.length === 49, `Register entry count mismatch: expected 49, got ${toolEcosystem.length}`);

  const activeLocalAssets = new Set(toolEcosystem.map(t => t.localAsset).filter(Boolean));
  const allPlatformFiles = fs.readdirSync(path.join(process.cwd(), 'public/platforms'));
  allPlatformFiles.forEach(file => {
    if (file === '.gitkeep') return;
    const relPath = `/platforms/${file}`;
    assert(activeLocalAssets.has(relPath), `Unused platform asset found in public/platforms: ${file}`);
  });

  // 4. DATA & SOURCE REGISTER PROVENANCE AUDIT
  const chatgptEntry = toolEcosystem.find(t => t.id === 'chatgpt');
  assert(!chatgptEntry, `ChatGPT must not be a separate tool entry in register (must be capability under OpenAI)`);

  const openaiEntry = toolEcosystem.find(t => t.id === 'openai');
  assert(!!openaiEntry, `OpenAI entry must exist in register`);

  const toolIds = new Set();
  const approvedVendorCDNDomains = ['gstatic.com', 'sanity.io', 'google.com', 'heygen.com'];

  toolEcosystem.forEach(t => {
    assert(!toolIds.has(t.id), `Duplicate tool ID found: ${t.id}`);
    toolIds.add(t.id);

    assert(!!t.id, `Missing id for tool entry`);
    assert(!!t.name, `Missing name for tool entry: ${t.id}`);
    assert(!!t.sourceType, `Missing sourceType for tool entry: ${t.id}`);
    assert(!!t.officialSourcePage, `Missing officialSourcePage for tool entry: ${t.id}`);
    assert(!!t.directAssetUrl, `Missing directAssetUrl for tool entry: ${t.id}`);
    assert(!!t.originalFileName, `Missing originalFileName for tool entry: ${t.id}`);
    assert(!!t.originalFileHash, `Missing originalFileHash for tool entry: ${t.id}`);
    assert(!!t.localAssetHash, `Missing localAssetHash for tool entry: ${t.id}`);
    assert(!!t.transformationApplied, `Missing transformationApplied for tool entry: ${t.id}`);
    assert(!!t.verificationNotes, `Missing verificationNotes for tool entry: ${t.id}`);

    if (t.directAssetUrl.includes('simple-icons')) {
      assert(t.sourceType === 'third-party-simple-icons', `Tool [${t.id}] with simple-icons URL must have sourceType=third-party-simple-icons (got ${t.sourceType})`);
    }

    if (t.sourceType === 'official-vendor') {
      try {
        const u = new URL(t.directAssetUrl);
        const host = u.hostname.toLowerCase();
        assert(approvedVendorCDNDomains.some(d => host.includes(d)), `Tool [${t.id}] has official-vendor sourceType but non-vendor directAssetUrl host: ${host}`);
      } catch (err) {
        assert(false, `Invalid directAssetUrl for [${t.id}]: ${t.directAssetUrl}`);
      }
    }

    if (t.sourceType === 'capability-no-standalone-logo') {
      assert(t.localAsset === null, `Capability-only tool [${t.id}] must have localAsset set to null`);
      assert(t.directAssetUrl.includes('Capability text item') || t.directAssetUrl === 'N/A', `Capability-only tool [${t.id}] must document text capability status in directAssetUrl`);
      assert(t.originalFileHash === 'N/A', `Capability-only tool [${t.id}] originalFileHash must be 'N/A'`);
      assert(t.localAssetHash === 'N/A', `Capability-only tool [${t.id}] localAssetHash must be 'N/A'`);
    } else {
      assert(!!t.localAsset, `Logo tool [${t.id}] must have localAsset relative path`);
      assert(/^[a-f0-9]{64}$/.test(t.originalFileHash), `Tool [${t.id}] originalFileHash must be 64-char hex SHA-256 (got '${t.originalFileHash}')`);
      assert(/^[a-f0-9]{64}$/.test(t.localAssetHash), `Tool [${t.id}] localAssetHash must be 64-char hex SHA-256 (got '${t.localAssetHash}')`);

      const localAssetPath = path.join(process.cwd(), 'public', t.localAsset);
      assert(fs.existsSync(localAssetPath), `Local tool asset missing: ${localAssetPath}`);

      if (fs.existsSync(localAssetPath)) {
        const fileContent = fs.readFileSync(localAssetPath);
        const computedHash = getHash(fileContent);
        assert(computedHash === t.localAssetHash, `Local asset hash mismatch for [${t.id}]: expected ${t.localAssetHash}, got ${computedHash}`);
      }
    }
  });

  // 5. CATEGORY DISTRIBUTION AUDIT
  for (const [cat, expectedCount] of Object.entries(expectedCategories)) {
    const count = toolEcosystem.filter(t => t.category === cat).length;
    assert(count === expectedCount, `Category [${cat}] count mismatch: expected ${expectedCount}, got ${count}`);
  }

  // 6. CLIENT BRAND AUDIT
  assert(expectedClientBrandIds.length === 12, 'Expected exactly 12 client brand IDs');

  const brandsDataContent = fs.readFileSync(path.join(process.cwd(), 'src/data/brands.ts'), 'utf8');
  const rapidzoneBlock = (brandsDataContent.match(/id:\s*'rapidzone'[\s\S]*?\}/) || [''])[0];
  assert(rapidzoneBlock.includes('darkLogoContainer: true'), 'Rapidzone must use darkLogoContainer: true contrast treatment');

  const wajibBlock = (brandsDataContent.match(/id:\s*'wajib-livestock'[\s\S]*?\}/) || [''])[0];
  assert(wajibBlock.includes('darkLogoContainer: true'), 'Wajib Livestock must use darkLogoContainer: true contrast treatment');

  const convortBlock = (brandsDataContent.match(/id:\s*'convort-ai'[\s\S]*?\}/) || [''])[0];
  assert(convortBlock.includes('darkLogoContainer: true'), 'Convort AI must use darkLogoContainer: true contrast treatment');

  const blackGoldBlock = (brandsDataContent.match(/id:\s*'black-gold-fertilizer'[\s\S]*?\}/) || [''])[0];
  assert(blackGoldBlock && !blackGoldBlock.includes('darkLogoContainer: true'), 'Black Gold Fertilizer must use white card without dark inner plate');

  // Load ts data to get total configured capability count
  const tsFile = fs.readFileSync(path.join(process.cwd(), 'src/data/tool-ecosystem.ts'), 'utf8');
  const configuredCapabilitiesMatch = tsFile.match(/"capabilities":\s*\[\s*([\s\S]*?)\s*\]/g) || [];
  let totalConfiguredCapabilities = 0;
  configuredCapabilitiesMatch.forEach(m => {
    const items = m.match(/"([^"]+)"/g) || [];
    // Ignore the key "capabilities" itself
    const caps = items.filter(i => i !== '"capabilities"');
    totalConfiguredCapabilities += caps.length;
  });

  // 7. PLAYWRIGHT RUNTIME DOM & VISUAL ALIGNMENT AUDIT
  const server = createStaticServer();
  await new Promise(res => server.listen(PORT, res));

  const browser = await chromium.launch({ headless: true });

  const viewports = [1440, 1024, 390];

  try {
    for (const w of viewports) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 1000 } });
      const page = await ctx.newPage();

      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });

      // Scroll into view & trigger immediate image loading across all cards
      await page.locator('#platforms').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#platforms img, #brand-logos img'));
        imgs.forEach(img => {
          img.loading = 'eager';
          img.src = img.src;
        });
        await Promise.all(imgs.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(res => { img.onload = res; img.onerror = res; });
        }));
      });
      await page.waitForTimeout(400);

      const toolCards = page.locator('[data-tool-logo]');
      const toolCardCount = await toolCards.count();
      assert(toolCardCount === 49, `[${w}px] DOM tool card count mismatch: expected 49, got ${toolCardCount}`);

      // Verify logo cards render image and capability-only cards render without an image
      const capTextCount = await page.$$eval('[data-tool-logo][data-render-type="capability-text"]', els => els.length);
      assert(capTextCount === 5, `[${w}px] Capability text card count mismatch: expected 5, got ${capTextCount}`);

      const capImgsCount = await page.$$eval('[data-tool-logo][data-render-type="capability-text"] img', imgs => imgs.length);
      assert(capImgsCount === 0, `[${w}px] Prohibited image elements found inside capability-text items: ${capImgsCount}`);

      // Check image load status for verified logo cards
      const invalidToolImgs = await page.$$eval('[data-tool-logo][data-render-type="logo"] img', imgs => {
        return imgs.filter(img => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0).length;
      });
      assert(invalidToolImgs === 0, `[${w}px] Broken/unrendered tool images found: ${invalidToolImgs}`);

      // Capability count in DOM matches configured capabilities in data exactly
      const domCapChips = await page.$$eval('[data-capability-chip]', els => els.map(e => e.getAttribute('data-capability-chip')));
      assert(domCapChips.length === totalConfiguredCapabilities, `[${w}px] DOM capability chip count mismatch: expected ${totalConfiguredCapabilities}, got ${domCapChips.length}`);

      // OpenAI renders all four expected capabilities
      const openaiCaps = await page.$$eval('[data-tool-id="openai"] [data-capability-chip]', els => els.map(e => e.textContent.trim()));
      const expectedOpenAICaps = ['ChatGPT', 'Codex', 'API Workflows', 'Custom GPTs'];
      assert(openaiCaps.length === 4, `[${w}px] OpenAI capability chip count mismatch: expected 4, got ${openaiCaps.length}`);
      expectedOpenAICaps.forEach(cap => {
        assert(openaiCaps.includes(cap), `[${w}px] OpenAI missing expected capability chip: ${cap}`);
      });

      // Meta Pixel renders as text chip, NOT an image element
      const metaPixelChips = await page.$$eval('[data-tool-id="meta-ads"] [data-capability-chip]', els => els.map(e => e.textContent.trim()));
      assert(metaPixelChips.includes('Meta Pixel'), `[${w}px] Meta Ads missing 'Meta Pixel' capability text chip`);
      const metaPixelImgCount = await page.$$eval('img[src*="meta-pixel"]', els => els.length);
      assert(metaPixelImgCount === 0, `[${w}px] Prohibited meta-pixel image element found in DOM: ${metaPixelImgCount}`);

      // Conversion Tracking renders as text chip, NOT an image element
      const conversionTrackingChips = await page.$$eval('[data-tool-id="google-ads"] [data-capability-chip]', els => els.map(e => e.textContent.trim()));
      assert(conversionTrackingChips.includes('Conversion Tracking'), `[${w}px] Google Ads missing 'Conversion Tracking' capability text chip`);
      const conversionImgCount = await page.$$eval('img[src*="conversion-tracking"]', els => els.length);
      assert(conversionImgCount === 0, `[${w}px] Prohibited conversion-tracking image element found in DOM: ${conversionImgCount}`);

      // No text clipping across tool cards
      const textClippingCount = await page.$$eval('[data-tool-logo]', cards => {
        return cards.filter(card => {
          const headings = Array.from(card.querySelectorAll('h3, span'));
          return headings.some(el => el.scrollWidth > el.clientWidth + 2);
        }).length;
      });
      assert(textClippingCount === 0, `[${w}px] Tool cards with text clipping found: ${textClippingCount}`);

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

      // Verify DOM inner dark plate treatment for contrast brands
      const rapidzoneHasPlate = await page.$eval('[data-client-brand-id="rapidzone"]', card => !!card.querySelector('.bg-\\[\\#061d33\\]'));
      assert(rapidzoneHasPlate, `[${w}px] Rapidzone card missing required dark inner plate`);

      const wajibHasPlate = await page.$eval('[data-client-brand-id="wajib-livestock"]', card => !!card.querySelector('.bg-\\[\\#061d33\\]'));
      assert(wajibHasPlate, `[${w}px] Wajib Livestock card missing required dark inner plate`);

      const convortHasPlate = await page.$eval('[data-client-brand-id="convort-ai"]', card => !!card.querySelector('.bg-\\[\\#061d33\\]'));
      assert(convortHasPlate, `[${w}px] Convort AI card missing required dark inner plate`);

      const blackGoldHasPlate = await page.$eval('[data-client-brand-id="black-gold-fertilizer"]', card => !!card.querySelector('.bg-\\[\\#061d33\\]'));
      assert(!blackGoldHasPlate, `[${w}px] Black Gold Fertilizer must not have dark inner plate`);

      // Verify Black Gold Fertilizer contains restored green leaf logo mark and separate business name text
      const blackGoldText = await page.$eval('[data-client-brand-id="black-gold-fertilizer"]', card => card.textContent.trim());
      assert(blackGoldText.includes('Black Gold Fertilizer'), `[${w}px] Black Gold Fertilizer card missing separate business name HTML text`);

      const blackGoldHasLeafMark = await page.$eval('[data-client-brand-id="black-gold-fertilizer"] img', img => {
        return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0 && img.naturalWidth / img.naturalHeight > 1.4;
      });
      assert(blackGoldHasLeafMark, `[${w}px] Black Gold Fertilizer card must display restored green leaf logo mark (product pouch prohibited)`);

      // Verify no duplicate desktop/mobile trees
      const brandSectionCards = await page.$$eval('#brand-logos [data-client-logo]', els => els.length);
      assert(brandSectionCards === 12, `[${w}px] Expected exactly 12 brand cards inside #brand-logos section, got ${brandSectionCards}`);

      // Verify white card backgrounds
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

    console.log(`\n🎉 PROVENANCE & BRAND LOGO QA COMPLETE: ${passed} assertions passed, ${failed} failed.`);

    if (failed > 0) {
      process.exit(1);
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
