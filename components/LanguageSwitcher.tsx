'use client';
// Prominent, always-visible language control (styled after the sibling site): a
// globe + the current language + a "+N" chip that quietly says how many other
// languages are one tap away. Opens a listbox of all 23 - native name first (a
// reader spots their own script faster than any English label). Sets the `lang`
// cookie (read at the edge by middleware, never during render) and refreshes. No PII.
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { LOCALES } from '@/lib/i18n/locales';
import { useI18n } from '@/lib/i18n/provider';

const ONE_YEAR = 60 * 60 * 24 * 365;

function applyLocale(code: string) {
  document.cookie = `lang=${code};path=/;max-age=${ONE_YEAR};samesite=lax`;
  try {
    localStorage.setItem('lang', code);
  } catch {}
}

function GlobeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-6-3.5-9S9.5 5.5 12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useOutsideClose(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

function LocaleListbox({ locale, onChoose, label }: { locale: string; onChoose: (code: string) => void; label: string }) {
  return (
    <ul
      role="listbox"
      aria-label={label}
      className="absolute right-0 z-50 mt-1.5 max-h-80 w-60 origin-top-right overflow-auto rounded-2xl border border-line bg-paper p-1 shadow-lift"
    >
      {LOCALES.map((l) => (
        <li key={l.code}>
          <button
            type="button"
            role="option"
            aria-selected={l.code === locale}
            onClick={() => onChoose(l.code)}
            dir={l.dir ?? 'ltr'}
            lang={l.code}
            className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm hover:bg-brand-soft ${
              l.code === locale ? 'bg-brand-soft font-semibold text-brand-ink' : 'text-ink-soft'
            }`}
          >
            <span>{l.native}</span>
            <span className="text-xs text-ink-faint">{l.english}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(() => setOpen(false));

  function choose(code: string) {
    applyLocale(code);
    setOpen(false);
    if (code === locale) return;
    router.refresh();
  }

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-medium text-ink-soft hover:border-brand hover:text-brand"
      >
        <GlobeIcon />
        <span className="hidden sm:inline">{current.native}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
        <span className="rounded-full bg-brand-soft px-1.5 py-px text-[10px] font-bold tabular-nums text-brand-ink">
          +{LOCALES.length - 1}
        </span>
      </button>
      {open && <LocaleListbox locale={locale} onChoose={choose} label={t('nav.language')} />}
    </div>
  );
}

/**
 * Home-page hint strip: says how many languages the site speaks and shows a few
 * native scripts as one-tap switches (a reader spots their own script faster than
 * any English label). The "+N" chip opens the full picker. Discovery without a modal.
 */
export function LanguageHint({ className }: { className?: string }) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(() => setOpen(false));

  function choose(code: string) {
    applyLocale(code);
    setOpen(false);
    if (code === locale) return;
    router.refresh();
  }

  // LOCALES is ordered by speaker count (after English), so the first few that
  // are not the current locale are the most widely recognised scripts.
  const featured = LOCALES.filter((l) => l.code !== locale).slice(0, 6);
  const rest = LOCALES.length - 1 - featured.length;

  return (
    <div className={clsx('flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm', className)}>
      <span className="flex items-center gap-1.5 font-medium text-ink-faint">
        <GlobeIcon size={14} />
        {t('home.langHint', { n: LOCALES.length })}
      </span>
      {featured.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => choose(l.code)}
          dir={l.dir ?? 'ltr'}
          lang={l.code}
          className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-sm text-ink-soft hover:border-brand/40 hover:text-brand"
        >
          {l.native}
        </button>
      ))}
      <span className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={t('nav.language')}
          className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-sm font-semibold text-ink-soft hover:border-brand/40 hover:text-brand"
        >
          {t('home.langMore', { n: rest })}
        </button>
        {open && <LocaleListbox locale={locale} onChoose={choose} label={t('nav.language')} />}
      </span>
    </div>
  );
}
