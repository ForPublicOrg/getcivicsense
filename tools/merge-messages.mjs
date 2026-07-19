// Deterministic merge of a UI-message delta into the per-locale dictionaries.
// Translator agents only write scratch files; this script does the real merge,
// so a bad agent run can never corrupt half a file.
//
//   node tools/merge-messages.mjs <deltaDir>
//
// Each <code>.json in <deltaDir> is a PARTIAL message tree for that locale
// (e.g. { nav: { discover: "..." }, discover: {...} }); it is deep-merged into
// lib/i18n/messages/<code>.json. Missing keys still fall back to English per-key
// at runtime, so a locale we skip is never broken - only less complete.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const deltaDir = process.argv[2];
if (!deltaDir) {
  console.error('usage: node tools/merge-messages.mjs <deltaDir>');
  process.exit(1);
}
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
  const msgPath = join(MSG_DIR, `${code}.json`);
  const msg = existsSync(msgPath) ? readJson(msgPath) : {};
  deepMerge(msg, delta);
  writeFileSync(msgPath, JSON.stringify(msg, null, 2) + '\n');
  merged++;
  done.push(code);
}

console.log(`[merge-messages] merged ${merged} locale(s): ${done.sort().join(', ')}`);
