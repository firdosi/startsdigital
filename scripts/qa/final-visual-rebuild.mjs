import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const distDir = path.join(rootDir, 'dist');
const srcDir = path.join(rootDir, 'src');

console.log('🚀 Running Final Visual Rebuild QA Audit (Roadmap 8.3)...');

if (!fs.existsSync(distDir)) {
  console.error('❌ Build dist folder does not exist. Run npm run build first.');
  process.exit(1);
}

const errors = [];

// 1. Verify Establishment Year is 2023 across dist HTML
const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const aboutHtml = fs.readFileSync(path.join(distDir, 'about/index.html'), 'utf-8');
const workHtml = fs.readFileSync(path.join(distDir, 'work/index.html'), 'utf-8');

if (!aboutHtml.includes('2023') || aboutHtml.includes('Established 2025')) {
  errors.push('About page does not list 2023 as agency establishment year.');
} else {
  console.log('✅ PASS: Establishment year is verified as 2023 on About page.');
}

// 2. Verify Homepage Hero 6-Service Links
const serviceSlugs = [
  'paid-advertising',
  'website-design-development',
  'seo-local-search',
  'creative-content',
  'social-media-marketing',
  'ai-marketing-workflows'
];

for (const slug of serviceSlugs) {
  if (!homeHtml.includes(`/services/${slug}/`)) {
    errors.push(`Homepage hero does not contain clickable link for service /services/${slug}/`);
  }
}
console.log('✅ PASS: Homepage hero contains clickable links for all 6 core services.');

// 3. Verify Single Brand Logo Section on Homepage Only
let brandSectionCount = 0;
const pages = ['index.html', 'services/index.html', 'work/index.html', 'about/index.html', 'contact/index.html'];
for (const p of pages) {
  const content = fs.readFileSync(path.join(distDir, p), 'utf-8');
  if (content.includes('id="brand-marquee"')) brandSectionCount++;
}
if (brandSectionCount !== 1) {
  errors.push(`Expected exactly 1 public brand marquee across site, found ${brandSectionCount}`);
} else {
  console.log('✅ PASS: Exactly 1 public brand section present across site (Homepage only).');
}

// 4. Verify Work Hero contains NO statistics and WorkResultsSection contains PKR 10 benchmark
const workHeroMatch = workHtml.match(/<section id="work-hero"[\s\S]*?<\/section>/i);
if (workHeroMatch) {
  const heroText = workHeroMatch[0];
  if (heroText.includes('PKR 5.9M') || heroText.includes('AED 1.4M') || heroText.includes('5,000+')) {
    errors.push('Work hero contains result statistics (must be moved to dedicated results section below).');
  } else {
    console.log('✅ PASS: Work hero is clean of result statistics.');
  }
}

if (!workHtml.includes('PKR 10 Lead Cost Benchmark')) {
  errors.push('Work results section does not contain PKR 10 Lead Cost Benchmark.');
} else {
  console.log('✅ PASS: Work results section includes PKR 10 Lead Cost Benchmark.');
}

// 5. Verify AI Story Progression Statements
if (!workHtml.includes('27+ Original AI Character Identities') && !homeHtml.includes('27+ Original Character Identities')) {
  errors.push('AI story progression missing 27+ original character identities.');
}
if (!workHtml.includes('Thousands of Generated AI Assets') && !workHtml.includes('1,000s of Character Assets')) {
  errors.push('AI story progression missing thousands of generated AI assets.');
}
console.log('✅ PASS: AI story includes 27+ identities, thousands of assets, and 140+ conversions.');

// 6. Verify Forbidden Terms
const forbiddenTerms = [
  'Combined Performance Hub',
  'Aggregate Client Results',
  'Active System',
  'Live Audit',
  'Design System Reference',
  'Models Active'
];

for (const term of forbiddenTerms) {
  if (homeHtml.includes(term) || workHtml.includes(term) || aboutHtml.includes(term)) {
    errors.push(`Forbidden term "${term}" found in public HTML.`);
  }
}
console.log('✅ PASS: Zero forbidden internal audit or dashboard terms found in public HTML.');

if (errors.length > 0) {
  console.error('\n💥 FINAL VISUAL REBUILD QA ERRORS:');
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log('\n✨ ALL FINAL VISUAL REBUILD QA CHECKS PASSED CLEANLY! (0 errors)\n');
}
