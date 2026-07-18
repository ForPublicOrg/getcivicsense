// Server-side content access, locale-aware. Reads the prebuilt bundle
// (lib/generated/content.json) that tools/build-content.mjs merges from the
// canonical English seed + per-locale overlays. No DB, no request-time IO.
// Every getter takes a locale and falls back to English for any locale that has
// no overlay yet - so a page is never blank, only (at worst) in English.
import type { Behaviour, Category } from './types';
import { DEFAULT_LOCALE } from './i18n/locales';
import bundleJson from './generated/content.json';

type LocaleContent = { categories: Category[]; behaviours: Behaviour[] };
const BUNDLE = bundleJson as unknown as Record<string, LocaleContent>;

function forLocale(locale?: string): LocaleContent {
  return (locale && BUNDLE[locale]) || BUNDLE[DEFAULT_LOCALE];
}

export function getCategories(locale?: string): Category[] {
  return [...forLocale(locale).categories].sort((a, b) => a.order - b.order);
}

export function getCategory(id: string, locale?: string): Category | undefined {
  return forLocale(locale).categories.find((c) => c.id === id);
}

export function getBehavioursByCategory(categoryId: string, locale?: string): Behaviour[] {
  return forLocale(locale).behaviours.filter((b) => b.category === categoryId);
}

export function getBehaviour(categoryId: string, id: string, locale?: string): Behaviour | undefined {
  return forLocale(locale).behaviours.find((b) => b.category === categoryId && b.id === id);
}

export function getAllBehaviours(locale?: string): Behaviour[] {
  return forLocale(locale).behaviours;
}

export function countByCategory(categoryId: string, locale?: string): number {
  return getBehavioursByCategory(categoryId, locale).length;
}
