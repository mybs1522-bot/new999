import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Star, CheckCircle, CheckCircle2, X, ChevronDown, ChevronUp, Sparkles, 
  Eye, Download, Phone, Mail, Lock, Loader2, Timer, Check, ShieldCheck, 
  Zap, Flame, Award, Gift, DollarSign, MessageCircle, ShoppingBag, Tag,
  Layers, Clock, Laptop, Play, CheckCheck, RefreshCw, AlertCircle
} from 'lucide-react';
import { COURSES, BUNDLE_PRICE, BUNDLE_ORIGINAL_PRICE } from '../constants';
import { openRazorpayCheckout } from '../services/razorpay';
import {
  trackViewContent,
  trackAddToCart,
  trackInitiateCheckout,
  trackAddPaymentInfo,
  trackPurchase,
  trackLead,
  trackContact,
  trackSearch,
} from '../services/metaPixel';

import {
  Logo, SocialProofToast,
  PAIN_TRIGGERS_INDIAN, SOLUTION_PILLARS, WHO_IS_THIS_FOR, TRANSFORMATION_STORIES,
  FREE_BONUSES, VALUE_STACK_ITEMS, TESTIMONIALS_LANDING, FAQ_ITEMS_LANDING,
  PAGE_PREVIEWS_ROW1, PAGE_PREVIEWS_ROW2
} from './LandingHelpers';

import { ShopifyHeader } from '../components/ShopifyHeader';
import { ShopifyCartDrawer } from '../components/ShopifyCartDrawer';
import { CouponModal } from '../components/CouponModal';
import { IncomeCalculator } from '../components/IncomeCalculator';
import { RenderProofWall } from '../components/RenderProofWall';

const LandingPage: React.FC = () => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState(() => {
    const D = (3 * 3600 + 24 * 60 + 18) * 1000;
    const r = D - (Date.now() % D);
    return { 
      h: Math.floor((r / 3600000) % 24), 
      m: Math.floor((r / 60000) % 60), 
      s: Math.floor((r / 1000) % 60) 
    };
  });

  // UI Navigation & Modals State
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('All');
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasShownExitModal, setHasShownExitModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);

  // Shopify Product Hero Media Gallery State (Default to Video on first screen)
  const [selectedMediaTab, setSelectedMediaTab] = useState<'cover' | 'video' | 'render1' | 'render7' | 'assets' | 'mentors'>('video');

  // Shopify Buy Box Accordions State
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({
    included: true,
    earn: false,
    specs: false,
    guarantee: false,
  });

  const toggleAccordion = (key: string) => {
    setAccordionOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Payment modal & Razorpay checkout states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
  const [studentCount, setStudentCount] = useState(52480);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  // Calculate Final Price dynamically
  const finalPrice = discountPercent > 0 
    ? Math.round(BUNDLE_PRICE * (1 - discountPercent / 100))
    : BUNDLE_PRICE;

  useEffect(() => { 
    window.scrollTo(0, 0); 
    trackViewContent({
      content_name: 'The Complete 12-Course Architecture & 3D Render Money-Maker Bundle',
      content_category: 'Shopify Product Page',
      content_ids: ['avada-master-bundle-999'],
      content_type: 'product',
      value: finalPrice,
      currency: 'INR'
    });
  }, []);

  // Timer Tick
  useEffect(() => {
    const calc = () => {
      const D = (3 * 3600 + 24 * 60 + 18) * 1000;
      const now = Date.now();
      const r = D - (now % D);
      setTimeLeft({ 
        h: Math.floor((r / 3600000) % 24), 
        m: Math.floor((r / 60000) % 60), 
        s: Math.floor((r / 1000) % 60) 
      });
    };
    const t = setInterval(calc, 1000); 
    calc(); 
    return () => clearInterval(t);
  }, []);

  // Scroll tracking for sticky buy bar
  useEffect(() => {
    const h = () => setShowStickyBar(window.scrollY > 550);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Incremental Live Student counter simulation
  useEffect(() => {
    const t = setInterval(() => setStudentCount(c => c + 1), 6000);
    return () => clearInterval(t);
  }, []);

  // Exit-Intent Trigger (Desktop mouse leaves viewport top)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitModal && !showPaymentModal && !paymentSuccess) {
        setShowExitModal(true);
        setHasShownExitModal(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExitModal, showPaymentModal, paymentSuccess]);

  const formatTime = (val: number) => val.toString().padStart(2, '0');
  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  const openPaymentModal = () => {
    setShowExitModal(false);
    setShowCartDrawer(false);
    setShowPaymentModal(true);
    trackAddToCart({
      content_name: '12-Course Architecture Master Bundle',
      content_ids: ['avada-master-bundle-999'],
      content_type: 'product',
      value: finalPrice,
      currency: 'INR'
    });
    trackInitiateCheckout({
      content_name: '12-Course Architecture Master Bundle',
      content_ids: ['avada-master-bundle-999'],
      content_type: 'product',
      value: finalPrice,
      currency: 'INR',
      num_items: 1
    });
  };

  const handlePayment = () => {
    let hasError = false;
    const cleanPhone = phone.replace(/\D/g, '').replace(/^91/, '').slice(-10);
    const cleanEmail = email.trim();

    if (!cleanPhone || cleanPhone.length < 10) { 
      setPhoneError(true); 
      hasError = true; 
    } else { 
      setPhoneError(false); 
    }

    if (!cleanEmail || !validateEmail(cleanEmail)) { 
      setEmailError(true); 
      hasError = true; 
    } else { 
      setEmailError(false); 
    }

    if (hasError) return;

    trackAddPaymentInfo({
      content_name: '12-Course Architecture Master Bundle',
      content_ids: ['avada-master-bundle-999'],
      content_type: 'product',
      value: finalPrice,
      currency: 'INR'
    });

    setIsLoading(true);
    setPaymentError('');

    openRazorpayCheckout({
      amount: finalPrice,
      courseIds: COURSES.map(c => c.id),
      userPhone: cleanPhone,
      userEmail: cleanEmail,
      onSuccess: (paymentId) => {
        setIsLoading(false);
        setPaymentSuccess(paymentId);
        setShowPaymentModal(false);
        
        trackPurchase({
          content_name: '12-Course Architecture Master Bundle',
          content_ids: ['avada-master-bundle-999'],
          content_type: 'product',
          value: finalPrice,
          currency: 'INR',
          num_items: 1
        });
      },
      onCancel: () => {
        setIsLoading(false);
      },
      onError: (err) => {
        setIsLoading(false);
        setPaymentError('Payment failed. Please retry with UPI, GPay, or Card.');
        console.error('Razorpay Error:', err);
      }
    });
  };

  const applyCouponCodeDirect = (code: string) => {
    const coupons: Record<string, number> = {
      'EARN10': 10,
      'SHOP10': 10,
      'SAVE10': 10,
      'SPECIAL50': 50,
      'SUNDAY50': 50,
      'GTR50': 50,
      'TRTED70': 70,
      'AVADA50': 50
    };
    const upper = code.trim().toUpperCase();
    if (coupons[upper]) {
      setAppliedCoupon(upper);
      setDiscountPercent(coupons[upper]);
      setCouponError(null);
      setShowCouponInput(true);
      trackLead({
        content_name: `Coupon Claim - ${upper}`,
        content_category: 'Discounts',
        value: Math.round(BUNDLE_PRICE * (1 - coupons[upper] / 100)),
        currency: 'INR'
      });
    } else {
      setCouponError('Invalid Coupon Code. Try "EARN10" or "SPECIAL50"');
    }
  };

  const filteredCourses = activeCategoryTab === 'All'
    ? COURSES
    : activeCategoryTab === 'Planning'
    ? COURSES.filter(c => ['1', '2'].includes(c.id))
    : activeCategoryTab === '3D Modeling'
    ? COURSES.filter(c => ['3', '4', '12'].includes(c.id))
    : activeCategoryTab === 'Photorealism'
    ? COURSES.filter(c => ['5', '6', '7', '8'].includes(c.id))
    : COURSES.filter(c => ['9', '10', '11'].includes(c.id));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-x-hidden selection:bg-orange-200 selection:text-slate-900">
      
      {/* ═══ 1. SHOPIFY STORE HEADER & NOTIFICATION TICKER ═══ */}
      <ShopifyHeader
        onOpenCart={() => setShowCartDrawer(true)}
        onOpenCoupon={() => setShowCouponModal(true)}
        cartCount={1}
        finalPrice={finalPrice}
      />

      <main>
        {/* ═══ 2. THE ULTIMATE SHOPIFY 2-COLUMN PRODUCT HERO SECTION ═══ */}
        <section className="pt-4 sm:pt-8 pb-12 md:pb-16 bg-white border-b border-slate-200/90" id="overview">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Shopify Breadcrumbs */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 font-medium mb-4 sm:mb-6">
              <span className="hover:text-slate-900 cursor-pointer">Home</span>
              <span>/</span>
              <span className="hover:text-slate-900 cursor-pointer">Digital Architecture Bundles</span>
              <span>/</span>
              <span className="text-slate-900 font-bold truncate">12-in-1 Master Money-Maker Pass</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* ─────────────────────────────────────────────────────────────
                  LEFT COLUMN: SHOPIFY PRODUCT MEDIA GALLERY (7 COLS)
              ───────────────────────────────────────────────────────────── */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Main Featured Media Box */}
                <div className="relative aspect-[16/10] sm:aspect-[16/10] bg-slate-950 rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl group">
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
                    <span className="inline-flex items-center gap-1 bg-red-600 text-white font-black text-[10px] sm:text-xs uppercase px-2.5 py-1 rounded-lg shadow-md animate-pulse">
                      <Flame size={12} className="fill-white" />
                      #1 BESTSELLER IN INDIA
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-900/90 backdrop-blur-md text-emerald-400 font-black text-[10px] sm:text-xs px-2.5 py-1 rounded-lg border border-emerald-500/30 shadow-md">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      92% OFF FLASH DISCOUNT
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-20 pointer-events-none">
                    <span className="bg-black/80 backdrop-blur-md text-amber-300 font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-lg border border-white/10 shadow-md flex items-center gap-1">
                      <Zap size={12} className="fill-amber-400 text-amber-400" />
                      Instant 60s Google Drive Link
                    </span>
                  </div>

                  {/* Dynamic Media Content Based on Selection */}
                  {selectedMediaTab === 'cover' && (
                    <img
                      src="/banner-1.jpg"
                      alt="12-Course Architecture Master Bundle"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {selectedMediaTab === 'video' && (
                    <div className="w-full h-full bg-black relative">
                      <iframe 
                        src="https://iframe.mediadelivery.net/embed/489113/a214b199-e64a-4eaf-af70-edfbc586e5fd?autoplay=true&loop=true&muted=true&preload=true&responsive=true" 
                        loading="lazy" 
                        style={{ border: 0, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }} 
                        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
                        allowFullScreen={true} 
                      />
                    </div>
                  )}

                  {selectedMediaTab === 'render1' && (
                    <img
                      src="/renders/RENDER-1.jpg"
                      alt="4K Living Room Render"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {selectedMediaTab === 'render7' && (
                    <img
                      src="/renders/RENDER-7.jpg"
                      alt="Luxury Modern Interior"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {selectedMediaTab === 'assets' && (
                    <img
                      src="/banner-2.jpg"
                      alt="10,000+ Ready 3D Models & Assets"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {selectedMediaTab === 'mentors' && (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center p-4">
                      <img
                        src="/renders/mentors.png"
                        alt="Mentors and Certification"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Thumbnails Row (Shopify Gallery Switcher) */}
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {[
                    { id: 'video', label: 'Watch Video Preview', thumb: '/banner-1.jpg', icon: '▶️' },
                    { id: 'cover', label: 'Bundle Box', thumb: '/banner-1.jpg', icon: '📦' },
                    { id: 'render1', label: '4K Living Room', thumb: '/renders/RENDER-1.jpg', icon: '🛋️' },
                    { id: 'render7', label: 'Luxury Marble Bath', thumb: '/renders/RENDER-7.jpg', icon: '🏛️' },
                    { id: 'assets', label: '10,000+ 3D Assets', thumb: '/banner-2.jpg', icon: '🪑' },
                    { id: 'mentors', label: 'Mentors & ISO Cert', thumb: '/renders/mentors.png', icon: '📜' },
                  ].map((thumb) => (
                    <button
                      key={thumb.id}
                      onClick={() => setSelectedMediaTab(thumb.id as any)}
                      className={`relative w-20 sm:w-24 aspect-video rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedMediaTab === thumb.id
                          ? 'border-orange-500 ring-2 ring-orange-400/40 scale-105 shadow-md'
                          : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                      }`}
                    >
                      <img src={thumb.thumb} alt={thumb.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <span className="text-xs">{thumb.icon}</span>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[8px] font-bold px-1 py-0.5 truncate text-center">
                        {thumb.label}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Mini Visual Proof Reel Under Gallery */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 overflow-hidden">
                      {['/renders/RENDER-1.jpg', '/renders/RENDER-2.jpg', '/renders/RENDER-3.jpg', '/renders/RENDER-4.jpg'].map((img, i) => (
                        <img key={i} src={img} className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" alt="Student Render" />
                      ))}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">25 Photorealistic Renders Included</p>
                      <p className="text-[10px] text-slate-500">All created by students with zero prior design background</p>
                    </div>
                  </div>

                  <a 
                    href="#renders-gallery"
                    className="text-xs font-black text-orange-600 hover:text-orange-700 underline shrink-0"
                  >
                    View All 25 →
                  </a>
                </div>

              </div>

              {/* ─────────────────────────────────────────────────────────────
                  RIGHT COLUMN: HIGH-CONVERTING SHOPIFY BUY BOX (5 COLS)
              ───────────────────────────────────────────────────────────── */}
              <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-5 sm:p-7 relative overflow-hidden">
                
                {/* Top Subtle Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Vendor / Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                    Official Complete Bundle
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <Flame size={12} className="text-red-500" />
                    High In-Demand
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-900 tracking-tight leading-snug mb-2">
                  The Complete 12-in-1 Architecture & 3D Interior Render Money-Maker Bundle
                </h1>

                {/* Pushy Subtitle */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-3">
                  The copy-paste system 52,480+ Indian designers use to <strong className="text-slate-900 font-bold">earn ₹50,000 to ₹1,50,000/month from home</strong> creating 4K renders in under 2 hours — even with <strong className="text-orange-600 font-bold">ZERO prior experience!</strong>
                </p>

                {/* Star Rating & Social Proof */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 flex-wrap">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-black text-slate-900">4.9 / 5.0</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-bold text-slate-500 underline decoration-slate-300 cursor-pointer">
                    1,842 Verified Student Reviews
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                    <CheckCircle2 size={12} /> 99% Recommended
                  </span>
                </div>

                {/* High-Impact Price Anchor */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 mb-4">
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-display font-black text-slate-900">
                      ₹{finalPrice}
                    </span>
                    <span className="text-base text-slate-400 line-through font-bold">
                      ₹{BUNDLE_ORIGINAL_PRICE.toLocaleString('en-IN')}
                    </span>
                    <span className="bg-red-500 text-white font-black text-xs px-2.5 py-0.5 rounded-full shadow-xs animate-pulse">
                      SAVE 92% (₹{(BUNDLE_ORIGINAL_PRICE - finalPrice).toLocaleString('en-IN')} OFF)
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 flex items-center justify-between">
                      <span>✓ Coupon <strong>{appliedCoupon}</strong> Applied ({discountPercent}% Discount)</span>
                      <button 
                        onClick={() => {
                          setAppliedCoupon(null);
                          setDiscountPercent(0);
                        }}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <Check size={13} className="text-emerald-600 font-bold" />
                    <span>One-time investment • Lifetime Google Drive Access • No recurring fees</span>
                  </p>
                </div>

                {/* Scarcity Bar & Live Flip Timer */}
                <div className="space-y-2 mb-4 bg-orange-50/70 border border-orange-200 rounded-2xl p-3.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-red-700 flex items-center gap-1">
                      <Flame size={14} className="fill-red-600 text-red-600" />
                      Only 6 Licenses Left at ₹999 for Today's Batch!
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">94% Claimed</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-orange-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-[94%]" />
                  </div>

                  {/* Countdown Timer */}
                  <div className="flex items-center justify-between pt-2 border-t border-orange-200/60 text-xs">
                    <span className="text-slate-700 font-medium">Flash Price Expires In:</span>
                    <div className="flex items-center gap-1 font-mono font-black text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-orange-200 text-xs">
                      <Clock size={12} className="text-orange-600" />
                      <span>{formatTime(timeLeft.h)}h</span>:<span>{formatTime(timeLeft.m)}m</span>:<span>{formatTime(timeLeft.s)}s</span>
                    </div>
                  </div>
                </div>

                {/* Shopify Variant Selector (Card) */}
                <div className="mb-4">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Select Access Package:
                  </label>

                  <div className="border-2 border-orange-500 bg-orange-50/40 rounded-2xl p-3.5 relative shadow-xs">
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-[9px] uppercase px-2.5 py-0.5 rounded-bl-xl tracking-wider">
                      RECOMMENDED • BEST VALUE
                    </div>
                    
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-4 border-orange-500 bg-white shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                            Complete 12-Course Mega Bundle + 6 VIP Bonuses
                          </h4>
                          <span className="text-[11px] text-emerald-700 font-semibold">
                            Full Lifetime License
                          </span>
                        </div>
                      </div>
                      <span className="font-display font-black text-slate-900 text-base sm:text-lg">
                        ₹{finalPrice}
                      </span>
                    </div>

                    <ul className="text-[11px] text-slate-600 space-y-1 pl-6">
                      <li className="flex items-center gap-1.5">
                        <Check size={12} className="text-emerald-600" /> All 12 Software Courses (AutoCAD, Revit, SketchUp, 3ds Max, V-Ray, D5, AI)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check size={12} className="text-emerald-600" /> 10,000+ Ready 3D Models & 5,000+ 4K PBR Textures
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check size={12} className="text-emerald-600" /> Indian Client Quotation & Contract Scripts + ISO Certificate
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check size={12} className="text-emerald-600" /> 24/7 Dedicated WhatsApp Support Team
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Coupon Code Pill */}
                <div className="mb-4 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setShowCouponModal(true)}
                    className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-bold"
                  >
                    <Tag size={13} />
                    <span>Have a VIP Coupon Code? Tap to apply</span>
                  </button>
                  <span className="text-[10px] text-slate-400 font-mono">e.g. EARN10 / SPECIAL50</span>
                </div>

                {/* Primary Action Buttons (Shopify Style) */}
                <div className="space-y-2.5 mb-5">
                  {/* Direct Buy Now */}
                  <button
                    onClick={openPaymentModal}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-display font-black text-base sm:text-lg shadow-xl shadow-orange-500/35 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group pulse-glow"
                  >
                    <Zap size={20} className="fill-white shrink-0 animate-bounce" />
                    <span>⚡ GET INSTANT ACCESS NOW — ₹{finalPrice}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>

                  {/* Add to Cart */}
                  <button
                    onClick={() => setShowCartDrawer(true)}
                    className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Cart & View Free Bonuses</span>
                  </button>
                </div>

                {/* Shopify Trust Badges */}
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-[11px] font-bold text-slate-600">
                    <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                      <span>Razorpay Verified UPI / Card</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <Download size={14} className="text-emerald-600 shrink-0" />
                      <span>Instant 60s Google Drive Link</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <Award size={14} className="text-emerald-600 shrink-0" />
                      <span>Verified Skill Certificate</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <MessageCircle size={14} className="text-emerald-600 shrink-0" />
                      <span>24/7 WhatsApp VIP Support</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-center text-slate-400">
                    🔒 256-Bit SSL Encrypted Checkout • Supported: GPay, PhonePe, Paytm, BHIM, Cards & NetBanking
                  </p>
                </div>

                {/* ─── SHOPIFY COLLAPSIBLE ACCORDIONS INSIDE BUY BOX ─── */}
                <div className="mt-5 pt-4 border-t border-slate-200 divide-y divide-slate-200">
                  
                  {/* Accordion 1: What's Included */}
                  <div className="py-2.5">
                    <button
                      onClick={() => toggleAccordion('included')}
                      className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-800"
                    >
                      <span className="flex items-center gap-2">
                        <Layers size={14} className="text-orange-600" />
                        What's Inside Your Instant Download?
                      </span>
                      {accordionOpen.included ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {accordionOpen.included && (
                      <div className="mt-2 text-[11px] text-slate-600 space-y-1.5 pl-6 animate-[fadeIn_0.2s_ease]">
                        <p>• All 12 Full Masterclasses (AutoCAD, Revit, SketchUp, 3ds Max, V-Ray, Lumion, D5, Enscape, AI Midjourney, Stable Diffusion, Unreal 5, Photoshop)</p>
                        <p>• 10,000+ Ready 3D Models (Kitchens, Sofas, Beds, Mandirs)</p>
                        <p>• 5,000+ 4K PBR Realistic Textures</p>
                        <p>• Lifetime Updates + Safe Software Download Guides</p>
                      </div>
                    )}
                  </div>

                  {/* Accordion 2: How You Will Earn */}
                  <div className="py-2.5">
                    <button
                      onClick={() => toggleAccordion('earn')}
                      className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-800"
                    >
                      <span className="flex items-center gap-2">
                        <DollarSign size={14} className="text-emerald-600" />
                        How Easily You Will Make ₹50k-₹1.5L/Month?
                      </span>
                      {accordionOpen.earn ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {accordionOpen.earn && (
                      <div className="mt-2 text-[11px] text-slate-600 space-y-1.5 pl-6 animate-[fadeIn_0.2s_ease]">
                        <p>• In India, a single 3BHK 3D render walkthrough commands <strong className="text-slate-900">₹25,000 to ₹40,000</strong> from interior firms and builders.</p>
                        <p>• Using our 10,000+ drag-and-drop assets, you can assemble luxury rooms in 2 hours without starting from zero.</p>
                        <p>• We include complete Indian quotation scripts and contracts to demand 50% advances with zero client resistance.</p>
                      </div>
                    )}
                  </div>

                  {/* Accordion 3: Specs & Hardware */}
                  <div className="py-2.5">
                    <button
                      onClick={() => toggleAccordion('specs')}
                      className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-800"
                    >
                      <span className="flex items-center gap-2">
                        <Laptop size={14} className="text-blue-600" />
                        System Requirements & Software Links
                      </span>
                      {accordionOpen.specs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {accordionOpen.specs && (
                      <div className="mt-2 text-[11px] text-slate-600 space-y-1.5 pl-6 animate-[fadeIn_0.2s_ease]">
                        <p>• Runs on ordinary laptops and desktop PCs. We cover both lightweight tools (AutoCAD, SketchUp, Photoshop) and real-time GPU renderers.</p>
                        <p>• We provide complimentary software installation guides and verified download links so you never have to struggle.</p>
                      </div>
                    )}
                  </div>

                  {/* Accordion 4: 7-Day Guarantee */}
                  <div className="py-2.5">
                    <button
                      onClick={() => toggleAccordion('guarantee')}
                      className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-800"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-emerald-600" />
                        100% Risk-Free 7-Day Money-Back Guarantee
                      </span>
                      {accordionOpen.guarantee ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {accordionOpen.guarantee && (
                      <div className="mt-2 text-[11px] text-slate-600 space-y-1 pl-6 animate-[fadeIn_0.2s_ease]">
                        <p>We stand behind our course quality 100%. If you face any technical difficulties accessing course links that our support team cannot resolve within 7 days, you receive a full 100% refund.</p>
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ═══ 3. THE "EFFORTLESS MONEY" PARADIGM & FREELANCE WEALTH ═══ */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-white via-amber-50/30 to-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-red-100 border border-red-300 text-red-700 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <Flame size={13} className="fill-red-600" />
              THE DIRTY SECRET OF THE 3D INDUSTRY
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight mb-4">
              Why Freelance 3D Artists Make More Than Senior Engineers Working 10 Hours a Week
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto mb-8 font-medium">
              Here is what offline colleges and institutes will never tell you: <strong className="text-slate-900">Clients don't care how many years you studied or how complicated your software is.</strong> They only care about ONE thing: <span className="text-orange-600 font-black underline decoration-orange-300">Does the 3D render look so real that it sells their flat or villa on the spot?</span>
            </p>

            {/* 3 Pillars of Earning Fast */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left mb-10">
              
              <div className="bg-white border-2 border-slate-200 hover:border-orange-400 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-bold mb-4">
                  🛋️
                </div>
                <h3 className="font-display font-black text-slate-900 text-base md:text-lg mb-2">
                  1. Zero Modeling From Scratch
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pros don't waste 8 hours modeling a sofa or modular kitchen. You simply drag our <strong className="text-slate-900 font-bold">10,000+ pre-made Indian 3D assets</strong> directly into your scene. 80% of the project is done in 20 minutes!
                </p>
              </div>

              <div className="bg-white border-2 border-slate-200 hover:border-orange-400 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-bold mb-4">
                  ⚡
                </div>
                <h3 className="font-display font-black text-slate-900 text-base md:text-lg mb-2">
                  2. 1-Click Photorealism Lighting
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Forget waiting 4 hours for a grainy V-Ray frame. We teach you modern real-time tools like <strong className="text-slate-900 font-bold">D5 Render, Lumion & Enscape</strong> where you see 4K movie lighting immediately while moving your mouse.
                </p>
              </div>

              <div className="bg-white border-2 border-slate-200 hover:border-orange-400 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold mb-4">
                  💰
                </div>
                <h3 className="font-display font-black text-slate-900 text-base md:text-lg mb-2">
                  3. Collect ₹25k - ₹50k Advances
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  When you present clients with a photorealistic 3D walk-in render, their excitement spikes. With our <strong className="text-slate-900 font-bold">Indian Contract & Quotation Templates</strong>, closing 50% upfront token advances is effortless.
                </p>
              </div>

            </div>

            {/* Income Comparison Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-amber-400 text-xs font-black uppercase tracking-wider block mb-1">
                  THE WEALTH MULTIPLIER
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-3">
                  1 Project Pays for This Entire Course 25x Over
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  While most people spend ₹999 on a weekend movie ticket or food delivery with zero return, this one single investment gives you a lifetime money-making skill you can use whenever you need cash.
                </p>

                <button
                  onClick={openPaymentModal}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-display font-black text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
                >
                  <span>Claim Your ₹999 Pass Before Price Jumps to ₹2,999</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ═══ 4. INTERACTIVE EARNINGS & ROI CALCULATOR ═══ */}
        <div id="income-calculator">
          <IncomeCalculator onEnroll={openPaymentModal} />
        </div>

        {/* ═══ 5. THE 4 PAIN POINTS STOPPING 95% OF DESIGNERS ═══ */}
        <section className="py-14 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                ⚠️ ARE YOU DEALING WITH THIS FRUSTRATION?
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                4 Brutal Realities Keeping 95% of Designers Underpaid
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                If you relate to even one of these situations, you are leaving lakhs of rupees on the table every month:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PAIN_TRIGGERS_INDIAN.map((item, idx) => (
                <div key={idx} className="bg-red-50/50 border border-red-200/80 hover:border-red-400 rounded-3xl p-5 sm:p-6 transition-all shadow-xs flex items-start gap-4">
                  <span className="text-3xl shrink-0 p-2.5 bg-white rounded-2xl shadow-sm border border-red-100">{item.emoji}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base md:text-lg mb-1.5 leading-snug">{item.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══ 6. THE 5-STEP TURNKEY STUDIO PIPELINE ═══ */}
        <section className="py-14 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
                📐 THE AVADA 5-STEP PIPELINE
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                The 5-Step Process You Will Master in 30 Days
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                From initial 2D sketch to collecting the final client cheque with 100% confidence:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-10">
              {[
                { step: '01', title: 'PLAN', tool: 'AutoCAD & Revit', desc: 'Draft sanction floor plans & electrical layouts with pro shortcut keys.' },
                { step: '02', title: 'DESIGN', tool: 'SketchUp Pro', desc: 'Pull walls, false ceilings & modular kitchens in minutes with pre-made models.' },
                { step: '03', title: '3D MODEL', tool: '3ds Max', desc: 'Custom luxury furniture, detailed fabrics, and complex parametric elevations.' },
                { step: '04', title: 'RENDER', tool: 'D5, V-Ray, Lumion', desc: 'Master realistic sun lighting, 4K marble textures & 60fps walkthroughs.' },
                { step: '05', title: 'AI & PRESENT', tool: 'Midjourney & SD', desc: 'Generate 50 instant concepts on spot and close advance tokens effortlessly.' },
              ].map((s, i) => (
                <div key={i} className="bg-white border-2 border-slate-200 hover:border-orange-400 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md inline-block mb-2">
                      STEP {s.step}
                    </span>
                    <h3 className="font-display font-black text-slate-900 text-lg mb-1">{s.title}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">{s.tool}</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══ 7. WHO IS THIS 12-COURSE BUNDLE FOR? ═══ */}
        <section className="py-14 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                🎯 WHO SHOULD ENROLL TODAY?
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                Tailored for Anyone Who Wants to Design Spaces & Make Serious Income
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHO_IS_THIS_FOR.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border-2 border-slate-200 hover:border-orange-400 rounded-3xl p-6 transition-all shadow-xs hover:shadow-xl flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl p-2 bg-white rounded-2xl shadow-xs border border-slate-200">{item.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full border border-orange-200">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-slate-900 text-base md:text-lg mb-2">{item.role}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{item.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>✓ 100% Ideal For You</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══ 8. PROOF OF WORK: ALL 25 STUDENT RENDERS GALLERY ═══ */}
        <RenderProofWall onEnroll={openPaymentModal} />

        {/* ═══ 9. ALL 12 MASTERCLASSES DETAILED BREAKDOWN ═══ */}
        <section className="py-14 md:py-20 bg-white border-b border-slate-200" id="whats-included">
          <div className="max-w-5xl mx-auto px-4">
            
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
                📚 12 FULL MASTERCLASSES
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                Everything Included in Your Single ₹999 Access Pass
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                No need to spend ₹4,999 on each software separately. You get full lifetime access to all 12:
              </p>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                {['All', 'Planning', '3D Modeling', 'Photorealism', 'AI & Unreal'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveCategoryTab(tab);
                      trackSearch({
                        search_string: tab,
                        content_category: 'Course Category Filter'
                      });
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeCategoryTab === tab
                        ? 'bg-orange-500 text-white shadow-md scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab} ({tab === 'All' ? '12' : tab === 'Planning' ? '2' : tab === '3D Modeling' ? '3' : tab === 'Photorealism' ? '4' : '3'})
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {filteredCourses.map((c) => (
                <div key={c.id} className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-400 transition-all flex flex-col justify-between group">
                  <div>
                    {/* Course Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                        {c.software}
                      </div>
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                        {c.students} Learners
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display font-black text-slate-900 text-base md:text-lg">{c.title}</h3>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">₹{c.price} Val</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3 line-clamp-2">{c.description}</p>

                      <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-3">
                        {c.learningPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                            <CheckCircle size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-2 text-center text-[11px] font-bold text-orange-800 flex items-center justify-center gap-1.5">
                      <CheckCircle2 size={13} className="text-orange-600" />
                      <span>Full Lifetime Access Included in ₹999</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══ 10. 6 MASSIVE FREE BONUSES (WORTH ₹38,000 INCLUDED FREE) ═══ */}
        <section className="py-14 md:py-20 bg-amber-50/50 border-b border-orange-200/80">
          <div className="max-w-5xl mx-auto px-4">
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
                <Gift size={14} /> FREE GIFTS WITH TODAY'S BATCH
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-2">
                Unlock 6 Exclusive Super-Bonuses (Worth ₹38,000) for ₹0
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                Everything you need to drag-and-drop your way to fast freelance earnings:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {FREE_BONUSES.map((b) => (
                <div key={b.id} className="bg-white border-2 border-orange-200/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{b.icon}</span>
                      <div className="text-right">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full block mb-0.5">{b.badge}</span>
                        <span className="text-xs font-bold text-slate-400 line-through">{b.worth}</span>
                        <span className="text-xs font-black text-emerald-600 ml-1">FREE</span>
                      </div>
                    </div>

                    <h3 className="font-display font-black text-slate-900 text-base md:text-lg mb-2">{b.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{b.desc}</p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                    <Check size={14} className="text-emerald-600 stroke-[3]" />
                    <span>Included Free with ₹999 Enrollment</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner with 10k assets preview */}
            <div className="max-w-3xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img src="/banner-2.jpg" alt="10k 3D Assets Pack" className="w-full h-auto object-cover" />
            </div>

          </div>
        </section>

        {/* ═══ 11. OLD WAY vs AVADA PRO 3D WAY (CONTRAST TABLE) ═══ */}
        <section className="py-14 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
                ⚡ VALUE COMPARISON
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                ₹999 vs ₹1,50,000 Coaching Institute — Which Makes More Sense?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Old Way */}
              <div className="bg-red-50/50 border-2 border-red-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 text-red-600 font-display font-black text-lg md:text-xl border-b border-red-200 pb-3">
                  <X size={24} className="p-1 bg-red-100 rounded-full text-red-600" />
                  <span>Overpriced Institutes & Random YouTube</span>
                </div>
                <ul className="space-y-4 text-xs md:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>Institutes charging ₹50,000 - ₹1,50,000 for outdated 2014 theory</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>Scattered YouTube videos with no support when V-Ray crashes at 95%</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>No 3D furniture models; spending 6 hours modeling a single bed</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>No client contract templates; getting underpaid or ghosted by clients</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>Ignoring AI and slowly losing freelance gigs to faster 3D artists</span>
                  </li>
                </ul>
              </div>

              {/* Avada Way */}
              <div className="bg-emerald-50/50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  HIGH-EARNING PRO METHOD
                </div>
                <div className="flex items-center gap-2.5 mb-6 text-emerald-800 font-display font-black text-lg md:text-xl border-b border-emerald-200 pb-3">
                  <CheckCircle2 size={24} className="p-1 bg-emerald-200 rounded-full text-emerald-800" />
                  <span>The Avada PRO 3D Turnkey System</span>
                </div>
                <ul className="space-y-4 text-xs md:text-sm text-slate-800 font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>30-Day Step-by-Step Flow:</strong> AutoCAD → SketchUp → V-Ray → D5 → AI</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>24/7 WhatsApp Team Help:</strong> Never get stuck on bugs or glitches</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>10,000+ Ready Assets:</strong> Drag and drop modular kitchens and decor</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Indian Client Proposal Templates:</strong> Demand 50% advance tokens</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Full Lifetime Access for ₹999:</strong> Pays back on your first render!</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* ═══ 12. VERIFIED CUSTOMER REVIEWS (SHOPIFY UGC FORMAT) ═══ */}
        <section className="py-14 md:py-20 bg-slate-50 border-b border-slate-200" id="reviews">
          <div className="max-w-5xl mx-auto px-4">
            
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
                💬 1,842 VERIFIED INDIAN BUYER REVIEWS
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                Real Students Making Real Money in Mumbai, Delhi, Bengaluru & More
              </h2>
            </div>

            {/* Featured Transformation Stories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {TRANSFORMATION_STORIES.map((s, idx) => (
                <div key={idx} className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-orange-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-bold flex items-center justify-center text-base shadow-sm">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm md:text-base">{s.name}</h3>
                          <span className="text-[11px] text-slate-500 font-medium">{s.role} • {s.city}</span>
                        </div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-200">
                        {s.incomeIncrease}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs md:text-sm my-3">
                      <p className="text-slate-500 bg-slate-50 p-2.5 rounded-xl"><strong className="text-slate-700">Before:</strong> {s.before}</p>
                      <p className="text-slate-800 bg-orange-50/70 p-2.5 rounded-xl border border-orange-100"><strong className="text-orange-700">After:</strong> {s.after}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-amber-400" />)}
                    </div>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle size={13} /> Verified Buyer
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick reviews grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TESTIMONIALS_LANDING.slice(0, 4).map((t, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between text-xs">
                  <div>
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-400" />)}
                    </div>
                    <p className="text-slate-700 italic leading-relaxed mb-3">"{t.content}"</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="font-bold text-slate-900 block truncate">{t.name}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{t.role} • {t.location}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mentors Preview */}
            <div className="max-w-2xl mx-auto mt-10 text-center">
              <div className="rounded-2xl border border-slate-200 shadow-lg bg-white p-3">
                <img src="/renders/mentors.png" alt="Mentors and Certifications" className="w-full h-auto object-contain" />
              </div>
            </div>

          </div>
        </section>

        {/* ═══ 13. GRAND SLAM VALUE STACK (SHOPIFY ORDER BREAKDOWN) ═══ */}
        <section className="py-14 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4">
            
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
                🎁 COMPLETE VALUE BREAKDOWN
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                Everything Included In Your Instant Download
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Total combined catalog value: <strong>₹54,988</strong>
              </p>
            </div>

            <div className="bg-slate-50 border-2 border-slate-300 rounded-3xl overflow-hidden shadow-2xl">
              <div className="divide-y divide-slate-200 text-xs sm:text-sm font-medium">
                {VALUE_STACK_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3 bg-white hover:bg-orange-50/40 transition-colors">
                    <div className="flex items-center gap-2.5 text-slate-800 pr-2">
                      <CheckCircle2 size={15} className="text-orange-500 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-500 font-mono shrink-0">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Total Order Summary */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Catalog Value If Purchased Separately</p>
                <p className="text-2xl font-bold text-slate-400 line-through mb-2">₹54,988</p>
                
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-slate-400 text-sm font-bold">Today's Special Rate:</span>
                  <span className="text-4xl sm:text-5xl font-display font-black text-amber-400">₹{finalPrice}</span>
                  <span className="text-emerald-400 text-xs font-bold uppercase">(Save ₹{(54988 - finalPrice).toLocaleString('en-IN')})</span>
                </div>

                <button
                  onClick={openPaymentModal}
                  className="w-full max-w-md mx-auto py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-display font-black text-base sm:text-lg shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  <span>Get Instant Access to Everything (@ ₹{finalPrice})</span>
                </button>
                <p className="text-[10px] text-slate-400 mt-2.5">⚡ Instant Google Drive Link Delivered to Your Email & WhatsApp</p>
              </div>
            </div>

          </div>
        </section>

        {/* ═══ 14. FREQUENTLY ASKED QUESTIONS ═══ */}
        <section className="py-14 md:py-20 bg-slate-50 border-b border-slate-200" id="faq">
          <div className="max-w-3xl mx-auto px-4">
            
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
                ❓ FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                Everything You Need to Know
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS_LANDING.map((faq, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 text-xs sm:text-base gap-3"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180 text-orange-500' : ''}`} />
                  </button>
                  {openFaqIndex === i && (
                    <div className="px-4 sm:px-5 pb-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══ 15. FINAL CLOSING URGENCY CTA ═══ */}
        <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="max-w-3xl mx-auto px-4 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-full text-xs font-black uppercase tracking-wider mb-3 animate-pulse">
              ⏰ BATCH CLOSING SOON
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white leading-tight mb-4">
              Don't Spend Another Year Wishing You Had Learned 3D & AI Renders
            </h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-xl mx-auto mb-8">
              For less than the price of a single restaurant dinner, you get all 12 courses, 10,000+ 3D assets, Indian quotation kits, and 24/7 dedicated WhatsApp support.
            </p>

            <button
              onClick={openPaymentModal}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-display font-black text-lg sm:text-xl shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
            >
              <Zap size={22} className="fill-white" />
              <span>CLAIM YOUR ALL-ACCESS PASS NOW (₹{finalPrice})</span>
              <ArrowRight size={22} />
            </button>
            <p className="text-[11px] text-slate-400 mt-3">⚡ Immediate Google Drive Access • 7-Day Money-Back Guarantee</p>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-black text-slate-400 py-10 pb-28 px-4 text-center text-xs border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Logo />
          <p className="text-slate-500 text-[11px] mt-4 mb-4">
            © 2026 Avada 3D Architecture Store. All rights reserved. Helping 52,000+ Indian designers succeed.
          </p>
          <div className="flex justify-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <a href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</a>
            <span>•</span>
            <a 
              href="https://wa.me/918545015333" 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => trackContact({ content_name: 'WhatsApp Footer Support Link', content_category: 'Customer Support' })}
              className="hover:text-white transition-colors"
            >
              24/7 WhatsApp Support
            </a>
          </div>
        </div>
      </footer>

      {/* ═══ WHATSAPP FLOATING BUTTON ═══ */}
      <a 
        href="https://wa.me/918545015333?text=Hi%20Avada%20Team%2C%20I%20have%20a%20question%20about%20the%2012-Course%20Architecture%20Bundle" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={() => trackContact({ content_name: 'WhatsApp Floating Button', content_category: 'Customer Support' })}
        className="fixed bottom-20 right-4 z-[75] flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black px-3.5 py-2.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
        style={{ boxShadow: '0 8px 24px rgba(37,211,102,0.45)' }}
      >
        <MessageCircle size={18} className="fill-white" />
        <span className="hidden sm:inline">24/7 WhatsApp Support</span>
      </a>

      {/* ═══ SHOPIFY STICKY BOTTOM BUY BAR ═══ */}
      <div className={`fixed bottom-0 left-0 right-0 z-[70] transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white/98 backdrop-blur-2xl border-t border-slate-200 shadow-[0_-4px_25px_rgba(0,0,0,0.15)] px-4 py-2.5 flex items-center justify-between gap-3 max-w-5xl mx-auto">
          
          <div className="flex items-center gap-3">
            <img src="/banner-1.jpg" alt="Mini Bundle" className="w-10 h-10 rounded-lg object-cover border border-slate-200 hidden sm:block" />
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-slate-400 line-through font-bold">₹{BUNDLE_ORIGINAL_PRICE.toLocaleString('en-IN')}</span>
                <span className="text-xl font-display font-black text-slate-900">₹{finalPrice}</span>
                <span className="bg-red-100 text-red-600 font-bold text-[9px] px-1.5 py-0.2 rounded">92% OFF</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                <span>Ends In:</span>
                <span className="font-black text-orange-600">{formatTime(timeLeft.h)}:{formatTime(timeLeft.m)}:{formatTime(timeLeft.s)}</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-bold hidden xs:inline">Instant Download</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCartDrawer(true)}
              className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors hidden sm:flex"
              title="View Cart"
            >
              <ShoppingBag size={18} />
            </button>
            
            <button
              onClick={openPaymentModal}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs sm:text-sm py-3 px-5 sm:px-6 rounded-xl shadow-md shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Zap size={14} className="fill-white shrink-0" />
              <span>BUY NOW — ₹{finalPrice}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══ SHOPIFY SLIDE-OUT CART DRAWER ═══ */}
      <ShopifyCartDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
        onCheckout={openPaymentModal}
        appliedCoupon={appliedCoupon}
        discountPercent={discountPercent}
        finalPrice={finalPrice}
        onOpenCoupon={() => {
          setShowCartDrawer(false);
          setShowCouponModal(true);
        }}
      />

      {/* ═══ SHOPIFY COUPON MODAL ═══ */}
      <CouponModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onApplyCoupon={(code) => applyCouponCodeDirect(code)}
        currentCoupon={appliedCoupon}
        discountPercent={discountPercent}
      />

      {/* ═══ EXIT-INTENT MODAL ═══ */}
      {showExitModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8 text-center border-2 border-orange-400 overflow-hidden">
            <button 
              onClick={() => setShowExitModal(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl shadow-inner">
              ⚠️
            </div>

            <span className="bg-red-100 text-red-600 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Wait! Don't Miss Out
            </span>

            <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 mt-2 mb-2">
              Wait! This ₹999 Offer Won't Be Available Again
            </h3>

            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-5">
              Over <strong className="text-slate-900">52,480+ Indian designers</strong> are already using this 12-course bundle to earn ₹50,000+/month. If you close this page now, the batch price will increase back to <strong className="text-red-600 font-bold">₹2,999</strong>!
            </p>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 mb-5 text-left text-xs text-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle size={14} className="text-orange-500 shrink-0" />
                <span>Instant Google Drive Delivery in 60 Secs</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle size={14} className="text-orange-500 shrink-0" />
                <span>24/7 Dedicated WhatsApp Support Team</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle size={14} className="text-orange-500 shrink-0" />
                <span>Official Skill Certificate Included</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setShowExitModal(false);
                  trackLead({
                    content_name: 'Exit Intent Discount Claimed',
                    content_category: 'Exit Offer',
                    value: finalPrice,
                    currency: 'INR'
                  });
                  openPaymentModal();
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-display font-black text-sm md:text-base shadow-lg shadow-orange-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Zap size={16} className="fill-white" />
                <span>Lock My ₹{finalPrice} Access Now</span>
              </button>

              <button
                onClick={() => setShowExitModal(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold py-1 transition-colors"
              >
                No thanks, I will pay full price later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ RAZORPAY CHECKOUT MODAL ═══ */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-3 sm:p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => !isLoading && setShowPaymentModal(false)} />
          
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] animate-[fadeIn_0.25s_ease-out] z-10 border border-slate-200">
            
            <button 
              onClick={() => !isLoading && setShowPaymentModal(false)} 
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-1">
                  <Sparkles size={12} className="fill-amber-400" /> Complete 12-Course Architecture Pass
                </div>
                <h3 className="text-xl font-display font-black text-white">Avada PRO 3D Architecture Bundle</h3>
                
                <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-display font-black text-white">₹{finalPrice}</span>
                    <span className="text-slate-400 text-sm line-through">₹{BUNDLE_ORIGINAL_PRICE.toLocaleString('en-IN')}</span>
                    <span className="bg-orange-500/20 text-orange-300 text-xs font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
                      92% OFF
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 bg-black/40 border border-white/10 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold text-white shadow-xs">
                    <Timer size={12} className="text-amber-400 animate-pulse" />
                    <span>{formatTime(timeLeft.h)}h</span>
                    <span className="text-white/40">:</span>
                    <span>{formatTime(timeLeft.m)}m</span>
                    <span className="text-white/40">:</span>
                    <span>{formatTime(timeLeft.s)}s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              
              {/* Feature Chips */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-[10px] xs:text-[11px] font-bold text-slate-700">
                {[
                  '12 Software Courses', 
                  '10,000+ 3D Models', 
                  'Skill Certificate', 
                  '24/7 WhatsApp Help'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-slate-50 py-2 px-2.5 rounded-xl border border-slate-200/80 shadow-2xs whitespace-nowrap">
                    <CheckCircle2 size={13} className="text-orange-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
                
                <div className="flex items-center justify-center gap-2 bg-emerald-50 py-2.5 px-3 rounded-xl border-2 border-emerald-400 text-emerald-900 font-bold col-span-2 shadow-xs whitespace-nowrap">
                  <Download size={14} className="text-emerald-600 shrink-0" />
                  <span className="text-[11px] xs:text-xs">Direct Software Download Links Included</span>
                </div>
              </div>

              {/* Live Form Inputs */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    E-mail (For Instant Access Link)
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border ${emailError ? 'border-red-500 bg-red-50' : 'border-slate-300'} rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                    />
                  </div>
                  {emailError && <p className="text-red-500 text-[10px] font-bold mt-1">Please enter a valid email address</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    WhatsApp Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">+91</span>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => { 
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length > 10 && val.startsWith('91')) {
                          val = val.slice(2);
                        }
                        setPhone(val.slice(0, 10)); 
                        setPhoneError(false); 
                      }}
                      className={`w-full pl-12 pr-4 py-2.5 bg-slate-50 border ${phoneError ? 'border-red-500 bg-red-50' : 'border-slate-300'} rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                    />
                  </div>
                  {phoneError && <p className="text-red-500 text-[10px] font-bold mt-1">Please enter a valid 10-digit mobile number</p>}
                </div>
              </div>

              {/* Coupon Section */}
              {!showCouponInput && !appliedCoupon ? (
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => setShowCouponInput(true)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <Sparkles size={13} />
                    Have a coupon code?
                  </button>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs font-semibold text-emerald-800">
                      <span>Coupon <strong>{appliedCoupon}</strong> Applied! ({discountPercent}% OFF)</span>
                      <button
                        onClick={() => {
                          setAppliedCoupon(null);
                          setDiscountPercent(0);
                          setCouponCode('');
                        }}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Coupon Code</span>
                        <button onClick={() => setShowCouponInput(false)} className="text-[10px] text-slate-400">Cancel</button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. EARN10"
                          value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(null); }}
                          className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold uppercase"
                        />
                        <button
                          onClick={() => applyCouponCodeDirect(couponCode)}
                          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && <p className="text-red-500 text-[10px] font-bold mt-1">{couponError}</p>}
                    </div>
                  )}
                </div>
              )}

              {paymentError && (
                <p className="text-red-600 text-xs bg-red-50 border border-red-200 p-2.5 rounded-xl text-center mb-3 font-medium">
                  {paymentError}
                </p>
              )}

              {/* Razorpay Action Button */}
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-display font-black text-base md:text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-60"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin" size={18} /> Processing...</>
                ) : (
                  <>
                    <Zap size={18} className="fill-white" />
                    <span>Proceed to Pay ₹{finalPrice}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-slate-400">
                <Lock size={11} /> 256-Bit SSL Encrypted Razorpay Checkout
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ PAYMENT SUCCESS OVERLAY ═══ */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease]">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full text-center shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={36} className="text-emerald-600 stroke-[3]" />
            </div>

            <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-1">Payment Successful!</h2>
            <p className="text-slate-500 text-xs md:text-sm mb-6">
              Welcome to the Avada PRO 3D Architecture Family! Your access is active.
            </p>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-orange-600" />
                <h3 className="font-bold text-slate-900 text-sm md:text-base">Instant Google Drive Course Folder:</h3>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Click the button below to start learning directly on Google Drive (bookmark this link):
              </p>
              <a
                href="https://drive.google.com/drive/folders/1CCyv9u82HiYI8jnyULISfBoGMcbcqd9U?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl text-center shadow-md transition-colors text-xs md:text-sm"
              >
                🚀 Open 12 Courses on Google Drive
              </a>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-6">
              <span>Payment ID: <strong className="font-mono">{paymentSuccess}</strong></span>
              <a href="https://wa.me/918545015333" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold">
                WhatsApp Help
              </a>
            </div>

            <button
              onClick={() => setPaymentSuccess(null)}
              className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-sm transition-all"
            >
              Close & Start Designing
            </button>
          </div>
        </div>
      )}

      {/* Social proof animated popups */}
      <SocialProofToast />
    </div>
  );
};

export default LandingPage;
