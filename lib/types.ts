// The content model. Everything ships as static JSON in data/seed and is
// compiled to public/*.json at build. No database, ever.

/** How strong is the evidence behind an impact claim? Drives the visible badge
 *  AND whether a magnitude number is allowed to be shown. */
export type EvidenceTier =
  | 'strong' //   systematic review / RCT / WHO guideline  -> number allowed
  | 'official' // national government statistic             -> number allowed
  | 'suggestive' // observational / ecological              -> association only, no bare "X%"
  | 'mechanism'; //  cause understood, size not measured    -> NO number

export type SharedResource =
  | 'air'
  | 'water'
  | 'time'
  | 'safety'
  | 'disease'
  | 'noise'
  | 'nature'
  | 'health'
  | 'energy'
  | 'climate'
  | 'heritage'
  | 'culture';

export interface Magnitude {
  value: number;
  unit: string;
  basis: string; // e.g. "India, 2022"
}

/** One independently-auditable link in the cause -> mechanism -> effect chain.
 *  A behaviour card holds an array of these. */
export interface ImpactClaim {
  cause: string;
  mechanism: string;
  effect: string;
  shared_resource: SharedResource;
  magnitude?: Magnitude | null; // null/absent is normal and honest
  jurisdiction: string; // ISO-ish: "IN", "IN-WB", "EU", "GLOBAL"
  jurisdiction_transplant: boolean; // true = figure measured abroad, shown for the mechanism
  evidence_tier: EvidenceTier;
  evidence_type: 'measured' | 'modelled' | 'illustrative';
  source_title: string;
  publisher: string;
  source_url: string;
  retrieved_date: string; // YYYY-MM-DD
  supported_by: string; // verbatim line from the source that backs the claim
  caveat?: string;
}

export interface Behaviour {
  id: string;
  category: string;
  title: string; // <=48 chars, a seven-year-old can read it aloud
  norm: string; // the plain, translatable base line
  wit?: string; // OPTIONAL English garnish - never load-bearing (image-led)
  universality: 'universal' | 'non_universal'; // gates the "we all do it" voice
  affects: string[];
  illustration: string; // key into the inline-SVG scene kit
  share: 'comic' | 'sober' | 'none';
  impact: ImpactClaim[];
  goesRight?: string; // the positive-direction outcome (the two-way rule)
  closer: string; // the fixed absolution couplet
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  question: string; // the dangling curiosity-gap tile line
  blurb: string;
  order: number;
}
