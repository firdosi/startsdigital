export interface ServiceOverviewItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ProofProject {
  id: string;
  brand: string;
  sector: string;
  workDescription: string;
  resultSummary: string;
  metrics: Array<{ label: string; value: string }>;
  link: string;
  imagePath?: string;
}

export interface HomepageContent {
  hero: {
    eyebrow: string;
    headline: string;
    paragraph: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    serviceLine: string[];
    proofHeaderLabel: string;
    proofCards: Array<{
      brand: string;
      context: string;
      metrics: Array<{ value: string; label: string }>;
      summary: string;
      href: string;
    }>;
  };
  projectProof: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    projects: ProofProject[];
  };
  services: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    items: ServiceOverviewItem[];
  };
  showcase: {
    eyebrow: string;
    heading: string;
    paragraph: string;
  };
  process: {
    eyebrow: string;
    heading: string;
    paragraph: string;
  };
  finalCta: {
    heading: string;
    paragraph: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
}

export const homepageContent: HomepageContent = {
  hero: {
    eyebrow: 'STRATEGY, EXECUTION & DIGITAL GROWTH',
    headline: 'Build a clearer digital growth system for your business.',
    paragraph:
      'Starts Digital brings paid advertising, websites, SEO, creative production and practical AI workflows into one coordinated plan shaped around your goals, market and available assets.',
    primaryCta: {
      label: 'Discuss Your Project',
      href: '/contact/'
    },
    secondaryCta: {
      label: 'Explore Our Work',
      href: '/work/'
    },
    serviceLine: [
      'Paid Advertising',
      'Websites & E-Commerce',
      'SEO & Local Search',
      'Creative Content',
      'Social Media',
      'AI Marketing Workflows'
    ],
    proofHeaderLabel: 'SELECTED CAMPAIGN OUTCOMES',
    proofCards: [
      {
        brand: 'Black Gold Fertilizer',
        context: 'E-commerce & Agricultural Growth',
        metrics: [
          { value: 'PKR 30M+', label: 'Supported Revenue' },
          { value: '29,000+', label: 'Product Sales' }
        ],
        summary: 'Supported PKR 30M+ in delivered-order revenue and 29,000+ product sales over 24 months.',
        href: '/work/black-gold-fertilizer/'
      },
      {
        brand: 'Wajib Livestock',
        context: 'Seasonal Qurbani Campaign',
        metrics: [
          { value: 'PKR 4.2M+', label: 'Supported Revenue' },
          { value: '150+', label: 'Animals Sold' }
        ],
        summary: 'Helped sell more than 150 animals and supported PKR 4.2M+ in sales during the Eid Qurbani campaign.',
        href: '/work/qurbani-campaign/'
      }
    ]
  },
  projectProof: {
    eyebrow: 'PROOF IN CONTEXT',
    heading: 'Results make more sense when the work behind them is visible.',
    paragraph:
      'Selected projects show how strategy, advertising, websites, creative production and ongoing execution were combined around real business requirements.',
    projects: [
      {
        id: 'black-gold-fertilizer',
        brand: 'Black Gold Fertilizer',
        sector: 'Agriculture & E-commerce',
        workDescription:
          'Strategy, Meta advertising, creative testing, e-commerce growth and website support.',
        resultSummary:
          'Supported PKR 30M+ in delivered-order revenue, 29,000+ product sales and 22,000+ delivered sales over 24 months.',
        metrics: [
          { label: 'Delivered Revenue', value: 'PKR 30M+' },
          { label: 'Product Sales', value: '29,000+' }
        ],
        link: '/work/black-gold-fertilizer/',
        imagePath: '/work/black-gold-fertilizer/hero.webp'
      },
      {
        id: 'wajib-livestock',
        brand: 'Wajib Livestock',
        sector: 'Livestock & Seasonal Campaigns',
        workDescription:
          'Campaign strategy, paid social, lead generation, creative production and sales support.',
        resultSummary:
          'Helped sell more than 150 animals and supported PKR 4.2M+ in sales during the Eid Qurbani campaign.',
        metrics: [
          { label: 'Campaign Sales', value: 'PKR 4.2M+' },
          { label: 'Animals Sold', value: '150+' }
        ],
        link: '/work/qurbani-campaign/'
      }
    ]
  },
  services: {
    eyebrow: 'CAPABILITIES',
    heading: 'The work required to move from attention to measurable action.',
    paragraph: 'Choose one focused service or combine several into a coordinated growth plan.',
    items: [
      {
        id: 'paid-advertising',
        number: '01',
        title: 'Paid Advertising',
        description:
          'Campaign planning, account structure, creative testing, audience development and ongoing optimisation across relevant paid channels.',
        deliverables: [
          'Campaign strategy',
          'Account setup',
          'Creative testing',
          'Performance review'
        ]
      },
      {
        id: 'website-design-development',
        number: '02',
        title: 'Website Design & Development',
        description:
          'Responsive business websites, landing pages and e-commerce experiences designed around clear customer journeys.',
        deliverables: [
          'Business websites',
          'Landing pages',
          'E-commerce',
          'Conversion structure'
        ]
      },
      {
        id: 'seo-local-search',
        number: '03',
        title: 'SEO & Local Search',
        description:
          'Technical foundations, service content and location-focused pages structured around relevant commercial searches.',
        deliverables: [
          'Technical SEO',
          'Service pages',
          'Local search',
          'Content structure'
        ]
      },
      {
        id: 'creative-content',
        number: '04',
        title: 'Creative Content',
        description:
          'Campaign concepts, advertising creatives, social content and AI-assisted production workflows developed for real platforms.',
        deliverables: [
          'Ad creatives',
          'Campaign concepts',
          'Social content',
          'AI video workflows'
        ]
      },
      {
        id: 'social-media-marketing',
        number: '05',
        title: 'Social Media Marketing',
        description:
          'Content planning, publishing support and campaign coordination built around consistent brand communication.',
        deliverables: [
          'Content planning',
          'Publishing support',
          'Campaign coordination',
          'Performance review'
        ]
      },
      {
        id: 'ai-marketing-workflows',
        number: '06',
        title: 'AI Marketing Workflows',
        description:
          'Practical systems that support lead routing, content production, customer responses and repetitive marketing tasks.',
        deliverables: [
          'Lead workflows',
          'Content assistance',
          'Response systems',
          'Process automation'
        ]
      }
    ]
  },
  showcase: {
    eyebrow: 'SELECTED WORK',
    heading: 'Different businesses require different combinations of strategy and execution.',
    paragraph:
      'Explore selected projects across e-commerce, seasonal campaigns, local services and technology.'
  },
  process: {
    eyebrow: 'WORKING METHOD',
    heading: 'A clear path from business requirement to active execution.',
    paragraph:
      'The exact scope varies by project, but the work is organised around discovery, planning, production, launch and ongoing review.'
  },
  finalCta: {
    heading: 'Ready to discuss what your business needs next?',
    paragraph:
      'Share your goals, current challenges and required services. Starts Digital will use that information to understand the project scope before the next discussion.',
    primaryCta: {
      label: 'Discuss Your Project',
      href: '/contact/'
    },
    secondaryCta: {
      label: 'WhatsApp',
      href: 'https://wa.me/923001234567'
    }
  }
};
