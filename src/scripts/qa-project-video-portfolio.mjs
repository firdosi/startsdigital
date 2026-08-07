import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');

function runQA() {
  console.log('==================================================');
  console.log('RUNNING COMPREHENSIVE QA AUTOMATED AUDIT');
  console.log('==================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Check Homepage HTML (dist/index.html)
  const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

  const brandPos = homeHtml.indexOf('id="brand-logos"');
  const toolPos = homeHtml.indexOf('id="platform-preview"');
  assert(brandPos !== -1 && toolPos !== -1 && brandPos < toolPos, 'Homepage: Brand section appears BEFORE compact tool preview');

  assert(!homeHtml.includes('id="platforms"'), 'Homepage: Full PlatformGrid does NOT appear on homepage');
  assert(homeHtml.includes('/tools/'), 'Homepage: Tool preview links to /tools/');

  const logoMatches = homeHtml.match(/data-client-brand-id=/g) || [];
  assert(logoMatches.length === 13, `Homepage: Exactly 13 brand logo cards rendered (found ${logoMatches.length})`);
  assert(homeHtml.includes('data-client-brand-id="my-coach-live"'), 'Homepage: My Coach Live brand tile exists in brand wall');

  const previewToolMatches = homeHtml.match(/data-tool-id=/g) || [];
  assert(previewToolMatches.length <= 12, `Homepage: Compact tool preview contains <= 12 cards (found ${previewToolMatches.length})`);

  // 2. Check Tools Page (dist/tools/index.html)
  const toolsHtml = fs.readFileSync(path.join(DIST_DIR, 'tools/index.html'), 'utf8');
  assert(toolsHtml.includes('id="platforms"'), 'Tools Page: Full PlatformGrid section exists');

  const allToolMatches = toolsHtml.match(/data-tool-id=/g) || [];
  assert(allToolMatches.length >= 49, `Tools Page: Contains all ecosystem tools (found ${allToolMatches.length})`);

  const categories = [
    'Advertising & Social Platforms',
    'Analytics, Search & Tracking',
    'Websites, Development & Commerce',
    'Design, Content & Video',
    'Communication & Business Operations',
    'AI & Automation'
  ];
  categories.forEach(cat => {
    const htmlCat = cat.replace(/&/g, '&amp;');
    assert(toolsHtml.includes(htmlCat) || toolsHtml.includes(cat), `Tools Page: Preserves category "${cat}"`);
  });

  // 3. Check Work Hub Page (dist/work/index.html)
  const workHtml = fs.readFileSync(path.join(DIST_DIR, 'work/index.html'), 'utf8');
  assert(workHtml.includes('id="selected-projects"'), 'Work Page: Contains SELECTED PROJECT WORK section');
  assert(workHtml.includes('/work/my-coach-live/'), 'Work Page: Links to /work/my-coach-live/');
  assert(workHtml.includes('/work/convort-ai/'), 'Work Page: Links to /work/convort-ai/');
  assert(workHtml.includes('/work/shopinq-online/'), 'Work Page: Links to /work/shopinq-online/');

  // 4. Check Project Pages HTML
  const mcHtml = fs.readFileSync(path.join(DIST_DIR, 'work/my-coach-live/index.html'), 'utf8');
  const mcVideoCards = mcHtml.match(/data-youtube-id=/g) || [];
  assert(mcVideoCards.length === 10, `My Coach Live Page: Contains exactly 10 video cards (found ${mcVideoCards.length})`);
  assert(mcHtml.includes('https://my-coach.live/'), 'My Coach Live Page: Contains link to my-coach.live');
  assert(mcHtml.includes('youtube-nocookie.com/embed/'), 'My Coach Live Page: Uses youtube-nocookie.com embed URL');
  assert(!mcHtml.includes('<iframe'), 'My Coach Live Page: Zero fully loaded iframes on initial load (click-to-load)');

  const caHtml = fs.readFileSync(path.join(DIST_DIR, 'work/convort-ai/index.html'), 'utf8');
  const caVideoCards = caHtml.match(/data-youtube-id=/g) || [];
  assert(caVideoCards.length === 4, `ConvortAI Page: Contains exactly 4 video cards (found ${caVideoCards.length})`);

  const soHtml = fs.readFileSync(path.join(DIST_DIR, 'work/shopinq-online/index.html'), 'utf8');
  const soVideoCards = soHtml.match(/data-youtube-id=/g) || [];
  assert(soVideoCards.length === 16, `Shopinq Online Page: Contains exactly 16 video cards (found ${soVideoCards.length})`);

  console.log('\n==================================================');
  console.log(`QA SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runQA();
