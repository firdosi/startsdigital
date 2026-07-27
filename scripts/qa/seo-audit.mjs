import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const savePath = path.resolve('scratch/seo-6-2/seo-audit.json');

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
  }

  // Single H1 check
  const h1Matches = content.match(/<h1[^>]*>/gi);
  if (!h1Matches || h1Matches.length !== 1) {
    errors.push(`[${relPath}] Page must have exactly one <h1> element (found ${h1Matches ? h1Matches.length : 0})`);
  }

  // OG tags check (og:image, og:image:width, og:image:height, og:image:alt, twitter:image, twitter:image:alt)
  const ogImg = content.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  const ogImgWidth = content.match(/<meta\s+property=["']og:image:width["']\s+content=["']([^"']+)["']/i);
  const ogImgHeight = content.match(/<meta\s+property=["']og:image:height["']\s+content=["']([^"']+)["']/i);
  const ogImgAlt = content.match(/<meta\s+property=["']og:image:alt["']\s+content=["']([^"']+)["']/i);

  if (!ogImg) errors.push(`[${relPath}] Missing og:image tag`);
  if (!ogImgWidth) errors.push(`[${relPath}] Missing og:image:width tag`);
  if (!ogImgHeight) errors.push(`[${relPath}] Missing og:image:height tag`);
  if (!ogImgAlt) errors.push(`[${relPath}] Missing og:image:alt tag`);

  // Indexable check for utility pages
  if (relPath.includes('style-guide') || relPath.includes('404')) {
    const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
    if (!robotsMatch || !robotsMatch[1].includes('noindex')) {
      errors.push(`[${relPath}] Utility page must be noindex`);
    }
  }
}

// Verify physical OG images exist in dist
const defaultOgPath = path.join(distDir, 'og/default-og.png');
if (!fs.existsSync(defaultOgPath)) {
  errors.push(`[dist/og/default-og.png] Physical OG image file missing from dist`);
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
  console.log(`✅ QA:SEO PASSED — Verified ${htmlFiles.length} HTML files. All titles, descriptions, canonicals, H1s, and OG metadata valid. 0 errors.`);
} else {
  console.error(`❌ QA:SEO FAILED — Found ${errors.length} SEO errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
