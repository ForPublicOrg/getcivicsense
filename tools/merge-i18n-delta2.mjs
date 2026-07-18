// One-off: merge the second delta batch (16 new behaviours + changed/added home
// UI strings) into the per-locale overlay and message files, without disturbing
// anything round one or the first delta already translated. Deterministic:
// translator agents only write scratch files; this script does the real merge.
//
//   node tools/merge-i18n-delta2.mjs <deltaDir>
//
// <deltaDir> holds <code>.json files each shaped { behaviours, messages }.
//   behaviours -> data/seed/i18n/<code>.json  (content overlay; closer grafted)
//   messages   -> lib/i18n/messages/<code>.json (deep-merged UI dictionary)
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const deltaDir = process.argv[2];
if (!deltaDir) {
  console.error('usage: node tools/merge-i18n-delta2.mjs <deltaDir>');
  process.exit(1);
}
const OVERLAY_DIR = join(ROOT, 'data', 'seed', 'i18n');
const MSG_DIR = join(ROOT, 'lib', 'i18n', 'messages');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

// Deep-merge src into dst (objects only; arrays/scalars overwrite).
function deepMerge(dst, src) {
  for (const [k, v] of Object.entries(src || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      dst[k] = deepMerge(dst[k] && typeof dst[k] === 'object' ? dst[k] : {}, v);
    } else {
      dst[k] = v;
    }
  }
  return dst;
}

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

  // --- content overlay: add the new behaviours ---
  const overlayPath = join(OVERLAY_DIR, `${code}.json`);
  const overlay = existsSync(overlayPath) ? readJson(overlayPath) : { categories: {}, behaviours: {} };
  overlay.categories = overlay.categories || {};
  overlay.behaviours = overlay.behaviours || {};

  // Reuse the closer couplet this locale already translated, so the new cards
  // close on the exact same line as the existing ones.
  const existingCloser = Object.values(overlay.behaviours)
    .map((b) => b && b.closer)
    .find(Boolean);

  for (const [id, cat] of Object.entries(delta.categories || {})) overlay.categories[id] = cat;
  for (const [id, beh] of Object.entries(delta.behaviours || {})) {
    if (!beh.closer && existingCloser) beh.closer = existingCloser;
    overlay.behaviours[id] = beh;
  }
  writeFileSync(overlayPath, JSON.stringify(overlay, null, 2) + '\n');

  // --- UI dictionary: deep-merge the message strings ---
  if (delta.messages) {
    const msgPath = join(MSG_DIR, `${code}.json`);
    const msg = existsSync(msgPath) ? readJson(msgPath) : {};
    deepMerge(msg, delta.messages);
    writeFileSync(msgPath, JSON.stringify(msg, null, 2) + '\n');
  }

  merged++;
  done.push(code);
}

console.log(`[merge2] merged delta for ${merged} locale(s): ${done.sort().join(', ')}`);
