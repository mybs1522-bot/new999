import React from 'react';

// North Indian Diamond Chart Layout Coordinates
export default function KundliChart({ kundli, language = 'hi' }) {
  if (!kundli) return null;

  const { lagna, housePlanets } = kundli;
  const lagnaRashiNum = lagna.rashi.id;

  // Compute Rashi number (1-12) for each house
  const getHouseRashi = (houseNum) => {
    let r = ((lagnaRashiNum - 1 + (houseNum - 1)) % 12) + 1;
    return r;
  };

  // Planet abbreviations
  const planetAbbr = {
    'Sun': { en: 'Su', hi: 'सूर्य' },
    'Moon': { en: 'Mo', hi: 'चन्द्र' },
    'Mars': { en: 'Ma', hi: 'मंगल' },
    'Mercury': { en: 'Me', hi: 'बुध' },
    'Jupiter': { en: 'Ju', hi: 'गुरु' },
    'Venus': { en: 'Ve', hi: 'शुक्र' },
    'Saturn': { en: 'Sa', hi: 'शनि' },
    'Rahu': { en: 'Ra', hi: 'राहु' },
    'Ketu': { en: 'Ke', hi: 'केतु' }
  };

  // Center coordinates for rendering text in each of the 12 houses (box size 400x400)
  const houseCoordinates = {
    1: { cx: 200, cy: 110, rashiX: 200, rashiY: 70 },      // House 1 (Top diamond)
    2: { cx: 100, cy: 60, rashiX: 130, rashiY: 45 },       // House 2 (Top left triangle)
    3: { cx: 50, cy: 110, rashiX: 35, rashiY: 80 },        // House 3 (Left top triangle)
    4: { cx: 110, cy: 200, rashiX: 70, rashiY: 200 },      // House 4 (Left diamond)
    5: { cx: 50, cy: 290, rashiX: 35, rashiY: 320 },       // House 5 (Left bottom triangle)
    6: { cx: 100, cy: 340, rashiX: 130, rashiY: 355 },     // House 6 (Bottom left triangle)
    7: { cx: 200, cy: 290, rashiX: 200, rashiY: 330 },     // House 7 (Bottom diamond)
    8: { cx: 300, cy: 340, rashiX: 270, rashiY: 355 },     // House 8 (Bottom right triangle)
    9: { cx: 350, cy: 290, rashiX: 365, rashiY: 320 },     // House 9 (Right bottom triangle)
    10: { cx: 290, cy: 200, rashiX: 330, rashiY: 200 },    // House 10 (Right diamond)
    11: { cx: 350, cy: 110, rashiX: 365, rashiY: 80 },     // House 11 (Right top triangle)
    12: { cx: 300, cy: 60, rashiX: 270, rashiY: 45 }       // House 12 (Top right triangle)
  };

  return (
    <div className="flex flex-col items-center bg-amber-50/50 p-4 rounded-xl border border-amber-200">
      <div className="text-center mb-2">
        <h4 className="font-serif font-bold text-amber-950 text-base">
          {language === 'hi' ? 'लग्न कुंडली (चक्र)' : 'Birth Ascendant (Lagna) Chart'}
        </h4>
        <p className="text-xs text-amber-800">
          {language === 'hi'
            ? `लग्न: ${lagna.rashi.hindi} (${lagna.rashi.name}) | नक्षत्र: ${kundli.nakshatra.hindi} (${kundli.charan} चरण)`
            : `Ascendant: ${lagna.rashi.name} | Nakshatra: ${kundli.nakshatra.name} (Pada ${kundli.charan})`}
        </p>
      </div>

      <div className="relative w-[340px] sm:w-[380px] h-[340px] sm:h-[380px] select-none">
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
          {/* Background square */}
          <rect x="10" y="10" width="380" height="380" fill="#fffdf5" stroke="#89270b" strokeWidth="2.5" />

          {/* Diagonals */}
          <line x1="10" y1="10" x2="390" y2="390" stroke="#89270b" strokeWidth="1.8" />
          <line x1="390" y1="10" x2="10" y2="390" stroke="#89270b" strokeWidth="1.8" />

          {/* Inner Central Diamond */}
          <polygon
            points="200,10 390,200 200,390 10,200"
            fill="none"
            stroke="#89270b"
            strokeWidth="2"
          />

          {/* House Contents */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNum) => {
            const coords = houseCoordinates[houseNum];
            const rashiNum = getHouseRashi(houseNum);
            const planetsInHouse = housePlanets[houseNum] || [];

            return (
              <g key={houseNum}>
                {/* Rashi Number */}
                <text
                  x={coords.rashiX}
                  y={coords.rashiY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#c2410c"
                >
                  {rashiNum}
                </text>

                {/* Planets inside this house */}
                {planetsInHouse.length > 0 && (
                  <g>
                    {planetsInHouse.map((p, pIdx) => {
                      const offset = (pIdx - (planetsInHouse.length - 1) / 2) * 14;
                      const label = language === 'hi' ? planetAbbr[p.planet]?.hi : planetAbbr[p.planet]?.en;
                      return (
                        <text
                          key={p.planet}
                          x={coords.cx}
                          y={coords.cy + offset}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="11"
                          fontWeight="700"
                          fill="#431407"
                          className="font-sans"
                        >
                          {label}
                        </text>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 text-[11px] text-amber-900 font-medium flex items-center space-x-3">
        <span>● लग्न (Asc): <strong className="text-red-700">{lagna.rashi.hindi}</strong></span>
        <span>● महादशा: <strong>{kundli.runningMahadasha?.hindi || kundli.runningMahadasha?.planet}</strong></span>
        <span>● सटीकता: <strong className="text-emerald-700">{kundli.accuracyPercentage}%</strong></span>
      </div>
    </div>
  );
}
