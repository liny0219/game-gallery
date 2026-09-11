import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const projects = JSON.parse(await readFile(path.join(root, 'src/projects.json'), 'utf8'));
assert(Array.isArray(projects) && projects.length > 0, 'At least one project is required.');
const ids = new Set();
const states = new Set(['development', 'awaiting-demo', 'playable']);
for (const project of projects) {
  assert(/^[a-z][a-z0-9-]*$/.test(project.id) && !ids.has(project.id), 'Project IDs must be valid and unique.');
  ids.add(project.id);
  for (const field of ['name', 'englishName', 'kind', 'description', 'note']) {
    assert(typeof project[field] === 'string' && project[field].trim(), `${project.id}: ${field} is required.`);
  }
  assert(states.has(project.status), `${project.id}: invalid status.`);
  assert(Array.isArray(project.tags) && project.tags.every(tag => typeof tag === 'string' && tag.trim()), `${project.id}: invalid tags.`);
  assert(new URL(project.repository).origin === 'https://github.com', `${project.id}: use the GitHub repository URL.`);
  assert(Boolean(project.demoUrl) === (project.status === 'playable'), `${project.id}: only a published demo may be playable.`);
  if (project.demoUrl) assert(new URL(project.demoUrl).protocol === 'https:', `${project.id}: demo must use HTTPS.`);
  if (project.image) {
    assert(/^assets\/[a-zA-Z0-9._/-]+$/.test(project.image) && !project.image.includes('..'), 'Images must be local assets.');
    assert(typeof project.imageAlt === 'string' && project.imageAlt.trim(), 'Images need alternate text.');
    assert((await stat(path.join(root, 'dist', project.image))).isFile(), `${project.image} is missing.`);
  }
}
const html = await readFile(path.join(root, 'dist/index.html'), 'utf8');
assert(!/\{\{[A-Z]+\}\}/.test(html), 'Unresolved template values.');
assert((html.match(/<article /g) || []).length === projects.length, 'Missing project cards.');
for (const [, reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (/^https:\/\//.test(reference) || reference.startsWith('#') || reference === './') continue;
  assert((await stat(path.join(root, 'dist', reference))).isFile(), `Missing local resource: ${reference}`);
}
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await inspect(file);
    else {
      assert(!/\.(wasm|pck|zip|exe|dmg)$/i.test(entry.name), 'Gallery publishing must never include game builds.');
      assert((await stat(file)).size < 5 * 1024 * 1024, 'Keep the gallery lightweight; link to externally hosted demos.');
    }
  }
}
await inspect(path.join(root, 'dist'));
console.log(`Validated ${projects.length} projects, local assets, safe links, and gallery-only publishing.`);
