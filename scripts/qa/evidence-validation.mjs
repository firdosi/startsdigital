import fs from 'fs';
import path from 'path';

const evidenceDir = path.resolve('scratch/final-acceptance-gate');
const savePath = path.join(evidenceDir, 'evidence-validation.json');

if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

const requiredFiles = [
  'internal-links-audit.json',
  'seo-audit.json',
  'schema-audit.json',
  'analytics-runtime-audit.json',
  'motion-runtime-audit.json',
  'domain-build-audit.json',
  'live-deployment-audit.json',
];

const errors = [];
const validatedFiles = [];

for (const reqFile of requiredFiles) {
  const reqPath = path.join(evidenceDir, reqFile);
  if (!fs.existsSync(reqPath)) {
    errors.push(`Required evidence file missing: ${reqFile}`);
  } else {
    try {
      const parsed = JSON.parse(fs.readFileSync(reqPath, 'utf-8'));
      if (parsed.errorCount > 0) {
        errors.push(`Evidence file ${reqFile} contains ${parsed.errorCount} recorded errors`);
      }
      validatedFiles.push(reqFile);
    } catch (e) {
      errors.push(`Invalid JSON syntax in evidence file ${reqFile}: ${e.message}`);
    }
  }
}

const results = {
  evidenceDir,
  validatedFiles,
  allRequiredFilesPresent: errors.length === 0,
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(results, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:EVIDENCE PASSED — All ${requiredFiles.length} evidence JSON files present and verified with 0 errors.`);
} else {
  console.error(`❌ QA:EVIDENCE FAILED — ${errors.length} evidence validation errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
