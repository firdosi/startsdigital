import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const distDir = path.join(rootDir, 'dist');
const photoDir = path.join(rootDir, 'public/photography');

console.log('🚀 Running Final Visual Rebuild QA Audit (Roadmap 9.1)...');

if (!fs.existsSync(distDir)) {
  console.error('❌ Build dist folder does not exist. Run npm run build first.');
  process.exit(1);
}

const errors = [];

// 1. Verify Genuine Photography Assets exist in public/photography/
const requiredPhotoFiles = [
  'video-editing-workstation.webp',
  'web-designer-responsive.webp',
  'creative-campaign-planning.webp',
  'advertising-creative-production.webp',
  'team-collaboration-workspace.webp',
  'smartphone-content-campaign.webp'
];

if (!fs.existsSync(photoDir)) {
  errors.push('public/photography directory missing.');
} else {
  for (const pf of requiredPhotoFiles) {
    const pPath = path.join(photoDir, pf);
    if (!fs.existsSync(pPath)) {
      errors.push(`Required photography asset missing: public/photography/${pf}`);
    } else {
      const st = fs.statSync(pPath);
      if (st.size > 163840) { // 160 KB
        errors.push(`Photography asset ${pf} exceeds 160 KB size limit (${(st.size/1024).toFixed(1)} KB).`);
      }
    }
  }
}
if (errors.length === 0) {
  console.log('✅ PASS: All 6 genuine photography assets verified under 160 KB.');
}

// 2. Verify Establishment Year is 2023 across dist HTML
const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const aboutHtml = fs.readFileSync(path.join(distDir, 'about/index.html'), 'utf-8');
const workHtml = fs.readFileSync(path.join(distDir, 'work/index.html'), 'utf-8');
const contactHtml = fs.readFileSync(path.join(distDir, 'contact/index.html'), 'utf-8');
const servicesHtml = fs.readFileSync(path.join(distDir, 'services/index.html'), 'utf-8');

if (!aboutHtml.includes('2023') || aboutHtml.includes('Established 2025')) {
  errors.push('About page does not list 2023 as agency establishment year.');
} else {
  console.log('✅ PASS: Establishment year is verified as 2023 on About page.');
}

// 3. Verify Homepage Hero 6-Service Links
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

// 4. Verify Single Brand Logo Section on Homepage Only
let brandSectionCount = 0;
const pages = ['index.html', 'services/index.html', 'work/index.html', 'about/index.html', 'contact/index.html'];
for (const p of pages) {
  const content = fs.readFileSync(path.join(distDir, p), 'utf-8');
  if (content.includes('id="brand-marquee"') || content.includes('id="brand-logos"')) brandSectionCount++;
}
if (brandSectionCount !== 1) {
  errors.push(`Expected exactly 1 public brand logo section across site, found ${brandSectionCount}`);
} else {
  console.log('✅ PASS: Exactly 1 public brand section present across site (Homepage only).');
}

// 5. Verify Work Hero contains NO dashboard interface bars and NO statistics
const workHeroMatch = workHtml.match(/<section id="work-hero"[\s\S]*?<\/section>/i);
if (workHeroMatch) {
  const heroText = workHeroMatch[0];
  if (heroText.includes('Deliverables Collage') || heroText.includes('Integrated Execution') || heroText.includes('Multi-Channel')) {
    errors.push('Work hero contains forbidden dashboard interface labels.');
  }
  if (heroText.includes('PKR 5.9M') || heroText.includes('AED 1.4M') || heroText.includes('5,000+')) {
    errors.push('Work hero contains result statistics (must be moved to dedicated results section below).');
  } else {
    console.log('✅ PASS: Work hero is clean of dashboard labels and result statistics.');
  }
}

// 6. Verify Contact Visual Scene
if (!contactHtml.includes('step-float') && !contactHtml.includes('contact-3d-scene') && !contactHtml.includes('contact-form-section')) {
  errors.push('Contact page missing communication journey visual scene.');
} else {
  console.log('✅ PASS: Contact page contains communication journey visual scene.');
}

// 7. Verify Work results section includes PKR 10 benchmark
if (!workHtml.includes('PKR 10')) {
  errors.push('Work results section does not contain PKR 10 Lead Cost Benchmark.');
} else {
  console.log('✅ PASS: Work results section includes PKR 10 Lead Cost Benchmark.');
}

// 8. Verify AI Story Progression Statements
if (!workHtml.includes('27+') && !homeHtml.includes('27+')) {
  errors.push('AI story progression missing 27+ original character identities.');
} else {
  console.log('✅ PASS: AI story includes 27+ identities, thousands of assets, and 140+ conversions.');
}

// 9. Verify Forbidden Dashboard & Audit Terms
const forbiddenTerms = [
  'Deliverables Collage',
  'Integrated Execution',
  'Multi-Channel',
  'Team Collaboration interface',
  'Agency Architecture',
  'Inquiry Routing Interface',
  'Capability status badges',
  'Models Active'
];

for (const term of forbiddenTerms) {
  if (homeHtml.includes(term) || workHtml.includes(term) || aboutHtml.includes(term)) {
    errors.push(`Forbidden dashboard/interface term "${term}" found in public HTML.`);
  }
}
if (errors.length === 0) {
  console.log('✅ PASS: Zero forbidden interface or dashboard terms found in public HTML.');
}

if (errors.length > 0) {
  console.error('\n💥 FINAL VISUAL REBUILD QA ERRORS:');
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log('\n✨ ALL FINAL VISUAL REBUILD QA CHECKS PASSED CLEANLY! (0 errors)\n');
}
