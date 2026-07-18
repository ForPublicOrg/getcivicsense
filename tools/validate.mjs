// "No citation, no claim" - fails the build on any uncited or malformed claim.
// Also enforces the honesty rules: a magnitude number is only allowed on the
// top evidence tiers, and every claim must state a jurisdiction + a verbatim
// supporting line.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const behDir = join(ROOT, 'data', 'seed', 'behaviours');

const TIERS = ['strong', 'official', 'suggestive', 'mechanism'];
const NUMBER_ALLOWED = new Set(['strong', 'official']);
const errors = [];

function isUrl(s) {
  return typeof s === 'string' && /^https?:\/\/\S+$/.test(s);
}
function isDate(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(s) <= new Date();
}

let claimCount = 0;
for (const file of readdirSync(behDir).filter((f) => f.endsWith('.json'))) {
  const list = JSON.parse(readFileSync(join(behDir, file), 'utf8'));
  for (const b of list) {
    const where = `${file}:${b.id}`;
    if (!b.id || !b.title || !b.norm) errors.push(`${where}: missing id/title/norm`);
    if (!b.closer) errors.push(`${where}: missing closer`);
    if (!['universal', 'non_universal'].includes(b.universality)) errors.push(`${where}: bad universality`);
    if (!Array.isArray(b.impact) || b.impact.length === 0) {
      errors.push(`${where}: no impact claims`);
      continue;
    }
    for (const c of b.impact) {
      claimCount++;
      const w = `${where} [claim]`;
      if (!c.cause || !c.mechanism || !c.effect) errors.push(`${w}: missing cause/mechanism/effect`);
      if (!isUrl(c.source_url)) errors.push(`${w}: missing/invalid source_url`);
      if (!isDate(c.retrieved_date)) errors.push(`${w}: missing/future retrieved_date`);
      if (!c.source_title || !c.publisher) errors.push(`${w}: missing source_title/publisher`);
      if (!c.supported_by) errors.push(`${w}: missing supported_by verbatim quote`);
      if (!c.jurisdiction) errors.push(`${w}: missing jurisdiction`);
      if (!TIERS.includes(c.evidence_tier)) errors.push(`${w}: bad evidence_tier "${c.evidence_tier}"`);
      if (c.magnitude && !NUMBER_ALLOWED.has(c.evidence_tier)) {
        errors.push(`${w}: magnitude number not allowed on tier "${c.evidence_tier}" (missing beats wrong)`);
      }
    }
  }
}

if (errors.length) {
  console.error(`\n[validate] FAILED - ${errors.length} problem(s):`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`[validate] OK - ${claimCount} cited claims, every one carries a source + date.`);
