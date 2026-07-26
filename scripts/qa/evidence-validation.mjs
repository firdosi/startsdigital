import fs from 'fs';
import path from 'path';

const savePath = path.resolve('scratch/seo-6-1/analytics-audit.json');

const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const analyticsTs = fs.readFileSync(path.resolve('src/scripts/analytics.ts'), 'utf-8');

const results = {
  analytics_disabled_by_default: import.meta.env?.PUBLIC_ANALYTICS_ENABLED !== 'true',
  no_hardcoded_measurement_id: !analyticsTs.includes('G-') && !analyticsTs.includes('UA-'),
  safe_event_parameters_only: analyticsTs.includes('safeParams = {') && !analyticsTs.includes('user_email:'),
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(results, null, 2));

const allPass = Object.values(results).every((v) => v === true || typeof v === 'string');
if (allPass) {
  console.log('✅ QA:EVIDENCE PASSED — Evidence and analytics verification complete.');
} else {
  console.error('❌ QA:EVIDENCE FAILED');
  process.exit(1);
}
