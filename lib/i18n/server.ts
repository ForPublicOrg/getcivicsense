import { loadMessages, type Dict } from './index';
import { normaliseLocale, isRtl } from './locales';

export type LangParams = { lang: string };

/** Resolve the locale, its merged dictionary and text direction for a route. */
export async function getI18n(lang: string): Promise<{ locale: string; dict: Dict; dir: 'ltr' | 'rtl' }> {
  const locale = normaliseLocale(lang);
  const dict = await loadMessages(locale);
  return { locale, dict, dir: isRtl(locale) ? 'rtl' : 'ltr' };
}
