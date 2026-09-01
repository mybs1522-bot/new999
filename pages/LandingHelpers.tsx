import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, CheckCircle, CheckCircle2, Users, X, Sparkles, Star, Award, Clock, DollarSign, BookOpen, Gift, Check, Flame, MessageSquare, AlertCircle } from 'lucide-react';

export const getDriveUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export const RAW_JOINERS = [
  { name: "Priya Sharma", city: "Mumbai", time: "1 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Rahul Verma", city: "New Delhi", time: "3 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Ananya Gupta", city: "Pune", time: "5 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Vikramjit Singh", city: "Jaipur", time: "7 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Meera Iyer", city: "Chennai", time: "9 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Aravind Reddy", city: "Bengaluru", time: "12 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Neha Kulkarni", city: "Nagpur", time: "14 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Rohit Mehta", city: "Ahmedabad", time: "16 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Simran Kaur", city: "Chandigarh", time: "19 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Arjun Deshmukh", city: "Hyderabad", time: "22 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Tanmay Bhattacharya", city: "Kolkata", time: "25 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Sneha Patel", city: "Surat", time: "28 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Deepak Choudhary", city: "Lucknow", time: "31 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Pooja Hegde", city: "Mangalore", time: "34 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Karan Johar", city: "Indore", time: "38 min ago", plan: "12-Course Architecture Master Bundle" },
];

export const PAIN_TRIGGERS_INDIAN = [
  {
    emoji: "😫",
    title: "Clients Rejecting Renders as 'Cartoonish / Fake'?",
    desc: "You spent 14+ hours modeling, but lighting looks flat, textures look fake, and the client refuses to release the milestone advance payment."
  },
  {
    emoji: "🐢",
    title: "Waiting 3-5 Hours for 1 Image While PC Freezes?",
    desc: "Your laptop fans scream, V-Ray crashes at 95%, and then client says: 'Bhaiya thoda sofa color change kar do'. Another full day wasted!"
  },
  {
    emoji: "📉",
    title: "Stuck at ₹15,000–₹25,000/Month Junior Salary?",
    desc: "Colleges teach outdated 2D drafting from 2012 while top architectural studios and NRI luxury clients only hire designers with 4K hyper-realistic render portfolios."
  },
  {
    emoji: "🤖",
    title: "Scared AI Will Wipe Out 3D Interior Designers?",
    desc: "AI is replacing slow modelers. But designers who know how to command AI + 3D are finishing projects 10x faster and charging ₹50,000+ per room package!"
  }
];

export const SOLUTION_PILLARS = [
  {
    step: "01",
    badge: "STAGE 1: 2D BLUEPRINTS",
    title: "AutoCAD & Revit BIM Pro Drafting",
    desc: "Draft sanction-ready floor plans, electrical layouts, and working drawings in 60 minutes with pro industry shortcut keys.",
    icon: "📐",
    result: "Contractor-ready drawings with zero construction site errors"
  },
  {
    step: "02",
    badge: "STAGE 2: 3D MODELING",
    title: "SketchUp Pro + 3ds Max Luxury Interiors",
    desc: "Model modular kitchens, luxury bedrooms, false ceilings, and complex elevations in minutes using drag-and-drop assets.",
    icon: "🏛️",
    result: "Turn 2D floor plans into walk-in 3D spaces in under 2 hours"
  },
  {
    step: "03",
    badge: "STAGE 3: PHOTOREALISM",
    title: "V-Ray, Lumion 2024 & D5 Render 4K",
    desc: "Master sunlight simulation, natural indirect lighting, Italian marble reflections, and cinematic 60fps video walkthroughs.",
    icon: "📸",
    result: "Renders so real that clients think they are actual finished site photos"
  },
  {
    step: "04",
    badge: "STAGE 4: AI SUPERPOWERS",
    title: "Midjourney & Stable Diffusion Architecture AI",
    desc: "Generate 50 high-end interior concept variations in 2 minutes right in front of your client. Never start from a blank screen again.",
    icon: "⚡",
    result: "Close client token advances on the very first concept meeting"
  }
];

export const WHO_IS_THIS_FOR = [
  {
    icon: "🎓",
    role: "Architecture & Civil Students",
    badge: "College to Job Ready",
    desc: "Bypass outdated theoretical college syllabus. Build a job-winning 4K 3D portfolio and land ₹5–8 LPA studio placements with confidence."
  },
  {
    icon: "🛋️",
    role: "Interior Designers & Decorators",
    badge: "Close Clients 10x Faster",
    desc: "Stop depending on slow external 3D freelancers. Present photorealistic 3D walk-in concepts and lock 50% advance token payments on the spot."
  },
  {
    icon: "💻",
    role: "3D Visualizers & Freelancers",
    badge: "Scale Project Rates",
    desc: "Upgrade from crash-prone, slow V-Ray renders to fast D5 Render + AI. Start charging ₹25,000 to ₹50,000+ per complete project."
  },
  {
    icon: "🏗️",
    role: "Contractors, Builders & Site Engineers",
    badge: "Prevent Site Errors",
    desc: "Show clients exactly how their dream villa, duplex, or modular interior will look before laying a single brick or cutting wood."
  },
  {
    icon: "🚀",
    role: "Complete Beginners (Zero Experience)",
    badge: "Step-by-Step From Day 1",
    desc: "No technical design background needed. Every single course starts with interface basics and takes you to advanced professional level."
  }
];

export const TRANSFORMATION_STORIES = [
  {
    name: "Priya Patel",
    city: "Mumbai, MH",
    role: "Freelance Interior Designer",
    before: "Was struggling with slow YouTube tutorials. Renders looked cartoonish, PC kept crashing on V-Ray, and clients bargained for ₹1,500 per view.",
    after: "Mastered D5 Render + AI workflow in 12 days. Now charges ₹8,500 per render and closed a ₹1.8 Lakh full 3BHK interior project in Bandra.",
    incomeIncrease: "4.5x Income Growth",
    emoji: "✨",
    rating: 5
  },
  {
    name: "Rahul Varma",
    city: "Delhi NCR",
    role: "Architecture Graduate",
    before: "Zero practical studio knowledge from college. Terrified of interviews because his portfolio had outdated AutoCAD line drawings.",
    after: "Built a jaw-dropping 15-project 4K portfolio with Unreal Engine 5 VR and Lumion. Landed a ₹6.8 LPA junior architect role at a top Gurugram firm.",
    incomeIncrease: "Top Studio Placement",
    emoji: "🎓",
    rating: 5
  },
  {
    name: "Aravind Sharma",
    city: "Bengaluru, KA",
    role: "Studio Principal / Architect",
    before: "Team took 4-5 days to deliver one design proposal. Lost lucrative tech-founder villa projects to fast visualization studios.",
    after: "Trained his 4 draftsmen using this bundle. Proposal speed jumped from 5 days to 6 hours. Studio revenue crossed ₹8 Lakhs/month.",
    incomeIncrease: "300% Studio Output",
    emoji: "🚀",
    rating: 5
  },
  {
    name: "Meera Iyer",
    city: "Chennai, TN",
    role: "3D Visualizer & NRI Freelancer",
    before: "Working 12-hour shifts at a drafting agency for ₹22,000/month with zero creative freedom.",
    after: "Created an Upwork & Instagram portfolio targeting Dubai & US real-estate builders. Now earns $1,800+/month working from home.",
    incomeIncrease: "Earns in Dollars ($)",
    emoji: "💎",
    rating: 5
  }
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
  { stat: '52,480+', label: 'Indian Architects & Designers Enrolled with 4.9★ Rating', icon: '🎓' },
  { stat: '10x Faster', label: 'Client Approvals with Real-time D5 + Lumion + AI Workflow', icon: '⚡' },
  { stat: '₹50k - ₹1.5L', label: 'Average Monthly Freelance Earning Potential post completion', icon: '💰' },
  { stat: '30 Days', label: 'Step-by-step from beginner to creating 4K magazine-grade 3D designs', icon: '⏱️' },
];

export const FREE_BONUSES = [
  {
    id: "b1",
    title: "10,000+ Indian & Modern 3D Models Library",
    worth: "₹14,999",
    desc: "Ready-to-use Modular Kitchens, Godrej Wardrobes, Mandir / Pooja Units, Luxury Italian Sofas, Master Beds & Ceiling Light Fixtures. Drag & drop directly into SketchUp / 3ds Max.",
    icon: "🛋️",
    badge: "MOST POPULAR"
  },
  {
    id: "b2",
    title: "5,000+ Ultra HD 4K PBR Materials & Textures",
    worth: "₹7,999",
    desc: "Italian Statuario Marble, Teak & Walnut Wood, Fluted Charcoal Panels, Fabric Textures, Terrazzo, Corian & Gold Brass Accents in 4K resolution.",
    icon: "🎨",
    badge: "FREE TODAY"
  },
  {
    id: "b3",
    title: "Indian Client Quotation & Freelance Contract Toolkit",
    worth: "₹4,999",
    desc: "Word/PDF editable contract templates, price quotation sheets (per sq. ft. & per room), and script to demand 50% advance token without resistance.",
    icon: "📋",
    badge: "HIGH EARNING"
  },
  {
    id: "b4",
    title: "150+ Master AI Architecture Prompts Bible",
    worth: "₹3,999",
    desc: "Secret copy-paste text prompts for Midjourney & Stable Diffusion to create hyper-realistic elevations, luxury washrooms, and commercial interiors in seconds.",
    icon: "🪄",
    badge: "AI POWER"
  },
  {
    id: "b5",
    title: "ISO-Verified Digital Skill Certificate",
    worth: "₹2,999",
    desc: "Shareable skill credential to boost your LinkedIn profile, resume, and studio portfolio to impress clients and recruiters.",
    icon: "📜",
    badge: "CAREER BOOSTER"
  },
  {
    id: "b6",
    title: "24/7 Dedicated WhatsApp Support & Installation Links",
    worth: "Priceless",
    desc: "Stuck on software installation? Render crashing? Message our expert tech team on WhatsApp anytime for prompt, friendly resolution.",
    icon: "💬",
    badge: "LIFETIME VIP"
  }
];

export const VALUE_STACK_ITEMS = [
  { name: '1. AutoCAD Precision Drafting & Floor Plan Mastery', value: '₹4,999' },
  { name: '2. Autodesk Revit BIM Architecture Masterclass', value: '₹5,999' },
  { name: '3. SketchUp Pro 3D Fast Modeling Blueprint', value: '₹4,999' },
  { name: '4. 3ds Max Luxury Interior Design & Parametric Modeling', value: '₹6,999' },
  { name: '5. V-Ray Photorealism Lighting & Material Masterclass', value: '₹5,999' },
  { name: '6. Lumion Cinematic Video Walkthroughs', value: '₹4,999' },
  { name: '7. D5 Render Real-Time 4K Rendering Suite', value: '₹4,999' },
  { name: '8. Enscape Interactive Client VR Presentations', value: '₹3,999' },
  { name: '9. Midjourney AI Architecture Speed Concepting', value: '₹4,999' },
  { name: '10. Stable Diffusion Sketch-to-Render AI Generator', value: '₹4,999' },
  { name: '11. Unreal Engine 5 Real-Time Virtual Architecture', value: '₹6,999' },
  { name: '12. Photoshop Architectural Post-Production & Touch-ups', value: '₹3,999' },
  { name: 'BONUS #1: 10,000+ 3D Indian Furniture & Interior Models', value: '₹14,999' },
  { name: 'BONUS #2: 5,000+ 4K PBR Materials & Textures Pack', value: '₹7,999' },
  { name: 'BONUS #3: Indian Client Quotation & Legal Contract Kit', value: '₹4,999' },
  { name: 'BONUS #4: 150+ Secret AI Architecture Prompts Bible', value: '₹3,999' },
  { name: 'BONUS #5: Official Skill Certificate for Resume & Portfolio', value: '₹2,999' },
  { name: 'BONUS #6: Lifetime Updates + Safe Software Download Guides', value: 'Included' },
  { name: 'BONUS #7: 24/7 Priority WhatsApp Doubt-Solving Team Access', value: 'Included' },
];

export const TESTIMONIALS_LANDING = [
  {
    name: 'Priya Patel',
    role: 'Interior Designer & Studio Founder',
    location: 'Mumbai, Maharashtra',
    content: 'Honestly, I was scared of 3ds Max and V-Ray settings. This course explained lighting in such simple everyday terms! Last week I closed a 3BHK flat interior design project in Powai for ₹1.65 Lakh. Best ₹999 investment of my life.',
    rating: 5,
    verified: true
  },
  {
    name: 'Arjun Reddy',
    role: 'Senior Architect',
    location: 'Bengaluru, Karnataka',
    content: 'The D5 Render and Lumion cinematic walkthrough module changed how we pitch to villa buyers in Whitefield. Clients don’t even ask for discounts when they see a 4K video tour of their unbuilt house. Total game changer.',
    rating: 5,
    verified: true
  },
  {
    name: 'Rahul Varma',
    role: 'Architecture Student',
    location: 'Delhi NCR',
    content: 'My college faculty were teaching outdated AutoCAD commands. Within 10 days of watching these modules, my 3D renders were miles ahead of my entire batch. Landed a paid internship on my first interview!',
    rating: 5,
    verified: true
  },
  {
    name: 'Ananya Gupta',
    role: 'Freelance Visualizer',
    location: 'Pune, Maharashtra',
    content: 'The 10,000+ ready 3D models library alone saved me hundreds of hours. I just drag modular kitchens and sofas into SketchUp and render in D5. The WhatsApp support team replied within 10 minutes when my setup had a glitch.',
    rating: 5,
    verified: true
  },
  {
    name: 'Vikramjit Singh',
    role: 'Civil Engineer & Builder',
    location: 'Jaipur, Rajasthan',
    content: 'As a builder, I used to pay outside 3D artists ₹4,000 per view. Now I and my team generate custom elevations and floor plans in-house within hours. The return on investment is easily 500x.',
    rating: 5,
    verified: true
  },
  {
    name: 'Meera Iyer',
    role: '3D Artist',
    location: 'Chennai, Tamil Nadu',
    content: 'The AI Midjourney + Stable Diffusion section is pure magic. Showing 10 mood boards to NRI clients in 5 minutes helps me lock the deal before anyone else even sends a preliminary sketch.',
    rating: 5,
    verified: true
  },
  {
    name: 'Rohit Mehta',
    role: 'Turnkey Interior Contractor',
    location: 'Ahmedabad, Gujarat',
    content: 'Guaranteed value for Indian conditions! Indian client quotation templates and contract formats are so practical. No client disputes anymore because 3D clarity is 100%. Highly recommended to everyone in the construction field.',
    rating: 5,
    verified: true
  },
  {
    name: 'Simran Kaur',
    role: 'Junior Architect',
    location: 'Chandigarh',
    content: 'I switched from ₹18,000 monthly job to full-time remote freelancing. I now work with 3 interior studios across India and earn over ₹75,000 every single month from home. Thank you Avada team!',
    rating: 5,
    verified: true
  }
];

export const FAQ_ITEMS_LANDING = [
  {
    question: "How will I receive the courses immediately after payment?",
    answer: "Instant Automatic Delivery! Within 60 seconds of completing your payment on Razorpay (UPI, GPay, PhonePe, Paytm, or Card), you will receive direct Google Drive lifetime access links on your Email and on your screen. You can also message our 24/7 WhatsApp support anytime."
  },
  {
    question: "I am a complete beginner with zero 3D experience. Can I learn this easily?",
    answer: "Yes, 100%! All courses are structured from zero level (from where to click, how to set up files, shortcut keys) up to advanced 4K photorealism. Everything is explained step-by-step in easy-to-understand Hindi & English."
  },
  {
    question: "Do I need an expensive high-end gaming PC to run these tools?",
    answer: "No. The bundle covers tools for all PC configurations: SketchUp, AutoCAD, and Photoshop run smoothly even on standard laptops. For rendering, we teach cloud AI tools and lightweight real-time renderers like D5 that run smoothly without breaking the bank."
  },
  {
    question: "Are software download links and installation guides included?",
    answer: "Yes! We provide complete safe download assistance and video installation tutorials for all required software versions so you never have to struggle or pay expensive commercial licenses when starting out."
  },
  {
    question: "What if I get stuck while practicing or software throws an error?",
    answer: "You are never alone! You get exclusive direct access to our 24/7 WhatsApp Support Team. Whenever you face a doubt, software crash, or lighting glitch, message us on WhatsApp and our team will guide you step-by-step."
  },
  {
    question: "Is there a Skill Certificate provided for my resume and portfolio?",
    answer: "Yes, an official verified Skill Certificate is included at zero extra charge. You can proudly add it to your CV, LinkedIn, and client portfolio."
  },
  {
    question: "Why is the price only ₹999 instead of ₹12,000+?",
    answer: "We want every aspiring Indian designer, student, and studio owner to have access to world-class 3D education without paying lakhs to coaching institutes. This ₹999 promotional price is strictly valid for the current batch and will increase to ₹2,999 once the batch timer expires."
  }
];

export const INCOME_TIERS = [
  {
    label: 'Single 3D Room Render',
    before: 'Struggling at ₹500 - ₹1,000',
    after: 'Confidently charging ₹4,500 - ₹8,000+',
    icon: '🖼️',
    tip: 'Deliver in 2 hours with D5 + AI'
  },
  {
    label: 'Complete 3BHK Flat 3D Design',
    before: 'Rejected or underpaid at ₹10,000',
    after: 'Closing ₹50,000 - ₹1,20,000 contracts',
    icon: '🏠',
    tip: 'Full walkthrough + VR presentation'
  },
  {
    label: 'Client Project Approval Speed',
    before: '2-3 Weeks of messy revisions',
    after: 'Approved on First Meeting (AI Concepts)',
    icon: '⚡',
    tip: 'Show 10 instant variations on the spot'
  },
  {
    label: 'Monthly Earning Potential',
    before: '₹15,000 - ₹25,000 Fixed Salary',
    after: '₹75,000 - ₹1,50,000+ (Freelance/Studio)',
    icon: '💼',
    tip: 'Work with Indian & International NRI clients'
  }
];

/* ─── LOGO ─── */
export const Logo = () => (
  <div className="flex flex-col items-start cursor-pointer group" onClick={() => window.location.href = '/'}>
    <div className="flex items-center gap-1.5">
      <span className="font-display font-black text-xl tracking-tight text-slate-900">Avada</span>
      <span className="bg-orange-500 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-widest">PRO 3D</span>
    </div>
    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-orange-600">Architecture & Interior AI</span>
  </div>
);

/* ─── SOCIAL PROOF TOAST ─── */
export const SocialProofToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const show = () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setIdx(p => (p + 1) % RAW_JOINERS.length), 400);
      }, 3500);
    };
    const t1 = setTimeout(show, 3000);
    const t2 = setInterval(show, 11000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);
  const j = RAW_JOINERS[idx];
  return (
    <div className={`fixed bottom-24 left-3 z-[70] max-w-[340px] transition-all duration-500 ease-out ${visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95 pointer-events-none'}`}>
      <div className="bg-slate-900/95 text-white backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3 shadow-2xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
          {j.name.charAt(0)}
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-bold text-white truncate">{j.name}</p>
            <span className="text-[10px] text-orange-400 font-semibold">• {j.city}</span>
          </div>
          <p className="text-[10px] text-slate-300 truncate">Enrolled in 12-Course Bundle • <span className="text-emerald-400 font-medium">{j.time}</span></p>
        </div>
        <div className="ml-auto shrink-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
      </div>
    </div>
  );
};
