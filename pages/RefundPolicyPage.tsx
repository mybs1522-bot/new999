import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
    <div className="relative w-9 h-9 border-2 border-gray-900 flex items-center justify-center bg-white transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
      <span className="font-display font-black text-lg tracking-tighter relative z-10">AV</span>
    </div>
    <div className="flex flex-col text-left">
      <span className="font-display font-bold text-lg tracking-[0.2em] leading-none text-gray-900">AVADA</span>
      <div className="w-full h-[1px] bg-gray-200 my-0.5"></div>
      <span className="text-[7px] font-bold uppercase tracking-widest text-gray-400 flex justify-between w-full leading-none">
        <span>DESIGN</span>
        <span>•</span>
        <span className="text-brand-primary font-black">STUDIO</span>
      </span>
    </div>
  </div>
);

const RefundPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-orange-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo />
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-gray-600 hover:text-black font-bold text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-slate-100">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-display font-black text-slate-900">Refund Policy</h1>
              <p className="text-sm text-slate-500 mt-1">Last updated: June 2026</p>
            </div>
          </div>

          <p className="text-base leading-relaxed text-slate-600 mb-6">
            At Avada Design & Architecture, we are committed to providing premium education, high-quality course resources, and hands-on installation support. Please read our refund policy carefully before making a purchase.
          </p>

          {/* Refund Terms Grid */}
          <div className="space-y-6">
            
            {/* Term 1: 7-day technical refund */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2.5 mb-3">
                <ShieldCheck className="text-orange-500 shrink-0" size={20} />
                7-Day Technical Refund Guarantee
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                We offer a 7-day refund window from the date of purchase. However, refunds are strictly limited to <strong>technical reasons only</strong> (for example, if the course access links provided are not working, or you are unable to access the course content due to a system failure on our side).
              </p>
            </div>

            {/* Term 2: Issue Resolution */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2.5 mb-3">
                <CheckCircle className="text-orange-500 shrink-0" size={20} />
                Required Resolution Attempt
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                If you encounter any technical issues accessing the course links, you must contact our 24/7 support team. If we fail to resolve the technical issue within a reasonable timeframe, we will provide a full refund of your purchase.
              </p>
            </div>

            {/* Term 3: Software Policy (NO REFUNDS) */}
            <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100">
              <h2 className="text-lg font-bold text-red-950 flex items-center gap-2.5 mb-3">
                <AlertTriangle className="text-red-500 shrink-0" size={20} />
                No Refunds for Software Issues
              </h2>
              <p className="text-sm leading-relaxed text-red-800">
                <strong>No refunds will be provided for software issues, installation failures, or any other software-related reasons.</strong> 
                <br /><br />
                Avada Design & Architecture does not create, license, or sell any software. All software guides and download links we share are provided purely as a complimentary service for educational purposes (e.g., student or free editions). Our core offering consists of course instruction, guides, and visual assets. Consequently, we cannot issue refunds under any circumstances if you face issues installing software, as these third-party programs are outside of our control.
              </p>
            </div>

            {/* Term 4: General Policy */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2.5 mb-3">
                <FileText className="text-orange-500 shrink-0" size={20} />
                Other Terms
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                Refunds are not available for change-of-mind, lack of interest, computer incompatibility (aside from link access), or any other non-technical reason. Once the course link is accessed or shared, we reserve the right to review usage before approving any technical refund request.
              </p>
            </div>

          </div>

          {/* Contact Support */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <h3 className="text-base font-bold text-slate-900 mb-2">How to Request a Refund</h3>
            <p className="text-sm text-slate-600 mb-4">
              If your course access links are not working and our team was unable to resolve the issue, please contact us via email:
            </p>
            <a
              href="mailto:support@avada.space"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-sm"
            >
              <Mail size={16} />
              <span>support@avada.space</span>
            </a>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 text-center">
        <p className="text-xs text-slate-400">© 2026 Avada Inc. All rights reserved. Avada is an independent training provider.</p>
      </footer>
    </div>
  );
};

export default RefundPolicyPage;
