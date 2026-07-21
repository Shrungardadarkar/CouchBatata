import assert from "node:assert/strict";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Compares findVoicings() output across all 300 root x formula combinations
// between the current working-tree index.html and a git ref (default HEAD).
// This is a reporting tool for manual review, not a pass/fail gate: some
// changes are deliberate (that's the point of touching findVoicings at all).
// AGENTS.md requires running this after any FORMULAS/OPEN/findVoicings edit
// and inspecting every line it prints.

const root = fileURLToPath(new URL("..", import.meta.url));
const ref = process.argv[2] || "HEAD";

function extractStatement(html, marker, openChar, closeChar, label) {
  const idx = html.indexOf(marker);
  assert.notEqual(idx, -1, `could not find "${marker}" in ${label}`);
  const openIdx = html.indexOf(openChar, idx);
  let depth = 0, i = openIdx, end = -1;
  for (; i < html.length; i++) {
    if (html[i] === openChar) depth++;
    else if (html[i] === closeChar) {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  assert.notEqual(end, -1, `could not find matching "${closeChar}" for "${marker}" in ${label}`);
  if (html[end] === ";") end++;
  return html.slice(idx, end);
}

function extractVoicingCore(html, label) {
  const parts = [
    extractStatement(html, "const OPEN=", "[", "]", label),
    extractStatement(html, "const FORMULAS=", "[", "]", label),
    extractStatement(html, "const IVNAME=", "{", "}", label),
    extractStatement(html, "const FAMILIAR_VOICING_TEMPLATES=", "[", "]", label),
    extractStatement(html, "function setEq(a,b){", "{", "}", label),
    extractStatement(html, "function findVoicings(rootPc,ivs){", "{", "}", label),
  ];
  // const/let declarations don't become own-properties of the vm context
  // object, so wrap everything in an IIFE and return the bindings we need —
  // vm.runInContext() gives back the script's completion value.
  const wrapped = `(function(){\n${parts.join("\n")}\nreturn {OPEN,FORMULAS,IVNAME,FAMILIAR_VOICING_TEMPLATES,setEq,findVoicings};\n})()`;
  const sandbox = {};
  vm.createContext(sandbox);
  return vm.runInContext(wrapped, sandbox, { filename: `${label} (voicing core)` });
}

const NOTE = ["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"];

const currentHtml = await readFile(join(root, "index.html"), "utf8");
let baselineHtml;
try {
  baselineHtml = execFileSync("git", ["show", `${ref}:index.html`], { cwd: root, encoding: "utf8", maxBuffer: 1024 * 1024 * 20 });
} catch (err) {
  console.error(`Could not read index.html at ref "${ref}": ${err.message}`);
  process.exit(1);
}

// The baseline ref may predate FAMILIAR_VOICING_TEMPLATES entirely — that's
// fine, extractStatement will just fail for that one marker, so fall back to
// an empty catalogue for the "before" side in that case.
let before;
try {
  before = extractVoicingCore(baselineHtml, `${ref}:index.html`);
} catch {
  const parts = [
    extractStatement(baselineHtml, "const OPEN=", "[", "]", ref),
    extractStatement(baselineHtml, "const FORMULAS=", "[", "]", ref),
    extractStatement(baselineHtml, "const IVNAME=", "{", "}", ref),
    "const FAMILIAR_VOICING_TEMPLATES=[];",
    extractStatement(baselineHtml, "function setEq(a,b){", "{", "}", ref),
    extractStatement(baselineHtml, "function findVoicings(rootPc,ivs){", "{", "}", ref),
  ];
  const wrapped = `(function(){\n${parts.join("\n")}\nreturn {OPEN,FORMULAS,IVNAME,FAMILIAR_VOICING_TEMPLATES,setEq,findVoicings};\n})()`;
  const sandbox = {};
  vm.createContext(sandbox);
  before = vm.runInContext(wrapped, sandbox, { filename: `${ref}:index.html (voicing core, no catalogue)` });
}
const after = extractVoicingCore(currentHtml, "working tree index.html");

let changedCount = 0;
let emptyAfter = 0;
for (const f of after.FORMULAS) {
  for (let root = 0; root < 12; root++) {
    const beforeFormula = before.FORMULAS.find(x => x.suf === f.suf);
    const beforeVoicings = beforeFormula ? before.findVoicings(root, beforeFormula.iv) : [];
    const afterVoicings = after.findVoicings(root, f.iv);
    if (afterVoicings.length === 0) emptyAfter++;

    const beforeKey = beforeVoicings.map(v => v.frets.join(",")).sort().join("|");
    const afterKey = afterVoicings.map(v => v.frets.join(",")).sort().join("|");
    if (beforeKey !== afterKey) {
      changedCount++;
      const chord = NOTE[root] + f.suf;
      console.log(`~ ${chord}`);
      console.log(`    before: ${beforeVoicings.map(v => v.frets.join(",")).join("  ")}`);
      console.log(`    after:  ${afterVoicings.map(v => v.frets.join(",")).join("  ")}`);
    }
  }
}

console.log("");
console.log(`${changedCount} of ${12 * after.FORMULAS.length} root x formula combinations changed vs ${ref}.`);
if (emptyAfter > 0) {
  console.log(`WARNING: ${emptyAfter} combination(s) now return zero voicings.`);
  process.exitCode = 1;
}
