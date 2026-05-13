import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';

const pages = [
  ['index',       'dist/index.html'],
  ['servicios',   'dist/servicios/index.html'],
  ['industrias',  'dist/industrias/index.html'],
  ['nosotros',    'dist/nosotros/index.html'],
  ['contacto',    'dist/contacto/index.html'],
  ['cotizar',     'dist/cotizar/index.html'],
];

const ROOT = resolve(import.meta.dirname, '..');

// Severidad → peso (matches Lighthouse a11y scoring roughly)
const WEIGHT = { critical: 10, serious: 7, moderate: 3, minor: 1 };

function fmtNode(n) {
  const sel = n.target.join(' ');
  const html = n.html.length > 120 ? n.html.slice(0, 117) + '…' : n.html;
  return `      • ${sel}\n        ${html}`;
}

const summary = [];
let totalViolations = 0;
let totalWeight = 0;

for (const [name, rel] of pages) {
  const html = await readFile(resolve(ROOT, rel), 'utf8');
  const dom = new JSDOM(html, {
    url: `http://localhost/${name}`,
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    resources: 'usable',
  });
  const { window } = dom;
  // Inject axe-core source into the JSDOM window via VM eval.
  const axeSource = await readFile(resolve(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8');
  window.eval(axeSource);

  const results = await window.axe.run(window.document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
    resultTypes: ['violations', 'incomplete'],
  });

  const violations = results.violations;
  const incomplete = results.incomplete;
  const weight = violations.reduce((acc, v) => acc + (WEIGHT[v.impact] ?? 1) * v.nodes.length, 0);
  totalViolations += violations.length;
  totalWeight += weight;

  console.log(`\n=== /${name === 'index' ? '' : name} ===`);
  console.log(`Violations: ${violations.length} | Incomplete: ${incomplete.length} | Weight: ${weight}`);
  for (const v of violations) {
    console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
    console.log(`    Tags: ${v.tags.filter(t => t.startsWith('wcag') || t === 'best-practice').join(', ')}`);
    console.log(`    Nodes: ${v.nodes.length}`);
    v.nodes.slice(0, 3).forEach((n) => console.log(fmtNode(n)));
    if (v.nodes.length > 3) console.log(`        … +${v.nodes.length - 3} more`);
  }

  summary.push({ page: name, violations: violations.length, incomplete: incomplete.length, weight });
}

console.log('\n=== Summary ===');
console.table(summary);
console.log(`Total violations: ${totalViolations}`);
console.log(`Total weighted severity: ${totalWeight}`);
console.log('\nNote: axe-core does not produce a Lighthouse-equivalent score, but Lighthouse a11y uses axe rules.');
console.log('Weight 0 across pages ≈ Lighthouse a11y 100. Weight <10 with no critical/serious ≈ ≥95.');

dom?.window.close?.();
process.exit(totalWeight > 30 ? 1 : 0);
