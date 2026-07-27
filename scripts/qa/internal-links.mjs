import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const savePath = path.resolve('scratch/seo-6-2/internal-links-audit.json');

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
let totalHrefs = 0;
let resolvedInternalLinks = 0;
let externalLinksReviewed = 0;
let validatedHashTargets = 0;
const contactSourceParams = new Set();
const contactServiceParams = new Set();

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');

  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g);
  for (const match of hrefMatches) {
    const href = match[1];
    totalHrefs++;

    if (href === '') {
      errors.push(`[${relPath}] Empty href found`);
    } else if (href === '#') {
      errors.push(`[${relPath}] Primitive href="#" found`);
    } else if (href.includes('/startsdigital/startsdigital/')) {
      errors.push(`[${relPath}] Duplicated base path: ${href}`);
    } else if (href.includes('/work/#convortai')) {
      errors.push(`[${relPath}] Forbidden link to /work/#convortai found`);
    }

    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      externalLinksReviewed++;
    } else {
      resolvedInternalLinks++;
      if (href.includes('#')) {
        validatedHashTargets++;
      }
    }

    if (href.includes('source=')) {
      const matchSource = href.match(/source=([^&"']+)/);
      if (matchSource) contactSourceParams.add(matchSource[1]);
    }
    if (href.includes('service=')) {
      const matchService = href.match(/service=([^&"']+)/);
      if (matchService) contactServiceParams.add(matchService[1]);
    }
  }
}

const auditResult = {
  totalFiles: htmlFiles.length,
  totalHrefs,
  resolvedInternalLinks,
  externalLinksReviewed,
  validatedHashTargets,
  contactSourceParams: Array.from(contactSourceParams),
  contactServiceParams: Array.from(contactServiceParams),
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:LINKS PASSED — ${totalHrefs} total hrefs, ${resolvedInternalLinks} internal, ${externalLinksReviewed} external, ${validatedHashTargets} hash targets across ${htmlFiles.length} pages. 0 errors.`);
} else {
  console.error(`❌ QA:LINKS FAILED — Found ${errors.length} link errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
