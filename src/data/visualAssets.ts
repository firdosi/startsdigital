export interface VisualAsset {
  id: string;
  localPath: string;
  format: 'webp' | 'avif' | 'png' | 'svg';
  width: number;
  height: number;
  fileSize: number; // in bytes
  purpose: string;
  pagesUsed: string[];
  aboveFold: boolean;
  loadingStrategy: 'eager' | 'lazy';
  altText: string;
  sourceType: 'custom-render' | 'custom-illustration' | 'approved-anonymized-interface';
  publicSafe: boolean;
}

export const visualAssetsRegistry: VisualAsset[] = [
  {
    id: 'marketing-system-visual',
    localPath: '/visuals/marketing-system-visual.webp',
    format: 'webp',
    width: 800,
    height: 600,
    fileSize: 26890,
    purpose: 'Homepage Hero & Marketing System Visual Anchor',
    pagesUsed: ['/'],
    aboveFold: true,
    loadingStrategy: 'eager',
    altText: 'Starts Digital Marketing System and Multi-Channel Strategy Composition',
    sourceType: 'approved-anonymized-interface',
    publicSafe: true
  },
  {
    id: 'work-capabilities-collage',
    localPath: '/visuals/work-capabilities-collage.webp',
    format: 'webp',
    width: 800,
    height: 600,
    fileSize: 23562,
    purpose: 'Work Page Capabilities Collage',
    pagesUsed: ['/work/'],
    aboveFold: false,
    loadingStrategy: 'lazy',
    altText: 'Starts Digital Combined Capabilities Collage across Paid Ads, Web, SEO and AI Workflows',
    sourceType: 'custom-render',
    publicSafe: true
  },
  {
    id: 'services-overview-composition',
    localPath: '/visuals/services-overview-composition.webp',
    format: 'webp',
    width: 800,
    height: 600,
    fileSize: 21734,
    purpose: 'Services Directory Multi-Device Interface Anchor',
    pagesUsed: ['/services/'],
    aboveFold: true,
    loadingStrategy: 'eager',
    altText: 'Starts Digital Multi-Device Service Delivery Interface Composition',
    sourceType: 'approved-anonymized-interface',
    publicSafe: true
  },
  {
    id: 'industries-object-composition',
    localPath: '/visuals/industries-object-composition.webp',
    format: 'webp',
    width: 800,
    height: 600,
    fileSize: 25078,
    purpose: 'Industries Page Sector Experience Visual Anchor',
    pagesUsed: ['/industries/'],
    aboveFold: true,
    loadingStrategy: 'eager',
    altText: 'Starts Digital Sector Architecture and Industry Domain Composition',
    sourceType: 'custom-illustration',
    publicSafe: true
  },
  {
    id: 'about-collaboration-composition',
    localPath: '/visuals/about-collaboration-composition.webp',
    format: 'webp',
    width: 800,
    height: 600,
    fileSize: 21174,
    purpose: 'About Page Team Collaboration Visual Anchor',
    pagesUsed: ['/about/'],
    aboveFold: true,
    loadingStrategy: 'eager',
    altText: 'Starts Digital Operator-Driven Agency Collaboration Architecture',
    sourceType: 'custom-render',
    publicSafe: true
  },
  {
    id: 'contact-communication-composition',
    localPath: '/visuals/contact-communication-composition.webp',
    format: 'webp',
    width: 800,
    height: 600,
    fileSize: 17790,
    purpose: 'Contact Page Inquiry Routing Composition',
    pagesUsed: ['/contact/'],
    aboveFold: false,
    loadingStrategy: 'lazy',
    altText: 'Starts Digital Generic Project Inquiry Routing Interface',
    sourceType: 'approved-anonymized-interface',
    publicSafe: true
  }
];

export function getVisualAssetById(id: string): VisualAsset | undefined {
  return visualAssetsRegistry.find((asset) => asset.id === id);
}
