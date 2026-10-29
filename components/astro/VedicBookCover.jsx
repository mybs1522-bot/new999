import React, { useState } from 'react';

// Specialized deity, yantra and motif configurations for all 22 Vedic services
const DEITY_CONFIGS = {
  'karz-mukti-remedy': {
    deity: 'Lord Shiva & Ganesha',
    deityHi: 'श्री ऋण-मुक्तेश्वर महादेव व गणेश',
    mantra: 'ॐ ऋणमुक्तेश्वराय नमः',
    theme: 'crimson', // from-[#5a0d18] via-[#89270b] to-[#3a080f]
    accent: '#F59E0B',
    bgGrad: 'from-[#4a0812] via-[#751c08] to-[#2d050a]',
    symbol: 'trishul-om',
    tagline: 'DEBT RELIEF REMEDY',
    taglineHi: 'ऋण मुक्ति महा-उपाय',
    imageFile: '/covers/karz-mukti-remedy.jpg'
  },
  'career-growth-remedy': {
    deity: 'Lord Surya & Gayatri',
    deityHi: 'भगवान सूर्य देव व श्री गणेश',
    mantra: 'ॐ सूर्याय नमः • ॐ गं गणपतये नमः',
    theme: 'saffron',
    accent: '#FDE047',
    bgGrad: 'from-[#6e2608] via-[#a23d0c] to-[#451403]',
    symbol: 'sun',
    tagline: 'PROMOTION & LEADERSHIP',
    taglineHi: 'करियर ग्रोथ एवं पदोन्नति',
    imageFile: '/covers/career-growth-remedy.jpg'
  },
  'naukri-yog-report': {
    deity: 'Lord Surya & Saraswati Maa',
    deityHi: 'भगवान सूर्य व मां सरस्वती',
    mantra: 'ॐ ऐं सरस्वत्यै नमः',
    theme: 'navy',
    accent: '#FACC15',
    bgGrad: 'from-[#0b1d3a] via-[#16325c] to-[#071326]',
    symbol: 'veena-sun',
    tagline: 'GOVT & CORPORATE SELECTION',
    taglineHi: 'सरकारी व प्राइवेट नौकरी योग',
    imageFile: null
  },
  'dhan-yog-report': {
    deity: 'Goddess Maha Lakshmi & Kuber',
    deityHi: 'महालक्ष्मी एवं कुबेर देव',
    mantra: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः',
    theme: 'emerald',
    accent: '#FDE047',
    bgGrad: 'from-[#063321] via-[#0f5438] to-[#032014]',
    symbol: 'kalash-lotus',
    tagline: 'WEALTH & REAL ESTATE GAINS',
    taglineHi: 'महालक्ष्मी धन योग',
    imageFile: '/covers/dhan-yog-report.jpg'
  },
  'business-growth-report': {
    deity: 'Vyapar Lakshmi & Ganesha',
    deityHi: 'व्यापार लक्ष्मी एवं सिद्धि विनायक',
    mantra: 'ॐ गं गणपतये नमः • ॐ महालक्ष्म्यै नमः',
    theme: 'royal-green',
    accent: '#FCD34D',
    bgGrad: 'from-[#0a2f1d] via-[#1b5e3b] to-[#051c11]',
    symbol: 'yantra-coins',
    tagline: '3X SALES & HIGH PROFITS',
    taglineHi: 'व्यापार वृद्धि एवं समृद्धि',
    imageFile: null
  },
  'vyapar-yog-report': {
    deity: 'Budha Dev & Lord Kuber',
    deityHi: 'बुध देव एवं कुबेर भंडारी',
    mantra: 'ॐ बुधाय नमः • ॐ यक्षाय कुबेराय नमः',
    theme: 'amber',
    accent: '#FEF08A',
    bgGrad: 'from-[#542a06] via-[#854d0e] to-[#361a03]',
    symbol: 'kuber-yantra',
    tagline: 'ENTREPRENEURIAL DESTINY',
    taglineHi: 'व्यापार योग एवं स्वतंत्र व्यवसाय',
    imageFile: null
  },
  'shaadi-yog-report': {
    deity: 'Lord Shiva & Mata Parvati',
    deityHi: 'गौरी शंकर एवं मां कात्यायनी',
    mantra: 'हे गौरि शंकरार्धांगि यथा त्वं शंकरप्रिया',
    theme: 'ruby',
    accent: '#FDE047',
    bgGrad: 'from-[#5c061d] via-[#881337] to-[#3b0312]',
    symbol: 'shiva-parvati',
    tagline: 'MARRIAGE TIMING & SPOUSE',
    taglineHi: 'विवाह योग एवं जीवनसाथी',
    imageFile: null
  },
  'kundli-milan-report': {
    deity: 'Shri Radha Krishna',
    deityHi: 'श्री राधा-कृष्ण युगल',
    mantra: 'ॐ क्लीं कृष्णाय गोविंदाय गोपीजनवल्लभाय नमः',
    theme: 'rose',
    accent: '#FEF08A',
    bgGrad: 'from-[#500724] via-[#831843] to-[#330416]',
    symbol: 'radha-krishna',
    tagline: '36 GUNA MATCHMAKING',
    taglineHi: 'अष्टकूट ३६ गुण मिलान',
    imageFile: null
  },
  'santan-yog-report': {
    deity: 'Lord Bal Gopal Krishna',
    deityHi: 'भगवान बाल गोपाल कृष्ण',
    mantra: 'ॐ क्लीं देवकीसुत गोविंद वासुदेव जगत्पते',
    theme: 'yellow',
    accent: '#FEF9C3',
    bgGrad: 'from-[#5e3a00] via-[#8a5b03] to-[#3b2400]',
    symbol: 'bal-gopal',
    tagline: 'CHILD BLESSING & PROGENY',
    taglineHi: 'संतान सुख एवं ग्रह शांति',
    imageFile: null
  },
  'health-rog-nivaran': {
    deity: 'Bhagwan Dhanvantari & Shiva',
    deityHi: 'भगवान धन्वंतरि व महामृत्युंजय',
    mantra: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
    theme: 'teal',
    accent: '#FDE047',
    bgGrad: 'from-[#042f2e] via-[#0f5b57] to-[#021f1e]',
    symbol: 'dhanvantari',
    tagline: 'MAHAMRITYUNJAYA HEALTH SHIELD',
    taglineHi: 'आरोग्य एवं रोग निवारण',
    imageFile: null
  },
  'shani-sade-sati': {
    deity: 'Lord Hanuman & Shani Dev',
    deityHi: 'संकटमोचन हनुमान व शनि देव',
    mantra: 'ॐ शं शनैश्चराय नमः • ॐ हनुमते नमः',
    theme: 'dark-slate',
    accent: '#FDE047',
    bgGrad: 'from-[#0f172a] via-[#1e293b] to-[#020617]',
    symbol: 'shani-hanuman',
    tagline: 'SATURN PROTECTION SHIELD',
    taglineHi: 'शनि साढ़े साती एवं ढैय्या शांति',
    imageFile: null
  },
  'kaal-sarp-dosh': {
    deity: 'Lord Shiva Trimbakeshwar',
    deityHi: 'त्र्यंबकेश्वर महादेव व शेषनाग',
    mantra: 'ॐ नमः शिवाय • ॐ नवकुल नागाय नमः',
    theme: 'smoke',
    accent: '#FDE047',
    bgGrad: 'from-[#291712] via-[#4d281e] to-[#170c09]',
    symbol: 'sheshnag-shiva',
    tagline: '12 KAAL SARP DOSHA CURE',
    taglineHi: 'कालसर्प एवं पितृ दोष निवारण',
    imageFile: null
  },
  'money-flow-remedies': {
    deity: 'Maha Lakshmi & Kuber Bhandari',
    deityHi: 'माता लक्ष्मी व कुबेर देव',
    mantra: 'ॐ महालक्ष्म्यै च विद्महे विष्णुपत्नी च धीमहि',
    theme: 'emerald-gold',
    accent: '#FDE047',
    bgGrad: 'from-[#0b3820] via-[#166534] to-[#052112]',
    symbol: 'shree-yantra',
    tagline: 'PERMANENT LIQUID CASH FLOW',
    taglineHi: 'धन प्रवाह एवं बरकत उपाय',
    imageFile: null
  },
  'home-vastu-remedies': {
    deity: 'Vastu Purusha & Panch Tatva',
    deityHi: 'वास्तु पुरुष एवं पंचतत्व देव',
    mantra: 'ॐ वास्तुपुरुषाय नमः',
    theme: 'terracotta',
    accent: '#FEF08A',
    bgGrad: 'from-[#54210b] via-[#853512] to-[#331305]',
    symbol: 'vastu-purush',
    tagline: 'ZERO DEMOLITION HOME VASTU',
    taglineHi: 'घर वास्तु दोष निवारण',
    imageFile: null
  },
  'business-vastu-remedies': {
    deity: 'Lord Kuber & Vyapar Yantra',
    deityHi: 'कुबेर देव एवं व्यापार यंत्र',
    mantra: 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये नमः',
    theme: 'indigo',
    accent: '#FDE047',
    bgGrad: 'from-[#191942] via-[#2d2f70] to-[#0c0d24]',
    symbol: 'kuber',
    tagline: '3X STORE FOOTFALL & SALES',
    taglineHi: 'दुकान व ऑफिस वास्तु उपाय',
    imageFile: null
  },
  'washroom-vastu-remedies': {
    deity: 'Rahu Shanti & Panchakshara',
    deityHi: 'राहु शांति एवं शिव रक्षा',
    mantra: 'ॐ रां राहवे नमः • ॐ नमः शिवाय',
    theme: 'deep-slate',
    accent: '#FDE047',
    bgGrad: 'from-[#1c1917] via-[#292524] to-[#0c0a09]',
    symbol: 'trishul',
    tagline: 'TOILET DRAINAGE DEFECT CURE',
    taglineHi: 'शौचालय वास्तु दोष निवारण',
    imageFile: null
  },
  'nazar-dosh-removal-remedy': {
    deity: 'Lord Kaal Bhairav & Hanuman',
    deityHi: 'काल भैरव एवं पंचमुखी हनुमान',
    mantra: 'ॐ भैरवाय नमः • ॐ हं हनुमते रुद्रात्मकाय हुं फट्',
    theme: 'crimson-black',
    accent: '#FDE047',
    bgGrad: 'from-[#3b0808] via-[#5c0d0d] to-[#1f0303]',
    symbol: 'bhairav',
    tagline: 'EVIL EYE AURA PROTECTION',
    taglineHi: 'नज़र दोष एवं नकारात्मक ऊर्जा',
    imageFile: null
  },
  'mandir-vastu-remedies': {
    deity: 'Shri Ram Darbar & Ishan Dev',
    deityHi: 'श्री राम दरबार एवं ईशान देव',
    mantra: 'श्री रामचन्द्राय नमः • ॐ नमः शिवाय',
    theme: 'divine-gold',
    accent: '#FEF08A',
    bgGrad: 'from-[#542d06] via-[#85490e] to-[#2e1702]',
    symbol: 'ram-darbar',
    tagline: 'SACRED ISHANYA SANCTUARY',
    taglineHi: 'घर के मंदिर का वास्तु',
    imageFile: null
  },
  'kitchen-vastu-remedies': {
    deity: 'Maa Annapurna & Agni Dev',
    deityHi: 'मां अन्नपूर्णा एवं अग्नि देव',
    mantra: 'ॐ अन्नपूर्णायै नमः • ॐ अग्नये नमः',
    theme: 'fire-orange',
    accent: '#FEF08A',
    bgGrad: 'from-[#5c1c04] via-[#92330a] to-[#360f01]',
    symbol: 'annapurna',
    tagline: 'AGNEYA FIRE BALANCE',
    taglineHi: 'रसोईघर आग्नेय कोण वास्तु',
    imageFile: null
  },
  'main-door-vastu': {
    deity: 'Simha Dvara Lakshmi & Ganesh',
    deityHi: 'सिंह द्वार लक्ष्मी व गणेश',
    mantra: 'ॐ श्रीं गणेशाय नमः • ॐ महालक्ष्म्यै नमः',
    theme: 'vermilion',
    accent: '#FEF08A',
    bgGrad: 'from-[#5e1205] via-[#99200b] to-[#330802]',
    symbol: 'swastik-sun',
    tagline: 'PRANA GATEWAY & LAKSHMI ENTRY',
    taglineHi: 'मुख्य द्वार वास्तु रक्षा',
    imageFile: null
  },
  'bedroom-relationship-vastu': {
    deity: 'Shri Radha Krishna & Kamadeva',
    deityHi: 'श्री राधा-कृष्ण एवं कामदेव',
    mantra: 'ॐ क्लीं कामदेवाय नमः',
    theme: 'velvet-rose',
    accent: '#FDE047',
    bgGrad: 'from-[#4c0519] via-[#831843] to-[#26020c]',
    symbol: 'radha-krishna-lotus',
    tagline: 'MARITAL PEACE & LOVE VASTU',
    taglineHi: 'शयनकक्ष वास्तु व दांपत्य सुख',
    imageFile: null
  },
  'study-room-vastu': {
    deity: 'Maa Saraswati on White Lotus',
    deityHi: 'मां सरस्वती (ज्ञानदायिनी)',
    mantra: 'सरस्वती नमस्तुभ्यं वरदे कामरूपिणि',
    theme: 'sapphire-gold',
    accent: '#FEF08A',
    bgGrad: 'from-[#0e274a] via-[#1a447e] to-[#061427]',
    symbol: 'saraswati',
    tagline: 'FOCUS & 100% MEMORY VASTU',
    taglineHi: 'स्टडी रूम एवं एकाग्रता वास्तु',
    imageFile: null
  }
};

export default function VedicBookCover({
  reportId = 'career-growth-remedy',
  title = 'Career Growth Report',
  titleHi = 'करियर ग्रोथ महा-उपाय',
  size = 'md', // 'sm' (catalog card), 'md' (standard), 'lg' (hero slider)
  className = ''
}) {
  const [imgError, setImgError] = useState(false);
  const cfg = DEITY_CONFIGS[reportId] || DEITY_CONFIGS['career-growth-remedy'];

  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-[140px] h-[190px]',
    md: 'w-[200px] h-[270px]',
    lg: 'w-full max-w-[320px] aspect-[3/4.2]'
  }[size] || 'w-[200px] h-[270px]';

  // If there's an active static image and it hasn't errored, render it with 3D book mockup frame
  if (cfg.imageFile && !imgError) {
    return (
      <div className={`relative group perspective-1000 select-none ${className}`}>
        {/* Realistic Book Outer Shadow */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-black/40 to-amber-900/30 rounded-2xl blur-md -rotate-1 group-hover:rotate-0 transition-transform" />
        
        {/* Book Container with 3D spine and edge */}
        <div className={`relative rounded-xl overflow-hidden shadow-2xl border-2 border-amber-300/80 transition-all duration-300 transform group-hover:scale-[1.02] ${sizeClasses}`}>
          <img
            src={cfg.imageFile}
            alt={`${title} - ${titleHi}`}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />

          {/* Golden Spine Shadow Overlay on Left */}
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Embossed Gloss highlight across diagonal */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60 pointer-events-none" />

          {/* Top Sacred Om Badge */}
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-amber-300 text-[10px] font-serif font-black px-2 py-0.5 rounded-full border border-amber-400/50 shadow-md">
            ॐ वैदिक ग्रन्थ
          </div>

          {/* Bottom Certified Ribbon */}
          <div className="absolute bottom-2 inset-x-2 bg-gradient-to-r from-[#89270b]/90 via-[#b44d12]/90 to-[#89270b]/90 text-yellow-200 text-[9px] font-bold text-center py-1 rounded-md border border-amber-300/60 shadow-lg tracking-wider">
            प्रमाणित वैदिक कुंडली रिपोर्ट • ₹299
          </div>
        </div>
      </div>
    );
  }

  // Pure SVG/CSS 3D Hardcover Vedic Book Cover with Holy Graphics
  return (
    <div className={`relative group perspective-1000 select-none ${className}`}>
      {/* 3D Deep Ground Shadow */}
      <div className="absolute -inset-2 bg-black/40 rounded-2xl blur-lg -rotate-1 group-hover:rotate-0 transition-transform" />

      {/* Book Hardcover Container */}
      <div className={`relative rounded-xl overflow-hidden shadow-2xl border-2 border-amber-300/90 transition-all duration-300 transform group-hover:scale-[1.02] bg-gradient-to-b ${cfg.bgGrad} flex flex-col justify-between p-3.5 sm:p-4 text-white ${sizeClasses}`}>
        
        {/* Spine 3D Crease on Left */}
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 left-3 w-[1px] bg-amber-400/40 z-20 pointer-events-none" />

        {/* Ornate Gold Foil Outer Border */}
        <div className="absolute inset-2 border-2 border-amber-400/70 rounded-lg pointer-events-none z-10" />
        <div className="absolute inset-3 border border-dashed border-amber-300/40 rounded pointer-events-none z-10" />

        {/* Four Sacred Corner Motifs */}
        <div className="absolute top-2.5 left-2.5 text-amber-300 text-xs font-serif z-20 pointer-events-none">卐</div>
        <div className="absolute top-2.5 right-2.5 text-amber-300 text-xs font-serif z-20 pointer-events-none">ॐ</div>
        <div className="absolute bottom-2.5 left-2.5 text-amber-300 text-xs font-serif z-20 pointer-events-none">ॐ</div>
        <div className="absolute bottom-2.5 right-2.5 text-amber-300 text-xs font-serif z-20 pointer-events-none">卐</div>

        {/* TOP HEADER: Religious Invocation */}
        <div className="relative z-10 text-center pt-1">
          <div className="inline-flex items-center space-x-1 text-amber-200 text-[9px] sm:text-[10px] font-serif font-bold tracking-widest uppercase">
            <span>|| श्री गणेशाय नमः ||</span>
          </div>
          <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-amber-300 to-transparent mt-0.5" />
        </div>

        {/* CENTER BODY: Sacred Deity Artwork & Titles */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center space-y-1 sm:space-y-2">
          
          {/* Sacred Yantra/Circle Radiance */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-amber-300/20 to-amber-600/30 border-2 border-amber-300/80 flex items-center justify-center p-2 shadow-inner group-hover:rotate-6 transition-transform duration-500">
            {/* Inner Glowing Wheel */}
            <div className="absolute inset-1 rounded-full border border-amber-200/50 border-dashed animate-spin-slow" />
            
            {/* Bhagwan Sacred Symbol */}
            <div className="text-2xl sm:text-3xl text-yellow-300 font-serif filter drop-shadow-[0_2px_8px_rgba(250,204,21,0.6)]">
              {cfg.symbol.includes('sun') ? '☀️' :
               cfg.symbol.includes('shiva') || cfg.symbol.includes('trishul') ? '🔱' :
               cfg.symbol.includes('lotus') || cfg.symbol.includes('kalash') ? '🪷' :
               cfg.symbol.includes('veena') ? '🪕' :
               cfg.symbol.includes('bal-gopal') ? '🦚' :
               cfg.symbol.includes('hanuman') ? '🚩' :
               cfg.symbol.includes('vastu') ? '📐' :
               cfg.symbol.includes('bhairav') ? '🛡️' : 'ॐ'}
            </div>
          </div>

          {/* Deity Name Banner */}
          <div className="text-amber-200 font-serif text-[10px] sm:text-xs font-bold tracking-wide">
            {cfg.deityHi}
          </div>

          {/* Main Title Box (Gold Embossed) */}
          <div className="bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-amber-400/60 shadow-lg w-full max-w-[260px]">
            {/* Hindi Title (Prominent) */}
            <h3 className="font-serif font-black text-sm sm:text-base text-yellow-300 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {titleHi || cfg.taglineHi}
            </h3>
            {/* English Title */}
            <h4 className="text-[9px] sm:text-[10px] font-bold text-amber-100 uppercase tracking-wider mt-0.5 opacity-90">
              {title || cfg.tagline}
            </h4>
          </div>

          {/* Sacred Mantra Snippet */}
          <p className="text-[8px] sm:text-[9px] text-amber-200/80 font-serif italic truncate max-w-[220px]">
            {cfg.mantra}
          </p>
        </div>

        {/* BOTTOM FOOTER: Trust Seal & Price Tag */}
        <div className="relative z-10 text-center pb-1 space-y-1">
          <div className="inline-block bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-gray-950 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md border border-yellow-200">
            वैदिक ज्योतिष महा-रिपोर्ट • ₹299
          </div>
          <div className="text-[8px] text-amber-200/70 block">
            Astro Jeevan • प्रामाणिक गणना
          </div>
        </div>

      </div>
    </div>
  );
}
