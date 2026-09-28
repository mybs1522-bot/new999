import { supabase } from './supabase';

/**
 * Meta Pixel Standard Events Tracker
 * Specifications: https://www.facebook.com/business/help/402791146561655?id=1205376682832142
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const META_PIXEL_ID = '1095905126519865';

// Generates a unique ID for deduplication between Pixel and CAPI
const generateEventId = () => {
  return 'evt_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

const dispatchToCAPI = async (eventName: string, parameters?: Record<string, any>, eventId?: string) => {
  try {
    // Collect some basic client-side data for CAPI
    const user_data = {
      client_user_agent: navigator.userAgent,
    };
    
    // We send this asynchronously to the Edge Function without blocking the UI
    supabase.functions.invoke('meta-capi', {
      body: {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        event_id: eventId,
        user_data,
        custom_data: parameters || {},
        action_source: 'website'
      }
    }).catch(err => console.error('Failed to send to CAPI:', err));
  } catch (error) {
    console.error('CAPI Dispatch Error:', error);
  }
};

export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  const eventId = generateEventId();
  
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, parameters || {}, { eventID: eventId });
  }
  
  dispatchToCAPI(eventName, parameters, eventId);
};

export const trackCustomEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  const eventId = generateEventId();
  
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, parameters || {}, { eventID: eventId });
  }
  
  dispatchToCAPI(eventName, parameters, eventId);
};

// Standard event helpers according to Meta specifications

export const trackPageView = () => {
  trackEvent('PageView');
};

export const trackViewContent = (params?: {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}) => {
  trackEvent('ViewContent', {
    content_name: params?.content_name || '12-Course Architecture & Interior Design Master Bundle',
    content_category: params?.content_category || 'Architecture & Design Courses',
    content_ids: params?.content_ids || ['architecture-master-bundle-999'],
    content_type: params?.content_type || 'product',
    value: params?.value ?? 999,
    currency: params?.currency || 'INR',
  });
};

export const trackAddToCart = (params?: {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}) => {
  trackEvent('AddToCart', {
    content_name: params?.content_name || '12-Course Architecture & Interior Design Master Bundle',
    content_ids: params?.content_ids || ['architecture-master-bundle-999'],
    content_type: params?.content_type || 'product',
    value: params?.value ?? 999,
    currency: params?.currency || 'INR',
  });
};

export const trackInitiateCheckout = (params?: {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  num_items?: number;
}) => {
  trackEvent('InitiateCheckout', {
    content_name: params?.content_name || '12-Course Architecture & Interior Design Master Bundle',
    content_ids: params?.content_ids || ['architecture-master-bundle-999'],
    content_type: params?.content_type || 'product',
    value: params?.value ?? 999,
    currency: params?.currency || 'INR',
    num_items: params?.num_items || 1,
  });
};

export const trackAddPaymentInfo = (params?: {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}) => {
  trackEvent('AddPaymentInfo', {
    content_name: params?.content_name || '12-Course Architecture & Interior Design Master Bundle',
    content_ids: params?.content_ids || ['architecture-master-bundle-999'],
    content_type: params?.content_type || 'product',
    value: params?.value ?? 999,
    currency: params?.currency || 'INR',
  });
};

export const trackPurchase = (params: {
  value: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
}) => {
  trackEvent('Purchase', {
    content_name: params.content_name || '12-Course Architecture & Interior Design Master Bundle',
    content_ids: params.content_ids || ['architecture-master-bundle-999'],
    content_type: params.content_type || 'product',
    value: params.value,
    currency: params.currency || 'INR',
    num_items: params.num_items || 1,
  });
};

export const trackLead = (params?: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}) => {
  trackEvent('Lead', {
    content_name: params?.content_name || 'Coupon Claim',
    content_category: params?.content_category || 'Discounts',
    value: params?.value,
    currency: params?.currency || 'INR',
  });
};

export const trackContact = (params?: {
  content_name?: string;
  content_category?: string;
}) => {
  trackEvent('Contact', {
    content_name: params?.content_name || 'WhatsApp Support',
    content_category: params?.content_category || 'Customer Support',
  });
};

export const trackSearch = (params: {
  search_string: string;
  content_category?: string;
}) => {
  trackEvent('Search', {
    search_string: params.search_string,
    content_category: params.content_category || 'Course Category Filter',
  });
};

export const trackCustomizeProduct = (params?: {
  content_name?: string;
  value?: number;
  currency?: string;
}) => {
  trackEvent('CustomizeProduct', {
    content_name: params?.content_name || 'ROI Income Calculator',
    value: params?.value,
    currency: params?.currency || 'INR',
  });
};
