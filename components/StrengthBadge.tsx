// Honest, plain-language strength-of-evidence badge. It is always visible with
// the claim - the honesty contract with the reader. Colour is neutral on
// purpose (never green/red "good/bad"); the words carry the meaning.
import { t, type Dict } from '@/lib/i18n';
import type { EvidenceTier } from '@/lib/types';

const STYLE: Record<EvidenceTier, string> = {
  strong: 'bg-brand-soft text-brand-ink',
  official: 'bg-brand-soft text-brand-ink',
  suggestive: 'bg-paper-sink text-ink-soft',
  mechanism: 'bg-paper-sink text-ink-soft',
};

export default function StrengthBadge({
  tier,
  jurisdiction,
  transplant,
  dict,
}: {
  tier: EvidenceTier;
  jurisdiction: string;
  transplant: boolean;
  dict: Dict;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STYLE[tier]}`}>
        {t(dict, `badge.${tier}`)}
      </span>
      <span className="inline-flex items-center rounded-full border border-line px-2 py-1 text-[11px] font-medium text-ink-faint">
        {jurisdiction}
      </span>
      {transplant && (
        <span className="text-[11px] italic text-ink-faint">{t(dict, 'badge.abroad')}</span>
      )}
    </div>
  );
}
