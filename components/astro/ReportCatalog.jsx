import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  MessageSquare, 
  ShieldCheck, 
  Download,
  HelpCircle,
  Clock,
  Flame
} from 'lucide-react';
import { REPORTS_DATA } from '../data/reports';
import VedicBookCover from './VedicBookCover';

export default function ReportCatalog({ selectedReportId, onSelectReport, language = 'hi' }) {
  const isHindi = language === 'hi';

  const astroReports = REPORTS_DATA.filter(r => r.category === 'Astrology Reports');
  const remedyServices = REPORTS_DATA.filter(r => r.category === 'Remedy Services');

  const renderCard = (item) => {
    const isSelected = selectedReportId === item.id;
    const title = isHindi ? item.titleHi : item.title;
    const desc = isHindi ? item.shortDescHi : item.shortDesc;

    return (
      <div
        key={item.id}
        className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between items-center text-center group hover:shadow-xl hover:-translate-y-1 relative ${
          isSelected 
            ? 'border-[#b44d12] ring-2 ring-[#b44d12]/30 shadow-lg' 
            : 'border-gray-200/80 shadow-sm'
        }`}
      >
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200 flex items-center space-x-1">
          <Tag className="w-2.5 h-2.5" />
          <span>{isHindi ? '८०% छूट' : '80% OFF'}</span>
        </div>

        {/* 3D Sacred Vedic Book Cover Mockup */}
        <div className="my-2 flex items-center justify-center py-1">
          <VedicBookCover
            reportId={item.id}
            title={item.title}
            titleHi={item.titleHi}
            size="sm"
          />
        </div>

        {/* Title & Short Description */}
        <div className="mb-2 w-full">
          <h3 className="font-serif font-black text-gray-900 text-base sm:text-lg tracking-tight leading-snug group-hover:text-[#b44d12] transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {desc}
          </p>

          {/* Simple bullet points to lure & hook users */}
          <div className="mt-2.5 space-y-1 text-left bg-amber-50/60 p-2 rounded-lg border border-amber-100/80">
            {(isHindi ? (item.highlightsHi || []) : (item.highlights || [])).slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-start space-x-1.5 text-[11px] text-gray-700">
                <span className="text-emerald-600 font-bold text-xs mt-0.5">✓</span>
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="w-full mt-3 pt-3 border-t border-gray-100 flex flex-col items-center">
          <div className="flex items-baseline space-x-2 mb-3">
            <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              ₹299
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{item.originalPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelectReport(item.id)}
            className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-sm flex items-center justify-center space-x-1.5 ${
              isSelected
                ? 'bg-[#89270b] text-white shadow-md'
                : 'bg-[#b44d12] text-white hover:bg-[#89270b] active:scale-95'
            }`}
          >
            {isSelected ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>{isHindi ? 'चयनित (SELECTED)' : 'SELECTED'}</span>
              </>
            ) : (
              <span>{isHindi ? 'अभी प्राप्त करें (Get Report)' : 'BUY NOW'}</span>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Intro */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 bg-amber-100/80 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-amber-300/60">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>{isHindi ? 'प्रत्येक व्यक्तिगत रिपोर्ट मात्र ₹299' : 'Every Detailed Report at flat ₹299'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-gray-950 tracking-tight leading-tight">
          {isHindi ? 'अपनी समस्या के अनुसार विशेष रिपोर्ट चुनें' : 'Choose Your Specialized Vedic Report'}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          {isHindi 
            ? 'ऋण मुक्ति, करियर, नौकरी, धन, व्यापार, विवाह, संतान सुख अथवा वास्तु दोष निवारण हेतु प्रमाणित वैदिक मार्गदर्शन।'
            : 'Personalized Kundli predictions, planetary remedies, and Vastu solutions at flat ₹299.'}
        </p>
      </div>

      {/* HOW IT WORKS SECTION (Comprehensive Step-by-Step Guide) */}
      <div className="mb-14 bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF5E6] rounded-3xl p-6 sm:p-9 border-2 border-amber-200/90 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#89270B] bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
            <Flame className="w-3.5 h-3.5 text-amber-700" />
            <span>{isHindi ? 'सरल एवं पारदर्शी प्रक्रिया' : 'Simple & Transparent Process'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-serif text-[#3E2723] mt-2">
            {isHindi ? 'रिपोर्ट कैसे तैयार होती है और कैसे काम करती है?' : 'How Do the Reports Work & How Are They Generated?'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {isHindi 
              ? 'जन्म विवरण दर्ज करने से लेकर व्हाट्सएप पर डिजिटल पीडीएफ प्राप्त होने तक का पूरा सफर'
              : 'From submitting birth details to receiving your certified A4 PDF on WhatsApp'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs relative flex flex-col justify-between">
            <div className="absolute -top-3.5 -left-2 w-7 h-7 rounded-full bg-[#B44D12] text-white font-bold text-xs flex items-center justify-center shadow-md">
              1
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#B44D12] flex items-center justify-center font-bold mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1.5">
                {isHindi ? '१. जन्म विवरण दर्ज करें' : '1. Enter Birth Data'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isHindi 
                  ? 'अपना नाम, जन्म तिथि, जन्म समय व जन्म स्थान दर्ज करें। हमारा तत्काल सिटी सर्च बिना किसी देरी के अक्षांश-देशांतर जोड़ता है।' 
                  : 'Enter your Name, DOB, Time, and City. Instant autocomplete immediately detects exact latitude and longitude.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-amber-800 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isHindi ? 'समय अज्ञात? 80% सटीकता' : 'Unknown time? 80% accuracy'}</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs relative flex flex-col justify-between">
            <div className="absolute -top-3.5 -left-2 w-7 h-7 rounded-full bg-[#B44D12] text-white font-bold text-xs flex items-center justify-center shadow-md">
              2
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C2410C] flex items-center justify-center font-bold mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1.5">
                {isHindi ? '२. शुद्ध वैदिक गणना' : '2. Vedic Ephemeris Engine'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isHindi 
                  ? 'लाहिड़ी अयनांश के अनुसार ९ ग्रहों की स्पष्ट डिग्री, लग्न चक्र, नक्षत्र, चरण एवं विंशोत्तरी महादशा की सटीक गणना होती है।' 
                  : 'Calculates exact planetary degrees, Ascendant (Lagna), Nakshatras, and Vimshottari Mahadasha timeline.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-amber-800 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isHindi ? '९८% खगोलीय शुद्धता' : '98% Astronomical precision'}</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs relative flex flex-col justify-between">
            <div className="absolute -top-3.5 -left-2 w-7 h-7 rounded-full bg-[#B44D12] text-white font-bold text-xs flex items-center justify-center shadow-md">
              3
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1.5">
                {isHindi ? '३. गहरा समस्या-समाधान' : '3. Deep Issue Diagnosis'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isHindi 
                  ? 'आपकी चुनी हुई रिपोर्ट (जैसे कर्ज, नौकरी, धन या वास्तु) के भावों का गहरा विश्लेषण कर २१-दिवसीय मंत्र व लाल किताब टोटके तैयार होते हैं।' 
                  : 'Diagnostic analysis of your specific concern (Debt, Job, Wealth, Vastu) generates 21-day mantras & remedies.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isHindi ? 'अचूक बिना तोड़-फोड़ उपाय' : 'Zero demolition remedies'}</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs relative flex flex-col justify-between">
            <div className="absolute -top-3.5 -left-2 w-7 h-7 rounded-full bg-[#B44D12] text-white font-bold text-xs flex items-center justify-center shadow-md">
              4
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center font-bold mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1.5">
                {isHindi ? '४. पीडीएफ व व्हाट्सएप प्राप्ति' : '4. PDF & WhatsApp Delivery'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isHindi 
                  ? 'मात्र ₹299 के सुरक्षित भुगतान उपरांत रंगीन A4 पीडीएफ तुरंत स्क्रीन पर खुलती है और सीधे आपके व्हाट्सएप नंबर पर भी भेजी जाती है।' 
                  : 'Upon flat ₹299 unlock, your printable multi-page PDF opens instantly and is delivered to your WhatsApp.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-green-700 font-semibold flex items-center space-x-1">
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isHindi ? 'व्हाट्सएप पर सीधी प्राप्ति' : 'Instant A4 Download'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Astrology Reports Grid (First Section) */}
      <div className="mb-14">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-2.5 h-6 bg-[#b44d12] rounded-full" />
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            {isHindi ? 'वैदिक ज्योतिष रिपोर्ट्स (Astrology Reports)' : 'Astrology Reports'}
          </h3>
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
            ₹299 {isHindi ? 'प्रत्येक' : 'Each'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {astroReports.map(renderCard)}
        </div>
      </div>

      {/* Remedy Services Heading & Grid (Second Section) */}
      <div>
        <div className="text-center my-8">
          <div className="inline-block relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {isHindi ? 'दोष निवारण एवं सिद्ध उपाय (Remedy Services)' : 'Remedy Services'}
            </h2>
            <div className="w-16 h-1 bg-[#b44d12] mx-auto mt-2 rounded-full" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isHindi 
              ? 'बिना तोड़-फोड़ के वास्तु दोष निवारण, धन प्रवाह एवं सुरक्षा उपाय' 
              : 'Actionable remedies for money flow, evil eye protection, and home/business Vastu'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {remedyServices.map(renderCard)}
        </div>
      </div>
    </div>
  );
}
