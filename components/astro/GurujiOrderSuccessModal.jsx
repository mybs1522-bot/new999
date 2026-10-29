import React from 'react';
import { CheckCircle2, MessageCircle, Clock, ShieldCheck, Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';

export default function GurujiOrderSuccessModal({
  isOpen,
  onClose,
  orderInfo = {},
  language = 'hi'
}) {
  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const {
    orderId = 'ORD_AJ_108',
    paymentId = 'pay_rzp_live',
    clientName = 'Client',
    whatsapp = 'Not Provided',
    reportTitle = 'Vedic Astrology Report',
    amount = 299
  } = orderInfo;

  const cleanPhone = whatsapp.replace(/\D/g, '');

  const handleOpenSupportWhatsApp = () => {
    const text = encodeURIComponent(
      `नमस्ते Astro Jeevan! मैंने ₹${amount} का भुगतान करके ${reportTitle} ऑर्डर की है।\n\nऑर्डर आईडी: ${orderId}\nनाम: ${clientName}\nव्हाट्सएप: ${whatsapp}\n\nकृपया मेरी रिपोर्ट तैयार होने पर इस नंबर पर भेजें। धन्यवाद!`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-2 border-amber-400 overflow-hidden relative font-sans text-gray-900">
        
        {/* Top Auspicious Saffron Gradient Bar */}
        <div className="bg-gradient-to-r from-[#89270B] via-[#b44d12] to-[#89270B] text-white p-5 text-center relative overflow-hidden">
          {/* Background Om watermark */}
          <div className="absolute right-4 -top-3 text-7xl font-serif text-white/10 select-none pointer-events-none">
            ॐ
          </div>

          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/90 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 shadow-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-yellow-200" />
            <span>{isHindi ? `भुगतान सफल • ₹${amount} प्राप्त` : `Payment Successful • ₹${amount} Confirmed`}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-serif text-yellow-300">
            {isHindi ? '॥ श्री गणेशाय नमः ॥' : '|| Shree Ganeshaya Namah ||'}
          </h2>
          <p className="text-xs text-amber-100/90 mt-0.5 font-medium">
            {isHindi 
              ? 'आपकी पूजा व ज्योतिष विश्लेषण का संकल्प पूर्ण हुआ' 
              : 'Your consultation and astrological sankalp is registered'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Main Guruji Announcement Banner */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50/70 to-amber-100/60 border-2 border-amber-300 rounded-2xl p-4 text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-yellow-300 flex items-center justify-center mx-auto text-xl font-serif font-black shadow-md border border-amber-300">
              ॐ
            </div>
            
            <h3 className="font-serif font-black text-base sm:text-lg text-[#89270B] leading-snug">
              {isHindi 
                ? 'आदरणीय एस्ट्रो गुरुजी द्वारा आपकी रिपोर्ट तैयार की जा रही है' 
                : 'Astro Guruji is personally preparing your horoscope'}
            </h3>
            
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              {isHindi ? (
                <>
                  आपकी कुंडली का गहन हस्तलिखित विश्लेषण आदरणीय <strong>एस्ट्रो गुरुजी</strong> द्वारा तैयार किया जा रहा है। जैसे ही रिपोर्ट पूर्ण होगी, यह सीधे आपके व्हाट्सएप नंबर <strong className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">+91 {cleanPhone || whatsapp}</strong> पर पीडीएफ प्रारूप में भेज दी जाएगी।
                </>
              ) : (
                <>
                  Your complete astrological chart and personalized Lal Kitab remedies are being reviewed by <strong>Astro Guruji</strong>. Your 6-page certified PDF report will be sent directly to your WhatsApp number: <strong className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">+91 {cleanPhone || whatsapp}</strong>.
                </>
              )}
            </p>
          </div>

          {/* Order Details Receipt Box */}
          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-amber-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">
              <span>{isHindi ? 'ऑर्डर विवरण' : 'Order Summary'}</span>
              <span className="text-emerald-700 font-bold">100% Secured</span>
            </div>

            <div className="flex justify-between items-center text-gray-700">
              <span className="text-gray-500">{isHindi ? 'जातक का नाम:' : 'Client Name:'}</span>
              <strong className="text-gray-900 font-bold">{clientName}</strong>
            </div>

            <div className="flex justify-between items-center text-gray-700">
              <span className="text-gray-500">{isHindi ? 'रिपोर्ट सेवा:' : 'Report Service:'}</span>
              <strong className="text-[#89270B] font-bold text-right max-w-[240px] truncate">{reportTitle}</strong>
            </div>

            <div className="flex justify-between items-center text-gray-700">
              <span className="text-gray-500">{isHindi ? 'व्हाट्सएप नंबर:' : 'WhatsApp:'}</span>
              <strong className="text-emerald-700 font-bold font-mono">+91 {cleanPhone || whatsapp}</strong>
            </div>

            <div className="flex justify-between items-center text-gray-700">
              <span className="text-gray-500">{isHindi ? 'ऑर्डर संदर्भ संख्या:' : 'Order ID:'}</span>
              <span className="font-mono text-gray-700 text-[11px] font-semibold">{orderId}</span>
            </div>

            <div className="flex justify-between items-center text-gray-700 pt-1 border-t border-dashed border-amber-200/80">
              <span className="text-gray-500">{isHindi ? 'भुगतान आईडी:' : 'Payment ID:'}</span>
              <span className="font-mono text-gray-500 text-[10px] truncate max-w-[200px]">{paymentId}</span>
            </div>
          </div>

          {/* Process Timeline Assurance */}
          <div className="space-y-2 text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-100">
            <div className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                {isHindi 
                  ? 'गुरुजी प्रत्येक जातक की कुंडली की निरयण भाव गणना स्वयं करते हैं ताकि उपाय 100% फलदायी हों। कृपया धैर्य रखें।' 
                  : 'Guruji manually verifies planetary degrees and Lal Kitab remedies to ensure maximum potency. Please check WhatsApp shortly.'}
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                {isHindi 
                  ? 'आपकी सभी जन्म जानकारी पूर्णतः गोपनीय एवं सुरक्षित है।' 
                  : '100% Confidential Vedic Astrological Consultation.'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleOpenSupportWhatsApp}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>{isHindi ? 'व्हाट्सएप पर सहायता टीम से जुड़ें' : 'Chat on WhatsApp Support'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-amber-100/80 hover:bg-amber-200 text-[#89270B] font-bold text-xs rounded-xl border border-amber-300 transition-colors cursor-pointer text-center"
            >
              {isHindi ? 'होम पेज / कैटलॉग पर वापस जाएं' : 'Return to Catalog'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
