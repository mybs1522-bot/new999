import React from 'react';
import { X, MessageSquare, Send, CheckCircle2, ExternalLink } from 'lucide-react';

export default function WhatsAppModal({ isOpen, onClose, reportData, language = 'hi' }) {
  if (!isOpen || !reportData) return null;

  const isHindi = language === 'hi';
  const { user, reportConfig, kundli, prescribedRemedies } = reportData;
  const reportTitle = isHindi ? reportConfig.titleHi : reportConfig.title;
  const firstRemedy = prescribedRemedies && prescribedRemedies.length > 0 ? prescribedRemedies[0].title : '';

  const waMessage = isHindi
    ? `नमस्ते ${user.fullName} जी! 🙏\n\nआपकी *${reportTitle}* सफलतापूर्वक तैयार हो चुकी है।\n\n✨ *ज्योतिषीय मुख्य बिंदु:*\n• लग्न राशि: ${kundli.lagna.rashi.hindi}\n• नक्षत्र: ${kundli.nakshatra.hindi}\n• वर्तमान महादशा: ${kundli.runningMahadasha?.hindi || kundli.runningMahadasha?.planet}\n• मुख्य महा-उपाय: ${firstRemedy}\n\n📥 अपनी संपूर्ण डिजिटल रिपोर्ट एवं कुंडली चक्र डाउनलोड करें:\nhttps://astrojeevan.com/reports/AJ-${Date.now().toString().slice(-6)}\n\n_Astro Jeevan रिसर्च ब्यूरो द्वारा वैदिक विधि से प्रमाणित_`
    : `Namaste ${user.fullName}! 🙏\n\nYour *${reportTitle}* is ready.\n\n✨ *Key Astrological Highlights:*\n• Ascendant: ${kundli.lagna.rashi.name}\n• Nakshatra: ${kundli.nakshatra.name}\n• Current Mahadasha: ${kundli.runningMahadasha?.planet}\n• Top Prescribed Remedy: ${firstRemedy}\n\n📥 Download your full certified report & Kundli chart:\nhttps://astrojeevan.com/reports/AJ-${Date.now().toString().slice(-6)}\n\n_Certified by Astro Jeevan Astrological Research Bureau_`;

  const waUrl = `https://wa.me/91${user.whatsappNumber || ''}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-emerald-300 animate-in fade-in-50 zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-emerald-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <MessageSquare className="w-5 h-5 text-emerald-200" />
            <div>
              <h4 className="font-bold text-base leading-tight">
                {isHindi ? 'व्हाट्सएप रिपोर्ट डिलीवरी' : 'WhatsApp Report Dispatch'}
              </h4>
              <p className="text-xs text-emerald-100">
                To: +91 {user.whatsappNumber || 'User Number'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-800 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Chat Simulation */}
        <div className="p-5 bg-[#efeae2] space-y-4">
          <div className="text-center">
            <span className="text-[10px] font-semibold text-gray-500 bg-white/80 px-2 py-0.5 rounded shadow-xs">
              TODAY • ENCRYPTED WHATSAPP BUSINESS
            </span>
          </div>

          <div className="bg-white rounded-xl rounded-tl-none p-3.5 shadow-sm max-w-sm ml-0 text-xs text-gray-800 space-y-2 border border-gray-200">
            <div className="font-bold text-emerald-800 flex items-center space-x-1">
              <span>Astro Jeevan (Official)</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />
            </div>
            <pre className="font-sans whitespace-pre-wrap leading-relaxed text-gray-700">
              {waMessage}
            </pre>
            <div className="text-right text-[10px] text-gray-400">
              Just now ✓✓
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center gap-2.5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl text-center shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{isHindi ? 'व्हाट्सएप पर भेजें (Open WhatsApp)' : 'Send to WhatsApp'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-4 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors"
          >
            {isHindi ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
