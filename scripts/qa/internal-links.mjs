import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const savePath = path.resolve('scratch/final-6-3/internal-links-audit.json');

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
let internalLinksChecked = 0;
let internalLinksResolved = 0;
let brokenInternalLinks = 0;
let hashLinksChecked = 0;
let brokenHashLinks = 0;
let externalLinksClassified = 0;
let mailLinks = 0;
let phoneLinks = 0;
let whatsappLinks = 0;

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
      brokenInternalLinks++;
    } else if (href === '#') {
      errors.push(`[${relPath}] Primitive href="#" found`);
      brokenInternalLinks++;
    } else if (href.includes('/startsdigital/startsdigital/')) {
      errors.push(`[${relPath}] Duplicated base path: ${href}`);
      brokenInternalLinks++;
    } else if (href.includes('/work/#convortai')) {
      errors.push(`[${relPath}] Forbidden link to /work/#convortai found`);
      brokenInternalLinks++;
    }

    if (href.startsWith('mailto:')) {
      mailLinks++;
    } else if (href.startsWith('tel:')) {
      phoneLinks++;
    } else if (href.includes('wa.me')) {
      whatsappLinks++;
    } else if (href.startsWith('http')) {
      externalLinksClassified++;
    } else {
      internalLinksChecked++;
      internalLinksResolved++;

      if (href.includes('#')) {
        hashLinksChecked++;
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
  internalLinksChecked,
  internalLinksResolved,
  brokenInternalLinks,
  hashLinksChecked,
  brokenHashLinks,
  externalLinksClassified,
  mailLinks,
  phoneLinks,
  whatsappLinks,
  contactSourceParams: Array.from(contactSourceParams),
  contactServiceParams: Array.from(contactServiceParams),
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:LINKS PASSED — ${totalHrefs} total hrefs, ${internalLinksResolved} internal resolved, ${externalLinksClassified} external, ${whatsappLinks} whatsapp, ${mailLinks} mail, ${phoneLinks} phone across ${htmlFiles.length} pages. 0 errors.`);
} else {
  console.error(`❌ QA:LINKS FAILED — Found ${errors.length} link errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
