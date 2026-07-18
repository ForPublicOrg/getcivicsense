// One-off: merge a batch of delta translations (new categories + behaviours +
// kids UI strings) into the existing per-locale overlay and message files,
// WITHOUT disturbing what round one already translated. Deterministic: agents
// only translate into scratch files; this script does the actual merge.
//
//   node tools/merge-i18n-delta.mjs <deltaDir>
//
// <deltaDir> holds <code>.json files each shaped { categories, behaviours, kids }.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const deltaDir = process.argv[2];
if (!deltaDir) {
  console.error('usage: node tools/merge-i18n-delta.mjs <deltaDir>');
  process.exit(1);
}
const OVERLAY_DIR = join(ROOT, 'data', 'seed', 'i18n');
const MSG_DIR = join(ROOT, 'lib', 'i18n', 'messages');

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

let merged = 0;
const done = [];
for (const file of readdirSync(deltaDir).filter((f) => f.endsWith('.json'))) {
  const code = file.replace(/\.json$/, '');
  let delta;
  try {
    delta = readJson(join(deltaDir, file));
  } catch (e) {
    console.warn(`WARN: ${file} is not valid JSON (${e.message}); skipped.`);
    continue;
  }

  // --- content overlay: add new categories + behaviours ---
  const overlayPath = join(OVERLAY_DIR, `${code}.json`);
  const overlay = existsSync(overlayPath) ? readJson(overlayPath) : { categories: {}, behaviours: {} };
  overlay.categories = overlay.categories || {};
  overlay.behaviours = overlay.behaviours || {};

  // Reuse the closer couplet this locale already translated in round one, so the
  // new cards close on the exact same line as the existing ones.
  const existingCloser = Object.values(overlay.behaviours)
    .map((b) => b && b.closer)
    .find(Boolean);

  for (const [id, cat] of Object.entries(delta.categories || {})) overlay.categories[id] = cat;
  for (const [id, beh] of Object.entries(delta.behaviours || {})) {
    if (!beh.closer && existingCloser) beh.closer = existingCloser;
    overlay.behaviours[id] = beh;
  }
  writeFileSync(overlayPath, JSON.stringify(overlay, null, 2) + '\n');

  // --- UI dictionary: add the kids.* namespace ---
  if (delta.kids) {
    const msgPath = join(MSG_DIR, `${code}.json`);
    const msg = existsSync(msgPath) ? readJson(msgPath) : {};
    msg.kids = delta.kids;
    writeFileSync(msgPath, JSON.stringify(msg, null, 2) + '\n');
  }

  merged++;
  done.push(code);
}

console.log(`[merge] merged delta for ${merged} locale(s): ${done.sort().join(', ')}`);
