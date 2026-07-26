import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const savePath = path.resolve('scratch/seo-6-1/internal-links-audit.json');

const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ folder missing. Please run `npm run build` first.');
  process.exit(1);
}

function getAllHtmlFiles(dirPath, files = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getAllHtmlFiles(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getAllHtmlFiles(distDir);
const errors = [];
let totalLinksChecked = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');

  // Match href attributes
  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g);
  for (const match of hrefMatches) {
    const href = match[1];
    totalLinksChecked++;

    // Fail check rules
    if (href === '') {
      errors.push(`[${relPath}] Empty href found`);
    } else if (href === '#') {
      errors.push(`[${relPath}] Primitive href="#" found`);
    } else if (href.includes('/startsdigital/startsdigital/')) {
      errors.push(`[${relPath}] Duplicated base path: ${href}`);
    } else if (href.includes('/work/#convortai')) {
      errors.push(`[${relPath}] Forbidden link to /work/#convortai found`);
    }
  }
}

const auditResult = {
  totalFiles: htmlFiles.length,
  totalLinksChecked,
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:LINKS PASSED — Checked ${totalLinksChecked} links across ${htmlFiles.length} HTML files. 0 errors.`);
} else {
  console.error(`❌ QA:LINKS FAILED — Found ${errors.length} link errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
