// Razorpay Checkout Integration Helper

export const DEFAULT_RAZORPAY_KEY = 'rzp_live_Wh4xEHePkQXqRO';

export function getRazorpayKey() {
  if (typeof window === 'undefined') return DEFAULT_RAZORPAY_KEY;
  return (
    localStorage.getItem('razorpay_key_id') ||
    import.meta.env.VITE_RAZORPAY_KEY_ID ||
    DEFAULT_RAZORPAY_KEY
  );
}

export function setRazorpayKey(key) {
  if (typeof window !== 'undefined' && key) {
    localStorage.setItem('razorpay_key_id', key.trim());
  }
}

// Dynamically load checkout.js if not already present
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.Razorpay) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Failed to load Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// Open Razorpay Standard Checkout
export async function openRazorpayCheckout({
  amount = 299,
  currency = 'INR',
  reportTitle = 'Vedic Astrology Report',
  userName = 'Client',
  userPhone = '',
  userEmail = 'client@astrojeevan.com',
  onSuccess,
  onError,
  onDismiss
}) {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !window.Razorpay) {
    if (onError) onError(new Error('Razorpay SDK could not be loaded'));
    return false;
  }

  const key = getRazorpayKey();

  const options = {
    key: key,
    amount: Math.round(amount * 100), // In paise (e.g. 29900 for ₹299)
    currency: currency,
    name: 'Astro Jeevan',
    description: reportTitle,
    image: 'https://cdn-icons-png.flaticon.com/512/3655/3655581.png',
    prefill: {
      name: userName || 'Client',
      contact: userPhone || '',
      email: userEmail
    },
    notes: {
      service: reportTitle,
      platform: 'Astro Jeevan Web'
    },
    theme: {
      color: '#89270B' // Terracotta Vedic Brand Color
    },
    modal: {
      backdropclose: false,
      ondismiss: function () {
        if (onDismiss) onDismiss();
      }
    },
    handler: function (response) {
      if (onSuccess) {
        onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          amount: amount,
          currency: currency
        });
      }
    }
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      console.error('Razorpay Payment Failed:', response.error);
      if (onError) onError(response.error);
    });
    rzp.open();
    return true;
  } catch (err) {
    console.error('Error opening Razorpay checkout:', err);
    if (onError) onError(err);
    return false;
  }
}
