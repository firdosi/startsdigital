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
    headline: 'Digital marketing, custom websites and AI workflows built for growth.',
    paragraph:
      'Starts Digital brings paid advertising, website design, SEO, creative production, social media and practical AI workflows into one coordinated system. We help businesses build clear commercial visibility, generate qualified leads and streamline acquisition.',
    primaryCta: {
      label: 'Discuss Your Project',
      href: '/contact/'
    },
    secondaryCta: {
      label: 'Explore Our Services',
      href: '/services/'
    },
    serviceLine: [
      'Paid Advertising',
      'Website Design & Development',
      'SEO & Local Search',
      'Creative Content',
      'Social Media Marketing',
      'AI Marketing Workflows'
    ]
  },
  services: {
    eyebrow: 'CORE CAPABILITIES',
    heading: 'Six core service lines designed to build online presence and customer acquisition.',
    paragraph: 'Choose individual service capabilities or combine multiple services into one coordinated project plan.',
    items: [
      {
        id: 'paid-advertising',
        number: '01',
        title: 'Paid Advertising',
        description:
          'Campaign planning, ad account structure, creative testing and performance optimization across active advertising platforms.',
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
          'Responsive business websites, landing pages and e-commerce experiences engineered for clarity and user conversion.',
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
          'Technical SEO foundations, service-page content and location-focused pages structured around relevant commercial searches.',
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
          'Campaign concepts, video ad edits, promotional graphics and visual content built for modern digital platforms.',
        deliverables: [
          'Ad creatives',
          'Campaign concepts',
          'Social content',
          'Video ad edits'
        ]
      },
      {
        id: 'social-media-marketing',
        number: '05',
        title: 'Social Media Marketing',
        description:
          'Content planning, publishing support and social media management aligned with consistent brand communication.',
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
          'Practical AI systems supporting lead routing, content assistance, customer responses and marketing task automation.',
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
    heading: 'Selected client work across e-commerce, seasonal campaigns, services and technology.',
    paragraph:
      'Explore how Starts Digital contributes across different business sectors and project requirements.'
  },
  engagementPath: {
    eyebrow: 'BUSINESS PROBLEMS WE HELP SOLVE',
    heading: 'Addressing key digital growth challenges with clear project execution.',
    paragraph:
      'We help companies solve acquisition bottlenecks, improve website performance, refine ad messaging and automate routine marketing tasks.',
    steps: [
      {
        number: '01',
        title: 'Low Customer Conversion',
        description:
          'Transform unclear websites and ad campaigns into structured journeys with clear messaging and friction-free inquiry routes.'
      },
      {
        number: '02',
        title: 'Fragmented Marketing Execution',
        description:
          'Unify paid ads, web development, SEO and creative production under one coordinated roadmap.'
      },
      {
        number: '03',
        title: 'Manual & Slow Lead Handling',
        description:
          'Deploy practical AI workflows and structured forms to route customer inquiries directly to sales teams.'
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
    heading: 'A transparent four-step process from discovery to ongoing review.',
    paragraph:
      'Every project follows an organized path covering discovery, planning, production and ongoing performance review.'
  },
  finalCta: {
    heading: 'Ready to discuss what your business needs next?',
    paragraph:
      'Share your goals, current challenges and required services. Starts Digital will review your brief and outline a practical execution plan.',
    primaryCta: {
      label: 'Discuss Your Project',
      href: '/contact/'
    },
    secondaryCta: {
      label: 'WhatsApp Direct',
      href: '/contact/'
    }
  }
};
