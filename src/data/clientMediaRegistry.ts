export interface ClientMediaEntry {
  id: string;
  client: string;
  localFile: string;
  sourceUrl: string;
  sourceType: 'official-website' | 'official-facebook' | 'client-provided-photo' | 'verified-campaign-screenshot' | 'app-screenshot';
  captureDate: string;
  publicUseStatus: 'approved-public';
}

export const clientMediaRegistry: ClientMediaEntry[] = [
  {
    id: 'black-gold-fertilizer-logo',
    client: 'Black Gold Fertilizer',
    localFile: '/brands/black-gold-fertilizer/logo.webp',
    sourceUrl: 'https://blackgoldfertilizer.com',
    sourceType: 'official-website',
    captureDate: '2025-06-15',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'wajib-livestock-logo',
    client: 'Wajib Livestock',
    localFile: '/brands/wajib-livestock/logo.webp',
    sourceUrl: 'https://wajib.pk',
    sourceType: 'official-website',
    captureDate: '2025-05-20',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'rk-reno-solutions-logo',
    client: 'RK Reno Solutions',
    localFile: '/brands/rk-reno-solutions/logo.webp',
    sourceUrl: 'https://rkrenosolution.com',
    sourceType: 'official-website',
    captureDate: '2025-07-10',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'convort-ai-logo',
    client: 'ConvortAI',
    localFile: '/brands/convort-ai/logo.webp',
    sourceUrl: 'https://convortai.com/',
    sourceType: 'app-screenshot',
    captureDate: '2025-08-01',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'rapidline-immigration-logo',
    client: 'Rapidline Immigration Services',
    localFile: '/brands/rapidline-immigration-services/logo.webp',
    sourceUrl: 'https://rapidlineimmigration.com/',
    sourceType: 'official-website',
    captureDate: '2025-09-12',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'rapidzone-logo',
    client: 'Rapidzone',
    localFile: '/brands/rapidzone/logo.webp',
    sourceUrl: 'https://rapidzone.ae/',
    sourceType: 'official-website',
    captureDate: '2025-09-15',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'clearzone-immigration-logo',
    client: 'Clearzone Immigration',
    localFile: '/brands/clearzone-immigration/logo.webp',
    sourceUrl: 'https://clearzoneimmigration.com/',
    sourceType: 'official-website',
    captureDate: '2025-10-04',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'riyadh-finish-pro-logo',
    client: 'Riyadh Finish Pro',
    localFile: '/brands/riyadh-finish-pro/logo.webp',
    sourceUrl: 'https://riyadhfinishpro.com/',
    sourceType: 'official-website',
    captureDate: '2025-11-20',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'viral-naturals-logo',
    client: 'Viral Naturals',
    localFile: '/brands/viral-naturals/logo.webp',
    sourceUrl: 'https://viralnaturals.com/',
    sourceType: 'official-website',
    captureDate: '2025-04-18',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'shopinq-online-logo',
    client: 'Shopinq Online',
    localFile: '/brands/shopinq-online/logo.webp',
    sourceUrl: 'https://www.facebook.com/shopinq.online/',
    sourceType: 'official-facebook',
    captureDate: '2025-03-10',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'super-safety-covers-logo',
    client: 'Super Safety Covers',
    localFile: '/brands/super-safety-covers/logo.webp',
    sourceUrl: 'https://www.facebook.com/SuperSafetyCovers/',
    sourceType: 'official-facebook',
    captureDate: '2025-02-14',
    publicUseStatus: 'approved-public'
  },
  {
    id: 'unique-lahore-lab-sahiwal-logo',
    client: 'Unique Lahore Lab Sahiwal',
    localFile: '/brands/unique-lahore-lab-sahiwal/logo.webp',
    sourceUrl: 'https://www.ullabswl.com/',
    sourceType: 'official-website',
    captureDate: '2025-12-01',
    publicUseStatus: 'approved-public'
  }
];
