// "No citation, no claim" - fails the build on any uncited or malformed claim.
// Also enforces the honesty rules: a magnitude number is only allowed on the
// top evidence tiers, and every claim must state a jurisdiction + a verbatim
// supporting line.
//
// Second pass: translation overlays (data/seed/i18n/*.json) may re-word the
// human framing ONLY. Any attempt to add or change a citation, a number, a
// source or a date in a translation is a hard failure - a foreign-language card
// must never carry a claim the English source doesn't.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const behDir = join(ROOT, 'data', 'seed', 'behaviours');
const overlayDir = join(ROOT, 'data', 'seed', 'i18n');
const taxonomy = JSON.parse(readFileSync(join(ROOT, 'data', 'seed', 'taxonomy.json'), 'utf8'));

const TIERS = ['strong', 'official', 'suggestive', 'mechanism'];
const NUMBER_ALLOWED = new Set(['strong', 'official']);
const errors = [];

function isUrl(s) {
  return typeof s === 'string' && /^https?:\/\/\S+$/.test(s);
}
function isDate(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(s) <= new Date();
}

// --- Pass 1: the canonical English seed -------------------------------------
const catIds = new Set(taxonomy.categories.map((c) => c.id));
const behById = new Map(); // id -> canonical behaviour (for overlay bounds)
let claimCount = 0;
for (const file of readdirSync(behDir).filter((f) => f.endsWith('.json'))) {
  const list = JSON.parse(readFileSync(join(behDir, file), 'utf8'));
  for (const b of list) {
    behById.set(b.id, b);
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

// --- Pass 2: translation overlays -------------------------------------------
// Only these fields may appear in an overlay. Everything about the EVIDENCE
// (numbers, sources, dates, tiers, jurisdiction, the verbatim quote) is absent
// on purpose - it is inherited, untranslated, from the English seed.
const CAT_FIELDS = new Set(['label', 'question', 'blurb']);
const BEH_FIELDS = new Set(['title', 'norm', 'closer', 'goesRight', 'affects', 'wit', 'impact']);
const CLAIM_FIELDS = new Set(['cause', 'mechanism', 'effect', 'caveat']);

let overlayCount = 0;
let translatedStrings = 0;
if (existsSync(overlayDir)) {
  for (const file of readdirSync(overlayDir).filter((f) => f.endsWith('.json'))) {
    overlayCount++;
    const where = `i18n/${file}`;
    let ov;
    try {
      ov = JSON.parse(readFileSync(join(overlayDir, file), 'utf8'));
    } catch (e) {
      errors.push(`${where}: invalid JSON - ${e.message}`);
      continue;
    }
    for (const k of Object.keys(ov)) {
      if (k !== 'categories' && k !== 'behaviours') errors.push(`${where}: unexpected top-level key "${k}"`);
    }
    for (const [id, c] of Object.entries(ov.categories || {})) {
      if (!catIds.has(id)) errors.push(`${where}: unknown category "${id}"`);
      for (const [k, v] of Object.entries(c || {})) {
        if (!CAT_FIELDS.has(k)) errors.push(`${where}: category "${id}" has forbidden field "${k}"`);
        else if (typeof v === 'string' && v.trim()) translatedStrings++;
      }
    }
    for (const [id, b] of Object.entries(ov.behaviours || {})) {
      const canon = behById.get(id);
      if (!canon) errors.push(`${where}: unknown behaviour "${id}"`);
      for (const [k, v] of Object.entries(b || {})) {
        if (!BEH_FIELDS.has(k)) {
          errors.push(`${where}: behaviour "${id}" has forbidden field "${k}" (citations are never translated)`);
          continue;
        }
        if (k === 'impact') {
          if (!Array.isArray(v)) errors.push(`${where}: "${id}".impact must be an array`);
          else {
            if (canon && v.length > canon.impact.length)
              errors.push(`${where}: "${id}".impact has more claims (${v.length}) than the source (${canon.impact.length})`);
            v.forEach((claim, i) => {
              for (const [ck, cv] of Object.entries(claim || {})) {
                if (!CLAIM_FIELDS.has(ck))
                  errors.push(`${where}: "${id}".impact[${i}] has forbidden field "${ck}" (numbers/sources stay canonical)`);
                else if (typeof cv === 'string' && cv.trim()) translatedStrings++;
              }
            });
          }
        } else if (k === 'affects') {
          if (!Array.isArray(v)) errors.push(`${where}: "${id}".affects must be an array`);
          else translatedStrings += v.length;
        } else if (typeof v === 'string' && v.trim()) {
          translatedStrings++;
        }
      }
    }
  }
}

if (errors.length) {
  console.error(`\n[validate] FAILED - ${errors.length} problem(s):`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(
  `[validate] OK - ${claimCount} cited claims, every one carries a source + date; ` +
    `${overlayCount} translation overlay(s), ${translatedStrings} translated strings, none touching a citation.`,
);
