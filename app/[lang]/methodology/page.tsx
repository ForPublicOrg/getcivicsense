import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'The science' };

const TIERS = [
  { label: 'Strongest - many studies agree', note: 'Systematic reviews, controlled trials, or WHO guidelines. A number may be shown.' },
  { label: 'Official count - government record', note: 'A national statistic (e.g. MoRTH road-death figures). A number may be shown.' },
  { label: 'Suggestive - measured in the real world', note: 'Observational or ecological studies. Shown as an association, never a bare percentage.' },
  { label: 'How it works - the size isn&apos;t measured here', note: 'The mechanism is understood but not quantified. No number is shown.' },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">How we handle the science</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
        <p>
          Every impact claim is a chain: <strong className="text-ink">what happens → how → so</strong>. Each carries the exact
          source and the date we checked it. If a behaviour has no credible source for a number, we show it <em>without</em> a
          number rather than guess. Missing beats wrong.
        </p>
        <p>
          We never paint a foreign figure onto an Indian claim without saying so. Where a number comes from abroad (say WHO&apos;s
          European noise thresholds), the card says so and shows it for the <em>mechanism</em>, not as the Indian number.
        </p>
        <h2 className="pt-2 text-lg font-bold text-ink">The strength badge</h2>
        <p>Every claim wears a plain-language badge so you always know how solid it is:</p>
        <ul className="space-y-3">
          {TIERS.map((tier) => (
            <li key={tier.label} className="rounded-2xl border border-line bg-paper p-4">
              <p className="font-semibold text-ink" dangerouslySetInnerHTML={{ __html: tier.label }} />
              <p className="mt-1 text-sm text-ink-faint" dangerouslySetInnerHTML={{ __html: tier.note }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
