'use client';
// Search with NO server: fetch the prebuilt static index once, answer every
// keystroke in-browser. The query is never transmitted or logged.
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/provider';
import Icon from './Icon';

interface Row {
  id: string;
  title: string;
  norm: string;
  cat: string;
  catLabel: string;
  keywords: string;
}

const cache = new Map<string, Promise<Row[]>>();
// Fetch the locale's prebuilt index; if it isn't there yet (locale not
// translated) fall back to the English index so search always works.
function loadIndex(locale: string): Promise<Row[]> {
  const key = locale || 'en';
  if (!cache.has(key)) {
    const url = key === 'en' ? '/search-index.json' : `/search-index.${key}.json`;
    const p = fetch(url)
      .then((r) => (r.ok ? (r.json() as Promise<Row[]>) : null))
      .catch(() => null)
      .then((rows) => rows ?? (key === 'en' ? [] : loadIndex('en')));
    cache.set(key, p as Promise<Row[]>);
  }
  return cache.get(key)!;
}

export default function SearchBox({ autoFocus = false }: { autoFocus?: boolean }) {
  const { t, locale } = useI18n();
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    loadIndex(locale).then(setRows);
  }, [locale]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return rows
      .filter((r) => `${r.title} ${r.norm} ${r.keywords} ${r.catLabel}`.toLowerCase().includes(term))
      .slice(0, 12);
  }, [q, rows]);

  return (
    <div>
      <div className="flex items-center gap-2 rounded-2xl border border-line bg-paper px-4 py-3 shadow-soft focus-within:border-brand">
        <Icon name="search" size={20} className="text-ink-faint" />
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
          aria-label={t('search.title')}
        />
      </div>

      <div className="mt-4">
        {!q.trim() ? (
          <p className="rounded-2xl border border-dashed border-line bg-paper/70 p-6 text-center text-sm text-ink-faint">
            {t('search.empty')}
          </p>
        ) : results.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-paper/70 p-6 text-center text-sm text-ink-faint">
            {t('search.noResult')}
          </p>
        ) : (
          <ul className="space-y-2">
            {results.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/${r.cat}/${r.id}`}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-3 transition hover:border-brand/40 hover:shadow-soft"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-ink">{r.title}</span>
                    <span className="block truncate text-xs text-ink-faint">{r.catLabel}</span>
                  </span>
                  <Icon name="chevron" size={16} className="ml-auto -rotate-90 text-ink-faint" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
