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
  darkLogoContainer?: boolean;
  logoFit?: 'compact' | 'standard' | 'wide' | 'large';
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
    industry: 'Agriculture',
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
    logoFit: 'standard',
    website: 'https://blackgoldfertilizer.com',
    facebook: 'https://www.facebook.com/profile.php?id=61561083447093',
    featured: true,
    active: true,
    order: 1,
    caseStudyLink: '/work/'
  },
  {
    id: 'wajib-livestock',
    name: 'Wajib Livestock',
    category: 'ecommerce',
    industry: 'Livestock',
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
    darkLogoContainer: true,
    logoFit: 'standard',
    website: 'https://wajib.pk',
    facebook: 'https://www.facebook.com/profile.php?id=61579219484606',
    featured: true,
    active: true,
    order: 2,
    caseStudyLink: '/work/'
  },
  {
    id: 'rk-reno-solutions',
    name: 'RK Reno Solutions',
    category: 'construction',
    industry: 'Renovation',
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
    logoFit: 'large',
    website: 'https://rkrenosolution.com',
    featured: true,
    active: true,
    order: 3,
    caseStudyLink: '/work/'
  },
  {
    id: 'convort-ai',
    name: 'ConvortAI',
    category: 'technology',
    industry: 'AI Technology',
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
    darkLogoContainer: true,
    logoFit: 'standard',
    website: 'https://convortai.com/',
    featured: true,
    active: true,
    order: 4,
    isTechnologyPartner: true,
    caseStudyLink: '/work/convort-ai/'
  },
  {
    id: 'rapidline-immigration-services',
    name: 'Rapidline Immigration Services',
    category: 'immigration',
    industry: 'Immigration',
    role: 'Creative Design & Video Campaign Support',
    summary: 'Campaign planning, advertising video edits, creative production, and lead-generation support for immigration services in Dubai.',
    services: [
      'Creative Design',
      'Video Editing',
      'Campaign Creative Production',
      'Paid Social Strategy',
      'Lead Generation'
    ],
    logo: '/brands/rapidline-immigration-services/logo.webp',
    logoApproved: true,
    logoFit: 'compact',
    website: 'https://rapidlineimmigration.com/',
    facebook: 'https://www.facebook.com/RapidlineImmigartionServices/',
    featured: false,
    active: true,
    order: 5,
    caseStudyLink: '/work/'
  },
  {
    id: 'rapidzone',
    name: 'Rapidzone',
    category: 'immigration',
    industry: 'Business Setup',
    role: 'Creative Design & Campaign Production',
    summary: 'Advertising videos, creative production, and lead-generation campaign support for business setup and immigration services in Dubai.',
    services: [
      'Creative Design',
      'Video Editing',
      'Campaign Creative Production',
      'Social Content'
    ],
    logo: '/brands/rapidzone/logo.webp',
    logoApproved: true,
    logoFit: 'compact',
    darkLogoContainer: true,
    website: 'https://rapidzone.ae/',
    facebook: 'https://www.facebook.com/Rapidzone.ae/',
    featured: false,
    active: true,
    order: 6,
    caseStudyLink: '/work/'
  },
  {
    id: 'clearzone-immigration',
    name: 'Clearzone Immigration',
    category: 'immigration',
    industry: 'Immigration & Business Setup',
    role: 'AI Character Workflow & Campaign Production',
    summary: 'Developed 27+ custom AI characters on a private VPS, created video campaign assets, and executed paid social campaigns through company rebrand.',
    services: [
      'AI Character Workflows',
      'Creative Production',
      'Paid Advertising',
      'Social Media Marketing'
    ],
    logo: '/brands/clearzone-immigration/logo.webp',
    logoApproved: true,
    logoFit: 'standard',
    website: 'https://clearzoneimmigration.com/',
    facebook: 'https://www.facebook.com/ClearzonebyEuropa/',
    featured: false,
    active: true,
    order: 7,
    caseStudyLink: '/work/'
  },
  {
    id: 'riyadh-finish-pro',
    name: 'Riyadh Finish Pro',
    category: 'construction',
    industry: 'Construction & Local Services',
    role: 'Website Development & Local Search Setup',
    summary: 'Website development, Facebook page setup, before-and-after graphic design, and Google Business Profile / Maps setup for Riyadh contractor services.',
    services: [
      'Website Development',
      'Google Maps & Local Search',
      'Facebook Business Setup',
      'Graphic Design'
    ],
    logo: '/brands/riyadh-finish-pro/logo.webp',
    logoApproved: true,
    logoFit: 'large',
    website: 'https://riyadhfinishpro.com/',
    facebook: 'https://www.facebook.com/RiyadhFinishPro/',
    featured: false,
    active: true,
    order: 8,
    caseStudyLink: '/work/'
  },
  {
    id: 'viral-naturals',
    name: 'Viral Naturals',
    category: 'ecommerce',
    industry: 'E-Commerce',
    role: 'E-Commerce Business Setup & Marketing',
    summary: 'Complete e-commerce setup from scratch, storefront development, social account creation, video production, and ongoing sales marketing.',
    services: [
      'E-Commerce Development',
      'Digital Marketing',
      'Creative Production',
      'Social Media Setup'
    ],
    logo: '/brands/viral-naturals/logo.webp',
    logoApproved: true,
    logoFit: 'large',
    website: 'https://viralnaturals.com/',
    facebook: 'https://www.facebook.com/ViralNaturals/',
    featured: false,
    active: true,
    order: 9,
    caseStudyLink: '/work/'
  },
  {
    id: 'shopinq-online',
    name: 'Shopinq Online',
    category: 'ecommerce',
    industry: 'E-Commerce Distribution',
    role: 'E-Commerce Marketing & Distribution',
    summary: 'Promoted startup product lines on a sales-commission structure through paid social campaigns, creative content, customer communication, and order support.',
    services: [
      'Product Marketing',
      'Paid Social Support',
      'Creative Content',
      'Customer Support & Sales'
    ],
    logo: '/brands/shopinq-online/logo.webp',
    logoApproved: true,
    logoFit: 'standard',
    facebook: 'https://www.facebook.com/shopinq.online/',
    featured: false,
    active: true,
    order: 10,
    caseStudyLink: '/work/shopinq-online/'
  },
  {
    id: 'super-safety-covers',
    name: 'Super Safety Covers',
    category: 'ecommerce',
    industry: 'E-Commerce',
    role: 'Initial Business Setup & Campaign Structure',
    summary: 'Business setup from scratch, Facebook page setup, advertising creative, product positioning, and initial digital-marketing structure for bike covers.',
    services: [
      'Initial Business Setup',
      'Ad Creative Production',
      'Product Positioning',
      'Campaign Structure'
    ],
    logo: '/brands/super-safety-covers/logo.webp',
    logoApproved: true,
    logoFit: 'large',
    facebook: 'https://www.facebook.com/SuperSafetyCovers/',
    featured: false,
    active: true,
    order: 11,
    caseStudyLink: '/work/'
  },
  {
    id: 'unique-lahore-lab-sahiwal',
    name: 'Unique Lahore Lab Sahiwal',
    category: 'healthcare',
    industry: 'Healthcare Diagnostics',
    role: 'Creative & Visual Asset Support',
    summary: 'Produced AI-assisted ad creatives and visual assets using the laboratory’s original photography and diagnostic facility videos.',
    services: [
      'Creative Content Support',
      'Visual Asset Production',
      'Social Media Support'
    ],
    logo: '/brands/unique-lahore-lab-sahiwal/logo.webp',
    logoApproved: true,
    logoFit: 'large',
    website: 'https://www.ullabswl.com/',
    facebook: 'https://www.facebook.com/profile.php?id=100054656280926',
    featured: false,
    active: true,
    order: 12,
    caseStudyLink: '/work/'
  },
  {
    id: 'my-coach-live',
    name: 'My Coach Live',
    category: 'technology',
    industry: 'Fitness & Wellness Technology',
    role: 'Ongoing Digital Product & Creative Support',
    summary: 'Ongoing project support for a remote fitness coaching platform providing live trainer guidance, nutritionist support, session booking, workout history, progress tracking, and personalised diet plans for UK and US clients.',
    services: [
      'Digital Product Support',
      'Creative Production',
      'Video Editing',
      'Growth Support',
      'Platform Development'
    ],
    logoApproved: false,
    logoFit: 'standard',
    website: 'https://my-coach.live/',
    featured: true,
    active: true,
    order: 13,
    caseStudyLink: '/work/my-coach-live/'
  }
];
