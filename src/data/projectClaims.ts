export interface ProjectClaimRecord {
  clientId: string;
  publicClientName: string;
  detailType: 'case-study' | 'partner-story' | 'client-experience';
  publicClaim: string;
  claimType: 'lead-generation' | 'brand-identity' | 'web-development' | 'performance-marketing' | 'ai-workflow' | 'local-search';
  reportedValue?: string;
  currency?: string;
  timePeriod?: string;
  evidenceStatus: 'available' | 'user-provided-pending-evidence' | 'no-results-yet';
  evidenceReference: string;
  publicVisibility: 'public' | 'unlisted';
  futureAccess: 'public' | 'locked';
}

export const projectClaims: ProjectClaimRecord[] = [
  {
    clientId: 'black-gold-fertilizer',
    publicClientName: 'Black Gold Fertilizer',
    detailType: 'case-study',
    publicClaim: 'Managed digital marketing, Meta advertising, creative production, website optimisation, analytics, customer retention and e-commerce sales support.',
    claimType: 'performance-marketing',
    reportedValue: 'PKR 30M+',
    currency: 'PKR',
    timePeriod: '24 months',
    evidenceStatus: 'available',
    evidenceReference: 'evidence-intake/black-gold-fertilizer/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'locked'
  },
  {
    clientId: 'wajib-livestock',
    publicClientName: 'Wajib Livestock',
    detailType: 'case-study',
    publicClaim: 'Seasonal Qurbani campaign marketing, paid social advertising, lead generation, creative production, WhatsApp routing and sales support.',
    claimType: 'performance-marketing',
    reportedValue: 'PKR 4.2M+',
    currency: 'PKR',
    timePeriod: 'Seasonal Qurbani Campaign',
    evidenceStatus: 'available',
    evidenceReference: 'evidence-intake/qurbani-campaign/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'locked'
  },
  {
    clientId: 'rk-reno-solutions',
    publicClientName: 'RK Reno Solutions',
    detailType: 'case-study',
    publicClaim: 'Website design, location-focused content, service-page development and local SEO foundation for renovation and air-conditioning services in Kuala Lumpur and Selangor.',
    claimType: 'local-search',
    reportedValue: 'Local Search Pack Active',
    timePeriod: 'Ongoing',
    evidenceStatus: 'available',
    evidenceReference: 'evidence-intake/rk-reno-solutions/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'public'
  },
  {
    clientId: 'convortai',
    publicClientName: 'ConvortAI',
    detailType: 'partner-story',
    publicClaim: 'Co-development of ConvortAI web application, automated conversational AI marketing workflows, product management, and growth support.',
    claimType: 'ai-workflow',
    reportedValue: 'Co-Development Partner',
    timePeriod: 'Ongoing',
    evidenceStatus: 'available',
    evidenceReference: 'evidence-intake/convortai/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'public'
  },
  {
    clientId: 'rapidline-immigration-services',
    publicClientName: 'Rapidline Immigration Services',
    detailType: 'client-experience',
    publicClaim: 'Creative design, video editing, ad scriptwriting, and campaign creative production for Dubai immigration services.',
    claimType: 'performance-marketing',
    reportedValue: 'AED 0.10 / lead (Reported)',
    currency: 'AED',
    timePeriod: 'Campaign Duration',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/rapidline-immigration-services/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'locked'
  },
  {
    clientId: 'rapidzone',
    publicClientName: 'Rapidzone',
    detailType: 'client-experience',
    publicClaim: 'Advertising video production and creative design for business setup and immigration campaigns targeting regional audiences.',
    claimType: 'performance-marketing',
    reportedValue: 'AED 0.10 / lead (Reported)',
    currency: 'AED',
    timePeriod: 'Campaign Duration',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/rapidzone/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'locked'
  },
  {
    clientId: 'clearzone-immigration',
    publicClientName: 'Clearzone Immigration',
    detailType: 'client-experience',
    publicClaim: 'Private AI character-generation workflow (27+ characters), video ad creatives, and TikTok/Meta campaign management through rebrand.',
    claimType: 'lead-generation',
    reportedValue: 'AED 1.4M+ (Reported)',
    currency: 'AED',
    timePeriod: 'Campaign Duration',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/clearzone-immigration/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'locked'
  },
  {
    clientId: 'viral-naturals',
    publicClientName: 'Viral Naturals',
    detailType: 'client-experience',
    publicClaim: 'Complete business setup from scratch, brand and product presentation, storefront development, creative production, and digital marketing.',
    claimType: 'brand-identity',
    reportedValue: '10+ daily sales (Reported)',
    currency: 'PKR',
    timePeriod: 'Month 1 Launch',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/viral-naturals/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'public'
  },
  {
    clientId: 'shopinq-online',
    publicClientName: 'Shopinq Online',
    detailType: 'client-experience',
    publicClaim: 'Promoted startup products on a 20% sales commission model, running paid social campaigns, creative production, and customer order support.',
    claimType: 'web-development',
    reportedValue: 'PKR 3.7M (Reported)',
    currency: 'PKR',
    timePeriod: '6 Months',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/shopinq-online/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'public'
  },
  {
    clientId: 'super-safety-covers',
    publicClientName: 'Super Safety Covers',
    detailType: 'client-experience',
    publicClaim: 'Business setup from scratch, Facebook page setup, advertising creative, product positioning, and initial digital-marketing structure.',
    claimType: 'performance-marketing',
    reportedValue: 'PKR 2.2M+ (Reported)',
    currency: 'PKR',
    timePeriod: 'First 3 Months',
    evidenceStatus: 'user-provided-pending-evidence',
    evidenceReference: 'evidence-intake/super-safety-covers/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'public'
  },
  {
    clientId: 'riyadh-finish-pro',
    publicClientName: 'Riyadh Finish Pro',
    detailType: 'client-experience',
    publicClaim: 'Website development, Facebook page setup, before-and-after graphic presentation, and Google Business Profile / Maps setup.',
    claimType: 'local-search',
    reportedValue: 'New client project',
    evidenceStatus: 'no-results-yet',
    evidenceReference: 'evidence-intake/riyadh-finish-pro/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'public'
  },
  {
    clientId: 'unique-lahore-lab-sahiwal',
    publicClientName: 'Unique Lahore Lab Sahiwal',
    detailType: 'client-experience',
    publicClaim: 'Creative and visual support producing AI-assisted ad creatives and graphics from original diagnostic laboratory photography.',
    claimType: 'local-search',
    reportedValue: 'Creative-support project',
    evidenceStatus: 'no-results-yet',
    evidenceReference: 'evidence-intake/unique-lahore-lab-sahiwal/MANIFEST.md',
    publicVisibility: 'public',
    futureAccess: 'public'
  }
];
