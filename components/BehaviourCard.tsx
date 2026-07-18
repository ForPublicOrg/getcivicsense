// One behaviour = one card. The face is image-led and child-readable (works in
// every language); the wit is an optional English garnish, never load-bearing;
// the cited science lives one tap down in the drawer.
import { t, type Dict } from '@/lib/i18n';
import type { Behaviour } from '@/lib/types';
import { SITE_URL } from '@/lib/site';
import Illustration from './Illustration';
import EvidenceDrawer from './EvidenceDrawer';
import ShareButton from './ShareButton';
import SameNa from './SameNa';

export default function BehaviourCard({ behaviour, dict }: { behaviour: Behaviour; dict: Dict }) {
  return (
    <article className="flex flex-col rounded-3xl border border-line bg-paper p-4 shadow-soft">
      <Illustration name={behaviour.illustration} className="mb-4 aspect-[3/2] w-full overflow-hidden rounded-2xl" />

      <h3 className="text-xl font-extrabold leading-tight tracking-tight text-ink">{behaviour.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{behaviour.norm}</p>
      {behaviour.wit && <p className="mt-2 text-sm italic text-ink-faint">{behaviour.wit}</p>}

      <EvidenceDrawer behaviour={behaviour} dict={dict} />

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3">
        <SameNa id={behaviour.id} label={t(dict, 'card.sameNa')} />
        {behaviour.share !== 'none' && (
          <ShareButton
            title={behaviour.title}
            shareText={behaviour.share === 'sober' ? behaviour.norm : t(dict, 'card.shareText')}
            label={t(dict, 'card.share')}
            url={SITE_URL}
          />
        )}
      </div>
    </article>
  );
}
