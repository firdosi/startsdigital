import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const savePath = path.resolve('scratch/seo-6-1/seo-audit.json');

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
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');

  // Title check
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`[${relPath}] Missing or empty <title>`);
  } else {
    const titleVal = titleMatch[1].trim();
    if (titles.has(titleVal) && !relPath.includes('404')) {
      errors.push(`[${relPath}] Duplicate <title>: "${titleVal}" (matches ${titles.get(titleVal)})`);
    } else {
      titles.set(titleVal, relPath);
    }
  }

  // Description check
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    errors.push(`[${relPath}] Missing or empty meta description`);
  } else {
    const descVal = descMatch[1].trim();
    if (descriptions.has(descVal) && !relPath.includes('404')) {
      errors.push(`[${relPath}] Duplicate meta description: "${descVal}" (matches ${descriptions.get(descVal)})`);
    } else {
      descriptions.set(descVal, relPath);
    }
  }

  // Canonical check
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    errors.push(`[${relPath}] Missing canonical <link>`);
  } else {
    const canonicalVal = canonicalMatch[1];
    if (canonicalVal.includes('/startsdigital/startsdigital/')) {
      errors.push(`[${relPath}] Duplicate base path in canonical: ${canonicalVal}`);
    }
    if (!canonicalVal.startsWith('https://firdosi.github.io')) {
      errors.push(`[${relPath}] Invalid canonical origin: ${canonicalVal}`);
    }
  }

  // Multiple H1 check
  const h1Matches = content.match(/<h1[^>]*>/gi);
  if (h1Matches && h1Matches.length > 1) {
    errors.push(`[${relPath}] Multiple <h1> elements found (${h1Matches.length})`);
  }

  // Indexable check for style-guide & 404
  if (relPath.includes('style-guide') || relPath.includes('404')) {
    const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
    if (!robotsMatch || !robotsMatch[1].includes('noindex')) {
      errors.push(`[${relPath}] Utility page must be noindex`);
    }
  }
}

const auditResult = {
  totalFiles: htmlFiles.length,
  uniqueTitles: titles.size,
  uniqueDescriptions: descriptions.size,
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:SEO PASSED — Audited ${htmlFiles.length} HTML files. All title, description, canonical and robots checks passed.`);
} else {
  console.error(`❌ QA:SEO FAILED — Found ${errors.length} SEO errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
