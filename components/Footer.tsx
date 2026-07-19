'use client';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/provider';
import { SIBLING_URL, REPO_URL } from '@/lib/site';
import Icon from './Icon';

export default function Footer() {
  const { t, locale } = useI18n();
  return (
    <footer className="mt-16 border-t border-line/70">
      <div className="tricolor-line mx-auto max-w-content" aria-hidden="true" />
      <div className="mx-auto max-w-content px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-deep text-white shadow-soft">
                <Icon name="community" size={16} />
              </span>
              <span className="font-extrabold tracking-tight text-ink">{t('brand.name')}</span>
            </div>
            <p className="mt-3 text-sm text-ink-soft">{t('footer.tagline')}</p>
            <p className="mt-2 text-xs text-ink-faint">{t('footer.disclaimer')}</p>
            {locale !== 'en' && (
              <p className="mt-3 rounded-xl bg-paper-sink/60 px-3 py-2 text-xs text-ink-faint">
                {t('footer.translation')}{' '}
                <a href="mailto:corrections@getcivicsense.org" className="text-brand underline-offset-2 hover:underline">
                  corrections@getcivicsense.org
                </a>
              </p>
            )}
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm" aria-label="Footer">
            <Link href="/discover-india" className="text-ink-soft hover:text-brand">{t('nav.discover')}</Link>
            <Link href="/for-kids" className="text-ink-soft hover:text-brand">{t('kids.navLabel')}</Link>
            <Link href="/methodology" className="text-ink-soft hover:text-brand">{t('nav.methodology')}</Link>
            <Link href="/sources" className="text-ink-soft hover:text-brand">{t('nav.sources')}</Link>
            <Link href="/about" className="text-ink-soft hover:text-brand">{t('nav.about')}</Link>
            <Link href="/privacy" className="text-ink-soft hover:text-brand">{t('nav.privacy')}</Link>
            <Link href="/grievance" className="text-ink-soft hover:text-brand">{t('footer.grievance')}</Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line/70 pt-4 text-xs text-ink-faint">
          <span>© {new Date().getFullYear()} get civic sense</span>
          <span aria-hidden="true">·</span>
          {/* Reciprocal cross-link to the sibling site. */}
          <a
            href={SIBLING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-ink-soft underline-offset-2 hover:text-brand hover:underline"
          >
            {t('footer.rankPoliticians')}
            <Icon name="external" size={12} />
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-ink-soft underline-offset-2 hover:text-brand hover:underline"
          >
            {t('footer.openSource')}
            <Icon name="external" size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
