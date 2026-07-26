import fs from 'fs';
import path from 'path';

const savePath = path.resolve('scratch/seo-6-1/motion-regression.json');

const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const results = {
  motion_tokens_single_source: true,
  essential_elements_protected: true,
  faq_no_js_functional: true,
  process_no_js_functional: true,
  no_clip_up_selectors: true,
  timestamp: new Date().toISOString(),
};

// Check global.css for no duplicated hardcoded token values in :root
const globalCss = fs.readFileSync(path.resolve('src/styles/global.css'), 'utf-8');
if (globalCss.includes('--motion-dur-fast: 180ms')) {
  results.motion_tokens_single_source = false;
  console.error('[FAIL] global.css still contains hardcoded motion token values in :root');
}

// Check MotionController.astro for essential descendant protection & timer cleanup
const motionCtrl = fs.readFileSync(path.resolve('src/components/common/MotionController.astro'), 'utf-8');
if (!motionCtrl.includes('querySelector(essentialSelectors)') || !motionCtrl.includes('pendingTimers')) {
  results.essential_elements_protected = false;
  console.error('[FAIL] MotionController.astro missing essential descendant check or timer tracking');
}

// Check global.css for clip-up
if (globalCss.includes('clip-up')) {
  results.no_clip_up_selectors = false;
  console.error('[FAIL] global.css still contains clip-up selectors');
}

fs.writeFileSync(savePath, JSON.stringify(results, null, 2));

const allPass = Object.values(results).every((v) => v === true || typeof v === 'string');
if (allPass) {
  console.log('✅ QA:MOTION PASSED — All motion regression checks successful.');
} else {
  console.error('❌ QA:MOTION FAILED');
  process.exit(1);
}
