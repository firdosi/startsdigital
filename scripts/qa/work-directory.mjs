import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');

let errors = [];
let passCount = 0;

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error(`❌ FAIL: ${message}`);
  } else {
    passCount++;
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('🚀 Running Work Directory & Internal Data QA Audit...\n');

// 1. Check src/data/brands.ts
const brandsPath = path.join(rootDir, 'src/data/brands.ts');
const brandsText = fs.readFileSync(brandsPath, 'utf-8');

assert(!brandsText.includes('right-link-advisors'), 'Right Link Advisors is not in src/data/brands.ts');
assert(!brandsText.includes('Right Link Advisors'), 'Right Link Advisors name is not in src/data/brands.ts');

const activeBrandMatches = brandsText.match(/active:\s*true/g) || [];
assert(activeBrandMatches.length === 12, `Expected exactly 12 active brands in brands.ts, found ${activeBrandMatches.length}`);

// 2. Check src/data/projects.ts
const projectsPath = path.join(rootDir, 'src/data/projects.ts');
const projectsText = fs.readFileSync(projectsPath, 'utf-8');

assert(!projectsText.includes('right-link-advisors'), 'Right Link Advisors is not in src/data/projects.ts');

const projectRecordMatches = projectsText.match(/id:\s*'([a-z0-9-]+)'/g) || [];
const uniqueProjectIds = new Set(projectRecordMatches.map(m => m.replace(/id:\s*'/, '').replace(/'/, '')));
assert(uniqueProjectIds.size === 12, `Expected exactly 12 internal project records in projects.ts, found ${uniqueProjectIds.size}`);

// 3. Retired Public Route Check
const retiredSlugs = [
  'black-gold-fertilizer',
  'qurbani-campaign',
  'rk-reno-solutions',
  'convortai',
  'rapidline-immigration-services',
  'rapidzone',
  'clearzone-immigration',
  'riyadh-finish-pro',
  'viral-naturals',
  'shopinq-online',
  'super-safety-covers',
  'unique-lahore-lab-sahiwal'
];

for (const slug of retiredSlugs) {
  const routeFile = path.join(rootDir, `src/pages/work/${slug}.astro`);
  assert(!fs.existsSync(routeFile), `Retired route file src/pages/work/${slug}.astro is removed`);
}

// 4. Check Work Index Architecture (Roadmap 8.2 Combined Public Structure)
const workIndexPath = path.join(rootDir, 'src/pages/work/index.astro');
const workIndexText = fs.readFileSync(workIndexPath, 'utf-8');

assert(workIndexText.includes('WorkResultsSection') || workIndexText.includes('CombinedAchievements'), 'Work index page includes WorkResultsSection or CombinedAchievements');
assert(!workIndexText.includes('BrandLogoWall'), 'Work index page has no duplicate BrandLogoWall (BrandMarquee is Homepage only)');
assert(!workIndexText.includes('filter'), 'Work index page has no filtering interface');

// 5. Forbidden marketing claims scan across codebase
const forbiddenTerms = ['cheapest leads', 'guaranteed lead cost', 'lowest lead cost in the market'];
for (const term of forbiddenTerms) {
  assert(!projectsText.toLowerCase().includes(term), `Forbidden term "${term}" is not in projects.ts`);
  assert(!workIndexText.toLowerCase().includes(term), `Forbidden term "${term}" is not in work/index.astro`);
}

console.log(`\n----------------------------------------`);
if (errors.length === 0) {
  console.log(`✨ ALL ${passCount} WORK DIRECTORY QA AUDITS PASSED CLEANLY! (0 errors)\n`);
  process.exit(0);
} else {
  console.error(`💥 WORK DIRECTORY QA AUDIT FAILED with ${errors.length} errors:`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
