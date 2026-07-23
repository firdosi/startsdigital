export interface PortfolioAsset {
  sourceFile: string;
  clientName: string;
  assetType: string;
  publicSourceUrl?: string;
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  category: 'ecommerce' | 'construction' | 'immigration' | 'technology' | 'healthcare' | 'business-services';
  industry: string;
  role: string;
  summary: string;
  services: string[];
  period?: string;
  logo?: string;
  website?: string;
  assetSource?: string;
  featured: boolean;
  publicApproved: boolean;
  logoApproved: boolean;
  active: boolean;
  order: number;
  caseStudyLink?: string;
  galleryAssets?: PortfolioAsset[];
}

export const brands: Brand[] = [
  {
    id: 'black-gold-fertilizer',
    name: 'Black Gold Fertilizer',
    category: 'ecommerce',
    industry: 'Agriculture & Lawn-Care E-Commerce',
    role: 'Digital marketing and e-commerce growth',
    summary: 'Managed digital marketing, Meta advertising, creative production, website optimisation, analytics, customer retention and digital sales support for a Pakistan-wide lawn-care e-commerce brand.',
    services: [
      'Digital strategy',
      'Meta advertising',
      'Creative production',
      'WordPress and WooCommerce',
      'Analytics and tracking',
      'Customer retention'
    ],
    period: '2024 – Present',
    logo: '/brands/black-gold-fertilizer/logo.webp',
    website: 'https://blackgoldfertilizer.com',
    assetSource: 'https://blackgoldfertilizer.com',
    featured: true,
    publicApproved: true,
    logoApproved: true,
    active: true,
    order: 1,
    caseStudyLink: '/work/black-gold-fertilizer/',
    galleryAssets: [
      {
        sourceFile: '/images/black-gold-official.png',
        clientName: 'Black Gold Fertilizer',
        assetType: 'Product Visual',
        publicSourceUrl: 'https://blackgoldfertilizer.com',
        description: 'Official Black Gold 7kg Organic Fertilizer Pellets packaging used in digital acquisition campaigns.'
      },
      {
        sourceFile: '/images/black-gold-web-banner.png',
        clientName: 'Black Gold Fertilizer',
        assetType: 'Website Visual',
        publicSourceUrl: 'https://blackgoldfertilizer.com',
        description: 'Official e-commerce website promotional visual and storefront layout.'
      }
    ]
  },
  {
    id: 'wajib-livestock',
    name: 'Wajib Livestock',
    category: 'ecommerce',
    industry: 'Livestock & Seasonal E-Commerce',
    role: 'Seasonal digital campaign and sales support',
    summary: 'Supported seasonal Qurbani marketing through paid social advertising, lead generation, campaign creative, WhatsApp routing and digital sales support.',
    services: [
      'Seasonal strategy',
      'Paid social',
      'Lead generation',
      'Creative content',
      'WhatsApp sales routing',
      'Campaign management'
    ],
    website: 'https://wajib.pk',
    assetSource: 'https://wajib.pk',
    featured: true,
    publicApproved: true,
    logoApproved: false,
    active: true,
    order: 2,
    caseStudyLink: '/work/qurbani-campaign/'
  },
  {
    id: 'rk-reno-solutions',
    name: 'RK Reno Solutions',
    category: 'construction',
    industry: 'Renovation & Local Services',
    role: 'Website, content and local SEO',
    summary: 'Built a structured search foundation for renovation and air-conditioning services targeting Kuala Lumpur and Selangor.',
    services: [
      'SEO strategy',
      'Service-page development',
      'Local content',
      'On-page optimisation',
      'Website support',
      'Conversion-focused page structure'
    ],
    logo: '/brands/rk-reno-solutions/logo.webp',
    website: 'https://rkrenosolution.com',
    assetSource: 'https://rkrenosolution.com',
    featured: true,
    publicApproved: true,
    logoApproved: true,
    active: true,
    order: 3,
    caseStudyLink: '/work/rk-reno-solutions/',
    galleryAssets: [
      {
        sourceFile: '/brands/rk-reno-solutions/screenshot.png',
        clientName: 'RK Reno Solutions',
        assetType: 'Website Screenshot',
        publicSourceUrl: 'https://rkrenosolution.com',
        description: 'Genuine official homepage website screenshot showing structured service architecture for renovation and HVAC.'
      }
    ]
  },
  {
    id: 'convort-ai',
    name: 'Convort AI',
    category: 'technology',
    industry: 'AI Software Technology',
    role: 'AI product marketing and digital growth',
    summary: 'Digital brand, product-positioning and marketing support for an AI software platform.',
    services: [
      'Brand positioning',
      'Product marketing',
      'Website content',
      'Creative strategy',
      'Digital campaigns',
      'Growth support'
    ],
    logo: '/brands/convort-ai/logo.webp',
    website: 'https://convortai.com',
    assetSource: 'https://convortai.com',
    featured: false,
    publicApproved: true,
    logoApproved: true,
    active: true,
    order: 4
  },
  {
    id: 'right-link-advisors',
    name: 'Right Link Advisors',
    category: 'immigration',
    industry: 'Immigration & Advisory Services',
    role: 'Digital marketing and campaign creative',
    summary: 'Digital campaign and creative support for an immigration advisory brand.',
    services: [
      'Campaign strategy',
      'Paid social support',
      'Ad copy',
      'Video concepts',
      'Lead-generation creative',
      'Social content'
    ],
    logo: '/brands/right-link-advisors/logo.webp',
    assetSource: 'https://www.facebook.com/Rightlinkadvisors/',
    featured: false,
    publicApproved: true,
    logoApproved: true,
    active: true,
    order: 5
  },
  {
    id: 'rapidline-immigration-services',
    name: 'Rapidline Immigration Services',
    category: 'immigration',
    industry: 'Immigration Services',
    role: 'Paid social and immigration campaign support',
    summary: 'Campaign planning, advertising creative and lead-generation support for immigration services.',
    services: [
      'Paid social strategy',
      'Lead generation',
      'Ad scripting',
      'Creative production',
      'Audience planning',
      'Campaign support'
    ],
    logo: '/brands/rapidline-immigration-services/logo.webp',
    assetSource: 'https://www.facebook.com/RapidlineImmigartionServices/',
    featured: false,
    publicApproved: true,
    logoApproved: true,
    active: true,
    order: 6
  },
  {
    id: 'rapidzone',
    name: 'Rapidzone',
    category: 'business-services',
    industry: 'Business Setup & Corporate Services',
    role: 'Digital brand and business-services marketing',
    summary: 'Digital marketing and brand support for a UAE business-services company.',
    services: [
      'Brand marketing',
      'Campaign creative',
      'Social content',
      'Lead-generation support',
      'Website support',
      'Digital strategy'
    ],
    logo: '/brands/rapidzone/logo.webp',
    website: 'https://rapidzone.ae',
    assetSource: 'https://www.facebook.com/Rapidzone.ae',
    featured: false,
    publicApproved: true,
    logoApproved: true,
    active: true,
    order: 7
  },
  {
    id: 'viral-naturals',
    name: 'Viral Naturals',
    category: 'ecommerce',
    industry: 'Consumer Wellness & E-Commerce',
    role: 'Consumer brand and e-commerce development',
    summary: 'Brand, product-positioning, e-commerce and advertising creative development for a consumer wellness business.',
    services: [
      'Brand development',
      'Product positioning',
      'E-commerce planning',
      'Advertising scripts',
      'Creative direction',
      'Conversion content'
    ],
    website: 'https://viralnaturals.com',
    featured: false,
    publicApproved: true,
    logoApproved: false,
    active: true,
    order: 8
  },
  {
    id: 'shopinq-online',
    name: 'Shopinq Online',
    category: 'ecommerce',
    industry: 'Consumer E-Commerce',
    role: 'E-commerce marketing and operations',
    summary: 'E-commerce product marketing, promotion, customer communication and digital sales support.',
    services: [
      'Product marketing',
      'Paid social support',
      'Creative content',
      'Customer communication',
      'Order support',
      'E-commerce growth'
    ],
    featured: false,
    publicApproved: true,
    logoApproved: false,
    active: true,
    order: 9
  },
  {
    id: 'super-safety-covers',
    name: 'Super Safety Covers',
    category: 'ecommerce',
    industry: 'Protective Products & E-Commerce',
    role: 'Product marketing and e-commerce creative',
    summary: 'Digital marketing and creative support for a protective-cover e-commerce product line.',
    services: [
      'Product positioning',
      'Ad creative',
      'Social content',
      'E-commerce promotion',
      'Customer acquisition',
      'Sales support'
    ],
    featured: false,
    publicApproved: true,
    logoApproved: false,
    active: true,
    order: 10
  },
  {
    id: 'riyadh-finish-pro',
    name: 'Riyadh Finish Pro',
    category: 'construction',
    industry: 'Construction & Finishing Services',
    role: 'Website and local-service marketing',
    summary: 'Website, content and digital marketing support for construction and finishing services in Riyadh.',
    services: [
      'Website support',
      'Service content',
      'Local marketing',
      'Lead-generation structure',
      'Creative direction',
      'Digital strategy'
    ],
    website: 'https://riyadhfinishpro.com',
    featured: false,
    publicApproved: true,
    logoApproved: false,
    active: true,
    order: 11
  },
  {
    id: 'clearzone-immigration',
    name: 'Clearzone Immigration',
    category: 'immigration',
    industry: 'Immigration & Relocation',
    role: 'Immigration campaign strategy and creative',
    summary: 'Creative strategy and paid-social campaign support for immigration and company-setup services.',
    services: [
      'Campaign strategy',
      'Video scripts',
      'Ad creative',
      'Lead-generation messaging',
      'Paid social support',
      'Content direction'
    ],
    featured: false,
    publicApproved: true,
    logoApproved: false,
    active: true,
    order: 12
  },
  {
    id: 'europa-immigration',
    name: 'Europa Immigration',
    category: 'immigration',
    industry: 'International Immigration',
    role: 'Gulf-to-Europe campaign and creative support',
    summary: 'Paid-social strategy, scripts and campaign creative for immigration services targeting South Asian audiences in Gulf markets.',
    services: [
      'Campaign strategy',
      'Roman Urdu and Hindi scripts',
      'Video creative',
      'Paid social support',
      'Lead-generation messaging',
      'Audience localisation'
    ],
    featured: false,
    publicApproved: true,
    logoApproved: false,
    active: true,
    order: 13
  },
  {
    id: 'quick-immigration-service',
    name: 'Quick Immigration Service',
    category: 'immigration',
    industry: 'Immigration Consultancy',
    role: 'Digital campaign and lead-generation support',
    summary: 'Digital marketing, campaign creative and lead-generation support for immigration services.',
    services: [
      'Campaign planning',
      'Ad copy',
      'Creative support',
      'Paid social',
      'Lead generation',
      'Social content'
    ],
    featured: false,
    publicApproved: true,
    logoApproved: false,
    active: true,
    order: 14
  },
  {
    id: 'unique-lahore-lab-sahiwal',
    name: 'Unique Lahore Lab Sahiwal',
    category: 'healthcare',
    industry: 'Healthcare & Diagnostics',
    role: 'Healthcare digital marketing support',
    summary: 'Digital marketing and content support for a healthcare diagnostics brand.',
    services: [
      'Digital strategy',
      'Social content',
      'Creative support',
      'Local awareness',
      'Campaign messaging',
      'Brand communication'
    ],
    featured: false,
    publicApproved: true,
    logoApproved: false,
    active: true,
    order: 15
  }
];

