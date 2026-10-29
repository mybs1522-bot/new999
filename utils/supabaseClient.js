import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://aynzwvsnjqhcywfandbd.supabase.co';
export const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5bnp3dnNuanFoY3l3ZmFuZGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MTUyMDQsImV4cCI6MjEwNTk5MTIwNH0.7pQei4jSQZ00LhZCp1VavYGtZwuo-VnMdA2NfYJujQ0';
export const SUPABASE_PUBLISHABLE_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY) || 'sb_publishable_txecABPWjCJVTWXzS0B7Rg_IAOjYMaY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LOCAL_STORAGE_KEY = 'astro_admin_orders_v1';

// ─── Local Storage Helpers ───────────────────────────────────────────────────

export function getLocalOrders() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const sampleOrders = [
        {
          id: 'ord_demo_1081',
          client_name: 'Rahul Sharma',
          gender: 'Male',
          dob: '12/10/1993',
          tob: '07:45 AM',
          pob: 'Varanasi, UP, India',
          whatsapp: '+91 98765 43210',
          report_id: 'career-growth-remedy',
          report_title: 'करियर एवं व्यापार उन्नति महा-रिपोर्ट (Career & Business Growth)',
          amount: 299,
          payment_status: 'Completed',
          payment_method: 'UPI / PhonePe',
          payment_id: 'pay_demo_001',
          lead_stage: 'completed',
          created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
          report_data: null
        },
        {
          id: 'ord_demo_1082',
          client_name: 'Pooja Verma',
          gender: 'Female',
          dob: '24/04/1997',
          tob: '03:15 PM',
          pob: 'Jaipur, Rajasthan, India',
          whatsapp: '+91 98111 22334',
          report_id: 'shaadi-yog-report',
          report_title: 'शीघ्र विवाह एवं सुखी दांपत्य योग रिपोर्ट (Marriage & Compatibility)',
          amount: 299,
          payment_status: 'Completed',
          payment_method: 'UPI / Google Pay',
          payment_id: 'pay_demo_002',
          lead_stage: 'completed',
          created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
          report_data: null
        },
        {
          id: 'ord_demo_1083',
          client_name: 'Amitabh Saxena',
          gender: 'Male',
          dob: '05/01/1988',
          tob: '11:20 AM',
          pob: 'Lucknow, UP, India',
          whatsapp: '+91 94150 78901',
          report_id: 'karz-mukti-remedy',
          report_title: 'कर्ज मुक्ति एवं ऋण मोचन महा-उपाय (Debt Relief Astro Remedy)',
          amount: 299,
          payment_status: 'Completed',
          payment_method: 'UPI / Paytm',
          payment_id: 'pay_demo_003',
          lead_stage: 'completed',
          created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
          report_data: null
        }
      ];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleOrders));
      return sampleOrders;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local orders:', err);
    return [];
  }
}

function upsertLocal(record) {
  try {
    const existing = getLocalOrders();
    const idx = existing.findIndex(o => o.id === record.id);
    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...record };
    } else {
      existing.unshift(record);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage upsert error:', err);
  }
}

// ─── STAGE 1: Save Lead / Form Data (BEFORE Razorpay opens) ─────────────────
// This captures the user's birth details + selected report the moment they click
// "Get Report". Even if Razorpay never opens or payment is abandoned, we have data.

export async function saveLeadCapture(leadData) {
  const id = leadData.id || `lead_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const record = {
    id,
    client_name: leadData.client_name || 'Anonymous',
    gender: leadData.gender || 'Male',
    dob: leadData.dob || '',
    tob: leadData.tob || '',
    pob: leadData.pob || '',
    whatsapp: leadData.whatsapp || 'Not Provided',
    report_id: leadData.report_id || '',
    report_title: leadData.report_title || 'Astrology Report',
    amount: leadData.amount || 299,
    payment_status: 'Payment Pending',
    payment_method: '',
    payment_id: '',
    lead_stage: 'form_submitted',
    error_details: '',
    report_data: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // 1. Save to local storage immediately (sync, never fails)
  upsertLocal(record);

  // 2. Push to Supabase (async, best effort)
  try {
    const { error } = await supabase.from('reports').insert([record]);
    if (error) {
      console.warn('Supabase lead insert warning:', error.message);
    } else {
      console.log('✅ Lead captured to Supabase:', id);
    }
  } catch (err) {
    console.warn('Supabase network error (lead saved locally):', err);
  }

  return id;
}

// ─── STAGE 2: Update Lead Status (on every Razorpay callback) ────────────────
// Called on: gateway_opened, payment_failed, payment_dismissed, payment_completed

export async function updateLeadStatus(orderId, updates) {
  const patch = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  // 1. Update local storage first (instant)
  try {
    const existing = getLocalOrders();
    const idx = existing.findIndex(o => o.id === orderId);
    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...patch };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
    }
  } catch (err) {
    console.warn('LocalStorage update error:', err);
  }

  // 2. Update Supabase (best effort)
  try {
    const { error } = await supabase
      .from('reports')
      .update(patch)
      .eq('id', orderId);
    if (error) {
      console.warn('Supabase update warning:', error.message);
    } else {
      console.log(`✅ Lead status updated [${orderId}]:`, patch.lead_stage || patch.payment_status);
    }
  } catch (err) {
    console.warn('Supabase network error (updated locally):', err);
  }
}

// ─── STAGE 3: Save Full Report Order (on payment success) ────────────────────
// Enriches the existing lead record with payment details + generated report data

export async function saveReportOrder(orderData) {
  const orderId = orderData.id || `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const record = {
    id: orderId,
    client_name: orderData.client_name || orderData.user?.fullName || 'Client',
    gender: orderData.gender || orderData.user?.gender || 'Male',
    dob: orderData.dob || orderData.user?.dobFormatted || '15/08/1995',
    tob: orderData.tob || orderData.user?.tobFormatted || 'अज्ञात (चन्द्र लग्न अनुसार)',
    pob: orderData.pob || orderData.user?.pob || 'New Delhi, India',
    whatsapp: orderData.whatsapp || orderData.user?.whatsappNumber || 'Not Provided',
    report_id: orderData.report_id || orderData.reportConfig?.id || 'career-growth-remedy',
    report_title: orderData.report_title || orderData.reportConfig?.title || 'Astrology Report',
    amount: orderData.amount || 299,
    payment_status: orderData.payment_status || 'Completed',
    payment_method: orderData.payment_method || 'Razorpay',
    payment_id: orderData.payment_id || '',
    lead_stage: orderData.lead_stage || 'completed',
    error_details: orderData.error_details || '',
    report_data: orderData.report_data || orderData.report || null,
    created_at: orderData.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // 1. Upsert to local storage
  upsertLocal(record);

  // 2. Upsert to Supabase — use upsert so it works for both new records and updates
  try {
    const { data, error } = await supabase
      .from('reports')
      .upsert([record], { onConflict: 'id' });
    if (error) {
      console.warn('Supabase upsert warning:', error.message);
    } else {
      console.log('✅ Order synced to Supabase:', data);
    }
  } catch (err) {
    console.warn('Supabase network error (saved locally):', err);
  }

  return record;
}

// ─── Fetch all orders ────────────────────────────────────────────────────────

export async function fetchReportOrders() {
  const localOrders = getLocalOrders();

  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error (using local cache):', error.message);
      return localOrders;
    }

    const remoteData = data || [];
    const remoteIdSet = new Set(remoteData.map(item => item.id));

    // 1. Identify local orders that are missing in Supabase (e.g., generated on this device offline)
    const missingInRemote = localOrders.filter(local => !remoteIdSet.has(local.id));

    // 2. Two-way sync: Push missing local orders to Supabase cloud
    if (missingInRemote.length > 0) {
      console.log(`Syncing ${missingInRemote.length} local orders to Supabase cloud...`);
      const { error: syncError } = await supabase
        .from('reports')
        .upsert(missingInRemote, { onConflict: 'id' });

      if (!syncError) {
        // Re-fetch from cloud to ensure we have the exact authoritative server state
        const { data: updatedData, error: updatedError } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!updatedError && updatedData) {
          // Cloud is the absolute source of truth. Mirror it locally.
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
          return updatedData;
        }
      }
    }

    // 3. Mirror the cloud data perfectly into local storage for offline resilience
    if (remoteData.length > 0 || localOrders.length > 0) {
      // We also want to merge any remote updates to local, but missingInRemote handles local->remote
      // So remoteData has everything except the ones that just failed to sync. 
      // Just to be safe, if we didn't re-fetch, we combine them:
      const mergedIdMap = new Map();
      remoteData.forEach(item => mergedIdMap.set(item.id, item));
      localOrders.forEach(item => {
        if (!mergedIdMap.has(item.id)) mergedIdMap.set(item.id, item);
      });
      
      const finalList = Array.from(mergedIdMap.values()).sort(
        (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(finalList));
      return finalList;
    }

    return remoteData;
  } catch (err) {
    console.warn('Supabase network error, returning local cache:', err);
    return localOrders;
  }
}

// ─── Delete an order ─────────────────────────────────────────────────────────

export async function deleteReportOrder(orderId) {
  const current = getLocalOrders();
  const filtered = current.filter(o => o.id !== orderId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));

  try {
    await supabase.from('reports').delete().eq('id', orderId);
  } catch {
    // Ignore error
  }
}
