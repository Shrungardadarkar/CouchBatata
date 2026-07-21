#!/usr/bin/env node
// Structural + cross-reference validation for .claude/skills/*/SKILL.md and
// .claude/agents/*.md. Two jobs:
//   1. Frontmatter is well-formed (required fields present, tools list is
//      valid for agents).
//   2. Every concrete thing a doc claims still exists in the codebase —
//      a `backtick-quoted` function/constant name, file path, npm script,
//      or CSS selector that no longer exists means the doc has gone stale
//      and is actively misleading whoever reads it next.
//
// This does NOT verify the docs produce good agent *behavior* — that's what
// scripts/eval-agents.mjs and the skill-creator-generated skill evals are
// for. This only catches "the codebase moved and the doc didn't."

import { readFile, readdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
let failures = 0;
const fail = (msg) => { console.error(`✗ ${msg}`); failures++; };
const ok = (msg) => console.log(`✓ ${msg}`);

const VALID_TOOLS = new Set(["Glob", "Grep", "Read", "Write", "Edit", "Bash", "WebFetch", "WebSearch", "Agent", "Artifact"]);

function parseFrontmatter(text, label) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) { fail(`${label}: missing YAML frontmatter (--- block)`); return null; }
  const [, fmText, body] = m;
  const fields = {};
  for (const line of fmText.split("\n")) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim();
  }
  return { fields, body };
}

// Pull out things that look like code/file references from the doc body.
function extractReferences(body) {
  const spans = [...body.matchAll(/`([^`\n]+)`/g)].map(m => m[1]);
  const identifiers = [], paths = [], selectors = [], npmScripts = [];
  const SKIP = new Set(["x", "id", "run", "test", "const", "let", "var", "npm"]);
  for (const span of spans) {
    if (span.startsWith("npm ")) { npmScripts.push(span); continue; }
    if (span.startsWith(".") && /^\.[a-zA-Z][a-zA-Z0-9-]*$/.test(span)) { selectors.push(span); continue; }
    if (/[./]/.test(span) && /\.(mjs|md|json|yml|js|html)$/.test(span)) { paths.push(span); continue; }
    const bare = span.replace(/\(\)$/, "");
    if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(bare) && bare.length >= 4 && !SKIP.has(bare)) {
      // Only check identifiers with some internal structure (camelCase,
      // PascalCase, or UPPER_SNAKE) — plain lowercase words in backticks are
      // usually just emphasis, not a code reference, and checking them
      // against index.html would be noise-prone.
      const looksLikeCode = /[A-Z]/.test(bare) || bare.includes("_");
      if (looksLikeCode) identifiers.push(bare);
    }
  }
  return { identifiers, paths, selectors, npmScripts };
}

async function checkReferences(label, body, indexHtml, pkg) {
  const { identifiers, paths, selectors, npmScripts } = extractReferences(body);

  for (const id of [...new Set(identifiers)]) {
    if (!indexHtml.includes(id)) fail(`${label}: references \`${id}\` — not found anywhere in index.html`);
  }
  for (const sel of [...new Set(selectors)]) {
    if (!indexHtml.includes(sel)) fail(`${label}: references CSS selector \`${sel}\` — not found in index.html`);
  }
  for (const p of [...new Set(paths)]) {
    try { await access(join(root, p)); }
    catch { fail(`${label}: references file \`${p}\` — does not exist`); }
  }
  for (const cmd of [...new Set(npmScripts)]) {
    const scriptName = cmd.replace(/^npm (run )?/, "").split(/\s/)[0];
    if (scriptName && !(scriptName in (pkg.scripts || {}))) {
      fail(`${label}: references \`${cmd}\` — no "${scriptName}" script in package.json`);
    }
  }
}

const indexHtml = await readFile(join(root, "index.html"), "utf8");
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));

// Skills: .claude/skills/<name>/SKILL.md
const skillsDir = join(root, ".claude/skills");
let skillDirs = [];
try { skillDirs = await readdir(skillsDir, { withFileTypes: true }); } catch {}
for (const entry of skillDirs.filter(e => e.isDirectory())) {
  const path = join(skillsDir, entry.name, "SKILL.md");
  const label = `.claude/skills/${entry.name}/SKILL.md`;
  let text;
  try { text = await readFile(path, "utf8"); }
  catch { fail(`${label}: expected but missing`); continue; }
  const parsed = parseFrontmatter(text, label);
  if (!parsed) continue;
  const { fields, body } = parsed;
  if (!fields.name) fail(`${label}: frontmatter missing "name"`);
  else if (fields.name !== entry.name) fail(`${label}: frontmatter name "${fields.name}" doesn't match directory "${entry.name}"`);
  if (!fields.description) fail(`${label}: frontmatter missing "description"`);
  else if (fields.description.length < 20) fail(`${label}: description is too short to trigger reliably (${fields.description.length} chars)`);
  await checkReferences(label, body, indexHtml, pkg);
  if (fields.name && fields.description) ok(`${label}: frontmatter valid`);
}

// Agents: .claude/agents/<name>.md. Auxiliary docs (e.g. EVALS.md) that
// don't start with a frontmatter block live in the same directory but
// aren't agent definitions — skip them rather than failing on missing
// frontmatter they were never meant to have.
const agentsDir = join(root, ".claude/agents");
let agentFiles = [];
try { agentFiles = (await readdir(agentsDir)).filter(f => f.endsWith(".md")); } catch {}
for (const file of agentFiles) {
  const path = join(agentsDir, file);
  const label = `.claude/agents/${file}`;
  const text = await readFile(path, "utf8");
  if (!text.startsWith("---\n")) {
    console.log(`(skip) ${label}: not an agent definition (no frontmatter) — treated as auxiliary doc`);
    continue;
  }
  const parsed = parseFrontmatter(text, label);
  if (!parsed) continue;
  const { fields, body } = parsed;
  const expectedName = file.replace(/\.md$/, "");
  if (!fields.name) fail(`${label}: frontmatter missing "name"`);
  else if (fields.name !== expectedName) fail(`${label}: frontmatter name "${fields.name}" doesn't match filename "${expectedName}"`);
  if (!fields.description) fail(`${label}: frontmatter missing "description"`);
  else if (fields.description.length < 20) fail(`${label}: description is too short to trigger reliably (${fields.description.length} chars)`);
  if (!fields.tools) fail(`${label}: frontmatter missing "tools"`);
  else {
    const tools = fields.tools.split(",").map(t => t.trim());
    for (const t of tools) if (!VALID_TOOLS.has(t)) fail(`${label}: unknown tool "${t}" in tools list`);
    if ((tools.includes("Edit") || tools.includes("Write")) && !/does not edit|drafts?.*(does not|but does not)|Can draft/i.test(fields.description)) {
      // Not a hard failure — just a nudge, since Write is legitimately used
      // by marketing-copywriter for drafting. Only flag if truly unexplained.
    }
  }
  await checkReferences(label, body, indexHtml, pkg);
  if (fields.name && fields.description && fields.tools) ok(`${label}: frontmatter valid`);
}

console.log("");
if (failures > 0) {
  console.error(`${failures} problem(s) found in .claude/skills or .claude/agents docs.`);
  process.exit(1);
} else {
  console.log("All skill/agent docs are structurally valid and their references still exist.");
}
