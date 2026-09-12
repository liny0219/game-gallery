# Game gallery requirements

- This desktop checkout is the source for `liny0219/game-gallery`.
- Maintain responsive support for mobile, tablet and desktop. Check 320px narrow screens, phone landscape, tablet and 200% text sizing when changing layout.
- Keep cover text in normal document flow so it can wrap and grow. Do not hide horizontal overflow to mask layout defects.
- Preserve browser zoom, safe-area insets, keyboard focus, reduced-motion preferences and usable touch targets (48px for primary project links, at least 44px for other common links).
- This repository publishes only the gallery, its styles and display assets. Never copy, build or publish either game's playable package here.
- Keep 《月痕 · 迷途之森 / MOONWILD》 first, linked to `https://liny0219.github.io/moonwild-web/` and `https://github.com/liny0219/moonwild-web`. 《歧路 · 八贤之塔 / TOWER OF THE EIGHT》 is second, linked to `https://liny0219.github.io/eight-sages-tower-play/` and `https://github.com/liny0219/eight-sages-tower-play`. Both are playable. Both repositories are public Web build repositories, not game source; label their links “构建仓库” and never direct visitors to private source repositories. Do not restore the former name/repository or the obsolete `/moonwild/` or `moonwild-play` URLs.
- Do not show or maintain game version numbers or release-specific content counts in project cards. Keep introductions brief and link to the stable official demo URLs; routine game updates must not require gallery changes.
- For future projects, keep `demoUrl` null until a verified official HTTPS URL is provided; only then set `status: "playable"`.
- Update `src/`, then run `node scripts/build.mjs` and `node scripts/check.mjs`. Commit the generated `dist/` alongside its source. Temporary QA fixtures belong in ignored `work/` and must not be published.
- GitHub Pages at `https://liny0219.github.io/game-gallery/` is the default public publishing and sharing destination. Visitors must not need to log in. Publish future updates through the existing GitHub Pages workflow and use this URL for browser handoff and final links.
- The existing `.openai/hosting.json` is a historical private Sites preview configuration. Preserve its project ID, but do not deploy or share that preview unless the user explicitly requests Sites again.
