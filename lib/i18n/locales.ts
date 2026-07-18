// The languages we route for. English is the default and the source of truth;
// the other 22 are the Eighth-Schedule languages of the Constitution of India.
// Each has a UI dictionary in messages/<code>.json and a content overlay in
// data/seed/i18n/<code>.json. Any missing key falls back to English per-key, so
// a partially-translated locale is never broken - only less complete.
export interface Locale {
  code: string;
  english: string; // English name, for the switcher and for readers who don't know the script
  native: string; // endonym, in the language's own script
  dir?: 'ltr' | 'rtl';
}

export const DEFAULT_LOCALE = 'en';

// English first, then the 22 scheduled languages in rough order of number of
// speakers - so most visitors find theirs near the top of the switcher.
export const LOCALES: Locale[] = [
  { code: 'en', english: 'English', native: 'English' },
  { code: 'hi', english: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', english: 'Bengali', native: 'বাংলা' },
  { code: 'mr', english: 'Marathi', native: 'मराठी' },
  { code: 'te', english: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', english: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', english: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'ur', english: 'Urdu', native: 'اردو', dir: 'rtl' },
  { code: 'kn', english: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'or', english: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'ml', english: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', english: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'as', english: 'Assamese', native: 'অসমীয়া' },
  { code: 'mai', english: 'Maithili', native: 'मैथिली' },
  { code: 'sat', english: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'ks', english: 'Kashmiri', native: 'کٲشُر', dir: 'rtl' },
  { code: 'ne', english: 'Nepali', native: 'नेपाली' },
  { code: 'sd', english: 'Sindhi', native: 'سنڌي', dir: 'rtl' },
  { code: 'doi', english: 'Dogri', native: 'डोगरी' },
  { code: 'kok', english: 'Konkani', native: 'कोंकणी' },
  { code: 'mni', english: 'Manipuri', native: 'মৈতৈলোন্' },
  { code: 'brx', english: 'Bodo', native: 'बड़ो' },
  { code: 'sa', english: 'Sanskrit', native: 'संस्कृतम्' },
];

export const LOCALE_CODES = LOCALES.map((l) => l.code);
export const LOCALE_MAP: Record<string, Locale> = Object.fromEntries(LOCALES.map((l) => [l.code, l]));

export function isRtl(code: string): boolean {
  return LOCALE_MAP[code]?.dir === 'rtl';
}

export function normaliseLocale(code: string | undefined | null): string {
  if (!code) return DEFAULT_LOCALE;
  const c = code.toLowerCase();
  return LOCALE_MAP[c] ? c : DEFAULT_LOCALE;
}
