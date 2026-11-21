// Genera las publicaciones de redes sociales (Instagram y TikTok) de un rango de días.
// Uso: node herramientas/redes.mjs 2026-11-18 2026-11-22
// Salida: social/<fecha>/<tipo>-{ig,tt}-<n>.jpg  y  social/plan-<desde>_<hasta>.json
// Calendario: lun Radar · mar ¿Cuánto vale? · mié ¿Chollo o caro? · jue Consejo ·
//             vie Lo que pierde · sáb Museo del box · dom descanso
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SITE = "https://parmotorweb.github.io/parmotor/";
const [desde, hasta] = process.argv.slice(2);
if (!desde || !hasta) throw new Error("Uso: node herramientas/redes.mjs AAAA-MM-DD AAAA-MM-DD");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// ---------- motor del tasador (mismo código que la web) ----------
const cut = (a, b) => { const i = html.indexOf(a), j = html.indexOf(b, i); if (i < 0 || j < 0) throw new Error("No encuentro " + a); return html.slice(i, j); };
const { DB, FUEL, valueAt, NOW } = new Function([cut("const RAW = `", "const T = {st:1};"), cut("function retained(", "function initT(")].join("\n") + "\nreturn {DB, FUEL, valueAt, NOW};")();
const NF = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0, useGrouping: "always" });
const eur = n => NF.format(Math.round(n / 100) * 100) + " €";
const slug = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const ageOf = y => Math.max(0.25, NOW - (y + 0.5));
const kmOf = (v, y) => Math.min(100000, Math.round(FUEL[v[2]].kmY * ageOf(y) / 5000) * 5000);
const val = (m, v, y, km) => valueAt(m, v, y, ageOf(y), km ?? kmOf(v, y), 1).v;
const find = (mk, md) => { const m = DB.find(d => d.mk === mk && d.md === md); if (!m) throw new Error(`Modelo no encontrado: ${mk} ${md}`); return m; };
const genOf = (m, y) => m.gens.filter(g => y >= g.y[0] && y <= g.y[1]).pop();
const nombre = m => `${m.mk} ${m.md.replace(" y Auris", "").replace("307 y 308", "308").replace("Mini 3 y 5 puertas", "Cooper")}`;

// ---------- fotos (salen de la propia web) con su crédito ----------
const CRED = {
  "BMW Serie 3 E30 de rally en pleno salto": "ManuelaZerr · CC BY-SA 4.0",
  "Volkswagen Golf GTI de primera generación aparcado en la calle": "Riley from Christchurch · CC BY 2.0",
  "Volkswagen Golf": "Midnight Runner · CC BY-SA 4.0", "BMW Serie 3": "Dinkun Chen · CC BY-SA 4.0",
  "Seat León": "Alexander Migl · CC BY-SA 4.0", "Toyota Corolla": "Alexander-93 · CC BY-SA 4.0",
  "Mazda MX-5": "Alexander-93 · CC BY-SA 4.0", "Toyota GR Yaris": "Alexander Migl · CC BY-SA 4.0",
  "Volkswagen Golf GTI": "Txemari · CC BY-SA 4.0", "BMW Serie 3 E30": "Charles from Port Chester · CC BY 2.0",
  "Mazda MX-5 NA": "Spanish Coches · CC BY 2.0", "SEAT 600": "Matti Blume · CC BY-SA 4.0",
};
const FOTOS = {};
for (const m of html.matchAll(/<img src="((?:data:image\/webp;base64,|assets\/img\/)[^"]+)"[^>]*alt="([^"]+)"/g))
  FOTOS[m[2]] = m[1].startsWith("data:") ? m[1] : `data:image/webp;base64,${fs.readFileSync(path.join(ROOT, m[1])).toString("base64")}`;
const foto = alt => FOTOS[alt] ? { src: FOTOS[alt], cred: `Foto: ${CRED[alt]} (Wikimedia Commons)` } : null;
const FOTO_MODELO = { "Volkswagen|Golf": "Volkswagen Golf", "BMW|Serie 3": "BMW Serie 3", "Seat|León": "Seat León", "Toyota|Corolla y Auris": "Toyota Corolla", "Mazda|MX-5": "Mazda MX-5", "Toyota|GR Yaris": "Toyota GR Yaris" };

// ---------- rotaciones ----------
const MODELOS = [["Volkswagen","Golf"],["Seat","León"],["BMW","Serie 3"],["Toyota","Corolla y Auris"],["Seat","Ibiza"],["Renault","Clio"],["Mazda","MX-5"],["Audi","A3"],["Dacia","Sandero"],["Peugeot","307 y 308"],["Skoda","Octavia"],["Volkswagen","Polo"],["Toyota","GR Yaris"],["Mercedes-Benz","Clase A"],["Hyundai","Tucson"],["Kia","Sportage"],["Cupra","Formentor"],["Tesla","Model 3"],["Ford","Focus"],["Mini","Mini 3 y 5 puertas"]].map(([a, b]) => find(a, b));
const CONSEJOS = [
  ["Antes de ir a ver un coche usado", ["Pide la matrícula y saca el informe de la DGT: cargas, embargos y titulares.", "Mira el historial de mantenimiento: facturas, no solo sellos.", "Tasa el coche antes de ir: llegarás con una cifra a la que agarrarte."]],
  ["Cómo negociar el precio", ["Empieza por debajo del precio justo, nunca por lo que piden.", "Apunta cada defecto: neumáticos, frenos, golpes. Cada uno resta.", "Ten un plan B: el que puede irse sin el coche negocia mejor."]],
  ["Señales de alarma en un anuncio", ["Precio muy por debajo del mercado sin explicación.", "Vendedor con prisa o que no deja verlo en persona.", "Pide señal por adelantado antes de enseñarte el coche."]],
  ["Diésel o gasolina en 2026", ["Por debajo de 15.000 km al año, la gasolina suele salir más barata.", "El litro de gasóleo ya cuesta más que el de gasolina 95.", "Haz la cuenta con tus kilómetros: el comparador te lo dice al mes."]],
  ["Los kilómetros sí importan", ["Lo normal: unos 15.000 km al año en gasolina y 20.000 en diésel.", "Por encima de 70.000 km el valor cae más rápido.", "Pocos km y muchos años también es sospechoso: pide pruebas."]],
  ["El seguro si tienes menos de 25", ["Un conductor joven puede pagar casi el doble por el mismo coche.", "La potencia sube el precio más que la marca.", "Pide precio del seguro ANTES de comprar, no después."]],
  ["Comprar un híbrido enchufable usado", ["Solo compensa si cargas en casa o en el trabajo.", "Pierden valor más rápido: buena noticia si compras usado.", "Revisa el estado de la batería con un informe del taller."]],
  ["El coste real no es la cuota", ["Suma combustible, seguro, neumáticos, mantenimiento e impuestos.", "Y lo que pierde de valor: suele ser el gasto más grande.", "Divide todo entre los meses que lo tendrás: ese es el coste real."]],
  ["Revisión rápida en 10 minutos", ["Neumáticos: desgaste igual en los cuatro y fecha de fabricación.", "Arranque en frío: sin humo azul ni ruidos raros.", "Prueba todos los botones: clima, elevalunas, luces."]],
  ["Particular o compraventa", ["Particular: suele ser más barato, pero sin garantía.", "Profesional: garantía mínima de un año por ley.", "Compara el precio con el tasador en los dos casos."]],
  ["Cuándo vender tu coche", ["Antes de los 100.000 km: a partir de ahí el precio cae mucho.", "Antes de una revisión cara (correa, embrague, neumáticos).", "Mira cuánto vale hoy y cuánto valdrá en un año."]],
  ["El papeleo al comprar", ["Contrato de compraventa firmado por los dos.", "Cambio de titularidad en la DGT en menos de 30 días.", "El comprador paga el impuesto de transmisiones (ITP)."]],
];
const CLASICOS = [
  { n: "Volkswagen Golf GTI", y: "1976–1983", f: "Volkswagen Golf GTI", t: "El que inventó el compacto deportivo: ligero, alegre y con cuatro plazas. Los originales y cuidados ya se pagan como un coche nuevo." },
  { n: "BMW Serie 3 E30", y: "1982–1994", f: "BMW Serie 3 E30", t: "Propulsión trasera y seis cilindros en los 325i. El abuelo del Serie 3 actual, y cada año más buscado." },
  { n: "Mazda MX-5 NA", y: "1989–1997", f: "Mazda MX-5 NA", t: "Faros escamoteables y menos de una tonelada. Aún se encuentran a buen precio, pero cada vez quedan menos." },
  { n: "SEAT 600", y: "1957–1973", f: "SEAT 600", t: "El coche que motorizó España. Sencillo, pequeño y lleno de historias de familia: hoy, pieza de colección." },
];

// ---------- plantilla de diapositiva ----------
const fontCSS = fs.readdirSync(path.join(ROOT, "assets", "fonts")).map(f => {
  const m = f.match(/^(.*)-(\d+)(i?)\.woff2$/); const fam = m[1] === "BarlowCondensed" ? "Barlow Condensed" : m[1];
  return `@font-face{font-family:"${fam}";font-weight:${m[2]};font-style:${m[3] ? "italic" : "normal"};src:url("data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, "assets", "fonts", f)).toString("base64")}")}`;
}).join("\n");
const LOGO = `<svg width="54" height="54" viewBox="0 0 120 120"><g fill="#e4ff4f">${[0,45,90,135,180,225,270,315].map(a => `<rect x="54" y="10" width="12" height="18" rx="2" transform="rotate(${a} 60 60)"/>`).join("")}<circle cx="60" cy="60" r="36"/></g><circle cx="60" cy="60" r="14" fill="#0f0f0e"/></svg>`;
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
function slide({ tag, title, body = "", img, cred, n, total, cta = false, red = "ig" }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${fontCSS}
*{box-sizing:border-box;margin:0}
html,body{width:100%;height:100%}
body{background:#0f0f0e;color:#f2f1ec;font:500 38px/1.35 Inter,sans-serif;display:flex;flex-direction:column;overflow:hidden;position:relative}
.hz{height:22px;flex:none;background:repeating-linear-gradient(-45deg,#e4ff4f 0 26px,#0f0f0e 26px 52px)}
.top{display:flex;justify-content:space-between;align-items:center;padding:44px 70px 0}
.brand{display:flex;gap:16px;align-items:center;font:800 italic 44px/1 "Barlow Condensed";letter-spacing:.04em;text-transform:uppercase}
.pg{font:700 32px/1 "Barlow Condensed";color:#8a897f;letter-spacing:.1em}
.pic{position:relative;margin:40px 70px 0;border-radius:24px;overflow:hidden;flex:0 0 auto;aspect-ratio:3/2;background:#232321}
.pic img{width:100%;height:100%;object-fit:cover;display:block}
.cred{font-size:20px;color:#8a897f;margin:10px 70px 0}
.main{flex:1;display:flex;flex-direction:column;justify-content:center;padding:30px 70px 40px}
.tag{align-self:flex-start;font:800 italic 34px/1.4 "Barlow Condensed";letter-spacing:.14em;text-transform:uppercase;background:#e4ff4f;color:#0f0f0e;padding:2px 18px;transform:skewX(-10deg);margin-bottom:30px}
h1{font:800 italic 104px/.92 "Barlow Condensed";text-transform:uppercase;text-wrap:balance}
h1 em{font-style:italic;color:#e4ff4f}
.body{margin-top:34px;color:#d6d5ce}
.body b{color:#f2f1ec}
.rows{margin-top:34px;display:flex;flex-direction:column;gap:14px}
.row{display:flex;justify-content:space-between;align-items:baseline;gap:20px;background:#1a1a19;border:1px solid #2c2c2a;border-left:8px solid #e4ff4f;border-radius:14px;padding:22px 28px;font-size:36px}
.row b{font:800 58px/1 "Barlow Condensed";color:#e4ff4f;white-space:nowrap}
.row span{color:#bdbcb4}
.big{font:800 170px/.9 "Barlow Condensed";color:#e4ff4f;margin-top:20px}
.pill{display:inline-block;margin-top:30px;font:800 italic 64px/1 "Barlow Condensed";text-transform:uppercase;padding:14px 30px;border-radius:14px;transform:skewX(-8deg)}
.pill.ok{background:#22c55e;color:#0f0f0e}.pill.ko{background:#e8202a;color:#fff}
.list{margin-top:34px;display:flex;flex-direction:column;gap:26px;padding:0;list-style:none}
.list li{display:flex;gap:24px;font-size:40px}
.list li:before{content:"";flex:none;width:22px;height:22px;margin-top:16px;background:#e4ff4f;transform:skewX(-14deg)}
.url{margin-top:40px;font:700 40px/1.2 Inter;color:#e4ff4f;word-break:break-all}
.foot{padding:0 70px 44px;font:700 30px/1 "Barlow Condensed";letter-spacing:.12em;text-transform:uppercase;color:#8a897f}
.foot b{color:#e4ff4f}
body.tt .main{zoom:1.22}
body.tt .pic{margin-top:60px}
</style></head><body class="${red}"><div class="hz"></div>
<div class="top"><div class="brand">${LOGO}Par Motor</div><div class="pg">${n}/${total}</div></div>
${img ? `<div class="pic"><img src="${img}"></div><div class="cred">${esc(cred)}</div>` : ""}
<div class="main">${tag ? `<div class="tag">${esc(tag)}</div>` : ""}<h1>${title}</h1>${body}</div>
<div class="foot">${cta ? "<b>Tasador gratis</b> · enlace en el perfil" : red === "vid" ? "<b>Par Motor</b> · tasador gratis de coches" : "Desliza →"}</div><div class="hz"></div></body></html>`;
}

// ---------- contenido de cada día ----------
const BASE = Date.UTC(2026, 10, 16); // lunes 16-11-2026: semana 0
const semana = d => Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - BASE) / (7 * 864e5));
const ctaSlide = (title, extra = "") => ({ title, body: `<p class="body">${extra}</p><p class="url">parmotorweb.github.io/parmotor</p>`, cta: true });
const TAGS_IG = "#cochesdesegundamano #cochesusados #comprarcoche #tasacion #motor #coches #españa #parmotor";
const TAGS_TT = "#coches #cochesusados #segundamano #parmotor";

function radar() {
  const a = html.match(/<article class="card edition rv">([\s\S]*?)<\/article>/)[1];
  const num = a.match(/Nº (\d+)/)[1], titulo = a.match(/<h3>([^<]+)<\/h3>/)[1], fecha = a.match(/class="ed-date">([^<]+)</)[1];
  const kpis = [...a.matchAll(/<div class="kpi"><b>([^<]+)<\/b><span>([^<]+)<\/span>/g)].map(m => [m[1], m[2]]);
  const blocks = [...a.matchAll(/<h4>([^<]+)<\/h4>[\s\S]*?<p class="so"><b>Qué significa para ti:<\/b>\s*([^<]+)<\/p>/g)].map(m => [m[1], m[2].split(/(?<=\.)\s/)[0]]);
  const slides = [
    { tag: `Radar semanal · Nº ${num}`, title: esc(titulo), body: `<p class="body">${esc(fecha)}</p>` },
    { tag: "Las cifras", title: "Esta semana", body: `<div class="rows">${kpis.map(([b, s]) => `<div class="row"><span>${esc(s)}</span><b>${esc(b)}</b></div>`).join("")}</div>` },
    ...blocks.map(([h, s]) => ({ tag: "Qué significa para ti", title: esc(h), body: `<p class="body">${esc(s)}</p>` })),
    ctaSlide("El Radar completo, en la web", "Cada lunes, lo que se mueve en el mercado y qué significa si vas a comprar o vender."),
  ];
  return { tipo: "radar", slides, guion: { estilo: "informativo", escenas: [
    { s: 0, frases: ["Esto es lo que ha pasado esta semana en el mercado del coche.", "Te lo cuento en un minuto."] },
    { s: 1, frases: kpis.slice(0, 2).map(([b, t]) => `${b}: ${t}.`) },
    ...blocks.map(([h, so], i) => ({ s: 2 + i, frases: [`${h}.`, so] })),
    { s: 2 + blocks.length, frases: ["El Radar completo lo tienes gratis en la web.", "Enlace en el perfil."] }] }, ig: `📰 Radar semanal Nº ${num}: ${titulo}.\n\n${blocks.map(([h]) => "▪️ " + h).join("\n")}\n\nEl Radar completo, gratis en la web 👉 enlace en el perfil.\n\n${TAGS_IG} #noticiasmotor`, tt: `Radar Nº ${num}: ${titulo} 📰 Lo tienes entero en el enlace del perfil. ${TAGS_TT} #noticiascoches`, ttTitle: `Radar semanal Nº ${num}` };
}
function cuantoVale(w) {
  const m = MODELOS[w % MODELOS.length], n = nombre(m);
  const ys = []; for (let y = 2025; ys.length < 5 && y > 2000; y -= 2) { const g = genOf(m, y); if (g) ys.push([y, g]); }
  const rows = ys.map(([y, g]) => { const v = g.v[0]; return `<div class="row"><span>${y} · ${esc(v[0])} · ${NF.format(kmOf(v, y))} km</span><b>${eur(val(m, v, y))}</b></div>`; }).join("");
  const f = foto(FOTO_MODELO[`${m.mk}|${m.md}`]);
  return { tipo: "cuanto-vale", slides: [
    { tag: "¿Cuánto vale?", title: `Un <em>${esc(n)}</em> de segunda mano`, img: f?.src, cred: f?.cred, body: f ? "" : `<p class="body">Precio justo en España, año por año. Desliza →</p>` },
    { tag: "Precio justo · España", title: esc(n), body: `<div class="rows">${rows}</div><p class="body" style="font-size:28px">Con los km normales para su edad y en buen estado.</p>` },
    ctaSlide(`¿Y el tuyo?`, `Tasa tu ${esc(n)} con sus kilómetros reales en 30 segundos. Gratis y sin registro.`),
  ], guion: { estilo: "informativo", escenas: [
    { s: 0, frases: [`¿Cuánto vale de verdad un ${n} de segunda mano?`, "Te lo digo en quince segundos."] },
    { s: 1, frases: ys.slice(0, 3).map(([y, g], i) => `${["Uno", "Otro", "Y uno"][i]} de ${y}, con ${NF.format(kmOf(g.v[0], y))} km: unos ${eur(val(m, g.v[0], y))}.`) },
    { s: 2, frases: ["¿El tuyo tiene más o menos kilómetros?", "Tásalo gratis en Par Motor. Enlace en el perfil."] }] }, ig: `¿Cuánto vale un ${n} de segunda mano? 🚗\n\nPrecio justo en España según el año, con los kilómetros normales y en buen estado. Desliza para ver la tabla 👉\n\nTasa el tuyo gratis y sin registro: enlace en el perfil.\nTodos los años y versiones: ${SITE}tasar/${slug(`${m.mk} ${m.md}`)}/\n\n${TAGS_IG}`, tt: `¿Cuánto vale un ${n} de segunda mano? 🚗 Tasa el tuyo gratis: enlace en el perfil. ${TAGS_TT}`, ttTitle: `¿Cuánto vale un ${n}?` };
}
function cholloCaro(w) {
  const m = MODELOS[(w + 5) % MODELOS.length], n = nombre(m);
  const y = [2016, 2018, 2019, 2017, 2020][w % 5], g = genOf(m, y) || m.gens[m.gens.length - 1], yy = genOf(m, y) ? y : g.y[0];
  const v = g.v[Math.min(1, g.v.length - 1)], km = [85000, 70000, 95000, 60000][w % 4];
  const justo = Math.round(val(m, v, yy, km) / 100) * 100, chollo = w % 2 === 0;
  const pide = Math.round(justo * (chollo ? 0.86 : 1.16) / 100) * 100, dif = Math.round((pide / justo - 1) * 100);
  return { tipo: "chollo-o-caro", slides: [
    { tag: "¿Chollo o caro?", title: esc(`${n} ${v[0]}`), body: `<div class="rows"><div class="row"><span>Año</span><b>${yy}</b></div><div class="row"><span>Kilómetros</span><b>${NF.format(km)}</b></div><div class="row"><span>Motor</span><b>${v[1]} CV</b></div></div><p class="body">Piden</p><p class="big">${NF.format(pide)} €</p>` },
    { tag: "Veredicto", title: "Precio justo", body: `<p class="big">${NF.format(justo)} €</p><span class="pill ${chollo ? "ok" : "ko"}">${chollo ? "Chollo" : "Caro"} ${dif > 0 ? "+" : ""}${dif} %</span><p class="body">${chollo ? "Por debajo del precio justo. Si el historial está en orden, merece la pena verlo." : "Por encima del precio justo. Usa la cifra para negociar a la baja."}</p>` },
    ctaSlide("Antes de comprar, tásalo", "Escribe lo que te piden y te decimos si es chollo o caro."),
  ], guion: { estilo: "intriga", escenas: [
    { s: 0, frases: ["¿Chollo o caro?", `${n} de ${yy}, con ${NF.format(km)} km.`, `Piden ${NF.format(pide)} €.`, "Piénsalo un segundo…"] },
    { s: 1, frases: ["[pausa]", `Su precio justo ronda los ${NF.format(justo)} €.`, chollo ? `Así que es un chollo: un ${Math.abs(dif)} % por debajo.` : `Así que es caro: un ${dif} % por encima. Y esa cifra te sirve para negociar.`] },
    { s: 2, frases: ["Antes de comprar, tásalo gratis en Par Motor.", "Enlace en el perfil."] }] }, ig: `¿Chollo o caro? 🤔 ${n} ${v[0]} de ${yy} con ${NF.format(km)} km por ${NF.format(pide)} €.\n\nDéjalo en comentarios ANTES de deslizar 👇 La respuesta, en la segunda imagen.\n\nComprueba cualquier anuncio gratis: enlace en el perfil.\n\n(Ejemplo calculado con el tasador de Par Motor, no es un anuncio real.)\n\n${TAGS_IG} #chollo`, tt: `¿Chollo o caro? ${n} de ${yy} con ${NF.format(km)} km por ${NF.format(pide)} € 🤔 Comenta antes de ver la respuesta. ${TAGS_TT} #chollo`, ttTitle: "¿Chollo o caro?" };
}
function consejo(w) {
  const [t, ps] = CONSEJOS[w % CONSEJOS.length];
  return { tipo: "consejo", slides: [
    { tag: "Consejo del jueves", title: esc(t), body: `<p class="body">3 claves en 30 segundos. Desliza →</p>` },
    { tag: esc(t), title: "Apunta", body: `<ul class="list">${ps.map(p => `<li>${esc(p)}</li>`).join("")}</ul>` },
    ctaSlide("Llega con una cifra", "Tasa el coche antes de ir a verlo: gratis y sin registro."),
  ], guion: { estilo: "informativo", escenas: [
    { s: 0, frases: [`${t}: apunta estas tres cosas.`] },
    { s: 1, frases: ps.map((p, i) => `${["Una", "Dos", "Y tres"][i]}: ${p.charAt(0).toLowerCase() + p.slice(1)}`) },
    { s: 2, frases: ["Guárdalo para cuando lo necesites.", "Y si quieres saber cuánto vale un coche, enlace en el perfil."] }] }, ig: `💡 ${t}\n\n${ps.map(p => "✅ " + p).join("\n")}\n\nGuárdalo para cuando vayas a comprar 🔖\nTasador gratis: enlace en el perfil.\n\n${TAGS_IG} #consejos`, tt: `💡 ${t}. Guárdalo 🔖 Tasador gratis en el enlace del perfil. ${TAGS_TT} #consejos`, ttTitle: t.slice(0, 80) };
}
function loQuePierde(w) {
  const m = MODELOS[(w + 10) % MODELOS.length], n = nombre(m);
  const rows = [2023, 2020, 2017].map(y => { const g = genOf(m, y); if (!g) return null; const v = g.v[0], hoy = val(m, v, y), pct = Math.round((1 - hoy / v[3]) * 100); return { y, v, hoy, pct }; }).filter(Boolean);
  const r0 = rows[0];
  return { tipo: "lo-que-pierde", slides: [
    { tag: "Lo que pierde", title: `Un <em>${esc(n)}</em> ${r0.y} ya ha perdido`, body: `<p class="big">${r0.pct > 0 ? "−" : ""}${Math.abs(r0.pct)} %</p><p class="body">Costaba ${eur(r0.v[3])} nuevo (${esc(r0.v[0])}). Hoy vale unos ${eur(r0.hoy)}.</p>` },
    { tag: "Precio de nuevo → hoy", title: esc(n), body: `<div class="rows">${rows.map(r => `<div class="row"><span>${r.y} · ${eur(r.v[3])} → ${eur(r.hoy)}</span><b>${r.pct > 0 ? "−" : "+"}${Math.abs(r.pct)} %</b></div>`).join("")}</div><p class="body" style="font-size:28px">Versión de acceso, km normales para su edad. Precio de nuevo de la época.</p>` },
    ctaSlide("La depreciación también es un gasto", "Mira cuánto te costaría al mes con todo incluido en el comparador."),
  ], guion: { estilo: "intriga", escenas: [
    { s: 0, frases: [`¿Cuánto dinero pierde un ${n} en pocos años?`, `Uno de ${r0.y} costaba ${eur(r0.v[3])} nuevo.`, "[pausa]", `Hoy vale unos ${eur(r0.hoy)}. {lento}`] },
    { s: 1, frases: rows.slice(1).map(r => `El de ${r.y} ya ha perdido un ${r.pct} %.`) },
    { s: 2, frases: ["Eso también es un gasto, aunque nunca veas la factura.", "Calcula el coste real al mes en Par Motor. Enlace en el perfil."] }] }, ig: `📉 Lo que pierde un ${n}: uno de ${r0.y} ya vale un ${r0.pct} % menos que cuando era nuevo.\n\nLa depreciación suele ser el gasto más grande de un coche, aunque no la veas en ninguna factura. Desliza 👉\n\nCalcula el coste real al mes de cualquier coche: enlace en el perfil.\n\n${TAGS_IG} #depreciacion`, tt: `📉 Cuánto pierde un ${n} con los años. El gasto que nadie ve. ${TAGS_TT} #depreciacion`, ttTitle: `Lo que pierde un ${n}` };
}
function museo(w) {
  const c = CLASICOS[w % CLASICOS.length], f = foto(c.f);
  return { tipo: "museo", slides: [
    { tag: "Museo del box", title: esc(c.n), img: f?.src, cred: f?.cred, body: `<p class="body">${esc(c.y)}</p>` },
    { tag: esc(c.y), title: "Por qué es un clásico", body: `<p class="body">${esc(c.t)}</p>` },
    ctaSlide("¿Cuánto vale el tuyo?", "Para los coches de hoy, el tasador de Par Motor. Gratis y sin registro."),
  ], guion: { estilo: "narrativo", escenas: [
    { s: 0, frases: [`${c.n}.`, `De ${c.y.replace("–", " a ")}.`] },
    { s: 1, frases: c.t.split(/(?<=[.:])\s+/) },
    { s: 2, frases: ["¿Lo has tenido, o lo has conducido?", "Cuéntamelo en comentarios."] }] }, ig: `🏁 Museo del box: ${c.n} (${c.y}).\n\n${c.t}\n\n¿Lo has tenido o lo has conducido? Cuéntanoslo 👇\n\n${f ? f.cred + ".\n\n" : ""}${TAGS_IG} #clasicos #cochesclasicos`, tt: `🏁 ${c.n} (${c.y}). ¿Lo has conducido? ${TAGS_TT} #clasicos`, ttTitle: `Museo del box: ${c.n}` };
}

// ---------- generación ----------
const HORAS = { // mejores horas de Metricool (Europe/Madrid): carrusel IG, Reel IG, TikTok (vídeo), YouTube Short
  1: { ig: "10:00", reel: "18:00", tt: "18:00", yt: "16:00" }, 2: { ig: "10:00", reel: "18:00", tt: "18:00", yt: "16:00" },
  3: { ig: "10:00", reel: "18:00", tt: "18:00", yt: "16:00" }, 4: { ig: "10:00", reel: "18:00", tt: "18:00", yt: "16:00" },
  5: { ig: "10:00", reel: "18:00", tt: "18:00", yt: "16:00" }, 6: { ig: "10:00", reel: "18:00", tt: "12:00", yt: "16:00" },
};
const plan = [];
const browser = await chromium.launch();
for (let d = new Date(desde + "T12:00:00Z"); d <= new Date(hasta + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + 1)) {
  const dow = d.getUTCDay() || 7, w = semana(d), fecha = d.toISOString().slice(0, 10);
  const gen = { 1: radar, 2: cuantoVale, 3: cholloCaro, 4: consejo, 5: loQuePierde, 6: museo }[dow];
  if (!gen) continue; // domingo: descanso
  const post = gen(w), dir = path.join(ROOT, "social", fecha);
  fs.mkdirSync(dir, { recursive: true });
  const media = { ig: [], tt: [], vid: [] };
  for (const [red, W, H] of [["ig", 1080, 1350], ["tt", 1080, 1920], ["vid", 1080, 1350]]) {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    for (let i = 0; i < post.slides.length; i++) {
      await page.setContent(slide({ ...post.slides[i], n: i + 1, total: post.slides.length, red }), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const file = `${post.tipo}-${red}-${i + 1}.jpg`;
      await page.screenshot({ path: path.join(dir, file), type: "jpeg", quality: 86 });
      media[red].push(red === "vid" ? `social/${fecha}/${file}` : `${SITE}social/${fecha}/${file}`);
    }
    await page.close();
  }
  const guionVid = { estilo: post.guion.estilo, escenas: post.guion.escenas.filter(e => e.frases.length).map(e => ({ imagen: media.vid[e.s], frases: e.frases })) };
  fs.writeFileSync(path.join(dir, `${post.tipo}-guion.json`), JSON.stringify(guionVid, null, 1));
  plan.push({ fecha, dia: dow, tipo: post.tipo, guion: `social/${fecha}/${post.tipo}-guion.json`, video: `${SITE}social/${fecha}/${post.tipo}.mp4`, instagram: { hora: HORAS[dow].ig, texto: post.ig, media: media.ig }, reel: { hora: HORAS[dow].reel, texto: post.ig }, tiktok: { hora: HORAS[dow].tt, texto: post.tt, titulo: post.ttTitle, media: media.tt }, youtube: { hora: HORAS[dow].yt, titulo: `${post.ttTitle} | Par Motor`.slice(0, 100), texto: `${post.tt.replace(/#\S+/g, "").trim()}\n\nTasador gratis y sin registro: ${SITE}\n\n#shorts #coches #cochesusados #parmotor` } });
}
await browser.close();
fs.writeFileSync(path.join(ROOT, "social", `plan-${desde}_${hasta}.json`), JSON.stringify(plan, null, 1));
console.log(plan.map(p => `${p.fecha} ${p.tipo} (${p.instagram.media.length} imágenes)`).join("\n"));
