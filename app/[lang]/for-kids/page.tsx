import Link from 'next/link';
import type { Metadata } from 'next';
import { getI18n, type LangParams } from '@/lib/i18n/server';
import { t } from '@/lib/i18n';
import Icon from '@/components/Icon';

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  const { lang } = await params;
  const { dict } = await getI18n(lang);
  return { title: t(dict, 'kids.cta'), description: t(dict, 'kids.ctaSub') };
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-line bg-paper p-4 shadow-soft">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-extrabold text-brand">
        {n}
      </span>
      <div>
        <p className="font-bold text-ink">{title}</p>
        <p className="mt-0.5 text-[15px] leading-relaxed text-ink-soft">{body}</p>
      </div>
    </li>
  );
}

export default async function ForKidsPage({ params }: { params: Promise<LangParams> }) {
  const { lang } = await params;
  const { dict } = await getI18n(lang);
  const T = (k: string) => t(dict, k);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Hero */}
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-white">
          <Icon name="child" size={26} />
        </span>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-ink">
          {T('kids.cta')}
        </span>
      </div>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">{T('kids.title')}</h1>
      <p className="mt-3 text-lg text-ink-soft">{T('kids.intro')}</p>

      {/* How to read a card */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-faint">
          <Icon name="search" size={15} className="text-brand" /> {T('kids.readHeading')}
        </h2>
        <ol className="mt-3 space-y-2.5">
          <Step n={1} title={T('kids.read1Title')} body={T('kids.read1')} />
          <Step n={2} title={T('kids.read2Title')} body={T('kids.read2')} />
          <Step n={3} title={T('kids.read3Title')} body={T('kids.read3')} />
        </ol>
      </section>

      {/* How to teach your grown-ups */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-faint">
          <Icon name="heart" size={15} className="text-accent" /> {T('kids.teachHeading')}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{T('kids.teachIntro')}</p>
        <ol className="mt-3 space-y-2.5">
          <Step n={1} title={T('kids.teach1Title')} body={T('kids.teach1')} />
          <Step n={2} title={T('kids.teach2Title')} body={T('kids.teach2')} />
          <Step n={3} title={T('kids.teach3Title')} body={T('kids.teach3')} />
          <Step n={4} title={T('kids.teach4Title')} body={T('kids.teach4')} />
          <Step n={5} title={T('kids.teach5Title')} body={T('kids.teach5')} />
        </ol>
      </section>

      {/* Respect the elders */}
      <div className="mt-8 flex items-start gap-3 rounded-2xl bg-accent-soft px-4 py-4">
        <Icon name="heart" size={18} className="mt-0.5 shrink-0 text-accent-ink" />
        <p className="text-[15px] leading-relaxed text-accent-ink">{T('kids.respect')}</p>
      </div>

      <p className="mt-8 text-center text-lg font-semibold text-ink">{T('kids.closer')}</p>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-deep"
        >
          {T('kids.explore')} <Icon name="chevron" size={16} className="-rotate-90" />
        </Link>
      </div>
    </div>
  );
}
