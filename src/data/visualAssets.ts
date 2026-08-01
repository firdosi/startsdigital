export interface PhotographyAsset {
  id: string;
  filename: string;
  localPublicPath: string;
  sourceUrl: string;
  photographer: string;
  licence: string;
  purpose: string;
  pagesUsed: string[];
  width: number;
  height: number;
  avifSizeKb: number;
  webpSizeKb: number;
  peopleType: string;
}

export interface CustomVisualAsset {
  id: string;
  localPublicPath: string;
  format: 'webp' | 'avif' | 'svg';
  width: number;
  height: number;
  fileSize: number;
  purpose: string;
  pagesUsed: string[];
  type: '3d-ecosystem' | '3d-sector-objects' | '3d-contact-visual' | 'layered-deliverables-canvas';
}

export const photographyAssets: PhotographyAsset[] = [
  {
    id: 'video-editing-workstation',
    filename: 'video-editing-workstation.webp',
    localPublicPath: '/photography/video-editing-workstation.webp',
    sourceUrl: 'https://unsplash.com/photos/a-computer-screen-with-two-monitors-and-a-laptop-B72fcMgjDXg',
    photographer: 'Kal Visuals',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Hands editing video timeline on a professional workstation',
    pagesUsed: ['/', '/work/'],
    width: 800,
    height: 533,
    avifSizeKb: 31.6,
    webpSizeKb: 28.5,
    peopleType: 'Stock subjects editing video (illustrative stock photography)'
  },
  {
    id: 'web-designer-responsive',
    filename: 'web-designer-responsive.webp',
    localPublicPath: '/photography/web-designer-responsive.webp',
    sourceUrl: 'https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-desk-y4ZwPg7kw7I',
    photographer: 'Clement H',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Website designer reviewing responsive web page layout',
    pagesUsed: ['/', '/services/'],
    width: 800,
    height: 1021,
    avifSizeKb: 100.5,
    webpSizeKb: 87.4,
    peopleType: 'Stock subject web designer (illustrative stock photography)'
  },
  {
    id: 'creative-campaign-planning',
    filename: 'creative-campaign-planning.webp',
    localPublicPath: '/photography/creative-campaign-planning.webp',
    sourceUrl: 'https://unsplash.com/photos/a-calendar-with-glasses-on-a-table-next-to-a-pair-of-glasses-OLvQEjwCSVI',
    photographer: 'UX Indonesia',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Creative planning with notebooks, phone, and laptop',
    pagesUsed: ['/', '/about/'],
    width: 800,
    height: 533,
    avifSizeKb: 30.3,
    webpSizeKb: 24.5,
    peopleType: 'Stock strategy planners (illustrative stock photography)'
  },
  {
    id: 'advertising-creative-production',
    filename: 'advertising-creative-production.webp',
    localPublicPath: '/photography/advertising-creative-production.webp',
    sourceUrl: 'https://unsplash.com/photos/a-computer-screen-with-a-blue-arrow-pointing-to-it-ZB-fZg0NnKY',
    photographer: 'Carlos Muza',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Product advertising and campaign content production',
    pagesUsed: ['/services/', '/work/'],
    width: 800,
    height: 570,
    avifSizeKb: 33.7,
    webpSizeKb: 29.7,
    peopleType: 'Stock marketing team (illustrative stock photography)'
  },
  {
    id: 'team-collaboration-workspace',
    filename: 'team-collaboration-workspace.webp',
    localPublicPath: '/photography/team-collaboration-workspace.webp',
    sourceUrl: 'https://unsplash.com/photos/a-group-of-people-standing-around-a-table-with-a-laptop-qY8AWXa3Le4',
    photographer: 'Annie Spratt',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Team collaboration workspace session',
    pagesUsed: ['/about/'],
    width: 800,
    height: 533,
    avifSizeKb: 51.6,
    webpSizeKb: 43.0,
    peopleType: 'Stock collaborators (illustrative stock photography)'
  },
  {
    id: 'smartphone-content-campaign',
    filename: 'smartphone-content-campaign.webp',
    localPublicPath: '/photography/smartphone-content-campaign.webp',
    sourceUrl: 'https://unsplash.com/photos/a-phone-with-hearts-floating-out-of-it-lelGqkPPa1Q',
    photographer: 'Priscilla Du Preez',
    licence: 'Unsplash Royalty-Free License',
    purpose: 'Smartphone content creation and campaign planning',
    pagesUsed: ['/services/', '/contact/'],
    width: 800,
    height: 533,
    avifSizeKb: 24.6,
    webpSizeKb: 18.8,
    peopleType: 'Stock content creator (illustrative stock photography)'
  }
];

export const customVisualAssets: CustomVisualAsset[] = [
  {
    id: 'services-3d-ecosystem',
    localPublicPath: '/components/services/Services3DEcosystem.astro',
    format: 'svg',
    width: 800,
    height: 600,
    fileSize: 4500,
    purpose: 'Interactive 3D Service Ecosystem Orbiting Scene',
    pagesUsed: ['/services/'],
    type: '3d-ecosystem'
  },
  {
    id: 'industries-3d-sector-objects',
    localPublicPath: '/components/industries/Industries3DSectorComposition.astro',
    format: 'svg',
    width: 800,
    height: 600,
    fileSize: 4200,
    purpose: '4 Physical 3D Sector Objects Composition',
    pagesUsed: ['/industries/'],
    type: '3d-sector-objects'
  },
  {
    id: 'contact-3d-visual',
    localPublicPath: '/components/contact/Contact3DVisual.astro',
    format: 'svg',
    width: 800,
    height: 600,
    fileSize: 3800,
    purpose: '3D Smartphone, Message Bubble, Envelope & Animated Route',
    pagesUsed: ['/contact/'],
    type: '3d-contact-visual'
  },
  {
    id: 'work-layered-deliverables-canvas',
    localPublicPath: '/components/work/WorkLayeredHeroCanvas.astro',
    format: 'svg',
    width: 800,
    height: 600,
    fileSize: 4100,
    purpose: 'Layered Editorial Work Showcase Canvas',
    pagesUsed: ['/work/'],
    type: 'layered-deliverables-canvas'
  }
];
