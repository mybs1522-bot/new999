import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import CityAutocomplete from './CityAutocomplete';
import { REPORTS_DATA } from '../data/reports';

export default function BirthDataForm({
  selectedReportId,
  formData,
  setFormData,
  onSubmit,
  language = 'hi'
}) {
  const isHindi = language === 'hi';
  const selectedReport = REPORTS_DATA.find(r => r.id === selectedReportId) || REPORTS_DATA[0];

  const [errors, setErrors] = useState({});

  // Month options
  const months = [
    { num: '01', en: 'January', hi: 'जनवरी' },
    { num: '02', en: 'February', hi: 'फ़रवरी' },
    { num: '03', en: 'March', hi: 'मार्च' },
    { num: '04', en: 'April', hi: 'अप्रैल' },
    { num: '05', en: 'May', hi: 'मई' },
    { num: '06', en: 'June', hi: 'जून' },
    { num: '07', en: 'July', hi: 'जुलाई' },
    { num: '08', en: 'August', hi: 'अगस्त' },
    { num: '09', en: 'September', hi: 'सितंबर' },
    { num: '10', en: 'October', hi: 'अक्टूबर' },
    { num: '11', en: 'November', hi: 'नवंबर' },
    { num: '12', en: 'December', hi: 'दिसंबर' }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.fullName?.trim()) {
      errs.fullName = isHindi ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name';
    }
    if (!formData.dob?.day || !formData.dob?.month || !formData.dob?.year) {
      errs.dob = isHindi ? 'कृपया जन्म तिथि पूर्ण करें' : 'Please select a complete date of birth';
    }
    if (!formData.timeUnknown && (!formData.tob?.hour || !formData.tob?.minute)) {
      errs.tob = isHindi ? 'कृपया जन्म समय दर्ज करें या "समय ज्ञात नहीं" चुनें' : 'Please enter time of birth or check unknown';
    }
    if (!formData.pob?.name && !formData.pobText) {
      errs.pob = isHindi ? 'कृपया जन्म स्थान (शहर/राज्य) चुनें' : 'Please select your place of birth';
    }
    if (!formData.whatsappNumber || formData.whatsappNumber.length < 10) {
      errs.whatsappNumber = isHindi ? 'कृपया 10 अंकों का वैध व्हाट्सएप नंबर दर्ज करें' : 'Please enter a valid 10-digit WhatsApp number';
    }
    if (!formData.gender) {
      errs.gender = isHindi ? 'कृपया लिंग का चयन करें' : 'Please select your gender';
    }
    if (!formData.acceptedTerms) {
      errs.terms = isHindi ? 'कृपया नियम और शर्तों को स्वीकार करें' : 'Please accept the terms and conditions';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div id="birth-form-section" className="max-w-xl mx-auto px-4 py-8">
      {/* Selected Report Card Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#b44d12] uppercase tracking-wider">
            {isHindi ? 'चयनित रिपोर्ट' : 'Selected Report'}
          </span>
          <h4 className="text-lg font-bold text-gray-900 leading-tight">
            {isHindi ? selectedReport.titleHi : selectedReport.title}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {isHindi ? selectedReport.categoryHi : selectedReport.category}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-[#89270b]">₹299</div>
          <span className="text-[10px] text-gray-400 line-through">₹{selectedReport.originalPrice}</span>
        </div>
      </div>

      {/* Main Form Container matching Screenshot 1 */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5 select-none">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              {isHindi ? 'पूरा नाम' : 'Full Name'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder={isHindi ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
              className={`w-full px-4 py-3 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              {isHindi ? 'जन्म तिथि' : 'Date of Birth'} <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Day */}
              <select
                value={formData.dob.day}
                onChange={(e) => setFormData({
                  ...formData,
                  dob: { ...formData.dob, day: e.target.value }
                })}
                className="w-full px-3 py-3 text-gray-800 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="">{isHindi ? 'दिन (Day)' : 'Day'}</option>
                {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              {/* Month */}
              <select
                value={formData.dob.month}
                onChange={(e) => setFormData({
                  ...formData,
                  dob: { ...formData.dob, month: e.target.value }
                })}
                className="w-full px-3 py-3 text-gray-800 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="">{isHindi ? 'माह (Month)' : 'Month'}</option>
                {months.map(m => (
                  <option key={m.num} value={m.num}>
                    {isHindi ? m.hi : m.en}
                  </option>
                ))}
              </select>

              {/* Year */}
              <input
                type="number"
                min="1930"
                max="2026"
                placeholder="YYYY"
                value={formData.dob.year}
                onChange={(e) => setFormData({
                  ...formData,
                  dob: { ...formData.dob, year: e.target.value }
                })}
                className="w-full px-3 py-3 text-gray-800 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {errors.dob && (
              <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.dob}</span>
              </p>
            )}
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              {isHindi ? 'जन्म समय' : 'Time of Birth'} <span className="text-red-500">*</span>
            </label>
            <div className={`grid grid-cols-3 gap-2.5 ${formData.timeUnknown ? 'opacity-40 pointer-events-none' : ''}`}>
              {/* Hour */}
              <select
                value={formData.tob.hour}
                onChange={(e) => setFormData({
                  ...formData,
                  tob: { ...formData.tob, hour: e.target.value }
                })}
                className="w-full px-3 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="">HH</option>
                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>

              {/* Minute */}
              <select
                value={formData.tob.minute}
                onChange={(e) => setFormData({
                  ...formData,
                  tob: { ...formData.tob, minute: e.target.value }
                })}
                className="w-full px-3 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="">MM</option>
                {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              {/* AM/PM */}
              <select
                value={formData.tob.ampm}
                onChange={(e) => setFormData({
                  ...formData,
                  tob: { ...formData.tob, ampm: e.target.value }
                })}
                className="w-full px-3 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            {/* Checkbox: Don't know exact time of birth */}
            <div className="mt-2.5">
              <label className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.timeUnknown}
                  onChange={(e) => setFormData({ ...formData, timeUnknown: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="font-medium text-gray-800">
                  {isHindi ? 'मुझे मेरा सटीक जन्म समय नहीं पता' : "Don't know my exact time of birth"}
                </span>
              </label>
              <p className="text-[11px] text-gray-500 mt-1 pl-6">
                {isHindi
                  ? 'सूचना: जन्म समय के बिना भी, चन्द्र लग्न विश्लेषण द्वारा हम 80% तक सटीक भविष्यवाणियां प्रदान करते हैं।'
                  : 'Note: Without time of birth, we can still achieve upto 80% accurate predictions via Moon Chart.'}
              </p>
            </div>
            {errors.tob && (
              <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.tob}</span>
              </p>
            )}
          </div>

          {/* Place of Birth with Instant Autocomplete */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              {isHindi ? 'जन्म स्थान (शहर/ज़िला/राज्य)' : 'Place of Birth'} <span className="text-red-500">*</span>
            </label>
            <CityAutocomplete
              value={formData.pobText}
              onChange={(txt) => setFormData({ ...formData, pobText: txt })}
              onSelectCity={(cityItem) => setFormData({
                ...formData,
                pob: cityItem,
                pobText: `${cityItem.name}, ${cityItem.state ? cityItem.state + ', ' : ''}${cityItem.country}`
              })}
              error={!!errors.pob}
            />
            {errors.pob && (
              <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.pob}</span>
              </p>
            )}
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              {isHindi ? 'व्हाट्सएप नंबर (रिपोर्ट इस नंबर पर भेजी जाएगी)' : 'WhatsApp Number'} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600 font-semibold text-sm">
                <MessageCircle className="w-5 h-5 mr-1 text-emerald-600" />
                <span>+91</span>
              </div>
              <input
                type="tel"
                maxLength={10}
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  whatsappNumber: e.target.value.replace(/\D/g, '')
                })}
                placeholder="WhatsApp Number"
                className={`w-full pl-20 pr-4 py-3 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.whatsappNumber ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.whatsappNumber && (
              <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.whatsappNumber}</span>
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              {isHindi ? 'लिंग (Gender)' : 'Gender'} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className={`w-full px-4 py-3 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white ${
                errors.gender ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">{isHindi ? 'लिंग चुनें (Select Gender)' : 'Select Gender'}</option>
              <option value="Male">{isHindi ? 'पुरुष (Male)' : 'Male'}</option>
              <option value="Female">{isHindi ? 'महिला (Female)' : 'Female'}</option>
              <option value="Other">{isHindi ? 'अन्य (Other)' : 'Other'}</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.gender}</span>
              </p>
            )}
          </div>

          {/* Report Language / भाषा */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Report Language/ भाषा
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
            >
              <option value="hi">हिंदी (Hindi)</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="pt-2">
            <label className="flex items-start space-x-2.5 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptedTerms}
                onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                className="w-4 h-4 mt-0.5 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
              />
              <span>
                {isHindi ? 'मैंने पढ़ लिया है और स्वीकार करता हूँ ' : 'I have read and accept the '}
                <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[#b44d12] underline font-semibold">
                  {isHindi ? 'नियम और शर्तें (Terms & Conditions)' : 'Terms & Conditions'}
                </a>
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.terms}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#b44d12] via-[#c2410c] to-[#89270b] text-white font-bold text-base tracking-wide shadow-lg hover:shadow-xl hover:from-[#a3330c] hover:to-[#681f08] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <Lock className="w-4 h-4 text-amber-200" />
            <span>
              {isHindi ? 'सुरक्षित भुगतान करें एवं रिपोर्ट प्राप्त करें' : 'Proceed to Get Report'} — ₹299
            </span>
            <ArrowRight className="w-5 h-5 text-amber-200" />
          </button>

          {/* Trust Footer */}
          <div className="pt-3 text-center flex items-center justify-center space-x-3 text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Confidential</span>
            </span>
            <span>•</span>
            <span>Instant PDF & WhatsApp Delivery</span>
          </div>

        </form>
      </div>
    </div>
  );
}
