import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const savePath = path.resolve('scratch/seo-6-2/schema-audit.json');

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

const approvedWorkNames = new Set([
  'Black Gold Fertilizer',
  'Wajib Livestock Qurbani Campaign',
  'RK Reno Solutions',
  'ConvortAI',
]);

const htmlFiles = getAllHtmlFiles(distDir);
const errors = [];
let totalSchemasChecked = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');

  const jsonLdMatches = content.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);

  for (const match of jsonLdMatches) {
    totalSchemasChecked++;
    const jsonText = match[1].trim();

    try {
      const parsed = JSON.parse(jsonText);
      const items = Array.isArray(parsed) ? parsed : [parsed];

      for (const item of items) {
        if (!item['@context']) {
          errors.push(`[${relPath}] Schema missing @context`);
        }

        const typeStr = JSON.stringify(item['@type']);

        // Forbidden schema check
        if (/Review|AggregateRating|Offer|PostalAddress|LocalBusiness|ProfessionalService/i.test(typeStr)) {
          errors.push(`[${relPath}] Forbidden schema type found: ${typeStr}`);
        }

        // Work CollectionPage ItemList name check
        if (relPath.includes('work/index.html') && item['@type'] === 'CollectionPage' && item.mainEntity?.itemListElement) {
          const list = item.mainEntity.itemListElement;
          for (const listItem of list) {
            const name = listItem.name;
            if (!approvedWorkNames.has(name)) {
              errors.push(`[${relPath}] Work ItemList item name "${name}" is not an approved public name`);
            }
          }
        }

        // Future custom domain check (uncommented during dry-run validation only)
        if (process.env.SITE_ORIGIN !== 'https://startsdigital.com' && JSON.stringify(item).includes('startsdigital.com')) {
          errors.push(`[${relPath}] Schema contains future domain startsdigital.com before migration`);
        }
      }
    } catch (e) {
      errors.push(`[${relPath}] Invalid JSON-LD syntax: ${e.message}`);
    }
  }
}

const auditResult = {
  totalFiles: htmlFiles.length,
  totalSchemasChecked,
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:SCHEMA PASSED — Validated ${totalSchemasChecked} JSON-LD schemas across ${htmlFiles.length} HTML files. Exact public names & zero forbidden schemas verified. 0 errors.`);
} else {
  console.error(`❌ QA:SCHEMA FAILED — Found ${errors.length} Schema errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
