import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Search, Loader2 } from 'lucide-react';
import styles from './PhoneInput.module.css';

const COUNTRIES = [
  { name: 'United Arab Emirates', code: 'AE', dial: '+971' },
  { name: 'Saudi Arabia',         code: 'SA', dial: '+966' },
  { name: 'Egypt',                code: 'EG', dial: '+20'  },
  { name: 'United States',        code: 'US', dial: '+1'   },
  { name: 'United Kingdom',       code: 'GB', dial: '+44'  },
  { name: 'Germany',              code: 'DE', dial: '+49'  },
  { name: 'France',               code: 'FR', dial: '+33'  },
  { name: 'India',                code: 'IN', dial: '+91'  },
  { name: 'Pakistan',             code: 'PK', dial: '+92'  },
  { name: 'Jordan',               code: 'JO', dial: '+962' },
  { name: 'Kuwait',               code: 'KW', dial: '+965' },
  { name: 'Qatar',                code: 'QA', dial: '+974' },
  { name: 'Bahrain',              code: 'BH', dial: '+973' },
  { name: 'Oman',                 code: 'OM', dial: '+968' },
  { name: 'Lebanon',              code: 'LB', dial: '+961' },
  { name: 'Turkey',               code: 'TR', dial: '+90'  },
  { name: 'China',                code: 'CN', dial: '+86'  },
  { name: 'Japan',                code: 'JP', dial: '+81'  },
  { name: 'South Korea',          code: 'KR', dial: '+82'  },
  { name: 'Canada',               code: 'CA', dial: '+1'   },
  { name: 'Australia',            code: 'AU', dial: '+61'  },
  { name: 'Netherlands',          code: 'NL', dial: '+31'  },
  { name: 'Switzerland',          code: 'CH', dial: '+41'  },
  { name: 'Sweden',               code: 'SE', dial: '+46'  },
  { name: 'Spain',                code: 'ES', dial: '+34'  },
  { name: 'Italy',                code: 'IT', dial: '+39'  },
  { name: 'Brazil',               code: 'BR', dial: '+55'  },
  { name: 'South Africa',         code: 'ZA', dial: '+27'  },
  { name: 'Nigeria',              code: 'NG', dial: '+234' },
  { name: 'Morocco',              code: 'MA', dial: '+212' },
  { name: 'Iraq',                 code: 'IQ', dial: '+964' },
  { name: 'Syria',                code: 'SY', dial: '+963' },
  { name: 'Tunisia',              code: 'TN', dial: '+216' },
  { name: 'Algeria',              code: 'DZ', dial: '+213' },
  { name: 'Libya',                code: 'LY', dial: '+218' },
  { name: 'Sudan',                code: 'SD', dial: '+249' },
  { name: 'Philippines',          code: 'PH', dial: '+63'  },
  { name: 'Indonesia',            code: 'ID', dial: '+62'  },
  { name: 'Malaysia',             code: 'MY', dial: '+60'  },
  { name: 'Singapore',            code: 'SG', dial: '+65'  },
  { name: 'Thailand',             code: 'TH', dial: '+66'  },
  { name: 'Vietnam',              code: 'VN', dial: '+84'  },
  { name: 'Russia',               code: 'RU', dial: '+7'   },
  { name: 'Ukraine',              code: 'UA', dial: '+380' },
  { name: 'Poland',               code: 'PL', dial: '+48'  },
  { name: 'Czech Republic',       code: 'CZ', dial: '+420' },
  { name: 'Romania',              code: 'RO', dial: '+40'  },
  { name: 'Greece',               code: 'GR', dial: '+30'  },
  { name: 'Portugal',             code: 'PT', dial: '+351' },
  { name: 'Ireland',              code: 'IE', dial: '+353' },
  { name: 'Denmark',              code: 'DK', dial: '+45'  },
  { name: 'Norway',               code: 'NO', dial: '+47'  },
  { name: 'Finland',              code: 'FI', dial: '+358' },
  { name: 'Austria',              code: 'AT', dial: '+43'  },
  { name: 'Belgium',              code: 'BE', dial: '+32'  },
  { name: 'New Zealand',          code: 'NZ', dial: '+64'  },
  { name: 'Argentina',            code: 'AR', dial: '+54'  },
  { name: 'Colombia',             code: 'CO', dial: '+57'  },
  { name: 'Mexico',               code: 'MX', dial: '+52'  },
  { name: 'Chile',                code: 'CL', dial: '+56'  },
  { name: 'Kenya',                code: 'KE', dial: '+254' },
  { name: 'Ghana',                code: 'GH', dial: '+233' },
  { name: 'Ethiopia',             code: 'ET', dial: '+251' },
  { name: 'Tanzania',             code: 'TZ', dial: '+255' },
  { name: 'Israel',               code: 'IL', dial: '+972' },
  { name: 'Iran',                 code: 'IR', dial: '+98'  },
  { name: 'Bangladesh',           code: 'BD', dial: '+880' },
  { name: 'Sri Lanka',            code: 'LK', dial: '+94'  },
  { name: 'Nepal',                code: 'NP', dial: '+977' },
  { name: 'Afghanistan',          code: 'AF', dial: '+93'  },
];

const flagUrl = (code) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

const PhoneInput = ({ value, onChange, onCountryChange, error, id = 'phone', label = 'Phone Number', defaultCountry = 'AE' }) => {
  const defaultC = COUNTRIES.find(c => c.code === defaultCountry) || COUNTRIES[0];
  const [selectedCountry, setSelectedCountry] = useState(defaultC);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [detecting, setDetecting] = useState(true);
  const dropdownRef = useRef(null);
  const hasNotifiedRef = useRef(false);

  // Auto-detect country via IP on mount
  useEffect(() => {
    let cancelled = false;

    const detectCountry = async () => {
      try {
        // Try ipapi.co first (free, no key needed)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error('API error');

        const data = await res.json();
        if (!cancelled && data?.country_code) {
          const detected = COUNTRIES.find(c => c.code === data.country_code);
          if (detected) {
            setSelectedCountry(detected);
            if (onCountryChange) onCountryChange(detected);
            hasNotifiedRef.current = true;
          }
        }
      } catch {
        // Silent fallback — try ipinfo.io as backup
        try {
          const controller2 = new AbortController();
          const timeoutId2 = setTimeout(() => controller2.abort(), 3000);

          const res2 = await fetch('https://ipinfo.io/json', { signal: controller2.signal });
          clearTimeout(timeoutId2);

          if (!res2.ok) throw new Error('Backup API error');
          const data2 = await res2.json();
          if (!cancelled && data2?.country) {
            const detected = COUNTRIES.find(c => c.code === data2.country);
            if (detected) {
              setSelectedCountry(detected);
              if (onCountryChange) onCountryChange(detected);
              hasNotifiedRef.current = true;
            }
          }
        } catch {
          // Both APIs failed — keep default country silently
        }
      } finally {
        if (!cancelled) setDetecting(false);
      }
    };

    detectCountry();
    return () => { cancelled = true; };
  }, []);

  // Notify parent of initial default country (only if auto-detect didn't fire)
  useEffect(() => {
    if (!detecting && !hasNotifiedRef.current && onCountryChange) {
      onCountryChange(selectedCountry);
      hasNotifiedRef.current = true;
    }
  }, [detecting]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearch('');
    if (onCountryChange) onCountryChange(country);
    onChange({ target: { name: 'phone', value: value } });
  }, [onCountryChange, onChange, value]);

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/[^\d\s\-()]/g, '');
    onChange({ target: { name: 'phone', value: digits } });
  };

  const fullPhone = `${selectedCountry.dial} ${value}`.trim();

  return (
    <div className={styles.phoneWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label} <span className={styles.required}>*</span>
      </label>

      <div className={`${styles.phoneRow} ${error ? styles.phoneRowError : ''}`}>
        {/* COUNTRY CODE DROPDOWN TRIGGER */}
        <div className={styles.dialWrapper} ref={dropdownRef}>
          <button
            type="button"
            className={`${styles.dialBtn} ${isOpen ? styles.dialBtnOpen : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            disabled={detecting}
          >
            {detecting ? (
              <Loader2 size={18} className={styles.detectingSpinner} />
            ) : (
              <img
                src={flagUrl(selectedCountry.code)}
                alt={`${selectedCountry.name} flag`}
                className={styles.flagIcon}
              />
            )}
            <span className={styles.dialCode}>{selectedCountry.dial}</span>
            <ChevronDown
              className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}
              size={14}
            />
          </button>

          {/* DROPDOWN PANEL */}
          {isOpen && (
            <div className={styles.dropdownPanel} role="listbox">
              {/* SEARCH */}
              <div className={styles.searchWrapper}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search country or code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </div>

              {/* LIST */}
              <ul className={styles.countryList}>
                {filtered.length === 0 ? (
                  <li className={styles.noResults}>No countries found</li>
                ) : (
                  filtered.map((country) => (
                    <li
                      key={country.code}
                      className={`${styles.countryItem} ${country.code === selectedCountry.code ? styles.activeItem : ''}`}
                      onClick={() => handleCountrySelect(country)}
                      role="option"
                      aria-selected={country.code === selectedCountry.code}
                    >
                      <img
                        src={flagUrl(country.code)}
                        alt={`${country.name} flag`}
                        className={styles.flagIconSmall}
                      />
                      <span className={styles.countryName}>{country.name}</span>
                      <span className={styles.countryDial}>{country.dial}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className={styles.divider}></div>

        {/* PHONE NUMBER INPUT */}
        <input
          type="tel"
          id={id}
          name="phone"
          value={value}
          onChange={handlePhoneChange}
          placeholder="50 123 4567"
          className={styles.phoneNumberInput}
          data-full-phone={fullPhone}
          inputMode="tel"
          maxLength={15}
        />
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default PhoneInput;
