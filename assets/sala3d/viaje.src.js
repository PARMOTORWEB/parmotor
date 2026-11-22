// Entrada de la portada en 3D: un solo plano de cámara, controlado por el scroll.
// Día nublado y lluvioso: la cámara llega desde lejos, cruza el aparcamiento mojado, se planta frente
// a la fachada de piedra con el rótulo, cruza la puerta de cristal y termina dentro, delante de los cuatro coches.
// Cada coche es una herramienta: se puede girar arrastrando (con inercia) y al pulsarlo lleva a su sección.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import fuente from 'three/examples/fonts/helvetiker_bold.typeface.json';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const rng = (s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; })(20261122);

// Los cuatro coches de la sala (modelos con licencia CC BY 4.0; autores en los créditos de la página)
const MODELOS = [
  { f: 'm4.glb', largo: 4.79, pintura: { mat: 'CSR2_CarPaint', color: 0x1d4ea3 } },             // BMW M4 CS
  { f: 'amggt.glb', largo: 4.6, pintura: { mat: 'material_12' }, cristal: ['material_5'] },     // Mercedes-AMG GT Black Series
  { f: 'ghost.glb', largo: 5.55, pintura: { mat: 'primary_paint_shad', color: 0x101012 }, dos: { mat: 'secondary_paint_shad', color: 0xc9c3b6 }, cromo: ['rim_shad'] }, // Rolls-Royce Ghost
  { f: 'g500.glb', largo: 4.87 },                                                                // Mercedes-Benz Clase G
];
// Coches aparcados fuera (copias de los mismos modelos con otros colores)
const APARCADOS = [
  { m: 1, x: -21, color: 0xe2b21c }, { m: 0, x: -16.4, color: 0x6c7076 }, { m: 1, x: -11.8, color: 0x1f4396 },
  { m: 0, x: -7.2, color: 0xe7e4dd }, { m: 1, x: 9.5, color: 0xb3121b }, { m: 0, x: 14.1, color: 0x17171a },
];
// Coches expuestos detrás del escaparate (se ven desde fuera al llegar)
const ESCAPARATE = [{ m: 2, x: -22, rot: 0.5 }, { m: 1, x: -14.5, rot: -0.5, color: 0xd9d6cf }, { m: 0, x: 17, rot: 0.6, color: 0xb3121b }, { m: 3, x: 25, rot: -0.4 }];

export function iniciarViaje({ sec, canvas, room, base, estado }) {
  const tags = [...room.querySelectorAll('.car')];
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { return null; }
  const movil = matchMedia('(max-width: 760px)').matches || matchMedia('(pointer: coarse)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, movil ? 1.4 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const FOG = new THREE.Color(0x8d969f);
  scene.fog = new THREE.FogExp2(FOG, 0.0036);
  scene.background = FOG;
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 2500);
  const warm = new THREE.Color(0xffe2b8);
  const R = 2.85; // radio de las plataformas
  const tex = (w, h, draw, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; if (rep) t.repeat.set(rep[0], rep[1]); t.anisotropy = 8; return t; };

  // ---------- cielo nublado (también da los reflejos de fuera) ----------
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, toneMapped: false,
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `varying vec3 vP;
      float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5); }
      float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(h21(i), h21(i+vec2(1,0)), f.x), mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), f.x), f.y); }
      float fbm(vec2 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++){ s += a * n2(p); p *= 2.07; a *= 0.5; } return s; }
      void main(){
        float h = vP.y;
        vec3 c = mix(vec3(0.60,0.64,0.69), vec3(0.36,0.41,0.48), smoothstep(-0.02, 0.6, h));
        vec2 q = vP.xz / max(0.08, h + 0.18) * 1.6;
        float cl = fbm(q);
        c = mix(c, vec3(0.50,0.53,0.58), smoothstep(0.35, 0.75, cl) * 0.7 * smoothstep(-0.02, 0.2, h));
        c = mix(c, vec3(0.72,0.75,0.79), smoothstep(0.6, 0.95, cl) * 0.35 * smoothstep(0.0, 0.3, h));
        if (h < 0.0) c = mix(c, vec3(0.30,0.33,0.30), smoothstep(0.0, -0.15, h));
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1800, 48, 24), skyMat);
  scene.add(sky);
  const pm = new THREE.PMREMGenerator(renderer);
  const envCielo = (() => { const s = new THREE.Scene(); s.add(new THREE.Mesh(new THREE.SphereGeometry(100, 32, 16), skyMat)); return pm.fromScene(s, 0.02).texture; })();
  const envSala = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envCielo;
  scene.environmentIntensity = 1.0;
  scene.add(new THREE.HemisphereLight(0xd4dbe4, 0x3b3a33, 1.35));
  const sol = new THREE.DirectionalLight(0xe8edf3, 0.9); sol.position.set(120, 260, 200); scene.add(sol);

  // ---------- encuadre final de los cuatro coches ----------
  const LAYOUT = {
    h: { pos: [[-6.6, 3.0], [-0.8, -0.9], [4.9, -4.6], [10.6, -8.2]], dir: new THREE.Vector3(-0.22, 0.17, 1).normalize(), target: new THREE.Vector3(1.3, 1.0, -2.3), fov: 30, mx: 0.04, cy: 0.64 },
    v: { pos: [[-3.15, -3.6], [3.15, -3.6], [-3.15, 3.8], [3.15, 3.8]], dir: new THREE.Vector3(0, 0.85, 1).normalize(), target: new THREE.Vector3(0, 0.6, 0.2), fov: 38, mx: 0.06, cy: 0.69 },
  };
  const P = new THREE.Vector3();
  const encuadre = (asp, w, h) => {
    const L = LAYOUT[asp < 0.9 ? 'v' : 'h'];
    const cam = new THREE.PerspectiveCamera(L.fov, asp, 0.1, 100);
    const pts = [];
    L.pos.forEach(([x, z]) => pts.push([x - R, 0, z], [x + R, 0, z], [x, 0, z + R], [x, 1.6, z]));
    let lo = 5, hi = 90;
    for (let k = 0; k < 26; k++) {
      const d = (lo + hi) / 2;
      cam.position.copy(L.target).addScaledVector(L.dir, d); cam.lookAt(L.target); cam.updateMatrixWorld(); cam.updateProjectionMatrix();
      if (pts.every(([x, y, z]) => Math.abs(P.set(x, y, z).project(cam).x) <= 1 - L.mx)) hi = d; else lo = d;
    }
    cam.position.copy(L.target).addScaledVector(L.dir, hi); cam.lookAt(L.target); cam.updateMatrixWorld();
    const c = L.pos.reduce((a, [x, z]) => [a[0] + x / 4, a[1] + z / 4], [0, 0]);
    const y0 = P.set(c[0], 0.4, c[1]).project(cam).y;
    return { L, pos: cam.position.clone(), target: L.target.clone(), fov: L.fov, off: -((y0 - (1 - 2 * L.cy)) * (h || 1) / 2) / (h || 1) };
  };
  const F = Math.ceil(Math.max(encuadre(0.95).pos.z, encuadre(1.2).pos.z, encuadre(0.45).pos.z) + 7);
  const X0 = -30, X1 = 34, Z0 = -18, H = 11.5, HV = 5.4; // planta, altura de la sala y del escaparate
  const CX = (X0 + X1) / 2, CZ = (Z0 + F) / 2;
  const LOT = F + 40; // fondo del aparcamiento

  // ---------- campo y colinas ----------
  const hgt = (x, z) => {
    const r = Math.hypot(x - CX, (z - CZ) * 0.9);
    const m = smooth(170, 600, r);
    const n = Math.sin(x * 0.011) * Math.cos(z * 0.013) * 0.6 + Math.sin(x * 0.027 + 1.3) * Math.sin(z * 0.021) * 0.3 + Math.sin((x + z) * 0.006) * 0.5;
    return m * (30 + n * 26) - 0.05;
  };
  const grass = tex(512, 512, (x, w, h) => {
    x.fillStyle = '#4a5636'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 260; i++) { const cx = rng() * w, cy = rng() * h, g = x.createRadialGradient(cx, cy, 0, cx, cy, 30 + rng() * 60); const k = rng(); g.addColorStop(0, k > 0.5 ? 'rgba(92,104,62,.35)' : 'rgba(54,64,40,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); }
    for (let i = 0; i < 26000; i++) { const g = 60 + rng() * 60 | 0; x.fillStyle = `rgba(${g * 0.75 | 0},${g},${g * 0.5 | 0},0.4)`; x.fillRect(rng() * w, rng() * h, 1, 2 + rng() * 3); }
  }, [200, 200]);
  const terr = new THREE.PlaneGeometry(2400, 2400, 220, 220); terr.rotateX(-Math.PI / 2);
  { const a = terr.attributes.position; for (let i = 0; i < a.count; i++) a.setY(i, hgt(a.getX(i) + CX, a.getZ(i) + CZ)); terr.computeVertexNormals(); }
  const ground = new THREE.Mesh(terr, new THREE.MeshStandardMaterial({ map: grass, roughness: 0.92, metalness: 0, envMapIntensity: 0.4 }));
  ground.position.set(CX, -0.03, CZ); scene.add(ground);

  // carretera mojada que llega al aparcamiento
  const ruta = new THREE.CatmullRomCurve3([[30, LOT - 2], [36, LOT + 30], [26, LOT + 70], [2, LOT + 110], [-18, LOT + 160], [-12, LOT + 220], [14, LOT + 290], [30, LOT + 380]].map(([x, z]) => new THREE.Vector3(x, 0, z)), false, 'centripetal');
  const asfaltoTex = (lineas) => tex(256, 1024, (x, w, h) => {
    x.fillStyle = '#2b2d30'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 16000; i++) { const g = 30 + rng() * 40 | 0; x.fillStyle = `rgba(${g},${g},${g + 3},.6)`; x.fillRect(rng() * w, rng() * h, 1 + rng() * 2, 1 + rng() * 2); }
    for (let i = 0; i < 40; i++) { const cx = rng() * w, cy = rng() * h, g = x.createRadialGradient(cx, cy, 0, cx, cy, 20 + rng() * 50); g.addColorStop(0, 'rgba(10,12,14,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); }
    if (lineas) { x.fillStyle = 'rgba(232,232,226,.8)'; for (let y = 0; y < h; y += 256) x.fillRect(w / 2 - 3, y, 6, 120); x.fillRect(10, 0, 5, h); x.fillRect(w - 15, 0, 5, h); }
  });
  {
    const N = 400, W = 7.4, pos = [], uv = [], idx = [];
    let len = 0, prev = ruta.getPoint(0);
    for (let i = 0; i <= N; i++) {
      const t = i / N, p = ruta.getPoint(t), tg = ruta.getTangent(t), nx = -tg.z, nz = tg.x, nl = Math.hypot(nx, nz);
      len += p.distanceTo(prev); prev = p;
      for (const s of [-1, 1]) { const x = p.x + nx / nl * W / 2 * s, z = p.z + nz / nl * W / 2 * s; const hh = hgt(x, z); pos.push(x, Math.max(0, hh) + 0.06 + (hh > 0.2 ? 0.25 : 0), z); uv.push(s < 0 ? 0 : 1, len / 16); }
      if (i < N) { const k = i * 2; idx.push(k, k + 2, k + 1, k + 1, k + 2, k + 3); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
    scene.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: asfaltoTex(true), roughness: 0.18, metalness: 0.1, envMapIntensity: 1.1, side: THREE.DoubleSide })));
  }
  // árboles: copas por pisos, con variación de tono; sólo lejos, entre la neblina de la lluvia
  {
    const rutaPts = Array.from({ length: 120 }, (_, i) => ruta.getPoint(i / 119));
    const partes = [];
    [[1.0, 0.55, 0.0], [0.8, 0.45, 0.35], [0.58, 0.38, 0.65]].forEach(([r, h, y]) => { const c = new THREE.ConeGeometry(r, h, 9); c.translate(0, y + h / 2 + 0.12, 0); partes.push(c); });
    const tronco = new THREE.CylinderGeometry(0.05, 0.07, 0.2, 6); tronco.translate(0, 0.1, 0);
    const mergeGeo = gs => { const pos = [], nor = []; gs.forEach(g => { const n = g.toNonIndexed(); pos.push(...n.attributes.position.array); nor.push(...n.attributes.normal.array); }); const m = new THREE.BufferGeometry(); m.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); m.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); return m; };
    const geo = mergeGeo([...partes, tronco]);
    const inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, flatShading: true }), movil ? 420 : 900);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), ps = new THREE.Vector3(), col = new THREE.Color();
    let n = 0, tries = 0;
    while (n < inst.count && tries++ < 30000) {
      const a = rng() * Math.PI * 2, r = 95 + Math.pow(rng(), 0.7) * 700;
      const x = CX + Math.cos(a) * r, z = CZ + Math.sin(a) * r;
      if (x > X0 - 40 && x < X1 + 40 && z > Z0 - 40 && z < LOT + 25) continue;
      if (rutaPts.some(p => (p.x - x) ** 2 + (p.z - z) ** 2 < 220)) continue;
      // nada delante de la cámara en su llegada (desde la esquina delantera derecha)
      { const ux = x - CX, uz = z - F, d = Math.hypot(ux, uz), ang = Math.atan2(ux, uz); if (d < 260 && ang > 0.05 && ang < 1.25) continue; }
      const hh = 9 + rng() * 9; sc.set(hh * (0.32 + rng() * 0.1), hh, hh * (0.32 + rng() * 0.1)); ps.set(x, hgt(x, z) - 0.3, z);
      q.setFromAxisAngle(THREE.Object3D.DEFAULT_UP, rng() * 6.28);
      inst.setMatrixAt(n, m4.compose(ps, q, sc));
      inst.setColorAt(n, col.setHSL(0.29 + rng() * 0.07, 0.22 + rng() * 0.12, 0.035 + rng() * 0.035));
      n++;
    }
    inst.count = n; scene.add(inst);
  }

  // ---------- suelo de la sala y del aparcamiento (mojado: espejo debajo + capas encima) ----------
  if (!movil) {
    const mirror = new Reflector(new THREE.PlaneGeometry(X1 - X0 + 30, LOT - Z0 + 2), { textureWidth: 1024, textureHeight: 1024, color: 0x4a4a4a });
    mirror.rotation.x = -Math.PI / 2; mirror.position.set(CX, 0.002, (Z0 - 2 + LOT + 2) / 2); scene.add(mirror);
  }
  const capa = (x0, x1, z0, z1, mat, y) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), mat); m.rotation.x = -Math.PI / 2; m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); scene.add(m); return m; };
  // porcelánico claro dentro
  const losa = tex(512, 512, (x, w) => { x.fillStyle = '#b9b5ae'; x.fillRect(0, 0, w, w); for (let i = 0; i < 6000; i++) { const g = 170 + rng() * 30 | 0; x.fillStyle = `rgba(${g},${g - 3},${g - 8},.25)`; x.fillRect(rng() * w, rng() * w, 2, 2); } x.fillStyle = 'rgba(120,116,110,.7)'; x.fillRect(0, 0, w, 2); x.fillRect(0, 0, 2, w); }, [(X1 - X0) / 1.2, (F - Z0) / 1.2]);
  capa(X0, X1, Z0, F, new THREE.MeshStandardMaterial({ map: losa, roughness: 0.12, metalness: 0.05, envMapIntensity: 0.6, transparent: !movil, opacity: movil ? 1 : 0.62 }), 0.012);
  // aparcamiento: asfalto mojado con plazas pintadas y zona rayada amarilla
  const lotTex = tex(2048, 1024, (x, w, h) => {
    x.fillStyle = '#2a2c2f'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 60000; i++) { const g = 28 + rng() * 40 | 0; x.fillStyle = `rgba(${g},${g},${g + 3},.55)`; x.fillRect(rng() * w, rng() * h, 1 + rng() * 2, 1 + rng() * 2); }
    for (let i = 0; i < 70; i++) { const cx = rng() * w, cy = rng() * h, g = x.createRadialGradient(cx, cy, 0, cx, cy, 30 + rng() * 90); g.addColorStop(0, 'rgba(12,14,16,.4)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); }
    // el lienzo cubre x de X0-15 a X1+15 y z de F+3 a LOT (fila 0 = F+3, cerca de la fachada)
    const sx = w / (X1 - X0 + 30), sz = h / (LOT - F - 3);
    const X = v => (v - (X0 - 15)) * sx, Z = v => (v - F - 3) * sz;
    x.fillStyle = 'rgba(236,236,230,.85)';
    for (let v = -23.3; v <= 17; v += 4.6) if (v < -4 || v > 7) x.fillRect(X(v) - 3, Z(F + 4.6), 6, 5.4 * sz);
    x.fillRect(X(-23.3), Z(F + 10), (21) * sx, 5); x.fillRect(X(7.2), Z(F + 10), (9.2) * sx, 5);
    x.strokeStyle = 'rgba(226,182,30,.85)'; x.lineWidth = 7;
    const hx0 = X(-3.6), hx1 = X(6.6), hz0 = Z(F + 4.6), hz1 = Z(F + 10);
    x.strokeRect(hx0, hz0, hx1 - hx0, hz1 - hz0); x.save(); x.beginPath(); x.rect(hx0, hz0, hx1 - hx0, hz1 - hz0); x.clip();
    for (let k = -400; k < 800; k += 34) { x.beginPath(); x.moveTo(hx0 + k, hz0); x.lineTo(hx0 + k + 160, hz1); x.stroke(); } x.restore();
    x.fillStyle = 'rgba(236,236,230,.6)'; for (let k = 0; k < 30; k++) x.fillRect(X(-28 + k * 2.4), Z(F + 22), 1.2 * sx, 5);
  });
  lotTex.wrapS = lotTex.wrapT = THREE.ClampToEdgeWrapping;
  // la fila 0 del lienzo cae en z=F+3 (junto a la acera): con flipY por defecto, v=1 es el borde cercano
  capa(X0 - 15, X1 + 15, F + 3, LOT, new THREE.MeshStandardMaterial({ map: lotTex, roughness: 0.25, metalness: 0.05, envMapIntensity: 0.6, transparent: !movil, opacity: movil ? 1 : 0.88 }), 0.01);
  // acera con bordillo junto a la fachada
  const acera = new THREE.Mesh(new THREE.BoxGeometry(X1 - X0 + 30, 0.16, 3), new THREE.MeshStandardMaterial({ color: 0x8d8a85, roughness: 0.55, metalness: 0, envMapIntensity: 0.8 }));
  acera.position.set(CX, 0.08, F + 1.5); scene.add(acera);
  { const am = new THREE.MeshStandardMaterial({ map: asfaltoTex(false), roughness: 0.3, envMapIntensity: 0.5 });
    capa(X0 - 17, X1 + 17, Z0 - 6, Z0, am, 0.011); capa(X0 - 17, X0, Z0, F + 3, am, 0.011); capa(X1, X1 + 17, Z0, F + 3, am, 0.011); }

  // ---------- el concesionario ----------
  const edificio = new THREE.Group(); scene.add(edificio);
  // placas de piedra gris con poros (como la fachada de la foto)
  const placaTex = tex(1024, 1024, (x, w, h) => {
    const cols = 4, rows = 4, pw = w / cols, ph = h / rows;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const g = 58 + rng() * 14 | 0; x.fillStyle = `rgb(${g},${g + 1},${g + 4})`; x.fillRect(i * pw, j * ph, pw, ph);
      for (let k = 0; k < 900; k++) { const v = g + (rng() - 0.5) * 22 | 0; x.fillStyle = `rgba(${v},${v},${v + 3},.5)`; x.fillRect(i * pw + rng() * pw, j * ph + rng() * ph, 2, 2); }
      for (let k = 0; k < 110; k++) { x.fillStyle = `rgba(18,18,20,${0.5 + rng() * 0.4})`; x.beginPath(); x.arc(i * pw + rng() * pw, j * ph + rng() * ph, 1 + rng() * 3.2, 0, 6.29); x.fill(); }
      const gr = x.createLinearGradient(0, j * ph, 0, (j + 1) * ph); gr.addColorStop(0, 'rgba(255,255,255,.05)'); gr.addColorStop(1, 'rgba(0,0,0,.12)'); x.fillStyle = gr; x.fillRect(i * pw, j * ph, pw, ph);
    }
    x.fillStyle = '#1d1e20'; for (let i = 0; i <= cols; i++) x.fillRect(i * pw - 2, 0, 4, h); for (let j = 0; j <= rows; j++) x.fillRect(0, j * ph - 2, w, 4);
    for (let k = 0; k < 120; k++) { x.strokeStyle = `rgba(20,22,26,${0.05 + rng() * 0.08})`; x.lineWidth = 1 + rng() * 3; const px = rng() * w; x.beginPath(); x.moveTo(px, rng() * h * 0.5); x.lineTo(px + (rng() - 0.5) * 6, h); x.stroke(); }
  });
  const placa = (w, h) => { const t = placaTex.clone(); t.needsUpdate = true; t.repeat.set(w / 4.8, h / 4.8); return new THREE.MeshStandardMaterial({ map: t, roughness: 0.42, metalness: 0.15, envMapIntensity: 1.1 }); };
  const caja = (w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); edificio.add(m); return m; };
  const FH = 13.5; // altura de la fachada (con el peto)
  caja(X1 - X0, FH - HV, 0.6, placa(X1 - X0, FH - HV), CX, HV + (FH - HV) / 2, F + 0.3);
  caja(0.6, FH, F - Z0, placa(F - Z0, FH), X0 - 0.3, FH / 2, (Z0 + F) / 2);
  caja(0.6, FH, F - Z0, placa(F - Z0, FH), X1 + 0.3, FH / 2, (Z0 + F) / 2);
  caja(X1 - X0 + 1.2, FH, 0.6, placa(X1 - X0, FH), CX, FH / 2, Z0 - 0.3);
  const cubierta = caja(X1 - X0 + 1.2, 0.5, F - Z0 + 0.6, new THREE.MeshStandardMaterial({ color: 0x2c2d2f, roughness: 0.8 }), CX, FH - 0.25, (Z0 + F) / 2);
  // pórtico de la entrada (sobresale de la fachada, como en la foto)
  const PW = 9.6, PH = 6.6, PD = 1.6;
  const marco = placa(6, 6);
  caja(0.9, PH, PD, marco, -PW / 2 - 0.45, PH / 2, F + PD / 2); caja(0.9, PH, PD, marco, PW / 2 + 0.45, PH / 2, F + PD / 2);
  caja(PW + 1.8, 0.9, PD, marco, 0, PH + 0.45, F + PD / 2);
  const led = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff1dc).multiplyScalar(1.6), toneMapped: false });
  caja(PW, 0.05, 0.12, led, 0, PH - 0.03, F + PD - 0.2);
  caja(X1 - X0, 0.05, 0.1, led, CX, HV - 0.05, F + 0.62);
  // rótulo en letras corpóreas
  {
    const font = new FontLoader().parse(fuente);
    const letras = (txt, mat, size) => { const g = new TextGeometry(txt, { font, size, depth: 0.42, curveSegments: 6, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 2 }); g.computeBoundingBox(); const m = new THREE.Mesh(g, mat); m.scale.x = 1.32; return { m, w: (g.boundingBox.max.x - g.boundingBox.min.x) * 1.32 }; };
    const blanco = new THREE.MeshStandardMaterial({ color: 0xf2f2f0, roughness: 0.25, metalness: 0.5, envMapIntensity: 1.2 });
    const rojo = new THREE.MeshStandardMaterial({ color: 0xc4141c, roughness: 0.22, metalness: 0.2, emissive: 0x7a0508, emissiveIntensity: 0.45, envMapIntensity: 1.1 });
    const a = letras('PAR', blanco, 2.7), b = letras('MOTOR', rojo, 2.7), gap = 1.6;
    const x0 = X0 + 4; a.m.position.set(x0, HV + 2.9, F + 0.62); b.m.position.set(x0 + a.w + gap, HV + 2.9, F + 0.62);
    edificio.add(a.m, b.m);
    const c = letras('PAR MOTOR', rojo, 0.7); c.m.position.set(PW / 2 + 1.4, PH - 1.6, F + 0.62); edificio.add(c.m);
  }
  // escaparate de cristal en la planta baja y puerta corredera en el pórtico
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0x9fadba, transparent: true, opacity: 0.1, roughness: 0.03, metalness: 0.1, envMapIntensity: 0.9, depthWrite: false, side: THREE.DoubleSide });
  const perfil = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.35, metalness: 0.85 });
  const panel = (x0, x1, y0, y1, z) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, y1 - y0), vidrio); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, z); edificio.add(m); return m; };
  panel(X0, -PW / 2 - 0.9, 0, HV, F + 0.05); panel(PW / 2 + 0.9, X1, 0, HV, F + 0.05);
  for (let x = X0 + 3.2; x < X1; x += 3.2) if (Math.abs(x) > PW / 2 + 1) caja(0.09, HV, 0.16, perfil, x, HV / 2, F + 0.08);
  const DW = 2.3, DH = 3.4, ZD = F + PD - 0.3;
  panel(-PW / 2, PW / 2, DH, PH, ZD); panel(-PW / 2, -DW, 0, DH, ZD); panel(DW, PW / 2, 0, DH, ZD);
  caja(PW, 0.1, 0.14, perfil, 0, DH, ZD); caja(0.1, DH, 0.14, perfil, -DW, DH / 2, ZD); caja(0.1, DH, 0.14, perfil, DW, DH / 2, ZD);
  const hojas = [-1, 1].map(s => { const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.PlaneGeometry(DW, DH), vidrio)); const tir = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.4, 0.07), perfil); tir.position.set(-s * (DW / 2 - 0.15), 0, 0.05); g.add(tir); g.position.set(s * DW / 2, DH / 2, ZD + 0.02); g.userData.s = s; edificio.add(g); return g; });
  // suelo del pórtico entre la fachada y la puerta
  { const m = new THREE.Mesh(new THREE.BoxGeometry(PW, 0.16, PD), new THREE.MeshStandardMaterial({ color: 0x8d8a85, roughness: 0.5 })); m.position.set(0, 0.08, F + PD / 2); edificio.add(m); }
  // señal de aparcamiento junto a la entrada
  {
    const t = tex(128, 256, (x, w) => { x.fillStyle = '#c64a1d'; x.fillRect(0, 0, w, 256); x.fillStyle = '#fff'; x.font = '900 130px Inter, sans-serif'; x.textAlign = 'center'; x.fillText('P', w / 2, 128); x.fillRect(20, 170, w - 40, 6); x.fillRect(20, 200, w - 40, 6); });
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.0, 0.08), [perfil, perfil, perfil, perfil, new THREE.MeshStandardMaterial({ map: t, roughness: 0.5 }), perfil]);
    m.position.set(-PW / 2 - 1.6, 4.2, F + 0.75); edificio.add(m);
    caja(0.07, 3.7, 0.07, perfil, -PW / 2 - 1.6, 1.85, F + 0.75);
  }
  // interior: techo blanco con luminarias cuadradas, pared del fondo oscura con líneas de luz
  const techo = new THREE.Group(); edificio.add(techo);
  { const m = new THREE.Mesh(new THREE.PlaneGeometry(X1 - X0, F - Z0), new THREE.MeshStandardMaterial({ color: 0xe8e5df, roughness: 0.85 })); m.rotation.x = Math.PI / 2; m.position.set(CX, H, (Z0 + F) / 2); techo.add(m); }
  {
    const luz = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff3e2).multiplyScalar(1.5), toneMapped: false });
    const g = new THREE.BoxGeometry(1.1, 0.04, 1.1);
    const pos = []; for (let x = X0 + 3; x < X1 - 2; x += 4.2) for (let z = Z0 + 3; z < F - 1; z += 4.2) pos.push([x, z]);
    const inst = new THREE.InstancedMesh(g, luz, pos.length); const m4 = new THREE.Matrix4();
    pos.forEach(([x, z], i) => inst.setMatrixAt(i, m4.makeTranslation(x, H - 0.03, z))); techo.add(inst);
  }
  {
    const fondo = new THREE.Mesh(new THREE.PlaneGeometry(X1 - X0, H), new THREE.MeshStandardMaterial({ color: 0x1e1d1c, roughness: 0.6, metalness: 0.1 }));
    fondo.position.set(CX, H / 2, Z0 + 0.02); edificio.add(fondo);
    for (let x = X0 + 4; x < X1; x += 6) caja(0.05, H - 1.5, 0.05, led, x, H / 2, Z0 + 0.08);
    const lat = new THREE.MeshStandardMaterial({ color: 0xd6d2cb, roughness: 0.7 });
    const l = new THREE.Mesh(new THREE.PlaneGeometry(F - Z0, H), lat); l.rotation.y = Math.PI / 2; l.position.set(X0 + 0.02, H / 2, CZ); edificio.add(l);
    const r = new THREE.Mesh(new THREE.PlaneGeometry(F - Z0, H), lat); r.rotation.y = -Math.PI / 2; r.position.set(X1 - 0.02, H / 2, CZ); edificio.add(r);
    const t = new THREE.Mesh(new THREE.PlaneGeometry(X1 - X0, H - HV), lat); t.rotation.y = Math.PI; t.position.set(CX, HV + (H - HV) / 2, F - 0.02); edificio.add(t);
  }
  const interior = new THREE.PointLight(0xfff0dc, 260, 70, 1.3); interior.position.set(CX, H - 1.5, CZ); scene.add(interior);
  const interior2 = new THREE.PointLight(0xfff0dc, 160, 40, 1.4); interior2.position.set(0, H - 1.5, F - 6); scene.add(interior2);

  // ---------- plataformas y coches de la sala ----------
  const anillo = tex(256, 256, (x, w) => { const g = x.createRadialGradient(w / 2, w / 2, 60, w / 2, w / 2, w / 2); g.addColorStop(0, 'rgba(255,220,170,0)'); g.addColorStop(0.62, 'rgba(255,214,160,0.5)'); g.addColorStop(0.7, 'rgba(255,205,150,0.2)'); g.addColorStop(1, 'rgba(255,200,140,0)'); x.fillStyle = g; x.fillRect(0, 0, w, w); });
  const sombraTex = tex(128, 256, (x, w, h) => { const g = x.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2); g.addColorStop(0, 'rgba(0,0,0,.85)'); g.addColorStop(0.7, 'rgba(0,0,0,.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.save(); x.scale(1, h / w); x.fillRect(0, 0, w, w); x.restore(); });
  const slots = MODELOS.map((M, i) => {
    const g = new THREE.Group(); scene.add(g);
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.26, 96), new THREE.MeshStandardMaterial({ color: 0x232220, roughness: 0.3, metalness: 0.4, envMap: envSala }));
    plat.position.y = 0.16; g.add(plat);
    const ringMat = new THREE.MeshBasicMaterial({ color: warm.clone().multiplyScalar(0.25), toneMapped: false });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(R + 0.005, 0.024, 8, 160), ringMat); ring.rotation.x = Math.PI / 2; ring.position.y = 0.04; g.add(ring);
    const ring2 = ring.clone(); ring2.position.y = 0.29; ring2.scale.setScalar(0.995); g.add(ring2);
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(R * 2.9, R * 2.9), new THREE.MeshBasicMaterial({ map: anillo, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
    halo.rotation.x = -Math.PI / 2; halo.position.y = 0.02; g.add(halo);
    const spot = new THREE.SpotLight(0xfff0dc, 0, 18, 0.45, 0.6, 1.2); spot.position.set(0, 10, 2.4); spot.target.position.set(0, 0.5, 0); g.add(spot, spot.target);
    const turn = new THREE.Group(); turn.position.y = 0.302; g.add(turn);
    return { M, g, plat, ringMat, halo, spot, turn, car: null, pinturas: [], hover: 0, on: 0, rot: 0.6 + i * 0.9, vel: 0.12, sentido: 1 };
  });

  // ---------- encuadre y recorrido de la cámara ----------
  let fin = null, layout = 'h';
  const ruta3 = { pos: null, look: null };
  const KT = [0, 0.185, 0.37, 0.556, 0.665, 0.775, 0.93];
  const place = () => {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight, asp = w / Math.max(1, h);
    camera.aspect = asp;
    fin = encuadre(asp, w, h); layout = asp < 0.9 ? 'v' : 'h';
    fin.L.pos.forEach(([x, z], i) => slots[i].g.position.set(x, 0, z));
    const v = layout === 'v', k = v ? 1.25 : 1;
    const pos = [[78 * k, 24, F + 118 * k], [44, 9, F + 74], [16, 3.4, F + 36], [0, 2.6, F + 19], [0, 2.3, F + 4], [v ? 0 : -1.5, v ? 4.2 : 3.0, F - 5], [fin.pos.x, fin.pos.y, fin.pos.z]];
    const look = [[v ? 2 : -4, 6, F - 2], [-2, 5.5, F], [-1, 4.5, F], [0, 3.3, F], [0, 2.3, F - 10], [fin.target.x * 0.6, 1.6, fin.target.z * 0.5], [fin.target.x, fin.target.y, fin.target.z]];
    ruta3.pos = new THREE.CatmullRomCurve3(pos.map(p => new THREE.Vector3(...p)), false, 'centripetal');
    ruta3.look = new THREE.CatmullRomCurve3(look.map(p => new THREE.Vector3(...p)), false, 'centripetal');
    renderer.setSize(w, h, false);
  };
  const poseEn = (t, outP, outL) => {
    const n = KT.length;
    if (t >= KT[n - 1]) { outP.copy(fin.pos); outL.copy(fin.target); return 1; }
    let i = 0; while (i < n - 2 && t > KT[i + 1]) i++;
    const loc = clamp((t - KT[i]) / (KT[i + 1] - KT[i]));
    const s = (i + loc) / (n - 1);
    ruta3.pos.getPoint(s, outP); ruta3.look.getPoint(s, outL);
    return s;
  };

  // ---------- carga de los coches (sala primero, luego los aparcados) ----------
  const draco = new DRACOLoader(); draco.setDecoderPath(base + 'draco/');
  const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
  const normaliza = (inner, largo) => {
    const holder = new THREE.Group(); holder.add(inner);
    inner.updateMatrixWorld(true);
    let b = new THREE.Box3().setFromObject(inner), sz = b.getSize(new THREE.Vector3());
    if (sz.x > sz.z) { inner.rotation.y = Math.PI / 2; inner.updateMatrixWorld(true); b = new THREE.Box3().setFromObject(inner); sz = b.getSize(new THREE.Vector3()); }
    inner.scale.multiplyScalar(largo / Math.max(sz.x, sz.z)); inner.updateMatrixWorld(true);
    b = new THREE.Box3().setFromObject(inner); const c = b.getCenter(new THREE.Vector3());
    inner.position.x -= c.x; inner.position.z -= c.z; inner.position.y -= b.min.y - 0.012;
    b.setFromObject(inner);
    return { holder, sz: b.getSize(new THREE.Vector3()) };
  };
  const materiales = (inner, M, slot, color, env) => {
    const cache = new Map(), pinturas = [];
    inner.traverse(o => {
      if (!o.isMesh) return;
      if (slot >= 0) o.userData.slot = slot;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      const nuevos = mats.map(m => {
        if (cache.has(m)) return cache.get(m);
        let n;
        if (M.pintura && m.name === M.pintura.mat) {
          n = new THREE.MeshPhysicalMaterial({ color: color ?? M.pintura.color ?? m.color, metalness: 0.75, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.03, emissive: 0xffd9a8, emissiveIntensity: 0 });
          pinturas.push(n);
        } else if (M.dos && m.name === M.dos.mat) {
          n = new THREE.MeshPhysicalMaterial({ color: M.dos.color, metalness: 0.7, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.04 });
        } else if (M.cromo && M.cromo.includes(m.name)) {
          n = new THREE.MeshStandardMaterial({ color: 0xd9d9d9, metalness: 1, roughness: 0.16 });
        } else if (M.cristal && M.cristal.includes(m.name)) {
          n = new THREE.MeshPhysicalMaterial({ color: 0x0a0c0f, metalness: 0.3, roughness: 0.04, transparent: true, opacity: 0.86 });
        } else n = m.clone();
        n.envMap = env; n.envMapIntensity = 1.1;
        cache.set(m, n); return n;
      });
      o.material = Array.isArray(o.material) ? nuevos : nuevos[0];
    });
    return pinturas;
  };
  const sombra = (sz) => { const sh = new THREE.Mesh(new THREE.PlaneGeometry(sz.x * 1.25, sz.z * 1.18), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, toneMapped: false })); sh.rotation.x = -Math.PI / 2; sh.position.y = 0.006; sh.renderOrder = 2; return sh; };
  const gltfs = [];
  const cargar = i => new Promise(res => loader.load(base + MODELOS[i].f, g => { gltfs[i] = g; const s = slots[i]; const { holder, sz } = normaliza(g.scene.clone(true), s.M.largo); s.pinturas = materiales(holder, s.M, i, undefined, envSala); const sh = sombra(sz); s.sombra = sh; s.turn.add(holder, sh); s.car = holder; s.plat.userData.slot = i; res(); }, undefined, () => res()));
  const aparcar = () => {
    APARCADOS.slice(0, movil ? 3 : APARCADOS.length).forEach(a => {
      const g = gltfs[a.m]; if (!g) return;
      const M = MODELOS[a.m];
      const { holder, sz } = normaliza(g.scene.clone(true), M.largo);
      materiales(holder, M, -1, a.color, envCielo);
      const grp = new THREE.Group(); grp.add(holder, sombra(sz));
      grp.position.set(a.x, 0.02, F + 7.3); grp.rotation.y = Math.PI + (rng() - 0.5) * 0.06;
      scene.add(grp);
    });
    if (!movil) ESCAPARATE.forEach(a => {
      const g = gltfs[a.m]; if (!g) return;
      const M = MODELOS[a.m];
      const { holder, sz } = normaliza(g.scene.clone(true), M.largo);
      materiales(holder, M, -1, a.color, envSala);
      const grp = new THREE.Group(); grp.add(holder, sombra(sz));
      grp.position.set(a.x, 0.02, F - 4.2); grp.rotation.y = Math.PI / 2 + a.rot;
      scene.add(grp);
    });
    wake();
  };
  (async () => { for (const i of [0, 1, 2, 3]) await cargar(i); room.classList.add('sr-listo'); aparcar(); })();

  // ---------- interacción: pasar por encima, arrastrar para girar, pulsar para entrar ----------
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  let hov = -1, px = 0, py = 0, drag = null;
  const activo = () => room.classList.contains('on');
  const setHover = i => { if (i === hov) return; hov = i; tags.forEach((t, k) => t.classList.toggle('hot', k === i)); canvas.style.cursor = i >= 0 ? 'grab' : ''; };
  const pick = (cx, cy) => {
    const r = canvas.getBoundingClientRect();
    ptr.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const objs = []; slots.forEach(s => { objs.push(s.plat); if (s.car) objs.push(s.car); });
    const hit = ray.intersectObjects(objs, true)[0];
    return hit ? hit.object.userData.slot ?? -1 : -1;
  };
  canvas.addEventListener('pointerdown', e => {
    if (!activo()) return;
    const i = pick(e.clientX, e.clientY); if (i < 0) return;
    drag = { i, x0: e.clientX, y0: e.clientY, x: e.clientX, t: performance.now(), v: 0, movido: false, id: e.pointerId };
    setHover(i); canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect(); px = (e.clientX - r.left) / r.width - 0.5; py = (e.clientY - r.top) / r.height - 0.5;
    if (drag && e.pointerId === drag.id) {
      const now = performance.now(), dx = e.clientX - drag.x, dt = Math.max(1, now - drag.t) / 1000;
      if (!drag.movido && Math.abs(e.clientX - drag.x0) > 6) { drag.movido = true; try { canvas.setPointerCapture(e.pointerId); } catch (err) { } }
      if (drag.movido) { const da = dx * (layout === 'v' ? 0.016 : 0.011); slots[drag.i].rot += da; drag.v = drag.v * 0.6 + (da / dt) * 0.4; }
      drag.x = e.clientX; drag.t = now;
      return;
    }
    if (e.pointerType === 'mouse' && activo()) setHover(pick(e.clientX, e.clientY));
  });
  const suelta = e => {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    const s = slots[drag.i];
    if (!drag.movido && e && e.type === 'pointerup') tags[drag.i].click();
    else if (drag.movido) { const v = performance.now() - drag.t > 120 ? 0 : drag.v; s.vel = clamp(v, -28, 28); if (Math.abs(v) > 0.3) s.sentido = Math.sign(v); }
    drag = null; canvas.style.cursor = hov >= 0 ? 'grab' : '';
  };
  canvas.addEventListener('pointerup', suelta);
  canvas.addEventListener('pointercancel', e => { if (drag) { drag.movido = true; suelta(e); } });
  canvas.addEventListener('pointerleave', () => { if (!drag) { setHover(-1); px = py = 0; } });
  tags.forEach((t, i) => {
    t.addEventListener('pointerenter', () => setHover(i));
    t.addEventListener('pointerleave', () => setHover(-1));
    t.addEventListener('focus', () => setHover(i));
    t.addEventListener('blur', () => setHover(-1));
  });

  // ---------- bucle ----------
  let raf = 0, last = 0, primero = true, tSuave = -1;
  const SALTO = /[?&]salto/.test(location.search); // pruebas: la cámara va directa, sin inercia
  const tP = new THREE.Vector3(), tL = new THREE.Vector3(), v3 = new THREE.Vector3();
  const frame = now => {
    raf = 0;
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const tObj = clamp(estado.p);
    tSuave = tSuave < 0 || SALTO ? tObj : tSuave + (tObj - tSuave) * (1 - Math.exp(-dt * 7));
    const t = tSuave;
    poseEn(t, tP, tL);
    const enSala = smooth(KT[5], KT[6], t);
    if (activo() && !drag) { tP.x += px * (layout === 'h' ? 2.0 : 0.9) * enSala; tP.y -= py * 0.7 * enSala; }
    camera.position.copy(tP); camera.lookAt(tL);
    camera.fov = 38 + (fin.fov - 38) * enSala;
    camera.setViewOffset(w, h, 0, fin.off * h * enSala, w, h);
    camera.updateProjectionMatrix();
    sky.position.copy(camera.position);
    // dentro, la neblina de la lluvia se disipa
    const dentro = camera.position.z < F && camera.position.x > X0 && camera.position.x < X1;
    scene.fog.density += ((dentro ? 0.001 : 0.0036) - scene.fog.density) * 0.08;
    const abre = smooth(F + 24, F + 7, camera.position.z);
    hojas.forEach(g => { g.position.x = g.userData.s * (DW / 2 + abre * DW * 0.98); });
    cubierta.visible = !(dentro && camera.position.y > FH - 0.5);
    techo.visible = camera.position.y < H - 0.1;
    const luces = smooth(KT[3], KT[5], t);
    slots.forEach((sl, i) => {
      const d = clamp((luces * 1.6 - i * 0.18) / 0.9);
      sl.on += (d - sl.on) * 0.12;
      sl.hover += ((hov === i ? 1 : 0) - sl.hover) * 0.1;
      const lit = 0.25 + sl.on * (0.5 + sl.hover * 0.5);
      sl.ringMat.color.copy(warm).multiplyScalar(0.25 + lit * 2.2);
      sl.halo.material.opacity = lit * 0.55 + sl.hover * 0.25;
      sl.spot.intensity = (60 + sl.on * 90 + sl.hover * 190);
      if (sl.sombra) sl.sombra.material.opacity = 1 - sl.hover * 0.45;
      sl.pinturas.forEach(m => { m.emissiveIntensity = sl.hover * 0.05; });
      if (!(drag && drag.i === i && drag.movido)) {
        // tras un lanzamiento, el giro va frenando hasta su paso tranquilo
        const objetivo = sl.sentido * (0.12 + sl.hover * 0.7);
        sl.vel += (objetivo - sl.vel) * (1 - Math.exp(-dt * (Math.abs(sl.vel) > Math.abs(objetivo) ? 0.55 : 2.5)));
        sl.rot += sl.vel * dt;
      }
      sl.turn.rotation.y = sl.rot;
      if (sl.car) sl.car.position.y = sl.hover * 0.42;
      v3.set(0, 0, R + 0.3).add(sl.g.position).project(camera);
      const tg = tags[i], hw = (tg.offsetWidth || 160) / 2 + 8;
      const tx = Math.min(w - hw, Math.max(hw, (v3.x + 1) / 2 * w));
      tg.style.transform = `translate3d(${tx.toFixed(1)}px,${((1 - v3.y) / 2 * h).toFixed(1)}px,0) translate(-50%,0)`;
    });
    renderer.render(scene, camera);
    if (primero) { primero = false; sec.classList.add('con3d'); }
    if (estado.visible) raf = requestAnimationFrame(frame);
  };
  const wake = () => { if (!raf && estado.visible) { last = 0; raf = requestAnimationFrame(frame); } };
  place();
  addEventListener('resize', () => { place(); wake(); });
  wake();
  return { wake };
}
