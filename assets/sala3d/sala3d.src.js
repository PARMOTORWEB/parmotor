// Sala 3D del final de la portada: cuatro coches en sus plataformas giratorias.
// Cada coche es una herramienta: al pasar por encima se ilumina y gira; al pulsar, lleva a su sección.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

export function iniciarSala(room, base) {
  const canvas = room.querySelector('.sr-canvas');
  const tags = [...room.querySelectorAll('.car')];
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { return false; }
  const movil = matchMedia('(max-width: 760px)').matches || matchMedia('(pointer: coarse)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, movil ? 1.5 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0a09);
  scene.fog = new THREE.Fog(0x0b0a09, 26, 60);
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.85;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 120);

  // ---------- la sala ----------
  const warm = new THREE.Color(0xffc583);
  // suelo de hormigón pulido: un espejo debajo y una capa oscura semitransparente encima
  if (!movil) {
    const mirror = new Reflector(new THREE.PlaneGeometry(120, 120), { textureWidth: 1024, textureHeight: 1024, color: 0x777777 });
    mirror.rotation.x = -Math.PI / 2; mirror.position.y = -0.002; scene.add(mirror);
  }
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120),
    new THREE.MeshStandardMaterial({ color: 0x060505, roughness: 0.3, metalness: 0.1, envMapIntensity: 0.1, transparent: !movil, opacity: movil ? 1 : 0.74 }));
  floor.rotation.x = -Math.PI / 2; scene.add(floor);

  // cristalera del fondo, con la lluvia y la noche detrás
  const wall = (() => {
    const c = document.createElement('canvas'); c.width = 2048; c.height = 512; const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#05070b'); g.addColorStop(0.75, '#0b1220'); g.addColorStop(1, '#141a24');
    x.fillStyle = g; x.fillRect(0, 0, 2048, 512);
    for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(255,${190 + Math.random() * 50 | 0},120,${Math.random() * 0.5})`; x.fillRect(Math.random() * 2048, 330 + Math.random() * 120, 2 + Math.random() * 3, 2 + Math.random() * 2); }
    for (let i = 0; i < 900; i++) { x.strokeStyle = `rgba(190,205,225,${0.03 + Math.random() * 0.07})`; const px = Math.random() * 2048, py = Math.random() * 512; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 2, py + 18 + Math.random() * 30); x.stroke(); }
    x.fillStyle = '#020202'; for (let i = 0; i <= 16; i++) x.fillRect(i * 128 - 5, 0, 10, 512);
    x.fillRect(0, 0, 2048, 14);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(64, 16), new THREE.MeshBasicMaterial({ map: wall, fog: false, toneMapped: false, color: 0x4a4a4a }));
  glass.position.set(0, 7, -22); glass.scale.set(1.6, 1, 1); scene.add(glass);
  // techo con tiras de luz
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(120, 60), new THREE.MeshStandardMaterial({ color: 0x0c0b0a, roughness: 0.9 }));
  ceil.rotation.x = Math.PI / 2; ceil.position.y = 9; scene.add(ceil);
  scene.add(new THREE.HemisphereLight(0x8a7a66, 0x050505, 0.35));
  const rim = new THREE.DirectionalLight(0xffd2a0, 1.1); rim.position.set(-6, 7, -14); scene.add(rim);
  const key = new THREE.DirectionalLight(0xfff1e0, 0.6); key.position.set(8, 10, 12); scene.add(key);

  // brillo cálido en el suelo, bajo cada plataforma
  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
    const g = x.createRadialGradient(128, 128, 60, 128, 128, 128);
    g.addColorStop(0, 'rgba(255,200,130,0)'); g.addColorStop(0.62, 'rgba(255,196,120,0.55)'); g.addColorStop(0.7, 'rgba(255,190,110,0.22)'); g.addColorStop(1, 'rgba(255,180,100,0)');
    x.fillStyle = g; x.fillRect(0, 0, 256, 256); return new THREE.CanvasTexture(c);
  })();

  // ---------- coches ----------
  const ACABADOS = [
    { body: 0x8d0710, det: 0x1b1b1d },   // rojo
    { body: 0x0b0b0d, det: 0xb48a4e },   // negro con llantas doradas
    { body: 0xe8e5dd, det: 0x2a2a2c },   // blanco
    { body: 0x15305f, det: 0xc7c7c9 },   // azul
  ];
  const R = 2.55; // radio de plataforma
  const slots = ACABADOS.map((a, i) => {
    const g = new THREE.Group(); scene.add(g);
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.26, 96), new THREE.MeshStandardMaterial({ color: 0x1b1916, roughness: 0.38, metalness: 0.35 }));
    plat.position.y = 0.16; g.add(plat);
    const ringMat = new THREE.MeshBasicMaterial({ color: warm.clone().multiplyScalar(0.25), toneMapped: false });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(R + 0.005, 0.022, 8, 160), ringMat); ring.rotation.x = Math.PI / 2; ring.position.y = 0.04; g.add(ring);
    const ring2 = ring.clone(); ring2.material = ringMat; ring2.position.y = 0.29; ring2.scale.setScalar(0.995); g.add(ring2);
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(R * 2.9, R * 2.9), new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
    halo.rotation.x = -Math.PI / 2; halo.position.y = 0.01; g.add(halo);
    const spot = new THREE.SpotLight(0xffd7a8, 0, 18, 0.42, 0.6, 1.2); spot.position.set(0, 8.6, 2.2); spot.target.position.set(0, 0.5, 0); g.add(spot, spot.target);
    const turn = new THREE.Group(); turn.position.y = 0.29; g.add(turn);
    return { g, plat, ringMat, halo, spot, turn, a, car: null, hover: 0, on: 0, rot: -0.6 + i * 0.9, speed: 0 };
  });

  // distribución según la forma de la pantalla: la cámara se aleja lo justo para que quepan los cuatro
  let layout = '';
  const P = new THREE.Vector3();
  const place = () => {
    const w = room.clientWidth, h = room.clientHeight, asp = w / Math.max(1, h);
    camera.aspect = asp; camera.clearViewOffset();
    let pos, dir, target, fov, mx, cy;
    if (asp < 0.9) {
      layout = 'v'; fov = 38; mx = 0.06; cy = 0.69;
      pos = [[-2.95, -3.4], [2.95, -3.4], [-2.95, 3.6], [2.95, 3.6]];
      dir = new THREE.Vector3(0, 0.9, 1).normalize(); target = new THREE.Vector3(0, 0.6, 0.2);
    } else {
      layout = 'h'; fov = 30; mx = 0.04; cy = 0.64;
      pos = [[-6.4, 2.9], [-0.8, -0.8], [4.6, -4.4], [10.2, -7.9]];
      dir = new THREE.Vector3(-0.22, 0.17, 1).normalize(); target = new THREE.Vector3(1.2, 1.0, -2.2);
    }
    pos.forEach(([x, z], i) => slots[i].g.position.set(x, 0, z));
    camera.fov = fov;
    const pts = [];
    slots.forEach(s => { const q = s.g.position; pts.push([q.x - R, 0, q.z], [q.x + R, 0, q.z], [q.x, 0, q.z + R], [q.x, 1.5, q.z]); });
    let lo = 5, hi = 80;
    for (let k = 0; k < 24; k++) {
      const d = (lo + hi) / 2;
      camera.position.copy(target).addScaledVector(dir, d); camera.lookAt(target); camera.updateProjectionMatrix(); camera.updateMatrixWorld();
      const ok = pts.every(([x, y, z]) => Math.abs(P.set(x, y, z).project(camera).x) <= 1 - mx);
      if (ok) hi = d; else lo = d;
    }
    camera.position.copy(target).addScaledVector(dir, hi); camera.lookAt(target); camera.updateProjectionMatrix(); camera.updateMatrixWorld();
    const c = pos.reduce((a, [x, z]) => [a[0] + x / 4, a[1] + z / 4], [0, 0]);
    const y0 = P.set(c[0], 0.4, c[1]).project(camera).y;
    const want = 1 - 2 * cy;
    camera.setViewOffset(w, h, 0, -((y0 - want) * h / 2), w, h);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  const draco = new DRACOLoader(); draco.setDecoderPath(base + 'draco/');
  const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
  const aoTex = new THREE.TextureLoader().load(base + 'ferrari_ao.png');
  let listo = false;
  loader.load(base + 'ferrari.glb', gltf => {
    const src = gltf.scene.children[0];
    slots.forEach((s, i) => {
      const car = src.clone(true);
      const body = s.body = new THREE.MeshPhysicalMaterial({ emissive: 0xffc583, emissiveIntensity: 0, color: s.a.body, metalness: 0.85, roughness: 0.38, clearcoat: 1, clearcoatRoughness: 0.03, side: THREE.DoubleSide });
      const det = new THREE.MeshStandardMaterial({ color: s.a.det, metalness: 1, roughness: 0.38 });
      const gl = new THREE.MeshPhysicalMaterial({ color: 0x08090b, metalness: 0.4, roughness: 0.03, transparent: true, opacity: 0.82 });
      car.getObjectByName('body').material = body;
      ['rim_fl', 'rim_fr', 'rim_rr', 'rim_rl', 'trim'].forEach(n => { const o = car.getObjectByName(n); if (o) o.material = det; });
      car.getObjectByName('glass').material = gl;
      const caja = new THREE.Box3().setFromObject(car); // en unidades del modelo, sin escalar
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4), new THREE.MeshBasicMaterial({ map: aoTex, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true, premultipliedAlpha: true }));
      sh.rotation.x = -Math.PI / 2; sh.position.y = 0.006; sh.scale.setScalar(1.12); sh.renderOrder = 2; s.sombra = sh;
      car.traverse(o => { if (o.isMesh) o.userData.slot = i; });
      s.plat.userData.slot = i;
      car.scale.setScalar(1.12);
      s.base = -caja.min.y * 1.12 + 0.015; // la rueda más baja queda sobre la plataforma
      s.turn.add(car, sh); s.car = car;
    });
    listo = true; room.classList.add('sr-listo'); wake();
  });

  // ---------- interacción ----------
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(9, 9);
  let hov = -1, px = 0, py = 0;
  const setHover = i => {
    if (i === hov) return; hov = i;
    tags.forEach((t, k) => t.classList.toggle('hot', k === i));
    canvas.style.cursor = i >= 0 ? 'pointer' : '';
    wake();
  };
  const pick = (cx, cy) => {
    const r = canvas.getBoundingClientRect();
    ptr.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const objs = []; slots.forEach(s => { objs.push(s.plat); if (s.car) objs.push(s.car); });
    const hit = ray.intersectObjects(objs, true)[0];
    return hit ? hit.object.userData.slot ?? -1 : -1;
  };
  canvas.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect(); px = (e.clientX - r.left) / r.width - 0.5; py = (e.clientY - r.top) / r.height - 0.5;
    if (e.pointerType === 'mouse') setHover(pick(e.clientX, e.clientY)); wake();
  });
  canvas.addEventListener('pointerleave', () => { setHover(-1); px = py = 0; });
  canvas.addEventListener('click', e => { const i = pick(e.clientX, e.clientY); if (i >= 0) tags[i].click(); });
  tags.forEach((t, i) => {
    t.addEventListener('pointerenter', () => setHover(i));
    t.addEventListener('pointerleave', () => setHover(-1));
    t.addEventListener('focus', () => setHover(i));
    t.addEventListener('blur', () => setHover(-1));
  });

  // ---------- bucle ----------
  let raf = 0, last = 0, t0 = 0, activo = false, entrada = 0;
  const v = new THREE.Vector3();
  const frame = now => {
    raf = 0;
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    if (!activo) return;
    if (!t0) t0 = now;
    entrada = Math.min(1, entrada + dt / 2.2);
    const ease = 1 - Math.pow(1 - entrada, 3);
    // la cámara entra despacio y sigue un poco al ratón
    const base = camera.userData.base || (camera.userData.base = camera.position.clone());
    camera.position.x += ((base.x + px * (layout === 'h' ? 2.2 : 1)) - camera.position.x) * 0.05;
    camera.position.y += ((base.y - py * 0.8) - camera.position.y) * 0.05;
    camera.position.z = base.z + (1 - ease) * 4;
    slots.forEach((s, i) => {
      const d = Math.min(1, Math.max(0, (entrada * 2.2 - i * 0.22) / 0.8));
      s.on += (d - s.on) * 0.12;
      s.hover += ((hov === i ? 1 : 0) - s.hover) * 0.1;
      const lit = s.on * (0.55 + s.hover * 0.45);
      s.ringMat.color.copy(warm).multiplyScalar(0.25 + lit * 2.4);
      s.halo.material.opacity = lit * 0.75 + s.hover * 0.25;
      s.spot.intensity = (70 + s.hover * 190) * s.on;
      if (s.sombra) s.sombra.material.opacity = 1 - s.hover * 0.45;
      if (s.body) s.body.emissiveIntensity = s.hover * 0.06;
      s.speed += ((0.12 + s.hover * 0.9) - s.speed) * 0.06;
      s.rot += s.speed * dt;
      s.turn.rotation.y = s.rot;
      s.turn.position.y = 0.29 + 0.012;
      if (s.car) s.car.position.y = (s.base || 0) + s.hover * 0.42 + (1 - s.on) * -0.7;
      // etiqueta HTML bajo la plataforma
      v.set(0, 0, R + 0.3).add(s.g.position).project(camera);
      const t = tags[i];
      const W = room.clientWidth, hw = (t.offsetWidth || 160) / 2 + 8;
      const tx = Math.min(W - hw, Math.max(hw, (v.x + 1) / 2 * W));
      t.style.transform = `translate3d(${tx.toFixed(1)}px,${((1 - v.y) / 2 * room.clientHeight).toFixed(1)}px,0) translate(-50%,0)`;
    });
    renderer.render(scene, camera);
    const quieto = slots.every(s => Math.abs(s.on - 1) < 0.002) && entrada >= 1;
    if (activo && !(quieto && document.hidden)) raf = requestAnimationFrame(frame);
  };
  const wake = () => { if (activo && !raf) { last = 0; raf = requestAnimationFrame(frame); } };

  place(); camera.userData.base = camera.position.clone();
  addEventListener('resize', () => { place(); camera.userData.base = camera.position.clone(); wake(); });
  // cine.js marca la sala con .on cuando el final del vuelo está a la vista
  const sync = () => {
    const on = room.classList.contains('on');
    if (on && !activo) { activo = true; wake(); }
    else if (!on && activo) { activo = false; entrada = 0; slots.forEach(s => { s.on = 0; }); setHover(-1); }
  };
  new MutationObserver(sync).observe(room, { attributes: true, attributeFilter: ['class'] });
  sync();
  return true;
}
