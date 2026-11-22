// Entrada cinematográfica de la portada: un vuelo de cámara controlado por el scroll.
// Cada fotograma hace zoom hacia su punto de fuga y se funde con el siguiente, que llega
// desde un poco más lejos; así parece que la cámara avanza del campo al interior del concesionario.
(() => {
  const sec = document.querySelector('.cine');
  if (!sec) return;
  const root = document.documentElement;
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const frames = [...sec.querySelectorAll('.cf')];
  const copies = [...sec.querySelectorAll('.cl')];
  const chapters = [...sec.querySelectorAll('.cine-idx li')];
  const bar = sec.querySelector('.cine-bar i');
  const credit = sec.querySelector('.cine-cred');
  const N = frames.length, Z = 0.62;
  const room = sec.querySelector('.showroom');
  const B = Math.max(0, frames.findIndex(f => f.classList.contains('base'))); // la fachada: ahí deja de llover
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };

  // carga progresiva: los dos primeros fotogramas ya vienen en el HTML; el resto, después
  const load = f => { const img = f.querySelector('img[data-src]'); if (img) { img.src = img.dataset.src; img.removeAttribute('data-src'); } };
  const loadRest = () => frames.slice(2).forEach(load);
  if (document.readyState === 'complete') setTimeout(loadRest, 300); else addEventListener('load', () => setTimeout(loadRest, 300));

  // ---------- lluvia ----------
  const cv = sec.querySelector('.cine-rain'), cx = cv.getContext('2d');
  let drops = [], W = 0, H = 0, wet = 1, raf = 0, visible = true;
  const resize = () => {
    const d = Math.min(devicePixelRatio || 1, 1.5);
    W = cv.clientWidth; H = cv.clientHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.round(Math.min(420, W * H / 4200));
    drops = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, l: 10 + Math.random() * 22, v: 13 + Math.random() * 11, a: 0.08 + Math.random() * 0.22 }));
  };
  const rain = () => {
    raf = 0;
    cx.clearRect(0, 0, W, H);
    if (wet > 0.01 && visible) {
      cx.lineCap = 'round';
      for (const d of drops) {
        d.y += d.v; d.x += d.v * 0.18;
        if (d.y > H) { d.y = -d.l; d.x = Math.random() * W * 1.1 - W * 0.1; }
        cx.strokeStyle = `rgba(214,224,236,${d.a * wet})`; cx.lineWidth = 1;
        cx.beginPath(); cx.moveTo(d.x, d.y); cx.lineTo(d.x - d.l * 0.18, d.y - d.l); cx.stroke();
      }
    }
    if (visible && wet > 0.01 && !RM.matches) raf = requestAnimationFrame(rain);
  };
  const kick = () => { if (!raf && visible && wet > 0.01 && !RM.matches) raf = requestAnimationFrame(rain); };

  // ---------- vuelo de cámara ----------
  let lastIdx = -1;
  const tick = () => {
    const r = sec.getBoundingClientRect(), vh = innerHeight;
    visible = r.bottom > 0 && r.top < vh;
    if (!visible) return;
    const p = clamp(-r.top / Math.max(1, r.height - vh));
    const u = p * (N - 1) * 1.08; // el último fotograma se sostiene un poco al final
    frames.forEach((f, i) => {
      const d = u - i;
      let s, o, b = 0;
      if (i === N - 1 && d >= 0) { s = 1; o = 1; }
      else if (d >= 0) { s = 1 + d * Z; o = 1 - smooth(0.5, 1, d); b = smooth(0.55, 1, d) * 6; }
      else { s = 0.9 + (1 + d) * 0.1; o = d > -1 ? 1 : 0; }
      f.style.opacity = o.toFixed(3);
      f.style.transform = `scale(${s.toFixed(4)})`;
      f.style.filter = b > 0.1 ? `blur(${b.toFixed(1)}px)` : '';
      f.style.zIndex = d >= 0 ? 2 : 1;
      f.style.visibility = d > 1 || d < -1 ? 'hidden' : 'visible';
    });
    copies.forEach((c, i) => {
      const d = u - i, last = i === N - 1;
      const o = last ? smooth(-0.35, 0.05, d) : smooth(-0.3, 0.02, d) * (1 - smooth(0.42, 0.7, d));
      c.style.opacity = o.toFixed(3);
      c.style.transform = `translate3d(0,${((1 - o) * (d < 0.2 ? 26 : -26)).toFixed(1)}px,0)`;
      c.style.pointerEvents = last ? 'none' : (o > 0.6 ? 'auto' : 'none');
      if (last && room) { room.style.opacity = o.toFixed(3); room.style.visibility = o > 0.02 ? 'visible' : 'hidden'; room.classList.toggle('on', o > 0.6); }
      c.setAttribute('aria-hidden', o > 0.5 ? 'false' : 'true');
    });
    const idx = clamp(Math.round(u), 0, N - 1);
    if (idx !== lastIdx) {
      lastIdx = idx;
      chapters.forEach((li, i) => li.classList.toggle('on', i === Math.min(idx, chapters.length - 1)));
      if (credit) credit.innerHTML = frames[idx].dataset.cred || '';
    }
    bar && (bar.style.transform = `scaleX(${p.toFixed(4)})`);
    wet = 1 - smooth(B - 0.3, B + 0.6, u); // llueve fuera; dentro, no
    cv.style.opacity = wet.toFixed(3);
    sec.style.setProperty('--p', p.toFixed(4));
    sec.style.setProperty('--dim', smooth(N - 1.45, N - 0.95, u).toFixed(3));
    kick();
  };
  // banda de texto gigante: se desplaza en horizontal con el scroll
  const cinta = document.querySelector('.cinta div');
  const moveCinta = () => { if (!cinta) return; const r = cinta.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) cinta.style.setProperty('--c', ((innerHeight - r.top) * 0.55).toFixed(1)); };
  let queued = false;
  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; tick(); moveCinta(); }); } };
  if (RM.matches) { root.classList.add('cine-quieto'); frames.forEach(load); return; }
  sec.classList.add('vivo');
  resize(); tick();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { resize(); tick(); });
  // sala 3D del final: se carga aparte (three.js + el modelo) cuando la página ya ha terminado de cargar
  if (room) {
    let pedida = false;
    const sala3d = () => {
      if (pedida) return; pedida = true;
      import('./sala3d/sala3d.js')
        .then(m => { if (!m.iniciarSala(room, 'assets/sala3d/')) room.classList.add('sin3d'); })
        .catch(() => room.classList.add('sin3d'));
    };
    const pronto = () => (window.requestIdleCallback || setTimeout)(sala3d, { timeout: 2500 });
    if (document.readyState === 'complete') pronto(); else addEventListener('load', pronto);
    addEventListener('scroll', () => { if (sec.getBoundingClientRect().top < -innerHeight) sala3d(); }, { passive: true });
  }
  // los capítulos de la derecha llevan a su momento del vuelo
  chapters.forEach((li, i) => li.addEventListener('click', () => {
    const top = sec.offsetTop + (sec.offsetHeight - innerHeight) * (i / ((N - 1) * 1.08));
    scrollTo({ top, behavior: 'smooth' });
  }));
})();
