import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const projects = JSON.parse(await readFile(path.join(root, 'src/projects.json'), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const external = 'target="_blank" rel="noopener noreferrer"';
function projectCard(project, index) {
  const live = project.status === 'playable' && project.demoUrl;
  const image = project.image ? `<img class="cover-image" src="${escape(project.image)}" alt="${escape(project.imageAlt)}" width="1672" height="941" fetchpriority="high">` : '<div class="development-word" aria-hidden="true">A NEW ADVENTURE<br>IN THE MAKING</div>';
  return `<article class="game-card" aria-labelledby="${escape(project.id)}-title">
    <div class="game-cover ${project.image ? 'has-image' : 'cover-concept'}">
      ${image}
      <div class="cover-top"><span class="project-index">NO. ${String(index + 1).padStart(2, '0')}</span><span class="status">${live ? '<span class="status-dot" aria-hidden="true"></span>在线试玩' : '试玩待发布'}</span></div>
      <p class="cover-title" aria-hidden="true">${escape(project.englishName)}<span class="cover-caption">${project.image ? 'A JOURNEY UNDER THE MOON' : 'OCHETTE’S CARD ADVENTURE'}</span></p>
    </div>
    <div class="game-body">
      <p class="game-kicker"><span>${escape(project.kind)}</span><span>${project.version ? `v${escape(project.version)}` : 'IN DEVELOPMENT'}</span></p>
      <h3 id="${escape(project.id)}-title">${escape(project.name)}</h3>
      <p class="description">${escape(project.description)}</p>
      <ul class="tags" aria-label="游戏特色">${project.tags.map(tag => `<li>${escape(tag)}</li>`).join('')}</ul>
      <div class="game-actions">${live ? `<a class="play-link" href="${escape(project.demoUrl)}" ${external} aria-label="开始试玩${escape(project.name)}（新窗口）"><span aria-hidden="true">▶</span>开始试玩</a><a class="repo-link" href="${escape(project.repository)}" ${external} aria-label="查看${escape(project.name)}的 GitHub 项目（新窗口）">GitHub 项目 <span aria-hidden="true">↗</span></a>` : `<a class="repo-primary" href="${escape(project.repository)}" ${external} aria-label="查看${escape(project.name)}的 GitHub 项目（新窗口）">查看 GitHub 项目 <span aria-hidden="true">↗</span></a>`}</div>
      <p class="game-note">${escape(project.note)}</p>
    </div>
  </article>`;
}
const template = await readFile(path.join(root, 'src/template.html'), 'utf8');
const html = template.replaceAll('{{COUNT}}', String(projects.length).padStart(2, '0')).replace('{{PROJECTS}}', projects.map(projectCard).join('\n'));
await rm(path.join(root, 'dist'), { recursive: true, force: true });
await mkdir(path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist/index.html'), html);
await cp(path.join(root, 'src/styles.css'), path.join(root, 'dist/styles.css'));
await cp(path.join(root, 'src/assets'), path.join(root, 'dist/assets'), { recursive: true });
await writeFile(path.join(root, 'dist/.nojekyll'), '');
console.log(`Built ${projects.length} projects into dist/.`);
