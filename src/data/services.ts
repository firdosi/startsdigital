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
    summary: 'Search visibility built through useful pages, clear structure and local relevance.',
    overview: 'Starts Digital supports search visibility by reviewing the website, search intent, service and location structure, content requirements, on-page foundations, indexability and local search presence.',
    idealFor: [
      'Planning search-friendly pages for a new website',
      'Improving the structure of existing service pages',
      'Creating location-focused pages for relevant service areas',
      'Organising content around real search requirements',
      'Reviewing technical and indexability problems',
      'Improving local business information and Google Business Profile structure',
      'Connecting website content with the services and locations the business actually provides'
    ],
    problemsAddressed: [
      'Low visibility on local search and map results',
      'Unstructured page titles, headers, and meta descriptions',
      'Missing local business contact and service metadata'
    ],
    deliverables: [
      {
        title: 'SEO Discovery',
        description: 'The business, services, locations, current website and priority search requirements are reviewed.'
      },
      {
        title: 'Search Intent and Keyword Research',
        description: 'Relevant queries and search intent are researched to guide page planning and content decisions.'
      },
      {
        title: 'Website Structure and Page Mapping',
        description: 'Service, location and supporting pages are organised into a clear website structure.'
      },
      {
        title: 'Service and Location Content Planning',
        description: 'Page topics, content requirements and internal connections are planned around genuine business coverage.'
      },
      {
        title: 'On-Page Foundations',
        description: 'Page titles, descriptions, headings, internal links and useful page content are reviewed or prepared according to scope.'
      },
      {
        title: 'Technical and Indexability Review',
        description: 'Crawlability, indexability, sitemap, canonical and selected technical issues are reviewed where relevant.'
      },
      {
        title: 'Google Business Profile Support',
        description: 'Business information, categories, services and local profile requirements may be reviewed when included in scope.'
      },
      {
        title: 'Measurement and Next Actions',
        description: 'Available search data, completed work and recommended next actions are documented.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Business and search review',
        description: 'Analyzing current search visibility, site indexation, locations and targeted search intent.'
      },
      {
        step: '02',
        title: 'Search intent and page mapping',
        description: 'Structuring service and location pages around actual search queries and business scope.'
      },
      {
        step: '03',
        title: 'Content and technical planning',
        description: 'Planning page metadata, heading hierarchy, internal links and technical indexation rules.'
      },
      {
        step: '04',
        title: 'Implementation or coordinated updates',
        description: 'Updating site structure, page metadata and local Google Business Profile settings.'
      },
      {
        step: '05',
        title: 'Measurement and next actions',
        description: 'Observing search indexation signals, reviewing available console data and planning next steps.'
      }
    ],
    clientInputs: [
      'Business and service information',
      'Target locations',
      'Current website URL',
      'Priority services or products',
      'Existing website access when required',
      'Google Search Console access when available',
      'Analytics access when available',
      'Google Business Profile context when relevant',
      'Existing content and brand material',
      'Important competitors or market examples',
      'Main search or business objective'
    ],
    relatedProjectIds: ['rk-reno-solutions'],
    faq: [
      {
        question: 'What is included in an SEO project?',
        answer: 'SEO projects review keyword intent, site architecture, page metadata, content structure, indexability and local search profiles based on agreed scope.'
      },
      {
        question: 'Can you work on an existing website?',
        answer: 'Yes, we can optimize existing website pages, clean up title and heading structures, and map out new service or location pages.'
      },
      {
        question: 'Do you provide keyword research?',
        answer: 'Yes, we analyze relevant search terms and intent to structure your page hierarchy and content focus.'
      },
      {
        question: 'Can you create service and location pages?',
        answer: 'Yes, structuring dedicated service and location pages is a core method for improving targeted search relevance.'
      },
      {
        question: 'Can you support Google Business Profile work?',
        answer: 'Yes, Google Business Profile category configuration, service area setup, and contact information alignment can be included.'
      },
      {
        question: 'How long does SEO take?',
        answer: 'Search engine indexation and ranking adjustments develop over time and depend on market competition, site condition, content quality and search engine algorithms.'
      },
      {
        question: 'Are search rankings guaranteed?',
        answer: 'No. Search engine rankings cannot be guaranteed by any legitimate agency. We focus on search intent alignment, technical compliance, and useful page structure.'
      },
      {
        question: 'Do all technical recommendations include implementation?',
        answer: 'Implementation depends on your website platform capabilities, access permissions, and agreed project scope.'
      }
    ],
    relatedServiceIds: ['website-design-development', 'creative-content', 'paid-advertising'],
    contactServiceValue: 'SEO and Local Search',
    iconKey: 'Search',
    accent: '#39c98a',
    published: true
  },
  {
    id: 'creative-content',
    slug: 'creative-content',
    name: 'Creative Content',
    shortName: 'Creative',
    eyebrow: 'CREATIVE CONTENT',
    summary: 'Creative content planned around the message, platform and business objective.',
    overview: 'Starts Digital supports content production through clear briefs, concepts, scripts, video editing, graphic design, platform-specific adaptations, review cycles and organised delivery.',
    idealFor: [
      'Preparing creative material for an advertising campaign',
      'Producing regular social media assets',
      'Launching a product, service or seasonal offer',
      'Turning existing footage into usable video content',
      'Creating graphics for business communication',
      'Testing different hooks, messages or visual approaches',
      'Adapting approved material for different platforms and dimensions'
    ],
    problemsAddressed: [
      'Lack of video creative for digital ad campaigns',
      'Inconsistent visual branding across platforms',
      'Creative fatigue in ongoing advertising accounts'
    ],
    deliverables: [
      {
        title: 'Creative Brief',
        description: 'The audience, objective, offer, message, platform and available assets are defined.'
      },
      {
        title: 'Concept and Message Direction',
        description: 'Hooks, angles and communication directions are prepared around the agreed objective.'
      },
      {
        title: 'Script and Content Planning',
        description: 'Video scripts, scene direction, captions or content outlines are prepared where required.'
      },
      {
        title: 'Video Editing',
        description: 'Approved footage and assets are edited into the required format and duration.'
      },
      {
        title: 'Graphic Design',
        description: 'Campaign graphics, social posts and supporting visual assets are produced according to scope.'
      },
      {
        title: 'Format Adaptation',
        description: 'Approved content is adapted for required placements, dimensions and platform formats.'
      },
      {
        title: 'Review and Revision',
        description: 'Feedback is collected through an agreed review process and applied within the defined revision scope.'
      },
      {
        title: 'Asset Organisation and Delivery',
        description: 'Final approved files are named, organised and delivered through the agreed project channel.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Objective and asset review',
        description: 'Reviewing campaign goals, audience, target platform and existing brand materials.'
      },
      {
        step: '02',
        title: 'Creative direction',
        description: 'Developing messaging hooks, visual style guidelines and asset requirements.'
      },
      {
        step: '03',
        title: 'Script or layout preparation',
        description: 'Writing scripts, storyboard notes or graphic layout concepts.'
      },
      {
        step: '04',
        title: 'Editing and design',
        description: 'Editing video clips, applying typography/motion overlays and designing graphics.'
      },
      {
        step: '05',
        title: 'Review and revision',
        description: 'Sharing draft assets for client feedback and refining details within scope.'
      },
      {
        step: '06',
        title: 'Final export and delivery',
        description: 'Rendering high-quality exports, organizing file formats and delivering final assets.'
      }
    ],
    clientInputs: [
      'Business or product information',
      'Audience and platform details',
      'Campaign or content objective',
      'Offer and key message',
      'Existing logo and brand assets',
      'Available footage, images or product material',
      'Required dimensions and duration',
      'Reference examples',
      'Required CTA',
      'Delivery priority',
      'Approval contact',
      'Any usage or publication restrictions'
    ],
    relatedProjectIds: ['black-gold-fertilizer', 'wajib-livestock'],
    faq: [
      {
        question: 'Can you edit footage we already have?',
        answer: 'Yes, we frequently turn existing raw footage, product clips or photo libraries into formatted marketing videos and ad creatives.'
      },
      {
        question: 'Can you create both videos and graphics?',
        answer: 'Yes, our creative work covers short-form video editing, ad graphics, promotional banners and social media templates.'
      },
      {
        question: 'Do you write scripts and captions?',
        answer: 'Yes, video scripts, ad hooks and supporting caption copy are included in our content planning phase.'
      },
      {
        question: 'Is filming included?',
        answer: 'Filming is included only when separately reviewed, scoped and agreed. Most digital projects rely on client-supplied footage or product photography.'
      },
      {
        question: 'Can one creative be adapted for several platforms?',
        answer: 'Yes, approved concepts can be adapted into 9:16 vertical, 1:1 square, or 16:9 horizontal dimensions.'
      },
      {
        question: 'How are revisions handled?',
        answer: 'Revision scope and approval timelines are agreed before production starts to ensure clear project progress.'
      },
      {
        question: 'Are editable source files included?',
        answer: 'Final rendered media files are delivered. Editable source project files are not automatically included unless agreed in scope.'
      },
      {
        question: 'Can creative content be coordinated with paid advertising?',
        answer: 'Yes, producing creative assets specifically tailored for Meta or Google ad testing is a primary use case.'
      }
    ],
    relatedServiceIds: ['paid-advertising', 'social-media-marketing', 'website-design-development'],
    contactServiceValue: 'Creative Content',
    iconKey: 'Video',
    accent: '#ff762b',
    published: true
  },
  {
    id: 'social-media-marketing',
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    shortName: 'Social Media',
    eyebrow: 'SOCIAL MEDIA MARKETING',
    summary: 'Social media organised around consistent content, clear responsibilities and practical business goals.',
    overview: 'Starts Digital supports social media through channel planning, content themes, calendars, creative coordination, captions, publishing support and agreed review routines.',
    idealFor: [
      'Building a more consistent publishing routine',
      'Planning content around business priorities',
      'Coordinating videos, graphics and captions',
      'Supporting a product or service launch',
      'Aligning organic content with paid campaigns',
      'Managing content across more than one relevant channel',
      'Creating a clearer approval and publishing process'
    ],
    problemsAddressed: [
      'Irregular posting schedules and inactive social profiles',
      'Uncoordinated messaging across marketing channels'
    ],
    deliverables: [
      {
        title: 'Channel Review',
        description: 'Relevant platforms, current activity, audience context and available resources are reviewed.'
      },
      {
        title: 'Content Direction',
        description: 'Practical content themes and communication priorities are defined.'
      },
      {
        title: 'Content Calendar',
        description: 'Topics, formats, publishing dates and approval requirements are organised.'
      },
      {
        title: 'Creative Coordination',
        description: 'Video, graphic and supporting asset requirements are coordinated.'
      },
      {
        title: 'Copy and Caption Support',
        description: 'Captions, hooks, supporting text and calls to action are prepared according to scope.'
      },
      {
        title: 'Publishing Support',
        description: 'Approved content may be scheduled or published using agreed account access and responsibilities.'
      },
      {
        title: 'Community Response Scope',
        description: 'Comment and message responsibilities, response guidance and escalation requirements are documented when included.'
      },
      {
        title: 'Performance Review',
        description: 'Available content and channel signals are reviewed to guide future planning.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Goal and channel review',
        description: 'Evaluating current profiles, target demographics and business priorities.'
      },
      {
        step: '02',
        title: 'Content themes and priorities',
        description: 'Establishing key content pillars, promotional focus and messaging tone.'
      },
      {
        step: '03',
        title: 'Calendar and asset planning',
        description: 'Mapping out post schedules, media requirements and caption copy.'
      },
      {
        step: '04',
        title: 'Content production and approval',
        description: 'Creating graphics, editing clips and reviewing drafts prior to publishing.'
      },
      {
        step: '05',
        title: 'Publishing or handover',
        description: 'Scheduling approved posts or handing over formatted assets to your team.'
      },
      {
        step: '06',
        title: 'Performance review and next calendar',
        description: 'Analyzing engagement signals and refining the upcoming content calendar.'
      }
    ],
    clientInputs: [
      'Business and audience information',
      'Relevant social channels',
      'Existing account access when needed',
      'Brand assets',
      'Products, services or campaign priorities',
      'Available photos and footage',
      'Content restrictions',
      'Approval contact',
      'Preferred publishing frequency',
      'Community response responsibilities',
      'Important dates or launches'
    ],
    relatedProjectIds: ['convortai', 'wajib-livestock'],
    faq: [
      {
        question: 'Which social platforms can you support?',
        answer: 'We focus primarily on Meta channels (Facebook and Instagram) depending on target audience habits.'
      },
      {
        question: 'Do you create the content?',
        answer: 'Yes, we coordinate graphic design, short-form video editing, and caption copy writing.'
      },
      {
        question: 'Can you publish directly to our accounts?',
        answer: 'Yes, approved content can be scheduled directly using secure account permissions.'
      },
      {
        question: 'Is community management included?',
        answer: 'Basic response guidelines can be defined, but full community management is scoped separately when required.'
      },
      {
        question: 'Are paid advertisements included?',
        answer: 'Organic social media management and paid advertising campaigns are separate capabilities, though they can be coordinated under one project scope.'
      },
      {
        question: 'How is posting frequency decided?',
        answer: 'Posting frequency is aligned with your available content assets, audience expectations, and agreed scope.'
      },
      {
        question: 'Do you guarantee followers or engagement?',
        answer: 'No. Organic growth depends on market interest, content relevance, and algorithm behavior. We focus on consistent quality and execution.'
      },
      {
        question: 'How are posts approved before publishing?',
        answer: 'A monthly or bi-weekly content calendar is shared for your review and approval before scheduling.'
      }
    ],
    relatedServiceIds: ['creative-content', 'paid-advertising', 'ai-marketing-workflows'],
    contactServiceValue: 'Social Media Marketing',
    iconKey: 'Share2',
    accent: '#39c98a',
    published: true
  },
  {
    id: 'ai-marketing-workflows',
    slug: 'ai-marketing-workflows',
    name: 'AI Marketing Workflows',
    shortName: 'AI Workflows',
    eyebrow: 'AI MARKETING WORKFLOWS',
    summary: 'Practical AI workflows designed around one clearly defined marketing task.',
    overview: 'Starts Digital helps review repetitive marketing work, define required inputs and outputs, assess suitable tools, design instructions, establish human review and test a practical workflow within the agreed technical scope.',
    idealFor: [
      'Structuring repetitive content-drafting tasks',
      'Organising incoming lead information',
      'Preparing internal summaries or handoffs',
      'Supporting frequently repeated reply preparation',
      'Creating structured prompts and operating instructions',
      'Connecting approved tools where technically feasible',
      'Standardising a recurring marketing process',
      'Adding a human-review stage to AI-assisted work'
    ],
    problemsAddressed: [
      'Slow manual response times to initial customer leads',
      'Time-consuming content drafting and research routines'
    ],
    deliverables: [
      {
        title: 'Workflow Discovery',
        description: 'The current task, participants, tools, inputs, outputs and repeated manual steps are reviewed.'
      },
      {
        title: 'Task and Responsibility Mapping',
        description: 'The workflow is divided into clear system actions and human responsibilities.'
      },
      {
        title: 'Input and Output Design',
        description: 'Required information, expected formats and acceptable output boundaries are documented.'
      },
      {
        title: 'Prompt and Instruction Design',
        description: 'Structured instructions, examples and response rules are prepared for the agreed use case.'
      },
      {
        title: 'Tool and Integration Review',
        description: 'Available tools, technical constraints, permissions, usage costs and integration options are assessed.'
      },
      {
        title: 'Prototype or Configuration',
        description: 'A limited workflow is configured or prototyped within the agreed technical scope.'
      },
      {
        title: 'Human Review and Escalation',
        description: 'Approval steps, exception handling and situations requiring human intervention are defined.'
      },
      {
        title: 'Testing and Documentation',
        description: 'The workflow is tested using representative examples and documented for practical use.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Define the exact task',
        description: 'Targeting a specific repetitive marketing or communication task.'
      },
      {
        step: '02',
        title: 'Map the current process',
        description: 'Documenting inputs, human steps, tools used and required output format.'
      },
      {
        step: '03',
        title: 'Select tools and constraints',
        description: 'Assessing technical feasibility, API permissions, privacy rules and costs.'
      },
      {
        step: '04',
        title: 'Configure or prototype',
        description: 'Building custom prompts, instructions, or API integration steps.'
      },
      {
        step: '05',
        title: 'Test outputs and edge cases',
        description: 'Testing sample data and defining human approval/escalation boundaries.'
      },
      {
        step: '06',
        title: 'Document, hand over and refine',
        description: 'Providing operating documentation and training your team on practical usage.'
      }
    ],
    clientInputs: [
      'Exact repetitive task to be reviewed',
      'Current manual process description',
      'People involved in the workflow',
      'Current tools and platforms used',
      'Representative example inputs',
      'Expected output format',
      'Human approval requirements',
      'Exception or escalation rules',
      'Data and privacy restrictions',
      'Required integrations',
      'Approximate frequency or volume',
      'Existing tool subscriptions when relevant'
    ],
    relatedProjectIds: ['convortai'],
    faq: [
      {
        question: 'What types of marketing tasks may be suitable for an AI workflow?',
        answer: 'Tasks with clear inputs and outputs—such as drafting post concepts, summarizing lead notes, structuring campaign briefs, or preparing initial response drafts—are ideal.'
      },
      {
        question: 'Does an AI workflow replace staff?',
        answer: 'No. AI workflows support defined manual tasks and reduce routine effort; human review and decision-making remain essential.'
      },
      {
        question: 'Can you connect every software platform?',
        answer: 'Integrations depend on available software APIs, access permissions, platform terms, and technical feasibility.'
      },
      {
        question: 'How is human review included?',
        answer: 'We design workflows with explicit human approval checkpoints before any content is published or sent to clients.'
      },
      {
        question: 'What information is needed before planning?',
        answer: 'We review your current manual steps, example inputs, desired outputs, team roles, and data privacy boundaries.'
      },
      {
        question: 'Are external software costs included?',
        answer: 'Third-party AI subscriptions, API fees, or automation platform costs are separate infrastructure charges unless agreed.'
      },
      {
        question: 'Can workflows handle confidential customer data?',
        answer: 'Sensitive data handling must be evaluated against privacy regulations and tool security policies before implementation.'
      },
      {
        question: 'Does every workflow include ongoing maintenance?',
        answer: 'Workflows are tested and handed over with documentation. Continued monitoring or updates can be scoped under support agreements.'
      }
    ],
    relatedServiceIds: ['social-media-marketing', 'creative-content', 'website-design-development'],
    contactServiceValue: 'AI Marketing Systems',
    iconKey: 'Cpu',
    accent: '#ddff35',
    published: true
  }
];

export function getAllServices(): ServiceDefinition[] {
  return servicesData;
}

export function getPublishedServices(): ServiceDefinition[] {
  return servicesData.filter((s) => s.published);
}

export function getServiceById(id: string): ServiceDefinition | undefined {
  return servicesData.find((s) => s.id === id || s.slug === id);
}

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return servicesData.find((s) => s.slug === slug || s.id === slug);
}

export function getPrevNextServices(id: string): { prev: ServiceDefinition | null; next: ServiceDefinition | null } {
  const published = getPublishedServices();
  const index = published.findIndex((s) => s.id === id || s.slug === id);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? published[index - 1] : null;
  const next = index < published.length - 1 ? published[index + 1] : null;
  return { prev, next };
}

export function getContactAllowlistMap(): Record<string, string> {
  const map: Record<string, string> = {
    'multiple-services': 'Multiple Services',
    'Multiple Services': 'Multiple Services',
    'not-sure-yet': 'Not Sure Yet',
    'Not Sure Yet': 'Not Sure Yet',
  };

  for (const s of servicesData) {
    map[s.id] = s.contactServiceValue;
    map[s.slug] = s.contactServiceValue;
    map[s.name] = s.contactServiceValue;
    map[s.contactServiceValue] = s.contactServiceValue;
  }

  // Alias maps for common parameters
  map['website-development'] = 'Website Design and Development';
  map['seo'] = 'SEO & Local Search';

  return map;
}

