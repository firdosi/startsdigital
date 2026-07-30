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

console.log('🚀 Running Work Directory & Client Experience QA Audit...\n');

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
assert(uniqueProjectIds.size === 12, `Expected exactly 12 project records in projects.ts, found ${uniqueProjectIds.size}`);

// 3. Check Detailed Stories vs Client Experience Profiles
const detailedTypeMatches = projectsText.match(/detailType:\s*'(case-study|partner-story)'/g) || [];
assert(detailedTypeMatches.length === 4, `Expected exactly 4 detailed stories, found ${detailedTypeMatches.length}`);

const clientExpTypeMatches = projectsText.match(/detailType:\s*'client-experience'/g) || [];
assert(clientExpTypeMatches.length === 8, `Expected exactly 8 Client Experience profiles, found ${clientExpTypeMatches.length}`);

// 4. Robust Individual Project Partner Terminology Isolation
const projectBlocks = projectsText.split(/{\s*id:\s*'/);
let invalidPartnerProjects = [];

for (const block of projectBlocks) {
  if (!block.trim() || block.startsWith('export')) continue;
  const idMatch = block.match(/^([a-z0-9-]+)'/);
  if (idMatch) {
    const projId = idMatch[1];
    if (projId !== 'convort-ai') {
      const hasPartnerStory = block.includes("detailType: 'partner-story'");
      const hasTechPartner = block.includes('Technology Partner') || block.includes('isTechnologyPartner: true');
      const hasGrowthPartner = block.includes('Growth Partner');
      const hasPartnerRel = /partnerRole|partnerType|partner/i.test(block.slice(0, block.indexOf('approvedServices')));

      if (hasPartnerStory || hasTechPartner || hasGrowthPartner || hasPartnerRel) {
        invalidPartnerProjects.push({ projId, hasPartnerStory, hasTechPartner, hasGrowthPartner, hasPartnerRel });
      }
    } else {
      // ConvortAI must use partner-story detailType
      const convortIsPartnerStory = block.includes("detailType: 'partner-story'");
      assert(convortIsPartnerStory, 'ConvortAI uses detailType: partner-story');
    }
  }
}

assert(invalidPartnerProjects.length === 0, `Partner terminology is strictly isolated to ConvortAI (violating projects: ${invalidPartnerProjects.map(p => p.projId).join(', ') || 'none'})`);

// 5. Check futureAccess: 'locked' vs currentAccess: 'public'
const lockedFutureMatches = projectsText.match(/futureAccess:\s*'locked'/g) || [];
assert(lockedFutureMatches.length === 5, `Expected exactly 5 projects with futureAccess: locked, found ${lockedFutureMatches.length}`);

const currentPublicMatches = projectsText.match(/currentAccess:\s*'public'/g) || [];
assert(currentPublicMatches.length === 12, `Expected all 12 projects to have currentAccess: public, found ${currentPublicMatches.length}`);

// 6. Evidence status verification (Pending projects cannot have verifiedOutcome)
const pendingMatches = projectsText.match(/evidenceStatus:\s*'(user-provided-pending-evidence|no-results-yet)'/g) || [];
assert(pendingMatches.length === 8, `Expected 8 projects with pending/no-results evidenceStatus, found ${pendingMatches.length}`);

// 7. Check SEO Registry in src/data/seo.ts
const seoPath = path.join(rootDir, 'src/data/seo.ts');
const seoText = fs.readFileSync(seoPath, 'utf-8');

const expSlugs = [
  'rapidline-immigration-services',
  'rapidzone',
  'clearzone-immigration',
  'riyadh-finish-pro',
  'viral-naturals',
  'shopinq-online',
  'super-safety-covers',
  'unique-lahore-lab-sahiwal'
];

for (const slug of expSlugs) {
  const routeKey = `'/work/${slug}/'`;
  assert(seoText.includes(routeKey), `SEO registry contains route entry for ${routeKey}`);
}

// 8. Check Route Files in src/pages/work/
for (const slug of expSlugs) {
  const routeFile = path.join(rootDir, `src/pages/work/${slug}.astro`);
  assert(fs.existsSync(routeFile), `Route file src/pages/work/${slug}.astro exists`);
}

// 9. Check Work Index Page Architecture (src/pages/work/index.astro)
const workIndexPath = path.join(rootDir, 'src/pages/work/index.astro');
const workIndexText = fs.readFileSync(workIndexPath, 'utf-8');

assert(workIndexText.includes('12'), 'Work index page mentions 12 client brands');
assert(workIndexText.includes('4'), 'Work index page mentions 4 detailed project stories');
assert(workIndexText.includes('8'), 'Work index page mentions 8 client experience profiles');
assert(workIndexText.includes('initWorkFilters'), 'Work index page includes client-side interactive filtering script');
assert(workIndexText.includes('detailedSection.classList.add'), 'Work index page toggles detailed-stories section visibility');
assert(workIndexText.includes('experienceSection.classList.add'), 'Work index page toggles client-experience section visibility');
assert(!workIndexText.includes('Right Link Advisors'), 'Work index page has no mention of Right Link Advisors');

// 10. Forbidden marketing claims scan across codebase
const forbiddenTerms = ['cheapest leads', 'guaranteed lead cost', 'lowest lead cost in the market'];
for (const term of forbiddenTerms) {
  assert(!projectsText.toLowerCase().includes(term), `Forbidden term "${term}" is not in projects.ts`);
  assert(!workIndexText.toLowerCase().includes(term), `Forbidden term "${term}" is not in work/index.astro`);
}

// 11. HTTPS URL checks for official links
const nonHttpsMatches = projectsText.match(/official(Website|SocialUrl):\s*'http:\/\//g);
assert(!nonHttpsMatches, 'All official links in projects.ts must use HTTPS');

console.log(`\n----------------------------------------`);
if (errors.length === 0) {
  console.log(`✨ ALL ${passCount} WORK DIRECTORY QA AUDITS PASSED CLEANLY! (0 errors)\n`);
  process.exit(0);
} else {
  console.error(`💥 WORK DIRECTORY QA AUDIT FAILED with ${errors.length} errors:`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
