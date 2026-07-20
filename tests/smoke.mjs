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
assert.match(html, /id="scaleOverlayStatus"/);
assert.match(html, /function renderScaleOverlayStatus\(\)/);
assert.match(html, /Fretboard: '\+pcName\(scaleActive\.root\)\+' '\+scale\.name\+' active/);
assert.match(html, /Need a hand\?/);
assert.match(html, /id="btnCopy"[^>]*>Preview<\/button>/);
assert.match(html, /btnBoardMode/);
assert.match(html, /class="fret-controls"/);
assert.match(html, /id="boardLeadDisplay"/);
assert.match(html, /aria-label="Chord shape navigator"/);
assert.match(html, /chord\.frets=selection\.map\(f=>f==='x'\?-1:f\)/);
assert.doesNotMatch(html, /id="btnShapes"/);
assert.match(html, /leadTechniquePending/);
assert.match(html, /data-tech="slide"/);
assert.match(html, /leadDragBlock/);
assert.match(html, /leadSafeInsertIndex/);
assert.match(html, /editTargetId/);
assert.match(html, /id="boardTechDrawer"/);
assert.match(html, /id="chordSuggestDrawer"/);
assert.match(html, /id="chordSuggestScroll"/);
assert.match(html, /id="chordScrollPrev"/);
assert.match(html, /id="chordScrollNext"/);
assert.match(html, /paginateChordSuggestions/);
assert.match(html, /moveChordSuggestionPage/);
assert.match(html, /chord-suggest-scroll\.has-pages\{display:grid;grid-template-columns:minmax\(0,1fr\) 94px/);
assert.match(html, /chord-suggest-row\.page-slide-forward/);
assert.match(html, /@keyframes chordSuggestionForward/);
assert.match(html, /suggestion-spectrum-arrow/);
assert.match(html, /shape-nav\{display:grid;grid-template-columns:46px minmax\(0,260px\) 46px/);
assert.match(html, /shape-label\.shape-slide-forward/);
assert.match(html, /@keyframes shapeLabelForward/);
assert.match(html, /function loadShape\(direction=0\)/);
assert.match(html, /function enterShapesFor\(chordObj,playedFrets,loadInitial=true\)/);
assert.doesNotMatch(html, /id="chordScrollCue"|Swipe →/);
assert.match(html, /core <span class="suggestion-spectrum-arrow" aria-hidden="true">←/);
assert.match(html, /A raised 7th leading to V or V7/);
assert.match(html, /summary>Chord suggestions<\/summary>/);
assert.match(html, /centreRoot-contextRoot/);
assert.match(html, /const keyInfo=chords\.length\?analyzeKey\(chords\):null/);
assert.doesNotMatch(html, /function (?:findKeys|pickPrimaryKey)\(/);
assert.match(html, /Apply to selected notes/);
assert.match(html, /class="switch-toggle board-mode"/);
assert.match(html, /class="switch-toggle lead-view-toggle"/);
assert.doesNotMatch(html, /id="leadBoard"/);
assert.match(html, /data-tech="p"/);
assert.match(html, /data-tech="b"/);
assert.match(html, /id="boardLeadDisplay" type="button" role="switch"/);
assert.match(html, /soloMode&&leadDisplay==='tab'\?String\(f\):scaleNoteName\(scaleActive\.root,scaleActive\.scale,scaleIndex\)/);
assert.match(html, /btnLeadCreate/);
assert.match(html, /leadDraft/);
assert.match(html, /leadDraft\.push\(\{id:_nextLeadId\+\+,notes,t,from:null,links:null,rep:1\}\)/);
assert.match(html, /function consumeSoloChordReference\(\)/);
assert.match(html, /consumeSoloChordReference\(\);renderSong\(\);render\(\);renderLead\(\)/);
assert.match(html, /Save solo/);
assert.match(html, /soloCreationTarget/);
assert.match(html, /Edit solo/);
assert.match(html, /attachSavedLeadDrag/);
assert.match(html, /LEAD_LINK_TECHNIQUES/);
assert.match(html, /cleanBrokenLeadLinks/);
assert.match(html, /lead-link-source/);
assert.match(html, /lead-link-target/);
assert.match(html, /cue\.textContent='starts '\+leadConnectionLabel/);
assert.match(html, /link\.textContent='from '\+sourceNumber/);
assert.match(html, /leadRepeatSelect/);
assert.match(html, /duplicateLeadPhrase/);
assert.match(html, /sectionTransferPanel/);
assert.match(html, /Move \+ merge/);
assert.match(html, /cloneLeadEventsForNewSection\(source\.lead\)/);
assert.match(html, /function makePicker\(/);
assert.doesNotMatch(html, /<select\b|createElement\('select'\)/);
assert.match(html, /Repeat this solo unit/);
assert.match(html, /select the source, press the technique, choose its destination, then press Save/);
assert.match(html, /@keyframes leadPop/);
assert.match(html, /lead-pop/);
assert.match(html, /blues:\s+\{name:'Minor blues',\s+intervals:\[0,3,5,6,7,10\],\s+degrees:\['1','♭3','4','blue','5','♭7'\]/);
assert.match(html, /majBlues:\{name:'Major blues',\s+intervals:\[0,2,3,4,7,9\],\s+degrees:\['1','2','♭3','3','5','6'\]/);
assert.match(html, /lydian:\s+\{name:'Lydian',\s+intervals:\[0,2,4,6,7,9,11\],\s+degrees:\['1','2','3','♯4','5','6','7'\]/);
assert.match(html, /function scaleNoteName\(root,scaleKey,index\)/);
assert.match(html, /return scale\?pcName\(root\+scale\.intervals\[index\]\):pcName\(root\)/);
assert.match(html, /analyze\(\);render\(\);renderSong\(\);save\(\);/);
assert.doesNotMatch(html, /Swipe the strip to see more/);

const expectedScaleLibrary = [
  ['major','Major','0,2,4,5,7,9,11',"'1','2','3','4','5','6','7'"],
  ['minor','Natural minor','0,2,3,5,7,8,10',"'1','2','♭3','4','5','♭6','♭7'"],
  ['melMin','Melodic minor','0,2,3,5,7,9,11',"'1','2','♭3','4','5','6','7'"],
  ['harmMin','Harmonic minor','0,2,3,5,7,8,11',"'1','2','♭3','4','5','♭6','7'"],
  ['majPent','Major pentatonic','0,2,4,7,9',"'1','2','3','5','6'"],
  ['minPent','Minor pentatonic','0,3,5,7,10',"'1','♭3','4','5','♭7'"],
  ['blues','Minor blues','0,3,5,6,7,10',"'1','♭3','4','blue','5','♭7'"],
  ['majBlues','Major blues','0,2,3,4,7,9',"'1','2','♭3','3','5','6'"],
  ['dorian','Dorian','0,2,3,5,7,9,10',"'1','2','♭3','4','5','6','♭7'"],
  ['mixo','Mixolydian','0,2,4,5,7,9,10',"'1','2','3','4','5','6','♭7'"],
  ['lydian','Lydian','0,2,4,6,7,9,11',"'1','2','3','♯4','5','6','7'"],
  ['phrygian','Phrygian','0,1,3,5,7,8,10',"'1','♭2','♭3','4','5','♭6','♭7'"],
  ['locrian','Locrian','0,1,3,5,6,8,10',"'1','♭2','♭3','4','♭5','♭6','♭7'"]
];
for (const [key, name, intervals, degrees] of expectedScaleLibrary) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(html, new RegExp(`${key}:\\s*\\{name:'${escapedName}',\\s*intervals:\\[${intervals}\\],\\s*degrees:\\[${degrees}\\]`));
}
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
assert.match(manifest.description, /Catch the chord\. Keep the song\./);
assert.match(manifest.description, /A tab builder for singer-songwriters\./);
assert.match(html, /<title>Couch Batata — For the songs that you almost wrote\.<\/title>/);
assert.match(html, /For the songs that you almost wrote\./);
assert.match(html, /og\.png\?v=20260720/);
assert.match(html, /made with Couch Batata — Catch the chord\. Keep the song\. https:\/\/shrungardadarkar\.github\.io\/CouchBatata\//);
assert.equal(manifest.icons.length, 3);
assert.ok(manifest.icons.some(icon => icon.purpose === "maskable"));
assert.match(worker, /couch-batata-v\d+/);
assert.match(worker, /request\.mode === "navigate"/);
assert.doesNotMatch(worker, /"\.\/og\.png"/);

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.equal(scripts.length, 1, "Expected one inline application script");
new Function(scripts[0]);
new Function(worker);

assert.doesNotMatch(html, /<(script|link)[^>]+(?:src|href)="https?:/i,
  "Runtime scripts/styles must not load from the internet");

console.log(`✓ ${required.length} required files present`);
console.log("✓ manifest and service worker are valid");
console.log("✓ application JavaScript parses");
console.log("✓ no remote runtime dependencies");
