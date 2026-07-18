// Server-side content access. Reads the committed seed directly (no DB, no
// request-time IO). Pages call these in generateStaticParams / render; the
// client search box uses the prebuilt public/search-index.json instead.
import type { Behaviour, Category } from './types';
import taxonomy from '@/data/seed/taxonomy.json';
import roads from '@/data/seed/behaviours/roads.json';
import noise from '@/data/seed/behaviours/noise.json';
import clean from '@/data/seed/behaviours/clean.json';
import transport from '@/data/seed/behaviours/transport.json';

const FILES: Behaviour[][] = [
  roads as unknown as Behaviour[],
  noise as unknown as Behaviour[],
  clean as unknown as Behaviour[],
  transport as unknown as Behaviour[],
];

const ALL: Behaviour[] = FILES.flat();

const CATEGORIES = taxonomy.categories as unknown as Category[];

export function getCategories(): Category[] {
  return [...CATEGORIES].sort((a, b) => a.order - b.order);
}

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getBehavioursByCategory(categoryId: string): Behaviour[] {
  return ALL.filter((b) => b.category === categoryId);
}

export function getBehaviour(categoryId: string, id: string): Behaviour | undefined {
  return ALL.find((b) => b.category === categoryId && b.id === id);
}

export function getAllBehaviours(): Behaviour[] {
  return ALL;
}

export function countByCategory(categoryId: string): number {
  return getBehavioursByCategory(categoryId).length;
}
