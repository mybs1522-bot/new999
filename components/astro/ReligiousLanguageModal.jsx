import React from 'react';

export default function ReligiousLanguageModal({
  isOpen,
  onSelectLanguage
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#FFFDF9] rounded-3xl p-6 shadow-2xl border-2 border-amber-300 text-center animate-in zoom-in-95 duration-200">
        
        {/* Subtle Decorative Golden Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#89270B] via-[#E65100] to-[#89270B]" />

        {/* Pure Language Buttons Only */}
        <div className="flex flex-col sm:flex-row gap-3.5 my-2">
          {/* Hindi Button */}
          <button
            type="button"
            onClick={() => onSelectLanguage('hi')}
            className="flex-1 py-5 px-6 rounded-2xl bg-gradient-to-r from-[#89270B] via-[#B44D12] to-[#E65100] hover:from-[#6A1B07] hover:to-[#C2410C] active:scale-95 text-white font-serif font-black text-2xl tracking-wide shadow-lg hover:shadow-xl transition-all cursor-pointer border border-amber-300/40 flex items-center justify-center select-none"
          >
            हिंदी
          </button>

          {/* English Button */}
          <button
            type="button"
            onClick={() => onSelectLanguage('en')}
            className="flex-1 py-5 px-6 rounded-2xl bg-gradient-to-r from-[#2A1810] via-[#3E2114] to-[#1F0C05] hover:from-[#1F0C05] hover:to-[#2A1810] active:scale-95 text-amber-100 font-sans font-black text-2xl tracking-wide shadow-lg hover:shadow-xl transition-all cursor-pointer border border-amber-400/30 flex items-center justify-center select-none"
          >
            English
          </button>
        </div>

      </div>
    </div>
  );
}
