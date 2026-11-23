// La sala de la portada es la única puerta a la web: el scroll se detiene en los cuatro coches
// y cada coche abre su apartado como una página propia, con un botón para volver a la sala.
(() => {
  const cine = document.querySelector('.cine');
  if (!cine || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const body = document.body;
  const GRUPOS = {
    asesor: ['asesor', 'recomendados'],
    tasador: ['tasador', 'modelos', 'metodo'],
    calculadora: ['calculadora'],
    radar: ['radar', 'clasicos'],
    legal: ['legal', 'sala'],
  };
  const NOMBRE = { asesor: 'Asesor de compra', tasador: 'Tasador', calculadora: 'Comparador', radar: 'Radar semanal', legal: 'Créditos y aviso legal' };
  const grupoDe = id => {
    if (!id) return null;
    const el = document.getElementById(id); if (!el) return null;
    const sec = el.closest('main > section') || el;
    return Object.keys(GRUPOS).find(g => GRUPOS[g].includes(sec.id)) || null;
  };
  body.classList.add('puerta');

  const volver = document.createElement('button');
  volver.type = 'button'; volver.className = 'ap-volver'; volver.innerHTML = '<span aria-hidden="true">←</span> Volver a la sala';
  body.appendChild(volver);

  let abierto = null;
  const finSala = () => cine.offsetTop + cine.offsetHeight - innerHeight;
  const abrir = (g, { push = true, hash = GRUPOS[g][0], subir = true } = {}) => {
    if (!GRUPOS[g]) return;
    document.querySelectorAll('main > section.ap-on').forEach(s => s.classList.remove('ap-on'));
    GRUPOS[g].forEach(id => { const s = document.getElementById(id); if (s) s.classList.add('ap-on'); });
    abierto = g; body.classList.add('en-apartado'); body.dataset.ap = g;
    volver.setAttribute('aria-label', `Volver a la sala (estás en ${NOMBRE[g]})`);
    if (push) history.pushState({ ap: g }, '', '#' + hash); else history.replaceState({ ap: g }, '', '#' + hash);
    if (subir) {
      const t = document.getElementById(hash);
      const y = t ? t.getBoundingClientRect().top + scrollY - 90 : 0;
      scrollTo({ top: Math.max(0, y), behavior: 'instant' });
    }
    dispatchEvent(new Event('resize'));
  };
  const cerrar = ({ push = true } = {}) => {
    if (!abierto) return;
    abierto = null; body.classList.remove('en-apartado'); delete body.dataset.ap;
    document.querySelectorAll('main > section.ap-on').forEach(s => s.classList.remove('ap-on'));
    if (push) history.pushState({}, '', location.pathname + location.search); else history.replaceState({}, '', location.pathname + location.search);
    dispatchEvent(new Event('resize'));
    scrollTo({ top: finSala(), behavior: 'instant' });
  };
  volver.addEventListener('click', () => cerrar());

  // enlaces internos: los coches, los botones de cada herramienta y los enlaces legales
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (id === 'top' || id === 'hero' || id === '') { e.preventDefault(); if (abierto) cerrar(); else scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const g = grupoDe(id); if (!g) return;
    e.preventDefault();
    abrir(g, { hash: id });
    const d = document.getElementById(id); if (d && d.tagName === 'DETAILS') d.open = true;
  });

  // las herramientas se enlazan entre sí con scrollIntoView (p. ej. del asesor al tasador): se abre su apartado antes
  const orig = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function (...a) {
    const g = grupoDe((this.closest('main > section') || {}).id);
    if (g && g !== abierto) abrir(g, { subir: false });
    return orig.apply(this, a);
  };

  addEventListener('popstate', () => {
    const g = grupoDe(location.hash.slice(1));
    if (g) abrir(g, { push: false, hash: location.hash.slice(1) }); else cerrar({ push: false });
  });

  // enlace directo a un apartado (compartido o guardado): se abre sin pasar por la entrada
  const g0 = grupoDe(location.hash.slice(1));
  if (g0) abrir(g0, { push: false, hash: location.hash.slice(1) });
})();
