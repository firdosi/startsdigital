import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const distDir = path.join(rootDir, 'dist');

console.log('🚀 Running Page-Content Uniqueness QA Audit...');

if (!fs.existsSync(distDir)) {
  console.error('❌ Build dist folder does not exist. Run npm run build first.');
  process.exit(1);
}

const mainPages = [
  'index.html',
  'services/index.html',
  'work/index.html',
  'industries/index.html',
  'about/index.html',
  'contact/index.html'
];

const headingsMap = new Map();
const h1sMap = new Map();
let logoSectionCount = 0;
let errors = [];

for (const relPath of mainPages) {
  const filePath = path.join(distDir, relPath);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing HTML file: ${relPath}`);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf-8');

  // Strip header and footer content so global footer links don't trigger false positives
  html = html.replace(/<header[\s\S]*?<\/header>/gi, '').replace(/<footer[\s\S]*?<\/footer>/gi, '');

  // Count brand marquee / logo sections
  if (html.includes('id="brand-marquee"') || html.includes('id="logo-wall"')) {
    logoSectionCount++;
  }

  // Extract H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const h1Text = h1Match[1].replace(/<[^>]+>/g, '').trim();
    if (h1sMap.has(h1Text)) {
      errors.push(`Duplicate H1 "${h1Text}" found on ${relPath} and ${h1sMap.get(h1Text)}`);
    } else {
      h1sMap.set(h1Text, relPath);
    }
  }

  // Extract H2 headings
  const h2Matches = html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi);
  for (const match of h2Matches) {
    const h2Text = match[1].replace(/<[^>]+>/g, '').trim();
    // Allow global navigation / footer headings if any, but flag repeated page section headings
    if (h2Text.length > 10 && !['Frequently Asked Questions', 'Ready to Discuss Your Project Goals?'].includes(h2Text)) {
      if (headingsMap.has(h2Text)) {
        errors.push(`Duplicate H2 "${h2Text}" found on ${relPath} and ${headingsMap.get(h2Text)}`);
      } else {
        headingsMap.set(h2Text, relPath);
      }
    }
  }
}

// Verify EXACTLY ONE public brand section across the site
if (logoSectionCount !== 1) {
  errors.push(`Expected exactly 1 public brand logo section across site, found ${logoSectionCount}`);
} else {
  console.log('✅ PASS: Exactly 1 public brand logo section found across main pages (Homepage only)');
}

if (errors.length > 0) {
  console.error('\n💥 PAGE UNIQUENESS QA ERRORS:');
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log('✨ ALL PAGE UNIQUENESS QA CHECKS PASSED CLEANLY! (0 errors)\n');
}
