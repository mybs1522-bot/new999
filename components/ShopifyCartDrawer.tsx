import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Tag, Lock, Gift, Zap } from 'lucide-react';
import { BUNDLE_PRICE, BUNDLE_ORIGINAL_PRICE } from '../constants';

interface ShopifyCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  appliedCoupon: string | null;
  discountPercent: number;
  finalPrice: number;
  onOpenCoupon: () => void;
}

export const ShopifyCartDrawer: React.FC<ShopifyCartDrawerProps> = ({
  isOpen,
  onClose,
  onCheckout,
  appliedCoupon,
  discountPercent,
  finalPrice,
  onOpenCoupon
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-[fadeIn_0.2s_ease]"
        onClick={onClose} 
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-[slideLeft_0.3s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-orange-600" />
            <h3 className="font-display font-black text-slate-900 text-lg">Your Cart</h3>
            <span className="bg-orange-100 text-orange-800 text-xs font-black px-2 py-0.5 rounded-full">
              1 Item
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Free Bonus Unlock Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow-inner">
          <Sparkles size={14} className="fill-amber-300 text-amber-300 shrink-0" />
          <span>🎉 All 6 VIP Bonuses (Worth ₹38,000) Unlocked Free!</span>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Cart Item Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex gap-3 shadow-xs">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              <img 
                src="/banner-1.jpg" 
                alt="12-Course Bundle" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full inline-block mb-1">
                  BEST VALUE BUNDLE
                </span>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                  12-Course Architecture & 3D Photorealism Money-Maker Pass
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Lifetime Google Drive Link • Pre-Recorded Self-Paced
                </p>
              </div>

              <div className="flex items-baseline justify-between mt-2 pt-1.5 border-t border-slate-200">
                <span className="text-xs text-slate-400 line-through">
                  ₹{BUNDLE_ORIGINAL_PRICE.toLocaleString('en-IN')}
                </span>
                <span className="font-display font-black text-slate-900 text-base">
                  ₹{finalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Unlocked Free Bonuses list */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 mb-2 text-xs font-black text-amber-900">
              <Gift size={14} className="text-orange-600" />
              <span>Included VIP Bonuses in Your Download:</span>
            </div>
            
            <div className="space-y-1.5 text-[11px] text-slate-700">
              {[
                '10,000+ Indian & Modern 3D Models (₹14,999 Value)',
                '5,000+ 4K Ultra HD PBR Materials & Textures (₹7,999 Value)',
                'Indian Client Quotation & Contract Scripts (₹4,999 Value)',
                '150+ Master AI Architecture Prompts Bible (₹3,999 Value)',
                'Official Digital Skill Certificate (₹2,999 Value)',
                '24/7 Dedicated WhatsApp Support Team Access (Priceless)'
              ].map((b, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate pr-2">
                    <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                    <span className="truncate">{b}</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-700 shrink-0">FREE</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coupon Trigger Card */}
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-orange-600" />
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {appliedCoupon ? `Coupon ${appliedCoupon} Active!` : 'Have a Promo / Coupon Code?'}
                </p>
                <p className="text-[10px] text-slate-500">
                  {appliedCoupon ? `${discountPercent}% discount deducted` : 'Tap to select or enter code'}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenCoupon}
              className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              {appliedCoupon ? 'Change' : 'Apply'}
            </button>
          </div>

          {/* Delivery Note */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-900">
            <Zap size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Instant Digital Delivery:</strong>
              Lifetime access link will be delivered directly to your Email & WhatsApp within 60 seconds of checkout.
            </div>
          </div>

        </div>

        {/* Drawer Footer & Checkout Action */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
          
          {/* Order Summary Math */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Catalog Value:</span>
              <span className="line-through">₹{BUNDLE_ORIGINAL_PRICE.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between text-emerald-700 font-medium">
              <span>Today's Batch Discount (92% OFF):</span>
              <span>-₹{(BUNDLE_ORIGINAL_PRICE - BUNDLE_PRICE).toLocaleString('en-IN')}</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>VIP Coupon ({appliedCoupon}):</span>
                <span>-₹{(BUNDLE_PRICE - finalPrice).toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold">
              <span className="text-slate-900 text-sm">Estimated Total:</span>
              <div className="text-right">
                <span className="text-2xl font-display font-black text-slate-900">
                  ₹{finalPrice}
                </span>
                <span className="text-[10px] text-slate-400 block font-normal">
                  All taxes & bonuses included
                </span>
              </div>
            </div>
          </div>

          {/* Giant Checkout Button */}
          <button
            onClick={() => {
              onClose();
              onCheckout();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-display font-black text-base shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <Zap size={18} className="fill-white" />
            <span>Proceed to Instant Checkout (₹{finalPrice})</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <Lock size={12} />
            <span>256-Bit SSL Razorpay Checkout • 7-Day Money-Back Guarantee</span>
          </div>
        </div>

      </div>
    </div>
  );
};
