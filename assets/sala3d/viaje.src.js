// Entrada de la portada en 3D: un solo plano de cámara, controlado por el scroll.
// La cámara baja desde el aire sobre el campo, sigue la carretera bajo la lluvia, se planta frente al
// concesionario, cruza las puertas de cristal y termina dentro, delante de los cuatro coches.
// Cada coche es una herramienta: se puede girar arrastrando (con inercia) y al pulsarlo lleva a su sección.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const rng = (s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; })(20261122);

// Los cuatro coches (modelos con licencia CC BY 4.0; autores en los créditos de la página)
const MODELOS = [
  { f: 'm4.glb', largo: 4.79, pintura: { mat: 'CSR2_CarPaint', color: 0x1d4ea3 } },             // BMW M4 CS
  { f: 'amggt.glb', largo: 4.6, pintura: { mat: 'material_12' }, cristal: ['material_5'] },     // Mercedes-AMG GT Black Series
  { f: 'ghost.glb', largo: 5.55, pintura: { mat: 'primary_paint_shad', color: 0x101012 }, dos: { mat: 'secondary_paint_shad', color: 0xc9c3b6 }, cromo: ['rim_shad'] }, // Rolls-Royce Ghost
  { f: 'g500.glb', largo: 4.87 },                                                                // Mercedes-Benz Clase G
];

export function iniciarViaje({ sec, canvas, room, base, estado }) {
  const tags = [...room.querySelectorAll('.car')];
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { return null; }
  const movil = matchMedia('(max-width: 760px)').matches || matchMedia('(pointer: coarse)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, movil ? 1.4 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const FOG = new THREE.Color(0x11141b);
  scene.fog = new THREE.FogExp2(FOG, 0.0042);
  scene.background = FOG;
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.7;
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 2500);
  const warm = new THREE.Color(0xffc583);
  const R = 2.85; // radio de las plataformas

  // ---------- dónde acaba la cámara (encuadre final de los cuatro coches) ----------
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
  // la fachada se coloca por delante del punto más lejano al que llega la cámara en cualquier pantalla
  const F = Math.ceil(Math.max(encuadre(0.95).pos.z, encuadre(1.2).pos.z, encuadre(0.45).pos.z) + 7);
  const X0 = -28, X1 = 32, Z0 = -18, H = 11; // planta del concesionario

  // ---------- cielo, campo, colinas ----------
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1800, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, toneMapped: false,
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `varying vec3 vP;
      float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5); }
      float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(h21(i), h21(i+vec2(1,0)), f.x), mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), f.x), f.y); }
      void main(){
        float h = vP.y;
        vec3 c = mix(vec3(0.085,0.098,0.125), vec3(0.012,0.016,0.026), smoothstep(-0.02, 0.55, h));
        vec2 q = vP.xz / max(0.12, h + 0.25) * 2.2;
        float cl = n2(q) * 0.6 + n2(q * 2.3) * 0.3 + n2(q * 5.1) * 0.1;
        c += vec3(0.05, 0.055, 0.07) * smoothstep(0.45, 0.85, cl) * smoothstep(0.0, 0.25, h);
        c += vec3(0.07, 0.045, 0.02) * pow(max(0.0, 1.0 - abs(h) * 7.0), 3.0) * 0.6;
        gl_FragColor = vec4(c, 1.0);
      }`,
  }));
  scene.add(sky);

  const CX = (X0 + X1) / 2, CZ = (Z0 + F) / 2;
  const hgt = (x, z) => {
    const r = Math.hypot(x - CX, z - CZ);
    const m = smooth(150, 560, r);
    const n = Math.sin(x * 0.011) * Math.cos(z * 0.013) * 0.6 + Math.sin(x * 0.027 + 1.3) * Math.sin(z * 0.021) * 0.3 + Math.sin((x + z) * 0.006) * 0.5;
    return m * (34 + n * 30) + (1 - m) * 0 - 0.05;
  };
  const tex = (w, h, draw, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; if (rep) t.repeat.set(rep[0], rep[1]); t.anisotropy = 8; return t; };
  const grass = tex(256, 256, (x, w, h) => {
    x.fillStyle = '#0f170f'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 9000; i++) { const g = 18 + rng() * 26 | 0; x.fillStyle = `rgba(${g * 0.55 | 0},${g},${g * 0.5 | 0},0.55)`; x.fillRect(rng() * w, rng() * h, 1, 2 + rng() * 3); }
  }, [260, 260]);
  const terr = new THREE.PlaneGeometry(2400, 2400, 220, 220); terr.rotateX(-Math.PI / 2);
  { const a = terr.attributes.position; for (let i = 0; i < a.count; i++) a.setY(i, hgt(a.getX(i) + CX, a.getZ(i) + CZ)); terr.computeVertexNormals(); }
  const ground = new THREE.Mesh(terr, new THREE.MeshStandardMaterial({ map: grass, color: 0x8fa287, roughness: 0.95, metalness: 0, envMapIntensity: 0.25 }));
  ground.position.set(CX, -0.02, CZ); scene.add(ground);

  // carretera mojada que llega a la explanada
  const ruta = new THREE.CatmullRomCurve3([[2, F + 30], [8, F + 62], [-5, F + 100], [-28, F + 140], [-42, F + 186], [-36, F + 240], [-12, F + 300], [10, F + 380]].map(([x, z]) => new THREE.Vector3(x, 0, z)), false, 'centripetal');
  const asfalto = tex(128, 512, (x, w, h) => {
    x.fillStyle = '#121315'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 4000; i++) { const g = 14 + rng() * 22 | 0; x.fillStyle = `rgb(${g},${g},${g + 2})`; x.fillRect(rng() * w, rng() * h, 1, 1); }
    x.fillStyle = 'rgba(225,215,190,.75)'; for (let y = 0; y < h; y += 128) x.fillRect(w / 2 - 2, y, 4, 64);
    x.fillStyle = 'rgba(225,225,225,.55)'; x.fillRect(6, 0, 3, h); x.fillRect(w - 9, 0, 3, h);
  });
  {
    const N = 400, W = 7.2, pos = [], uv = [], idx = [];
    let len = 0, prev = ruta.getPoint(0);
    for (let i = 0; i <= N; i++) {
      const t = i / N, p = ruta.getPoint(t), tg = ruta.getTangent(t), nx = -tg.z, nz = tg.x, nl = Math.hypot(nx, nz);
      len += p.distanceTo(prev); prev = p;
      for (const s of [-1, 1]) { const x = p.x + nx / nl * W / 2 * s, z = p.z + nz / nl * W / 2 * s; pos.push(x, Math.max(0, hgt(x, z)) + 0.05 + (hgt(x, z) > 0.2 ? 0.25 : 0), z); uv.push(s < 0 ? 0 : 1, len / 14); }
      if (i < N) { const k = i * 2; idx.push(k, k + 2, k + 1, k + 1, k + 2, k + 3); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
    scene.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: asfalto, roughness: 0.22, metalness: 0.15, envMapIntensity: 0.9, side: THREE.DoubleSide })));
  }
  // farolas a lo largo de la carretera (con su charco de luz)
  const glowTex = tex(256, 256, (x, w) => { const g = x.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2); g.addColorStop(0, 'rgba(255,200,130,.85)'); g.addColorStop(0.4, 'rgba(255,190,120,.25)'); g.addColorStop(1, 'rgba(255,180,100,0)'); x.fillStyle = g; x.fillRect(0, 0, w, w); });
  {
    const poste = new THREE.MeshStandardMaterial({ color: 0x1a1a1c, roughness: 0.6, metalness: 0.6 });
    const foco = new THREE.MeshBasicMaterial({ color: warm.clone().multiplyScalar(1.3), toneMapped: false });
    const charco = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.55 });
    for (let i = 0; i < 9; i++) {
      const t = 0.02 + i * 0.075, p = ruta.getPoint(t), tg = ruta.getTangent(t), s = i % 2 ? 1 : -1;
      const x = p.x - tg.z * 5 * s, z = p.z + tg.x * 5 * s, y = Math.max(0, hgt(x, z));
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 6.5, 8), poste); m.position.set(x, y + 3.25, z); scene.add(m);
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.07, 0.55), foco); b.position.set(x - tg.z * -1.0 * s, y + 6.5, z + tg.x * -1.0 * s); scene.add(b);
      const c = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), charco); c.rotation.x = -Math.PI / 2; c.position.set(x - tg.z * -2 * s, Math.max(0, hgt(p.x, p.z)) + 0.36, z + tg.x * -2 * s); scene.add(c);
    }
  }
  // pinos repartidos por el campo y las colinas
  {
    const rutaPts = Array.from({ length: 120 }, (_, i) => ruta.getPoint(i / 119));
    const geo = new THREE.ConeGeometry(1, 1, 7); geo.translate(0, 0.5, 0);
    const inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: 0x0b140d, roughness: 1, flatShading: true }), movil ? 380 : 700);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), ps = new THREE.Vector3();
    let n = 0, tries = 0;
    while (n < inst.count && tries++ < 20000) {
      const a = rng() * Math.PI * 2, r = 70 + Math.pow(rng(), 0.8) * 650;
      const x = CX + Math.cos(a) * r, z = CZ + Math.sin(a) * r;
      if (x > X0 - 25 && x < X1 + 25 && z > Z0 - 25 && z < F + 45) continue;
      if (rutaPts.some(p => (p.x - x) ** 2 + (p.z - z) ** 2 < 150)) continue;
      const hh = 6 + rng() * 9; sc.set(hh * (0.26 + rng() * 0.1), hh, hh * (0.26 + rng() * 0.1)); ps.set(x, hgt(x, z) - 0.3, z);
      inst.setMatrixAt(n++, m4.compose(ps, q, sc));
    }
    inst.count = n; scene.add(inst);
  }

  // ---------- el concesionario ----------
  const edificio = new THREE.Group(); scene.add(edificio);
  // suelo pulido (dentro) y explanada mojada (fuera): un espejo y capas semitransparentes encima
  if (!movil) {
    const mirror = new Reflector(new THREE.PlaneGeometry(X1 - X0 + 20, F - Z0 + 36), { textureWidth: 1024, textureHeight: 1024, color: 0x6f6f6f });
    mirror.rotation.x = -Math.PI / 2; mirror.position.set(CX, 0.002, (Z0 - 2 + F + 34) / 2); scene.add(mirror);
  }
  const capa = (x0, x1, z0, z1, color, op, y) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.1, envMapIntensity: 0.12, transparent: !movil, opacity: movil ? 1 : op })); m.rotation.x = -Math.PI / 2; m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); scene.add(m); return m; };
  capa(X0, X1, Z0, F, 0x060505, 0.74, 0.01);
  capa(X0 - 10, X1 + 10, F, F + 34, 0x0d0f12, 0.78, 0.008);
  capa(X0 - 10, X1 + 10, Z0 - 2, Z0, 0x0d0f12, 0.78, 0.008);
  // estructura
  const hormigon = new THREE.MeshStandardMaterial({ color: 0x1b1b1c, roughness: 0.85, metalness: 0.05 });
  const perfil = new THREE.MeshStandardMaterial({ color: 0x0b0b0c, roughness: 0.4, metalness: 0.8 });
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0x9fb0c2, transparent: true, opacity: 0.12, roughness: 0.04, metalness: 0.1, envMapIntensity: 1.6, depthWrite: false, side: THREE.DoubleSide });
  const caja = (w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); edificio.add(m); return m; };
  const cubierta = caja(X1 - X0 + 2, 1.2, F - Z0 + 3, hormigon, CX, H + 0.6, (Z0 + F) / 2 + 0.5);
  caja(0.6, H, F - Z0, hormigon, X1 + 0.3, H / 2, (Z0 + F) / 2); // muro ciego a la derecha
  const led = new THREE.MeshBasicMaterial({ color: warm.clone().multiplyScalar(1.8), toneMapped: false });
  caja(X1 - X0 + 2, 0.06, 0.06, led, CX, H + 0.02, F + 2);
  // rótulo
  {
    const t = tex(1024, 96, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = '#f3ead8'; x.font = '800 70px Archivo, Inter, sans-serif'; try { x.fontStretch = 'ultra-expanded'; } catch (e) { } x.letterSpacing = '18px'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PAR MOTOR', w / 2, h / 2 + 4); });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(15, 1.4), new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false, color: 0xd9cdb6 }));
    m.position.set(CX, H + 0.62, F + 2.02); edificio.add(m);
  }
  // cristaleras: fachada con puerta corredera, lateral izquierdo y fondo
  const panel = (x0, x1, y0, y1, z) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, y1 - y0), vidrio); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, z); edificio.add(m); return m; };
  const DW = 2.3, DH = 3.4;
  panel(X0, -DW, 0, H, F); panel(DW, X1, 0, H, F); panel(-DW, DW, DH, H, F);
  const hojas = [-1, 1].map(s => { const g = new THREE.Group(); const v = new THREE.Mesh(new THREE.PlaneGeometry(DW, DH), vidrio); g.add(v); const marco = new THREE.Mesh(new THREE.BoxGeometry(DW, DH, 0.06), new THREE.MeshStandardMaterial({ color: 0x0b0b0c, metalness: 0.8, roughness: 0.4, wireframe: false, transparent: true, opacity: 0 })); g.add(marco); const tirador = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.4, 0.08), perfil); tirador.position.set(-s * (DW / 2 - 0.15), 0, 0.05); g.add(tirador); g.position.set(s * DW / 2, DH / 2, F + 0.03); g.userData.s = s; edificio.add(g); return g; });
  for (let x = X0; x <= X1; x += 3.75) if (Math.abs(x) > DW + 0.3) caja(0.12, H, 0.3, perfil, x, H / 2, F);
  caja(0.16, DH, 0.34, perfil, -DW, DH / 2, F); caja(0.16, DH, 0.34, perfil, DW, DH / 2, F); caja(DW * 2, 0.16, 0.34, perfil, 0, DH, F);
  caja(X1 - X0, 0.1, 0.3, perfil, CX, DH, F + 0.01);
  { const m = new THREE.Mesh(new THREE.PlaneGeometry(F - Z0, H), vidrio); m.rotation.y = Math.PI / 2; m.position.set(X0, H / 2, (Z0 + F) / 2); edificio.add(m); }
  for (let z = Z0; z <= F; z += 3.75) caja(0.3, H, 0.12, perfil, X0, H / 2, z);
  panel(X0, X1, 0, H, Z0);
  for (let x = X0; x <= X1; x += 3.75) caja(0.12, H, 0.3, perfil, x, H / 2, Z0);
  // techo interior con tiras de luz (es lo que se ve cálido desde fuera)
  const techo = new THREE.Group(); edificio.add(techo);
  { const m = new THREE.Mesh(new THREE.PlaneGeometry(X1 - X0, F - Z0), new THREE.MeshStandardMaterial({ color: 0x0d0c0b, roughness: 0.9 })); m.rotation.x = Math.PI / 2; m.position.set(CX, H - 0.02, (Z0 + F) / 2); techo.add(m); }
  const tira = new THREE.MeshBasicMaterial({ color: warm.clone().multiplyScalar(0.8), toneMapped: false });
  // halo cálido dentro de la caja de cristal: desde fuera el edificio se ve encendido
  { const m = new THREE.Mesh(new THREE.BoxGeometry(X1 - X0 - 0.4, H - 0.3, F - Z0 - 0.4), new THREE.MeshBasicMaterial({ color: 0xffb066, transparent: true, opacity: 0.09, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending })); m.position.set(CX, H / 2, (Z0 + F) / 2); edificio.add(m); }
  for (let z = Z0 + 5; z < F - 2; z += 9) { const m = new THREE.Mesh(new THREE.BoxGeometry(X1 - X0 - 10, 0.05, 0.1), tira); m.position.set(CX, H - 0.08, z); techo.add(m); }
  // luz que sale del edificio hacia la explanada, luna y relleno
  [[-14, 5, F + 3], [CX, 5, F + 3], [20, 5, F + 3]].forEach(([x, y, z]) => { const l = new THREE.PointLight(0xffc583, 160, 60, 1.6); l.position.set(x, y, z); scene.add(l); });
  const interior = new THREE.PointLight(0xffc583, 120, 50, 1.4); interior.position.set(CX, 9, (Z0 + F) / 2); scene.add(interior);
  scene.add(new THREE.HemisphereLight(0x5a6478, 0x050505, 0.45));
  const luna = new THREE.DirectionalLight(0x9fb2d6, 0.35); luna.position.set(-200, 260, -120); scene.add(luna);
  const rim = new THREE.DirectionalLight(0xffd2a0, 0.8); rim.position.set(-6, 7, -14); scene.add(rim);

  // ---------- plataformas y coches ----------
  const anillo = tex(256, 256, (x, w) => { const g = x.createRadialGradient(w / 2, w / 2, 60, w / 2, w / 2, w / 2); g.addColorStop(0, 'rgba(255,200,130,0)'); g.addColorStop(0.62, 'rgba(255,196,120,0.55)'); g.addColorStop(0.7, 'rgba(255,190,110,0.22)'); g.addColorStop(1, 'rgba(255,180,100,0)'); x.fillStyle = g; x.fillRect(0, 0, w, w); });
  const sombraTex = tex(128, 256, (x, w, h) => { const g = x.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2); g.addColorStop(0, 'rgba(0,0,0,.85)'); g.addColorStop(0.7, 'rgba(0,0,0,.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.save(); x.scale(1, h / w); x.fillRect(0, 0, w, w); x.restore(); });
  const slots = MODELOS.map((M, i) => {
    const g = new THREE.Group(); scene.add(g);
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.26, 96), new THREE.MeshStandardMaterial({ color: 0x1b1916, roughness: 0.38, metalness: 0.35 }));
    plat.position.y = 0.16; g.add(plat);
    const ringMat = new THREE.MeshBasicMaterial({ color: warm.clone().multiplyScalar(0.25), toneMapped: false });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(R + 0.005, 0.024, 8, 160), ringMat); ring.rotation.x = Math.PI / 2; ring.position.y = 0.04; g.add(ring);
    const ring2 = ring.clone(); ring2.position.y = 0.29; ring2.scale.setScalar(0.995); g.add(ring2);
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(R * 2.9, R * 2.9), new THREE.MeshBasicMaterial({ map: anillo, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
    halo.rotation.x = -Math.PI / 2; halo.position.y = 0.02; g.add(halo);
    const spot = new THREE.SpotLight(0xffd7a8, 0, 18, 0.45, 0.6, 1.2); spot.position.set(0, 9.5, 2.4); spot.target.position.set(0, 0.5, 0); g.add(spot, spot.target);
    const turn = new THREE.Group(); turn.position.y = 0.302; g.add(turn);
    return { M, g, plat, ringMat, halo, spot, turn, car: null, pinturas: [], hover: 0, on: 0, rot: 0.6 + i * 0.9, vel: 0.12, sentido: 1 };
  });

  // ---------- encuadre y recorrido ----------
  let fin = null, layout = 'h';
  const ruta3 = { pos: null, look: null };
  const KT = [0, 0.185, 0.37, 0.556, 0.665, 0.775, 0.93];
  const place = () => {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight, asp = w / Math.max(1, h);
    camera.aspect = asp;
    fin = encuadre(asp, w, h); layout = asp < 0.9 ? 'v' : 'h';
    fin.L.pos.forEach(([x, z], i) => slots[i].g.position.set(x, 0, z));
    const v = layout === 'v';
    const k = v ? 0.45 : 1;
    const pos = [[96 * k + CX * (1 - k), 46, F + 170], [46 * k + CX * (1 - k), 17, F + 104], [-9 * k, 5.2, F + 74], [0, 3.4, F + 30], [0, 2.7, F + 7], [v ? 0 : -1.5, v ? 4.2 : 3.0, F - 5], [fin.pos.x, fin.pos.y, fin.pos.z]];
    const look = [[v ? CX : 0, 4, F - 14], [v ? CX : 0, 5, F - 8], [v ? 0 : -2, 5, F], [0, 4.2, F], [0, 2.6, F - 10], [fin.target.x * 0.6, 1.6, fin.target.z * 0.5], [fin.target.x, fin.target.y, fin.target.z]];
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

  // ---------- carga de los coches (el más cercano primero) ----------
  const draco = new DRACOLoader(); draco.setDecoderPath(base + 'draco/');
  const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
  const prepara = (s, i, gltf) => {
    const M = s.M, inner = gltf.scene, holder = new THREE.Group(); holder.add(inner);
    inner.updateMatrixWorld(true);
    let b = new THREE.Box3().setFromObject(inner), sz = b.getSize(new THREE.Vector3());
    if (sz.x > sz.z) { inner.rotation.y = Math.PI / 2; inner.updateMatrixWorld(true); b = new THREE.Box3().setFromObject(inner); sz = b.getSize(new THREE.Vector3()); }
    inner.scale.multiplyScalar(M.largo / Math.max(sz.x, sz.z)); inner.updateMatrixWorld(true);
    b = new THREE.Box3().setFromObject(inner); const c = b.getCenter(new THREE.Vector3());
    inner.position.x -= c.x; inner.position.z -= c.z; inner.position.y -= b.min.y - 0.012;
    b.setFromObject(inner); sz = b.getSize(new THREE.Vector3());
    const cache = new Map();
    inner.traverse(o => {
      if (!o.isMesh) return;
      o.userData.slot = i;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      const nuevos = mats.map(m => {
        if (cache.has(m)) return cache.get(m);
        let n = m;
        if (M.pintura && m.name === M.pintura.mat) {
          n = new THREE.MeshPhysicalMaterial({ color: M.pintura.color ?? m.color, metalness: 0.75, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.03, emissive: 0xffc583, emissiveIntensity: 0 });
          s.pinturas.push(n);
        } else if (M.dos && m.name === M.dos.mat) {
          n = new THREE.MeshPhysicalMaterial({ color: M.dos.color, metalness: 0.7, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.04 });
        } else if (M.cromo && M.cromo.includes(m.name)) {
          n = new THREE.MeshStandardMaterial({ color: 0xd9d9d9, metalness: 1, roughness: 0.16 });
        } else if (M.cristal && M.cristal.includes(m.name)) {
          n = new THREE.MeshPhysicalMaterial({ color: 0x0a0c0f, metalness: 0.3, roughness: 0.04, transparent: true, opacity: 0.86 });
        } else if (m.isMeshStandardMaterial) { m.envMapIntensity = 1.1; }
        cache.set(m, n); return n;
      });
      o.material = Array.isArray(o.material) ? nuevos : nuevos[0];
    });
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(sz.x * 1.25, sz.z * 1.18), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, toneMapped: false }));
    sh.rotation.x = -Math.PI / 2; sh.position.y = 0.006; sh.renderOrder = 2; s.sombra = sh;
    s.turn.add(holder, sh); s.car = holder;
  };
  let cargados = 0;
  const cargar = i => new Promise(res => loader.load(base + MODELOS[i].f, g => { prepara(slots[i], i, g); slots[i].plat.userData.slot = i; res(); }, undefined, () => res()));
  (async () => { for (const i of [0, 1, 2, 3]) { await cargar(i); cargados++; } room.classList.add('sr-listo'); wake(); })();

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
      if (drag.movido) {
        const da = dx * (layout === 'v' ? 0.016 : 0.011);
        const s = slots[drag.i]; s.rot += da;
        drag.v = drag.v * 0.6 + (da / dt) * 0.4;
      }
      drag.x = e.clientX; drag.t = now;
      return;
    }
    if (e.pointerType === 'mouse' && activo()) setHover(pick(e.clientX, e.clientY));
  });
  const suelta = e => {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    const s = slots[drag.i];
    if (!drag.movido && e && e.type === 'pointerup') tags[drag.i].click();
    else if (drag.movido) {
      // si la última vez que se movió fue hace rato, no hay lanzamiento
      const v = performance.now() - drag.t > 120 ? 0 : drag.v;
      s.vel = clamp(v, -28, 28); if (Math.abs(v) > 0.3) s.sentido = Math.sign(v);
    }
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
  let raf = 0, last = 0, primero = true;
  const camP = new THREE.Vector3(), camL = new THREE.Vector3(), tP = new THREE.Vector3(), tL = new THREE.Vector3(), v3 = new THREE.Vector3();
  let tSuave = -1;
  const frame = now => {
    raf = 0;
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    // el scroll manda; la cámara lo sigue con un poco de inercia
    const tObj = clamp(estado.p * 1.0);
    tSuave = tSuave < 0 ? tObj : tSuave + (tObj - tSuave) * (1 - Math.exp(-dt * 7));
    const t = tSuave;
    const s = poseEn(t, tP, tL);
    if (primero) { camP.copy(tP); camL.copy(tL); }
    camP.copy(tP); camL.copy(tL);
    const enSala = smooth(KT[5], KT[6], t);
    if (activo() && !drag) { camP.x += px * (layout === 'h' ? 2.0 : 0.9) * enSala; camP.y -= py * 0.7 * enSala; }
    camera.position.copy(camP); camera.lookAt(camL);
    camera.fov = 38 + (fin.fov - 38) * enSala;
    camera.setViewOffset(w, h, 0, fin.off * h * enSala, w, h);
    camera.updateProjectionMatrix();
    sky.position.copy(camera.position);
    // puertas: se abren cuando la cámara se acerca
    const abre = smooth(F + 26, F + 9, camera.position.z);
    hojas.forEach(g => { g.position.x = g.userData.s * (DW / 2 + abre * DW * 0.98); });
    // dentro del edificio no se ve la cubierta ni el techo por encima de la cámara
    const dentro = camera.position.z < F && camera.position.x > X0 && camera.position.x < X1;
    cubierta.visible = !(dentro && camera.position.y > H);
    techo.visible = camera.position.y < H - 0.1;
    // luces de la sala: se encienden al entrar
    const luces = smooth(KT[3], KT[5], t);
    slots.forEach((sl, i) => {
      const d = clamp((luces * 1.6 - i * 0.18) / 0.9);
      sl.on += (d - sl.on) * 0.12;
      sl.hover += ((hov === i ? 1 : 0) - sl.hover) * 0.1;
      const lit = 0.25 + sl.on * (0.5 + sl.hover * 0.5);
      sl.ringMat.color.copy(warm).multiplyScalar(0.25 + lit * 2.4);
      sl.halo.material.opacity = lit * 0.7 + sl.hover * 0.25;
      sl.spot.intensity = (50 + sl.on * 90 + sl.hover * 190);
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
      // etiqueta HTML bajo la plataforma
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
