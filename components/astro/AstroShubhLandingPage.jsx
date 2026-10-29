import React, { useState, useRef, useEffect } from 'react';
import { 
  Star, 
  ShieldCheck, 
  MessageCircle, 
  Lock, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Package,
  FileText,
  Compass,
  Layers,
  ArrowUpRight,
  Flame,
  Clock
} from 'lucide-react';
import CityAutocomplete from './CityAutocomplete';
import { REPORTS_DATA } from '../data/reports';
import { LANDING_PAGES_DATA } from '../data/landingPagesData';
import VedicBookCover from './VedicBookCover';
import { trackMetaViewContent } from '../utils/metaPixel';

// Helper to translate labels to simple Hindi/Hinglish
const getLocalizedLabel = (label, isHindi) => {
  if (!label) return '';
  if (!isHindi) return label.text || label;
  if (label.textHi) return label.textHi;
  const txt = label.text || label;
  const map = {
    '6th House Rin Bhava Scan': 'षष्ठम भाव ऋण दोष स्कैन',
    'Mangal & Shiva Stotra': 'मंगल व शिव स्तोत्र',
    '100% Confidential': '१००% गोपनीय',
    'Delivered on WhatsApp': 'व्हाट्सएप पर डिलीवरी',
    '10th House Karma Analysis': 'दशम भाव कर्म विश्लेषण',
    'Surya & Shani Balance': 'सूर्य व शनि शांति',
    '7th House Vivah Yog': 'सप्तम भाव विवाह योग',
    'Mangal & Shukra Balance': 'मंगल व शुक्र शांति',
    '2nd & 11th House Scan': 'द्वितीय व एकादश धन भाव',
    'Maha Lakshmi Stotra': 'महालक्ष्मी स्तोत्र',
    'Kundli Match Analysis': 'कुंडली गुण मिलान',
    '5th House Santan Yog': 'पंचम भाव संतान योग',
    'Zero Demolition': 'बिना तोड़-फोड़ उपाय',
    'Vastu Energy Balancing': 'वास्तु ऊर्जा संतुलन',
    'Rahu & Ketu Shanti': 'राहु व केतु शांति',
    'Shani Sade Sati Shanti': 'शनि साढ़े साती शांति',
    'Nazar Dosh Removal': 'नज़र दोष निवारण',
    'Kitchen Agni Balance': 'रसोई अग्नि तत्व संतुलन',
    'Main Door Energy Shield': 'मुख्य द्वार रक्षा कवच',
    'Study Concentration Yog': 'एकाग्रता व विद्या योग',
    'Bedroom Harmony Guide': 'दाम्पत्य सुख बेडरूम वास्तु',
    'Mandir Sanctity Guide': 'ईशान कोण मंदिर वास्तु',
    'Washroom Dosh Removal': 'शौचालय वास्तु दोष निवारण',
    '7th House Scan': 'सप्तम भाव विवाह विश्लेषण',
    'Jupiter & Venus Balance': 'गुरु व शुक्र संतुलन',
    'Career Switch Window': 'जॉब स्विच शुभ समय',
    'Government Job Yog': 'सरकारी नौकरी योग',
    'Business Cash Flow': 'व्यापार धन प्रवाह',
    'Health Dosh Nivaran': 'रोग दोष निवारण'
  };
  return map[txt] || txt;
};

// Helper to translate badge
const getLocalizedBadge = (badge, isHindi) => {
  if (!badge) return '';
  if (!isHindi) return badge;
  const map = {
    'Most Popular': 'सर्वाधिक लोकप्रिय',
    'Trending Service': 'सर्वाधिक मांग',
    'Vastu Remedy': 'अचूक वास्तु उपाय',
    'Sacred Ritual': 'वैदिक सिद्ध उपाय',
    'High Demand': 'अत्यंत लोकप्रिय',
    'Limited Offer': 'सीमित समय ऑफर'
  };
  return map[badge] || badge;
};

// Helper to translate FAQ into simple Hindi
const translateFaq = (faq, isHindi) => {
  if (!isHindi || !faq) return faq;
  if (faq.qHi && faq.aHi) return { q: faq.qHi, a: faq.aHi };
  
  const qMap = {
    'How quickly do Karz Mukti remedies show results?': 'कर्ज मुक्ति उपायों का असर कितने समय में दिखने लगता है?',
    'Are these remedies safe to perform?': 'क्या यह उपाय घर पर करना 100% सुरक्षित है?',
    'Can I do the remedies while working in corporate?': 'क्या नौकरी या बिजी रूटीन के साथ यह उपाय किए जा सकते हैं?',
    'Will I need to break or rebuild any walls for Vastu?': 'क्या वास्तु दोष निवारण के लिए कोई तोड़-फोड़ करनी होगी?',
    'Does this report predict government job chances?': 'क्या इसमें सरकारी नौकरी (Govt Job) मिलने का सटीक समय बताया जाता है?',
    'How will I receive my report?': 'भुगतान के बाद मुझे रिपोर्ट कैसे प्राप्त होगी?',
    'What if I do not know my exact birth time?': 'यदि मुझे अपना सटीक जन्म समय नहीं पता तो क्या होगा?',
    'Can these remedies help overcome black magic or nazar dosh?': 'क्या इन वैदिक उपायों से बुरी नजर और नजर दोष का निवारण होता है?'
  };

  const aMap = {
    'Most users experience a decisive unblocking of cash flow and easing of loan pressure within 21 to 45 days of consistently practicing the prescribed remedies.':
      'नियमित रूप से 21 से 45 दिनों तक बताए गए वैदिक व लाल किताब उपाय करने पर धन आगमन के नए मार्ग खुलते हैं और कर्ज का दबाव तेजी से कम होता है।',
    '100% safe. They are sattvic Vedic and Lal Kitab remedies involving mantras, charity, and water offerings, with no negative or harmful rituals.':
      'बिल्कुल १००% सुरक्षित। यह पूरी तरह सात्विक वैदिक उपाय, मंत्र जप, दान और सूर्य अर्घ्य पर आधारित हैं। इसमें कोई भी तांत्रिक या हानिकारक विधि नहीं है।',
    'Yes! All remedies are practical, ethical Vedic rituals taking less than 5 minutes daily without extra cost.':
      'हां बिल्कुल! सभी उपाय बेहद सरल हैं और रोजाना मात्र 5 से 7 मिनट का समय लेते हैं। इन्हें घर या ऑफिस में बिना किसी अतिरिक्त खर्च के आसानी से किया जा सकता है।',
    'No demolition is required. All remedies are based on cosmic color therapy, directional energization, and elemental balancing.':
      'बिल्कुल भी तोड़-फोड़ की जरूरत नहीं है। सभी उपाय दिशा संतुलन, रंग चिकित्सा, धातु और वैदिक यंत्रों द्वारा बिना किसी तोड़-फोड़ के किए जाते हैं।'
  };

  return {
    q: qMap[faq.q] || faq.qHi || faq.q,
    a: aMap[faq.a] || faq.aHi || faq.a
  };
};

export default function AstroShubhLandingPage({
  reportId,
  formData,
  setFormData,
  onSubmit,
  isOpeningPayment = false,
  onNavigateHome,
  onSelectReport,
  onChangeLanguage,
  language = 'hi'
}) {
  const isHindi = language === 'hi';
  const reportConfig = REPORTS_DATA.find(r => r.id === reportId) || REPORTS_DATA[0];
  const landingData = LANDING_PAGES_DATA[reportId] || LANDING_PAGES_DATA['career-growth-remedy'];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activePreviewPage, setActivePreviewPage] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [includeDhanYog, setIncludeDhanYog] = useState(false);
  const [errors, setErrors] = useState({});
  const [recentOrderToast, setRecentOrderToast] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');

  // Meta Pixel & Conversions API (CAPI) - Track ViewContent
  useEffect(() => {
    if (reportConfig) {
      trackMetaViewContent({
        reportId: reportConfig.id,
        title: isHindi ? (reportConfig.titleHi || reportConfig.title) : reportConfig.title,
        amount: 299
      });
    }
  }, [reportId]);

  // Evergreen countdown timer (2h 23m 26s = 8606s) for urgency
  const INITIAL_TIMER_SECONDS = 2 * 3600 + 23 * 60 + 26; // 8606s
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('astro_offer_timer_v5');
    const now = Date.now();
    if (saved) {
      const targetTime = parseInt(saved, 10);
      const diff = Math.floor((targetTime - now) / 1000);
      if (diff > 0 && diff <= INITIAL_TIMER_SECONDS) {
        return diff;
      }
    }
    const newTarget = now + INITIAL_TIMER_SECONDS * 1000;
    localStorage.setItem('astro_offer_timer_v5', newTarget.toString());
    return INITIAL_TIMER_SECONDS;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const newTarget = Date.now() + INITIAL_TIMER_SECONDS * 1000;
          localStorage.setItem('astro_offer_timer_v5', newTarget.toString());
          return INITIAL_TIMER_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerHours = Math.floor(timeLeft / 3600);
  const timerMins = Math.floor((timeLeft % 3600) / 60);
  const timerSecs = timeLeft % 60;

  const formRef = useRef(null);

  // Month options
  const months = [
    { num: '01', en: 'January', hi: 'जनवरी' },
    { num: '02', en: 'February', hi: 'फ़रवरी' },
    { num: '03', en: 'March', hi: 'मार्च' },
    { num: '04', en: 'April', hi: 'अप्रैल' },
    { num: '05', en: 'May', hi: 'मई' },
    { num: '06', en: 'June', hi: 'जून' },
    { num: '07', en: 'July', hi: 'जुलाई' },
    { num: '08', en: 'August', hi: 'अगस्त' },
    { num: '09', en: 'September', hi: 'सितंबर' },
    { num: '10', en: 'October', hi: 'अक्टूबर' },
    { num: '11', en: 'November', hi: 'नवंबर' },
    { num: '12', en: 'December', hi: 'दिसंबर' }
  ];

  // 4 Sample report preview pages
  const samplePages = [
    {
      title: isHindi ? 'पेज १: शुद्ध वैदिक लग्न चक्र एवं ग्रह अंश' : 'Page 1: Certified Vedic Lagna Chart & Positions',
      desc: isHindi ? 'लाहिड़ी अयनांश पर आधारित भाव, नक्षत्र एवं ग्रहों की स्पष्ट डिग्री' : 'Detailed degree positions, Nakshatra, and house placements',
      previewTag: isHindi ? 'सटीक पंचांग' : 'Ephemeris Exact'
    },
    {
      title: isHindi ? 'पेज २: १२-माह अनुकूल समय-चक्र (गोल्डन टाइमलाइन)' : 'Page 2: 12-Month Golden Period Timeline',
      desc: isHindi ? 'नौकरी, व्यापार, धन लाभ या विवाह हेतु सबसे प्रबल माह' : 'Predictive windows for salary hike, debt relief, or business growth',
      previewTag: isHindi ? 'दशा चक्र' : 'Dasha Analysis'
    },
    {
      title: isHindi ? 'पेज ३: २१-दिवसीय वैदिक महामंत्र एवं यंत्र साधना' : 'Page 3: 21-Day Consecrated Mantra Routine',
      desc: isHindi ? 'सटीक संख्या, दिशा, माला एवं समय के साथ प्रभावकारी मंत्र' : 'Pronunciation, count rituals, and yantra energization guides',
      previewTag: isHindi ? 'वैदिक साधना' : 'Sacred Ritual'
    },
    {
      title: isHindi ? 'पेज ४: लाल किताब अचूक टोटके एवं दिशा वास्तु' : 'Page 4: Lal Kitab Remedies & Directional Vastu',
      desc: isHindi ? 'बिना खर्च के सरल घरेलू उपाय और कार्यस्थल ऊर्जा संतुलन' : 'Zero-demolition vastu corrections and day-to-day lifestyle rules',
      previewTag: isHindi ? 'लाल किताब उपाय' : 'Lal Kitab'
    }
  ];

  // 4 Related ₹299 products to cross-promote
  const relatedProducts = REPORTS_DATA
    .filter(r => r.id !== reportId)
    .slice(0, 4);

  // Live social proof toast
  useEffect(() => {
    const names = ['Rahul S.', 'Pooja T.', 'Amit K.', 'Meenakshi I.', 'Vikram D.', 'Sunita P.', 'Gaurav B.'];
    const cities = ['Bengaluru', 'Mumbai', 'Delhi', 'Jaipur', 'Pune', 'Lucknow', 'Ahmedabad'];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const minsAgo = Math.floor(Math.random() * 8) + 1;

      setRecentOrderToast({
        name: randomName,
        city: randomCity,
        time: isHindi ? `${minsAgo} मिनट पहले` : `${minsAgo} mins ago`,
        reportName: isHindi ? (reportConfig.titleHi || reportConfig.title) : reportConfig.title,
        action: isHindi ? 'ने ऑर्डर किया' : 'Ordered'
      });

      setTimeout(() => {
        setRecentOrderToast(null);
      }, 5000);
    }, 14000);

    return () => clearInterval(interval);
  }, [reportConfig, isHindi]);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName?.trim()) {
      errs.fullName = isHindi ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Full Name is required';
    }
    if (!formData.dob?.day || !formData.dob?.month || !formData.dob?.year) {
      errs.dob = isHindi ? 'कृपया जन्म तिथि पूर्ण करें' : 'Date of Birth is required';
    }
    if (!formData.timeUnknown && (!formData.tob?.hour || !formData.tob?.minute)) {
      errs.tob = isHindi ? 'कृपया जन्म समय दर्ज करें या "समय ज्ञात नहीं" चुनें' : 'Time of Birth is required';
    }
    if (!formData.pob?.name && !formData.pobText) {
      errs.pob = isHindi ? 'कृपया जन्म स्थान चुनें' : 'Place of Birth is required';
    }
    if (!formData.whatsappNumber || formData.whatsappNumber.length < 10) {
      errs.whatsappNumber = isHindi ? 'कृपया 10 अंकों का वैध व्हाट्सएप नंबर दर्ज करें' : 'Enter a valid 10-digit WhatsApp number';
    }
    if (!formData.gender) {
      errs.gender = isHindi ? 'कृपया लिंग का चयन करें' : 'Gender is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ includeDhanYog, amount: includeDhanYog ? 499 : 299 });
    }
  };

  const title = isHindi ? reportConfig.titleHi : reportConfig.title;
  const tagline = isHindi ? landingData.taglineHi : landingData.tagline;
  const images = landingData.images || [];

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-sans text-[#2D241E]">
      
      {/* 1. AstroShubh Top Trust Banner with Religious Invocation */}
      <div className="bg-[#FFF8EE] border-b border-[#E8DFD5] py-2 px-4 text-center text-xs text-[#5D4A3A] font-medium flex flex-wrap items-center justify-center gap-2 sm:gap-4 select-none">
        <span className="font-serif font-bold text-[#89270B] flex items-center space-x-1">
          <span>ॐ</span>
          <span>|| श्री गणेशाय नमः ||</span>
        </span>
        <span className="text-gray-300 hidden sm:inline">|</span>
        <span className="flex items-center space-x-1">
          <span className="text-amber-500 font-bold">⭐</span>
          <span>{isHindi ? '२०+ वर्षों का अनुभव' : '20+ years experience'}</span>
        </span>
        <span className="text-gray-300">|</span>
        <span className="flex items-center space-x-1">
          <span className="text-amber-700">📦</span>
          <span>{isHindi ? '३०,०००+ रिपोर्ट्स डिलीवर' : '30,000+ reports delivered'}</span>
        </span>
        <span className="text-gray-300 hidden md:inline">|</span>
        <button
          onClick={onChangeLanguage}
          className="text-[11px] text-[#B44D12] font-bold underline hover:text-[#89270B] ml-2"
        >
          {isHindi ? 'भाषा बदलें (Change Language)' : 'Change Language / भाषा बदलें'}
        </button>
      </div>

      {/* 2. Headline / Tagline Banner */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#3E2723] font-serif leading-snug tracking-tight max-w-4xl mx-auto">
          {tagline}
        </h1>
      </div>

      {/* 3. Main Two-Column Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Product Images, Details, Price, Benefits */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFD5] shadow-md space-y-5">
            
            {/* Top Badge */}
            {landingData.badge && (
              <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>{getLocalizedBadge(landingData.badge, isHindi)}</span>
              </div>
            )}

            {/* 3D Sacred Vedic Book Cover Presentation */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#2A1509] via-[#3E1F0D] to-[#1F0C04] border-2 border-amber-400/80 p-5 sm:p-7 flex flex-col items-center justify-center shadow-xl group">
              
              {/* Sacred Golden Aura Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />

              {/* 3D Sacred Book Cover */}
              <div className="relative z-10 py-2 w-full flex justify-center">
                <VedicBookCover
                  reportId={reportId}
                  title={reportConfig.title}
                  titleHi={reportConfig.titleHi}
                  size="lg"
                />
              </div>

              {/* Live Preview Ribbon */}
              <div className="mt-4 relative z-10 flex items-center space-x-2 text-[11px] text-amber-200/90 font-serif bg-black/50 px-3.5 py-1.5 rounded-full border border-amber-300/40 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isHindi ? '६-पेज प्रमाणित वैदिक हस्तलिखित प्रारूप • व्हाट्सएप पर डिलीवरी' : '6-Page Certified Vedic Kundli Dossier • Delivered on WhatsApp'}</span>
              </div>
            </div>

            {/* Product Title */}
            <div>
              <h2 className="text-2xl font-black text-[#3E2723] tracking-tight leading-tight">
                {title}
              </h2>
            </div>

            {/* Colored Label Badges */}
            <div className="flex flex-wrap gap-2">
              {landingData.labels?.map((label, idx) => {
                const colorMap = {
                  orange: 'bg-[#FFEDE1] text-[#A8510D] border-[#FFCBA4]',
                  green: 'bg-[#EAF5EA] text-[#2E7D32] border-[#C8E6C9]',
                  blue: 'bg-[#EBF3FB] text-[#1565C0] border-[#BBDEFB]',
                  red: 'bg-[#FDECEB] text-[#C62828] border-[#FFCDD2]',
                  seagreen: 'bg-[#E0F2F1] text-[#00695C] border-[#B2DFDB]'
                };
                return (
                  <span
                    key={idx}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                      colorMap[label.color] || colorMap.green
                    }`}
                  >
                    {getLocalizedLabel(label, isHindi)}
                  </span>
                );
              })}
            </div>

            {/* Price Presentation */}
            <div className="pt-2 border-t border-gray-100 flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-black text-[#3E2723] tracking-tight">
                ₹299
              </span>
              <span className="text-base text-gray-400 line-through">
                ₹{reportConfig.originalPrice || 1499}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {isHindi ? '(सभी कर सहित)' : '(incl. all taxes)'}
              </span>
              <span className="ml-auto text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                {isHindi ? '८०% छूट' : '80% OFF'}
              </span>
            </div>

            {/* Mobile Jump to Order Button */}
            <div className="block lg:hidden">
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#b44d12] to-[#89270b] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>{isHindi ? `${reportConfig.titleHi || reportConfig.title} अभी प्राप्त करें` : `Order now your ${reportConfig.title}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Ratings & Reviews Counter */}
            <div className="flex items-center space-x-2 pt-1 text-sm">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="font-bold text-[#3E2723]">4.9/5</span>
              <a href="#customer-reviews" className="text-xs text-amber-800 underline font-medium hover:text-[#b44d12]">
                {isHindi ? '(८,०००+ सत्यापित समीक्षाएं)' : '(8k+ verified reviews)'}
              </a>
            </div>

            {/* Verified Trust Badge */}
            <div>
              <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isHindi ? 'सत्यापित वैदिक सेवा' : 'Verified Vedic Service'}</span>
              </span>
            </div>

            {/* Key Benefits List */}
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 pt-2 border-t border-gray-100">
              <li className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {isHindi ? (
                    <><strong>१००% गोपनीयता।</strong> आपकी जन्म जानकारी पूरी तरह सुरक्षित व गोपनीय है।</>
                  ) : (
                    <><strong>100% Privacy.</strong> Your birth details are strictly confidential.</>
                  )}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>
                  {isHindi ? (
                    <><strong>३०,०००+ संतुष्ट जातकों</strong> द्वारा भारत भर में जांची-परखी सेवा।</>
                  ) : (
                    <><strong>Trusted by 30,000+ users</strong> across India & globally.</>
                  )}
                </span>
              </li>
              <li className="pt-1">
                <span className="text-xs text-gray-500 block mb-1.5">
                  {isHindi ? '📝 उपलब्ध भाषाएं:' : '📝 Available in:'}
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['हिंदी', 'English'].map((l) => (
                    <span key={l} className="bg-amber-100/90 text-[#89270B] font-bold border border-amber-300 px-3 py-1 rounded-full shadow-xs">
                      {l}
                    </span>
                  ))}
                </div>
              </li>
            </ul>

          </div>

          {/* RIGHT COLUMN: Sticky Order Form with Instant City Autocomplete */}
          <div ref={formRef} className="lg:col-span-6 sticky top-20">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl">
              
              {/* Form Title & Limited Offer badge */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                    {isHindi ? 'वैदिक रिपोर्ट बुकिंग' : 'Report Booking Form'}
                  </span>
                  <h3 className="text-lg font-bold text-[#3E2723]">
                    {isHindi ? `प्राप्त करें ${reportConfig.titleHi || reportConfig.title}` : `Get Your ${reportConfig.title}`}
                  </h3>
                </div>
                <div className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">
                  {isHindi ? 'सीमित समय ऑफर' : 'Limited Offer'}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                    {isHindi ? 'पूरा नाम (Full Name)' : 'Full Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={isHindi ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
                    className={`w-full px-3.5 py-2.5 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                    {isHindi ? 'जन्म तिथि (Date of Birth)' : 'Date of Birth'} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={formData.dob.day}
                      onChange={(e) => setFormData({
                        ...formData,
                        dob: { ...formData.dob, day: e.target.value }
                      })}
                      className="w-full px-2.5 py-2 text-sm border border-amber-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">{isHindi ? 'दिन (Day)' : 'Day'}</option>
                      {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>

                    <select
                      value={formData.dob.month}
                      onChange={(e) => setFormData({
                        ...formData,
                        dob: { ...formData.dob, month: e.target.value }
                      })}
                      className="w-full px-2.5 py-2 text-sm border border-amber-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">{isHindi ? 'महीना (Month)' : 'Month'}</option>
                      {months.map(m => (
                        <option key={m.num} value={m.num}>{isHindi ? m.hi : m.en}</option>
                      ))}
                    </select>

                    <input
                      type="number"
                      min="1930"
                      max="2026"
                      placeholder={isHindi ? 'वर्ष (YYYY)' : 'YYYY'}
                      value={formData.dob.year}
                      onChange={(e) => setFormData({
                        ...formData,
                        dob: { ...formData.dob, year: e.target.value }
                      })}
                      className="w-full px-2.5 py-2 text-sm border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  {errors.dob && (
                    <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.dob}</span>
                    </p>
                  )}
                </div>

                {/* Time of Birth */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                    {isHindi ? 'जन्म समय (Time of Birth)' : 'Time of Birth'} <span className="text-red-500">*</span>
                  </label>
                  <div className={`grid grid-cols-3 gap-2 ${formData.timeUnknown ? 'opacity-40 pointer-events-none' : ''}`}>
                    <select
                      value={formData.tob.hour}
                      onChange={(e) => setFormData({
                        ...formData,
                        tob: { ...formData.tob, hour: e.target.value }
                      })}
                      className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">{isHindi ? 'घंटे (HH)' : 'HH'}</option>
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>

                    <select
                      value={formData.tob.minute}
                      onChange={(e) => setFormData({
                        ...formData,
                        tob: { ...formData.tob, minute: e.target.value }
                      })}
                      className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">{isHindi ? 'मिनट (MM)' : 'MM'}</option>
                      {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>

                    <select
                      value={formData.tob.ampm}
                      onChange={(e) => setFormData({
                        ...formData,
                        tob: { ...formData.tob, ampm: e.target.value }
                      })}
                      className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>

                  {/* Don't know time checkbox */}
                  <div className="mt-1.5">
                    <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.timeUnknown}
                        onChange={(e) => setFormData({ ...formData, timeUnknown: e.target.checked })}
                        className="w-3.5 h-3.5 text-amber-600 rounded border-gray-300"
                      />
                      <span>{isHindi ? 'मुझे अपना सटीक जन्म समय नहीं पता' : "Don't know my exact time of birth"}</span>
                    </label>
                    <p className="text-[10px] text-gray-500 pl-5">
                      {isHindi 
                        ? 'नोट: जन्म समय न होने पर भी चंद्र कुंडली और सूर्य लग्न द्वारा सटीक भविष्यवाणी की जाती है।' 
                        : 'Note: Without time of birth, accurate predictions are generated via Moon chart.'}
                    </p>
                  </div>
                  {errors.tob && (
                    <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.tob}</span>
                    </p>
                  )}
                </div>

                {/* Place of Birth with Instant Autocomplete */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                    {isHindi ? 'जन्म स्थान (Place of Birth)' : 'Place of Birth'} <span className="text-red-500">*</span>
                  </label>
                  <CityAutocomplete
                    value={formData.pobText}
                    isHindi={isHindi}
                    placeholder={isHindi ? 'अपना शहर, जिला या राज्य खोजें...' : 'Search for place, district, or state...'}
                    onChange={(txt) => setFormData({ ...formData, pobText: txt })}
                    onSelectCity={(cityItem) => setFormData({
                      ...formData,
                      pob: cityItem,
                      pobText: `${cityItem.name}, ${cityItem.state ? cityItem.state + ', ' : ''}${cityItem.country}`
                    })}
                    error={!!errors.pob}
                  />
                  {errors.pob && (
                    <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.pob}</span>
                    </p>
                  )}
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                    {isHindi ? 'व्हाट्सएप नंबर (WhatsApp Number)' : 'WhatsApp Number'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600 font-bold text-xs">
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        whatsappNumber: e.target.value.replace(/\D/g, '')
                      })}
                      placeholder={isHindi ? '१० अंकों का व्हाट्सएप नंबर' : '10-digit WhatsApp Number'}
                      className={`w-full pl-12 pr-3.5 py-2.5 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.whatsappNumber ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.whatsappNumber && (
                    <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.whatsappNumber}</span>
                    </p>
                  )}
                </div>

                {/* Gender & Language */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                      {isHindi ? 'लिंग (Gender)' : 'Gender'} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">{isHindi ? 'चुनें' : 'Select'}</option>
                      <option value="Male">{isHindi ? 'पुरुष (Male)' : 'Male'}</option>
                      <option value="Female">{isHindi ? 'महिला (Female)' : 'Female'}</option>
                      <option value="Other">{isHindi ? 'अन्य (Other)' : 'Other'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                      {isHindi ? 'रिपोर्ट की भाषा' : 'Language / भाषा'}
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="hi">हिंदी (Hindi)</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>

                {/* Personalized Dhan Yog Report & Remedy Upsell Bump Box */}
                <div 
                  onClick={() => setIncludeDhanYog(!includeDhanYog)}
                  className="p-3 sm:p-3.5 bg-[#FFFBEB] rounded-2xl border-2 border-dashed border-amber-400 cursor-pointer shadow-xs hover:border-amber-500 transition-all select-none"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={includeDhanYog}
                      onChange={(e) => setIncludeDhanYog(e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer shrink-0"
                    />
                    <img
                      src="/covers/dhan-yog-thumb.png"
                      alt="Personalized Dhan Yog Report"
                      className="w-12 h-14 sm:w-14 sm:h-16 object-cover rounded-lg shadow-sm border border-amber-200/80 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-sm sm:text-base text-gray-950 tracking-tight leading-snug">
                        Personalized Dhan Yog Report & Remedy
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[#047857] font-black text-base sm:text-lg">+ ₹ 200</span>
                        <span className="text-gray-400 line-through text-sm font-medium">₹ 299</span>
                        <span className="bg-[#FEE2E2] text-[#DC2626] text-[11px] font-bold px-2 py-0.5 rounded-md border border-rose-200">
                          Save ₹ 99
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evergreen Urgency Countdown Timer (2h 23m 26s) */}
                <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300/80 rounded-2xl p-3.5 text-center shadow-xs">
                  <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-[#89270B]">
                    <Flame className="w-4 h-4 text-orange-600 animate-bounce" />
                    <span>
                      {isHindi 
                        ? 'विशेष ₹299 ऑफर शीघ्र समाप्त हो रहा है:' 
                        : 'Special ₹299 Offer Ending Soon:'}
                    </span>
                  </div>

                  <div className="flex items-center justify-center space-x-2 my-2.5">
                    {/* Hours Box */}
                    <div className="flex flex-col items-center">
                      <div className="bg-[#89270B] text-yellow-300 font-mono font-black text-lg sm:text-xl px-2.5 py-1 rounded-xl shadow-inner min-w-[42px]">
                        {String(timerHours).padStart(2, '0')}
                      </div>
                      <span className="text-[10px] text-gray-600 font-bold mt-0.5 uppercase tracking-wider">
                        {isHindi ? 'घंटे' : 'Hours'}
                      </span>
                    </div>

                    <span className="text-[#89270B] font-black text-lg sm:text-xl -mt-4">:</span>

                    {/* Minutes Box */}
                    <div className="flex flex-col items-center">
                      <div className="bg-[#89270B] text-yellow-300 font-mono font-black text-lg sm:text-xl px-2.5 py-1 rounded-xl shadow-inner min-w-[42px]">
                        {String(timerMins).padStart(2, '0')}
                      </div>
                      <span className="text-[10px] text-gray-600 font-bold mt-0.5 uppercase tracking-wider">
                        {isHindi ? 'मिनट' : 'Mins'}
                      </span>
                    </div>

                    <span className="text-[#89270B] font-black text-lg sm:text-xl -mt-4">:</span>

                    {/* Seconds Box */}
                    <div className="flex flex-col items-center">
                      <div className="bg-[#89270B] text-yellow-300 font-mono font-black text-lg sm:text-xl px-2.5 py-1 rounded-xl shadow-inner min-w-[42px]">
                        {String(timerSecs).padStart(2, '0')}
                      </div>
                      <span className="text-[10px] text-gray-600 font-bold mt-0.5 uppercase tracking-wider">
                        {isHindi ? 'सेकंड' : 'Secs'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-1 text-[11px] text-amber-900 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>
                      {isHindi 
                        ? 'समय समाप्त होने पर मूल्य ₹1,299 हो जाएगा' 
                        : 'Price increases back to ₹1,299 after expiry'}
                    </span>
                  </div>
                </div>

                {/* Direct Razorpay Launch Submit Button */}
                <button
                  type="submit"
                  disabled={isOpeningPayment}
                  className="w-full py-4 px-4 bg-gradient-to-r from-[#b44d12] via-[#c2410c] to-[#89270b] text-white font-extrabold text-sm sm:text-base tracking-wide rounded-2xl shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer border border-amber-300/40"
                >
                  {isOpeningPayment ? (
                    <span className="flex items-center space-x-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>{isHindi ? 'रेज़रपे पेमेंट खुल रहा है...' : 'Opening Razorpay Gateway...'}</span>
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-amber-200" />
                      <span>{includeDhanYog ? (isHindi ? 'दोनों रिपोर्ट्स प्राप्त करें (₹499)' : 'Get Both Reports (₹499)') : (isHindi ? 'Get Your Report (अपनी रिपोर्ट प्राप्त करें - ₹299)' : 'Get Your Report (₹299)')}</span>
                      <ArrowRight className="w-4 h-4 text-amber-200" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-500">
                  🔒 {isHindi ? '100% सुरक्षित रेज़रपे चेकआउट • रिपोर्ट आपके व्हाट्सएप पर भेजी जाएगी' : '100% Encrypted Razorpay Checkout • Delivered on WhatsApp'}
                </p>

              </form>

            </div>
          </div>

        </div>
      </div>

      {/* 4. NEW: Sample Report Visual Preview Carousel (What is inside the ₹299 report) */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full">
              {isHindi ? 'रिपोर्ट की झलक (Sample Report Preview)' : 'Look Inside Your Certified Report'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-[#3E2723] mt-2">
              {isHindi ? 'आपकी ₹299 रिपोर्ट में क्या-क्या शामिल है?' : 'What Exactly Will You Receive?'}
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              {isHindi ? '१५+ पृष्ठों की प्रमाणित वैदिक रिपोर्ट सीधे आपके व्हाट्सएप पर' : '15+ pages of comprehensive Vedic analysis directly delivered to your WhatsApp'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {samplePages.map((page, idx) => (
              <div
                key={idx}
                onClick={() => setActivePreviewPage(idx)}
                className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all duration-200 select-none flex flex-col justify-between ${
                  activePreviewPage === idx
                    ? 'border-[#B44D12] ring-2 ring-[#B44D12]/20 shadow-md'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-[#B44D12] bg-amber-50 px-2 py-0.5 rounded">
                      {page.previewTag}
                    </span>
                    <FileText className="w-4 h-4 text-amber-700" />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 leading-snug">{page.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{page.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center text-[11px] text-amber-800 font-semibold">
                  <span>{isHindi ? 'सटीक गणना' : 'Verified Precision'}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. NEW: Astrological Diagnostic Matrix (Planetary Anatomy of Your Issue) */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-[#3E2723] font-serif">
            {isHindi ? 'ज्योतिषीय भाव एवं ग्रह प्रभाव चक्र' : 'Astrological House & Planetary Influence Matrix'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {isHindi ? 'आपकी समस्या को नियंत्रित करने वाले प्रमुख वैदिक कारक' : 'The exact planetary chakras governing your life domain'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm mb-3">
              10H
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              {isHindi ? 'दशम भाव (कर्म एवं पदोन्नति)' : '10th House (Karma & Career)'}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {isHindi 
                ? 'कर्म, पदोन्नति, कार्यक्षेत्र में दबदबा और आजीविका की स्थिरता का नियंत्रण इसी भाव से होता है।' 
                : 'Directly dictates administrative authority, appraisals, promotion timelines, and job security.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-3">
              11H
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              {isHindi ? 'एकादश भाव (धन लाभ एवं आय)' : '11th House (Labha & Cashflow)'}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {isHindi 
                ? 'धन का आगमन, व्यापारिक मुनाफा, इच्छा पूर्ति और नियमित वेतन वृद्धि का कारक भाव।' 
                : 'Governs incoming liquid cash, bonus payouts, trade profits, and network influence.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-800 flex items-center justify-center font-bold text-sm mb-3">
              6/8H
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              {isHindi ? 'षष्ठम व अष्टम भाव (कर्ज व रुकावटें)' : '6th & 8th Houses (Obstacles & Debt)'}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {isHindi 
                ? 'कर्ज, शत्रु, कानूनी विवाद और कार्य में अकारण आने वाली रुकावटों का कारक।' 
                : 'Identifies hidden workplace politics, delayed liabilities, and sudden roadblocks.'}
            </p>
          </div>
        </div>
      </div>

      {/* 6. "About this item" Deep Description Section (High-converting psychological copywriting) */}
      <div className="max-w-4xl mx-auto px-4 py-8 border-t border-[#E8DFD5]">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E8DFD5] shadow-md">
          <h2 className="text-xl sm:text-2xl font-black text-[#3E2723] font-serif mb-6 pb-3 border-b border-amber-200 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <span className="text-[#89270B]">ॐ</span>
              <span>{isHindi ? 'इस रिपोर्ट के बारे में (About this Report)' : 'About this Report'}</span>
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              {isHindi ? '८०% छूट • मात्र ₹२९९' : '80% OFF • Flat ₹299'}
            </span>
          </h2>
          <div 
            className="prose prose-amber max-w-none text-sm text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: isHindi 
                ? (landingData.aboutHtmlHi || landingData.aboutHtml) 
                : (landingData.aboutHtml || landingData.aboutHtmlHi) 
            }}
          />
        </div>
      </div>

      {/* 7. NEW: "Frequently Explored Together" ₹299 Products Grid */}
      <div className="max-w-5xl mx-auto px-4 py-10 border-t border-[#E8DFD5]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              {isHindi ? 'अन्य लोकप्रिय वैदिक रिपोर्ट्स' : 'Popular Companion Reports'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#3E2723] font-serif">
              {isHindi ? 'जातक अक्सर यह रिपोर्ट्स भी देखते हैं' : 'Frequently Explored Together'}
            </h2>
          </div>
          <button
            onClick={onNavigateHome}
            className="text-xs font-bold text-[#B44D12] hover:underline flex items-center space-x-1"
          >
            <span>{isHindi ? 'सभी १३ देखें' : 'View All 13'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl p-4 border border-[#E8DFD5] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {isHindi ? 'मात्र ₹२९९' : '₹299 Flat'}
                  </span>
                  <span className="text-[10px] text-gray-400 line-through">₹1499</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm leading-snug">
                  {isHindi ? prod.titleHi : prod.title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                  {isHindi ? prod.shortDescHi : prod.shortDesc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectReport(prod.id)}
                className="w-full mt-3 py-2 px-3 bg-amber-50 hover:bg-[#B44D12] text-[#89270B] hover:text-white font-bold text-xs rounded-lg border border-amber-300 transition-colors text-center"
              >
                {isHindi ? 'यह रिपोर्ट देखें (₹299)' : 'View Report (₹299)'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 8. "Feedback from our users" Reviews Section (From AstroShubh) */}
      <div id="customer-reviews" className="max-w-5xl mx-auto px-4 py-12 border-t border-[#E8DFD5]">
        
        {/* Section Heading */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-100/70 px-3 py-1 rounded-full">
            {isHindi ? 'प्रमाणित समीक्षाएं' : 'Verified Client Reviews'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E2723] font-serif mt-2">
            {isHindi ? 'ग्राहकों का वास्तविक अनुभव' : 'Feedback from our verified users'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isHindi 
              ? 'भारत भर के ८,४००+ संतुष्ट जातकों द्वारा प्रमाणित वैदिक परिणाम' 
              : 'Authentic feedback from 8,420+ certified report buyers across India'}
          </p>
        </div>

        {/* Rating Overview Summary Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFD5] shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Score */}
            <div className="md:col-span-4 text-center md:text-left md:border-r border-gray-100 md:pr-6">
              <div className="text-5xl font-black text-[#3E2723] tracking-tight">4.9</div>
              <div className="flex justify-center md:justify-start text-amber-500 my-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <div className="text-xs font-semibold text-gray-800">
                {isHindi ? '८,४२०+ प्रमाणित समीक्षाओं पर आधारित' : 'Based on 8,420+ verified reviews'}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center justify-center md:justify-start space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isHindi ? '१००% वास्तविक सत्यापित खरीदार' : '100% Genuine Certified Buyers'}</span>
              </div>
            </div>

            {/* Center Rating Bars */}
            <div className="md:col-span-5 space-y-1.5 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="w-12 font-medium">{isHindi ? '५ स्टार' : '5 Star'}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '94%' }} />
                </div>
                <span className="w-8 text-right font-bold text-gray-800">94%</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="w-12 font-medium">{isHindi ? '४ स्टार' : '4 Star'}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '6%' }} />
                </div>
                <span className="w-8 text-right font-bold text-gray-800">6%</span>
              </div>

              <div className="flex items-center space-x-2 opacity-40">
                <span className="w-12 font-medium">{isHindi ? '३ स्टार' : '3 Star'}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-300 rounded-full" style={{ width: '0%' }} />
                </div>
                <span className="w-8 text-right font-bold text-gray-800">0%</span>
              </div>
            </div>

            {/* Right Trust Badges */}
            <div className="md:col-span-3 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 text-[11px] text-[#5D4A3A] space-y-2">
              <div className="flex items-center space-x-1.5 font-bold text-[#89270B]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isHindi ? 'वैदिक गारंटी' : 'Vedic Guarantee'}</span>
              </div>
              <p className="leading-relaxed">
                {isHindi 
                  ? 'सभी समीक्षाएं वास्तविक खरीदारों द्वारा व्हाट्सएप पर रिपोर्ट प्राप्त होने के उपरांत दी गई हैं।' 
                  : 'All reviews are submitted by verified clients post WhatsApp delivery.'}
              </p>
            </div>

          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 mb-6 text-xs font-semibold select-none overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setReviewFilter('all')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              reviewFilter === 'all'
                ? 'bg-[#B44D12] text-white shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {isHindi ? 'सभी समीक्षाएं' : 'All Reviews'}
          </button>
          <button
            type="button"
            onClick={() => setReviewFilter('5star')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center space-x-1 ${
              reviewFilter === '5star'
                ? 'bg-[#B44D12] text-white shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span>{isHindi ? 'केवल ५ स्टार समीक्षाएं' : '5 Stars Only'}</span>
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </button>
        </div>

        {/* Review Cards Grid */}
        {(() => {
          const allList = landingData.reviews || [];
          const filtered = reviewFilter === '5star' 
            ? allList.filter(r => r.rating === 5)
            : allList;
          const displayList = showAllReviews ? filtered : filtered.slice(0, 6);

          return (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayList.map((rev) => (
                  <div 
                    key={rev.id} 
                    className="bg-white rounded-2xl p-5 border border-[#E8DFD5] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Stars & Date */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">{rev.date || (isHindi ? 'हाल ही में' : 'Recently')}</span>
                      </div>

                      {/* Review Text */}
                      <p className="text-xs sm:text-[13px] text-gray-800 leading-relaxed italic font-serif">
                        "{isHindi && rev.textHi ? rev.textHi : rev.text}"
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B44D12] to-[#89270B] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          {rev.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 leading-tight">{rev.name}</div>
                          <div className="text-[10px] text-gray-500">{rev.city}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{isHindi ? 'सत्यापित' : 'Verified'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More / Show Less Toggle Button */}
              {filtered.length > 6 && (
                <div className="text-center mt-8">
                  <button
                    type="button"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="py-2.5 px-6 rounded-xl border border-amber-300 bg-white hover:bg-amber-50 text-[#89270B] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center space-x-1.5 mx-auto"
                  >
                    <span>
                      {showAllReviews 
                        ? (isHindi ? 'कम समीक्षाएं दिखाएं' : 'Show Less Reviews') 
                        : (isHindi ? `और समीक्षाएं पढ़ें (${filtered.length} में से सभी देखें)` : `Read More Verified Reviews (${filtered.length} Reviews)`)}
                    </span>
                    {showAllReviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>
          );
        })()}

      </div>

      {/* 9. "Frequently Asked Questions" Interactive Accordion (From AstroShubh) */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-black text-[#3E2723] font-serif text-center mb-6">
          {isHindi ? 'अक्सर पूछे जाने वाले सवाल (FAQ)' : 'Frequently Asked Questions'}
        </h2>

        <div className="space-y-3">
          {landingData.faqs?.map((faq, idx) => {
            const localizedFaq = translateFaq(faq, isHindi);
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E8DFD5] overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-[#3E2723] flex items-center justify-between hover:bg-amber-50/50 transition-colors"
                >
                  <span>{localizedFaq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-800 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                    {localizedFaq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 10. Live Social Proof Toast */}
      {recentOrderToast && (
        <div className="fixed bottom-5 left-5 z-50 bg-white rounded-xl p-3.5 shadow-2xl border border-amber-300 max-w-xs animate-in slide-in-from-bottom-5 duration-300 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-gray-900 leading-tight">
              {recentOrderToast.name} ({recentOrderToast.city})
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {isHindi 
                ? `${recentOrderToast.time} ${recentOrderToast.reportName} ऑर्डर किया` 
                : `Ordered ${recentOrderToast.reportName} (${recentOrderToast.time})`}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
