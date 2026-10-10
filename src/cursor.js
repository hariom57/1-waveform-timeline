export function initCursorEffect() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'cursor-effects';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.append(canvas);
  document.body.classList.add('custom-cursor-enabled');

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) {
    canvas.remove();
    document.body.classList.remove('custom-cursor-enabled');
    return;
  }

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let pointer = { x: -100, y: -100, visible: false, interactive: false, down: false };
  let last = null;
  let raf = 0;
  const particles = [];
  const ripples = [];
  const colors = ['43, 53, 240', '54, 177, 196', '225, 181, 61', '111, 117, 231'];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function addParticle(x, y, strength = 1) {
    if (particles.length > 76) particles.splice(0, particles.length - 76);
    const angle = Math.random() * Math.PI * 2;
    const speed = (0.25 + Math.random() * 1.05) * strength;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.25,
      life: 1,
      decay: 0.012 + Math.random() * 0.022,
      size: 1 + Math.random() * 2.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      sparkle: Math.random() > 0.58
    });
  }

  function drawSparkle(x, y, size, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = `rgba(${color}, 0.95)`;
    ctx.lineWidth = 1.15;
    ctx.shadowColor = `rgba(${color}, 0.7)`;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(-size, 0); ctx.lineTo(size, 0);
    ctx.moveTo(0, -size); ctx.lineTo(0, size);
    ctx.moveTo(-size * 0.52, -size * 0.52); ctx.lineTo(size * 0.52, size * 0.52);
    ctx.moveTo(size * 0.52, -size * 0.52); ctx.lineTo(-size * 0.52, size * 0.52);
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    raf = 0;
    ctx.clearRect(0, 0, width, height);
    if (!pointer.visible && particles.length === 0 && ripples.length === 0) return;

    // Soft indigo/teal aura that follows the pointer.
    if (pointer.visible) {
      const radius = pointer.interactive ? 36 : 27;
      const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius);
      gradient.addColorStop(0, 'rgba(43, 53, 240, 0.18)');
      gradient.addColorStop(0.48, 'rgba(54, 177, 196, 0.08)');
      gradient.addColorStop(1, 'rgba(43, 53, 240, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath(); ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = pointer.interactive ? 'rgba(43, 53, 240, 0.88)' : 'rgba(25, 27, 58, 0.76)';
      ctx.lineWidth = 1.15;
      ctx.beginPath(); ctx.arc(pointer.x, pointer.y, pointer.interactive ? 8.5 : 5, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = 'rgba(54, 177, 196, 0.96)';
      ctx.beginPath(); ctx.arc(pointer.x, pointer.y, 1.6, 0, Math.PI * 2); ctx.fill();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.985; p.vy *= 0.985;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      if (p.sparkle) drawSparkle(p.x, p.y, p.size * (0.35 + p.life), p.color, p.life * 0.76);
      else {
        ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.7})`;
        ctx.shadowColor = `rgba(${p.color}, ${p.life * 0.8})`;
        ctx.shadowBlur = 7;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const ripple = ripples[i];
      ripple.radius += 1.4;
      ripple.life -= 0.035;
      if (ripple.life <= 0) { ripples.splice(i, 1); continue; }
      ctx.strokeStyle = `rgba(43, 53, 240, ${ripple.life * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2); ctx.stroke();
    }

    if (pointer.visible || particles.length || ripples.length) raf = requestAnimationFrame(draw);
  }

  function schedule() {
    if (!raf) raf = requestAnimationFrame(draw);
  }

  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.visible = true;
    pointer.interactive = Boolean(event.target.closest?.('a, button, [role="button"]'));
    if (!last || Math.hypot(pointer.x - last.x, pointer.y - last.y) > 7) {
      addParticle(pointer.x, pointer.y, pointer.down ? 1.4 : 1);
      last = { x: pointer.x, y: pointer.y };
    }
    schedule();
  }, { passive: true });

  window.addEventListener('pointerdown', (event) => {
    pointer.down = true;
    ripples.push({ x: event.clientX, y: event.clientY, radius: 3, life: 1 });
    for (let i = 0; i < 7; i++) addParticle(event.clientX, event.clientY, 1.7);
    schedule();
  }, { passive: true });
  window.addEventListener('pointerup', () => { pointer.down = false; }, { passive: true });
  window.addEventListener('pointerleave', () => { pointer.visible = false; schedule(); }, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; }
    else if (!document.hidden) schedule();
  });
  resize();
}
