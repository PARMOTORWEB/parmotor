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
    const n = Math.round(Math.min(420, W * H / 4200));
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
  addEventListener('resize', () => { resize(); tick(); });
  // los capítulos de la derecha llevan a su momento del recorrido
  chapters.forEach((li, i) => li.addEventListener('click', () => {
    const top = sec.offsetTop + (sec.offsetHeight - innerHeight) * (i / ((N - 1) * 1.08));
    scrollTo({ top, behavior: 'smooth' });
  }));
  // la escena 3D (three.js, el concesionario y los coches) se carga aparte
  import('./sala3d/viaje.js')
    .then(m => { viaje = m.iniciarViaje({ sec, canvas: canvas3d, room, base: 'assets/sala3d/', estado }); if (!viaje) sec.classList.add('sin3d'); })
    .catch(() => sec.classList.add('sin3d'));
})();
