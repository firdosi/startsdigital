export interface Brand {
  id: string;
  name: string;
  category: 'ecommerce' | 'construction' | 'immigration' | 'technology' | 'healthcare' | 'business-services';
  industry: string;
  role: string;
  summary: string;
  services: string[];
  logo?: string;
  logoApproved: boolean;
  website?: string;
  facebook?: string;
  instagram?: string;
  featured: boolean;
  active: boolean;
  order: number;
  isTechnologyPartner?: boolean;
  caseStudyLink?: string;
}

export const brands: Brand[] = [
  {
    id: 'black-gold-fertilizer',
    name: 'Black Gold Fertilizer',
    category: 'ecommerce',
    industry: 'Agriculture & Lawn-Care E-Commerce',
    role: 'Digital Marketing & E-Commerce Growth',
    summary: 'Managed digital marketing, Meta advertising, creative production, website optimisation, analytics, customer retention and digital sales support for a Pakistan-wide lawn-care e-commerce brand.',
    services: [
      'Digital Strategy',
      'Meta Advertising',
      'Creative Production',
      'WordPress & WooCommerce',
      'Analytics & Tracking',
      'Customer Retention'
    ],
    logo: '/brands/black-gold-fertilizer/logo.webp',
    logoApproved: true,
    website: 'https://blackgoldfertilizer.com',
    facebook: 'https://www.facebook.com/profile.php?id=61561083447093',
    featured: true,
    active: true,
    order: 1,
    caseStudyLink: '/work/black-gold-fertilizer/'
  },
  {
    id: 'wajib-livestock',
    name: 'Wajib Livestock',
    category: 'ecommerce',
    industry: 'Livestock & Seasonal E-Commerce',
    role: 'Seasonal Digital Campaign & Sales Support',
    summary: 'Supported seasonal Qurbani marketing through paid social advertising, lead generation, campaign creative, WhatsApp routing and digital sales support.',
    services: [
      'Seasonal Strategy',
      'Paid Social',
      'Lead Generation',
      'Creative Content',
      'WhatsApp Sales Routing',
      'Campaign Management'
    ],
    logo: '/brands/wajib-livestock/logo.webp',
    logoApproved: true,
    website: 'https://wajib.pk',
    facebook: 'https://www.facebook.com/profile.php?id=61579219484606',
    featured: true,
    active: true,
    order: 2,
    caseStudyLink: '/work/qurbani-campaign/'
  },
  {
    id: 'rk-reno-solutions',
    name: 'RK Reno Solutions',
    category: 'construction',
    industry: 'Renovation & Local Services',
    role: 'Website, Content & Local SEO',
    summary: 'Built a structured search foundation for renovation and air-conditioning services targeting Kuala Lumpur and Selangor.',
    services: [
      'SEO Strategy',
      'Service-Page Development',
      'Local Content',
      'On-Page Optimisation',
      'Website Support',
      'Conversion-Focused Page Structure'
    ],
    logo: '/brands/rk-reno-solutions/logo.webp',
    logoApproved: true,
    website: 'https://rkrenosolution.com',
    featured: true,
    active: true,
    order: 3,
    caseStudyLink: '/work/rk-reno-solutions/'
  },
  {
    id: 'convort-ai',
    name: 'Convort AI',
    category: 'technology',
    industry: 'AI Software & Technology',
    role: 'Product Development & Growth Partner',
    summary: 'Starts Digital is an ongoing technology and growth partner for ConvortAI. We developed the ConvortAI web application and continue to support product development, project management, social media marketing, creative production and the wider digital growth operation.',
    services: [
      'Web App Development',
      'Ongoing Product Development',
      'Project Management',
      'Social Media Marketing',
      'Creative Production',
      'Growth Strategy'
    ],
    logo: '/brands/convort-ai/logo.webp',
    logoApproved: true,
    website: 'https://convortai.com/',
    featured: true,
    active: true,
    order: 4,
    isTechnologyPartner: true
  },
  {
    id: 'right-link-advisors',
    name: 'Right Link Advisors',
    category: 'immigration',
    industry: 'Immigration & Advisory',
    role: 'Digital Marketing & Campaign Creative',
    summary: 'Digital campaign and creative support for an immigration advisory brand.',
    services: [
      'Campaign Strategy',
      'Paid Social Support',
      'Ad Copy',
      'Video Concepts',
      'Lead-Generation Creative',
      'Social Content'
    ],
    logo: '/brands/right-link-advisors/logo.webp',
    logoApproved: true,
    facebook: 'https://www.facebook.com/Rightlinkadvisors/',
    featured: false,
    active: true,
    order: 5
  },
  {
    id: 'rapidline-immigration-services',
    name: 'Rapidline Immigration Services',
    category: 'immigration',
    industry: 'Immigration Services',
    role: 'Paid Social & Immigration Campaign Support',
    summary: 'Campaign planning, advertising creative and lead-generation support for immigration services.',
    services: [
      'Paid Social Strategy',
      'Lead Generation',
      'Ad Scripting',
      'Creative Production',
      'Audience Planning',
      'Campaign Support'
    ],
    logo: '/brands/rapidline-immigration-services/logo.webp',
    logoApproved: true,
    facebook: 'https://www.facebook.com/RapidlineImmigartionServices/',
    featured: false,
    active: true,
    order: 6
  },
  {
    id: 'rapidzone',
    name: 'Rapidzone',
    category: 'business-services',
    industry: 'Business Setup & Corporate Services',
    role: 'Digital Brand & Business-Services Marketing',
    summary: 'Digital marketing and brand support for a UAE business-services company.',
    services: [
      'Brand Marketing',
      'Campaign Creative',
      'Social Content',
      'Lead-Generation Support',
      'Website Support',
      'Digital Strategy'
    ],
    logo: '/brands/rapidzone/logo.webp',
    logoApproved: true,
    website: 'https://rapidzone.ae',
    facebook: 'https://www.facebook.com/Rapidzone.ae',
    featured: false,
    active: true,
    order: 7
  },
  {
    id: 'viral-naturals',
    name: 'Viral Naturals',
    category: 'ecommerce',
    industry: 'Consumer Wellness & E-Commerce',
    role: 'Consumer Brand & E-Commerce Development',
    summary: 'Brand, product-positioning, e-commerce and advertising creative development for a consumer wellness business.',
    services: [
      'Brand Development',
      'Product Positioning',
      'E-Commerce Planning',
      'Advertising Scripts',
      'Creative Direction',
      'Conversion Content'
    ],
    logoApproved: false,
    website: 'https://viralnaturals.com',
    facebook: 'https://www.facebook.com/ViralNaturals/',
    featured: false,
    active: true,
    order: 8
  },
  {
    id: 'shopinq-online',
    name: 'Shopinq Online',
    category: 'ecommerce',
    industry: 'Consumer E-Commerce',
    role: 'E-Commerce Marketing & Operations',
    summary: 'E-commerce product marketing, promotion, customer communication and digital sales support.',
    services: [
      'Product Marketing',
      'Paid Social Support',
      'Creative Content',
      'Customer Communication',
      'Order Support',
      'E-Commerce Growth'
    ],
    logoApproved: false,
    featured: false,
    active: true,
    order: 9
  },
  {
    id: 'super-safety-covers',
    name: 'Super Safety Covers',
    category: 'ecommerce',
    industry: 'Protective Products & E-Commerce',
    role: 'Product Marketing & E-Commerce Creative',
    summary: 'Digital marketing and creative support for a protective-cover e-commerce product line.',
    services: [
      'Product Positioning',
      'Ad Creative',
      'Social Content',
      'E-Commerce Promotion',
      'Customer Acquisition',
      'Sales Support'
    ],
    logoApproved: false,
    featured: false,
    active: true,
    order: 10
  },
  {
    id: 'riyadh-finish-pro',
    name: 'Riyadh Finish Pro',
    category: 'construction',
    industry: 'Construction & Finishing Services',
    role: 'Website & Local-Service Marketing',
    summary: 'Website, content and digital marketing support for construction and finishing services in Riyadh.',
    services: [
      'Website Support',
      'Service Content',
      'Local Marketing',
      'Lead-Generation Structure',
      'Creative Direction',
      'Digital Strategy'
    ],
    logoApproved: false,
    website: 'https://riyadhfinishpro.com',
    featured: false,
    active: true,
    order: 11
  },
  {
    id: 'clearzone-immigration',
    name: 'Clearzone Immigration',
    category: 'immigration',
    industry: 'Immigration & Relocation',
    role: 'Immigration Campaign Strategy & Creative',
    summary: 'Creative strategy and paid-social campaign support for immigration and company-setup services.',
    services: [
      'Campaign Strategy',
      'Video Scripts',
      'Ad Creative',
      'Lead-Generation Messaging',
      'Paid Social Support',
      'Content Direction'
    ],
    logoApproved: false,
    featured: false,
    active: true,
    order: 12
  },
  {
    id: 'europa-immigration',
    name: 'Europa Immigration',
    category: 'immigration',
    industry: 'International Immigration',
    role: 'Gulf-to-Europe Campaign & Creative Support',
    summary: 'Paid-social strategy, scripts and campaign creative for immigration services targeting South Asian audiences in Gulf markets.',
    services: [
      'Campaign Strategy',
      'Roman Urdu and Hindi Scripts',
      'Video Creative',
      'Paid Social Support',
      'Lead-Generation Messaging',
      'Audience Localisation'
    ],
    logoApproved: false,
    featured: false,
    active: true,
    order: 13
  },
  {
    id: 'quick-immigration-service',
    name: 'Quick Immigration Service',
    category: 'immigration',
    industry: 'Immigration Consultancy',
    role: 'Digital Campaign & Lead-Generation Support',
    summary: 'Digital marketing, campaign creative and lead-generation support for immigration services.',
    services: [
      'Campaign Planning',
      'Ad Copy',
      'Creative Support',
      'Paid Social',
      'Lead Generation',
      'Social Content'
    ],
    logoApproved: false,
    featured: false,
    active: true,
    order: 14
  },
  {
    id: 'unique-lahore-lab-sahiwal',
    name: 'Unique Lahore Lab Sahiwal',
    category: 'healthcare',
    industry: 'Healthcare & Diagnostics',
    role: 'Healthcare Digital Marketing Support',
    summary: 'Digital marketing and content support for a healthcare diagnostics brand.',
    services: [
      'Digital Strategy',
      'Social Content',
      'Creative Support',
      'Local Awareness',
      'Campaign Messaging',
      'Brand Communication'
    ],
    logoApproved: false,
    featured: false,
    active: true,
    order: 15
  }
];
