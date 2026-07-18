import type { Metadata } from 'next';
import { getAllBehaviours } from '@/lib/content';
import Icon from '@/components/Icon';

export const metadata: Metadata = { title: 'Sources' };

export default function SourcesPage() {
  // One deduped master list of every citation the site displays.
  const seen = new Map<string, { title: string; publisher: string; url: string; retrieved: string }>();
  for (const b of getAllBehaviours()) {
    for (const c of b.impact) {
      if (!seen.has(c.source_url)) {
        seen.set(c.source_url, { title: c.source_title, publisher: c.publisher, url: c.source_url, retrieved: c.retrieved_date });
      }
    }
  }
  const sources = [...seen.values()].sort((a, b) => a.publisher.localeCompare(b.publisher));

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Sources</h1>
      <p className="mt-2 text-ink-soft">
        Every fact on the site traces to one of these. Found an error or a dead link? Email{' '}
        <a href="mailto:corrections@getcivicsense.org" className="text-brand hover:underline">corrections@getcivicsense.org</a>.
      </p>
      <ul className="mt-6 space-y-3">
        {sources.map((s) => (
          <li key={s.url} className="rounded-2xl border border-line bg-paper p-4">
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
              {s.title}
              <Icon name="external" size={13} />
            </a>
            <p className="mt-1 text-sm text-ink-faint">{s.publisher} · checked {s.retrieved}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
