import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PHOTO_DIR = path.join(ROOT, 'public/photography');
const REGISTER_DIR = path.join(ROOT, 'scratch/roadmap-9-1-premium-visual-storytelling');
const REGISTER_PATH = path.join(REGISTER_DIR, 'image-source-register.json');

if (!fs.existsSync(PHOTO_DIR)) fs.mkdirSync(PHOTO_DIR, { recursive: true });
if (!fs.existsSync(REGISTER_DIR)) fs.mkdirSync(REGISTER_DIR, { recursive: true });

const photoSources = [
  {
    id: 'team-collaboration-workspace',
    canonicalUrl: 'https://unsplash.com/photos/group-of-people-sitting-indoors-1522071820081-009f0129c71c',
    directUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Annie Spratt',
    sourceWebsite: 'Unsplash',
    licence: 'Unsplash Licence (Free Commercial Use)',
    description: 'Collaborative agency workspace photography',
    usedOn: ['about', 'homepage'],
    altText: 'Illustrative team collaboration photography'
  },
  {
    id: 'web-designer-responsive',
    canonicalUrl: 'https://unsplash.com/photos/man-working-on-laptop-1507238691740-187a5b1d37b8',
    directUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Ben Kolde',
    sourceWebsite: 'Unsplash',
    licence: 'Unsplash Licence (Free Commercial Use)',
    description: 'Web designer working on responsive layout',
    usedOn: ['work', 'homepage', 'services'],
    altText: 'Website design and development work'
  },
  {
    id: 'video-editing-workstation',
    canonicalUrl: 'https://unsplash.com/photos/video-editing-monitor-1574717024653-61fd2cf4d44d',
    directUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Goran Ivos',
    sourceWebsite: 'Unsplash',
    licence: 'Unsplash Licence (Free Commercial Use)',
    description: 'Video editing software workstation',
    usedOn: ['work', 'services'],
    altText: 'Video editing and production workflow'
  },
  {
    id: 'advertising-creative-production',
    canonicalUrl: 'https://unsplash.com/photos/creative-strategy-meeting-1542744173-8e7e53415bb0',
    directUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop',
    photographer: 'Campaign Creators',
    sourceWebsite: 'Unsplash',
    licence: 'Unsplash Licence (Free Commercial Use)',
    description: 'Advertising creative production and strategy',
    usedOn: ['work', 'homepage', 'services'],
    altText: 'Advertising and creative production work'
  },
  {
    id: 'creative-campaign-planning',
    canonicalUrl: 'https://unsplash.com/photos/wireframing-ui-ux-design-1531403009284-440f080d1e12',
    directUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop',
    photographer: 'UX Store',
    sourceWebsite: 'Unsplash',
    licence: 'Unsplash Licence (Free Commercial Use)',
    description: 'Creative campaign planning and wireframing',
    usedOn: ['about', 'services'],
    altText: 'Illustrative creative and campaign planning workspace'
  },
  {
    id: 'smartphone-content-campaign',
    canonicalUrl: 'https://unsplash.com/photos/person-holding-smartphone-1512941937669-90a1b58e7e9c',
    directUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Firmbee',
    sourceWebsite: 'Unsplash',
    licence: 'Unsplash Licence (Free Commercial Use)',
    description: 'Mobile social media content campaign',
    usedOn: ['homepage', 'services'],
    altText: 'Illustrative mobile content campaign photography'
  },
  {
    id: 'ecommerce-product-fulfillment',
    canonicalUrl: 'https://unsplash.com/photos/cardboard-boxes-in-warehouse-1586528116311-ad8dd3c8310d',
    directUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Petr Magera',
    sourceWebsite: 'Unsplash',
    licence: 'Unsplash Licence (Free Commercial Use)',
    description: 'E-commerce product fulfillment and store operations',
    usedOn: ['industries', 'homepage'],
    altText: 'Illustrative e-commerce product logistics and fulfillment'
  },
  {
    id: 'local-service-marketing',
    canonicalUrl: 'https://unsplash.com/photos/map-location-pins-1526778548025-fa2f459cd5c1',
    directUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Glenn Carstens-Peters',
    sourceWebsite: 'Unsplash',
    licence: 'Unsplash Licence (Free Commercial Use)',
    description: 'Local business map and search location strategy',
    usedOn: ['industries', 'services'],
    altText: 'Illustrative local search and location marketing strategy'
  },
  {
    id: 'ai-creative-studio',
    canonicalUrl: 'https://unsplash.com/photos/abstract-3d-digital-art-1618005182384-a83a8bd57fbe',
    directUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Milad Fakurian',
    sourceWebsite: 'Unsplash',
    licence: 'Unsplash Licence (Free Commercial Use)',
    description: 'AI creative studio digital artwork generation',
    usedOn: ['work', 'services'],
    altText: 'Illustrative AI creative generation artwork'
  }
];

async function processPhotos() {
  console.log('🖼️ Downloading and converting photography assets...');
  const registerEntries = [];

  for (const item of photoSources) {
    const webpFilename = `${item.id}.webp`;
    const avifFilename = `${item.id}.avif`;
    const webpPath = path.join(PHOTO_DIR, webpFilename);
    const avifPath = path.join(PHOTO_DIR, avifFilename);

    try {
      console.log(`Fetching ${item.id}...`);
      const resp = await fetch(item.directUrl);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const buffer = Buffer.from(await resp.arrayBuffer());

      // Resize & compress to WebP (max 900px wide, quality 80)
      await sharp(buffer)
        .resize(900, null, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpPath);

      // Resize & compress to AVIF (max 900px wide, quality 68)
      await sharp(buffer)
        .resize(900, null, { fit: 'inside', withoutEnlargement: true })
        .avif({ quality: 68 })
        .toFile(avifPath);

      const webpStats = fs.statSync(webpPath);
      const avifStats = fs.statSync(avifPath);

      console.log(`✓ Saved ${webpFilename} (${(webpStats.size/1024).toFixed(1)} KB) and ${avifFilename} (${(avifStats.size/1024).toFixed(1)} KB)`);

      registerEntries.push({
        id: item.id,
        localWebpPath: `public/photography/${webpFilename}`,
        localAvifPath: `public/photography/${avifFilename}`,
        canonicalUrl: item.canonicalUrl,
        directUrl: item.directUrl,
        sourceWebsite: item.sourceWebsite,
        photographer: item.photographer,
        licence: item.licence,
        description: item.description,
        usedOn: item.usedOn,
        altText: item.altText,
        webpSizeBytes: webpStats.size,
        avifSizeBytes: avifStats.size
      });
    } catch (e) {
      console.error(`❌ Failed to process ${item.id}:`, e.message);
    }
  }

  const registerContent = {
    roadmap: '9.1',
    generatedAt: new Date().toISOString(),
    totalAssets: registerEntries.length,
    licenceSummary: 'All photos sourced under Unsplash Licence (free for commercial use, no attribution required).',
    images: registerEntries
  };

  fs.writeFileSync(REGISTER_PATH, JSON.stringify(registerContent, null, 2));
  console.log(`\n📋 Register saved to ${REGISTER_PATH}`);
}

processPhotos();
