import * as THREE from 'three';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { makeCurve, createWaveform, BARS } from './waveform.js';
import { createSound } from './sound.js';
import { createTransport } from './transport.js';
import { createTimeline, EVENTS } from './timeline.js';
import { initProjects } from './projects.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let staticTimeline = reduced;
const css = getComputedStyle(document.documentElement);
const INK = css.getPropertyValue('--ink').trim();
const BG = css.getPropertyValue('--bg').trim();
const U0 = 0.03;
const U1 = 0.97;

/* ---------------- content and chapter navigation ---------------- */
const intro = document.querySelector('#intro');
const work = document.querySelector('#work');
const about = document.querySelector('#about');
const contact = document.querySelector('#contact');
const timelineEl = document.querySelector('.timeline');
const chapters = [...new Set(EVENTS.map((event) => event.chapter))];
const tracks = [
  { title: 'Intro' },
  { title: 'Selected work' },
  ...chapters.map((chapter) => ({ title: chapter })),
  { title: 'About' },
  { title: 'Contact' },
];
const timeline = createTimeline(document.querySelector('.events'));
if (staticTimeline) document.documentElement.classList.add('tl-static');
let tl = { start: 0, end: 1, spacing: 0.05 };

/* ---------------- scrolling ---------------- */
const lenis = reduced ? null : new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
const scrollP = () => Math.min(1, Math.max(0, window.scrollY / maxScroll()));
const clamp01 = (value) => Math.min(1, Math.max(0, value));
const documentTop = (el) => el.getBoundingClientRect().top + window.scrollY;
const sectionProgress = (el, offset = 0.3) => clamp01((documentTop(el) - window.innerHeight * offset) / maxScroll());

function seek(progress, smooth = true) {
  const y = clamp01(progress) * maxScroll();
  if (lenis) lenis.scrollTo(y, { immediate: !smooth, duration: 1.25 });
  else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -12, duration: 1.15 });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  });
});

/* ---------------- project grid / case studies ---------------- */
initProjects();

/* ---------------- transport + sound ---------------- */
const sound = createSound();
const transport = createTransport({ tracks, onSeek: seek });
const soundBtn = document.querySelector('.sound');
if (!sound.available) {
  soundBtn.disabled = true;
  soundBtn.textContent = 'Sound unavailable';
  soundBtn.title = 'Web Audio is not available in this browser.';
}
soundBtn.addEventListener('click', () => {
  const on = sound.toggle();
  soundBtn.setAttribute('aria-pressed', String(on));
  soundBtn.textContent = on ? 'Sound on' : 'Sound off';
});

function measure() {
  const vh = window.innerHeight;
  if (!staticTimeline) timelineEl.style.height = `${EVENTS.length * 48}vh`;
  const max = maxScroll();
  const timelineTop = documentTop(timelineEl);
  tl.start = clamp01((timelineTop - vh * 0.35) / max);
  tl.end = clamp01((timelineTop + timelineEl.offsetHeight - vh * 0.65) / max);
  if (tl.end <= tl.start) tl.end = Math.min(1, tl.start + 0.05);

  // Every event snaps to an individual waveform bar to keep labels and spikes aligned.
  const { spacing } = timeline.layout(tl.start, tl.end, (progress) => {
    const u = U0 + progress * (U1 - U0);
    return Math.round(u * (BARS - 1)) / (BARS - 1);
  });
  tl.spacing = spacing;
  wave.setMarks(timeline.items.map((item) => item.u));
  timeline.setTips(wave.tipAt);

  const chapterStarts = chapters.map((chapter) => {
    const first = timeline.items.find((item) => item.chapter === chapter);
    return first ? Math.max(tl.start, first.p - spacing * 0.3) : tl.start;
  });
  const starts = [
    0,
    sectionProgress(work, 0.24),
    ...chapterStarts,
    sectionProgress(about, 0.28),
    sectionProgress(contact, 0.28),
  ];
  // Small content/layout changes can shift anchors; enforce an ordered scrubber.
  for (let i = 1; i < starts.length; i++) starts[i] = Math.max(starts[i - 1], starts[i]);
  starts[starts.length - 1] = Math.min(1, starts[starts.length - 1]);
  transport.layout(starts);
}

/* ---------------- copy email ---------------- */
document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const defaultText = 'Copy email';
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = 'Email copied';
    } catch {
      button.textContent = 'Use the email link above';
    }
    window.setTimeout(() => { button.textContent = defaultText; }, 2400);
  });
});

/* ---------------- name: letters as level meters ---------------- */
const letters = [];
document.querySelectorAll('[data-split]').forEach((line) => {
  const text = line.textContent;
  line.textContent = '';
  line.setAttribute('aria-hidden', 'true');
  for (const char of text) {
    const span = document.createElement('span');
    span.className = 'ch';
    span.textContent = char === ' ' ? '\u00a0' : char;
    line.append(span);
    letters.push({ el: span, w: reduced ? 100 : 50, target: 100 });
  }
});
const pointer = { x: -1e4, y: -1e4, nx: 0, ny: 0 };
window.addEventListener('pointermove', (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.nx = event.clientX / Math.max(1, window.innerWidth) - 0.5;
  pointer.ny = event.clientY / Math.max(1, window.innerHeight) - 0.5;
}, { passive: true });

/* ---------------- 3D stage with a readable no-WebGL fallback ---------------- */
const canvas = document.querySelector('.stage');
let renderer = null;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
} catch (error) {
  staticTimeline = true;
  document.documentElement.classList.add('no-webgl', 'tl-static');
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(BG);
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 120);
const curve = makeCurve();
const wave = createWaveform(curve, { ink: INK, bg: BG });
scene.add(wave.mesh);
if (reduced || !renderer) wave.uniforms.uMotion.value = 0;

let mobile = false;
function resize() {
  const w = window.innerWidth;
  const h = Math.max(1, window.innerHeight);
  mobile = w < 760;
  if (renderer) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.7));
    renderer.setSize(w, h, false);
  }
  camera.aspect = w / h;
  camera.fov = mobile ? 50 : 34;
  wave.uniforms.uFogNear.value = mobile ? 24 : 14;
  wave.uniforms.uFogFar.value = mobile ? 66 : 52;
  camera.updateProjectionMatrix();
  measure();
}
window.addEventListener('resize', resize, { passive: true });
resize();

// Camera follows the playhead, looking across the waveform rather than straight down it.
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
  const distance = mobile ? 26 : 15;
  out.copy(P).addScaledVector(S, distance).addScaledVector(T, mobile ? 1.5 : 3.2).addScaledVector(Y, 2.6);
  look.copy(P).addScaledVector(T, mobile ? -1.8 : -0.6).addScaledVector(Y, mobile ? -0.6 : 1.3);
  if (!reduced) {
    out.x += pointer.nx * 0.8;
    out.y -= pointer.ny * 0.5;
  }
}
frameCamera(reduced || !renderer ? 0.5 : U0, camPos, camLook);

/* ---------------- orchestrated animation ---------------- */
const veil = document.querySelector('.veil');
const clock = new THREE.Timer();
let smoothU = reduced || !renderer ? 0.5 : U0;
let lastTrack = -1;
let level = 0;
let veilA = 1;

function tick() {
  if (document.hidden) return;
  clock.update();
  const dt = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.getElapsed();
  const progress = scrollP();
  const u = U0 + progress * (U1 - U0);
  const trackIndex = transport.set(progress);
  if (trackIndex !== lastTrack) {
    lastTrack = trackIndex;
    sound.setChord(trackIndex);
    document.body.dataset.track = tracks[trackIndex]?.title || 'Intro';
  }

  level = sound.read(wave.uniforms.uSpec.value);
  wave.uniforms.uSound.value += ((sound.on ? 1 : 0) - wave.uniforms.uSound.value) * 0.05;

  if (!reduced && renderer) {
    smoothU += (u - smoothU) * Math.min(1, dt * 6);
    wave.uniforms.uTime.value = elapsed;
    frameCamera(smoothU, wantPos, wantLook);
    camPos.lerp(wantPos, Math.min(1, dt * 4));
    camLook.lerp(wantLook, Math.min(1, dt * 4));
  } else {
    smoothU = 0.5 + (u - 0.5) * 0.06;
  }
  wave.uniforms.uProgress.value = smoothU;
  camera.position.copy(camPos);
  camera.lookAt(camLook);
  camera.updateMatrixWorld();

  const inTimeline = !staticTimeline && progress > tl.start - tl.spacing * 0.3 && progress < tl.end + tl.spacing * 0.3;
  veilA += ((inTimeline ? 0 : 1) - veilA) * Math.min(1, dt * 5);
  veil.style.opacity = (mobile ? Math.min(1, progress * 14) : 1) * veilA;

  if (!staticTimeline) {
    const fog = wave.uniforms;
    timeline.update(progress, tl.spacing, camera, window.innerWidth, window.innerHeight, fog.uFogNear.value, fog.uFogFar.value);
  }

  if (!reduced && progress < 0.2) {
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      const rect = letter.el.getBoundingClientRect();
      const dx = (rect.left + rect.width / 2 - pointer.x) / 220;
      const dy = (rect.top + rect.height / 2 - pointer.y) / 260;
      const near = Math.exp(-(dx * dx + dy * dy));
      const beat = sound.on ? level * 45 * (0.6 + 0.4 * Math.sin(elapsed * 3 + i)) : 0;
      const target = Math.min(145, letter.target + near * 40 + beat);
      letter.w += (target - letter.w) * Math.min(1, dt * 7);
      letter.el.style.setProperty('--w', letter.w.toFixed(1));
    }
  }
  if (renderer) renderer.render(scene, camera);
}

function start() {
  measure();
  window.addEventListener('load', measure, { once: true });
  if (reduced || !renderer) {
    wave.uniforms.uIntro.value = 1;
    letters.forEach((letter) => letter.el.style.setProperty('--w', 100));
  } else {
    gsap.to(wave.uniforms.uIntro, { value: 1, duration: 2.4, ease: 'power3.out' });
    letters.forEach((letter, index) => {
      letter.target = 50;
      gsap.to(letter, { target: 100, duration: 1.1, delay: 0.25 + index * 0.045, ease: 'expo.out' });
    });
  }
  gsap.ticker.add((time) => {
    if (lenis && !document.hidden) lenis.raf(time * 1000);
    tick();
  });
  gsap.ticker.lagSmoothing(0);
}

if (document.fonts?.ready) document.fonts.ready.then(start);
else start();
