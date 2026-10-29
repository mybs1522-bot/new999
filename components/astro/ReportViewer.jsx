import React, { useRef, useState, useEffect } from 'react';
import { 
  Download, 
  MessageSquare, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Printer,
  ChevronRight,
  ChevronLeft,
  Sun,
  Layers,
  Compass,
  FileText,
  Gem,
  Flame,
  Award,
  CheckCircle,
  Loader2,
  KeyRound,
  Bot,
  X
} from 'lucide-react';
import KundliChart from './KundliChart';
import { generateReport } from '../utils/reportGenerator';

export default function ReportViewer({
  reportData,
  onBack,
  onOpenWhatsApp,
  language = 'hi',
  autoDownload = false,
  onDownloadComplete,
  onRegenerateReport
}) {
  const buildReportForLang = (baseReport, targetLang) => {
    if (!baseReport) return baseReport;
    try {
      const u = baseReport.user || {};
      let d = '15', m = '08', y = '1995';
      if (u.dobFormatted) {
        if (u.dobFormatted.includes('/')) {
          const parts = u.dobFormatted.split('/');
          d = parts[0] || '15';
          m = parts[1] || '08';
          y = parts[2] || '1995';
        } else if (u.dobFormatted.includes('-')) {
          const parts = u.dobFormatted.split('-');
          y = parts[0] || '1995';
          m = parts[1] || '08';
          d = parts[2] || '15';
        }
      }
      let h = '12', min = '00', am = 'PM';
      let isUnknown = false;
      if (u.tobFormatted) {
        if (u.tobFormatted.includes('अज्ञात') || u.tobFormatted.toLowerCase().includes('unknown')) {
          isUnknown = true;
        } else {
          const match = u.tobFormatted.match(/(\d{1,2}):(\d{2})(?:\s*([APap][Mm]))?/);
          if (match) {
            h = match[1]; min = match[2]; am = match[3] || 'PM';
          }
        }
      }
      const isFemale = u.gender === 'महिला' || (typeof u.gender === 'string' && u.gender.toLowerCase() === 'female');
      const fresh = generateReport(
        baseReport.reportConfig?.id || baseReport.reportId || 'karz-mukti-remedy',
        {
          fullName: u.fullName,
          gender: isFemale ? 'female' : 'male',
          dob: { day: d, month: m, year: y },
          tob: { hour: h, minute: min, ampm: am },
          timeUnknown: isUnknown,
          pob: (u.lat && u.lon && !isNaN(parseFloat(u.lat))) ? { name: u.pob, lat: parseFloat(u.lat), lon: parseFloat(u.lon) } : u.pob,
          pobText: u.pob,
          whatsappNumber: u.whatsappNumber || '',
          orderId: baseReport.orderId || u.orderId || '',
          orderName: baseReport.orderName || u.orderName || '',
          orderDate: baseReport.orderDate || u.orderDate || '',
          productName: baseReport.productName || baseReport.report_title || baseReport.reportConfig?.title || 'Personalized Karz Mukti Report & Remedy'
        },
        targetLang
      );

      fresh.orderId = baseReport.orderId || u.orderId;
      fresh.orderName = baseReport.orderName || u.orderName;
      fresh.orderDate = baseReport.orderDate || u.orderDate;
      fresh.productName = baseReport.productName || baseReport.report_title || baseReport.reportConfig?.title;
      fresh.language = targetLang;
      if (!fresh.user) fresh.user = {};
      fresh.user.language = targetLang;
      fresh.user.orderId = fresh.orderId;
      fresh.user.orderName = fresh.orderName;
      fresh.user.orderDate = fresh.orderDate;
      fresh.user.productName = fresh.productName;
      return fresh;
    } catch (err) {
      console.error('buildReportForLang error:', err);
      return baseReport;
    }
  };

  const initialLang = language || reportData?.language || reportData?.user?.language || 'hi';
  const [currentLang, setCurrentLang] = useState(initialLang);
  const [currentReport, setCurrentReport] = useState(() => {
    if (!reportData) return null;
    const isReportHindi = reportData.isHindi ?? (reportData.pages?.[1]?.headerTitle?.includes('विश्लेषण') || false);
    if (isReportHindi !== (initialLang === 'hi')) {
      return buildReportForLang(reportData, initialLang);
    }
    return reportData;
  });

  useEffect(() => {
    if (!reportData) return;
    const targetLang = language || reportData.language || reportData.user?.language || 'hi';
    setCurrentLang(targetLang);
    const isReportHindi = reportData.isHindi ?? (reportData.pages?.[1]?.headerTitle?.includes('विश्लेषण') || false);
    if (isReportHindi !== (targetLang === 'hi')) {
      const fresh = buildReportForLang(reportData, targetLang);
      setCurrentReport(fresh);
    } else {
      setCurrentReport(reportData);
    }
  }, [reportData, language]);

  const isHindi = currentLang === 'hi';
  const reportRef = useRef(null);

  const handleChangeLanguage = (newLang) => {
    if (newLang === currentLang) return;
    setCurrentLang(newLang);
    const fresh = buildReportForLang(currentReport, newLang);
    setCurrentReport(fresh);
  };
  const [isExporting, setIsExporting] = useState(false);
  const [activePageView, setActivePageView] = useState('all'); // 'all' or 1, 2, 3, 4, 5, 6
  const [downloadStatus, setDownloadStatus] = useState(autoDownload ? 'downloading' : 'idle');
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(
    typeof window !== 'undefined' ? (localStorage.getItem('gemini_api_key') || '') : ''
  );
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  if (!reportData || !reportData.pages) return null;

  const {
    reportConfig,
    user,
    kundli,
    pages,
    certId,
    generatedAt,
    isAiEnhanced
  } = currentReport || reportData;

  const [page1, page2, page3, page4, page5, page6] = pages;
  const reportTitle = isHindi ? reportConfig.titleHi : reportConfig.title;

  const handleDownloadPDF = async (isAuto = false) => {
    setIsExporting(true);
    setDownloadStatus('downloading');
    
    // Ensure all 6 pages exist in DOM for complete PDF capture
    setActivePageView('all');

    // Allow DOM to settle
    setTimeout(async () => {
      try {
        const html2pdfModule = await import('html2pdf.js');
        const html2pdf = html2pdfModule.default || html2pdfModule;
        const element = document.getElementById('printable-report');
        
        if (!element) {
          throw new Error('Report element not found in DOM');
        }

        const cleanName = (user.fullName || 'Client').trim().replace(/[/\\:*?"<>|]/g, '').replace(/\s+/g, ' ');
        const rawOrderId = (currentReport.orderName || user.orderName || user.orderId || currentReport.orderId || currentReport.id || 'Order')
          .replace(/^shopify_/, '')
          .replace(/[/\\:*?"<>|]/g, '')
          .trim();
        const orderDate = user.orderDate || currentReport.orderDate || (currentReport.createdAt ? new Date(currentReport.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-') : new Date().toLocaleDateString('en-GB').replace(/\//g, '-'));
        const productName = (currentReport.productName || currentReport.report_title || reportConfig?.title || 'Personalized Karz Mukti Report & Remedy')
          .trim()
          .replace(/[/\\:*?"<>|]/g, '')
          .replace(/\s+/g, ' ');

        const filename = `${cleanName}_${rawOrderId}_${orderDate}_${productName}_cirtified report.pdf`;

        const opt = {
          margin: [4, 4, 4, 4],
          filename: filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2, // 300 DPI high resolution
            useCORS: true, 
            logging: false, 
            scrollY: 0,
            scrollX: 0,
            backgroundColor: '#ffffff'
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['css', 'legacy'] }
        };

        await html2pdf().set(opt).from(element).save();
        setDownloadStatus('completed');
        if (isAuto && onDownloadComplete) {
          onDownloadComplete();
        }
      } catch (err) {
        console.error('PDF export error:', err);
        setDownloadStatus('error');
      } finally {
        setIsExporting(false);
      }
    }, 500);
  };

  // Immediate auto-download trigger when user arrives from checkout click
  useEffect(() => {
    if (autoDownload) {
      setDownloadStatus('downloading');
      const timer = setTimeout(() => {
        handleDownloadPDF(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoDownload]);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveGeminiKey = async () => {
    setIsAiProcessing(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('gemini_api_key', apiKeyInput.trim());
      }
      if (onRegenerateReport) {
        await onRegenerateReport(apiKeyInput.trim());
      }
      setIsGeminiModalOpen(false);
    } catch (e) {
      console.error('Error enhancing report with Gemini:', e);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const pageNavTabs = [
    { id: 'all', label: isHindi ? '📄 संपूर्ण ६ पृष्ठ (All 6 Pages)' : '📄 All 6 Pages (Full Report)' },
    { id: 1, label: isHindi ? '१. जन्म चक्र व पंचांग' : '1. Chart & Ephemeris' },
    { id: 2, label: isHindi ? '२. मूल भाव विश्लेषण' : '2. Root Cause & Houses' },
    { id: 3, label: isHindi ? '३. महादशा, योग व दोष' : '3. Dasha & Yogas' },
    { id: 4, label: isHindi ? '४. १२ माह का भविष्य' : '4. 12-Month Timeline' },
    { id: 5, label: isHindi ? '५. २१ दिवसीय महामंत्र' : '5. Vedic Mantras' },
    { id: 6, label: isHindi ? '६. वास्तु व लाल किताब' : '6. Lal Kitab & Vastu' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
      
      {/* Explicit Print & Color Preservation Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; }
          .report-a4-page {
            page-break-after: always !important;
            break-after: page !important;
            box-shadow: none !important;
            margin-bottom: 0 !important;
          }
        }
        .report-a4-page {
          page-break-inside: avoid;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      `}</style>

      {/* Auto-Download Alert Notification Banner */}
      {downloadStatus === 'downloading' && (
        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl flex items-center justify-between animate-pulse no-print border-2 border-emerald-400">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-200 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold">
                {isHindi ? '🎉 भुगतान सफल! आपकी ६-पेज प्रमाणित रिपोर्ट पीडीएफ तुरंत डाउनलोड हो रही है...' : '🎉 Payment Verified! Downloading your 6-page certified report PDF immediately...'}
              </h4>
              <p className="text-[11px] text-emerald-100">
                {isHindi ? 'कृपया २-३ सेकंड प्रतीक्षा करें, फाइल आपके डाउनलोड फोल्डर में सुरक्षित हो रही है।' : 'Please hold on 2-3 seconds, file is saving directly to your downloads folder.'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full hidden sm:inline-block shrink-0">
            A4 Standard
          </span>
        </div>
      )}

      {downloadStatus === 'completed' && (
        <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 shadow-md flex items-center justify-between no-print">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-emerald-900">
                {isHindi ? '✅ रिपोर्ट पीडीएफ सफलतापूर्वक डाउनलोड हो चुकी है!' : '✅ Certified Report PDF Downloaded Successfully!'}
              </h4>
              <p className="text-[11px] text-emerald-700">
                {isHindi ? 'आप इसे नीचे ६ अलग-अलग पृष्ठों में भी पढ़ सकते हैं या दोबारा डाउनलोड कर सकते हैं।' : 'You can review all 6 certified pages below or click to re-download anytime.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDownloadPDF(false)}
            className="text-xs font-bold text-[#89270b] hover:text-[#b44d12] bg-white border border-amber-300 px-3 py-1.5 rounded-xl shadow-xs shrink-0 cursor-pointer"
          >
            {isHindi ? 'दोबारा डाउनलोड करें' : 'Download Again'}
          </button>
        </div>
      )}

      {/* Top Floating Control Bar */}
      <div className="sticky top-2 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-amber-200/90 shadow-lg p-3 sm:p-4 mb-6 no-print">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#b44d12] bg-amber-50/80 px-3 py-2 rounded-xl border border-amber-200 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHindi ? 'सभी सेवाएं' : 'Back to Services'}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* Gemini AI Status Badge & Settings Trigger */}
            <button
              onClick={() => setIsGeminiModalOpen(true)}
              className={`inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all ${
                isAiEnhanced 
                  ? 'bg-purple-50 text-purple-900 border-purple-300 hover:bg-purple-100 shadow-xs' 
                  : 'bg-amber-50 text-[#89270b] border-amber-300 hover:bg-amber-100 shadow-xs'
              }`}
              title="Configure Gemini API Key"
            >
              <Bot className="w-4 h-4 text-purple-600" />
              <span>{isAiEnhanced ? 'Gemini 2.5 AI Active ✨' : 'Gemini AI API ⚙️'}</span>
            </button>

            <div className="inline-flex rounded-xl p-0.5 bg-amber-100/90 border border-amber-300">
              <button
                type="button"
                onClick={() => handleChangeLanguage('hi')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'hi'
                    ? 'bg-[#89270b] text-white shadow-xs'
                    : 'text-amber-900 hover:text-amber-700'
                }`}
              >
                🇮🇳 हिंदी
              </button>
              <button
                type="button"
                onClick={() => handleChangeLanguage('en')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'en'
                    ? 'bg-[#89270b] text-white shadow-xs'
                    : 'text-amber-900 hover:text-amber-700'
                }`}
              >
                🇬🇧 English
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition-all"
              title="Print directly"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{isHindi ? 'प्रिंट' : 'Print'}</span>
            </button>

            <button
              onClick={onOpenWhatsApp}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-xl shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isHindi ? 'व्हाट्सएप भेजें' : 'WhatsApp'}</span>
            </button>

            <button
              onClick={() => handleDownloadPDF(false)}
              disabled={isExporting}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#b44d12] to-[#89270b] hover:from-[#89270b] hover:to-[#701e06] px-4 py-2 rounded-xl shadow-md transition-all disabled:opacity-60 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? (isHindi ? 'पीडीएफ तैयार हो रहा है...' : 'Generating 6-Page PDF...') : (isHindi ? '६-पेज पीडीएफ डाउनलोड' : 'Download 6-Page PDF')}</span>
            </button>
          </div>
        </div>

        {/* Page Switcher Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-3 border-t border-amber-100 mt-3 pb-1 scrollbar-none text-xs">
          {pageNavTabs.map((tab) => {
            const isActive = activePageView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePageView(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  isActive 
                    ? 'bg-[#b44d12] text-white shadow-xs font-bold' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-amber-100/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gemini API Key Configuration Modal */}
      {isGeminiModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-purple-200">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-purple-200" />
                <h3 className="font-bold text-base">Gemini 2.5 Flash AI Settings</h3>
              </div>
              <button 
                onClick={() => setIsGeminiModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs text-gray-700">
              <p className="leading-relaxed">
                Connect your <strong>Google Gemini API Key</strong> to generate hyper-personalized, deeply nuanced psychological and predictive astrological readings for each client's specific birth chart.
              </p>

              <div>
                <label className="block font-bold text-gray-900 mb-1">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono text-xs"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Keys are saved safely in your local browser storage.
                </span>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-[11px] text-purple-900 space-y-1">
                <span className="font-bold block">Why use Gemini API?</span>
                <p>• Tailors the 6-page report specifically to the client's questions.</p>
                <p>• Enhances quarterly predictions and Lal Kitab remedies with authentic reasoning.</p>
                <p>• If no key is set, the system automatically uses our verified classical Vedic engine.</p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGeminiModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isAiProcessing}
                  onClick={handleSaveGeminiKey}
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold flex items-center space-x-1.5 shadow-md disabled:opacity-50"
                >
                  {isAiProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enhancing with Gemini...</span>
                    </>
                  ) : (
                    <span>Save & Enhance Report</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Container holding all printable pages with forced exact color styling */}
      <div id="printable-report" ref={reportRef} className="space-y-8">
        
        {/* =========================================================================
            PAGE 1: Certified Birth Profile, Panchang, Lagna Chart & Graha Table
           ========================================================================= */}
        {(activePageView === 'all' || activePageView === 1) && (
          <div 
            className="report-a4-page bg-white rounded-2xl shadow-xl overflow-hidden text-gray-900 relative"
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '2px solid #FCD34D'
            }}
          >
            
            {/* Page Header with Rich Terracotta Gradient */}
            <div 
              className="p-6 sm:p-7 relative"
              style={{ 
                background: 'linear-gradient(135deg, #89270B 0%, #B44D12 50%, #89270B 100%)', 
                color: '#FFFFFF',
                borderBottom: '2px solid rgba(253, 224, 71, 0.4)'
              }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: '#FEF08A' }}>
                    <Sun className="w-4 h-4" />
                    <span>{isHindi ? '॥ श्री गणेशाय नमः ॥ • Astro Jeevan (एस्ट्रो जीवन) रिसर्च ब्यूरो' : 'Om Sri Ganeshay Namah • Astro Jeevan Ephemeris Bureau'}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight" style={{ color: '#FFFFFF' }}>
                    {reportTitle}
                  </h1>
                  <p className="text-xs sm:text-sm mt-1" style={{ color: '#FEF3C7' }}>
                    {page1.headerTitle} • {isAiEnhanced ? 'Gemini 2.5 Flash AI + 100% Vedic Ephemeris Verified' : page1.headerSub}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <span className="block text-[11px] font-bold uppercase" style={{ color: '#FDE68A' }}>{isHindi ? 'प्रमाणित दस्तावेज' : 'Certified Document'}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>{certId}</span>
                  </div>
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-3xl font-serif shadow-inner"
                    style={{ 
                      borderColor: 'rgba(253, 224, 71, 0.6)', 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                      color: '#FEF08A',
                      border: '2px solid rgba(253, 224, 71, 0.6)'
                    }}
                  >
                    ॐ
                  </div>
                </div>
              </div>

              {/* Golden Page 1 Indicator Badge */}
              <div 
                className="absolute top-3 right-4 sm:top-auto sm:bottom-3 sm:right-6 font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs"
                style={{ backgroundColor: '#FEF08A', color: '#89270B' }}
              >
                {isHindi ? 'पृष्ठ १ / ६' : 'Page 1 of 6'}
              </div>
            </div>

            {/* Client Meta Bar */}
            <div 
              className="px-6 py-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs"
              style={{ backgroundColor: '#FFFBEB', borderBottom: '1px solid #FDE68A' }}
            >
              <div>
                <span className="text-gray-500 block">{isHindi ? 'जातक का नाम' : 'Client Name'}</span>
                <strong className="text-gray-900 text-sm font-semibold">{user.fullName}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">{isHindi ? 'जन्म तिथि' : 'Date of Birth'}</span>
                <strong className="text-gray-900 text-sm font-semibold">{user.dobFormatted}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">{isHindi ? 'जन्म समय' : 'Time of Birth'}</span>
                <strong className="text-gray-900 text-sm font-semibold">{user.tobFormatted}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">{isHindi ? 'जन्म स्थान' : 'Place of Birth'}</span>
                <strong className="text-gray-900 text-sm font-semibold truncate block">{user.pob}</strong>
              </div>
            </div>

            {/* Page 1 Body */}
            <div className="p-6 sm:p-7 space-y-6">
              
              {/* Panchang & Vedic Parameters */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '१.१ सूक्ष्म पंचांग एवं जन्म नक्षत्र विवरण' : '1.1 Micro Panchang & Birth Nakshatra Parameters'}</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}>
                    <span className="text-gray-500 block">{isHindi ? 'लग्न राशि' : 'Ascendant'}</span>
                    <strong className="text-gray-900 font-bold">{page1.panchang.lagnaRashi}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}>
                    <span className="text-gray-500 block">{isHindi ? 'लग्न स्वामी' : 'Lagna Lord'}</span>
                    <strong className="font-bold" style={{ color: '#89270B' }}>{page1.panchang.lagnaLord}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}>
                    <span className="text-gray-500 block">{isHindi ? 'चन्द्र राशि' : 'Moon Sign'}</span>
                    <strong className="text-gray-900 font-bold">{page1.panchang.moonSign}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}>
                    <span className="text-gray-500 block">{isHindi ? 'जन्म नक्षत्र' : 'Nakshatra'}</span>
                    <strong className="font-bold" style={{ color: '#89270B' }}>{page1.panchang.nakshatra}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'तिथि' : 'Tithi'}</span>
                    <span className="font-semibold text-gray-800">{page1.panchang.tithi}</span>
                  </div>
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'तत्व (Element)' : 'Element'}</span>
                    <span className="font-semibold text-gray-800">{page1.panchang.element}</span>
                  </div>
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'वर्ण / गण' : 'Varna / Gana'}</span>
                    <span className="font-semibold text-gray-800">{page1.panchang.varna} / {page1.panchang.gan}</span>
                  </div>
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'गणना सटीकता' : 'Accuracy Rating'}</span>
                    <span className="font-bold text-emerald-700">{page1.accuracyPercentage}% Exact</span>
                  </div>
                </div>
              </div>

              {/* Kundli SVG Chart & Planetary Table */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '१.२ जन्म लग्न चक्र एवं नवग्रह स्थिति (लाहिड़ी अयनांश)' : '1.2 Lagna Kundli Chart & Planetary Astronomical Positions'}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                  
                  {/* SVG Kundli Diamond */}
                  <div className="flex justify-center p-3 rounded-2xl" style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}>
                    <KundliChart kundli={kundli} language={currentLang} />
                  </div>

                  {/* 9 Graha Ephemeris Table with Vibrant Terracotta Header */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs rounded-xl overflow-hidden shadow-2xs" style={{ border: '1px solid #FDE68A' }}>
                      <thead className="text-[11px] font-semibold" style={{ backgroundColor: '#89270B', color: '#FFFFFF' }}>
                        <tr>
                          <th className="py-2.5 px-3">{isHindi ? 'ग्रह' : 'Planet'}</th>
                          <th className="py-2.5 px-2">{isHindi ? 'डिग्री' : 'Degree'}</th>
                          <th className="py-2.5 px-2">{isHindi ? 'राशि' : 'Rashi'}</th>
                          <th className="py-2.5 px-2">{isHindi ? 'भाव' : 'House'}</th>
                          <th className="py-2.5 px-3">{isHindi ? 'स्थिति' : 'Dignity'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-100" style={{ backgroundColor: '#FFFDF5' }}>
                        {page1.planetsTable.map((p, idx) => (
                          <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FFFDF5' }}>
                            <td className="py-2 px-3 font-bold text-gray-900">{p.name}</td>
                            <td className="py-2 px-2 font-mono text-gray-600">{p.degreeFormatted}</td>
                            <td className="py-2 px-2 text-gray-700">{p.rashiName}</td>
                            <td className="py-2 px-2 font-bold" style={{ color: '#B44D12' }}>{p.house}</td>
                            <td className="py-2 px-3">
                              <span 
                                className="px-2 py-0.5 rounded text-[10px] font-bold inline-block"
                                style={{ 
                                  backgroundColor: '#FEF3C7', 
                                  color: '#92400E',
                                  border: '1px solid #FDE68A'
                                }}
                              >
                                {p.dignity}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>

              {/* Explanatory note at bottom of Page 1 */}
              <div className="p-3 rounded-xl text-xs text-gray-700 leading-relaxed" style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}>
                <span className="font-bold" style={{ color: '#89270B' }}>{isHindi ? 'विशेष ज्योतिषीय नोट:' : 'Astrological Note:'} </span>
                {isHindi 
                  ? 'आपकी कुंडली में ग्रहों के अंश, दृष्टि एवं भावों का संयोजन शुद्ध वैदिक निरयण पद्धति से किया गया है। अगले पृष्ठों पर इस कुंडली का सूक्ष्म व व्यावहारिक विवेचन प्रस्तुत है।'
                  : 'All planetary longitudes and house boundaries are rigorously derived using classical Nirayana Vedic algorithms. Detailed analytical readings follow on subsequent pages.'}
              </div>

            </div>

            {/* Page Footer */}
            <div 
              className="px-6 py-2.5 flex items-center justify-between text-[11px] text-gray-500"
              style={{ backgroundColor: '#FFFBEB', borderTop: '1px solid #FDE68A' }}
            >
              <span>{user.fullName} • {certId}</span>
              <span className="font-semibold" style={{ color: '#89270B' }}>{isHindi ? 'पृष्ठ १ (जन्म आधार)' : 'Page 1 of 6'}</span>
              <span>{generatedAt}</span>
            </div>
          </div>
        )}


        {/* =========================================================================
            PAGE 2: Root-Cause Diagnosis & 12 Houses Analysis
           ========================================================================= */}
        {(activePageView === 'all' || activePageView === 2) && (
          <div 
            className="report-a4-page bg-white rounded-2xl shadow-xl overflow-hidden text-gray-900 relative"
            style={{ backgroundColor: '#FFFFFF', border: '2px solid #FCD34D' }}
          >
            
            {/* Page Header */}
            <div 
              className="p-5 sm:p-6 relative"
              style={{ 
                background: 'linear-gradient(135deg, #89270B 0%, #B44D12 50%, #89270B 100%)', 
                color: '#FFFFFF',
                borderBottom: '2px solid rgba(253, 224, 71, 0.4)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#FEF08A' }}>
                    {isHindi ? '॥ श्री गणेशाय नमः ॥ • खंड २' : 'Om Sri Ganeshay Namah • Section 2'}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-serif" style={{ color: '#FFFFFF' }}>{page2.headerTitle}</h2>
                  <p className="text-xs" style={{ color: '#FEF3C7' }}>{page2.headerSub}</p>
                </div>
                <div 
                  className="font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs"
                  style={{ backgroundColor: '#FEF08A', color: '#89270B' }}
                >
                  {isHindi ? 'पृष्ठ २ / ६' : 'Page 2 of 6'}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-6">
              
              {/* Detailed Core Diagnosis */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '२.१ समस्या की मूल जड़ एवं ज्योतिषीय कारण' : '2.1 Core Problem Diagnosis & Astrological Root Cause'}</span>
                </h3>

                <div 
                  className="p-5 rounded-2xl text-xs sm:text-sm text-gray-800 leading-relaxed shadow-2xs space-y-3 font-sans"
                  style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}
                >
                  <p className="whitespace-pre-line leading-relaxed">{page2.diagnosisText}</p>
                </div>
              </div>

              {/* 4 Key Houses Detailed Impact */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '२.२ संबंधित भावों की सूक्ष्म स्थिति एवं प्रभाव' : '2.2 Analysis of Influential Astrological Houses (Bhavas)'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {page2.houseAnalyses.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl shadow-2xs"
                      style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-gray-900 text-sm">{item.house}</span>
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ backgroundColor: '#FEF3C7', color: '#89270B' }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessible Summary in Plain Words */}
              <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}
              >
                <div className="flex items-center space-x-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                    {isHindi ? 'सरल व स्पष्ट निष्कर्ष' : 'Key Takeaway in Plain English'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-sans">
                  {page2.lifeImpactAdvice}
                </p>
              </div>

            </div>

            {/* Page Footer */}
            <div 
              className="px-6 py-2.5 flex items-center justify-between text-[11px] text-gray-500"
              style={{ backgroundColor: '#FFFBEB', borderTop: '1px solid #FDE68A' }}
            >
              <span>{user.fullName} • {certId}</span>
              <span className="font-semibold" style={{ color: '#89270B' }}>{isHindi ? 'पृष्ठ २ (भाव विवेचन)' : 'Page 2 of 6'}</span>
              <span>{generatedAt}</span>
            </div>
          </div>
        )}


        {/* =========================================================================
            PAGE 3: Vimshottari Mahadasha, Active Yogas & Doshas
           ========================================================================= */}
        {(activePageView === 'all' || activePageView === 3) && (
          <div 
            className="report-a4-page bg-white rounded-2xl shadow-xl overflow-hidden text-gray-900 relative"
            style={{ backgroundColor: '#FFFFFF', border: '2px solid #FCD34D' }}
          >
            
            {/* Page Header */}
            <div 
              className="p-5 sm:p-6 relative"
              style={{ 
                background: 'linear-gradient(135deg, #89270B 0%, #B44D12 50%, #89270B 100%)', 
                color: '#FFFFFF',
                borderBottom: '2px solid rgba(253, 224, 71, 0.4)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#FEF08A' }}>
                    {isHindi ? '॥ श्री गणेशाय नमः ॥ • खंड ३' : 'Om Sri Ganeshay Namah • Section 3'}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-serif" style={{ color: '#FFFFFF' }}>{page3.headerTitle}</h2>
                  <p className="text-xs" style={{ color: '#FEF3C7' }}>{page3.headerSub}</p>
                </div>
                <div 
                  className="font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs"
                  style={{ backgroundColor: '#FEF08A', color: '#89270B' }}
                >
                  {isHindi ? 'पृष्ठ ३ / ६' : 'Page 3 of 6'}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-6">
              
              {/* Mahadasha & Antardasha Card */}
              <div 
                className="p-5 rounded-2xl shadow-2xs"
                style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}
              >
                <div className="flex items-center space-x-2 text-sm font-bold mb-2 font-serif" style={{ color: '#89270B' }}>
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '३.१ वर्तमान विंशोत्तरी महादशा एवं अंतर्दशा' : '3.1 Current Vimshottari Mahadasha & Antardasha Analysis'}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 my-2 text-xs">
                  <span className="text-white px-3 py-1 rounded-full font-bold" style={{ backgroundColor: '#B44D12' }}>
                    {isHindi ? 'महादशा:' : 'Mahadasha:'} {page3.dashaDetails.mahadasha}
                  </span>
                  <span className="px-3 py-1 rounded-full font-bold" style={{ backgroundColor: '#FEF3C7', color: '#89270B' }}>
                    {isHindi ? 'अंतर्दशा:' : 'Antardasha:'} {page3.dashaDetails.antardasha}
                  </span>
                  <span className="px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: '#F3F4F6', color: '#374151' }}>
                    {isHindi ? 'प्रभावी वर्ष:' : 'Active until:'} {page3.dashaDetails.endYear}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mt-2 font-sans">
                  {page3.dashaDetails.explanation}
                </p>
              </div>

              {/* Active Yogas in Kundli */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '३.२ कुंडली में उपस्थित शुभ योग एवं उनका फल' : '3.2 Auspicious Yogas Present in Horoscope'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {page3.yogas.map((yog, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl shadow-2xs"
                      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                    >
                      <div className="text-xs font-bold text-gray-900 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        <span>{yog.name}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed font-sans">
                        {yog.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doshas & Peaceful Alleviation */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '३.३ दोष परीक्षण एवं सौम्य शांति मार्गदर्शन' : '3.3 Dosha Diagnostic & Pacification Guidance'}</span>
                </h3>

                <div className="space-y-2.5">
                  <div 
                    className="p-3 rounded-xl text-xs"
                    style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}
                  >
                    <span className="font-bold text-gray-900">{isHindi ? 'मांगलिक स्थिति: ' : 'Manglik Status: '}</span>
                    <span className="text-gray-700">{page3.manglikStatus.text}</span>
                  </div>

                  {page3.doshas.map((d, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-xl shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
                      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                    >
                      <div>
                        <strong className="text-gray-900 block font-semibold">{d.name}</strong>
                        <span className="text-gray-600 text-[11px]">{d.desc}</span>
                      </div>
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap"
                        style={{ 
                          backgroundColor: d.severity.includes('मुक्त') || d.severity.includes('Clear') ? '#DCFCE7' : '#FFEDD5',
                          color: d.severity.includes('मुक्त') || d.severity.includes('Clear') ? '#166534' : '#9A3412'
                        }}
                      >
                        {d.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Page Footer */}
            <div 
              className="px-6 py-2.5 flex items-center justify-between text-[11px] text-gray-500"
              style={{ backgroundColor: '#FFFBEB', borderTop: '1px solid #FDE68A' }}
            >
              <span>{user.fullName} • {certId}</span>
              <span className="font-semibold" style={{ color: '#89270B' }}>{isHindi ? 'पृष्ठ ३ (दशा व योग)' : 'Page 3 of 6'}</span>
              <span>{generatedAt}</span>
            </div>
          </div>
        )}


        {/* =========================================================================
            PAGE 4: 12-Month Golden Predictive Timeline
           ========================================================================= */}
        {(activePageView === 'all' || activePageView === 4) && (
          <div 
            className="report-a4-page bg-white rounded-2xl shadow-xl overflow-hidden text-gray-900 relative"
            style={{ backgroundColor: '#FFFFFF', border: '2px solid #FCD34D' }}
          >
            
            {/* Page Header */}
            <div 
              className="p-5 sm:p-6 relative"
              style={{ 
                background: 'linear-gradient(135deg, #89270B 0%, #B44D12 50%, #89270B 100%)', 
                color: '#FFFFFF',
                borderBottom: '2px solid rgba(253, 224, 71, 0.4)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#FEF08A' }}>
                    {isHindi ? '॥ श्री गणेशाय नमः ॥ • खंड ४' : 'Om Sri Ganeshay Namah • Section 4'}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-serif" style={{ color: '#FFFFFF' }}>{page4.headerTitle}</h2>
                  <p className="text-xs" style={{ color: '#FEF3C7' }}>{page4.headerSub}</p>
                </div>
                <div 
                  className="font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs"
                  style={{ backgroundColor: '#FEF08A', color: '#89270B' }}
                >
                  {isHindi ? 'पृष्ठ ४ / ६' : 'Page 4 of 6'}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-6">
              
              {/* 4 Quarters Timeline Cards */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '४.१ चार चरणों में आगामी १२ माह का सटीक फलादेश' : '4.1 Quarterly Predictive Roadmap for Next 12 Months'}</span>
                </h3>

                <div className="space-y-3">
                  {page4.timelineQuarters.map((q, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-2xl shadow-2xs"
                      style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span 
                          className="px-2.5 py-0.5 rounded-md text-xs font-bold text-white"
                          style={{ backgroundColor: '#89270B' }}
                        >
                          {q.quarter}
                        </span>
                        <span className="text-xs font-bold" style={{ color: '#B44D12' }}>
                          {q.heading}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                        {q.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auspicious Cosmic Coordinates */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '४.२ आपके लिए अनुकूल एवं शुभ ज्योतिषीय निर्देशांक' : '4.2 Auspicious Planetary Coordinates & Personal Lucky Factors'}</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl shadow-2xs" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'शुभ वार (Days)' : 'Lucky Days'}</span>
                    <strong className="text-gray-900 font-bold">{page4.cosmicCoordinates.luckyDays}</strong>
                  </div>
                  <div className="p-3 rounded-xl shadow-2xs" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'शुभ रंग (Colors)' : 'Lucky Colors'}</span>
                    <strong className="text-gray-900 font-bold">{page4.cosmicCoordinates.luckyColors}</strong>
                  </div>
                  <div className="p-3 rounded-xl shadow-2xs" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'शुभ अंक (Numbers)' : 'Lucky Numbers'}</span>
                    <strong className="text-gray-900 font-bold">{page4.cosmicCoordinates.luckyNumber}</strong>
                  </div>
                  <div className="p-3 rounded-xl shadow-2xs" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'शुभ दिशा (Direction)' : 'Lucky Direction'}</span>
                    <strong className="font-bold" style={{ color: '#89270B' }}>{page4.cosmicCoordinates.luckyDirection}</strong>
                  </div>
                  <div className="p-3 rounded-xl shadow-2xs" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'अनुकूल रत्न (Gemstone)' : 'Benefic Gem'}</span>
                    <strong className="font-bold" style={{ color: '#89270B' }}>{page4.cosmicCoordinates.luckyGem}</strong>
                  </div>
                  <div className="p-3 rounded-xl shadow-2xs" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'शुभ समय (Favorable Time)' : 'Peak Timing'}</span>
                    <strong className="text-emerald-700 font-bold">{page4.cosmicCoordinates.favorableTime}</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* Page Footer */}
            <div 
              className="px-6 py-2.5 flex items-center justify-between text-[11px] text-gray-500"
              style={{ backgroundColor: '#FFFBEB', borderTop: '1px solid #FDE68A' }}
            >
              <span>{user.fullName} • {certId}</span>
              <span className="font-semibold" style={{ color: '#89270B' }}>{isHindi ? 'पृष्ठ ४ (१२ माह फल)' : 'Page 4 of 6'}</span>
              <span>{generatedAt}</span>
            </div>
          </div>
        )}


        {/* =========================================================================
            PAGE 5: 21-Day Consecrated Vedic Mantras & Rituals
           ========================================================================= */}
        {(activePageView === 'all' || activePageView === 5) && (
          <div 
            className="report-a4-page bg-white rounded-2xl shadow-xl overflow-hidden text-gray-900 relative"
            style={{ backgroundColor: '#FFFFFF', border: '2px solid #FCD34D' }}
          >
            
            {/* Page Header */}
            <div 
              className="p-5 sm:p-6 relative"
              style={{ 
                background: 'linear-gradient(135deg, #89270B 0%, #B44D12 50%, #89270B 100%)', 
                color: '#FFFFFF',
                borderBottom: '2px solid rgba(253, 224, 71, 0.4)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#FEF08A' }}>
                    {isHindi ? '॥ श्री गणेशाय नमः ॥ • खंड ५' : 'Om Sri Ganeshay Namah • Section 5'}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-serif" style={{ color: '#FFFFFF' }}>{page5.headerTitle}</h2>
                  <p className="text-xs" style={{ color: '#FEF3C7' }}>{page5.headerSub}</p>
                </div>
                <div 
                  className="font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs"
                  style={{ backgroundColor: '#FEF08A', color: '#89270B' }}
                >
                  {isHindi ? 'पृष्ठ ५ / ६' : 'Page 5 of 6'}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-6">
              
              {/* Primary Consecrated Mantra Box */}
              <div 
                className="p-5 rounded-2xl shadow-md text-center"
                style={{ backgroundColor: '#FFFDF5', border: '2px solid #FCD34D' }}
              >
                <div className="mb-2">
                  <span 
                    className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block"
                    style={{ backgroundColor: '#FEF3C7', color: '#89270B' }}
                  >
                    {isHindi ? '॥ मुख्य सिद्ध वैदिक महामंत्र ॥' : '॥ Primary Consecrated Vedic Mahamantra ॥'}
                  </span>
                </div>

                <div className="py-2">
                  <h3 className="text-lg sm:text-xl font-bold font-serif tracking-wide" style={{ color: '#89270B' }}>
                    {page5.primaryMantra.sanskrit}
                  </h3>
                  <p className="text-xs font-serif italic text-amber-900 mt-1">
                    "{page5.primaryMantra.transliteration}"
                  </p>
                </div>

                <div 
                  className="text-xs text-gray-700 p-3 rounded-xl mt-2 text-left"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #FDE68A' }}
                >
                  <strong style={{ color: '#89270B' }}>{isHindi ? 'मंत्र का सरल अर्थ: ' : 'Sacred Meaning: '}</strong>
                  {page5.primaryMantra.meaning}
                </div>

                {/* Mantra Rules Grid */}
                <div 
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] mt-3 pt-3 text-left"
                  style={{ borderTop: '1px solid #FDE68A' }}
                >
                  <div>
                    <span className="text-gray-500 block">{isHindi ? 'नित्य जप संख्या' : 'Daily Count'}</span>
                    <strong className="text-gray-900">{page5.primaryMantra.count}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">{isHindi ? 'प्रयुक्त माला' : 'Jap Mala'}</span>
                    <strong className="text-gray-900">{page5.primaryMantra.mala}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">{isHindi ? 'मुख दिशा' : 'Facing Direction'}</span>
                    <strong className="text-gray-900">{page5.primaryMantra.direction}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">{isHindi ? 'उत्तम समय' : 'Best Time'}</span>
                    <strong className="text-gray-900">{page5.primaryMantra.time}</strong>
                  </div>
                </div>
              </div>

              {/* Day-Wise Rituals */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '५.२ साप्ताहिक विशिष्ट पूजा एवं अर्पण विधि' : '5.2 Day-Wise Spiritual Practices & Sacred Offerings'}</span>
                </h3>

                <div className="space-y-2.5">
                  {page5.dailyRituals.map((rit, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl shadow-2xs"
                      style={{ backgroundColor: '#FFFDF5', border: '1px solid #FED7AA' }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{rit.title}</h4>
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ backgroundColor: '#FFEDD5', color: '#B44D12' }}
                        >
                          {rit.day}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-sans">
                        {rit.procedure}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gemstone & Rudraksha Compatibility */}
              <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}
              >
                <div className="flex items-center space-x-2 text-sm font-bold mb-2 font-serif" style={{ color: '#89270B' }}>
                  <Gem className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '५.३ भाग्यशाली रत्न एवं रुद्राक्ष परामर्श' : '5.3 Auspicious Gemstone & Rudraksha Guidance'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'अनुशंसित रत्न' : 'Auspicious Gemstone'}</span>
                    <strong className="text-sm block font-bold" style={{ color: '#89270B' }}>{page5.gemstoneAndRudraksha.stone}</strong>
                    <span className="text-[11px] text-gray-600 mt-1 block">
                      {isHindi ? 'धातु: ' : 'Metal: '}{page5.gemstoneAndRudraksha.metal} • {isHindi ? 'अंगुली: ' : 'Finger: '}{page5.gemstoneAndRudraksha.finger} • {isHindi ? 'दिन: ' : 'Day: '}{page5.gemstoneAndRudraksha.day}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                    <span className="text-gray-500 block">{isHindi ? 'अनुशंसित रुद्राक्ष' : 'Benefic Rudraksha'}</span>
                    <strong className="text-sm block font-bold" style={{ color: '#89270B' }}>{page5.gemstoneAndRudraksha.rudraksha}</strong>
                    <p className="text-[11px] text-gray-600 mt-1 leading-normal font-sans">
                      {page5.gemstoneAndRudraksha.significance}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Page Footer */}
            <div 
              className="px-6 py-2.5 flex items-center justify-between text-[11px] text-gray-500"
              style={{ backgroundColor: '#FFFBEB', borderTop: '1px solid #FDE68A' }}
            >
              <span>{user.fullName} • {certId}</span>
              <span className="font-semibold" style={{ color: '#89270B' }}>{isHindi ? 'पृष्ठ ५ (वैदिक महामंत्र)' : 'Page 5 of 6'}</span>
              <span>{generatedAt}</span>
            </div>
          </div>
        )}


        {/* =========================================================================
            PAGE 6: Lal Kitab Remedies, Vastu Rules & Official Certification
           ========================================================================= */}
        {(activePageView === 'all' || activePageView === 6) && (
          <div 
            className="report-a4-page bg-white rounded-2xl shadow-xl overflow-hidden text-gray-900 relative"
            style={{ backgroundColor: '#FFFFFF', border: '2px solid #FCD34D' }}
          >
            
            {/* Page Header */}
            <div 
              className="p-5 sm:p-6 relative"
              style={{ 
                background: 'linear-gradient(135deg, #89270B 0%, #B44D12 50%, #89270B 100%)', 
                color: '#FFFFFF',
                borderBottom: '2px solid rgba(253, 224, 71, 0.4)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#FEF08A' }}>
                    {isHindi ? '॥ श्री गणेशाय नमः ॥ • खंड ६' : 'Om Sri Ganeshay Namah • Section 6'}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-serif" style={{ color: '#FFFFFF' }}>{page6.headerTitle}</h2>
                  <p className="text-xs" style={{ color: '#FEF3C7' }}>{page6.headerSub}</p>
                </div>
                <div 
                  className="font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs"
                  style={{ backgroundColor: '#FEF08A', color: '#89270B' }}
                >
                  {isHindi ? 'पृष्ठ ६ / ६' : 'Page 6 of 6'}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-6">
              
              {/* Lal Kitab Secrets */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isHindi ? '६.१ लाल किताब के सिद्ध एवं अचूक टोटके' : '6.1 Authentic Lal Kitab Proven Practical Remedies'}</span>
                </h3>

                <div className="space-y-2.5">
                  {page6.lalKitabRemedies.map((lk, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl"
                      style={{ backgroundColor: '#FFFDF5', border: '1px solid #FED7AA' }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{lk.title}</h4>
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ backgroundColor: '#FEF3C7', color: '#89270B' }}
                        >
                          Lal Kitab
                        </span>
                      </div>
                      <p className="text-xs text-gray-800 leading-relaxed font-sans">{lk.remedy}</p>
                      <p className="text-[11px] italic mt-1 p-1.5 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#78350F' }}>
                        <span className="font-semibold">{isHindi ? 'शास्त्रीय तर्क: ' : 'Vedic Logic: '}</span>{lk.logic}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vastu Harmonization */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '६.२ बिना तोड़-फोड़ के दिशात्मक वास्तु संतुलन' : '6.2 Demolition-Free Directional Space Harmonization'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {page6.vastuAdjustments.map((v, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-xl text-xs"
                      style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}
                    >
                      <span className="text-[10px] font-bold uppercase block" style={{ color: '#B44D12' }}>{v.direction}</span>
                      <strong className="text-gray-900 block font-semibold my-0.5">{v.title}</strong>
                      <p className="text-gray-600 leading-normal text-[11px] font-sans">{v.instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Do's and Don'ts Grid */}
              <div>
                <h3 className="text-sm font-bold font-serif flex items-center space-x-2 pb-1.5 mb-3" style={{ color: '#89270B', borderBottom: '1px solid #FDE68A' }}>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '६.३ दैनिक जीवन में क्या करें और क्या न करें' : '6.3 Golden Conduct: Recommended Do’s & Strict Don’ts'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                    <h5 className="font-bold text-emerald-950 mb-2 flex items-center space-x-1.5 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{isHindi ? 'अवश्य करें (Do’s)' : 'Highly Recommended (Do’s)'}</span>
                    </h5>
                    <ul className="space-y-1.5 text-gray-700 list-disc list-inside font-sans">
                      {page6.dosAndDonts.dos.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                    <h5 className="font-bold text-red-950 mb-2 flex items-center space-x-1.5 text-xs sm:text-sm">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>{isHindi ? 'भूलकर भी न करें (Don’ts)' : 'Strictly Avoid (Don’ts)'}</span>
                    </h5>
                    <ul className="space-y-1.5 text-gray-700 list-disc list-inside font-sans">
                      {page6.dosAndDonts.donts.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Bureau Seal & Certification Sign-Off */}
              <div 
                className="p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
                style={{ backgroundColor: '#FFFDF5', border: '2px solid #FCD34D' }}
              >
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-emerald-800 font-bold">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>{page6.certification.certifiedBy}</span>
                  </div>
                  <p className="text-gray-600">
                    {isHindi ? 'प्रमाण पत्र संख्या' : 'Certificate Serial No'}: <span className="font-mono font-bold text-gray-900">{certId}</span>
                  </p>
                  <p className="text-gray-500 text-[11px]">
                    {isHindi ? 'प्रमाणीकरण तिथि' : 'Issued On'}: {generatedAt} • {isAiEnhanced ? 'Gemini 2.5 Flash AI Verified' : '100% Satvik Verified'}
                  </p>
                </div>

                <div 
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl shadow-xs"
                  style={{ 
                    border: '2px dashed rgba(180, 77, 18, 0.5)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)' 
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ border: '2px solid #B44D12', color: '#B44D12' }}
                  >
                    ॐ
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider mt-1 text-center" style={{ color: '#89270B' }}>
                    {page6.certification.sealText}
                  </span>
                </div>
              </div>

            </div>

            {/* Page Footer */}
            <div 
              className="px-6 py-2.5 flex items-center justify-between text-[11px] text-gray-500"
              style={{ backgroundColor: '#FFFBEB', borderTop: '1px solid #FDE68A' }}
            >
              <span>{user.fullName} • {certId}</span>
              <span className="font-semibold" style={{ color: '#89270B' }}>{isHindi ? 'पृष्ठ ६ (वास्तु व प्रमाणन)' : 'Page 6 of 6'}</span>
              <span>{generatedAt}</span>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Floating Navigation for Single-Page Mode */}
      {activePageView !== 'all' && (
        <div className="flex items-center justify-between mt-6 bg-white p-3.5 rounded-2xl border border-amber-200 shadow-sm no-print">
          <button
            onClick={() => setActivePageView(prev => (prev > 1 ? prev - 1 : 1))}
            disabled={activePageView === 1}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isHindi ? 'पिछला पृष्ठ' : 'Previous Page'}</span>
          </button>

          <span className="text-xs font-bold text-amber-950">
            {isHindi ? `पृष्ठ ${activePageView} / ६` : `Page ${activePageView} of 6`}
          </span>

          <button
            onClick={() => setActivePageView(prev => (prev < 6 ? prev + 1 : 6))}
            disabled={activePageView === 6}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#b44d12] text-white text-xs font-semibold hover:bg-[#89270b] disabled:opacity-40 shadow-xs cursor-pointer"
          >
            <span>{isHindi ? 'अगला पृष्ठ' : 'Next Page'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Final Call to Action Box */}
      <div 
        className="mt-8 rounded-2xl p-5 text-center no-print"
        style={{ backgroundColor: '#FFFDF5', border: '1px solid #FDE68A' }}
      >
        <h4 className="font-serif font-bold text-base mb-1" style={{ color: '#89270B' }}>
          {isHindi ? '॥ शुभम भवतु • आपका कल्याण हो ॥' : '॥ Shubham Bhavatu • Divine Blessings ॥'}
        </h4>
        <p className="text-xs text-gray-600 max-w-lg mx-auto">
          {isHindi 
            ? 'इस रिपोर्ट को सुरक्षित रखें और बताए गए २१ दिवसीय वैदिक अनुष्ठानों का पूरी निष्ठा से पालन करें। किसी भी जिज्ञासा हेतु हमारे आचार्य सहायता केंद्र से संपर्क करें।'
            : 'Keep this certified report secure and follow the prescribed 21-day Vedic rituals with utmost sincerity. May the planetary deities bless your life.'}
        </p>
        <div className="mt-3 flex items-center justify-center space-x-3">
          <button
            onClick={onOpenWhatsApp}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isHindi ? 'व्हाट्सएप पर शेयर करें' : 'Share on WhatsApp'}</span>
          </button>
          <button
            onClick={() => handleDownloadPDF(false)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold bg-white hover:bg-amber-100/50 border border-amber-300 px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
            style={{ color: '#89270B' }}
          >
            <Download className="w-4 h-4" />
            <span>{isHindi ? 'पीडीएफ सहेजें' : 'Save PDF'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
