'use client';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/provider';
import Icon from './Icon';
import SearchBox from './SearchBox';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto max-w-content px-4">
        <div className="flex h-16 items-center gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={t('brand.name')}>
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-soft">
              <Icon name="community" size={20} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-extrabold tracking-tight text-ink">{t('brand.name')}</span>
              <span className="tricolor-line mt-1 w-9" aria-hidden="true" />
            </span>
          </Link>

          {/* Inline search, front and centre on desktop. */}
          <div className="hidden flex-1 md:block">
            <SearchBox variant="header" />
          </div>

          <nav className="ml-auto flex items-center gap-1 text-sm font-medium text-ink-soft" aria-label="Primary">
            <Link href="/discover-india" className="hidden rounded-full px-3 py-1.5 hover:bg-paper-sink hover:text-brand md:block">
              {t('nav.discover')}
            </Link>
            <Link href="/methodology" className="hidden rounded-full px-3 py-1.5 hover:bg-paper-sink hover:text-brand lg:block">
              {t('nav.methodology')}
            </Link>
            <Link href="/about" className="hidden rounded-full px-3 py-1.5 hover:bg-paper-sink hover:text-brand sm:block">
              {t('nav.about')}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </nav>
        </div>

        {/* On phones the search bar gets its own full-width row. */}
        <div className="pb-3 md:hidden">
          <SearchBox variant="header" />
        </div>
      </div>
    </header>
  );
}
