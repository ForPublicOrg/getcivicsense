'use client';
import { createContext, useContext, useMemo } from 'react';
import { t as translate, type Dict } from './index';

interface I18nValue {
  locale: string;
  dir: 'ltr' | 'rtl';
  dict: Dict;
  t: (path: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  dir,
  dict,
  children,
}: {
  locale: string;
  dir: 'ltr' | 'rtl';
  dict: Dict;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nValue>(
    () => ({ locale, dir, dict, t: (path, vars) => translate(dict, path, vars) }),
    [locale, dir, dict],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
