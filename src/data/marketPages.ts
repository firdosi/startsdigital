import { site } from '../site.config';

export interface MarketPageFaq {
  question: string;
  answer: string;
}

export interface MarketPageDefinition {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  schemaType: 'industries-index' | 'industry' | 'location';
  breadcrumbLabel: string;
  featuredProjectId: string;
  featuredProofText: string;
  relevantServiceIds: string[];
  keyTopics: { title: string; description: string }[];
  workingMethod: { step: string; title: string; description: string }[];
  faqs: MarketPageFaq[];
}

export const marketPages: MarketPageDefinition[] = [
  {
    id: 'ecommerce-product-brands',
    slug: 'ecommerce-product-brands',
    title: 'Digital Marketing & Web Execution for E-Commerce & Product Brands',
    subtitle: 'Combining direct-response advertising, storefront development, creative testing, and tracking review to support online sales.',
    eyebrow: 'INDUSTRY EXPERIENCE',
    description: 'We help growing e-commerce and product businesses structure campaign acquisition assets, test promotional creative, and align digital storefront user experiences.',
    metaTitle: 'E-Commerce & Product Brand Marketing | Starts Digital',
    metaDescription: 'Direct-response advertising, storefront development, creative testing, and tracking systems for growing e-commerce product brands.',
    canonicalPath: '/industries/ecommerce-product-brands/',
    schemaType: 'industry',
    breadcrumbLabel: 'E-commerce & Product Brands',
    featuredProjectId: 'black-gold-fertilizer',
    featuredProofText: 'Supported PKR 30M+ in delivered-order revenue, 29,000+ product sales and 22,000+ delivered sales over 24 months for Black Gold Fertilizer.',
    relevantServiceIds: ['paid-advertising', 'website-design-development', 'creative-content', 'seo-local-search', 'social-media-marketing'],
    keyTopics: [
      { title: 'Product Positioning & Offer Structure', description: 'Structuring clear value propositions, product features, and promotional offer presentation for digital consumers.' },
      { title: 'Ad Creative Testing & Production', description: 'Developing and testing video ad edits, product graphics, and direct-response campaign assets across active ad channels.' },
      { title: 'Storefront & Mobile User Alignment', description: 'Designing fast, mobile-friendly landing pages and storefront structures focused on clear customer navigation.' },
      { title: 'Order Data & Tracking Review', description: 'Establishing conversion measurement and tracking reviews focused on verified business order reporting.' }
    ],
    workingMethod: [
      { step: '01', title: 'Product & Asset Review', description: 'Reviewing existing product assets, promotional offers, campaign history, and customer feedback.' },
      { step: '02', title: 'Campaign & Landing Setup', description: 'Preparing campaign ad graphics, video edits, ad copy, and mobile storefront landing pages.' },
      { step: '03', title: 'Measurement Verification', description: 'Setting up platform tags and order measurement protocols prior to campaign activation.' },
      { step: '04', title: 'Iterative Review & Optimization', description: 'Monitoring campaign metrics, ad creative performance, and customer response to guide ongoing adjustments.' }
    ],
    faqs: [
      {
        question: 'What web platforms do you build or support?',
        answer: 'We build custom web pages, e-commerce storefronts, and landing pages using modern frontend tools, static frameworks, and standard content systems depending on scope.'
      },
      {
        question: 'How is performance evaluated for e-commerce campaigns?',
        answer: 'We evaluate campaign performance by reviewing ad platform metrics alongside documented customer orders and delivered sales data provided during reviews.'
      },
      {
        question: 'Do you produce visual and video assets for ad campaigns?',
        answer: 'Yes. Our creative team produces direct-response graphics, promotional video edits, and formatted visual ad creative for social and ad platforms.'
      }
    ]
  },
  {
    id: 'seasonal-campaigns',
    slug: 'seasonal-campaigns',
    title: 'Digital Marketing & Execution for Seasonal Campaigns',
    subtitle: 'Structuring time-sensitive ad campaigns, pre-booking windows, and customer inquiry pathways for seasonal events.',
    eyebrow: 'CAMPAIGN EXPERIENCE',
    description: 'Seasonal campaigns require organized scheduling, clear promotional offer messaging, and structured customer inquiry routes within defined campaign windows.',
    metaTitle: 'Seasonal Digital Campaigns & Event Marketing | Starts Digital',
    metaDescription: 'High-impact digital marketing strategies, pre-booking windows, and creative execution for time-sensitive seasonal campaigns.',
    canonicalPath: '/industries/seasonal-campaigns/',
    schemaType: 'industry',
    breadcrumbLabel: 'Seasonal Campaigns',
    featuredProjectId: 'qurbani-campaign',
    featuredProofText: 'Helped sell more than 150 animals and supported PKR 4.2M+ in sales during the Eid Qurbani campaign for Wajib Livestock.',
    relevantServiceIds: ['paid-advertising', 'creative-content', 'social-media-marketing'],
    keyTopics: [
      { title: 'Campaign Schedule & Timing', description: 'Mapping promotional launch dates, booking windows, and campaign duration to align with event timing.' },
      { title: 'Promotional Creative Production', description: 'Producing targeted video ad edits, countdown graphics, and promotional messaging that communicate clear event urgency.' },
      { title: 'Customer Inquiry Routes', description: 'Setting up mobile-friendly inquiry buttons and web forms connecting interested buyers to sales channels.' },
      { title: 'Offer Clarity & Terms Display', description: 'Ensuring pricing, booking conditions, specifications, and delivery terms are presented clearly to inform customers.' }
    ],
    workingMethod: [
      { step: '01', title: 'Campaign Planning & Schedule', description: 'Defining campaign duration, promotional messaging, target channels, and inquiry handling routes.' },
      { step: '02', title: 'Creative & Landing Preparation', description: 'Editing promotional media, writing campaign copy, and building mobile inquiry pages.' },
      { step: '03', title: 'Multi-Channel Activation', description: 'Launching paid social campaigns, organic content posts, and direct customer inquiry pathways.' },
      { step: '04', title: 'Inquiry & Ad Monitoring', description: 'Reviewing incoming inquiry volume, ad performance, and budget pacing throughout the campaign window.' }
    ],
    faqs: [
      {
        question: 'When should planning begin for a seasonal digital campaign?',
        answer: 'We recommend starting creative preparation and technical setup 3 to 4 weeks before the promotional window opens to ensure thorough testing.'
      },
      {
        question: 'Can customer inquiries be directed to WhatsApp or email?',
        answer: 'Yes. We build click-to-WhatsApp links and pre-structured web forms that organize customer details for direct follow-up.'
      }
    ]
  },
  {
    id: 'local-service-businesses',
    slug: 'local-service-businesses',
    title: 'Website Design & Local Search Foundations for Contractors',
    subtitle: 'Building location-focused service pages, clear contact pathways, and technical local search foundations for service businesses.',
    eyebrow: 'CONTRACTOR & LOCAL SERVICE EXPERIENCE',
    description: 'Local contractors and service providers require dedicated service pages, clear service-area information, and mobile quote pathways to capture customer search intent.',
    metaTitle: 'Local Service Contractor Web & SEO Foundations | Starts Digital',
    metaDescription: 'Custom website development, local SEO foundations, and service-area content for renovation and contractor businesses.',
    canonicalPath: '/industries/local-service-businesses/',
    schemaType: 'industry',
    breadcrumbLabel: 'Local Service Businesses',
    featuredProjectId: 'rk-reno-solutions',
    featuredProofText: 'Website design, location-focused content, service-page development and local SEO foundation for renovation and air-conditioning services for RK Reno Solutions in Kuala Lumpur and Selangor.',
    relevantServiceIds: ['website-design-development', 'seo-local-search', 'paid-advertising'],
    keyTopics: [
      { title: 'Service & Location Page Structure', description: 'Structuring dedicated pages for core contractor specialties and key service areas to capture search intent.' },
      { title: 'Mobile Contact & Quote Pathways', description: 'Designing fast, accessible contact forms, click-to-call buttons, and WhatsApp inquiry features.' },
      { title: 'Technical Local SEO Setup', description: 'Implementing structured schema markup, clean heading hierarchy, and location meta data for search indexation.' },
      { title: 'Service Breakdown & Scope Display', description: 'Presenting completed work samples, service lists, and scope details clearly to inform potential clients.' }
    ],
    workingMethod: [
      { step: '01', title: 'Services & Area Definition', description: 'Cataloging primary contractor services, target geographic coverage, and customer inquiry types.' },
      { step: '02', title: 'Site Structure & Layout Design', description: 'Designing structured page layouts that guide visitors from service details to quote requests.' },
      { step: '03', title: 'Content & Technical SEO Integration', description: 'Writing clear service descriptions and implementing technical SEO tags for search engines.' },
      { step: '04', title: 'Deployment & Usability Review', description: 'Publishing the website on fast hosting infrastructure and verifying mobile form usability.' }
    ],
    faqs: [
      {
        question: 'Do you guarantee specific search engine rankings for contractors?',
        answer: 'No. We provide technical local SEO, structured schema markup, and location-focused content foundations, but we do not make unverified ranking guarantees.'
      },
      {
        question: 'Can separate pages be created for different contractor services?',
        answer: 'Yes. We structure distinct pages for individual service categories and target geographic locations to match customer search queries.'
      }
    ]
  },
  {
    id: 'technology-products',
    slug: 'technology-products',
    title: 'Product Development & Growth Support for Tech Solutions',
    subtitle: 'Developing web applications, product user interfaces, marketing workflows, and growth assets for software platforms.',
    eyebrow: 'SOFTWARE & TECH EXPERIENCE',
    description: 'We collaborate with technology platforms to build web applications, design product interfaces, structure marketing workflows, and produce digital growth assets.',
    metaTitle: 'Tech Product Development & Growth Partnerships | Starts Digital',
    metaDescription: 'Web application development, UI design, workflow automation, and product growth support for technology platforms.',
    canonicalPath: '/industries/technology-products/',
    schemaType: 'industry',
    breadcrumbLabel: 'Technology Products',
    featuredProjectId: 'convort-ai',
    featuredProofText: 'Starts Digital developed the ConvortAI web application and continues supporting product development, project management, social media, creative production and growth as a Technology & Growth Partner.',
    relevantServiceIds: ['website-design-development', 'ai-marketing-workflows', 'creative-content', 'social-media-marketing'],
    keyTopics: [
      { title: 'Web Application Development', description: 'Engineering modern, responsive web application interfaces using clean frontend frameworks and robust backend integrations.' },
      { title: 'Product UI/UX & Layout Design', description: 'Designing intuitive user interface layouts, application screens, and user interaction flows for software products.' },
      { title: 'Marketing Workflow Integrations', description: 'Setting up practical AI tools, lead handling workflows, and automated notification integrations.' },
      { title: 'Product Communication & Growth Assets', description: 'Producing product landing pages, demo content, social media visuals, and documentation to support user onboarding.' }
    ],
    workingMethod: [
      { step: '01', title: 'Requirements & Product Roadmap', description: 'Reviewing technical requirements, key features, user roles, and core application workflows.' },
      { step: '02', title: 'Architecture & UI Layouts', description: 'Designing modular UI components and application structures for reliable user experience.' },
      { step: '03', title: 'Development & Integration', description: 'Writing clean code, implementing core features, and connecting third-party API services.' },
      { step: '04', title: 'Launch & Growth Support', description: 'Deploying application updates and executing ongoing creative, social, and technical support tasks.' }
    ],
    faqs: [
      {
        question: 'What is your role as a Technology & Growth Partner?',
        answer: 'For ConvortAI, Starts Digital developed the web application and acts as an integrated technical and creative production partner supporting product development and growth.'
      },
      {
        question: 'Can practical AI workflows be integrated into marketing systems?',
        answer: 'Yes. We specialize in integrating AI APIs, automated lead routing, and practical workflow tools into modern web applications.'
      }
    ]
  },
  {
    id: 'lahore',
    slug: 'lahore',
    title: 'Digital Marketing & Web Development Agency in Lahore',
    subtitle: 'Factual agency context, published service capabilities, and project execution for local Pakistani and international clients.',
    eyebrow: 'LAHORE AGENCY CONTEXT',
    description: 'Based in Lahore, Pakistan, Starts Digital provides paid advertising, custom web development, technical SEO, creative content production, social media management, and practical AI marketing workflows.',
    metaTitle: 'Digital Marketing Agency in Lahore | Starts Digital',
    metaDescription: 'Starts Digital is a Lahore-based digital marketing agency founded in 2025, offering paid ads, website development, SEO, creative content, and AI workflows.',
    canonicalPath: '/locations/lahore/',
    schemaType: 'location',
    breadcrumbLabel: 'Lahore',
    featuredProjectId: 'black-gold-fertilizer',
    featuredProofText: 'Founded in 2025 in Lahore, Starts Digital delivers digital marketing and technical web production for Pakistani businesses and international partners.',
    relevantServiceIds: ['paid-advertising', 'website-design-development', 'seo-local-search', 'creative-content', 'social-media-marketing', 'ai-marketing-workflows'],
    keyTopics: [
      { title: 'Lahore-Based Core Team', description: 'Our strategy, design, development, and campaign operations are executed directly by our team in Lahore.' },
      { title: 'Local & International Client Project Coordination', description: 'We support local Pakistani businesses as well as international clients across Asia, the Middle East, and beyond.' },
      { title: 'Six Published Service Capabilities', description: 'Full access to our six published service lines: Paid Ads, Websites, Technical SEO, Creative Content, Social Media, and AI Workflows.' },
      { title: 'Direct Communication Channels', description: 'Clients communicate with project leads directly through WhatsApp and email.' }
    ],
    workingMethod: [
      { step: '01', title: 'Initial Project Brief & Consultation', description: 'Reviewing project requirements, business goals, and current digital assets via WhatsApp or email.' },
      { step: '02', title: 'Scope Definition & Written Proposal', description: 'Providing a clear written scope breakdown, deliverables schedule, and commercial terms.' },
      { step: '03', title: 'Collaborative Execution & Review', description: 'Developing web assets, creative media, or campaign structures with regular milestone reviews.' },
      { step: '04', title: 'Launch & Operational Support', description: 'Deploying completed technical projects and managing active marketing campaigns according to the agreed plan.' }
    ],
    faqs: [
      {
        question: 'Where is Starts Digital located?',
        answer: 'Starts Digital is based in Lahore, Pakistan. We operate as a digital agency coordinating projects for local and international clients.'
      },
      {
        question: 'How do clients communicate with Starts Digital?',
        answer: 'Client communications and project reviews are conducted primarily through direct WhatsApp channels, email, and scheduled project reviews for clear record-keeping.'
      },
      {
        question: 'How can we contact Starts Digital for a new project inquiry?',
        answer: 'You can fill out our Project Brief Form on the Contact page, email us directly at firdosidigital@gmail.com, or send a WhatsApp message to +92 339 4135544.'
      }
    ]
  }
];

export function getMarketPageById(id: string): MarketPageDefinition | undefined {
  return marketPages.find((m) => m.id === id || m.slug === id);
}

export function getMarketPageBySlug(slug: string): MarketPageDefinition | undefined {
  return marketPages.find((m) => m.slug === slug || m.id === slug);
}

export function getIndustryPages(): MarketPageDefinition[] {
  return marketPages.filter((m) => m.schemaType === 'industry');
}

export function getLahoreLocationPage(): MarketPageDefinition {
  return marketPages.find((m) => m.id === 'lahore')!;
}
