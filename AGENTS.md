# Game gallery requirements

- This desktop checkout is the source for `liny0219/game-gallery`.
- Maintain responsive support for mobile, tablet and desktop. Check 320px narrow screens, phone landscape, tablet and 200% text sizing when changing layout.
- Keep cover text in normal document flow so it can wrap and grow. Do not hide horizontal overflow to mask layout defects.
- Preserve browser zoom, safe-area insets, keyboard focus, reduced-motion preferences and usable touch targets (48px for primary project links, at least 44px for other common links).
- This repository publishes only the gallery, its styles and display assets. Never copy, build or publish either game's playable package here.
- Both demos are awaiting their respective projects' official published URLs. Keep `demoUrl` null until a verified final URL is provided; only then use `status: "playable"` and update the player note. Do not use the obsolete `moonwild-play` URL.
- Update `src/`, then run `node scripts/build.mjs` and `node scripts/check.mjs`. Commit the generated `dist/` alongside its source. Temporary QA fixtures belong in ignored `work/` and must not be published.
- Preserve the existing Sites project ID and GitHub Pages workflow; never recreate the site for an edit.
