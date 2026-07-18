// The selectable home navigation: big picture tiles, one per place. Each tile
// leads with a dangling QUESTION (a curiosity gap), not a dry label - you tap
// to close the loop. Picture tiles, not dropdowns, so a child can drive it too.
import Link from 'next/link';
import { type Dict } from '@/lib/i18n';
import { getCategories, countByCategory } from '@/lib/content';
import Icon from './Icon';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CategoryGrid({ dict, locale }: { dict: Dict; locale?: string }) {
  const categories = getCategories(locale);
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/${c.id}`}
          className="group flex items-center gap-4 rounded-3xl border border-line bg-paper p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lift"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
            <Icon name={c.icon as any} size={26} />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-bold text-ink">{c.label}</span>
            <span className="block text-sm text-ink-faint">{c.question}</span>
          </span>
          <span className="ml-auto shrink-0 rounded-full bg-paper-sink px-2.5 py-1 text-xs font-bold text-ink-faint">
            {countByCategory(c.id, locale)}
          </span>
        </Link>
      ))}
    </div>
  );
}
