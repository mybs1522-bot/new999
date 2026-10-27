import React, { useState } from 'react';
import { DollarSign, ArrowRight, Zap, CheckCircle2, TrendingUp, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface IncomeCalculatorProps {
  onEnroll: () => void;
}

export const IncomeCalculator: React.FC<IncomeCalculatorProps> = ({ onEnroll }) => {
  const [projectCount, setProjectCount] = useState<number>(2);
  const [projectType, setProjectType] = useState<'full' | 'room'>('full');

  // Rates based on verified Indian market freelance data
  const ratePerProject = projectType === 'full' ? 30000 : 7500;
  const hoursPerProject = projectType === 'full' ? 8 : 2;
  const monthlyEarnings = projectCount * ratePerProject;
  const totalHours = projectCount * hoursPerProject;
  const roi = Math.round((monthlyEarnings / 999) * 100);

  return (
    <section className="py-14 md:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-wider mb-2.5 border border-orange-500/30">
            <DollarSign size={14} className="text-orange-400" />
            <span>Real-World Indian Freelance Economics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
            How Easily Can You Make ₹50,000 to ₹1,50,000/Month?
          </h2>
          <p className="text-slate-400 text-xs sm:text-base mt-2 max-w-2xl mx-auto">
            You don't need hundreds of clients. See how just <strong className="text-white">a couple of projects a month</strong> pays you more than an IT engineer's salary working from your laptop:
          </p>
        </div>

        {/* Interactive Box */}
        <div className="bg-slate-800/95 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl max-w-3xl mx-auto">
          
          {/* Project Type Switcher */}
          <div className="flex items-center justify-center p-1 bg-slate-900/90 rounded-2xl border border-slate-700/80 max-w-md mx-auto mb-6">
            <button
              onClick={() => setProjectType('full')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                projectType === 'full'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Complete 3BHK / Villa Design (~₹30,000)
            </button>
            <button
              onClick={() => setProjectType('room')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                projectType === 'room'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Single 3D Room Render (~₹7,500)
            </button>
          </div>

          {/* Project Count Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Projects Completed Per Month:
              </label>
              <span className="text-xs font-mono font-black text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                {projectCount} {projectCount === 1 ? 'Project' : 'Projects'} / Month
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setProjectCount(num)}
                  className={`py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    projectCount === num
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105 border border-orange-400'
                      : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600/40'
                  }`}
                >
                  {num} {num === 1 ? 'Proj' : 'Projs'}
                </button>
              ))}
            </div>
          </div>

          {/* Calculations Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-700/80 mb-6">
            
            {/* Column 1: Client Rate */}
            <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-slate-800 pb-3 md:pb-0 md:pr-3">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Average Rate in India</span>
              <span className="text-lg font-black text-white mt-1 block">
                ₹{ratePerProject.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-normal">/ project</span>
              </span>
              <span className="text-[10px] text-emerald-400 mt-1 block font-medium">
                ✓ 2D Plan + 3D Walkthrough
              </span>
            </div>

            {/* Column 2: Time spent */}
            <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-slate-800 pb-3 md:pb-0 md:pr-3">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Effort Required</span>
              <div className="flex items-center justify-center md:justify-start gap-1.5 mt-1">
                <Clock size={16} className="text-amber-400 shrink-0" />
                <span className="text-lg font-black text-amber-400">
                  ~{totalHours} Hours Total
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Just ~{Math.round(totalHours / 4)} hours per weekend
              </span>
            </div>

            {/* Column 3: Total Monthly Cash */}
            <div className="text-center md:text-right pt-2 md:pt-0">
              <span className="text-[11px] text-orange-400 font-black uppercase tracking-wider block">Your Monthly Earning</span>
              <span className="text-3xl sm:text-4xl font-display font-black text-amber-400 mt-0.5 block">
                ₹{monthlyEarnings.toLocaleString('en-IN')}
                <span className="text-xs text-slate-400 font-normal">/mo</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-400 mt-1 block">
                ⚡ ROI on ₹999 Bundle: <strong className="text-emerald-300">{roi.toLocaleString('en-IN')}%</strong>
              </span>
            </div>
          </div>

          {/* Psychological Callout Note */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-6 text-xs text-amber-200 leading-relaxed flex items-start gap-3">
            <Sparkles size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold block mb-0.5">The Mathematics of Why You Cannot Lose:</strong>
              Just <strong className="text-amber-300">ONE single room render (₹7,500)</strong> pays back your entire ₹999 investment over 7 times. Everything you earn after that is 100% pure profit straight into your pocket!
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onEnroll}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-display font-black text-base sm:text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <Zap size={20} className="fill-white shrink-0" />
            <span>Unlock The Whole System for Just ₹999</span>
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>
          
          <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Instant Google Drive Delivery • 24/7 WhatsApp Tech Support • 7-Day Refund Policy</span>
          </div>
        </div>

      </div>
    </section>
  );
};
