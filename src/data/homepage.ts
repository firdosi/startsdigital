export interface ServiceOverviewItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ProjectProofItem {
  id: string;
  brand: string;
  sector: string;
  relationship?: string;
  extendedRelationship?: string;
  contribution: string;
  link: string;
  imagePath?: string;
  logoPath?: string;
  tags: string[];
}

export interface EngagementStep {
  number: string;
  title: string;
  description: string;
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
    items: ProjectProofItem[];
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
  engagementPath: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    steps: EngagementStep[];
    checklistHeader: string;
    checklistItems: string[];
    primaryCta: { label: string; href: string };
    secondaryTextLink: string;
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
    items: [
      {
        id: 'rk-reno-solutions',
        brand: 'RK Reno Solutions',
        sector: 'Renovation & Local Services',
        contribution:
          'Website structure, service content and local SEO foundations for renovation and air-conditioning services in Kuala Lumpur and Selangor.',
        link: '/work/rk-reno-solutions/',
        imagePath: '/brands/rk-reno-solutions/screenshot.webp',
        tags: [
          'Website Structure',
          'Service Content',
          'Local SEO Foundation',
          'Location-Focused Pages'
        ]
      },
      {
        id: 'convort-ai',
        brand: 'ConvortAI',
        sector: 'Technology Product Development',
        relationship: 'Technology Partner',
        extendedRelationship: 'Product Development & Growth Partner',
        contribution:
          'Starts Digital developed the ConvortAI web application and continues supporting product development, project management, social media, creative production and growth.',
        link: '/work/convortai/',
        logoPath: '/brands/convort-ai/logo.webp',
        tags: [
          'Web Application Development',
          'Product Development',
          'Project Management',
          'Social Media',
          'Creative Production',
          'Growth Support'
        ]
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
  engagementPath: {
    eyebrow: 'STARTING A PROJECT',
    heading: 'A useful first conversation starts with the right context.',
    paragraph:
      'Share what the business is trying to achieve, what is currently in place and where support is needed. That information helps define a realistic scope before execution begins.',
    steps: [
      {
        number: '01',
        title: 'Share the Business Context',
        description:
          'Provide the business, market, current channels, main challenge and the result you are trying to achieve.'
      },
      {
        number: '02',
        title: 'Define the Required Scope',
        description:
          'Identify which services, assets, platforms and deliverables are relevant to the project.'
      },
      {
        number: '03',
        title: 'Agree the Next Working Step',
        description:
          'Confirm responsibilities, communication channels, priorities and the work that should begin first.'
      }
    ],
    checklistHeader: 'Useful information to include',
    checklistItems: [
      'Business or product',
      'Target market',
      'Current website or social links',
      'Required services',
      'Main challenge',
      'Available assets',
      'Indicative budget',
      'Preferred timeline'
    ],
    primaryCta: {
      label: 'Prepare Your Project Inquiry',
      href: '/contact/'
    },
    secondaryTextLink: 'Prefer WhatsApp?'
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
      href: '/contact/'
    }
  }
};
