import { brands, type Brand } from './brands';

export type EvidenceLevel = 'detailed-case-study' | 'verified-project-summary' | 'client-experience';

export interface Project {
  id: string;
  brandId: string;
  projectSlug: string;
  publicName: string;
  sector: string;
  relationshipType?: string;
  shortSummary: string;
  approvedServices: string[];
  verifiedOutcome?: string;
  caseStudyPath?: string;
  officialWebsite?: string;
  officialSocialUrl?: string;
  logo: string;
  logoFit?: 'compact' | 'standard' | 'wide' | 'large';
  darkLogoContainer?: boolean;
  featured: boolean;
  published: boolean;
  evidenceLevel: EvidenceLevel;
  media?: {
    thumbnail?: string;
    heroImage?: string;
    gallery?: string[];
  };
  displayOrder: number;
}

export const projectsData: Project[] = [
  {
    id: 'black-gold-fertilizer',
    brandId: 'black-gold-fertilizer',
    projectSlug: 'black-gold-fertilizer',
    publicName: 'Black Gold Fertilizer',
    sector: 'Agriculture & E-commerce',
    relationshipType: 'Client Experience',
    shortSummary: 'Digital strategy, Meta advertising, creative testing, WooCommerce development, analytics and delivered-order sales support for lawn-care e-commerce.',
    approvedServices: ['Paid Advertising', 'Website Design & Development', 'Creative Content', 'SEO & Local Search'],
    verifiedOutcome: 'Supported PKR 30M+ in delivered-order revenue, 29,000+ product sales and 22,000+ delivered sales over 24 months.',
    caseStudyPath: '/work/black-gold-fertilizer/',
    officialWebsite: 'https://blackgoldfertilizer.com',
    officialSocialUrl: 'https://www.facebook.com/profile.php?id=61561083447093',
    logo: '/brands/black-gold-fertilizer/logo.webp',
    logoFit: 'standard',
    darkLogoContainer: true,
    featured: true,
    published: true,
    evidenceLevel: 'detailed-case-study',
    displayOrder: 1
  },
  {
    id: 'wajib-livestock',
    brandId: 'wajib-livestock',
    projectSlug: 'qurbani-campaign',
    publicName: 'Wajib Livestock',
    sector: 'Livestock & Seasonal Campaigns',
    relationshipType: 'Client Experience',
    shortSummary: 'Seasonal campaign strategy, paid social advertising, lead generation, WhatsApp sales routing and creative content for Eid Qurbani sales.',
    approvedServices: ['Paid Advertising', 'Creative Content', 'Social Media Marketing'],
    verifiedOutcome: 'Helped sell more than 150 animals and supported PKR 4.2M+ in sales during the Eid Qurbani campaign.',
    caseStudyPath: '/work/qurbani-campaign/',
    officialWebsite: 'https://wajib.pk',
    officialSocialUrl: 'https://www.facebook.com/profile.php?id=61579219484606',
    logo: '/brands/wajib-livestock/logo.webp',
    logoFit: 'standard',
    darkLogoContainer: true,
    featured: true,
    published: true,
    evidenceLevel: 'detailed-case-study',
    displayOrder: 2
  },
  {
    id: 'rk-reno-solutions',
    brandId: 'rk-reno-solutions',
    projectSlug: 'rk-reno-solutions',
    publicName: 'RK Reno Solutions',
    sector: 'Renovation & Local Services',
    relationshipType: 'Client Experience',
    shortSummary: 'Website design, location-focused content, service-page development and local SEO foundation for renovation and air-conditioning services in Kuala Lumpur and Selangor.',
    approvedServices: ['Website Design & Development', 'SEO & Local Search', 'Creative Content'],
    verifiedOutcome: 'Established a structured search and location foundation targeting Kuala Lumpur and Selangor.',
    caseStudyPath: '/work/rk-reno-solutions/',
    officialWebsite: 'https://rkrenosolution.com',
    logo: '/brands/rk-reno-solutions/logo.webp',
    logoFit: 'large',
    darkLogoContainer: false,
    featured: true,
    published: true,
    evidenceLevel: 'detailed-case-study',
    displayOrder: 3
  },
  {
    id: 'convort-ai',
    brandId: 'convort-ai',
    projectSlug: 'convort-ai',
    publicName: 'ConvortAI',
    sector: 'Technology Product',
    relationshipType: 'Technology Partner & Product Development & Growth Partner',
    shortSummary: 'Starts Digital developed the ConvortAI web application and continues supporting product development, project management, social media, creative production and growth.',
    approvedServices: ['AI Marketing Workflows', 'Website Design & Development', 'Social Media Marketing', 'Creative Content'],
    verifiedOutcome: 'Built web app MVP and ongoing product development, social media marketing and project management support.',
    caseStudyPath: '/work/#convortai',
    officialWebsite: 'https://convortai.com/',
    logo: '/brands/convort-ai/logo.webp',
    logoFit: 'standard',
    darkLogoContainer: true,
    featured: true,
    published: true,
    evidenceLevel: 'detailed-case-study',
    displayOrder: 4
  },
  {
    id: 'right-link-advisors',
    brandId: 'right-link-advisors',
    projectSlug: 'right-link-advisors',
    publicName: 'Right Link Advisors',
    sector: 'Immigration & Advisory',
    relationshipType: 'Client Experience',
    shortSummary: 'Digital campaign strategy, paid social creative, ad copy and lead-generation content for an immigration advisory service.',
    approvedServices: ['Paid Advertising', 'Creative Content', 'Social Media Marketing'],
    officialSocialUrl: 'https://www.facebook.com/Rightlinkadvisors/',
    logo: '/brands/right-link-advisors/logo.webp',
    logoFit: 'large',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 5
  },
  {
    id: 'rapidline-immigration-services',
    brandId: 'rapidline-immigration-services',
    projectSlug: 'rapidline-immigration-services',
    publicName: 'Rapidline Immigration Services',
    sector: 'Immigration & Consultancy',
    relationshipType: 'Client Experience',
    shortSummary: 'Campaign planning, advertising creative, video scriptwriting and lead-generation campaign support for immigration services.',
    approvedServices: ['Paid Advertising', 'Creative Content'],
    officialSocialUrl: 'https://www.facebook.com/RapidlineImmigartionServices/',
    logo: '/brands/rapidline-immigration-services/logo.webp',
    logoFit: 'compact',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 6
  },
  {
    id: 'rapidzone',
    brandId: 'rapidzone',
    projectSlug: 'rapidzone',
    publicName: 'Rapidzone',
    sector: 'Business Services & Corporate Setup',
    relationshipType: 'Client Experience',
    shortSummary: 'Digital marketing, brand content, website support and paid social lead-generation strategy for a UAE business services firm.',
    approvedServices: ['Paid Advertising', 'Website Design & Development', 'Creative Content'],
    officialWebsite: 'https://rapidzone.ae',
    officialSocialUrl: 'https://www.facebook.com/Rapidzone.ae',
    logo: '/brands/rapidzone/logo.webp',
    logoFit: 'compact',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 7
  },
  {
    id: 'viral-naturals',
    brandId: 'viral-naturals',
    projectSlug: 'viral-naturals',
    publicName: 'Viral Naturals',
    sector: 'Consumer Goods & E-Commerce',
    relationshipType: 'Client Experience',
    shortSummary: 'Brand positioning, product presentation, e-commerce planning and conversion-focused creative content.',
    approvedServices: ['Website Design & Development', 'Creative Content', 'Social Media Marketing'],
    officialWebsite: 'https://viralnaturals.com',
    officialSocialUrl: 'https://www.facebook.com/ViralNaturals/',
    logo: '/brands/viral-naturals/logo.webp',
    logoFit: 'large',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 8
  },
  {
    id: 'clearzone-immigration',
    brandId: 'clearzone-immigration',
    projectSlug: 'clearzone-immigration',
    publicName: 'Clearzone Immigration',
    sector: 'Immigration & Consultancy',
    relationshipType: 'Client Experience',
    shortSummary: 'Creative strategy, ad video scripting and paid social campaign support for immigration and company setup services.',
    approvedServices: ['Paid Advertising', 'Creative Content'],
    officialWebsite: 'https://clearzoneimmigration.com',
    logo: '/brands/clearzone-immigration/logo.webp',
    logoFit: 'standard',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 9
  },
  {
    id: 'riyadh-finish-pro',
    brandId: 'riyadh-finish-pro',
    projectSlug: 'riyadh-finish-pro',
    publicName: 'Riyadh Finish Pro',
    sector: 'Construction & Finishing Services',
    relationshipType: 'Client Experience',
    shortSummary: 'Website development, local service content and lead-generation page structure for construction and finishing in Riyadh.',
    approvedServices: ['Website Design & Development', 'SEO & Local Search'],
    officialWebsite: 'https://riyadhfinishpro.com',
    officialSocialUrl: 'https://www.facebook.com/RiyadhFinishPro/',
    logo: '/brands/riyadh-finish-pro/logo.webp',
    logoFit: 'large',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 10
  },
  {
    id: 'shopinq-online',
    brandId: 'shopinq-online',
    projectSlug: 'shopinq-online',
    publicName: 'Shopinq Online',
    sector: 'E-Commerce & Retail',
    relationshipType: 'Client Experience',
    shortSummary: 'E-commerce product promotion, paid social support, creative content and digital sales communication.',
    approvedServices: ['Paid Advertising', 'Creative Content', 'Social Media Marketing'],
    officialSocialUrl: 'https://www.facebook.com/shopinq.online/',
    logo: '/brands/shopinq-online/logo.webp',
    logoFit: 'standard',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 11
  },
  {
    id: 'super-safety-covers',
    brandId: 'super-safety-covers',
    projectSlug: 'super-safety-covers',
    publicName: 'Super Safety Covers',
    sector: 'E-Commerce & Protective Covers',
    relationshipType: 'Client Experience',
    shortSummary: 'Product positioning, advertising creative, social media content and digital customer acquisition support.',
    approvedServices: ['Creative Content', 'Paid Advertising', 'Social Media Marketing'],
    officialSocialUrl: 'https://www.facebook.com/SuperSafetyCovers/',
    logo: '/brands/super-safety-covers/logo.webp',
    logoFit: 'large',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 12
  },
  {
    id: 'unique-lahore-lab-sahiwal',
    brandId: 'unique-lahore-lab-sahiwal',
    projectSlug: 'unique-lahore-lab-sahiwal',
    publicName: 'Unique Lahore Lab Sahiwal',
    sector: 'Healthcare Diagnostics',
    relationshipType: 'Client Experience',
    shortSummary: 'Digital strategy, local awareness content, campaign messaging and healthcare diagnostic service marketing.',
    approvedServices: ['Social Media Marketing', 'Creative Content', 'SEO & Local Search'],
    officialSocialUrl: 'https://www.facebook.com/profile.php?id=100054656280926',
    logo: '/brands/unique-lahore-lab-sahiwal/logo.webp',
    logoFit: 'large',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 13
  }
];

// Helper Functions
export function getAllProjects(): Project[] {
  return projectsData;
}

export function getPublishedProjects(): Project[] {
  return projectsData.filter((p) => p.published);
}

export function getFeaturedProjects(): Project[] {
  return getPublishedProjects().filter((p) => p.featured || p.evidenceLevel === 'detailed-case-study');
}

export function getProjectById(id: string): Project | undefined {
  return projectsData.find((p) => p.id === id || p.brandId === id || p.projectSlug === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.projectSlug === slug || p.id === slug || p.brandId === slug);
}

export function getClientDirectoryProjects(): Project[] {
  return getPublishedProjects().sort((a, b) => a.publicName.localeCompare(b.publicName));
}

export function getProjectsByService(serviceNameOrSlug: string): Project[] {
  const query = serviceNameOrSlug.toLowerCase();
  return getPublishedProjects().filter((p) =>
    p.approvedServices.some((s) => s.toLowerCase().includes(query))
  );
}

export function getProjectsByEvidenceLevel(level: EvidenceLevel): Project[] {
  return getPublishedProjects().filter((p) => p.evidenceLevel === level);
}

export function getEvidenceLevelLabel(level: EvidenceLevel): string {
  switch (level) {
    case 'detailed-case-study':
      return 'Detailed Project Story';
    case 'verified-project-summary':
      return 'Verified Project Summary';
    case 'client-experience':
    default:
      return 'Client Experience';
  }
}
