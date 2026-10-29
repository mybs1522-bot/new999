import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { searchCitiesFast, POPULAR_CITIES } from '../data/indianCities';

export default function CityAutocomplete({ value, onChange, onSelectCity, error, placeholder, isHindi = false }) {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const wrapperRef = useRef(null);

  // Sync internal query if external value changes
  useEffect(() => {
    if (value !== query) {
      setQuery(value || '');
    }
  }, [value]);

  // Instant zero-latency filter on keystroke
  const handleInputChange = (e) => {
    const text = e.target.value;
    setQuery(text);
    onChange(text);

    if (text.trim().length === 0) {
      setSuggestions(POPULAR_CITIES.slice(0, 8));
      setIsOpen(true);
      return;
    }

    // Instant local lookup (< 1 millisecond)
    const localMatches = searchCitiesFast(text, 8);
    setSuggestions(localMatches);
    setIsOpen(true);

    // If query has 3+ characters and local matches are few, fetch from OSM in background
    if (text.trim().length >= 3 && localMatches.length < 3) {
      fetchOnlineCities(text);
    }
  };

  // Background fallback for remote villages
  const fetchOnlineCities = async (searchTerm) => {
    try {
      setIsLoadingMore(true);
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(searchTerm)}&limit=5&lat=20.5937&lon=78.9629`
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const onlineItems = data.features.map(f => ({
          name: f.properties.name || f.properties.city || f.properties.town || searchTerm,
          district: f.properties.district || f.properties.county || '',
          state: f.properties.state || '',
          country: f.properties.country || 'India',
          lat: f.geometry.coordinates[1],
          lon: f.geometry.coordinates[0]
        }));

        setSuggestions(prev => {
          // Merge avoiding duplicates
          const seen = new Set(prev.map(p => p.name.toLowerCase()));
          const extra = onlineItems.filter(item => !seen.has(item.name.toLowerCase()));
          return [...prev, ...extra].slice(0, 10);
        });
      }
    } catch {
      // offline fallback remains intact
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Select item
  const handleSelect = (item) => {
    const formatted = `${item.name}, ${item.state ? item.state + ', ' : ''}${item.country}`;
    setQuery(formatted);
    onChange(formatted);
    onSelectCity(item);
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (!query) {
              setSuggestions(POPULAR_CITIES.slice(0, 8));
            } else {
              setSuggestions(searchCitiesFast(query, 8));
            }
            setIsOpen(true);
          }}
          placeholder={placeholder || (isHindi ? 'अपना शहर, जिला या राज्य खोजें...' : 'Search for place, district, or state...')}
          className={`w-full px-4 py-3 text-gray-800 bg-[#fffdf0] border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all ${
            error ? 'border-red-400 bg-red-50' : 'border-amber-300'
          }`}
          autoComplete="off"
        />
        <div className="absolute right-3 top-3.5 text-amber-700 flex items-center space-x-1 pointer-events-none">
          {isLoadingMore ? (
            <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
          ) : (
            <Search className="w-5 h-5 text-amber-700/70" />
          )}
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-amber-200 rounded-lg shadow-2xl max-h-64 overflow-y-auto custom-scrollbar animate-in fade-in-50 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-amber-800 bg-amber-50/80 border-b border-amber-100 flex justify-between items-center">
            <span>{isHindi ? 'प्रमुख शहर सुझाव' : 'INSTANT CITY SUGGESTIONS'}</span>
            <span className="text-[10px] text-amber-600 font-normal">{isHindi ? 'चुनने के लिए क्लिक करें' : 'Press to select'}</span>
          </div>
          {suggestions.map((item, idx) => (
            <button
              key={`${item.name}-${item.state}-${idx}`}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full text-left px-3.5 py-2.5 hover:bg-amber-50 focus:bg-amber-100 border-b border-gray-100 last:border-0 flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900 leading-tight">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {[item.district, item.state, item.country].filter(Boolean).join(', ')}
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-amber-700 font-medium bg-amber-50 group-hover:bg-amber-200 px-2 py-0.5 rounded transition-colors">
                {isHindi ? 'चुनें' : 'Select'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
