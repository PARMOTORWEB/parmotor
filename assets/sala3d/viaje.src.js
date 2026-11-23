// Entrada de la portada en 3D: un solo plano de cámara, controlado por el scroll.
// Día nublado y lluvioso: la cámara llega desde lejos, cruza el aparcamiento mojado, se planta frente
// a la fachada de piedra con el rótulo, cruza la puerta de cristal y termina dentro, delante de los cuatro coches.
// El cielo y la luz salen de una fotografía panorámica real (Poly Haven, CC0) y los materiales de
// texturas fotográficas (ambientCG, CC0). Cada coche es una herramienta: se gira arrastrando y al pulsarlo
// lleva a su sección.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
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
const APARCADOS = [
  { m: 1, x: -21, color: 0xe2b21c }, { m: 0, x: -16.4, color: 0x6c7076 }, { m: 1, x: -11.8, color: 0x1f4396 },
  { m: 0, x: -7.2, color: 0xe7e4dd }, { m: 1, x: 9.5, color: 0xb3121b }, { m: 0, x: 14.1, color: 0x17171a },
];
const ESCAPARATE = [{ m: 2, x: -22, rot: 0.5 }, { m: 1, x: -14.5, rot: -0.5, color: 0xd9d6cf }, { m: 0, x: 17, rot: 0.6, color: 0xb3121b }, { m: 3, x: 25, rot: -0.4 }];

// grano de película, viñeta y una pizca de aberración cromática: lo que hace que parezca una cámara
const Pelicula = {
  uniforms: { tDiffuse: { value: null }, t: { value: 0 }, grano: { value: 0.035 }, vig: { value: 0.32 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float t, grano, vig; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec2 d = vUv - 0.5; float ca = 0.0016 * dot(d, d) * 4.0;
      vec3 c = vec3(texture2D(tDiffuse, vUv + d * ca).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - d * ca).b);
      c *= 1.0 - vig * dot(d, d) * 1.8;
      c += (h(vUv * vec2(1543.0, 911.0) + fract(t)) - 0.5) * grano;
      gl_FragColor = vec4(c, 1.0);
    }`,
};

export function iniciarViaje({ sec, canvas, room, base, estado }) {
  const tags = [...room.querySelectorAll('.car')];
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { return null; }
  const movil = matchMedia('(max-width: 760px)').matches || matchMedia('(pointer: coarse)').matches;
  const DPR = Math.min(devicePixelRatio || 1, movil ? 1.4 : 1.6);
  renderer.setPixelRatio(DPR);
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const T = base + 'tex/';
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  const scene = new THREE.Scene();
  const FOG = new THREE.Color(0x9aa1a6);
  scene.fog = new THREE.FogExp2(FOG, 0.0016);
  scene.background = FOG;
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 3000);
  const warm = new THREE.Color(0xffe2b8);
  const R = 2.85;
  const loaderTex = new THREE.TextureLoader();
  const ptex = (f, rep, srgb = true) => { const t = loaderTex.load(T + f, () => wake()); t.wrapS = t.wrapT = THREE.RepeatWrapping; if (rep) t.repeat.set(rep[0], rep[1]); t.anisotropy = maxAniso; if (srgb) t.colorSpace = THREE.SRGBColorSpace; return t; };
  const tex = (w, h, draw, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; if (rep) t.repeat.set(rep[0], rep[1]); t.anisotropy = maxAniso; return t; };

  // ---------- cielo: fotografía panorámica real ----------
  const CROP = 1740 / 3072; // la imagen guarda sólo la mitad de arriba (y un poco más)
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, toneMapped: false,
    uniforms: { map: { value: null }, fogc: { value: FOG }, rot: { value: 2.1 }, gain: { value: 1.0 } },
    vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform sampler2D map; uniform vec3 fogc; uniform float rot, gain; varying vec3 vP;
      void main(){
        vec3 d = normalize(vP);
        float u = atan(d.z, d.x) / 6.2831853 + 0.5 + rot / 6.2831853;
        float v = asin(clamp(d.y, -1.0, 1.0)) / 3.1415926 + 0.5;
        float tt = (1.0 - v) / ${CROP.toFixed(5)};
        vec3 c = texture2D(map, vec2(fract(u), 1.0 - min(tt, 0.999))).rgb * gain;
        c = mix(c, fogc, smoothstep(0.96, 1.0, tt));
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(2400, 64, 32), skyMat);
  scene.add(sky);
  loaderTex.load(T + (movil ? 'cielo-m.jpg' : 'cielo.jpg'), t => { t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.RepeatWrapping; t.anisotropy = maxAniso; skyMat.uniforms.map.value = t; wake(); });
  const pm = new THREE.PMREMGenerator(renderer);
  const envSala = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  let envCielo = envSala;
  const exteriores = []; // materiales que deben reflejar el cielo real cuando cargue
  loaderTex.load(T + 'cielo-env.jpg', t => {
    t.mapping = THREE.EquirectangularReflectionMapping; t.colorSpace = THREE.SRGBColorSpace;
    const rt = pm.fromEquirectangular(t); envCielo = rt.texture; scene.environment = envCielo; scene.environmentRotation.y = -2.1;
    exteriores.forEach(m => { m.envMap = envCielo; m.needsUpdate = true; });
    // color de la niebla = color del horizonte de la foto
    const c = document.createElement('canvas'); c.width = 64; c.height = 32; const x = c.getContext('2d'); x.drawImage(t.image, 0, 0, 64, 32);
    const d = x.getImageData(0, 15, 64, 2).data; let r = 0, g = 0, b = 0; for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; } const n = d.length / 4;
    FOG.setRGB(r / n / 255, g / n / 255, b / n / 255, THREE.SRGBColorSpace);
    wake();
  });
  scene.environmentIntensity = 1.0;
  const hemi = new THREE.HemisphereLight(0xd7dde4, 0x4a4a3e, 1.1); scene.add(hemi);
  // día cubierto: no hay sol directo (sólo la luz difusa del cielo de la foto)

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
  const X0 = -30, X1 = 34, Z0 = -18, H = 11.5, HV = 5.4;
  const CX = (X0 + X1) / 2, CZ = (Z0 + F) / 2;
  const LOT = F + 40;

  // ---------- campo: hierba fotográfica, con variación para que no se repita ----------
  const hierba = new THREE.MeshStandardMaterial({ map: ptex('hierba_c.webp', [420, 420]), normalMap: ptex('hierba_n.webp', [420, 420], false), normalScale: new THREE.Vector2(0.8, 0.8), roughness: 0.95, metalness: 0, envMapIntensity: 0.5, color: 0xa9ad98 });
  hierba.transparent = true; hierba.depthWrite = false;
  hierba.onBeforeCompile = sh => {
    // lejos, el suelo se funde con el campo de la fotografía
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vDist;').replace('#include <fog_vertex>', '#include <fog_vertex>\nvDist = length((modelMatrix * vec4(transformed, 1.0)).xz - cameraPosition.xz);');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vDist;').replace('#include <dithering_fragment>', '#include <dithering_fragment>\ngl_FragColor.a *= 1.0 - smoothstep(260.0, 820.0, vDist);');
    sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
      { vec2 q = vMapUv / 420.0 * 9.0; float n = sin(q.x * 3.1) * sin(q.y * 2.7) + sin(q.x * 7.3 + 1.7) * sin(q.y * 6.1 + 0.4) * 0.5;
        vec3 c0 = diffuseColor.rgb; float l = dot(c0, vec3(0.3, 0.59, 0.11)); diffuseColor.rgb = mix(vec3(l), c0, 0.72);
        diffuseColor.rgb *= mix(vec3(0.78, 0.8, 0.68), vec3(1.12, 1.06, 0.9), smoothstep(-1.2, 1.2, n)); }`);
  };
  const terr = new THREE.PlaneGeometry(3000, 3000, 8, 8); terr.rotateX(-Math.PI / 2);
  const ground = new THREE.Mesh(terr, hierba); ground.position.set(CX, -0.03, CZ); ground.renderOrder = -1; scene.add(ground);

  // ---------- carretera de acceso ----------
  const asfC = ptex('asfalto_c.webp'), asfN = ptex('asfalto_n.webp', null, false), asfR = ptex('asfalto_r.webp', null, false);
  const ruta = new THREE.CatmullRomCurve3([[30, LOT - 2], [36, LOT + 30], [26, LOT + 70], [2, LOT + 110], [-18, LOT + 160], [-12, LOT + 220], [14, LOT + 290], [30, LOT + 380], [20, LOT + 520]].map(([x, z]) => new THREE.Vector3(x, 0, z)), false, 'centripetal');
  const cinta = (W, y, mat, uvU, uvV) => {
    const N = 500, pos = [], uv = [], idx = [];
    let len = 0, prev = ruta.getPoint(0);
    for (let i = 0; i <= N; i++) {
      const t = i / N, p = ruta.getPoint(t), tg = ruta.getTangent(t), nx = -tg.z, nz = tg.x, nl = Math.hypot(nx, nz);
      len += p.distanceTo(prev); prev = p;
      for (const s of [-1, 1]) { pos.push(p.x + nx / nl * W / 2 * s, y, p.z + nz / nl * W / 2 * s); uv.push((s < 0 ? 0 : 1) * uvU, len / uvV); }
      if (i < N) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat); scene.add(m); return m;
  };
  const asfaltoMat = (rep) => { const m = new THREE.MeshStandardMaterial({ map: asfC.clone(), normalMap: asfN.clone(), roughnessMap: asfR.clone(), roughness: 0.55, metalness: 0, envMapIntensity: 1.2, side: THREE.DoubleSide }); [m.map, m.normalMap, m.roughnessMap].forEach(t => { t.needsUpdate = true; t.repeat.set(rep[0], rep[1]); }); exteriores.push(m); return m; };
  cinta(7.6, 0.03, asfaltoMat([1, 1]), 1.5, 5);
  const pintura = tex(64, 512, (x, w, h) => { x.clearRect(0, 0, w, h); for (let y = 0; y < h; y++) { if ((y % 256) < 128) { x.fillStyle = `rgba(235,235,228,${0.75 + rng() * 0.2})`; x.fillRect(20 + rng() * 2, y, 24, 1); } } });
  cinta(0.22, 0.045, new THREE.MeshStandardMaterial({ map: pintura, transparent: true, roughness: 0.6, depthWrite: false }), 1, 6);

  // ---------- aparcamiento y sala: espejo debajo (agua) + materiales encima con charcos ----------
  if (!movil) {
    const mirror = new Reflector(new THREE.PlaneGeometry(X1 - X0 + 30, LOT - Z0 + 2), { textureWidth: 1280, textureHeight: 1280, color: 0x6c6c6c });
    mirror.rotation.x = -Math.PI / 2; mirror.position.set(CX, 0.002, (Z0 - 2 + LOT + 2) / 2); scene.add(mirror);
  }
  const capa = (x0, x1, z0, z1, mat, y) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), mat); m.rotation.x = -Math.PI / 2; m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); scene.add(m); return m; };
  // charcos: donde la máscara es oscura, el asfalto deja ver el espejo
  const charcos = tex(1024, 1024, (x, w, h) => {
    x.fillStyle = '#e6e6e6'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) {
      const cx = rng() * w, cy = rng() * h, r = 20 + rng() * 110, sx = 0.5 + rng() * 1.6;
      const g = x.createRadialGradient(0, 0, r * 0.2, 0, 0, r); g.addColorStop(0, 'rgba(70,70,70,1)'); g.addColorStop(0.6, 'rgba(110,110,110,.8)'); g.addColorStop(1, 'rgba(230,230,230,0)');
      x.save(); x.translate(cx, cy); x.rotate(rng() * 3); x.scale(sx, 1); x.fillStyle = g; x.beginPath(); x.arc(0, 0, r, 0, 6.29); x.fill(); x.restore();
    }
  }); charcos.colorSpace = THREE.NoColorSpace;
  const LW = X1 - X0 + 30, LD = LOT - F - 3;
  const lot = asfaltoMat([LW / 6, LD / 6]);
  if (!movil) { lot.transparent = true; lot.alphaMap = charcos; lot.depthWrite = false; }
  lot.onBeforeCompile = sh => { sh.vertexShader = sh.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\n#ifdef USE_ALPHAMAP\n vAlphaMapUv = uv * 2.2;\n#endif'); };
  capa(X0 - 15, X1 + 15, F + 3, LOT, lot, 0.01);
  // marcas viales del aparcamiento (sobre el asfalto), algo gastadas
  const marcas = tex(2048, 1024, (x, w, h) => {
    x.clearRect(0, 0, w, h);
    const sx = w / LW, sz = h / LD, X = v => (v - (X0 - 15)) * sx, Z = v => (v - F - 3) * sz;
    const raya = (x0, y0, ww, hh, col) => { x.fillStyle = col; x.fillRect(x0, y0, ww, hh); };
    for (let v = -23.3; v <= 17; v += 4.6) if (v < -4 || v > 7) raya(X(v) - 3, Z(F + 4.6), 6, 5.4 * sz, 'rgba(236,236,230,.85)');
    raya(X(-23.3), Z(F + 10), 21 * sx, 5, 'rgba(236,236,230,.85)'); raya(X(7.2), Z(F + 10), 9.2 * sx, 5, 'rgba(236,236,230,.85)');
    x.strokeStyle = 'rgba(226,182,30,.85)'; x.lineWidth = 7;
    const hx0 = X(-3.6), hx1 = X(6.6), hz0 = Z(F + 4.6), hz1 = Z(F + 10);
    x.strokeRect(hx0, hz0, hx1 - hx0, hz1 - hz0); x.save(); x.beginPath(); x.rect(hx0, hz0, hx1 - hx0, hz1 - hz0); x.clip();
    for (let k = -400; k < 800; k += 34) { x.beginPath(); x.moveTo(hx0 + k, hz0); x.lineTo(hx0 + k + 160, hz1); x.stroke(); } x.restore();
    for (let k = 0; k < 30; k++) raya(X(-28 + k * 2.4), Z(F + 22), 1.2 * sx, 5, 'rgba(236,236,230,.8)');
    x.globalCompositeOperation = 'destination-out'; for (let i = 0; i < 12000; i++) { x.fillStyle = `rgba(0,0,0,${rng() * 0.7})`; x.fillRect(rng() * w, rng() * h, 1 + rng() * 3, 1 + rng() * 3); }
  });
  marcas.wrapS = marcas.wrapT = THREE.ClampToEdgeWrapping;
  capa(X0 - 15, X1 + 15, F + 3, LOT, new THREE.MeshStandardMaterial({ map: marcas, transparent: true, depthWrite: false, roughness: 0.5, envMapIntensity: 0.6 }), 0.016);
  // acera y bordillo de hormigón
  const hormC = ptex('hormigon_c.webp'), hormN = ptex('hormigon_n.webp', null, false), hormR = ptex('hormigon_r.webp', null, false);
  const hormigon = (rep, tint = 0xbdbab5) => { const m = new THREE.MeshStandardMaterial({ map: hormC.clone(), normalMap: hormN.clone(), roughnessMap: hormR.clone(), color: tint, roughness: 0.8, envMapIntensity: 0.9 }); [m.map, m.normalMap, m.roughnessMap].forEach(t => { t.needsUpdate = true; t.repeat.set(rep[0], rep[1]); }); exteriores.push(m); return m; };
  { const bm = hormigon([30, 0.2], 0xa8a5a0); const b = (w, d, x, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.14, d), bm); m.position.set(x, 0.07, z); scene.add(m); };
    b(0.3, LOT - F - 3, X0 - 15, (F + 3 + LOT) / 2); b(0.3, LOT - F - 3, X1 + 15, (F + 3 + LOT) / 2);
    b((26 - (X0 - 15)), 0.3, (X0 - 15 + 26) / 2, LOT); b((X1 + 15 - 34), 0.3, (34 + X1 + 15) / 2, LOT); }
  const acera = new THREE.Mesh(new THREE.BoxGeometry(X1 - X0 + 30, 0.16, 3), hormigon([(X1 - X0 + 30) / 3, 1]));
  acera.position.set(CX, 0.08, F + 1.5); scene.add(acera);
  { const am = asfaltoMat([8, 4]); capa(X0 - 17, X1 + 17, Z0 - 6, Z0, am, 0.011); capa(X0 - 17, X0, Z0, F + 3, am, 0.011); capa(X1, X1 + 17, Z0, F + 3, am, 0.011); }
  // farolas del aparcamiento (de día, apagadas)
  { const pm2 = new THREE.MeshStandardMaterial({ color: 0x3a3c3f, roughness: 0.45, metalness: 0.8 }); exteriores.push(pm2);
    [[-26, F + 20], [-8, F + 20], [12, F + 20], [30, F + 20], [-26, F + 34], [12, F + 34]].forEach(([x, z]) => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 8, 10), pm2); p.position.set(x, 4, z); scene.add(p);
      const b = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.16, 0.42), pm2); b.position.set(x, 8, z); scene.add(b);
      const b0 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.34, 0.5, 12), hormigon([1, 1])); b0.position.set(x, 0.25, z); scene.add(b0);
    }); }

  // ---------- el concesionario ----------
  const edificio = new THREE.Group(); scene.add(edificio);
  // fachada: hormigón fotográfico oscurecido, con despiece de placas y poros (como en la foto)
  const placas = [];
  const placaMat = new THREE.MeshStandardMaterial({ color: 0x9a9a9a, roughness: 0.55, metalness: 0.05, normalScale: new THREE.Vector2(0.6, 0.6), envMapIntensity: 1.0 });
  new THREE.ImageLoader().load(T + 'hormigon_c.webp', img => {
    const c = document.createElement('canvas'), S = 1024; c.width = c.height = S; const x = c.getContext('2d');
    const cols = 2, rows = 4, pw = S / cols, ph = S / rows;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      x.save(); x.beginPath(); x.rect(i * pw, j * ph, pw, ph); x.clip();
      x.drawImage(img, (i * 317 + j * 173) % 512, (j * 211) % 512, 512, 512, i * pw, j * ph, pw * 1.05, ph * 2.1);
      x.restore();
      const g = 0.35 + rng() * 0.08; x.fillStyle = `rgba(28,30,34,${1 - g})`; x.fillRect(i * pw, j * ph, pw, ph);
      for (let k = 0; k < 160; k++) { const r = 0.8 + rng() * 2.8; x.fillStyle = `rgba(10,10,12,${0.55 + rng() * 0.4})`; x.beginPath(); x.ellipse(i * pw + rng() * pw, j * ph + rng() * ph, r, r * (0.6 + rng() * 0.5), rng() * 3, 0, 6.29); x.fill(); }
      const gr = x.createLinearGradient(0, j * ph, 0, (j + 1) * ph); gr.addColorStop(0, 'rgba(255,255,255,.04)'); gr.addColorStop(1, 'rgba(0,0,0,.1)'); x.fillStyle = gr; x.fillRect(i * pw, j * ph, pw, ph);
    }
    x.fillStyle = '#131416'; for (let i = 0; i <= cols; i++) x.fillRect(i * pw - 2, 0, 4, S); for (let j = 0; j <= rows; j++) x.fillRect(0, j * ph - 2, S, 4);
    for (let k = 0; k < 160; k++) { x.strokeStyle = `rgba(8,10,14,${0.04 + rng() * 0.07})`; x.lineWidth = 1 + rng() * 4; const px = rng() * S, py = Math.floor(rng() * rows) * ph; x.beginPath(); x.moveTo(px, py); x.lineTo(px + (rng() - 0.5) * 5, py + ph * (0.4 + rng() * 0.6)); x.stroke(); }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = maxAniso;
    placas.forEach(([m, w, h]) => { const tt = t.clone(); tt.needsUpdate = true; tt.repeat.set(w / 3.2, h / 6.4); m.map = tt; const nn = hormN.clone(); nn.needsUpdate = true; nn.repeat.set(w / 3.2, h / 3.2); m.normalMap = nn; m.needsUpdate = true; });
    wake();
  });
  const placa = (w, h) => { const m = placaMat.clone(); placas.push([m, w, h]); exteriores.push(m); return m; };
  const caja = (w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); edificio.add(m); return m; };
  const FH = 13.5;
  caja(X1 - X0, FH - HV, 0.6, placa(X1 - X0, FH - HV), CX, HV + (FH - HV) / 2, F + 0.3);
  caja(0.6, FH, F - Z0, placa(F - Z0, FH), X0 - 0.3, FH / 2, (Z0 + F) / 2);
  caja(0.6, FH, F - Z0, placa(F - Z0, FH), X1 + 0.3, FH / 2, (Z0 + F) / 2);
  caja(X1 - X0 + 1.2, FH, 0.6, placa(X1 - X0, FH), CX, FH / 2, Z0 - 0.3);
  const cubierta = caja(X1 - X0 + 1.2, 0.5, F - Z0 + 0.6, new THREE.MeshStandardMaterial({ color: 0x3a3b3d, roughness: 0.85 }), CX, FH - 0.25, (Z0 + F) / 2);
  { const m = new THREE.MeshStandardMaterial({ color: 0x2a2b2d, roughness: 0.35, metalness: 0.9 }); exteriores.push(m); caja(X1 - X0 + 1.4, 0.18, 0.75, m, CX, FH + 0.09, F + 0.32); }
  // sombra de contacto a pie de fachada (ancla el edificio al suelo)
  { const t = tex(16, 128, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(X1 - X0 + 2, 2.2), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.set(CX, 0.17, F + 1.15); scene.add(m); }
  const PW = 9.6, PH = 6.6, PD = 1.6;
  const marco = placa(3.2, 6.4);
  caja(0.9, PH, PD, marco, -PW / 2 - 0.45, PH / 2, F + PD / 2); caja(0.9, PH, PD, marco, PW / 2 + 0.45, PH / 2, F + PD / 2);
  caja(PW + 1.8, 0.9, PD, marco, 0, PH + 0.45, F + PD / 2);
  const led = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff1dc).multiplyScalar(1.5), toneMapped: false });
  caja(PW, 0.05, 0.12, led, 0, PH - 0.03, F + PD - 0.2);
  caja(X1 - X0, 0.04, 0.08, led, CX, HV - 0.05, F + 0.62);
  {
    const font = new FontLoader().parse(fuente);
    const letras = (txt, mat, size) => { const g = new TextGeometry(txt, { font, size, depth: 0.42, curveSegments: 8, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 3 }); g.computeBoundingBox(); const m = new THREE.Mesh(g, mat); m.scale.x = 1.32; return { m, w: (g.boundingBox.max.x - g.boundingBox.min.x) * 1.32 }; };
    const blanco = new THREE.MeshPhysicalMaterial({ color: 0xf2f2f0, roughness: 0.18, metalness: 0.2, clearcoat: 0.6, envMapIntensity: 1.2 });
    const rojo = new THREE.MeshPhysicalMaterial({ color: 0xb8121a, roughness: 0.2, metalness: 0.1, clearcoat: 1, emissive: 0x6a0306, emissiveIntensity: 0.35, envMapIntensity: 1.1 });
    exteriores.push(blanco, rojo);
    const a = letras('PAR', blanco, 2.7), b = letras('MOTOR', rojo, 2.7), gap = 1.6;
    const x0 = X0 + 4; a.m.position.set(x0, HV + 2.9, F + 0.62); b.m.position.set(x0 + a.w + gap, HV + 2.9, F + 0.62);
    edificio.add(a.m, b.m);
    const c = letras('PAR MOTOR', rojo, 0.7); c.m.position.set(PW / 2 + 1.4, PH - 1.6, F + 0.62); edificio.add(c.m);
  }
  // escaparate: cristal que refleja el cielo real y deja ver la sala iluminada
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0x9eabb6, transparent: true, opacity: 0.3, roughness: 0.02, metalness: 0.45, envMapIntensity: 2.6, depthWrite: false, side: THREE.DoubleSide });
  const perfil = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.3, metalness: 0.9 });
  exteriores.push(vidrio, perfil);
  const panel = (x0, x1, y0, y1, z) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, y1 - y0), vidrio); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, z); edificio.add(m); return m; };
  panel(X0, -PW / 2 - 0.9, 0, HV, F + 0.05); panel(PW / 2 + 0.9, X1, 0, HV, F + 0.05);
  for (let x = X0 + 3.2; x < X1; x += 3.2) if (Math.abs(x) > PW / 2 + 1) caja(0.09, HV, 0.16, perfil, x, HV / 2, F + 0.08);
  caja(X1 - X0, 0.12, 0.18, perfil, CX, 0.06, F + 0.08);
  const DW = 2.3, DH = 3.4, ZD = F + PD - 0.3;
  panel(-PW / 2, PW / 2, DH, PH, ZD); panel(-PW / 2, -DW, 0, DH, ZD); panel(DW, PW / 2, 0, DH, ZD);
  caja(PW, 0.1, 0.14, perfil, 0, DH, ZD); caja(0.1, DH, 0.14, perfil, -DW, DH / 2, ZD); caja(0.1, DH, 0.14, perfil, DW, DH / 2, ZD);
  const hojas = [-1, 1].map(s => { const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.PlaneGeometry(DW, DH), vidrio)); const tir = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.4, 0.07), perfil); tir.position.set(-s * (DW / 2 - 0.15), 0, 0.05); g.add(tir); g.position.set(s * DW / 2, DH / 2, ZD + 0.02); g.userData.s = s; edificio.add(g); return g; });
  { const m = new THREE.Mesh(new THREE.BoxGeometry(PW, 0.16, PD), hormigon([3, 0.6])); m.position.set(0, 0.08, F + PD / 2); edificio.add(m); }
  {
    const t = tex(128, 256, (x, w) => { x.fillStyle = '#c64a1d'; x.fillRect(0, 0, w, 256); x.fillStyle = '#fff'; x.font = '900 130px Inter, sans-serif'; x.textAlign = 'center'; x.fillText('P', w / 2, 128); x.fillRect(20, 170, w - 40, 6); x.fillRect(20, 200, w - 40, 6); });
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.0, 0.08), [perfil, perfil, perfil, perfil, new THREE.MeshStandardMaterial({ map: t, roughness: 0.5 }), perfil]);
    m.position.set(-PW / 2 - 1.6, 4.2, F + 0.75); edificio.add(m);
    caja(0.07, 3.7, 0.07, perfil, -PW / 2 - 1.6, 1.85, F + 0.75);
  }
  // interior: suelo de mármol con juntas, techo blanco con luminarias, pared del fondo oscura con líneas de luz
  const marmol = new THREE.MeshStandardMaterial({ map: ptex('marmol_c.webp', [(X1 - X0) / 2.4, (F - Z0) / 2.4]), roughnessMap: ptex('marmol_r.webp', [(X1 - X0) / 2.4, (F - Z0) / 2.4], false), color: 0xd9d6d0, roughness: 0.25, metalness: 0, envMap: envSala, envMapIntensity: 0.5, transparent: !movil, opacity: movil ? 1 : 0.7, depthWrite: movil });
  capa(X0, X1, Z0, F, marmol, 0.012);
  { const t = tex(512, 512, (x, w) => { x.clearRect(0, 0, w, w); x.fillStyle = 'rgba(90,86,80,.55)'; x.fillRect(0, 0, w, 3); x.fillRect(0, 0, 3, w); }, [(X1 - X0) / 1.2, (F - Z0) / 1.2]);
    capa(X0, X1, Z0, F, new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }), 0.014); }
  const techo = new THREE.Group(); edificio.add(techo);
  { const m = new THREE.Mesh(new THREE.PlaneGeometry(X1 - X0, F - Z0), new THREE.MeshStandardMaterial({ color: 0xe8e5df, roughness: 0.85, envMap: envSala })); m.rotation.x = Math.PI / 2; m.position.set(CX, H, (Z0 + F) / 2); techo.add(m); }
  {
    const luz = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff3e2).multiplyScalar(1.25), toneMapped: false });
    const g = new THREE.BoxGeometry(1.1, 0.04, 1.1);
    const pos = []; for (let x = X0 + 3; x < X1 - 2; x += 4.2) for (let z = Z0 + 3; z < F - 1; z += 4.2) pos.push([x, z]);
    const inst = new THREE.InstancedMesh(g, luz, pos.length); const m4 = new THREE.Matrix4();
    pos.forEach(([x, z], i) => inst.setMatrixAt(i, m4.makeTranslation(x, H - 0.03, z))); techo.add(inst);
  }
  {
    const fondo = new THREE.Mesh(new THREE.PlaneGeometry(X1 - X0, H), new THREE.MeshStandardMaterial({ color: 0x1e1d1c, roughness: 0.55, metalness: 0.1, envMap: envSala }));
    fondo.position.set(CX, H / 2, Z0 + 0.02); edificio.add(fondo);
    for (let x = X0 + 4; x < X1; x += 6) caja(0.05, H - 1.5, 0.05, led, x, H / 2, Z0 + 0.08);
    const lat = new THREE.MeshStandardMaterial({ color: 0xaeaaa3, roughness: 0.7, envMap: envSala });
    const l = new THREE.Mesh(new THREE.PlaneGeometry(F - Z0, H), lat); l.rotation.y = Math.PI / 2; l.position.set(X0 + 0.02, H / 2, CZ); edificio.add(l);
    const r = new THREE.Mesh(new THREE.PlaneGeometry(F - Z0, H), lat); r.rotation.y = -Math.PI / 2; r.position.set(X1 - 0.02, H / 2, CZ); edificio.add(r);
    const t = new THREE.Mesh(new THREE.PlaneGeometry(X1 - X0, H - HV), lat); t.rotation.y = Math.PI; t.position.set(CX, HV + (H - HV) / 2, F - 0.02); edificio.add(t);
    caja(X1 - X0, 0.04, 0.06, led, CX, 0.25, Z0 + 0.08);
  }
  // luces de la sala con alcance limitado: no deben salir por el cristal al aparcamiento
  const alcance = (z) => Math.max(8, Math.hypot(Math.max(1, F - 3 - z), H - 1.5));
  [[CX - 12, Z0 + 10], [CX + 12, Z0 + 10], [CX, (Z0 + F) / 2 - 4]].forEach(([x, z]) => { const l = new THREE.PointLight(0xfff0dc, 140, alcance(z), 1.2); l.position.set(x, H - 1.5, z); scene.add(l); });

  // ---------- plataformas (mármol negro) y coches de la sala ----------
  const anillo = tex(256, 256, (x, w) => { const g = x.createRadialGradient(w / 2, w / 2, 60, w / 2, w / 2, w / 2); g.addColorStop(0, 'rgba(255,220,170,0)'); g.addColorStop(0.62, 'rgba(255,214,160,0.5)'); g.addColorStop(0.7, 'rgba(255,205,150,0.2)'); g.addColorStop(1, 'rgba(255,200,140,0)'); x.fillStyle = g; x.fillRect(0, 0, w, w); });
  const sombraTex = tex(128, 256, (x, w, h) => { const g = x.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2); g.addColorStop(0, 'rgba(0,0,0,.85)'); g.addColorStop(0.7, 'rgba(0,0,0,.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.save(); x.scale(1, h / w); x.fillRect(0, 0, w, w); x.restore(); });
  const negro = new THREE.MeshPhysicalMaterial({ map: ptex('marmolnegro_c.webp', [2, 2]), roughness: 0.18, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05, envMap: envSala, color: 0xbfbfbf });
  const slots = MODELOS.map((M, i) => {
    const g = new THREE.Group(); scene.add(g);
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.26, 96), negro);
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
  let composer = null, pelicula = null;
  const place = () => {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight, asp = w / Math.max(1, h);
    camera.aspect = asp;
    fin = encuadre(asp, w, h); layout = asp < 0.9 ? 'v' : 'h';
    fin.L.pos.forEach(([x, z], i) => slots[i].g.position.set(x, 0, z));
    const v = layout === 'v', k = v ? 1.25 : 1;
    const pos = [[78 * k, 24, F + 118 * k], [44, 9, F + 74], [16, 3.4, F + 36], [0, 2.6, F + 19], [0, 2.3, F + 4], [v ? 0 : -1.5, v ? 4.2 : 3.0, F - 5], [fin.pos.x, fin.pos.y, fin.pos.z]];
    const look = [[v ? -9 : -4, 6, v ? F - 12 : F - 2], [-2, 5.5, F], [-1, 4.5, F], [0, 3.3, F], [0, 2.3, F - 10], [fin.target.x * 0.6, 1.6, fin.target.z * 0.5], [fin.target.x, fin.target.y, fin.target.z]];
    ruta3.pos = new THREE.CatmullRomCurve3(pos.map(p => new THREE.Vector3(...p)), false, 'centripetal');
    ruta3.look = new THREE.CatmullRomCurve3(look.map(p => new THREE.Vector3(...p)), false, 'centripetal');
    renderer.setSize(w, h, false);
    if (composer) { composer.setPixelRatio(DPR); composer.setSize(w, h); }
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
  // posproceso (sólo en ordenador): brillo suave en las luces, grano y viñeta
  if (!movil) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(512, 512), 0.22, 0.5, 0.96));
    composer.addPass(new OutputPass());
    pelicula = new ShaderPass(Pelicula); composer.addPass(pelicula);
  }

  // ---------- carga de los coches ----------
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
  const materiales = (inner, M, slot, color, fuera) => {
    const cache = new Map(), pinturas = [];
    inner.traverse(o => {
      if (!o.isMesh) return;
      if (slot >= 0) o.userData.slot = slot;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      const nuevos = mats.map(m => {
        if (cache.has(m)) return cache.get(m);
        let n;
        if (M.pintura && m.name === M.pintura.mat) {
          n = new THREE.MeshPhysicalMaterial({ color: color ?? M.pintura.color ?? m.color, metalness: 0.7, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.03, emissive: 0xffd9a8, emissiveIntensity: 0 });
          pinturas.push(n);
        } else if (M.dos && m.name === M.dos.mat) {
          n = new THREE.MeshPhysicalMaterial({ color: M.dos.color, metalness: 0.7, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.04 });
        } else if (M.cromo && M.cromo.includes(m.name)) {
          n = new THREE.MeshStandardMaterial({ color: 0xd9d9d9, metalness: 1, roughness: 0.16 });
        } else if (M.cristal && M.cristal.includes(m.name)) {
          n = new THREE.MeshPhysicalMaterial({ color: 0x0a0c0f, metalness: 0.3, roughness: 0.04, transparent: true, opacity: 0.86 });
        } else n = m.clone();
        if (fuera) { n.envMap = envCielo; exteriores.push(n); } else n.envMap = envSala;
        n.envMapIntensity = 1.1;
        cache.set(m, n); return n;
      });
      o.material = Array.isArray(o.material) ? nuevos : nuevos[0];
    });
    return pinturas;
  };
  const sombra = (sz, o = 1) => { const sh = new THREE.Mesh(new THREE.PlaneGeometry(sz.x * 1.25, sz.z * 1.18), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, toneMapped: false, opacity: o })); sh.rotation.x = -Math.PI / 2; sh.position.y = 0.02; sh.renderOrder = 2; return sh; };
  const gltfs = [];
  const cargar = i => new Promise(res => loader.load(base + MODELOS[i].f, g => { gltfs[i] = g; const s = slots[i]; const { holder, sz } = normaliza(g.scene.clone(true), s.M.largo); s.pinturas = materiales(holder, s.M, i, undefined, false); const sh = sombra(sz); s.sombra = sh; s.turn.add(holder, sh); s.car = holder; s.plat.userData.slot = i; res(); }, undefined, () => res()));
  const aparcar = () => {
    APARCADOS.slice(0, movil ? 3 : APARCADOS.length).forEach(a => {
      const g = gltfs[a.m]; if (!g) return;
      const M = MODELOS[a.m];
      const { holder, sz } = normaliza(g.scene.clone(true), M.largo);
      materiales(holder, M, -1, a.color, true);
      const grp = new THREE.Group(); grp.add(holder, sombra(sz, 0.9));
      grp.position.set(a.x, 0.02, F + 7.3); grp.rotation.y = Math.PI + (rng() - 0.5) * 0.06;
      scene.add(grp);
    });
    if (!movil) ESCAPARATE.forEach(a => {
      const g = gltfs[a.m]; if (!g) return;
      const M = MODELOS[a.m];
      const { holder, sz } = normaliza(g.scene.clone(true), M.largo);
      materiales(holder, M, -1, a.color, false);
      const grp = new THREE.Group(); grp.add(holder, sombra(sz));
      grp.position.set(a.x, 0.02, F - 4.2); grp.rotation.y = Math.PI / 2 + a.rot;
      scene.add(grp);
    });
    wake();
  };
  // árboles (modelos 3D reales, CC BY 4.0): hilera junto a la carretera y grupos alrededor
  const plantar = () => {
    const usar = (f, alto, sitios) => loader.load(base + f, g => {
      const src = g.scene; src.updateMatrixWorld(true);
      src.traverse(o => { if (o.isMesh) { const ms = Array.isArray(o.material) ? o.material : [o.material]; ms.forEach(m => { m.alphaTest = 0.5; m.transparent = false; m.side = THREE.DoubleSide; m.envMap = envCielo; m.envMapIntensity = 0.7; m.roughness = 0.85; m.metalness = 0; if (/leaf|leaves|hoja/i.test(m.name)) { m.color.multiplyScalar(1.35); m.color.offsetHSL(0.01, 0.05, 0); } exteriores.push(m); }); } });
      const b = new THREE.Box3().setFromObject(src), sz = b.getSize(new THREE.Vector3()), c = b.getCenter(new THREE.Vector3());
      sitios.forEach(([x, z, k]) => {
        const t = src.clone(true), esc = alto * k / sz.y;
        const grp = new THREE.Group(); t.position.set(-c.x, -b.min.y, -c.z); grp.add(t);
        grp.scale.setScalar(esc); grp.position.set(x, -0.05, z); grp.rotation.y = rng() * 6.28; scene.add(grp);
      });
      wake();
    });
    const hoja = [], seco = [];
    for (let i = 0; i < (movil ? 6 : 14); i++) { const t = 0.06 + i * 0.045, p = ruta.getPoint(t), tg = ruta.getTangent(t), s = i % 2 ? 1 : -1; hoja.push([p.x - tg.z * 9 * s, p.z + tg.x * 9 * s, 0.85 + rng() * 0.35]); }
    [[X0 - 26, F - 6], [X0 - 30, F - 20], [X0 - 24, Z0 - 10], [X1 + 26, F - 4], [X1 + 30, Z0 + 4], [X1 + 22, Z0 - 14], [CX - 10, Z0 - 28], [CX + 14, Z0 - 30]].forEach(([x, z]) => hoja.push([x, z, 0.9 + rng() * 0.4]));
    if (!movil) [[X0 - 34, F + 14], [X1 + 34, F + 20], [X0 - 40, Z0 - 2], [X1 + 40, F - 14], [-60, LOT + 40], [70, LOT + 20]].forEach(([x, z]) => seco.push([x, z, 0.9 + rng() * 0.3]));
    usar('arbol.glb', 10.5, hoja); if (seco.length) usar('desnudo.glb', 9, seco);
  };
  (async () => { for (const i of [0, 1, 2, 3]) await cargar(i); room.classList.add('sr-listo'); aparcar(); plantar(); })();

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
    const dentro = camera.position.z < F && camera.position.x > X0 && camera.position.x < X1;
    scene.fog.density = 0.0016 + (0.0004 - 0.0016) * smooth(F + 3, F - 6, camera.position.z) * (camera.position.x > X0 && camera.position.x < X1 ? 1 : 0);
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
    if (composer) { pelicula.uniforms.t.value = now * 0.001; composer.render(); } else renderer.render(scene, camera);
    if (primero) { primero = false; sec.classList.add('con3d'); }
    if (estado.visible) raf = requestAnimationFrame(frame);
  };
  const wake = () => { if (!raf && estado.visible) { last = 0; raf = requestAnimationFrame(frame); } };
  place();
  addEventListener('resize', () => { place(); wake(); });
  wake();
  return { wake };
}
