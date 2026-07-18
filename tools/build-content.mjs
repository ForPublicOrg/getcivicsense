// Prebuild: compile the committed seed into tiny static payloads under public/.
// Emits one slice per category plus a single in-browser search index. No DB.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const SEED = join(ROOT, 'data', 'seed');
const OUT = join(ROOT, 'public');
const OUT_CONTENT = join(OUT, 'content');

function readJson(p) {
  return JSON.parse(readFileSync(p, 'utf8'));
}

const taxonomy = readJson(join(SEED, 'taxonomy.json'));
const catLabel = Object.fromEntries(taxonomy.categories.map((c) => [c.id, c.label]));

const behDir = join(SEED, 'behaviours');
const behaviours = readdirSync(behDir)
  .filter((f) => f.endsWith('.json'))
  .flatMap((f) => readJson(join(behDir, f)));

mkdirSync(OUT_CONTENT, { recursive: true });

// Per-category slices (fetched lazily when a category page is opened).
for (const c of taxonomy.categories) {
  const slice = behaviours.filter((b) => b.category === c.id);
  writeFileSync(join(OUT_CONTENT, `${c.id}.json`), JSON.stringify(slice));
}

// A single tiny search index, answered entirely in the browser.
const index = behaviours.map((b) => ({
  id: b.id,
  title: b.title,
  norm: b.norm,
  cat: b.category,
  catLabel: catLabel[b.category] || b.category,
  keywords: [b.wit || '', ...(b.affects || [])].join(' '),
}));
writeFileSync(join(OUT, 'search-index.json'), JSON.stringify(index));

console.log(
  `[content] ${behaviours.length} behaviours across ${taxonomy.categories.length} categories -> ` +
    `public/content/*.json + public/search-index.json`,
);
