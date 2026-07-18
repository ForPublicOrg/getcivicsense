import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getI18n } from '@/lib/i18n/server';
import { t } from '@/lib/i18n';
import { LOCALE_CODES } from '@/lib/i18n/locales';
import { getCategories, getCategory, getBehavioursByCategory, getBehaviour } from '@/lib/content';
import BehaviourCard from '@/components/BehaviourCard';
import Icon from '@/components/Icon';

type Params = { lang: string; category: string; behaviour: string };

export function generateStaticParams() {
  const cats = getCategories();
  return LOCALE_CODES.flatMap((lang) =>
    cats.flatMap((c) => getBehavioursByCategory(c.id).map((b) => ({ lang, category: c.id, behaviour: b.id }))),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, behaviour } = await params;
  const b = getBehaviour(category, behaviour);
  return { title: b ? b.title : 'Not found', description: b?.norm };
}

export default async function BehaviourPage({ params }: { params: Promise<Params> }) {
  const { lang, category, behaviour } = await params;
  const cat = getCategory(category);
  const b = getBehaviour(category, behaviour);
  if (!cat || !b) notFound();
  const { dict } = await getI18n(lang);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href={`/${category}`} className="inline-flex items-center gap-1 text-sm font-medium text-ink-faint hover:text-brand">
        <Icon name="chevron" size={16} className="rotate-90" /> {cat.label}
      </Link>

      <div className="mt-4">
        <BehaviourCard behaviour={b} dict={dict} />
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-ink-faint">
        <Icon name="info" size={13} /> {t(dict, 'footer.disclaimer')}
      </p>
    </div>
  );
}
