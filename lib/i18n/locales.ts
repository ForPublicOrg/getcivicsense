// Languages we route for. English is the default and source of truth; the
// switcher lists these. The full Eighth-Schedule set can be added the same way
// (add a code here + a messages/<code>.json). We ship a small set for now and
// fall back to English for any missing key.
export interface Locale {
  code: string;
  english: string;
  native: string;
  dir?: 'ltr' | 'rtl';
}

export const DEFAULT_LOCALE = 'en';

export const LOCALES: Locale[] = [
  { code: 'en', english: 'English', native: 'English' },
  { code: 'hi', english: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', english: 'Tamil', native: 'தமிழ்' },
  { code: 'bn', english: 'Bengali', native: 'বাংলা' },
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
