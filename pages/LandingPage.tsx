import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, CheckCircle2, X, ChevronDown, Sparkles } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';
import {
  Logo, CallToActionWidget, SocialProofToast,
  PROBLEM_POINTS, TRANSFORMATION_STORIES, FEAR_STATS,
  VALUE_STACK_ITEMS, TESTIMONIALS_LANDING, FAQ_ITEMS_LANDING, INCOME_TIERS,
  COURSES_LANDING, PAGE_PREVIEWS_ROW1, PAGE_PREVIEWS_ROW2
} from './LandingHelpers';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(() => { const D = (3 * 3600 + 36 * 60 + 20) * 1000, r = D - (Date.now() % D); return { h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) }; });
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const calc = () => { const D = (3 * 3600 + 36 * 60 + 20) * 1000, now = Date.now(), r = D - (now % D); setTimeLeft({ h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) }); };
    const t = setInterval(calc, 1000); calc(); return () => clearInterval(t);
  }, []);
  useEffect(() => { const h = () => setShowStickyBar(window.scrollY > 600); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);

  const openCheckout = () => navigate('/checkout');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-x-hidden selection:bg-blue-100 grid-bg">
      {/* ═══ STICKY HEADER ═══ */}
      <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-2xl border-b border-slate-100/60 px-5 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <button onClick={openCheckout} className="hidden md:block text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all premium-stroke" style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 0 15px rgba(249,115,22,0.4)' }}>Download All Courses</button>
          </div>
        </div>
      </header>

      <main>
        {/* 1. HERO — The Hook */}
        <section className="relative pt-0 pb-16 md:pb-24 overflow-hidden bg-white grid-bg">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-500/8 blur-[180px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-indigo-400/6 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-cyan-400/5 blur-[120px] rounded-full" />
          </div>
          <div className="max-w-5xl mx-auto px-5 relative z-10">
            <div className="flex flex-col items-center text-center pt-8 md:pt-16">
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 border border-red-200 rounded-full">
                <CheckCircle size={14} className="text-red-600" />
                <span className="text-xs font-bold text-red-700">Secret Pipeline To 1 Lakh+ Monthly Income (No Paid Software)</span>
              </div>
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-slate-600">50,000+ Indian Designers Already Upgraded • Don't Be Left Behind</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.08] mb-6 text-slate-900 tracking-tight">
                Stop Begging For Clients. <br className="hidden md:block" /> Master 3D Design & <br className="hidden md:block" />
                Let Them <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Beg For You.</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-700 font-bold mb-6 leading-relaxed max-w-3xl">
                Sirf 'Degree' aur AutoCAD se ab job nahi milti. <span className="text-red-600">High-Paying packages chahiye?</span> You Need This. <br className="hidden md:block" />
                <span className="text-slate-500 text-base md:text-xl font-medium italic block mt-2">Join the Top 1% of Indian Designers for just ₹999 before your competitor does.</span>
              </p>
              

              <p className="text-xs text-slate-500 mb-10 font-bold">100% Guaranteed Placements Material • Works on ANY Laptop • Risk-Free 7 Days</p>
              
              {/* Hero Video */}
              <div className="w-full max-w-4xl mb-6 overflow-hidden rounded-2xl shadow-2xl" style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe title="Course overview video" src="https://iframe.mediadelivery.net/embed/489113/e68f78b5-c535-4e8f-aaee-8a44b514a9ec?autoplay=true&loop=true&muted=true&preload=true&responsive=true" loading="eager" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent' }} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen={true} />
              </div>

              {/* Course Thumbnails */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 w-full max-w-4xl mb-8">
                {COURSES_LANDING.map((c) => (
                  <div key={c.id} className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 group cursor-pointer hover:border-blue-500/50 transition-all hover:scale-105">
                    <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{c.software}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* The Bridge */}
              <p className="text-lg md:text-xl font-medium text-slate-600 italic reveal mt-8">"Kal kya socha tha? Aaj kya kar rahe ho? 50,000+ students took action and changed their lives. <strong className="text-red-600 border-b-2 border-red-200">Aapka kya bahana hai?</strong>"</p>
            </div>
          </div>
        </section>

        {/* 1.5. THE AI REALITY CHECK */}
        <section className="py-16 md:py-20 bg-slate-900 border-y border-slate-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          
          <div className="max-w-4xl mx-auto px-5 relative z-10 text-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full reveal">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-red-500 tracking-wider uppercase">2026 Ka Sabse Kadwa Sach (Ignored By Colleges)</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6 reveal">
              "Bhai, AI meri job kha jayega kya?"
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-300 font-medium mb-12 leading-relaxed max-w-3xl mx-auto reveal">
              Nahi. AI aapki job nahi khayega. <br className="hidden md:block" />
              But ek <span className="text-white font-bold border-b-2 border-red-500">smart designer jo AI aur latest software janta hai</span>, woh aapki seat zarur le jayega. Period.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 text-left max-w-3xl mx-auto">
              <div className="bg-slate-800/50 border border-slate-700 p-6 md:p-8 rounded-2xl backdrop-blur-sm reveal hover:border-red-500/30 transition-colors">
                <div className="text-red-400 mb-4 bg-red-400/10 w-12 h-12 rounded-xl flex items-center justify-center"><X size={24} /></div>
                <h3 className="text-xl font-bold text-white mb-3">Sirf AutoCAD = Berozgari</h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">Clients ab 2D line-drawings dekh kar high advance nahi dete. Unko Netflix level 3D views chahiye. Upgrade now or pack your bags and change your career.</p>
              </div>
              <div className="bg-gradient-to-br from-red-900/40 to-rose-900/20 border border-red-500/30 p-6 md:p-8 rounded-2xl backdrop-blur-sm reveal shadow-[0_0_30px_rgba(225,29,72,0.15)] hover:border-red-400/50 transition-colors">
                <div className="text-red-400 mb-4 bg-red-400/10 w-12 h-12 rounded-xl flex items-center justify-center"><Sparkles size={24} /></div>
                <h3 className="text-xl font-bold text-white mb-3">Hybrid System = High-Ticket Projects</h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">SketchUp + V-Ray + AI seekho, and completely crush your local competition. Client paisa dene se mana hi nahi kar payega jab uska sapna 3D me zinda dikhega.</p>
              </div>
            </div>
          </div>
        </section>
        {/* 2. PROOF STATS */}
        <section className="py-10 bg-slate-50 border-y border-slate-200 grid-bg">
          <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEAR_STATS.map((s, i) => (
              <div key={i} className="text-center reveal">
                <span className="text-2xl mb-2 block">{s.icon}</span>
                <span className="text-3xl md:text-4xl font-display font-black text-blue-500">{s.stat}</span>
                <p className="text-xs text-slate-500 mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. MANIFESTO — The Story & The Gap */}
        <section className="py-16 md:py-28 grid-bg bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <p className="text-red-500 text-xs font-mono uppercase tracking-widest mb-4">Ek Reality Check In The Faces Of "Theoretical" Colleges</p>
              <h2 className="text-3xl md:text-5xl font-serif italic text-slate-900 mb-8 leading-snug">"Theory rattne se lakhon ki deals crack nahi hoti. Visibility is everything."</h2>
            </div>
            <div className="reveal space-y-6 text-slate-600 text-base md:text-lg leading-relaxed">
              <p>Let's be brutally honest: <strong className="text-slate-900">'Accha design' hona kaafi nahi hai. Padhai sabne ki hai.</strong></p>
              <p>Jo banda Hollywood-style 3D walkthrough aur photo-real render deta hai... wahi paisa chhapta hai. Woh bhi 2 din me, 2 hafte me nahi.</p>
              <p>Aur ab? <strong className="text-red-500">AI ne sab speed limits tod di hain.</strong> Jo purane tarike use kar rahe hain, unki value ZERO hone wali hai. Designer who uses AI renders instantly and charges 5x more from the same clients.</p>
              <p>4 saal college fees bhari? Phir bhi portfolio khali hai? Expensive ₹1,50,000 ke 'institutes' sirf scam kar rahe hain — wahi puraana syllabus, no real world job guarantee.</p>
              
              <div className="my-10 bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 md:p-8 shadow-soft">
                <p className="font-bold text-slate-900 text-xl mb-4">Toh Humne System Hi Hack Kar Diya.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><CheckCircle size={18} className="text-red-500 shrink-0" /><span className="text-slate-800">12 Core Software Mastery. The complete placement pipeline.</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={18} className="text-red-500 shrink-0" /><span className="text-slate-800">100% Free Software links given. No expensive licenses to buy.</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={18} className="text-red-500 shrink-0" /><span className="text-slate-800">Personal mentor support for life and 10,000+ assets included.</span></li>
                </ul>
                <div className="mt-6 pt-6 border-t border-red-100 flex items-center justify-between">
                  <span className="text-slate-600 text-sm italic font-bold">This entire mega-bundle for an absurd ₹999.</span>
                  <button onClick={openCheckout} className="text-red-600 font-bold text-sm hover:text-red-800 flex items-center gap-1 group">Enroll & Change Your Destiny <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></button>
                </div>
              </div>

              <p className="text-slate-900 font-semibold text-lg md:text-xl border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-xl">Bhai, ₹999 to ek weekend ki party aur Zomato me ud jate hain. Asli sawaal ye hai: <br/><br/>Kya tum ek ₹5-10 Lakh ka yearly package lose karna afford kar sakte ho just because you hesitated today?</p>
            </div>
          </div>
        </section>

        {/* 4. STUDENT WORK CAROUSEL — Visual Proof */}
        <section className="py-16 md:py-24 bg-slate-50 overflow-hidden border-b border-slate-200 grid-bg">
          <div className="max-w-5xl mx-auto px-5 mb-12 text-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">This is what a <span className="text-red-600">₹999 'Zero-Risk' Decision</span> looks like.</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto italic font-serif">"Pehle client 2000 Rs ke liye chik-chik karta tha. Ab wo muh-mangi keemat de rahe hain."</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex gap-3 md:gap-8 animate-scroll-left hover:pause">
              {[...PAGE_PREVIEWS_ROW1, ...PAGE_PREVIEWS_ROW1].map((img, i) => (
                <div key={i} className="w-[200px] md:w-[400px] shrink-0 aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-slate-200 shadow-2xl relative group bg-slate-100">
                  <img src={img} alt="Student Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 md:gap-8 animate-scroll-right hover:pause">
              {[...PAGE_PREVIEWS_ROW2, ...PAGE_PREVIEWS_ROW2].map((img, i) => (
                <div key={i} className="w-[200px] md:w-[400px] shrink-0 aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-slate-200 shadow-2xl relative group bg-slate-100">
                  <img src={img} alt="Student Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. OLD vs NEW — The Contrast */}
        <section className="py-16 md:py-24 bg-white grid-bg">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">Failure Ka Raasta vs. <span className="text-emerald-600">1 Lakh/Month Ka Blueprint</span></h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="reveal grid-bg border border-red-200 rounded-2xl p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"><X size={20} className="text-red-500" /></div><h3 className="text-xl font-bold text-red-500">Abhi Bhi Yehi Kar Rahan Hai?</h3></div>
                <ul className="space-y-4">
                  {PROBLEM_POINTS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm"><span className="mt-1 shrink-0 text-base">{item.emoji}</span>{item.text}</li>
                  ))}
                  {['Searching random tutorials that contradict each other', 'Paying ₹40,000/month for software you can get for free', 'Finished your degree but don\'t have a single portfolio-ready render'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm"><X size={14} className="text-red-500 mt-1 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="reveal bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center"><CheckCircle size={20} className="text-emerald-600" /></div><h3 className="text-xl font-bold text-slate-900">Smart Logon Ka System</h3></div>
                <ul className="space-y-4">
                  {['Structured pipeline: AutoCAD → SketchUp → V-Ray → Lumion → D5 → AI', 'AI renders for you. You design. 10x output.', 'Professional portfolio in 15 days — even from zero', 'All software FREE — no expensive licenses ever', 'Mentor support even at 11 PM before a deadline'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm"><CheckCircle size={14} className="text-blue-500 mt-1 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* 6. INCOME TIERS — The ROI */}
            <div className="mt-20 pt-16 border-t border-slate-200">
              <div className="reveal text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">Apni First Deal Se Pura Paisa Vasool. <span className="text-emerald-600">Baaki Saari Zindagi Sirf Profit.</span></h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {INCOME_TIERS.map((tier, i) => (
                  <div key={i} className="reveal bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-400/40 transition-all shadow-soft flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4"><span className="text-sm font-bold text-slate-900 leading-tight w-2/3">{tier.label}</span><span className="text-3xl">{tier.icon}</span></div>
                    <div className="flex items-center justify-between">
                      <div><p className="text-[10px] font-mono text-slate-500 uppercase">Before</p><p className="text-slate-400 text-sm line-through">{tier.before}</p></div>
                      <ArrowRight size={16} className="text-blue-400" />
                      <div className="text-right"><p className="text-[10px] font-mono text-blue-500 uppercase">After</p><p className="text-emerald-600 text-sm font-bold">{tier.after}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. WHAT YOU GET — The Offer */}
        <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 grid-bg">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-10">
              <p className="text-red-500 text-xs font-mono uppercase tracking-widest mb-3">Included with enrollment</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">Tumhara Unfair Advantage - <span className="text-red-600">Aaj aur Abhi Se</span></h2>
              <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">One bundle, one workflow, lifetime access. Everything your competitor wishes they had.</p>
            </div>
            <div className="reveal max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-soft">
              {VALUE_STACK_ITEMS.map((item, i) => (
                <div key={i} className={`flex justify-between items-center px-6 py-4 ${i !== VALUE_STACK_ITEMS.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="flex items-center gap-3"><CheckCircle size={16} className="text-blue-500 shrink-0" /><span className="text-sm text-slate-800 font-medium">{item.name}</span></div>
                  <span className="text-sm font-bold text-slate-500">{item.value}</span>
                </div>
              ))}
              
              <div className="bg-emerald-50 border-t border-emerald-100 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-600 shrink-0" /><span className="text-sm text-emerald-900 font-bold">All Software (Free/Student Edition Links)</span></div>
                <span className="text-sm font-black text-emerald-600">INCLUDED</span>
              </div>

              <div className="bg-blue-50/50 border-t border-blue-200 px-6 py-6 flex flex-col items-center gap-6 justify-center">
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
                  <span className="text-slate-900 font-bold text-center">Lifetime Access + Free Updates</span>
                </div>
                <button onClick={openCheckout} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group premium-stroke">
                  Access Everything Instantly <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS — Social Proof */}
        <section className="py-16 md:py-24 bg-white overflow-hidden grid-bg">
          <div className="max-w-5xl mx-auto px-5 mb-12">
            <div className="text-center mb-12">
              <p className="text-blue-500 text-xs font-mono uppercase tracking-widest mb-4">Student Reviews</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">Students & <span className="text-blue-500">Professionals</span></h2>
              <p className="text-slate-600 text-lg">50,000+ learners • 4.9★ average rating</p>
            </div>

            {/* Featured Transformations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {TRANSFORMATION_STORIES.map((story, i) => (
                <div key={i} className="reveal bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-2xl p-8 shadow-soft relative overflow-hidden transition-all hover:border-blue-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <span className="text-4xl mb-4 block">{story.emoji}</span>
                  <div className="flex items-center gap-2 mb-6"><span className="font-bold text-slate-900 text-lg">{story.name}</span><span className="text-sm font-medium text-blue-600">• {story.role}</span></div>
                  <div className="mb-4"><p className="text-[10px] font-mono uppercase text-slate-400 mb-1 tracking-wider">Before</p><p className="text-slate-600 text-sm leading-relaxed">{story.before}</p></div>
                  <div><p className="text-[10px] font-mono uppercase text-blue-500 mb-1 tracking-wider">After</p><p className="text-slate-900 text-base font-bold leading-relaxed">{story.after}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-6 animate-scroll-left hover:pause">
              {[...TESTIMONIALS_LANDING, ...TESTIMONIALS_LANDING].map((t, i) => (
                <div key={i} className="w-[350px] shrink-0 bg-white border border-slate-200 p-8 rounded-3xl hover:border-blue-200 transition-all shadow-soft">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-blue-500 text-blue-500" />)}</div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600">{t.name[0]}</div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1">{t.name} <CheckCircle size={12} className="text-emerald-600" /></p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t.role} • {t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-5 mt-16 md:mt-24 text-center reveal">
            <img src="/renders/mentors.png" alt="Industry Experts" className="w-full h-auto drop-shadow-2xl" />
          </div>
        </section>

        {/* 9. FAQ + FINAL CTA */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 grid-bg">
          <div className="max-w-3xl mx-auto px-5 mb-16">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">Common Questions</h2>
              <p className="text-slate-600 text-base">All your questions, answered.</p>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS_LANDING.map((faq, i) => (
                <details key={i} className="reveal group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-soft" open={openFaqIndex === i}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none" onClick={(e) => { e.preventDefault(); setOpenFaqIndex(openFaqIndex === i ? null : i); }}>
                    <span className="text-sm md:text-base font-semibold text-slate-900 pr-6">{faq.question}</span>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform shrink-0 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                  </summary>
                  <div className="px-5 pb-5"><p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>

          <CallToActionWidget 
            timeLeft={timeLeft} 
            onClick={openCheckout} 
            headline="Just one question left — when will you start?" 
            subtext="AI is widening the gap every day. 50,000+ students chose the right side. This is your moment." 
          />
        </section>
      </main>

      <footer className="bg-slate-900 py-12 px-6 text-center border-t border-slate-800 text-white/70">
        <p className="text-xs uppercase tracking-[0.2em] mb-4">Avada Design & Architecture • 2026</p>
        <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400"><span>Privacy</span><span>Terms</span><span>Support</span></div>
      </footer>

      <div className={`fixed bottom-0 left-0 right-0 z-[70] bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2 shadow-[0_-4px_30px_rgba(15,23,42,0.08)] transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto">
          <button onClick={openCheckout} className="w-full relative group overflow-hidden text-white rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all py-2.5 flex items-center px-4" style={{ background: 'linear-gradient(90deg,#f97316,#ea580c,#f97316)', boxShadow: '0 0 20px rgba(249,115,22,0.4)' }}>
            <div className="relative z-10 w-full flex items-center justify-between">
              <div className="flex flex-col items-start leading-tight gap-1">
                <span className="text-[11px] md:text-sm font-black uppercase tracking-widest text-yellow-200 animate-pulse bg-black/20 px-2 py-0.5 rounded-md inline-block">⚠️ Offer Ends Soon</span>
                <span className="text-[15px] md:text-lg font-black uppercase tracking-[0.05em] text-white">Download All Courses</span>
              </div>
              <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform drop-shadow-md" />
            </div>
          </button>
        </div>
      </div>

      <WhatsAppButton />
      <SocialProofToast />
    </div>
  );
};

export default LandingPage;
