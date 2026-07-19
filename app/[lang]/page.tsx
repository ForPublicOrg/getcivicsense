import Link from 'next/link';
import { getI18n, type LangParams } from '@/lib/i18n/server';
import { t } from '@/lib/i18n';
import { getAllBehaviours, getCategories } from '@/lib/content';
import CategoryGrid from '@/components/CategoryGrid';
import BehaviourCard from '@/components/BehaviourCard';
import Illustration from '@/components/Illustration';
import Icon, { type IconName } from '@/components/Icon';
import { LanguageHint } from '@/components/LanguageSwitcher';
import { Analytics } from '@vercel/analytics/next';

const FEATURED = ['the-horn-is-not-a-lift-button', 'bin-the-wrapper', 'wear-a-helmet'];
const STEPS: { icon: IconName; key: string }[] = [
  { icon: 'search', key: 'home.how1' },
  { icon: 'info', key: 'home.how2' },
  { icon: 'check', key: 'home.how3' },
];

export default async function Home({ params }: { params: Promise<LangParams> }) {
  const { lang } = await params;
  const { locale, dict } = await getI18n(lang);
  const featured = getAllBehaviours(locale).filter((b) => FEATURED.includes(b.id));
  const places = getCategories(locale).length;
  const things = getAllBehaviours(locale).length;

  return (
    <div className="mx-auto max-w-content px-4">
      {/* Hero */}
      <section className="py-9 sm:py-12">
        <p className="text-sm font-bold uppercase tracking-wide text-brand">{t(dict, 'home.kicker')}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {t(dict, 'home.hero')}{' '}
          <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
            {t(dict, 'home.findYours')}
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{t(dict, 'home.heroSub')}</p>

        {/* Primary actions - what to do, made obvious */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#places"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft hover:bg-brand-deep"
          >
            {t(dict, 'home.browse')}
            <Icon name="arrow-down" size={16} />
          </a>
          <Link
            href="/for-kids"
            className="group inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-2.5 text-sm font-bold text-accent-ink transition hover:border-accent hover:shadow-soft"
          >
            <Icon name="child" size={16} />
            {t(dict, 'kids.cta')}
            <Icon name="chevron" size={15} className="-rotate-90 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Language discovery - your own script, one tap */}
        <LanguageHint className="mt-6" />

        <p className="mt-4 flex flex-wrap items-center gap-1.5 text-xs font-medium text-ink-faint">
          <Icon name="shield" size={15} className="text-brand" />
          {t(dict, 'home.everyone')}
        </p>
      </section>

      {/* How it works - the two-beat, spelled out in one glance */}
      <section aria-label={t(dict, 'card.whyOpen')} className="pb-8">
        <ol className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.key} className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-4 shadow-soft">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                <Icon name={s.icon} size={18} />
              </span>
              <span className="text-sm font-semibold text-ink">
                <span className="mr-1 text-ink-faint">{i + 1}.</span>
                {t(dict, s.key)}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Selectable place tiles - the main navigation */}
      <section id="places" aria-labelledby="places-h" className="scroll-mt-20 pb-4">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 id="places-h" className="text-sm font-bold uppercase tracking-wide text-ink-faint">
            {t(dict, 'home.browse')}
          </h2>
          <span className="text-xs text-ink-faint">{t(dict, 'home.count', { places, things })}</span>
        </div>
        <CategoryGrid dict={dict} locale={locale} />
      </section>

      {/* Featured cards - the two-beat mechanic, live */}
      <section aria-labelledby="featured-h" className="py-10">
        <h2 id="featured-h" className="mb-4 text-sm font-bold uppercase tracking-wide text-ink-faint">
          {t(dict, 'home.featured')}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featured.map((b) => (
            <BehaviourCard key={b.id} behaviour={b} dict={dict} />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/search" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            <Icon name="search" size={16} /> {t(dict, 'search.title')}
          </Link>
        </div>
      </section>

      {/* Discover India - the pride that makes the small things worth doing. A
          big, visual, tappable band so it works for a child or a grandparent. */}
      <section aria-labelledby="discover-h" className="pb-12">
        <Link
          href="/discover-india"
          className="group flex flex-col items-start gap-5 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-brand-soft/70 to-paper p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lift sm:flex-row sm:items-center sm:p-7"
        >
          <Illustration name="unity" className="aspect-[3/2] w-full shrink-0 overflow-hidden rounded-2xl sm:w-56" />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">{t(dict, 'discover.kicker')}</p>
            <h2 id="discover-h" className="mt-1.5 text-2xl font-extrabold tracking-tight text-ink">
              {t(dict, 'discover.home.title')}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{t(dict, 'discover.home.body')}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
              {t(dict, 'discover.home.cta')}
              <Icon name="chevron" size={15} className="-rotate-90 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </section>

      {/* Web analytics only on the landing page, to stay within the free
          analytics-events budget (not mounted in the root layout). */}
      <Analytics />
    </div>
  );
}
