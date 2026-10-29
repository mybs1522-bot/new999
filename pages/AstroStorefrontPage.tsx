import React, { useState, useEffect } from 'react';
import Header from '../components/astro/Header';
import ReportCatalog from '../components/astro/ReportCatalog';
import AstroShubhLandingPage from '../components/astro/AstroShubhLandingPage';
import ReligiousLanguageModal from '../components/astro/ReligiousLanguageModal';
import { REPORTS_DATA } from '../data/reports';
import { SLUG_TO_REPORT_ID, REPORT_ID_TO_SLUG, LANDING_PAGES_DATA } from '../data/landingPagesData';

export const AstroStorefrontPage: React.FC = () => {
  const [language, setLanguage] = useState<'hi' | 'en'>(() => {
    return (localStorage.getItem('astro_user_lang') as 'hi' | 'en') || 'hi';
  });

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'catalog' | 'landing'>('catalog');
  const [selectedReportId, setSelectedReportId] = useState<string>('karz-mukti-remedy');

  // Check URL pathname or hash for deep linking (e.g. /landing/KarzMukti)
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      let targetSlug = null;
      if (path.includes('/landing/')) {
        targetSlug = path.split('/landing/')[1]?.split('/')[0]?.split('?')[0];
      } else if (hash.includes('/landing/')) {
        targetSlug = hash.split('/landing/')[1]?.split('/')[0]?.split('?')[0];
      }

      if (targetSlug && (SLUG_TO_REPORT_ID as Record<string, string>)[targetSlug]) {
        setSelectedReportId((SLUG_TO_REPORT_ID as Record<string, string>)[targetSlug]);
        setCurrentView('landing');
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  const handleSelectReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setCurrentView('landing');
    const slug = (REPORT_ID_TO_SLUG as Record<string, string>)[reportId] || reportId;
    window.history.pushState(null, '', `#/landing/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setCurrentView('catalog');
    window.history.pushState(null, '', '#/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageChange = (lang: string) => {
    const validLang = lang === 'en' ? 'en' : 'hi';
    setLanguage(validLang);
    localStorage.setItem('astro_user_lang', validLang);
    setIsLanguageModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-gray-900 font-sans">
      {/* Top Header with Language Toggle & Live Shopify Status */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        onLogoClick={handleBackToCatalog}
      />

      {/* Main Content Router */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'catalog' ? (
          <div>
            {/* Storefront Hero Banner */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-amber-900 via-[#89270B] to-amber-950 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block bg-amber-400/20 text-amber-300 text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-3 backdrop-blur-xs border border-amber-300/30">
                  {language === 'hi' ? '१००% सटीक वैदिक ज्योतिष' : 'Certified Vedic Astrology & Vastu'}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white mb-3">
                  {language === 'hi'
                    ? 'जीवन की हर समस्या का अचूक वैदिक समाधान'
                    : 'Personalized Vedic Reports & Powerful Remedies'}
                </h1>
                <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed mb-4">
                  {language === 'hi'
                    ? 'कर्ज मुक्ति, व्यापार वृद्धि, नौकरी व विवाह बाधा निवारण के लिए अपनी जन्म कुंडली अनुसार प्रमाणित रिपोर्ट पाएं। मात्र ₹२९९ में।'
                    : 'Unlock authentic solutions for debt clearance, business expansion, marriage, and career acceleration. Flat ₹299.'}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-amber-200">
                  <span className="flex items-center gap-1.5">⚡ Instant WhatsApp Delivery</span>
                  <span className="flex items-center gap-1.5">🔒 100% Confidential</span>
                  <span className="flex items-center gap-1.5">🌟 22,000+ Satisfied Seekers</span>
                </div>
              </div>
            </div>

            {/* Catalog Grid */}
            <ReportCatalog
              language={language}
              onSelectReport={handleSelectReport}
            />
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <button
                onClick={handleBackToCatalog}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#89270B] hover:text-amber-800 transition-colors py-2 px-3 rounded-lg bg-amber-50 border border-amber-200"
              >
                ← {language === 'hi' ? 'सभी २२ रिपोर्ट देखें (Catalog)' : 'Back to All Reports'}
              </button>
            </div>

            {/* High Converting Landing Page with Birth Details Form */}
            <AstroShubhLandingPage
              reportId={selectedReportId}
              language={language}
              onBack={handleBackToCatalog}
            />
          </div>
        )}
      </main>

      {/* Language Selection Modal */}
      {isLanguageModalOpen && (
        <ReligiousLanguageModal
          isOpen={isLanguageModalOpen}
          selectedLanguage={language}
          onSelectLanguage={handleLanguageChange}
          onConfirm={() => setIsLanguageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AstroStorefrontPage;
