// The "science" half of every card. Native <details> - zero JavaScript, works
// on 2G with scripts off, degrades to always-open on ancient browsers. The wit
// stops here; inside is calm, precise, sourced.
import { t, type Dict } from '@/lib/i18n';
import type { Behaviour, ImpactClaim } from '@/lib/types';
import StrengthBadge from './StrengthBadge';
import Icon from './Icon';

// The rule: a printed magnitude number is only allowed for the top tiers.
function showsNumber(claim: ImpactClaim): boolean {
  return (
    !!claim.magnitude &&
    !claim.jurisdiction_transplant &&
    (claim.evidence_tier === 'strong' || claim.evidence_tier === 'official')
  );
}

function ClaimBlock({ claim, dict }: { claim: ImpactClaim; dict: Dict }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <ol className="space-y-2.5">
        <li className="flex gap-2.5">
          <span className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink-faint">{t(dict, 'card.cause')}</span>
          <span className="text-sm text-ink">{claim.cause}</span>
        </li>
        <li className="flex gap-2.5">
          <span className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink-faint">{t(dict, 'card.mechanism')}</span>
          <span className="text-sm text-ink">{claim.mechanism}</span>
        </li>
        <li className="flex gap-2.5">
          <span className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink-faint">{t(dict, 'card.effect')}</span>
          <span className="text-sm text-ink">{claim.effect}</span>
        </li>
      </ol>

      {showsNumber(claim) && claim.magnitude && (
        <div className="mt-3 flex items-baseline gap-2 rounded-xl bg-brand-soft px-3 py-2">
          <span className="text-2xl font-extrabold tracking-tight text-brand-ink">
            {claim.magnitude.value.toLocaleString('en-IN')}
          </span>
          <span className="text-sm font-medium text-brand-ink/80">
            {claim.magnitude.unit} <span className="text-brand-ink/60">({claim.magnitude.basis})</span>
          </span>
        </div>
      )}

      <div className="mt-3">
        <StrengthBadge
          tier={claim.evidence_tier}
          jurisdiction={claim.jurisdiction}
          transplant={claim.jurisdiction_transplant}
          dict={dict}
        />
      </div>

      <blockquote className="mt-3 border-l-2 border-line pl-3 text-sm italic text-ink-soft">
        &ldquo;{claim.supported_by}&rdquo;
      </blockquote>

      {claim.caveat && <p className="mt-2 text-xs text-ink-faint">{claim.caveat}</p>}

      <p className="mt-3 text-xs text-ink-faint">
        <span className="font-semibold">{t(dict, 'card.source')}: </span>
        <a
          href={claim.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-brand underline-offset-2 hover:underline"
        >
          {claim.source_title} - {claim.publisher}
          <Icon name="external" size={12} />
        </a>
        <span className="ml-1 text-ink-faint/80">({t(dict, 'card.retrieved')} {claim.retrieved_date})</span>
      </p>
    </div>
  );
}

export default function EvidenceDrawer({ behaviour, dict }: { behaviour: Behaviour; dict: Dict }) {
  return (
    <details className="group mt-4 rounded-2xl border border-line bg-paper-soft">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-bold text-brand">
        <span className="inline-flex items-center gap-2">
          <Icon name="info" size={16} />
          {t(dict, 'card.whyOpen')}
        </span>
        <Icon name="chevron" size={18} className="transition group-open:rotate-180" />
      </summary>

      <div className="space-y-3 border-t border-line px-4 py-4">
        {behaviour.impact.map((claim, i) => (
          <ClaimBlock key={i} claim={claim} dict={dict} />
        ))}

        {behaviour.goesRight && (
          <div className="flex items-start gap-2 rounded-2xl bg-accent-soft px-4 py-3">
            <Icon name="arrow-up" size={18} className="mt-0.5 shrink-0 text-accent-ink" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-accent-ink/80">{t(dict, 'card.goesRight')}</p>
              <p className="text-sm text-ink">{behaviour.goesRight}</p>
            </div>
          </div>
        )}

        <p className="pt-1 text-center text-sm font-semibold text-ink-soft">{behaviour.closer}</p>
      </div>
    </details>
  );
}
