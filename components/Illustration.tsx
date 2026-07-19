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
  | 'bus'
  | 'dog'
  | 'pet'
  | 'nature'
  | 'tree'
  | 'sapling'
  | 'water'
  | 'energy'
  | 'ewaste'
  | 'monument'
  | 'language'
  | 'server'
  | 'crossing'
  | 'signal'
  | 'phonedrive'
  | 'nodrink'
  | 'speaker'
  | 'silence'
  | 'spit'
  | 'segregate'
  | 'smoke'
  | 'bag'
  | 'toilet'
  | 'queue'
  | 'crowd'
  | 'scoop'
  | 'cow'
  | 'foodwaste'
  | 'genders'
  | 'equal'
  | 'space'
  | 'unity'
  | 'heritage'
  | 'yoga'
  | 'dance'
  | 'peaks'
  | 'festival'
  | 'food';

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
  dog: (
    <>
      <ellipse cx="114" cy="104" rx="32" ry="16" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="150" cy="90" r="14" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M150 77c5-5 11-3 11 2l-7 4z" className="fill-brand-deep" />
      <path d="M94 118v14M106 118v14M124 118v14M136 118v14" className="stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
      <path d="M84 100c-11-2-15 4-12 13" className="fill-none stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
      <circle cx="154" cy="88" r="2" className="fill-ink" />
      <path d="M118 60l3 7 7 .8-5 5 1.2 7-6.2-3.4-6.2 3.4 1.2-7-5-5 7-.8z" className="fill-accent" />
    </>
  ),
  pet: (
    <>
      <path d="M104 128c0-22 8-40 20-40s20 18 20 40z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="124" cy="80" r="16" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M110 70l-4-11 12 5zM138 70l4-11-12 5z" className="fill-brand-deep" />
      <circle cx="119" cy="80" r="2" className="fill-ink" />
      <circle cx="129" cy="80" r="2" className="fill-ink" />
      <path d="M124 85v3" className="stroke-ink/60" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M150 58c2-4 8-3 8 2 0-5 6-6 8-2 2 5-8 12-8 12s-10-7-8-12z" className="fill-accent" />
    </>
  ),
  nature: (
    <>
      <circle cx="152" cy="58" r="12" className="fill-accent" />
      <path d="M70 124c15-32 30-46 50-46s35 14 50 46z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M70 124h100" className="stroke-ink/50" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  tree: (
    <>
      <path d="M120 132v-26" className="stroke-ink/60" strokeWidth="6" strokeLinecap="round" />
      <path d="M120 40c-18 0-30 13-30 30 0 18 14 30 30 30s30-12 30-30c0-17-12-30-30-30z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M120 106V70M120 84l-12-12M120 90l12-12" className="stroke-ink/40" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  sapling: (
    <>
      <path d="M120 132v-32" className="stroke-brand" strokeWidth="4" strokeLinecap="round" />
      <path d="M120 106c-14 0-22-8-22-18 12 0 22 6 22 18z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M120 98c0-12 10-20 22-20 0 12-8 20-22 20z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M96 132h48" className="stroke-ink/50" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  water: (
    <>
      <path d="M82 70h22v10" className="fill-none stroke-ink/60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="76" y="64" width="10" height="10" rx="2" className="fill-brand-deep" />
      <path d="M104 84s10 10 10 17a10 10 0 0 1-20 0c0-7 10-17 10-17z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M104 92v14" className="stroke-brand" strokeWidth="3" strokeLinecap="round" />
      <circle cx="130" cy="118" r="4" className="fill-accent/70" />
      <circle cx="142" cy="110" r="3" className="fill-accent/60" />
    </>
  ),
  energy: (
    <>
      <path d="M120 46a24 24 0 0 0-15 42c3.5 3 5 6 5 9h20c0-3 1.5-6 5-9a24 24 0 0 0-15-42z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M110 106h20M112 114h16" className="stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
      <path d="M122 66l-9 14h13l-8 12" className="fill-none stroke-accent" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  ewaste: (
    <>
      <rect x="94" y="56" width="34" height="62" rx="6" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M94 106h34" className="stroke-ink/40" strokeWidth="2.5" />
      <circle cx="111" cy="112" r="2.5" className="fill-ink/60" />
      <path d="M150 68a14 14 0 0 1-3 20l3 1.5-1.5 4.5" className="fill-none stroke-accent" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M160 94a14 14 0 0 1-18 5l1 3.5-4.5 1.5" className="fill-none stroke-accent" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  monument: (
    <>
      <path d="M92 74a28 28 0 0 1 56 0z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="120" cy="40" r="5" className="fill-accent" />
      <path d="M86 74h68" className="stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
      <path d="M96 74v50M112 74v50M128 74v50M144 74v50" className="stroke-ink/50" strokeWidth="5" strokeLinecap="round" />
      <path d="M82 128h76" className="stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  language: (
    <>
      <path d="M82 64h56a8 8 0 0 1 8 8v24a8 8 0 0 1-8 8h-24l-14 12v-12H82a8 8 0 0 1-8-8V72a8 8 0 0 1 8-8z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M96 82h30M96 92h18" className="stroke-brand" strokeWidth="4" strokeLinecap="round" />
      <path d="M152 50l2.6 5.4 5.4.6-3.8 3.6.8 5.4-5-2.6-5 2.6.8-5.4-3.8-3.6 5.4-.6z" className="fill-accent" />
    </>
  ),
  server: (
    <>
      <rect x="88" y="58" width="60" height="20" rx="4" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <rect x="88" y="84" width="60" height="20" rx="4" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="98" cy="68" r="2.5" className="fill-ink/60" />
      <circle cx="98" cy="94" r="2.5" className="fill-ink/60" />
      <path d="M108 68h28M108 94h28" className="stroke-ink/40" strokeWidth="3" strokeLinecap="round" />
      <path d="M150 116c0-11 9-17 19-17 0 11-9 17-19 17z" className="fill-accent/60 stroke-accent" strokeWidth="2" />
      <path d="M150 116c3-4 8-8 13-10" className="fill-none stroke-accent" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  crossing: (
    <>
      <path d="M92 60v72M112 60v72M132 60v72" className="stroke-ink/25" strokeWidth="10" strokeLinecap="round" />
      <circle cx="156" cy="66" r="9" className="fill-accent" />
      <path d="M156 76v22M156 84l-10 5M156 84l10 5M156 98l-8 16M156 98l8 16" className="stroke-accent" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  signal: (
    <>
      <rect x="102" y="46" width="34" height="76" rx="11" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="119" cy="63" r="8" className="fill-accent" />
      <circle cx="119" cy="84" r="8" className="fill-ink/20" />
      <circle cx="119" cy="105" r="8" className="fill-brand" />
      <path d="M119 122v10" className="stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  phonedrive: (
    <>
      <circle cx="110" cy="98" r="32" className="fill-none stroke-ink/60" strokeWidth="4" />
      <circle cx="110" cy="98" r="8" className="fill-brand" />
      <path d="M110 66v20M78 98h20M142 98h-20" className="stroke-ink/50" strokeWidth="3" strokeLinecap="round" />
      <rect x="140" y="58" width="24" height="40" rx="5" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M146 68h12M146 76h9" className="stroke-accent" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  nodrink: (
    <>
      <path d="M104 66h32l-4 26a12 12 0 0 1-24 0z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M120 104v18M110 128h20" className="stroke-ink/60" strokeWidth="3" strokeLinecap="round" />
      <path d="M92 60l56 56" className="stroke-accent" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  speaker: (
    <>
      <path d="M84 100a36 36 0 0 1 72 0" className="fill-none stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
      <rect x="76" y="96" width="16" height="28" rx="7" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <rect x="148" y="96" width="16" height="28" rx="7" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M150 42l3 7 7 .8-5 5 1.2 7-6.2-3.4-6.2 3.4 1.2-7-5-5 7-.8z" className="fill-accent" />
    </>
  ),
  silence: (
    <>
      <path d="M104 102V86a16 16 0 0 1 32 0v16l6 8h-44z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M114 118a6 6 0 0 0 12 0" className="fill-none stroke-ink/60" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M92 62l56 56" className="stroke-accent" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  spit: (
    <>
      <path d="M120 72s16 20 16 32a16 16 0 0 1-32 0c0-12 16-32 16-32z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M112 106a8 8 0 0 0 8 8" className="fill-none stroke-brand" strokeWidth="3" strokeLinecap="round" />
      <path d="M92 66l56 56" className="stroke-accent" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  segregate: (
    <>
      <path d="M82 88h30l-3 42a5 5 0 0 1-5 5H90a5 5 0 0 1-5-5z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M78 88h38M93 78h8v10" className="fill-none stroke-ink/60" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M128 88h30l-3 42a5 5 0 0 1-5 5h-14a5 5 0 0 1-5-5z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M124 88h38M139 78h8v10" className="fill-none stroke-ink/60" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M96 104l4 5-4 5" className="fill-none stroke-accent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M143 104v12" className="stroke-accent" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  smoke: (
    <>
      <path d="M120 130c-13 0-23-9-23-22 0-13 11-21 9-34 9 5 15 11 15 19 4-3 6-9 5-15 10 8 17 19 17 30 0 13-10 22-23 22z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M92 60l56 56" className="stroke-accent" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  bag: (
    <>
      <path d="M94 86h52l5 44a6 6 0 0 1-6 7H95a6 6 0 0 1-6-7z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M106 86a14 14 0 0 1 28 0" className="fill-none stroke-ink/60" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M112 118c0-11 9-17 19-17 0 11-9 17-19 17z" className="fill-accent/50 stroke-accent" strokeWidth="2" />
    </>
  ),
  toilet: (
    <>
      <rect x="98" y="52" width="18" height="24" rx="3" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M96 80h38v8a19 19 0 0 1-38 0z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M108 106l-4 22h26l-4-22" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M146 60a12 12 0 0 1 0 22" className="fill-none stroke-accent" strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
  queue: (
    <>
      <circle cx="86" cy="74" r="10" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M76 120v-16a10 10 0 0 1 20 0v16z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="118" cy="74" r="10" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M108 120v-16a10 10 0 0 1 20 0v16z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="150" cy="74" r="10" className="fill-accent" />
      <path d="M140 120v-16a10 10 0 0 1 20 0v16z" className="fill-accent/60" />
    </>
  ),
  crowd: (
    <>
      <circle cx="92" cy="82" r="11" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="120" cy="72" r="11" className="fill-accent" />
      <circle cx="148" cy="82" r="11" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="106" cy="106" r="11" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="134" cy="106" r="11" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
    </>
  ),
  scoop: (
    <>
      <ellipse cx="102" cy="104" rx="26" ry="13" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="130" cy="94" r="11" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M130 84c4-4 9-2 9 2l-6 3z" className="fill-brand-deep" />
      <path d="M86 114v10M96 115v9M110 115v9M120 114v10" className="stroke-ink/60" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M150 104h20l-3 22h-14z" className="fill-accent/50 stroke-accent" strokeWidth="2" />
    </>
  ),
  cow: (
    <>
      <ellipse cx="110" cy="98" rx="34" ry="19" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="150" cy="86" r="15" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M139 74c-4-7 2-10 6-6M161 74c4-7-2-10-6-6" className="fill-none stroke-ink/60" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="150" cy="92" rx="7" ry="5" className="fill-brand-deep/30" />
      <path d="M88 116v12M102 118v10M118 118v10M132 116v12" className="stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  foodwaste: (
    <>
      <circle cx="114" cy="98" r="30" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="114" cy="98" r="19" className="fill-none stroke-ink/40" strokeWidth="2" />
      <path d="M114 88c7 0 7 10 0 10z" className="fill-accent/50" />
      <path d="M150 68v58M158 68v18a8 8 0 0 1-16 0V68" className="fill-none stroke-ink/50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  genders: (
    <>
      <circle cx="82" cy="80" r="12" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M70 126v-20a12 12 0 0 1 24 0v20z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="120" cy="74" r="13" className="fill-accent" />
      <path d="M107 128v-22a13 13 0 0 1 26 0v22z" className="fill-accent/70" />
      <circle cx="158" cy="80" r="12" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M146 126v-20a12 12 0 0 1 24 0v20z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M120 52s-9-5-9-11a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 6-9 11-9 11z" className="fill-accent" />
    </>
  ),
  equal: (
    <>
      <circle cx="88" cy="76" r="13" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M75 128v-22a13 13 0 0 1 26 0v22z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="152" cy="76" r="13" className="fill-accent" />
      <path d="M139 128v-22a13 13 0 0 1 26 0v22z" className="fill-accent/70" />
      <path d="M112 94h16M112 106h16" className="stroke-ink/70" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  space: (
    <>
      <circle cx="104" cy="92" r="31" className="fill-none stroke-accent/60" strokeWidth="2" strokeDasharray="3 5" />
      <circle cx="104" cy="80" r="11" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M93 124v-18a11 11 0 0 1 22 0v18z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="162" cy="86" r="9" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M153 124v-16a9 9 0 0 1 18 0v16z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
    </>
  ),
  // Many people of different sizes sheltered under one shared arch - difference,
  // held together.
  unity: (
    <>
      <path d="M58 78a62 32 0 0 1 124 0" className="fill-none stroke-brand" strokeWidth="3" strokeLinecap="round" />
      <circle cx="88" cy="92" r="10" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M77 128v-16a11 11 0 0 1 22 0v16z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="120" cy="86" r="12" className="fill-accent" />
      <path d="M107 128v-18a13 13 0 0 1 26 0v18z" className="fill-accent/70" />
      <circle cx="152" cy="92" r="10" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M141 128v-16a11 11 0 0 1 22 0v16z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
    </>
  ),
  // A domed monument with minarets - a World Heritage silhouette.
  heritage: (
    <>
      <path d="M72 130h96" className="stroke-ink/60" strokeWidth="4" strokeLinecap="round" />
      <rect x="99" y="88" width="42" height="42" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M99 88a21 21 0 0 1 42 0z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M120 67v-9" className="stroke-accent" strokeWidth="3" strokeLinecap="round" />
      <circle cx="120" cy="54" r="3.5" className="fill-accent" />
      <path d="M112 130v-19a8 8 0 0 1 16 0v19" className="fill-none stroke-ink/50" strokeWidth="2.5" />
      <rect x="80" y="94" width="9" height="36" rx="3" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <rect x="151" y="94" width="9" height="36" rx="3" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="84.5" cy="89" r="3.5" className="fill-brand-soft stroke-ink/60" strokeWidth="2" />
      <circle cx="155.5" cy="89" r="3.5" className="fill-brand-soft stroke-ink/60" strokeWidth="2" />
    </>
  ),
  // A calm seated figure - yoga, a living tradition done not stored.
  yoga: (
    <>
      <circle cx="120" cy="70" r="11" className="fill-accent" />
      <path d="M120 82c-17 0-29 25-29 46h58c0-21-12-46-29-46z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M95 118c8-6 16-9 25-9s17 3 25 9" className="fill-none stroke-ink/50" strokeWidth="3" strokeLinecap="round" />
      <path d="M150 52l2.6 5.4 5.4.6-3.8 3.6.8 5.4-5-2.6-5 2.6.8-5.4-3.8-3.6 5.4-.6z" className="fill-accent" />
    </>
  ),
  // A dancer mid-pose, flared skirt and raised arms - the classical stage.
  dance: (
    <>
      <circle cx="118" cy="50" r="9" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M118 59v30" className="stroke-ink/60" strokeWidth="5" strokeLinecap="round" />
      <path d="M118 70l-22-6M118 70l22 8" className="stroke-accent" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 130l18-34 18 34z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M96 60l2.2 4.6 4.6.6-3.2 3 .8 4.6-4.4-2.2-4.4 2.2.8-4.6-3.2-3 4.6-.6z" className="fill-accent" />
    </>
  ),
  // Snow-capped peaks under a sun - the range that holds the wild things.
  peaks: (
    <>
      <circle cx="160" cy="56" r="12" className="fill-accent" />
      <path d="M62 130l32-56 22 32 16-24 30 48z" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <path d="M94 74l-8 14h16z" className="fill-paper" />
      <path d="M132 82l-7 12h14z" className="fill-paper" />
      <path d="M60 130h116" className="stroke-ink/50" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  // A string of festive hanging lights - the calendar that never stops.
  festival: (
    <>
      <path d="M60 58q60 42 120 0" className="fill-none stroke-ink/50" strokeWidth="2.5" />
      <path d="M84 62v10M108 68v10M132 68v10M156 62v10" className="stroke-ink/40" strokeWidth="2" strokeLinecap="round" />
      <circle cx="84" cy="80" r="7" className="fill-accent" />
      <circle cx="108" cy="86" r="7" className="fill-brand" />
      <circle cx="132" cy="86" r="7" className="fill-accent" />
      <circle cx="156" cy="80" r="7" className="fill-brand" />
      <path d="M120 108l2.8 5.8 5.8.6-4 3.8.8 5.8-5.4-2.8-5.4 2.8.8-5.8-4-3.8 5.8-.6z" className="fill-accent" />
    </>
  ),
  // A thali - round plate ringed with small bowls, the same grain a hundred ways.
  food: (
    <>
      <circle cx="120" cy="98" r="40" className="fill-brand-soft stroke-ink/60" strokeWidth="2.5" />
      <circle cx="120" cy="98" r="30" className="fill-none stroke-ink/30" strokeWidth="2" />
      <circle cx="120" cy="104" r="8" className="fill-accent/40 stroke-accent" strokeWidth="2" />
      <circle cx="120" cy="74" r="9" className="fill-paper stroke-ink/50" strokeWidth="2" />
      <circle cx="98" cy="112" r="9" className="fill-paper stroke-ink/50" strokeWidth="2" />
      <circle cx="142" cy="112" r="9" className="fill-paper stroke-ink/50" strokeWidth="2" />
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
