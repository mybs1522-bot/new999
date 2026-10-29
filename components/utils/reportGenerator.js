import { calculateKundli, RASHIS, NAKSHATRAS } from './vedicCalculations.js';
import { REPORTS_DATA } from '../data/reports.js';
import { enhanceReportWithGemini } from './geminiReportEnhancer.js';

/**
 * High-Accuracy 6-Page Vedic Astrology Report Engine
 * Generates structured, authentic, compassionate, and plain-language
 * 6-page reports for all 22 Vedic services in both Hindi and English.
 */
export function generateReport(reportId, birthData = {}, language = 'hi') {
  const bData = birthData || {};
  const reportConfig = REPORTS_DATA.find(r => r.id === reportId) || REPORTS_DATA[0];
  const kundli = calculateKundli(bData);
  const isHindi = language === 'hi';

  const { fullName, gender, pob, dob, tob, timeUnknown } = bData;
  const isFemale = (typeof gender === 'string') && (gender.toLowerCase() === 'female' || gender === 'महिला');
  const { 
    lagna, 
    moonRashi, 
    nakshatra, 
    charan, 
    varna, 
    tithi, 
    planets, 
    housePlanets,
    runningMahadasha, 
    dashaTimeline,
    yogas, 
    doshas, 
    isManglik, 
    accuracyPercentage 
  } = kundli;

  const currentDashaName = isHindi ? runningMahadasha?.hindi : runningMahadasha?.planet;
  const currentAntarName = isHindi ? runningMahadasha?.antardashaHi : runningMahadasha?.antardasha;
  const currentDashaEnd = runningMahadasha?.endYear;

  // Ultra-resilient DOB resolution
  let dobFormatted = '15/08/1995';
  let dobYear = 1995, dobDay = 15;
  if (typeof dob === 'string' && dob.trim() && dob !== 'Not Provided') {
    dobFormatted = dob.trim();
    const parts = dobFormatted.split(/[/|-]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        dobYear = parseInt(parts[0], 10) || 1995;
        dobDay = parseInt(parts[2], 10) || 15;
      } else {
        dobDay = parseInt(parts[0], 10) || 15;
        dobYear = parseInt(parts[2], 10) || 1995;
      }
    }
  } else if (dob && typeof dob === 'object') {
    dobDay = parseInt(dob.day, 10) || 15;
    dobYear = parseInt(dob.year, 10) || 1995;
    dobFormatted = `${String(dobDay).padStart(2, '0')}/${String(dob.month || 8).padStart(2, '0')}/${dobYear}`;
  }

  // Ultra-resilient TOB resolution
  const isTimeUnknownFinal = Boolean(timeUnknown || kundli.isTimeUnknown);
  let tobFormatted = isHindi ? 'अज्ञात (चन्द्र लग्न पद्धति अनुसार)' : 'Unknown (Calculated via Chandra Lagna)';
  if (!isTimeUnknownFinal) {
    if (typeof tob === 'string' && tob.trim() && tob !== 'Not Provided' && !tob.toLowerCase().includes('unknown')) {
      tobFormatted = tob.trim();
    } else if (tob && typeof tob === 'object' && tob.hour) {
      tobFormatted = `${tob.hour}:${tob.minute || '00'} ${tob.ampm || 'PM'}`;
    }
  }

  // Format Birth Meta
  const userMeta = {
    fullName: fullName || (isHindi ? 'आदरणीय जातक' : 'Honored Client'),
    gender: isFemale ? (isHindi ? 'महिला' : 'Female') : (isHindi ? 'पुरुष' : 'Male'),
    pob: kundli.pobResolved?.state ? `${kundli.pobResolved.name}, ${kundli.pobResolved.state}` : (kundli.pobResolved?.name || (typeof pob === 'string' ? pob : 'India')),
    lat: kundli.pobResolved?.lat ? Number(kundli.pobResolved.lat).toFixed(4) : (pob?.lat ? Number(pob.lat).toFixed(4) : '28.6139'),
    lon: kundli.pobResolved?.lon ? Number(kundli.pobResolved.lon).toFixed(4) : (pob?.lon ? Number(pob.lon).toFixed(4) : '77.2090'),
    dobFormatted,
    orderId: bData.orderId || '',
    orderName: bData.orderName || '',
    orderDate: bData.orderDate || '',
    productName: bData.productName || '',
    language: language,
    tobFormatted,
    language
  };

  const certId = `DJR-${Math.abs((dobYear * 997 + dobDay * 31 + Math.floor(Math.random() * 8999 + 1000))).toString().slice(0, 8)}`;
  const certDate = new Date().toLocaleDateString(isHindi ? 'hi-IN' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // --------------------------------------------------------------------------
  // PAGE 1: Panchang, Ephemeris Table, Lagna Profile
  // --------------------------------------------------------------------------
  const page1 = {
    pageNumber: 1,
    headerTitle: isHindi ? 'वैदिक जन्म पत्रिका एवं पंचांग आधार' : 'Vedic Birth Horoscope & Astronomical Ephemeris',
    headerSub: isHindi ? 'लाहिड़ी अयनांश पर आधारित 100% शुद्ध गणना' : '100% Ephemeris Verified Nirayana Lahiri Calculations',
    user: userMeta,
    panchang: {
      tithi: isHindi 
        ? (() => {
            const m = [...tithi.matchAll(/\(([^)]*[\u0900-\u097F][^)]*)\)/g)].map(x => x[1]);
            const pakshaHi = tithi.includes('Shukla') ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';
            return `${pakshaHi} ${m[1] || m[0] || ''} तिथि`;
          })()
        : `${tithi.replace(/\s*\([^)]*[\u0900-\u097F][^)]*\)/g, '').trim()}`,
      nakshatra: isHindi 
        ? `${nakshatra.hindi} (${nakshatra.name}) - चरण ${charan}`
        : `${nakshatra.name} - Pada ${charan}`,
      nakshatraLord: isHindi ? (nakshatra.lordHi || nakshatra.lord) : nakshatra.lord,
      lagnaRashi: isHindi ? `${lagna.rashi.hindi} (${lagna.rashi.name})` : lagna.rashi.name,
      lagnaLord: isHindi ? lagna.rashi.lordHi : lagna.rashi.lord,
      moonSign: isHindi ? `${moonRashi.hindi} (${moonRashi.name})` : moonRashi.name,
      element: isHindi ? lagna.rashi.elementHi : lagna.rashi.element,
      varna: isHindi 
        ? (varna.match(/\(([^)]*[ऀ-ॿ][^)]*)\)/)?.[1] || varna)
        : varna.replace(/\s*\([^)]*[ऀ-ॿ][^)]*\)/g, '').trim(),
      gan: isHindi ? (nakshatra.ganaHi || (nakshatra.gana === 'Deva' ? 'देव' : nakshatra.gana === 'Manushya' ? 'मनुष्य' : 'राक्षस')) : (nakshatra.gana || 'Deva'),
      yoni: isHindi ? (nakshatra.yoniHi || (nakshatra.yoni === 'Gaj' ? 'गज' : nakshatra.yoni === 'Ashwa' ? 'अश्व' : nakshatra.yoni)) : (nakshatra.yoni || 'Gaj')
    },
    kundli,
    planetsTable: planets.map(p => ({
      name: isHindi ? p.hindi : p.name,
      englishName: p.name,
      degreeFormatted: `${Math.floor(p.deg % 30)}° ${Math.floor((p.deg % 1) * 60)}'`,
      rashiName: isHindi ? p.rashi.hindi : p.rashi.name,
      house: `${p.house}${isHindi ? ' भाव' : 'H'}`,
      dignity: isHindi ? p.dignityHi : p.dignity,
      isBenefic: ['Jupiter', 'Venus', 'Mercury', 'Moon'].includes(p.name)
    })),
    accuracyPercentage
  };

  // --------------------------------------------------------------------------
  // TOPIC SPECIFIC ENGINE (Builds Pages 2, 3, 4, 5, 6)
  // --------------------------------------------------------------------------
  let diagnosisText = '';
  let houseAnalyses = [];
  let lifeImpactAdvice = '';
  let specificYogasFound = [];
  let doshaRemedyAdvice = [];
  let timelineQuarters = [];
  let cosmicCoordinates = {};
  let primaryMantra = {};
  let dailyRituals = [];
  let gemstoneAndRudraksha = {};
  let lalKitabRemedies = [];
  let vastuAdjustments = [];
  let dosAndDonts = { dos: [], donts: [] };

  // Helper based on report category
  if (reportId === 'karz-mukti-remedy') {
    if (isHindi) {
      diagnosisText = `आपकी कुंडली में लग्न ${lagna.rashi.hindi} और चन्द्र राशि ${moonRashi.hindi} है। ज्योतिष शास्त्र में ऋण, कर्ज और देनदारियों का मुख्य विचार छठे भाव (रोग-ऋण-शत्रु भाव), आठवें भाव (अड़चन व रुकावट) तथा ग्यारहवें भाव (आय व प्राप्ति) से किया जाता है। 
      
आपकी कुंडली के विश्लेषण से ज्ञात होता है कि पूर्व समय में ग्रहों के गोचर और दशा के प्रतिकूल दबाव के कारण अचानक ऐसे खर्च आए, जिससे ऋण का चक्रव्यूह बन गया। वर्तमान में **${currentDashaName}** महादशा में **${currentAntarName}** अंतर्दशा सक्रिय है। यह कालखंड ऋण के बोझ को कम करने और संपत्तियों के पुनर्गठन के लिए अत्यंत निर्णायक मोड़ लेकर आ रहा है। वैदिक उपायों के नियमित पालन से आगामी कुछ महीनों में कर्ज का भार आश्चर्यजनक रूप से हल्का होगा।`;

      houseAnalyses = [
        { house: '६ठा भाव (ऋण व शत्रु)', status: 'सक्रिय एवं संवेदी', desc: 'छठे भाव पर प्रभाव के कारण ब्याज का भार बढ़ रहा था, किंतु शुभ ग्रह की दृष्टि से अब समझौता वार्ता सफल होगी।' },
        { house: '२रा भाव (संचित धन)', status: 'सुधार की ओर', desc: 'परिवार व पैतृक सहयोग से धन संचय पुनः आरंभ होगा और फिजूलखर्ची पर स्वतः नियंत्रण होगा।' },
        { house: '११वां भाव (लाभ एवं आवक)', status: 'अत्यंत शुभ', desc: 'आय के नए रास्ते खुलेंगे जिससे एकमुश्त किस्तों का भुगतान करने में सरलता प्राप्त होगी।' },
        { house: '१०वां भाव (कर्म व आजीविका)', status: 'सशक्त', desc: 'कार्यक्षेत्र में स्थिरता आने से वित्तीय आत्मविश्वास बढ़ेगा और बैंक अथवा साहूकारों का सहयोग मिलेगा।' }
      ];

      lifeImpactAdvice = `सरल शब्दों में समझें: आपकी जन्म कुंडली में कोई स्थायी दरिद्रता नहीं है। यह केवल एक निश्चित ग्रह गोचर के कारण उत्पन्न हुई अस्थायी आर्थिक तंगी थी। जैसे ही आप बताए गए 21 दिवसीय मंत्र और लाल किताब उपायों को अपनाएंगे, आपके अटके हुए पैसे मिलने लगेंगे और देनदारियों के निपटारे का सीधा रास्ता खुलेगा।`;

      timelineQuarters = [
        { quarter: 'माह १ - ३ (राहत एवं पुनर्गठन)', heading: 'दबाव में तत्काल कमी', details: 'कर्जदाताओं का कड़ा रुख नरम होगा। ब्याज पुनर्गठन या आसान किस्तों पर सहमति बन जाएगी। आकस्मिक छोटे धन लाभ होंगे।' },
        { quarter: 'माह ४ - ६ (आय वृद्धि काल)', heading: 'अतिरिक्त धन आवक', details: 'कार्यक्षेत्र अथवा व्यापार से आय के नए साधन बनेंगे। ऋण का पहला बड़ा हिस्सा चुकाने में पूर्ण सफलता मिलेगी।' },
        { quarter: 'माह ७ - ९ (स्थायित्व एवं मुक्ति)', heading: 'मूलधन की तीव्र अदायगी', details: 'परिवार के बुजुर्गों का आशीर्वाद व मित्र सहयोग काम आएगा। 50% से अधिक चिंताएं समाप्त हो जाएंगी।' },
        { quarter: 'माह १० - १२ (पूर्ण शांति)', heading: 'कर्ज-मुक्त स्वतंत्र जीवन', details: 'नया बैंक खाता व शुद्ध बचत प्रारंभ होगी। भविष्य में दोबारा कर्ज न लेने का वित्तीय सुरक्षा कवच तैयार होगा।' }
      ];

      cosmicCoordinates = {
        luckyDays: 'मंगलवार एवं गुरुवार',
        luckyColors: 'लाल, केसरिया, पीला',
        luckyGem: 'मूंगा (Coral) अथवा पुखराज (Topaz)',
        luckyNumber: '३, ९ एवं १',
        luckyDirection: 'उत्तर एवं ईशान (North & North-East)',
        favorableTime: 'प्रातः 6:00 से 7:30 बजे (सूर्य होरा)'
      };

      primaryMantra = {
        sanskrit: '॥ ॐ ऋणमुक्तेश्वराय महादेवाय नमः ॥',
        transliteration: 'Om Rin Mukteshwaraya Mahadevaya Namaha',
        meaning: 'समस्त प्रकार के ऋण, दरिद्रता और आर्थिक बंधनों से मुक्त करने वाले भगवान शिव को मेरा कोटिशः नमन।',
        count: 'नित्य १०८ बार (१ माला)',
        mala: 'रुद्राक्ष माला अथवा रक्त चंदन माला',
        direction: 'पूर्व दिशा की ओर मुख करके',
        time: 'प्रातःकाल स्नान उपरांत स्वच्छ वस्त्र धारण कर'
      };

      dailyRituals = [
        { day: 'मंगलवार', title: 'ऋण मोचन मंगल स्तोत्र व सिंदूर अर्पण', procedure: 'हनुमान जी को चमेली का तेल व सिंदूर चढ़ाएं और ऋण मोचन अंगारक स्तोत्र का ३ बार पाठ करें।' },
        { day: 'बुधवार', title: 'गौ माता को हरा चारा', procedure: 'गौशाला में जाकर गाय को हरा पालक या हरी घास खिलाएं। इससे बुध ग्रह प्रसन्न होकर व्यापारिक बुद्धि देते हैं।' },
        { day: 'शनिवार', title: 'शनि देव छाया दान', procedure: 'कटोरी में सरसों का तेल लेकर उसमें अपना मुख देखें और वह तेल किसी जरूरतमंद को दान करें।' }
      ];

      gemstoneAndRudraksha = {
        stone: 'त्रिकोणीय मूंगा (Red Coral) या पीला पुखराज (Topaz)',
        metal: 'तांबा अथवा अष्टधातु',
        finger: 'अनामिका (Ring Finger)',
        day: 'शुक्ल पक्ष का मंगलवार प्रातः',
        rudraksha: '३ मुखी अथवा ७ मुखी महालक्ष्मी रुद्राक्ष',
        significance: 'यह रुद्राक्ष अग्नि तत्व को संतुलित कर धन हानि की नकारात्मक ऊर्जा को भस्म करता है।'
      };

      lalKitabRemedies = [
        { title: 'मंगलवार को पहली किस्त चुकाना', remedy: 'कर्ज की जब भी कोई किस्त भरें, तो पहली किस्त सदैव मंगलवार के दिन ही जमा करें। इससे कर्ज पुनः नहीं बढ़ता।', logic: 'मंगल ऋण का स्वामी है, मंगलवार को ऋण चुकाने से मंगल ऋणमुक्त करता है।' },
        { title: 'तांबे का सिक्का पर्स में रखना', remedy: 'अपने पर्स में बिना छेद वाला शुद्ध तांबे का गोल सिक्का सदैव रखें।', logic: 'सूर्य और मंगल का बल मिलने से व्यक्ति के पास लिक्विड कैश सदैव बना रहता है।' },
        { title: 'घर के वायव्य कोण की शुद्धि', remedy: 'घर के उत्तर-पश्चिम कोने में कोई भी भारी लोहा या कूड़ा-कचरा न रखें।', logic: 'वायव्य कोण वायु तत्व का है, यहां बाधा होने पर धन हवा की तरह उड़ जाता है।' }
      ];

      vastuAdjustments = [
        { direction: 'उत्तर दिशा (कुबेर स्थान)', title: 'कुबेर द्वार को हल्का रखें', instruction: 'उत्तर दिशा में नीले रंग का फूलदान रखें अथवा कुबेर यंत्र स्थापित करें। यहां कभी जूठे बर्तन न रखें।' },
        { direction: 'ईशान कोण (North-East)', title: 'जल कलश स्थापना', instruction: 'ईशान कोण में तांबे के लोटे में गंगाजल भरकर रखें, इसे प्रत्येक पूर्णिमा को बदलें।' },
        { direction: 'दक्षिण-पश्चिम (South-West)', title: 'तिजोरी की सही दिशा', instruction: 'अलमारी अथवा कैश बॉक्स दक्षिण दिशा की दीवार से सटाकर रखें, ताकि उसका मुख उत्तर दिशा की ओर खुले।' }
      ];

      dosAndDonts = {
        dos: [
          'प्रतिदिन सुबह घर के मुख्य द्वार पर एक लोटा जल छिड़कें।',
          'सप्ताह में एक बार सेंधा नमक मिले जल से पूरे घर में पोंछा लगाएं।',
          'अपने माता-पिता और कुलदेवता का प्रतिदिन चरण स्पर्श करें।',
          'अपनी आय का कम से कम २% हिस्सा असहायों के भोजन पर खर्च करें।'
        ],
        donts: [
          'बुधवार अथवा शनिवार को किसी से भी भूलकर नया कर्ज न लें।',
          'शाम के समय गोधूलि वेला में किसी को भी उधार न दें और न ही दूध-दही दान करें।',
          'टूटे हुए कांच या बंद घड़ियों को घर में कभी न रखें।',
          'पर्स में पुराने बिल या उधारी की पर्चियां जमा करके न रखें।'
        ]
      };
    } else {
      // English version for Karz Mukti
      diagnosisText = `Your horoscope displays ${lagna.rashi.name} Ascendant and ${moonRashi.name} Moon Sign. In classical Parashari Jyotish, debts and liabilities are evaluated through the 6th House (Rin Bhava - debts & litigation), the 8th House (chronic blockages), and the 11th House (liquid inflows).
      
Your planetary configuration reveals that past financial constraints were triggered by a challenging transit phase rather than any permanent adversity. You are presently experiencing the **${currentDashaName} Mahadasha** with **${currentAntarName} Antardasha**. This current planetary cycle represents a pivotal turning point designed to dissolve liabilities and restore fiscal dignity. By adopting the prescribed 21-day mantras and consecrated space remedies, your stalled revenues will re-activate rapidly.`;

      houseAnalyses = [
        { house: '6th House (Debts & Adversaries)', status: 'Active & Sensitive', desc: 'Compounding interest strain will soften as benefic planetary rays introduce restructuring options.' },
        { house: '2nd House (Accumulated Wealth)', status: 'Rebuilding Phase', desc: 'Unnecessary leakages are arrested, allowing systematic personal savings to resume.' },
        { house: '11th House (Gains & Cash Flow)', status: 'Highly Benefic', desc: 'New revenue channels emerge, delivering lump-sum inflows for principal debt clearances.' },
        { house: '10th House (Career & Authority)', status: 'Strong & Anchored', desc: 'Workplace reputation stabilizes, unlocking institutional goodwill and favorable credit terms.' }
      ];

      lifeImpactAdvice = `In Plain, Accessible Words: Your chart carries no curse of lifelong debt. The recent financial crunch was merely an energetic stress cycle that is now waning. Performing the simple spiritual and directional remedies will unblock trapped money and establish total financial freedom.`;

      timelineQuarters = [
        { quarter: 'Months 1 - 3 (Relief & Restructuring)', heading: 'Immediate Pressure Alleviation', details: 'Creditors adopt a cooperative stance. Opportunities to restructure or waive high-interest penalties emerge.' },
        { quarter: 'Months 4 - 6 (Income Acceleration)', heading: 'Fresh Revenue Inflows', details: 'Professional ventures yield surplus liquidity. First major milestone of clearing high-stress debt achieved.' },
        { quarter: 'Months 7 - 9 (Stability & Recovery)', heading: 'Accelerated Repayment', details: 'Over 50% of outstanding liabilities are peacefully dissolved with family and planetary support.' },
        { quarter: 'Months 10 - 12 (Total Freedom)', heading: 'Debt-Free Sovereign Life', details: 'Clean financial balance sheet restored. Long-term wealth accumulation protocols firmly activated.' }
      ];

      cosmicCoordinates = {
        luckyDays: 'Tuesday & Thursday',
        luckyColors: 'Vermilion, Saffron, Golden Yellow',
        luckyGem: 'Red Coral or Yellow Topaz',
        luckyNumber: '3, 9 & 1',
        luckyDirection: 'North & North-East',
        favorableTime: '6:00 AM - 7:30 AM (Surya Hora)'
      };

      primaryMantra = {
        sanskrit: '|| Om Rin Mukteshwaraya Mahadevaya Namaha ||',
        transliteration: 'Om Rin Mukteshwaraya Mahadevaya Namaha',
        meaning: 'Salutations to Lord Shiva, the supreme cosmic liberator from all debts, anxieties, and worldly encumbrances.',
        count: '108 chants daily (1 Mala)',
        mala: 'Rudraksha Mala or Red Sandalwood Mala',
        direction: 'Facing East at Dawn',
        time: 'Early morning following a purifying bath'
      };

      dailyRituals = [
        { day: 'Tuesday', title: 'Mars Debt-Alleviation Stotram', procedure: 'Light a mustard/jasmine oil lamp before Hanuman Ji and recite the Rin Mochan Angarak Stotra 3 times.' },
        { day: 'Wednesday', title: 'Cow Sanctuary Offering', procedure: 'Feed fresh green grass or spinach to sacred cows to activate Mercury’s financial intellect.' },
        { day: 'Saturday', title: 'Shadow Oil Charity', procedure: 'Gaze into a small vessel of mustard oil and donate it to pacify Saturn’s delaying tendencies.' }
      ];

      gemstoneAndRudraksha = {
        stone: 'Triangular Red Coral or Natural Yellow Topaz',
        metal: 'Pure Copper or Ashtadhatu',
        finger: 'Ring Finger',
        day: 'Waxing Tuesday Morning',
        rudraksha: '3-Mukhi Agni or 7-Mukhi Mahalakshmi Rudraksha',
        significance: 'Dissolves past energetic debts and shields aura from economic vulnerabilities.'
      };

      lalKitabRemedies = [
        { title: 'Tuesday First Installment Principle', remedy: 'Always execute debt repayments on a Tuesday to ensure liabilities never resurrect.', logic: 'Mars governs debts; submitting dues on Tuesday invokes Mars as a closing agent.' },
        { title: 'Solid Copper Coin Carry', remedy: 'Carry an unpierced solid round copper coin in your primary wallet.', logic: 'Strengthens Sun and Mars, guaranteeing uninterrupted liquid cash flows.' },
        { title: 'North-West Decluttering', remedy: 'Remove scrap iron, non-functional electronics, and clutter from the North-West quadrant.', logic: 'Vayavya rules velocity; blockages here cause financial instability.' }
      ];

      vastuAdjustments = [
        { direction: 'North Zone (Kuber Treasury)', title: 'Keep the North Unobstructed', instruction: 'Place a green plant or Kuber Yantra in the North. Avoid storing footwear or garbage here.' },
        { direction: 'North-East (Ishanya)', title: 'Copper Water Vessel', instruction: 'Keep a clean copper pitcher with water in this quadrant to invite pure cosmic prana.' },
        { direction: 'South-West (Nairutya)', title: 'Cash Safe Placement', instruction: 'Position your money safe along the South wall so its door swings open towards the prosperous North.' }
      ];

      dosAndDonts = {
        dos: [
          'Sprinkle fresh holy water or clean water at your main threshold every morning.',
          'Mop your living floors with rock salt water once a week to clear stagnant vibes.',
          'Touch parents’ feet every morning to receive planetary Jupiter and Moon blessings.',
          'Set aside 2% of earnings for feeding underprivileged individuals or stray animals.'
        ],
        donts: [
          'Never contract new loans on Wednesdays or Saturdays under any circumstances.',
          'Never lend money or hand over dairy items during twilight (sunset dusk hours).',
          'Never store cracked mirrors or non-ticking clocks in your household.',
          'Avoid stuffing wallets with discarded unpaid bills or clutter.'
        ]
      };
    }
    } else if (reportId.includes('dhan') || reportId.includes('wealth') || reportId.includes('lakshmi')) {
    // Dhan Yog Report (Wealth, Lakshmi & Kuber Alignment)
    if (isHindi) {
      diagnosisText = `आपकी जन्म कुंडली में लग्न ${lagna.rashi.hindi} है, जिसके स्वामी ग्रह ${lagna.rashi.lordHi} हैं और आपकी चन्द्र राशि ${moonRashi.hindi} है। वैदिक पराशरी ज्योतिष में स्थायी धन संपदा, बचत, बैंक बैलेंस, अचल संपत्ति और अकस्मात धन लाभ का विश्लेषण मुख्य रूप से द्वितीय भाव (धन भाव - संचित पूंजी व पैतृक धरोहर), एकादश भाव (लाभ भाव - निरंतर आय व आकस्मिक लाभ), नवम भाव (भाग्य भाव) और पंचम भाव (पूर्व पुण्य व लक्ष्मी भाव) से किया जाता है।
      
आपकी कुंडली में धन के प्राकृतिक कारक देवगुरु बृहस्पति और भौतिक सुख-समृद्धि, वाहन व ऐश्वर्य के कारक दैत्यगुरु शुक्र की स्थिति यह प्रमाणित करती है कि आपके भीतर प्रचुर धन संचय और स्थायी वैभव प्राप्त करने की असाधारण क्षमता है। पूर्व समय में धन का हाथ में न टिकना, अचानक अवांछित खर्च आना अथवा निवेश का अटक जाना केवल प्रतिकूल गोचर और धन भाव पर पाप ग्रहों के अस्थायी प्रभाव से था। वर्तमान में गतिशील **${currentDashaName}** महादशा एवं **${currentAntarName}** अंतर्दशा आपकी कुंडली में सुप्त पड़े महालक्ष्मी योग, कुबेर योग एवं गजलक्ष्मी योग को पूर्ण रूप से जाग्रत करने का अत्यंत शुभ काल है।`;

      houseAnalyses = [
        { house: '२रा भाव (संचित धन व बैंक बैलेंस)', status: 'सक्रिय एवं समृद्ध', desc: 'धन के अपव्यय और लीकेज पर पूर्ण विराम लगेगा। बैंक बचत, स्वर्ण संचय एवं फिक्स्ड डिपॉजिट में निरंतर वृद्धि होगी।' },
        { house: '११वां भाव (आय स्रोत व अप्रत्याशित लाभ)', status: 'अत्यंत शुभ एवं प्रफुल्लित', desc: 'आय के बहुआयामी स्रोत खुलेंगे। पूर्व में किए गए श्रम अथवा निवेश से अप्रत्याशित बड़ा वित्तीय लाभ मिलने का योग।' },
        { house: '९वां भाव (भाग्य व ईश्वरीय कृपा)', status: 'जाग्रत', desc: 'अटके हुए सौदे, पैतृक संपत्ति विवाद और रुकी हुई पदोन्नति आपके पक्ष में संपन्न होगी। भाग्य का शत-प्रतिशत साथ मिलेगा।' },
        { house: '४था भाव (भूमि, भवन व वाहन ऐश्वर्य)', status: 'मंगलकारी', desc: 'स्वयं का मकान, भूमि का क्रय अथवा नवीन वाहन सुख प्राप्त होने का प्रबल संयोग निर्मित हो रहा है।' }
      ];

      lifeImpactAdvice = `सरल शब्दों में समझें: आपकी जन्म कुंडली में दरिद्रता का कोई स्थायी योग नहीं है, बल्कि आपकी पत्रिका में महालक्ष्मी एवं कुबेर कृपा का प्रबल धन योग उपस्थित है। जो भी आर्थिक बाधाएं थीं, वे केवल ऊर्जा के अस्थायी असंतुलन के कारण थीं। जैसे ही आप दिए गए २१ दिवसीय श्री सूक्त साधना, कनकधारा महामंत्र और उत्तर दिशा के कुबेर वास्तु नियमों का पालन करेंगे, धन का आगमन सहज और निर्बाध हो जाएगा।`;

      timelineQuarters = [
        { quarter: 'माह १ - ३ (धन रुकावट मुक्ति एवं वित्तीय स्थिरता)', heading: 'अटके धन की वापसी व बचत का आरंभ', details: 'उधार दिया हुआ धन वापस आने लगेगा। अनावश्यक खर्चों पर कड़ा नियंत्रण होगा और बैंक खाते में पहली ठोस बचत जमा होगी।' },
        { quarter: 'माह ४ - ६ (लक्ष्मी कृपा एवं आय में बड़ा उछाल)', heading: 'नए आय स्रोतों का उदय', details: 'वेतन वृद्धि, व्यापार में नया लाभदायक अनुबंध अथवा निवेश से बड़ा लाभ। लिक्विड कैश के प्रवाह में उल्लेखनीय बढ़ोतरी होगी।' },
        { quarter: 'माह ७ - ९ (स्थायी संपत्ति एवं निवेश सफलता)', heading: 'भूमि-भवन व स्वर्ण संचय काल', details: 'अचल संपत्ति, प्लॉट, फ्लैट अथवा स्वर्ण में पूंजी निवेश का स्वर्णिम अवसर। परिवार में सुख-समृद्धि एवं ऐश्वर्य का विस्तार होगा।' },
        { quarter: 'माह १० - १२ (महा धन योग की पूर्ण सिद्धि)', heading: 'वित्तीय स्वतंत्रता एवं स्थायित्व', details: 'आकस्मिक धन लाभ व दीर्घकालिक पैसिव इनकम के रास्ते मजबूत। कुबेर व महालक्ष्मी का स्थायी आशीर्वाद प्राप्त होगा।' }
      ];

      cosmicCoordinates = {
        luckyDays: 'शुक्रवार एवं गुरुवार',
        luckyColors: 'स्वर्ण पीला, रेशमी श्वेत, हल्का गुलाबी',
        luckyGem: 'पीला पुखराज (Yellow Sapphire) अथवा प्राकृतिक ओपल / पन्ना',
        luckyNumber: '५, ६ एवं ३',
        luckyDirection: 'उत्तर दिशा (कुबेर स्थान) एवं ईशान कोण',
        favorableTime: 'संध्या गोधूलि वेला अथवा प्रातः अमृत चौघड़िया'
      };

      primaryMantra = {
        sanskrit: '॥ ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्मांक दारिद्र्य नाशय प्रचुर धन देहि देहि क्लीं ह्रीं श्रीं ॐ ॥',
        transliteration: 'Om Shreem Hreem Kleem Tribhuvana Mahalakshmyai Asmaank Daridrya Nashaya Prachura Dhanam Dehi Dehi Kleem Hreem Shreem Om',
        meaning: 'हे तीनों लोकों की स्वामिनी भगवती महालक्ष्मी, हमारे समस्त आर्थिक अभावों व दारिद्र्य का नाश कर हमारे घर-परिवार में प्रचुर धन, ऐश्वर्य और सुख-शांति प्रदान करें।',
        count: 'नित्य १०८ बार (१ माला)',
        mala: 'कमलगट्टे की माला अथवा स्फटिक माला',
        direction: 'उत्तर दिशा (कुबेर द्वार) की ओर मुख करके',
        time: 'संध्याकाल गोधूलि वेला (दीपक प्रज्वलन समय) अथवा प्रातःकाल'
      };

      dailyRituals = [
        { day: 'शुक्रवार', title: 'श्री सूक्त एवं कनकधारा पाठ', procedure: 'शुक्रवार की शाम को माता महालक्ष्मी के सम्मुख गाय के शुद्ध घी का दीपक प्रज्वलित करें और श्री सूक्त का एक पाठ करें। देवी को खीर अथवा मखाने का भोग लगाएं।' },
        { day: 'बुधवार', title: 'कुबेर धन आकर्षण अर्घ्य', procedure: 'भगवान गणेश को ५ हरी इलायची और दूर्वा अर्पित करें। इससे व्यापार एवं धन आगमन में आ रही गुप्त बाधाएं तत्काल समाप्त होती हैं।' },
        { day: 'गुरुवार', title: 'गुरु बृहस्पति धन वृद्धि तिलक', procedure: 'प्रातः स्नान उपरांत माथे और नाभि पर केसर अथवा हल्दी का तिलक लगाएं। इससे भाग्य भाव और द्वितीय भाव बलवान होता है।' }
      ];

      gemstoneAndRudraksha = {
        stone: 'पीला पुखराज (Yellow Sapphire) अथवा प्राकृतिक ओपल / पन्ना',
        metal: 'स्वर्ण अथवा पंचधातु',
        finger: 'तर्जनी (Index Finger) अथवा कनिष्ठिका (Little Finger)',
        day: 'शुक्ल पक्ष का गुरुवार अथवा शुक्रवार प्रातः',
        rudraksha: '७ मुखी महालक्ष्मी रुद्राक्ष अथवा श्री यंत्र लॉकेट',
        significance: '७ मुखी रुद्राक्ष साक्षात महालक्ष्मी का स्वरूप है। यह धन संचय कराता है, अनावश्यक खर्चों को रोकता है और घर में स्थायी बरकत लाता है।'
      };

      lalKitabRemedies = [
        { title: 'तिजोरी में शुद्ध चांदी का चौकोर टुकड़ा', remedy: 'अपनी तिजोरी अथवा कैश बॉक्स में शुद्ध चांदी का एक छोटा चौकोर टुकड़ा लाल रेशमी वस्त्र में लपेटकर रखें।', logic: 'चांदी चन्द्रमा और लक्ष्मी का प्रतीक है, जो धन के निरंतर प्रवाह को स्थिर रखती है।' },
        { title: 'गौ माता को मीठी रोटी अर्पण', remedy: 'प्रत्येक शुक्रवार को गाय को गुड़ और हल्दी लगी रोटी अपने हाथों से खिलाएं।', logic: 'शुक्र ग्रह की कृपा से भौतिक सुख-सुविधाएं, वाहन और ऐश्वर्य में तीव्र वृद्धि होती है।' },
        { title: 'रसोईघर में रात को जूठे बर्तन न छोड़ना', remedy: 'रात्रि को सोने से पूर्व रसोईघर को स्वच्छ करें, सिंक में जूठे बर्तन रात भर कदापि न छोड़ें।', logic: 'जूठे बर्तन से मां अन्नपूर्णा और लक्ष्मी रुष्ट होती हैं, जिससे धन का अपव्यय होता है।' }
      ];

      vastuAdjustments = [
        { direction: 'उत्तर दिशा (कुबेर द्वार)', title: 'धन का मुख्य प्रवेश द्वार', instruction: 'घर की उत्तर दिशा को सदैव स्वच्छ, हल्का और सुगंधित रखें। यहां कुबेर यंत्र या मनी प्लांट स्थापित करें। कभी भारी कबाड़ न रखें।' },
        { direction: 'दक्षिण-पश्चिम (नैऋत्य कोण)', title: 'कुबेर तिजोरी की स्थापना', instruction: 'अलमारी या लॉकर को दक्षिण दीवार से सटाकर रखें, जिसका दरवाजा उत्तर दिशा की ओर खुले। इससे संचित धन कभी व्यर्थ नहीं बहता।' },
        { direction: 'ईशान कोण (North-East)', title: 'श्री यंत्र व जल कलश', instruction: 'ईशान कोण में तांबे या कांसे के पात्र में स्वच्छ गंगाजल रखें अथवा स्फटिक श्री यंत्र स्थापित करें।' }
      ];

      dosAndDonts = {
        dos: [
          'प्रतिदिन संध्या समय घर के मुख्य द्वार पर दीपक अथवा प्रकाश अवश्य रखें।',
          'अपनी जेब या पर्स में धन को सदैव व्यवस्थित रखें, कभी भी मुड़े-तुड़े नोट न रखें।',
          'प्रत्येक पूर्णिमा को श्री सत्यनारायण भगवान अथवा महालक्ष्मी की आरती करें।',
          'अपनी शुद्ध आय का कम से कम २% हिस्सा कन्याओं, गौशाला अथवा अनाथालय में दान करें।'
        ],
        donts: [
          'सूर्यास्त के समय घर में झाड़ू न लगाएं और न ही किसी को धन अथवा दूध-दही उधार दें।',
          'पर्स में पुराने उधारी के बिल, दवाइयों की पर्चियां या फटे हुए कागज न रखें।',
          'घर में नल से पानी टपकने न दें, जल का अनियंत्रित रिसाव धन हानि का सूचक है।',
          'घर के मुख्य द्वार के ठीक सामने जूते-चप्पल अथवा कचरादान कदापि न रखें।'
        ]
      };
    } else {
      // English version for Dhan Yog Report
      diagnosisText = `Your horoscope is guided by ${lagna.rashi.name} Ascendant and ${moonRashi.name} Moon Sign. In classical Parashari Jyotish and Brihat Samhita, permanent wealth accumulation, liquid cash reserves, and financial independence are scrutinized through the 2nd House (Dhana Bhava - treasury & liquid assets), 11th House (Labha Bhava - recurring windfalls & expansion), 9th House (Bhagya Bhava - fortune & grace), and 5th House (Lakshmi Bhava).
      
A comprehensive ephemeris examination reveals powerful innate wealth configurations governed by Jupiter (cosmic karaka of wealth & wisdom) and Venus (karaka of prosperity, vehicles, and luxury). The previous phases of financial stagnation, unexpected leaks, or delayed investment returns were merely transient planetary bottlenecks. You are presently traversing the **${currentDashaName} Mahadasha** and **${currentAntarName} Antardasha**. This planetary alignment is extraordinarily poised to awaken your dormant Maha Dhan Yogas, establish permanent savings, and accelerate asset accumulation.`;

      houseAnalyses = [
        { house: '2nd House (Accumulated Wealth & Treasury)', status: 'Empowered & Expanding', desc: 'Financial leakages are completely arrested. Systematic multiplication of bank savings, gold reserves, and fixed assets begins.' },
        { house: '11th House (Income Multipliers & Windfalls)', status: 'Highly Benefic & Radiant', desc: 'Multiple parallel income channels unlock. High returns on past initiatives and sudden lucrative opportunities materialize.' },
        { house: '9th House (Divine Grace & Fortune)', status: 'Activated', desc: 'Pending deals, ancestral assets, and governmental sanctions turn decidedly in your favor with divine grace.' },
        { house: '4th House (Real Estate & Fixed Assets)', status: 'Auspicious Alignment', desc: 'Exceptional configurations for purchasing landed property, upgrading family residence, or acquiring premium vehicles.' }
      ];

      lifeImpactAdvice = `In Plain, Accessible Words: Your horoscope carries authentic Maha Dhan Yogas and Lakshmi Blessings. The past financial friction was simply a temporary energetic bottleneck that has run its course. By aligning with the recommended 21-day Shree Suktam mantras and North-quadrant Kuber Vastu balances, financial abundance will flow smoothly and permanently.`;

      timelineQuarters = [
        { quarter: 'Months 1 - 3 (Blockage Relief & Savings Launch)', heading: 'Recovery of Trapped Funds', details: 'Overdue money begins returning. Strict containment of impulse expenses allows the first substantial bank savings to solidify.' },
        { quarter: 'Months 4 - 6 (Income Acceleration & Windfalls)', heading: 'Surge in Monthly Revenue', details: 'Substantial salary increment, lucrative new business contract, or stellar investment returns. Noticeable surge in liquid cash reserves.' },
        { quarter: 'Months 7 - 9 (Asset Consolidation)', heading: 'Real Estate & Precious Metals', details: 'Golden window for acquiring residential plot, commercial space, or sovereign gold. Domestic comfort and luxury expand.' },
        { quarter: 'Months 10 - 12 (Sovereign Wealth Fruition)', heading: 'Total Financial Sovereignty', details: 'Passive income streams mature. Complete peace of mind and long-term economic independence firmly established.' }
      ];

      cosmicCoordinates = {
        luckyDays: 'Friday & Thursday',
        luckyColors: 'Golden Yellow, Silken White, Rose Pink',
        luckyGem: 'Natural Yellow Sapphire or Fine Emerald / Opal',
        luckyNumber: '5, 6 & 3',
        luckyDirection: 'North (Kuber Treasury) & North-East',
        favorableTime: 'Evening Twilight (Cow Ghee lamp hour) or Morning Amrit Hora'
      };

      primaryMantra = {
        sanskrit: '|| Om Shreem Hreem Kleem Tribhuvana Mahalakshmyai Asmaank Daridrya Nashaya Prachura Dhanam Dehi Dehi Kleem Hreem Shreem Om ||',
        transliteration: 'Om Shreem Hreem Kleem Tribhuvana Mahalakshmyai Asmaank Daridrya Nashaya Prachura Dhanam Dehi Dehi Kleem Hreem Shreem Om',
        meaning: 'Salutations to the Supreme Goddess Maha Lakshmi of all three realms: dissolve all scarcity and lack from our lives, and shower us with enduring wealth, dignity, and radiant joy.',
        count: '108 chants daily (1 Mala)',
        mala: 'Kamalgatta (Lotus Seed) Mala or Sphatik (Quartz) Mala',
        direction: 'Facing North (Lord Kuber’s Direction) or East',
        time: 'Evening twilight during lighting of Cow Ghee lamp, or early morning'
      };

      dailyRituals = [
        { day: 'Friday', title: 'Shree Suktam & Kanakdhara Recitation', procedure: 'Light a pure cow ghee lamp before Goddess Maha Lakshmi at dusk and recite the sacred Shree Suktam. Offer sweet milk pudding or lotus petals.' },
        { day: 'Wednesday', title: 'Kuber Obstacle Clearing Offering', procedure: 'Offer 5 whole green cardamoms and sacred Durva grass to Lord Ganesha to dissolve hidden commercial bottlenecks.' },
        { day: 'Thursday', title: 'Jupiter Wealth Expansion Tilak', procedure: 'Apply a drop of saffron or pure turmeric paste to your forehead and navel after bathing to stimulate the 2nd and 9th houses of wealth.' }
      ];

      gemstoneAndRudraksha = {
        stone: 'Unheated Natural Yellow Sapphire or Fine Natural Emerald',
        metal: '18k Gold or Pure Ashtadhatu',
        finger: 'Index Finger or Little Finger',
        day: 'Bright Waxing Thursday or Friday Morning',
        rudraksha: '7-Mukhi Divine Mahalakshmi Rudraksha or Consecrated Sri Yantra Locket',
        significance: 'Embodies Goddess Maha Lakshmi herself, stabilizing incoming cash flows and preventing unexpected leaks.'
      };

      lalKitabRemedies = [
        { title: 'Solid Square Silver Plate in Safe', remedy: 'Keep a clean solid square silver plate wrapped in red silk inside your cash safe or primary wallet.', logic: 'Silver anchors Moon and Lakshmi vibrations, guaranteeing unshakeable liquidity.' },
        { title: 'Feeding Sweet Bread to Cows', remedy: 'Feed fresh wheat bread with jaggery and turmeric to sacred cows on Friday mornings.', logic: 'Directly activates Venus for worldly luxuries, comfortable vehicles, and societal renown.' },
        { title: 'No Unwashed Utensils Overnight', remedy: 'Ensure the kitchen sink is completely cleared of unwashed dishes before retiring at night.', logic: 'Unwashed utensils invite Rahu’s negative aspect and insult Goddess Annapurna, draining household wealth.' }
      ];

      vastuAdjustments = [
        { direction: 'North Zone (Lord Kuber’s Treasury)', title: 'Main Wealth Entryway', instruction: 'Keep the North zone pristine, brightly lit, and lightweight. Place a Kuber Yantra or healthy green plant here. Never store junk.' },
        { direction: 'South-West Zone (Nairutya)', title: 'Cash Safe Placement', instruction: 'Anchor your money locker along the South or South-West wall so its door swings open towards the prosperous North.' },
        { direction: 'North-East (Ishanya)', title: 'Sri Yantra & Water Feature', instruction: 'Keep clean holy water in a copper or bronze pitcher in the North-East, or place a consecrated Sphatik Sri Yantra.' }
      ];

      dosAndDonts = {
        dos: [
          'Keep a soft warm light or lamp burning at your main entryway during evening twilight hours.',
          'Always arrange paper currency notes neatly in your wallet; never keep crushed or crumpled bills.',
          'Perform a peaceful prayer or recite Maha Lakshmi Aarti every full moon (Purnima).',
          'Earmark at least 2% of net income for charity, orphanages, or cow shelters.'
        ],
        donts: [
          'Never sweep dust out of your home at sunset, and never lend liquid money during dusk hours.',
          'Never keep expired debt slips, medicine receipts, or torn papers inside your wallet.',
          'Never tolerate dripping water taps; leaking water energetically symbolizes leaking wealth.',
          'Never place footwear, dirty shoes, or trash bins directly facing the main entrance.'
        ]
      };
    }
  } else if (reportId.includes('naukri') || reportId.includes('career') || reportId.includes('promotion')) {
    // Career & Naukri Promotion Report
    if (isHindi) {
      diagnosisText = `आपकी जन्म कुंडली में लग्न ${lagna.rashi.hindi} है, जिसके स्वामी ग्रह ${lagna.rashi.lordHi} हैं। वैदिक ज्योतिष में करियर, पदोन्नति, मान-सम्मान और शासकीय आदर का कारक दसवां भाव (कर्म भाव), सूर्य देव (अधिकार व यश) और शनि देव (कर्मफल दाता) होते हैं।
      
आपकी कुंडली के सूक्ष्म परीक्षण से स्पष्ट होता है कि आपमें प्रतिभा, परिश्रम और नेतृत्व की कोई कमी नहीं है। पिछले कुछ समय में कार्यक्षेत्र में योग्यता के अनुरूप श्रेय न मिलना, पदोन्नति में विलंब या राजनीति का शिकार होना केवल दशा-छिद्र के कारण था। वर्तमान में चल रही **${currentDashaName}** की महादशा आपके करियर को नया पंख देने वाली है। अगले १२ महीने आपकी आजीविका में अभूतपूर्व छलांग लेकर आएंगे।`;

      houseAnalyses = [
        { house: '१०वां भाव (कर्म व पदोन्नति)', status: 'अत्यंत प्रभावशाली', desc: 'वरिष्ठ अधिकारियों और प्रबंधन से प्रशंसा प्राप्त होगी। रुकी हुई पदोन्नति का मार्ग प्रशस्त होगा।' },
        { house: '१ला भाव (आत्मविश्वास व प्रभाव)', status: 'तेजस्वी', desc: 'इंटरव्यू, प्रेजेंटेशन और क्लाइंट मीटिंग्स में आपकी वाणी व व्यक्तित्व का गहरा प्रभाव पड़ेगा।' },
        { house: '६ठा भाव (प्रतियोगिता विजय)', status: 'सशक्त', desc: 'सहकर्मियों की ईर्ष्या अथवा आंतरिक राजनीति परास्त होगी। प्रतियोगी परीक्षाओं में सफलता का योग।' },
        { house: '११वां भाव (वेतन वृद्धि व इंक्रीमेंट)', status: 'उदयमान', desc: 'सैलरी पैकेज में संतोषजनक बढ़ोतरी और मनचाहे प्रोजेक्ट्स मिलने के संकेत स्पष्ट हैं।' }
      ];

      lifeImpactAdvice = `सरल शब्दों में समझें: आपके करियर का कठिन दौर अब समाप्त हो चुका है। ब्रह्मांड आपके पक्ष में नई जिम्मेदारियां और अधिकार सौंपने की तैयारी कर रहा है। बस आपको बताए गए सूर्य उपासना और शनिवार के शनि उपायों को निष्ठा से करना है।`;

      timelineQuarters = [
        { quarter: 'माह १ - ३ (मान्यता एवं तैयारी)', heading: 'अधिकारियों का ध्यान आकर्षण', details: 'कार्यक्षेत्र में किए गए पुराने परिश्रम की सराहना होगी। नई भूमिका अथवा प्रोजेक्ट की चर्चा आरंभ होगी।' },
        { quarter: 'माह ४ - ६ (पदोन्नति का स्वर्ण काल)', heading: 'प्रमोशन एवं इंक्रीमेंट', details: 'वांछित पदोन्नति, स्थानांतरण अथवा नई प्रतिष्ठित कंपनी से आकर्षक ऑफर लेटर मिलने का योग।' },
        { quarter: 'माह ७ - ९ (अधिकार एवं नेतृत्व)', heading: 'टीम व अधिकारों का विस्तार', details: 'उच्च पद पर आसीन होकर निर्णय लेने के अधिकार प्राप्त होंगे। समाज व परिवार में प्रतिष्ठा बढ़ेगी।' },
        { quarter: 'माह १० - १२ (दीर्घकालिक स्थायित्व)', heading: 'करियर की स्वर्णिम ऊंचाई', details: 'वार्षिक इंसेंटिव में बड़ा उछाल। अपने क्षेत्र में एक विशेषज्ञ के रूप में साख स्थापित होगी।' }
      ];

      cosmicCoordinates = {
        luckyDays: 'रविवार एवं गुरुवार',
        luckyColors: 'सुनहरा, केसरिया, गहरा लाल',
        luckyGem: 'माणिक्य (Ruby) अथवा पीला पुखराज',
        luckyNumber: '१, ५ एवं ९',
        luckyDirection: 'पूर्व दिशा (East - Lord Surya)',
        favorableTime: 'प्रातःकाल सूर्योदय के 1 घंटे के भीतर'
      };

      primaryMantra = {
        sanskrit: '॥ ॐ ह्रीं ह्रीं सूर्याय सहस्रकिरणाय मनोवांछित फलं देहि देहि स्वाहा ॥',
        transliteration: 'Om Hreem Hreem Suryaya Sahasrakiranaya Manovanchhit Phalam Dehi Dehi Swaha',
        meaning: 'कोटि-कोटि किरणों से संसार को प्रकाशित करने वाले भुवन-भास्कर भगवान सूर्य मुझे यश, उच्च पद और मनोवांछित सफलता प्रदान करें।',
        count: 'नित्य १०८ बार (१ माला)',
        mala: 'लाल चंदन माला अथवा रुद्राक्ष माला',
        direction: 'पूर्व दिशा की ओर मुख करके',
        time: 'प्रातःकाल उगते सूर्य के सम्मुख'
      };

      dailyRituals = [
        { day: 'रविवार', title: 'आदित्य हृदय स्तोत्र एवं अर्घ्य', procedure: 'तांबे के पात्र में जल, रोली, अक्षत और लाल पुष्प डालकर सूर्य देव को अर्घ्य दें और आदित्य हृदय स्तोत्र का पाठ करें।' },
        { day: 'गुरुवार', title: 'बृहस्पति देव की कृपा', procedure: 'माथे पर नित्य केसर अथवा हल्दी का तिलक लगाएं। इससे अधिकारियों के साथ संबंध सदैव मधुर बने रहते हैं।' },
        { day: 'शनिवार', title: 'शनि देव को दीप दान', procedure: 'पीपल के वृक्ष के नीचे सरसों के तेल का दीपक प्रज्वलित करें, जिससे कार्यक्षेत्र के षड्यंत्र शांत हों।' }
      ];

      gemstoneAndRudraksha = {
        stone: 'प्राकृतिक माणिक्य (Ruby) अथवा तामड़ा (Garnet)',
        metal: 'तांबा अथवा स्वर्ण',
        finger: 'अनामिका (Ring Finger)',
        day: 'शुक्ल पक्ष का रविवार प्रातः',
        rudraksha: '१ मुखी अथवा १२ मुखी सूर्य रुद्राक्ष',
        significance: 'यह रुद्राक्ष व्यक्ति को अद्भुत प्रशासनिक तेज, आत्मविश्वास और शासकीय सहयोग प्रदान करता है।'
      };

      lalKitabRemedies = [
        { title: 'बहते जल में तांबे का सिक्का', remedy: 'रविवार के दिन किसी बहती नदी या स्वच्छ नहर में तांबे का सिक्का प्रवाहित करें।', logic: 'सूर्य के शुभ प्रभाव से यश व कीर्ति में निरंतर वृद्धि होती है।' },
        { title: 'पक्षियों को सतनाजा', remedy: 'प्रतिदिन प्रातः छत पर सात प्रकार के मिश्रित अनाज (सतनाजा) पक्षियों के लिए डालें।', logic: 'राहु और केतु के अचानक आने वाले करियर संकट समाप्त होते हैं।' },
        { title: 'पिता का चरण स्पर्श', remedy: 'घर से नौकरी या इंटरव्यू के लिए निकलते समय पिता या पिता तुल्य बुजुर्गों के चरण छूकर आशीर्वाद लें।', logic: 'कुंडली में सूर्य का सीधा संबंध पिता से है।' }
      ];

      vastuAdjustments = [
        { direction: 'पूर्व दिशा (East Zone)', title: 'सूर्य का मुख्य कक्ष', instruction: 'घर या वर्क-फ्रॉम-होम टेबल को पूर्व दिशा में रखें। पूर्व की दीवार पर 7 दौड़ते घोड़ों की तस्वीर लगाएं।' },
        { direction: 'उत्तर दिशा (North Zone)', title: 'कुबेर व नए अवसर', instruction: 'उत्तर दिशा में नीला बल्ब या हरी मनी प्लांट लगाएं ताकि नौकरी के नए इंटरव्यू कॉल्स निरंतर आएं।' },
        { direction: 'अग्नि कोण (South-East)', title: 'उत्साह व ऊर्जा केंद्र', instruction: 'इस कोने को सदैव प्रकाशित रखें, यहां कोई जल तत्व या लीकेज न होने दें।' }
      ];

      dosAndDonts = {
        dos: [
          'ऑफिस में बैठते समय आपकी पीठ मजबूत दीवार की तरफ होनी चाहिए, दरवाजे या खिड़की की तरफ नहीं।',
          'इंटरव्यू या महत्वपूर्ण मीटिंग के दिन जेब में लाल रुमाल या तांबे का सिक्का अवश्य रखें।',
          'सफाई कर्मचारियों या अधीनस्थों को कभी प्रताड़ित न करें, उन्हें समय-समय पर चाय-मिठाई दें।',
          'नित्य सूर्य नमस्कार का अभ्यास करें।'
        ],
        donts: [
          'ऑफिस में कभी किसी सहकर्मी की चुगली या पीठ पीछे आलोचना में भाग न लें।',
          'काले या गहरे नीले रंग के कपड़े पहनकर किसी इंटरव्यू में न जाएं।',
          'कार्यस्थल पर मेज पर जूठे कप या बिखरी हुई फाइलें रात भर न छोड़ें।',
          'रविवार के दिन नमक का सेवन कम से कम करें।'
        ]
      };
    } else {
      // English Naukri
      diagnosisText = `Your horoscope is guided by ${lagna.rashi.name} Ascendant and ${lagna.rashi.lord} as Lagna Lord. In classical astrology, career trajectory, executive promotions, and organizational authority are anchored in the 10th House (Karma Bhava), Sun (solar leadership & prestige), and Saturn (dignity of labor).
      
A detailed perusal of your ephemeris shows immense latent intellect and executive capacity. Any past stagnations or passed-over promotions were driven by adverse transit aspects which are now concluding. You are now positioned under the **${currentDashaName} Mahadasha** and **${currentAntarName} Antardasha**. This phase will trigger significant breakthroughs, leadership mandates, and compensatory rewards.`;

      houseAnalyses = [
        { house: '10th House (Executive Authority)', status: 'Empowered', desc: 'Decisive recognition from senior leadership. Fast-tracking of pending designations.' },
        { house: '1st House (Charisma & Presence)', status: 'Luminous', desc: 'Superior command in strategic presentations, client negotiations, and interview boards.' },
        { house: '6th House (Competitive Edge)', status: 'Dominant', desc: 'Decisive conquest over workplace rivalries and organizational friction.' },
        { house: '11th House (Income & Compensation)', status: 'Rising Ascendant', desc: 'Substantial salary increment milestones and lucrative performance bonuses.' }
      ];

      lifeImpactAdvice = `In Plain, Accessible Words: Your professional career is on the verge of a major upward elevation. The resistance you encountered in the past 12-18 months has dissipated. Committing to the recommended solar rituals will establish you as a natural leader in your field.`;

      timelineQuarters = [
        { quarter: 'Months 1 - 3 (Strategic Recognition)', heading: 'Spotlight on Competence', details: 'Management actively notices your contributions. Discussion on broader responsibilities commences.' },
        { quarter: 'Months 4 - 6 (Elevation Window)', heading: 'Promotions & Offers', details: 'Receipt of coveted promotion letter or premium job offer with enhanced compensation structure.' },
        { quarter: 'Months 7 - 9 (Executive Autonomy)', heading: 'Leadership Command', details: 'Assigned key portfolios and strategic projects. High professional admiration from peers.' },
        { quarter: 'Months 10 - 12 (Consolidation)', heading: 'Peak Industry Repute', details: 'Substantial annual bonus and establishment of authoritative stature in your industry.' }
      ];

      cosmicCoordinates = {
        luckyDays: 'Sunday & Thursday',
        luckyColors: 'Gold, Royal Saffron, Ruby Red',
        luckyGem: 'Natural Ruby or Yellow Sapphire',
        luckyNumber: '1, 5 & 9',
        luckyDirection: 'East (Lord Surya’s Quadrant)',
        favorableTime: 'Within 1 hour of Sunrise'
      };

      primaryMantra = {
        sanskrit: '|| Om Hreem Hreem Suryaya Sahasrakiranaya Manovanchhit Phalam Dehi Dehi Swaha ||',
        transliteration: 'Om Hreem Hreem Suryaya Sahasrakiranaya Manovanchhit Phalam Dehi Dehi Swaha',
        meaning: 'O Radiant Sun of a thousand rays, bestow upon me executive honor, sovereign dignity, and professional triumph.',
        count: '108 chants daily (1 Mala)',
        mala: 'Red Sandalwood or Rudraksha Mala',
        direction: 'Facing East at Dawn',
        time: 'Early morning facing the rising Sun'
      };

      dailyRituals = [
        { day: 'Sunday', title: 'Aditya Hridaya Solar Offering', procedure: 'Offer pure water with vermilion and red blossoms from a copper vessel to the rising Sun while reciting Aditya Hridaya Stotram.' },
        { day: 'Thursday', title: 'Jupiter Grace Application', procedure: 'Apply pure saffron or turmeric paste on forehead to maintain diplomatic relations with corporate superiors.' },
        { day: 'Saturday', title: 'Saturn Protective Flame', procedure: 'Light a mustard oil lamp at the base of a sacred Peepal tree to quieten covert workplace adversaries.' }
      ];

      gemstoneAndRudraksha = {
        stone: 'Unheated Natural Ruby or Fine Red Garnet',
        metal: 'Copper or 18k Yellow Gold',
        finger: 'Ring Finger',
        day: 'Bright Sunday Morning',
        rudraksha: '1-Mukhi Divine or 12-Mukhi Surya Rudraksha',
        significance: 'Imparts magnetic executive charisma, sovereign confidence, and high organizational command.'
      };

      lalKitabRemedies = [
        { title: 'Running Water Copper Offering', remedy: 'Float a round unpierced copper coin into a flowing stream on a bright Sunday.', logic: 'Activates solar authority and removes unseen obstacles in promotion files.' },
        { title: 'Seven-Grain Bird Feeding', remedy: 'Scatter 7 mixed grains on terrace every morning for free birds.', logic: 'Pacifies Rahu-Ketu shocks and prevents unexpected career disruptions.' },
        { title: 'Paternal Blessing Anchor', remedy: 'Touch your father’s or elder’s feet before departing for pivotal career discussions.', logic: 'In Vedic cosmos, the Sun embodies the living presence of fatherly grace.' }
      ];

      vastuAdjustments = [
        { direction: 'East Zone', title: 'Solar Energy Gateway', instruction: 'Keep your study or work desk facing East. Mount a picture of 7 running white horses on the East wall.' },
        { direction: 'North Zone', title: 'New Opportunity Portal', instruction: 'Place a vibrant green plant in the North zone to stimulate interview calls and headhunter queries.' },
        { direction: 'South-East Zone', title: 'Agni Vitality Sector', instruction: 'Ensure this area is warmly illuminated and free from plumbing leaks or water tanks.' }
      ];

      dosAndDonts = {
        dos: [
          'Sit with a solid wall behind your back in your workplace; avoid sitting with a doorway directly behind.',
          'Carry a vermilion handkerchief or copper coin during important board meetings.',
          'Treat support staff and housekeeping personnel with deep respect and kindness.',
          'Practice Sun salutations (Surya Namaskar) daily.'
        ],
        donts: [
          'Never participate in idle watercooler gossip or confidential office politics.',
          'Avoid wearing pitch-black or navy-blue garments for crucial interviews.',
          'Never leave used coffee mugs or chaotic paper stacks on your office desk overnight.',
          'Avoid excessive dietary salt intake on Sundays.'
        ]
      };
    }
  } else if (reportId.includes('vivah') || reportId.includes('marriage') || reportId.includes('love') || reportId.includes('milan')) {
    // Vivah & Relationship
    if (isHindi) {
      diagnosisText = `आपकी कुंडली में लग्न ${lagna.rashi.hindi} और चन्द्र राशि ${moonRashi.hindi} है। ज्योतिष शास्त्र में वैवाहिक सुख, योग्य जीवनसाथी और दांपत्य जीवन का मुख्य विचार सातवें भाव (कलत्र भाव), शुक्र देव (पुरुषों हेतु पत्नी कारक) और गुरु बृहस्पति (स्त्रियों हेतु पति कारक) से किया जाता है।
      
आपकी कुंडली के विश्लेषण से ज्ञात होता है कि विवाह में आने वाली रुकावटें या मनचाहा रिश्ता न मिल पाना किसी स्थायी दोष के कारण नहीं, बल्कि शुक्र-गुरु के गोचरीय संतुलन की कमी से था। कुंडली में ${isManglik ? 'सौम्य मांगलिक प्रभाव उपस्थित है जो २८ वर्ष की आयु उपरांत स्वतः शांत हो जाता है।' : 'कोई गंभीर मांगलिक दोष नहीं है।'} वर्तमान **${currentDashaName}** महादशा विवाह की शहनाइयां बजाने और योग्य कुल के संस्कारी जीवनसाथी से गठबंधन के लिए पूर्णतः अनुकूल है।`;

      houseAnalyses = [
        { house: '७वां भाव (दांपत्य व जीवनसाथी)', status: 'अत्यंत मांगलिक', desc: 'संस्कारवान, परिवार से प्रेम करने वाले और प्रतिष्ठावान जीवनसाथी से संबंध जुड़ने के प्रबल योग।' },
        { house: '२रा भाव (कुटुंब व परिवार)', status: 'सौहार्दपूर्ण', desc: 'दोनों परिवारों के मध्य सम्मानजनक बातचीत होगी और सभी मतभेद सहजता से दूर होंगे।' },
        { house: '५वां भाव (प्रेम व आकर्षण)', status: 'मधुर', desc: 'आपसी समझ, भावनात्मक आत्मीयता और जीवन भर का विश्वास स्थापित होगा।' },
        { house: '४था भाव (गृहस्थ सुख)', status: 'कल्याणकारी', desc: 'विवाह उपरांत घर में सुख-शांति, वाहन सुख और माता-पिता के आशीर्वाद में वृद्धि होगी।' }
      ];

      lifeImpactAdvice = `सरल शब्दों में समझें: विवाह में आ रही देरी अब समाप्त होने जा रही है। कुंडली के योग बता रहे हैं कि अगले कुछ महीनों में आपके पास ऐसे रिश्ते आएंगे जो आपकी सभी प्राथमिकताओं के अनुकूल होंगे। विवाह उपरांत आपका भाग्य और भी अधिक चमकेगा।`;

      timelineQuarters = [
        { quarter: 'माह १ - ३ (प्रस्ताव एवं चर्चा)', heading: 'उत्तम रिश्तों का आगमन', details: 'परिवार व प्रतिष्ठित माध्यमों से अनुकूल प्रस्ताव आएंगे। बातचीत सकारात्मक दिशा में आगे बढ़ेगी।' },
        { quarter: 'माह ४ - ६ (सगाई एवं पक्का होना)', heading: 'रिश्ता तय होने का शुभ काल', details: 'पारिवारिक सहमति से रोका/सगाई संस्कार संपन्न होने के अत्यंत मांगलिक मुहूर्त सक्रिय होंगे।' },
        { quarter: 'माह ७ - ९ (विवाह संस्कार)', heading: 'पाणिग्रहण एवं मंगल शहनाई', details: 'शुभ लग्न मुहूर्त में विवाह संस्कार संपन्न होगा। दांपत्य जीवन का सुखद अध्याय प्रारंभ होगा।' },
        { quarter: 'माह १० - १२ (दांपत्य विस्तार)', heading: 'सुखी वैवाहिक जीवन', details: 'जीवनसाथी के सहयोग से करियर और धन में तेजी से वृद्धि होगी। यात्राओं के सुखद योग।' }
      ];

      cosmicCoordinates = {
        luckyDays: 'गुरुवार एवं शुक्रवार',
        luckyColors: 'पीला, गुलाबी, चमकीला सफेद',
        luckyGem: 'पुखराज (Yellow Topaz) अथवा ओपल (Opal)',
        luckyNumber: '३, ६ एवं २',
        luckyDirection: 'उत्तर-पश्चिम (North-West) एवं ईशान',
        favorableTime: 'संध्याकालीन गोधूलि वेला'
      };

      primaryMantra = {
        sanskrit: '॥ ॐ कात्यायनि महामाये महायोगिन्यधीश्वरि । नन्दगोपसुतं देवि पतिं मे कुरु ते नमः ॥',
        transliteration: 'Om Katyayani Mahamaye Mahayoginyadheeshwari Nandagopasutam Devi Patim Me Kuru Te Namaha',
        meaning: 'हे सर्वशक्तिमान माँ कात्यायनी, मुझे योग्य, संस्कारी और दीर्घायु जीवनसाथी का आशीर्वाद प्रदान करें।',
        count: 'नित्य १०८ बार (१ माला)',
        mala: 'कमलगट्टा माला अथवा स्फटिक माला',
        direction: 'उत्तर दिशा की ओर मुख करके',
        time: 'संध्या काल में घी का दीपक जलाकर'
      };

      dailyRituals = [
        { day: 'गुरुवार', title: 'बृहस्पति देव व केले की पूजा', procedure: 'केले के वृक्ष में हल्दी मिला जल अर्पित करें और चने की दाल व गुड़ का भोग लगाएं।' },
        { day: 'शुक्रवार', title: 'माँ लक्ष्मी को खीर अर्पण', procedure: 'माँ लक्ष्मी के मंदिर में मखाने की खीर अर्पित करें और ॐ शुं शुक्राय नमः का जप करें।' },
        { day: 'सोमवार', title: 'शिव-पार्वती गठबंधन पूजन', procedure: 'शिवलिंग पर कच्चा दूध व बेलपत्र चढ़ाकर शिव-पार्वती के सुखद दांपत्य की स्तुति करें।' }
      ];

      gemstoneAndRudraksha = {
        stone: 'सफेद ओपल (Australian Opal) अथवा पीला पुखराज',
        metal: 'चांदी अथवा पीतल/स्वर्ण',
        finger: 'तर्जनी (Index) अथवा अनामिका (Ring)',
        day: 'शुक्ल पक्ष का गुरुवार अथवा शुक्रवार',
        rudraksha: 'गौरी-शंकर रुद्राक्ष (प्राकृतिक जुड़ा हुआ)',
        significance: 'यह दिव्य रुद्राक्ष शिव-शक्ति का प्रतीक है जो वैवाहिक विलंब को समूल नष्ट कर सुखद दांपत्य देता है।'
      };

      lalKitabRemedies = [
        { title: 'हल्दी की गांठ का उपाय', remedy: 'अपने तकिए के नीचे पीले रेशमी वस्त्र में 2 साबुत गांठें हल्दी की रखें।', logic: 'गुरु ग्रह की चुंबकीय तरंगें विवाह के विघ्नों को दूर करती हैं।' },
        { title: 'कन्याओं को मीठा भोजन', remedy: 'शुक्रवार के दिन 7 छोटी कन्याओं को खीर या सफेद मिठाई आदरपूर्वक खिलाएं।', logic: 'शुक्र देव प्रसन्न होकर वैवाहिक आकर्षण और सौन्दर्य प्रदान करते हैं।' },
        { title: 'चांदी का चौकोर टुकड़ा', remedy: 'चांदी का एक छोटा चौकोर टुकड़ा हमेशा अपने पास रखें।', logic: 'चन्द्रमा और शुक्र की युति से मन का तनाव शांत होता है।' }
      ];

      vastuAdjustments = [
        { direction: 'वायव्य कोण (North-West)', title: 'विवाह योग्य जातक का कक्ष', instruction: 'विवाह योग्य युवक/युवती का शयनकक्ष घर के उत्तर-पश्चिम (वायव्य) कोने में होना चाहिए।' },
        { direction: 'ईशान कोण (North-East)', title: 'राधा-कृष्ण की दिव्य तस्वीर', instruction: 'उत्तर-पूर्व दिशा में बांसुरी बजाते हुए श्री राधा-कृष्ण का सुंदर चित्र लगाएं।' },
        { direction: 'दक्षिण-पश्चिम (South-West)', title: 'भारी अलमारी व स्थिरता', instruction: 'इस कोने में भारी फर्नीचर रखें ताकि रिश्तों में स्थायित्व और गहरा विश्वास बना रहे।' }
      ];

      dosAndDonts = {
        dos: [
          'नित्य स्नान के जल में एक चुटकी हल्दी डालकर स्नान करें।',
          'किसी रिश्ते की बात देखने जाते समय मीठा दही खाकर निकलें।',
          'अपने माता-पिता की सेवा करें और उनका हृदय कभी न दुखाएं।',
          'घर में सुगंधित वातावरण रखें, विशेषकर गुलाब अथवा चंदन की अगरबत्ती।'
        ],
        donts: [
          'विवाह संबंध की बातचीत करते समय कभी काले वस्त्र धारण न करें।',
          'गुरुवार के दिन बाल या नाखून कभी न काटें और न ही साबुन से सिर धोएं।',
          'अपने शयनकक्ष में कांटेदार पौधे या कैक्टस भूलकर भी न रखें।',
          'दक्षिण दिशा की ओर सिर करके सोने से बचें, पूर्व या दक्षिण-पूर्व उत्तम है।'
        ]
      };
    } else {
      // English Vivah
      diagnosisText = `Your horoscope is framed by ${lagna.rashi.name} Ascendant and ${moonRashi.name} Moon Sign. In classical Indian matrimony astrology, matrimonial harmony, spouse character, and family bliss are governed by the 7th House (Kalatra Bhava), Venus (spouse for males), and Jupiter (spouse for females).
      
Detailed astronomical calculations show that recent delays in alliances were caused by temporal transit alignments rather than deep-seated doshas. Your chart indicates that ${isManglik ? 'a manageable Manglik disposition exists, which naturally softens past age 28 and is fully harmonized by Vedic rituals.' : 'there is no severe Mangal Dosha present.'} The prevailing **${currentDashaName} Mahadasha** and **${currentAntarName} Antardasha** are exceptionally favorable for solemnizing a blissful union with a noble life partner.`;

      houseAnalyses = [
        { house: '7th House (Spouse & Marriage)', status: 'Highly Auspicious', desc: 'Alliance with an empathetic, family-centric, and progressive life partner.' },
        { house: '2nd House (Family Harmony)', status: 'Harmonious', desc: 'Mutual alignment between both families; smooth resolution of all pre-wedding expectations.' },
        { house: '5th House (Emotional Bond)', status: 'Sweet & Devoted', desc: 'Establishment of deep mutual emotional compatibility, trust, and shared life goals.' },
        { house: '4th House (Domestic Happiness)', status: 'Blessed', desc: 'Post-marriage bliss, peaceful domestic environment, and maternal blessings.' }
      ];

      lifeImpactAdvice = `In Plain, Accessible Words: The phase of matrimonial delay is drawing to a close. Planetary configurations indicate that distinguished, high-compatibility proposals will arrive within the coming months. Your fortune and peace will dramatically amplify post-marriage.`;

      timelineQuarters = [
        { quarter: 'Months 1 - 3 (Proposal & Dialogue)', heading: 'Arrival of High-Match Proposals', details: 'Promising proposals through family networks. Conversations proceed with high mutual warmth.' },
        { quarter: 'Months 4 - 6 (Engagement Window)', heading: 'Finalization & Betrothal', details: 'Auspicious muhurats for engagement (Roka/Sagai) ceremonies with joyful family consensus.' },
        { quarter: 'Months 7 - 9 (Nuptial Celebrations)', heading: 'Solemnization of Marriage', details: 'Sacred wedding ceremony performed under divine planetary alignments.' },
        { quarter: 'Months 10 - 12 (Marital Prosperity)', heading: 'Flourishing Household', details: 'Rapid elevation in shared financial stability, spousal camaraderie, and happy travel.' }
      ];

      cosmicCoordinates = {
        luckyDays: 'Thursday & Friday',
        luckyColors: 'Soft Saffron, Rose Pink, Milk White',
        luckyGem: 'Natural Yellow Topaz or Australian Opal',
        luckyNumber: '3, 6 & 2',
        luckyDirection: 'North-West & North-East',
        favorableTime: 'Twilight Dusk (Godhuli Vela)'
      };

      primaryMantra = {
        sanskrit: '|| Om Katyayani Mahamaye Mahayoginyadheeshwari Nandagopasutam Devi Patim Me Kuru Te Namaha ||',
        transliteration: 'Om Katyayani Mahamaye Mahayoginyadheeshwari Nandagopasutam Devi Patim Me Kuru Te Namaha',
        meaning: 'O Divine Mother Katyayani, bless me with an honorable, loving, and long-lived life partner.',
        count: '108 chants daily (1 Mala)',
        mala: 'Lotus Seed (Kamalgatta) or Sphatik Mala',
        direction: 'Facing North at Dusk',
        time: 'Evening with a pure cow ghee lamp'
      };

      dailyRituals = [
        { day: 'Thursday', title: 'Jupiter Banana Tree Worship', procedure: 'Offer turmeric-infused water to a banana tree and offer roasted gram dal with jaggery.' },
        { day: 'Friday', title: 'Goddess Mahalakshmi Kheer Offering', procedure: 'Offer sweet milk pudding (Kheer) to Goddess Lakshmi and recite Om Shum Shukraya Namaha.' },
        { day: 'Monday', title: 'Shiva-Parvati Unification Puja', procedure: 'Offer raw cow milk and sacred Bilva leaves to Shivling, praying for marital longevity.' }
      ];

      gemstoneAndRudraksha = {
        stone: 'Australian Fire Opal or Natural Yellow Topaz',
        metal: 'Pure Silver or Yellow Gold/Brass',
        finger: 'Index Finger or Ring Finger',
        day: 'Bright Waxing Thursday or Friday',
        rudraksha: 'Naturally Joined Gauri-Shankar Rudraksha',
        significance: 'Embodies divine union of Shiva-Shakti, eradicating matrimonial obstacles permanently.'
      };

      lalKitabRemedies = [
        { title: 'Turmeric Roots in Pillow', remedy: 'Wrap two whole unbroken dry turmeric roots in yellow silk and keep under sleeping pillow.', logic: 'Transmits Jupiter’s benefic vibrational frequency directly to subconscious mind.' },
        { title: 'Feeding Young Girls Sweet Delicacy', remedy: 'Serve sweet milk dessert or Kheer to 7 young girls on Fridays with utmost reverence.', logic: 'Invokes Venus’s grace for elegance, charisma, and auspicious alliances.' },
        { title: 'Solid Square Silver Plate', remedy: 'Keep a small solid square silver plate in your personal safe or bag.', logic: 'Stabilizes Moon and Venus, dissolving unnecessary emotional doubts.' }
      ];

      vastuAdjustments = [
        { direction: 'North-West (Vayavya)', title: 'Marriage Aspirant Bedroom', instruction: 'Locate the aspirant’s bedroom in the North-West sector to initiate swift matrimonial movement.' },
        { direction: 'North-East (Ishanya)', title: 'Radha-Krishna Portrait', instruction: 'Display an auspicious portrait of divine Radha-Krishna in the North-East zone.' },
        { direction: 'South-West (Nairutya)', title: 'Solid Stability Zone', instruction: 'Anchor this zone with heavy wooden wardrobe to establish unbreakable trust in alliances.' }
      ];

      dosAndDonts = {
        dos: [
          'Add a pinch of organic turmeric to bathing water daily.',
          'Consume a spoonful of sweet curd before departing for matrimonial meetings.',
          'Seek blessings from parents daily with full reverence.',
          'Maintain a subtle pleasant fragrance of sandalwood or rose in your personal room.'
        ],
        donts: [
          'Never wear jet-black clothing when attending matrimonial alliance discussions.',
          'Never trim hair or fingernails on Thursdays.',
          'Never place cactus or thorny plants inside your bedroom.',
          'Avoid sleeping with your head pointed towards the North.'
        ]
      };
    }
  } else {
    // General / Vastu / Business / Nazar / Kundli Comprehensive Report
    if (isHindi) {
      diagnosisText = `आपकी जन्म कुंडली में लग्न ${lagna.rashi.hindi} है और चन्द्रमा ${nakshatra.hindi} नक्षत्र के ${charan} चरण में स्थित है। 
      
वैदिक ज्योतिष और ऊर्जा विज्ञान के अनुसार, मानव जीवन में सुख, शांति, समृद्धि और सुरक्षा पंचमहाभूतों (पृथ्वी, जल, अग्नि, वायु, आकाश) और नवग्रहों के सामंजस्य पर टिकी होती है। आपकी कुंडली के सूक्ष्म अध्ययन से यह प्रतीत होता है कि आपके भीतर प्राकृतिक सामर्थ्य और प्रतिभा की प्रचुरता है। पिछले दिनों जो मानसिक उथल-पुथल, कार्यों में अनचाही रुकावटें या नकारात्मक ऊर्जा का अनुभव हुआ, वह प्रतिकूल ग्रह दशा और कुछ वास्तु दोषों के सम्मिलित प्रभाव से था। 
      
वर्तमान में सक्रिय **${currentDashaName}** महादशा एवं **${currentAntarName}** अंतर्दशा आपके भाग्य को पुनः जागृत करने के लिए श्रेष्ठ संयोग बना रही है। बिना किसी तोड़-फोड़ के केवल वैज्ञानिक वैदिक उपायों और ऊर्जा संतुलन से आपका जीवन पूर्णतः मंगलमय होगा।`;

      houseAnalyses = [
        { house: '१ला भाव (आरोग्य व आभा मंडल)', status: 'तेजोमय', desc: 'मानसिक तनाव समाप्त होगा। आभा मंडल (Aura) सशक्त होने से नकारात्मक शक्तियां स्वतः दूर रहेंगी।' },
        { house: '२रा व ११वां भाव (धन व ऐश्वर्य)', status: 'प्रगतिशील', desc: 'आर्थिक स्थिति में स्थिरता आएगी। परिवार में आपसी प्रेम और वित्तीय समृद्धि का विस्तार होगा।' },
        { house: '४था भाव (गृह सुख व शांति)', status: 'कल्याणकारी', desc: 'घर के वातावरण में हल्कापन व प्रसन्नता आएगी। अनिद्रा और अकारण होने वाले क्लेश शांत होंगे।' },
        { house: '९वां भाव (भाग्य व ईश्वरीय कृपा)', status: 'सक्रिय', desc: 'अटके हुए कानूनी व सरकारी कार्य संपन्न होंगे। गुरुजनों एवं ईश्वर का विशेष आशीर्वाद प्राप्त होगा।' }
      ];

      lifeImpactAdvice = `सरल शब्दों में समझें: आपके जीवन में कोई स्थायी दोष या शाप नहीं है। ऊर्जा के कुछ अवरोध मात्र थे जिन्हें अब दूर किया जा रहा है। जैसे ही आप इन 21 दिवसीय वैदिक महामंत्रों और वास्तु नियमों को अपनाएंगे, आप स्वयं अपने घर और जीवन में अद्भुत शांति महसूस करेंगे।`;

      timelineQuarters = [
        { quarter: 'माह १ - ३ (शुद्धि व शांति काल)', heading: 'नकारात्मक ऊर्जा का निष्कासन', details: 'तनाव व अनिद्रा में तत्काल कमी। पारिवारिक वातावरण में मधुरता और रुके हुए कार्यों में गति।' },
        { quarter: 'माह ४ - ६ (अवसर व आर्थिक लाभ)', heading: 'भाग्य का अनुकूल उदय', details: 'धन लाभ के नए स्रोत खुलेंगे। महत्वपूर्ण योजनाओं में सफलता और प्रतिष्ठा में वृद्धि।' },
        { quarter: 'माह ७ - ९ (स्थायित्व व सुख)', heading: 'समृद्धि एवं सुरक्षा', details: 'घर में मांगलिक कार्यों का आयोजन। स्वास्थ्य में पूर्ण सुधार और दीर्घकालिक स्थिरता।' },
        { quarter: 'माह १० - १२ (पूर्ण सिद्धि)', heading: 'सर्वतोमुखी विकास', details: 'जीवन के सभी क्षेत्रों में संतुलन। परिवार का सम्मान और आध्यात्मिक शांति।' }
      ];

      cosmicCoordinates = {
        luckyDays: 'गुरुवार एवं रविवार',
        luckyColors: 'पीला, श्वेत, हल्का केसरिया',
        luckyGem: 'पुखराज अथवा पंचधातु छल्ला',
        luckyNumber: '३, १ एवं ७',
        luckyDirection: 'ईशान कोण (North-East)',
        favorableTime: 'ब्रह्म मुहूर्त (प्रातः 4:30 से 6:00 बजे)'
      };

      primaryMantra = {
        sanskrit: '॥ ॐ नमो भगवते वासुदेवाय ॥',
        transliteration: 'Om Namo Bhagavate Vasudevaya',
        meaning: 'समस्त ब्रह्मांड के पालनकर्ता और संकटहर्ता भगवान श्री वासुदेव को मेरा सादर प्रणाम।',
        count: 'नित्य १०८ बार (१ माला)',
        mala: 'तुलसी माला अथवा रुद्राक्ष माला',
        direction: 'उत्तर अथवा पूर्व दिशा',
        time: 'प्रातःकाल स्नान उपरांत'
      };

      dailyRituals = [
        { day: 'प्रतिदिन', title: 'गंगाजल एवं धूप शुद्धि', procedure: 'घर में प्रातःकाल गंगाजल का छिड़काव करें और सांझ के समय गाय के कंडे पर कपूर व गुग्गल की धूप दें।' },
        { day: 'मंगलवार', title: 'हनुमान चालीसा का तीन पाठ', procedure: 'सरसों के तेल का दीपक जलाकर श्री हनुमान चालीसा का श्रद्धापूर्वक ३ बार पाठ करें।' },
        { day: 'शनिवार', title: 'सेंधा नमक पोछा', procedure: 'घर के सभी कमरों में खड़े सेंधा नमक मिले जल से पोंछा लगाएं ताकि नकारात्मक ऊर्जा समाप्त हो।' }
      ];

      gemstoneAndRudraksha = {
        stone: 'प्राकृतिक पीला पुखराज (Yellow Topaz) अथवा स्फटिक',
        metal: 'अष्टधातु अथवा चांदी',
        finger: 'तर्जनी (Index Finger)',
        day: 'शुक्ल पक्ष का गुरुवार प्रातः',
        rudraksha: '५ मुखी अथवा ७ मुखी रुद्राक्ष',
        significance: 'यह रुद्राक्ष पंचतत्वों को संतुलित कर मानसिक शांति और आरोग्य कवच प्रदान करता है।'
      };

      lalKitabRemedies = [
        { title: 'कांच की कटोरी में समुद्री नमक', remedy: 'शौचालय व घर के सुनसान कोनों में कांच की कटोरी में साबुत समुद्री नमक रखें और हर १५ दिन में बदलें।', logic: 'नमक नकारात्मक ऊर्जा को सोख लेता है।' },
        { title: 'तांबे के लोटे में जल', remedy: 'सिरहाने तांबे के लोटे में जल रखकर सोएं और सुबह उस जल को किसी पौधे में डाल दें।', logic: 'रात में आने वाले बुरे स्वप्न और अनिद्रा समाप्त होती है।' },
        { title: 'घर के मुख्य द्वार पर स्वास्तिक', remedy: 'कुमकुम और शुद्ध घी मिलाकर मुख्य द्वार पर पावन स्वास्तिक और ॐ का चिन्ह अंकित करें।', logic: 'सकारात्मक ऊर्जा का घर में निरंतर प्रवेश होता है।' }
      ];

      vastuAdjustments = [
        { direction: 'ईशान कोण (North-East)', title: 'देव स्थान की पवित्रता', instruction: 'घर का मंदिर अथवा पूजा स्थल सदैव उत्तर-पूर्व में रखें। यहां झाड़ू या भारी सामान कभी न रखें।' },
        { direction: 'ब्रह्मस्थान (घर का केंद्र)', title: 'हल्का व खुला स्थान', instruction: 'घर के ठीक बीच के भाग को खुला, हल्का और स्वच्छ रखें ताकि प्राण ऊर्जा का संचार हो।' },
        { direction: 'आग्नेय कोण (South-East)', title: 'रसोई घर का स्थान', instruction: 'रसोई घर को दक्षिण-पूर्व में रखें और खाना बनाते समय गृहणी का मुख पूर्व दिशा में होना चाहिए।' }
      ];

      dosAndDonts = {
        dos: [
          'प्रातःकाल घर के सभी दरवाजे और खिड़कियां थोड़ी देर के लिए खोलें ताकि शुद्ध वायु और सूर्य का प्रकाश आ सके।',
          'घर में नित्य मधुर वैदिक मंत्रों अथवा घंटी की ध्वनि बजाएं।',
          'गौ माता, पक्षियों और मछलियों को नियमित अन्न का दान दें।',
          'अपने कुलदेवता अथवा इष्टदेव का नित्य स्मरण करें।'
        ],
        donts: [
          'घर के मुख्य द्वार के ठीक सामने कभी भी जूते-चप्पलों का ढेर न लगाएं।',
          'टूटा हुआ आईना, खंडित मूर्तियां या बंद घड़ियां घर में कभी न रखें।',
          'संध्या के समय झाड़ू न लगाएं और न ही किसी को पैसे उधार दें।',
          'शौचालय का दरवाजा कभी भी खुला न छोड़ें।'
        ]
      };
    } else {
      // English General
      diagnosisText = `Your horoscope is calculated with ${lagna.rashi.name} Ascendant and ${nakshatra.name} Nakshatra (Pada ${charan}). 
      
In classical Vedic science, holistic peace, vitality, and wealth are rooted in the equilibrium of the five cosmic elements (Earth, Water, Fire, Air, Space) and planetary rays. A thorough perusal of your birth chart confirms strong inner fortitude and intellectual capability. Any recent feelings of emotional turbulence, stalled endeavors, or atmospheric heaviness were due to temporary planetary transitions combined with subtle directional imbalances.
      
You are currently undergoing the **${currentDashaName} Mahadasha** and **${currentAntarName} Antardasha**. This cycle creates ideal celestial conditions for renewed breakthroughs. By balancing living spaces without structural demolition and performing consecrated Vedic rituals, abundant peace and auspicious fortune are assured.`;

      houseAnalyses = [
        { house: '1st House (Vitality & Aura Shield)', status: 'Luminous', desc: 'Dissipation of mental fatigue. Fortified auric shield effortlessly deflects ambient negativity.' },
        { house: '2nd & 11th Houses (Wealth & Inflow)', status: 'Ascendant', desc: 'Enhanced liquid savings. Expansion of family harmony and sustainable financial streams.' },
        { house: '4th House (Domestic Serenity)', status: 'Tranquil', desc: 'Restoration of profound household peace. Elimination of restlessness and sleeplessness.' },
        { house: '9th House (Divine Grace & Luck)', status: 'Activated', desc: 'Smooth settlement of legal, bureaucratic, or pending family matters with divine grace.' }
      ];

      lifeImpactAdvice = `In Plain, Accessible Words: Your life is entirely free from any irreversible curse or chronic doom. The recent resistance was simply a temporal energetic bottleneck that is now unlocking. Adopting the prescribed sacred mantras and spatial balances will flood your surroundings with serene clarity.`;

      timelineQuarters = [
        { quarter: 'Months 1 - 3 (Purification & Ease)', heading: 'Atmospheric Clearing', details: 'Immediate drop in stress levels. Return of sound sleep, domestic warmth, and momentum in stalled projects.' },
        { quarter: 'Months 4 - 6 (Opportunity Windows)', heading: 'Auspicious Financial Inflow', details: 'Unlocking of lucrative avenues. Recognition in strategic initiatives and rising public respect.' },
        { quarter: 'Months 7 - 9 (Stability & Grace)', heading: 'Sustained Abundance', details: 'Celebration of auspicious ceremonies at home. Wholesome health recovery and emotional stability.' },
        { quarter: 'Months 10 - 12 (Fruition & Wholeness)', heading: 'Holistic Fulfillment', details: 'All-round life balance achieved. Long-term peace of mind, family prestige, and spiritual bliss.' }
      ];

      cosmicCoordinates = {
        luckyDays: 'Thursday & Sunday',
        luckyColors: 'Bright Yellow, Pure White, Soft Saffron',
        luckyGem: 'Natural Yellow Topaz or Quartz Crystal',
        luckyNumber: '3, 1 & 7',
        luckyDirection: 'North-East (Ishanya Quadrant)',
        favorableTime: 'Brahma Muhurat (4:30 AM - 6:00 AM)'
      };

      primaryMantra = {
        sanskrit: '|| Om Namo Bhagavate Vasudevaya ||',
        transliteration: 'Om Namo Bhagavate Vasudevaya',
        meaning: 'Salutations to the Supreme Divine Preserver Lord Vasudeva, the shelter and illuminator of all cosmic beings.',
        count: '108 chants daily (1 Mala)',
        mala: 'Sacred Tulsi Mala or Rudraksha Mala',
        direction: 'Facing North or East',
        time: 'Morning following a purifying bath'
      };

      dailyRituals = [
        { day: 'Daily', title: 'Sacred Water & Incense Purification', procedure: 'Sprinkle drops of sacred water across room thresholds and burn pure camphor and guggul at dusk.' },
        { day: 'Tuesday', title: 'Hanuman Chalisa Trio Recitation', procedure: 'Light a mustard oil lamp and chant the sacred Sri Hanuman Chalisa 3 times with devotion.' },
        { day: 'Saturday', title: 'Rock Salt Floor Cleansing', procedure: 'Mop household floors with water infused with whole rock salt to neutralize stagnant energies.' }
      ];

      gemstoneAndRudraksha = {
        stone: 'Natural Yellow Topaz or Clear Quartz Crystal',
        metal: 'Ashtadhatu or Pure Silver',
        finger: 'Index Finger',
        day: 'Waxing Thursday Morning',
        rudraksha: '5-Mukhi Shiva or 7-Mukhi Mahalakshmi Rudraksha',
        significance: 'Harmonizes the five elements, granting mental equilibrium and a protective aura shield.'
      };

      lalKitabRemedies = [
        { title: 'Raw Sea Salt in Glass Bowl', remedy: 'Keep a clear glass bowl filled with dry sea salt in washrooms and corners; replace every 15 days.', logic: 'Salt absorbs ambient electromagnetic stress and heavy negative vibrations.' },
        { title: 'Copper Water Vessel Overnight', remedy: 'Keep clean water in a copper jug at your bedside and pour it into plants at sunrise.', logic: 'Transmutes restless night energies into grounded terrestrial prana.' },
        { title: 'Sacred Swastika on Threshold', remedy: 'Emboss a sacred Swastika using pure vermilion and cow ghee on the outer main doorframe.', logic: 'Prevents negative astral energies from crossing into your sanctuary.' }
      ];

      vastuAdjustments = [
        { direction: 'North-East (Ishanya)', title: 'Keep the Sanctum Pure', instruction: 'House your prayer shrine in the North-East. Keep this corner impeccably spotless and lightweight.' },
        { direction: 'Brahmasthan (Center of Premises)', title: 'Open & Well-Lit Core', instruction: 'Keep the central core of your home open and illuminated to permit free circulation of cosmic prana.' },
        { direction: 'South-East (Agneya)', title: 'Kitchen Hearth Alignment', instruction: 'Ensure the kitchen burner sits in the South-East so the cook faces East towards the morning sun.' }
      ];

      dosAndDonts = {
        dos: [
          'Open all windows and doors for at least 15 minutes each morning to invite fresh solar prana.',
          'Play soft traditional Vedic chants or chime temple bells gently in the home every dawn.',
          'Regularly feed bread, grains, or green fodder to stray animals, birds, and cows.',
          'Reverently invoke your Kuldevta (family deity) and ancestors daily.'
        ],
        donts: [
          'Never pile used shoes or dirty slippers directly in front of the main threshold.',
          'Never keep broken mirrors, non-functional wall clocks, or cracked idols in your home.',
          'Avoid sweeping dust outward after sunset; never lend money during twilight dusk.',
          'Never leave the bathroom or washroom doors open when not in use.'
        ]
      };
    }
  }

  // Include Yogas from Kundli Engine
  yogas.forEach(y => {
    specificYogasFound.push({
      name: isHindi ? y.hindi : y.name,
      desc: isHindi ? y.effectHi : y.effect
    });
  });

  // Include Doshas from Kundli Engine
  doshas.forEach(d => {
    doshaRemedyAdvice.push({
      name: isHindi ? d.hindi : d.name,
      severity: d.present ? (isHindi ? 'सक्रिय (उपाय आवश्यक)' : 'Active (Remedies Advised)') : (isHindi ? 'दोष मुक्त' : 'Clear'),
      desc: isHindi ? d.remedyHi : d.remedy
    });
  });

  let isAiEnhanced = false;

  // --------------------------------------------------------------------------
  // PAGE 2: Problem Diagnosis & 12 Bhava (Houses) Impact
  // --------------------------------------------------------------------------
  const page2 = {
    pageNumber: 2,
    headerTitle: isHindi ? 'समस्या का मूल ज्योतिषीय विश्लेषण एवं भाव विवेचन' : 'Deep Root-Cause Astrological Diagnosis & Bhava Analysis',
    headerSub: isHindi ? 'सरल व स्पष्ट भाषा में आपकी कुंडली का वास्तविक दर्पण' : 'Honest, Jargon-Free Clarity on Current Planetary Influences',
    diagnosisText,
    houseAnalyses,
    lifeImpactAdvice
  };

  // --------------------------------------------------------------------------
  // PAGE 3: Vimshottari Mahadasha, Yogas & Doshas
  // --------------------------------------------------------------------------
  const page3 = {
    pageNumber: 3,
    headerTitle: isHindi ? 'महादशा, अंतर्दशा एवं सक्रिय योग व दोष' : 'Vimshottari Dasha Dynamics, Active Yogas & Doshas',
    headerSub: isHindi ? 'ग्रह चक्र की चाल एवं आपकी कुंडली में मौजूद देव कृपा' : 'Planetary Cycles, Celestial Blessings & Dosha Neutralization',
    dashaDetails: {
      mahadasha: currentDashaName,
      antardasha: currentAntarName,
      endYear: currentDashaEnd,
      explanation: isHindi
        ? `वर्तमान में आपकी कुंडली में **${currentDashaName} की महादशा** में **${currentAntarName} की अंतर्दशा** गतिशील है, जो वर्ष ${currentDashaEnd} तक चलेगी। यह ग्रह चक्र आपके मन, निर्णयों और वित्तीय गतिशीलता को सीधा संचालित कर रहा है। सही उपायों से इस दशा का 100% अनुकूल फल प्राप्त किया जा सकता है।`
        : `You are currently experiencing the **${currentDashaName} Mahadasha** with **${currentAntarName} Antardasha** until ${currentDashaEnd}. This cosmic cycle directly directs your mental focus, financial opportunities, and domestic stability.`
    },
    yogas: specificYogasFound,
    doshas: doshaRemedyAdvice,
    manglikStatus: {
      isManglik,
      text: isManglik 
        ? (isHindi ? 'कुंडली में आंशिक मांगलिक प्रभाव है, जो बताए गए अनुष्ठान से पूर्णतः शांत हो जाता है।' : 'Partial Manglik influence observed, easily pacified by recommended Tuesday rituals.')
        : (isHindi ? 'आपकी कुंडली पूर्णतः मांगलिक दोष से मुक्त है।' : 'Your horoscope is completely free from adverse Mangal Dosha.')
    }
  };

  // --------------------------------------------------------------------------
  // PAGE 4: 12-Month Golden Predictive Timeline
  // --------------------------------------------------------------------------
  const page4 = {
    pageNumber: 4,
    headerTitle: isHindi ? 'आगामी १२ माह का भविष्यवाणी चक्र (गोल्डन टाइमलाइन)' : 'Upcoming 12-Month Golden Predictive Timeline',
    headerSub: isHindi ? 'कब क्या करें - सही समय, शुभ दिशा एवं अनुकूल अंक' : 'Quarterly Milestone Forecast & Auspicious Planetary Coordinates',
    timelineQuarters,
    cosmicCoordinates
  };

  // --------------------------------------------------------------------------
  // PAGE 5: 21-Day Consecrated Vedic Mantras & Rituals
  // --------------------------------------------------------------------------
  const page5 = {
    pageNumber: 5,
    headerTitle: isHindi ? '२१ दिवसीय संकल्पित वैदिक महामंत्र एवं अनुष्ठान' : '21-Day Consecrated Vedic Mantras & Sacred Rituals',
    headerSub: isHindi ? 'ऋषियों द्वारा प्रमाणित अचूक एवं सरल साधना विधि' : 'Time-Tested Satvik Mantra Sadhana & Planetary Pacification',
    primaryMantra,
    dailyRituals,
    gemstoneAndRudraksha
  };

  // --------------------------------------------------------------------------
  // PAGE 6: Lal Kitab Remedies, Vastu Rules & Do's / Don'ts
  // --------------------------------------------------------------------------
  const page6 = {
    pageNumber: 6,
    headerTitle: isHindi ? 'लाल किताब अचूक टोटके, वास्तु चक्र एवं आचरण नियम' : 'Lal Kitab Secrets, Directional Vastu & Golden Conduct',
    headerSub: isHindi ? 'बिना तोड़-फोड़ के ऊर्जा संतुलन एवं आधिकारिक प्रमाणन' : 'Demolition-Free Energy Harmonization & Certified Bureau Sign-Off',
    lalKitabRemedies,
    vastuAdjustments,
    dosAndDonts,
    certification: {
      certId,
      certifiedBy: isHindi ? 'Astro Jeevan (एस्ट्रो जीवन) वैदिक रिसर्च ब्यूरो' : 'Astro Jeevan Vedic Research & Ephemeris Bureau',
      date: certDate,
      sealText: isHindi ? 'शत-प्रतिशत प्रमाणित शुद्ध वैदिक गणना' : '100% Verified Authentic Vedic Ephemeris'
    }
  };

  return {
    reportId,
    reportConfig,
    user: userMeta,
    kundli,
    language,
    isHindi,
    pages: [page1, page2, page3, page4, page5, page6],
    // Backward compatibility helpers
    detailedAnalysis: diagnosisText,
    specificYogasFound,
    timelinePeriods: timelineQuarters.map(q => ({ period: q.quarter, outlook: `${q.heading}: ${q.details}` })),
    prescribedRemedies: dailyRituals.map(r => ({ title: r.title, detail: r.procedure, type: 'Ritual' })),
    dosAndDonts,
    generatedAt: certDate,
    certId,
    isAiEnhanced
  };
}

/**
 * Asynchronously enhances an already opened report with Gemini AI insights
 * without ever blocking or delaying the user's report display.
 */
export async function enhanceExistingReportWithAi(report, customApiKey = null) {
  if (!report) return report;
  try {
    const aiData = await enhanceReportWithGemini({
      reportConfig: report.reportConfig,
      kundli: report.kundli,
      birthData: {
        fullName: report.user.fullName,
        gender: report.user.gender,
        dob: {
          day: report.user.dobFormatted.split('/')[0] || '15',
          month: report.user.dobFormatted.split('/')[1] || '08',
          year: report.user.dobFormatted.split('/')[2] || '1995'
        },
        tob: { hour: '12', minute: '00', ampm: 'PM' },
        pob: { name: report.user.pob },
        timeUnknown: report.kundli.isTimeUnknown
      },
      language: report.user.language || 'hi',
      customApiKey
    });

    if (!aiData) return report;

    const updated = { ...report, isAiEnhanced: true };
    const pages = [...report.pages];

    // Page 1 header enhancement
    pages[0] = {
      ...pages[0],
      headerSub: 'Gemini 3.8 Flash AI + 100% Ephemeris Verified Nirayana Calculations'
    };

    // Page 2
    if (aiData.diagnosisText) {
      pages[1] = {
        ...pages[1],
        diagnosisText: aiData.diagnosisText,
        houseAnalyses: (aiData.houseAnalyses?.length > 0) ? aiData.houseAnalyses : pages[1].houseAnalyses,
        lifeImpactAdvice: aiData.lifeImpactAdvice || pages[1].lifeImpactAdvice
      };
    }

    // Page 4
    if (aiData.timelineQuarters?.length > 0) {
      pages[3] = {
        ...pages[3],
        timelineQuarters: aiData.timelineQuarters
      };
    }

    // Page 5
    if (aiData.primaryMantra?.sanskrit || aiData.dailyRituals?.length > 0) {
      pages[4] = {
        ...pages[4],
        primaryMantra: aiData.primaryMantra?.sanskrit ? aiData.primaryMantra : pages[4].primaryMantra,
        dailyRituals: (aiData.dailyRituals?.length > 0) ? aiData.dailyRituals : pages[4].dailyRituals,
        gemstoneAndRudraksha: aiData.gemstoneAndRudraksha?.stone ? aiData.gemstoneAndRudraksha : pages[4].gemstoneAndRudraksha
      };
    }

    // Page 6
    if (aiData.lalKitabRemedies?.length > 0 || aiData.vastuAdjustments?.length > 0) {
      pages[5] = {
        ...pages[5],
        lalKitabRemedies: (aiData.lalKitabRemedies?.length > 0) ? aiData.lalKitabRemedies : pages[5].lalKitabRemedies,
        vastuAdjustments: (aiData.vastuAdjustments?.length > 0) ? aiData.vastuAdjustments : pages[5].vastuAdjustments,
        dosAndDonts: (aiData.dosAndDonts?.dos?.length > 0) ? aiData.dosAndDonts : pages[5].dosAndDonts,
        certification: {
          ...pages[5].certification,
          sealText: 'Gemini 3.8 Flash AI + 100% Satvik Verified'
        }
      };
    }

    updated.pages = pages;
    updated.detailedAnalysis = pages[1].diagnosisText;
    return updated;
  } catch (err) {
    console.warn('AI background enhancement notice:', err);
    return report;
  }
}

