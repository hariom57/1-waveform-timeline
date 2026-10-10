import * as THREE from 'three';

// Timeline content is intentionally hand-authored: it is a story, not a date-sorted CV.
// Keep the chapter order aligned with the transport's score progression.
export const EVENTS = [
  { chapter: 'Origins', when: '2021', title: "St. Paul's School", detail: 'Udaipur · Class X, 95.8%.' },
  { chapter: 'Origins', when: '2021–2023', title: 'MDS Public School', detail: 'Udaipur · Class XII, 92.4%.' },
  { chapter: 'Origins', when: '2023', title: 'IIT Roorkee', detail: 'Started a B.Tech. in Metallurgical & Materials Engineering.' },
  { chapter: 'Design', when: '2023–2024', title: 'SPIC MACAY', detail: 'Worked across website UI, event visuals, newsletters and social creatives.' },
  { chapter: 'Design', when: '2023–2026', title: 'MeTES', detail: 'Departmental website, posters, merchandise and event communication.' },
  { chapter: 'Creative Tech', when: '2025', title: 'GTA-IITR', detail: 'Pitched a campus-exploration game and created Blender assets for Unity.' },
  { chapter: 'Creative Tech', when: '2025', title: 'Redemption VR', detail: 'Designed and prepared 3D assets for a zombie-survival VR experience.' },
  { chapter: 'Creative Tech', when: '2025', title: 'Shrishti', detail: 'The GTA-IITR / VR showcase received Best Presentation recognition.' },
  { chapter: 'Products', when: '2025–2026', title: 'FlingBizz', detail: 'Built a React Native app from Figma designs; an early-stage product tested by a 100+ member community.' },
  { chapter: 'Products', when: '2026', title: 'Campus Dashboard', detail: 'Built a campus event experience that grew beyond 1,000 unique visitors.' },
  { chapter: 'Products', when: '2026', title: 'Thomso tracker', detail: 'Added a 3D campus map, venue navigation, event planning and a crowd heatmap.' },
  { chapter: 'Products', when: '2026', title: 'NodeBoard', detail: 'Built a real-time collaborative diagram editor using React, TypeScript and WebSockets.' },
  { chapter: 'Products', when: '2026', title: 'EZAIX', detail: 'Software engineering internship across desktop workflows, backend systems and voice AI.' },
];

export const SPIKE = 1.3;

export function createTimeline(list) {
  const items = EVENTS.map((e) => {
    const li = document.createElement('li');
    li.className = 'ev';
    const label = document.createElement('div');
    label.className = 'ev-label';
    if (e.when) {
      const when = document.createElement('p');
      when.className = 'ev-when';
      when.textContent = e.when;
      label.append(when);
    }
    const title = document.createElement('h3');
    title.className = 'ev-title';
    title.textContent = e.title;
    const detail = document.createElement('p');
    detail.className = 'ev-detail';
    detail.textContent = e.detail;
    label.append(title, detail);
    const stem = document.createElement('span');
    stem.className = 'ev-stem';
    stem.setAttribute('aria-hidden', 'true');
    li.append(label, stem);
    list.append(li);
    return { ...e, el: li, u: 0, p: 0, tip: new THREE.Vector3(), state: '' };
  });

  const v = new THREE.Vector3();
  function layout(pStart, pEnd, toU) {
    const n = items.length;
    items.forEach((it, i) => {
      it.p = pStart + ((i + 0.5) / n) * (pEnd - pStart);
      it.u = toU(it.p);
    });
    return { spacing: (pEnd - pStart) / n };
  }

  function setTips(tipAt) {
    for (const it of items) tipAt(it.u, it.tip);
  }

  function update(p, spacing, camera, w, h, fogNear, fogFar) {
    let nearest = -1;
    items.forEach((it, i) => { if (p >= it.p - spacing * 0.3) nearest = i; });
    if (nearest >= 0 && p > items[nearest].p + spacing) nearest = -1;

    items.forEach((it, i) => {
      v.copy(it.tip).project(camera);
      const dist = camera.position.distanceTo(it.tip);
      const fade = 1 - THREE.MathUtils.smoothstep(dist, fogNear * 0.8, fogFar * 0.7);
      const onScreen = v.z < 1 && v.x > -1.3 && v.x < 1.3 && v.y > -1.3 && v.y < 1.3;
      const x = ((v.x + 1) / 2) * w;
      const y = ((1 - v.y) / 2) * h;
      it.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      it.el.style.opacity = onScreen ? fade.toFixed(3) : '0';
      if (onScreen && fade > 0.01) {
        const lw = it.el.firstElementChild.offsetWidth;
        const shift = Math.max(16 - x, Math.min(0, w - 16 - (x + lw)));
        it.el.style.setProperty('--shift', `${shift.toFixed(1)}px`);
      }
      const state = i === nearest ? 'now' : it.p < p ? 'past' : 'next';
      if (state !== it.state) {
        it.el.classList.remove('is-now', 'is-past', 'is-next');
        it.el.classList.add(`is-${state}`);
        if (state === 'now') it.el.setAttribute('aria-current', 'step');
        else it.el.removeAttribute('aria-current');
        it.state = state;
      }
    });
    return nearest;
  }

  return { items, layout, setTips, update };
}
