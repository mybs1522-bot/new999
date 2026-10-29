import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, QrCode, Smartphone, CreditCard, Sparkles, Lock, Settings, Key, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { REPORTS_DATA } from '../data/reports';
import { openRazorpayCheckout, getRazorpayKey, setRazorpayKey } from '../utils/razorpayClient';

export default function CheckoutModal({
  isOpen,
  onClose,
  reportId,
  formData,
  onPaymentSuccess,
  language = 'hi'
}) {
  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const report = REPORTS_DATA.find(r => r.id === reportId) || REPORTS_DATA[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [customKey, setCustomKey] = useState(getRazorpayKey());
  const [isKeySaved, setIsKeySaved] = useState(false);

  const handleSaveKey = (e) => {
    e.preventDefault();
    if (customKey) {
      setRazorpayKey(customKey);
      setIsKeySaved(true);
      setTimeout(() => setIsKeySaved(false), 2000);
      setShowKeyConfig(false);
    }
  };

  // Launch Live Razorpay Standard Checkout
  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    setErrorMessage('');

    const success = await openRazorpayCheckout({
      amount: 299,
      currency: 'INR',
      reportTitle: isHindi ? report.titleHi : report.title,
      userName: formData.fullName || 'Client',
      userPhone: formData.whatsappNumber || '',
      userEmail: 'client@astrojeevan.com',
      onSuccess: (paymentResult) => {
        setIsProcessing(false);
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
        onPaymentSuccess({
          paymentId: paymentResult.razorpay_payment_id,
          paymentMethod: 'Razorpay (UPI / Card / NetBanking)'
        });
      },
      onError: (err) => {
        setIsProcessing(false);
        console.warn('Razorpay checkout error:', err);
        setErrorMessage(
          err.description || err.message || 'Razorpay Gateway error. You can also use the Instant Test Pay option below.'
        );
      },
      onDismiss: () => {
        setIsProcessing(false);
      }
    });

    if (!success) {
      setIsProcessing(false);
    }
  };

  // Instant Test Simulation (Bypasses Bank Gateway for rapid verification)
  const handleInstantSimulation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
      onPaymentSuccess({
        paymentId: `pay_test_${Date.now().toString().slice(-6)}`,
        paymentMethod: 'Razorpay Test Mode (Simulated)'
      });
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-amber-300 animate-in fade-in-50 zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#89270b] via-[#b44d12] to-[#89270b] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-between pr-8 mb-1">
            <div className="flex items-center space-x-1.5 text-xs text-amber-200 font-semibold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-yellow-300" />
              <span>{isHindi ? '256-बिट रेज़रपे सुरक्षित चेकआउट' : 'Razorpay Secure Checkout'}</span>
            </div>
            
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="text-[11px] text-amber-200/90 hover:text-white flex items-center space-x-1 underline cursor-pointer"
              title="Configure Razorpay Key ID"
            >
              <Settings className="w-3 h-3" />
              <span>Key Settings</span>
            </button>
          </div>

          <h3 className="text-xl font-bold font-serif leading-snug">
            {isHindi ? report.titleHi : report.title}
          </h3>
          <p className="text-xs text-amber-100 mt-1">
            {isHindi ? 'जातक का नाम: ' : 'Client: '} <strong>{formData.fullName}</strong>
          </p>
        </div>

        {/* Razorpay Key Configuration Accordion */}
        {showKeyConfig && (
          <form onSubmit={handleSaveKey} className="p-3.5 bg-gray-900 text-white text-xs border-b border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-amber-300">
              <span className="flex items-center space-x-1">
                <Key className="w-3.5 h-3.5" />
                <span>Razorpay Key ID Configuration</span>
              </span>
              <span className="text-[10px] text-gray-400">Live or Test Key</span>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                placeholder="rzp_test_... or rzp_live_..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="bg-[#b44d12] hover:bg-[#89270b] text-white px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer"
              >
                Save
              </button>
            </div>
            {isKeySaved && (
              <p className="text-[11px] text-emerald-400">✓ Key updated successfully!</p>
            )}
            <p className="text-[10px] text-gray-400">
              Get your key from: <em>Razorpay Dashboard → Settings → API Keys</em>
            </p>
          </form>
        )}

        {/* Pricing Summary */}
        <div className="p-5 border-b border-gray-100 bg-amber-50/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">{isHindi ? 'कुल देय राशि' : 'Total Amount Payable'}</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-gray-900 tracking-tight">₹299</span>
              <span className="text-xs text-gray-400 line-through">₹{report.originalPrice}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                80% OFF
              </span>
            </div>
          </div>
          <div className="text-right text-[11px] text-gray-500">
            <div className="font-semibold text-gray-800 flex items-center justify-end space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Razorpay Active</span>
            </div>
            <div className="text-emerald-700 font-medium">Instant PDF Download</div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4">
          
          {/* Razorpay Brand Badge */}
          <div className="bg-[#f0f4fe] border border-[#3395ff]/30 rounded-2xl p-4 text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-6 px-2.5 py-0.5 bg-[#0C2340] rounded-md text-white font-black text-xs tracking-wider flex items-center space-x-1">
                <span className="text-[#3395ff] font-serif text-sm">₹</span>
                <span>Razorpay</span>
              </div>
              <span className="text-xs font-bold text-gray-700">Official Payment Gateway</span>
            </div>

            <p className="text-xs text-gray-600">
              {isHindi
                ? 'UPI (Google Pay, PhonePe, Paytm, CRED), सभी क्रेडिट/डेबिट कार्ड एवं नेटबैंकिंग समर्थित।'
                : 'Supports Google Pay, PhonePe, Paytm, UPI, Cards, and NetBanking.'}
            </p>

            <div className="flex items-center justify-center space-x-2 pt-1">
              <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-bold text-gray-700">UPI</span>
              <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-bold text-gray-700">GPay</span>
              <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-bold text-gray-700">PhonePe</span>
              <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-bold text-gray-700">Cards</span>
              <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-bold text-gray-700">NetBanking</span>
            </div>
          </div>

          {/* Error Message if any */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong>Gateway Notice:</strong> {errorMessage}
              </div>
            </div>
          )}

          {/* 1. Main Razorpay Pay Button */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleRazorpayPayment}
            className="w-full py-4 px-4 bg-gradient-to-r from-[#0C2340] via-[#153e70] to-[#0C2340] hover:from-[#091a30] hover:to-[#091a30] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer border border-[#3395ff]/40"
          >
            {isProcessing ? (
              <span className="flex items-center space-x-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>{isHindi ? 'रेज़रपे खुल रहा है...' : 'Connecting to Razorpay...'}</span>
              </span>
            ) : (
              <>
                <CreditCard className="w-5 h-5 text-[#3395ff]" />
                <span>Get Your Report</span>
              </>
            )}
          </button>

          {/* 2. Instant Test Simulation Button (Always Available for local testing) */}
          <div className="pt-2">
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleInstantSimulation}
              className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>
                {isHindi ? 'त्वरित टेस्ट भुगतान (1-Click Instant Test Pay)' : '1-Click Instant Test Pay (Demo Mode)'}
              </span>
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-500 flex items-center justify-center space-x-1 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isHindi ? '100% सुरक्षित एवं एन्क्रिप्टेड। भुगतान पूर्ण होते ही ६-पेज रिपोर्ट खुलेगी।' : '100% Secure & Encrypted. Opens certified report immediately.'}</span>
          </p>

        </div>

      </div>
    </div>
  );
}
