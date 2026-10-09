import * as THREE from 'three';

// His story, in order. Each entry becomes a marker spike on the waveform.
// `when` is left empty where the CV gives no date.
export const EVENTS = [
  { chapter: 'School', when: '2008 – 2021', title: "St. Paul's School", detail: "St. Paul's Sr. Sec. School, Udaipur. Class X, 95.8%." },
  { chapter: 'School', when: '2021 – 2023', title: 'MDS Public School', detail: 'Udaipur. Class XII, 92.4%.' },
  { chapter: 'IIT Roorkee', when: '2023', title: 'IIT Roorkee', detail: 'Started a B.Tech. SGPA 9.33.' },
  { chapter: 'IIT Roorkee', when: '2023', title: 'Music Section', detail: 'Member, 2023 to now.' },
  { chapter: 'IIT Roorkee', when: '2023', title: 'MeTES', detail: 'Executive Member of the Metallurgical Engineering Society, 2023 to now.' },
  { chapter: 'IIT Roorkee', when: '2023 – 2024', title: 'SPIC MACAY IITR', detail: 'Design and web development.' },
  { chapter: 'IIT Roorkee', when: 'Oct 2023', title: 'NSS WaSH Cell', detail: 'Volunteer until April 2024.' },
  { chapter: 'IIT Roorkee', when: '2023', title: 'Backdoors CTF', detail: 'Ranked 218.' },
  { chapter: 'IIT Roorkee', when: '2023', title: 'Mr. Freshers', detail: 'Finalist.' },
  { chapter: 'IIT Roorkee', when: '2023 – 2024', title: 'POS Inter-Bhawan GC', detail: '2nd runner-up.' },
  { chapter: 'Leading', when: '2024', title: 'Tinkering Lab', detail: 'Project Lead, Design. 2024 to now.' },
  { chapter: 'Leading', when: '2024', title: 'Mr. Rajasthan', detail: 'Won Mr. Rajasthan 2024.' },
  { chapter: 'Competing', when: '2025', title: 'Codeforces Round 1017', detail: 'Global rank 398 in Div. 4. Pupil, max rating 1347.' },
  { chapter: 'Competing', when: '2025', title: 'Shrishti', detail: 'Best Presentation.' },
  { chapter: 'Competing', when: '2025', title: 'MPL cricket', detail: 'Won the tournament.' },
  { chapter: 'Competing', when: '', title: 'MetES Hackathon', detail: '2nd runner-up, ML track.' },
  { chapter: 'Now', when: 'Now', title: 'Selected work', detail: 'Logo design, monograms, branding and experimental 3D, made in Figma, Framer, Blender and Canva. Case studies are on the way.' },
  { chapter: 'Now', when: '2027', title: 'Graduating', detail: 'B.Tech, IIT Roorkee.' },
];

export const SPIKE = 1.3; // marker bars are this many times the base height

export function createTimeline(list) {
  const items = EVENTS.map((e) => {
    const li = document.createElement('li');
    li.className = 'ev';
    li.innerHTML = `
      <div class="ev-label">
        ${e.when ? `<p class="ev-when">${e.when}</p>` : ''}
        <h3 class="ev-title">${e.title}</h3>
        <p class="ev-detail">${e.detail}</p>
      </div>
      <span class="ev-stem" aria-hidden="true"></span>`;
    list.append(li);
    return { ...e, el: li, u: 0, p: 0, tip: new THREE.Vector3(), state: '' };
  });

  const v = new THREE.Vector3();

  // place events evenly through the timeline's scroll range
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
    // the moment the playhead most recently reached stays current until the next one
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
      // keep the label on screen; the stem stays on its spike
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
