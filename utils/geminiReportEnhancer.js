/**
 * Gemini AI Vedic Astrological Report Enhancer
 * Takes exact astronomical planetary calculations and crafts deeply personalized,
 * hyper-accurate, and compassionate readings in simple language.
 */

export async function enhanceReportWithGemini({
  reportConfig,
  kundli,
  birthData,
  language = 'hi',
  customApiKey = null
}) {
  const apiKey = customApiKey || 
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || 
    (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') : null);

  if (!apiKey || apiKey.trim() === '') {
    // Graceful fallback to built-in high-accuracy engine
    return null;
  }

  const isHindi = language === 'hi';
  const { lagna, moonRashi, nakshatra, charan, planets, runningMahadasha, yogas, doshas, isManglik } = kundli;
  const { fullName, gender, dob, tob, pob, timeUnknown } = birthData;

  const planetsSummary = planets.map(p => 
    `${p.name} (${p.hindi}): ${p.degreeFormatted || p.totalDegree}° in ${p.rashiName} (${p.rashiHindi}), House ${p.house}, Dignity: ${p.dignity}`
  ).join('\n');

  const yogasSummary = yogas.map(y => `${y.name} (${y.hindi})`).join(', ') || 'Standard Favorable Alignments';
  const doshasSummary = doshas.map(d => `${d.name} (${d.hindi}): ${d.severity}`).join(', ') || 'No Major Adverse Doshas';

  const systemPrompt = `You are a revered, compassionate Vedic Jyotish Master (वैदिक ज्योतिषी आचार्य) with 40+ years of classical Parashari, Jaimini, and Lal Kitab astrological scholarship.
Your goal is to provide a deeply personalized, authentic, uncannily accurate, and emotionally uplifting astrological analysis for a client.
Avoid terrifying fatalistic language; focus on empowerment, practical clarity, and satvik remedies.
Provide all content in ${isHindi ? 'pure, easy-to-understand Hindi (देवनागरी लिपि)' : 'clear, elegant, jargon-free English'}.
You must output valid JSON ONLY matching the requested schema.`;

  const userPrompt = `Generate a personalized, deep astrological reading for the following client and specific report topic:

REPORT TOPIC: ${reportConfig.title} (${reportConfig.titleHi})
CLIENT DETAILS:
- Name: ${fullName}
- Gender: ${gender}
- Date of Birth: ${dob.day}/${dob.month}/${dob.year}
- Time of Birth: ${timeUnknown ? 'Unknown (Chandra Kundli Analysis)' : `${tob.hour}:${tob.minute} ${tob.ampm}`}
- Place of Birth: ${pob?.name || 'India'}

ASTRONOMICAL KUNDLI EPHEMERIS:
- Ascendant (Lagna): ${lagna.rashi.name} (${lagna.rashi.hindi})
- Moon Sign (Rashi): ${moonRashi.name} (${moonRashi.hindi})
- Nakshatra: ${nakshatra.name} (${nakshatra.hindi}) - Pada ${charan}
- Running Mahadasha: ${runningMahadasha?.planet} (${runningMahadasha?.hindi}) until year ${runningMahadasha?.endYear}
- Running Antardasha: ${runningMahadasha?.antardasha} (${runningMahadasha?.antardashaHi})
- Planetary Placements:
${planetsSummary}
- Active Yogas: ${yogasSummary}
- Active Doshas: ${doshasSummary}
- Manglik Status: ${isManglik ? 'Partial Manglik' : 'Non-Manglik'}

Please generate a JSON object with this exact structure:
{
  "diagnosisText": "Detailed 2-3 paragraph deep root-cause analysis explaining why problems occurred recently and why the upcoming planetary shift brings relief. Address ${fullName} with dignity.",
  "houseAnalyses": [
    {"house": "1st/6th/10th/11th House", "status": "Status heading", "desc": "Specific impact on client's question"},
    {"house": "House 2", "status": "Status heading", "desc": "Specific impact"},
    {"house": "House 3", "status": "Status heading", "desc": "Specific impact"},
    {"house": "House 4", "status": "Status heading", "desc": "Specific impact"}
  ],
  "lifeImpactAdvice": "A reassuring 2-3 sentence summary in plain words explaining what this means for their day-to-day life.",
  "timelineQuarters": [
    {"quarter": "Months 1 - 3", "heading": "Milestone title", "details": "Specific forecast for this quarter"},
    {"quarter": "Months 4 - 6", "heading": "Milestone title", "details": "Specific forecast"},
    {"quarter": "Months 7 - 9", "heading": "Milestone title", "details": "Specific forecast"},
    {"quarter": "Months 10 - 12", "heading": "Milestone title", "details": "Specific forecast"}
  ],
  "primaryMantra": {
    "sanskrit": "Sanskrit Devanagari Mantra with Om",
    "transliteration": "English phonetic transliteration",
    "meaning": "Clear simple meaning of the mantra",
    "count": "108 chants daily",
    "mala": "Mala recommendation",
    "direction": "Facing direction",
    "time": "Best time of day"
  },
  "dailyRituals": [
    {"day": "Specific day", "title": "Ritual title", "procedure": "Step-by-step practical satvik ritual"}
  ],
  "gemstoneAndRudraksha": {
    "stone": "Recommended gemstone or upratna",
    "metal": "Metal (Silver/Copper/Gold)",
    "finger": "Finger to wear",
    "day": "Day to wear",
    "rudraksha": "Recommended Mukhi Rudraksha",
    "significance": "Why this combination protects and elevates the client"
  },
  "lalKitabRemedies": [
    {"title": "Remedy title", "remedy": "Simple household remedy", "logic": "Classical astrological reasoning"}
  ],
  "vastuAdjustments": [
    {"direction": "Cardinal direction", "title": "Direction heading", "instruction": "Non-demolition adjustment"}
  ],
  "dosAndDonts": {
    "dos": ["Do item 1", "Do item 2", "Do item 3", "Do item 4"],
    "donts": ["Don't item 1", "Don't item 2", "Don't item 3", "Don't item 4"]
  }
}`;

  try {
    let response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.6
          }
        })
      }
    );

    if (!response.ok) {
      // Fallback to gemini-flash-latest
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.6 }
          })
        }
      );
    }

    if (!response.ok) {
      console.warn('Gemini API call failed with status:', response.status);
      return null;
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) return null;

    const parsed = JSON.parse(candidateText);
    return parsed;
  } catch (err) {
    console.warn('Gemini enhancement fallback to local engine:', err);
    return null;
  }
}
