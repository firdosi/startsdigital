// Privacy-first, disabled-by-default analytics module

export type AllowedEventName =
  | 'page_view'
  | 'primary_cta_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'service_view'
  | 'case_study_view'
  | 'partner_story_view'
  | 'external_client_visit'
  | 'contact_form_start'
  | 'contact_brief_generate'
  | 'navigation_click';

export interface AnalyticsEvent {
  eventName: AllowedEventName;
  params?: {
    page_path?: string;
    service_id?: string;
    project_id?: string;
    source?: string;
    link_destination_type?: 'internal' | 'external' | 'whatsapp' | 'email';
    viewport_group?: 'mobile' | 'desktop';
  };
}

const isAnalyticsEnabled = import.meta.env.PUBLIC_ANALYTICS_ENABLED === 'true';
const isDebugMode = import.meta.env.PUBLIC_ANALYTICS_DEBUG === 'true';
const measurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID || '';

const allowedEventsSet = new Set<AllowedEventName>([
  'page_view',
  'primary_cta_click',
  'whatsapp_click',
  'email_click',
  'service_view',
  'case_study_view',
  'partner_story_view',
  'external_client_visit',
  'contact_form_start',
  'contact_brief_generate',
  'navigation_click',
]);

const legacyEventMap: Record<string, AllowedEventName> = {
  'contact-whatsapp': 'whatsapp_click',
  'contact-email': 'email_click',
  'case-study-open': 'case_study_view',
  'cta-primary': 'primary_cta_click',
  'nav-link': 'navigation_click',
  'service-card': 'service_view',
  'partner-story': 'partner_story_view',
  'external-client': 'external_client_visit',
  'form-start': 'contact_form_start',
  'brief-generate': 'contact_brief_generate',
};

export function isAnalyticsActive(): boolean {
  if (!isAnalyticsEnabled || !measurementId) return false;
  if (typeof window === 'undefined') return false;
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (isLocal) return false;
  return true;
}

export function trackEvent(event: AnalyticsEvent): void {
  // Strict Event Name Validation
  if (!allowedEventsSet.has(event.eventName)) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(`[Analytics] Ignored unapproved event: "${event.eventName}"`);
    }
    return;
  }

  // Safe parameters only (NO personal data, NO form values)
  const safeParams = {
    page_path: event.params?.page_path || (typeof window !== 'undefined' ? window.location.pathname : ''),
    ...(event.params?.service_id ? { service_id: event.params.service_id } : {}),
    ...(event.params?.project_id ? { project_id: event.params.project_id } : {}),
    ...(event.params?.source ? { source: event.params.source } : {}),
    ...(event.params?.link_destination_type ? { link_destination_type: event.params.link_destination_type } : {}),
    viewport_group: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
  };

  // Local debug logging for Playwright / QA validation
  if (typeof window !== 'undefined' && (isDebugMode || (window as any).__ANALYTICS_DEBUG__)) {
    (window as any).__ANALYTICS_EVENTS__ = (window as any).__ANALYTICS_EVENTS__ || [];
    (window as any).__ANALYTICS_EVENTS__.push({
      eventName: event.eventName,
      params: safeParams,
      timestamp: new Date().toISOString(),
    });
  }

  if (!isAnalyticsActive()) {
    // Disabled by default: no cookies, no external network requests
    return;
  }

  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', event.eventName, safeParams);
  }
}

let formStarted = false;

export function initAnalyticsTrackers(): void {
  if (typeof window === 'undefined') return;

  // Track initial page_view once
  if (!(window as any).__INITIAL_PAGE_VIEW_SENT__) {
    (window as any).__INITIAL_PAGE_VIEW_SENT__ = true;
    trackEvent({
      eventName: 'page_view',
      params: { page_path: window.location.pathname },
    });
  }

  if ((window as any).__ANALYTICS_INITIALIZED__) return;
  (window as any).__ANALYTICS_INITIALIZED__ = true;
  (window as any).__ANALYTICS_EVENTS__ = (window as any).__ANALYTICS_EVENTS__ || [];

  // Single delegated click listener
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-track], a[href^="https://wa.me"], a[href^="mailto:"]');
    if (!target) return;

    let rawTrack = target.getAttribute('data-track');
    const href = target.getAttribute('href') || '';

    if (!rawTrack) {
      if (href.includes('wa.me')) rawTrack = 'whatsapp_click';
      else if (href.startsWith('mailto:')) rawTrack = 'email_click';
    }

    if (!rawTrack) return;

    const mappedEvent: AllowedEventName | undefined = allowedEventsSet.has(rawTrack as AllowedEventName)
      ? (rawTrack as AllowedEventName)
      : legacyEventMap[rawTrack];

    if (!mappedEvent) return;

    const source = target.getAttribute('data-track-source') || undefined;
    const projectId = target.getAttribute('data-track-project') || undefined;
    const serviceId = target.getAttribute('data-track-service') || undefined;
    let destinationType: 'internal' | 'external' | 'whatsapp' | 'email' = 'internal';

    if (href.includes('wa.me')) destinationType = 'whatsapp';
    else if (href.startsWith('mailto:')) destinationType = 'email';
    else if (href.startsWith('http') && !href.includes(window.location.hostname)) destinationType = 'external';

    trackEvent({
      eventName: mappedEvent,
      params: {
        source,
        project_id: projectId,
        service_id: serviceId,
        link_destination_type: destinationType,
      },
    });
  });

  // Track contact form start (once per Contact page visit)
  document.addEventListener('focusin', (e) => {
    if (formStarted) return;
    const form = (e.target as HTMLElement).closest('#contact-form, #project-brief-form, form');
    if (form && window.location.pathname.includes('/contact')) {
      formStarted = true;
      trackEvent({
        eventName: 'contact_form_start',
        params: { page_path: window.location.pathname },
      });
    }
  });

  // ClientRouter navigation page_view tracking
  document.addEventListener('astro:after-swap', () => {
    formStarted = false;
    trackEvent({
      eventName: 'page_view',
      params: { page_path: window.location.pathname },
    });
  });
}
