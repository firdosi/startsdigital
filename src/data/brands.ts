export interface Brand {
  id: string;
  name: string;
  category: 'ecommerce' | 'construction' | 'immigration' | 'technology' | 'healthcare';
  logo?: string;
  website?: string;
  projectUrl?: string;
  relationshipLabel?: string;
  assetSource?: string;
  permissionNote?: string;
  featured: boolean;
  publicApproved: boolean; // Visual display permission (must be false until explicit user confirmation)
  logoApproved: boolean;   // Logo rendering permission (must be false until explicit user confirmation)
  active: boolean;
  order: number;
}

// All brand entries set to publicApproved: false and logoApproved: false pending explicit user confirmation per asset-intake.md
export const brands: Brand[] = [
  {
    id: 'black-gold-fertilizer',
    name: 'Black Gold Fertilizer',
    category: 'ecommerce',
    logo: '/brands/black-gold-fertilizer/logo.png',
    featured: true,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 1,
  },
  {
    id: 'wajib-livestock',
    name: 'Wajib Livestock',
    category: 'ecommerce',
    logo: '/brands/wajib-livestock/logo.png',
    featured: true,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 2,
  },
  {
    id: 'rk-reno-solutions',
    name: 'RK Reno Solutions',
    category: 'construction',
    logo: '/brands/rk-reno-solutions/logo.png',
    featured: true,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 3,
  },
  {
    id: 'viral-naturals',
    name: 'Viral Naturals',
    category: 'ecommerce',
    logo: '/brands/viral-naturals/logo.png',
    featured: false,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 4,
  },
  {
    id: 'shopinq-online',
    name: 'Shopinq Online',
    category: 'ecommerce',
    logo: '/brands/shopinq/logo.png',
    featured: false,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 5,
  },
  {
    id: 'super-safety-covers',
    name: 'Super Safety Covers',
    category: 'ecommerce',
    logo: '/brands/super-safety-covers/logo.png',
    featured: false,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 6,
  },
  {
    id: 'riyadh-finish-pro',
    name: 'Riyadh Finish Pro',
    category: 'construction',
    logo: '/brands/riyadh-finish-pro/logo.png',
    featured: false,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 7,
  },
  {
    id: 'convort-ai',
    name: 'Convort AI',
    category: 'technology',
    logo: '/brands/convort-ai/logo.png',
    featured: false,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 8,
  },
  {
    id: 'clearzone-immigration',
    name: 'Clearzone Immigration',
    category: 'immigration',
    logo: '/brands/clearzone/logo.png',
    featured: false,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 9,
  },
  {
    id: 'europa-immigration',
    name: 'Europa Immigration',
    category: 'immigration',
    logo: '/brands/europa-immigration/logo.png',
    featured: false,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 10,
  },
  {
    id: 'quick-immigration-service',
    name: 'Quick Immigration Service',
    category: 'immigration',
    logo: '/brands/quick-immigration/logo.png',
    featured: false,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 11,
  },
  {
    id: 'unique-lahore-lab',
    name: 'Unique Lahore Lab Sahiwal',
    category: 'healthcare',
    logo: '/brands/unique-lahore-lab/logo.png',
    featured: false,
    publicApproved: false,
    logoApproved: false,
    active: true,
    order: 12,
  },
];
