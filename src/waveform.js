import * as THREE from 'three';
import { SPIKE } from './timeline.js';

export const BARS = 1800;

// Deterministic pseudo-audio: the "recording" this page plays back.
// Shared by the 3D waveform and the transport bar so both show the same track.
function hash(n) {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}
export const ENVELOPE = new Float32Array(BARS);
for (let i = 0; i < BARS; i++) {
  const u = i / BARS;
  const phrase = 0.5 + 0.5 * Math.sin(u * 23.0) * Math.sin(u * 7.0 + 1.3);
  const beat = 0.75 + 0.25 * Math.sin(i * 0.785); // a pulse every 8 bars
  ENVELOPE[i] = 0.1 + 0.9 * Math.pow(phrase, 1.4) * beat * (0.45 + 0.55 * hash(i));
}

export function makeCurve() {
  const pts = [];
  for (let i = 0; i <= 12; i++) {
    pts.push(new THREE.Vector3(Math.sin(i * 1.05) * 4.5, Math.sin(i * 0.55 + 1.0) * 1.8, -i * 17));
  }
  return new THREE.CatmullRomCurve3(pts, false, 'centripetal');
}

const vertex = /* glsl */ `
  attribute float aU;
  attribute float aEnv;
  uniform float uTime;
  uniform float uProgress;
  uniform float uIntro;
  uniform float uHeight;
  uniform float uMotion;
  uniform float uSound;
  uniform float uSpec[32];
  uniform float uMarks[24];
  uniform float uMarkCount;
  varying float vMark;
  varying vec3 vN;
  varying vec3 vW;
  varying float vU;
  varying float vY;
  varying float vPlayed;
  varying float vHead;

  void main() {
    float d = aU - uProgress;
    float head = exp(-d * d * 400000.0);

    float wob = 1.0 + 0.1 * sin(uTime * 2.3 + aU * 410.0) * uMotion;

    // live spectrum spreads out from the playhead when sound is on
    float idx = abs(d) * ${BARS.toFixed(1)};
    float spec = 0.0;
    if (idx < 31.0) {
      int k = int(idx);
      for (int j = 0; j < 32; j++) { if (j == k) spec = uSpec[j]; }
      spec *= 1.0 - idx / 31.0;
    }

    float h = aEnv * wob * uHeight + head * 0.6 + spec * uSound * 2.4;
    // timeline moments stand up as taller spikes
    float mark = 0.0;
    for (int j = 0; j < 24; j++) {
      if (float(j) < uMarkCount && abs(aU - uMarks[j]) < ${(0.6 / BARS).toFixed(6)}) mark = 1.0;
    }
    h = mix(h, uHeight * ${SPIKE.toFixed(2)} + head * 0.6, mark);
    vMark = mark;

    float rise = clamp(uIntro * 1.6 - abs(d) * 3.0, 0.0, 1.0);
    rise = rise * rise * (3.0 - 2.0 * rise);
    h = max(h * rise, 0.015);

    vec3 p = position;
    p.y *= h;
    mat4 m = modelMatrix * instanceMatrix;
    vec4 w = m * vec4(p, 1.0);
    vW = w.xyz;
    vN = normalize(mat3(m) * normal);
    vU = aU;
    vY = position.y * 2.0;
    vPlayed = smoothstep(0.0015, -0.0015, d);
    vHead = head;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uBg;
  uniform float uTime;
  uniform float uFogNear;
  uniform float uFogFar;
  varying vec3 vN;
  varying vec3 vW;
  varying float vU;
  varying float vY;
  varying float vPlayed;
  varying float vHead;
  varying float vMark;

  vec3 spectrum(float t) {
    return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
  }

  void main() {
    vec3 N = normalize(vN);
    vec3 V = normalize(cameraPosition - vW);
    float ndv = clamp(abs(dot(N, V)), 0.0, 1.0);
    vec3 L = normalize(vec3(0.35, 1.0, 0.55));
    float diff = 0.6 + 0.4 * max(dot(N, L), 0.0);
    float fres = pow(1.0 - ndv, 3.0);

    // thin-film: hue shifts with viewing angle, like oil on chrome
    vec3 film = spectrum(ndv * 0.85 + vU * 5.0 + vY * 0.12 + uTime * 0.02);
    vec3 played = mix(film, vec3(1.0), 0.12) * diff + fres * 0.45;
    played = mix(played, uInk, 0.08);

    vec3 idle = mix(uInk, uBg, 0.62) * (0.82 + 0.18 * diff) + fres * 0.12;

    vec3 col = mix(idle, played, vPlayed);
    col = mix(col, uInk, vHead);
    col = mix(col, mix(mix(uInk, uBg, 0.45), uInk, vPlayed), vMark);

    float fog = smoothstep(uFogNear, uFogFar, length(cameraPosition - vW));
    gl_FragColor = vec4(mix(col, uBg, fog), 1.0);
    #include <colorspace_fragment>
  }
`;

export function createWaveform(curve, { ink, bg }) {
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const frames = curve.computeFrenetFrames(BARS - 1, false);
  const aU = new Float32Array(BARS);
  const aEnv = new Float32Array(BARS);

  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0.03 },
    uIntro: { value: 0 },
    uHeight: { value: 3.0 },
    uMotion: { value: 1 },
    uSound: { value: 0 },
    uSpec: { value: new Float32Array(32) },
    uMarks: { value: new Float32Array(24) },
    uMarkCount: { value: 0 },
    uInk: { value: new THREE.Color(ink) },
    uBg: { value: new THREE.Color(bg) },
    uFogNear: { value: 14 },
    uFogFar: { value: 52 },
  };

  const mat = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms });
  const mesh = new THREE.InstancedMesh(geo, mat, BARS);
  mesh.frustumCulled = false;

  const m = new THREE.Matrix4();
  const up = new THREE.Vector3();
  const side = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const scale = new THREE.Vector3(0.05, 1, 0.14);
  const q = new THREE.Quaternion();

  const centers = [];
  const ups = [];
  const tangents = [];
  const baseUps = [];
  const matrices = [];
  for (let i = 0; i < BARS; i++) {
    const u = i / (BARS - 1);
    curve.getPointAt(u, pos);
    const T = frames.tangents[i];
    // slow helix: the strip turns through space as the track plays
    const twist = u * Math.PI * 2.0 * 1.25;
    up.copy(frames.normals[i]).multiplyScalar(Math.cos(twist))
      .addScaledVector(frames.binormals[i], Math.sin(twist));
    side.crossVectors(T, up).normalize();
    m.makeBasis(T, up, side);
    q.setFromRotationMatrix(m);
    m.compose(pos, q, scale);
    mesh.setMatrixAt(i, m);
    centers.push(pos.clone());
    ups.push(up.clone());
    baseUps.push(up.clone());
    tangents.push(T.clone());
    matrices.push(m.clone());
    aU[i] = u;
    aEnv[i] = ENVELOPE[i];
  }
  geo.setAttribute('aU', new THREE.InstancedBufferAttribute(aU, 1));
  geo.setAttribute('aEnv', new THREE.InstancedBufferAttribute(aEnv, 1));
  mesh.instanceMatrix.needsUpdate = true;

  // world position of the top end of a marker spike at u
  function tipAt(u, out) {
    const i = Math.round(u * (BARS - 1));
    const up = ups[i];
    const half = (uniforms.uHeight.value * SPIKE) / 2;
    return out.copy(centers[i]).addScaledVector(up, up.y >= 0 ? half : -half);
  }

  // marker spikes stand upright whatever the twist, like flag poles on the track
  let marked = [];
  const Yw = new THREE.Vector3(0, 1, 0);
  const mm = new THREE.Matrix4();
  const mq = new THREE.Quaternion();
  const mUp = new THREE.Vector3();
  const mSide = new THREE.Vector3();
  function setMarks(us) {
    for (const i of marked) {
      mesh.setMatrixAt(i, matrices[i]);
      ups[i].copy(baseUps[i]);
    }
    marked = us.map((u) => Math.round(u * (BARS - 1)));
    for (const i of marked) {
      const T = tangents[i];
      mUp.copy(Yw).addScaledVector(T, -Yw.dot(T)).normalize();
      mSide.crossVectors(T, mUp).normalize();
      mm.makeBasis(T, mUp, mSide);
      mq.setFromRotationMatrix(mm);
      mm.compose(centers[i], mq, scale);
      mesh.setMatrixAt(i, mm);
      ups[i].copy(mUp);
    }
    mesh.instanceMatrix.needsUpdate = true;
    uniforms.uMarks.value.fill(-1);
    us.forEach((u, j) => { uniforms.uMarks.value[j] = u; });
    uniforms.uMarkCount.value = us.length;
  }

  return { mesh, uniforms, tipAt, setMarks };
}
