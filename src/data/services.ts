export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceDefinition {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  summary: string;
  overview: string;
  idealFor: string[];
  problemsAddressed: string[];
  deliverables: ServiceDeliverable[];
  process: ServiceProcessStep[];
  clientInputs: string[];
  relatedProjectIds: string[];
  faq: ServiceFaqItem[];
  relatedServiceIds: string[];
  contactServiceValue: string;
  iconKey: string;
  accent: string;
  published: boolean;
}

export const servicesData: ServiceDefinition[] = [
  {
    id: 'paid-advertising',
    slug: 'paid-advertising',
    name: 'Paid Advertising',
    shortName: 'Paid Ads',
    eyebrow: 'PAID ADVERTISING',
    summary: 'Paid campaigns organised around the business goal, offer and available assets.',
    overview: 'Starts Digital supports paid advertising projects through campaign planning, account structure, audience work, creative coordination, landing-page alignment, tracking review and ongoing campaign management.',
    idealFor: [
      'Launching a new product, service or seasonal campaign',
      'Improving the structure and efficiency of existing advertising campaigns',
      'Coordinating campaign messages, creative formats and landing pages',
      'Testing audiences, offers or creative angles systematically',
      'Supporting e-commerce sales or structured lead generation',
      'Establishing a clear reporting and performance review routine'
    ],
    problemsAddressed: [
      'Unclear campaign structure or audience targeting',
      'Disconnect between advertising copy and landing page destination',
      'Lack of systematic creative testing across formats',
      'Inconsistent campaign tracking and reporting context'
    ],
    deliverables: [
      {
        title: 'Campaign Planning',
        description: 'Business goals, target offer, market positioning, available creative assets and campaign requirements are systematically reviewed.'
      },
      {
        title: 'Account and Campaign Structure',
        description: 'Campaigns, audiences, objectives and budgets are organized according to the agreed project scope.'
      },
      {
        title: 'Creative Coordination',
        description: 'Advertising concepts, formats, messages and testing requirements are coordinated with available creative resources.'
      },
      {
        title: 'Landing-Page Alignment',
        description: 'Campaign messaging and destination user experiences are reviewed for consistency and friction points.'
      },
      {
        title: 'Tracking Review',
        description: 'Available website events, platform signals and reporting requirements are reviewed for operational clarity.'
      },
      {
        title: 'Campaign Management',
        description: 'Performance signals are monitored and adjustments are made according to agreed campaign objectives and available data.'
      },
      {
        title: 'Reporting and Next Actions',
        description: 'Relevant results, observations and proposed next steps are communicated through agreed project channels.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Business & Offer Review',
        description: 'Reviewing the commercial objective, offer detail, historical metrics and target audience profiles.'
      },
      {
        step: '02',
        title: 'Campaign & Asset Planning',
        description: 'Structuring campaign setup, ad formats, messaging angles and destination landing experience requirements.'
      },
      {
        step: '03',
        title: 'Campaign Preparation',
        description: 'Configuring campaigns, audience parameters, creative assets and tracking requirements before launch.'
      },
      {
        step: '04',
        title: 'Launch & Monitoring',
        description: 'Activating campaigns, observing early performance signals and adjusting budget allocation where appropriate.'
      },
      {
        step: '05',
        title: 'Review & Next Actions',
        description: 'Evaluating campaign outcomes against agreed objectives and planning iterative creative or audience adjustments.'
      }
    ],
    clientInputs: [
      'Business or product information',
      'Target market & audience context',
      'Offer details & pricing structure',
      'Current website or destination URL',
      'Access to relevant advertising accounts',
      'Existing creative assets (images, logos, video)',
      'Indicative advertising budget',
      'Previous campaign performance context when available',
      'Required reporting or business goal'
    ],
    relatedProjectIds: ['black-gold-fertilizer', 'wajib-livestock'],
    faq: [
      {
        question: 'Which advertising platforms can Starts Digital support?',
        answer: 'Meta Ads (Facebook & Instagram) and Google Ads may be supported when relevant to the project scope and available account setup.'
      },
      {
        question: 'Can you work with an existing advertising account?',
        answer: 'Yes, we can audit and build upon existing advertising account structures or set up new campaign structures where required.'
      },
      {
        question: 'Do I need creative assets before starting?',
        answer: 'If you have existing brand assets, video edits or images, we can utilize them. Creative production can also be coordinated as part of the overall scope.'
      },
      {
        question: 'Can advertising be coordinated with a website or landing page?',
        answer: 'Yes, aligning campaign messaging with destination page content is a core part of our campaign preparation process.'
      },
      {
        question: 'How is the advertising budget decided?',
        answer: 'Advertising budgets are determined by your commercial goals, target market size, product margins and comfortable testing parameters.'
      },
      {
        question: 'Are results guaranteed?',
        answer: 'No digital agency can guarantee ad performance or sales. We focus on clear campaign structure, message alignment, systematic testing and disciplined data review.'
      },
      {
        question: 'What information is needed before campaign planning begins?',
        answer: 'We review your target offer, business goals, target audience, destination website, available creative materials and advertising budget.'
      }
    ],
    relatedServiceIds: ['creative-content', 'website-design-development', 'social-media-marketing'],
    contactServiceValue: 'Paid Advertising',
    iconKey: 'Megaphone',
    accent: '#ff762b',
    published: true
  },
  {
    id: 'website-design-development',
    slug: 'website-design-development',
    name: 'Website Design & Development',
    shortName: 'Websites',
    eyebrow: 'WEBSITE DESIGN & DEVELOPMENT',
    summary: 'Websites structured around the business, content and required user journey.',
    overview: 'Starts Digital plans and builds websites by organising the project structure, page requirements, user experience, content, responsive interface and required technical functionality around one agreed scope.',
    idealFor: [
      'Launching a new business, product or brand website',
      'Replacing an outdated or difficult-to-manage web platform',
      'Structuring service pages and lead capture points',
      'Building e-commerce catalog and checkout experiences',
      'Improving mobile usability and speed responsiveness',
      'Connecting inquiry forms, messaging or analytics tools',
      'Supporting a specific marketing campaign with a dedicated landing page'
    ],
    problemsAddressed: [
      'Confusing website navigation and poor content hierarchy',
      'Broken or unresponsive mobile interfaces',
      'Lack of clear contact paths or inquiry form integration',
      'Difficult-to-update site structure or slow load performance'
    ],
    deliverables: [
      {
        title: 'Discovery and Requirements',
        description: 'Business goals, user needs, content inventory, pages and technical requirements are thoroughly reviewed.'
      },
      {
        title: 'Information Architecture',
        description: 'Page structure, navigation paths and content hierarchy are organized into a clear sitemap.'
      },
      {
        title: 'UI/UX Design',
        description: 'Responsive layouts, component patterns and interface typography are created around the approved site structure.'
      },
      {
        title: 'Development',
        description: 'Approved pages and functional requirements are built using the technology platform selected for the project.'
      },
      {
        title: 'Content Integration',
        description: 'Approved text, imagery, product catalogs and business metadata are structured within the site.'
      },
      {
        title: 'Forms and Contact Journeys',
        description: 'Required inquiry forms, WhatsApp links or booking paths are implemented according to agreed scope.'
      },
      {
        title: 'E-commerce Requirements',
        description: 'Products, categories, cart and checkout workflows are configured when included in the project scope.'
      },
      {
        title: 'Testing and Launch Preparation',
        description: 'Responsive layouts, broken links, form submits, core page behavior and domain launch requirements are verified.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Requirements & Content Review',
        description: 'Defining site objectives, target audience, required pages and available brand/content assets.'
      },
      {
        step: '02',
        title: 'Sitemap & Page Planning',
        description: 'Structuring site navigation, page hierarchy and key user action journeys.'
      },
      {
        step: '03',
        title: 'Interface Direction',
        description: 'Designing responsive page layouts, typography and interactive components.'
      },
      {
        step: '04',
        title: 'Development & Integration',
        description: 'Building site code, configuring pages and integrating approved text and media assets.'
      },
      {
        step: '05',
        title: 'Testing & Client Review',
        description: 'Checking cross-device responsiveness, form submissions, link targets and page load performance.'
      },
      {
        step: '06',
        title: 'Launch & Handover',
        description: 'Connecting domain settings, verifying production deployment and providing platform handover documentation.'
      }
    ],
    clientInputs: [
      'Business or product information',
      'Required page list & site goals',
      'Current website URL (if redesigning)',
      'Brand logo, colors & style guidelines',
      'Approved text copy & high-res images',
      'Required forms & contact channels',
      'Product data (for e-commerce builds)',
      'Required third-party tool integrations',
      'Preferred CMS/framework (if already decided)',
      'Domain & hosting context',
      'Target launch priority'
    ],
    relatedProjectIds: ['rk-reno-solutions', 'convortai'],
    faq: [
      {
        question: 'Which website platforms can Starts Digital work with?',
        answer: 'We work with modern web stacks such as Astro, custom HTML/JS, WordPress, WooCommerce, and Shopify depending on your project scope and operational needs.'
      },
      {
        question: 'Can you redesign an existing website?',
        answer: 'Yes, we can restructure existing site content, modernize the user interface, and re-implement the site on a faster, more reliable platform.'
      },
      {
        question: 'Can you build an e-commerce website?',
        answer: 'Yes, we design and build e-commerce platforms with product catalogs, shopping carts, checkout workflows and payment gateway integrations.'
      },
      {
        question: 'Do you provide website content?',
        answer: 'We structure and organize page content. Content copywriting or asset creation can be added to the project scope when required.'
      },
      {
        question: 'Will the website work on mobile devices?',
        answer: 'All our websites are built responsive-first and tested across mobile (390px), tablet (768px) and desktop (1440px) viewports.'
      },
      {
        question: 'Are domain and hosting included?',
        answer: 'Domain registration and hosting fees are paid directly to infrastructure providers. We assist with hosting setup and domain connection during launch.'
      },
      {
        question: 'Can you connect WhatsApp and inquiry forms?',
        answer: 'Yes, direct WhatsApp click-to-chat buttons, lead generation forms, and email notifications are standard contact integrations.'
      },
      {
        question: 'Does every website project include ongoing maintenance?',
        answer: 'Post-launch updates, security patches or ongoing site management can be arranged under an ongoing support agreement.'
      }
    ],
    relatedServiceIds: ['seo-local-search', 'paid-advertising', 'ai-marketing-workflows'],
    contactServiceValue: 'Website Design and Development',
    iconKey: 'Layout',
    accent: '#ddff35',
    published: true
  },
  {
    id: 'seo-local-search',
    slug: 'seo-local-search',
    name: 'SEO & Local Search',
    shortName: 'SEO',
    eyebrow: 'SEO & LOCAL SEARCH',
    summary: 'Search visibility and local Google profile foundations for business discovery.',
    overview: 'Starts Digital establishes organic search foundations through keyword research, technical site structure, page content optimization, and Google Business Profile configuration.',
    idealFor: [
      'Improving search visibility for local business services',
      'Structuring website pages around real customer search queries',
      'Optimizing Google Business Profile for map discovery',
      'Fixing basic technical crawl and indexability issues'
    ],
    problemsAddressed: [
      'Low visibility on local search and map results',
      'Unstructured page titles, headers, and meta descriptions',
      'Missing local business contact and service metadata'
    ],
    deliverables: [
      {
        title: 'Keyword & Search Intent Research',
        description: 'Identifying relevant search terms used by potential local and industry customers.'
      },
      {
        title: 'On-Page SEO Optimization',
        description: 'Optimizing page titles, meta descriptions, heading structures and internal linking.'
      },
      {
        title: 'Local Google Profile Setup',
        description: 'Configuring and verifying Google Business Profile details, categories and service areas.'
      },
      {
        title: 'Technical Structure Review',
        description: 'Checking sitemap submission, indexing status, mobile responsiveness and load speeds.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Search Audit',
        description: 'Analyzing current search visibility, site indexation and local listings.'
      },
      {
        step: '02',
        title: 'On-Page Optimization',
        description: 'Refining page metadata, headings and service page copy.'
      },
      {
        step: '03',
        title: 'Local Profile Tuning',
        description: 'Updating business information, service categories and operational hours.'
      }
    ],
    clientInputs: [
      'Business address & contact details',
      'Core service list & primary location',
      'Website access & Google Business access'
    ],
    relatedProjectIds: ['rk-reno-solutions'],
    faq: [
      {
        question: 'How long does SEO take to show results?',
        answer: 'Search engine indexation and ranking adjustments typically take several weeks to months depending on local competition and domain history.'
      }
    ],
    relatedServiceIds: ['website-design-development', 'paid-advertising'],
    contactServiceValue: 'SEO and Local Search',
    iconKey: 'Search',
    accent: '#39c98a',
    published: false
  },
  {
    id: 'creative-content',
    slug: 'creative-content',
    name: 'Creative Content',
    shortName: 'Creative',
    eyebrow: 'CREATIVE CONTENT',
    summary: 'Video editing and graphic asset production for campaigns and social channels.',
    overview: 'Starts Digital produces engaging video edits, graphic visuals, ad formats and social media content tailored to your brand messaging.',
    idealFor: [
      'Creating short-form video edits for Meta and social campaigns',
      'Designing digital graphic banners, post visuals and ad variations',
      'Establishing visual brand consistency across marketing channels'
    ],
    problemsAddressed: [
      'Lack of video creative for digital ad campaigns',
      'Inconsistent visual branding across platforms',
      'Creative fatigue in ongoing advertising accounts'
    ],
    deliverables: [
      {
        title: 'Video Editing',
        description: 'Trimming, pacing, captioning and formatting short-form video assets.'
      },
      {
        title: 'Graphic Asset Design',
        description: 'Creating static ad graphics, social post templates and promotion banners.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Asset Review',
        description: 'Collecting raw footage, product photos and brand guidelines.'
      },
      {
        step: '02',
        title: 'Production & Editing',
        description: 'Editing videos, applying graphic overlays and preparing ad formats.'
      }
    ],
    clientInputs: [
      'Raw video footage or photo assets',
      'Brand logo and style preferences',
      'Campaign message or promotion details'
    ],
    relatedProjectIds: ['black-gold-fertilizer', 'wajib-livestock'],
    faq: [
      {
        question: 'What video formats do you produce?',
        answer: 'We produce vertical (9:16) Reels/TikTok formats, square (1:1) feed edits, and horizontal video formats.'
      }
    ],
    relatedServiceIds: ['paid-advertising', 'social-media-marketing'],
    contactServiceValue: 'Creative Content',
    iconKey: 'Video',
    accent: '#ff762b',
    published: false
  },
  {
    id: 'social-media-marketing',
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    shortName: 'Social Media',
    eyebrow: 'SOCIAL MEDIA MARKETING',
    summary: 'Content scheduling, channel management and social audience communication.',
    overview: 'Starts Digital coordinates regular social media posting, visual branding, and audience interaction across core social platforms.',
    idealFor: [
      'Maintaining consistent social media presence',
      'Publishing promotional campaign updates',
      'Building brand familiarity with local customers'
    ],
    problemsAddressed: [
      'Irregular posting schedules and inactive social profiles',
      'Uncoordinated messaging across marketing channels'
    ],
    deliverables: [
      {
        title: 'Content Scheduling',
        description: 'Organizing and publishing scheduled posts across Meta and social accounts.'
      },
      {
        title: 'Profile Optimization',
        description: 'Updating bios, profile graphics and contact links across channels.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Content Calendar',
        description: 'Planning post topics, visual assets and publishing dates.'
      }
    ],
    clientInputs: [
      'Social account access',
      'Monthly promotion priorities'
    ],
    relatedProjectIds: ['wajib-livestock', 'convortai'],
    faq: [
      {
        question: 'Which social channels do you manage?',
        answer: 'We focus on Facebook and Instagram management based on your target demographic.'
      }
    ],
    relatedServiceIds: ['creative-content', 'paid-advertising'],
    contactServiceValue: 'Social Media Marketing',
    iconKey: 'Share2',
    accent: '#39c98a',
    published: false
  },
  {
    id: 'ai-marketing-workflows',
    slug: 'ai-marketing-workflows',
    name: 'AI Marketing Workflows',
    shortName: 'AI Workflows',
    eyebrow: 'AI MARKETING WORKFLOWS',
    summary: 'Practical AI tools and automation integrations for operational efficiency.',
    overview: 'Starts Digital helps businesses integrate practical AI tools for content drafting, lead qualification scripts and workflow productivity.',
    idealFor: [
      'Streamlining content drafting and research workflows',
      'Integrating smart lead response prompts and tools',
      'Automating repetitive digital marketing tasks'
    ],
    problemsAddressed: [
      'Slow manual response times to initial customer leads',
      'Time-consuming content drafting and research routines'
    ],
    deliverables: [
      {
        title: 'Workflow Audit',
        description: 'Identifying practical opportunities for AI tool integration in daily operations.'
      },
      {
        title: 'Prompt & Script Templates',
        description: 'Building custom prompt templates for marketing content and customer communications.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Process Mapping',
        description: 'Reviewing current operational bottlenecks and content workflows.'
      }
    ],
    clientInputs: [
      'Current operational workflow details',
      'Frequent customer inquiry examples'
    ],
    relatedProjectIds: ['convortai'],
    faq: [
      {
        question: 'What are practical AI workflows?',
        answer: 'Practical AI workflows use customized prompts and tools to speed up content creation, inquiry responses and task management.'
      }
    ],
    relatedServiceIds: ['website-design-development', 'paid-advertising'],
    contactServiceValue: 'AI Marketing Workflows',
    iconKey: 'Cpu',
    accent: '#ddff35',
    published: false
  }
];
