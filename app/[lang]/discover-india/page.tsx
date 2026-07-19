import Link from 'next/link';
import type { Metadata } from 'next';
import { getI18n, type LangParams } from '@/lib/i18n/server';
import { t, type Dict } from '@/lib/i18n';
import Illustration from '@/components/Illustration';
import Icon from '@/components/Icon';

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  const { lang } = await params;
  const { dict } = await getI18n(lang);
  return { title: t(dict, 'discover.kicker'), description: t(dict, 'discover.intro') };
}

// Canonical citations - English, never translated. The framing (titles, bodies)
// is translated per locale; the numbers below are injected into the translated
// templates, and the constitutional quotes render verbatim. Every figure was
// verified against a live authoritative source on 2026-07-19.
const CONSTITUTION_URL = 'https://www.constitutionofindia.net/articles/article-51a-fundamental-duties/';

const FACTS: Record<string, { vars: Record<string, string | number>; source: string; url: string }> = {
  languages: {
    vars: { scheduled: 22, languages: 121 },
    source: 'Languages of India (Wikipedia), Census of India 2011',
    url: 'https://en.wikipedia.org/wiki/Languages_of_India',
  },
  heritage: {
    vars: { count: 44 },
    source: 'UNESCO World Heritage Centre',
    url: 'https://whc.unesco.org/en/statesparties/in',
  },
  traditions: {
    vars: { count: 16 },
    source: 'UNESCO Intangible Cultural Heritage',
    url: 'https://ich.unesco.org/en/state/india-IN',
  },
  dance: {
    vars: { count: 8 },
    source: 'Indian classical dance (Wikipedia), Sangeet Natak Akademi',
    url: 'https://en.wikipedia.org/wiki/Indian_classical_dance',
  },
  wild: {
    vars: { pct: '70%' },
    source: 'NTCA, Status of Tigers in India 2022',
    url: 'https://ntca.gov.in/assets/uploads/Reports/AITM/Summary_report_AITE_2022.pdf',
  },
};

const QUOTES: Record<string, { text: string; cite: string; url: string }> = {
  unity: {
    text:
      'to promote harmony and the spirit of common brotherhood amongst all the people of India transcending religious, linguistic and regional or sectional diversities',
    cite: 'Constitution of India, Article 51A(e)',
    url: CONSTITUTION_URL,
  },
  closer: {
    text: 'to value and preserve the rich heritage of our composite culture',
    cite: 'Constitution of India, Article 51A(f)',
    url: CONSTITUTION_URL,
  },
};

// key -> illustration scene; `kind` picks how the citation renders.
const FACETS: { key: string; scene: string; kind: 'quote' | 'number' | 'none' }[] = [
  { key: 'unity', scene: 'unity', kind: 'quote' },
  { key: 'languages', scene: 'language', kind: 'number' },
  { key: 'heritage', scene: 'heritage', kind: 'number' },
  { key: 'traditions', scene: 'yoga', kind: 'number' },
  { key: 'dance', scene: 'dance', kind: 'number' },
  { key: 'wild', scene: 'peaks', kind: 'number' },
  { key: 'festival', scene: 'festival', kind: 'none' },
  { key: 'food', scene: 'food', kind: 'none' },
];

function SourceChip({ label, url, word }: { label: string; url: string; word: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-1 rounded-full bg-paper-sink px-2.5 py-1 text-xs font-medium text-ink-faint transition hover:text-brand"
    >
      <span className="font-semibold">{word}:</span> {label}
      <Icon name="external" size={11} />
    </a>
  );
}

function FacetCard({ facet, dict }: { facet: (typeof FACETS)[number]; dict: Dict }) {
  const T = (k: string, vars?: Record<string, string | number>) => t(dict, k, vars);
  const base = `discover.cards.${facet.key}`;
  const quote = QUOTES[facet.key];
  const fact = FACTS[facet.key];
  return (
    <article className="flex flex-col rounded-3xl border border-line bg-paper p-4 shadow-soft">
      <Illustration name={facet.scene} className="mb-4 aspect-[3/2] w-full overflow-hidden rounded-2xl" />
      <h2 className="text-xl font-extrabold leading-tight tracking-tight text-ink">{T(`${base}.title`)}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{T(`${base}.body`)}</p>

      {facet.kind === 'quote' && quote && (
        <div className="mt-3 border-t border-line pt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{T('discover.quoteLead')}</p>
          <blockquote className="mt-1.5 text-[15px] italic leading-relaxed text-ink">&ldquo;{quote.text}.&rdquo;</blockquote>
          <div className="mt-2">
            <SourceChip label={quote.cite} url={quote.url} word={T('card.source')} />
          </div>
        </div>
      )}

      {facet.kind === 'number' && fact && (
        <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3">
          <p className="text-[15px] font-semibold text-ink">{T(`${base}.fact`, fact.vars)}</p>
          <SourceChip label={fact.source} url={fact.url} word={T('card.source')} />
        </div>
      )}
    </article>
  );
}

export default async function DiscoverIndiaPage({ params }: { params: Promise<LangParams> }) {
  const { lang } = await params;
  const { dict } = await getI18n(lang);
  const T = (k: string) => t(dict, k);

  return (
    <div className="mx-auto max-w-content px-4">
      {/* Hero */}
      <section className="py-9 sm:py-12">
        <p className="text-sm font-bold uppercase tracking-wide text-brand">{T('discover.kicker')}</p>
        <span className="tricolor-line mt-2 block w-16" aria-hidden="true" />
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {T('discover.title')}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{T('discover.intro')}</p>
        <p className="mt-5 flex flex-wrap items-center gap-1.5 text-xs font-medium text-ink-faint">
          <Icon name="shield" size={15} className="text-brand" />
          {T('discover.everyone')}
        </p>
      </section>

      {/* The facets of one country - each an image-led card, cited where it states a fact */}
      <section aria-label={T('discover.kicker')} className="pb-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FACETS.map((f) => (
            <FacetCard key={f.key} facet={f} dict={dict} />
          ))}
        </div>
      </section>

      {/* Closer - hand the big picture back to the small, everyday acts */}
      <section className="my-10 rounded-3xl bg-brand-soft/60 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">{T('discover.closerKicker')}</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{T('discover.closerTitle')}</h2>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">{T('discover.quoteLead')}</p>
        <blockquote className="mt-1.5 text-lg italic leading-relaxed text-ink">&ldquo;{QUOTES.closer.text}.&rdquo;</blockquote>
        <div className="mt-2">
          <SourceChip label={QUOTES.closer.cite} url={QUOTES.closer.url} word={T('card.source')} />
        </div>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{T('discover.closerBody')}</p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-deep"
          >
            {T('discover.closerCta')} <Icon name="chevron" size={16} className="-rotate-90" />
          </Link>
        </div>
      </section>
    </div>
  );
}
