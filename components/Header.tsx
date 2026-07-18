'use client';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/provider';
import Icon from './Icon';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white">
            <Icon name="spark" size={18} />
          </span>
          <span className="text-[15px] font-extrabold tracking-tight text-ink">
            get<span className="text-brand">civic</span>sense
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 text-sm font-medium text-ink-soft sm:flex" aria-label="Primary">
          <Link href="/search" className="rounded-full px-3 py-1.5 hover:bg-paper-sink hover:text-brand">
            {t('nav.search')}
          </Link>
          <Link href="/methodology" className="rounded-full px-3 py-1.5 hover:bg-paper-sink hover:text-brand">
            {t('nav.methodology')}
          </Link>
          <Link href="/about" className="rounded-full px-3 py-1.5 hover:bg-paper-sink hover:text-brand">
            {t('nav.about')}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <Link
            href="/search"
            aria-label={t('nav.search')}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft hover:border-brand hover:text-brand sm:hidden"
          >
            <Icon name="search" size={18} />
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
