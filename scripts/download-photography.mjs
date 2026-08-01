import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'public/photography');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

export const photographyList = [
  {
    id: 'video-editing-workstation',
    filename: 'video-editing-workstation.webp',
    localPublicPath: '/photography/video-editing-workstation.webp',
    url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&q=80',
    sourceUrl: 'https://unsplash.com/photos/video-editing-workstation-1574717024653-61fd2cf4d44d',
    photographer: 'Kal Visuals',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Hands editing video timeline on a professional workstation',
    pagesUsed: ['/', '/work/'],
    peopleType: 'Stock subjects editing video (illustrative stock photography)'
  },
  {
    id: 'web-designer-responsive',
    filename: 'web-designer-responsive.webp',
    localPublicPath: '/photography/web-designer-responsive.webp',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&q=80',
    sourceUrl: 'https://unsplash.com/photos/web-designer-working-1507238691740-187a5b1d37b8',
    photographer: 'Clement H',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Website designer reviewing responsive web page layout',
    pagesUsed: ['/', '/services/'],
    peopleType: 'Stock subject web designer (illustrative stock photography)'
  },
  {
    id: 'creative-campaign-planning',
    filename: 'creative-campaign-planning.webp',
    localPublicPath: '/photography/creative-campaign-planning.webp',
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=80',
    sourceUrl: 'https://unsplash.com/photos/creative-planning-notebook-1531403009284-440f080d1e12',
    photographer: 'UX Indonesia',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Creative planning with notebooks, phone, and laptop',
    pagesUsed: ['/', '/about/'],
    peopleType: 'Stock strategy planners (illustrative stock photography)'
  },
  {
    id: 'advertising-creative-production',
    filename: 'advertising-creative-production.webp',
    localPublicPath: '/photography/advertising-creative-production.webp',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80',
    sourceUrl: 'https://unsplash.com/photos/advertising-analytics-dashboard-1460925895917-afdab827c52f',
    photographer: 'Carlos Muza',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Product advertising and campaign content production',
    pagesUsed: ['/services/', '/work/'],
    peopleType: 'Stock marketing team (illustrative stock photography)'
  },
  {
    id: 'team-collaboration-workspace',
    filename: 'team-collaboration-workspace.webp',
    localPublicPath: '/photography/team-collaboration-workspace.webp',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80',
    sourceUrl: 'https://unsplash.com/photos/team-workspace-collaboration-1522071820081-009f0129c71c',
    photographer: 'Annie Spratt',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Team collaboration workspace session',
    pagesUsed: ['/about/'],
    peopleType: 'Stock collaborators (illustrative stock photography)'
  },
  {
    id: 'smartphone-content-campaign',
    filename: 'smartphone-content-campaign.webp',
    localPublicPath: '/photography/smartphone-content-campaign.webp',
    url: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1000&q=80',
    sourceUrl: 'https://unsplash.com/photos/smartphone-communication-1512428559087-560fa5ceab42',
    photographer: 'Priscilla Du Preez',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Smartphone content creation and campaign planning',
    pagesUsed: ['/services/', '/contact/'],
    peopleType: 'Stock content creator (illustrative stock photography)'
  }
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  console.log('🚀 Downloading and processing 6 genuine licensed photographs...');
  for (const item of photographyList) {
    const webpPath = path.join(outDir, `${item.id}.webp`);
    const avifPath = path.join(outDir, `${item.id}.avif`);

    const buf = await fetchBuffer(item.url);

    await sharp(buf).resize({ width: 800 }).webp({ quality: 80 }).toFile(webpPath);
    await sharp(buf).resize({ width: 800 }).avif({ quality: 70 }).toFile(avifPath);

    const stWebp = fs.statSync(webpPath);
    const stAvif = fs.statSync(avifPath);
    const meta = await sharp(webpPath).metadata();

    item.width = meta.width;
    item.height = meta.height;
    item.webpSizeKb = Number((stWebp.size / 1024).toFixed(1));
    item.avifSizeKb = Number((stAvif.size / 1024).toFixed(1));

    console.log(`✅ ${item.id}: WebP=${stWebp.size}B (${item.webpSizeKb}KB), AVIF=${stAvif.size}B (${item.avifSizeKb}KB), ${meta.width}x${meta.height}`);
  }
  console.log('✨ All 6 genuine photography assets successfully processed!');
}

if (process.argv[1] && process.argv[1].endsWith('download-photography.mjs')) {
  run();
}
