import * as THREE from 'three';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { makeCurve, createWaveform, BARS } from './waveform.js';
import { createSound } from './sound.js';
import { createTransport } from './transport.js';
import { createTimeline, EVENTS } from './timeline.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const css = getComputedStyle(document.documentElement);
const INK = css.getPropertyValue('--ink').trim();
const BG = css.getPropertyValue('--bg').trim();

// waveform span the scroll maps onto
const U0 = 0.03;
const U1 = 0.97;

/* ---------------- sections ---------------- */
// player tracks: the intro, each chapter of the timeline, then contact
const intro = document.querySelector('#intro');
const contact = document.querySelector('#contact');
const timelineEl = document.querySelector('.timeline');
const chapters = [...new Set(EVENTS.map((e) => e.chapter))];
const tracks = [{ title: 'Intro' }, ...chapters.map((c) => ({ title: c })), { title: 'Contact' }];
const timeline = createTimeline(document.querySelector('.events'));
const staticTimeline = reduced;
if (staticTimeline) document.documentElement.classList.add('tl-static');
let tl = { start: 0, end: 1, spacing: 0.05 };

/* ---------------- scrolling ---------------- */
const lenis = reduced ? null : new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
const scrollP = () => Math.min(1, Math.max(0, window.scrollY / Math.max(1, maxScroll())));

function seek(p, smooth) {
  const y = p * maxScroll();
  if (lenis) lenis.scrollTo(y, { immediate: !smooth, duration: 1.4 });
  else window.scrollTo({ top: y });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else target.scrollIntoView();
  });
});

/* ---------------- transport + sound ---------------- */
const sound = createSound();
const transport = createTransport({ tracks, onSeek: seek });
const soundBtn = document.querySelector('.sound');
soundBtn.addEventListener('click', () => {
  const on = sound.toggle();
  soundBtn.setAttribute('aria-pressed', String(on));
  soundBtn.textContent = on ? 'Sound on' : 'Sound off';
});

function measure() {
  const vh = window.innerHeight;
  if (!staticTimeline) timelineEl.style.height = `${EVENTS.length * 70}vh`;
  const max = Math.max(1, maxScroll());
  tl.start = (timelineEl.offsetTop - vh * 0.35) / max;
  tl.end = (timelineEl.offsetTop + timelineEl.offsetHeight - vh * 0.65) / max;
  // snap each moment to a single bar so its spike and label line up
  const { spacing } = timeline.layout(tl.start, tl.end, (p) => {
    const u = U0 + p * (U1 - U0);
    return Math.round(u * (BARS - 1)) / (BARS - 1);
  });
  tl.spacing = spacing;
  {
    wave.setMarks(timeline.items.map((it) => it.u));
    timeline.setTips(wave.tipAt);
  }
  const chapterStart = chapters.map((c) => timeline.items.find((it) => it.chapter === c).p - spacing * 0.3);
  transport.layout([0, ...chapterStart, Math.min(1, (contact.offsetTop - vh * 0.5) / max)]);
}

/* ---------------- copy email ---------------- */
document.querySelectorAll('[data-copy]').forEach((b) => {
  b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      b.textContent = 'Email copied';
    } catch {
      b.textContent = 'Select the address above to copy';
    }
    setTimeout(() => { b.textContent = 'Copy email'; }, 2400);
  });
});

/* ---------------- name: letters as level meters ---------------- */
const letters = [];
document.querySelectorAll('[data-split]').forEach((line) => {
  const text = line.textContent;
  line.textContent = '';
  line.setAttribute('aria-hidden', 'true');
  for (const c of text) {
    const s = document.createElement('span');
    s.className = 'ch';
    s.textContent = c === ' ' ? ' ' : c;
    line.append(s);
    letters.push({ el: s, w: reduced ? 100 : 50, target: 100, x: 0 });
  }
});
const pointer = { x: -1e4, y: -1e4, nx: 0, ny: 0 };
window.addEventListener('pointermove', (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  pointer.nx = e.clientX / window.innerWidth - 0.5;
  pointer.ny = e.clientY / window.innerHeight - 0.5;
}, { passive: true });

/* ---------------- 3D ---------------- */
const canvas = document.querySelector('.stage');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
} catch {
  document.documentElement.classList.add('no-webgl');
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(BG);
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 120);
const curve = makeCurve();
const wave = createWaveform(curve, { ink: INK, bg: BG });
scene.add(wave.mesh);
if (reduced) wave.uniforms.uMotion.value = 0;

let mobile = false;
function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  mobile = w < 760;
  if (renderer) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    renderer.setSize(w, h, false);
  }
  camera.aspect = w / h;
  camera.fov = mobile ? 50 : 34;
  // the phone camera sits further back, so push the fog back with it
  wave.uniforms.uFogNear.value = mobile ? 24 : 14;
  wave.uniforms.uFogFar.value = mobile ? 66 : 52;
  camera.updateProjectionMatrix();
  measure();
}
window.addEventListener('resize', resize);
resize();

// camera rides beside the playhead, looking across the waveform
const camPos = new THREE.Vector3();
const camLook = new THREE.Vector3();
const P = new THREE.Vector3();
const T = new THREE.Vector3();
const S = new THREE.Vector3();
const Y = new THREE.Vector3(0, 1, 0);
const wantPos = new THREE.Vector3();
const wantLook = new THREE.Vector3();

function frameCamera(u, out, look) {
  curve.getPointAt(u, P);
  curve.getTangentAt(u, T);
  S.crossVectors(T, Y).normalize();
  const dist = mobile ? 26 : 15;
  out.copy(P).addScaledVector(S, dist).addScaledVector(T, mobile ? 1.5 : 3.2).addScaledVector(Y, 2.6);
  look.copy(P).addScaledVector(T, mobile ? -1.8 : -0.6).addScaledVector(Y, mobile ? -0.6 : 1.3);
  out.x += pointer.nx * 0.8;
  out.y -= pointer.ny * 0.5;
}

if (reduced) {
  // a still camera; scrolling only moves the playhead colour along the bars
  frameCamera(0.5, camPos, camLook);
} else {
  frameCamera(U0, camPos, camLook);
}

/* ---------------- loop ---------------- */
const veil = document.querySelector('.veil');
const clock = new THREE.Timer();
let smoothU = U0;
let lastTrack = -1;
let level = 0;
let veilA = 1;

function tick() {
  clock.update();
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.getElapsed();
  const p = scrollP();
  const u = U0 + p * (U1 - U0);

  const trackIdx = transport.set(p);
  if (trackIdx !== lastTrack) {
    lastTrack = trackIdx;
    sound.setChord(trackIdx);
    document.body.dataset.track = tracks[trackIdx].title;
  }

  level = sound.read(wave.uniforms.uSpec.value);
  wave.uniforms.uSound.value += ((sound.on ? 1 : 0) - wave.uniforms.uSound.value) * 0.05;

  if (!reduced) {
    smoothU += (u - smoothU) * Math.min(1, dt * 6);
    wave.uniforms.uTime.value = t;
    frameCamera(smoothU, wantPos, wantLook);
    camPos.lerp(wantPos, Math.min(1, dt * 4));
    camLook.lerp(wantLook, Math.min(1, dt * 4));
  } else {
    smoothU = 0.5 + (u - 0.5) * 0.06;
  }
  wave.uniforms.uProgress.value = smoothU;
  camera.position.copy(camPos);
  camera.lookAt(camLook);
  camera.updateMatrixWorld(); // labels project with this frame's camera, not last frame's

  // the reading veil is only needed where there's a text column: intro and contact
  const inTimeline = !staticTimeline && p > tl.start - tl.spacing * 0.3 && p < tl.end + tl.spacing * 0.3;
  veilA += ((inTimeline ? 0 : 1) - veilA) * Math.min(1, dt * 5);
  veil.style.opacity = (mobile ? Math.min(1, p * 14) : 1) * veilA;

  if (!staticTimeline) {
    const fog = wave.uniforms;
    timeline.update(p, tl.spacing, camera, window.innerWidth, window.innerHeight, fog.uFogNear.value, fog.uFogFar.value);
  }

  // name letters: widen near the pointer, breathe with the music
  if (!reduced && p < 0.2) {
    for (let i = 0; i < letters.length; i++) {
      const L = letters[i];
      const r = L.el.getBoundingClientRect();
      const dx = (r.left + r.width / 2 - pointer.x) / 220;
      const dy = (r.top + r.height / 2 - pointer.y) / 260;
      const near = Math.exp(-(dx * dx + dy * dy));
      const beat = sound.on ? level * 70 * (0.6 + 0.4 * Math.sin(t * 3 + i)) : 0;
      const target = Math.min(150, L.target + near * 45 + beat);
      L.w += (target - L.w) * Math.min(1, dt * 7);
      L.el.style.setProperty('--w', L.w.toFixed(1));
    }
  }

  if (renderer) renderer.render(scene, camera);
}

/* ---------------- start: the one orchestrated moment ---------------- */
function start() {
  measure();
  window.addEventListener('load', measure);
  if (reduced) {
    wave.uniforms.uIntro.value = 1;
    letters.forEach((L) => L.el.style.setProperty('--w', 100));
  } else {
    gsap.to(wave.uniforms.uIntro, { value: 1, duration: 2.4, ease: 'power3.out' });
    letters.forEach((L, i) => {
      L.target = 50;
      gsap.to(L, { target: 100, duration: 1.1, delay: 0.25 + i * 0.045, ease: 'expo.out' });
    });
  }
  gsap.ticker.add((time) => {
    if (lenis) lenis.raf(time * 1000);
    tick();
  });
  gsap.ticker.lagSmoothing(0);
}

if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
else start();
