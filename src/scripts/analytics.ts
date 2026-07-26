// Privacy-first, disabled-by-default analytics module

export interface AnalyticsEvent {
  eventName: string;
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
const measurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID || '';

export function isAnalyticsActive(): boolean {
  if (!isAnalyticsEnabled || !measurementId) return false;
  if (typeof window === 'undefined') return false;
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (isLocal) return false;
  return true;
}

export function trackEvent(event: AnalyticsEvent): void {
  if (!isAnalyticsActive()) {
    // Disabled by default: no cookies, no network requests
    return;
  }

  // Safe parameters only (NO personal data, NO form values)
  const safeParams = {
    page_path: event.params?.page_path || window.location.pathname,
    service_id: event.params?.service_id,
    project_id: event.params?.project_id,
    source: event.params?.source,
    link_destination_type: event.params?.link_destination_type,
    viewport_group: window.innerWidth < 768 ? 'mobile' : 'desktop',
  };

  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', event.eventName, safeParams);
  }
}

export function initAnalyticsTrackers(): void {
  if (typeof window === 'undefined') return;

  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
    if (!target) return;

    const trackType = target.getAttribute('data-track');
    const source = target.getAttribute('data-track-source') || undefined;
    const projectId = target.getAttribute('data-track-project') || undefined;
    const serviceId = target.getAttribute('data-track-service') || undefined;

    if (trackType) {
      trackEvent({
        eventName: trackType,
        params: {
          source,
          project_id: projectId,
          service_id: serviceId,
        },
      });
    }
  });
}
