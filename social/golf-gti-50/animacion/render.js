// Renderiza la animación fotograma a fotograma (1080x1920, 30 fps) siguiendo el mapa de tiempos de la voz.
// Uso: node animacion/render.js voz/timemap.json carpeta_salida
// La animación (anim.html) está escrita sobre la línea de tiempo de 41,33 s del guion original;
// timemap.json dice, para cada instante del audio nuevo, qué instante de la animación toca.
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const M = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const OUT = process.argv[3];
fs.mkdirSync(OUT, { recursive: true });
const map = t => {
  const o = M.old, n = M.new;
  if (t <= 0) return 0;
  for (let i = 1; i < n.length; i++) if (t <= n[i]) { const k = (t - n[i - 1]) / ((n[i] - n[i - 1]) || 1); return o[i - 1] + (o[i] - o[i - 1]) * k; }
  return o[o.length - 1];
};
(async () => {
  const b = await chromium.launch();
  const N = Math.round(M.end * 30), K = 4, errs = [];
  await Promise.all([...Array(K)].map(async (_, w) => {
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
    p.on('pageerror', e => errs.push(e.message));
    await p.goto('file://' + path.join(__dirname, 'anim.html'));
    await p.evaluate(() => window.ready);
    for (let f = w; f < N; f += K) {
      await p.evaluate(([f, t]) => render(f, t), [f, Math.min(41.33, map(f / 30))]);
      await p.screenshot({ path: path.join(OUT, String(f).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 94 });
    }
  }));
  console.log('fotogramas', N, errs.length ? 'errores: ' + errs.slice(0, 3) : 'sin errores');
  await b.close();
})();
