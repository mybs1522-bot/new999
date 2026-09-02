import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Star, CheckCircle, CheckCircle2, X, ChevronDown, Sparkles, 
  Eye, Download, Phone, Mail, Lock, Loader2, Timer, Check, ShieldCheck, 
  Zap, Flame, Award, Gift, DollarSign, MessageCircle
} from 'lucide-react';
import { COURSES, BUNDLE_PRICE, BUNDLE_ORIGINAL_PRICE } from '../constants';
import { openRazorpayCheckout } from '../services/razorpay';
import {
  Logo, SocialProofToast,
  PAIN_TRIGGERS_INDIAN, SOLUTION_PILLARS, WHO_IS_THIS_FOR, TRANSFORMATION_STORIES,
  FREE_BONUSES, VALUE_STACK_ITEMS, TESTIMONIALS_LANDING, FAQ_ITEMS_LANDING,
  PAGE_PREVIEWS_ROW1, PAGE_PREVIEWS_ROW2
} from './LandingHelpers';

/* ─── REUSABLE CTA WITH TIMER ─── */
const CtaWithTimer = ({ 
  timeLeft, 
  onClick, 
  variant = 'orange', 
  title = 'Download All 12 Courses + 6 Free Bonuses',
  subtext = 'Instant Google Drive Access • 24/7 WhatsApp Support • Software Links Included'
}: { 
  timeLeft: { h: number; m: number; s: number }; 
  onClick: () => void; 
  variant?: 'orange' | 'dark' | 'white';
  title?: string;
  subtext?: string;
}) => {
  const f = (v: number) => v.toString().padStart(2, '0');
  const bgClass = variant === 'dark'
    ? 'bg-slate-900 border border-slate-800 text-white'
    : variant === 'white'
    ? 'bg-white border-2 border-orange-200 shadow-xl'
    : 'bg-gradient-to-b from-orange-50/90 to-amber-50/90 border-2 border-orange-300 shadow-xl';

  return (
    <div className={`${bgClass} rounded-3xl p-5 md:p-8 relative overflow-hidden max-w-xl mx-auto text-center`}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-3 md:gap-4">
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white rounded-full text-[11px] md:text-xs font-black uppercase tracking-wider animate-pulse shadow-sm">
          <Flame size={13} className="fill-white" />
          <span>Special Offer — ₹999 Price Ending Soon</span>
        </div>

        {/* Countdown Flip Units */}
        <div className="flex items-center justify-center gap-1.5">
          {[
            { val: f(timeLeft.h), label: 'HOURS' },
            { val: f(timeLeft.m), label: 'MINUTES' },
            { val: f(timeLeft.s), label: 'SECONDS' }
          ].map((unit, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div className="bg-slate-900 text-white font-mono font-black text-base md:text-xl px-3 py-1.5 rounded-xl shadow-inner border border-slate-700 min-w-[44px] md:min-w-[52px]">
                  {unit.val}
                </div>
                <span className="text-[8px] font-bold text-slate-500 tracking-wider mt-1">{unit.label}</span>
              </div>
              {i < 2 && <span className="text-lg font-black text-orange-500 mb-4">:</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Pricing Anchor */}
        <div className="flex items-center justify-center gap-2 md:gap-3 my-0.5">
          <span className="text-slate-400 line-through text-sm md:text-base font-bold">₹{BUNDLE_ORIGINAL_PRICE.toLocaleString('en-IN')}</span>
          <span className="text-slate-400 line-through text-sm md:text-base font-bold">₹2,999</span>
          <span className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight">₹{BUNDLE_PRICE}</span>
          <span className="bg-emerald-100 text-emerald-700 border border-emerald-300 text-[10px] md:text-xs font-black px-2 py-0.5 rounded-full">92% OFF</span>
        </div>

        {/* Large Action Button */}
        <button
          onClick={onClick}
          className="w-full py-4 md:py-5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-display font-black text-base md:text-xl shadow-lg shadow-orange-500/35 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 md:gap-3 group premium-stroke"
        >
          <Zap size={20} className="fill-white shrink-0 animate-bounce" />
          <span>{title}</span>
          <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform shrink-0" />
        </button>

        {/* Money-Back Guarantee Risk-Reversal Badge */}
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-300/80 text-emerald-800 text-[11px] md:text-xs font-bold py-1 px-3 rounded-full shadow-xs">
          <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
          <span>100% Risk-Free • 7-Day Money-Back Guarantee</span>
        </div>

        {/* Trust Points */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[10px] md:text-xs font-medium text-slate-600">
          <span className="inline-flex items-center gap-1"><ShieldCheck size={13} className="text-emerald-600" /> Razorpay Secure UPI/Card</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-600" /> Instant Google Drive Link</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1"><Award size={13} className="text-emerald-600" /> Skill Certificate</span>
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const D = (3 * 3600 + 36 * 60 + 20) * 1000, r = D - (Date.now() % D);
    return { h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) };
  });

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [calculatorProjects, setCalculatorProjects] = useState<number>(2);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('All');
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasShownExitModal, setHasShownExitModal] = useState(false);

  // Payment modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
  const [studentCount, setStudentCount] = useState(52480);

  // Coupon states
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const finalPrice = Math.round(BUNDLE_PRICE * (1 - discountPercent / 100));

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Timer Tick
  useEffect(() => {
    const calc = () => {
      const D = (3 * 3600 + 36 * 60 + 20) * 1000, now = Date.now(), r = D - (now % D);
      setTimeLeft({ h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) });
    };
    const t = setInterval(calc, 1000); calc(); return () => clearInterval(t);
  }, []);

  // Sticky Bar & Student Count
  useEffect(() => {
    const h = () => setShowStickyBar(window.scrollY > 450);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setStudentCount(c => c + 1), 5000);
    return () => clearInterval(t);
  }, []);

  // Exit-Intent Trigger (Desktop mouse leave)
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
    setShowPaymentModal(true);
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
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

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddPaymentInfo');
    }

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
        
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Purchase', {
            value: finalPrice,
            currency: 'INR'
          });
        }
      },
      onCancel: () => {
        setIsLoading(false);
      },
      onError: (err) => {
        setIsLoading(false);
        setPaymentError('Payment failed. Please retry with UPI or Card.');
        console.error('Razorpay Error:', err);
      }
    });
  };

  const applyCouponCodeDirect = (code: string) => {
    const coupons: Record<string, number> = {
      'SUNDAY50': 50,
      'GTR50': 50,
      'TRTED70': 70,
      'SPECIAL50': 50,
      'AVADA50': 50
    };
    const upper = code.trim().toUpperCase();
    if (coupons[upper]) {
      setAppliedCoupon(upper);
      setDiscountPercent(coupons[upper]);
      setCouponError(null);
      setShowCouponInput(true);
    } else {
      setCouponError('Invalid Coupon Code');
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-orange-200 selection:text-slate-900">
      
      {/* ═══ 0. TOP URGENCY TICKER ═══ */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white text-[11px] md:text-xs font-bold py-2 px-3 text-center sticky top-0 z-[75] shadow-md flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider animate-pulse">
          <Flame size={12} className="fill-white" /> BATCH CLOSING
        </span>
        <span>Only <strong>14 Seats Left</strong> at <strong>₹999</strong> for Today's Batch • Price Increases to <strong>₹2,999</strong> Tonight</span>
        <div className="inline-flex items-center gap-1 bg-black/30 font-mono px-2 py-0.5 rounded text-[11px]">
          <span>{formatTime(timeLeft.h)}h</span>:<span>{formatTime(timeLeft.m)}m</span>:<span>{formatTime(timeLeft.s)}s</span>
        </div>
      </div>

      <main>
        {/* ═══ 2. HERO SECTION — INDIAN AUDIENCE CONVERSION POWERHOUSE ═══ */}
        <section className="relative pt-5 md:pt-10 pb-12 md:pb-20 overflow-hidden bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            
            {/* Social proof top pill */}
            <div className="inline-flex items-center px-3.5 py-1 bg-orange-50 border border-orange-200 rounded-full mb-3 shadow-xs">
              <span className="text-[11px] md:text-xs font-bold text-slate-800 whitespace-nowrap">
                Rated <strong>4.9/5</strong> by <strong>52,000+</strong> Indian Designers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-slate-900 tracking-tight leading-[1.2] mb-4">
              <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl">
                <span className="block">Do You Want to Learn to Design Floor Plans,</span>
                <span className="block mt-0.5 sm:mt-1">3D Interior & Exterior Design?</span>
              </span>
              <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 mt-2">
                Only Course Package in India That Teaches All In One.
              </span>
            </h1>

            {/* Clear Subheadline for Indian Market */}
            <p className="text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
              This course is <strong className="text-slate-900 font-black underline decoration-orange-400">NOT just about rendering</strong> — it is your step-by-step studio blueprint to design 2D floor plans, 3D interior & exterior spaces, and <strong className="text-orange-600 font-bold">take complete client projects from scratch</strong>. Start closing ₹25,000 to ₹50,000+ contracts!
            </p>

            {/* Video Player Box with Frame */}
            <div className="w-full max-w-3xl mx-auto mb-6 bg-slate-900 p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 font-mono border-b border-slate-800 mb-2">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> PREVIEW</span>
                <span>30-Day Short Term Course (Self-Paced)</span>
              </div>
              <div className="w-full overflow-hidden rounded-xl bg-black" style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe 
                  src="https://iframe.mediadelivery.net/embed/489113/a214b199-e64a-4eaf-af70-edfbc586e5fd?autoplay=true&loop=true&muted=true&preload=true&responsive=true" 
                  loading="lazy" 
                  style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }} 
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
                  allowFullScreen={true} 
                />
              </div>
            </div>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-3xl mx-auto mb-7 text-left">
              {[
                { title: 'All 12 Software Courses', desc: 'AutoCAD, 3ds Max, V-Ray, AI' },
                { title: '10,000+ 3D Indian Models', desc: 'Kitchens, Beds, Sofas, Mandir' },
                { title: '100% Pre-Recorded & Self-Paced', desc: 'Watch anytime on Phone & PC' },
                { title: 'Instant Google Drive Access', desc: 'Lifetime link in 60 seconds' }
              ].map((item, i) => (
                <div key={i} className="bg-orange-50/70 border border-orange-200/80 rounded-xl p-2.5 shadow-sm">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs md:text-sm">
                    <CheckCircle2 size={15} className="text-orange-600 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[10px] md:text-[11px] text-slate-500 mt-0.5 pl-5">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Primary Hero CTA */}
            <div className="max-w-xl mx-auto mb-8">
              <CtaWithTimer 
                timeLeft={timeLeft} 
                onClick={openPaymentModal} 
                variant="orange"
                title="⚡ GET ALL 12 COURSES @ ₹999 ONLY"
                subtext="Instant Access in 60 Seconds • UPI / GPay / Cards Accepted"
              />
            </div>

            {/* Banner Below CTA */}
            <div className="max-w-3xl mx-auto mb-8 text-left">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-slate-200">
                <img
                  src="/banner-1.jpg"
                  alt="Learn to Design Home, Offices & Villas"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ═══ 3. INTERACTIVE ROI CALCULATOR (PSYCHOLOGY: GREED + LOGIC) ═══ */}
        <section className="py-12 md:py-16 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-wider mb-2 border border-orange-500/30">
                <DollarSign size={14} /> See Your Earning Potential
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
                How Much Can You Earn As a 3D Designer in India?
              </h2>
              <p className="text-slate-400 text-xs md:text-base mt-2 max-w-xl mx-auto">
                Select how many 3D room views / house elevation projects you plan to deliver each month:
              </p>
            </div>

            {/* Calculator Box */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl max-w-2xl mx-auto">
              
              {/* Project buttons */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setCalculatorProjects(num)}
                    className={`py-3 rounded-xl font-bold text-xs md:text-sm transition-all ${
                      calculatorProjects === num 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105' 
                        : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {num} {num === 1 ? 'Project' : 'Projects'}/mo
                  </button>
                ))}
              </div>

              {/* Real Earnings math */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-700 mb-6">
                <div className="text-center sm:text-left border-b sm:border-b-0 sm:border-r border-slate-800 pb-3 sm:pb-0 sm:pr-4">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Average Market Rate (India)</span>
                  <span className="text-xl font-bold text-slate-200 mt-1 block">₹25,000 – ₹35,000 / project</span>
                  <span className="text-[11px] text-emerald-400 mt-1 block">✓ Complete 2D Planning + 3D Interior & Exterior + 4K Walkthroughs</span>
                </div>
                <div className="text-center sm:text-right pt-2 sm:pt-0 sm:pl-4">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Your Monthly Earning</span>
                  <span className="text-3xl md:text-4xl font-display font-black text-amber-400 mt-1 block">
                    ₹{(calculatorProjects * 30000).toLocaleString('en-IN')}
                    <span className="text-xs text-slate-400 font-normal">/month</span>
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 block">ROI on ₹999 Course: <strong className="text-emerald-400">{Math.round(((calculatorProjects * 30000) / 999) * 100).toLocaleString('en-IN')}% in 30 Days</strong></span>
                </div>
              </div>

              <button
                onClick={openPaymentModal}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-display font-black text-base md:text-lg shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>Enroll Now & Start Earning (₹999 Only)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ═══ 4. THE 4 PAIN POINTS (EMPATHY & LOSS AVERSION) ═══ */}
        <section className="py-14 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                ⚠️ ARE YOU STRUGGLING WITH THIS?
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                4 Critical Problems Stopping 95% of Indian 3D Designers
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                If you relate to even one of these points, this 12-Course Master Bundle was designed specifically for you:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {PAIN_TRIGGERS_INDIAN.map((item, idx) => (
                <div key={idx} className="bg-red-50/40 border border-red-100 hover:border-red-300 rounded-2xl p-5 md:p-6 transition-all shadow-sm flex items-start gap-4">
                  <span className="text-3xl shrink-0 p-2 bg-white rounded-xl shadow-sm border border-red-100">{item.emoji}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base md:text-lg mb-1.5 leading-snug">{item.title}</h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5. THE 4-STAGE SOLUTION PILLARS ═══ */}
        <section className="py-14 md:py-20 bg-slate-50 border-b border-slate-200 grid-bg">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
                ⭐ THE AVADA PRO 3D FORMULA
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                How to Become an Irreplaceable Top 1% Designer in 30 Days
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                No more confusing theory. Follow this 4-step execution pipeline from initial floor plan to final client cheque:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SOLUTION_PILLARS.map((col, idx) => (
                <div key={idx} className="bg-white border-2 border-slate-200/80 hover:border-orange-400 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-black text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-lg">
                      {col.badge}
                    </span>
                    <span className="text-3xl group-hover:scale-125 transition-transform">{col.icon}</span>
                  </div>
                  <h3 className="font-display font-black text-slate-900 text-lg md:text-xl mb-2">{col.title}</h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4">{col.desc}</p>
                  
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50/60 p-2.5 rounded-xl">
                    <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
                    <span>Result: {col.result}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick CTA */}
            <div className="text-center mt-10">
              <button
                onClick={openPaymentModal}
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-black text-white font-bold text-sm md:text-base rounded-full shadow-lg hover:scale-105 transition-all"
              >
                <span>Master All 4 Stages for ₹999</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ═══ 5.5. WHO IS THIS 12-COURSE BUNDLE FOR? (SELF-IDENTIFICATION) ═══ */}
        <section className="py-14 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                🎯 WHO IS THIS BUNDLE FOR?
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                Designed for Anyone Who Wants to Design Spaces & Take Complete Projects
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                Whether you're starting from scratch or already working on client sites, this bundle gives you an unfair advantage:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHO_IS_THIS_FOR.map((item, idx) => (
                <div key={idx} className="bg-slate-50/80 hover:bg-white border-2 border-slate-200/80 hover:border-orange-400 rounded-3xl p-6 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl p-2 bg-white rounded-2xl shadow-xs border border-slate-100 group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full border border-orange-200">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-slate-900 text-base md:text-lg mb-2">{item.role}</h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4">{item.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>✓ 100% Ideal For You</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. ALL 12 MASTERCLASSES SHOWCASE (CATEGORY TABS + MARQUEE) ═══ */}
        <section className="py-14 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
                📚 ALL-IN-ONE BUNDLE
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                All 12 Industry Masterclasses Included in One Single Access Pass
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                You don't need to buy individual ₹4,999 courses or pay lakhs to coaching institutes. You get everything:
              </p>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                {['All', 'Planning', '3D Modeling', 'Photorealism', 'AI & Unreal'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategoryTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeCategoryTab === tab
                        ? 'bg-orange-500 text-white shadow-md'
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
                <div key={c.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between">
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
                    <div className="p-4 md:p-5">
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
                    <div className="bg-orange-50/80 border border-orange-200/80 rounded-xl p-2 text-center text-[11px] font-bold text-orange-800 flex items-center justify-center gap-1.5">
                      <CheckCircle2 size={13} className="text-orange-600" />
                      <span>Full Lifetime Access Included in ₹999</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Marquee Ticker of Courses */}
            <div className="flex flex-col gap-3 relative w-full overflow-hidden py-4 border-t border-slate-100">
              <div className="flex gap-3 animate-scroll-right hover:pause w-max">
                {[...COURSES, ...COURSES].map((course, i) => (
                  <div key={i} className="w-[130px] md:w-[150px] shrink-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm p-2 text-center">
                    <img src={course.imageUrl} alt={course.title} className="w-full aspect-video object-cover rounded-lg mb-1.5" />
                    <span className="text-[11px] font-bold text-slate-800 block truncate">{course.title}</span>
                    <span className="text-[9px] text-orange-600 font-bold block">{course.software}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ═══ 7. STUDENT WORK & RENDERS (PROOF THAT IT WORKS) ═══ */}
        <section className="py-14 md:py-20 bg-slate-900 text-white overflow-hidden border-b border-slate-800">
          <div className="max-w-5xl mx-auto px-4 mb-10 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-orange-400 bg-orange-500/20 border border-orange-500/30 px-3 py-1 rounded-full">
              📸 100% REAL STUDENT RESULTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white mt-3">
              See What Students Created in Just 30 Days
            </h2>
            <p className="text-slate-400 text-xs md:text-base mt-2 max-w-xl mx-auto">
              From zero 3D experience to creating magazine-grade 4K architectural & interior renders. Hover to pause:
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            {/* ROW 1 */}
            <div className="flex gap-3 md:gap-6 animate-scroll-left hover:pause">
              {[...PAGE_PREVIEWS_ROW1, ...PAGE_PREVIEWS_ROW1].map((img, i) => (
                <div key={i} className="w-[220px] md:w-[380px] shrink-0 aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative group bg-slate-800">
                  <img src={img} alt="Student 3D Render" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white">
                    Avada Student Project
                  </div>
                </div>
              ))}
            </div>

            {/* ROW 2 */}
            <div className="flex gap-3 md:gap-6 animate-scroll-right hover:pause">
              {[...PAGE_PREVIEWS_ROW2, ...PAGE_PREVIEWS_ROW2].map((img, i) => (
                <div key={i} className="w-[220px] md:w-[380px] shrink-0 aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative group bg-slate-800">
                  <img src={img} alt="Student 3D Render" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white">
                    Avada Student Project
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-xs text-slate-400 mb-3">Want your portfolio to look like this in the next 30 days?</p>
            <button
              onClick={openPaymentModal}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all"
            >
              Claim Full Course Access @ ₹999
            </button>
          </div>
        </section>

        {/* ═══ 8. 6 MASSIVE FREE BONUSES (WORTH ₹38,000 INCLUDED FREE) ═══ */}
        <section className="py-14 md:py-20 bg-amber-50/50 border-b border-orange-200/80 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
                <Gift size={14} /> ₹38,000 WORTH BONUSES FREE TODAY
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-2">
                Unlock 6 Exclusive Super-Bonuses with Your ₹999 Pass
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                Everything you need to set up your freelance business and start taking Indian and NRI client projects immediately:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {FREE_BONUSES.map((b) => (
                <div key={b.id} className="bg-white border-2 border-orange-200/80 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all flex flex-col justify-between relative group">
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

            {/* Mid Page CTA Box */}
            <div className="max-w-xl mx-auto">
              <CtaWithTimer 
                timeLeft={timeLeft} 
                onClick={openPaymentModal} 
                variant="white"
                title="CLAIM 12 COURSES + ALL 6 BONUSES @ ₹999"
              />
            </div>
          </div>
        </section>

        {/* ═══ 9. OLD WAY vs AVADA PRO 3D WAY (CONTRAST TABLE) ═══ */}
        <section className="py-14 md:py-20 bg-white border-b border-slate-200 grid-bg">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
                ⚡ VALUE COMPARISON
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                ₹999 vs ₹1,50,000 Institute — Same Skills, 150x Less Cost
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                See the clear difference between overpriced offline institutes / scattered YouTube videos and following the Avada PRO 3D studio blueprint:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* The Old Struggle */}
              <div className="bg-red-50/50 border-2 border-red-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 text-red-600 font-display font-black text-lg md:text-xl border-b border-red-200 pb-3">
                  <X size={24} className="p-1 bg-red-100 rounded-full text-red-600" />
                  <span>The Lonely Struggle (Old Way)</span>
                </div>
                <ul className="space-y-4 text-xs md:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>Scattered 10-part YouTube videos with no support when V-Ray crashes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>Institutes charging ₹35,000 - ₹1,50,000 for outdated 2015 syllabus</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>No 3D furniture models; spending 5 hours modeling single sofa</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>No client contract formats, ending up underpaid at ₹1,000 per room</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>Ignoring AI and slowly losing freelance projects to faster artists</span>
                  </li>
                </ul>
              </div>

              {/* The Avada Way */}
              <div className="bg-emerald-50/50 border-2 border-emerald-300 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  PRO METHOD
                </div>
                <div className="flex items-center gap-2.5 mb-6 text-emerald-800 font-display font-black text-lg md:text-xl border-b border-emerald-200 pb-3">
                  <CheckCircle2 size={24} className="p-1 bg-emerald-200 rounded-full text-emerald-800" />
                  <span>The Avada PRO 3D Blueprint</span>
                </div>
                <ul className="space-y-4 text-xs md:text-sm text-slate-800 font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>30-Day Step-by-Step Flow:</strong> AutoCAD → SketchUp → V-Ray → D5 → AI</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>24/7 WhatsApp Team Help:</strong> Never get stuck on software or lighting bugs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>10,000+ 3D Assets:</strong> Drag and drop modular kitchens and luxury decor</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Indian Client Proposal Templates:</strong> Lock 50% advance token payments</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Full Lifetime Access for ₹999:</strong> Less than the cost of one dinner!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 10. REAL INDIAN STUDENT TESTIMONIALS (SOCIAL PROOF) ═══ */}
        <section className="py-14 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
                💬 VERIFIED INDIAN REVIEWS
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                What Indian Architects, Visualizers & Students Say
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
                Real stories from professionals across Mumbai, Delhi, Bengaluru, Pune, Ahmedabad & Jaipur:
              </p>
            </div>

            {/* Featured Transformation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {TRANSFORMATION_STORIES.map((s, idx) => (
                <div key={idx} className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 md:p-7 shadow-sm hover:border-orange-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-bold flex items-center justify-center text-base">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm md:text-base">{s.name}</h3>
                          <span className="text-[11px] text-slate-500 font-medium">{s.role} • {s.city}</span>
                        </div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full">{s.incomeIncrease}</span>
                    </div>

                    <div className="space-y-2 text-xs md:text-sm my-3">
                      <p className="text-slate-500 bg-slate-50 p-2.5 rounded-xl"><strong className="text-slate-700">Before:</strong> {s.before}</p>
                      <p className="text-slate-800 bg-orange-50/60 p-2.5 rounded-xl border border-orange-100"><strong className="text-orange-700">After:</strong> {s.after}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400" />)}
                    </div>
                    <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle size={12} /> Verified Learner</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TESTIMONIALS_LANDING.map((t, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between text-xs">
                  <div>
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400" />)}
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

            {/* Mentors Image */}
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white p-2 md:p-4">
                <img src="/renders/mentors.png" alt="Industry Mentors" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 11. GRAND SLAM VALUE STACK (PRICE ANCHORING) ═══ */}
        <section className="py-14 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
                🎁 EVERYTHING INCLUDED
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                Here's Everything You Get Inside the ₹999 Bundle
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2">
                Normal value if purchased separately: <strong>₹54,000+</strong>
              </p>
            </div>

            <div className="bg-slate-50 border-2 border-slate-300 rounded-3xl overflow-hidden shadow-xl">
              <div className="divide-y divide-slate-200 text-xs md:text-sm font-medium">
                {VALUE_STACK_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3 bg-white hover:bg-orange-50/40 transition-colors">
                    <div className="flex items-center gap-2.5 text-slate-800 pr-2">
                      <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-500 font-mono shrink-0">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Total Value Summary Box */}
              <div className="bg-slate-900 text-white p-6 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Total Real Market Value</p>
                <p className="text-2xl font-bold text-slate-400 line-through mb-2">₹54,988</p>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-slate-400 text-sm font-bold">Today's Batch Price:</span>
                  <span className="text-4xl md:text-5xl font-display font-black text-amber-400">₹{BUNDLE_PRICE}</span>
                  <span className="text-emerald-400 text-xs font-bold uppercase">(Save ₹53,989)</span>
                </div>

                <button
                  onClick={openPaymentModal}
                  className="w-full max-w-md mx-auto py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-display font-black text-base md:text-lg shadow-xl shadow-orange-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  <span>Get Instant Access to Everything (@ ₹999)</span>
                </button>
                <p className="text-[10px] text-slate-400 mt-2">⚡ Immediate Google Drive Access Delivered on Email & WhatsApp</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 12. FAQ SECTION ═══ */}
        <section className="py-14 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
                ❓ GOT QUESTIONS?
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-3">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-xs md:text-sm mt-1">
                Everything you need to know before joining 52,000+ learners:
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS_LANDING.map((faq, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left font-bold text-slate-900 text-xs md:text-base gap-3"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180 text-orange-500' : ''}`} />
                  </button>
                  {openFaqIndex === i && (
                    <div className="px-4 md:px-5 pb-5 pt-0 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 13. FINAL CLOSING CTA SECTION ═══ */}
        <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="max-w-3xl mx-auto px-4 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-full text-xs font-black uppercase tracking-wider mb-3 animate-pulse">
              ⏰ FINAL CHANCE FOR TODAY'S ₹999 BATCH
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white leading-tight mb-4">
              Don't Let Another Year Pass Wishing You Had Mastered 3D & AI
            </h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-xl mx-auto mb-8">
              For less than the price of a single movie outing, you get all 12 courses, 10,000+ 3D models, lifetime updates, and our 24/7 support team.
            </p>

            <CtaWithTimer 
              timeLeft={timeLeft} 
              onClick={openPaymentModal} 
              variant="dark"
              title="CLAIM YOUR ₹999 ACCESS PASS NOW"
            />
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-black text-slate-400 py-10 pb-28 px-4 text-center text-xs border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Logo />
          <p className="text-slate-500 text-[11px] mt-4 mb-4">
            © 2026 Avada Design & Architecture. All rights reserved. Helping 52,000+ Indian designers succeed.
          </p>
          <div className="flex justify-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <a href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</a>
            <span>•</span>
            <a href="https://wa.me/918545015333" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">24/7 WhatsApp Support</a>
          </div>
        </div>
      </footer>

      {/* ═══ WHATSAPP FLOATING BUTTON ═══ */}
      <a 
        href="https://wa.me/918545015333?text=Hi%20Avada%20Team%2C%20I%20have%20a%20question%20about%20the%2012-Course%20Architecture%20Bundle" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-[75] flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black px-3.5 py-2.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
        style={{ boxShadow: '0 8px 24px rgba(37,211,102,0.45)' }}
      >
        <MessageCircle size={18} className="fill-white" />
        <span className="hidden sm:inline">WhatsApp Support</span>
      </a>

      {/* ═══ STICKY BOTTOM BAR (MOBILE CONVERSION HERO) ═══ */}
      <div className={`fixed bottom-0 left-0 right-0 z-[70] transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white/98 backdrop-blur-2xl border-t border-slate-200 shadow-[0_-4px_25px_rgba(0,0,0,0.15)] px-4 py-2.5 flex items-center justify-between gap-3 max-w-4xl mx-auto">
          
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-slate-400 line-through font-bold">₹2,999</span>
              <span className="text-xl font-display font-black text-slate-900">₹{BUNDLE_PRICE}</span>
              <span className="bg-red-100 text-red-600 font-bold text-[9px] px-1.5 py-0.2 rounded">92% OFF</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
              <span>Ends In:</span>
              <span className="font-black text-orange-600">{formatTime(timeLeft.h)}:{formatTime(timeLeft.m)}:{formatTime(timeLeft.s)}</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold hidden xs:inline">7-Day Refund</span>
            </div>
          </div>

          <button
            onClick={openPaymentModal}
            className="flex-1 max-w-[240px] bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Zap size={14} className="fill-white shrink-0" />
            <span>Get 12 Courses @ ₹999</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ═══ EXIT-INTENT / RETENTION SAVE MODAL (PSYCHOLOGICAL POPUP) ═══ */}
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
              Wait! Don't Leave Empty Handed
            </span>

            <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 mt-2 mb-2">
              Ruko! Yeh Offer Dobara ₹999 Me Nahi Milega!
            </h3>

            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-5">
              Over <strong>52,480+ Indian designers</strong> are already using these 12 courses & 10,000+ 3D models to earn ₹50,000+/month. If you close this page, price will increase to <strong>₹2,999</strong>!
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
                  openPaymentModal();
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-display font-black text-sm md:text-base shadow-lg shadow-orange-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Zap size={16} className="fill-white" />
                <span>Lock My ₹999 Access Now</span>
              </button>

              <button
                onClick={() => setShowExitModal(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold py-1 transition-colors"
              >
                No thanks, I will pay ₹2,999 later
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
                
                <div className="flex items-baseline gap-2 mt-2">
                  {discountPercent > 0 ? (
                    <>
                      <span className="text-3xl font-display font-black text-amber-400">₹{finalPrice}</span>
                      <span className="text-slate-400 text-sm line-through">₹{BUNDLE_PRICE}</span>
                      <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {discountPercent}% OFF APPLIED
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-display font-black text-white">₹{BUNDLE_PRICE}</span>
                      <span className="text-slate-400 text-sm line-through">₹2,999</span>
                      <span className="bg-orange-500/20 text-orange-300 text-xs font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
                        92% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              
              {/* Feature Chips */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] font-medium text-slate-700">
                {['12 Full Software Courses', '10,000+ 3D Indian Models', 'Official Skill Certificate', '24/7 WhatsApp Support', 'Lifetime Validity'].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <CheckCircle2 size={12} className="text-orange-500 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 bg-orange-50 p-1.5 rounded-lg border border-orange-200 text-orange-700 font-bold col-span-2">
                  <Download size={12} className="text-orange-600 shrink-0" />
                  <span>Direct Software Download Links Included</span>
                </div>
              </div>

              {/* Live Form Inputs */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    E-mail
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
                    Phone
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

              {/* Coupon Code Section */}
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
                          placeholder="ENTER CODE"
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
