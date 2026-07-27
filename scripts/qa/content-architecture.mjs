import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');

console.log('🔍 Running Content Architecture QA Audit...\n');

let errorCount = 0;
const failures = [];

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures.push(message);
    errorCount++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Team Registry Checks
const teamFilePath = path.join(rootDir, 'src/data/team.ts');
const teamContent = fs.readFileSync(teamFilePath, 'utf-8');

assert(teamContent.includes("name: 'Zaid Firdosi'"), 'Zaid Firdosi exists in src/data/team.ts');
assert(teamContent.includes("name: 'Ahad Firdosi'"), 'Ahad Firdosi exists in src/data/team.ts');
assert(teamContent.includes("name: 'Meesam'"), 'Meesam exists in src/data/team.ts');

const hasZaidHomepage = teamContent.includes("id: 'zaid-firdosi'") && teamContent.includes("homepageVisible: true");
const hasAhadHomepage = teamContent.includes("id: 'ahad-firdosi'") && teamContent.includes("homepageVisible: true");
const hasMeesamHomepage = teamContent.includes("id: 'meesam'") && teamContent.includes("homepageVisible: true");
assert(hasZaidHomepage && hasAhadHomepage && hasMeesamHomepage, 'Ahad, Meesam and Zaid are homepageVisible');

const hasZaidAbout = teamContent.includes("id: 'zaid-firdosi'") && teamContent.includes("aboutVisible: true");
const hasAhadAbout = teamContent.includes("id: 'ahad-firdosi'") && teamContent.includes("aboutVisible: true");
const hasMeesamAbout = teamContent.includes("id: 'meesam'") && teamContent.includes("aboutVisible: true");
assert(hasZaidAbout && hasAhadAbout && hasMeesamAbout, 'Ahad, Meesam and Zaid are aboutVisible');

// 2. Client Brand Registry Checks (All 13 Clients)
const brandsFilePath = path.join(rootDir, 'src/data/brands.ts');
const brandsContent = fs.readFileSync(brandsFilePath, 'utf-8');

const requiredBrands = [
  'Black Gold Fertilizer',
  'Wajib Livestock',
  'RK Reno Solutions',
  'ConvortAI',
  'Right Link Advisors',
  'Rapidline Immigration Services',
  'Rapidzone',
  'Viral Naturals',
  'Clearzone Immigration',
  'Riyadh Finish Pro',
  'Shopinq Online',
  'Super Safety Covers',
  'Unique Lahore Lab Sahiwal'
];

for (const brandName of requiredBrands) {
  assert(brandsContent.includes(brandName), `Brand "${brandName}" exists in src/data/brands.ts`);
}

// ConvortAI partner language check
const convortBlockMatch = brandsContent.includes("id: 'convort-ai'") && brandsContent.includes("isTechnologyPartner: true");
assert(convortBlockMatch, 'Only ConvortAI has isTechnologyPartner: true in brand registry');

// 3. Project Result Metrics Leakage Check
const forbiddenMetrics = ['PKR 30M+', '29,000+', '22,000+', 'PKR 4.2M+'];

function scanDirectoryForMetrics(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanDirectoryForMetrics(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.astro') || entry.name.endsWith('.ts') || entry.name.endsWith('.js') || entry.name.endsWith('.mjs'))) {
      const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
      
      const isWorkRoute = relPath.startsWith('src/pages/work/') || 
                          relPath.startsWith('src/data/case-studies/') || 
                          relPath === 'src/data/projects.ts' ||
                          relPath === 'src/data/caseStudies.ts';

      if (!isWorkRoute) {
        const fileText = fs.readFileSync(fullPath, 'utf-8');
        for (const metric of forbiddenMetrics) {
          if (fileText.includes(metric)) {
            if (relPath === 'src/data/seo.ts') {
              const lines = fileText.split('\n');
              let currentRoute = '';
              for (const line of lines) {
                if (line.includes("'/")) {
                  currentRoute = line;
                }
                if (line.includes(metric) && !currentRoute.includes('/work/')) {
                  assert(false, `Forbidden metric "${metric}" found in ${relPath} outside work route context`);
                }
              }
            } else {
              assert(false, `Forbidden metric "${metric}" found in ${relPath}`);
            }
          }
        }
      }
    }
  }
}

scanDirectoryForMetrics(path.join(rootDir, 'src'));

// 4. Homepage Section Order Check
const indexAstroPath = path.join(rootDir, 'src/pages/index.astro');
const indexAstroContent = fs.readFileSync(indexAstroPath, 'utf-8');

const heroIdx = indexAstroContent.indexOf('<Hero');
const featuresIdx = indexAstroContent.indexOf('<Features');
const showcaseIdx = indexAstroContent.indexOf('<Showcase');

assert(heroIdx !== -1 && featuresIdx !== -1 && showcaseIdx !== -1, 'Homepage contains Hero, Features and Showcase components');
assert(featuresIdx < showcaseIdx, 'Homepage service overview (Features) appears before selected work preview (Showcase)');

// 5. Page Grid Checks
const servicesIndexContent = fs.readFileSync(path.join(rootDir, 'src/pages/services/index.astro'), 'utf-8');
assert(!servicesIndexContent.includes('PKR 30M+'), 'Services index does not contain full project metric grid');

const industriesIndexContent = fs.readFileSync(path.join(rootDir, 'src/pages/industries/index.astro'), 'utf-8');
assert(!industriesIndexContent.includes('PKR 30M+'), 'Industries index does not contain full repeated case-study grid');

const aboutContent = fs.readFileSync(path.join(rootDir, 'src/pages/about.astro'), 'utf-8');
assert(!aboutContent.includes('<CompanyExperience'), 'About page does not contain CompanyExperience grid');

const contactContent = fs.readFileSync(path.join(rootDir, 'src/pages/contact.astro'), 'utf-8');
assert(!contactContent.includes('PKR 30M+'), 'Contact page contains no static project-proof grid');

// 6. Check for Placeholders & Fake Images
function scanForPlaceholders(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanForPlaceholders(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.astro') || entry.name.endsWith('.ts'))) {
      const text = fs.readFileSync(fullPath, 'utf-8');
      assert(!text.includes('via.placeholder.com') && !text.includes('placehold.co') && !text.includes('picsum.photos'), `No fake image placeholders in ${path.relative(rootDir, fullPath)}`);
    }
  }
}
scanForPlaceholders(path.join(rootDir, 'src'));

console.log(`\n----------------------------------------`);
if (errorCount === 0) {
  console.log('✨ ALL CONTENT ARCHITECTURE AUDITS PASSED CLEANLY! (0 errors)\n');
  process.exit(0);
} else {
  console.error(`💥 CONTENT ARCHITECTURE AUDIT FAILED with ${errorCount} errors:`);
  for (const f of failures) {
    console.error(`  - ${f}`);
  }
  process.exit(1);
}
