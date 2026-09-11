# Game gallery requirements

- This desktop checkout is the source for `liny0219/game-gallery`.
- Maintain responsive support for mobile, tablet and desktop. Check 320px narrow screens, phone landscape, tablet and 200% text sizing when changing layout.
- Keep cover text in normal document flow so it can wrap and grow. Do not hide horizontal overflow to mask layout defects.
- Preserve browser zoom, safe-area insets, keyboard focus, reduced-motion preferences and usable touch targets (48px for primary project links, at least 44px for other common links).
- This repository publishes only the gallery, its styles and display assets. Never copy, build or publish either game's playable package here.
- Keep 《歧路 · 八贤之塔 / TOWER OF THE EIGHT》 first, linked to `https://liny0219.github.io/eight-sages-tower/` and `https://github.com/liny0219/eight-sages-tower`. 《月痕 · 迷途之森 / MOONWILD》 is second, linked to `https://liny0219.github.io/moonwild/` and its matching GitHub repository. Both are playable. Do not restore the former name/repository or the obsolete `moonwild-play` URL.
- Do not show or maintain game version numbers or release-specific content counts in project cards. Keep introductions brief and link to the stable official demo URLs; routine game updates must not require gallery changes.
- For future projects, keep `demoUrl` null until a verified official HTTPS URL is provided; only then set `status: "playable"`.
- Update `src/`, then run `node scripts/build.mjs` and `node scripts/check.mjs`. Commit the generated `dist/` alongside its source. Temporary QA fixtures belong in ignored `work/` and must not be published.
- Preserve the existing Sites project ID and GitHub Pages workflow; never recreate the site for an edit.
