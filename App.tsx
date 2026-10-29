import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AstroStorefrontPage from './pages/AstroStorefrontPage';
import RefundPolicyPage from './pages/RefundPolicyPage';

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<AstroStorefrontPage />} />
      <Route path="/landing/:slug" element={<AstroStorefrontPage />} />
      <Route path="/catalog" element={<AstroStorefrontPage />} />
      <Route path="/refund-policy" element={<RefundPolicyPage />} />
    </Routes>
  );
};

export default App;
