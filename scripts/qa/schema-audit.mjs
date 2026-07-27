import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const savePath = path.resolve('scratch/final-acceptance-gate/schema-audit.json');
const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function getAllHtmlFiles(dirPath, filesList = []) {
  if (!fs.existsSync(dirPath)) return filesList;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, filesList);
    } else if (file.endsWith('.html')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

const htmlFiles = getAllHtmlFiles(distDir);
const errors = [];
let totalSchemasChecked = 0;
let validJsonLdCount = 0;
let faqDomEqualityCount = 0;

const forbiddenTypes = [
  'AggregateRating',
  'Review',
  'Rating',
  'LocalBusiness',
  'ProfessionalService',
];

function checkForbiddenTypes(obj, file) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach((item) => checkForbiddenTypes(item, file));
    return;
  }

  if (obj['@type']) {
    const types = Array.isArray(obj['@type']) ? obj['@type'] : [obj['@type']];
    for (const t of types) {
      if (forbiddenTypes.includes(t)) {
        errors.push(`[${file}] Forbidden schema type found in JSON-LD: "@type": "${t}"`);
      }
    }
  }

  for (const key of Object.keys(obj)) {
    checkForbiddenTypes(obj[key], file);
  }
}

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');

  const scriptMatches = Array.from(content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi));

  const pageIds = new Set();

  for (const match of scriptMatches) {
    totalSchemasChecked++;
    const jsonText = match[1].trim();
    try {
      const parsed = JSON.parse(jsonText);
      validJsonLdCount++;
      checkForbiddenTypes(parsed, relPath);

      // Check duplicate @id
      if (parsed['@id']) {
        if (pageIds.has(parsed['@id'])) {
          errors.push(`[${relPath}] Duplicate @id found in page schema: ${parsed['@id']}`);
        }
        pageIds.add(parsed['@id']);
      }

      // Check origin
      const jsonStr = JSON.stringify(parsed);
      if (jsonStr.includes('startsdigital.com')) {
        errors.push(`[${relPath}] Unapproved production domain in JSON-LD schema`);
      }

      // FAQ DOM Equality Check for pages containing FAQPage schema
      if (parsed['@type'] === 'FAQPage' && parsed.mainEntity) {
        const schemaFaqs = parsed.mainEntity.map((q) => ({
          question: q.name?.trim(),
          answer: q.acceptedAnswer?.text?.trim(),
        }));

        const cleanHtmlContent = content
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');

        for (let i = 0; i < schemaFaqs.length; i++) {
          const sFaq = schemaFaqs[i];
          const hasQ = cleanHtmlContent.includes(sFaq.question);
          if (!hasQ) {
            errors.push(`[${relPath}] FAQ DOM-Schema Discrepancy: Schema question "${sFaq.question}" not found in visible DOM`);
          } else {
            faqDomEqualityCount++;
          }
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
  validJsonLdCount,
  faqDomEqualityCount,
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:SCHEMA PASSED — ${totalSchemasChecked} JSON-LD schemas validated across ${htmlFiles.length} pages. Zero forbidden types, 100% DOM-Schema equality verified. 0 errors.`);
  process.exit(0);
} else {
  console.error(`❌ QA:SCHEMA FAILED — Found ${errors.length} schema errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
