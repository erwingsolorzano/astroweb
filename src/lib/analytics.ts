// Analytics utilities for Plausible and Google Analytics
export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number>;
}

// Plausible Analytics
export const plausible = {
  init: (domain: string) => {
    if (typeof window === 'undefined' || !domain) return;
    
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://plausible.io/js/script.js';
    script.setAttribute('data-domain', domain);
    document.head.appendChild(script);
  },
  
  track: (eventName: string, props?: Record<string, string | number>) => {
    if (typeof window === 'undefined' || !window.plausible) return;
    
    window.plausible(eventName, { props });
  }
};

// Google Analytics
export const gtag = {
  init: (measurementId: string) => {
    if (typeof window === 'undefined' || !measurementId) return;
    
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
  },
  
  track: (eventName: string, props?: Record<string, string | number>) => {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', eventName, props);
  }
};

// Unified tracking function
export const track = (event: AnalyticsEvent) => {
  // Track with Plausible if available
  plausible.track(event.name, event.props);
  
  // Track with Google Analytics if available
  gtag.track(event.name, event.props);
};

// Common events
export const events = {
  pageView: (path: string) => track({ name: 'pageview', props: { path } }),
  downloadCV: () => track({ name: 'download_cv' }),
  contactSubmit: () => track({ name: 'contact_submit' }),
  projectClick: (project: string) => track({ name: 'project_click', props: { project } }),
  emailCopy: () => track({ name: 'email_copy' }),
} as const;

// Extend Window interface for TypeScript
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}