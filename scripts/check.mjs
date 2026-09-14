import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const projects = JSON.parse(await readFile(path.join(root, 'src/projects.json'), 'utf8'));
assert(Array.isArray(projects) && projects.length > 0, 'At least one project is required.');
const ids = new Set();
const states = new Set(['development', 'awaiting-demo', 'playable']);
const videos = new Set();
const localAsset = value => typeof value === 'string' && /^assets\/[a-zA-Z0-9._/-]+$/.test(value) && !value.includes('..');
for (const project of projects) {
  assert(/^[a-z][a-z0-9-]*$/.test(project.id) && !ids.has(project.id), 'Project IDs must be valid and unique.');
  ids.add(project.id);
  for (const field of ['name', 'englishName', 'kind', 'description', 'note']) {
    assert(typeof project[field] === 'string' && project[field].trim(), `${project.id}: ${field} is required.`);
  }
  if (project.repositoryLabel !== undefined) assert(typeof project.repositoryLabel === 'string' && project.repositoryLabel.trim(), `${project.id}: repositoryLabel must be nonempty text.`);
  assert(states.has(project.status), `${project.id}: invalid status.`);
  assert(Array.isArray(project.tags) && project.tags.every(tag => typeof tag === 'string' && tag.trim()), `${project.id}: invalid tags.`);
  assert(new URL(project.repository).origin === 'https://github.com', `${project.id}: use the GitHub repository URL.`);
  assert(Boolean(project.demoUrl) === (project.status === 'playable'), `${project.id}: only a published demo may be playable.`);
  if (project.demoUrl) assert(new URL(project.demoUrl).protocol === 'https:', `${project.id}: demo must use HTTPS.`);
  if (project.image) {
    assert(localAsset(project.image), 'Images must be local assets.');
    assert(typeof project.imageAlt === 'string' && project.imageAlt.trim(), 'Images need alternate text.');
    assert((await stat(path.join(root, 'dist', project.image))).isFile(), `${project.image} is missing.`);
  }
  if (project.video) {
    assert(localAsset(project.video) && /\.mp4$/i.test(project.video), `${project.id}: use a local MP4 trailer.`);
    assert(localAsset(project.videoPoster) && /\.(jpg|jpeg|png|webp)$/i.test(project.videoPoster), `${project.id}: a local first-frame poster is required.`);
    assert(Number.isInteger(project.videoWidth) && project.videoWidth > 0 && Number.isInteger(project.videoHeight) && project.videoHeight > 0, `${project.id}: video dimensions must preserve the capture's aspect ratio.`);
    for (const reference of [project.video, project.videoPoster]) {
      assert((await stat(path.join(root, 'dist', reference))).isFile(), `${reference} is missing.`);
    }
    const header = (await readFile(path.join(root, 'dist', project.video))).subarray(4, 8).toString('ascii');
    assert(header === 'ftyp', `${project.video}: expected an actual MP4 file.`);
    videos.add(path.join(root, 'dist', project.video));
  }
}
const html = await readFile(path.join(root, 'dist/index.html'), 'utf8');
assert(!/\{\{[A-Z]+\}\}/.test(html), 'Unresolved template values.');
assert((html.match(/<article /g) || []).length === projects.length, 'Missing project cards.');
const videoTags = [...html.matchAll(/<video\b([^>]*)>/g)];
assert(videoTags.length === projects.filter(project => project.video).length, 'Every trailer needs one player.');
for (const [, attributes] of videoTags) {
  assert(/\sdata-src="assets\//.test(attributes) && !/\ssrc=/.test(attributes), 'Trailer requests must start only after a visitor clicks play.');
  assert(/\spreload="none"/.test(attributes) && /\splaysinline(?:\s|$)/.test(attributes), 'Trailers must defer loading and support inline mobile playback.');
  assert(/\sposter="assets\//.test(attributes), 'Trailers must display a first-frame poster.');
  assert(/\saria-hidden="true"/.test(attributes) && /\stabindex="-1"/.test(attributes), 'Inactive poster-only videos must not expose an unplayable media control to assistive technology.');
  assert(!/\s(?:autoplay|loop)(?:\s|=|$)/.test(attributes), 'Trailers must not autoplay or loop.');
}
for (const [, reference] of html.matchAll(/(?:src|href|poster)="([^"]+)"/g)) {
  if (/^https:\/\//.test(reference) || reference.startsWith('#') || reference === './') continue;
  assert((await stat(path.join(root, 'dist', reference))).isFile(), `Missing local resource: ${reference}`);
}
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await inspect(file);
    else {
      assert(!/\.(wasm|pck|zip|exe|dmg)$/i.test(entry.name), 'Gallery publishing must never include game builds.');
      assert(!/\.(mp4|webm|mov|m4v|avi)$/i.test(entry.name) || videos.has(file), 'Publish only explicitly declared promotional videos.');
      const limit = videos.has(file) ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
      assert((await stat(file)).size < limit, `${path.relative(root, file)} exceeds its ${limit / 1024 / 1024} MiB media budget.`);
    }
  }
}
await inspect(path.join(root, 'dist'));
console.log(`Validated ${projects.length} projects, local assets, safe links, and gallery-only publishing.`);
