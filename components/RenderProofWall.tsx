import React, { useState } from 'react';
import { Eye, X, Sparkles, CheckCircle2, ArrowRight, DollarSign, Award, Layers } from 'lucide-react';

interface RenderProofWallProps {
  onEnroll: () => void;
}

interface RenderItem {
  id: number;
  image: string;
  title: string;
  clientRate: string;
  tool: string;
  category: 'Living' | 'Bedroom' | 'Exterior' | 'Kitchen' | 'Commercial';
  timeTaken: string;
}

export const RenderProofWall: React.FC<RenderProofWallProps> = ({ onEnroll }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<RenderItem | null>(null);

  const rendersData: RenderItem[] = [
    { id: 1, image: '/renders/RENDER-1.jpg', title: 'Ultra-Modern Minimalist Living Hall', clientRate: '₹18,500', tool: 'D5 Render + SketchUp', category: 'Living', timeTaken: '3 Hours' },
    { id: 2, image: '/renders/RENDER-2.jpg', title: 'Bespoke Master Suite with Warm Ambience', clientRate: '₹14,000', tool: '3ds Max + V-Ray', category: 'Bedroom', timeTaken: '2.5 Hours' },
    { id: 3, image: '/renders/RENDER-3.jpg', title: 'Luxury Villa Double-Height Living', clientRate: '₹22,000', tool: 'Lumion + SketchUp', category: 'Living', timeTaken: '4 Hours' },
    { id: 4, image: '/renders/RENDER-4.jpg', title: 'Scandinavian Kitchen & Dining Space', clientRate: '₹16,500', tool: 'D5 Render', category: 'Kitchen', timeTaken: '2 Hours' },
    { id: 5, image: '/renders/RENDER-5.jpg', title: 'Executive Penthouse Lounge', clientRate: '₹25,000', tool: 'V-Ray 6 Photorealism', category: 'Living', timeTaken: '3.5 Hours' },
    { id: 6, image: '/renders/RENDER-6.jpg', title: 'Contemporary Duplex Exterior Facade', clientRate: '₹35,000', tool: 'Lumion 2024 Walkthrough', category: 'Exterior', timeTaken: '5 Hours' },
    { id: 7, image: '/renders/RENDER-7.jpg', title: 'Italian Marble Luxury Bath & Spa', clientRate: '₹12,500', tool: '3ds Max + Corona', category: 'Bedroom', timeTaken: '2 Hours' },
    { id: 8, image: '/renders/RENDER-8.jpg', title: 'Urban Boutique Coffee Bar Interior', clientRate: '₹28,000', tool: 'SketchUp + D5 Render', category: 'Commercial', timeTaken: '4 Hours' },
    { id: 9, image: '/renders/RENDER-9.jpg', title: 'Grand Staircase & Entrance Foyer', clientRate: '₹19,000', tool: 'Enscape VR Realtime', category: 'Living', timeTaken: '2.5 Hours' },
    { id: 10, image: '/renders/RENDER-10.jpg', title: 'Modern Japanese Minimalist Bedroom', clientRate: '₹15,000', tool: 'D5 Render + AI', category: 'Bedroom', timeTaken: '2 Hours' },
    { id: 11, image: '/renders/RENDER-11.jpg', title: 'Commercial Creative Agency Workspace', clientRate: '₹32,000', tool: 'AutoCAD + Revit + Lumion', category: 'Commercial', timeTaken: '6 Hours' },
    { id: 12, image: '/renders/RENDER-12.jpg', title: 'Sunset Courtyard Villa Elevation', clientRate: '₹40,000', tool: 'Unreal Engine 5 Realtime', category: 'Exterior', timeTaken: '5.5 Hours' },
    { id: 13, image: '/renders/RENDER-13.jpg', title: 'High-End Modular Island Kitchen', clientRate: '₹17,000', tool: 'SketchUp + V-Ray', category: 'Kitchen', timeTaken: '3 Hours' },
    { id: 14, image: '/renders/RENDER-14.jpg', title: 'Cozy Bohemian Attic Bedroom Suite', clientRate: '₹13,500', tool: 'D5 Render Real-Time', category: 'Bedroom', timeTaken: '2 Hours' },
    { id: 15, image: '/renders/RENDER-15.jpg', title: 'Luxury Hotel Presidential Lounge', clientRate: '₹38,000', tool: '3ds Max + V-Ray Photorealism', category: 'Commercial', timeTaken: '5 Hours' },
    { id: 16, image: '/renders/RENDER-16.jpg', title: 'Modern Tropical Villa Facade at Dusk', clientRate: '₹45,000', tool: 'Lumion Cinematic 4K', category: 'Exterior', timeTaken: '4.5 Hours' },
    { id: 17, image: '/renders/RENDER-17.jpg', title: 'Open-Concept Living & Terrace Garden', clientRate: '₹24,000', tool: 'SketchUp Pro + D5', category: 'Living', timeTaken: '3 Hours' },
    { id: 18, image: '/renders/RENDER-18.jpg', title: 'Kids Playroom & Study Pods', clientRate: '₹11,000', tool: 'D5 Render 4K', category: 'Bedroom', timeTaken: '1.5 Hours' },
    { id: 19, image: '/renders/RENDER-19.jpg', title: 'Architectural Night Facade with Water Accent', clientRate: '₹42,000', tool: 'Lumion + Photoshop Post', category: 'Exterior', timeTaken: '4 Hours' },
    { id: 20, image: '/renders/RENDER-20.jpg', title: 'Fine Dining Restaurant Dining Room', clientRate: '₹36,000', tool: '3ds Max + AI Midjourney', category: 'Commercial', timeTaken: '5 Hours' },
    { id: 21, image: '/renders/RENDER-21.jpg', title: 'Master Dressing Room & Glass Wardrobes', clientRate: '₹15,500', tool: 'SketchUp + V-Ray', category: 'Bedroom', timeTaken: '2.5 Hours' },
    { id: 22, image: '/renders/RENDER-22.jpg', title: 'Industrial Chic Microbrewery & Pub', clientRate: '₹30,000', tool: 'D5 Render 4K Real-time', category: 'Commercial', timeTaken: '4.5 Hours' },
    { id: 23, image: '/renders/RENDER-23.jpg', title: 'Serene Zen Garden Courtyard', clientRate: '₹20,000', tool: 'Enscape VR Walkthrough', category: 'Exterior', timeTaken: '3 Hours' },
    { id: 24, image: '/renders/RENDER-24.jpg', title: 'Contemporary Marble & Fluted Wood Kitchen', clientRate: '₹18,000', tool: 'SketchUp + D5 Render', category: 'Kitchen', timeTaken: '2.5 Hours' },
    { id: 25, image: '/renders/RENDER-25.jpg', title: 'Award-Winning Luxury Penthouse Foyer', clientRate: '₹26,000', tool: 'V-Ray 6 + Photoshop Post', category: 'Living', timeTaken: '3.5 Hours' },
  ];

  const categories = ['All', 'Living', 'Bedroom', 'Exterior', 'Kitchen', 'Commercial'];

  const filtered = selectedCategory === 'All' 
    ? rendersData 
    : rendersData.filter(r => r.category === selectedCategory);

  return (
    <section className="py-14 md:py-20 bg-slate-950 text-white relative overflow-hidden" id="renders-gallery">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-wider mb-2.5 border border-orange-500/30">
            <Sparkles size={14} className="text-orange-400" />
            <span>Real Student Portfolio Proof (25 Masterpiece Renders)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
            Proof of Work: What Our Students Create in 30 Days
          </h2>
          <p className="text-slate-400 text-xs sm:text-base mt-2.5 max-w-2xl mx-auto">
            These aren't studio promo shots from Hollywood. These are real project renders created by everyday Indian students and interior designers using our 12-course pipeline. Tap any image to inspect details:
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat} ({cat === 'All' ? rendersData.length : rendersData.filter(r => r.category === cat).length})
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => (
            <div
              key={r.id}
              onClick={() => setActiveImage(r)}
              className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-orange-500/70 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Viewport */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Client Rate Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-black px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1">
                  <span className="text-emerald-400 font-bold">Client Paid:</span>
                  <span className="text-amber-300">{r.clientRate}</span>
                </div>

                {/* Software Badge */}
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-[10px] font-bold text-slate-300 px-2 py-0.5 rounded-lg border border-white/10">
                  {r.tool}
                </div>

                {/* Hover Eye indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-orange-500 text-white p-3 rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye size={20} />
                  </div>
                </div>
              </div>

              {/* Caption & details */}
              <div className="p-4 bg-slate-900 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-orange-400 transition-colors line-clamp-1">
                    {r.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                    <span className="text-emerald-400 font-semibold">⚡ Created in {r.timeTaken}</span>
                    <span>•</span>
                    <span className="text-slate-400">{r.category}</span>
                  </div>
                </div>

                <span className="text-xs text-orange-400 font-black group-hover:translate-x-1 transition-transform">
                  Inspect →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-orange-500/15 via-amber-500/15 to-orange-500/15 border border-orange-500/30 rounded-3xl p-6 md:p-8 text-center max-w-3xl mx-auto backdrop-blur-xl">
          <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-2">
            Imagine Handing Your Next Client 4K Renders Like These...
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-xl mx-auto leading-relaxed">
            When you present images of this caliber, clients don't argue over fees. They don't ask for discounts. They gladly pay <strong className="text-amber-300">₹25,000 to ₹50,000 advance tokens</strong> because your work looks like a luxury architecture magazine!
          </p>

          <button
            onClick={onEnroll}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-display font-black text-sm sm:text-base shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>Learn The Exact Render Workflow @ ₹999</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-[fadeIn_0.2s_ease]">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <X size={18} />
            </button>

            <div className="relative overflow-hidden flex-1 bg-black flex items-center justify-center min-h-[300px]">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="max-h-[68vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded-full border border-orange-500/30">
                  {activeImage.category} Design
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">{activeImage.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>Software: <strong className="text-slate-200">{activeImage.tool}</strong></span>
                  <span>•</span>
                  <span>Turnaround: <strong className="text-emerald-400">{activeImage.timeTaken}</strong></span>
                  <span>•</span>
                  <span>Client Fee Earned: <strong className="text-amber-300 font-bold">{activeImage.clientRate}</strong></span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveImage(null);
                  onEnroll();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:scale-105 transition-all shrink-0"
              >
                Get All 12 Courses (₹999)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
