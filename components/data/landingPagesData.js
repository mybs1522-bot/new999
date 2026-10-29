// Comprehensive landing page data for all 22 reports & remedy services
// High-converting psychological copywriting designed to agitate pain, deliver hope, and drive instant conversions at flat ₹299.

export const SLUG_TO_REPORT_ID = {
  'CareerGrowth': 'career-growth-remedy',
  'KarzMukti': 'karz-mukti-remedy',
  'BusinessGrowth': 'business-growth-report',
  'NaukriYog': 'naukri-yog-report',
  'VyaparYog': 'vyapar-yog-report',
  'DhanYog': 'dhan-yog-report',
  'ShaadiYog': 'shaadi-yog-report',
  'KundliMilan': 'kundli-milan-report',
  'SantanYog': 'santan-yog-report',
  'HealthRogNivaran': 'health-rog-nivaran',
  'ShaniSadeSati': 'shani-sade-sati',
  'KaalSarpDosh': 'kaal-sarp-dosh',
  'MoneyFlow': 'money-flow-remedies',
  'HomeVastu': 'home-vastu-remedies',
  'BusinessVastu': 'business-vastu-remedies',
  'WashroomVastu': 'washroom-vastu-remedies',
  'NazarDosh': 'nazar-dosh-removal-remedy',
  'MandirVastu': 'mandir-vastu-remedies',
  'KitchenVastu': 'kitchen-vastu-remedies',
  'MainDoorVastu': 'main-door-vastu',
  'BedroomVastu': 'bedroom-relationship-vastu',
  'StudyRoomVastu': 'study-room-vastu'
};

export const REPORT_ID_TO_SLUG = Object.fromEntries(
  Object.entries(SLUG_TO_REPORT_ID).map(([slug, id]) => [id, slug])
);

export const LANDING_PAGES_DATA = {
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. KARZ MUKTI REMEDY
  // ─────────────────────────────────────────────────────────────────────────────
  'karz-mukti-remedy': {
    slug: 'KarzMukti',
    tagline: 'Crushed Under Debt, Loans, or EMIs? Eradicate Rin-Dosha with Classical Vedic & Lal Kitab Debt Relief Remedies.',
    taglineHi: 'कर्ज, लोन और ब्याज के दलदल से परेशान हैं? ऋण दोष समाप्त कर कर्ज मुक्ति के अचूक वैदिक व लाल किताब उपाय जानें।',
    badge: 'Most Popular',
    labels: [
      { text: '6th House Rin Bhava Scan', color: 'red' },
      { text: 'Mangal & Shiva Stotra', color: 'orange' },
      { text: '100% Confidential', color: 'blue' },
      { text: 'Delivered on WhatsApp', color: 'seagreen' }
    ],
    coverImage: '/covers/karz-mukti-remedy.jpg',
    images: [
      '/covers/karz-mukti-remedy.jpg',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-red-900 m-0">🔴 Are You Caught in an Endless Debt Trap?</h3>
          <p class="text-xs text-red-800 mt-1 leading-relaxed">
            Taking new loans just to repay old credit card bills and EMIs? Despite earning well, does your entire salary vanish into interest? <strong>This is NOT just financial stress — it is an active Rin-Dosha in your 6th house.</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Personalized Report:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Exact Root Cause Identification:</strong> Pinpoints whether Mars, Saturn, or Rahu is causing continuous money leakage.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>The Golden Tuesday Repayment Rule:</strong> The exact astrological hour to pay your loan installments so the debt never recurs.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Lord Rin-Mukteshwar Mahadev Stotra:</strong> Consecrated mantra routine tailored to your planetary degrees to dissolve bad debts.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Zero-Cost Lal Kitab Totkas:</strong> Simple 5-minute household remedies (no expensive gemstones or pujas needed).</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>12-Month Debt Clearance Timeline:</strong> Exact month-by-month prediction of when financial relief and windfall gains will occur.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          💰 <strong>Why Pay Pandits ₹2100 - ₹5100?</strong> Get this certified 6-page comprehensive Kundli remedy report delivered directly to your WhatsApp in 10 seconds for just <span class="text-red-700 font-black text-sm">₹299</span>!
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-red-900 m-0">🔴 क्या आप भी कर्ज और ब्याज के भारी दलदल में फंसे हैं?</h3>
          <p class="text-xs text-red-800 mt-1 leading-relaxed">
            पुराना कर्ज चुकाने के लिए नया लोन लेना पड़ रहा है? दिन-रात मेहनत के बाद भी पैसा हाथ में नहीं टिकता और बैंक की किस्तों में चला जाता है? <strong>यह केवल पैसों की कमी नहीं है, बल्कि आपकी कुंडली का 'ऋण दोष' है जो आपकी बरकत को बांधे हुए है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 की इस गुप्त रिपोर्ट में आपको क्या मिलेगा:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>कर्ज का असली ग्रह कारक:</strong> छठे भाव के मंगल, शनि या राहु का सटीक विश्लेषण कि कौन सा ग्रह आपका धन नष्ट कर रहा है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>मंगलवार किस्त भुगतान का अचूक नियम:</strong> वह शुभ नक्षत्र व समय जिसमें किस्त देने पर दोबारा कभी जिंदगी में कर्ज नहीं लेना पड़ता।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सिद्ध ऋण मुक्तेश्वर महादेव स्तोत्र:</strong> आपकी कुंडली अनुसार सिद्ध किया गया मंत्र, जिसके पाठ से अचानक धन प्राप्ति के मार्ग खुलते हैं।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>लाल किताब के 5 मिनट के घरेलू उपाय:</strong> बिना किसी महंगे रत्न या पूजा-पाठ के, घर पर ही किए जाने वाले अचूक टोटके।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>अगले 12 महीनों का मुक्ति टाइमलाइन:</strong> सटीक भविष्यवाणी कि आपका कर्ज किस महीने में पूरी तरह उतर जाएगा।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          💰 <strong>पंडित जी को ₹2100-₹5100 क्यों देना?</strong> जब वही वैदिक गणित और 6 पेजों की संपूर्ण व्यक्तिगत रिपोर्ट आपको तुरंत व्हाट्सएप पर मिल रही है मात्र <span class="text-red-700 font-black text-sm">₹299</span> में!
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Manish Agarwal', city: 'Jaipur', rating: 5, date: 'Yesterday', text: 'I had 3 ongoing bank loans and credit card debts for 4 years. The Tuesday repayment guideline and Hanuman Angarak Stotra recommendation opened up unexpected property sale proceeds that cleared all debts!', textHi: 'पिछले 4 सालों से 3 पर्सनल लोन और क्रेडिट कार्ड का भारी कर्ज था। मंगलवार को पहली किस्त चुकाने और ऋण मोचन स्तोत्र के पाठ से हमारी पुरानी संपत्ति बिकी और सारा कर्ज उतर गया!' },
      { id: 2, name: 'Suman Lata Sharma', city: 'Delhi', rating: 5, date: '2 days ago', text: 'Very precise. The remedies are so simple to follow at home. My husband and I are finally breathing peacefully.', textHi: 'बहुत ही सटीक और सरल उपाय हैं। घर में किसी भी तरह की अशांति के बिना हमने उपाय किए और अब कर्ज की भारी चिंताएं खत्म हो गई हैं।' },
      { id: 3, name: 'Gaurav Patel', city: 'Ahmedabad', rating: 5, date: '3 days ago', text: 'Only ₹299 but gave deeper clarity than an astrologer who charged me ₹5100 earlier. Great WhatsApp delivery.', textHi: 'मात्र ₹299 में इतनी गहरी जानकारी मिली। पहले एक ज्योतिषी को ₹5100 दिए थे लेकिन कोई हल नहीं निकला था। यह रिपोर्ट वास्तव में चमत्कारी है।' }
    ],
    faqs: [
      { q: 'How quickly do Karz Mukti remedies show results?', a: 'Most users experience a decisive unblocking of cash flow and easing of loan pressure within 21 to 45 days of consistently practicing the prescribed remedies.' },
      { q: 'Are these remedies safe to perform?', a: '100% safe. They are sattvic Vedic and Lal Kitab remedies involving mantras, charity, and water offerings, with no negative or harmful rituals.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. CAREER GROWTH REMEDY
  // ─────────────────────────────────────────────────────────────────────────────
  'career-growth-remedy': {
    slug: 'CareerGrowth',
    tagline: 'Struggling with Career Stagnation, Appraisal Delays, or Workplace Politics? Unlock Your Promotion Yog & Remedies.',
    taglineHi: 'करियर में रुकावट, प्रमोशन में देरी या ऑफिस पॉलिटिक्स से परेशान हैं? अपनी कुंडली अनुसार पदोन्नति योग और अचूक उपाय जानें।',
    badge: 'Trending Service',
    labels: [
      { text: '10th House Karma Analysis', color: 'orange' },
      { text: 'Surya & Shani Balance', color: 'green' },
      { text: '100% Confidential', color: 'blue' },
      { text: 'Delivered on WhatsApp', color: 'seagreen' }
    ],
    coverImage: '/covers/career-growth-remedy.jpg',
    images: [
      '/covers/career-growth-remedy.jpg',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-amber-900 m-0">🔥 Are Juniors Getting Promoted While You Stay Stagnant?</h3>
          <p class="text-xs text-amber-800 mt-1 leading-relaxed">
            Working 12 hours a day but getting zero recognition in appraisals? Facing hidden jealousy, backstabbing colleagues, or a hostile boss? <strong>In Vedic astrology, your 10th House (Karma Bhava) and Lord Surya are blocked by malefic transits!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Promotion Blueprint:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>10th House Deep Diagnosis:</strong> Reveals why your promotions get delayed at the last moment despite top ratings.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Surya & Shani Power Activation:</strong> Secret Vedic ritual to turn Lord Sun and Saturn from obstacles into career accelerators.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Office Politics Armor:</strong> Powerful protective kavach to deflect evil eye and jealousy from competitive coworkers.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Golden Job-Switch Windows:</strong> Exact high-probability dates over the next 24 months for lucrative salary hikes (30% to 70%).</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Desk Vastu & Color Science:</strong> Auspicious seating directions and dress colors to dominate crucial interviews and client pitches.</span>
          </li>
        </ul>

        <div class="bg-emerald-50 border border-emerald-300 p-3.5 rounded-xl text-xs text-emerald-950 font-medium">
          🎯 <strong>Don't Let Another Year Pass Without a Hike!</strong> Invest just <span class="text-red-700 font-black text-sm">₹299</span> today and unlock your divine professional destiny within 48 hours.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-amber-900 m-0">🔥 क्या आप दिन-रात मेहनत करते हैं और क्रेडिट कोई और ले जाता है?</h3>
          <p class="text-xs text-amber-800 mt-1 leading-relaxed">
            अप्रेजल में कम रेटिंग, बॉस की नाराजगी, सहकर्मियों की गंदी राजनीति और बार-बार रुकता प्रमोशन? <strong>यह आपकी काबिलियत की कमी नहीं है, बल्कि कुंडली में दशम भाव (कर्म भाव) और सूर्य ग्रह की कमजोरी का नतीजा है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में आपको मिलने वाले अचूक समाधान:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>दशम भाव की सूक्ष्म गणना:</strong> जानें कि आपके प्रमोशन और सैलरी हाइक में कौन सा ग्रह सबसे बड़ी अड़चन डाल रहा है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सूर्य और शनि देव का जाग्रत उपाय:</strong> कार्यक्षेत्र में उच्च पद, मान-सम्मान और अधिकारियों को अनुकूल बनाने की सिद्ध विधि।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>ऑफिस पॉलिटिक्स से अभेद्य सुरक्षा:</strong> पीठ पीछे षड्यंत्र रचने वाले सहयोगियों और गुप्त शत्रुओं को शांत करने का अचूक रक्षा चक्र।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>आगामी 24 महीनों के सुनहरे अवसर:</strong> वह सटीक महीना और तारीख जिसमें मनचाहा ट्रांसफर या 40%+ सैलरी हाइक का योग है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>डेस्क वास्तु व लकी रंग:</strong> ऑफिस में बैठने की शुभ दिशा और महत्वपूर्ण मीटिंग्स के लिए भाग्यशाली वस्त्र नियम।</span>
          </li>
        </ul>

        <div class="bg-emerald-50 border border-emerald-300 p-3.5 rounded-xl text-xs text-emerald-950 font-medium">
          🎯 <strong>एक और साल बिना प्रमोशन के मत जाने दीजिए!</strong> आज ही मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी व्यक्तिगत करियर रिपोर्ट प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Ananya Deshmukh', city: 'Pune', rating: 5, date: 'Yesterday', text: 'I was waiting for my senior managerial promotion for 2.5 years. The Aditya Hriday routine and workplace Vastu tip mentioned in this report brought a direct offer within 45 days. Truly grateful!', textHi: 'पिछले ढाई साल से प्रमोशन रुका हुआ था। रिपोर्ट में दिए गए आदित्य हृदय स्तोत्र और डेस्क वास्तु उपाय से मुझे 45 दिनों में सीनियर मैनेजर का प्रमोशन लेटर मिल गया!' },
      { id: 2, name: 'Rohit Khandelwal', city: 'Gurugram', rating: 5, date: '4 days ago', text: 'Stuck in corporate politics for 18 months with no salary increment. Followed the Saturday shadow donation and got a 42% hike switch offer!', textHi: 'कॉरपोरेट ऑफिस की राजनीति से परेशान था। रिपोर्ट अनुसार शनिवार को छाया दान शुरू किया और अगले महीने 42% हाइक के साथ नई कंपनी का ऑफर मिल गया।' }
    ],
    faqs: [
      { q: 'Can I do the remedies while working in corporate?', a: 'Yes! All remedies are practical, ethical Vedic rituals taking less than 5 minutes daily without extra cost.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. NAUKRI YOG REPORT
  // ─────────────────────────────────────────────────────────────────────────────
  'naukri-yog-report': {
    slug: 'NaukriYog',
    tagline: 'When Will You Get a Job? Discover Your Exact Naukri Yog Window, Govt vs Private Fit, and Exam Success Remedies.',
    taglineHi: 'सरकारी या प्राइवेट नौकरी कब लगेगी? जानिए आपकी कुंडली अनुसार नौकरी प्राप्ति का सबसे प्रबल समय और अचूक उपाय।',
    badge: 'Best Seller',
    labels: [
      { text: 'Govt vs Private Analysis', color: 'green' },
      { text: '12-Month Hiring Timeline', color: 'orange' },
      { text: 'Interview Success Mantra', color: 'blue' },
      { text: 'Delivered on WhatsApp', color: 'seagreen' }
    ],
    coverImage: '/covers/naukri-yog-report.jpg',
    images: [
      '/covers/naukri-yog-report.jpg',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-blue-900 m-0">💼 Tired of Endless Job Applications and Rejections?</h3>
          <p class="text-xs text-blue-800 mt-1 leading-relaxed">
            Giving interviews repeatedly only to hear "we will get back to you"? Preparing for government exams for years with no selection? <strong>Your 6th house (competitive success) and 10th house (employment) need planetary alignment!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Job Attraction Blueprint:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Govt vs. Corporate Verdict:</strong> Clear astrological guidance on whether you are built for Sarkari Naukri (UPSC/SSC/Banking) or high-paying private MNCs.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Exact Offer Letter Timing:</strong> A 12-month calendar marking high-probability hiring windows when planets actively favor your selection.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Interview Cracking Ritual:</strong> Secret 2-minute morning mantra and North-East study desk alignment to enter interviews with magnetic confidence.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Exam Obstacle Destroyer:</strong> Remedies to eliminate memory fog, exam anxiety, and 0.5-mark misses in merit lists.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🌟 <strong>Stop Guessing Your Future:</strong> One timely decision can save 3 to 5 years of exam struggle. Download your report now for flat <span class="text-red-700 font-black text-sm">₹299</span>!
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-blue-900 m-0">💼 क्या बार-बार इंटरव्यू देकर और फॉर्म भरकर थक चुके हैं?</h3>
          <p class="text-xs text-blue-800 mt-1 leading-relaxed">
            सालों से प्रतियोगी परीक्षा की तैयारी कर रहे हैं लेकिन 1 या 2 नंबर से मेरिट लिस्ट में नाम छूट जाता है? <strong>यह आपकी मेहनत में नहीं, बल्कि आपकी कुंडली के छठे (प्रतियोगिता) और दसवें (नौकरी) भाव के ग्रहों का अवरोध है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में आपको क्या-क्या मिलेगा:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सरकारी बनाम प्राइवेट नौकरी का सच:</strong> स्पष्ट फैसला कि क्या आपकी कुंडली में सरकारी नौकरी का योग है या कॉर्पोरेट में उच्च पद का।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>नौकरी मिलने का सटीक समय-चक्र:</strong> अगले 12 महीनों का स्पष्ट चार्ट कि किस माह में ऑफर लेटर या जॉइनिंग का सबसे प्रबल योग है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>इंटरव्यू फतह करने का गुप्त उपाय:</strong> इंटरव्यू में जाने से पहले का 2 मिनट का मंत्र विधान जो इंटरव्यूअर को आपके पक्ष में कर देता है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>परीक्षा में एकाग्रता और सफलता उपाय:</strong> परीक्षा हॉल में डर, भूलने की बीमारी और नेगेटिव मार्किंग से बचने के अचूक वैदिक सूत्र।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🌟 <strong>सालों की मेहनत को व्यर्थ मत जाने दीजिए!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी कुंडली की नौकरी रिपोर्ट तुरंत प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Deepak Verma', city: 'Lucknow', rating: 5, date: 'Yesterday', text: 'Cleared my banking PO exam after following the study room direction and Sunday Arghya remedy given in the report!', textHi: 'बैंक पीओ परीक्षा में 2 बार असफल होने के बाद रिपोर्ट के अनुसार उपाय किए और मेरा चयन हो गया!' }
    ],
    faqs: [
      { q: 'Does this tell me if I will get a government job?', a: 'Yes, it evaluates the exact planetary strength of Sun, Mars, and Jupiter in your 10th and 6th houses.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. DHAN YOG REPORT
  // ─────────────────────────────────────────────────────────────────────────────
  'dhan-yog-report': {
    slug: 'DhanYog',
    tagline: 'Unlock Hidden Wealth, Real Estate Gains, and Permanent Prosperity with Your Horoscope\'s Maha Dhan Yog.',
    taglineHi: 'अपनी कुंडली में छुपे महालक्ष्मी धन योग, पैतृक संपत्ति और स्थायी समृद्धि के योग व उपाय जानें।',
    badge: 'High Impact',
    labels: [
      { text: 'Lakshmi & Kuber Alignment', color: 'green' },
      { text: '2nd & 11th House Gains', color: 'orange' },
      { text: 'Real Estate & Gold Yog', color: 'blue' }
    ],
    coverImage: '/covers/dhan-yog-report.jpg',
    images: [
      '/covers/dhan-yog-report.jpg',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-emerald-900 m-0">💰 Does Money Slip Through Your Fingers Like Water?</h3>
          <p class="text-xs text-emerald-800 mt-1 leading-relaxed">
            You earn well, but emergency medical expenses, unexpected repairs, or bad investments wipe out your bank balance every month? <strong>Your 2nd house (Dhana Bhava) and 11th house (Labha Bhava) have inactive wealth yogas!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Will Discover in This ₹299 Wealth Dossier:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Your Sleeping Wealth Combinations:</strong> Pinpoints whether Gajakesari Yog, Lakshmi Yog, or Chandra-Mangal Yog is dormant in your chart.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Windfall & Property Influx Dates:</strong> Identifies exact dates for sudden financial gains, ancestral property settlement, and lucky real estate purchases.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Kanakadhara & Shree Suktam Activation:</strong> Exact Sanskrit recitations aligned with your ascendant to attract 24x7 liquid cash flow.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>The Kubera Locker Placement Secret:</strong> The precise compass degree to keep your cash locker and gold so wealth multiplies automatically.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          💎 <strong>Permanent Prosperity Awaits:</strong> Unlock your birthright wealth codes for just <span class="text-red-700 font-black text-sm">₹299</span> today.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-emerald-900 m-0">💰 कमाते बहुत हैं, पर पैसा हाथ में टिकता क्यों नहीं?</h3>
          <p class="text-xs text-emerald-800 mt-1 leading-relaxed">
            महीने के अंत में जेब खाली हो जाती है? कोई न कोई अनपेक्षित खर्चा, बीमारी या उधारी आपके जमा पैसों को खींच लेती है? <strong>यह धन भाव (द्वितीय) और लाभ भाव (एकादश) में बैठे सोए हुए धन योगों के कारण होता है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में जानिए अपने छुपे हुए धन के रहस्य:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सोए हुए राजयोगों की पहचान:</strong> जानें क्या आपकी कुंडली में गजकेसरी योग, लक्ष्मी योग या चंद्र-मंगल धन योग निष्क्रिय पड़ा है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>आकस्मिक धन व संपत्ति लाभ का समय:</strong> शेयर मार्केट, पैतृक संपत्ति, लॉटरी या रियल एस्टेट से भारी धन लाभ के शुभ योगों की तारीखें।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सिद्ध कनकधारा व श्री सूक्त विधान:</strong> आपके लग्न और राशि अनुसार माता लक्ष्मी को घर में स्थायी रूप से बांधने की गुप्त विधि।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>तिजोरी की कुबेर दिशा:</strong> घर या दुकान की तिजोरी को किस सटीक दिशा में रखें जिससे उसमें रखा धन 3 गुना तेजी से बढ़े।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          💎 <strong>अपनी आने वाली पीढ़ियों के लिए धन का द्वार खोलें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी धन योग रिपोर्ट अभी डाउनलोड करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Rajesh Kulkarni', city: 'Mumbai', rating: 5, date: 'Yesterday', text: 'The wealth activation steps and Kubera locker direction completely reversed our cash shortage. Highly recommended!', textHi: 'तिजोरी की कुबेर दिशा और श्री सूक्त का नियम अपनाने से हमारे घर में अटका हुआ पैसा वापस आ गया!' }
    ],
    faqs: [
      { q: 'How does this report help me attract money?', a: 'It unblocks your 2nd and 11th houses through personalized planetary alignments and Sri Suktam remedies.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. BUSINESS GROWTH REPORT
  // ─────────────────────────────────────────────────────────────────────────────
  'business-growth-report': {
    slug: 'BusinessGrowth',
    tagline: 'Boost Customer Footfall, Profitability & Strategic Trade Expansion with Your Vedic Vyapar Yogas.',
    taglineHi: 'व्यापार में 3x मुनाफा, नए ग्राहक और व्यापारिक विस्तार हेतु कुंडली अनुसार अचूक ज्योतिषीय समाधान।',
    badge: 'High Returns',
    labels: [
      { text: '7th & 10th Trade Alignment', color: 'green' },
      { text: 'Vyapar Vridhi Yantra', color: 'orange' },
      { text: 'Cash Drawer Vastu', color: 'blue' }
    ],
    coverImage: '/covers/business-growth-report.jpg',
    images: [
      '/covers/business-growth-report.jpg',
      'https://images.unsplash.com/photo-1444653614773-995cb1ef902c?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-purple-900 m-0">📈 Has Your Business Growth Hit a Stagnant Wall?</h3>
          <p class="text-xs text-purple-800 mt-1 leading-relaxed">
            Customers walk in but don't buy? Payments get stuck with clients for months? Dead inventory piling up? <strong>Your 7th house (public trade) and Mercury (Budha) need energetic awakening!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Business Multiplier:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Customer Attraction Astrological Magnetism:</strong> Turn Venus and Mercury into client magnets so footfall and online leads surge by 3x.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Recovering Stuck Market Payments:</strong> Specific Wednesday ritual to release blocked merchant dues and recover stubborn receivables.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Owner Seating & Cash Drawer Direction:</strong> Place your seat and billing counter in the exact degree to seal profit leaks.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Partner & Employee Alignment:</strong> Know which employee or partner zodiac sign brings luck vs who causes silent embezzlement.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🚀 <strong>Turn Your Shop or Office Into a Profit Machine:</strong> Download your ₹299 Business Growth Report now.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-purple-900 m-0">📈 दुकान या ऑफिस में ग्राहक आते हैं पर बिना खरीदे लौट जाते हैं?</h3>
          <p class="text-xs text-purple-800 mt-1 leading-relaxed">
            बाजार में माल उधार फंस गया है और वसूली नहीं हो रही? भारी स्टॉक जमा है और सेल नहीं निकल रही? <strong>यह व्यापार भाव (सप्तम) और व्यापार के कारक बुध व शुक्र ग्रह के पीड़ित होने का लक्षण है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में व्यापार बढ़ाने के अचूक सूत्र:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>ग्राहकों को आकर्षित करने का चुंबक:</strong> बुध और शुक्र को बलवान कर अपनी दुकान/शोरूम में 3 गुना अधिक ग्राहक बढ़ाने का उपाय।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>फंसा हुआ बाजार का पैसा निकालने की विधि:</strong> बुधवार का वह चमत्कारी टोटका जिससे पुराना और अटका हुआ पेमेंट खुद चलकर वापस आता है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>गल्ले और मालिक के बैठने की सही दिशा:</strong> गल्ले में बरकत के लिए कुबेर कोण और ईशान कोण की सटीक वास्तु स्थिति।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>पार्टनर और कर्मचारियों की कुंडली जांच:</strong> कौन सा साझेदार आपके व्यापार को ऊंचाइयों पर ले जाएगा और कौन नुकसान कराएगा।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🚀 <strong>अपने व्यापार को एक नई उड़ान दीजिए!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी व्यापार वृद्धि रिपोर्ट आज ही पाएं।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Sanjay Jain', city: 'Surat', rating: 5, date: 'Yesterday', text: 'Our textile exports doubled after aligning our accounts desk and installing the Vyapar Vridhi remedies.', textHi: 'कपड़ा व्यापार में मंदी चल रही थी। रिपोर्ट अनुसार उपाय किए और बिक्री में भारी उछाल आया।' }
    ],
    faqs: [
      { q: 'Is this applicable to both retail shops and online businesses?', a: 'Yes! It provides personalized remedies based on your birth chart and trade industry sector.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. VYAPAR YOG REPORT
  // ─────────────────────────────────────────────────────────────────────────────
  'vyapar-yog-report': {
    slug: 'VyaparYog',
    tagline: 'Job or Business? Discover If Entrepreneurship is In Your Stars and the Most Profitable Sectors for You.',
    taglineHi: 'नौकरी करें या व्यापार? जानिए आपकी कुंडली के अनुसार कौन सा बिजनेस आपको सबसे ज्यादा अमीर बनाएगा।',
    badge: 'Entrepreneur Special',
    labels: [
      { text: 'Budha & Shukra Synergy', color: 'orange' },
      { text: 'Partnership Suitability', color: 'green' }
    ],
    coverImage: '/covers/vyapar-yog-report.jpg',
    images: [
      '/covers/vyapar-yog-report.jpg',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-orange-900 m-0">🤔 Thinking of Quitting Your Job to Start a Business?</h3>
          <p class="text-xs text-orange-800 mt-1 leading-relaxed">
            Starting a business without checking your 7th and 10th house planetary compatibility is the #1 reason 85% of startups fail within 18 months! <strong>Get certified astrological validation before putting your hard-earned savings at risk.</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Startup Verdict:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Clear Job vs. Business Verdict:</strong> Are you born to be a CEO or a high-ranking corporate executive?</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Most Lucrative Industry Sectors:</strong> Matches your dominant planets with profitable sectors (Real estate, IT, Food, Retail, Consulting).</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Partnership vs. Solo Warning:</strong> Prevents devastating partnership betrayals by evaluating your 7th house harmony.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          💡 <strong>Save Lakhs in Potential Losses:</strong> Validate your business ideas with authentic Vedic calculations for just <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-orange-900 m-0">🤔 नौकरी छोड़कर बिजनेस शुरू करने की सोच रहे हैं?</h3>
          <p class="text-xs text-orange-800 mt-1 leading-relaxed">
            बिना कुंडली की जांच किए अपनी जमा पूंजी किसी बिजनेस में लगाना सबसे बड़ा जोखिम है! <strong>80% नए व्यापार इसलिए बंद होते हैं क्योंकि वे अपने भाग्यशाली ग्रहों के विपरीत क्षेत्र में हाथ डालते हैं।</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में जानें अपने व्यापार का भविष्य:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>नौकरी या व्यापार का स्पष्ट फैसला:</strong> क्या आप स्वतंत्र व्यवसाय में करोड़ों कमाएंगे या नौकरी में ही सुरक्षित रहेंगे?</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सर्वाधिक मुनाफे वाले बिजनेस सेक्टर:</strong> आपकी कुंडली अनुसार कौन सा काम (रियल एस्टेट, कपड़ा, आईटी, खान-पान या फाइनेंस) आपको सबसे अमीर बनाएगा।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>पार्टनरशिप में काम करें या अकेले?</strong> साझेदारों से धोखा मिलने का योग है या लाभ का, इसका स्पष्ट मार्गदर्शन।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          💡 <strong>अपनी मेहनत की कमाई डूबने से बचाएं!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी व्यापार योग रिपोर्ट प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Amitabh Sen', city: 'Kolkata', rating: 5, date: 'Yesterday', text: 'I was hesitant about quitting my 12-year corporate job. The report indicated high Mercury transit and my firm took off beautifully.', textHi: 'रिपोर्ट में बुध की स्थिति देखकर स्वतंत्र व्यवसाय शुरू किया और आज बहुत सफल हूँ।' }
    ],
    faqs: [
      { q: 'Does this suggest the best industry sector for me?', a: 'Yes, based on your dominant ruling planet.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. SHAADI YOG REPORT
  // ─────────────────────────────────────────────────────────────────────────────
  'shaadi-yog-report': {
    slug: 'ShaadiYog',
    tagline: 'When Will You Get Married? Discover Your Auspicious Wedding Muhurat, Spouse Profile, and Delay Remedies.',
    taglineHi: 'विवाह कब होगा? भावी जीवनसाथी का स्वभाव, विवाह में देरी के कारण और मांगलिक दोष के अचूक उपाय।',
    badge: 'High Demand',
    labels: [
      { text: '7th House Vivah Bhava', color: 'red' },
      { text: 'Manglik Dosha Check', color: 'orange' },
      { text: 'Spouse Profile Prediction', color: 'green' }
    ],
    coverImage: '/covers/shaadi-yog-report.jpg',
    images: [
      '/covers/shaadi-yog-report.jpg',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-rose-900 m-0">💍 Are Marriage Proposals Breaking at the Last Minute?</h3>
          <p class="text-xs text-rose-800 mt-1 leading-relaxed">
            Age passing by, family getting anxious, relatives asking awkward questions? Good alliances come but talk breaks off unexpectedly? <strong>This is caused by 7th house afflictions, Manglik Dosha, or Saturn's delaying aspect!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Marriage Dossier:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Exact Wedding Timeline:</strong> Pinpoints the precise months over the next 18 months when your marriage yog is at 100% intensity.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Future Spouse Profile:</strong> Predicts their personality, profession, physical traits, financial background, and geographical direction.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Manglik Dosha Pacification:</strong> Clear verdict on whether you are actually Manglik or if the dosha is cancelled, plus soothing remedies.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Katyayani Vrata & Fast-Track Alliance Rituals:</strong> Powerful Vedic solutions to remove obstacles and finalize your dream partner.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          ❤️ <strong>Bring Auspicious Shehnai to Your Home:</strong> Download your comprehensive Shaadi Yog report now for flat <span class="text-red-700 font-black text-sm">₹299</span>!
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-rose-900 m-0">💍 रिश्ते आते हैं पर अंतिम समय में बात पक्की होने से पहले टूट जाती है?</h3>
          <p class="text-xs text-rose-800 mt-1 leading-relaxed">
            उम्र बीत रही है, माता-पिता चिंतित हैं और समाज के सवाल परेशान कर रहे हैं? <strong>यह सप्तम भाव (विवाह भाव) में बैठे क्रूर ग्रहों, मांगलिक दोष या गुरु-शुक्र के कमजोर होने का स्पष्ट संकेत है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में विवाह की संपूर्ण भविष्यवाणी:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>विवाह का सटीक समय-चक्र:</strong> अगले 18 महीनों में वह शुभ मुहूर्त व महीना जब शहनाई बजने का 100% प्रबल योग है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>भावी जीवनसाथी की पहचान:</strong> उनका स्वभाव, पेशा, आर्थिक स्थिति, रंग-रूप और किस दिशा से रिश्ता आएगा।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>मांगलिक दोष की सच्चाई व उपाय:</strong> क्या आप वास्तव में मांगलिक हैं या दोष निरस्त हो चुका है? सरल घरेलू शमन उपाय।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>शीघ्र विवाह हेतु मां कात्यायनी उपाय:</strong> विवाह में आ रही रुकावटों को जड़ से खत्म करने का अचूक वैदिक विधान।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          ❤️ <strong>शीघ्र विवाह के मंगल योग को जाग्रत करें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी शादी योग रिपोर्ट तुरंत व्हाट्सएप पर पाएं।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Pooja Verma', city: 'Jaipur', rating: 5, date: 'Yesterday', text: 'My marriage was delayed for 3 years. The Katyayani remedy and timing mentioned in this report helped us finalize a groom within 60 days!', textHi: '3 साल से शादी में बाधा आ रही थी। रिपोर्ट के कात्यायनी उपाय से 60 दिनों में बहुत अच्छा रिश्ता पक्का हो गया!' }
    ],
    faqs: [
      { q: 'Can this tell me about my partner\'s profession?', a: 'Yes, the 7th house and navamsha chart indicate spouse career and personality traits.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. KUNDLI MILAN REPORT
  // ─────────────────────────────────────────────────────────────────────────────
  'kundli-milan-report': {
    slug: 'KundliMilan',
    tagline: 'Authentic 36-Guna Matchmaking, Nadi & Bhakoot Dosha Scrutiny, and Lifelong Marital Harmony Remedies.',
    taglineHi: 'अष्टकूट ३६ गुण मिलान, नाड़ी व भकूट दोष जांच एवं दांपत्य जीवन की सुख-शांति के अचूक उपाय।',
    badge: 'Essential',
    labels: [
      { text: '36 Guna Ashtakoot Matching', color: 'orange' },
      { text: 'Nadi & Bhakoot Dosha Check', color: 'red' },
      { text: 'Longevity & Harmony', color: 'green' }
    ],
    coverImage: '/covers/kundli-milan-report.jpg',
    images: [
      '/covers/kundli-milan-report.jpg',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-red-900 m-0">⚠️ Don't Risk a Lifetime of Regret on Casual Matchmaking!</h3>
          <p class="text-xs text-red-800 mt-1 leading-relaxed">
            Free online apps only match superficial points and miss hidden Nadi Dosha, Bhakoot Dosha, or mental incompatibility that lead to divorce or chronic illness! <strong>Get certified Parashara Ashtakoot 36-Guna matching before taking the 7 sacred vows.</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What This ₹299 Matchmaking Report Verifies:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Full 36 Guna Scorecard:</strong> Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi with point breakdown.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Nadi & Bhakoot Dosha Exceptions:</strong> Validates if doshas are cancelled by astrological exceptions (Rashi lord friendship).</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Longevity & Financial Compatibility:</strong> Evaluates whether the couple will prosper together or face financial hardship.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Dosha Neutralization Remedies:</strong> Consecrated Vedic solutions if gunas are between 18-24 so the marriage stays safe.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          💍 <strong>Protect Your Child's Future:</strong> Offline pandits charge ₹1500+ for basic matching. Get the full 6-page certified dossier for just <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-red-900 m-0">⚠️ बिना प्रामाणिक मिलान के शादी का फैसला जिंदगी भर का पछतावा बन सकता है!</h3>
          <p class="text-xs text-red-800 mt-1 leading-relaxed">
            मुफ्त ऐप्स केवल ऊपर-ऊपर के गुण जोड़ते हैं और नाड़ी दोष, भकूट दोष या मानसिक क्रूरता के योगों को नजरअंदाज कर देते हैं जिससे बाद में तलाक या अशांति होती है! <strong>सात फेरे लेने से पहले अष्टकूट ३६ गुणों की सूक्ष्म जांच अवश्य कराएं।</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में संपूर्ण मिलान रिपोर्ट:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>संपूर्ण ३६ गुण मिलान स्कोरकार्ड:</strong> वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट और नाड़ी का विस्तृत अंक तालिका।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>नाड़ी व भकूट दोष का सूक्ष्म विचार:</strong> क्या दोष वास्तव में प्रभावी है या शास्त्रोक्त नियमों से इसका परिहार हो चुका है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>दीर्घायु, संतान सुख व आर्थिक समृद्धि:</strong> क्या शादी के बाद लड़का-लड़की दोनों का भाग्य चमकेगा?</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>गुण कम होने पर विवाह रक्षा उपाय:</strong> यदि गुण १८ से २४ के बीच हैं तो दांपत्य रक्षा के अचूक वैदिक उपाय।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          💍 <strong>वर-वधू के सुखी जीवन का आधार:</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में संपूर्ण ३६ गुण मिलान रिपोर्ट तुरंत प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Sudha Rastogi', city: 'Kanpur', rating: 5, date: '2 days ago', text: 'Clear explanation of Nadi dosha cancellation. Saved our daughter\'s wedding from breaking over false rumors.', textHi: 'नाड़ी दोष के परिहार की इतनी स्पष्ट व्याख्या मिली कि बेटी का रिश्ता बिना किसी भ्रम के तय हो गया।' }
    ],
    faqs: [
      { q: 'How many gunas are needed for marriage?', a: 'A minimum of 18 out of 36 gunas is considered acceptable, with 25+ being auspicious.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. SANTAN YOG REPORT
  // ─────────────────────────────────────────────────────────────────────────────
  'santan-yog-report': {
    slug: 'SantanYog',
    tagline: '5th House Child-Blessing Analysis, Overcoming Conception Obstacles & Santana Gopala Sadhana.',
    taglineHi: 'पंचम भाव (संतान भाव) का विश्लेषण, संतान प्राप्ति में बाधा निवारण एवं संतान गोपाल महामंत्र विधान।',
    badge: 'Family Special',
    labels: [
      { text: '5th House Putra Bhava', color: 'orange' },
      { text: 'Jupiter Guru Strength', color: 'green' },
      { text: 'Santana Gopala Mantra', color: 'blue' }
    ],
    coverImage: '/covers/santan-yog-report.jpg',
    images: [
      '/covers/santan-yog-report.jpg',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-amber-900 m-0">👶 Yearning for the Joy of a Child in Your Home?</h3>
          <p class="text-xs text-amber-800 mt-1 leading-relaxed">
            Medical reports seem normal yet pregnancy is delayed? Experienced recurring miscarriages or IVF failures? <strong>In Vedic astrology, your 5th House (Putra Bhava), Jupiter (Guru), and Pitra/Sarpa Doshas must be pacified!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Child Blessing Dossier:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>5th House & Jupiter Strength Scan:</strong> Identifies which planet is obstructing the blessing of progeny.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Auspicious Conception Windows:</strong> Exact high-fertility astrological periods when planetary transits strongly favor conception.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Santana Gopala Mahamantra Sadhana:</strong> Consecrated mantra routine with pronunciation guidelines to remove negative womb energies.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Gau Seva & Harivansh Purana Guidance:</strong> Sacred Vedic practices that have blessed thousands of couples with healthy children.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🍼 <strong>Bring Lord Bal Gopal's Blessings to Your Lap:</strong> Get this certified 6-page report on WhatsApp for just <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-amber-900 m-0">👶 क्या सूनी गोद के दर्द से मन व्यथित है?</h3>
          <p class="text-xs text-amber-800 mt-1 leading-relaxed">
            डॉक्टरों की रिपोर्ट नॉर्मल होने के बाद भी गर्भधारण नहीं हो रहा? बार-बार गर्भपात या आईवीएफ असफल हो रहा है? <strong>यह पंचम भाव (संतान भाव), गुरु ग्रह की कमजोरी या पितृ/सर्प दोष का प्रभाव हो सकता है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में संतान सुख के अचूक उपाय:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>पंचम भाव व गुरु का विश्लेषण:</strong> जानें कि संतान प्राप्ति में कौन सा ग्रह सबसे बड़ी बाधा बन रहा है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>गर्भधारण के अत्यंत शुभ नक्षत्र व समय:</strong> वह सुनहरे समय-चक्र जब ग्रह संतान योग को 100% अनुकूल बना रहे हैं।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सिद्ध संतान गोपाल महामंत्र विधान:</strong> घर पर ही किए जाने वाले अत्यंत प्रभावशाली मंत्र व पूजा नियम।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>गौ सेवा एवं हरिवंश पुराण के सरल नियम:</strong> जिन उपायों से हजारों परिवारों के आंगन में बच्चों की किलकारियां गूंजी हैं।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🍼 <strong>अपने आंगन में बाल गोपाल की किलकारी गूंजने दें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी संतान योग रिपोर्ट तुरंत पाएं।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Sunita Meena', city: 'Kota', rating: 5, date: 'Yesterday', text: 'After 4 years of despair, we followed the Santana Gopala mantra and Thursday yellow food donation. Blessed with a baby boy last month!', textHi: '4 साल के इलाज के बाद रिपोर्ट के संतान गोपाल मंत्र और गुरुवार के उपायों से पिछले माह हमें पुत्र रत्न की प्राप्ति हुई!' }
    ],
    faqs: [
      { q: 'How does astrology help in conception?', a: 'Astrology identifies favorable dasha cycles and eliminates negative planetary transits that delay conception.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 10. HEALTH & ROG NIVARAN REPORT
  // ─────────────────────────────────────────────────────────────────────────────
  'health-rog-nivaran': {
    slug: 'HealthRogNivaran',
    tagline: 'Vedic Medical Astrology, Chronic Illness Root Causes, Mahamrityunjaya Shield & Vitality Remedies.',
    taglineHi: 'षष्ठम व अष्टम भाव द्वारा छिपी बीमारियों की पहचान, महामृत्युंजय कवच एवं आरोग्य प्राप्ति के उपाय।',
    badge: 'Vitality',
    labels: [
      { text: '6th & 8th Disease Bhava', color: 'red' },
      { text: 'Mahamrityunjaya Shield', color: 'orange' },
      { text: 'Preventive Health Care', color: 'green' }
    ],
    coverImage: '/covers/health-rog-nivaran.jpg',
    images: [
      '/covers/health-rog-nivaran.jpg',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-emerald-900 m-0">🌿 Struggling with Chronic Fatigue, Pain, or Mystery Ailments?</h3>
          <p class="text-xs text-emerald-800 mt-1 leading-relaxed">
            Medical tests come back inconclusive, yet your body feels drained and heavy? Chronic ailments draining thousands in hospital bills? <strong>Medical astrology (Ayur-Jyotish) reveals the exact planetary roots of your health vulnerabilities!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Health & Longevity Dossier:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Vulnerable Body Organs Scan:</strong> Pinpoints weak organs governed by your lagna (e.g. digestive, heart, joints, nerves).</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Mahamrityunjaya Armor Protocol:</strong> Consecrated Shiva kavach to shield against sudden accidents, surgery risks, and toxic energies.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Planetary Metal & Water Therapy:</strong> Copper, silver, or brass water charging aligned with your dominant constitution.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Hospital Bill Elimination:</strong> Specific charity and donation methods on Tuesdays and Saturdays to cancel medical debts.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🛡️ <strong>Health is the True Wealth:</strong> Safeguard your family's vitality for flat <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-emerald-900 m-0">🌿 बार-बार बीमार पड़ना और दवाइयों पर हजारों खर्च होना?</h3>
          <p class="text-xs text-emerald-800 mt-1 leading-relaxed">
            डॉक्टर की सभी जांचें सामान्य आती हैं फिर भी शरीर में दर्द, अनिद्रा, अकारण कमजोरी और बेचैनी बनी रहती है? <strong>यह षष्ठम (रोग) और अष्टम (दीर्घकालीन कष्ट) भाव के ग्रहों का सूक्ष्म प्रभाव होता है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में आरोग्य प्राप्ति के रहस्य:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>संवेदनशील अंगों की पूर्व पहचान:</strong> आपकी राशि अनुसार कौन सा अंग (पेट, हृदय, नसें या हड्डियां) भविष्य में रोगग्रस्त हो सकता है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सिद्ध महामृत्युंजय सुरक्षा कवच:</strong> आकस्मिक दुर्घटना, सर्जरी के भय और अकाल मृत्यु के योगों से रक्षा करने वाला दिव्य सुरक्षा चक्र।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>धातु एवं जल द्वारा रोग निवारण:</strong> तांबे, चांदी या कांसे के बर्तन में जल पीने का आपकी कुंडली अनुसार सही नियम।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>अस्पताल के भारी खर्चों से मुक्ति:</strong> मंगलवार और शनिवार को किए जाने वाले विशेष दान जिससे दवाइयों का खर्च बंद हो जाता है।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🛡️ <strong>पहला सुख निरोगी काया!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी आरोग्य एवं रोग निवारण रिपोर्ट तुरंत प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Dr. Alok Nath', city: 'Varanasi', rating: 5, date: 'Yesterday', text: 'Being a doctor myself, I was amazed at how accurately this report diagnosed my chronic joint pain root causes in Saturn.', textHi: 'एक डॉक्टर होने के नाते मैं हैरान था कि इस रिपोर्ट ने शनि के कारण होने वाले जोड़ों के दर्द का कितना सटीक विश्लेषण किया।' }
    ],
    faqs: [
      { q: 'Is this a substitute for medical advice?', a: 'No, it provides astrological planetary alignments and spiritual preventive remedies alongside your medical treatment.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 11. SHANI SADE SATI & DHAIYA REPORT
  // ─────────────────────────────────────────────────────────────────────────────
  'shani-sade-sati': {
    slug: 'ShaniSadeSati',
    tagline: 'Turn Saturn from Punisher to Protector. Analyze Your Active Sade Sati Phase & Powerful Pacification Remedies.',
    taglineHi: 'साढ़े साती या ढैय्या का कौन सा चरण चल रहा है? शनि देव की कुदृष्टि से रक्षा और कृपा प्राप्ति के प्रमाणित उपाय।',
    badge: 'Protective',
    labels: [
      { text: 'Sade Sati 3 Phases', color: 'blue' },
      { text: 'Hanuman & Shani Shanti', color: 'orange' },
      { text: 'Iron Ring & Oil Daan', color: 'green' }
    ],
    coverImage: '/covers/shani-sade-sati.jpg',
    images: [
      '/covers/shani-sade-sati.jpg',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-slate-50 border-l-4 border-slate-700 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-slate-900 m-0">🪐 Has Bad Luck Shadowed You Everywhere for Years?</h3>
          <p class="text-xs text-slate-800 mt-1 leading-relaxed">
            Sudden financial loss, loss of job, health breakdown, or broken relationships? <strong>Lord Shani's 7.5-year cycle (Sade Sati) or 2.5-year Dhaiya may be testing your Karma right now!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Saturn Shield:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Exact Phase Diagnosis:</strong> Rising, Peak, or Setting phase dates so you know exactly when the hardship ends.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Dashrath Kritha Shani Stotra:</strong> The only stotra that pleased Lord Shani to grant immunity from all curses.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Mustard Oil Shadow Donation (Chhaya Daan):</strong> Correct Saturday Vedic method to absorb and dispel negative karma.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Turning Shani Into a Giver of Wealth:</strong> When pacified, Saturn elevates people from paupers to kings.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          ⚖️ <strong>Turn Shani's Wrath Into Divine Blessings:</strong> Get your complete Shani dossier for just <span class="text-red-700 font-black text-sm">₹299</span>!
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-slate-50 border-l-4 border-slate-700 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-slate-900 m-0">🪐 हर काम बनते-बनते बिगड़ रहा है और दुर्भाग्य पीछा नहीं छोड़ रहा?</h3>
          <p class="text-xs text-slate-800 mt-1 leading-relaxed">
            पैसों का नुकसान, अकारण बदनामी, कोर्ट-कचहरी या गंभीर मानसिक तनाव? <strong>यह शनि देव की साढ़े साती (७.५ वर्ष) या ढैय्या (२.५ वर्ष) का प्रकोप हो सकता है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में शनि देव को प्रसन्न करने के उपाय:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>चरण की सटीक पहचान:</strong> आपके ऊपर साढ़े साती का उदय, मध्य (शिखर) या अस्त चरण चल रहा है और यह किस तारीख को खत्म होगी।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>दशरथ कृत शनि स्तोत्र:</strong> वह एकमात्र स्तोत्र जिससे शनि देव प्रसन्न होकर जातक को राजा के समान ऐश्वर्य प्रदान करते हैं।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सरसों तेल छाया दान की गुप्त विधि:</strong> शनिवार को कांसे के कटोरे में अपनी छाया देखकर दान करने का सही शास्त्रोक्त तरीका।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>घोड़े की नाल का छल्ला धारण नियम:</strong> काले घोड़े की नाल का छल्ला किस उंगली में और किस नक्षत्र में पहनना चाहिए।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          ⚖️ <strong>शनि देव को दंडदाता से रक्षक बनाएं!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी शनि साढ़े साती रिपोर्ट प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Harish Chandra', city: 'Bhiwani', rating: 5, date: 'Yesterday', text: 'The shadow donation and Hanuman Chalisa timings turned my heavy business losses into profits within 60 days.', textHi: 'छाया दान और शनिवार के उपायों से 60 दिनों में मेरी मंदी खत्म हो गई और काम चलने लगा।' }
    ],
    faqs: [
      { q: 'Is Sade Sati always bad?', a: 'No, if Saturn is favorably aligned in your horoscope, Sade Sati can bring immense wealth, power, and property.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 12. KAAL SARP & PITRA DOSH
  // ─────────────────────────────────────────────────────────────────────────────
  'kaal-sarp-dosh': {
    slug: 'KaalSarpDosh',
    tagline: '12 Types of Kaal Sarp Yog & Pitru Dosha Blockages Diagnosed. Permanent Pacification Rituals for Peace & Success.',
    taglineHi: '१२ प्रकार के कालसर्प योग व पितृ दोष की पहचान, व्यापार व परिवार की रुकावटों से मुक्ति के अचूक उपाय।',
    badge: 'Karma Shield',
    labels: [
      { text: '12 Kaal Sarp Types Scan', color: 'red' },
      { text: 'Pitru Tarpan Guidelines', color: 'orange' },
      { text: 'Trimbakeshwar Shanti', color: 'green' }
    ],
    coverImage: '/covers/kaal-sarp-dosh.jpg',
    images: [
      '/covers/kaal-sarp-dosh.jpg',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-red-900 m-0">🐍 Do Snakes Appear in Dreams or Projects Collapse at 99%?</h3>
          <p class="text-xs text-red-800 mt-1 leading-relaxed">
            Everything goes smoothly until the very final step, and then sudden collapse? Frequent family discord, sleepless nights, or unexplainable grief? <strong>This is the trademark signature of Kaal Sarp Yog or Pitru Dosha gripping your life!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Curse Breaker:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Identification of Your Exact Yog:</strong> Discovers which of the 12 Kaal Sarp Yogas (Anant, Kulik, Vasuki, Shankhpal, etc.) is active.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Pitru Dosha Amavasya Tarpan Method:</strong> Simple home-based water and black sesame offering to grant peace to ancestors and unlock their blessings.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Silver Snake (Nag-Nagin) Flow Procedure:</strong> Step-by-step instructions on flowing consecrated silver serpent pairs in running river water.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>No Expensive Trimbakeshwar Trip Needed:</strong> Authentic classical Parashara home remedies that yield equivalent spiritual relief.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🔱 <strong>Break Ancestral Shackles Today:</strong> Clear karmic debt and free your family line for flat <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-red-900 m-0">🐍 काम 99% पर आकर बिगड़ जाता है और सपने में सांप दिखते हैं?</h3>
          <p class="text-xs text-red-800 mt-1 leading-relaxed">
            हर कार्य में अंतिम क्षणों में असफलता, परिवार में अकारण कलह, शादी में देरी या वंश वृद्धि में रुकावट? <strong>यह राहु-केतु के बीच सभी ग्रहों के फंसने से बनने वाले 'कालसर्प योग' या पूर्वजों के 'पितृ दोष' का लक्षण है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में दोष मुक्ति के अचूक उपाय:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>१२ कालसर्प योगों में से आपके योग की पहचान:</strong> अनंत, कुलिक, वासुकि, शंखपाल आदि में से कौन सा योग आपके जीवन को बांध रहा है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>पितृ दोष अमावस्या तर्पण विधि:</strong> घर पर ही काले तिल और जल से पूर्वजों को तृप्त कर उनका आशीर्वाद प्राप्त करने का सरल विधान।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>चांदी के नाग-नागिन जल प्रवाह नियम:</strong> किस शुभ नक्षत्र में और किस नदी में नाग-नागिन का जोड़ा प्रवाहित करने से दोष कटता है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>हजारों रुपये के त्र्यंबकेश्वर खर्च से मुक्ति:</strong> घर पर ही किए जाने वाले शास्त्रोक्त अचूक उपाय जो तुरंत असर दिखाते हैं।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🔱 <strong>पूर्वजों का आशीर्वाद और कालसर्प से मुक्ति पाएं!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी रिपोर्ट डाउनलोड करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Birendra Shukla', city: 'Prayagraj', rating: 5, date: 'Yesterday', text: 'My career was stuck for 5 years due to Anant Kaal Sarp yog. Followed the river release remedy and got promoted!', textHi: 'अनंत कालसर्प योग के कारण करियर 5 साल से रुका था। उपाय करने के बाद बहुत बड़ी सफलता मिली।' }
    ],
    faqs: [
      { q: 'Is it necessary to travel to Trimbakeshwar or Ujjain?', a: 'No, classical Vedic texts prescribe powerful home and local river rituals that effectively pacify the dosha.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 13. MONEY FLOW REMEDIES
  // ─────────────────────────────────────────────────────────────────────────────
  'money-flow-remedies': {
    slug: 'MoneyFlow',
    tagline: 'Clear Money Blockages, Eliminate Unnecessary Expenses & Establish Permanent Liquid Cash Flow.',
    taglineHi: 'पैसा टिकता नहीं है? फिजूलखर्ची रोकने और घर-दुकान में निरंतर धन प्रवाह बनाए रखने के उपाय।',
    badge: 'Barkat Remedy',
    labels: [
      { text: 'Kubera Locker Alignment', color: 'green' },
      { text: 'Gomati Chakra Secrets', color: 'orange' },
      { text: 'Barkat Totkas', color: 'blue' }
    ],
    coverImage: '/covers/money-flow-remedies.jpg',
    images: [
      '/covers/money-flow-remedies.jpg',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-emerald-900 m-0">💸 Is Money Vanishing as Fast as It Arrives?</h3>
          <p class="text-xs text-emerald-800 mt-1 leading-relaxed">
            Every time money comes in, a sudden breakdown, medical emergency, or family dispute drains it instantly? <strong>This is called 'Dhan-Bandhan' (Wealth Blockage) where your household energy fails to hold cash!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Barkat Formula:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Clove & Camphor Friday Magnet:</strong> Specific Vedic aroma ritual that purges negative poverty energy from every corner of your home.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Consecrated Gomati Chakra & Yellow Cowrie Secrets:</strong> Exact positioning in your wallet or locker to keep cash multiplying.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Plugging Household Money Drains:</strong> Locates hidden energy leaks like dripping taps or South-East water elements that flush money away.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          💰 <strong>Keep Your Hard-Earned Wealth Safe:</strong> Unlock your ₹299 Money Flow remedies today.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-emerald-900 m-0">💸 पैसा आता तो है, पर पानी की तरह बह क्यों जाता है?</h3>
          <p class="text-xs text-emerald-800 mt-1 leading-relaxed">
            जैसे ही हाथ में पैसा आता है, तुरंत कोई बीमारी, गाड़ी की खराबी या नुकसान खड़ा हो जाता है? <strong>यह घर में 'धन बरकत दोष' का स्पष्ट प्रमाण है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में धन बरकत के गुप्त सूत्र:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>शुक्रवार कपूर व लौंग का चमत्कारी उपाय:</strong> घर से दरिद्रता और नजर दोष दूर कर माता लक्ष्मी के स्थायी वास का अचूक टोटका।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सिद्ध पीली कौड़ी व गोमती चक्र का रहस्य:</strong> बटुए या तिजोरी में रखने की वह विधि जिससे कभी जेब खाली नहीं रहती।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>घर में धन बहाने वाले वास्तु दोषों को बंद करना:</strong> टपकते नल और गलत दिशा में रखे पानी के बर्तनों के धन-नाशक दोषों का खात्मा।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          💰 <strong>अपने घर में धन की बरकत बनाए रखें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी रिपोर्ट प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Kavita Chawla', city: 'Chandigarh', rating: 5, date: 'Yesterday', text: 'The Friday clove ritual and locker realignment stopped our endless sudden expenses completely!', textHi: 'शुक्रवार के लौंग वाले उपाय से हमारे घर में अचानक होने वाले खर्चे पूरी तरह बंद हो गए!' }
    ],
    faqs: [
      { q: 'How long do these remedies take?', a: 'Less than 5 minutes every Friday at home.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 14. HOME VASTU REMEDIES
  // ─────────────────────────────────────────────────────────────────────────────
  'home-vastu-remedies': {
    slug: 'HomeVastu',
    tagline: 'Harmonize Household Energy, Peace & Health Without Tearing Down Walls or Breaking Single Tile.',
    taglineHi: 'बिना तोड़-फोड़ के घर के सभी वास्तु दोषों का निवारण, परिवार में शांति और आरोग्य की प्राप्ति।',
    badge: 'No Demolition',
    labels: [
      { text: 'Zero Demolition Fixes', color: 'green' },
      { text: 'Panch Tatva Balance', color: 'orange' },
      { text: 'Color & Pyramid Therapy', color: 'blue' }
    ],
    coverImage: '/covers/home-vastu-remedies.jpg',
    images: [
      '/covers/home-vastu-remedies.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-amber-900 m-0">🏡 Does Your House Feel Heavy, Restless, or Full of Arguments?</h3>
          <p class="text-xs text-amber-800 mt-1 leading-relaxed">
            As soon as you enter home, does irritation, fatigue, or fights between family members begin? <strong>You don't need to break walls or spend lakhs! 98% of Vastu defects can be neutralized using colors, metals, and pyramids.</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Zero-Demolition Vastu Guide:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>16-Direction Energy Balance:</strong> Balance Fire, Water, Air, Earth, and Space elements without changing masonry.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Kitchen & Toilet Conflict Cures:</strong> Copper/zinc strip placements and mirror reflections that neutralize bad orientations.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Brahmasthan (Center) Purification:</strong> Clear the cosmic core of your residence to let pure positive prana circulate freely.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🏠 <strong>Turn Your House Into a Temple of Peace:</strong> Get your complete home Vastu report now for <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-amber-900 m-0">🏡 घर में कदम रखते ही भारीपन, अशांति और अकारण कलह होती है?</h3>
          <p class="text-xs text-amber-800 mt-1 leading-relaxed">
            बाहर सब ठीक रहता है लेकिन घर आते ही सिर भारी होना, पति-पत्नी में विवाद या बच्चों का चिड़चिड़ापन? <strong>इसके लिए घर तोड़ने की बिल्कुल जरूरत नहीं है! रंग, तांबे की पट्टी और दर्पण से सभी दोष ठीक हो सकते हैं।</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में बिना तोड़-फोड़ के वास्तु समाधान:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>१६ दिशाओं का ऊर्जा संतुलन:</strong> जल, अग्नि, वायु, पृथ्वी और आकाश तत्वों को संतुलित करने के आसान सूत्र।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>गलत दिशा में बने किचन व टॉयलेट के उपाय:</strong> तांबा व जस्ता पट्टी द्वारा नकारात्मक ऊर्जा को उसी जगह लॉक करने की तकनीक।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>ब्रह्मस्थान की शुद्धि:</strong> घर के मध्य भाग की नकारात्मकता हटाकर सुख-शांति और आरोग्य का संचार करना।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🏠 <strong>अपने घर को खुशियों का स्वर्ग बनाएं!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी वास्तु रिपोर्ट तुरंत प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Anil Mathur', city: 'Noida', rating: 5, date: 'Yesterday', text: 'Architects suggested 2 Lakhs demolition. This report solved my North-East toilet defect with sea salt and copper strips for ₹100!', textHi: 'वास्तु कंसल्टेंट ने 2 लाख का तोड़-फोड़ बताया था। इस रिपोर्ट के नमक और तांबे के उपाय से सारा दोष दूर हो गया!' }
    ],
    faqs: [
      { q: 'Will I need to break any walls?', a: 'Never! 100% of our remedies are non-destructive using Vedic metals, salts, colors, and pyramids.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 15. BUSINESS VASTU REMEDIES
  // ─────────────────────────────────────────────────────────────────────────────
  'business-vastu-remedies': {
    slug: 'BusinessVastu',
    tagline: 'Attract Higher Footfalls, Faster Sales Conversions & Customer Loyalty for Shops, Factories & Offices.',
    taglineHi: 'दुकान, शोरूम या ऑफिस में ग्राहकों की आवाजाही बढ़ाने और बिक्री में 3x वृद्धि के वास्तु सूत्र।',
    badge: 'High Returns',
    labels: [
      { text: 'Billing Counter Vastu', color: 'green' },
      { text: 'Dead-Stock Clearance', color: 'orange' }
    ],
    coverImage: '/covers/business-vastu-remedies.jpg',
    images: [
      '/covers/business-vastu-remedies.jpg',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-blue-900 m-0">🏪 Why Is the Nearby Competitor Flourishing While Your Shop Sits Empty?</h3>
          <p class="text-xs text-blue-800 mt-1 leading-relaxed">
            Same goods, better prices, yet customers flock to your competitor? <strong>Your main entrance energy or owner seating orientation is repelling wealth vibrations!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Commercial Vastu Formula:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Owner Facing Rule:</strong> Sit facing East or North to make rapid, profitable management decisions.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Dead Stock Clearance Vayavya (North-West) Technique:</strong> Place unsellable inventory in the wind zone to trigger rapid liquidation.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Cash Counter Kubera Degree:</strong> The precise location to avoid end-of-day cash mismatches and theft.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          📈 <strong>Boost Your Daily Sales by 3x:</strong> Download your ₹299 Commercial Vastu Report now.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-blue-900 m-0">🏪 सामने वाले की दुकान पर लाइन लगी है और आपकी दुकान खाली क्यों?</h3>
          <p class="text-xs text-blue-800 mt-1 leading-relaxed">
            अच्छी क्वालिटी और कम दाम के बाद भी ग्राहक नहीं आते? <strong>यह दुकान के प्रवेश द्वार या गल्ले की गलत वास्तु दिशा के कारण होता है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में दुकान व ऑफिस वास्तु के अचूक नियम:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>मालिक के बैठने की सही दिशा:</strong> उत्तर या पूर्व मुखी बैठने से ग्राहक का विश्वास और व्यापारिक फैसले सटीक होते हैं।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>अटका हुआ माल तुरंत बेचने का वायव्य कोण उपाय:</strong> जो सामान महीनों से नहीं बिक रहा, उसे वायव्य (उत्तर-पश्चिम) कोण में रखने से फटाफट बिक्री होती है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>कैश काउंटर की सटीक कुबेर स्थिति:</strong> गल्ले में बरकत और कर्मचारियों द्वारा हेराफेरी रोकने के नियम।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          📈 <strong>अपनी दुकान की दैनिक बिक्री 3 गुना बढ़ाएं!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी रिपोर्ट पाएं।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Naresh Bansal', city: 'Hisar', rating: 5, date: 'Yesterday', text: 'Moved our dead stock to North-West as instructed. Cleared 80% inventory within 3 weeks!', textHi: 'रिपोर्ट अनुसार पुराना माल वायव्य कोण में रखा और 3 हफ्ते में सारा स्टॉक बिक गया!' }
    ],
    faqs: [
      { q: 'Is this applicable to rental shops?', a: 'Yes, all remedies can be done in rented properties without structural changes.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 16. WASHROOM VASTU REMEDIES
  // ─────────────────────────────────────────────────────────────────────────────
  'washroom-vastu-remedies': {
    slug: 'WashroomVastu',
    tagline: 'Neutralize the Severe Negative Drainage of Incorrectly Placed Toilets (North-East or South-West).',
    taglineHi: 'गलत दिशा में बने टॉयलेट से होने वाली धन हानि और बीमारियों को रोकने के आसान उपाय।',
    badge: 'Essential',
    labels: [
      { text: 'North-East Toilet Cures', color: 'red' },
      { text: 'Sea Salt Energy Lock', color: 'blue' }
    ],
    coverImage: '/covers/washroom-vastu-remedies.jpg',
    images: [
      '/covers/washroom-vastu-remedies.jpg',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-rose-900 m-0">🚽 Is a Toilet Flushing Away Your Wealth and Health?</h3>
          <p class="text-xs text-rose-800 mt-1 leading-relaxed">
            A toilet in the North-East (Ishanya) destroys brain calm, while one in South-West (Nairutya) destroys relationship stability and drains bank balances! <strong>Neutralize this severe fault without breaking concrete.</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Washroom Neutralizer:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Raw Sea Salt in Glass Bowl Technique:</strong> How and when to replace it to absorb 100% of negative drainage prana.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Zinc & Copper Strip Boundary Lock:</strong> Cuts off negative energetic leaking into living areas.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Mirror Reflection Rules:</strong> Prevents toilet drains from multiplying bad luck.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🛡️ <strong>Stop the Drain of Your Prosperity:</strong> Fix toilet Vastu for just <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-rose-900 m-0">🚽 क्या गलत दिशा का शौचालय आपके धन और सेहत को बहा रहा है?</h3>
          <p class="text-xs text-rose-800 mt-1 leading-relaxed">
            ईशान कोण (उत्तर-पूर्व) में बना टॉयलेट मानसिक तनाव और बीमारी देता है, जबकि नैऋत्य कोण का टॉयलेट धन को बहा देता है! <strong>बिना किसी तोड़-फोड़ के इसे पूरी तरह निष्प्रभावी किया जा सकता है।</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में टॉयलेट दोष निवारण उपाय:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>कांच के कटोरे में समुद्री नमक का प्रयोग:</strong> नकारात्मक ऊर्जा सोखने और उसे हर 15 दिन में बदलने का सही नियम।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>तांबा व जस्ता पट्टी द्वारा ऊर्जा लॉक:</strong> टॉयलेट की चौखट पर पट्टी लगाकर नकारात्मक ऊर्जा को घर में फैलने से रोकना।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>दर्पण और पौधों द्वारा शुद्धि:</strong> सही दिशा में दर्पण लगाकर दोष को काटने का वैज्ञानिक नियम।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🛡️ <strong>घर की बरकत को बहने से रोकें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी टॉयलेट वास्तु रिपोर्ट प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Siddheshwar Roy', city: 'Patna', rating: 5, date: 'Yesterday', text: 'The glass bowl sea salt and copper tape remedy brought an instant sense of relief in our apartment.', textHi: 'कांच के कटोरे में नमक रखने के उपाय से घर का भारीपन तुरंत दूर हो गया।' }
    ],
    faqs: [
      { q: 'Can a North-East toilet really be corrected without breaking?', a: 'Yes! Using elemental metal strips and salt absorbs the negative drainage vibration effectively.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 17. NAZAR DOSH REMOVAL REMEDY
  // ─────────────────────────────────────────────────────────────────────────────
  'nazar-dosh-removal-remedy': {
    slug: 'NazarDosh',
    tagline: 'Protect Your Child, Home, Business & Health from Jealousy, Evil Eye (Buri Nazar) & Negative Aura.',
    taglineHi: 'बुरी नजर, बंधन दोष, अकारण कलह और बीमारी से परिवार व बच्चों की सुरक्षा के प्राचीन उपाय।',
    badge: 'Protection',
    labels: [
      { text: 'Evil Eye Neutralization', color: 'red' },
      { text: 'Bhairav Raksha Shield', color: 'orange' },
      { text: 'Loban & Salt Cleanse', color: 'green' }
    ],
    coverImage: '/covers/nazar-dosh-removal-remedy.jpg',
    images: [
      '/covers/nazar-dosh-removal-remedy.jpg',
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-purple-900 m-0">🧿 Have Jealous Eyes Cast a Dark Shadow Over Your Happiness?</h3>
          <p class="text-xs text-purple-800 mt-1 leading-relaxed">
            Things were going wonderfully, but right after a party, promotion, or new purchase, sudden sickness or severe arguments erupted? <strong>Buri Nazar is real, scientific psychic negative energy that pierces your aura!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Nazar Shield:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Mustard Seed, Salt & Chili Tuesday Protocol:</strong> The classical grandmother ritual explained with precise mantra energization.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Kaal Bhairav & Hanuman Protection Shield:</strong> Create an impenetrable auric wall around your children and home.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Guggul & Loban Sacred Fumigation:</strong> Cleanse invisible toxic psychic sludge from your living room and bedrooms.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🧿 <strong>Shield Your Loved Ones from Evil Eyes:</strong> Get your complete Nazar Dosh guide for <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-purple-900 m-0">🧿 सब कुछ अच्छा चल रहा था और अचानक किसी की नजर लग गई?</h3>
          <p class="text-xs text-purple-800 mt-1 leading-relaxed">
            हंसते-खेलते घर में अचानक क्लेश, बच्चे का रात को रोना, दुकान में बिक्री अचानक ठप हो जाना? <strong>ईर्ष्यालु लोगों की नकारात्मक दृष्टि (बुरी नजर) आपके आभामंडल को भेद देती है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में नजर दोष मुक्ति के अचूक उपाय:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>राई, नमक व सूखी लाल मिर्च का सटीक नियम:</strong> किस दिन और किस समय नजर उतार कर आग में जलाने से तत्काल असर होता है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>काल भैरव व हनुमान रक्षा कवच:</strong> परिवार के सदस्यों व बच्चों की रक्षा हेतु सिद्ध काले धागे का विधान।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>गुग्गल व लोबान की दिव्य धूनी:</strong> घर व दुकान से सभी प्रकार के बंधन दोष व नकारात्मक शक्तियों का सफाया।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🧿 <strong>अपने परिवार को बुरी नजर से सुरक्षित रखें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी नजर दोष रिपोर्ट तुरंत प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Sarita Trivedi', city: 'Indore', rating: 5, date: 'Yesterday', text: 'Our toddler was constantly falling sick and irritable. The Tuesday mustard and salt ritual brought peace within 24 hours.', textHi: 'बच्चा रात को अचानक डर कर रोता था। मंगलवार के उपाय से बच्चा बिल्कुल शांत और स्वस्थ हो गया।' }
    ],
    faqs: [
      { q: 'How do I know if my house has Nazar Dosh?', a: 'Unprovoked family arguments, withering Tulsi plant, and sudden business drop are key indicators.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 18. MANDIR VASTU REMEDIES
  // ─────────────────────────────────────────────────────────────────────────────
  'mandir-vastu-remedies': {
    slug: 'MandirVastu',
    tagline: 'Amplify Divine Vibrations at Home. Ideal North-East Ishanya Mandir Placement, Deity Directions & Lighting Rules.',
    taglineHi: 'घर के पूजा स्थल की सही दिशा, मूर्तियों का मुख, अखंड ज्योत और पूजा के सही नियम व वास्तु शुद्धि।',
    badge: 'Divine Blessings',
    labels: [
      { text: 'Ishanya North-East Alignment', color: 'green' },
      { text: 'Pure Ghee Lamp Direction', color: 'orange' }
    ],
    coverImage: '/covers/mandir-vastu-remedies.jpg',
    images: [
      '/covers/mandir-vastu-remedies.jpg',
      'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-amber-900 m-0">🛕 Are Your Daily Prayers Bringing Real Peace and Prosperity?</h3>
          <p class="text-xs text-amber-800 mt-1 leading-relaxed">
            Praying daily but feeling anxious, restless, or lack of divine support? <strong>A temple placed in the wrong direction or with broken idols creates severe spiritual counter-currents!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Sacred Altar Guide:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Ishanya (North-East) Power Grid:</strong> How to position your temple so cosmic blessings cascade into your home.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Deity Idols Height & Facing Rules:</strong> Never place idols facing South; know the exact height and placement secrets.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Ghee Diya & Shankh Energization:</strong> Direction of lamp flames to attract wealth and destroy negative vibrations.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🛕 <strong>Turn Your Altar Into a Powerhouse of Blessings:</strong> Download your ₹299 Mandir Vastu report today.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-amber-900 m-0">🛕 रोज़ पूजा-पाठ करने के बाद भी मन में अशांति और बाधाएं क्यों?</h3>
          <p class="text-xs text-amber-800 mt-1 leading-relaxed">
            क्या आपके घर का मंदिर गलत दिशा में है या मूर्तियों का मुख गलत है? <strong>वास्तु अनुसार गलत दिशा में बना पूजा घर प्रार्थनाओं का फल निष्प्रभावी कर देता है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में मंदिर वास्तु के दिव्य नियम:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>ईशान कोण (उत्तर-पूर्व) में स्थापना:</strong> मंदिर को किस सटीक दिशा में रखें जिससे देवताओं का सीधा आशीर्वाद मिले।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>मूर्तियों का मुख और ऊंचाई:</strong> मूर्तियों का मुख पूर्व या पश्चिम की ओर रखने और खंडित मूर्तियों के विसर्जन के नियम।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>दीपक की लौ और दक्षिणावर्ती शंख:</strong> धन आगमन के लिए दीपक की लौ किस दिशा में होनी चाहिए।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🛕 <strong>अपने घर के मंदिर को जागृत करें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी मंदिर वास्तु रिपोर्ट प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Kamal Nayan', city: 'Haridwar', rating: 5, date: 'Yesterday', text: 'Re-aligned our pooja mandir according to the directions in this report. The spiritual peace in our home is palpable now.', textHi: 'मंदिर की दिशा सही करने के बाद घर में पूजा करते समय अद्भुत शांति का अनुभव होता है।' }
    ],
    faqs: [
      { q: 'Can a temple be placed in the bedroom?', a: 'No, having a mandir in the master bedroom causes friction; this report provides alternatives.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 19. KITCHEN VASTU REMEDIES
  // ─────────────────────────────────────────────────────────────────────────────
  'kitchen-vastu-remedies': {
    slug: 'KitchenVastu',
    tagline: 'Balance the Fire Element in South-East (Agneya). Prevent Female Illness, Food Wastage & Interpersonal Disputes.',
    taglineHi: 'रसोईघर (आग्नेय कोण) वास्तु उपाय — बिना तोड़-फोड़ के अग्नि व जल तत्व का संतुलन, महिलाओं के स्वास्थ्य व सुख की रक्षा।',
    badge: 'Health & Fire',
    labels: [
      { text: 'Agneya Fire Balance', color: 'orange' },
      { text: 'Stove & Sink Harmony', color: 'blue' }
    ],
    coverImage: '/covers/kitchen-vastu-remedies.jpg',
    images: [
      '/covers/kitchen-vastu-remedies.jpg',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-orange-900 m-0">🍳 Is a Faulty Kitchen Draining the Health of the Women in Your House?</h3>
          <p class="text-xs text-orange-800 mt-1 leading-relaxed">
            Frequent headaches, back pain, or gynecological troubles in the lady of the house? Food spoiling rapidly, or arguments flaring up over meals? <strong>A kitchen not in the South-East (Agneya) pits Fire against Water, creating severe health and cash crises!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Kitchen Vastu Blueprint:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Gas Stove (Fire) vs. Sink (Water) Collision Fix:</strong> Place wooden or crystal buffers to prevent fire-water elemental war.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Kitchen in North-East (Disaster Zone) Neutralizer:</strong> Specific green/brown marble slabs beneath the burner to soak up the dosha.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Maa Annapurna Blessing Activation:</strong> Consecrated kitchen quadrant rule to ensure an endless abundance of nourishing food.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🍲 <strong>Protect the Hearth of Your Family:</strong> Download your Kitchen Vastu report now for just <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-orange-900 m-0">🍳 क्या घर की महिलाओं का स्वास्थ्य लगातार खराब रहता है?</h3>
          <p class="text-xs text-orange-800 mt-1 leading-relaxed">
            कमर दर्द, सिरदर्द, थकान या घर में खाना बनते समय विवाद? <strong>आग्नेय कोण (दक्षिण-पूर्व) में रसोई न होना या चूल्हे और सिंक का आमने-सामने होना अग्नि और जल का भारी युद्ध कराता है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में रसोईघर वास्तु के अचूक उपाय:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>चूल्हा (अग्नि) और सिंक (जल) का संतुलन:</strong> बिना तोड़-फोड़ के लकड़ी या क्रिस्टल पट्टी से ऊर्जा टकराव खत्म करने का नियम।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>गलत दिशा में बने किचन का शमन:</strong> चूल्हे के नीचे हरे या भूरे पत्थर की पट्टी लगाने से दोष को काटने की विधि।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>मां अन्नपूर्णा का स्थायी वास:</strong> रसोई में किस दिशा में अनाज रखें जिससे बरकत बनी रहे और भोजन अमृत समान बने।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🍲 <strong>घर की महिलाओं के स्वास्थ्य और अन्नपूर्णा कृपा को सुरक्षित करें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी रिपोर्ट प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Rekha Deshpande', city: 'Nagpur', rating: 5, date: 'Yesterday', text: 'My chronic migraines stopped after putting the green marble strip under our North-facing stove. Unbelievable relief!', textHi: 'चूल्हे के नीचे हरे पत्थर की पट्टी लगाने के बाद मेरा सालों पुराना माइग्रेन ठीक हो गया!' }
    ],
    faqs: [
      { q: 'What if my kitchen is in the North-East?', a: 'This is the most critical defect, but our report gives tested marble and copper remedies to completely absorb it without moving walls.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 20. MAIN DOOR VASTU
  // ─────────────────────────────────────────────────────────────────────────────
  'main-door-vastu': {
    slug: 'MainDoorVastu',
    tagline: 'Energize the Simha Dvara (Main Entrance). Block Negative Spirits, Evil Eye & Welcome Goddess Lakshmi Into Your Home.',
    taglineHi: 'घर के मुख्य द्वार से सकारात्मक ऊर्जा का प्रवेश, नजर दोष से रक्षा और माता लक्ष्मी के स्थायी आगमन के उपाय।',
    badge: 'Prana Gateway',
    labels: [
      { text: 'Simha Dvara Protection', color: 'red' },
      { text: 'Copper Sun & Swastik', color: 'orange' },
      { text: 'Dahleez Energy Lock', color: 'green' }
    ],
    coverImage: '/covers/main-door-vastu.jpg',
    images: [
      '/covers/main-door-vastu.jpg',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-emerald-900 m-0">🚪 Is Your Main Door Welcoming Lakshmi or Inviting Misfortune?</h3>
          <p class="text-xs text-emerald-800 mt-1 leading-relaxed">
            The main entrance (Simha Dvara) is the mouth of your home through which all cosmic prana enters. <strong>If shoes, shadows, mirrors, or negative directions block the doorway, prosperity simply turns back!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Entrance Protection Guide:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Auspicious Symbols Placement:</strong> Exact height and degree to install copper Sun, Swastik, and Om symbols.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Brass Dahleez (Threshold) Installation:</strong> Creates an energetic barricade that stops Rahu-Ketu negative entities from stepping inside.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Shoe Rack & Mirror Redirection:</strong> Eliminates the common mistake of placing mirrors facing the entrance door.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🌟 <strong>Welcome Divine Abundance Every Day:</strong> Get your Main Door Vastu blueprint for just <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-emerald-900 m-0">🚪 क्या आपका मुख्य द्वार माता लक्ष्मी का स्वागत कर रहा है या दरिद्रता का?</h3>
          <p class="text-xs text-emerald-800 mt-1 leading-relaxed">
            घर का मुख्य द्वार (सिंह द्वार) वह मुख है जहां से पूरे घर में प्राण ऊर्जा प्रवेश करती है। <strong>यदि द्वार के सामने जूते-चप्पल, शीशा या वास्तु दोष हो, तो सुख-समृद्धि दरवाजे से ही लौट जाती है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में मुख्य द्वार वास्तु के अचूक सूत्र:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>स्वास्तिक, ॐ व तांबे के सूर्य का नियम:</strong> मुख्य द्वार पर किस ऊंचाई और किस धातु का मांगलिक चिन्ह लगाने से भाग्य चमकता है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>दहलीज़ (चौखट) की शुद्धि:</strong> चौखट पर पीतल या तांबे की पत्ती लगाने से राहु व बुरी नजर का घर में प्रवेश रुकता है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>जूते-चप्पल और दर्पण की सही स्थिति:</strong> दरवाजे के ठीक सामने दर्पण होने से धन का नुकसान क्यों होता है और उसे कैसे ठीक करें।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🌟 <strong>अपने घर में सुख-समृद्धि का मार्ग खोलें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी मुख्य द्वार वास्तु रिपोर्ट पाएं।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Virendra Singh', city: 'Alwar', rating: 5, date: 'Yesterday', text: 'Removed the mirror facing our entrance and installed the copper Sun. Experienced sudden financial peace within a month!', textHi: 'दरवाजे के सामने से शीशा हटाकर तांबे का सूर्य लगाया, एक महीने में पैसों की तंगी दूर हो गई!' }
    ],
    faqs: [
      { q: 'Which is the best direction for the main door?', a: 'North, East, and North-East are ideal, but any entrance can be energized using corrective Vedic symbols.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 21. BEDROOM & RELATIONSHIP VASTU
  // ─────────────────────────────────────────────────────────────────────────────
  'bedroom-relationship-vastu': {
    slug: 'BedroomVastu',
    tagline: 'Eliminate Daily Arguments, Insomnia & Marital Friction. Realignment Rules for Deep Love & Harmonious Sleep.',
    taglineHi: 'पति-पत्नी के बीच अकारण विवाद, अनिद्रा और तनाव समाप्त कर दांपत्य प्रेम बढ़ाने के आसान वास्तु सूत्र।',
    badge: 'Marital Peace',
    labels: [
      { text: 'South/East Sleeping Alignment', color: 'green' },
      { text: 'Mirror & Electronics Removal', color: 'orange' },
      { text: 'Rose Quartz Love Energy', color: 'red' }
    ],
    coverImage: '/covers/bedroom-relationship-vastu.jpg',
    images: [
      '/covers/bedroom-relationship-vastu.jpg',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-rose-900 m-0">💔 Has Coldness and Bitter Fights Crept into Your Marriage?</h3>
          <p class="text-xs text-rose-800 mt-1 leading-relaxed">
            Loving each other during the day, but exploding into petty arguments inside the bedroom at night? Waking up exhausted with restless sleep? <strong>Your bed orientation, mirrors reflecting the mattress, or electronics beneath the bed are generating discord frequencies!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Relationship Harmony Dossier:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Scientific Sleeping Direction:</strong> Sleep with head towards South or East for magnetic blood circulation and deep emotional intimacy.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>The Mirror Curse Cure:</strong> Covering or redirecting mirrors that reflect the sleeping couple (the #1 classical cause of infidelity and divorce).</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Color & Crystal Love Frequency:</strong> Gentle pastel hues and rose quartz crystal placement to revive romance and mutual affection.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          ❤️ <strong>Rekindle Lifelong Love & Deep Peace:</strong> Download your Relationship Vastu blueprint today for <span class="text-red-700 font-black text-sm">₹299</span>.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-rose-900 m-0">💔 क्या पति-पत्नी के बीच छोटी-छोटी बातों पर भारी विवाद और दूरियां बढ़ रही हैं?</h3>
          <p class="text-xs text-rose-800 mt-1 leading-relaxed">
            दिन में सब ठीक रहता है लेकिन बेडरूम में आते ही तनाव, अनिद्रा और कड़वाहट शुरू हो जाती है? <strong>बिस्तर के सामने लगा शीशा, सिर की गलत दिशा या बेड के अंदर रखा कबाड़ दांपत्य सुख को नष्ट कर देता है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में दांपत्य सुख के अचूक वास्तु सूत्र:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>सोने की सही दिशा का विज्ञान:</strong> सिर दक्षिण या पूर्व दिशा में रखकर सोने से गहरी नींद, मानसिक शांति और आपसी प्रेम में वृद्धि।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>बिस्तर के सामने लगे शीशे का उपाय:</strong> सोते समय शीशे में शरीर का प्रतिबिंब दिखना दांपत्य में तीसरे व्यक्ति के हस्तक्षेप या अलगाव का कारण बनता है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>कमरे के शुभ रंग व क्रिस्टल:</strong> हल्के गुलाबी, क्रीम या हल्के हरे रंग और रोज क्वार्ट्ज द्वारा प्रेम ऊर्जा को जाग्रत करना।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          ❤️ <strong>दांपत्य जीवन में फिर से प्रेम और मिठास घोलें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में अपनी रिपोर्ट प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Deepa Saxena', city: 'Bareilly', rating: 5, date: 'Yesterday', text: 'Covering the mirror at night and changing our sleeping direction saved our marriage from an impending divorce.', textHi: 'रात को शीशा ढकने और सिर दक्षिण में करने से हमारे बीच के झगड़े पूरी तरह समाप्त हो गए!' }
    ],
    faqs: [
      { q: 'Can bed direction really affect our relationship?', a: 'Yes! The Earth\'s magnetic field aligns directly with our blood iron ions, impacting neurochemistry and irritability.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 22. STUDY ROOM & MEMORY VASTU
  // ─────────────────────────────────────────────────────────────────────────────
  'study-room-vastu': {
    slug: 'StudyRoomVastu',
    tagline: 'Supercharge Focus, Memory Retention & Exam Confidence for Children Through North-East Alignment.',
    taglineHi: 'बच्चों की पढ़ाई में एकाग्रता, याददाश्त बढ़ाने और परीक्षा के डर को दूर करने के प्रमाणित वास्तु नियम।',
    badge: 'Student Success',
    labels: [
      { text: 'North-East Study Orientation', color: 'green' },
      { text: 'Saraswati Yantra Focus', color: 'orange' },
      { text: 'Memory Retention Boost', color: 'blue' }
    ],
    coverImage: '/covers/study-room-vastu.jpg',
    images: [
      '/covers/study-room-vastu.jpg',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80'
    ],
    aboutHtml: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-blue-900 m-0">📚 Does Your Child Sit to Study but Gets Distracted in 10 Minutes?</h3>
          <p class="text-xs text-blue-800 mt-1 leading-relaxed">
            Studying for hours yet forgetting everything in exam halls? Constant addiction to mobile screens and zero concentration? <strong>A study desk facing a blank wall, sitting under a heavy beam, or facing South drains mental vital energy!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ What You Get in This ₹299 Student Success Blueprint:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>North/East Desk Orientation:</strong> Study facing North or East to channel intellectual cosmic rays directly into the frontal lobe.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Saraswati Yantra & Crystal Pyramid Setup:</strong> Places the focus anchor on the desk to lock attention and destroy restlessness.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>Wall Colors for Brain Calm:</strong> Light yellow, pale green, or off-white hues that soothe exam anxiety and supercharge retention.</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🎓 <strong>Give Your Child the Gift of Effortless Top Grades:</strong> Download your ₹299 Study Vastu report today.
        </div>
      </div>
    `,
    aboutHtmlHi: `
      <div class="space-y-4 text-gray-800">
        <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
          <h3 class="text-base font-bold text-blue-900 m-0">📚 बच्चा पढ़ने बैठता है पर 10 मिनट में मोबाइल या ख्यालों में खो जाता है?</h3>
          <p class="text-xs text-blue-800 mt-1 leading-relaxed">
            दिन-रात रटने के बाद भी परीक्षा में सब भूल जाना और कम नंबर आना? <strong>गलत दिशा में मुख करके पढ़ना या बीम के नीचे बैठना दिमाग की एकाग्रता को 70% तक खत्म कर देता है!</strong>
          </p>
        </div>

        <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider text-[#89270B]">⚡ मात्र ₹299 में बच्चों की याददाश्त व एकाग्रता बढ़ाने के नियम:</h4>
        <ul class="space-y-2 text-xs">
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>स्टडी टेबल की सही दिशा (उत्तर/पूर्व मुखी):</strong> पढ़ते समय उत्तर या पूर्व की ओर मुख रखने से स्मरण शक्ति और समझ कई गुना बढ़ जाती है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>स्फटिक पिरामिड व सरस्वती यंत्र स्थापना:</strong> स्टडी टेबल पर सकारात्मक ऊर्जा का ऐसा घेरा जो चंचलता और आलस्य को भगा देता है।</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-emerald-600 font-bold text-sm">✓</span>
            <span><strong>कमरे के शुभ रंग:</strong> हल्का हरा, पीला या सफेद रंग जो परीक्षा के तनाव को खत्म कर मस्तिष्क को शांत रखता है।</span>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 font-medium">
          🎓 <strong>अपने बच्चे के सुनहरे भविष्य की नींव रखें!</strong> मात्र <span class="text-red-700 font-black text-sm">₹299</span> में स्टडी वास्तु रिपोर्ट प्राप्त करें।
        </div>
      </div>
    `,
    reviews: [
      { id: 1, name: 'Pooja Aggarwal', city: 'Delhi', rating: 5, date: 'Yesterday', text: 'My son\'s marks jumped from 68% to 89% in board exams after shifting his desk to face East and placing the crystal pyramid!', textHi: 'बेटे की टेबल पूर्व दिशा में करने के बाद बोर्ड परीक्षा में 89% अंक आए। बहुत चमत्कारी उपाय है!' }
    ],
    faqs: [
      { q: 'Can this help competitive exam aspirants?', a: 'Yes! It directly boosts memory retention, focus tenure, and reduces exam panic.' }
    ]
  }
};
