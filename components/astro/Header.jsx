import React from 'react';
import { Sparkles, ShieldCheck, Globe, MessageSquare } from 'lucide-react';

export default function Header({ language, setLanguage, onSelectHome }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div 
          onClick={onSelectHome}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-md text-white font-bold text-xl group-hover:scale-105 transition-transform">
            ॐ
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#681f08] tracking-tight leading-none group-hover:text-amber-700 transition-colors flex items-baseline space-x-1.5">
              <span>Astro Jeevan</span>
              <span className="text-amber-600 text-xs sm:text-sm font-normal font-sans">एस्ट्रो जीवन</span>
            </h1>
            <p className="text-[11px] text-gray-500 font-medium tracking-wide">
              {language === 'hi' ? 'सटीक वैदिक गणना एवं अचूक उपाय' : 'Accurate Vedic Calculations & Remedies'}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">

          {/* Language Switcher */}
          <div className="flex items-center bg-amber-100/70 p-1 rounded-lg border border-amber-200 text-xs font-semibold">
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === 'hi'
                  ? 'bg-[#b44d12] text-white shadow-sm'
                  : 'text-amber-900 hover:text-amber-700'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === 'en'
                  ? 'bg-[#b44d12] text-white shadow-sm'
                  : 'text-amber-900 hover:text-amber-700'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
