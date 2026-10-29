import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Key, 
  Search, 
  RefreshCw, 
  Download, 
  Eye, 
  Database, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Phone,
  Trash2,
  Sparkles,
  Layers,
  ArrowLeft,
  CreditCard,
  Settings,
  MessageCircle
} from 'lucide-react';
import { 
  SUPABASE_URL, 
  SUPABASE_ANON_KEY, 
  SUPABASE_PUBLISHABLE_KEY,
  fetchReportOrders, 
  deleteReportOrder 
} from '../utils/supabaseClient';
import { generateReport } from '../utils/reportGenerator';
import { getRazorpayKey, setRazorpayKey } from '../utils/razorpayClient';

export default function AdminDashboard({ onNavigateStorefront, onViewReport }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('astro_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Orders State
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCopiedSql, setIsCopiedSql] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [showRzpModal, setShowRzpModal] = useState(false);
  const [rzpKeyInput, setRzpKeyInput] = useState(() => getRazorpayKey());
  const [isRzpSaved, setIsRzpSaved] = useState(false);

  const handleSaveRzpKey = (e) => {
    e.preventDefault();
    if (rzpKeyInput) {
      setRazorpayKey(rzpKeyInput);
      setIsRzpSaved(true);
      setTimeout(() => setIsRzpSaved(false), 2000);
    }
  };

  // Load orders when authenticated
  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await fetchReportOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'adminxx' && password.trim() === 'Robbin#00xx') {
      setIsAuthenticated(true);
      localStorage.setItem('astro_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials! Username or password incorrect.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('astro_admin_auth');
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this report record?')) {
      await deleteReportOrder(id);
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  const handleViewReport = (ord, lang = 'hi', specificReportId = null) => {
    // Parse birth date (handles DD/MM/YYYY and YYYY-MM-DD)
    let d = '15', m = '08', y = '1995';
    if (ord.dob) {
      if (ord.dob.includes('/')) {
        const parts = ord.dob.split('/');
        d = parts[0] || '15';
        m = parts[1] || '08';
        y = parts[2] || '1995';
      } else if (ord.dob.includes('-')) {
        const parts = ord.dob.split('-');
        y = parts[0] || '1995';
        m = parts[1] || '08';
        d = parts[2] || '15';
      }
    }

    // Parse birth time (handles HH:MM AM/PM, 24h, and unknown)
    let hour = '12', minute = '00', ampm = 'PM', timeUnknown = false;
    const rawTobStr = ord.tob ? String(ord.tob).trim().toLowerCase() : '';
    if (
      !rawTobStr ||
      rawTobStr === '12:00 pm' ||
      rawTobStr === 'unknown / 12:00 pm' ||
      rawTobStr.includes('unknown') ||
      rawTobStr.includes('अज्ञात') ||
      rawTobStr.includes('not provided') ||
      rawTobStr.includes('उपलब्ध नहीं')
    ) {
      timeUnknown = true;
    } else {
      const match = ord.tob.match(/(\d{1,2}):(\d{2})(?:\s*([APap][Mm]))?/);
      if (match) {
        let h = parseInt(match[1], 10);
        const rawAmpm = match[3] ? match[3].toUpperCase() : null;
        if (!rawAmpm && h >= 12) {
          ampm = 'PM';
          if (h > 12) h -= 12;
        } else if (!rawAmpm && h < 12) {
          ampm = 'AM';
          if (h === 0) h = 12;
        } else {
          ampm = rawAmpm || 'AM';
        }
        hour = String(h).padStart(2, '0');
        minute = match[2];
      }
    }

    const orderDate = ord.created_at
      ? new Date(ord.created_at).toLocaleDateString('en-GB').replace(/\//g, '-')
      : new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

    const effectiveReportId = specificReportId || ord.report_id || 'karz-mukti-remedy';
    let effectiveTitle = ord.report_title || 'Personalized Karz Mukti Report & Remedy';
    if (effectiveReportId === 'dhan-yog-report') {
      effectiveTitle = lang === 'hi' ? 'धन योग एवं महालक्ष्मी कृपा रिपोर्ट' : 'Personalized Dhan Yog Report & Remedy';
    } else if (effectiveReportId === 'karz-mukti-remedy') {
      effectiveTitle = lang === 'hi' ? 'कर्ज मुक्ति एवं ऋण मोचन महा-रिपोर्ट' : 'Personalized Karz Mukti Report & Remedy';
    }

    const targetOrderId = specificReportId === 'dhan-yog-report'
      ? (ord.id.endsWith('_dhan_yog') ? ord.id : `${ord.id}_dhan_yog`)
      : (ord.id.endsWith('_dhan_yog') ? ord.id.replace('_dhan_yog', '') : ord.id);

    const rawOrderId = ord.name || targetOrderId.replace(/^shopify_/, '') || 'Order';
    const isFemale = ord.gender === 'महिला' || (typeof ord.gender === 'string' && ord.gender.toLowerCase() === 'female');

    const birthData = {
      fullName: ord.client_name || 'Client',
      gender: isFemale ? 'female' : 'male',
      dob: { day: d, month: m, year: y },
      tob: { hour, minute, ampm },
      timeUnknown,
      pob: { name: ord.pob || 'New Delhi, India', state: '', country: 'India' },
      pobText: ord.pob || 'New Delhi, India',
      whatsappNumber: ord.whatsapp || '',
      orderId: targetOrderId,
      orderName: rawOrderId,
      orderDate,
      productName: effectiveTitle
    };

    const reportToView = generateReport(
      effectiveReportId,
      birthData,
      lang
    );
    reportToView.orderId = targetOrderId;
    reportToView.orderName = rawOrderId;
    reportToView.orderDate = orderDate;
    reportToView.productName = effectiveTitle;
    reportToView.language = lang;
    if (!reportToView.user) reportToView.user = {};
    reportToView.user.language = lang;
    reportToView.user.orderId = targetOrderId;
    reportToView.user.orderName = rawOrderId;
    reportToView.user.orderDate = orderDate;
    reportToView.user.productName = effectiveTitle;

    onViewReport(reportToView, lang);
  };

  const handleSendWhatsAppReport = (ord) => {
    const rawPhone = (ord.whatsapp || '').replace(/\D/g, '');
    const cleanPhone = rawPhone.startsWith('91') && rawPhone.length > 10 ? rawPhone : `91${rawPhone}`;
    const clientName = ord.client_name || 'जातक';
    const reportTitle = ord.report_title || 'वैदिक ज्योतिष रिपोर्ट';
    const orderId = ord.id || 'AJ-108';

    const message = `प्रणाम ${clientName} जी 🙏

एस्ट्रो जीवन (Astro Jeevan) से आदरणीय एस्ट्रो गुरुजी द्वारा तैयार की गई आपकी व्यक्तिगत '${reportTitle}' पूर्ण रूप से तैयार है।

📌 संदर्भ संख्या (Order ID): ${orderId}
🔮 जातक: ${clientName} (${ord.dob || ''} • ${ord.tob || ''})
📍 जन्म स्थान: ${ord.pob || ''}

कृपया अपनी 6-पेज की विस्तृत वैदिक रिपोर्ट संलग्न पीडीएफ में देखें। इसमें आपकी कुंडली की निरयण भाव गणना, दशा-अन्तर्दशा चक्र और लाल किताब के अचूक 5-मिनट के सिद्ध उपाय शामिल हैं।

किसी भी प्रश्न या उपाय के मार्गदर्शन हेतु आप इसी आधिकारिक नंबर पर संपर्क कर सकते हैं।

॥ ॐ श्री गणेशाय नमः ॥
॥ एस्ट्रो जीवन - वैदिक ज्योतिष संस्थान ॥`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const copySqlSnippet = () => {
    const sql = `-- Run this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.reports (
  id TEXT PRIMARY KEY,
  client_name TEXT,
  gender TEXT,
  dob TEXT,
  tob TEXT,
  pob TEXT,
  whatsapp TEXT,
  report_id TEXT,
  report_title TEXT,
  amount NUMERIC DEFAULT 299,
  payment_status TEXT DEFAULT 'Payment Pending',
  payment_method TEXT DEFAULT '',
  payment_id TEXT DEFAULT '',
  lead_stage TEXT DEFAULT 'form_submitted',
  error_details TEXT DEFAULT '',
  report_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON public.reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON public.reports FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.reports FOR DELETE USING (true);`;

    navigator.clipboard.writeText(sql);
    setIsCopiedSql(true);
    setTimeout(() => setIsCopiedSql(false), 2000);
  };

  // Metrics
  const completedOrders = orders.filter(o => (o.lead_stage === 'completed') || (!o.lead_stage && (o.payment_status || '').includes('Completed')));
  const abandonedLeads = orders.filter(o => o.lead_stage === 'payment_dismissed');
  const failedLeads = orders.filter(o => o.lead_stage === 'payment_failed' || o.lead_stage === 'gateway_failed');
  const pendingLeads = orders.filter(o => o.lead_stage === 'form_submitted');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + (Number(o.amount) || 299), 0);
  const totalOrders = orders.length;

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      (o.client_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.whatsapp || '').includes(searchQuery) ||
      (o.report_title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.pob || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // --------------------------------------------------------------------------
  // LOGIN SCREEN
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#26170d] flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border-2 border-amber-300 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#89270b] via-[#b44d12] to-[#89270b]" />

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto mb-3 text-3xl font-serif text-[#89270b] shadow-inner">
              ॐ
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#89270b]">Astro Jeevan Admin</h2>
            <p className="text-xs text-gray-500 mt-1">Astro Jeevan Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="adminxx"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b44d12] text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b44d12] text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#89270b] hover:bg-[#701e06] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer mt-2"
            >
              <ShieldCheck className="w-4 h-4 text-yellow-300" />
              <span>Login to Dashboard</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <button
              onClick={onNavigateStorefront}
              className="hover:text-[#b44d12] flex items-center space-x-1 font-semibold"
            >
              <span>← Back to Storefront</span>
            </button>
            <span className="font-mono text-gray-400">v2.5 Supabase</span>
          </div>

        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-gray-900 pb-16">
      
      {/* Top Admin Navbar */}
      <header className="bg-[#26170d] text-white px-4 sm:px-8 py-3.5 shadow-md border-b-2 border-amber-400/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-lg font-bold text-yellow-300 font-serif shadow-xs">
              ॐ
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold font-serif leading-tight">
                Astro Jeevan Admin
              </h1>
              <div className="flex items-center space-x-1.5 text-[11px] text-amber-300/80">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Supabase: aynzwvsnjqhcywfandbd</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setShowRzpModal(true)}
              className="inline-flex items-center space-x-1 text-xs font-bold text-blue-200 bg-blue-950/60 hover:bg-blue-900 px-3 py-1.5 rounded-lg border border-blue-400/40 transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-300" />
              <span>Razorpay Key</span>
            </button>

            <button
              onClick={() => setShowSqlModal(true)}
              className="inline-flex items-center space-x-1 text-xs font-bold text-amber-200 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-amber-300/40 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-yellow-300" />
              <span>Supabase SQL Setup</span>
            </button>

            <button
              onClick={onNavigateStorefront}
              className="inline-flex items-center space-x-1 text-xs font-semibold text-gray-200 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Customer Storefront</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1 text-xs font-bold text-red-200 bg-red-950/60 hover:bg-red-900 px-3 py-1.5 rounded-lg border border-red-700/60 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-amber-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Total Revenue</span>
              <strong className="text-2xl font-black text-gray-900 mt-1 block">₹{totalRevenue.toLocaleString('en-IN')}</strong>
              <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">Flat ₹299 per report</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-[#89270b]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Total Leads</span>
              <strong className="text-2xl font-black text-gray-900 mt-1 block">{totalOrders}</strong>
              <div className="flex items-center space-x-2 text-[10px] mt-0.5">
                <span className="text-emerald-700 font-bold">✓ {completedOrders.length}</span>
                <span className="text-amber-600 font-bold">⏸ {abandonedLeads.length}</span>
                <span className="text-red-600 font-bold">✗ {failedLeads.length}</span>
                {pendingLeads.length > 0 && <span className="text-blue-600 font-bold">⋯ {pendingLeads.length}</span>}
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Database</span>
              <div className="flex items-center space-x-1.5 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <strong className="text-sm font-bold text-gray-900">Supabase</strong>
              </div>
              <span className="text-[10px] text-gray-500 mt-0.5 block font-mono truncate max-w-[120px]">aynzwvsnjq...</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100/70 border border-purple-200 flex items-center justify-center text-purple-800">
              <Database className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Gemini 3.8 AI</span>
              <strong className="text-sm font-bold text-purple-900 mt-1 block">Active & Verified</strong>
              <span className="text-[10px] text-purple-700 font-semibold mt-0.5 block">Deep Insights</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors" onClick={() => setShowRzpModal(true)}>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Razorpay</span>
              <div className="flex items-center space-x-1.5 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <strong className="text-sm font-bold text-gray-900">Ready</strong>
              </div>
              <span className="text-[10px] text-blue-600 font-semibold mt-0.5 block underline">Configure Key</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Orders & Reports Management Table Card */}
        <div className="bg-white rounded-3xl shadow-md border border-amber-200/90 overflow-hidden">
          
          {/* Table Header Controls */}
          <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#fffdfa]">
            <div>
              <h2 className="text-lg font-bold font-serif text-[#89270b]">
                Client Reports & Orders ({filteredOrders.length})
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Real-time synchronized with Supabase & client checkout logs
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by client, phone..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#b44d12] text-xs"
                />
              </div>

              <button
                onClick={loadOrders}
                disabled={isLoading}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                title="Refresh orders from Supabase"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#b44d12]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <FileText className="w-12 h-12 text-amber-300 mx-auto mb-3 opacity-60" />
                <h3 className="font-bold text-gray-800 text-sm">No Client Reports Yet</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
                  When a client completes an order on the landing page or catalog, their full profile and generated 6-page report will appear here automatically.
                </p>
                <button
                  onClick={onNavigateStorefront}
                  className="mt-4 px-4 py-2 bg-[#89270b] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#701e06]"
                >
                  Create Test Report on Storefront
                </button>
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#fffbeb] text-gray-700 text-[11px] font-bold uppercase tracking-wider border-b border-amber-200">
                  <tr>
                    <th className="py-3 px-4">Client Details</th>
                    <th className="py-3 px-4">Birth Parameters</th>
                    <th className="py-3 px-4">Service & Amount</th>
                    <th className="py-3 px-4">Payment & Time</th>
                    <th className="py-3 px-4 text-center">Generated Report</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((ord) => {
                    const isCombo = Number(ord.amount) >= 400;
                    const isDhanOnly = ord.report_id === 'dhan-yog-report' || ord.id.endsWith('_dhan_yog');

                    return (
                    <tr key={ord.id} className="hover:bg-amber-50/40 transition-colors">
                      
                      {/* Client Details */}
                      <td className="py-3.5 px-4">
                        <strong className="font-bold text-gray-900 block text-sm">{ord.client_name}</strong>
                        <div className="flex items-center space-x-2 text-[11px] text-gray-500 mt-0.5">
                          <span>{ord.gender}</span>
                          {ord.whatsapp && (
                            <span className="flex items-center space-x-0.5 text-emerald-700 font-semibold">
                              <Phone className="w-3 h-3" />
                              <span>{ord.whatsapp}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Birth Parameters */}
                      <td className="py-3.5 px-4 text-gray-700">
                        <div className="font-medium text-gray-900">{ord.dob} • {ord.tob}</div>
                        <div className="text-[11px] text-gray-500 truncate max-w-[180px]">{ord.pob}</div>
                      </td>

                      {/* Service & Amount */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#89270b] block">{ord.report_title}</span>
                        {isCombo && (
                          <div className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded mt-0.5">
                            <span>✨ २-इन-१ कॉम्बो (कर्ज मुक्ति + धन योग)</span>
                          </div>
                        )}
                        {isDhanOnly && (
                          <div className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded mt-0.5">
                            <span>💰 धन योग एवं महालक्ष्मी रिपोर्ट</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1.5 mt-1">
                          <span className="text-xs font-black text-gray-900">₹{ord.amount || 299}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            (ord.lead_stage === 'completed' || (!ord.lead_stage && (ord.payment_status || '').includes('Completed')))
                              ? 'text-emerald-700 bg-emerald-100'
                              : ord.lead_stage === 'payment_dismissed'
                                ? 'text-amber-700 bg-amber-100'
                                : (ord.lead_stage === 'payment_failed' || ord.lead_stage === 'gateway_failed')
                                  ? 'text-red-700 bg-red-100'
                                  : ord.lead_stage === 'form_submitted'
                                    ? 'text-blue-700 bg-blue-100'
                                    : 'text-emerald-700 bg-emerald-100'
                          }`}>
                            {ord.lead_stage === 'completed' || (!ord.lead_stage && (ord.payment_status || '').includes('Completed'))
                              ? '✓ Paid'
                              : ord.lead_stage === 'payment_dismissed'
                                ? '⏸ Abandoned'
                                : ord.lead_stage === 'payment_failed'
                                  ? '✗ Failed'
                                  : ord.lead_stage === 'gateway_failed'
                                    ? '✗ Gateway Error'
                                    : ord.lead_stage === 'form_submitted'
                                      ? '⋯ Pending'
                                      : ord.payment_status || 'Paid'}
                          </span>
                        </div>
                        {ord.payment_id && (
                          <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{ord.payment_id}</span>
                        )}
                      </td>

                      {/* Payment & Time */}
                      <td className="py-3.5 px-4 text-[11px] text-gray-600">
                        <span className="block font-medium text-gray-900">{ord.payment_method || 'UPI'}</span>
                        <span className="text-gray-400 block mt-0.5">
                          {new Date(ord.created_at || Date.now()).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </td>

                      {/* Generated Report View & WhatsApp Delivery Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-1.5">
                          {isCombo ? (
                            <div className="space-y-1.5 w-full">
                              {/* 1. Karz Mukti */}
                              <div className="flex items-center justify-center space-x-1">
                                <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1 py-0.5 rounded shrink-0">१. कर्ज:</span>
                                <button
                                  onClick={() => handleViewReport(ord, 'hi', 'karz-mukti-remedy')}
                                  className="inline-flex items-center space-x-0.5 bg-[#89270b] hover:bg-[#701e06] text-white px-2 py-1 rounded-lg font-bold text-[11px] shadow-xs cursor-pointer active:scale-95"
                                  title="Open Karz Mukti in Hindi"
                                >
                                  <Download className="w-3 h-3 text-yellow-300" />
                                  <span>हिंदी PDF</span>
                                </button>
                                <button
                                  onClick={() => handleViewReport(ord, 'en', 'karz-mukti-remedy')}
                                  className="inline-flex items-center space-x-0.5 bg-amber-800 hover:bg-amber-900 text-white px-2 py-1 rounded-lg font-bold text-[11px] shadow-xs cursor-pointer active:scale-95"
                                  title="Open Karz Mukti in English"
                                >
                                  <Download className="w-3 h-3 text-amber-200" />
                                  <span>Eng</span>
                                </button>
                              </div>

                              {/* 2. Dhan Yog */}
                              <div className="flex items-center justify-center space-x-1">
                                <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-1 py-0.5 rounded shrink-0">२. धन:</span>
                                <button
                                  onClick={() => handleViewReport(ord, 'hi', 'dhan-yog-report')}
                                  className="inline-flex items-center space-x-0.5 bg-emerald-700 hover:bg-emerald-800 text-white px-2 py-1 rounded-lg font-bold text-[11px] shadow-xs cursor-pointer active:scale-95"
                                  title="Open Dhan Yog in Hindi"
                                >
                                  <Download className="w-3 h-3 text-yellow-200" />
                                  <span>हिंदी PDF</span>
                                </button>
                                <button
                                  onClick={() => handleViewReport(ord, 'en', 'dhan-yog-report')}
                                  className="inline-flex items-center space-x-0.5 bg-teal-800 hover:bg-teal-900 text-white px-2 py-1 rounded-lg font-bold text-[11px] shadow-xs cursor-pointer active:scale-95"
                                  title="Open Dhan Yog in English"
                                >
                                  <Download className="w-3 h-3 text-teal-200" />
                                  <span>Eng</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                              {/* Standard Hindi Download/View */}
                              <button
                                onClick={() => handleViewReport(ord, 'hi')}
                                className="inline-flex items-center space-x-1 bg-[#89270b] hover:bg-[#701e06] text-white px-2.5 py-1.5 rounded-xl font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
                                title="Open & Download 6-Page Vedic Report in Hindi"
                              >
                                <Download className="w-3.5 h-3.5 text-yellow-300" />
                                <span>🇮🇳 हिंदी PDF</span>
                              </button>

                              {/* Standard English Download/View */}
                              <button
                                onClick={() => handleViewReport(ord, 'en')}
                                className="inline-flex items-center space-x-1 bg-amber-800 hover:bg-amber-900 text-white px-2.5 py-1.5 rounded-xl font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
                                title="Open & Download 6-Page Vedic Report in English"
                              >
                                <Download className="w-3.5 h-3.5 text-amber-200" />
                                <span>🇬🇧 English PDF</span>
                              </button>
                            </div>
                          )}

                          {/* WhatsApp */}
                          {ord.whatsapp && ord.whatsapp !== 'Not Provided' && (
                            <button
                              onClick={() => handleSendWhatsAppReport(ord)}
                              className="inline-flex items-center space-x-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-xl font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95 mt-0.5"
                              title="Send Report(s) on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Delete */}
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={(e) => handleDelete(ord.id, e)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </main>

      {/* Supabase SQL Setup Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-gray-900">Supabase Table Schema Setup</h3>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              To persist reports directly to your Supabase PostgreSQL cloud database, run the following SQL command once in your <strong>Supabase Dashboard → SQL Editor</strong>:
            </p>

            <div className="bg-gray-900 text-amber-200 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto relative">
              <pre>{`CREATE TABLE IF NOT EXISTS public.reports (
  id TEXT PRIMARY KEY,
  client_name TEXT,
  gender TEXT,
  dob TEXT,
  tob TEXT,
  pob TEXT,
  whatsapp TEXT,
  report_id TEXT,
  report_title TEXT,
  amount NUMERIC DEFAULT 299,
  payment_status TEXT DEFAULT 'Payment Pending',
  payment_method TEXT DEFAULT '',
  payment_id TEXT DEFAULT '',
  lead_stage TEXT DEFAULT 'form_submitted',
  error_details TEXT DEFAULT '',
  report_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON public.reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON public.reports FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.reports FOR DELETE USING (true);`}</pre>
              
              <button
                onClick={copySqlSnippet}
                className="absolute top-3 right-3 px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-sans flex items-center space-x-1"
              >
                {isCopiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopiedSql ? 'Copied!' : 'Copy SQL'}</span>
              </button>
            </div>

            <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero-Loss Dual Storage:</span>
              </span>
              <p className="text-[11px]">
                Even if the Supabase table hasn't been created yet, all client orders and generated reports are safely persisted locally and will auto-sync once the table is active!
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowSqlModal(false)}
                className="px-4 py-2 bg-[#89270b] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Razorpay Key Configuration Modal */}
      {showRzpModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-blue-400 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#0C2340] text-[#3395ff] font-serif font-black flex items-center justify-center">
                  ₹
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">Razorpay Payment Gateway Settings</h3>
                  <p className="text-[11px] text-gray-500">Live or Test Key ID Integration</p>
                </div>
              </div>
              <button
                onClick={() => setShowRzpModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRzpKey} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Razorpay Key ID
                </label>
                <input
                  type="text"
                  value={rzpKeyInput}
                  onChange={(e) => setRzpKeyInput(e.target.value)}
                  placeholder="rzp_test_... or rzp_live_..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span className="text-[10px] text-gray-400 block mt-1">
                  Where to find: Razorpay Dashboard → Account & Settings → API Keys → Key ID
                </span>
              </div>

              {isRzpSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Razorpay Key saved! Live checkout is updated immediately.</span>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 space-y-1">
                <span className="font-bold block">Supported Payment Channels:</span>
                <p className="text-[11px] leading-relaxed text-blue-800">
                  Customers can pay using any UPI app (GPay, PhonePe, Paytm, CRED), Credit/Debit cards (Visa, Mastercard, RuPay), and 50+ NetBanking banks.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setRzpKeyInput('rzp_test_5173demo');
                    setRazorpayKey('rzp_test_5173demo');
                    setIsRzpSaved(true);
                    setTimeout(() => setIsRzpSaved(false), 2000);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-800 underline cursor-pointer"
                >
                  Reset to Test Demo Key
                </button>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowRzpModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold text-xs rounded-xl hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0C2340] hover:bg-[#153e70] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Save Razorpay Key
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
