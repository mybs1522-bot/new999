import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, CheckCircle, Users, X } from 'lucide-react';

export const getDriveUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export const RAW_JOINERS = [
  { name: "Priya S.", city: "Mumbai", time: "2 min ago" },
  { name: "Rahul V.", city: "Delhi", time: "5 min ago" },
  { name: "Ananya G.", city: "Pune", time: "8 min ago" },
  { name: "Vikram S.", city: "Jaipur", time: "12 min ago" },
  { name: "Meera I.", city: "Chennai", time: "15 min ago" },
  { name: "Aravind S.", city: "Bangalore", time: "18 min ago" },
  { name: "Neha K.", city: "Lucknow", time: "22 min ago" },
  { name: "Rohit M.", city: "Ahmedabad", time: "25 min ago" },
  { name: "Simran P.", city: "Chandigarh", time: "30 min ago" },
  { name: "Arjun D.", city: "Hyderabad", time: "33 min ago" },
];

export const PROBLEM_POINTS = [
  { emoji: "⏰", text: "Raat Bhar Jagkar AutoCAD Pe Kaam Kar Rahe Ho? Our students finish in 40 minutes and chill." },
  { emoji: "💸", text: "Dusron se ₹10,000 me render banwa ke client de rahe ho? That money belongs in your pocket." },
  { emoji: "📉", text: "Client Reject Kar Diya Kyunki Tumhara 3D Render 'Boring' Tha? Usi Client Ko Dusra Banda Le Gaya." }
];

export const TRANSFORMATION_STORIES = [
  { name: "Priya P.", role: "Freelancer → ₹80,000/project", before: "Client ₹2000 ke liye chik-chik karta tha. Raat bhar kaam, subah ghosting.", after: "Now they gladly pay ₹80,000+ advance. No negotiations.", emoji: "💰" },
  { name: "Rahul V.", role: "Student → 3 Job Offers", before: "Fresh graduate. Applied to 40 places: HRs ignored.", after: "Learned AI + V-Ray in 15 days. Got 3 offers paying 3x standard fresher salary.", emoji: "🎓" }
];

export const PAGE_PREVIEWS_ROW1 = [
  '/renders/RENDER-1.jpg', '/renders/RENDER-2.jpg', '/renders/RENDER-3.jpg',
  '/renders/RENDER-4.jpg', '/renders/RENDER-5.jpg', '/renders/RENDER-6.jpg',
  '/renders/RENDER-7.jpg', '/renders/RENDER-8.jpg', '/renders/RENDER-9.jpg',
  '/renders/RENDER-10.jpg', '/renders/RENDER-11.jpg', '/renders/RENDER-12.jpg',
  '/renders/RENDER-13.jpg',
];
export const PAGE_PREVIEWS_ROW2 = [
  '/renders/RENDER-14.jpg', '/renders/RENDER-15.jpg', '/renders/RENDER-16.jpg',
  '/renders/RENDER-17.jpg', '/renders/RENDER-18.jpg', '/renders/RENDER-19.jpg',
  '/renders/RENDER-20.jpg', '/renders/RENDER-21.jpg', '/renders/RENDER-22.jpg',
  '/renders/RENDER-23.jpg', '/renders/RENDER-24.jpg', '/renders/RENDER-25.jpg',
];

export const FEAR_STATS = [
  { stat: '73%', label: 'B.Arch/Interior grads are struggling for jobs because unko sirf theory aati hai', icon: '📉' },
  { stat: '5x', label: 'HRs specifically search for \'AI + V-Ray\' resumes. 5x faster placements.', icon: '🚀' },
  { stat: '₹50k+', label: 'is what an average studio pays an outsourced 3D visualizer per project', icon: '💸' },
  { stat: '15 days', label: 'from zero experience to your first paid gig — if you start right now', icon: '⏳' },
];

/* ─── LOGO ─── */
export const Logo = () => (
  <div className="flex flex-col items-center text-center cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
    <span className="font-display font-bold text-lg tracking-tight leading-none text-slate-900 whitespace-nowrap">Avada</span>
    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-600 whitespace-nowrap mt-1">Design</span>
  </div>
);

/* ─── FLIP CLOCK ─── */
const FlipDigit = ({ value }: { value: string }) => (
  <div className="flip-digit-wrapper"><div className="flip-digit"><span>{value}</span></div></div>
);

/* ─── CTA WIDGET ─── */
export const CallToActionWidget = ({ timeLeft, onClick, headline, subtext }: { timeLeft: { h: number; m: number; s: number }; onClick: () => void; headline?: string; subtext?: string }) => {
  const f = (v: number) => v.toString().padStart(2, '0');
  const h = f(timeLeft.h), m = f(timeLeft.m), s = f(timeLeft.s);
  return (
    <div className="relative py-12 md:py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {headline && <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 tracking-tight">{headline}</h3>}
        {subtext && <p className="text-zinc-400 text-sm mb-6">{subtext}</p>}
        {!headline && <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-6">🚨 TIMER IS TICKING. DON'T REGRET MISSING THIS.</p>}
        <div className="flex items-center justify-center gap-1 md:gap-2 mb-6">
          <div className="flip-clock-group"><div className="flex gap-1"><FlipDigit value={h[0]} /><FlipDigit value={h[1]} /></div><span className="flip-clock-label">HRS</span></div>
          <span className="text-xl md:text-3xl font-bold text-zinc-600 -mt-4">:</span>
          <div className="flip-clock-group"><div className="flex gap-1"><FlipDigit value={m[0]} /><FlipDigit value={m[1]} /></div><span className="flip-clock-label">MIN</span></div>
          <span className="text-xl md:text-3xl font-bold text-zinc-600 -mt-4">:</span>
          <div className="flip-clock-group"><div className="flex gap-1"><FlipDigit value={s[0]} /><FlipDigit value={s[1]} /></div><span className="flip-clock-label">SEC</span></div>
        </div>
        <div className="mb-6">
          <p className="text-red-400 font-semibold text-sm mt-2">Special Offer — Don't miss this ₹999 steal deal</p>
        </div>
        <div className="w-full max-w-md mx-auto">
          <button onClick={onClick} className="cta-primary w-full text-white px-8 py-4 md:py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.98] premium-stroke" style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', boxShadow: '0 6px 20px -4px rgba(249,115,22,0.5), 0 12px 40px -8px rgba(234,88,12,0.3)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <span className="text-lg md:text-xl font-display font-bold uppercase tracking-widest relative z-10">Claim Your High-Paying Career</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 md:gap-8 text-[9px] md:text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">
          <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> 7-Day Money-Back</div>
          <div className="w-[1px] h-3 bg-zinc-700"></div>
          <div className="flex items-center gap-1.5"><Zap size={14} className="text-blue-400" /> Instant Access</div>
          <div className="w-[1px] h-3 bg-zinc-700 hidden sm:block"></div>
          <div className="hidden sm:flex items-center gap-1.5"><Users size={14} className="text-blue-400" /> All Software Included Free</div>
        </div>
      </div>
    </div>
  );
};

/* ─── SOCIAL PROOF TOAST ─── */
export const SocialProofToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const show = () => { setVisible(true); setTimeout(() => { setVisible(false); setTimeout(() => setIdx(p => (p + 1) % RAW_JOINERS.length), 500); }, 4000); };
    const t1 = setTimeout(show, 6000);
    const t2 = setInterval(show, 15000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);
  const j = RAW_JOINERS[idx];
  return (
    <div className={`fixed bottom-20 left-4 z-[70] transition-all duration-500 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3 max-w-xs">
        <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center shrink-0"><CheckCircle size={16} className="text-emerald-600" /></div>
        <div>
          <p className="text-sm font-bold text-slate-900">{j.name} from {j.city}</p>
          <p className="text-xs text-slate-500">just enrolled • {j.time}</p>
        </div>
      </div>
    </div>
  );
};

/* ─── CONSTANTS ─── */
export const VALUE_STACK_ITEMS = [
  { name: 'AutoCAD Precision Drafting Course', value: 'Included' },
  { name: 'SketchUp 3D Modeling Course', value: 'Included' },
  { name: 'V-Ray Photo-Realism Masterclass', value: 'Included' },
  { name: 'Lumion Cinematic Walkthroughs', value: 'Included' },
  { name: 'D5 Real-Time Rendering', value: 'Included' },
  { name: 'AI Design & Rendering Course', value: 'Included' },
  { name: '10,000+ Premium Texture Library', value: 'Included' },
  { name: '2,000+ Drag-and-Drop 3D Models', value: 'Included' },
  { name: 'Software Installation Hub', value: 'Included' },
  { name: 'Private Mentor Access & Portfolio Review', value: 'Included' },
  { name: 'Freelancing Pricing Playbook', value: 'Included' },
  { name: 'Certified Digital Diploma', value: 'Included' },
];

export const TESTIMONIALS_LANDING = [
  { name: 'Priya P.', role: 'Freelance Designer', location: 'Mumbai, IN', content: 'From AutoCAD to AI, everything is covered. The texture library is a goldmine. I used to spend hours hunting for materials — now everything is ready to go.' },
  { name: 'Aravind S.', role: 'Senior Architect', location: 'Bangalore, IN', content: 'The Revit workflow section alone saved our firm countless hours. Undeniable value for real-world projects.' },
  { name: 'Meera I.', role: '3D Visualizer', location: 'Chennai, IN', content: 'The V-Ray + 3ds Max combo is a game-changer. My real estate clients are blown away by the realism of the renders.' },
  { name: 'Rahul V.', role: 'Architecture Student', location: 'Delhi, IN', content: 'Landed my dream internship at a top firm because I was the only candidate who knew Enscape VR and AI Design.' },
  { name: 'Ananya G.', role: 'Interior Designer', location: 'Pune, IN', content: 'I now present 10 variations in the time it used to take for one. Best ₹999 I ever spent.' },
  { name: 'Vikram S.', role: 'Landscape Architect', location: 'Jaipur, IN', content: 'D5 Render lets me make live changes during client meetings. Blows them away every time. Highly recommended.' },
  { name: 'Neha K.', role: 'Studio Owner', location: 'Lucknow, IN', content: 'My team of 4 now does the work that used to take 8 people. No more outsourcing. Profit doubled.' },
  { name: 'Rohit M.', role: 'Freelance Visualizer', location: 'Ahmedabad, IN', content: 'Went from ₹40,000/month freelancing to consistent ₹3,00,000+ months. The V-Ray module alone was worth 100x the price.' },
  { name: 'Simran P.', role: 'Design Student', location: 'Chandigarh, IN', content: 'Started from zero experience. Didn\'t even know what SketchUp was. 15 days later, my portfolio landed me my first paid gig (₹25,000!).' },
  { name: 'Arjun D.', role: 'Architect & Educator', location: 'Hyderabad, IN', content: 'I teach at a university and now recommend this to all my students. More practical than most 4-year programs.' },
];

export const FAQ_ITEMS_LANDING = [
  { question: "Is it really just ₹999 for all 12 courses? Kuch hidden fee to nahi?", answer: "Koi catch nahi. Koi EMI bait nahi. 1-time ₹999 payment for lifetime. 50,000+ Indians trust this system to build their careers instead of paying ₹1,50,000+ at local institutes." },
  { question: "Do I need an expensive computer?", answer: "Not at all! A decent laptop with a basic graphics card works perfectly. We also teach cloud rendering tricks for slower machines, so even a ₹30,000 laptop can produce stunning results." },
  { question: "I'm a complete beginner with zero experience. Will I feel lost?", answer: "Absolutely not. We literally start from 'how to download and open the software.' Every module builds step-by-step, and you get mentor support whenever you're stuck." },
  { question: "Kya mujhe English aani chahiye software seekhne ke liye?", answer: "Bilkul nahi! Clients ko tumhare 3D designs aur renders se farak padta hai, vocabulary se nahi. Software seekho, result do, aur high-paying projects close karo." },
  { question: "How quickly will I see results?", answer: "Give it 15 focused days (1-2 hours daily). By Day 5, you'll have your first photorealistic render. By Day 15, you'll have a portfolio piece that looks like it came from a professional studio. If you don't feel dramatically more confident, full refund." },
  { question: "Is the software included?", answer: "We provide direct links to official free, student, and trial versions — SketchUp, V-Ray, Lumion, D5, AutoCAD. You do NOT need expensive licenses. Many tools are completely free for students." },
  { question: "Can I get a refund if I don't like it?", answer: "100%. No-questions-asked 7-day refund policy. Send us an email, money back within 48 hours. If you're not blown away by the value, we don't want your ₹999. Simple." },
  { question: "Is it just theory or will I build real projects?", answer: "Every module is project-based. You won't just watch — you'll build real interiors, exteriors, renders, and walkthroughs alongside the instructor. You'll finish with 6+ portfolio-ready projects, not just certificates." },
  { question: "How is this different from YouTube tutorials?", answer: "YouTube gives you random fragments. This is a complete, structured system — from zero to professional — in a specific order that builds your skills properly. Plus 10,000+ assets, mentor support, and certification. That's why 50,000+ students chose this over free content." },
  { question: "Will these skills actually help me earn more?", answer: "Our students charge ₹3,000-₹10,000 per rendered image, ₹50,000+ per design, and ₹1,00,000-₹5,00,000 per cinematic walkthrough. The ROI on ₹999 is incredible. Many students earn their money back within the first week." },
  { question: "Can I access it on my phone?", answer: "Yes! All courses are hosted online and work on any device — laptop, tablet, or phone. Learn at your own pace, anytime, anywhere. Your access never expires." },
];

export const INCOME_TIERS = [
  { label: 'Single Render Image', before: '₹500', after: '₹5,000+', icon: '🖼️' },
  { label: 'Interior Design (Flat)', before: '₹10,000', after: '₹80,000+', icon: '🏠' },
  { label: 'Cinematic Walkthrough', before: '₹0', after: '₹1,50,000+', icon: '🎬' },
  { label: 'Freelance Monthly / Salary', before: 'Struggling at ₹20k', after: 'Consistent ₹2 Lakhs+', icon: '💰' },
];

export const COURSES_LANDING = [
  {
    id: '1', title: 'AutoCAD Mastery', software: 'AutoCAD', students: '42.5k',
    description: 'Stop wasting 4 hours on a single floor plan. Master the exact shortcuts, workflows, and drafting secrets used by top firms.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1fV5bz4JDugh8HxLMJ0fXu5K5sDj3qlSR',
    learningPoints: ['Draft precision plans for builders', 'Speed shortcuts that cut work by 60%', 'Professional detailing that wins bids'],
    workflowImpact: 'Get your weekends back — permanently.'
  },
  {
    id: '3', title: 'SketchUp 3D', software: 'SketchUp', students: '55k',
    description: 'Turn flat sketches into jaw-dropping 3D models. Build complex interiors and exteriors in hours, not days.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1wl6by5AO5MiPeoYsZ8F6Zi5AJahoeTQo',
    learningPoints: ['Model 5x faster than your peers', 'Organize scenes that never crash', 'One-click render-ready models'],
    workflowImpact: 'Build in hours what takes others days.'
  },
  {
    id: '5', title: 'V-Ray Realism', software: 'V-Ray', students: '48k',
    description: 'Transform models into photographs so realistic, clients can\'t tell the difference. Master lighting, materials, and post-production.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1aHEt_z78tYD_0Cn66DiduAnhwn-o8El8',
    learningPoints: ['Lighting that rivals a ₹5k photoshoot', 'Materials indistinguishable from real life', 'Post-production secrets from top studios'],
    workflowImpact: 'Charge ₹3,000–₹10,000 per render image.'
  },
  {
    id: '6', title: 'Lumion Cinema', software: 'Lumion', students: '31k',
    description: 'Static images bore clients. Cinematic video walkthroughs sell projects in 60 seconds flat.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1XW2DDHVa1Qc15NcZ3wUKMFRT7LkyZMCt',
    learningPoints: ['Cinematic camera moves that sell', 'Bring scenes to life: people, trees, weather, cars', 'Render 60fps walkthroughs fast'],
    workflowImpact: 'Close clients in 60 seconds.'
  },
  {
    id: '7', title: 'D5 Render', software: 'D5 Render', students: '19k',
    description: 'Real-time rendering changes the game. See every material, lighting, and angle change instantly.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1vbV4j6K9sgzbbZ7qlRdgqPTXWiHBPLsr',
    learningPoints: ['Zero wait time — see changes live', 'Drag-and-drop asset workflow', '4K cinematic images in seconds'],
    workflowImpact: 'Change designs live during client meetings.'
  },
  {
    id: '9', title: 'AI Advantage', software: 'AI Architecture', students: '75k',
    description: 'Generate stunning design concepts before you finish your coffee. Learn the AI tricks used by top studios.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1s-HzZVKpc9F92mLW2gMOPk0kVrKAqUIS',
    learningPoints: ['Generate 10 concepts in 10 minutes', 'Use AI to fix and enhance renders', 'Free tools that replace expensive software'],
    workflowImpact: 'Never start from a blank page again.'
  },
];
