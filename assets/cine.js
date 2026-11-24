// Entrada de la portada: un solo plano de cámara en 3D controlado por el scroll
// (del campo a la carretera, la fachada, la puerta y la sala con los cuatro coches).
// Este archivo lleva el scroll, los textos, la lluvia y los capítulos; la escena está en sala3d/viaje.js.
(() => {
  const sec = document.querySelector('.cine');
  if (!sec) return;
  const root = document.documentElement;
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const copies = [...sec.querySelectorAll('.cl')];
  const chapters = [...sec.querySelectorAll('.cine-idx li')];
  const bar = sec.querySelector('.cine-bar i');
  const credit = sec.querySelector('.cine-cred');
  const room = sec.querySelector('.showroom');
  const canvas3d = sec.querySelector('.cine-3d');
  const N = copies.length;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const estado = { p: 0, visible: true };
  let viaje = null;

  // ---------- lluvia (por encima de la escena; se apaga al entrar) ----------
  const cv = sec.querySelector('.cine-rain'), cx = cv.getContext('2d');
  let drops = [], W = 0, H = 0, wet = 1, raf = 0;
  const resize = () => {
    const d = Math.min(devicePixelRatio || 1, 1.5);
    W = cv.clientWidth; H = cv.clientHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.round(Math.min(280, W * H / 5200));
    drops = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, l: 10 + Math.random() * 22, v: 13 + Math.random() * 11, a: 0.08 + Math.random() * 0.22 }));
  };
  const rain = () => {
    raf = 0;
    cx.clearRect(0, 0, W, H);
    if (wet > 0.01 && estado.visible) {
      cx.lineCap = 'round';
      for (const d of drops) {
        d.y += d.v; d.x += d.v * 0.18;
        if (d.y > H) { d.y = -d.l; d.x = Math.random() * W * 1.1 - W * 0.1; }
        cx.strokeStyle = `rgba(214,224,236,${d.a * wet})`; cx.lineWidth = 1;
        cx.beginPath(); cx.moveTo(d.x, d.y); cx.lineTo(d.x - d.l * 0.18, d.y - d.l); cx.stroke();
      }
    }
    if (estado.visible && wet > 0.01 && !RM.matches) raf = requestAnimationFrame(rain);
  };
  const kick = () => { if (!raf && estado.visible && wet > 0.01 && !RM.matches) raf = requestAnimationFrame(rain); };

  // ---------- recorrido renderizado (Blender Cycles): fotogramas que avanzan con el scroll ----------
  const seqCv = sec.querySelector('.cine-seq');
  // en pantallas verticales (móvil) hay otra tanda de fotogramas, encuadrada en vertical
  const SEQ_V = !!(seqCv && seqCv.dataset.dirV && innerWidth / innerHeight < 0.9);
  // pantallas con más píxeles reciben el juego de fotogramas en alta resolución (1440p / 1080x2400), salvo con ahorro de datos
  const DPR_MAX = SEQ_V ? 3 : 2, conx = navigator.connection || {};
  const SEQ_Q = !!(seqCv && (SEQ_V ? seqCv.dataset.dirVq : seqCv.dataset.dirQ) && !conx.saveData && !/(^|-)2g|3g/.test(conx.effectiveType || '')
    && innerWidth * Math.min(devicePixelRatio || 1, DPR_MAX) > (SEQ_V ? 960 : 2100));
  const SEQ_N = seqCv ? +(SEQ_V ? seqCv.dataset.nV : seqCv.dataset.n) : 0, SEQ_FIN = seqCv ? +seqCv.dataset.fin : 1;
  const SEQ_DIR = seqCv ? (SEQ_V ? (SEQ_Q ? seqCv.dataset.dirVq : seqCv.dataset.dirV) : (SEQ_Q ? seqCv.dataset.dirQ : seqCv.dataset.dir)) : '';
  const salaFin = p => smooth(SEQ_FIN, SEQ_FIN + 0.04, p); // fundido del último fotograma a la sala interactiva
  const fotos = new Array(SEQ_N); let seqP = -1, seqPend = false, salaIm = null;
  const sx = seqCv && seqCv.getContext('2d', { alpha: false });
  // el lienzo va a la resolución real de la pantalla (hasta 2×): los fotogramas son de 1080p y se ven nítidos
  const seqSize = () => { if (!seqCv) return; const d = Math.min(devicePixelRatio || 1, DPR_MAX); seqCv.width = Math.round(seqCv.clientWidth * d); seqCv.height = Math.round(seqCv.clientHeight * d); sx.imageSmoothingEnabled = true; sx.imageSmoothingQuality = 'high'; seqP = -1; };
  const cercana = i => { for (let k = 0; k < SEQ_N; k++) { if (fotos[i - k] && fotos[i - k].ok) return fotos[i - k]; if (fotos[i + k] && fotos[i + k].ok) return fotos[i + k]; } return null; };
  const pinta = (im, a) => { const W = seqCv.width, H = seqCv.height, s = Math.max(W / im.naturalWidth, H / im.naturalHeight), w = im.naturalWidth * s, h = im.naturalHeight * s; sx.globalAlpha = a; sx.drawImage(im.bm || im, (W - w) / 2, (H - h) / 2, w, h); };
  // los fotogramas cercanos a la posición actual se guardan ya descodificados en la GPU (ImageBitmap): dibujarlos no cuesta nada
  let actual = 0; const VENT = 6;
  const ventana = () => { for (let j = 0; j < SEQ_N; j++) { const im = fotos[j]; if (!im || !im.ok) continue; const cerca = Math.abs(j - actual) <= VENT; if (cerca && !im.bm && !im.pide && window.createImageBitmap) { im.pide = true; createImageBitmap(im).then(bm => { im.pide = false; if (Math.abs(j - actual) <= VENT + 2) im.bm = bm; else bm.close(); }, () => { im.pide = false; }); } else if (!cerca && im.bm && Math.abs(j - actual) > VENT + 2) { im.bm.close(); im.bm = null; } } };
  const dibujaSeq = p => {
    if (!seqCv || (p === seqP && !seqPend)) return; seqP = p; seqPend = false;
    // fotograma más cercano, sin fundidos entre fotogramas (mezclar dos fotogramas distintos deja doble imagen)
    const i = Math.round(clamp(p / SEQ_FIN) * (SEQ_N - 1));
    if (i !== actual) { actual = i; ventana(); }
    const A = (fotos[i] && fotos[i].ok) ? fotos[i] : cercana(i);
    if (!A) return;
    pinta(A, 1);
    // al final: la sala vacía (fotografía renderizada) y encima, en 3D, los cuatro coches que se pueden girar
    const k = salaFin(p); if (salaIm && salaIm.ok && k > 0.001) pinta(salaIm, k);
    sx.globalAlpha = 1;
    if (!sec.classList.contains('conseq')) sec.classList.add('conseq');
  };
  // el recorrido no salta a golpes de rueda: la posición mostrada sigue al scroll con suavidad
  let seqObj = 0, seqVis = -1, seqRaf = 0, seqT = 0;
  const pasoSeq = now => {
    seqRaf = 0; const dt = Math.min(0.05, (now - (seqT || now)) / 1000); seqT = now;
    seqVis = seqVis < 0 ? seqObj : seqVis + (seqObj - seqVis) * (1 - Math.exp(-dt * 12));
    if (Math.abs(seqObj - seqVis) < 0.0002) seqVis = seqObj;
    dibujaSeq(seqVis); estado.sala = salaFin(seqVis); sec.style.setProperty('--sala', estado.sala.toFixed(3)); viaje && viaje.wake();
    if (seqVis !== seqObj) seqRaf = requestAnimationFrame(pasoSeq); else seqT = 0;
  };
  const anima = () => { if (!seqRaf && seqCv) seqRaf = requestAnimationFrame(pasoSeq); };
  if (seqCv && !RM.matches) {
    // orden de carga: primero unos pocos fotogramas salteados (se ve todo el recorrido enseguida);
    // después, siempre el que falte más cerca de donde está el usuario, con preferencia hacia delante
    const salteados = []; [32, 16, 8].forEach(st => { for (let i = 0; i < SEQ_N; i += st) if (!salteados.includes(i)) salteados.push(i); });
    salteados.splice(1, 0, SEQ_N - 1);
    const siguiente = () => {
      while (salteados.length) { const i = salteados.shift(); if (!fotos[i]) return i; }
      for (let d = 0; d < SEQ_N; d++) { for (const i of [actual + d, actual - d]) if (i >= 0 && i < SEQ_N && !fotos[i]) return i; }
      return -1;
    };
    // cada fotograma se descodifica antes de usarlo, para que dibujarlo al hacer scroll no dé tirones
    const sig = () => { const i = siguiente(); if (i < 0) return; const im = new Image(); im.src = `${SEQ_DIR}/f${String(i).padStart(3, '0')}.webp`; fotos[i] = im; const listo = () => { im.ok = true; seqPend = true; ventana(); anima(); sig(); }; im.decode().then(listo, () => { if (im.complete && im.naturalWidth) listo(); else sig(); }); };
    for (let c = 0; c < 6; c++) sig();
    salaIm = new Image(); salaIm.src = `${SEQ_DIR}/sala.webp`; salaIm.decode().then(() => { salaIm.ok = true; seqPend = true; anima(); }, () => { });
  }

  // ---------- scroll ----------
  let lastIdx = -1;
  const tick = () => {
    const r = sec.getBoundingClientRect(), vh = innerHeight;
    estado.visible = r.bottom > 0 && r.top < vh;
    if (!estado.visible) return;
    const p = clamp(-r.top / Math.max(1, r.height - vh));
    estado.p = p;
    const u = p * (N - 1) * 1.08; // el final se sostiene un poco
    copies.forEach((c, i) => {
      const d = u - i, last = i === N - 1;
      const o = last ? smooth(-0.35, 0.05, d) : smooth(-0.3, 0.02, d) * (1 - smooth(0.42, 0.7, d));
      c.style.opacity = o.toFixed(3);
      c.style.transform = `translate3d(0,${((1 - o) * (d < 0.2 ? 26 : -26)).toFixed(1)}px,0)`;
      c.style.pointerEvents = last ? 'none' : (o > 0.6 ? 'auto' : 'none');
      c.setAttribute('aria-hidden', o > 0.5 ? 'false' : 'true');
      if (last && room) { room.style.opacity = o.toFixed(3); room.style.visibility = o > 0.02 ? 'visible' : 'hidden'; room.classList.toggle('on', o > 0.6); }
    });
    const idx = clamp(Math.round(u), 0, N - 1);
    if (idx !== lastIdx) {
      lastIdx = idx;
      chapters.forEach((li, i) => li.classList.toggle('on', i === Math.min(idx, chapters.length - 1)));
      if (credit) credit.innerHTML = copies[idx].dataset.cred || '';
    }
    bar && (bar.style.transform = `scaleX(${p.toFixed(4)})`);
    wet = 1 - smooth(3.3, 3.9, u); // llueve fuera; dentro, no
    cv.style.opacity = wet.toFixed(3);
    sec.style.setProperty('--p', p.toFixed(4));
    seqObj = p; anima();
    sec.style.setProperty('--dim', smooth(N - 1.45, N - 0.95, u).toFixed(3));
    kick();
    viaje && viaje.wake();
  };
  // banda de texto gigante: se desplaza en horizontal con el scroll
  const cinta = document.querySelector('.cinta div');
  const moveCinta = () => { if (!cinta) return; const r = cinta.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) cinta.style.setProperty('--c', ((innerHeight - r.top) * 0.55).toFixed(1)); };
  let queued = false;
  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; tick(); moveCinta(); }); } };
  if (RM.matches) { root.classList.add('cine-quieto'); return; }
  sec.classList.add('vivo');
  resize(); tick();
  addEventListener('scroll', onScroll, { passive: true });
  seqSize(); seqPend = true; anima();
  addEventListener('resize', () => { resize(); seqSize(); seqPend = true; anima(); tick(); });
  // los capítulos de la derecha llevan a su momento del recorrido
  chapters.forEach((li, i) => li.addEventListener('click', () => {
    const top = sec.offsetTop + (sec.offsetHeight - innerHeight) * (i / ((N - 1) * 1.08));
    scrollTo({ top, behavior: 'smooth' });
  }));
  // la escena 3D (three.js, el concesionario y los coches) se carga aparte
  import('./sala3d/viaje.js?v=10')
    .then(m => { viaje = m.iniciarViaje({ sec, canvas: canvas3d, room, base: 'assets/sala3d/', estado, soloSala: !!seqCv && !RM.matches, vertical: SEQ_V }); if (!viaje) sec.classList.add('sin3d'); })
    .catch(() => sec.classList.add('sin3d'));
})();
