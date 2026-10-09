// A small generative score: one chord per section, a pad and a slow arpeggio.
// Nothing loads or plays until the visitor turns sound on.

const CHORDS = [
  [50, 57, 61, 64, 66], // Dmaj9   intro
  [47, 54, 57, 61, 62], // Bm9     school
  [52, 59, 62, 66, 67], // Em9     iit roorkee
  [43, 50, 54, 57, 61], // Gmaj7#11 leading
  [40, 47, 50, 54, 55], // Em9     competing
  [45, 52, 54, 57, 59], // A6/9    now
  [50, 57, 62, 64, 69], // Dadd9   contact
];
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

export function createSound() {
  let ctx, master, filter, analyser, voices = [], arp, step = 0, chord = 0;
  let on = false;
  const bins = new Uint8Array(32);

  function build() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;
    filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1100;
    filter.Q.value = 0.6;

    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.333;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.32;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;

    analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.78;

    filter.connect(master);
    filter.connect(delay);
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(master);
    master.connect(analyser).connect(ctx.destination);

    CHORDS[0].slice(0, 4).forEach((note, i) => {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = mtof(note);
      o.detune.value = i % 2 ? 6 : -6;
      const g = ctx.createGain();
      g.gain.value = 0.035;
      o.connect(g).connect(filter);
      o.start();
      voices.push(o);
    });

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const depth = ctx.createGain();
    depth.gain.value = 450;
    lfo.connect(depth).connect(filter.frequency);
    lfo.start();
  }

  function pluck() {
    if (!on) return;
    const notes = CHORDS[chord];
    const pattern = [0, 2, 4, 3, 1, 4, 2, 3];
    const note = notes[pattern[step++ % pattern.length]] + 12;
    const t = ctx.currentTime + 0.02;
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = mtof(note);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    o.connect(g).connect(filter);
    o.start(t);
    o.stop(t + 0.75);
  }

  return {
    get on() { return on; },
    toggle() {
      if (!ctx) build();
      on = !on;
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setTargetAtTime(on ? 0.28 : 0, t, 0.25);
      if (on) {
        ctx.resume();
        clearInterval(arp);
        arp = setInterval(pluck, 333);
      } else {
        clearInterval(arp);
        setTimeout(() => { if (!on) ctx.suspend(); }, 1200);
      }
      return on;
    },
    setChord(i) {
      chord = Math.max(0, Math.min(CHORDS.length - 1, i));
      if (!ctx) return;
      const t = ctx.currentTime;
      voices.forEach((o, v) => o.frequency.setTargetAtTime(mtof(CHORDS[chord][v]), t, 0.35));
    },
    // fills a 32-length Float32Array with 0..1 levels
    read(out) {
      if (!on || !analyser) return 0;
      analyser.getByteFrequencyData(bins);
      let sum = 0;
      for (let i = 0; i < 32; i++) { out[i] = bins[i] / 255; sum += out[i]; }
      return sum / 32;
    },
  };
}
