import { loadStripe } from '@stripe/stripe-js';

const SUPABASE_URL = 'https://aexrgtpxyzfxjecozstf.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFleHJndHB4eXpmeGplY296c3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTY0MjcsImV4cCI6MjA4Nzg3MjQyN30._ZSmh9iTP3etyGj5XrkEGJtRp9kR8z6jAmLOMesIvkg';

export const FALLBACK_STRIPE_LINK = '';

export const stripePromise = loadStripe(
  'pk_live_51PRJCsGGsoQTkhyv6OrT4zvnaaB5Y0MSSkTXi0ytj33oygsfW3dcu6aOFa9q3dr2mXYTCJErnFQJcOcyuDAsQd4B00lIAdclbB'
);

export const createPaymentIntent = async (email: string): Promise<string> => {
  let res: Response;
  try {
    res = await fetch(`${SUPABASE_URL}/functions/v1/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ email }),
    });
  } catch (netErr) {
    console.error('[Stripe] Network error calling edge function:', netErr);
    throw new Error('Network error — could not reach payment server.');
  }

  let data: any = {};
  try {
    data = await res.json();
  } catch {
    console.error('[Stripe] Edge function returned non-JSON, status:', res.status);
    throw new Error(`Server error (${res.status}) — Edge Function may not be deployed yet.`);
  }

  console.log('[Stripe] Edge function response:', res.status, data);

  if (!res.ok || !data.clientSecret) {
    throw new Error(data.error ?? `Server error ${res.status} — deploy the Edge Function and set STRIPE_SECRET_KEY.`);
  }
  return data.clientSecret;
};

export const sendAccessEmail = async (email: string): Promise<void> => {
  if (!email) return;
  try {
    await fetch(`${SUPABASE_URL}/functions/v1/send-access-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ email }),
    });
  } catch (e) {
    console.error('[sendAccessEmail] failed (non-blocking):', e);
  }
};
