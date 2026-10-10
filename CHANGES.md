# Update summary

## This revision

- Added a first-visit sound invitation with an explicit user gesture to enable the generative score and a clear silent option.
- Fixed case-study scrolling by stopping Lenis while a native project dialog is open, keeping modal scrolling contained, restoring Lenis when closed, and styling scrollbars.
- Made project cover and information surfaces interactive. Case-study content opens from the card body; a configured first project URL makes the cover image open that link in a new tab. Other project URLs appear below the card and inside the case study.
- Added subtle pointer-driven 3D tilt and layered cover motion to project cards.
- Added a lightweight glow and sparkle cursor trail for mouse/trackpad users, disabled for touch and reduced-motion preferences.
- Removed em-dash and en-dash punctuation from the website source in favor of regular hyphens.
- Removed the invented combined "AI/ML & voice systems" card and split the project grid into the actual individual resume projects: Campus Dashboard, FlingBizz, NodeBoard, GTA-IITR, Redemption IITR, Hercules Habit Warrior and TargetChase.
- Added per-project link arrays with instructions for live pages, YouTube videos, Figma prototypes, GitHub repositories or social posts.
- Improved secondary text contrast and retained the existing reduced-motion and no-WebGL fallbacks.

## Validation

- JavaScript syntax checks pass for all source modules.
- Static checks confirm seven separate project records and no remaining em-dash / en-dash punctuation in website source files.
- A full Vite production build still needs to be run locally with dependencies installed (`npm install` then `npm run build`).

## Asset note

The covers are authored inline SVG illustrations, not screenshots of the actual products. Replace or supplement them with real screenshots, Figma frames or demo recordings before treating the portfolio as final.
