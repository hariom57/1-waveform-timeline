# Hari Om Sharma - Interactive Portfolio

A scroll-driven portfolio built with Vite, Three.js, custom GLSL shaders, GSAP, Lenis and the Web Audio API. The 3D waveform and optional generated score are retained as the signature experience; the site now also includes a project grid, filters, detailed case-study dialogs, an updated milestone timeline, experience and contact sections.

## Run locally

Requires Node.js 20.19+ (or a compatible current Node release).

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

The site is static and client-side. It does not require a database, server API, environment variables, or authentication service.

## Project map

- `index.html` - page semantics, navigation, sections, metadata, dialog shell and persistent transport.
- `src/style.css` - colors, typography, responsive layouts, project cards, dialog styling, accessibility and fallbacks.
- `src/main.js` - scroll orchestration, camera path, audio/visual synchronization, section progress and WebGL fallback.
- `src/waveform.js` - procedural waveform, instanced geometry, shader materials and event marker spikes.
- `src/timeline.js` - milestone content and positioning / visibility of the timeline labels.
- `src/transport.js` - bottom scrubber, chapter ticks and timeline clock.
- `src/sound.js` - optional generative audio and a chord per section.
- `src/projects.js` - seven separate resume projects, card interactions, filters, case-study content and link configuration. Add public demo/video/social URLs to each project's `links` array.

## Updating projects

Project information lives in `src/projects.js` in the `PROJECTS` array. Each item has `id`, `number`, `title`, `kicker`, `year`, `category`, `tags`, `summary`, `metric`, `role`, `status`, `cover`, `problem`, `approach`, `decisions`, `outcome`, `stack`, `links` and `note` fields.

The `cover` field contains authored SVG artwork so the template works without external image assets. These illustrations are **not screenshots of the actual products**. Before treating this as a final public portfolio, replace them or complement them with real, high-quality screenshots, Figma frames, short demos, diagrams and verified project links. Use only visuals and metrics you can substantiate.

## Accessibility / graceful degradation

- Keyboard-accessible section navigation, project filters, dialog close and waveform scrubber.
- Native `<dialog>` for case studies, with Escape/backdrop close behavior.
- Reduced-motion preference renders the timeline as a readable static list.
- If WebGL is unavailable, the portfolio content and static timeline remain accessible without the animated background.
- Muted text colors were darkened for better contrast; still perform a WCAG contrast check against final visual changes.

## Deployment

This is a standard Vite static site. Use the repository root as the project root in Vercel, with build command `npm run build` and output directory `dist`. No environment variables are required. Keep the leading `/src/...` module and stylesheet paths if deploying at the domain root; if deploying under a subpath, configure Vite's `base` option and update asset paths accordingly.

## Project card behavior

- Clicking the project information opens the case study.
- When a project's `links` array contains URLs, clicking its cover opens the first URL in a new tab, and links appear below the card and inside the case study.
- Cards use subtle pointer-driven 3D tilt only on fine pointers and disable this effect for reduced-motion preferences.
- The first-visit dialog asks visitors whether to enter with sound. Audio is only started after a click because browsers block unsolicited audio playback.
- Project dialogs pause Lenis while open, own their own scrolling, and use styled scrollbars.
- A pointer sparkle trail is enabled for mouse/trackpad users and omitted for touch and reduced-motion preferences.
