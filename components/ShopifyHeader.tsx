import React from 'react';
import { ShoppingBag, Sparkles, Tag, ShieldCheck, Flame, Star } from 'lucide-react';

interface ShopifyHeaderProps {
  onOpenCart: () => void;
  onOpenCoupon: () => void;
  cartCount: number;
  finalPrice: number;
}

export const ShopifyHeader: React.FC<ShopifyHeaderProps> = ({
  onOpenCart,
  onOpenCoupon,
  cartCount,
  finalPrice
}) => {
  return (
    <header className="sticky top-0 z-[80] bg-white border-b border-slate-200/90 shadow-xs">
      {/* ═══ 1. SHOPIFY TOP ANNOUNCEMENT BAR ═══ */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white text-[11px] md:text-xs font-bold py-2 px-3 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Live Visitor / Scarcity ticker */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="hidden sm:inline font-bold">148 designers viewing now</span>
            <span className="sm:hidden font-bold">148 viewing</span>
          </div>

          {/* Flash Promo Headline */}
          <div className="flex items-center gap-2 truncate text-center mx-auto">
            <span className="bg-white/20 px-2 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider hidden md:inline">
              FLASH SALE
            </span>
            <span className="truncate">
              ⚡ 92% OFF All 12 Courses + 6 VIP Bonuses (₹999 Only) • Ends Tonight!
            </span>
          </div>

          {/* Instant Coupon Pill */}
          <button
            onClick={onOpenCoupon}
            className="hidden sm:flex items-center gap-1.5 bg-black/30 hover:bg-black/50 text-amber-200 text-[10px] md:text-[11px] font-black px-2.5 py-0.5 rounded-full transition-all border border-white/20 shrink-0"
          >
            <Tag size={12} className="text-amber-300" />
            <span>Have Coupon? Tap Here</span>
          </button>
        </div>
      </div>

      {/* ═══ 2. MAIN STOREFRONT NAVIGATION ═══ */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-display font-black text-lg shadow-md group-hover:scale-105 transition-transform">
            A3
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                AVADA 3D™
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <ShieldCheck size={10} className="text-emerald-600" />
                Verified
              </span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
              Shopify Official Store
            </span>
          </div>
        </div>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
          <a href="#overview" className="hover:text-orange-600 transition-colors">Overview</a>
          <a href="#whats-included" className="hover:text-orange-600 transition-colors">12 Masterclasses</a>
          <a href="#renders-gallery" className="hover:text-orange-600 transition-colors flex items-center gap-1">
            <span>25 Renders Gallery</span>
            <span className="bg-orange-100 text-orange-700 text-[9px] px-1.5 py-0.2 rounded-full">New</span>
          </a>
          <a href="#income-calculator" className="hover:text-orange-600 transition-colors">Income Calculator</a>
          <a href="#reviews" className="hover:text-orange-600 transition-colors flex items-center gap-1">
            <span>Customer Reviews</span>
            <span className="flex text-amber-500"><Star size={11} className="fill-amber-400" /> 4.9</span>
          </a>
          <a href="#faq" className="hover:text-orange-600 transition-colors">FAQ</a>
        </nav>

        {/* Right Action Icons: Coupon + Cart Drawer */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Coupon Trigger Button */}
          <button
            onClick={onOpenCoupon}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-orange-200 bg-orange-50/70 hover:bg-orange-100/80 text-orange-700 text-xs font-bold transition-all"
            title="Unlock Secret Coupon"
          >
            <Tag size={14} className="text-orange-600" />
            <span className="hidden xs:inline">Coupon</span>
          </button>

          {/* Shopify Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
          >
            <div className="relative">
              <ShoppingBag size={17} />
              <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:inline">Cart • ₹{finalPrice}</span>
          </button>

        </div>
      </div>
    </header>
  );
};
