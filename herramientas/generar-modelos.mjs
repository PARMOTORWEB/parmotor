// Genera una página estática por modelo en /tasar/<modelo>/ con precios
// estimados por año, usando EXACTAMENTE las funciones del tasador de index.html.
// Uso: node herramientas/generar-modelos.mjs   (desde la raíz del repositorio)
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SITE = "https://parmotorweb.github.io/parmotor/";
// Fecha de hoy en España (para "actualizado en…" y el sitemap): se calcula sola en cada ejecución
const _d = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
const HOY = `${_d.getFullYear()}-${String(_d.getMonth() + 1).padStart(2, "0")}-${String(_d.getDate()).padStart(2, "0")}`;
const MES = `${["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"][_d.getMonth()]} de ${_d.getFullYear()}`;
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// ---------- 1. Motor de cálculo: se extrae tal cual de index.html ----------
const cut = (a, b) => { const i = html.indexOf(a), j = html.indexOf(b, i); if (i < 0 || j < 0) throw new Error("No encuentro " + a); return html.slice(i, j); };
const motor = [
  cut("const RAW = `", "const T = {st:1};"),
  cut("const yearsOf =", "const tMk="),
  cut("function retained(", "function initT("),
  cut("  // ── Motores con fallos graves", "  function renderT(){"),
].join("\n");
const { DB, FUEL, valueAt, yearsOf, NOW, riskOf } = new Function(motor + "\nreturn {DB, FUEL, valueAt, yearsOf, NOW, riskOf};")();

// ---------- 2. Fuentes compartidas (se extraen una vez a /assets/fonts) ----------
const fontDir = path.join(ROOT, "assets", "fonts");
fs.mkdirSync(fontDir, { recursive: true });
const faces = [];
for (const m of html.matchAll(/@font-face\{font-family:"([^"]+)";font-style:(\w+);font-weight:(\d+);font-display:swap;src:url\(data:font\/woff2;base64,([A-Za-z0-9+/=]+)\)/g)) {
  const [, fam, st, w, b64] = m;
  const file = `${fam.replace(/\s+/g, "")}-${w}${st === "italic" ? "i" : ""}.woff2`;
  fs.writeFileSync(path.join(fontDir, file), Buffer.from(b64, "base64"));
  faces.push(`@font-face{font-family:"${fam}";font-style:${st};font-weight:${w};font-display:swap;src:url(fonts/${file}) format("woff2")}`);
}

// ---------- 3. Utilidades ----------
const NF = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0, useGrouping: "always" });
const eur = n => NF.format(Math.round(n / 100) * 100) + " €";
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const slug = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const modelSlug = m => slug(`${m.mk} ${m.md}`);
const nombre = m => `${m.mk} ${m.md}`;
// Fotos de cada modelo (assets/modelos/<slug>.webp) con su autor y licencia (Wikimedia Commons)
const FOTOS = JSON.parse(fs.readFileSync(path.join(ROOT, "assets", "modelos", "creditos.json"), "utf8"));
const fotoHtml = (m, rel) => { const f = FOTOS[modelSlug(m)]; if (!f) return "";
  return `<figure class="foto"><img src="${rel}assets/modelos/${modelSlug(m)}.webp" width="640" height="400" alt="${esc(nombre(m))}" decoding="async"><figcaption>Foto: <a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(f.file)}" rel="noopener">${esc(f.author || "Wikimedia Commons")}</a> · ${esc(f.license)}</figcaption></figure>`; };
const ageOf = y => Math.max(0.25, NOW - (y + 0.5));
const kmOf = (ver, y) => Math.min(100000, Math.round(FUEL[ver[2]].kmY * ageOf(y) / 5000) * 5000);
const precio = (m, ver, y) => valueAt(m, ver, y, ageOf(y), kmOf(ver, y), 1).v;
const lista = a => a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " y " + a[a.length - 1];

// versiones a mostrar por generación: hasta 3, priorizando combustibles distintos
function versiones(g) {
  const out = [], seen = new Set();
  for (const v of g.v) if (!seen.has(v[2]) && out.length < 3) { out.push(v); seen.add(v[2]); }
  for (const v of g.v) if (!out.includes(v) && out.length < 3) out.push(v);
  return out;
}

const CSS = faces.join("\n") + `
:root{--bg:#0f0f0e;--surface:#1a1a19;--surface-2:#232321;--line:#2c2c2a;--axis:#3a3a37;--ink:#f2f1ec;--ink-2:#bdbcb4;--ink-3:#8a897f;--accent:#e4ff4f;--on-accent:#0f0f0e;--disp:"Barlow Condensed",Inter,sans-serif;--hazard:repeating-linear-gradient(-45deg,var(--accent) 0 12px,#0f0f0e 12px 24px);color-scheme:dark}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
.foto{margin:22px 0 26px;border-radius:14px;overflow:hidden;border:1px solid var(--line);background:var(--surface);position:relative}.foto img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover}.foto figcaption{position:absolute;right:0;bottom:0;max-width:100%;padding:3px 9px;font-size:11px;line-height:1.5;color:#e9e8e2;background:rgba(15,15,14,.72);border-top-left-radius:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.foto figcaption a{color:inherit}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.7 Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit}
.wrap{max-width:980px;margin:0 auto;padding:0 24px}
header{border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px}
.logo{display:flex;align-items:center;gap:10px;font:800 italic 22px/1 var(--disp);letter-spacing:.04em;text-transform:uppercase;text-decoration:none}
.nav a.cta{font:700 15px/1 var(--disp);letter-spacing:.08em;text-transform:uppercase;text-decoration:none;color:var(--on-accent);background:var(--accent);padding:10px 14px;border-radius:7px}
.crumbs{font-size:13.5px;color:var(--ink-3);margin:34px 0 0}
.crumbs a{color:var(--ink-2);text-underline-offset:3px}
.tag{display:inline-block;margin:26px 0 14px;font:700 14px/1.5 var(--disp);letter-spacing:.18em;text-transform:uppercase;color:var(--on-accent);background:var(--accent);padding:2px 10px;transform:skewX(-10deg)}
h1,h2,h3{font-family:var(--disp);font-weight:800;font-style:italic;text-transform:uppercase;line-height:.98;margin:0}
h1{font-size:clamp(40px,6.4vw,66px);text-wrap:balance}
h2{font-size:clamp(28px,4vw,38px);margin:64px 0 16px}
h3{font-size:24px;margin:0 0 4px}
.lead{font-size:18.5px;color:var(--ink-2);margin:20px 0 0;max-width:760px}
.hl{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:36px 0 0}
.hl div{background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:8px;padding:16px 18px}
.hl b{display:block;font:800 34px/1.05 var(--disp);font-variant-numeric:tabular-nums}
.hl span{font-size:14px;color:var(--ink-2)}
.btn{display:inline-flex;gap:8px;align-items:center;margin-top:30px;font:700 18px/1 var(--disp);letter-spacing:.06em;text-transform:uppercase;text-decoration:none;color:var(--on-accent);background:var(--accent);padding:15px 22px;border-radius:8px}
.gen{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:26px;margin:0 0 20px}
.gen p{margin:2px 0 16px;color:var(--ink-3);font-size:14.5px}
.tbl{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:15px;font-variant-numeric:tabular-nums}
th,td{text-align:right;padding:10px 8px;border-bottom:1px solid var(--line);white-space:nowrap}
th:first-child,td:first-child{text-align:left}
th{color:var(--ink-3);font-weight:600;font-size:12.5px;text-transform:uppercase;letter-spacing:.05em;white-space:normal}
td b{color:var(--accent);font-weight:600}
.note{font-size:14px;color:var(--ink-3);margin:14px 0 0}
.warn{margin:16px 0 0;border:1px solid #f59e0b;background:rgba(245,158,11,.08);border-radius:10px;padding:12px 14px;font-size:14.5px;color:var(--ink-2)}
.warn b{display:block;color:#fcd34d}
.warn span{display:block;font-weight:600;color:var(--ink);margin:3px 0}
.warn p{margin:4px 0 0;color:var(--ink-2)}
.faq details{border-top:1px solid var(--line);padding:16px 0}
.faq summary{cursor:pointer;font-weight:600;font-size:17px}
.faq p{color:var(--ink-2);margin:10px 0 0}
.rel{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}
.rel a{display:block;padding:7px 12px;border:1px solid var(--axis);border-radius:6px;text-decoration:none;font-size:14.5px;color:var(--ink-2)}
.rel a:hover{border-color:var(--accent);color:var(--accent)}
.brand{margin:0 0 26px}
.brand h3{margin-bottom:10px}
footer{margin-top:80px;padding:0 0 50px;color:var(--ink-3);font-size:14px}
footer:before{content:"";display:block;height:8px;background:var(--hazard);margin-bottom:30px}
footer a{color:var(--ink-2)}
@media (max-width:640px){.hl{grid-template-columns:1fr}.gen{padding:20px 16px}.nav a.cta{font-size:13px;padding:9px 11px}}
`;
fs.writeFileSync(path.join(ROOT, "assets", "modelos.css"), CSS);

const LOGO = `<svg width="26" height="26" viewBox="0 0 120 120" aria-hidden="true"><g fill="#e4ff4f">${[0,45,90,135,180,225,270,315].map(a => `<rect x="54" y="10" width="12" height="18" rx="2" transform="rotate(${a} 60 60)"/>`).join("")}<circle cx="60" cy="60" r="36"/></g><circle cx="60" cy="60" r="14" fill="#0f0f0e"/></svg>`;

function pagina({ rel, url, title, desc, body, ld, img }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#0f0f0e">
<link rel="icon" href="${rel}favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Par Motor">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img || SITE + "og.png"}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="${rel}assets/modelos.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script src="${rel}assets/analitica.js" defer></script>
</head>
<body>
<header><div class="wrap nav"><a class="logo" href="${rel}">${LOGO}Par Motor</a><a class="cta" href="${rel}#tasador">Tasador</a></div></header>
<main class="wrap">
${body}
</main>
<footer><div class="wrap">Par Motor · Valores orientativos de segunda mano en España (${MES}). No sustituyen a una tasación ni a un presupuesto real. · <a href="${rel}#aviso-legal">Aviso legal</a> · <a href="${rel}#privacidad">Privacidad</a></div></footer>
</body>
</html>
`;
}

// ---------- 4. Una página por modelo ----------
const urls = [];
const porMarca = {};
for (const m of DB) (porMarca[m.mk] ||= []).push(m);

for (const m of DB) {
  const s = modelSlug(m), url = `${SITE}tasar/${s}/`, n = nombre(m);
  const years = yearsOf(m);
  const gens = m.gens.filter(g => g.y[0] <= 2026);
  // filas: generación → años → versiones
  let todos = [];
  const todosAvisos = new Map();
  const bloques = gens.map(g => {
    const vs = versiones(g);
    const ys = []; for (let y = Math.min(g.y[1], 2026); y >= g.y[0]; y--) ys.push(y);
    const filas = ys.map(y => {
      const ps = vs.map(v => precio(m, v, y));
      vs.forEach((v, i) => todos.push({ y, v, p: ps[i], g }));
      return `<tr><td>${y}</td><td>${NF.format(kmOf(vs[0], y))} km</td>${ps.map(p => `<td><b>${eur(p)}</b></td>`).join("")}</tr>`;
    }).join("");
    const hasta = g.y[1] >= 2026 ? "hoy" : g.y[1];
    // motores con fallos graves conocidos en esta generación
    const avisos = new Map();
    for (const v of g.v) for (let y = g.y[0]; y <= Math.min(g.y[1], 2026); y++){ const r = riskOf(m, g, v, y); if (r){ const a = avisos.get(r.t) || {r, vs: new Set(), y0: y, y1: y}; a.vs.add(v[0]); a.y0 = Math.min(a.y0, y); a.y1 = Math.max(a.y1, y); avisos.set(r.t, a); } }
    avisos.forEach(a => { const t = todosAvisos.get(a.r.t); if (!t) todosAvisos.set(a.r.t, {r: a.r, vs: new Set(a.vs), y0: a.y0, y1: a.y1}); else { a.vs.forEach(x => t.vs.add(x)); t.y0 = Math.min(t.y0, a.y0); t.y1 = Math.max(t.y1, a.y1); } });
    const avisoHtml = [...avisos.values()].map(a => `<div class="warn"><b>⚠ Cuidado: ${esc(a.r.t)}</b><span>Afecta a: ${esc([...a.vs].join(", "))} (${a.y0}–${a.y1})</span><p>${esc(a.r.d)}</p></div>`).join("");
    return `<section class="gen"><h3>${esc(g.g)} (${g.y[0]}–${hasta})</h3><p>Precio de nuevo: ${vs.map(v => `${esc(v[0])} ${v[1]} CV, ${eur(v[3])}`).join(" · ")}</p>
<div class="tbl"><table><thead><tr><th>Año</th><th>Km normales</th>${vs.map(v => `<th>${esc(v[0])}<br>${v[1]} CV · ${FUEL[v[2]].l}</th>`).join("")}</tr></thead><tbody>${filas}</tbody></table></div>${avisoHtml}</section>`;
  }).join("\n");
  const min = todos.reduce((a, b) => b.p < a.p ? b : a), max = todos.reduce((a, b) => b.p > a.p ? b : a);
  const ultimo = todos.filter(t => t.y === Math.max(...todos.map(t => t.y)));
  // pérdida anual típica: del año más reciente al anterior, primera versión
  const g0 = gens[gens.length - 1], v0 = versiones(g0)[0];
  const yA = Math.min(g0.y[1], 2026) - 1, yB = yA - 3;
  const pA = precio(m, v0, yA), pB = g0.y[0] <= yB ? precio(m, v0, yB) : null;
  const perdida = pB ? Math.round((1 - Math.pow(pB / pA, 1 / 3)) * 100) : null;
  const fuels = [...new Set(gens.flatMap(g => g.v.map(v => FUEL[v[2]].l.toLowerCase())))];
  const rango = `de ${eur(min.p)} a ${eur(max.p)}`;

  const faqs = [
    [`¿Cuánto vale un ${n} de segunda mano?`, `Según el año, la versión y los kilómetros, un ${n} usado vale hoy ${rango} en España. El más barato de nuestra tabla es un ${min.v[0]} de ${min.y} (${eur(min.p)}) y el más caro un ${max.v[0]} de ${max.y} (${eur(max.p)}). Son precios justos estimados entre particulares y profesionales, con los kilómetros normales para su edad y en buen estado.`],
    perdida ? [`¿Cuánto valor pierde un ${n} al año?`, `Con unos años encima, un ${n} pierde alrededor de un ${perdida} % de su valor cada año (calculado sobre el ${v0[0]} de la generación ${g0.g}). Los primeros años la caída es mayor y a partir de los 70.000 km se acelera.`] : null,
    [`¿Qué motorizaciones tiene el ${n}?`, `En nuestra base de datos hay versiones ${lista(fuels)}, en ${gens.length} generación${gens.length > 1 ? "es" : ""}: ${lista(gens.map(g => g.g))}.`],
    todosAvisos.size ? [`¿Qué motores del ${n} dan problemas?`, `Ojo con ${lista([...todosAvisos.values()].map(a => `el ${a.r.t} (${[...a.vs].slice(0, 3).join(", ")}, ${a.y0}–${a.y1})`))}: son motores con fallos graves y muy extendidos. Antes de comprar uno, pide el historial de mantenimiento y comprueba si ya se hizo la reparación. El resto de motores no tiene problemas fuera de lo normal.`] : null,
    [`¿Cómo sé si me piden demasiado por un ${n}?`, `Abre el tasador de Par Motor, elige el ${n}, el año y los kilómetros reales, y escribe lo que te piden. Te diremos si está por debajo del precio justo (chollo) o por encima (caro). Es gratis y no pide registro ni matrícula.`],
  ].filter(Boolean);

  const otros = porMarca[m.mk].filter(x => x !== m);
  const body = `<p class="crumbs"><a href="../../">Par Motor</a> › <a href="../">Precios por modelo</a> › ${esc(n)}</p>
<span class="tag">Precio de segunda mano · ${MES}</span>
<h1>¿Cuánto vale un ${esc(n)} de segunda mano?</h1>
${fotoHtml(m, "../../")}
<p class="lead">Precio justo estimado de un ${esc(n)} usado en España, año por año, con los kilómetros normales para su edad y en buen estado: ${rango}. Para tasar el tuyo con sus kilómetros reales y su estado, usa el tasador gratis.</p>
<div class="hl"><div><b>${eur(min.p)}</b><span>el más barato (${esc(min.v[0])}, ${min.y})</span></div><div><b>${eur(ultimo[0].p)}</b><span>uno de ${ultimo[0].y} (${esc(ultimo[0].v[0])})</span></div><div><b>${perdida ? `−${perdida} %` : gens.length}</b><span>${perdida ? "de valor al año, aprox." : "generaciones"}</span></div></div>
<a class="btn" href="../../?mk=${encodeURIComponent(m.mk)}&amp;md=${encodeURIComponent(m.md)}&amp;y=${years[0]}#tasador">Tasar mi ${esc(m.md)} con mis datos →</a>
<h2>Precios del ${esc(n)} por año</h2>
${bloques}
<p class="note">Kilómetros normales: 15.000 al año en gasolina, híbridos y eléctricos, y 20.000 en diésel, con un máximo de 100.000 km (por encima no tasamos: el precio depende demasiado del historial de cada coche). Cifras redondeadas a 100 €.</p>
<h2>Preguntas frecuentes</h2>
<div class="faq">${faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
${otros.length ? `<h2>Otros ${esc(m.mk)}</h2><ul class="rel">${otros.map(x => `<li><a href="../${modelSlug(x)}/">${esc(x.md)}</a></li>`).join("")}</ul>` : ""}
<h2>Compara su coste real</h2>
<p class="lead">El precio de compra es solo una parte. Mira cuánto te costaría al mes con combustible, seguro, neumáticos, mantenimiento y lo que pierde de valor.</p>
<a class="btn" href="../../#calculadora">Abrir el comparador →</a>`;

  const ld = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Par Motor", item: SITE },
      { "@type": "ListItem", position: 2, name: "Precios por modelo", item: SITE + "tasar/" },
      { "@type": "ListItem", position: 3, name: n, item: url } ] },
    { "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) } ] };

  const dir = path.join(ROOT, "tasar", s);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pagina({
    rel: "../../", url, ld, body, img: FOTOS[s] ? `${SITE}assets/modelos/${s}.webp` : null,
    title: `${n} de segunda mano: cuánto vale (precios ${MES.split(" ").pop()}) | Par Motor`,
    desc: `¿Cuánto vale un ${n} usado? Precio justo por año y kilómetros en España, ${rango}. Tasación gratis, sin registro, actualizada en ${MES}.`,
  }));
  urls.push(url);
}

// ---------- 5. Índice de modelos ----------
const hub = Object.entries(porMarca).map(([mk, ms]) => `<section class="brand"><h3>${esc(mk)}</h3><ul class="rel">${ms.map(m => `<li><a href="${modelSlug(m)}/">${esc(m.md)}</a></li>`).join("")}</ul></section>`).join("\n");
fs.writeFileSync(path.join(ROOT, "tasar", "index.html"), pagina({
  rel: "../", url: SITE + "tasar/",
  title: `Precios de coches de segunda mano por modelo (${MES}) | Par Motor`,
  desc: `Cuánto vale de segunda mano cada modelo: ${DB.length} coches con precios por año y kilómetros en España. Gratis y sin registro.`,
  ld: { "@context": "https://schema.org", "@type": "CollectionPage", name: "Precios de segunda mano por modelo", url: SITE + "tasar/" },
  body: `<p class="crumbs"><a href="../">Par Motor</a> › Precios por modelo</p>
<span class="tag">${DB.length} modelos · ${MES}</span>
<h1>Precios de coches de segunda mano por modelo</h1>
<p class="lead">Elige tu coche y mira cuánto vale de segunda mano, año por año. Para tasarlo con tus kilómetros y su estado, usa el tasador.</p>
<h2>Marcas</h2>
${hub}`,
}));
urls.unshift(SITE + "tasar/");

// ---------- 6. Sitemap ----------
const extra = fs.existsSync(path.join(ROOT, "radar")) ? fs.readdirSync(path.join(ROOT, "radar")).filter(d => /^\d+$/.test(d)).sort().map(d => `${SITE}radar/${d}/`) : [];
const all = [SITE, ...urls, ...extra];
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(u => `  <url><loc>${u}</loc><lastmod>${HOY}</lastmod></url>`).join("\n")}
</urlset>
`);

// ---------- 7. Enlaces internos para index.html (bloque entre marcadores) ----------
const links = Object.entries(porMarca).map(([mk, ms]) => `<p><b>${esc(mk)}:</b> ${ms.map(m => `<a href="tasar/${modelSlug(m)}/">${esc(m.md)}</a>`).join(" · ")}</p>`).join("");
fs.writeFileSync(path.join(ROOT, "herramientas", "enlaces-modelos.html"), links);
console.log(`${DB.length} páginas de modelo + índice + sitemap (${all.length} URLs)`);

// ---------- 8. Inserta esos enlaces en index.html (así la portada enlaza siempre a todos los modelos) ----------
{
  const A = "<!-- MODELOS:INICIO -->", B = "<!-- MODELOS:FIN -->";
  const idx = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const i = idx.indexOf(A), j = idx.indexOf(B);
  if (i >= 0 && j > i){
    const nuevo = idx.slice(0, i + A.length) + links + idx.slice(j);
    if (nuevo !== idx){ fs.writeFileSync(path.join(ROOT, "index.html"), nuevo); console.log("Enlaces de modelos actualizados en index.html"); }
  }
}
