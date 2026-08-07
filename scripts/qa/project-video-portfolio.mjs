import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');
const DIST_DIR = path.join(rootDir, 'dist');

async function runPortfolioQA() {
  console.log('==================================================');
  console.log('RUNNING PROJECT VIDEO PORTFOLIO & ECOSYSTEM QA');
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

  // Import toolEcosystem & video data
  const { toolEcosystem } = await import('../../src/data/tool-ecosystem.ts');
  const { projectVideos, videoProjects } = await import('../../src/data/project-videos.ts');

  // --- SECTION 6: TOOL ECOSYSTEM CALCULATIONS ---
  const uniqueToolCount = toolEcosystem.length;
  const verifiedLogoCount = toolEcosystem.filter(t => t.renderType === 'logo').length;
  const capabilityOnlyCount = toolEcosystem.filter(t => t.renderType === 'capability-text').length;
  const capabilityChipCount = toolEcosystem.reduce((sum, t) => sum + (t.capabilities ? t.capabilities.length : 0), 0);

  console.log('📊 TOOL ECOSYSTEM STATISTICAL METRICS:');
  console.log(`  A. Unique Tool Data Entries: ${uniqueToolCount}`);
  console.log(`  B. Verified Logo Entries: ${verifiedLogoCount}`);
  console.log(`  C. Capability-Only Entries: ${capabilityOnlyCount}`);
  console.log(`  D. Capability Chip Count: ${capabilityChipCount}`);

  assert(uniqueToolCount === 49, `Unique Tool Data Entries equals 49 (found ${uniqueToolCount})`);

  // --- 1. HOMEPAGE CHECKS ---
  const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

  const brandPos = homeHtml.indexOf('id="brand-logos"');
  const toolPos = homeHtml.indexOf('id="platform-preview"');
  assert(brandPos !== -1 && toolPos !== -1 && brandPos < toolPos, 'Homepage: Brand section appears BEFORE compact tool preview');

  assert(!homeHtml.includes('id="platforms"'), 'Homepage: Full PlatformGrid does NOT appear on homepage');
  assert(homeHtml.includes('/tools/'), 'Homepage: Tool preview links to /tools/');

  const logoMatches = homeHtml.match(/data-client-brand-id=/g) || [];
  assert(logoMatches.length === 13, `Homepage: Exactly 13 brand logo cards rendered (found ${logoMatches.length})`);
  assert(homeHtml.includes('data-client-brand-id="my-coach-live"'), 'Homepage: My Coach Live brand card exists');
  assert(!homeHtml.includes('>MC<'), 'Homepage: No invented "MC" monogram icon box in brand wall');

  const previewToolMatches = homeHtml.match(/data-tool-id=/g) || [];
  assert(previewToolMatches.length === 12, `Homepage: Compact tool preview contains exactly 12 unique tool cards (found ${previewToolMatches.length})`);

  // --- 2. TOOLS PAGE CHECKS ---
  const toolsHtml = fs.readFileSync(path.join(DIST_DIR, 'tools/index.html'), 'utf8');
  assert(toolsHtml.includes('id="platforms"'), 'Tools Page: Full PlatformGrid section exists');

  const renderedToolDomOccurrences = (toolsHtml.match(/data-tool-id=/g) || []).length;
  console.log(`  E. Rendered data-tool-id DOM Occurrences on /tools/: ${renderedToolDomOccurrences}`);

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

  // --- 3. VIDEO DATA & PROJECT CHECKS ---
  const allVideoIds = projectVideos.map(v => v.youtubeId);
  const uniqueVideoIds = new Set(allVideoIds);
  assert(allVideoIds.length === 30, `Video Data: Exactly 30 total video entries defined (found ${allVideoIds.length})`);
  assert(uniqueVideoIds.size === 30, `Video Data: Exactly 30 unique YouTube IDs (no duplicates)`);

  const mcVideos = projectVideos.filter(v => v.projectId === 'my-coach-live');
  const caVideos = projectVideos.filter(v => v.projectId === 'convort-ai');
  const soVideos = projectVideos.filter(v => v.projectId === 'shopinq-online');

  assert(mcVideos.length === 10, `Video Data: My Coach Live App has 10 Shorts (found ${mcVideos.length})`);
  assert(caVideos.length === 4, `Video Data: ConvortAI has 4 Shorts (found ${caVideos.length})`);
  assert(soVideos.length === 16, `Video Data: Shopinq Online has 16 Shorts (found ${soVideos.length})`);

  // --- 4. PROJECT PAGES HTML CHECKS ---
  const mcHtml = fs.readFileSync(path.join(DIST_DIR, 'work/my-coach-live/index.html'), 'utf8');
  const mcVideoCards = mcHtml.match(/data-youtube-id=/g) || [];
  assert(mcVideoCards.length === 10, `My Coach Live Page: Renders 10 video cards (found ${mcVideoCards.length})`);
  assert(mcHtml.includes('https://my-coach.live/'), 'My Coach Live Page: Contains link to my-coach.live');
  assert(mcHtml.includes('youtube-nocookie.com/embed/'), 'My Coach Live Page: Embed URL uses youtube-nocookie.com');
  assert(!mcHtml.includes('<iframe'), 'My Coach Live Page: Initial iframe count is 0 (click-to-load)');

  const caHtml = fs.readFileSync(path.join(DIST_DIR, 'work/convort-ai/index.html'), 'utf8');
  const caVideoCards = caHtml.match(/data-youtube-id=/g) || [];
  assert(caVideoCards.length === 4, `ConvortAI Page: Renders 4 video cards (found ${caVideoCards.length})`);

  const soHtml = fs.readFileSync(path.join(DIST_DIR, 'work/shopinq-online/index.html'), 'utf8');
  const soVideoCards = soHtml.match(/data-youtube-id=/g) || [];
  assert(soVideoCards.length === 16, `Shopinq Online Page: Renders 16 video cards (found ${soVideoCards.length})`);

  console.log('\n==================================================');
  console.log(`PORTFOLIO QA SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runPortfolioQA();
