import { ENVELOPE, BARS } from './waveform.js';

const RUNTIME = 272; // seconds; the page is "side A", 4:32 long

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function createTransport({ tracks, onSeek }) {
  const el = document.querySelector('.transport');
  const scrub = el.querySelector('.scrub');
  const canvas = el.querySelector('.scrub-wave');
  const ticks = el.querySelector('.ticks');
  const num = el.querySelector('.now-num');
  const title = el.querySelector('.now-title');
  const timeNow = el.querySelector('.time-now');
  const ctx = canvas.getContext('2d');
  let progress = 0;
  let current = -1;
  let starts = [];

  const css = getComputedStyle(document.documentElement);
  const ink = css.getPropertyValue('--ink').trim();
  const line = css.getPropertyValue('--line').trim();

  tracks.forEach((t, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Go to ${t.title}`);
    b.addEventListener('click', (e) => { e.stopPropagation(); onSeek(starts[i], true); });
    li.append(b);
    ticks.append(li);
  });

  function layout(trackStarts) {
    starts = trackStarts;
    [...ticks.children].forEach((li, i) => { li.style.left = `${starts[i] * 100}%`; });
    resize();
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    draw();
  }

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const dpr = w / Math.max(canvas.clientWidth, 1);
    const step = 3 * dpr;
    const n = Math.floor(w / step);
    const bar = Math.max(1, Math.round(1.5 * dpr));
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const e = ENVELOPE[Math.min(BARS - 1, Math.floor(u * BARS))];
      const bh = Math.max(dpr, e * h * 0.8);
      ctx.fillStyle = u <= progress ? ink : line;
      ctx.fillRect(i * step, (h - bh) / 2, bar, bh);
    }
  }

  function set(p) {
    const next = Math.min(1, Math.max(0, p));
    if (Math.abs(next - progress) > 0.00005) {
      progress = next;
      draw();
    } else {
      progress = next;
    }
    timeNow.textContent = fmt(p * RUNTIME);
    scrub.setAttribute('aria-valuenow', Math.round(p * 100));
    let idx = 0;
    for (let i = 0; i < starts.length; i++) if (p >= starts[i] - 0.001) idx = i;
    scrub.setAttribute('aria-valuetext', `${tracks[idx].title}, ${fmt(p * RUNTIME)}`);
    if (idx !== current) {
      current = idx;
      num.textContent = idx + 1;
      title.textContent = tracks[idx].title;
    }
    return idx;
  }

  // scrubbing
  let dragging = false;
  const seekFromEvent = (e) => {
    const r = scrub.getBoundingClientRect();
    onSeek(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), !dragging);
  };
  scrub.addEventListener('pointerdown', (e) => {
    dragging = true;
    scrub.setPointerCapture(e.pointerId);
    seekFromEvent(e);
  });
  scrub.addEventListener('pointermove', (e) => { if (dragging) seekFromEvent(e); });
  scrub.addEventListener('pointerup', () => { dragging = false; });
  scrub.addEventListener('pointercancel', () => { dragging = false; });
  scrub.addEventListener('keydown', (e) => {
    const keys = { ArrowRight: 0.02, ArrowUp: 0.02, ArrowLeft: -0.02, ArrowDown: -0.02, PageDown: 0.1, PageUp: -0.1 };
    if (e.key in keys) onSeek(Math.min(1, Math.max(0, progress + keys[e.key])), true);
    else if (e.key === 'Home') onSeek(0, true);
    else if (e.key === 'End') onSeek(1, true);
    else return;
    e.preventDefault();
  });

  window.addEventListener('resize', resize);
  return { layout, set };
}
