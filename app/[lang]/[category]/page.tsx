import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getI18n } from '@/lib/i18n/server';
import { t } from '@/lib/i18n';
import { LOCALE_CODES } from '@/lib/i18n/locales';
import { getCategories, getCategory, getBehavioursByCategory } from '@/lib/content';
import BehaviourCard from '@/components/BehaviourCard';
import Icon from '@/components/Icon';

type Params = { lang: string; category: string };

export function generateStaticParams() {
  const cats = getCategories();
  return LOCALE_CODES.flatMap((lang) => cats.map((c) => ({ lang, category: c.id })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  return { title: cat ? cat.label : 'Not found' };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { lang, category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const { dict } = await getI18n(lang);
  const behaviours = getBehavioursByCategory(category);

  return (
    <div className="mx-auto max-w-content px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-ink-faint hover:text-brand">
        <Icon name="chevron" size={16} className="rotate-90" /> {t(dict, 'common.allPlaces')}
      </Link>

      <header className="mt-4 flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
          <Icon name={cat.icon as any} size={28} />
        </span>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">{cat.label}</h1>
          <p className="mt-1 max-w-2xl text-ink-soft">{cat.blurb}</p>
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {behaviours.map((b) => (
          <BehaviourCard key={b.id} behaviour={b} dict={dict} />
        ))}
      </div>
    </div>
  );
}
