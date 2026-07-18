// The rich-scene tier. Flat, limited-palette, TEXT-FREE inline SVG (so one
// asset serves every language - all words live in the UI, never in the art).
// Themed for free via Tailwind fill-*/stroke-* utilities mapped to the CSS
// palette, so light/dark come along automatically. Good/bad is never coded by
// colour here; the scene just depicts the situation warmly and neutrally.
type SceneName =
  | 'helmet'
  | 'seatbelt'
  | 'ambulance'
  | 'horn'
  | 'wrapper'
  | 'handwash'
  | 'alight'
  | 'seat'
  | 'road'
  | 'bin'
  | 'bus';

const SCENES: Record<SceneName, React.ReactNode> = {
  helmet: (
    <>
      <circle cx="120" cy="92" r="26" className="fill-paper stroke-ink/70" strokeWidth="2.5" />
      <path d="M92 90a28 28 0 0 1 56 0z" className="fill-brand" />
      <rect x="92" y="88" width="56" height="7" rx="3.5" className="fill-brand-deep" />
      <path d="M120 118c0 10 8 18 18 18" className="fill-none stroke-accent" strokeWidth="4" strokeLinecap="round" />
      <path d="M150 40l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" className="fill-accent" />
    </>
  ),
  seatbelt: (
    <>
      <path d="M78 132V70a14 14 0 0 1 14-14h30v76z" className="fill-brand-soft stroke-ink/40" strokeWidth="2" />
      <circle cx="104" cy="58" r="15" className="fill-paper stroke-ink/70" strokeWidth="2.5" />
      <path d="M92 78l44 26" className="stroke-accent" strokeWidth="7" strokeLinecap="round" />
      <rect x="120" y="96" width="18" height="12" rx="3" className="fill-brand-deep" />
    </>
  ),
  ambulance: (
    <>
      <rect x="70" y="66" width="82" height="44" rx="8" className="fill-paper stroke-ink/60" strokeWidth="2.5" />
      <path d="M152 82h20l14 12v16h-34z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="96" cy="118" r="10" className="fill-ink" />
      <circle cx="166" cy="118" r="10" className="fill-ink" />
      <path d="M100 78v16M92 86h16" className="stroke-accent" strokeWidth="6" strokeLinecap="round" />
      <path d="M44 78h14M40 92h18M48 106h10" className="stroke-brand" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  horn: (
    <>
      <circle cx="112" cy="94" r="34" className="fill-none stroke-ink/70" strokeWidth="4" />
      <circle cx="112" cy="94" r="12" className="fill-brand" />
      <path d="M112 62v20M112 106v20M80 94h20M124 94h20" className="stroke-ink/70" strokeWidth="4" strokeLinecap="round" />
      <path d="M158 74a20 20 0 0 1 0 40M170 64a32 32 0 0 1 0 60" className="fill-none stroke-accent" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  wrapper: (
    <>
      <path d="M96 84h48l-5 44a6 6 0 0 1-6 5h-26a6 6 0 0 1-6-5z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M90 84h60" className="stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
      <path d="M112 96v26M128 96v26" className="stroke-ink/40" strokeWidth="3" strokeLinecap="round" />
      <path d="M150 48c-14 6-16 20-30 26" className="fill-none stroke-accent" strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" />
      <path d="M150 44l10 4-4 10-6-6z" className="fill-accent" />
    </>
  ),
  handwash: (
    <>
      <path d="M78 70h18v10" className="fill-none stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
      <path d="M96 80v10" className="stroke-brand" strokeWidth="4" strokeLinecap="round" />
      <path d="M84 108c0-10 24-10 24 0M116 108c0-10 24-10 24 0" className="fill-paper stroke-ink/60" strokeWidth="2.5" />
      <circle cx="104" cy="100" r="4" className="fill-accent/70" />
      <circle cx="118" cy="94" r="5" className="fill-accent/60" />
      <circle cx="112" cy="106" r="3" className="fill-accent/80" />
    </>
  ),
  alight: (
    <>
      <rect x="84" y="52" width="72" height="76" rx="10" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M120 56v68" className="stroke-ink/40" strokeWidth="3" />
      <path d="M108 76l-16 12 16 12" className="fill-none stroke-accent" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M132 76l16 12-16 12" className="fill-none stroke-brand" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  seat: (
    <>
      <path d="M92 78h40v40h-40z" className="fill-brand-soft stroke-ink/50" strokeWidth="2.5" />
      <path d="M132 78v40M92 118v14M132 118v14" className="stroke-ink/50" strokeWidth="3" strokeLinecap="round" />
      <circle cx="150" cy="60" r="10" className="fill-accent" />
      <path d="M150 72v22M150 82h12M150 94l-8 12M150 94l8 12" className="stroke-accent" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  road: (
    <>
      <path d="M84 132l14-72h44l14 72z" className="fill-brand-soft stroke-ink/50" strokeWidth="2.5" />
      <path d="M120 66v10M120 88v10M120 110v10" className="stroke-accent" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  bin: (
    <>
      <path d="M92 78h56l-5 52a6 6 0 0 1-6 5h-34a6 6 0 0 1-6-5z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M84 78h72M112 66h16v12" className="fill-none stroke-ink/60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M110 94v30M120 94v30M130 94v30" className="stroke-ink/40" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  bus: (
    <>
      <rect x="72" y="60" width="96" height="56" rx="10" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M72 92h96M108 60v32" className="stroke-ink/40" strokeWidth="3" />
      <circle cx="96" cy="122" r="9" className="fill-ink" />
      <circle cx="144" cy="122" r="9" className="fill-ink" />
    </>
  ),
};

export default function Illustration({
  name,
  className = '',
  ...rest
}: { name: string; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const scene = SCENES[name as SceneName] ?? SCENES.road;
  return (
    <div className={className} {...rest}>
      <svg viewBox="0 0 240 160" className="h-full w-full text-brand" role="img" aria-hidden="true">
        <rect x="0" y="0" width="240" height="160" rx="20" className="fill-brand-soft/60" />
        {scene}
      </svg>
    </div>
  );
}
