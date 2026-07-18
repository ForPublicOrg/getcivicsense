// Prebuild: compile the committed seed into tiny static payloads under public/,
// merged per locale. Canonical facts live in data/seed (English, cited). Each
// data/seed/i18n/<code>.json is a TRANSLATION OVERLAY: it may re-word the human
// framing (titles, norms, cause/mechanism/effect, caveats, category copy) but it
// can NOT touch a citation, a number, a source or a date - those stay canonical
// in every language. This keeps "no citation, no claim" true across all 23.
//
// Outputs:
//   lib/generated/content.json          one bundle, keyed by locale (server render)
//   public/content/<locale>/<cat>.json  per-locale category slices
//   public/search-index.<locale>.json   per-locale in-browser search index
//   public/content/<cat>.json           English slices (legacy path / fallback)
//   public/search-index.json            English index (legacy path / fallback)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const SEED = join(ROOT, 'data', 'seed');
const OVERLAY_DIR = join(SEED, 'i18n');
const OUT = join(ROOT, 'public');
const OUT_CONTENT = join(OUT, 'content');
const GEN_DIR = join(ROOT, 'lib', 'generated');

// Only these fields may be translated. Anything else in an overlay is a bug we
// refuse to ship (validate.mjs turns it into a build failure).
const CAT_FIELDS = new Set(['label', 'question', 'blurb']);
const BEH_FIELDS = new Set(['title', 'norm', 'closer', 'goesRight', 'affects', 'wit', 'impact']);
const CLAIM_FIELDS = new Set(['cause', 'mechanism', 'effect', 'caveat']);

function readJson(p) {
  return JSON.parse(readFileSync(p, 'utf8'));
}

const taxonomy = readJson(join(SEED, 'taxonomy.json'));
const categoriesEn = taxonomy.categories;

const behDir = join(SEED, 'behaviours');
const behavioursEn = readdirSync(behDir)
  .filter((f) => f.endsWith('.json'))
  .flatMap((f) => readJson(join(behDir, f)));

// Discover translation overlays. English is always present and canonical.
const overlayCodes = existsSync(OVERLAY_DIR)
  ? readdirSync(OVERLAY_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
  : [];
const locales = ['en', ...overlayCodes.filter((c) => c !== 'en')];

function pick(obj, allowed) {
  const out = {};
  for (const k of Object.keys(obj || {})) if (allowed.has(k)) out[k] = obj[k];
  return out;
}

function localizeCategory(cat, ov) {
  const o = pick(ov?.categories?.[cat.id] || {}, CAT_FIELDS);
  return { ...cat, ...o };
}

function localizeBehaviour(beh, ov, isEnglish) {
  const o = ov?.behaviours?.[beh.id] || {};
  const merged = { ...beh };
  for (const k of BEH_FIELDS) {
    if (k === 'impact' || k === 'wit') continue;
    if (o[k] != null) merged[k] = o[k];
  }
  // Wit is an English-only garnish (locked product decision). On a non-English
  // card we show it ONLY if the overlay supplies a native one - never the
  // English pun machine-dropped into another language.
  merged.wit = isEnglish ? beh.wit : o.wit;
  // Impact claims: keep every canonical field (numbers, source, quote, tier,
  // jurisdiction) and overlay only the human framing, matched by index.
  merged.impact = (beh.impact || []).map((claim, i) => {
    const co = pick((o.impact && o.impact[i]) || {}, CLAIM_FIELDS);
    return { ...claim, ...co };
  });
  return merged;
}

function buildLocale(code) {
  const isEnglish = code === 'en';
  let ov = null;
  if (!isEnglish) {
    try {
      ov = readJson(join(OVERLAY_DIR, `${code}.json`));
    } catch (e) {
      // A single broken overlay must never break the build: fall this locale
      // back to English and warn. validate.mjs reports the real problem.
      console.warn(`[content] WARN: overlay ${code}.json unreadable (${e.message}); using English for "${code}".`);
      ov = null;
    }
  }
  const categories = categoriesEn.map((c) => localizeCategory(c, ov));
  const behaviours = behavioursEn.map((b) => localizeBehaviour(b, ov, isEnglish));
  return { categories, behaviours };
}

mkdirSync(OUT_CONTENT, { recursive: true });
mkdirSync(GEN_DIR, { recursive: true });

const bundle = {};
for (const code of locales) {
  const { categories, behaviours } = buildLocale(code);
  bundle[code] = { categories, behaviours };

  const catLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]));

  // Per-locale category slices.
  const dir = code === 'en' ? OUT_CONTENT : join(OUT_CONTENT, code);
  mkdirSync(dir, { recursive: true });
  for (const c of categories) {
    const slice = behaviours.filter((b) => b.category === c.id);
    writeFileSync(join(dir, `${c.id}.json`), JSON.stringify(slice));
  }

  // Per-locale search index, answered entirely in the browser.
  const index = behaviours.map((b) => ({
    id: b.id,
    title: b.title,
    norm: b.norm,
    cat: b.category,
    catLabel: catLabel[b.category] || b.category,
    keywords: [b.wit || '', ...(b.affects || [])].join(' '),
  }));
  const indexName = code === 'en' ? 'search-index.json' : `search-index.${code}.json`;
  writeFileSync(join(OUT, indexName), JSON.stringify(index));
}

// One server-side bundle: locale -> fully-merged content. lib/content.ts imports
// this; getters fall back to English for any locale not present here.
writeFileSync(join(GEN_DIR, 'content.json'), JSON.stringify(bundle));

const translated = locales.filter((c) => c !== 'en');
console.log(
  `[content] ${behavioursEn.length} behaviours x ${locales.length} locale(s) ` +
    `(en + ${translated.length} translated: ${translated.join(', ') || 'none yet'}) -> ` +
    `lib/generated/content.json + public/content/**/*.json + public/search-index*.json`,
);
