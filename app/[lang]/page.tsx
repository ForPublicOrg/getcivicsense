import Link from 'next/link';
import { getI18n, type LangParams } from '@/lib/i18n/server';
import { t } from '@/lib/i18n';
import { getAllBehaviours } from '@/lib/content';
import CategoryGrid from '@/components/CategoryGrid';
import BehaviourCard from '@/components/BehaviourCard';
import Icon from '@/components/Icon';

const FEATURED = ['the-horn-is-not-a-lift-button', 'bin-the-wrapper', 'wear-a-helmet'];

export default async function Home({ params }: { params: Promise<LangParams> }) {
  const { lang } = await params;
  const { locale, dict } = await getI18n(lang);
  const featured = getAllBehaviours(locale).filter((b) => FEATURED.includes(b.id));

  return (
    <div className="mx-auto max-w-content px-4">
      {/* Hero */}
      <section className="py-10 sm:py-14">
        <p className="text-sm font-bold uppercase tracking-wide text-brand">{t(dict, 'home.kicker')}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {t(dict, 'home.hero')}{' '}
          <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
            {t(dict, 'home.findYours')}
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{t(dict, 'home.heroSub')}</p>
        <Link
          href="/for-kids"
          className="group mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-2 text-sm font-bold text-accent-ink transition hover:border-accent hover:shadow-soft"
        >
          <Icon name="child" size={16} />
          {t(dict, 'kids.cta')}
          <Icon name="chevron" size={15} className="-rotate-90 transition group-hover:translate-x-0.5" />
        </Link>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium text-ink-faint">
          <Icon name="shield" size={15} className="text-brand" />
          {t(dict, 'home.everyone')}
        </div>
      </section>

      {/* Selectable place tiles */}
      <section aria-labelledby="places" className="pb-4">
        <h2 id="places" className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-faint">
          {t(dict, 'home.browse')}
        </h2>
        <CategoryGrid dict={dict} locale={locale} />
      </section>

      {/* Featured cards - the two-beat mechanic, live */}
      <section aria-labelledby="featured" className="py-10">
        <h2 id="featured" className="mb-4 text-sm font-bold uppercase tracking-wide text-ink-faint">
          {t(dict, 'home.featured')}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featured.map((b) => (
            <BehaviourCard key={b.id} behaviour={b} dict={dict} />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/search" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            <Icon name="search" size={16} /> {t(dict, 'search.placeholder')}
          </Link>
        </div>
      </section>
    </div>
  );
}
