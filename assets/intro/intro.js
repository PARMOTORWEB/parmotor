// Intro de Par Motor: un concesionario de cristal en medio del campo, de noche y con lluvia.
// La cámara llega por la carretera, se abren las puertas automáticas, entra y aparece la web.
// Todo se genera con código (sin modelos ni texturas externas). Three.js va incluido en assets/intro/.
import * as THREE from './three.module.min.js';
import { RoomEnvironment } from './RoomEnvironment.js';

export function iniciarIntro({ canvas, onReady, onProgress, onEnd, lowPower }) {
  const DPR = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.75);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, powerPreference: 'high-performance' });
  renderer.setPixelRatio(DPR);
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = !lowPower;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const SKY = new THREE.Color(0x1b2129);
  scene.background = SKY;
  scene.fog = new THREE.FogExp2(0x1d232b, 0.0095);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(innerWidth < innerHeight ? 62 : 48, innerWidth / innerHeight, 0.1, 900);

  // ---------- utilidades ----------
  const rnd = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const canvasTex = (w, h, draw, repeat) => {
    const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
    return t;
  };
  const box = (w, h, d, mat, x = 0, y = 0, z = 0, parent = scene) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); parent.add(m); return m;
  };

  // ---------- cielo ----------
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { flash: { value: 0 } },
    vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `varying vec3 vP; uniform float flash;
      float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
      void main(){ vec3 d = normalize(vP); float y = d.y;
        float c = n(d.xz/(y+0.25)*3.0)*0.55 + n(d.xz/(y+0.25)*7.0)*0.3;
        vec3 top = vec3(0.07,0.085,0.11), hor = vec3(0.13,0.15,0.18);
        vec3 col = mix(hor, top, smoothstep(0.0, 0.6, y)) + c*0.045*smoothstep(0.0,0.3,y);
        col += flash * vec3(0.55,0.6,0.75) * (0.4 + c);
        gl_FragColor = vec4(col, 1.0); }`
  });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(800, 32, 16), skyMat));

  // ---------- luces ----------
  const hemi = new THREE.HemisphereLight(0x95a6bb, 0x1e2618, 0.75); scene.add(hemi);
  const moon = new THREE.DirectionalLight(0xa9b8d0, 0.35); moon.position.set(-40, 60, 30); scene.add(moon);

  // ---------- campo ----------
  const grassTex = canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = '#2b3a22'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 9000; i++) { const v = 30 + rnd() * 40 | 0; g.fillStyle = `rgba(${v},${v + 25 + rnd() * 20 | 0},${v * 0.5 | 0},${0.35 + rnd() * 0.4})`; g.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 2, 2 + rnd() * 5); }
  }, [90, 90]);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(1200, 1200), new THREE.MeshStandardMaterial({ map: grassTex, roughness: 0.92, color: 0x9aa58a }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

  // colinas lejanas
  const hillMat = new THREE.MeshStandardMaterial({ color: 0x1c2618, roughness: 1 });
  [[-180, -260, 140], [60, -320, 180], [260, -220, 120], [-320, 40, 160], [330, 80, 150], [-120, 330, 130], [200, 300, 170]].forEach(([x, z, r]) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 12), hillMat); m.scale.y = 0.22; m.position.set(x, -r * 0.05, z); scene.add(m);
  });

  // árboles (instanciados)
  const nT = lowPower ? 90 : 200;
  const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.18, 0.28, 3, 6), new THREE.MeshStandardMaterial({ color: 0x2a1f16, roughness: 1 }), nT);
  const crown = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ color: 0x223319, roughness: 1, flatShading: true }), nT);
  const M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), S3 = new THREE.Vector3(), P3 = new THREE.Vector3();
  for (let i = 0; i < nT; i++) {
    let x, z; do { x = (rnd() - 0.5) * 360; z = (rnd() - 0.5) * 360 + 40; } while (Math.abs(x) < 26 && z > -30 && z < 150 || (Math.abs(x) < 34 && Math.abs(z) < 24));
    const s = 0.8 + rnd() * 1.1;
    M4.compose(P3.set(x, 1.5 * s, z), Q.identity(), S3.set(s, s, s)); trunk.setMatrixAt(i, M4);
    Q.setFromEuler(new THREE.Euler(rnd(), rnd() * 6, rnd()));
    M4.compose(P3.set(x, (3.2 + rnd()) * s, z), Q, S3.set(2.2 * s, 2.8 * s, 2.2 * s)); crown.setMatrixAt(i, M4);
  }
  scene.add(trunk, crown);

  // ---------- carretera mojada ----------
  const wet = new THREE.MeshStandardMaterial({ color: 0x1d1f22, roughness: 0.22, metalness: 0.15 });
  const road = new THREE.Mesh(new THREE.PlaneGeometry(9, 150), wet); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 85); road.receiveShadow = true; scene.add(road);
  const lineMat = new THREE.MeshStandardMaterial({ color: 0xd8d6cc, roughness: 0.5, emissive: 0x222222 });
  for (let z = 20; z < 160; z += 6) { const l = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 2.6), lineMat); l.rotation.x = -Math.PI / 2; l.position.set(0, 0.03, z); scene.add(l); }
  // explanada delante del concesionario
  const apron = new THREE.Mesh(new THREE.PlaneGeometry(44, 20), wet); apron.rotation.x = -Math.PI / 2; apron.position.set(0, 0.025, 19); apron.receiveShadow = true; scene.add(apron);
  // farolas
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x3a3d42, metalness: 0.6, roughness: 0.4 });
  const lampMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffe2b0, emissiveIntensity: 3 });
  for (const z of [32, 60, 88, 116]) for (const s of [-1, 1]) {
    box(0.16, 7, 0.16, poleMat, s * 6, 3.5, z); box(1.6, 0.12, 0.3, poleMat, s * 5.3, 7, z); box(0.9, 0.08, 0.25, lampMat, s * 5, 6.93, z);
  }

  // ---------- concesionario ----------
  const W = 34, D = 20, H = 7.2, FZ = D / 2; // fachada en z = +10
  const dealer = new THREE.Group(); scene.add(dealer);
  const concrete = new THREE.MeshStandardMaterial({ color: 0x2f3134, roughness: 0.8 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x15171a, metalness: 0.7, roughness: 0.35 });
  const floorTex = canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = '#d9d9d6'; g.fillRect(0, 0, w, h); g.strokeStyle = 'rgba(0,0,0,.10)'; g.lineWidth = 2;
    for (let i = 0; i <= w; i += 128) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); }
  }, [W / 3, D / 3]);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshStandardMaterial({ map: floorTex, color: 0xbdbdba, roughness: 0.16, metalness: 0.05, envMapIntensity: 0.9 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = 0.06; floor.receiveShadow = true; dealer.add(floor);
  box(W + 2, 0.12, D + 2, concrete, 0, 0.0, 0, dealer);
  // techo con voladizo y rótulo
  box(W + 3, 0.7, D + 4, concrete, 0, H + 0.35, 1, dealer);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshStandardMaterial({ color: 0xe9e9e6, roughness: 0.9 })); ceil.rotation.x = Math.PI / 2; ceil.position.y = H - 0.01; dealer.add(ceil);
  const signTex = canvasTex(2048, 160, (g, w, h) => {
    g.fillStyle = '#0f0f0e'; g.fillRect(0, 0, w, h);
    g.font = 'italic 800 104px "Barlow Condensed", Inter, sans-serif'; g.textBaseline = 'middle'; g.textAlign = 'center';
    g.shadowColor = '#e4ff4f'; g.shadowBlur = 26; g.fillStyle = '#e4ff4f'; g.fillText('PAR MOTOR', w / 2, h / 2 + 4);
    g.shadowBlur = 0; g.font = '600 40px Inter, sans-serif'; g.fillStyle = '#bdbcb4'; g.textAlign = 'left'; g.fillText('TASADOR · COMPARADOR · ASESOR', 40, h / 2 + 2);
    g.textAlign = 'right'; g.fillText('SEGUNDA MANO · ESPAÑA', w - 40, h / 2 + 2);
  });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(W + 3, (W + 3) * 160 / 2048), new THREE.MeshBasicMaterial({ map: signTex, toneMapped: false }));
  sign.position.set(0, H + 0.35, FZ + 3.02); dealer.add(sign);
  // muro del fondo con pantalla LED
  box(W, H, 0.4, concrete, 0, H / 2, -FZ, dealer);
  const ledTex = canvasTex(1600, 520, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#111210'); gr.addColorStop(1, '#1d1f1a'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(228,255,79,.06)'; for (let y = 0; y < h; y += 6) g.fillRect(0, y, w, 2);
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = 'italic 800 190px "Barlow Condensed", Inter, sans-serif'; g.fillStyle = '#e4ff4f'; g.shadowColor = '#e4ff4f'; g.shadowBlur = 30; g.fillText('PAR MOTOR', w / 2, h * 0.42);
    g.shadowBlur = 0; g.font = '600 50px Inter, sans-serif'; g.fillStyle = '#f2f1ec'; g.fillText('Cuánto vale y cuánto cuesta tu coche', w / 2, h * 0.75);
  });
  const led = new THREE.Mesh(new THREE.PlaneGeometry(16, 5.2), new THREE.MeshBasicMaterial({ map: ledTex, toneMapped: false }));
  led.position.set(0, 3.6, -FZ + 0.22); dealer.add(led);
  // cristal y montantes (fachada y laterales)
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x9fb4c8, roughness: 0.04, metalness: 0.1, transparent: true, opacity: 0.16, envMapIntensity: 2.2, depthWrite: false, side: THREE.DoubleSide });
  const DOOR = 4.4; // hueco de la puerta automática
  const facade = (len, mk) => { for (let x = -len / 2; x <= len / 2 + 0.01; x += 3.4) mk(x); };
  // fachada principal en dos tramos (deja el hueco de la puerta)
  [[-(W / 2 + DOOR / 2) / 2, W / 2 - DOOR / 2], [(W / 2 + DOOR / 2) / 2, W / 2 - DOOR / 2]].forEach(([cx, len]) => {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(len, H), glass); p.position.set(cx, H / 2, FZ); dealer.add(p);
  });
  facade(W, x => { if (Math.abs(x) > DOOR / 2 - 0.1) box(0.14, H, 0.2, steel, x, H / 2, FZ, dealer); });
  box(DOOR + 0.4, 0.5, 0.3, steel, 0, 3.05, FZ, dealer); // dintel de la puerta
  const doorTop = new THREE.Mesh(new THREE.PlaneGeometry(DOOR, H - 3.3), glass); doorTop.position.set(0, 3.3 + (H - 3.3) / 2, FZ); dealer.add(doorTop);
  const doorL = new THREE.Mesh(new THREE.PlaneGeometry(DOOR / 2, 2.8), glass), doorR = doorL.clone();
  doorL.position.set(-DOOR / 4, 1.42, FZ + 0.06); doorR.position.set(DOOR / 4, 1.42, FZ + 0.06); dealer.add(doorL, doorR);
  const doorFrameL = box(0.06, 2.8, 0.08, steel, -DOOR / 2 + 0.03, 1.42, FZ + 0.08, dealer), doorFrameR = box(0.06, 2.8, 0.08, steel, DOOR / 2 - 0.03, 1.42, FZ + 0.08, dealer);
  for (const s of [-1, 1]) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(D, H), glass); p.rotation.y = Math.PI / 2; p.position.set(s * W / 2, H / 2, 0); dealer.add(p);
    for (let z = -D / 2; z <= D / 2 + 0.01; z += 3.4) box(0.2, H, 0.14, steel, s * W / 2, H / 2, z, dealer);
  }
  // luces del techo (tiras) y focos sobre los coches
  const stripMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff4e0, emissiveIntensity: 2.2 });
  for (let x = -12; x <= 12; x += 6) box(0.25, 0.05, D - 3, stripMat, x, H - 0.05, 0, dealer);
  const inside = new THREE.PointLight(0xfff1dc, lowPower ? 40 : 26, 40, 1.6); inside.position.set(0, H - 1.2, 0); scene.add(inside);
  const spot = (x, z, cast) => {
    const s = new THREE.SpotLight(0xffffff, 95, 16, 0.55, 0.6, 1.4); s.position.set(x, H - 0.4, z); s.target.position.set(x, 0, z);
    s.castShadow = cast && !lowPower; s.shadow.mapSize.set(1024, 1024); s.shadow.bias = -0.0015; s.shadow.normalBias = 0.04; scene.add(s, s.target); return s;
  };
  // reflejo de la luz del concesionario sobre el asfalto mojado
  const reflTex = canvasTex(256, 256, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(255,236,200,.55)'); gr.addColorStop(1, 'rgba(255,236,200,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
  });
  const refl = new THREE.Mesh(new THREE.PlaneGeometry(W, 12), new THREE.MeshBasicMaterial({ map: reflTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.55 }));
  refl.rotation.x = -Math.PI / 2; refl.position.set(0, 0.04, FZ + 6.2); scene.add(refl);

  // ---------- coches ----------
  // Perfiles laterales en metros (x: de atrás a delante, y: altura). Sin logotipos: siluetas genéricas.
  const TYPES = {
    deportivo: { L: 4.6, Wd: 1.95, r: 0.36, wx: [-1.45, 1.42], prof: [[-2.3, 0.25], [-2.3, 0.7], [-2.12, 0.82], [-1.45, 0.92], [-0.65, 1.27], [0.35, 1.29], [1.08, 0.92], [2.15, 0.72], [2.3, 0.52], [2.3, 0.25]], win: [[-1.3, 0.93], [-0.62, 1.22], [0.32, 1.24], [0.98, 0.94]], ws: [6, 5], rg: [3, 4], hl: 0.66, tl: 0.78, grille: 'amg' },
    berlina: { L: 4.85, Wd: 1.9, r: 0.35, wx: [-1.5, 1.45], prof: [[-2.42, 0.28], [-2.42, 0.82], [-2.2, 0.96], [-1.55, 1.01], [-0.95, 1.42], [0.6, 1.45], [1.25, 1.02], [2.3, 0.88], [2.42, 0.62], [2.42, 0.28]], win: [[-1.45, 1.03], [-0.92, 1.37], [0.57, 1.4], [1.15, 1.04]], ws: [6, 5], rg: [3, 4], hl: 0.78, tl: 0.88, grille: 'riñon' },
    todoterreno: { L: 4.8, Wd: 1.98, r: 0.42, wx: [-1.55, 1.5], prof: [[-2.4, 0.38], [-2.4, 1.88], [-2.3, 1.96], [0.95, 1.96], [1.22, 1.3], [2.33, 1.18], [2.4, 0.92], [2.4, 0.38]], win: [[-2.2, 1.3], [-2.2, 1.86], [0.92, 1.86], [1.12, 1.32]], ws: [4, 3], rg: null, hl: 1.0, tl: 1.25, grille: 'amg' },
    lujo: { L: 5.5, Wd: 2.0, r: 0.4, wx: [-1.75, 1.6], prof: [[-2.75, 0.3], [-2.75, 0.98], [-2.5, 1.1], [-1.9, 1.14], [-1.28, 1.6], [0.7, 1.63], [1.38, 1.16], [2.68, 1.1], [2.75, 0.96], [2.75, 0.3]], win: [[-1.8, 1.16], [-1.24, 1.55], [0.66, 1.58], [1.28, 1.18]], ws: [6, 5], rg: [3, 4], hl: 0.95, tl: 0.98, grille: 'lujo' },
    compacto: { L: 4.3, Wd: 1.8, r: 0.33, wx: [-1.35, 1.3], prof: [[-2.15, 0.28], [-2.15, 0.95], [-2.02, 1.4], [0.4, 1.47], [1.02, 1.05], [2.05, 0.88], [2.15, 0.6], [2.15, 0.28]], win: [[-1.95, 1.02], [-1.9, 1.36], [0.38, 1.41], [0.93, 1.07]], ws: [4, 3], rg: [1, 2], hl: 0.8, tl: 1.0, grille: 'normal' },
    suv: { L: 4.7, Wd: 1.92, r: 0.4, wx: [-1.45, 1.42], prof: [[-2.35, 0.36], [-2.35, 1.15], [-2.15, 1.62], [0.5, 1.68], [1.15, 1.2], [2.3, 1.05], [2.35, 0.76], [2.35, 0.36]], win: [[-2.02, 1.2], [-1.94, 1.56], [0.48, 1.62], [1.05, 1.24]], ws: [4, 3], rg: [1, 2], hl: 0.95, tl: 1.12, grille: 'riñon' },
  };
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.85 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x9a9da3, metalness: 0.9, roughness: 0.25 });
  const darkRim = new THREE.MeshStandardMaterial({ color: 0x26282c, metalness: 0.8, roughness: 0.3 });
  const glassCar = new THREE.MeshStandardMaterial({ color: 0x07090c, metalness: 0.85, roughness: 0.12, envMapIntensity: 0.7, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 1, roughness: 0.12 });
  const blackTrim = new THREE.MeshStandardMaterial({ color: 0x0c0c0d, roughness: 0.4 });
  const headMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xf4f6ff, emissiveIntensity: 2.5 });
  const tailMat = new THREE.MeshStandardMaterial({ color: 0x550000, emissive: 0xff1a1a, emissiveIntensity: 1.8 });
  const wheelGeo = new THREE.CylinderGeometry(1, 1, 0.3, 28); wheelGeo.rotateX(Math.PI / 2);
  const rimGeo = new THREE.CylinderGeometry(0.66, 0.66, 0.32, 24); rimGeo.rotateX(Math.PI / 2);
  function car(type, color, { matte = false, roof = null, dark = false } = {}) {
    const T = TYPES[type], g = new THREE.Group();
    const paint = new THREE.MeshPhysicalMaterial({ color, metalness: matte ? 0.2 : 0.55, roughness: matte ? 0.6 : 0.32, clearcoat: matte ? 0 : 1, clearcoatRoughness: 0.06, envMapIntensity: 1.3 });
    // silueta: base recta y parte superior trazada con una curva suave por los puntos del perfil
    const pr = T.prof, shape = new THREE.Shape();
    shape.moveTo(pr[0][0], pr[0][1]); shape.lineTo(pr[1][0], pr[1][1]);
    shape.splineThru(pr.slice(2, -1).map(([x, y]) => new THREE.Vector2(x, y)));
    shape.lineTo(pr[pr.length - 1][0], pr[pr.length - 1][1]); shape.closePath();
    const bev = 0.16, geo = new THREE.ExtrudeGeometry(shape, { depth: T.Wd - 2 * bev, bevelEnabled: true, bevelThickness: bev, bevelSize: 0.06, bevelSegments: 6, curveSegments: 28 });
    geo.translate(0, 0, -(T.Wd - 2 * bev) / 2);
    const body = new THREE.Mesh(geo, paint); body.castShadow = true; body.receiveShadow = true; g.add(body);
    if (roof) { // techo bicolor (lujo): una chapa fina sobre la línea del techo
      const a = T.prof[4], b = T.prof[5];
      const s2 = new THREE.Shape([[a[0], a[1] + 0.012], [b[0], b[1] + 0.012], [b[0], b[1] - 0.07], [a[0], a[1] - 0.07]].map(([x, y]) => new THREE.Vector2(x, y)));
      const rg = new THREE.ExtrudeGeometry(s2, { depth: T.Wd * 0.9, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 2 }); rg.translate(0, 0, -T.Wd * 0.45);
      g.add(new THREE.Mesh(rg, new THREE.MeshPhysicalMaterial({ color: roof, metalness: 0.5, roughness: 0.3, clearcoat: 1 })));
    }
    // ventanillas laterales
    const ws = new THREE.Shape(); ws.moveTo(T.win[0][0], T.win[0][1]); ws.splineThru(T.win.slice(1, -1).map(([x, y]) => new THREE.Vector2(x, y))); ws.lineTo(T.win[T.win.length - 1][0], T.win[T.win.length - 1][1]); ws.closePath();
    const wg = new THREE.ShapeGeometry(ws, 20);
    for (const s of [-1, 1]) { const w = new THREE.Mesh(wg, glassCar); w.position.z = s * (T.Wd / 2 + 0.02); g.add(w); }
    // parabrisas y luneta
    const pane = (ia, ib) => {
      const a = T.prof[ia], b = T.prof[ib], len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const holder = new THREE.Group(); holder.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0); holder.rotation.z = Math.atan2(b[1] - a[1], b[0] - a[0]);
      const p = new THREE.Mesh(new THREE.PlaneGeometry(len * 0.92, T.Wd * 0.84), glassCar); p.rotation.x = -Math.PI / 2; p.position.y = 0.012;
      holder.add(p); g.add(holder);
    };
    pane(...T.ws); if (T.rg) pane(...T.rg);
    // faldón y pasos de rueda oscuros
    for (const s of [-1, 1]) box(T.L * 0.62, 0.1, 0.03, blackTrim, (T.wx[0] + T.wx[1]) / 2, pr[0][1] + 0.05, s * (T.Wd / 2 + 0.006), g);
    const archG = new THREE.TorusGeometry(T.r + 0.07, 0.05, 6, 24, Math.PI);
    for (const x of T.wx) for (const s of [-1, 1]) { const a = new THREE.Mesh(archG, blackTrim); a.position.set(x, T.r, s * (T.Wd / 2 + 0.004)); g.add(a); }
    // ruedas
    for (const x of T.wx) for (const s of [-1, 1]) {
      const t = new THREE.Mesh(wheelGeo, tireMat); t.scale.set(T.r, T.r, 1); t.position.set(x, T.r, s * (T.Wd / 2 - 0.1)); t.castShadow = true; g.add(t);
      const r = new THREE.Mesh(rimGeo, dark ? darkRim : rimMat); r.scale.set(T.r, T.r, 1); r.position.copy(t.position); r.position.z += s * 0.01; g.add(r);
      for (let k = 0; k < 5; k++) { const sp = new THREE.Mesh(new THREE.BoxGeometry(0.08, T.r * 1.2, 0.02), blackTrim); sp.position.copy(r.position); sp.position.z += s * 0.17; sp.rotation.z = k * Math.PI * 2 / 5; g.add(sp); }
    }
    // faros, pilotos y calandra (sin logotipos)
    const fx = T.L / 2 + 0.02, rx = -T.L / 2 - 0.02;
    for (const s of [-1, 1]) {
      box(0.04, 0.07, 0.42, headMat, fx, T.hl, s * (T.Wd / 2 - 0.36), g);
    }
    box(0.04, 0.06, T.Wd * (type === 'deportivo' || type === 'berlina' ? 0.92 : 0.5), tailMat, rx, T.tl, 0, g);
    if (type !== 'deportivo' && type !== 'berlina') for (const s of [-1, 1]) box(0.04, 0.1, 0.32, tailMat, rx, T.tl, s * (T.Wd / 2 - 0.3), g);
    if (T.grille === 'riñon') for (const s of [-1, 1]) { box(0.05, 0.24, 0.36, blackTrim, fx, T.hl - 0.04, s * 0.22, g); box(0.03, 0.27, 0.4, chrome, fx - 0.012, T.hl - 0.04, s * 0.22, g); }
    else if (T.grille === 'lujo') { box(0.06, 0.55, 0.62, chrome, fx, T.hl - 0.1, 0, g); for (let k = -5; k <= 5; k++) box(0.07, 0.48, 0.015, blackTrim, fx, T.hl - 0.1, k * 0.05, g); }
    else if (T.grille === 'amg') { box(0.05, 0.3, 0.9, blackTrim, fx, T.hl - 0.12, 0, g); for (let k = -7; k <= 7; k++) box(0.06, 0.28, 0.012, chrome, fx, T.hl - 0.12, k * 0.058, g); }
    else box(0.05, 0.16, 0.9, blackTrim, fx, T.hl - 0.12, 0, g);
    g.userData.T = T;
    return g;
  }
  const place = (c, x, z, ry) => { c.position.set(x, 0.06, z); c.rotation.y = ry; scene.add(c); return c; };
  // dentro: lo más potente
  const turntable = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 0.12, 64), new THREE.MeshStandardMaterial({ color: 0x18191b, metalness: 0.6, roughness: 0.25 }));
  turntable.position.set(0, 0.1, -3.2); scene.add(turntable);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(3.42, 0.035, 8, 96), new THREE.MeshStandardMaterial({ color: 0xe4ff4f, emissive: 0xe4ff4f, emissiveIntensity: 2.5 })); ring.rotation.x = Math.PI / 2; ring.position.set(0, 0.16, -3.2); scene.add(ring);
  const hero = car('deportivo', 0x1f5fd6); hero.position.set(0, 0.16, 0); turntable.add(hero);
  place(car('lujo', 0xb9bcc2, { roof: 0x1a2440 }), -9.5, -4.2, 0.55);
  place(car('deportivo', 0x2f4a32, { matte: true, dark: true }), 9.2, -4.6, -0.6);
  place(car('berlina', 0xf0f0ee, { dark: true }), -10.5, 3.6, 0.9);
  place(car('todoterreno', 0x0d0e10, { matte: true, dark: true }), 10.6, 3.2, -0.85);
  place(car('berlina', 0x6a0f14), -4.8, 4.8, 0.25);
  place(car('suv', 0x8e9399), -14.2, -0.8, 1.35);
  place(car('compacto', 0xe8c21e), 14.0, -1.0, -1.4);
  // focos del concesionario
  spot(0, -3.2, true); spot(-9.5, -4.2, true); spot(9.2, -4.6, false); spot(-7.5, 4.2, false); spot(7.5, 4.2, false);
  // fuera, bajo la lluvia
  place(car('todoterreno', 0x3c3f44, { matte: true, dark: true }), -11, 17.5, -0.35);
  place(car('compacto', 0xb51d21), -6.5, 18.5, -0.2);
  place(car('suv', 0xf2f2f0), 7, 18.2, 0.25);
  place(car('lujo', 0x101114, { roof: 0x6b1420 }), 12, 17.2, 0.4);
  // un deportivo que pasa por la carretera con las luces encendidas
  const passer = car('berlina', 0x2a2d33, { dark: true }); passer.rotation.y = Math.PI / 2; scene.add(passer);
  const beamTex = canvasTex(512, 128, (g2, w, h) => { const gr = g2.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, 'rgba(255,250,235,.6)'); gr.addColorStop(1, 'rgba(255,250,235,0)'); g2.fillStyle = gr; g2.fillRect(0, 0, w, h); });
  const beam = new THREE.Mesh(new THREE.PlaneGeometry(18, 3.4), new THREE.MeshBasicMaterial({ map: beamTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  beam.rotation.x = -Math.PI / 2; beam.position.set(passer.userData.T.L / 2 + 9, 0.0, 0); passer.add(beam);

  // ---------- lluvia (en GPU) ----------
  const N = lowPower ? 2200 : 5200, RB = 46, RH = 30;
  const rg = new THREE.BufferGeometry(), base = new Float32Array(N * 2 * 3), endA = new Float32Array(N * 2), off = new Float32Array(N * 2);
  for (let i = 0; i < N; i++) {
    const x = (rnd() - 0.5) * RB, y = rnd() * RH, z = (rnd() - 0.5) * RB, o = rnd();
    for (let k = 0; k < 2; k++) { base.set([x, y, z], (i * 2 + k) * 3); endA[i * 2 + k] = k; off[i * 2 + k] = o; }
  }
  rg.setAttribute('position', new THREE.BufferAttribute(base, 3)); rg.setAttribute('endA', new THREE.BufferAttribute(endA, 1)); rg.setAttribute('off', new THREE.BufferAttribute(off, 1));
  const rainMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { time: { value: 0 }, cam: { value: new THREE.Vector3() } },
    vertexShader: `attribute float endA; attribute float off; uniform float time; uniform vec3 cam; varying float vA;
      void main(){ vec3 p = position; float H = ${RH.toFixed(1)}, B = ${RB.toFixed(1)};
        p.y = mod(p.y - time * (16.0 + off * 6.0), H);
        p.x = cam.x + mod(p.x - cam.x + B*0.5, B) - B*0.5; p.z = cam.z + mod(p.z - cam.z + B*0.5, B) - B*0.5;
        p.y += max(cam.y - 8.0, 0.0);
        p += vec3(0.35, 0.9, 0.0) * endA * 0.55; vA = 0.06 + endA * 0.22;
        // no llueve dentro del concesionario
        if (abs(p.x) < 17.0 && abs(p.z) < 10.0) p.y = -50.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
    fragmentShader: 'varying float vA; void main(){ gl_FragColor = vec4(0.78,0.84,0.92, vA); }'
  });
  const rain = new THREE.LineSegments(rg, rainMat); rain.frustumCulled = false; scene.add(rain);

  // ---------- recorrido de la cámara ----------
  const P = [[-26, 13, 88], [-11, 7, 58], [-2.5, 3.6, 36], [0, 2.3, 22], [0, 1.85, 13.4], [0, 1.8, 7.8], [3.8, 2.3, 7.4], [8.0, 3.4, 8.6]].map(a => new THREE.Vector3(...a));
  const L = [[0, 2.5, 4], [0, 2.5, 4], [0, 2.6, 2], [0, 2.3, 0], [0, 1.9, 0], [-2, 1.4, -3], [-3, 1.2, -3], [-3.5, 1.0, -3.5]].map(a => new THREE.Vector3(...a));
  const pathP = new THREE.CatmullRomCurve3(P, false, 'centripetal'), pathL = new THREE.CatmullRomCurve3(L, false, 'centripetal');
  const DUR = 12; let prog = 0, last = performance.now(), ended = false, t0 = last, flash = 0, nextFlash = 2.2;
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let boost = 0; // la rueda del ratón o deslizar el dedo acelera la entrada
  const onWheel = e => { boost = Math.min(boost + Math.abs(e.deltaY) * 0.0006, 0.12); };
  let ty = null; const onTouch = e => { const y = e.touches[0].clientY; if (ty !== null) boost = Math.min(boost + Math.abs(ty - y) * 0.0012, 0.12); ty = y; };
  addEventListener('wheel', onWheel, { passive: true }); addEventListener('touchmove', onTouch, { passive: true }); addEventListener('touchend', () => ty = null);
  const onResize = () => { camera.aspect = innerWidth / innerHeight; camera.fov = innerWidth < innerHeight ? 62 : 48; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight, false); };
  addEventListener('resize', onResize);

  const tmpL = new THREE.Vector3();
  let first = true;
  function frame(now) {
    if (ended) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    prog = Math.min(1, prog + dt / DUR + boost * dt * 4); boost *= Math.pow(0.04, dt);
    const e = ease(prog);
    pathP.getPointAt(e, camera.position); pathL.getPointAt(e, tmpL);
    camera.position.y += Math.sin(now * 0.0011) * 0.03 * (1 - e); // leve vaivén, como cámara en mano
    camera.lookAt(tmpL);
    // puertas automáticas: se abren cuando la cámara se acerca
    const dz = camera.position.z - FZ, open = THREE.MathUtils.clamp(1 - (dz - 2) / 7, 0, 1);
    const o = THREE.MathUtils.smoothstep(open, 0, 1) * (DOOR / 2 - 0.05);
    doorL.position.x = -DOOR / 4 - o; doorR.position.x = DOOR / 4 + o; doorFrameL.position.x = -DOOR / 2 + 0.03 - o; doorFrameR.position.x = DOOR / 2 - 0.03 + o;
    turntable.rotation.y += dt * 0.5;
    const T = (now - t0) / 1000;
    passer.position.set(-2.2, 0.06, 26 + 124 * Math.pow(Math.max(0, 1 - T / 9.5), 2)); // llega y aparca en la explanada
    rainMat.uniforms.time.value = T; rainMat.uniforms.cam.value.copy(camera.position);
    // relámpagos
    if (T > nextFlash) { flash = 1; nextFlash = T + 4 + rnd() * 5; }
    flash = Math.max(0, flash - dt * 3.2);
    const f = flash * (0.6 + 0.4 * Math.sin(T * 80));
    skyMat.uniforms.flash.value = f; hemi.intensity = 0.75 + f * 2.2;
    // al entrar, la niebla exterior se suaviza
    scene.fog.density = 0.0095 * (1 - THREE.MathUtils.smoothstep(e, 0.62, 0.85) * 0.6);
    renderer.render(scene, camera);
    if (first) { first = false; onReady && onReady(); }
    onProgress && onProgress(prog);
    if (prog >= 1) { finish(); return; }
    requestAnimationFrame(frame);
  }
  function finish() {
    if (ended) return; ended = true;
    removeEventListener('wheel', onWheel); removeEventListener('touchmove', onTouch); removeEventListener('resize', onResize);
    onEnd && onEnd();
  }
  function dispose() {
    ended = true;
    scene.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) [].concat(o.material).forEach(m => { for (const k in m) if (m[k] && m[k].isTexture) m[k].dispose(); m.dispose(); }); });
    pmrem.dispose(); renderer.dispose(); renderer.forceContextLoss && renderer.forceContextLoss();
  }
  requestAnimationFrame(t => { last = t; t0 = t; frame(t); });
  return { skip: finish, dispose, seek: v => { prog = v; } };
}
