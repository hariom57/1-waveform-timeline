# Content review before publishing

The current site has separate case studies for the projects present on the resume: Campus Dashboard, FlingBizz, NodeBoard, GTA-IITR, Redemption IITR, Hercules Habit Warrior and TargetChase. The case-study content is an edited draft. Review each sentence against the work you personally did before making the site public.

## Highest-priority assets to add

1. **Campus Dashboard:** actual landing page, event list, Thomso tracker, 3D campus map, event details and saved-plan views. Capture desktop and mobile layouts; omit personal data if any is visible.
2. **FlingBizz:** authentic Figma screens and screenshots of the implemented React Native app. Keep the contribution split clear: the co-founder created the Figma designs; Hari primarily implemented the mobile app. State that the project was paused.
3. **NodeBoard:** real canvas screenshots, a short screen recording, collaboration room state and an architecture diagram. Avoid inventing usage metrics.
4. **GTA-IITR:** actual Blender renders, Unity screenshots, environment breakdowns and award context. Distinguish team outcomes from individual contribution.
5. **Redemption IITR:** actual VR/gameplay captures, 3D asset breakdowns and environment views. Do not claim measured performance improvements unless you have measurements.
6. **Hercules Habit Warrior:** actual screens showing habit entry and the spider chart. Add a link to a live demo if it is publicly available.
7. **TargetChase:** actual screens showing the target-based goal model and progress feedback. Add a live demo or short walkthrough if available.

## How to add live, video or social links

Open `src/projects.js` and find the project object. Add URLs to its `links` array. The first link becomes the cover-image link and all links appear in the card and case study. Additional URLs can point to a YouTube demo, a public Figma prototype, a project page, a GitHub repository or a social post.

Example:

```js
links: [
  { label: 'Watch demo', href: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID' },
  { label: 'View source', href: 'https://github.com/YOUR_USERNAME/YOUR_REPO' }
],
```

Use only links that work and that you are allowed to share. If there are no public links yet, keep `links: []`; the image and project details will still open the case study.

## Claims to confirm

- Campus Dashboard's 1,000+ figure refers to measured unique visitors/analytics, not registered accounts.
- FlingBizz had a WhatsApp community of 100+ potential testers; do not state that all 100+ completed formal usability tests unless that happened.
- Best Presentation at Shrishti 2025 was a team outcome. Credit the team and explain the design / 3D work personally contributed.
- Keep product-design language grounded in actual activities. Do not claim formal interviews or usability testing unless you can describe what you did.

## Final review checklist

- [ ] Replace decorative SVG covers with genuine product visuals where available.
- [ ] Add verified live/demo/Figma/video/social links, with permission to share.
- [ ] Verify all dates, roles, metrics, awards and stack details.
- [ ] Check every case study on mobile and desktop.
- [ ] Test with reduced motion enabled and with WebGL disabled.
- [ ] Run `npm run build` before deployment.
