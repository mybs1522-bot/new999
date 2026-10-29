// Meta Pixel & Conversions API (CAPI) Tracking Utility
// Pixel ID: 1817128485872560
// Configured with dual Browser (fbq) + Server (CAPI) tracking with deduplication (event_id)

export const META_PIXEL_ID = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_META_PIXEL_ID) || 
  '1817128485872560';

export const META_CAPI_TOKEN = 
  (typeof import.meta !== 'undefined' && import.meta.env?.META_CAPI_TOKEN) || 
  'EAALS3jbvlwkBSpjkl0RfBSMJ8iu5NMQKZC6OXuTDPy7JFjdrWnfoZBZBwDYhzoJOmcPsbDV4ZA8AlonJSxHwnfSvGVQNZChqsqdrioyEIw9FQAmJ7dSlOD5cxXV1R9wZBNsReTMbdDlRKwYcJDGloKzwQNFipU9nmSog2qSNXZCZCamyiDYJEPYUZB42S2glgiwZDZD';

// Helper to get cookies (_fbp, _fbc)
export function getCookie(name) {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : '';
}

// Generate unique event ID for deduplication between Pixel and CAPI
export function generateEventId(prefix = 'evt') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// SHA-256 helper for browser client fallback
async function sha256Browser(str) {
  if (!str) return undefined;
  try {
    const enc = new TextEncoder().encode(String(str).trim().toLowerCase());
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return undefined;
  }
}

// Format Indian phone number for Meta hashing (91XXXXXXXXXX)
function formatPhone(phone) {
  if (!phone) return '';
  let clean = String(phone).replace(/\D/g, '');
  if (clean.length === 10) clean = '91' + clean;
  return clean;
}

/**
 * Core event dispatcher: fires both Browser Pixel and Server Conversions API
 */
export async function trackMetaEvent(eventName, customData = {}, userData = {}, explicitEventId = null) {
  const eventId = explicitEventId || generateEventId(eventName.toLowerCase());
  const fbp = getCookie('_fbp');
  const fbc = getCookie('_fbc');
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://astrojeevan.com';

  // ─── 1. BROWSER PIXEL (fbq) ───
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, customData, { eventID: eventId });
    }
  } catch (err) {
    console.warn('[Meta Pixel] Browser tracking warning:', err);
  }

  // ─── 2. SERVER CONVERSIONS API (CAPI) ───
  try {
    // Send to our serverless endpoint
    const capiPayload = {
      eventName,
      eventId,
      eventSourceUrl: currentUrl,
      customData,
      userData: {
        name: userData.name || '',
        phone: userData.phone || '',
        email: userData.email || '',
        city: userData.city || '',
        state: userData.state || '',
        fbp,
        fbc
      }
    };

    const res = await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(capiPayload)
    });

    if (!res.ok) {
      // If serverless endpoint returned non-200 (e.g. running locally without Vercel runtime),
      // perform direct fallback to Meta Graph API
      fallbackDirectCapi(eventName, eventId, currentUrl, customData, userData, fbp, fbc);
    }
  } catch {
    // Network fallback
    fallbackDirectCapi(eventName, eventId, currentUrl, customData, userData, fbp, fbc);
  }

  return eventId;
}

/**
 * Direct Client-to-Graph-API fallback if serverless endpoint is unavailable
 */
async function fallbackDirectCapi(eventName, eventId, currentUrl, customData, userData, fbp, fbc) {
  try {
    const hashedPhone = await sha256Browser(formatPhone(userData.phone));
    const hashedName = await sha256Browser(userData.name);
    const hashedEmail = await sha256Browser(userData.email || 'client@astrojeevan.com');

    const metaData = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: currentUrl,
          action_source: 'website',
          user_data: {
            em: hashedEmail ? [hashedEmail] : undefined,
            ph: hashedPhone ? [hashedPhone] : undefined,
            fn: hashedName ? [hashedName] : undefined,
            fbp: fbp || undefined,
            fbc: fbc || undefined
          },
          custom_data: customData
        }
      ]
    };

    fetch(`https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metaData)
    }).catch(() => {});
  } catch {
    // Ignore fallback failures
  }
}

// ─── HIGH-CONVERSION STANDARD AD EVENTS ──────────────────────────────────────

/**
 * PageView: Triggered on route / view changes
 */
export function trackMetaPageView(url) {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  } catch {}
}

/**
 * ViewContent: Triggered when user views a specific ₹299 report landing page
 */
export function trackMetaViewContent({ reportId, title, amount = 299 }) {
  return trackMetaEvent('ViewContent', {
    content_name: title || 'Vedic Astrology Report',
    content_ids: [reportId || 'vedic-report'],
    content_type: 'product',
    value: amount,
    currency: 'INR'
  });
}

/**
 * InitiateCheckout: Triggered when user clicks "Get Your Report" CTA to start payment
 */
export function trackMetaInitiateCheckout({ reportId, title, amount = 299, name, phone, email, eventId }) {
  return trackMetaEvent(
    'InitiateCheckout',
    {
      content_name: title || 'Vedic Astrology Report',
      content_ids: [reportId || 'vedic-report'],
      content_type: 'product',
      num_items: 1,
      value: amount,
      currency: 'INR'
    },
    { name, phone, email },
    eventId
  );
}

/**
 * Lead: Triggered when user submits birth details into form
 */
export function trackMetaLead({ reportId, title, amount = 299, name, phone, email, eventId }) {
  return trackMetaEvent(
    'Lead',
    {
      content_name: title || 'Vedic Astrology Report',
      content_category: 'Astrology Lead',
      value: amount,
      currency: 'INR'
    },
    { name, phone, email },
    eventId
  );
}

/**
 * Purchase: Triggered when Razorpay payment succeeds
 */
export function trackMetaPurchase({ orderId, reportId, title, amount = 299, paymentId, name, phone, email, eventId }) {
  return trackMetaEvent(
    'Purchase',
    {
      content_name: title || 'Vedic Astrology Report',
      content_ids: [reportId || 'vedic-report'],
      content_type: 'product',
      value: amount,
      currency: 'INR',
      order_id: orderId || paymentId || `ord_${Date.now()}`
    },
    { name, phone, email },
    eventId
  );
}
