import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const pagesDir = path.resolve('src/pages');
const savePath = path.resolve('scratch/final-acceptance-gate/seo-audit.json');

const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ folder missing. Please run `npm run build` first.');
  process.exit(1);
}

const errors = [];

// Parse registered routes directly from src/data/seo.ts
const seoTsContent = fs.readFileSync(path.resolve('src/data/seo.ts'), 'utf-8');
const canonicalMatches = Array.from(seoTsContent.matchAll(/canonicalPath:\s*['"]([^'"]+)['"]/g));
const registeredPaths = new Set(canonicalMatches.map((m) => m[1]));

// 1. Source-Level QA: Scan src/pages/ for unapproved BaseLayout props
function checkSourcePageFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      checkSourcePageFiles(fullPath);
    } else if (entry.name.endsWith('.astro')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const relPath = path.relative(pagesDir, fullPath).replace(/\\/g, '/');

      // Check for unapproved BaseLayout props (title=, description=, image=, type=, schemaType=)
      const baseLayoutMatches = content.match(/<BaseLayout[\s\S]*?>/g);
      if (baseLayoutMatches) {
        for (const blTag of baseLayoutMatches) {
          if (
            blTag.includes('title=') ||
            blTag.includes('description=') ||
            blTag.includes('image=') ||
            blTag.includes('type=') ||
            blTag.includes('schemaType=')
          ) {
            if (!relPath.includes('404.astro') && !relPath.includes('style-guide.astro')) {
              errors.push(`[Source QA] Unapproved BaseLayout metadata prop in src/pages/${relPath}: ${blTag.trim()}`);
            }
          }
        }
      }
    }
  }
}
checkSourcePageFiles(pagesDir);

// 2. Built-Output SEO Validation
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
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');

  // Title checks
  const titleMatches = content.match(/<title>([^<]+)<\/title>/g) || [];
  if (titleMatches.length === 0) {
    errors.push(`[${relPath}] Missing <title> tag`);
  } else if (titleMatches.length > 1) {
    errors.push(`[${relPath}] Duplicate <title> tags found (${titleMatches.length})`);
  } else {
    const titleVal = titleMatches[0].replace(/<\/?title>/g, '').trim();
    if (titles.has(titleVal) && !relPath.includes('404')) {
      errors.push(`[${relPath}] Non-unique title: "${titleVal}" (matches ${titles.get(titleVal)})`);
    } else {
      titles.set(titleVal, relPath);
    }
  }

  // Meta description checks
  const descMatches = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/g) || [];
  if (descMatches.length === 0) {
    errors.push(`[${relPath}] Missing meta description tag`);
  } else if (descMatches.length > 1) {
    errors.push(`[${relPath}] Duplicate meta description tags found (${descMatches.length})`);
  } else {
    const descMatch = descMatches[0].match(/content=["']([^"']+)["']/);
    if (descMatch) {
      const descVal = descMatch[1].trim();
      if (descriptions.has(descVal) && !relPath.includes('404')) {
        errors.push(`[${relPath}] Non-unique meta description: "${descVal}" (matches ${descriptions.get(descVal)})`);
      } else {
        descriptions.set(descVal, relPath);
      }
    }
  }

  // Canonical checks
  const canonicalMatches = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/g) || [];
  if (canonicalMatches.length === 0) {
    errors.push(`[${relPath}] Missing canonical URL tag`);
  } else if (canonicalMatches.length > 1) {
    errors.push(`[${relPath}] Duplicate canonical URL tags found (${canonicalMatches.length})`);
  } else {
    const canMatch = canonicalMatches[0].match(/href=["']([^"']+)["']/);
    if (canMatch) {
      const canUrl = canMatch[1].trim();
      if (canonicals.has(canUrl) && !relPath.includes('404')) {
        errors.push(`[${relPath}] Non-unique canonical URL: "${canUrl}" (matches ${canonicals.get(canUrl)})`);
      } else {
        canonicals.set(canUrl, relPath);
      }
      if (canUrl.includes('startsdigital.com')) {
        errors.push(`[${relPath}] Unapproved production domain in canonical: ${canUrl}`);
      }
    }
  }

  // Single H1 check (for indexable content pages)
  if (!relPath.includes('404') && !relPath.includes('style-guide')) {
    const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    if (h1Matches.length === 0) {
      errors.push(`[${relPath}] Missing <h1> element`);
    } else if (h1Matches.length > 1) {
      errors.push(`[${relPath}] Multiple <h1> elements found (${h1Matches.length})`);
    }
  }

  // OG and Twitter tag checks
  if (!content.includes('property="og:image"') || !content.includes('name="twitter:image"')) {
    errors.push(`[${relPath}] Missing Open Graph or Twitter image meta tags`);
  }
}

// Sitemap validation
const sitemapPath = path.join(distDir, 'sitemap-index.xml');
let sitemapVerified = false;
if (fs.existsSync(sitemapPath)) {
  sitemapVerified = true;
} else {
  errors.push('sitemap-index.xml missing in dist/');
}

const auditResult = {
  totalFiles: htmlFiles.length,
  registeredSeoRoutesCount: registeredPaths.size,
  sitemapVerified,
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:SEO PASSED — All ${htmlFiles.length} HTML files verified with unique titles, descriptions, canonicals, single H1s, valid OG tags, and sitemap. 0 errors.`);
} else {
  console.error(`❌ QA:SEO FAILED — Found ${errors.length} SEO errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
