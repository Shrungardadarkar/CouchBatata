import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

// Pulls out just the standalone declarations findVoicings() actually needs
// (OPEN, FORMULAS, IVNAME, FAMILIAR_VOICING_TEMPLATES, setEq, findVoicings)
// and runs them in an isolated sandbox — no DOM, no browser. Each is grabbed
// independently (not as one contiguous slice of the file) because unrelated
// code sits between them, including top-level statements that touch
// localStorage/window and would throw outside a browser.
function extractStatement(html, marker, openChar, closeChar, fromIndex = 0) {
  const idx = html.indexOf(marker, fromIndex);
  assert.notEqual(idx, -1, `could not find "${marker}" in index.html`);
  const openIdx = html.indexOf(openChar, idx);
  let depth = 0, i = openIdx, end = -1;
  for (; i < html.length; i++) {
    if (html[i] === openChar) depth++;
    else if (html[i] === closeChar) {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  assert.notEqual(end, -1, `could not find matching "${closeChar}" for "${marker}"`);
  if (html[end] === ";") end++;
  return html.slice(idx, end);
}

function extractVoicingCore(html) {
  const parts = [
    extractStatement(html, "const OPEN=", "[", "]"),
    extractStatement(html, "const FORMULAS=", "[", "]"),
    extractStatement(html, "const IVNAME=", "{", "}"),
    extractStatement(html, "const FAMILIAR_VOICING_TEMPLATES=", "[", "]"),
    extractStatement(html, "function setEq(a,b){", "{", "}"),
    extractStatement(html, "function findVoicings(rootPc,ivs){", "{", "}"),
  ];
  // const/let declarations don't become own-properties of the vm context
  // object, so wrap everything in an IIFE and return the bindings we need —
  // vm.runInContext() gives back the script's completion value.
  const wrapped = `(function(){\n${parts.join("\n")}\nreturn {OPEN,FORMULAS,IVNAME,FAMILIAR_VOICING_TEMPLATES,setEq,findVoicings};\n})()`;
  const sandbox = {};
  vm.createContext(sandbox);
  return vm.runInContext(wrapped, sandbox, { filename: "index.html (voicing core)" });
}

const html = await readFile(join(root, "index.html"), "utf8");
const { OPEN, FORMULAS, FAMILIAR_VOICING_TEMPLATES, findVoicings } = extractVoicingCore(html);

assert.ok(Array.isArray(OPEN) && OPEN.length === 6, "OPEN must be a 6-string tuning array");
assert.ok(Array.isArray(FORMULAS) && FORMULAS.length > 0, "FORMULAS must be non-empty");
assert.ok(Array.isArray(FAMILIAR_VOICING_TEMPLATES), "FAMILIAR_VOICING_TEMPLATES must be an array");
assert.equal(typeof findVoicings, "function", "findVoicings must be extracted as a function");

// 1. Every catalogued template must contain exactly the pitch classes its
//    formula requires — this is the check that would have caught the C7
//    (missing 5th) and mistyped-barre reference errors made by hand earlier.
for (const t of FAMILIAR_VOICING_TEMPLATES) {
  const f = FORMULAS.find(x => x.suf === t.suf);
  assert.ok(f, `FAMILIAR_VOICING_TEMPLATES: no FORMULAS entry for suf="${t.suf}"`);
  const midis = [];
  t.frets.forEach((fret, i) => { if (fret >= 0) midis.push(OPEN[i] + fret); });
  const pcsPresent = [...new Set(midis.map(m => ((m - t.root) % 12 + 12) % 12))].sort((a, b) => a - b);
  const expected = [...f.iv].sort((a, b) => a - b);
  assert.deepEqual(
    pcsPresent, expected,
    `template root=${t.root} suf="${t.suf}" frets=[${t.frets}] has pitch classes [${pcsPresent}], expected [${expected}]`
  );
}

// 2. Every catalogued template must actually be the voicing findVoicings()
//    offers for its exact root/quality — proves the splice in findVoicings
//    is wired correctly, not just that the catalogue itself is valid.
for (const t of FAMILIAR_VOICING_TEMPLATES) {
  const f = FORMULAS.find(x => x.suf === t.suf);
  const voicings = findVoicings(t.root, f.iv);
  const found = voicings.some(v => v.frets.join(",") === t.frets.join(","));
  assert.ok(found, `root=${t.root} suf="${t.suf}": expected [${t.frets}] among offered voicings, got ${JSON.stringify(voicings.map(v => v.frets))}`);
}

// 3. Breadth: every one of the 12 roots x FORMULAS.length chord qualities
//    must return between 1 and 5 voicings — never empty, never over the cap.
let combos = 0;
for (const f of FORMULAS) {
  for (let root = 0; root < 12; root++) {
    combos++;
    const voicings = findVoicings(root, f.iv);
    assert.ok(
      voicings.length >= 1 && voicings.length <= 5,
      `root=${root} suf="${f.suf}" returned ${voicings.length} voicings (expected 1-5)`
    );
  }
}
assert.equal(combos, 12 * FORMULAS.length, "sanity: combo count should be 12 x FORMULAS.length");

console.log(`✓ ${FAMILIAR_VOICING_TEMPLATES.length} familiar-voicing templates are pitch-correct and offered`);
console.log(`✓ all ${combos} root x formula combinations return 1-5 voicings`);
