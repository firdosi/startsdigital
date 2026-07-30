export interface ProjectClaimRecord {
  clientId: string;
  publicWording: string;
  internalClaimType: 'lead-generation' | 'brand-identity' | 'web-development' | 'performance-marketing' | 'ai-workflow' | 'local-search';
  reportedValue?: string;
  currency?: string;
  timePeriod?: string;
  evidenceStatus: 'available' | 'user-provided-pending-evidence' | 'no-results-yet';
  evidenceReference?: string;
  publicVisibility: 'public' | 'unlisted';
  futureAccessStatus: 'public' | 'locked';
}

export const projectClaims: ProjectClaimRecord[] = [
  {
    clientId: 'clearzone-immigration',
    publicWording: 'Qualified lead generation campaign structure across search and social platforms.',
    internalClaimType: 'lead-generation',
    reportedValue: '340+',
    currency: 'PKR',
    timePeriod: 'Q1-Q2 2026',
    evidenceStatus: 'available',
    evidenceReference: 'evidence-intake/clearzone-immigration/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'public'
  },
  {
    clientId: 'convortai',
    publicWording: 'Co-development of conversational AI marketing workflows and automated lead qualification.',
    internalClaimType: 'ai-workflow',
    reportedValue: 'Automated 24/7 Response',
    timePeriod: '2026',
    evidenceStatus: 'available',
    evidenceReference: 'evidence-intake/convortai/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'public'
  },
  {
    clientId: 'black-gold-fertilizer',
    publicWording: 'Performance marketing store optimization and digital catalog presentation.',
    internalClaimType: 'performance-marketing',
    reportedValue: 'Digital Catalog Active',
    timePeriod: '2026',
    evidenceStatus: 'available',
    evidenceReference: 'evidence-intake/black-gold-fertilizer/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'public'
  },
  {
    clientId: 'rk-reno-solutions',
    publicWording: 'Local search optimization and Google Business Profile management for residential renovation.',
    internalClaimType: 'local-search',
    reportedValue: 'Top Local Search Pack',
    timePeriod: '2026',
    evidenceStatus: 'available',
    evidenceReference: 'evidence-intake/rk-reno-solutions/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'public'
  },
  {
    clientId: 'rapidline-immigration-services',
    publicWording: 'Client Experience: Immigration consulting digital marketing & local search optimization.',
    internalClaimType: 'lead-generation',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/rapidline-immigration-services/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'locked'
  },
  {
    clientId: 'rapidzone',
    publicWording: 'Client Experience: IT infrastructure & digital platform presence.',
    internalClaimType: 'web-development',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/rapidzone/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'locked'
  },
  {
    clientId: 'riyadh-finish-pro',
    publicWording: 'Client Experience: Finishing & interior contractor social marketing in Saudi Arabia.',
    internalClaimType: 'local-search',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/riyadh-finish-pro/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'locked'
  },
  {
    clientId: 'viral-naturals',
    publicWording: 'Client Experience: Organic skincare brand identity & social media launch.',
    internalClaimType: 'brand-identity',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/viral-naturals/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'public'
  },
  {
    clientId: 'shopinq-online',
    publicWording: 'Client Experience: Multi-vendor retail e-commerce platform workflows.',
    internalClaimType: 'web-development',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/shopinq-online/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'locked'
  },
  {
    clientId: 'super-safety-covers',
    publicWording: 'Client Experience: Industrial safety equipment B2B advertising.',
    internalClaimType: 'performance-marketing',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/super-safety-covers/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'public'
  },
  {
    clientId: 'unique-lahore-lab-sahiwal',
    publicWording: 'Client Experience: Regional diagnostic laboratory digital outreach in Sahiwal.',
    internalClaimType: 'local-search',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/unique-lahore-lab-sahiwal/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'locked'
  },
  {
    clientId: 'qurbani-campaign',
    publicWording: 'Client Experience: Seasonal sacrificial livestock digital campaign.',
    internalClaimType: 'performance-marketing',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/qurbani-campaign/MANIFEST.md',
    publicVisibility: 'public',
    futureAccessStatus: 'public'
  }
];
