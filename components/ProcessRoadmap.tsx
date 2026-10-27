import React from 'react';
import { 
  Check, ArrowRight, Sparkles, Trophy, Rocket, Target, 
  Flame, Clock, ShieldCheck, Zap, Laptop, GraduationCap, 
  DollarSign, CheckCircle2, X 
} from 'lucide-react';

interface ProcessRoadmapProps {
  onEnroll: () => void;
  finalPrice: number;
  timeLeft: { h: number; m: number; s: number };
}

export const ProcessRoadmap: React.FC<ProcessRoadmapProps> = ({
  onEnroll,
  finalPrice,
  timeLeft
}) => {
  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <section className="py-10 sm:py-16 bg-white border-b border-slate-200" id="learning-process">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* ═══ 1. SECTION MAIN TITLE & YELLOW HIGHLIGHT BANNER ═══ */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-3xl font-display font-black text-slate-900 tracking-tight mb-3">
            Our Process is simple.
          </h2>
          
          <div className="inline-block bg-[#FDE047] text-slate-950 font-display font-black text-base sm:text-xl md:text-2xl px-5 py-3 rounded-2xl shadow-sm border border-yellow-400/80 max-w-2xl mx-auto leading-snug">
            We teach you Interior and Exterior Design in 5 steps:
          </div>
        </div>

        {/* ═══ 2. THE 5-STEP EXECUTION WORKFLOW CARD ═══ */}
        <div className="bg-slate-50 border-2 border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-sm mb-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600 mb-4">
            <span className="text-base">📐</span>
            <span>THE 5-STEP EXECUTION WORKFLOW</span>
          </div>

          {/* Black Step Strip */}
          <div className="bg-slate-950 text-white rounded-2xl p-3 sm:p-4 mb-4 shadow-inner">
            <div className="grid grid-cols-5 items-center text-center gap-1 sm:gap-2">
              
              <div className="flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] font-mono font-black text-orange-400 uppercase tracking-wider">STEP 1</span>
                <span className="text-xs sm:text-base font-black text-white mt-0.5">PLAN</span>
              </div>

              <div className="text-slate-500 font-black text-sm sm:text-xl">→</div>

              <div className="flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] font-mono font-black text-orange-400 uppercase tracking-wider">STEP 2</span>
                <span className="text-xs sm:text-base font-black text-white mt-0.5">DESIGN</span>
              </div>

              <div className="text-slate-500 font-black text-sm sm:text-xl">→</div>

              <div className="flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] font-mono font-black text-orange-400 uppercase tracking-wider">STEP 3</span>
                <span className="text-xs sm:text-base font-black text-white mt-0.5 whitespace-nowrap">3D MODEL</span>
              </div>

            </div>

            <div className="border-t border-slate-800 my-2 pt-2 grid grid-cols-3 items-center text-center">
              <div className="col-span-1 flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] font-mono font-black text-orange-400 uppercase tracking-wider">STEP 4</span>
                <span className="text-xs sm:text-base font-black text-white mt-0.5">RENDER</span>
              </div>

              <div className="text-slate-500 font-black text-sm sm:text-xl">→</div>

              <div className="col-span-1 flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] font-mono font-black text-orange-400 uppercase tracking-wider">STEP 5</span>
                <span className="text-xs sm:text-base font-black text-white mt-0.5">PRESENT</span>
              </div>
            </div>
          </div>

          {/* Software Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-700">
            <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">AutoCAD</span>
            <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">SketchUp Pro</span>
            <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">V-Ray</span>
            <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">D5 Render</span>
            <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">Enscape</span>
            <span className="bg-[#FEF08A] text-amber-950 px-3 py-1.5 rounded-xl border border-amber-300 shadow-2xs flex items-center gap-1.5 font-black">
              <Sparkles size={13} className="text-amber-700 fill-amber-700" />
              AI Workflows
            </span>
          </div>
        </div>

        {/* ═══ 3. YOUR 14-DAY LEARNING PATH CARD ═══ */}
        <div className="bg-gradient-to-b from-amber-50/50 to-white border-2 border-amber-200/90 rounded-3xl p-5 sm:p-7 shadow-sm mb-6">
          
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-amber-200 mb-4">
            <span>🗓️</span>
            <span>YOUR 14-DAY LEARNING PATH</span>
          </div>

          {/* Day 1 */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🚀</span>
              <h3 className="font-display font-black text-slate-900 text-sm sm:text-base">
                Day 1: Software Setup & Introduction
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 pl-7 leading-relaxed">
              You will install the software and start the introduction walkthrough step-by-step. 
              <span className="text-emerald-700 font-bold block sm:inline sm:ml-1">
                (Free safe download links + 24/7 WhatsApp help included so you never get stuck!)
              </span>
            </p>
          </div>

          <div className="border-t border-dashed border-amber-300/80 my-4" />

          {/* In 7 Days */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎯</span>
              <h3 className="font-display font-black text-slate-900 text-sm sm:text-base">
                In 7 Days — What You Will Be Able To Design:
              </h3>
            </div>

            <div className="space-y-2.5 pl-0 sm:pl-2">
              
              <div className="bg-white border-2 border-slate-200/90 hover:border-emerald-400 p-3.5 rounded-2xl shadow-2xs flex items-start gap-3 transition-colors">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Modern Flats & Apartments:
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    1BHK, 2BHK, 3BHK full interior layouts, modular kitchens & false ceilings.
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-slate-200/90 hover:border-emerald-400 p-3.5 rounded-2xl shadow-2xs flex items-start gap-3 transition-colors">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Offices & Commercial:
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Corporate workspaces, conference rooms, cafes, showrooms & retail stores.
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-slate-200/90 hover:border-emerald-400 p-3.5 rounded-2xl shadow-2xs flex items-start gap-3 transition-colors">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Luxury Villas & Exteriors:
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Multi-story house elevations, modern exterior facades & realistic night lighting.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-dashed border-amber-300/80 my-4" />

          {/* Next 7 Days */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-3 shadow-md">
            <span className="text-2xl shrink-0">🏆</span>
            <div>
              <p className="text-xs sm:text-sm leading-relaxed">
                <strong className="text-amber-400 font-black text-sm sm:text-base">Next 7 Days:</strong> We teach you how to take complete projects from clients, demand 50% advance token payments, and complete them end-to-end like a pro designer.
              </p>
            </div>
          </div>

        </div>

        {/* ═══ 4. 3 VALUE STRIP PILLS (ZERO DEGREE, ₹0 SOFTWARE, FIRST 4K RENDER) ═══ */}
        <div className="space-y-3 mb-8">
          
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xs flex items-center gap-3 hover:border-orange-300 transition-colors">
            <span className="text-2xl shrink-0">🎓</span>
            <div className="text-xs sm:text-sm">
              <strong className="text-slate-900 font-bold">Zero Degree Needed:</strong>{' '}
              <span className="text-slate-600">Every single tool, shortcut & camera angle taught from complete scratch in plain Hindi & English.</span>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xs flex items-center gap-3 hover:border-orange-300 transition-colors">
            <span className="text-2xl shrink-0">💻</span>
            <div className="text-xs sm:text-sm">
              <strong className="text-slate-900 font-bold">₹0 Software Cost to Start:</strong>{' '}
              <span className="text-slate-600">Includes free student, community & verified installation guides so you don't spend a single extra rupee.</span>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xs flex items-center gap-3 hover:border-orange-300 transition-colors">
            <span className="text-2xl shrink-0">⚡</span>
            <div className="text-xs sm:text-sm">
              <strong className="text-slate-900 font-bold">First 4K Render in 14 Days:</strong>{' '}
              <span className="text-slate-600">Build your first client-ready 4K magazine-grade portfolio piece in just 2 weeks.</span>
            </div>
          </div>

        </div>

        {/* ═══ 5. WHAT HAPPENS WHEN YOUR SKILL LEVEL GOES UP ═══ */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💰</span>
            <h3 className="font-display font-black text-slate-900 text-sm sm:text-base uppercase tracking-wide">
              What Happens When Your Skill Level Goes Up:
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            <div className="bg-white border-2 border-slate-200 hover:border-emerald-400 p-4 rounded-2xl shadow-xs transition-all">
              <div className="flex items-start gap-2.5">
                <Check size={18} className="text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Stop Price Battles</h4>
                  <p className="text-xs text-slate-500 italic mt-0.5">Charge premium rates & ditch cheap ₹500 gigs. Lock 50% advance token.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 hover:border-emerald-400 p-4 rounded-2xl shadow-xs transition-all">
              <div className="flex items-start gap-2.5">
                <Check size={18} className="text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Showstopping 4K Renders</h4>
                  <p className="text-xs text-slate-500 italic mt-0.5">Portfolio that attracts builders, architects & NRI clients like a magnet.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 hover:border-emerald-400 p-4 rounded-2xl shadow-xs transition-all">
              <div className="flex items-start gap-2.5">
                <Check size={18} className="text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Full Design Service</h4>
                  <p className="text-xs text-slate-500 italic mt-0.5">From 2D sanction planning to 3D VR walkthroughs — handle the whole project.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 hover:border-emerald-400 p-4 rounded-2xl shadow-xs transition-all">
              <div className="flex items-start gap-2.5">
                <Check size={18} className="text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Harness AI Speed</h4>
                  <p className="text-xs text-slate-500 italic mt-0.5">Ideate 50 client styles in minutes right on your first concept meeting.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══ 6. 6 MONTHS FROM TODAY (THE FORK IN THE ROAD) ═══ */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">⌛</span>
            <h3 className="font-display font-black text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
              6 Months From Today:
            </h3>
          </div>

          <div className="space-y-3">
            {/* The Losing Path */}
            <div className="bg-red-50/80 border border-red-200 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-red-900">
              <span className="text-base font-black text-red-600 shrink-0 mt-0.5">✕</span>
              <p className="leading-relaxed">
                Still jumping between random YouTube videos, guessing dimensions, software crashing at 95%, and remaining stuck underpaid at ₹15,000/month.
              </p>
            </div>

            {/* The Winning Path */}
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-emerald-950 font-bold shadow-xs">
              <span className="text-base shrink-0 mt-0.5">🚀</span>
              <p className="leading-relaxed">
                <span className="text-emerald-700 font-black">Or</span> holding a complete 12-software skill & a 4K portfolio that proves your worth and earns you <span className="text-emerald-800 underline decoration-emerald-500">₹50,000 to ₹1,50,000 every single month!</span>
              </p>
            </div>
          </div>
        </div>

        {/* ═══ 7. THE DARK PRE-CTA TEASER BANNER ═══ */}
        <div className="bg-[#0B0F19] text-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-display font-black text-white tracking-tight leading-snug">
              Upgrade Your Skill Before The Industry Moves Without You.
            </h3>
            <p className="text-amber-400 font-bold text-sm sm:text-base mt-2">
              Master Interior & Exterior Design the complete way.
            </p>
          </div>
        </div>

        {/* ═══ 8. THE CONVERSION CTA BOX (WOOING INDIAN CUSTOMERS) ═══ */}
        <div className="bg-gradient-to-b from-orange-50 via-amber-50 to-orange-50 border-2 border-orange-300 rounded-3xl p-6 sm:p-8 text-center shadow-xl max-w-2xl mx-auto relative overflow-hidden">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white rounded-full text-[11px] font-black uppercase tracking-wider mb-3 animate-pulse shadow-xs">
            <Flame size={12} className="fill-white" />
            <span>Special Promotional Price — Ending Soon</span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-slate-400 line-through text-sm sm:text-base font-bold">₹11,988</span>
            <span className="text-slate-400 line-through text-sm sm:text-base font-bold">₹2,999</span>
            <span className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight">
              ₹{finalPrice}
            </span>
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black px-2.5 py-0.5 rounded-full">
              92% OFF
            </span>
          </div>

          {/* Flip Timer */}
          <div className="flex items-center justify-center gap-1.5 mb-4 text-xs font-mono font-bold text-slate-600">
            <Clock size={13} className="text-orange-600" />
            <span>Offer Ends In:</span>
            <span className="bg-slate-900 text-white px-2 py-0.5 rounded font-black text-xs">
              {formatTime(timeLeft.h)}h : {formatTime(timeLeft.m)}m : {formatTime(timeLeft.s)}s
            </span>
          </div>

          {/* Giant CTA Button */}
          <button
            onClick={onEnroll}
            className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-display font-black text-base sm:text-xl shadow-xl shadow-orange-500/35 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group pulse-glow mb-3"
          >
            <Zap size={20} className="fill-white shrink-0 animate-bounce" />
            <span>⚡ GET INSTANT ACCESS TO ALL 12 COURSES @ ₹{finalPrice}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>

          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 flex-wrap">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Instant Google Drive Access in 60s • 24/7 WhatsApp VIP Support • 7-Day Refund Policy</span>
          </p>
        </div>

      </div>
    </section>
  );
};
