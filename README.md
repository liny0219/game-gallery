# VEE / PLAY — 游戏作品集

个人 GitHub 游戏展示集合页，当前收录 **月痕 · 迷途之森 / MOONWILD** 与 **歧路 · 八贤之塔 / TOWER OF THE EIGHT**。

[打开集合页](https://liny0219.github.io/game-gallery/) · [GitHub](https://github.com/liny0219/game-gallery)

**正式公开地址为 GitHub Pages，任何访客均可直接打开，无需登录 GitHub 或 ChatGPT。** 后续更新默认发布到此地址，分享时也使用此地址。

## 当前状态

两款游戏均已接入独立站点的正式试玩地址，按以下顺序展示：

1. **月痕 · 迷途之森**：[Web 试玩](https://liny0219.github.io/moonwild-web/) · [构建仓库](https://github.com/liny0219/moonwild-web)。公开仓库仅提供 Web 构建与必要许可，游戏源码不公开。
2. **歧路 · 八贤之塔**：[Web 试玩](https://liny0219.github.io/eight-sages-tower-play/) · [构建仓库](https://github.com/liny0219/eight-sages-tower-play)。公开仓库仅提供 Web 构建，游戏源码不公开。

2026-09-12 核实两个试玩页面均返回 HTTP 200，页面标题与项目相符。页面仅保留简短介绍和稳定试玩地址，不展示或维护游戏版本号、卡牌数量等随版本变化的数据。游戏更新时，只要试玩地址不变，就无需重新发布集合页。保持《月痕》第一位，不使用旧的 `/moonwild/` 或 `moonwild-play` 地址。

**此仓库只发布集合页面、样式与展示图片，不存放或发布游戏试玩包，不重新构建游戏。**

## 响应式要求

- 手机、平板、桌面共用同一页面，卡片按可读宽度自动切换单列或多列。
- 支持 320px 窄屏与手机横屏；正文自然换行，封面文字可以撑开容器，不能用裁剪隐藏布局问题。
- 保留用户缩放，200% 字号下页头、封面与分类信息均可换行；页面不应横向溢出或遮挡文字。
- 主要项目按钮至少 48px 高，其他常用链接至少 44px 高；手机上项目按钮铺满卡片内容区。
- 使用安全区边距适配刘海屏；仅为精确指针启用悬停位移，尊重减少动态效果设置。

2026-09-12 使用浏览器视口检查 320×568、390×844、768×1024、624×390 和 1440×900；页面无横向溢出、两张封面的文本区域均无重叠、图片正常加载。另在 320/390/768px 宽度以 200% 根字号检查通过。该记录为桌面浏览器的尺寸模拟，不等同于 iOS/Android 真机测试。

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
| `repository` | 项目的公开 GitHub 地址 |
| `repositoryLabel` | 可选仓库链接文字，默认 `GitHub 项目`；仅发布构建时使用 `构建仓库` |
| `image` / `imageAlt` | 展示图相对路径与替代文本；无图时 `image` 为 `null` |
| `imageWidth` / `imageHeight` | 素材原始宽高 |
| `imageKind` | 正式截图用 `screenshot`，完整展示、不覆盖画面文字 |
| `coverCaption` | 可选封面副标题 |
| `note` | 对玩家有用的试玩状态或操作提示 |

拿到并核实正式地址后，将该项目 `demoUrl` 填为地址、`status` 改为 `playable`，再更新 `note`。仅在这两个条件同时满足时，页面才显示“开始试玩”。无图项目使用文字封面。

已上线项目的封面显示项目编号，试玩与构建仓库入口集中在卡片底部的可点击链接中。

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
- `.openai/hosting.json`：保留的历史 Sites 私人预览配置；该预览需要登录，后续不再默认发布或分享，正式入口使用上方的 GitHub Pages 地址。

## 素材说明

`eight-sages-tower-battle-03caa5f2.jpg` 是项目提供的正式在线移动端战斗截图，展示欧休提对阵赤岩蜥与被准星锁定的影尾狐，以及图案手牌和 BP 增幅面板。保留完整 624×390 画面，未经本集合页裁切或修改；作者为 VEE / liny0219，原作角色与相关素材权利归各自权利人所有。图片 SHA-256：`03caa5f25fb83bbee4943b30e00ecb74dc580d3319093713eca29047a3f7ae78`，文件名包含内容哈希以避免旧图缓存。

`moonwild-forest.png` 来自 MOONWILD 的正式游戏背景（原文件 `assets/forest.png`，现随本集合页保存），用于展示 VEE / liny0219 的对应作品，仅供非商业学习交流。原作角色与相关素材仍归各自权利人所有，保留[项目署名](https://github.com/liny0219/moonwild-web/blob/main/legal/NOTICE)与[素材及第三方许可说明](https://github.com/liny0219/moonwild-web/blob/main/legal/THIRD_PARTY_NOTICES.md)。没有制作或使用虚构游戏截图。

本站为非官方、非商业同人作品集合。原作角色与相关素材权利归各自权利人所有；本仓库不为游戏素材另行授予许可。
