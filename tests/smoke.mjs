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
assert.match(html, /function scrollChordSuggestions\(direction\)/);
assert.match(html, /function updateChordSuggestionNav\(/);
assert.match(html, /chord-suggest-row\{display:flex[^}]*overflow-x:auto[^}]*scroll-snap-type:x proximity/);
assert.match(html, /chord-suggest-row\.can-scroll-left\.can-scroll-right/);
assert.match(html, /chord-suggestion\{flex:0 0 auto;scroll-snap-align:start/);
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
assert.match(html, /leadDisplay==='tab'\?String\(f\):scaleNoteName\(scaleActive\.root,scaleActive\.scale,scaleIndex\)/);
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
assert.match(html, /const _SONG_DB_NAME='couch-batata\.projects'/);
assert.match(html, /const _SONG_STORE='projects'/);
assert.match(html, /const _SONG_META_STORE='meta'/);
assert.match(html, /const _SONG_MIGRATION_KEY='legacy-migration\.v1'/);
assert.match(html, /let _songDbOpening=null/);
assert.match(html, /const projectRevisions=new Map\(\)/);
assert.match(html, /indexedDB\.open\(_SONG_DB_NAME,_SONG_DB_VERSION\)/);
assert.match(html, /async function initialiseSongStore\(\)/);
assert.match(html, /async function switchToSong\(id\)/);
assert.match(html, /async function createNewSong\(\)/);
assert.match(html, /async function boot\(\)/);
assert.match(html, /id="btnSongShelf"/);
assert.match(html, /id="songContextTitle"/);
assert.match(html, /id="songShelfDialog"/);
assert.match(html, /id="songShelfDialog"[^>]*tabindex="-1"/);
assert.match(html, /songShelfDialog\.focus\(\{preventScroll:true\}\)/);
assert.match(html, /\.song-shelf-actions\[hidden\]\{display:none\}/);
assert.match(html, /id="btnNewSong"/);
assert.match(html, /function commitPendingSongName\(\)/);
assert.match(html, /body class="booting" aria-busy="true"/);
assert.match(html, /<div class="wrap" inert>/);
assert.match(html, /return \[songShelfDialog,\.\.\.songShelfOverlay\.querySelectorAll\('button:not\(\[disabled\]\)'\)\]/);
assert.match(html, /element=>!element\.closest\('\[hidden\]'\)/);
assert.match(html, /Import project/);
assert.match(html, /Clear this song/);
assert.doesNotMatch(html, /id="btnSaveFresh"/);
assert.match(html, /Back up project \(\.json\)/);
assert.match(html, /Last time: building/);
assert.match(html, /flash\(restoreMsg,\{duration:5600\}\)/);
assert.match(html, /const KEY_COACH_SEEN_KEY='couch-batata\.key-coach\.v1\.seen'/);
assert.match(html, /Try these in your key:/);
assert.match(html, /data-key-root/);
assert.match(html, /function markKeyCoachSeen\(\)/);
assert.doesNotMatch(html, /function nextUnusedDiatonicChord\(/);
assert.match(html, /openStringsHintShown&&!opts\.openStringsHint/);
assert.match(html, /openStringsHint:true,closable:true/);
assert.match(html, /hideBoardSticker\(\);\s*announce\('Added '/);
assert.match(html, /announce\('Added '\+label\+' to '\+sec\.name\)/);
assert.match(html, /id="activityStatus" aria-live="polite"/);
assert.match(html, /@media \(pointer:coarse\)/);
assert.match(html, /id="btnSound"/);
assert.match(html, /id="btnStrum"/);
assert.match(html, /function pluckBuffer\(ctx,midi\)/);
assert.match(html, /function pluck\(stringIndex,midi,opts=\{\}\)/);
assert.match(html, /function strumSelection\(sel\)/);
assert.match(html, /function playLeadEventPreview\(event\)/);
assert.match(html, /function playLeadConnectionPreview\(sourceByString,technique,links,destinationNotes\)/);
assert.doesNotMatch(html, /<audio\b|new Audio\(/, "Sound must be synthesized, not loaded from audio assets");
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
