import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = name => readFile(join(root, name), "utf8");
const required = [
  "index.html", "manifest.webmanifest", "sw.js", "icon-192-v2.png",
  "icon-512-v2.png", "icon-maskable-512-v2.png", "apple-touch-icon-v2.png",
  "app-icon-master.png", "mascot-v2.png", "og.png", "README.md", "PROJECT.md",
  "AGENTS.md", "LICENSE"
];

await Promise.all(required.map(name => access(join(root, name))));
const [html, manifestText, worker] = await Promise.all([
  read("index.html"), read("manifest.webmanifest"), read("sw.js")
]);
const manifest = JSON.parse(manifestText);

assert.match(html, /<meta name="viewport"/);
assert.match(html, /rel="manifest" href="\.\/manifest\.webmanifest"/);
assert.match(html, /serviceWorker\.register\('\.\/sw\.js'/);
assert.match(html, /A newer Couch Batata is ready/);
assert.match(html, /registration\.update\(\)/);
assert.match(html, /controllerchange/);
assert.match(html, /Solo \/ Arpeggio recorder/);
assert.match(html, /id="btnHelp"/);
assert.match(html, /id="helpPanel"/);
assert.match(html, /Need a hand\?/);
assert.match(html, /btnBoardChord/);
assert.match(html, /btnBoardLead/);
assert.match(html, /class="fret-controls"/);
assert.match(html, /id="boardLeadDisplay"/);
assert.doesNotMatch(html, /id="leadBoard"/);
assert.match(html, /data-tech="p"/);
assert.match(html, /data-tech="b"/);
assert.match(html, /btnLeadShowNotes/);
assert.match(html, /btnLeadShowTab/);
assert.match(html, /soloMode&&leadDisplay==='tab'\?String\(f\):pcName\(pc\)/);
assert.match(html, /btnLeadCreate/);
assert.match(html, /leadDraft/);
assert.match(html, /Save solo/);
assert.match(html, /soloCreationTarget/);
assert.match(html, /Edit solo/);
assert.match(html, /attachSavedLeadDrag/);
assert.match(html, /@keyframes leadPop/);
assert.match(html, /lead-pop/);
assert.doesNotMatch(html, /btnLeadUndo/);
assert.match(html, /notes:\[\{s,f\}\]/);
assert.match(html, /Solo \/ arpeggio:/);
assert.match(html, /const chord=fromSec\.chords\.splice\(drag\.sourceIdx,1\)\[0\];[\s\S]{0,500}const dropIdx=drag\.dropIdx;[\s\S]{0,250}toSec\.chords\.splice\(dropIdx,0,chord\)/,
  "Forward same-section chord drags must use the post-removal insertion index");
assert.match(html, /const \[moved\]=sections\.splice\(drag\.sourceIdx,1\);[\s\S]{0,500}const dropIdx=drag\.dropIdx;[\s\S]{0,250}sections\.splice\(dropIdx,0,moved\)/,
  "Forward section drags must use the post-removal insertion index");
assert.match(html, /fretwork\.song\.v1/);
assert.match(html, /Back up project \(\.json\)/);
assert.match(html, /@media \(pointer:coarse\)/);
assert.equal(manifest.start_url, "./index.html");
assert.equal(manifest.scope, "./");
assert.equal(manifest.display, "standalone");
assert.equal(manifest.name, "Couch Batata");
assert.match(html, /<title>A tab builder for singer-songwriters<\/title>/);
assert.equal(manifest.icons.length, 3);
assert.ok(manifest.icons.some(icon => icon.purpose === "maskable"));
assert.match(worker, /couch-batata-v\d+/);
assert.match(worker, /request\.mode === "navigate"/);

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.equal(scripts.length, 1, "Expected one inline application script");
new Function(scripts[0]);
new Function(worker);

assert.doesNotMatch(html, /<(script|link)[^>]+(?:src|href)="https?:/i,
  "Runtime scripts/styles must not load from the internet");

console.log(`✓ ${required.length} required files present`);
console.log("✓ manifest and service worker are valid");
console.log("✓ application JavaScript parses");
console.log("✓ no remote runtime dependencies or blocked vendor references");
