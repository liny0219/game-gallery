# VEE / PLAY — 游戏作品集

个人 GitHub 游戏展示集合页，当前收录 **月痕 · 迷途之森 / MOONWILD** 与 **歧路 · 兽契 / WILDBOUND**。

[打开集合页](https://liny0219.github.io/game-gallery/) · [GitHub](https://github.com/liny0219/game-gallery)

## 当前状态

两款游戏都显示“试玩待发布”，目前只链接各自的 GitHub 项目。等待两个游戏项目各自构建并提供正式发布地址后，再接入试玩入口。不要使用已经失效的 `moonwild-play` 地址。

**此仓库只发布集合页面、样式与展示图片，不存放或发布游戏试玩包，不重新构建游戏。**

## 本地运行

需要 Node.js 18 或以上版本。没有第三方运行依赖，无需安装 npm 包。

```sh
node scripts/build.mjs
node scripts/check.mjs
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

在浏览器打开 `http://127.0.0.1:4173`。

## 添加项目 / 接入正式试玩地址

编辑 `src/projects.json`，增加或修改一项即可；页面数量和卡片自动生成。

| 字段 | 用途 |
| --- | --- |
| `id` | 唯一英文标识，小写字母、数字和连字符 |
| `name` / `englishName` | 中文与英文游戏名 |
| `kind` / `description` / `tags` | 类型、介绍与特色标签 |
| `status` | `development` 开发中、`awaiting-demo` 等待发布、`playable` 已有可用试玩 |
| `demoUrl` | 正式 HTTPS 试玩地址，未发布时必须为 `null` |
| `repository` | 项目的 GitHub 地址 |
| `version` | 版本号，未发布时可为 `null` |
| `image` / `imageAlt` | 展示图相对路径与替代文本；无图时 `image` 为 `null` |
| `note` | 对玩家有用的试玩状态或操作提示 |

拿到并核实正式地址后，将该项目 `demoUrl` 填为地址、`status` 改为 `playable`，再更新 `note`。仅在这两个条件同时满足时，页面才显示“开始试玩”。无图项目使用文字封面。

修改后运行构建和检查，再提交并推送：

```sh
node scripts/build.mjs
node scripts/check.mjs
git add src scripts dist README.md
git commit -m "Update game gallery"
git push
```

`main` 的推送会触发 `.github/workflows/pages.yml`，自动验证并把 `dist/` 发布到 GitHub Pages。GitHub 仓库 Settings → Pages → Source 应设置为 **GitHub Actions**。

## 文件说明

- `src/projects.json`：游戏配置，是项目内容的唯一来源。
- `src/template.html` / `src/styles.css`：页面模板与响应式样式。
- `src/assets/`：随页面发布的展示素材。
- `dist/`：生成的静态网站（纳入 Git，构建时会清空重建）。
- `scripts/check.mjs`：检查项目状态、地址、缺失资源，并阻止试玩包进入发布目录。
- `.openai/hosting.json`：同一集合页的 Sites 私人预览配置。

## 素材说明

`moonwild-forest.png` 来自 MOONWILD 的正式游戏背景 `assets/forest.png`，用于展示对应项目。[原始素材](https://github.com/liny0219/moonwild/blob/main/assets/forest.png) · [素材说明](https://github.com/liny0219/moonwild/blob/main/docs/ASSET_SOURCES.md)。没有制作或使用虚构游戏截图。

本站为非官方、非商业同人作品集合。原作角色与相关素材权利归各自权利人所有；本仓库不为游戏素材另行授予许可。
