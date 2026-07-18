'use client';
// Search with NO server: fetch the prebuilt static index once (per locale),
// answer every keystroke in-browser. The query is never transmitted or logged.
// Two shapes: a compact header combobox with a live results dropdown + keyboard
// navigation (like the sibling site), and the roomy page variant used on /search.
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/provider';
import Icon, { type IconName } from './Icon';

interface Row {
  id: string;
  title: string;
  norm: string;
  cat: string;
  catLabel: string;
  keywords: string;
}

const CAT_ICON: Record<string, IconName> = {
  roads: 'road',
  noise: 'horn',
  clean: 'bin',
  transport: 'bus',
  animals: 'paw',
  trees: 'tree',
  sustain: 'leaf',
  heritage: 'monument',
};

const cache = new Map<string, Promise<Row[]>>();
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

function useRows(locale: string) {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    let live = true;
    loadIndex(locale).then((r) => live && setRows(r));
    return () => {
      live = false;
    };
  }, [locale]);
  return rows;
}

function match(rows: Row[], q: string, limit: number): Row[] {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return rows
    .filter((r) => `${r.title} ${r.norm} ${r.keywords} ${r.catLabel}`.toLowerCase().includes(term))
    .slice(0, limit);
}

function ResultRow({
  r,
  active,
  onGo,
  onHover,
}: {
  r: Row;
  active: boolean;
  onGo: () => void;
  onHover: () => void;
}) {
  return (
    <Link
      role="option"
      aria-selected={active}
      href={`/${r.cat}/${r.id}`}
      onClick={onGo}
      onMouseEnter={onHover}
      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 ${active ? 'bg-brand-soft' : 'hover:bg-brand-soft/60'}`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-paper-sink text-ink-faint">
        <Icon name={CAT_ICON[r.cat] ?? 'search'} size={16} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-ink">{r.title}</span>
        <span className="block truncate text-xs text-ink-faint">{r.catLabel}</span>
      </span>
    </Link>
  );
}

export default function SearchBox({
  variant = 'page',
  autoFocus = false,
}: {
  variant?: 'header' | 'page';
  autoFocus?: boolean;
}) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const rows = useRows(locale);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // On the /search page, prefill from ?q (read once on the client - no
  // useSearchParams, so the page stays statically generated).
  useEffect(() => {
    if (variant === 'page' && typeof window !== 'undefined') {
      const initial = new URLSearchParams(window.location.search).get('q');
      if (initial) setQ(initial);
    }
  }, [variant]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const limit = variant === 'header' ? 6 : 24;
  const results = useMemo(() => match(rows, q, limit), [rows, q, limit]);

  useEffect(() => {
    setCursor((c) => (results.length === 0 ? -1 : Math.min(c, results.length - 1)));
  }, [results.length]);

  const go = useCallback(
    (cat: string, id: string) => {
      setOpen(false);
      router.push(`/${cat}/${id}`);
    },
    [router],
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, -1));
    } else if (e.key === 'Enter') {
      if (cursor >= 0 && results[cursor]) {
        e.preventDefault();
        go(results[cursor].cat, results[cursor].id);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  // -- Header combobox: compact input + dropdown ----------------------------
  if (variant === 'header') {
    const showPanel = open && q.trim().length > 0;
    return (
      <div className="relative w-full" ref={boxRef}>
        <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 focus-within:border-brand">
          <Icon name="search" size={18} className="shrink-0 text-ink-faint" />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            autoComplete="off"
            aria-expanded={showPanel}
            aria-label={t('search.title')}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
              setCursor(-1);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={t('search.placeholder')}
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
          />
        </div>

        {showPanel && (
          <div
            role="listbox"
            className="absolute left-0 right-0 z-50 mt-2 overflow-auto rounded-2xl border border-line bg-paper p-1.5 shadow-lift"
            style={{ maxHeight: 420 }}
          >
            {results.length === 0 ? (
              <p className="px-3 py-4 text-center text-sm text-ink-faint">{t('search.noResult')}</p>
            ) : (
              <ul>
                {results.map((r, i) => (
                  <li key={r.id}>
                    <ResultRow r={r} active={cursor === i} onGo={() => go(r.cat, r.id)} onHover={() => setCursor(i)} />
                  </li>
                ))}
                <li>
                  <Link
                    href={`/search?q=${encodeURIComponent(q.trim())}`}
                    onClick={() => setOpen(false)}
                    className="mt-1 flex items-center justify-center gap-1.5 rounded-xl border-t border-line/60 px-3 py-2.5 text-sm font-semibold text-brand hover:bg-brand-soft/60"
                  >
                    {t('search.seeAll')} <Icon name="chevron" size={14} className="-rotate-90" />
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }

  // -- Page variant: roomy input + inline results (the /search page) ---------
  return (
    <div ref={boxRef}>
      <div className="flex items-center gap-2 rounded-2xl border border-line bg-paper px-4 py-3 shadow-soft focus-within:border-brand">
        <Icon name="search" size={20} className="text-ink-faint" />
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
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
            {results.map((r, i) => (
              <li key={r.id}>
                <ResultRow r={r} active={cursor === i} onGo={() => go(r.cat, r.id)} onHover={() => setCursor(i)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
