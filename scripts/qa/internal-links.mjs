import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const savePath = path.resolve('scratch/final-closure-correction/internal-links-audit.json');

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
const htmlPathSet = new Set(htmlFiles.map((f) => path.relative(distDir, f).replace(/\\/g, '/')));
const linkedTargetPages = new Set();

const errors = [];

let totalHrefs = 0;
let internalLinksChecked = 0;
let internalLinksResolved = 0;
let brokenInternalLinks = 0;
let hashLinksChecked = 0;
let brokenHashLinks = 0;
let externalLinks = 0;
let mailLinks = 0;
let phoneLinks = 0;
let whatsappLinks = 0;

const contactSourceParams = new Set();
const contactServiceParams = new Set();

const ASSET_EXTENSIONS = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp', '.css', '.js', '.xml', '.json', '.webmanifest', '.ico']);

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');

  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g);
  for (const match of hrefMatches) {
    let rawHref = match[1];
    totalHrefs++;

    if (rawHref === '') {
      errors.push(`[${relPath}] Empty href found`);
      brokenInternalLinks++;
      continue;
    }
    if (rawHref === '#') {
      errors.push(`[${relPath}] Primitive href="#" found`);
      brokenInternalLinks++;
      continue;
    }

    if (rawHref.startsWith('mailto:')) {
      mailLinks++;
      continue;
    }
    if (rawHref.startsWith('tel:')) {
      phoneLinks++;
      continue;
    }
    if (rawHref.includes('wa.me')) {
      whatsappLinks++;
      continue;
    }
    if (rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
      if (rawHref.startsWith('https://firdosi.github.io')) {
        // Strip origin and process as internal
        rawHref = rawHref.replace('https://firdosi.github.io', '');
      } else {
        externalLinks++;
        continue;
      }
    }

    // Process internal link
    internalLinksChecked++;

    // Check duplicate base path
    if (rawHref.includes('/startsdigital/startsdigital/')) {
      errors.push(`[${relPath}] Duplicated base path found: ${rawHref}`);
      brokenInternalLinks++;
      continue;
    }

    // Strip base path once
    let pathNoBase = rawHref;
    if (pathNoBase.startsWith('/startsdigital')) {
      pathNoBase = pathNoBase.substring('/startsdigital'.length);
    }
    if (!pathNoBase.startsWith('/')) {
      pathNoBase = '/' + pathNoBase;
    }

    // Split URL into pathname, query, and hash
    const hashIdx = pathNoBase.indexOf('#');
    let hashPart = '';
    if (hashIdx !== -1) {
      hashPart = pathNoBase.substring(hashIdx + 1);
      pathNoBase = pathNoBase.substring(0, hashIdx);
    }

    const queryIdx = pathNoBase.indexOf('?');
    let queryPart = '';
    if (queryIdx !== -1) {
      queryPart = pathNoBase.substring(queryIdx + 1);
      pathNoBase = pathNoBase.substring(0, queryIdx);
    }

    if (queryPart.includes('source=')) {
      const matchSource = queryPart.match(/source=([^&]+)/);
      if (matchSource) contactSourceParams.add(matchSource[1]);
    }
    if (queryPart.includes('service=')) {
      const matchService = queryPart.match(/service=([^&]+)/);
      if (matchService) contactServiceParams.add(matchService[1]);
    }

    const ext = path.extname(pathNoBase).toLowerCase();

    if (ASSET_EXTENSIONS.has(ext)) {
      // Direct static asset check
      const assetRelPath = pathNoBase.substring(1);
      const assetDiskPath = path.join(distDir, assetRelPath);
      if (!fs.existsSync(assetDiskPath)) {
        errors.push(`[${relPath}] Broken static asset link: "${rawHref}" -> "${assetRelPath}" not found in dist`);
        brokenInternalLinks++;
      } else {
        internalLinksResolved++;
      }
      continue;
    }

    // Map HTML route pathname to disk HTML file
    let targetRelHtml = '';
    if (pathNoBase === '' || pathNoBase === '/') {
      // If path is empty (e.g. href="#proof"), target is current document
      targetRelHtml = (rawHref.startsWith('#') || pathNoBase === '') ? relPath : 'index.html';
    } else if (pathNoBase.endsWith('.html')) {
      targetRelHtml = pathNoBase.substring(1);
    } else if (pathNoBase.endsWith('/')) {
      targetRelHtml = pathNoBase.substring(1) + 'index.html';
    } else {
      targetRelHtml = pathNoBase.substring(1) + '/index.html';
    }

    // Verify destination HTML file exists
    const targetDiskPath = path.join(distDir, targetRelHtml);
    if (!fs.existsSync(targetDiskPath)) {
      errors.push(`[${relPath}] Broken route: "${rawHref}" -> "${targetRelHtml}" not found in dist`);
      brokenInternalLinks++;
    } else {
      internalLinksResolved++;
      linkedTargetPages.add(targetRelHtml);

      // Verify hash target if present
      if (hashPart) {
        hashLinksChecked++;
        const targetContent = fs.readFileSync(targetDiskPath, 'utf-8');
        const idPattern = new RegExp(`(id|name)=["']${hashPart}["']`, 'i');
        if (!idPattern.test(targetContent)) {
          errors.push(`[${relPath}] Broken hash target: "#${hashPart}" on document "${targetRelHtml}"`);
          brokenHashLinks++;
        }
      }
    }
  }
}

// Detect orphaned indexable HTML pages
const orphanPages = [];
for (const relHtml of htmlPathSet) {
  if (relHtml === 'index.html' || relHtml === '404.html' || relHtml === 'style-guide/index.html') {
    continue;
  }
  if (!linkedTargetPages.has(relHtml)) {
    orphanPages.push(relHtml);
    errors.push(`Orphaned page detected in dist: ${relHtml}`);
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
  orphanPages,
  externalLinks,
  whatsappLinks,
  mailLinks,
  phoneLinks,
  contactSourceParams: Array.from(contactSourceParams),
  contactServiceParams: Array.from(contactServiceParams),
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:LINKS PASSED — ${totalHrefs} total hrefs, ${internalLinksResolved} internal resolved, ${externalLinks} external, ${whatsappLinks} whatsapp, ${mailLinks} mail, ${phoneLinks} phone across ${htmlFiles.length} pages. 0 errors.`);
} else {
  console.error(`❌ QA:LINKS FAILED — Found ${errors.length} link errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
