import type { Metadata } from 'next';
import { getI18n, type LangParams } from '@/lib/i18n/server';
import { t } from '@/lib/i18n';
import SearchBox from '@/components/SearchBox';

export const metadata: Metadata = { title: 'Search' };

export default async function SearchPage({ params }: { params: Promise<LangParams> }) {
  const { lang } = await params;
  const { dict } = await getI18n(lang);
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-1 text-3xl font-extrabold tracking-tight text-ink">{t(dict, 'search.title')}</h1>
      <p className="mb-6 text-ink-soft">{t(dict, 'search.empty')}</p>
      <SearchBox autoFocus />
    </div>
  );
}
