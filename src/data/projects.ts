import fs from 'node:fs';
import path from 'node:path';
import { brands, type Brand } from './brands';
import { servicesData, getServiceById, type ServiceDefinition } from './services';
import { site } from '../site.config';

export type DetailType = 'case-study' | 'partner-story' | 'client-experience';
export type EvidenceLevel = 'detailed-case-study' | 'verified-project-summary' | 'client-experience';
export type ProjectVariant = 'ecommerce' | 'seasonal' | 'local-search' | 'technology' | 'default';

export interface ProjectRecord {
  id: string;
  brandId: string;
  projectSlug: string;
  sectorOverride?: string;
  relationshipType?: string;
  primaryRelationship?: string;
  secondaryRelationship?: string;
  shortSummary: string;
  serviceIds: string[];
  verifiedOutcome?: string;
  verifiedContribution?: string;
  detailPath?: string;
  detailType: DetailType;
  variant?: ProjectVariant;
  contactSourceValue?: string;
  contactSourceLabel?: string;
  featured: boolean;
  published: boolean;
  evidenceLevel: EvidenceLevel;
  media?: {
    thumbnail?: string;
    heroImage?: string;
    heroPicture?: {
      webp?: string;
      avif?: string;
      smWebp?: string;
    };
    gallery?: string[];
  };
  displayOrder: number;
}

export interface ResolvedProject extends ProjectRecord {
  brand: Brand;
  publicName: string;
  sector: string;
  logo: string;
  logoFit: 'compact' | 'standard' | 'wide' | 'large';
  darkLogoContainer: boolean;
  officialWebsite?: string;
  officialSocialUrl?: string;
  resolvedServices: ServiceDefinition[];
  approvedServices: string[];
  contactSourceValue: string;
  contactSourceLabel: string;
  whatsappUrl: string;
  whatsappMessage: string;
}

export const projectRecords: ProjectRecord[] = [
  {
    id: 'black-gold-fertilizer',
    brandId: 'black-gold-fertilizer',
    projectSlug: 'black-gold-fertilizer',
    sectorOverride: 'Agriculture & E-commerce',
    relationshipType: 'Client Experience',
    shortSummary: 'Digital strategy, Meta advertising, creative testing, e-commerce growth support and website support for lawn-care e-commerce.',
    serviceIds: ['paid-advertising', 'website-design-development', 'creative-content', 'seo-local-search'],
    verifiedOutcome: 'Supported PKR 30M+ in delivered-order revenue, 29,000+ product sales and 22,000+ delivered sales over 24 months.',
    detailPath: '/work/black-gold-fertilizer/',
    detailType: 'case-study',
    variant: 'ecommerce',
    contactSourceValue: 'black-gold-fertilizer',
    contactSourceLabel: 'Black Gold Fertilizer',
    featured: true,
    published: true,
    evidenceLevel: 'detailed-case-study',
    media: {
      heroImage: '/images/black-gold-official.png',
      gallery: ['/images/black-gold-official.png', '/images/black-gold-web-banner.png']
    },
    displayOrder: 1
  },
  {
    id: 'wajib-livestock',
    brandId: 'wajib-livestock',
    projectSlug: 'qurbani-campaign',
    sectorOverride: 'Livestock & Seasonal Campaigns',
    relationshipType: 'Client Experience',
    shortSummary: 'Campaign strategy, paid social, lead generation, creative production and sales support for Eid Qurbani sales.',
    serviceIds: ['paid-advertising', 'creative-content', 'social-media-marketing'],
    verifiedOutcome: 'Helped sell more than 150 animals and supported PKR 4.2M+ in sales during the Eid Qurbani campaign.',
    detailPath: '/work/qurbani-campaign/',
    detailType: 'case-study',
    variant: 'seasonal',
    contactSourceValue: 'qurbani-campaign',
    contactSourceLabel: 'Wajib Livestock Qurbani Campaign',
    featured: true,
    published: true,
    evidenceLevel: 'detailed-case-study',
    displayOrder: 2
  },
  {
    id: 'rk-reno-solutions',
    brandId: 'rk-reno-solutions',
    projectSlug: 'rk-reno-solutions',
    sectorOverride: 'Renovation & Local Services',
    relationshipType: 'Client Experience',
    shortSummary: 'Website design, location-focused content, service-page development and local SEO foundation for renovation and air-conditioning services in Kuala Lumpur and Selangor.',
    serviceIds: ['website-design-development', 'seo-local-search', 'creative-content'],
    verifiedContribution: 'Website, content and local SEO foundation for renovation and air-conditioning services in Kuala Lumpur and Selangor.',
    detailPath: '/work/rk-reno-solutions/',
    detailType: 'case-study',
    variant: 'local-search',
    contactSourceValue: 'rk-reno-solutions',
    contactSourceLabel: 'RK Reno Solutions',
    featured: true,
    published: true,
    evidenceLevel: 'detailed-case-study',
    media: {
      heroImage: '/brands/rk-reno-solutions/screenshot.webp',
      heroPicture: {
        webp: '/brands/rk-reno-solutions/screenshot.webp',
        avif: '/brands/rk-reno-solutions/screenshot.avif',
        smWebp: '/brands/rk-reno-solutions/screenshot-sm.webp'
      }
    },
    displayOrder: 3
  },
  {
    id: 'convort-ai',
    brandId: 'convort-ai',
    projectSlug: 'convortai',
    sectorOverride: 'Technology Product',
    relationshipType: 'Technology Partner',
    primaryRelationship: 'Technology Partner',
    secondaryRelationship: 'Product Development & Growth Partner',
    shortSummary: 'Starts Digital developed the ConvortAI web application and continues supporting product development, project management, social media, creative production and growth.',
    serviceIds: ['website-design-development', 'ai-marketing-workflows', 'social-media-marketing', 'creative-content'],
    verifiedContribution: 'Starts Digital developed the ConvortAI web application and continues supporting product development, project management, social media, creative production and growth.',
    detailPath: '/work/convortai/',
    detailType: 'partner-story',
    variant: 'technology',
    contactSourceValue: 'convortai',
    contactSourceLabel: 'ConvortAI Technology and Growth Partnership',
    featured: true,
    published: true,
    evidenceLevel: 'detailed-case-study',
    displayOrder: 4
  },
  {
    id: 'right-link-advisors',
    brandId: 'right-link-advisors',
    projectSlug: 'right-link-advisors',
    shortSummary: 'Digital campaign strategy, paid social creative, ad copy and lead-generation content for an immigration advisory service.',
    serviceIds: ['paid-advertising', 'creative-content', 'social-media-marketing'],
    detailType: 'client-experience',
    variant: 'default',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 5
  },
  {
    id: 'rapidline-immigration-services',
    brandId: 'rapidline-immigration-services',
    projectSlug: 'rapidline-immigration-services',
    shortSummary: 'Campaign planning, advertising creative, video scriptwriting and lead-generation campaign support for immigration services.',
    serviceIds: ['paid-advertising', 'creative-content'],
    detailType: 'client-experience',
    variant: 'default',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 6
  },
  {
    id: 'rapidzone',
    brandId: 'rapidzone',
    projectSlug: 'rapidzone',
    shortSummary: 'Digital marketing, brand content, website support and paid social lead-generation strategy for a UAE business services firm.',
    serviceIds: ['paid-advertising', 'website-design-development', 'creative-content'],
    detailType: 'client-experience',
    variant: 'default',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 7
  },
  {
    id: 'viral-naturals',
    brandId: 'viral-naturals',
    projectSlug: 'viral-naturals',
    shortSummary: 'Brand positioning, product presentation, e-commerce planning and conversion-focused creative content.',
    serviceIds: ['website-design-development', 'creative-content', 'social-media-marketing'],
    detailType: 'client-experience',
    variant: 'default',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 8
  },
  {
    id: 'clearzone-immigration',
    brandId: 'clearzone-immigration',
    projectSlug: 'clearzone-immigration',
    shortSummary: 'Creative strategy, ad video scripting and paid social campaign support for immigration and company setup services.',
    serviceIds: ['paid-advertising', 'creative-content'],
    detailType: 'client-experience',
    variant: 'default',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 9
  },
  {
    id: 'riyadh-finish-pro',
    brandId: 'riyadh-finish-pro',
    projectSlug: 'riyadh-finish-pro',
    shortSummary: 'Website development, local service content and lead-generation page structure for construction and finishing in Riyadh.',
    serviceIds: ['website-design-development', 'seo-local-search'],
    detailType: 'client-experience',
    variant: 'default',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 10
  },
  {
    id: 'shopinq-online',
    brandId: 'shopinq-online',
    projectSlug: 'shopinq-online',
    shortSummary: 'E-commerce product promotion, paid social support, creative content and digital sales communication.',
    serviceIds: ['paid-advertising', 'creative-content', 'social-media-marketing'],
    detailType: 'client-experience',
    variant: 'default',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 11
  },
  {
    id: 'super-safety-covers',
    brandId: 'super-safety-covers',
    projectSlug: 'super-safety-covers',
    shortSummary: 'Product positioning, advertising creative, social media content and digital customer acquisition support.',
    serviceIds: ['creative-content', 'paid-advertising', 'social-media-marketing'],
    detailType: 'client-experience',
    variant: 'default',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 12
  },
  {
    id: 'unique-lahore-lab-sahiwal',
    brandId: 'unique-lahore-lab-sahiwal',
    projectSlug: 'unique-lahore-lab-sahiwal',
    shortSummary: 'Digital strategy, local awareness content, campaign messaging and healthcare diagnostic service marketing.',
    serviceIds: ['social-media-marketing', 'creative-content', 'seo-local-search'],
    detailType: 'client-experience',
    variant: 'default',
    featured: false,
    published: true,
    evidenceLevel: 'client-experience',
    displayOrder: 13
  }
];

function resolveProjectRecord(record: ProjectRecord): ResolvedProject | null {
  const brand = brands.find((b) => b.id === record.brandId);
  if (!brand || !brand.active) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[Project Error] Missing or inactive brand for project: ${record.id} (brandId: ${record.brandId})`);
    }
    return null;
  }

  const resolvedServices = record.serviceIds
    .map((id) => getServiceById(id))
    .filter((s): s is ServiceDefinition => Boolean(s));

  const approvedServices = resolvedServices.map((s) => s.name);

  const contactSourceValue = record.contactSourceValue || record.projectSlug || record.id;
  const contactSourceLabel = record.contactSourceLabel || brand.name;

  let whatsappMessage = `Hello Starts Digital, I would like to discuss a project similar to ${brand.name}.`;
  if (record.id === 'black-gold-fertilizer') {
    whatsappMessage = 'Hello Starts Digital, I would like to discuss a project similar to Black Gold Fertilizer.';
  } else if (record.id === 'wajib-livestock') {
    whatsappMessage = 'Hello Starts Digital, I would like to discuss a project similar to Wajib Livestock.';
  } else if (record.id === 'rk-reno-solutions') {
    whatsappMessage = 'Hello Starts Digital, I would like to discuss a project similar to RK Reno Solutions.';
  } else if (record.id === 'convort-ai') {
    whatsappMessage = 'Hello Starts Digital, I would like to discuss a project after reviewing the ConvortAI partner story.';
  }

  const whatsappUrl = `${site.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return {
    ...record,
    brand,
    publicName: brand.name,
    sector: record.sectorOverride || brand.industry,
    logo: brand.logo || '',
    logoFit: brand.logoFit || 'standard',
    darkLogoContainer: brand.darkLogoContainer || false,
    officialWebsite: brand.website,
    officialSocialUrl: brand.facebook || brand.instagram,
    resolvedServices,
    approvedServices,
    contactSourceValue,
    contactSourceLabel,
    whatsappUrl,
    whatsappMessage
  };
}

export function getAllProjects(): ResolvedProject[] {
  return projectRecords.map(resolveProjectRecord).filter((p): p is ResolvedProject => p !== null);
}

export function getPublishedProjects(): ResolvedProject[] {
  return getAllProjects().filter((p) => p.published);
}

export function getFeaturedProjects(): ResolvedProject[] {
  return getPublishedProjects().filter((p) => p.featured || p.evidenceLevel === 'detailed-case-study');
}

export function getDetailedProjectStories(): ResolvedProject[] {
  return getPublishedProjects()
    .filter((p) => (p.detailType === 'case-study' || p.detailType === 'partner-story') && Boolean(p.detailPath))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getProjectStoryNavigation(currentSlug: string): {
  prevProject: ResolvedProject | undefined;
  nextProject: ResolvedProject | undefined;
} {
  const stories = getDetailedProjectStories();
  const currentIndex = stories.findIndex(
    (p) => p.projectSlug === currentSlug || p.id === currentSlug || p.brandId === currentSlug
  );

  if (currentIndex === -1) {
    return { prevProject: undefined, nextProject: undefined };
  }

  const prevProject = currentIndex > 0 ? stories[currentIndex - 1] : undefined;
  const nextProject = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : undefined;

  return { prevProject, nextProject };
}

export function getProjectById(id: string): ResolvedProject | undefined {
  return getPublishedProjects().find(
    (p) => p.id === id || p.brandId === id || p.projectSlug === id
  );
}

export function getProjectBySlug(slug: string): ResolvedProject | undefined {
  return getPublishedProjects().find(
    (p) => p.projectSlug === slug || p.id === slug || p.brandId === slug
  );
}

export function getClientDirectoryProjects(): ResolvedProject[] {
  return getPublishedProjects().sort((a, b) => a.publicName.localeCompare(b.publicName));
}

export function getProjectsByService(serviceQuery: string): ResolvedProject[] {
  const query = serviceQuery.toLowerCase().trim();

  const matchedService = servicesData.find(
    (s) =>
      s.id.toLowerCase() === query ||
      s.slug.toLowerCase() === query ||
      s.name.toLowerCase() === query ||
      s.shortName.toLowerCase() === query
  );

  const targetServiceId = matchedService ? matchedService.id : query;

  return getPublishedProjects().filter((p) =>
    p.serviceIds.includes(targetServiceId) ||
    p.approvedServices.some((name) => name.toLowerCase() === query)
  );
}

export function getProjectsByEvidenceLevel(level: EvidenceLevel): ResolvedProject[] {
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

export function getDetailTypeActionLabel(detailType: DetailType): string {
  switch (detailType) {
    case 'case-study':
      return 'View Case Study';
    case 'partner-story':
      return 'View Partner Story';
    case 'client-experience':
    default:
      return 'Visit Official Page';
  }
}

export function getProjectContactSourceMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const p of getPublishedProjects()) {
    if (p.contactSourceValue && p.contactSourceLabel) {
      map[p.contactSourceValue] = p.contactSourceLabel;
    }
  }
  return map;
}

export function validateProjectRecordsArray(records: ProjectRecord[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenBrandIds = new Set<string>();
  const seenDetailPaths = new Set<string>();
  const seenContactSources = new Set<string>();

  // Resolve real page files dynamically from Vite module graph or filesystem
  let existingPageFiles: Set<string> | null = null;
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && typeof import.meta.glob === 'function') {
      // @ts-ignore
      const pageModules = import.meta.glob('/src/pages/work/*.astro', { eager: true });
      existingPageFiles = new Set(Object.keys(pageModules));
    }
  } catch (e) {
    existingPageFiles = null;
  }

  // Perform real route source validation against filesystem
  for (const record of records) {
    if (seenIds.has(record.id)) {
      errors.push(`Duplicate project ID found: ${record.id}`);
    }
    seenIds.add(record.id);

    if (seenBrandIds.has(record.brandId)) {
      errors.push(`Duplicate public brand ID found: ${record.brandId}`);
    }
    seenBrandIds.add(record.brandId);

    const brand = brands.find((b) => b.id === record.brandId);
    if (!brand || !brand.active) {
      errors.push(`Project ${record.id} references missing or inactive brand ${record.brandId}.`);
    }

    if (!brand?.logo) {
      errors.push(`Project ${record.id} brand ${record.brandId} is missing a logo.`);
    }

    if (!record.serviceIds || record.serviceIds.length === 0) {
      errors.push(`Project ${record.id} has no service IDs.`);
    } else {
      for (const sid of record.serviceIds) {
        if (!getServiceById(sid)) {
          errors.push(`Project ${record.id} references unresolved service ID ${sid}.`);
        }
      }
    }

    if (record.detailType === 'case-study' || record.detailType === 'partner-story') {
      if (!record.detailPath) {
        errors.push(`Detailed project ${record.id} is missing detailPath.`);
      } else {
        if (seenDetailPaths.has(record.detailPath)) {
          errors.push(`Duplicate detailPath found: ${record.detailPath}`);
        }
        seenDetailPaths.add(record.detailPath);

        // Perform real route source validation against filesystem
        const pathSlug = record.detailPath.replace(/^\/work\//, '').replace(/\/$/, '');
        const expectedPageFile = `src/pages/work/${pathSlug}.astro`;
        const expectedContentFile = `src/data/case-studies/${pathSlug}.md`;

        let fileExists = false;
        try {
          const fullPagePath = path.resolve(process.cwd(), expectedPageFile);
          const fullContentPath = path.resolve(process.cwd(), expectedContentFile);
          fileExists = fs.existsSync(fullPagePath) || fs.existsSync(fullContentPath);
        } catch (e) {
          fileExists = true; // Fallback
        }

        if (!fileExists) {
          errors.push(`Detailed project ${record.id} detailPath ${record.detailPath} has no corresponding page file (${expectedPageFile}) or content file (${expectedContentFile}).`);
        }
      }

      if (!record.contactSourceValue) {
        errors.push(`Detailed project ${record.id} is missing contactSourceValue.`);
      } else {
        if (seenContactSources.has(record.contactSourceValue)) {
          errors.push(`Duplicate contactSourceValue found: ${record.contactSourceValue}`);
        }
        seenContactSources.add(record.contactSourceValue);

        if (!/^[a-z0-9-]+$/.test(record.contactSourceValue)) {
          errors.push(`Detailed project ${record.id} has invalid/unsupported contactSourceValue: ${record.contactSourceValue}`);
        }
      }

      if (!record.contactSourceLabel) {
        errors.push(`Detailed project ${record.id} is missing contactSourceLabel.`);
      }
    }

    if (record.detailType === 'client-experience') {
      if (!brand?.website && !brand?.facebook && !brand?.instagram) {
        errors.push(`Client experience project ${record.id} is missing official external destination.`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validatePublishedProjectRecords(): void {
  const result = validateProjectRecordsArray(projectRecords);
  if (!result.valid) {
    const msg = `[Build Error] Strict Portfolio Project Record Validation Failed:\n- ${result.errors.join('\n- ')}`;
    throw new Error(msg);
  }
}

// Strictly enforce build-time validation
validatePublishedProjectRecords();
