import React, { useState } from 'react';
import { X, Sparkles, Tag, Check, ArrowRight, Gift, Percent, Flame } from 'lucide-react';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (code: string) => void;
  currentCoupon: string | null;
  discountPercent: number;
}

export const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
  currentCoupon,
  discountPercent
}) => {
  const [inputCode, setInputCode] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const popularCoupons = [
    {
      code: 'EARN10',
      discount: '10% OFF',
      tag: '🔥 MOST APPLIED',
      desc: 'Exclusive freelancer kickstart coupon. Saves ₹100 instantly.'
    },
    {
      code: 'SPECIAL50',
      discount: '50% OFF',
      tag: '⚡ VIP BATCH',
      desc: 'Special promotional code for aspiring studio owners.'
    },
    {
      code: 'SUNDAY50',
      discount: '50% OFF',
      tag: '🎉 WEEKEND DEAL',
      desc: 'Flash weekend masterclass pass discount.'
    }
  ];

  const handleApply = (codeToApply: string) => {
    const trimmed = codeToApply.trim().toUpperCase();
    if (!trimmed) {
      setErrorMsg('Please enter a coupon code');
      return;
    }
    setErrorMsg(null);
    onApplyCoupon(trimmed);
    setCopiedCode(trimmed);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-orange-400 overflow-hidden text-slate-900 animate-[scaleUp_0.25s_ease-out]">
        
        {/* Top Accent Gradient Bar */}
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 p-4 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>
          
          <div className="inline-flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-1">
            <Flame size={12} className="fill-amber-400 text-amber-400" />
            <span>Shopify VIP Discount Unlock</span>
          </div>
          <h3 className="text-xl font-display font-black text-white">Unlock Your Secret Discount</h3>
          <p className="text-xs text-orange-100 mt-0.5">Apply an instant coupon to lock today's lowest possible rate</p>
        </div>

        <div className="p-6">
          {/* Active Coupon notification */}
          {currentCoupon && (
            <div className="mb-4 bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-800">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-emerald-600 font-bold" />
                <span>Coupon <strong>{currentCoupon}</strong> active ({discountPercent}% discount applied)!</span>
              </div>
            </div>
          )}

          {/* Quick Apply List */}
          <div className="space-y-3 mb-5">
            <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              Available VIP Coupons (Tap to Apply):
            </label>
            
            {popularCoupons.map((c) => (
              <div 
                key={c.code}
                onClick={() => handleApply(c.code)}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                  currentCoupon === c.code 
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-orange-400 hover:bg-orange-50/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Tag size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-slate-900 text-sm tracking-wide group-hover:text-orange-600 transition-colors">
                        {c.code}
                      </span>
                      <span className="text-[10px] font-extrabold bg-orange-500 text-white px-2 py-0.2 rounded-full">
                        {c.discount}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500 hidden sm:inline">
                        {c.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{c.desc}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl bg-slate-900 group-hover:bg-orange-600 text-white text-xs font-bold shrink-0 transition-colors"
                >
                  {copiedCode === c.code || currentCoupon === c.code ? 'Applied ✓' : 'Apply'}
                </button>
              </div>
            ))}
          </div>

          {/* Manual Input Code Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mb-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Or Enter Custom Code:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="e.g. EARN10"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value.toUpperCase());
                    setErrorMsg(null);
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                onClick={() => handleApply(inputCode)}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black rounded-xl shadow-md transition-all shrink-0"
              >
                Apply Code
              </button>
            </div>
            {errorMsg && <p className="text-red-500 text-[11px] font-bold mt-1.5">{errorMsg}</p>}
          </div>

          <p className="text-center text-[10px] text-slate-400">
            🔒 Disount is instantly calculated and locked for your email & phone number upon checkout.
          </p>
        </div>
      </div>
    </div>
  );
};
